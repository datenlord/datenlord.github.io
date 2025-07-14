---
label: 虚拟 RDMA 设备驱动实现（二）：从零构建一个内核可识别的RDMA设备
description: 本文的核心目标，是将上述理论知识付诸实践，编写一个名为 urdma 的最小化虚拟 RDMA 驱动。我们将通过内核自身的接口（如 sysfs 文件系统和 rdma link show 工具）来验证我们的设备是否已成功注册。
location: 中国香港
cover: ./image1.png
author: [米明恒、陈添]
---
![图片](./image1.png)

## 引言
在 《虚拟 RDMA 设备驱动实现（一）：环境配置与Linux内核模块初探》 中，我们已经完成了内核驱动开发所需的基础设施构建。通过部署一个标准化的虚拟化开发环境，并实践了 out-of-tree 内核模块的完整生命周期，我们确立了在内核空间执行自定义代码的基本能力。



本文将在此基础上进行延伸，将焦点从通用的内核模块开发，正式转向特定领域的驱动实现——即与 Linux RDMA 子系统的集成。我们将深入剖析该子系统的核心架构，重点分析其设备模型（struct ib_device）以及驱动必须履行的接口契约（struct ib_device_ops）。这些是任何 RDMA 硬件驱动与内核 ib_core 框架进行交互的基石。



本文的核心目标，是将上述理论知识付诸实践，编写一个名为 urdma 的最小化虚拟 RDMA 驱动。我们将通过内核自身的接口（如 sysfs 文件系统和 rdma link show 工具）来验证我们的设备是否已成功注册。

勘误

在上一篇文章的 2.3.2 节（启动 QEMU 虚拟机） 中，用于配置 9P 共享文件夹的参数存在错误。



原文中的错误配置为：

````
-virtfs local,path=$HOME/shared_with_vm,mount_tag=host_share,security_model=passthrough,id=fsdev0 \
````

其中security_model=passthrough需改为security_model=none或者security_model=mapped。



security_model=passthrough 可能会导致虚拟机内无法读写共享文件夹的内容。


## Linux RDMA 子系统核心概念
在之前的文章中，我们学习了 Linux 内核模块的基础知识。现在，我们将深入探讨 RDMA 的部分，特别是 Linux 内核中 RDMA 子系统（也常被称为 InfiniBand 子系统或 Verbs 子系统）的核心概念和架构。这个子系统为各种 RDMA 硬件（如 InfiniBand HCA、支持 RoCE 或 iWARP 的网卡）提供了一个统一的编程接口。



4.1 RDMA 硬件抽象：HCA (Host Channel Adapter)

在 RDMA 的语境中，执行 RDMA 操作的网络接口卡通常被称为 HCA (Host Channel Adapter)。可以将其视为一种智能网卡，它能够直接处理 RDMA 协议，执行内存注册、数据传输调度、完成通知等任务，从而减轻 CPU 的负担。



不同的 RDMA 技术使用不同类型的 HCA：

InfiniBand HCAs: 用于原生的 InfiniBand 网络。

RNICs (RDMA NICs): 用于在以太网上运行 RDMA 协议，主要包括：

RoCE (RDMA over Converged Ethernet) NICs: 在以太网链路层或 IP 层之上运行 RDMA。

iWARP (Internet Wide Area RDMA Protocol) NICs: 在 TCP/IP 之上运行 RDMA。



Linux RDMA 子系统的目标之一就是为这些不同类型的 HCA 提供一个统一的驱动模型和用户接口。在内核中，每个物理 HCA 设备通常由一个 struct ib_device 结构体来表示。



4.2 Verbs API：RDMA 操作的基石

Verbs API 是 RDMA 编程的核心。它是一组定义了如何与 RDMA 硬件交互的函数和数据结构（Verbs 指的是操作，如 post send, poll cq 等）。应用程序（无论是用户态还是内核态）通过 Verbs API 来分配和管理 RDMA 资源，并发起 RDMA 操作。



Verbs API 的设计是硬件无关的，这意味着理论上，使用 Verbs 编写的应用程序可以不经修改或少量修改就在支持 RDMA 的不同硬件上运行。



以下是 Verbs API 中一些最核心的资源对象：



4.2.1 保护域 (Protection Domain - PD)

概念： 保护域 (内核中的struct ib_pd) 是一个资源隔离的容器。所有其他的 RDMA 资源，如内存区域 (MR)、完成队列 (CQ)、队列对 (QP) 等，都必须与一个 PD 相关联。



目的： PD 提供了一种安全机制，确保一个应用程序或进程创建的 RDMA 资源不能被其他没有权限的应用程序或进程非法访问。只有与同一 PD 关联的资源才能相互交互（例如，一个 QP 只能访问与该 QP 相同 PD 下的 MR）。



操作：

ib_alloc_pd(): 分配一个 PD。

ib_dealloc_pd(): 释放一个 PD。



4.2.2 内存区域 (Memory Region - MR)

概念： 内存区域 (内核中的struct ib_mr) 代表一块被注册用于 RDMA 操作的内存缓冲区。由于 HCA 需要直接访问这块内存（绕过 CPU 和操作系统内存管理），这块内存必须被固定 (pin)在物理内存中，以防止被交换到磁盘，并且其物理地址必须对 HCA 可见。



目的： MR 将应用程序的虚拟地址空间中的内存块映射给 HCA，并授予 HCA 对这块内存的读/写访问权限。MR 还包含访问权限（本地写、远程读、远程写、原子操作等）。



关键属性：

lkey (local key): 用于本地 HCA 访问该 MR。

rkey (remote key): 用于远程 HCA 访问该 MR (建立连接后将 rkey 告知对方)。



操作：

ib_get_dma_mr(): 为 DMA 映射的内存创建一个 MR。

ib_reg_user_mr(): 为用户空间的虚拟地址范围注册一个 MR 。

ib_dereg_mr(): 注销一个 MR。



4.2.3 完成队列 (Completion Queue - CQ)

概念： 完成队列 (内核中的struct ib_cq) 用于接收 RDMA 操作完成的通知。当一个发送或接收操作（或其他 RDMA 操作）完成时，HCA 会在该操作关联的 CQ 中放置一个完成队列项 (Completion Queue Entry - CQE)。



目的： 应用程序通过轮询 CQ 或等待 CQ 事件来了解哪些操作已经完成，以及操作的结果（成功或失败，传输的字节数等）。



操作：

ib_create_cq(): 创建一个 CQ。

ib_destroy_cq(): 销毁一个 CQ。

ib_poll_cq(): 轮询 CQ 以获取已完成的 CQE。

ib_req_notify_cq(): 请求在 CQ 上有新的 CQE 到达时产生一个中断或事件。



4.2.4 Queue Pair - QP

概念： Queue Pair (内核中的struct ib_qp) 是 RDMA 通信的核心引擎。顾名思义，它包含一对工作队列：



发送队列 (Send Queue - SQ): 用于提交发送请求（如 Send, Read, Write, Atomic 操作）。

接收队列 (Receive Queue - RQ): 用于提交接收请求（用于接收对方 Send 操作发送过来的数据）。



目的： QP 负责实际的数据传输。应用程序将工作请求 (Work Request - WR) 提交到 QP 的发送队列或接收队列，HCA 会处理这些请求。



QP 类型：

RC (Reliable Connected): 可靠连接。提供有序、可靠的数据传输，类似于 TCP。需要建立连接。

UC (Unreliable Connected): 不可靠连接。提供有序但不可靠的数据传输（可能丢包），需要建立连接。

UD (Unreliable Datagram): 不可靠数据报。提供无序、不可靠的数据传输，类似于 UDP。无需建立连接，但需要使用地址句柄 (AH)。

QP 状态： QP 有一个状态机，在能够进行数据传输之前，需要从初始状态转换到一系列中间状态，最终达到可以发送/接收数据的状态（如 RTS - Ready To Send）。



操作：

ib_create_qp(): 创建一个 QP。

ib_modify_qp(): 修改 QP 的状态或属性。

ib_destroy_qp(): 销毁一个 QP。

ib_post_send(): 向 QP 的发送队列提交一个发送工作请求。

ib_post_recv(): 向 QP 的接收队列提交一个接收工作请求。



这些是 Verbs API 中最基础和最常用的对象。一个典型的 RDMA 应用流程要创建和配置这些对象后才能开始数据传输。



4.3 内核 RDMA 架构概览

Linux 内核中的 RDMA 子系统是一个分层架构，旨在将硬件细节与上层应用和协议分离开来。

````
+--------------------------------------+
|      User Space Applications         |
| (e.g., MPI, Storage, Custom Apps)    |
+--------------------------------------+
|           rdma-core Libraries        |
| (libibverbs, librdmacm, providers)   |
+--------------------------------------+  <-- User/Kernel Boundary
|           Linux Kernel Space         |
|                                      |
|  +--------------------------------+  |
|  |        Connection Manager      |  |
|  |  (ib_cm, rdma_cm, iw_cm)       |  |
|  +--------------------------------+  |
|  |         ib_uverbs              |  |  <-- uverbs interface (/dev/infiniband/uverbsX)
|  | (User Verbs - ioctl interface) |  |
|  +--------------------------------+  |
|  |           ib_core              |  |
|  |   (Core Verbs API & Framework) |  |
|  +--------------------------------+  |
|  |   Hardware Driver Layer        |  |  <-- struct ib_device
|  | +----------+ +----------+ +---+|  |
|  | | mlx5_core| |  rxe     | |...||  |  (Our focus in this article)
|  | +----------+ +----------+ +---+|  |
|  +--------------------------------+  |
+--------------------------------------+
|          RDMA Hardware (HCAs)        |
+--------------------------------------+
````

各主要组件说明：

User Space Applications: 使用 RDMA 的用户态程序。

rdma-core: 用户态库，为应用程序提供标准的 Verbs API 和连接管理 API。libibverbs 是核心，它通过 uverbs 接口与内核通信。

Connection Manager (CM): 内核中的模块，帮助建立、维护和释放 RDMA 连接（尤其是 RC 和 UC QP）。例如 ib_cm 用于 InfiniBand，rdma_cm 是一个更通用的 CM，可以处理 InfiniBand 和 RoCE。

ib_uverbs (User Verbs): 这是内核 RDMA 子系统暴露给用户空间的关键接口。它通常实现为一个字符设备（如 /dev/infiniband/uverbs0, /dev/infiniband/uverbs1 等，每个 RDMA 设备对应一个）。用户空间的 libibverbs 通过对此设备文件执行 ioctl 系统调用来请求内核分配 RDMA 资源、提交工作请求等。ib_uverbs 会将这些请求转换为对 ib_core 或具体硬件驱动的调用。

ib_core: 这是内核当中 RDMA 子系统的核心。它定义了核心的数据结构（如 struct ib_device, struct ib_qp 等）、Verbs API 的内核态实现框架、设备注册和管理机制等。硬件驱动则会向 ib_core 注册自己的实现。

Hardware Driver Layer: 这一层包含了特定 RDMA 硬件的驱动程序（例如 Mellanox 的 mlx5_core，Intel 的 i40iw，Chelsio 的 cxgb4，以及软件实现的 rxe - SoftRoCE）。这些驱动程序实现了 ib_core 定义的硬件操作函数（通过函数指针表），并负责与物理硬件交互。本文的目标就是编写这样一个（尽管是虚拟的）驱动程序。

RDMA Hardware (HCAs): 物理的 RDMA 网卡。



4.4 关键内核数据结构简介

在编写 RDMA 内核驱动时，我们会频繁接触到 ib_core 定义的一些关键数据结构：



4.4.1 struct ib_device (RDMA 设备描述)

定义于 <rdma/ib_verbs.h>。



这是 RDMA 子系统用来代表一个具体 RDMA 设备（HCA 或虚拟 RDMA 功能单元）的核心结构。每个希望被 RDMA 子系统管理的设备都必须有一个对应的 struct ib_device 实例。



驱动程序负责分配（通常使用 ib_alloc_device()）、初始化并填充这个结构，然后通过 ib_register_device() 将其注册到 ib_core。



关键成员：

name[IB_DEVICE_NAME_MAX]: 设备的唯一名称 (例如 "mlx5_0", "urdma0")。

ops: 一个内嵌的 struct ib_device_ops 结构体。这是实现所有 Verbs 功能的核心，驱动程序通过定义一个 static const struct ib_device_ops 实例，并使用 ib_set_device_ops() 将其内容复制到 ib_device->ops 中。

dev: 一个内嵌的 struct device，通过ib_alloc_device() 进行初始化。

node_type: 节点类型 (e.g., RDMA_NODE_IB_CA, RDMA_NODE_RNIC)。

phys_port_cnt: 设备拥有的物理端口数量。

port_data: 指向一个 struct ib_port_data 数组，每个元素对应一个物理端口的数据。

attrs: 一个内嵌的 struct ib_device_attr 结构，用于缓存设备属性。



4.4.2 struct ib_device_ops (设备操作函数表)

定义于 <rdma/ib_verbs.h>。



这个结构体包含了一系列函数指针，每个指针对应一个 Verbs API 操作或设备管理功能。驱动程序必须提供这个结构的一个实例，并实现其中的相关函数。



关键成员：

owner: 类型为 struct module *，驱动程序应将其设置为 THIS_MODULE。

driver_id: 类型为 enum rdma_driver_id，标识驱动的类型。

uverbs_abi_ver: 指定驱动支持的用户 Verbs ABI 版本。

query_device, query_port: 查询设备整体或特定端口的属性。

alloc_pd, dealloc_pd: 分配和释放保护域。

create_qp, modify_qp, destroy_qp: 队列对操作。

post_send, post_recv: 工作请求提交。

create_cq, destroy_cq, poll_cq: 完成队列操作。

get_dma_mr,  reg_user_mr, dereg_mr: 内存区域操作。

get_port_immutable: 获取端口的不可变属性。

alloc_ucontext, dealloc_ucontext: 分配和释放用户上下文。

对象大小成员: 结构体末尾有一系列通过 DECLARE_RDMA_OBJ_SIZE 宏声明的成员，这些 size_t 类型的成员用于告知 ib_core 驱动程序为相应 RDMA 对象（如 AH, CQ, PD 等）定义的包装结构体的大小。驱动程序在初始化其ib_device_ops 实例时，会使用 INIT_RDMA_OBJ_SIZE(ib_pd, struct urdma_pd, ibpd) 宏来填充这些字段。这使得 ib_core 在分配这些对象（例如，当用户空间请求创建一个 PD 时）时，能够分配足够的内存以容纳驱动的私有数据。

以及其他众多 Verbs 操作对应的函数指针。



4.4.3 驱动如何与 ib_core 交互



一个典型的 RDMA 驱动与 ib_core 的基本交互流程如下：



1. 模块加载时：

驱动程序（例如在其模块初始化函数中，或 PCI 驱动的 probe 函数中）决定创建一个 RDMA 功能单元。

调用 ib_alloc_device 来分配一个包含 struct ib_device 的自定义设备结构体。

驱动程序填充 struct ib_device 的各种属性（如 node_type, phys_port_cnt 等）。

驱动程序定义一个 static const struct ib_device_ops my_ops = { .owner = THIS_MODULE, .uverbs_abi_ver = X, /* ...其他函数指针和大小字段... */ };。

调用 ib_set_device_ops 将 my_ops 的内容复制到 dev->ops 中。

调用 ib_register_device 将初始化好的 ib_device 注册到 ib_core。



2. 运行时：

当用户空间应用程序通过 libibverbs 请求 RDMA 操作时，ib_core 或 ib_uverbs 会查找对应的 ib_device，并调用其 ops 结构中相应的函数指针，从而执行到驱动程序实现的代码。



3. 模块卸载时：

驱动程序需要调用 ib_unregister_device 来从 ib_core 注销设备。

之后，驱动程序应调用 ib_dealloc_device 来释放之前通过 ib_alloc_device() 分配的内存。



理解这些核心概念和数据结构，是编写 RDMA 内核驱动程序的第一步。在下一章中，我们将开始动手，尝试编写一个最简单的 RDMA 内核驱动，它能够注册一个虚拟的 ib_device 并被 Linux 内核的 RDMA 子系统所识别。

## 编写一个最小化的 RDMA 内核驱动

在理解了 Linux 内核模块和 RDMA 子系统的核心概念之后，我们终于可以开始动手编写一个 RDMA 内核驱动了。本章的目标是创建一个“最小可行产品” (Minimum Viable Product, MVP)：一个能够成功加载到内核，注册一个（或多个）虚拟 RDMA 设备的驱动程序。



我们将构建一个名为 urdma 的驱动程序，它代表一个用户空间可访问的虚拟 RDMA 设备。这个驱动将为我们后续探索更复杂的 RDMA 功能提供一个基础框架。



我们将关注以下关键步骤：

定义驱动的核心数据结构。

实现模块的初始化和退出函数。

实现 ib_device_ops 中的必要回调函数（即使是空实现或最小实现）。

分配、初始化并注册 ib_device 实例。



5.1 目标：让内核 RDMA 子系统识别我们的虚拟设备

对于这个最小化的 urdma 驱动，我们的首要目标不是实现完整的数据传输功能，而是将它成功加载到内核，正确地创建并注册struct ib_device 实例，从而让这个虚拟的 RDMA 设备能够被 Linux 内核的 RDMA 子系统本身所识别和管理。



具体来说，这意味着当我们的 urdma.ko 模块加载后，我们期望达到以下内核层面的验证点：

内核提供的 RDMA 工具rdma link show应该能够枚举出我们注册的虚拟 RDMA 设备及其端口。

注册成功后，这些虚拟设备应该在 sysfs文件系统中的 /sys/class/infiniband/ 目录下创建对应的条目（例如 urdma0, urdma1）。



5.2 驱动核心数据结构 (urdma.h)

首先，我们定义驱动所需的核心数据结构。这些结构将保存在一个头文件 urdma.h 中，以便在驱动的各个部分共享。

````
// urdma.h
#ifndef __URDMA_H__
#define __URDMA_H__
#include <rdma/ib_verbs.h> // 引入 RDMA Verbs 相关的核心头文件
// 代表我们的虚拟 RDMA 设备
struct urdma_dev {
  struct ib_device ibdev; // 内嵌标准的 ib_device 结构，这是与 ib_core 交互的关键
  int id;                 // 设备的唯一标识符
  union ib_gid gid;       // 用于存储设备的 GID (全局标识符)，用于网络寻址
};
// 一个辅助内联函数，用于从 ib_device 指针获取包含它的 urdma_dev 指针
// 这是内核中常见的技巧，通过结构体成员的地址反向定位整个结构体的地址
static inline struct urdma_dev *to_udev(struct ib_device *ibdev)
{
  return container_of(ibdev, struct urdma_dev, ibdev);
}
// 为 Verbs 对象定义自定义的包装结构体
struct urdma_pd {
  struct ib_pd ibpd; // 内嵌标准的 ib_pd
};
struct urdma_cq {
  struct ib_cq ibcq; // 内嵌标准的 ib_cq
};
struct urdma_qp {
  struct ib_qp ibqp; // 内嵌标准的 ib_qp
};
struct urdma_ucontext {
  struct ib_ucontext ibuc; // 内嵌标准的 ib_ucontext
};
#endif /* __URDMA_H__ */
````

关键点说明：

struct urdma_dev: 这是驱动的核心结构，代表一个虚拟 RDMA 设备。它通过内嵌 struct ib_device 来与内核 RDMA 子系统集成，同时允许添加驱动特有的数据（如 id 和 gid）。

to_udev(): 这是一个实用宏，用于从 ib_core 传递过来的 struct ib_device * 指针安全地转换回我们自定义的 struct urdma_dev * 指针。

struct urdma_pd, struct urdma_cq, struct urdma_qp, struct urdma_ucontext: 这些是对应标准 Verbs 对象的包装结构。这种模式为将来扩展驱动功能（例如，为每个对象存储额外的私有数据）提供了便利，同时保持了与 ib_core 的兼容性。



5.3 模块初始化与退出 (urdma_main.c)

驱动的主逻辑，包括模块的加载和卸载，将放在一个名为 urdma_main.c 的文件中。

````
// urdma_main.c
#include <linux/module.h> // 标准模块头文件
#include "urdma.h"        // 我们自己的头文件
MODULE_AUTHOR("Linux RDMA Tutorial Driver Developer"); // 模块作者
MODULE_DESCRIPTION("A minimal virtual RDMA device driver"); // 模块描述
MODULE_LICENSE("GPL"); // 许可证声明
#define NUM_DEV 2 // 定义我们想要创建的虚拟设备数量
static struct urdma_dev *urdma_devs[NUM_DEV] = {}; // 全局数组，用于存放我们的设备实例
// 前向声明
static int urdma_register_device(struct urdma_dev *urdma);
static const struct ib_device_ops urdma_device_ops; // 定义在后续
// 设备分配与释放的辅助函数
static struct urdma_dev *urdma_alloc_device(const int id) {
  struct urdma_dev *urdma;
  urdma = ib_alloc_device(urdma_dev, ibdev);
  if (!urdma) {
    pr_err("urdma: alloc_device failed for id: %d\n", id);
    return NULL;
  }
  urdma->id = id;
  urdma->gid.global.subnet_prefix = cpu_to_be64(0xfe80000000000000);
  urdma->gid.global.interface_id  = cpu_to_be64(0x505400fffe123456);
  pr_info("urdma: allocated device for id: %d\n", id);
  return urdma;
}
static void urdma_dealloc_device(struct urdma_dev *urdma) {
  if (!urdma)
    return;
  pr_info("urdma: deallocating device for id: %d\n", urdma->id);
  ib_dealloc_device(&urdma->ibdev);
}
// 模块初始化函数
static int __init urdma_init_module(void) {
  int err = 0;
  int i;
  pr_info("urdma: loading module...\n");
  for (i = 0; i < NUM_DEV; i++) {
    urdma_devs[i] = urdma_alloc_device(i);
    if (!urdma_devs[i]) {
      err = -ENOMEM;
      goto err_cleanup;
    }
    err = urdma_register_device(urdma_devs[i]);
    if (err) {
      urdma_dealloc_device(urdma_devs[i]);
      urdma_devs[i] = NULL;
      goto err_cleanup;
    }
  }
  pr_info("urdma: module loaded successfully with %d device(s)\n", NUM_DEV);
  return 0;
err_cleanup:
  pr_err("urdma: error during module initialization, cleaning up...\n");
  // 清理已成功创建的设备
  for (i = i - 1; i >= 0; i--) { // 从最后一个成功分配/注册的开始清理
    if (urdma_devs[i]) {
      ib_unregister_device(&urdma_devs[i]->ibdev);
      urdma_dealloc_device(urdma_devs[i]);
      urdma_devs[i] = NULL;
    }
  }
  return err;
}
// 模块退出函数
static void __exit urdma_exit_module(void) {
  int i;
  pr_info("urdma: unloading module...\n");
  for (i = 0; i < NUM_DEV; i++) {
    if (urdma_devs[i]) {
      ib_unregister_device(&urdma_devs[i]->ibdev);
      urdma_dealloc_device(urdma_devs[i]);
      urdma_devs[i] = NULL;
    }
  }
  pr_info("urdma: module unloaded.\n");
}
module_init(urdma_init_module);
module_exit(urdma_exit_module);
// ib_device_ops 和 urdma_register_device 的定义将在后文给出
````

初始化流程 (urdma_init_module)：

1. 创建设备:

urdma_alloc_device(i): 调用 ib_alloc_device(urdma_dev, ibdev) 来分配一个 urdma_dev 结构体。ib_alloc_device 是 ib_core 提供的标准函数，它会为包含 ib_device 的自定义结构分配内存并进行基础初始化。我们为设备的 GID (Global Identifier) 成员赋予了固定的值，这个值是从 rxe 设备获取到的示例值。



urdma_register_device(urdma_devs[i]): 此函数（稍后定义）将负责填充 urdma_devs[i]->ibdev 的其余字段，并调用 ib_register_device() 将其注册到 ib_core。



2. 错误处理 (err_cleanup): 如果在初始化过程中发生错误，此标签下的代码负责回滚操作，即注销并释放所有已经成功创建的设备。



退出流程 (urdma_exit_module)：

1. 循环清理设备:

ib_unregister_device(&urdma_devs[i]->ibdev): 从 ib_core 注销设备。

urdma_dealloc_device(urdma_devs[i]): 调用 ib_dealloc_device() 释放设备结构占用的内存。

5.4 定义和实现 ib_device_ops
struct ib_device_ops 是一个包含大量函数指针的结构体，它定义了驱动程序如何响应来自 ib_core 的各种 verbs 操作请求。对于我们的最小化驱动，许多这些函数可以只是存根 (stub) 实现。

````
// urdma_main.c
// --- ib_device_ops 的最小实现 ---
// 获取端口不可变属性 (在设备注册时调用)
static int urdma_get_port_immutable(struct ib_device *ibdev, u32 port_num, struct ib_port_immutable *immutable) {
  immutable->gid_tbl_len = 1; // 支持一个 GID
  return 0;
}
static int urdma_query_device(struct ib_device *ibdev, struct ib_device_attr *attr, struct ib_udata *udata) {
  memset(attr, 0, sizeof(*attr));
  return 0;
}
static int urdma_query_port(struct ib_device *ibdev, u32 port_num, struct ib_port_attr *attr) {
  memset(attr, 0, sizeof(*attr));
  attr->state = IB_PORT_ACTIVE; // 设置为活动状态
  attr->gid_tbl_len = 1; // 支持一个 GID
  attr->phys_state = IB_PORT_PHYS_STATE_LINK_UP; // 物理链路状态
  return 0;
}
static int urdma_query_gid(struct ib_device *ibdev, u32 port_num, int index, union ib_gid *gid) {
  struct urdma_dev *urdma = to_udev(ibdev);
  memcpy(gid, &urdma->gid, sizeof(*gid)); // 返回预设的GID
  return 0;
}
// --- stub 实现 ---
static int urdma_alloc_pd(struct ib_pd *pd, struct ib_udata *udata) { return 0; }
static int urdma_dealloc_pd(struct ib_pd *pd, struct ib_udata *udata) { return 0; }
static int urdma_create_qp(struct ib_qp *qp, struct ib_qp_init_attr *init_attr, struct ib_udata *udata) { return 0; }
static int urdma_modify_qp(struct ib_qp *qp, struct ib_qp_attr *attr, int attr_mask, struct ib_udata *udata) { return 0; }
static int urdma_destroy_qp(struct ib_qp *qp, struct ib_udata *udata) { return 0; }
static int urdma_post_send(struct ib_qp *ibqp, const struct ib_send_wr *wr, const struct ib_send_wr **bad_wr) { return 0; }
static int urdma_post_recv(struct ib_qp *ibqp, const struct ib_recv_wr *wr, const struct ib_recv_wr **bad_wr) { return 0; }
static int urdma_create_cq(struct ib_cq *ibcq, const struct ib_cq_init_attr *attr, struct ib_udata *udata) { return 0; }
static int urdma_destroy_cq(struct ib_cq *cq, struct ib_udata *udata) { return 0; }
static int urdma_poll_cq(struct ib_cq *ibcq, int num_entries, struct ib_wc *wc) { return 0; }
static int urdma_req_notify_cq(struct ib_cq *ibcq, enum ib_cq_notify_flags flags) { return 0; }
static struct ib_mr *urdma_get_dma_mr(struct ib_pd *ibpd, int access) { struct ib_mr *mr = kzalloc(sizeof(*mr), GFP_KERNEL); return mr ? mr : ERR_PTR(-ENOMEM); }
static struct ib_mr *urdma_reg_user_mr(struct ib_pd *pd, u64 start, u64 length, u64 virt_addr, int access_flags, struct ib_udata *udata) { struct ib_mr *mr = kzalloc(sizeof(*mr), GFP_KERNEL); return mr ? mr : ERR_PTR(-ENOMEM); }
static int urdma_dereg_mr(struct ib_mr *mr, struct ib_udata *udata) { kfree(mr); return 0; }
static int urdma_alloc_ucontext(struct ib_ucontext *ibuc, struct ib_udata *udata) { return 0; }
static void urdma_dealloc_ucontext(struct ib_ucontext *ibuc) { return; }
// ib_device_ops 的定义
static const struct ib_device_ops urdma_device_ops = {
  .owner = THIS_MODULE,
  .driver_id = RDMA_DRIVER_UNKNOWN,
  .uverbs_abi_ver = 1,
  // mandatory methods <https://elixir.bootlin.com/linux/v6.8/source/drivers/infiniband/core/device.c#L267>
  .query_device = urdma_query_device,
  .query_port = urdma_query_port,
  .alloc_pd = urdma_alloc_pd,
  .dealloc_pd = urdma_dealloc_pd,
  INIT_RDMA_OBJ_SIZE(ib_pd, urdma_pd, ibpd),
  .create_qp = urdma_create_qp,
  .modify_qp = urdma_modify_qp,
  .destroy_qp = urdma_destroy_qp,
  INIT_RDMA_OBJ_SIZE(ib_qp, urdma_qp, ibqp),
  .post_send = urdma_post_send,
  .post_recv = urdma_post_recv,
  .create_cq = urdma_create_cq,
  .destroy_cq = urdma_destroy_cq,
  .poll_cq = urdma_poll_cq,
  INIT_RDMA_OBJ_SIZE(ib_cq, urdma_cq, ibcq),
  .req_notify_cq = urdma_req_notify_cq,
  .get_dma_mr = urdma_get_dma_mr,
  .reg_user_mr = urdma_reg_user_mr,
  .dereg_mr = urdma_dereg_mr,
  .get_port_immutable = urdma_get_port_immutable,
  // uverbs required methods
  .alloc_ucontext = urdma_alloc_ucontext,
  .dealloc_ucontext = urdma_dealloc_ucontext,
  INIT_RDMA_OBJ_SIZE(ib_ucontext, urdma_ucontext, ibuc),
  // rc_pingpong required methods
  .query_gid = urdma_query_gid,
};
````

关键点说明：

owner = THIS_MODULE: 确保内核正确管理模块的引用计数。

uverbs_abi_ver: 指定驱动 ABI 版本。

Mandatory Ops: query_device, query_port, query_gid, get_port_immutable 是让 ibv_devinfo 等工具能够查询设备信息的基础。PD, QP, CQ, MR 的相关操作也是强制要求实现的。

INIT_RDMA_OBJ_SIZE Macros: 如 INIT_RDMA_OBJ_SIZE(ib_pd, urdma_pd, ibpd)，这些宏告知 ib_core 如何为该驱动分配和管理自定义的 Verbs 对象（如 urdma_pd），确保内存大小和成员偏移正确，如果不进行大小的设置或者设置了错误的大小，很有可能会导致系统崩溃。

alloc_ucontext / dealloc_ucontext: 这两个函数对于用户空间通过 ibv_open_device() 和 ibv_close_device() 使用设备至关重要。

Stub Implementations: 对于许多其他的 Verbs 操作（如 create_qp, post_send 等），在最小化驱动中，它们可以简单地返回成功 (0)、不支持操作 (-EOPNOTSUPP 或 -ENOSYS)，或者仅打印一条调试信息。

MR (Memory Region) Ops: get_dma_mr 和 reg_user_mr 至少需要分配一个 struct ib_mr（或其包装结构）并返回，返回空指针会导致错误。dereg_mr 则负责释放。



5.5 注册 struct ib_device

urdma_register_device 函数负责在 ib_alloc_device 之后，进一步初始化 ib_device 结构并最终调用 ib_register_device() 将其注册到内核 RDMA 子系统。

````
// urdma_main.c
static int urdma_register_device(struct urdma_dev *urdma)
{
  struct ib_device *dev = &urdma->ibdev;
  int err;
  // --- 填充 ib_device 的属性 ---
  strscpy(dev->node_desc, "URDMA Virtual HCA", sizeof(dev->node_desc));
  dev->node_type = RDMA_NODE_UNSPECIFIED; // 我们的设备类型标识为未知
  dev->phys_port_cnt = 1; // 模拟一个单端口设备
  // 设置设备的操作函数表
  ib_set_device_ops(dev, &urdma_device_ops);

  // --- 注册设备到 ib_core ---
  // 第二个参数 "urdma%d" 用于格式化注册信息，dev->name 才是最终的设备名
  err = ib_register_device(dev, "urdma%d", NULL);
  if (err) {
    pr_err("urdma: failed to register device %s: %d\n", dev->name, err);
  } else {
    pr_info("urdma: successfully registered device %s\n", dev->name);
  }
  return err;
}
````

关键填充字段：

dev->node_desc: 设备的描述性字符串。

dev->node_type: 标识设备类型。我们目前的实现还没确定设备的类型，因此使用RDMA_NODE_UNSPECIFIED 。

dev->phys_port_cnt: 物理端口数量。

ib_set_device_ops(dev, &urdma_device_ops): 至关重要，将实现的 ops 函数表关联到此 ib_device。



5.6 编译、加载模块，并验证

完成上述代码后，就可以编译、加载并测试我们的最小化 RDMA 驱动了。



1. Makefile:

创建一个 Makefile 来编译 urdma_main.c (假设最终模块名为 urdma.ko)：

````
obj-m += urdma.o
urdma-objs := urdma_main.o # 如果有其他 .c 文件，也添加到这里
KDIR ?= /lib/modules/$(shell uname -r)/build
PWD := $(shell pwd)
all:
        $(MAKE) -C $(KDIR) M=$(PWD) modules
clean:
        $(MAKE) -C $(KDIR) M=$(PWD) clean
load: all
        sudo insmod ./urdma.ko
unload:
        sudo rmmod urdma
log:
        sudo dmesg -T | tail -n 20
````


2. 编译:

````
make
````

这将生成 urdma.ko (在 Makefile 中指定的模块名)。



3. 加载模块:

````
sudo insmod ./urdma.ko
sudo dmesg -T | tail -n 20
````

检查 dmesg 的输出，相关的 pr_info 消息（如 "urdma: loading module...", "urdma: allocated device for id: 0", "urdma: successfully registered device urdma0" 等）按预期出现，可以确认模块加载成功。



4. 验证:

查看 sysfs:

````
ls /sys/class/infiniband/
urdma0  urdma1
````

你应该能看到 urdma0 和 urdma1 (如果 NUM_DEV 为 2)。

可以进一步查看里面的文件，例如：

````
cat /sys/class/infiniband/urdma0/node_desc
URDMA Virtual HCA
cat /sys/class/infiniband/urdma0/ports/1/state
4: ACTIVE
# 查看 GID (注意 GID 在 sysfs 中通常以十六进制冒号分隔格式显示)
cat /sys/class/infiniband/urdma0/ports/1/gids/0
fe80:0000:0000:0000:5054:00ff:fe12:3456
````

使用 rdma link show:

````
rdma link show
link urdma0/1 state ACTIVE physical_state LINK_UP
link urdma1/1 state ACTIVE physical_state LINK_UP
````

你应该能看 rdma link show 列出了你的虚拟设备 urdma0 和 urdma1 及其端口信息。



如果以上步骤都能成功执行并看到预期的输出，那么恭喜你！你已经成功地创建了一个能被 Linux 内核 RDMA 子系统识别的虚拟 RDMA 设备驱动。这为后续实现更具体的 Verbs 功能以及与用户空间的交互打下了最根本的基础。

## 总结

至此，我们已经成功地完成了一个重要的里程碑：从零开始构建并运行了一个最小化的 Linux RDMA 内核驱动程序。我们经历了从理解内核模块基础、掌握 RDMA 子系统核心概念，到亲手编写代码定义驱动结构、实现关键的 ib_device_ops 回调以及注册虚拟 RDMA设备的全过程。



通过编译、加载我们的 urdma 模块，并使用 rdma link show 验证，我们证明了即使是一个功能上极简的驱动，也能够正确地融入 Linux RDMA 生态系统，被内核识别并与用户空间应用进行初步交互。



这个坚实的基础为我们打开了进一步探索 RDMA 功能的大门。我们的驱动目前已经具备了与 rdma-core 通信的基本框架。



在之后的文章中，我们将进入用户空间，通过为 rdma-core 添加一个 urdma provider，使 rdma-core 能够通过 uverbs 接口（/dev/infiniband/uverbsX）与我们的内核驱动进行通信。有兴趣的读者可以继续关注之后的文章。
---
label: Rust实现RDMA异步编程（一）：基于epoll实现RDMA异步操作
description: RDMA是一套高性能网络协议栈，多用于高性能计算、高性能存储领域。RDMA的library是用C实现的，但是没有很好用的Rust的binding，不方便Rust开发者使用。于是我们正在封装一层符合Rust风格、便于Rust开发者使用的RDMA Rust binding。特别的，异步编程是近几年很受关注的编程方式，用Rust异步编程来实现IO操作，可以避免操作系统的进程上下文切换，提高性能，而且Rust的异步编程框架也在逐步成熟和完善。本系列文章探讨下如何用异步的方式实现RDMA的操作。本文先讨论下如何基于Linux的epoll机制实现RDMA异步操作，后续的文章再探讨如何用Rust异步编程来实现RDMA异步操作。
location: 河南
author: [王璞]
editor: [张汉东]
tags: [RDMA]
---

RDMA 是一套高性能网络协议栈，多用于高性能计算、高性能存储领域。RDMA 的 library 是用 C 实现的，但是没有很好用的 Rust 的 binding，不方便 Rust 开发者使用。于是我们正在封装一层符合 Rust 风格、便于 Rust 开发者使用的 RDMA Rust binding。特别的，异步编程是近几年很受关注的编程方式，用 Rust 异步编程来实现 IO 操作，可以避免操作系统的进程上下文切换，提高性能，而且 Rust 的异步编程框架也在逐步成熟和完善。本系列文章探讨下如何用异步的方式实现 RDMA 的操作。本文先讨论下如何基于 Linux 的 epoll 机制实现 RDMA 异步操作，后续的文章再探讨如何用 Rust 异步编程来实现 RDMA 异步操作。

## RDMA 操作简介

RDMA 的编程模型是基于消息的方式来实现网络传输，并且用队列来管理待发送的消息和接收到的消息。RDMA 的网络传输相关操作基本上都是跟队列相关的操作：比如把要发送的消息放入发送队列，消息发送完成后在完成队列里放一个发送完成消息，以供用户程序查询消息发送状态；再比如接收队列里收到消息，也要在完成队列里放个接收完成消息，以供用户程序查询有新消息要处理。

![图片](./image1.png)

由上面的描述可以看出 RDMA 的队列分为几种：发送队列 Send Queue (SQ)，接收队列 Receive Queue(RQ)，和完成队列 Completion Queue (CQ)。其中 SQ 和 RQ 统称工作队列 Work Queue (WQ)，也称为 Queue Pair (QP)。此外，RDMA 提供了两个接口，ibv_post_send 和`ibv_post_recv`，由用户程序调用，分别用于发送消息和接收消息

- 用户程序调用`ibv_post_send`把发送请求 Send Request (SR)插入 SQ，成为发送队列的一个新的元素 Send Queue Element (SQE)；
- 用户程序调用`ibv_post_send`把发送请求 Send Request (SR)插入 SQ，成为发送队列的一个新的元素 Send Queue Element (SQE)；

SQE 和 RQE 也统称工作队列元素 Work Queue Element (WQE)。

当 SQ 里有消息发送完成，或 RQ 有接收到新消息，RDMA 会在 CQ 里放入一个新的完成队列元素 Completion Queue Element (CQE)，用以通知用户程序。用户程序有两种同步的方式来查询 CQ：

- 用户程序调用 ibv_cq_poll 来轮询 CQ，一旦有新的 CQE 就可以及时得到通知，但是这种轮询方式很消耗 CPU 资源；
- 用户程序在创建 CQ 的时候，指定一个完成事件通道`ibv_comp_channel`，然后调用`ibv_get_cq_event`接口等待该完成事件通道来通知有新的 CQE，如果没有新的 CQE，则调用`ibv_get_cq_event`时发生阻塞，这种方法比轮询要节省 CPU 资源，但是阻塞会降低程序性能。

关于 RDMA 的 CQE，有个需要注意的地方：对于 RDMA 的 Send 和 Receive 这种双边操作，发送端在发送完成后能收到 CQE，接收端在接收完成后也能收到 CQE；对于 RDMA 的 Read 和 Write 这种单边操作，比如节点 A 从节点 B 读数据，或节点 A 往节点 B 写数据，只有发起 Read 和 Write 操作的一端，即节点 A 在操作结束后能收到 CQE，另一端节点 B 完全不会感知到节点 A 发起的 Read 或 Write 操作，节点 B 也不会收到 CQE。

## Linux epoll 异步机制简介

Linux 的`epoll`机制是 Linux 提供的异步编程机制。`epoll`专门用于处理有大量 IO 操作请求的场景，检查哪些 IO 操作就绪，使得用户程序不必阻塞在未就绪 IO 操作上，而只处理就绪 IO 操作。`epoll`比 Linux 之前的`select`和`poll`这两种异步机制要强大，`epoll`特别适合有大量 IO 操作的场景，比如 RDMA 的场景，每个 RDMA 节点同时有很多队列，用于大量传输数据，那么就可以用`epoll`来查询每个 CQ，及时获得 RDMA 消息的发送和接收情况，同时避免同步方式查询 CQ 的缺点，要么用户程序消耗大量 CPU 资源，要么用户程序被阻塞。

Linux 的`epoll`机制提供了三个 API 接口:

- `epoll_create`用于创建`epoll`实例，返回`epoll`实例的句柄；
- `epoll_ctl`用于给`epoll`实例增加、修改、删除待检查的 IO 操作事件；
- `epoll_wait`用于检查每个通过`epoll_ctl`注册到`epoll`实例的 IO 操作，看每个 IO 操作是否就绪/有期望的事件发生。

具体的`epoll`这三个接口的使用，后面结合代码示例来讲解。这里先解释下`epoll`的 IO 事件检查规则。如下图所示，`epoll`有两种检查规则：边沿触发 Edge Trigger (ET)，和电平触发 Level Trigger (LT)。边沿触发和电平触发源自信号处理领域。边沿触发指信号一发生变化就触发事件，比如从 0 变到 1 就触发事件、或者从 1 到 0 就触发事件；电平触发指只要信号的状态处于特定状态就触发事件，比如高电平就一直触发事件，而低电平不触发事件。

![图片](./image2.png)

对应到`epoll`，电平触发指的是，只要 IO 操作处于特定的状态，就会一直通知用户程序。比如当`socket`有数据可读时，用户程序调用`epoll_wait`查询到该`socket`有收到数据，只要用户程序没有把该`socket`上次收到的数据读完，每次调用`epoll_wait`都会通知用户程序该`socket`有数据可读；即当`socket`处于有数据可读的状态，就会一直通知用户程序。而`epoll`的边沿触发指的是`epoll`只会在 IO 操作的特定事件发生后通知一次。比如`socket`有收到数据，用户程序`epoll_wait`查询到该`socket`有数据可读，不管用户程序有没有读完该`socket`这次收到的数据，用户程序下次调用`epoll_wait`都不会再通知该`socket`有数据可读，除非这个`socket`再次收到了新的数据；即仅当`socket`每次收到新数据才通知用户程序，并不关心`socket`当前是否有数据可读。

## RDMA 完成队列 CQ 读取 CQE 的同步和异步方法

本节用 RDMA 读取 CQ 的操作为例展示如何基于`epoll`实现异步操作。先介绍下 RDMA 用轮询和阻塞的方式读取 CQ，再介绍基于`epoll`的异步读取 CQ 的方法。下文的代码仅作为示例，并不能编译通过。

### RDMA 轮询方式读取 CQE

RDMA 轮询方式读取 CQ 非常简单，就是不停调用`ibv_poll_cq`来读取 CQ 里的 CQE。这种方式能够最快获得新的 CQE，直接用户程序轮询 CQ，而且也不需要内核参与，但是缺点也很明显，用户程序轮询消耗大量 CPU 资源。

```rust
loop {
    // 尝试读取一个CQE
    poll_result = ibv_poll_cq(cq, 1, &mut cqe);
    if poll_result != 0 {
        // 处理CQE
    }
}
```

### RDMA 完成事件通道方式读取 CQE

RDMA 用完成事件通道读取 CQE 的方式如下：

- 用户程序通过调用`ibv_create_comp_channel`创建完成事件通道；
- 接着在调用`ibv_create_cq`创建 CQ 时关联该完成事件通道；
- 再通过调用`ibv_req_notify_cq`来告诉 CQ 当有新的 CQE 产生时从完成事件通道来通知用户程序；
- 然后通过调用`ibv_get_cq_event`查询该完成事件通道，没有新的 CQE 时阻塞，有新的 CQE 时返回；
- 接下来用户程序从`ibv_get_cq_event`返回之后，还要再调用`ibv_poll_cq`从 CQ 里读取新的 CQE，此时调用`ibv_poll_cq`一次就好，不需要轮询。

RDMA 用完成事件通道读取 CQE 的代码示例如下：

```rust
// 创建完成事件通道
let completion_event_channel = ibv_create_comp_channel(...);
// 创建完成队列，并关联完成事件通道
let cq = ibv_create_cq(completion_event_channel, ...);

loop {
    // 设置CQ从完成事件通道来通知下一个新CQE的产生
    ibv_req_notify_cq(cq, ...);
    // 通过完成事件通道查询CQ，有新的CQE就返回，没有新的CQE则阻塞
    ibv_get_cq_event(completion_event_channel, &mut cq, ...);
    // 读取一个CQE
    poll_result = ibv_poll_cq(cq, 1, &mut cqe);
    if poll_result != 0 {
        // 处理CQE
    }
    // 确认一个CQE
    ibv_ack_cq_events(cq, 1);
}
```

用 RDMA 完成事件通道的方式来读取 CQE，本质是 RDMA 通过内核来通知用户程序 CQ 里有新的 CQE。事件队列是通过一个设备文件，`/dev/infiniband/uverbs0`（如果有多个 RDMA 网卡，则每个网卡对应一个设备文件，序号从 0 开始递增），来让内核通过该设备文件通知用户程序有事件发生。用户程序调用`ibv_create_comp_channel`创建完成事件通道，其实就是打开上述设备文件；用户程序调用`ibv_get_cq_event`查询该完成事件通道，其实就是读取打开的设备文件。但是这个设备文件只用于做事件通知，通知用户程序有新的 CQE 可读，但并不能通过该设备文件读取 CQE，用户程序还要是调用`ibv_poll_cq`来从 CQ 读取 CQE。

用完成事件通道的方式来读取 CQE，比轮询的方法要节省 CPU 资源，但是调用`ibv_get_cq_event`读取完成事件通道会发生阻塞，进而影响用户程序性能。

### 基于 epoll 异步读取 CQE

上面提到用 RDMA 完成事件通道的方式来读取 CQE，本质是用户程序通过事件队列打开`/dev/infiniband/uverbs0`设备文件，并读取内核产生的关于新 CQE 的事件通知。从完成事件通道`ibv_comp_channel`的定义可以看出，里面包含了一个 Linux 文件描述符，指向打开的设备文件：

```rust
pub struct ibv_comp_channel {
    ...
    pub fd: RawFd,
    ...
}
```

于是可以借助`epoll`机制来检查该设备文件是否有新的事件产生，避免用户程序调用`ibv_get_cq_event`读取完成事件通道时（即读取该设备文件时）发生阻塞。

首先，用`fcntl`来修改完成事件通道里设备文件描述符的 IO 方式为非阻塞：

```rust
// 创建完成事件通道
let completion_event_channel = ibv_create_comp_channel(...);
// 创建完成队列，并关联完成事件通道
let cq = ibv_create_cq(completion_event_channel, ...);
// 获取设备文件描述符当前打开方式
let flags =
    libc::fcntl((*completion_event_channel).fd, libc::F_GETFL);
// 为设备文件描述符增加非阻塞IO方式
libc::fcntl(
    (*completion_event_channel).fd,
    libc::F_SETFL,
    flags | libc::O_NONBLOCK
);
```

接着，创建`epoll`实例，并把要检查的事件注册给`epoll`实例：

```rust
use nix::sys::epoll;

// 创建epoll实例
let epoll_fd = epoll::epoll_create()?;
// 完成事件通道里的设备文件描述符
let channel_dev_fd = (*completion_event_channel).fd;
// 创建epoll事件实例，并关联设备文件描述符，
// 当该设备文件有新数据可读时，用边沿触发的方式通知用户程序
let mut epoll_ev = epoll::EpollEvent::new(
    epoll::EpollFlags::EPOLLIN | epoll::EpollFlags::EPOLLET,
    channel_dev_fd
);
// 把创建好的epoll事件实例，注册到之前创建的epoll实例
epoll::epoll_ctl(
    epoll_fd,
    epoll::EpollOp::EpollCtlAdd,
    channel_dev_fd,
    &mut epoll_ev,
)
```

上面代码有两个注意的地方：

- `EPOLLIN`指的是要检查设备文件是否有新数据/事件可读；
- `EPOLLET`指的是 epoll 用边沿触发的方式来通知。

然后，循环调用`epoll_wait`检查设备文件是否有新数据可读，有新数据可读说明有新的 CQE 产生，再调用`ibv_poll_cq`来读取 CQE：

```rust
let timeout_ms = 10;
// 创建用于epoll_wait检查的事件列表
let mut event_list = [epoll_ev];
loop {
    // 设置CQ从完成事件通道来通知下一个新CQE的产生
    ibv_req_notify_cq(cq, ...);
    // 调用epoll_wait检查是否有期望的事件发生
    let nfds = epoll::epoll_wait(epoll_fd, &mut event_list, timeout_ms)?;
    // 有期望的事件发生
    if nfds > 0 {
        // 通过完成事件通道查询CQ，有新的CQE就返回，没有新的CQE则阻塞
        ibv_get_cq_event(completion_event_channel, &mut cq, ...);
        // 循环读取CQE，直到CQ读空
        loop {
            // 读取一个CQE
            poll_result = ibv_poll_cq(cq, 1, &mut cqe);
            if poll_result != 0 {
                // 处理CQE
                ...
                // 确认一个CQE
                ibv_ack_cq_events(cq, 1);
            } else {
                break;
            }
        }
    }
}
```

上面代码有个要注意的地方，因为`epoll`是用边沿触发，所以每次有新 CQE 产生时，都要调用`ibv_poll_cq`把 CQ 队列读空。考虑如下场景，同时有多个新的 CQE 产生，但是`epoll`边沿触发只通知一次，如果用户程序收到通知后没有读空 CQ，那`epoll`也不会再产生新的通知，除非再有新的 CQE 产生，`epoll`才会再次通知用户程序。

总之，本文用`epoll`机制实现 RDMA 异步读取 CQE 的例子，展示了如何实现 RDMA 的异步操作。RDMA 还有类似的操作，都可以基于`epoll`机制实现异步操作。

对 Rust 和 RDMA 感兴趣的朋友，可以关注我们的开源项目:  
https://github.com/datenlord/async-rdma/

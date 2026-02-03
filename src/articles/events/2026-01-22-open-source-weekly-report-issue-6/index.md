---
label: 开源周报第六期
description: 本文为达坦科技DatenLord新系列文章【开源周报】的第六篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。
cover: ./cover.png
location: 美国
---

本文为达坦科技DatenLord新系列文章【开源周报】的第六篇。



设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。



📍 项目地址与参与

GitHub 仓库：

https://github.com/open-rdma/open-rdma-driver

（点击文末“阅读原文”跳转）


我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。

## 本周进展

本周核心目标：实现RCCL在sim模式下的初步运行，解决上周遗留的零长度操作支持问题



本周主要聚焦于解决RCCL测试中发现的零长度RDMA操作支持问题，以及完善verbs接口的批量提交功能，最终实现了RCCL在sim模式下的初步成功运行。



1. RTL支持零负载RDMA数据包 (commit: 47a8373)

问题背景：

上周RCCL测试遇到零长度WriteImm操作不支持的问题

RCCL协议栈会使用零长度的WRITE_WITH_IMM和SEND_WITH_IMM作为通知机制

RTL侧未正确处理零负载（zero-payload）的RDMA数据包



根因分析：

RQ（Receive Queue）对零负载数据包的hasPayload标记处理不正确

零负载操作仍然会触发不必要的MR表查询

PSN位图更新逻辑未考虑SEND/WRITE_ONLY_WITH_IMMEDIATE零负载情况



解决方案：

在RQ.bsv中根据RETH的dlen字段更新hasPayload标记，使RQ与SQ的hasPayload判断逻辑一致

跳过零负载操作的MR表查询，避免不必要的查表操作

修正SEND/WRITE_ONLY_WITH_IMMEDIATE操作码的PSN位图更新逻辑



实现细节：

src/RQ.bsv: 16行改动（13行新增，3行删除）

src/EthernetFrameIO256.bsv: 12行新增

新增34行代码



效果：

RTL侧正确处理零负载RDMA数据包

避免不必要的内存表查询，提升性能

为RCCL通知机制提供硬件支持



EthernetFrameIO256.bsv RETH提取修复

问题详情：见 

@docs/detail/ethernetframeio-reth-extraction-fix.md

在EthernetFrameIO256.bsv的mkRdmaMetaAndPayloadExtractor模块中，RETH (RDMA Extended Transport Header) 的提取位置不正确，导致解析错误。



原始问题：

在handleSecondBeat规则中尝试提取RETH，但此时rdmaExtendHeaderBuf只包含第二个beat的部分扩展头（10字节）

RETH需要16字节，数据不完整导致提取错误



修复方案：

将RETH提取移到handleThirdBeat规则中

在第三个beat中拼接完整的扩展头缓冲区（第二beat的10字节 + 第三beat的32字节）

确保RETH的所有字段（va, rkey, dlen）都能被正确提取



影响：

确保数据完整性，RETH提取正确

能正确识别dlen == 0的情况，避免错误等待负载数据



2. Driver支持零长度RDMA操作 (commit: 95e394e)

问题背景：

Driver侧的fragmenter和RDMA worker未正确处理零长度操作

零长度操作被错误地生成0个segment，导致无法发送

PSN计算逻辑在零长度场景下异常



实现内容：

修改rdma_utils/fragmenter.rs，确保零长度操作返回1个segment而非0个

更新num_psn计算逻辑，保证零长度传输至少分配1个PSN

添加验证逻辑，仅允许WRITE_WITH_IMM和SEND_WITH_IMM进行零长度操作

修复workers/rdma.rs，正确处理零长度write操作

优化mr_region_manager.rs，跳过零长度操作的内存区域查找

添加零长度分片的单元测试



实现细节：

rdma_utils/fragmenter.rs: 27行改动

workers/rdma.rs: 26行改动

rdma_utils/mr_region_manager.rs: 8行改动

rdma_utils/types.rs: 15行改动

新增142行代码，删除26行代码



效果：

Driver侧完整支持零长度WRITE_WITH_IMM和SEND_WITH_IMM操作

RCCL通知机制可以正常工作

提升与RCCL等上层应用的兼容性



3. 修复post_send和post_recv，支持批量提交WR (commit: 00b80de)

问题背景：

原有post_send/post_recv实现每次只能提交单个WR

RCCL等应用通常会通过wr.next链表批量提交多个WR

单次提交限制影响性能和应用兼容性



实现内容：

重构verbs/core.rs中的post_send和post_recv函数

实现对wr.next链表的遍历处理

支持一次提交多个WR请求

保持原子性，确保要么全部成功，要么全部失败



实现细节：

verbs/core.rs: 92行改动（65行新增，27行删除）

优化错误处理和回滚机制



效果：

完整支持标准RDMA verbs的批量提交语义

显著提升RCCL等应用的性能

减少用户态到内核态的切换开销



4. RCCL sim模式初步运行成功

重要里程碑：

经过本周的RTL和Driver修复，RCCL在sim模式下实现初步运行成功

验证了零长度操作、批量提交等关键功能

为后续完整支持RCCL奠定基础



## 解决的关键问题


1. 零长度RDMA操作支持

问题：RTL和Driver均不支持零长度WRITE_WITH_IMM和SEND_WITH_IMM操作

解决：

RTL侧修正hasPayload标记和PSN位图更新逻辑

Driver侧修复fragmenter和worker处理流程

状态：已完全修复



2. 批量WR提交支持

问题：post_send/post_recv只能提交单个WR，不支持wr.next链表

解决：重构verbs/core.rs，实现链表遍历和批量提交

状态：已完全修复



3. RCCL sim模式运行

问题：RCCL在sim模式下无法正常运行

解决：通过上述修复，实现RCCL sim模式初步运行成功

状态：初步可用，需要进一步测试和完善

## 下周规划



#### 短期任务（最高优先级）

1. Driver代码重构

核心目标：提升代码质量和可维护性，为后续功能扩展打下基础



重构内容：

优化模块间接口设计，减少耦合度

统一错误处理机制，完善错误类型定义

重构核心数据结构，提升性能和可读性

改进并发控制，优化锁的使用

梳理模块职责，提升代码组织清晰度



预期效果：

代码更易于理解和维护

为GPU内存支持等新特性提供更好的架构基础

降低后续开发和调试成本



2. 完善RCCL测试覆盖

在sim模式下运行完整的RCCL测试套件（all_reduce, all_gather, broadcast等）

验证不同通信模式的正确性

识别并修复潜在的稳定性问题

#### 中期任务

解决仿真器高压稳定性问题

问题现象（上周遗留）：

````
ImmAssert failed in mkBsvTopWithoutHardIpInstance.topLevelDmaChannelMux
DataStream checkFullyPipeline Failed: delta=23
````

在零长度操作支持后重新验证是否仍然存在

深入调试流水线控制逻辑

分析高压场景下的时序和竞争条件

#### 长期任务

完善cocotb仿真器测试代码

使用cocotb-pcie库实现更完善的硬件仿真

将cocotb升级到2.0版本

调研cocotb仿真器行为，确保当前cocotb代码的正确性

提升仿真器的稳定性和可靠性



GPU内存注册支持

调研dma-buf内核接口的实现细节

设计内核模块中的GPU内存映射机制

实现ibv_reg_dmabuf_mr verbs支持


## 本周总结

本周主要聚焦于解决RCCL集成中发现的关键问题：



成果：

成功实现RTL和Driver对零长度RDMA操作的完整支持

实现verbs批量WR提交功能，提升应用兼容性和性能

重要里程碑：RCCL在sim模式下初步运行成功，验证了基础功能的正确性



挑战：

需要进一步测试RCCL在sim模式下的稳定性

代码重构工作量较大，需要careful planning和分步实施



下周重点： 启动Driver代码重构工作，优化代码架构和可维护性；同时完善RCCL测试覆盖，确保功能稳定性。



![图片](./image1.png)
**达坦科技**始终致力于打造高性能 **Al+ Cloud 基础设施平台**，积极推动 AI 应用的落地。达坦科技通过**软硬件深度融合**的方式，提供高性能存储和高性能网络。为 AI 应用提供**弹性、便利、经济**的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。

**公众号：** 达坦科技DatenLord

**DatenLord官网：** https://datenlord.github.io/zh-cn/

**知乎账号：** https://www.zhihu.com/org/da-tan-ke-ji

**B站：** https://space.bilibili.com/2017027518

**邮箱：** info@datenlord.com



如果您有兴趣加入**达坦科技Rust前沿技术交流群或硬件相关的群**  ，请添加**小助手微信**：DatenLord_Tech
![图片](./image.png)
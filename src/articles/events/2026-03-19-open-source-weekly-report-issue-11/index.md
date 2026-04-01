---
label: 开源周报第十一期
description: 本文为达坦科技DatenLord新系列文章【开源周报】的第11篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。
cover: ./cover.png
location: 美国
---

本文为达坦科技DatenLord新系列文章【开源周报】的第10篇。



设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。



📍 项目地址与参与

GitHub 仓库：

https://github.com/open-rdma/open-rdma-driver

（点击文末“阅读原文”跳转）


我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。

## 01 本周进展
核心目标：RTL 死锁问题修复，内存模块重构，测试框架完善



1. RTL 死锁问题修复 (commit: c37c185)

问题背景：在 loopback 测试中发现，RQ (Receive Queue) 满载时系统卡死



问题现象：

RQ meta report ringbuf 的 hw_head 停止更新

inFlightWriteReqHeaadUpdateQ 持续报告 Full 状态

DMA 写操作无法完成，数据流停滞



根因分析：

当 RQ 满载时，StreamArbiterSlave（DMA 通道复用器）形成死锁闭环：

````
PayloadCon 转发数据
    → 需要向 conRespPipeOutQ 入队
    → 但 RQ 已满无法消费，队列阻塞
    → 导致数据转发 rule 无法执行
    → DMA 通道被占用
    → RQ Ringbuf 的请求无法处理
    → RQ 更加无法消费
    → 死锁！
````

修复方案：

引入 ReservedFIFOF 抽象，实现"先预留槽位，后实际入队"模式：


````
interface ReservedFIFOF#(type td, numeric type capacity);
    method Action reserve();  // 预留槽位（可阻塞）
    method Action enq(td x);  // 实际入队（无阻塞，使用已预留槽位）
endinterface
````

关键改动：

在发起 DMA 写请求时调用 reserve() 预留响应槽位

数据转发完成时调用 enq() 无条件入队



这样将阻塞点从"数据转发时"前移到"请求接受时"，解耦了关键路径。



详细技术文档：docs/zh-CN/detail/payload-con-rq-deadlock-fix.md



统计：1 个文件，+72/-2 行



2. 内存模块重构 (commit: 2d06459)

目标：改善内存管理模块的代码组织和可维护性



变更内容：

拆分 mem 模块为 address、allocator、handler、experimental 子模块

重命名文件以更清晰反映功能：virt_to_phy.rs → resolver.rs，host.rs → udmabuf.rs

简化 mmap.rs 和 utils.rs 实现



统计：26 个文件，+270/-212 行



3. ConsumerRing 简化 (commit: 9afd0ef)

简化 ConsumerRing 实现，减少代码冗余



统计：1 个文件，+12/-18 行



4. Cocotb 测试框架改进 (commits: 74ea780, 71139c7)

使用动态 CPU 核数进行 Verilator 编译，提升编译效率

修复 SimplePcieBehaviorModelProxy 中写请求转发错误



统计：5 个文件，+5/-5 行



5. 测试脚本修复 (commit: 687b091)

修复 loopback 仿真测试脚本问题



统计：2 个文件，+9/-5 行


## 02 下周规划

1. 硬件验证

Loopback 硬件测试，验证死锁修复后的功能正确性

时序验证：确认 ReservedFIFOF 的引入不影响关键路径时序收敛



2. 多通道支持

启用四通道 Ringbuffer，提升数据吞吐能力

验证多通道场景下的稳定性



3. 性能测试

使用 perftest 工具进行基准测试

收集带宽、延迟等关键性能指标


![图片](./image1.png)
**达坦科技**始终致力于打造高性能 **Al+ Cloud 基础设施平台**，积极推动 AI 应用的落地。达坦科技通过**软硬件深度融合**的方式，提供高性能存储和高性能网络。为 AI 应用提供**弹性、便利、经济**的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。

**公众号：** 达坦科技DatenLord

**DatenLord官网：** https://datenlord.github.io/zh-cn/

**知乎账号：** https://www.zhihu.com/org/da-tan-ke-ji

**B站：** https://space.bilibili.com/2017027518

**邮箱：** info@datenlord.com



如果您有兴趣加入**达坦科技Rust前沿技术交流群或硬件相关的群**  ，请添加**小助手微信**：DatenLord_Tech
![图片](./image.png)
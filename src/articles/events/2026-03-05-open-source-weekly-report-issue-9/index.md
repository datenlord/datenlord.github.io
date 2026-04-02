---
label: 开源周报第九期
description: 本文为达坦科技DatenLord新系列文章【开源周报】的第9篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。
cover: ./cover.png
location: 美国
---

本文为达坦科技DatenLord新系列文章【开源周报】的第9篇。



设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。



📍 项目地址与参与

GitHub 仓库：

https://github.com/open-rdma/open-rdma-driver

（点击文末“阅读原文”跳转）


我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。

## 01 本周进展
核心目标：构建开箱即用开发环境，修复 Ringbuffer 同步问题，实现多节点仿真测试



1. 开箱即用开发环境 (https://github.com/open-rdma/open-rdma-dev-env)

目标：简化新开发者上手流程，提供一键部署的开发环境

功能：
完整的开发环境配置（Docker/容器化支持）
自动化依赖安装脚本
集成 RDMA 工具链和测试框架
详细的快速入门文档

价值：
降低环境配置门槛，减少新手配置时间
统一开发环境，避免环境差异导致的问题


2. Ringbuffer 同步机制修复 (commits: eef6fe0, 743b7ee)

问题：Driver 层 Producer/Consumer Ring 未正确对齐硬件的 guard bit 机制（RingbufPointer { Bool guard; UInt idx; }），导致空/满状态判断错误，高压场景下出现同步失败。



修复方案：

引入 HW_PTR_MASK (13-bit) 覆盖 guard bit 和 idx

通过比较完整指针值（含 guard bit）区分状态：

空：hw_tail_mod == head_mod && head_with_guard == hw_tail

满：hw_tail_mod == head_mod && head_with_guard != hw_tail

简化同步逻辑，移除冗余的 is_full 标志和相关代码

修复内存序，确保硬件可见性



统计：8 个文件，+171/-71 行



3. 多节点仿真测试框架 (commits: dd2851a, f97a395, ccbfff8, 4c0b954, 715cc87)

Driver 层 (dd2851a)：支持四节点（uverbs0-3，IP 127.0.0.{1,2,3,4}），优化设备初始化和网络映射（3 文件，26 行改动）



测试程序 (f97a395)：

全连接拓扑多节点 Send/Recv 测试（573 行），支持 rank 交换和分布式同步

自动化测试脚本（107 行），通用库改进（110 行）



RTL 仿真 (ccbfff8)：

四节点 Cocotb 测试台（241 行）

软件交换机和路由（62 行），Mock Host 框架（106 行），测试程序（141 行）



环境优化 (4c0b954, 715cc87)：移除交换机 TCP 固定端口绑定，解决端口冲突（23 行改动）



统计：

Driver 仓库：13 个文件，+1044/-88 行

RTL 仓库：7 个文件，+573/-12 行



4. 测试完善 (commits: 3990f96, 0c4be5b)

新增小包回环测试（222 行）

自动编译 rdma-core 依赖



统计：6 个文件，+233/-9 行



## 02 解决的关键问题

1. Ringbuffer 空/满状态判断错误

根因：硬件使用 guard bit 区分空/满，Driver 未正确实现此逻辑

解决：对齐硬件 guard bit 机制，通过 HW_PTR_MASK 比较完整指针值

状态：已完成



2. 缺少多节点测试能力

解决：

Driver 支持四节点

实现全连接拓扑测试（573 行）

RTL 四节点仿真（550 行）

状态：已完成

## 03 下周规划

短期任务（最高优先级）

Loopback 硬件测试

在真实硬件环境下运行完整的 loopback 测试套件

验证 Ringbuffer 修复在硬件上的稳定性

测试各种数据包大小（小包、大包、混合场景）

压力测试和长时间稳定性验证

性能基准测试和优化



仿真器稳定性

验证高压稳定性问题是否解决

cocotb 升级到 2.0



中期任务

Driver 模块优化

ring 模块：文档、单元测试、性能优化

mem 模块：umem 文档、virt_to_phy 优化、GPU 内存 handler



DMA Buffer 系统重构

mlock 可靠性改进

调研 dma-buf 内核接口

GPU 内存注册基础支持



长期任务（暂缓）

Worker 模块优化：等待硬件代码稳定后再重构


## 本周总结
成果：

Ringbuffer 修复：对齐硬件 guard bit 机制，解决空/满判断问题（+100 行）

多节点测试：Driver 四节点支持（26 行），测试程序（573 行），RTL 仿真（550 行），环境优化（23 行）

测试完善：小包测试（222 行），自动化改进

开发环境：开箱即用环境仓库，简化新手上手流程



下周重点：Loopback 硬件测试，多节点测试验证，DMA Buffer 重构



任务追踪：查看 https://github.com/orgs/open-rdma/projects/1/views/1 获取当前进行的任务


![图片](./image1.png)
**达坦科技**始终致力于打造高性能 **Al+ Cloud 基础设施平台**，积极推动 AI 应用的落地。达坦科技通过**软硬件深度融合**的方式，提供高性能存储和高性能网络。为 AI 应用提供**弹性、便利、经济**的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。

**公众号：** 达坦科技DatenLord

**DatenLord官网：** https://datenlord.github.io/zh-cn/

**知乎账号：** https://www.zhihu.com/org/da-tan-ke-ji

**B站：** https://space.bilibili.com/2017027518

**邮箱：** info@datenlord.com



如果您有兴趣加入**达坦科技Rust前沿技术交流群或硬件相关的群**  ，请添加**小助手微信**：DatenLord_Tech
![图片](./image.png)
---
label: 开源周报第十二期
description: 本文为达坦科技DatenLord新系列文章【开源周报】的第12篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。
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
核心目标：测试框架完善，perftest 集成

1. Base Test 改进 (commit: 6a4bae8)

目标：改进 loopback 测试的内存布局和多轮测试支持



变更内容：

重构内存布局：采用 [src_0][dst_0][src_1][dst_1]... 模式支持多轮测试

为每轮测试生成不同的数据模式，便于验证数据正确性

改进代码格式和可读性



统计：1 个文件，+90/-42 行



2. Perftest Mock 测试集成 (commits: 9f0a3cf, 5c65c83)

目标：在 mock 模式下运行 perftest，便于开发调试



变更内容：

添加 mock_test.sh 脚本支持 mock 模式测试

添加 loopback_mock.sh 脚本支持 loopback 仿真测试

添加 sim_test.sh 仿真测试脚本

改进 pagemaps.rs 中的页表映射处理



统计：8 个文件，+162/-22 行



3. Perftest Loopback 支持 (针对 perftest 的特化修改)

背景：当前驱动不支持两个进程同时共享同一 RDMA 网卡，因此需要在单进程内实现 loopback 测试



变更内容：

在 write_bw 中添加单进程 loopback 测试模式（commit: 2496255）

修复 loopback 模式下的 PMTU 配置问题（commit: 59a79a1）



统计：7 个文件，+323/-36 行



## 02 下周规划

1. 硬件验证

完成 RTL 死锁修复的上板综合，验证时序收敛

进行硬件 loopback 测试，验证死锁修复后的功能正确性



2. 性能测试

使用 perftest loopback 模式进行基准测试

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
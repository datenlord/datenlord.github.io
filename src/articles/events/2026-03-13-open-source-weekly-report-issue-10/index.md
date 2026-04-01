---
label: 开源周报第十期
description: 本文为达坦科技DatenLord新系列文章【开源周报】的第9篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。
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
核心目标：多节点通信稳定性改进，文档国际化

1. CSR 通信协议优化 (commit: c9d6491)

问题：多节点场景下 UDP 通信存在丢包和乱序问题，影响 CSR 寄存器读写可靠性



修复方案：

CSR 通信从 UDP 切换到 TCP

确保多节点仿真场景下的通信可靠性



统计：2 个文件，+379/-286 行



2. Producer Ringbuffer 优化 (commit: 7da483c)

延迟读取 CSR 寄存器，减少不必要的 IO 操作



统计：1 个文件，+12/-4 行



3. 文档重构与国际化 (commits: d7c7a74, 2ecd0f3, f63630e)

分离中英文文档目录（docs/zh-CN/ 和 docs/en/）

完成核心文档英文翻译（introduction、installation、rtl-simulation）

新增 5 篇技术细节英文文档



统计：83+ 个文件，+3000+ 行



4. RTL Bug 调试

仿真测试中发现 RTL 死锁问题

已定位问题根因，待下周修复


## 02 下周规划

修复 RTL 死锁 bug

Loopback 硬件测试验证

多节点仿真稳定性测试


![图片](./image1.png)
**达坦科技**始终致力于打造高性能 **Al+ Cloud 基础设施平台**，积极推动 AI 应用的落地。达坦科技通过**软硬件深度融合**的方式，提供高性能存储和高性能网络。为 AI 应用提供**弹性、便利、经济**的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。

**公众号：** 达坦科技DatenLord

**DatenLord官网：** https://datenlord.github.io/zh-cn/

**知乎账号：** https://www.zhihu.com/org/da-tan-ke-ji

**B站：** https://space.bilibili.com/2017027518

**邮箱：** info@datenlord.com



如果您有兴趣加入**达坦科技Rust前沿技术交流群或硬件相关的群**  ，请添加**小助手微信**：DatenLord_Tech
![图片](./image.png)
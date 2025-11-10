---
label: 达坦科技RDMA解决方案助力国际顶尖天文观测项目论文发表
description: 近日，由意大利国家核物理研究所（INFN）主导的国际天文观测研究团队，在切伦科夫望远镜阵列（Cherenkov Telescope Array Observatory, CTAO）项目中取得了重要突破，其最新研究成果已正式发表在《IEEE Transactions on Nuclear Science》这一期刊。
cover: ./cover.png
location: 中国香港
---

## 引言
近日，由意大利国家核物理研究所（INFN）主导的国际天文观测研究团队，在切伦科夫望远镜阵列（Cherenkov Telescope Array Observatory, CTAO）项目中取得了重要突破，其最新研究成果已正式发表在《IEEE Transactions on Nuclear Science》这一期刊。



这篇题为《基于FPGA的RoCEv2-RDMA读出电子学架构用于CTAO-LST高级相机》（FPGA-Based RoCEv2-RDMA Readout Electronics for the CTAO-LST Advanced Camera）的论文详细介绍了团队在读出电子学（readout electronics）架构方面的创新进展，文章现已上线IEEE Xplore，点击文末“阅读原文”跳转阅读。

https://ieeexplore.ieee.org/document/11127121



作为该项目的重要技术支撑，达坦科技的RDMA解决方案在其中发挥了关键作用，为高性能数据传输提供了核心支持。

## 科研项目的背景
CTA是全球下一代高能伽马射线观测设施，其中位于加那利群岛拉帕尔马岛的北部观测站，正在安装最大口径的LST（Large-Sized Telescope，大型望远镜）。LST的目标是捕捉能量最低的伽马射线信号，对电子学架构和数据处理能力提出了极高要求。意大利国家核物理研究所的研究团队在该项目中设计了一种新型的高速读出电子学系统，通过定制的高速采样硬件、JESD204C标准的高速串行链路，以及RoCEv2协议的RDMA通信，实现了数据从望远镜前端采集、处理到高速传输的全链路优化。

## 达坦科技RDMA解决方案的亮点
在这一过程中，达坦科技RDMA解决方案的引入，使科研团队能够在FPGA硬件平台上直接集成高效的RDMA网络通信能力，实现了观测设备与数据中心的无缝连接。与传统方案不同，达坦科技RDMA采用了新颖的Bluespec SystemVerilog语言开发，这一解决方案具备以下三大核心优势：



高度可移植性

该方案的设计具备良好的硬件独立性，可轻松移植到不同厂商的FPGA平台或异构硬件架构上。无论是科研环境的实验级验证，还是数据中心的规模化应用，用户都能快速适配而无需大幅修改底层代码。这种灵活性使其能够跨项目、跨平台应用，大大增强了技术的通用性。



模块化设计

RDMA方案采用模块化构建方式，功能单元之间边界清晰，支持灵活组合与扩展。科研团队可以根据项目需求选择性启用或替换模块，从而实现定制化优化。模块化的优势不仅体现在维护和升级上，也使方案能够无缝对接到现有的数据处理和网络传输系统中，减少集成风险和工作量。



开发效率高、成本低

达坦科技RDMA基于Bluespec SystemVerilog开发，这是一种高层次硬件描述语言，能够用更少的代码实现复杂逻辑，大幅度缩短研发周期。相比传统HDL（如Verilog/VHDL），开发效率更高，意味着科研团队和企业客户能够在更短的时间内完成从设计到验证的全流程。更快的开发速度也直接降低了人力与时间成本，使项目整体投入更具性价比。



凭借这些优势，达坦科技的RDMA解决方案完美嵌入了INFN射电望远镜的科研项目中，为大规模科学实验提供了可靠的技术支撑。


## 未来展望
达坦科技Blue-RDMA项目的负责人米明恒表示：“我们非常荣幸能够参与这样一个国际顶尖的科学项目。我们的RDMA解决方案以轻量化实现为特色，能够高效、快速地与各类科研和工业项目集成。未来，达坦科技将继续推动RDMA技术在科学研究和数据中心等领域的应用，助力全球科研工作者探索未知。”

![图片](./image1.png)
**达坦科技**始终致力于打造高性能 **Al+ Cloud 基础设施平台**，积极推动 AI 应用的落地。达坦科技通过**软硬件深度融合**的方式，提供高性能存储和高性能网络。为 AI 应用提供**弹性、便利、经济**的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。

**公众号：** 达坦科技DatenLord

**DatenLord官网：** https://datenlord.github.io/zh-cn/

**知乎账号：** https://www.zhihu.com/org/da-tan-ke-ji

**B站：** https://space.bilibili.com/2017027518

**邮箱：** info@datenlord.com



如果您有兴趣加入**达坦科技Rust前沿技术交流群或硬件相关的群**  ，请添加**小助手微信**：DatenLord_Tech
![图片](./image.png)
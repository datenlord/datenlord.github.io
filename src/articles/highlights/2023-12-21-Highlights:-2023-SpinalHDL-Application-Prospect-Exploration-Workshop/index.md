---
label: 精彩回顾：2023 SpinalHDL 应用前景探索研讨会
description: 达坦科技通过软硬件深度融合的方式打通云间壁垒，实现数据高效跨云访问。其采用硬件加速提升存储性能，目前采用FPGA实现存储相关场景的性能加速。SpinalHDL是达坦科技在产品中使用的硬件描述语言之一，因此，达坦科技一直热心于推广SpinalHDL在业界的落地应用。达坦科技此次联合SpinalHDL社区及该语言的创建者 Charles Papon 举办了 《2023 SpinalHDL应用前景探索》的线上研讨会，分为两个Track。
location: 中国新疆
---

达坦科技通过软硬件深度融合的方式打通云间壁垒，实现数据高效跨云访问。其采用硬件加速提升存储性能，目前采用 FPGA 实现存储相关场景的性能加速。SpinalHDL 是达坦科技在产品中使用的硬件描述语言之一，因此，达坦科技一直热心于推广 SpinalHDL 在业界的落地应用。

**达坦科技此次联合 SpinalHDL 社区及该语言的创建者 Charles Papon** 举办了《2023 SpinalHDL 应用前景探索》\*\* 的线上研讨会，分为两个 Track。

## Tooling and flow

**Track 1: Tooling and flow**

四位演讲人主要围绕着 SpinalHDL 语言的方法论，即到底怎么把 SpinalHDL 用起来，它究竟提供了什么功能和优势等做了全面的阐述——

**Yindong Xiao, Get started with SpinalHDL with a Simplified Setup**

**Abstract:** The existing SpinalHDL environment requires several steps to install, and the user may encounter various problems during the process. This is not very friendly to newcomers, especially students, who need to spend a lot of time learning how to work with the environment rather than the design itself. On the other hand, the installation process requires access to the Internet, which is not possible for many companies and places with poor network conditions. Therefore, it is necessary to provide a better way of offline installable to simplify the usage. The talk will show how to quickly and easily set up a development environment using Docker on Linux or the MSYS2 installation tool on Windows.

[Get started with SpinalHDL with a Simplified Setup 分享视频](https://mp.weixin.qq.com/s/LOPDUptVxvWZwe_CsL81SA)

**yportne13, Some Tips on Using Memory Black Box in SpinalHDL**

**Abstract:** In this lecture, I will share some tips and tricks on how to use Memory Black Box in SpinalHDL. The main contents include the following four points: how to automatically select an appropriate implementation method based on Memory size, how to send bist enable signal to all Memories, how to add new interfaces to Memory, and how to manage bist logic.

[Some Tips on Using Memory Black Box in SpinalHDL 分享视频](https://mp.weixin.qq.com/s/LOPDUptVxvWZwe_CsL81SA)

**Charles Papon, Pipelining API Introduction**

**Abstract:** VexRiscv and NaxRiscv had their own pipelining API, now it's time for SpinalHDL to integrate its own ! This talk will introduce the recently added spinal.lib.misc.pipeline API. It mainly allows the user to define pipeline without having to manualy propagate data through the pipeline and define the arbitration, but also allows quite a few additional design patterns that will be demonstrated during the talk.

[Pipelining API Introduction 分享视频](https://mp.weixin.qq.com/s/LOPDUptVxvWZwe_CsL81SA)

**Andreas Wallner, SpinalHDL Intro for New Users**

**Abstract:** We will design a WG2812 controller, starting with a very classical design and build a bus peripheral from that. Along the way I'll introduce basic SpinalHDL concepts.

[SpinalHDL Intro for New Users 分享视频](https://mp.weixin.qq.com/s/LOPDUptVxvWZwe_CsL81SA)

## Projects

**Track 2: Projects**

两位演讲人专注于 SpinalHDL 的应用案例，着重分享了具体用 SpinalHDL 所做的实际的项目或商业应用。

**Chenbo, Pcie Brief Introduction**

**Abstract:** In this lecture, I will share 3 subtopics pcie brief introduction, I will give audience basic knowledge of pcie. xilinx pcie, explain some concepts in pcie through xilinx pcie integrated block and it's example design. spinal pcie, overview of spinal pcie facility and its future.

[Pcie Brief Introduction 分享视频](https://mp.weixin.qq.com/s/LOPDUptVxvWZwe_CsL81SA)

**Christopher Lozinski, The J1Sc Family**

**Abstract:** The J1 in Scala (J1Sc) is the newest member of a large family of stack processors. When your finite state machines become too complex and you don’t have an SoC, it is time to use a soft core processor. The j1 is a small stack processor. It can run Forth, a small Reverse Polish notation programming language, Forth includes an interpreter, which is great for hardware debugging. The J1Sc Coding style will be compared with the original J1 Verilog. There are so many variants of the J1, really the only way to manage them all from a single code base is with a high level tool like SpinalHDL.

[The J1Sc Family 分享视频](https://mp.weixin.qq.com/s/LOPDUptVxvWZwe_CsL81SA)

## Related Resources

[精彩回顾 l SpinalHDL 应用前景探索线上研讨会](http://mp.weixin.qq.com/s?__biz=MzkwNTMzOTE2MA==&mid=2247485064&idx=2&sn=c634f1616cd724db66410dd90ed425df&chksm=c0f80efff78f87e92a31dfe516f37f10eb9b3966185204fddb5728105716228a16aa3b66cbf3&scene=21#wechat_redirect)

对 **开源硬件和敏捷开发感兴趣** 的朋友，可以添加达坦科技小助手的微信，加入达坦科技硬件群。

![图片](./image1.png)

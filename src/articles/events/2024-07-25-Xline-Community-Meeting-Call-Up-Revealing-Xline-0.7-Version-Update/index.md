---
label: Xline社区会议Call Up：揭秘Xline 0.7版本更新
description: 为了更全面地向大家介绍Xline的进展，同时促进Xline社区的发展，我们将于2024年7月31日北京时间11:00 p.m.召开Xline社区会议。
cover: ./cover.png
location: 中国香港
---
**Xline /Community Meeting**
为了更全面地向大家介绍Xline的进展，同时促进Xline社区的发展，我们将于**2024年7月31日北京时间11:00 p.m.** 召开**Xline社区会议** 。



欢迎您届时登陆zoom观看直播：

会议号: 975-8012-1637



会议链接：

https://zoom-lfx.platform.linuxfoundation.org/meeting/97580121637?password=8f9543a5-54bb-48dc-ab90-99d8b75938e4
## 1
在Xline 0.7中，我们完成了对Xline代码库中进行了一次较大的重构。这次重构在某些性能测试中甚至使得Xline获得了近20倍的性能提升。



本次Xline社区会议主要围绕Xline 0.7版本的更新展开，以下是会议的主要内容：

性能优化: 我们对curp命令执行流程进行了大幅重构，并对Xline状态机的异步代码进行了一系列优化，提升了系统的整体性能。

基于RIFL的命令去重(deduplication): 我们基于RIFL实现了一套去重机制，解决了客户端自动重试导致的一致性问题。同时，基于去重机制重新实现了Xline中的命令垃圾回收流程。
## 2
**欢迎参与到Xline项目中：**

我们欢迎任何对于Xline的积极贡献。目前在GitHub上有些任务并不需要深入了解Curp协议或Xline这个项目，只需要了解API和Rust语言即可。即使您现处于入门阶段，并想要在开源项目中使用Rust语言，社区也会提供指导和帮助，来引导您更好地参与项目。
## 3
**Xline近期文章参考：**

Xline 0.7重构性能分析总述

本文讲解了Xline中重构后命令执行流程的新设计，以及我们是如何优化Xline的性能的。



异步运行时IO问题分析

在本篇文章中，我们主要会通过Xline开发中的几个例子，讨论Rust的异步运行时中有关于IO的问题，以及在代码实现中如何正确使用Tokio runtime以实现最佳性能。![图片](./image.png)
Xline于2023年6月加入**CNCF 沙箱计划**，是一个用于**元数据管理的分布式KV存储**。Xline项目以Rust语言写就。感谢每一位参与的社区伙伴对Xline的帮助和支持，也欢迎更多使用者和开发者参与体验和使用Xline。

**GitHub链接**：https://github.com/xline-kv/Xline

**Xline官网**：www.xline.cloud

**Xline Discord:** https://discord.gg/TT6azpTHZS


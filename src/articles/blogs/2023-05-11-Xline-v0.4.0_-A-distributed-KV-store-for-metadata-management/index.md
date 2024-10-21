---
label: Xline v0.4.0:一个用于元数据管理的分布式KV存储
description: Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。
cover: ./cover.png
location: 中国香港
author: [期待你贡献的]
tags: [Xline]
---

![封面](./cover.png)

## Xline 是什么？我们为什么要做 Xline？

**Xline 是一个基于 Curp 协议的，用于管理元数据的分布式 KV 存储。** 现有的分布式 KV 存储大多采用 Raft 共识协议，需要两次 RTT 才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。

但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个 RTT，从而提高性能。因此，**Xline 旨在实现高性能的数据访问和跨数据中心场景下的强一致性。**

### V0.4.0 版本有什么新功能？

基于此前 v0.3.0 中对于“建立在内存基础上的性能测试是否具有说服力”的质疑，我们在 v0.4.0 中对于 Xline 重新进行了基准测试。新版本特点、修复问题以及基准测试如下：

**特点：**

- 通过引入批处理机制提高网络带宽利用率；
- 为 CURP 共识协议实现快照功能；
- 实现快照相关 API，且与 etcdctl 兼容。其余 etcdctl 维护中的 API 会在未来实现。

**修复 bug:**

- 修正了在某些并发情况下命令会不按顺序执行的问题（问题#197），在 pr#195 中解决。
- 修正在基准测试过程中 gc 任务会 panic 的问题（问题#206），在 pr#210 中解决。
- 修正在某些情况下锁功能工作不正常的问题（问题#209），在 pr#212 中解决。
- 修正一些并发的投放请求会得到错误修订的问题（问题#209），在 pr#238 中解决。

**基准测试：**  
由于我们在 v0.3.0 中为 Xline 实现了持久性功能，我们在这个版本中对 Xline 重新进行了测试。基准测试报告可以在我们的 README 文件中的 **Performance Comparison** 部分查看。

## 欢迎参与到 Xline 项目中

我们欢迎任何对于 Xline 的积极贡献。目前在 GitHub 上有些任务并不需要深入了解 Curp 协议或 Xline 这个项目，只需要了解 API 和 Rust 语言即可。即使您现处于入门阶段，并想要在开源项目中使用 Rust 语言，社区也会提供指导和帮助，来引导您更好地参与项目。

目前 Xline 提供如下两个 first-good issue 供您参考：

- pr 256
  https://github.com/datenlord/Xline/issues/256
- pr 219
  https://github.com/datenlord/Xline/issues/219
  Xline 的建设需要每一位对此感兴趣且愿意付出的你们的参与，我们期待你们的加入。

## 相关链接

- GitHub: https://github.com/datenlord/Xline
- Curp 相关论文:  
  https://www.usenix.org/system/files/nsdi19-park.pdf
- Curp 相关文章:  
  https://medium.com/@datenlord/curp-revisit-the-consensus-protocol-384464be1600
- Xline 官网：www.xline.cloud

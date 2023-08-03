---
label: Xline v0.4.1：一个用于元数据管理的分布式KV存储
description: Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。
cover: ./cover.png
location: 中国香港
author: [达坦科技]
tags: [Xline]
---

![封面](./cover.png)

## Xline 是什么？我们为什么要做 Xline？

**Xline 是一个基于 Curp 协议的，用于管理元数据的分布式 KV 存储。** 现有的分布式 KV 存储大多采用 Raft 共识协议，需要两次 RTT 才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。

但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个 RTT，从而提高性能。因此，**Xline 旨在实现高性能的数据访问和跨数据中心场景下的强一致性。**

### V0.4.0 版本有什么新功能？

**v0.4.1 新版本功能、修复问题以及重构如下：**

**功能**

- 增加观察进度通知机制（issue#309），在 pr#278 中解决。

**修复错误**

- 修复一个 BUG #285，即在集成测试中，cmd_worker 会出现 panic，在 pr #286 中解决。
- 修复一个 BUG #291，即集成测试案例 "test_kv_authorization "在某些情况下会阻塞，在 pr #292 中解决。
- 修复一个 bug #252，即通过发送 SIGINT 信号终止 xline 客户端后，xline 客户端的工作会出现异常，在 pr #255 中解决。
- 修复 bug #284 和#303，即集成测试用例 "test_lock_timeout "会出现 panic，并且锁的验证测试会阻塞，在 pr #312 中解决。

**重构**

- 重构`XlineServer`，将一些巨大的结构和方法分解成小的结构和方法，提高可读性（issue#293），在 pr #294 中解决。
- 重构 curp 快速读取实现（issue#270），在 pr #297 中解决。
- 改进 "RocksSnapshot "的读写逻辑（issue#263），在 pr#264 中解决。
- 重构 watch 服务器的实现（issue#253），在 pr#262、#268、#278 中解决。
- 重构 kv 服务器的实现（issue#250），在 pr #260 中解决。
- 重构 lease 服务器的实现（issue#251），在 pr #276 中解决。
- 使用更好的方法来生成 stream（issue#248），在 pr #249 中解决。

## 欢迎参与到 Xline 项目中

我们欢迎任何对于 Xline 的积极贡献。目前在 GitHub 上有些任务并不需要深入了解 Curp 协议或 Xline 这个项目，只需要了解 API 和 Rust 语言即可。即使您现处于入门阶段，并想要在开源项目中使用 Rust 语言，社区也会提供指导和帮助，来引导您更好地参与项目。

目前 Xline 提供如下 4 个 good first issue：

1. Improve the readability of boot up errors in Xline #330
2. [Bug]: Wrong version from help #327
3. [Refactor]: Merge entries and batch_index #256
4. Use a unique propose id #219

Xline 的建设需要每一位对此感兴趣且愿意付出的你们的参与，我们期待你们的加入。

## 相关链接

- GitHub: https://github.com/datenlord/Xline
- Curp 相关论文:  
  https://www.usenix.org/system/files/nsdi19-park.pdf
- Curp 相关文章:  
  https://medium.com/@datenlord/curp-revisit-the-consensus-protocol-384464be1600
- Xline 官网：www.xline.cloud

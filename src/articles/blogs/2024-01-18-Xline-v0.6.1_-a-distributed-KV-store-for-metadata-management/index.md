---
label: Xline v0.6.1： 一个用于元数据管理的分布式KV存储
description: Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。
cover: ./cover.png
location: 新疆
author: [准备开社区会议的]
tags: [Xline]
---

![封面](./cover.png)

## Xline是什么？我们为什么要做Xline？

**Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。** 现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。

但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，**Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。**

## V0.6.1版本有什么新功能？

**v0.6.1新版本修复问题以及重构如下：**

**🪲修复问题**

- 修正了在成员变更过程中，更新节点地址可能会导致panic的错误。issue #531
- 修复 CI 过程中，因 ReadState 导致的 panic。issue #527
- 修正了旧版本中的一个已知问题：在执行 "添加成员 "后立即关闭群集会导致领导者无法正常关闭。issue #526
- 修正了 TXN 的冲突检测过程会忽略子请求的 key 的问题。issue #470
- 修正了在 watch 中因关闭通道而导致的panic问题。issue #370
  - pr 576：fix: fix ce event tx logs
  - pr 556：[Fix]: kv update channel panic
- 变更 ClusterVersion 的计算方式，避免 ClusterVersion 出现回绕。pr #590
- 修复了压缩操作在某些特定情况下会导致 panic 的 bug。pr #570

**🛠️ 重构**

- 重构了 Curp 客户端的实现，降低了代码复杂度：
  - pr 582: Refactor/curp client tests suits
  - pr 584: Refactor/curp client retry
  - pr 585: Refactor/replace curp client
- 重构 Xline 和 xline-client, 移除一些冗余的数据结构。pr #469

## 社区会议

为了更全面地向大家介绍Xline的进展，同时促进Xline社区的发展，我们将于**2024年1月27日北京时间上午10:00**召开**Xline社区会议**。

欢迎您届时**登陆zoom**观看直播：
**会议号**: 874 4309 5241
**密码**: 124294
**会议链接**：
https://zoom.us/j/87443095241?pwd=r3uJhJ9cb0caovHRsi1ay2pFuhBA1Q.1

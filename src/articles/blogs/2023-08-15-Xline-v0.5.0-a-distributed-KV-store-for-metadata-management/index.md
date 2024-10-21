---
label: Xline v0.5.0 一个用于元数据管理的分布式KV存储
description: Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。
cover: ./cover.png
location: 新加坡
author: [达坦科技]
tags: [Xline]
---

![图片](./cover.png)

## Xline是什么？我们为什么要做Xline？

**Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。** 现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。

但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，**Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。**

## V0.5.0版本有什么新功能？

**v0.5.0新版本功能、Bug修复以及Contributors如下：**

**⭐新功能**

- 实现了Compact功能，包括以下两个方面（有关Compact设计的更多详情，请阅读问题 #188）：
    - 实现了历史版本Compact功能。Compaction API 与 etcd 接口兼容。已在问题 #311 中解决
    - 实现了自动Compact模式，同时支持periodic策略和revision策略。默认情况下不启用。已在 pr #401 中解决
- 为 Xline 客户端（xline-client crate）提供 Rust SDK，以充分利用 CURP 协议的性能。目前，功能覆盖了  Watch、 Kv、 Maintenance、Auth、Lease、 Lock、Compaction
- 为 Xline 实现命令行工具，命名为 xlinectl。已在pr #348 中解决
- 支持单节点集群 #335
- 支持 Xline 的多平台：阅读 #doc 了解更多详情。
- 支持 Xline 集群的 dns 解析 #351
- 支持 grpc 健康检查协议：已在 pr #385 中解决
- 在 Curp 测试中添加 madsim 仿真 #282

**🪲Bug修复**

- Madsim Curp 集成测试有时失败 #361
- Lease服务器中的lease可能不同步 #343
- 修复事件监听器在特殊情况下会丢失事件的问题。#339
- 解决与序列化大小相关的测试失败问题。#259

**❤️ Contributors**

我们要感谢所有参与此版本发布的贡献者！

- @liubog2008
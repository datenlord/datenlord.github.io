---
label: Xline v0.2.0：一个用于元数据管理的分布式KV存储
description: Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。
cover: ./cover.png
location: 中国香港
tags: [Xline]
---

![封面](./cover.png)

## Xline 是什么？我们为什么要做 Xline？

**Xline 是一个基于 Curp 协议的，用于管理元数据的分布式 KV 存储。** 现有的分布式 KV 存储大多采用 Raft 共识协议，需要两次 RTT 才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。

但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个 RTT，从而提高性能。因此，**Xline 旨在实现高性能的数据访问和跨数据中心场景下的强一致性。**

### V0.2.0 版本有什么新功能？

在这个版本中，Xline 在上一版的基础上，与 ETCD 的多个 API 兼容，包括 Lease 服务和 Lock 服务。到目前为止，Xline 已经通过了主要功能的验证测试。新版本的改进包含以下内容：

- 特点：

  - 使 Xline 可以从配置文件`xline_server.conf`中启动(#145)
  - 支持 ETCD API，如 Lease API 和 Lock API (#142, #153)
  - 在 Curp 模块中启用恢复机制 (#146)
  - 增加 ETCD API 的兼容性测试

- 测试报告：  
  https://github.com/datenlord/Xline/blob/v0.2.0/VALIDATION_REPORT.md

- 修复 Bugs:
  - 修复基准测试中的 panic（#123）
  - 修复在`etcdctl`中观察到的修改 KV 对后会失败的问题(#148)

## 欢迎参与到 Xline 项目中

目前在 GitHub 上有些任务并不需要深入了解 Curp 协议或 Xline 这个项目，只需要了解 API 和 Rust 语言即可。这对那些想入门并在开源项目中使用 Rust 的人来说是很友好的。欢迎大家为 Xline 做贡献，社区也一定会为此提供指导和帮助。

## 相关链接

- GitHub: https://github.com/datenlord/Xline
- Curp 相关论文:  
  https://www.usenix.org/system/files/nsdi19-park.pdf
- Curp 相关文章:  
  https://medium.com/@datenlord/curp-revisit-the-consensus-protocol-384464be1600
- Xline 官网：www.xline.cloud

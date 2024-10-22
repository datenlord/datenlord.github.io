const p="/zh-cn/assets/cover-b2241eaf.png",e=[p],t={label:"Xline v0.7.0： 一个用于元数据管理的分布式KV存储",description:"Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。Curp 协议可以在命令不冲突的情况下减少一个RTT，从而提高性能。Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。",location:"新疆",cover:"./image.png",author:["达坦科技"],date:"2024-08-29",title:"Xline v 0.7.0   A Distributed KV Store for Metadata Management"},a=[],o=`<p><img src="${p}" alt="图片">
Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。</p>
<p>但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。</p>
<h1>V0.7.0版本有什么新功能？</h1>
<p>v0.7.0新版本修复问题以及重构如下：</p>
<p>⭐ 新功能</p>
<p>[Feature]CURP WAL (Write-Ahead-Log) 实现：我们设计了一个 Write-Ahead-Log 来保存 curp 的日志条目。</p>
<p>[Feature]重复数据删除：使用RIFL论文中的exactly-once语义实现命令重复数据删除。</p>
<p>[Feature]：快照恢复 #630</p>
<p>[Feature]：维护服务器接口#543</p>
<p>[Feature]：支持使用 tls 运行 #328</p>
<p>🛠️ 重构</p>
<p>[Refactor]：为自动更新lock lease添加会话结构#684</p>
<p>[Refactor]：启动流程#629</p>
<p>[Refactor]：重构speculative pool的GC #439</p>
<p>[Refactor]：新的命令执行逻辑：我们删除了cmd workers和相关的命令执行逻辑。现在，Xline 将使用串行执行（通过批处理）来防止锁争用。</p>
<p>[Refactor]：Garbage Collection：我们在dedup实现的基础上重构了garbage collection logic。</p>
<p>[Refactor]：客户端Proposal优化：我们重构了 curp 客户端，以使用 gRPC 流向集群发送提议。这降低了 gRPC 服务器的负载并提高了整体性能。</p>
<p>[Refactor]：冲突检测：我们删除了冲突检查的 mpmc。现在Xline将使用conflict pools（speculative pool和uncommitted pool）来检测命令冲突。</p>
<p>[Refactor]：Read Index：我们实现了 Raft 论文中的 Read Index 机制，用于只读命令。替换了之前的读取状态实现。</p>
<p>[Refactor]：xline-client 重构：我们为 xline-client crate 切换到更直观的用户界面。</p>
<p>[Refactor]：各种性能优化</p>
<p>🪲 错误修复</p>
<p>[Bug]：实现 ReadIndex #870</p>
<p>[etcdapi] [Bug]：重复revision #848</p>
<p>[Bug]：测试用例 curp::it server::shutdown_rpc_should_shutdown_the_cluster 失败 #774</p>
<p>[Bug]：Xline 在使用watch功能时会丢失事件#677</p>
<p>[Bug]：xlinectl 不会续订锁定密钥的lease #664</p>
<p>[Bug]：无法将新成员node4添加到三节点xline集群#661</p>
<p>[Refactor]：revision生成期间的只读命令#502</p>
<p>[Bug]：在读取状态期间执行时读取不同的值#501</p>
<p>[Bug]：sync txn 请求未按照子请求的顺序执行 #498</p>
<p>[Bug]：读取状态#497</p>
<p>[Bug]：revision生成#491、#848</p>
<p>[Bug]：单个 txn 中的请求不按顺序执行 #471</p>
<p>[Bug]：raw_curp中的batch_index最终会溢出#368</p>
<p>[Bug]：修复 GC 可能会破坏 CURP 持久性的问题 #159</p>
<p>✍️已知问题</p>
<p>在基准测试期间，如果集群处于高负载下，集群有时可能会由于重复数据删除机制而无法取得进展。</p>
<p>💥 重大变化</p>
<p>etcd 兼容 API 现在将使用 2-RTT 操作来防止revision生成问题。</p>
<p>❤️ 贡献者</p>
<p>我们要感谢所有参与此版本发布的贡献者！</p>
<p>@themanforfree</p>
<p>@iGxnon</p>
<p>@Phoenix500526</p>
<p>@bsbds</p>
<h1>相关链接</h1>`;export{e as assetURLs,o as default,t as metadata,a as toc};

const l="/zh-cn/assets/cover-eeda38bf.png",i=[l],t={label:"Xline v0.6.0:一个用于元数据管理的分布式KV存储",description:"Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。",cover:"./cover.png",location:"中国香港",author:["更新版本的"],tags:["Xline"],date:"2023-11-23",title:"Xline v0.6.0_ a distributed KV store for metadata management"},e=[{label:"Xline 是什么？我们为什么要做 Xline？",level:2},{label:"V0.6.0 版本有什么新功能？",level:2}],n=`<p><img src="${l}" alt="封面"></p>
<h2 id="xline-是什么？我们为什么要做-xline？">Xline 是什么？我们为什么要做 Xline？</h2>
<p><strong>Xline 是一个基于 Curp 协议的，用于管理元数据的分布式 KV 存储。</strong> 现有的分布式 KV 存储大多采用 Raft 共识协议，需要两次 RTT 才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。</p>
<p>但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个 RTT，从而提高性能。因此，<strong>Xline 旨在实现高性能的数据访问和跨数据中心场景下的强一致性。</strong></p>
<h2 id="v0.6.0-版本有什么新功能？">V0.6.0 版本有什么新功能？</h2>
<p><strong>v0.6.0 新版本功能、修复问题以及重构如下：</strong></p>
<p><strong>⭐ 新功能</strong></p>
<ul>
<li>为 CUPR 共识协议添加成员变更机制（详情请阅读设计文档 #306）</li>
<li>实现 cluster server 和 client #464、#465</li>
<li>实现优雅关机功能。</li>
<li>实现 xlinctl 与 xline 集群通信。目前，xlinectl 包括以下功能：
<ul>
<li>Compaction 和 member 命令：已在 pr #484 中实施</li>
<li>Txn、watch 和 lock 命令：在 pr #428 中实现</li>
<li>Role 命令：在 pr #427 中实现</li>
<li>User 命令 ：在 pr #426 中实施</li>
<li>Snapshot 和 auth 命令：在 pr #425 中实施</li>
<li>Delete 和 lease 命令：在 pr #424 中实施</li>
</ul>
</li>
</ul>
<p><strong>🪲Bug 修复</strong></p>
<ul>
<li>benchmark client 无法连接服务器 #462</li>
<li>删除模拟测试中的停止 #458</li>
<li>执行顺序错误 #454</li>
<li>检查领导者的密码 #435</li>
<li>移除 uncommitted pool 的恢复逻辑 #419</li>
<li>CURP TLA+ 法定人数大小计算和属性检查 #418</li>
<li>修复 propose 不处理同步错误 #407</li>
</ul>
<p><strong>🛠️ 重构</strong></p>
<ul>
<li>减少代码重复 #407</li>
<li>考虑 TLA+ 中请求广播的交错状态 #429</li>
<li>完善 bench client 的实现 #496</li>
<li>简化错误处理逻辑 #480</li>
<li>提高启动错误的可读性 #432</li>
<li>在执行和同步后引入命令序列化 #421, #422</li>
</ul>
<p>❤️ Contributors
@EAimTY
@MarkGaox
@Kikkon</p>
<p><strong>已知问题：</strong> 如果在添加成员后立即关闭群集，领导节点可能无法正常关闭，会不断尝试向关闭的新节点发送条目。详情请阅读 #526 号问题。</p>`;export{i as assetURLs,n as default,t as metadata,e as toc};

const l="/zh-cn/assets/cover-6865ae02.png",i=[l],e={label:"Xline v0.6.1： 一个用于元数据管理的分布式KV存储",description:"Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。",cover:"./cover.png",location:"新疆",author:["准备开社区会议的"],tags:["Xline"],date:"2024-01-18",title:"Xline v0.6.1: a distributed KV store for metadata management"},t=[{label:"Xline是什么？我们为什么要做Xline？",level:2},{label:"V0.6.1版本有什么新功能？",level:2},{label:"社区会议",level:2}],n=`<p><img src="${l}" alt="封面"></p>
<h2 id="xline是什么？我们为什么要做xline？">Xline是什么？我们为什么要做Xline？</h2>
<p><strong>Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。</strong> 现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。</p>
<p>但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，<strong>Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。</strong></p>
<h2 id="v0.6.1版本有什么新功能？">V0.6.1版本有什么新功能？</h2>
<p><strong>v0.6.1新版本修复问题以及重构如下：</strong></p>
<p><strong>🪲修复问题</strong></p>
<ul>
<li>修正了在成员变更过程中，更新节点地址可能会导致panic的错误。issue #531</li>
<li>修复 CI 过程中，因 ReadState 导致的 panic。issue #527</li>
<li>修正了旧版本中的一个已知问题：在执行 "添加成员 "后立即关闭群集会导致领导者无法正常关闭。issue #526</li>
<li>修正了 TXN 的冲突检测过程会忽略子请求的 key 的问题。issue #470</li>
<li>修正了在 watch 中因关闭通道而导致的panic问题。issue #370
<ul>
<li>pr 576：fix: fix ce event tx logs</li>
<li>pr 556：[Fix]: kv update channel panic</li>
</ul>
</li>
<li>变更 ClusterVersion 的计算方式，避免 ClusterVersion 出现回绕。pr #590</li>
<li>修复了压缩操作在某些特定情况下会导致 panic 的 bug。pr #570</li>
</ul>
<p><strong>🛠️ 重构</strong></p>
<ul>
<li>重构了 Curp 客户端的实现，降低了代码复杂度：
<ul>
<li>pr 582: Refactor/curp client tests suits</li>
<li>pr 584: Refactor/curp client retry</li>
<li>pr 585: Refactor/replace curp client</li>
</ul>
</li>
<li>重构 Xline 和 xline-client, 移除一些冗余的数据结构。pr #469</li>
</ul>
<h2 id="社区会议">社区会议</h2>
<p>为了更全面地向大家介绍Xline的进展，同时促进Xline社区的发展，我们将于<strong>2024年1月27日北京时间上午10:00</strong>召开<strong>Xline社区会议</strong>。</p>
<p>欢迎您届时<strong>登陆zoom</strong>观看直播：
<strong>会议号</strong>: 874 4309 5241
<strong>密码</strong>: 124294
<strong>会议链接</strong>：
<a href="https://zoom.us/j/87443095241?pwd=r3uJhJ9cb0caovHRsi1ay2pFuhBA1Q.1">https://zoom.us/j/87443095241?pwd=r3uJhJ9cb0caovHRsi1ay2pFuhBA1Q.1</a></p>`;export{i as assetURLs,n as default,e as metadata,t as toc};

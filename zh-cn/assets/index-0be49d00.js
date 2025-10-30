const e="/zh-cn/assets/cover-6865ae02.png",i=[e],l={label:"Xline v0.4.1：一个用于元数据管理的分布式KV存储",description:"Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。",cover:"./cover.png",location:"中国香港",author:["达坦科技"],tags:["Xline"],date:"2023-06-21",title:"Xline v0.4.1_ A distributed KV store for metadata management"},t=[{label:"Xline 是什么？我们为什么要做 Xline？",level:2},{label:"V0.4.0 版本有什么新功能？",level:3},{label:"欢迎参与到 Xline 项目中",level:2},{label:"相关链接",level:2}],s=`<p><img src="${e}" alt="封面"></p>
<h2 id="xline-是什么？我们为什么要做-xline？">Xline 是什么？我们为什么要做 Xline？</h2>
<p><strong>Xline 是一个基于 Curp 协议的，用于管理元数据的分布式 KV 存储。</strong> 现有的分布式 KV 存储大多采用 Raft 共识协议，需要两次 RTT 才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。</p>
<p>但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个 RTT，从而提高性能。因此，<strong>Xline 旨在实现高性能的数据访问和跨数据中心场景下的强一致性。</strong></p>
<h3 id="v0.4.0-版本有什么新功能？">V0.4.0 版本有什么新功能？</h3>
<p><strong>v0.4.1 新版本功能、修复问题以及重构如下：</strong></p>
<p><strong>功能</strong></p>
<ul>
<li>增加观察进度通知机制（issue#309），在 pr#278 中解决。</li>
</ul>
<p><strong>修复错误</strong></p>
<ul>
<li>修复一个 BUG #285，即在集成测试中，cmd_worker 会出现 panic，在 pr #286 中解决。</li>
<li>修复一个 BUG #291，即集成测试案例 "test_kv_authorization "在某些情况下会阻塞，在 pr #292 中解决。</li>
<li>修复一个 bug #252，即通过发送 SIGINT 信号终止 xline 客户端后，xline 客户端的工作会出现异常，在 pr #255 中解决。</li>
<li>修复 bug #284 和#303，即集成测试用例 "test_lock_timeout "会出现 panic，并且锁的验证测试会阻塞，在 pr #312 中解决。</li>
</ul>
<p><strong>重构</strong></p>
<ul>
<li>重构<code>XlineServer</code>，将一些巨大的结构和方法分解成小的结构和方法，提高可读性（issue#293），在 pr #294 中解决。</li>
<li>重构 curp 快速读取实现（issue#270），在 pr #297 中解决。</li>
<li>改进 "RocksSnapshot "的读写逻辑（issue#263），在 pr#264 中解决。</li>
<li>重构 watch 服务器的实现（issue#253），在 pr#262、#268、#278 中解决。</li>
<li>重构 kv 服务器的实现（issue#250），在 pr #260 中解决。</li>
<li>重构 lease 服务器的实现（issue#251），在 pr #276 中解决。</li>
<li>使用更好的方法来生成 stream（issue#248），在 pr #249 中解决。</li>
</ul>
<h2 id="欢迎参与到-xline-项目中">欢迎参与到 Xline 项目中</h2>
<p>我们欢迎任何对于 Xline 的积极贡献。目前在 GitHub 上有些任务并不需要深入了解 Curp 协议或 Xline 这个项目，只需要了解 API 和 Rust 语言即可。即使您现处于入门阶段，并想要在开源项目中使用 Rust 语言，社区也会提供指导和帮助，来引导您更好地参与项目。</p>
<p>目前 Xline 提供如下 4 个 good first issue：</p>
<ol>
<li>Improve the readability of boot up errors in Xline #330</li>
<li>[Bug]: Wrong version from help #327</li>
<li>[Refactor]: Merge entries and batch_index #256</li>
<li>Use a unique propose id #219</li>
</ol>
<p>Xline 的建设需要每一位对此感兴趣且愿意付出的你们的参与，我们期待你们的加入。</p>
<h2 id="相关链接">相关链接</h2>
<ul>
<li>GitHub: <a href="https://github.com/datenlord/Xline">https://github.com/datenlord/Xline</a></li>
<li>Curp 相关论文:<br>
<a href="https://www.usenix.org/system/files/nsdi19-park.pdf">https://www.usenix.org/system/files/nsdi19-park.pdf</a></li>
<li>Curp 相关文章:<br>
<a href="https://medium.com/@datenlord/curp-revisit-the-consensus-protocol-384464be1600">https://medium.com/@datenlord/curp-revisit-the-consensus-protocol-384464be1600</a></li>
<li>Xline 官网：<a href="http://www.xline.cloud">www.xline.cloud</a></li>
</ul>`;export{i as assetURLs,s as default,l as metadata,t as toc};

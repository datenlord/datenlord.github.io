const e="/zh/assets/cover-6865ae02.png",l=[e],t={label:"Xline v0.3.0：一个用于元数据管理的分布式KV存储",description:"Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。",cover:"./cover.png",location:"中国香港",author:["达坦科技"],tags:["Xline"],date:"2023-03-23",title:"Xline v0.3.0: A distributed KV store for metadata management"},i=[{label:"Xline 是什么？我们为什么要做 Xline？",level:2},{label:"V0.3.0 版本有什么新功能？",level:3},{label:"欢迎参与到 Xline 项目中",level:2},{label:"相关链接",level:2}],n=`<p><img src="${e}" alt="封面"></p>
<h2 id="xline-是什么？我们为什么要做-xline？">Xline 是什么？我们为什么要做 Xline？</h2>
<p><strong>Xline 是一个基于 Curp 协议的，用于管理元数据的分布式 KV 存储。</strong> 现有的分布式 KV 存储大多采用 Raft 共识协议，需要两次 RTT 才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。</p>
<p>但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个 RTT，从而提高性能。因此，<strong>Xline 旨在实现高性能的数据访问和跨数据中心场景下的强一致性。</strong></p>
<h3 id="v0.3.0-版本有什么新功能？">V0.3.0 版本有什么新功能？</h3>
<p>本版本主要改动为<strong>引入一个持久化层的内容</strong>，由于本身改动比较大，故单独提取一个版本出来，新版本的改进包含以下内容：</p>
<p><strong>特点：</strong></p>
<ul>
<li>实现一个持久化存储层，以实现持久性，包括：
<ul>
<li>实现一个存储引擎层来抽象出具体的存储引擎，比如 rocksdb，并启用上层存储功能（#185, #187）。</li>
<li>启用 Curp 和 Xline 的恢复机制（#194, #184）。</li>
</ul>
</li>
</ul>
<p><strong>修复 bug:</strong><br>
修复并发的 cmd 顺序错误（#197）</p>
<p>由于此前的存储都于内存中完成，因此如果进程崩溃了，数据恢复需要较长时间。基于此方面的考量，Xline 现在引入一个持久化层，会将数据存储到磁盘上。同样，基于此前收到的“建立在内存基础上的性能测试是否具有说服力”的质疑，经过仔细考量，我们决定在此基础上做一个 benchmark，结果预计会于 v0.3.1 中展示。</p>
<h2 id="欢迎参与到-xline-项目中">欢迎参与到 Xline 项目中</h2>
<p>我们欢迎任何对于Xline的积极贡献。目前在GitHub上有些任务并不需要深入了解Curp协议或Xline这个项目，只需要了解API和Rust语言即可。即使您现处于入门阶段，并想要在开源项目中使用Rust语言，社区也会提供指导和帮助，来引导您更好地参与项目。Xline的建设需要每一位对此感兴趣且愿意付出的你们的参与，我们期待你们的加入。</p>
<h2 id="相关链接">相关链接</h2>
<ul>
<li>GitHub: <a href="https://github.com/datenlord/Xline">https://github.com/datenlord/Xline</a></li>
<li>Curp 相关论文:<br>
<a href="https://www.usenix.org/system/files/nsdi19-park.pdf">https://www.usenix.org/system/files/nsdi19-park.pdf</a></li>
<li>Curp 相关文章:<br>
<a href="https://medium.com/@datenlord/curp-revisit-the-consensus-protocol-384464be1600">https://medium.com/@datenlord/curp-revisit-the-consensus-protocol-384464be1600</a></li>
<li>Xline 官网：<a href="http://www.xline.cloud">www.xline.cloud</a></li>
</ul>`;export{l as assetURLs,n as default,t as metadata,i as toc};

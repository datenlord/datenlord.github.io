const e=[],n={label:"Xline社区会议Call Up｜在 CURP 算法中实现联合共识的安全性",description:"为了更全面地向大家介绍Xline的进展，同时促进Xline社区的发展，我们将于2024年5月31日北京时间11:00 p.m.召开Xline社区会议。",location:"中国香港",date:"2024-05-23",title:"Xline Community Meeting Call Up Securing Joint Consensus in CURP Algorithm"},i=[{label:"社区会议主题",level:2},{label:"会议摘要",level:2},{label:"欢迎参与到 Xline 项目中：",level:2},{label:"目前 Xline 提供如下 Good First Issue：",level:2},{label:"Xline 近期文章参考：",level:2}],c=`<p>为了更全面地向大家介绍 Xline 的进展，同时促进 Xline 社区的发展，我们将于 <strong>2024 年 5 月 31 日北京时间 11:00 p.m.</strong> 召开 <strong>Xline 社区会议</strong>。</p>
<p>欢迎您届时登陆 zoom 观看直播，或点击“<strong>阅读原文</strong>”链接加入会议：<br>
<strong>会议号</strong>: 832 1086 6737<br>
<strong>密码</strong>: 411255<br>
<strong>会议链接：</strong><br>
<a href="https://zoom.us/j/83210866737?pwd=smuaVvF6Jm7i322ZUHCHzAcRAFK164.1">https://zoom.us/j/83210866737?pwd=smuaVvF6Jm7i322ZUHCHzAcRAFK164.1</a></p>
<h2 id="社区会议主题">社区会议主题</h2>
<p><strong>在 CURP 算法中实现联合共识的安全性</strong></p>
<h2 id="会议摘要">会议摘要</h2>
<p>Raft 支持两种成员变更方法：一种是单节点变更，另一种是联合共识。单节点变更似乎更简单，但会带来时效性问题，且在跨数据中心的情况下更为明显。在 3.4 版中，ETCD 还通过 ConfChangeV2 引入了对联合共识的支持。有鉴于此，我们决定为 Xline 实施联合共识。由于 Xline 使用 CURP 协议而非普通 Raft，因此实施联合共识要求我们不仅要考虑其对慢速路径的影响，还要考虑其对快速路径的影响。<strong>在这次社区会议上，我们将讨论 CURP 协议中联合共识的安全问题。</strong></p>
<h2 id="欢迎参与到-xline-项目中：">欢迎参与到 Xline 项目中：</h2>
<p>我们欢迎任何对于 Xline 的积极贡献。目前在 GitHub 上有些任务并不需要深入了解 Curp 协议或 Xline 这个项目，只需要了解 API 和 Rust 语言即可。即使您现处于入门阶段，并想要在开源项目中使用 Rust 语言，社区也会提供指导和帮助，来引导您更好地参与项目。</p>
<h2 id="目前-xline-提供如下-good-first-issue：">目前 Xline 提供如下 Good First Issue：</h2>
<p>[Feature]: Add exec command args for xlinectl watch command<br>
[Feature]: Add exec command args for xlinectl lock command<br>
[Refactor]: Remove request wrappers in xline-client<br>
[Refactor] refactor Xline ci process<br>
Refactor the LogEntryVecDeque in the log.rs</p>
<p>Xline 的建设需要每一位对此感兴趣且愿意付出的你们的参与，我们期待你们的加入。</p>
<h2 id="xline-近期文章参考：">Xline 近期文章参考：</h2>
<p><a href="http://mp.weixin.qq.com/s?__biz=MzkwNTMzOTE2MA==&#x26;mid=2247486637&#x26;idx=1&#x26;sn=c3093fdf9c232813bdb2f8b3074f8b65&#x26;chksm=c0f804daf78f8dccc993e4feae4a342b7cb0060a47c5f4ef9638e67617cdd3baa72b7a61c853&#x26;scene=21#wechat_redirect">Xline 0.7 重构性能分析总述</a><br>
本文讲解了 Xline 中重构后命令执行流程的新设计，以及我们是如何优化 Xline 的性能的。</p>
<p><a href="http://mp.weixin.qq.com/s?__biz=MzkwNTMzOTE2MA==&#x26;mid=2247486596&#x26;idx=1&#x26;sn=bbbc26fae833d70e1092a29d68673054&#x26;chksm=c0f804f3f78f8de52df345fe44f45d50f76ce254281ebf249e5d03be4a0823378dbbcb6a98e3&#x26;scene=21#wechat_redirect">Xline 中区间树实现小结</a><br>
本文讲解了如何引入区间树这一数据结构，来解决重构中的关键路径上的数据结构 Speculative Pool 和 Uncommitted Pool 导致的性能瓶颈问题。</p>
<p><a href="http://mp.weixin.qq.com/s?__biz=MzkwNTMzOTE2MA==&#x26;mid=2247486287&#x26;idx=1&#x26;sn=7424b730d2d19dd55f84644647e5c78c&#x26;chksm=c0f80338f78f8a2e076b0b530b7fd4362453da8fdc6eb790834822bb7175c0ef24471157dc08&#x26;scene=21#wechat_redirect">Xline command 去重机制（一）—— RIFL 介绍</a><br>
本文前半部分从 command 去重机制的契机开始，介绍了去重的必要性以及目前 Xline 的去重机制存在的一些问题。后半部分详细讲解了 RIFL 的工作原理，并对其进行了一些性能分析。</p>
<p><a href="http://mp.weixin.qq.com/s?__biz=MzkwNTMzOTE2MA==&#x26;mid=2247486575&#x26;idx=1&#x26;sn=a81f919f814a53a6ecf91f416f936d94&#x26;chksm=c0f80418f78f8d0eca242d3b46cee4cee5fa3f60e9df59d8fc9caa53a897b869df64dbe0d795&#x26;scene=21#wechat_redirect">Xline command 去重机制（二）—— RIFL 实现</a><br>
在 Xline 的 CURP 系统中，本文深入探讨了 RIFL 作为基础设施，为 RPC 提供 Exactly-Once 语义的实现及相关问题的解决方案</p>`;export{e as assetURLs,c as default,n as metadata,i as toc};

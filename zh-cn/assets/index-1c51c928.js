const t="/zh-cn/assets/image1-0b23a908.png",p=[t],o={label:"精彩回顾 | DatenLord Hackathon 2023圆满结束！",description:"DatenLord Hackathon 2023已经顺利完赛。达坦科技基于其跨云分布式文件系统DatenLord项目，结合AI大模型时代背景，搭建了擂台。我们邀请参赛者为DatenLord的极端场景设计并实现缓存 p2p 传输和同步模块。",location:"中国新疆",date:"2024-01-02",title:"Highlights I DatenLord Hackathon 2023 came to a successful conclusion!"},r=[{label:"评选结果",level:2},{label:"一等奖获奖点评",level:2},{label:"二等奖获奖点评",level:2},{label:"获奖快问快答",level:2},{label:"赛题路演直播预约",level:2}],n=`<p>DatenLord Hackathon 2023 已经顺利完赛。达坦科技基于其跨云分布式文件系统 DatenLord 项目，结合 AI 大模型时代背景，搭建了擂台。我们邀请参赛者为 DatenLord 的极端场景设计并实现缓存 p2p 传输和同步模块。</p>
<p>本届赛题为“Explore the Possibilities”，旨在为感兴趣的队伍提供平台发掘和实现自己的无限可能，同时探索项目的各种可能性。比赛吸引了众多对于 Rust 感兴趣且勇于探索敢于挑战的伙伴前来应战。大家源于五湖四海，各不相同的背景，齐聚于此进行思维的碰撞。达坦科技组赛题评审委员按照代码风格、测试完备性、文档完备性、解决方案设计四个维度进行综合评判，最终做出如下评审结果。</p>
<h2 id="评选结果">评选结果</h2>
<p><strong>一等奖</strong>：摆摆队
<strong>二等奖</strong>：阮老师小分队
<strong>三等奖</strong>：无</p>
<h2 id="一等奖获奖点评">一等奖获奖点评</h2>
<p><strong>一等奖，1000 美金：摆摆队-钟弋辰</strong></p>
<p><strong>评委会点评：</strong>
代码风格：3
测试完备性：3.5
文档完备性：4
解决方案设计：4</p>
<p><strong>综述：</strong> 摆摆队提出了一个比较全面的解决策略，涵盖了多种方法，并对各种方法进行了比较测试。文档方面，内容详尽，辅以图解，增强了理解度。然而，文档在突出问题关键和核心思想方面稍显不足，未能充分抓住题目的关键点。在代码规范方面，存在一定的可读性问题。一些复杂或潜在风险的代码段缺乏必要的注释说明，整体注释较少，代码清晰度有待提高。</p>
<p><strong>代码链接：</strong>
<a href="https://github.com/datenlord/Hackathon-2023/pull/3">https://github.com/datenlord/Hackathon-2023/pull/3</a></p>
<h2 id="二等奖获奖点评">二等奖获奖点评</h2>
<p><strong>二等奖，700 美金：阮老师小分队-吕波</strong></p>
<p><strong>评委会点评：</strong>
代码风格：3.5
测试完备性：2.5
文档完备性：3.5
解决方案设计：3</p>
<p><strong>综述：</strong> 文件分片传输以及使用 tracker 记录各节点的状态的思路很好，在文档中也提出了希望能实现但因时间紧迫而未能完成的特性。项目本身可以考虑在性能上做进一步优化，如序列化方案、网络协议、并发性等方面。相信如果有足够的时间，这个项目的完成度可以更高。</p>
<p><strong>代码链接：</strong>
<a href="https://github.com/datenlord/Hackathon-2023/pull/2">https://github.com/datenlord/Hackathon-2023/pull/2</a></p>
<h2 id="获奖快问快答">获奖快问快答</h2>
<ol>
<li><strong>为什么选择参加这次的 DatenLord Hackathon 活动？这次的赛题吸引你的点是什么？</strong></li>
</ol>
<p><strong>钟弋辰：</strong> 去年也参加了 datenlord 的赛题，去年的是一个单机数据结构的优化，这次的重点在分布式缓存上。最近读研也在做一些分布式计算和存储方面的工作，因此想尝试一下。赛题本身就是挺吸引我的一个点，因为缓存实际上要考虑很多东西，不同的负载模式，整体系统的资源情况，不同的方案实际上各有权衡。甚至后续进一步做优化有 idea 的话可以发一下论文。</p>
<p><strong>吕波：</strong> 本次 DatenLord Hackathon 活动提供了一个在深度学习研究方向上非常有趣并且吸引我的场景，在大模型数据集读取或者是大规模分布式训练的场景下，加速数据读取的速度。该赛题提供了一个非常直观的解决方案——利用 p2p 加速数据读取。我对分布式系统和数据访问加速的领域很感兴趣。</p>
<p>这次的赛题吸引我主要是因为它提出了一个在多云多数据中心场景下进行数据访问优化的挑战，并且需要设计和实现缓存之间的 p2p 传输和同步模块，这是一个具有挑战性且有实际应用意义的问题。该赛题也对我后期理解和实现分布式训练有很大的帮助，因此想要借助这个机会熟悉这方面的技术实现。</p>
<ol start="2">
<li><strong>在设计方案的时候一开始有想到哪些思路、或灵感？最后是如何做取舍的？</strong></li>
</ol>
<p><strong>钟弋辰：</strong> 总体来说一个优化点在如何知道缓存的位置，以更高效的命中缓存。另一个是缓存节点本身也是对外提供缓存的角色，如何均衡多个节点的资源和网络负载也是一个问题。还有一个问题是从少量节点将缓存扩展到多个节点这一过程，之前读过一篇阿里云镜像分发的论文，使用一些多级树形分发方法能更好的利用系统带宽。另外就是单机的缓存策略。另外也是去读了一些分布式缓存的论文，但是时间有限，看到的一些论文只考虑了数据的静态分布，还有很大的计算复杂度，这类论文感觉实际上意义不是很大，因为真实环境是动态变化的，而且需要在线的实时响应。另外涉及到数据写还可以考虑一些数据一致性的工作。</p>
<p>最终想的还是一个比较初步简单的思路，就是用中心节点来负责监控缓存位置以及调度缓存请求；对应到的是上述优化问题中的第一和第二个。同时进一步的优化可以考虑多个中心节点，以分摊中心节点的负载。</p>
<p><strong>吕波：</strong> 在设计方案的初期，我主要参考现有的一些现有的成熟 p2p 实现方案，包括：</p>
<p>（1）使用分布式哈希表（DHT）来管理缓存节点和文件信息的分布。</p>
<p>（2）使用 mDNS（多播 DNS）来实现节点的发现和通信。</p>
<p>（3）结合 gossip 协议，将节点的缓存信息广播出去，减少对中心化 tracker 的依赖。</p>
<p>（4）使用 HTTP 协议集成 Tracker 和 Node，方便测试和观察集群状态，并且支持局域网和广域网条件下的节点信息同步。</p>
<p>在现有技术的调研过程中，首先考虑了一个基于现有 p2p 基础库的方案，即使用 <a href="https://github.com/libp2p/rust-libp2p">libp2p-rust</a> 来实现节点发现，消息同步的机制。另外，也考虑使用原生 HTTP 的方式进行数据交互，即 Tracker-Node 的方式。我在做取舍时考虑到实现的难度、系统的可扩展性和性能等因素，决定先实现基本的 Tracker/Node 的方式支持数据访问，同时 Tracker 节点可以集成到任意的 Node 节点当中，并且后期可以通过 Datenlord 提供的分布式 KV 存储实现数据同步。当然，也便于理解和实现，以快速获得有效的结果。</p>
<ol start="3">
<li><strong>在具体设计和实现本次赛题的过程中，觉得最具挑战的部分是什么？后来是如何解决的？</strong></li>
</ol>
<p><strong>钟弋辰：</strong> 测试环境和实验设计吧，之前其实很不擅长做部署运维，很多时候都手动去操作，浪费很多时间，但在最近的学习过程中去探索了一下完整测试部署方案，使用 ansible 可以大大提高效率，也为最终整体项目打好了一个基础。中间还有一个是 docker 配置相关的，由于我采用了 quic udp 的协议，docker 配置相较于 tcp 有所不同，也是搜了很久才解决。实验设计的话，一开始是摸不着头脑的，后来就先做，然后采用循序渐进的方法，通过结合分析来暴露出 baseline 方法的不足。</p>
<p><strong>吕波：</strong> 在具体设计和实现本次赛题的过程中，我觉得最具挑战的部分是构建可靠的 p2p 传输协议和保证数据一致性。由于涉及到多个节点之间的通信和文件分片的管理，需要解决节点之间的同步和协作问题。为了解决这个挑战，我采取了以下措施：</p>
<p>（1）设计并实现了一个基于 HTTP（<a href="https://github.com/tokio-rs/axum">基于 axum 的异步 HTTP 库</a>）的 p2p 协议，确保节点之间能够高效地传输文件和同步信息。</p>
<p>（2）在节点中引入缓存机制，存储种子信息、分片信息、下载记录等，以提高数据访问速度和减轻后端持久化存储的读取压力。</p>
<p>（3）实现了心跳机制和定时线程，维护在线节点的列表，确保节点的可用性和协同工作。</p>
<p>通过上述几种方式，我能够通过简易的 HTTP 客户端查询集群的状态，并且能够调试节点的问题，最后也便于对整个集群系统进行性能测试。</p>
<ol start="4">
<li><strong>Hackathon 的完成时间非常紧迫，在最终提交的设计上，是如何做权衡的？你的设计最大的亮点是什么？</strong></li>
</ol>
<p><strong>钟弋辰：</strong> 总体工作一是要设计基本框架，包括整体系统的模块接口统一，模块间如何相互访问，利用宏来提高实现效率，每个模块对应的 rpc；二是实现具体模块：p2p，rpc 的封装；metric 中心节点观测模块；文件系统模拟 fsnode；缓存路由 cacherouter；仿真用户 sim_user；测试部署脚本。一部分工作是继承自我正在做的论文项目，也相对减轻了我这次比赛的工作量。</p>
<p>权衡的话就是没有实现一些进一步的优化了，比如单机缓存策略本来计划实现一下 s3-fifo；还有本来准备做一下多中心节点。</p>
<p>最大的亮点可能就是中心缓存路由这个思路吧，在实验上有一定的优势效果，总的来说其实也只是一个很简单的思路。</p>
<p><strong>吕波：</strong> 在 Hackathon 的完成时间非常紧迫的情况下，对于最终提交的设计，我主要针对核心功能点进行实现，以保证整体 pipline 能够按时完成，并且考虑一定的可扩展性便于后期的优化：</p>
<p>（1）确保基本功能的完整性和正确性，即实现缓存之间的 p2p 传输和同步模块。</p>
<p>（2）运用现有的 HTTP 协议进行接口设计和测试，以快速验证设计的可行性。</p>
<p>（3）着重实现核心特点，如代码模块清晰、功能复用、节点的上线和心跳维护、下载任务的分发等。</p>
<p>我认为我的设计最大的亮点是采用了 p2p-with-tracker 的方式，一方面这种方式可以快速融入到 Datenlord 的系统中，同时结合分布式 KV 存储支持数据访问结合了中心化的 tracker 节点和分布式的 p2p 传输，以实现高效的数据访问和加速，在系统稳定后基本上都可以从周围在线节点中获取，新增节点可以直接查到周围节点的分片并直接下载，避免直接向 S3 请求文件。最后，整体系统调试简单，部署复现也比较容易，方面后期对系统进行扩充和移植。</p>
<ol start="5">
<li><strong>参加此次 DatenLord Hackachon 活动，你有哪些收获或感受？</strong></li>
</ol>
<p><strong>钟弋辰：</strong> Rust 很棒，喜欢也很享受做这类优化研究结合工程实现的工作，但也是一个需要时间积累的过程。另外感觉参与的人比较少，希望能有更多小伙伴喜欢这门语言，参与相关的工作。</p>
<p><strong>吕波：</strong> 非常荣幸能够参与到 Datenlord 此次比赛当中，并且结合当下热点问题进行赛题设计，另外还简化了部分任务方便我快速上手。在我目前的研究方向中，也曾经考虑过分布式并行训练的一些问题，此次赛题也给我提供了很大的思考价值，也让我对分布式系统和数据访问加速领域有了更深入的了解。</p>
<p>在项目实现上，参加本次 Hackathon 让我在有限的时间内面对挑战并解决问题的能力得到了锻炼和提升，在此次比赛中，由于参与该项目时间较晚，准备工作可能不是非常充分，需要在实践的过程中学习 Rust 相关的领域知识和 p2p 的技术实现，学会如何在紧迫的时间限制下进行设计和实现，并在压力下保持高效率和创造力。</p>
<p>参加 DatenLord Hackathon 活动是一次充满挑战和收获的经历。我从中学到了许多宝贵的经验和知识，这将对我的个人和职业发展产生积极的影响，也希望能够有机会持续参与到 Datenlord 的社区贡献当中，继续深挖领域知识～</p>
<h2 id="赛题路演直播预约">赛题路演直播预约</h2>
<p>赛题路演直播预约</p>
<p>最终获得优胜奖的两支队伍，将于 <strong>2024 年 1 月 7 日(周日) 上午 10:30</strong> 在线上举办一场<strong>空中路演</strong>。欢迎所有的参赛队伍和对赛题感兴趣的伙伴，届时参与聆听获奖小组的分享。分享包括他们的解题思路，碰到的难点和挑战，以及如何应对的方法和设计亮点。</p>
<p>欢迎您预约直播，或者登陆腾讯会议观看直播：</p>
<p>会议号：729 465 619</p>
<p><img src="${t}" alt="图片"></p>`;export{p as assetURLs,n as default,o as metadata,r as toc};
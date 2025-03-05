const n="/zh-cn/assets/cover-c938ebe8.png",t="/zh-cn/assets/image1-066975ee.jpg",s="/zh-cn/assets/image2-e06d2b7a.jpg",e=[n,t,s],u={label:"倒计时3天 I 4.8 Beijing Rust Meetup",description:"对Rust编程语言感兴趣的你准备好相聚进行一场头脑风暴了吗？赶快预约报名参与本周六下午的线下Meetup。一起和来自达坦科技、南京大学、CloudWeGo、华为等的技术专家来探讨Rust作为一种强调性能、安全和并发性的编程语言的各种应用和实践。我们的主题是Rust 💡X，意在探讨用Rust编程语言“点亮”的任何应用、实践，和探索Rust的无限可能性。",cover:"./cover.png",location:"中国香港",date:"2023-04-05",title:"Beijing Rust Meetup"},o=[{label:"嘉宾及议题介绍（Guests & Topics）",level:2},{label:"Meetup 报名方式 （Registration）",level:2}],R=`<p>对 Rust 编程语言感兴趣的你准备好相聚进行一场头脑风暴了吗？赶快预约报名参与<strong>本周六下午</strong>的线下 Meetup。一起和来自达坦科技、南京大学、CloudWeGo、华为等的技术专家来探讨 Rust 作为一种强调性能、安全和并发性的编程语言的各种应用和实践。我们的主题是 <strong>Rust 💡X</strong> ，意在<strong>探讨用 Rust 编程语言“点亮”的任何应用、实践，和探索 Rust 的无限可能性。</strong></p>
<p><strong>时间：</strong> 2023 年 4 月 8 日 14:00<br>
<strong>地点：</strong> 环球财讯中心 M 层 北京市西城区宣武门外大街甲 1 号</p>
<h2 id="嘉宾及议题介绍（guests-&#x26;-topics）">嘉宾及议题介绍（Guests &#x26; Topics）</h2>
<p><strong>嘉宾：冯洋 南京大学计算机科学与技术系助理研究员</strong><br>
<strong>议题：基于实际场景应用分析的 Rust 库模糊测试技术报告</strong><br>
<strong>摘要：</strong> Rust 是一种承诺内存安全和并发安全的语言，而各类 Rust 库中 API 的漏洞与缺陷可能会对所有使用该库的程序产生影响。因此，保障 Rust 库的安全性与可靠性是一个极为重要的问题。为了进一步保障 Rust 库的安全，通过模糊测试来对 Rust 的库进行测试是一个可行方法。在本报告中，我们提出了一种依靠现有 Rust 生态系统来生成模糊测试目标的方法，该方法利用 MIR 解析待测库所在生态系统中的项目，找到现实中 API 之间的调用和依赖关系，从而从中提取出待测库的 API 序列，依此生成 Rust 库的模糊测试目标。</p>
<p><strong>嘉宾：施继成 达坦科技联合创始人兼 CTO</strong>
<strong>议题：在 Linux 6.2 中用 Rust 语言写驱动</strong><br>
<strong>摘要：</strong> Linux 在 6.1 中加入了 rust 语言的支持，自此开发者可以使用 Rust 语言进行 Linux 内核驱动开发。因为 Rust 语言的安全性，未来驱动的开发工作使用 Rust 语言将成为必然趋势。虽然 Rust 语言的支持还有许多不完善的地方，但不妨碍我们“吃螃蟹”——使用 Rust 语言写一个 Linux 驱动。本次分享将：1. 介绍 Linux 系统的 Rust 语言支持。2. 以 Linux 上的简单 Driver 举例，说明如何用 Rust 写驱动。3. 分析 Rust 在 Linux 中工作的原理。4. 列举 Rust 进行驱动编写时的限制。5. 给出使用 Rust 编写驱动的 Guideline。</p>
<p><strong>嘉宾：叶天星 华为技术有限公司</strong><br>
<strong>议题：用 Rust 实现 Git 传输协议、Git 对象解析和数据库存储</strong><br>
<strong>摘要：</strong> 本次分享将包含：1. 使用 Rust 实现 Git 传输协议 - Git 传输协议是一种用于 Git 客户端和服务器之间进行通信的协议，有两种实现方式：HTTP 和 SSH。Git 传输协议可以确保数据传输的安全性和可靠性，并且能够高效地处理大量的数据。通过使用 Rust，可以轻松地实现 Git 客户端和服务器之间的数据传输，并确保高效的网络通信和数据安全性。2. Git 存储结构介绍 - Git 使用了一种称为对象存储的方式来存储代码版本信息。Git 对象有四种类型：blob、tree、commit 和 tag。</p>
<p><strong>嘉宾：茌海 CloudWeGo Monoio 项目负责人</strong><br>
<strong>议题：Monoio：一个基于 io-uring 的 Rust Runtime</strong><br>
<strong>摘要：</strong> 尽管 Tokio 目前已经是事实标准，但要实现极致性能的网络中间件还有一定距离。为了这个目标，我们探索基于 io-uring 为 Rust 提供异步支持，并与社区同学合作在此基础上研发通用网关。本次分享将包括：1. 介绍 Rust 异步 Runtime；2. Monoio 的一些设计精要；3. Runtime 对比选型与应用；4. Rust 异步编程常见的问题与解法。</p>
<p><strong>嘉宾：张汉东 资深 Rust 专家、高级 Rust 咨询师、《Rust 编程之道》作者、Rust 中文社区布道者</strong><br>
<strong>议题：理解 Unsafe Rus</strong><br>
<strong>摘要：</strong> 众所周知， Rust 语言包含 Safe Rust 和 Unsafe Rust 两大部分。而 Unsafe Rust 是 Safe Rust 的超集。这意味着所有在 Safe Rust 中编写的代码也可以在 Unsafe Rust 中正常工作，但 Unsafe Rust 提供了额外的功能和操作，这些在 Safe Rust 中是无法直接使用的。但正是因为有 Unsafe Rust 的存在，所以在社区最常被问到的一个问题是：为什么标准库中大量使用了 Unsafe Rust 还说 Rust 是安全语言呢？本次分享的目标就是带现场观众系统地认识 Unsafe Rust ，真正地理解 Unsafe Rust 的妙用。顺便也针对 Reddit 热贴 《Zig 比 Unsafe Rust 更加安全》中的观点进行讨论。</p>
<p><img src="${t}" alt="图片"></p>
<h2 id="meetup-报名方式-（registration）">Meetup 报名方式 （Registration）</h2>
<p>欢迎扫描下方二维码或点击<a href="https://mp.weixin.qq.com/s?__biz=MzkwNTMzOTE2MA==&#x26;mid=2247485346&#x26;idx=2&#x26;sn=247d692751f44af2aa40b9b111a63b0f&#x26;chksm=c0f80fd5f78f86c3ac87ebcc18ba8cff35fe5cbe293812a00b57fd3e5ace24589ae790ee805a&#x26;token=1669647894&#x26;lang=zh_CN#rd">阅读原文</a>，即可报名。</p>
<p><img src="${s}" alt="图片"></p>`;export{e as assetURLs,R as default,u as metadata,o as toc};

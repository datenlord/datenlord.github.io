const e="/zh/assets/image1-d5e6eb74.jpg",t="/zh/assets/image2-5d4b8e33.jpg",s="/zh/assets/image3-a4b62ce6.jpg",a=[e,t,s],p={label:"创造性地精细造车轮：RDMA的Rust安全实践",description:"极客时间打造的QCon+案例研习社以案例讲解视频、主题直播、社群交互结合的全新线上学习模式，为数字化人才提供利用碎片化时间来提升知识和技能的平台",location:"新加坡",date:"2022-07-28",title:"Creatively fine tuned wheels: RDMA's Rust safety practices"},i=[{label:"讲解回顾",level:2},{label:"达坦宗旨",level:2},{label:"联系我们",level:2},{label:"推荐阅读",level:2}],n=`<p>极客时间打造的 QCon+案例研习社以案例讲解视频、主题直播、社群交互结合的全新线上学习模式，为数字化人才提供利用碎片化时间来提升知识和技能的平台。</p>
<h2 id="讲解回顾">讲解回顾</h2>
<p>达坦科技联合创始人施继成受邀作为案例研习社的讲师，近日分享了达坦实用的、可落地的 Rust 技术应用开发经验和实践案例，介绍了达坦是如何使用以安全性著称的系统编程语言—Rust 去封装 RDMA 接口以达到安全高效的目的。</p>
<p><img src="${e}" alt="图片"></p>
<p>在分享中，施继成简单介绍了 Rust 语言的三大特性。首先，Rust 语言的所有权（ownership）和借用（borrowing）机制对内存管理友好。这一特性非常严格地控制了如果一个内存被大家共享的时候的访问权限和边界。</p>
<p>其次，Rust 提供了很方便的异步编程接口。它有 Async 和 Await 两个关键词，同时在它的标准库中有 Futures 的完整的接口支持。因此，Rust 天生支持异步 I/O 编程接口。</p>
<p>最后，Rust 还支持零成本抽象。也就是说，在程序构建的过程中，它能提供一个比较高的抽象层，但是抽象层又不会带来性能损失。这带来两大优势: 第一，在构建程序的时候，得以用到比较高级的抽象层，减少了代码冗余；第二，又不会因为抽象层带来性能的损失，因为编译器已经帮忙将抽象展开。鱼和熊掌，两者兼得。</p>
<p>就 RDMA 的 Rust 封装设计，施继成认为由于重写 RDMA 的 ibverbs 库工作量大，又不能把 Rust 的一些先进的理念直接带进库当中，因此选择把 ibverbs 上层封装出来的接口上再封装更高级的抽象层，以此让 Rust 程序能够直接调用它不失为更明智的选择。</p>
<p>他还介绍了一个 Rust binding 的生成工具——Bindgen。Bindgen 会自动地根据 C 语言去生成对应的 Rust 语言的转换接口。但一键式的工具也有局限性，譬如：它没有办法恰当地处理嵌套的数据结构，生成出来的数据结构晦涩难懂，在它的命名上都失去了原来的语义。因此，需要进行一些人工的干预，来帮助自动生成工具，把想要的 RDMA 的 Rust Binding 生成出来。其实，直接使用这个库可以进行 RDMA 编程，这和直接用 C 语言去写没有本质区别。所以，一些以往碰到的问题，比如裸指针还是会出现。</p>
<p>最后，施继成结合达坦的实践经验，从技术层面详细分享了如何用 Rust 语言去解决多线程的安全问题、异步接口、以及内存资源管理。Rust 语言的天然保护性，无疑给多任务，多个线程过程中共享的 RDMA 内存加了一把保护锁。然后，他进一步比较了同步接口和异步接口的优劣，强调语言级别的异步操作能够绕过操作系统，而去进行轻量级的任务切换，通过这样的方式，以达到在高吞吐的 I/O 操作当中，也能够得到比较好的性能的开销。此外，他强调远端的内存管理和本地的内存管理同等重要，以及资源释放的管理问题。</p>
<h2 id="达坦宗旨">达坦宗旨</h2>
<p>而以上实践中思考和设计的逻辑始终是从终端用户的角度出发，希望简化用户使用的难度，并且避免用户使用上的一些错误和安全性的问题。既然身负的是非常底层的造车轮的任务，那就要创造性地精耕细做，努力把车轮造得好一些。</p>
<p>欲了解此次分享中具体的技术细节和设计要点，请点击以下链接，领取极客时间 7 天会员，免费观看完整视频：<br>
<a href="https://time.geekbang.org/activity/promo?page_name=page_447">https://time.geekbang.org/activity/promo?page_name=page_447</a></p>
<p>有意观看完整视频，请扫如下的二维码：</p>
<p><img src="${t}" alt="图片"></p>
<h2 id="联系我们">联系我们</h2>
<p>欢迎参与达坦科技开源项目 async-rdma，Github 链接：<a href="https://github.com/datenlord/async-rdma">https://github.com/datenlord/async-rdma</a></p>
<p>有意加入 Rust 前沿交流讨论群，请扫如下的二维码</p>
<p><img src="${s}" alt="图片"></p>
<h2 id="推荐阅读">推荐阅读</h2>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzkwNTMzOTE2MA==&#x26;mid=2247484456&#x26;idx=1&#x26;sn=5f6a6714edeec6444d774b680ddad4ab&#x26;chksm=c0f80c5ff78f8549bb4778146c9a431a7872a0f77bcf7e817c36120ebc3b9a52e48abdce4719&#x26;scene=21#wechat_redirect">创业公司为什么要选 Rust 做 RDMA 库？Understanding Functor in Rust</a></p>`;export{a as assetURLs,n as default,p as metadata,i as toc};

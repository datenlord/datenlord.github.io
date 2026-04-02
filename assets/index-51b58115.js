const p="/assets/cover-4fd6b43d.png",t="/assets/image1-bf4f8777.png",o="/assets/image-d0c27c17.png",s=[p,t,o],r={label:"开源周报第十期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第9篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2026-03-13",title:"open source weekly report issue 10"},n=[{label:"01 本周进展",level:2},{label:"02 下周规划",level:2}],e=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第10篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库：</p>
<p><a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="01-本周进展">01 本周进展</h2>
<p>核心目标：多节点通信稳定性改进，文档国际化</p>
<ol>
<li>CSR 通信协议优化 (commit: c9d6491)</li>
</ol>
<p>问题：多节点场景下 UDP 通信存在丢包和乱序问题，影响 CSR 寄存器读写可靠性</p>
<p>修复方案：</p>
<p>CSR 通信从 UDP 切换到 TCP</p>
<p>确保多节点仿真场景下的通信可靠性</p>
<p>统计：2 个文件，+379/-286 行</p>
<ol start="2">
<li>Producer Ringbuffer 优化 (commit: 7da483c)</li>
</ol>
<p>延迟读取 CSR 寄存器，减少不必要的 IO 操作</p>
<p>统计：1 个文件，+12/-4 行</p>
<ol start="3">
<li>文档重构与国际化 (commits: d7c7a74, 2ecd0f3, f63630e)</li>
</ol>
<p>分离中英文文档目录（docs/zh-CN/ 和 docs/en/）</p>
<p>完成核心文档英文翻译（introduction、installation、rtl-simulation）</p>
<p>新增 5 篇技术细节英文文档</p>
<p>统计：83+ 个文件，+3000+ 行</p>
<ol start="4">
<li>RTL Bug 调试</li>
</ol>
<p>仿真测试中发现 RTL 死锁问题</p>
<p>已定位问题根因，待下周修复</p>
<h2 id="02-下周规划">02 下周规划</h2>
<p>修复 RTL 死锁 bug</p>
<p>Loopback 硬件测试验证</p>
<p>多节点仿真稳定性测试</p>
<p><img src="${t}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${o}" alt="图片"></p>`;export{s as assetURLs,e as default,r as metadata,n as toc};

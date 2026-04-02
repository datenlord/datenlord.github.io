const o="/assets/cover-4fd6b43d.png",p="/assets/image1-bf4f8777.png",t="/assets/image-d0c27c17.png",s=[o,p,t],e={label:"开源周报第十二期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第12篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2026-03-26",title:"open source weekly report issue 12"},r=[{label:"01 本周进展",level:2},{label:"02 下周规划",level:2}],a=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第10篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库：</p>
<p><a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="01-本周进展">01 本周进展</h2>
<p>核心目标：测试框架完善，perftest 集成</p>
<ol>
<li>Base Test 改进 (commit: 6a4bae8)</li>
</ol>
<p>目标：改进 loopback 测试的内存布局和多轮测试支持</p>
<p>变更内容：</p>
<p>重构内存布局：采用 [src_0][dst_0][src_1][dst_1]... 模式支持多轮测试</p>
<p>为每轮测试生成不同的数据模式，便于验证数据正确性</p>
<p>改进代码格式和可读性</p>
<p>统计：1 个文件，+90/-42 行</p>
<ol start="2">
<li>Perftest Mock 测试集成 (commits: 9f0a3cf, 5c65c83)</li>
</ol>
<p>目标：在 mock 模式下运行 perftest，便于开发调试</p>
<p>变更内容：</p>
<p>添加 mock_test.sh 脚本支持 mock 模式测试</p>
<p>添加 loopback_mock.sh 脚本支持 loopback 仿真测试</p>
<p>添加 sim_test.sh 仿真测试脚本</p>
<p>改进 pagemaps.rs 中的页表映射处理</p>
<p>统计：8 个文件，+162/-22 行</p>
<ol start="3">
<li>Perftest Loopback 支持 (针对 perftest 的特化修改)</li>
</ol>
<p>背景：当前驱动不支持两个进程同时共享同一 RDMA 网卡，因此需要在单进程内实现 loopback 测试</p>
<p>变更内容：</p>
<p>在 write_bw 中添加单进程 loopback 测试模式（commit: 2496255）</p>
<p>修复 loopback 模式下的 PMTU 配置问题（commit: 59a79a1）</p>
<p>统计：7 个文件，+323/-36 行</p>
<h2 id="02-下周规划">02 下周规划</h2>
<ol>
<li>硬件验证</li>
</ol>
<p>完成 RTL 死锁修复的上板综合，验证时序收敛</p>
<p>进行硬件 loopback 测试，验证死锁修复后的功能正确性</p>
<ol start="2">
<li>性能测试</li>
</ol>
<p>使用 perftest loopback 模式进行基准测试</p>
<p>收集带宽、延迟等关键性能指标</p>
<p><img src="${p}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${t}" alt="图片"></p>`;export{s as assetURLs,a as default,e as metadata,r as toc};

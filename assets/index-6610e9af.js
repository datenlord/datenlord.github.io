const o="/assets/cover-4fd6b43d.png",p="/assets/image1-bf4f8777.png",t="/assets/image-d0c27c17.png",e=[o,p,t],l={label:"开源周报第三期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第三篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2025-12-25",title:"open source weekly report issue 3"},a=[{label:"DatenLord 2025 GPU性能优化大赛分享会",level:2},{label:"本周进展",level:2},{label:"发现的关键问题",level:2},{label:"下周规划",level:2},{label:"本周总结",level:2}],i=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第三篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库：<a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="datenlord-2025-gpu性能优化大赛分享会">DatenLord 2025 GPU性能优化大赛分享会</h2>
<p>为将本次大赛中的宝贵经验与更多开发者共享，我们特筹备线上专题分享会。本周五（12月26日）晚8点，我们将举办线上专题分享会。</p>
<p>本次大赛的三位优胜者 Kiid-A、caic99 和 daju233 将亲临线上，依次揭秘他们的优化心路历程，从第一版方案的设计思路，到后续的调整优化与困惑，全方位分享实战经验。随后，评委将结合大赛结果进行深度点评与分享。</p>
<p>具体参考：从结果到思路：GPU性能优化赛优胜者技术分享会即将来袭</p>
<p>欢迎预约直播，或直接登陆腾讯会议观看：
会议号：181-113-938</p>
<p>我们周五晚上见！</p>
<h2 id="本周进展">本周进展</h2>
<p>本周核心目标：完善RCCL仿真模式测试框架，修复发现的bug，推进高压测试稳定性</p>
<p>本周主要围绕RCCL仿真模式测试展开工作，建立了完善的测试框架，发现并修复了多个关键bug，但在高压测试中遇到了仿真器稳定性问题。</p>
<ol>
<li>建立基础测试框架 (commit: 0c3e32a)</li>
</ol>
<p>实现：</p>
<p>创建统一测试脚本，支持基本的一键运行</p>
<p>实现test_common.sh，包含信号处理、仿真器管理、日志收集</p>
<p>为RCCL和基础测试创建专用脚本</p>
<p>当前状态：</p>
<p>框架初步可用，但功能有限</p>
<p>需要进一步完善错误处理和测试验证</p>
<ol start="2">
<li>修复基础测试中的状态机问题 (commit: ca025d5)</li>
</ol>
<p>问题描述：</p>
<p>回环测试（loopback）中的RDMA连接状态机实现不正确</p>
<p>缺少从INIT到RTR再到RTS的完整状态转换</p>
<p>静态缓冲区分配无法适应不同大小的传输需求</p>
<p>修复内容：</p>
<p>在loopback.c中实现了完整的RC连接状态机：</p>
<p>正确实现了INIT→RTR→RTS的状态转换</p>
<p>添加了状态检查和错误处理</p>
<p>支持动态缓冲区分配，根据传输大小申请适当内存</p>
<p>优化了send_recv.c中的缓冲区管理</p>
<p>效果：</p>
<p>基础测试现在能正确建立RC连接</p>
<p>支持更大规模的数据传输测试</p>
<p>为发现仿真器高压问题提供了测试基础</p>
<ol start="3">
<li>修复虚拟地址到物理地址转换问题 (commit: d75e3b4)</li>
</ol>
<p>问题：仿真模式下virt_to_phys_range函数无法正确翻译地址</p>
<p>解决：测试程序需要sudo权限读取/proc/self/pagemap</p>
<p>状态：已修复</p>
<ol start="4">
<li>实现匿名大页检测功能 (commit: 7590fc1)</li>
</ol>
<p>背景：</p>
<p>驱动要求注册的MR必须使用2MB大页内存</p>
<p>需要验证RCCL通过hack_libc分配的内存确实是大页</p>
<p>实现内容：</p>
<p>在rdma_utils/pagemaps.rs中实现了check_addr_is_anon_hugepage函数</p>
<p>通过读取/proc/self/pagemap检查指定地址是否为匿名大页</p>
<p>在内存注册时增加大页验证，非大页内存拒绝注册</p>
<p>意义：</p>
<p>确保RCCL测试使用的内存满足驱动要求</p>
<p>提前发现内存分配问题，避免后续运行错误</p>
<h2 id="发现的关键问题">发现的关键问题</h2>
<ol>
<li>仿真器高压稳定性问题</li>
</ol>
<p>现象： 在高压运行普通sim测试（传输2MB数据）时，仿真器出现断言失败：</p>
<pre><code>INFO cocotb: ImmAssert failed in mkBsvTopWithoutHardIpInstance.topLevelDmaChannelMux @time=18331000: "/home/peng/projects/rdma_all/open-rdma-rtl/src/FullyPipelineChecker.bsv", line 118, column 25
INFO cocotb: -- DataStream checkFullyPipeline Failed:
name = mkTopLevelDmaChannelMux muxInst write, lastBeatCnt=9140, curBeatCnt=9163, delta=23
</code></pre>
<p>分析：</p>
<p>checkFullyPipeline检查失败，DMA通道的数据流出现了23个beat的差异</p>
<p>可能是流水线控制逻辑在高负载下出现竞争条件</p>
<p>暂时关闭fullcheck检查后，测试可以运行但1小时未完成</p>
<p>后续计划：</p>
<p>调研cocotb仿真器行为，确认是否是仿真器代码问题</p>
<p>调试硬件RTL代码，检查流水线控制逻辑</p>
<p>分析高压场景下的时序和竞争条件</p>
<ol start="2">
<li>NCCL重复注册MR问题</li>
</ol>
<p>问题：</p>
<p>NCCL会注册两个映射到同一个物理页的MR</p>
<p>这会导致同一个物理页面被重复pin/unpin</p>
<p>可能影响硬件的MTT和PGT管理逻辑</p>
<p>当前状态：</p>
<p>已初步修改代码避免重复pin/unpin同一物理页面</p>
<p>可能需要调整向硬件注册MTT和PGT的逻辑</p>
<p>修改后的代码还需要进一步验证正确性</p>
<ol start="3">
<li>Post Recv WR时找不到QP问题</li>
</ol>
<p>现象：</p>
<p>在post接收WR时系统提示找不到对应的QP</p>
<p>但QP明明在前面已经成功注册过</p>
<p>可能是QP查找逻辑或状态管理存在问题</p>
<p>后续计划：</p>
<p>深入调试QP管理代码</p>
<p>检查QP生命周期管理和查找逻辑</p>
<h2 id="下周规划">下周规划</h2>
<h4>短期任务（最高优先级）</h4>
<ol>
<li>解决仿真器高压稳定性问题</li>
</ol>
<p>深入分析checkFullyPipeline失败的根因</p>
<p>测试cocotb仿真器行为</p>
<ol start="2">
<li>完成RCCL sim模式测试</li>
</ol>
<p>修复NCCL重复注册MR问题</p>
<p>验证当前修改的正确性
完善MTT/PGT注册逻辑
解决post recv时找不到QP问题
定位找不到QP的根本原因
修复QP状态管理或查找逻辑</p>
<h4>中期任务</h4>
<ol>
<li>完善测试框架</li>
</ol>
<p>增加更多测试用例和场景</p>
<p>实现测试结果自动验证</p>
<p>添加性能基准测试</p>
<ol start="2">
<li>推进RCCL完整功能支持</li>
</ol>
<p>在所有bug修复完成后，验证RCCL完整功能</p>
<p>支持更多collective操作测试</p>
<h4>长期任务</h4>
<ol>
<li>Driver 重构</li>
</ol>
<p>优化代码架构，提升可维护性</p>
<p>重构核心模块，使得模块对外接口更为简洁同时正确处理错误</p>
<ol start="2">
<li>GPU 内存注册支持</li>
</ol>
<p>调研 dma-buf 内核接口的实现细节</p>
<p>设计内核模块中的 GPU 内存映射机制</p>
<p>实现 ibv_reg_dmabuf_mr verbs 支持</p>
<h2 id="本周总结">本周总结</h2>
<p>本周继续推进在RCCL在驱动的仿真模式下的测试：</p>
<p>成果：</p>
<p>建立了基础测试框架，支持简单的一键运行</p>
<p>修复了基础测试中的状态机问题</p>
<p>实现了匿名大页检测</p>
<p>发现了仿真器高压稳定性问题</p>
<p>挑战：</p>
<p>仿真器在高压测试下出现流水线检查失败，需要深入调试</p>
<p>NCCL重复注册和QP查找问题需要进一步分析</p>
<p><img src="${p}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${t}" alt="图片"></p>`;export{e as assetURLs,i as default,l as metadata,a as toc};

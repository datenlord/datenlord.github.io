const t="/assets/cover-4fd6b43d.png",p="/assets/image1-bf4f8777.png",e="/assets/image-d0c27c17.png",r=[t,p,e],n={label:"开源周报第五期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第五篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2026-01-15",title:"open source weekly report issue 5"},o=[{label:"本周进展",level:2},{label:"解决的关键问题",level:2},{label:"下周规划",level:2},{label:"本周总结",level:2}],a=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第五篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库：</p>
<p><a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="本周进展">本周进展</h2>
<p>本周核心目标：修复上周遗留的RTL bug和WRITE_WITH_IMM语义问题，完善driver稳定性</p>
<p>本周主要围绕修复上周发现的RTL硬件问题和完善RDMA WRITE_WITH_IMM语义展开工作，成功解决了mkMrAndPgtUpdater的寄存器重置bug，实现了pending send queue机制来正确处理WRITE_WITH_IMM操作，并完善了测试框架。</p>
<ol>
<li>修复RTL关键bug (commit: 22105e2)</li>
</ol>
<p>问题背景：</p>
<p>上周通过NCCL Pattern测试发现Ethernet Packet Generator输出有头无尾的stream</p>
<p>第一个数据包未能正常完成，缺少isLast标记</p>
<p>分析定位到mkMrAndPgtUpdater模块的状态机异常</p>
<p>根因分析：</p>
<p>mkMrAndPgtUpdater模块中的zeroBasedPgtEntryBeatCntReg寄存器未正确重置</p>
<p>导致页表更新器在处理多个请求时后续的请求异常</p>
<p>影响后续的以太网数据包生成流程</p>
<p>解决方案：</p>
<p>在MemRegionAndAddressTranslate.bsv中添加寄存器重置逻辑</p>
<p>确保每次新请求开始时状态机正确初始化</p>
<p>效果：</p>
<p>成功解决Ethernet Packet Generator首包异常问题</p>
<p>数据包现在能够正常生成完整的以太网帧（有头有尾）</p>
<ol start="2">
<li>实现并完善Pending Send Queue机制 (commit: 92308e8, 7f1b156)</li>
</ol>
<p>问题背景：</p>
<p>RDMA WRITE_WITH_IMM操作的语义要求等待远端的recv WR</p>
<p>原有实现在没有recv WR时会立即失败，不符合RDMA规范</p>
<p>NCCL等应用依赖正确的WRITE_WITH_IMM语义</p>
<p>实现内容：</p>
<p>在verbs/ctx.rs中添加PendingSendQueueTable</p>
<p>实现try_match_pendings函数匹配pending操作和recv WR</p>
<p>更新RecvWorker在新recv WR到达时尝试匹配</p>
<p>修复recv WR队列使用FIFO顺序（pop_front替代pop_back）</p>
<p>设置队列容量限制为128，防止无限增长</p>
<p>添加队列满场景的错误处理</p>
<p>时序问题修复：</p>
<p>初版实现后发现高并发场景下出现状态不一致</p>
<p>重构verbs/ctx.rs中的pending send queue逻辑</p>
<p>优化锁的使用和状态管理</p>
<p>改进匹配算法的时序控制</p>
<p>实现细节：</p>
<p>新增318行代码，包括：</p>
<p>net/recv_chan.rs: 129行改动</p>
<p>verbs/ctx.rs: 213行改动</p>
<p>workers/completion.rs: 6行改动</p>
<p>后续重构291行代码（145行新增，148行删除）</p>
<p>重构核心匹配逻辑，提升并发安全性</p>
<p>效果：</p>
<p>正确实现RDMA WRITE_WITH_IMM语义</p>
<p>允许QP缓冲发送操作，等待远端post recv WR</p>
<p>解决高并发场景下的状态不一致问题</p>
<p>提升与NCCL等上层应用的兼容性</p>
<ol start="3">
<li>完善MR Region Manager (commit: 36d31ff)</li>
</ol>
<p>背景：</p>
<p>上周实现的MrRegionManager存在一些边界情况处理不完善</p>
<p>需要增强对复杂内存注册场景的支持</p>
<p>重构内容：</p>
<p>重构rdma_utils/mr_region_manager.rs</p>
<p>优化内存区域跟踪算法</p>
<p>增强错误处理和边界检查</p>
<p>实现细节：</p>
<p>新增203行代码，优化36行代码</p>
<p>改进区域重叠检测算法</p>
<p>添加更完善的内存对齐验证</p>
<p>意义：</p>
<p>提升MR注册的正确性和鲁棒性</p>
<p>更好地处理NCCL的复杂内存注册模式</p>
<p>为后续GPU内存支持打下基础</p>
<ol start="4">
<li>完善测试框架</li>
</ol>
<p>主要工作：</p>
<p>新增write_imm_single.c测试用例（616行），验证pending send queue机制</p>
<p>为测试方便调整PCIe时序：read_delay从800ns降至50ns，write_delay从300ns降至50ns</p>
<p>优化cocotb日志级别，提升测试效率和日志可读性</p>
<p>添加verilator自动编译支持</p>
<h2 id="解决的关键问题">解决的关键问题</h2>
<ol>
<li>RTL寄存器重置bug</li>
</ol>
<p>问题：mkMrAndPgtUpdater未正确重置zeroBasedPgtEntryBeatCntReg寄存器</p>
<p>解决：添加寄存器重置逻辑</p>
<p>状态：已完全修复</p>
<ol start="2">
<li>WRITE_WITH_IMM语义与Pending Send Queue问题</li>
</ol>
<p>问题：</p>
<p>没有recv WR时WRITE_WITH_IMM操作立即失败</p>
<p>高并发场景下出现状态不一致</p>
<p>解决：</p>
<p>实现pending send queue机制缓冲操作</p>
<p>重构核心逻辑，优化时序控制</p>
<p>状态：已完全修复</p>
<ol start="3">
<li>MR Region Manager边界情况</li>
</ol>
<p>问题：复杂内存注册场景处理不完善</p>
<p>解决：重构算法，增强边界检查</p>
<p>状态：已完全修复</p>
<h2 id="下周规划">下周规划</h2>
<h4>短期任务（最高优先级）</h4>
<ol>
<li>完成RCCL sim模式完整测试</li>
</ol>
<p>需要支持零长度WriteImm操作，需要修改rtl代码</p>
<p>RCCL测试会莫名卡住，需要进一步探究根因</p>
<p>验证所有本周修复的正确性</p>
<p>运行完整的RCCL测试套件（all_reduce, broadcast等）</p>
<p>当前遇到的问题：</p>
<p>确保基础功能稳定</p>
<h4>中期任务</h4>
<p>解决仿真器高压稳定性问题</p>
<p>问题现象：</p>
<pre><code>ImmAssert failed in mkBsvTopWithoutHardIpInstance.topLevelDmaChannelMux
DataStream checkFullyPipeline Failed: delta=23
</code></pre>
<p>在RTL bug修复后重新验证是否仍然存在</p>
<p>如果问题依然出现，深入调试流水线控制逻辑</p>
<p>分析高压场景下的时序和竞争条件</p>
<p>完善测试覆盖率</p>
<p>添加更多RDMA操作的边界测试</p>
<p>实现测试结果自动验证机制</p>
<p>添加性能基准测试</p>
<h4>长期任务</h4>
<p>完善cocotb仿真器测试代码</p>
<p>使用cocotb-pcie库实现更完善的硬件仿真</p>
<p>将cocotb升级到2.0版本</p>
<p>调研cocotb仿真器行为，确保当前cocotb代码的正确性</p>
<p>提升仿真器的稳定性和可靠性</p>
<p>Driver 重构</p>
<p>优化代码架构，提升可维护性</p>
<p>重构核心模块，使模块对外接口更为简洁</p>
<p>统一错误处理机制</p>
<p>GPU 内存注册支持</p>
<p>调研 dma-buf 内核接口的实现细节</p>
<p>设计内核模块中的 GPU 内存映射机制</p>
<p>实现 ibv_reg_dmabuf_mr verbs 支持</p>
<h2 id="本周总结">本周总结</h2>
<p>本周主要聚焦于修复上周发现的RTL bug和完善RDMA语义：</p>
<p>成果：</p>
<p>成功修复了困扰多日的RTL寄存器重置bug，解决Ethernet Packet Generator异常</p>
<p>实现了完整的pending send queue机制，正确支持WRITE_WITH_IMM语义</p>
<p>挑战：</p>
<p>pending send queue的并发控制较为复杂，需要进一步测试</p>
<p>RCCL测试遇到零长度WriteImm和卡住问题，需要进一步调试</p>
<p>下周重点： 完成RCCL完整测试，解决零长度WriteImm支持和rccl卡住的问题。</p>
<p><img src="${p}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${e}" alt="图片"></p>`;export{r as assetURLs,a as default,n as metadata,o as toc};

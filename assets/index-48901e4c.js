const e="/assets/cover-4fd6b43d.png",p="/assets/image1-bf4f8777.png",t="/assets/image-d0c27c17.png",s=[e,p,t],i={label:"开源周报第四期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第四篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2026-01-08",title:"open source weekly report issue 4"},r=[{label:"本周进展",level:2},{label:"解决的关键问题",level:2},{label:"遗留问题",level:2},{label:"下周规划",level:2},{label:"本周总结",level:2}],o=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第四篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库</p>
<p><a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="本周进展">本周进展</h2>
<p>本周核心目标：修复上周发现的关键bug，完善RCCL测试框架</p>
<p>本周主要围绕修复上周发现的问题展开工作，成功解决了NCCL重复注册MR问题和Post Recv WR时找不到QP的问题，同时通过重构提升了代码的类型安全性和可维护性。</p>
<ol>
<li>修复NCCL重复注册MR问题 (commit: 04b3d53)</li>
</ol>
<p>问题背景：</p>
<p>上周发现NCCL会注册两个映射到同一个物理页的MR</p>
<p>导致同一个物理页面被重复pin/unpin</p>
<p>影响硬件的MTT和PGT管理逻辑</p>
<p>解决方案：</p>
<p>实现了MrRegionManager来跟踪和管理内存区域的页面pinning</p>
<p>通过记录已注册的内存区域，避免重复pinning同一物理页面</p>
<p>在MTT和context层集成MR region manager</p>
<p>在virt_to_phy模块中添加虚拟地址对齐检查</p>
<p>实现细节：</p>
<p>新增rdma_utils/mr_region_manager.rs模块（496行代码）</p>
<p>修改mem/pa_va_map.rs，优化断言格式，提高可读性</p>
<p>更新rdma_utils/mtt.rs和verbs/ctx.rs，集成MR region manager</p>
<p>效果：</p>
<p>成功解决了NCCL重复注册MR导致的问题</p>
<p>确保每个物理页面只被pin一次</p>
<p>为RCCL测试扫清了重要障碍</p>
<ol start="2">
<li>引入编译时类型安全的地址类型 (commit: 5704dfc, 5f3c80f)</li>
</ol>
<p>背景：</p>
<p>原有代码使用运行时对齐检查和手动位操作</p>
<p>容易出现对齐错误，且错误只能在运行时发现</p>
<p>重构内容：</p>
<p>引入AlignedVirtAddr<n>和AlignedPhysAddr<n>泛型类型</n></n></p>
<p>将运行时对齐检查提升为编译时类型保证</p>
<p>消除手动位操作，提高代码安全性</p>
<p>影响范围：</p>
<p>mem/mod.rs：更新内存管理接口</p>
<p>mem/virt_to_phy.rs：使用类型安全的地址转换</p>
<p>verbs/ctx.rs：使用对齐地址类型</p>
<p>意义：</p>
<p>提供编译时页对齐保证，减少运行时错误</p>
<p>提高代码可维护性和可读性</p>
<p>为后续开发提供更安全的类型基础</p>
<ol start="3">
<li>修复Post Recv WR时找不到QP问题 (commit: 1ff3dcd)</li>
</ol>
<p>问题描述：</p>
<p>上周发现在post接收WR时系统提示找不到对应的QP</p>
<p>QP已经成功注册，但在某些状态下无法找到</p>
<p>根因分析：</p>
<p>RDMA规范允许在QP处于INIT状态时post接收WR</p>
<p>但原有实现只支持在RTS状态post接收</p>
<p>NCCL会在INIT状态下就post接收WR</p>
<p>解决方案：</p>
<p>在verbs/ctx.rs中添加pending_post_recv_queue</p>
<p>当QP处于INIT状态时，将post_recv请求暂存到队列中</p>
<p>当QP转换到RTR状态后，自动处理队列中的pending请求</p>
<p>实现细节：</p>
<p>修改verbs/ctx.rs，新增62行代码</p>
<p>支持在INIT状态下接受post_recv调用</p>
<p>实现状态转换时的自动pending请求处理</p>
<ol start="4">
<li>完善测试框架 (commit: 1968be2)</li>
</ol>
<p>新增测试：</p>
<p>write_imm.c：RDMA Write with Immediate测试（565行）</p>
<p>nccl_pattern_test.c：模拟NCCL通信模式的测试（546行）</p>
<p>run_dual_sim_test.sh：支持双仿真器的测试脚本（94行）</p>
<p>测试脚本优化：</p>
<p>新增test_write_imm_sim.sh和test_nccl_pattern_sim.sh</p>
<p>重构test_send_recv_sim.sh，改进错误处理</p>
<p>更新test_nompi.sh，支持新的测试模式</p>
<p>发现的问题：</p>
<p>通过NCCL模式测试发现了新的bug（具体问题需要进一步调试）</p>
<p>为下周的问题修复提供了测试基础</p>
<h2 id="解决的关键问题">解决的关键问题</h2>
<ol>
<li>NCCL重复注册MR问题</li>
</ol>
<p>问题：NCCL会注册映射到同一物理页的多个MR</p>
<p>解决：通过MrRegionManager避免重复pin/unpin</p>
<p>状态：已完全修复</p>
<ol start="2">
<li>Post Recv WR时找不到QP问题</li>
</ol>
<p>问题：在post接收WR时找不到已注册的QP</p>
<p>解决：添加pending_post_recv_queue支持INIT状态下的post_recv</p>
<p>状态：已完全修复</p>
<ol start="3">
<li>代码类型安全问题</li>
</ol>
<p>问题：运行时对齐检查容易出错</p>
<p>解决：引入编译时类型安全的对齐地址类型</p>
<p>状态：已完成重构</p>
<h2 id="遗留问题">遗留问题</h2>
<ol>
<li>仿真器高压稳定性问题</li>
</ol>
<p>状态：上周发现，本周未处理</p>
<p>现象：</p>
<pre><code>INFO cocotb: ImmAssert failed in mkBsvTopWithoutHardIpInstance.topLevelDmaChannelMux @time=18331000: "/home/peng/projects/rdma_all/open-rdma-rtl/src/FullyPipelineChecker.bsv", line 118, column 25
INFO cocotb: -- DataStream checkFullyPipeline Failed:
name = mkTopLevelDmaChannelMux muxInst write, lastBeatCnt=9140, curBeatCnt=9163, delta=23
</code></pre>
<p>后续计划：</p>
<p>调研cocotb仿真器行为，确认是否是仿真器代码问题</p>
<p>调试硬件RTL代码，检查流水线控制逻辑</p>
<p>分析高压场景下的时序和竞争条件</p>
<ol start="2">
<li>NCCL Pattern测试中发现的新bug</li>
</ol>
<p>状态：本周新发现</p>
<p>问题描述： 通过nccl_pattern_test发现RTL仿真器输出了异常的以太网数据流。经分析RTL simulator log，发现Ethernet Packet Generator输出了有头无尾的stream。</p>
<p>异常现象： 第一个数据包只生成了开头，没有isLast标记：</p>
<pre><code>time=20679000: genFirstBeat  -> isFirst: True,  isLast: False
time=20681000: genSecondBeat -> isFirst: False, isLast: False
time=20683000: genThirdBeat  -> isFirst: False, isLast: False
... (之后没有继续生成，缺少isLast=True的结尾beat)  ✗ 异常
</code></pre>
<p>但第二个数据包生成了完整的以太网帧（有头有尾）：</p>
<pre><code>time=20747000: genFirstBeat  -> isFirst: True,  isLast: False
time=20749000: genSecondBeat -> isFirst: False, isLast: False
time=20751000: genThirdBeat  -> isFirst: False, isLast: False
... (中间的payload beats)
time=20837000: genMoreBeat   -> isFirst: False, isLast: True   ✓ 正常结束
</code></pre>
<p>初步分析：</p>
<p>Ethernet Packet Generator在处理第一个数据包时状态机出现异常</p>
<p>第一个包未能正常完成，缺少结尾标记，但第二个包恢复正常</p>
<p>可能是初始状态或首包处理逻辑存在问题</p>
<p>需要进一步调查RTL中的数据包生成状态机和初始化逻辑</p>
<p>后续计划：</p>
<p>调试nccl_pattern_test，定位具体问题</p>
<p>分析问题根因并修复</p>
<h2 id="下周规划">下周规划</h2>
<h4>短期任务（最高优先级）</h4>
<ol>
<li>调试并修复NCCL Pattern测试中发现的bug</li>
</ol>
<p>运行nccl_pattern_test定位问题</p>
<p>分析问题根因</p>
<p>实现修复方案</p>
<ol start="2">
<li>完成RCCL sim模式基础测试</li>
</ol>
<p>验证所有修复的正确性</p>
<p>运行完整的RCCL测试套件</p>
<p>确保基础功能稳定</p>
<ol start="3">
<li>解决仿真器高压稳定性问题</li>
</ol>
<p>深入分析checkFullyPipeline失败的根因</p>
<p>调研cocotb仿真器行为</p>
<p>如果是RTL问题，与硬件团队协作修复</p>
<h4>中期任务</h4>
<ol>
<li>完善测试框架</li>
</ol>
<p>增加更多NCCL模式的测试用例</p>
<p>实现测试结果自动验证机制</p>
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
<p>本周主要聚焦于修复上周发现的关键问题：</p>
<p>成果：</p>
<p>成功解决了NCCL重复注册MR问题，实现了MrRegionManager</p>
<p>修复了Post Recv WR时找不到QP的问题，支持INIT状态下的post_recv</p>
<p>进行了一个小重构，引入编译时类型安全保证</p>
<p>完善了测试框架，添加了NCCL模式测试</p>
<p>挑战：</p>
<p>仿真器高压稳定性问题暂未处理</p>
<p>通过新增测试发现了新的bug，可能是rtl硬件代码导致的，需要进一步调试</p>
<p><img src="${p}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${t}" alt="图片"></p>`;export{s as assetURLs,o as default,i as metadata,r as toc};

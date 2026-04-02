const r="/assets/cover-4fd6b43d.png",p="/assets/image1-bf4f8777.png",e="/assets/image-d0c27c17.png",t=[r,p,e],o={label:"开源周报第八期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第8篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2026-02-05",title:"open source weekly report issue 8"},s=[{label:"01 本周进展",level:2},{label:"02 解决的关键问题",level:2},{label:"03 下周规划",level:2},{label:"本周总结",level:2}],a=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第8篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库：</p>
<p><a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="01-本周进展">01 本周进展</h2>
<p>本周核心目标：解决QP带外传输端口冲突问题，优化内存管理模块结构，提升测试基础设施</p>
<p>本周主要完成了QP带外传输的端口冲突修复、内存管理模块的重构以及测试框架的系统性完善，为RCCL集成和后续功能开发提供了更稳定的基础。</p>
<ol>
<li>Send/Recv QP带外传输优化 (commits: 24d009d, c4839d5)</li>
</ol>
<p>问题背景：</p>
<p>QP带外传输使用的TCP监听端口存在冲突问题</p>
<p>原有设计中每个QP独立建立TCP连接，使用基于QPN哈希的端口号，容易产生端口冲突</p>
<p>多设备场景（如仿真模式下的blue0/blue1）无法正确区分</p>
<p>核心改进：</p>
<p>端口冲突问题修复 (commit: 24d009d)</p>
<p>原有设计问题：</p>
<p>每个QP尝试监听一个基于QPN哈希计算的端口（qpn_to_port函数）</p>
<p>多个QPN可能哈希到同一端口，导致监听失败</p>
<p>TCP连接数过多，每个QP一个连接</p>
<p>新设计方案：</p>
<p>统一端口监听：使用固定的 RECV_WORKER_PORT (60000) 端口</p>
<p>IP级别连接复用（IpTxTable）：</p>
<p>按目标IP地址管理TCP连接，而非按QPN</p>
<p>同一IP的所有QP共享一个TCP连接</p>
<p>在消息中携带QPN信息（RecvWrQpn结构体）</p>
<p>接收端统一调度（RecvWorkers）：</p>
<p>根据消息中的QPN和源IP查找对应的本地QP</p>
<p>统一管理所有QP的recv wr接收</p>
<p>避免端口冲突：</p>
<p>使用socket2库的bind功能绑定本地地址</p>
<p>客户端连接时自动分配临时端口，避免冲突</p>
<p>多设备支持：</p>
<p>根据sysfs_name（uverbs0/uverbs1）动态选择网卡（blue0/blue1）</p>
<p>每个设备使用独立的IP地址</p>
<p>统计数据：</p>
<p>11个文件改动</p>
<p>新增325行，删除257行</p>
<p>recv_chan.rs重构426行</p>
<p>RCCL场景适配和多线程安全修复 (commit: c4839d5)</p>
<p>针对RCCL场景的优化：</p>
<p>多线程安全：将 Rc&#x3C;RefCell&#x3C;>> 改为 Arc&#x3C;Mutex&#x3C;>>，支持跨线程共享</p>
<p>硬件模式支持：硬件模式也改用基于sysfs_name的动态设备选择</p>
<p>错误处理改进：使用更清晰的panic信息，便于问题定位</p>
<p>RCCL配置优化：</p>
<p>添加 NCCL_IB_GID_INDEX=3 配置</p>
<p>修复 RecvWrQpn 序列化的buffer大小问题</p>
<p>改进dest_qp_ip的处理逻辑</p>
<p>统计数据：</p>
<p>8个文件改动</p>
<p>新增66行，删除57行</p>
<ol start="2">
<li>内存管理模块重构 (commit: 09b72ea)</li>
</ol>
<p>重构背景：</p>
<p>mem模块的文件组织结构不够清晰</p>
<p>umem（user memory）处理逻辑分散</p>
<p>缺少硬件环境和仿真环境的统一抽象</p>
<p>核心改进：</p>
<p>新增umem子模块</p>
<p>设计目标：为不同环境提供统一的用户内存处理接口</p>
<p>新增umem子模块（rust-driver/src/mem/umem/）：</p>
<p>提供硬件和仿真两种环境的统一抽象</p>
<p>host.rs - 真实硬件环境的内存处理（61行）</p>
<p>emulated.rs - RTL仿真器环境的内存处理（88行）</p>
<p>支持DMA映射和页表管理</p>
<p>模块结构优化</p>
<p>精简mem/mod.rs：删除134行冗余代码，将具体实现下沉到子模块</p>
<p>重构页表管理：优化page/host.rs逻辑（161行改动），保留旧实现便于参考</p>
<p>删除冗余模块：移除u_dma_buf.rs（119行），功能已由umem模块覆盖</p>
<p>统计数据：</p>
<p>10个文件改动</p>
<p>新增865行，删除319行</p>
<p>主要新增：umem/emulated.rs (88行)、umem/host.rs (61行)</p>
<p>主要删除：u_dma_buf.rs (119行)、mod.rs精简 (134行)</p>
<p>新增RCCL分析文档</p>
<p>同时新增了详细的RCCL GID选择和默认IP分析文档（508行），为RCCL集成提供参考。</p>
<p>效果：</p>
<p>建立了清晰的硬件/仿真环境抽象</p>
<p>统一了用户内存处理接口</p>
<p>为后续GPU内存支持奠定基础</p>
<p>提升了代码的可维护性</p>
<ol start="3">
<li>测试基础设施完善 (commit: 26d6553)</li>
</ol>
<p>改进背景：</p>
<p>测试脚本缺少统一文档和入口</p>
<p>调试辅助工具不足</p>
<p>测试用例需要优化</p>
<p>核心改进：</p>
<p>新增调试库和文档</p>
<p>rdma_debug调试库（77行）：提供状态打印、数据校验等调试辅助功能</p>
<p>完整测试文档（335行README.md）：包含详细的脚本清单、使用说明和示例</p>
<p>统一测试入口</p>
<p>run_all_tests.sh（108行）：一键运行所有测试，自动收集结果和生成报告</p>
<p>测试脚本和用例优化</p>
<p>新增/改进测试脚本，删除过时脚本</p>
<p>更新测试程序以适配新的WR逻辑和优化测试覆盖</p>
<p>统计数据：</p>
<p>12个文件改动</p>
<p>新增641行，删除103行</p>
<p>核心新增：README.md (335行)、run_all_tests.sh (108行)、rdma_debug.c (77行)</p>
<p>效果：</p>
<p>测试流程更加标准化</p>
<p>调试能力显著提升</p>
<p>降低了测试使用门槛</p>
<p>提高了问题定位效率</p>
<ol start="4">
<li>其他改进</li>
</ol>
<p>RCCL测试脚本修复 (commit: c9e3f90)</p>
<p>为RCCL测试添加hack_libc编译步骤</p>
<p>更新测试文档</p>
<p>工程维护 (commit: b6dfc59)</p>
<p>更新.gitignore规则</p>
<h2 id="02-解决的关键问题">02 解决的关键问题</h2>
<ol>
<li>QP带外传输端口冲突问题</li>
</ol>
<p>问题：QP使用TCP进行带外WR交换时，基于QPN哈希的端口分配机制导致端口冲突</p>
<p>根因：</p>
<p>每个QP尝试监听独立端口，使用 qpn_to_port 哈希函数计算</p>
<p>多个QPN可能哈希到同一端口，导致监听失败</p>
<p>在RCCL等多QP场景下问题尤为明显</p>
<p>解决：</p>
<p>改用统一的固定端口（60000）进行监听</p>
<p>引入IpTxTable实现IP级别的连接复用，减少TCP连接数</p>
<p>在消息中携带QPN信息，接收端根据QPN分发</p>
<p>使用socket2库绑定本地地址，避免客户端端口冲突</p>
<p>支持多设备场景（blue0/blue1）</p>
<p>状态：已完成，RCCL场景测试通过</p>
<ol start="2">
<li>内存管理模块结构混乱</li>
</ol>
<p>问题：umem处理逻辑分散，硬件和仿真环境的代码耦合</p>
<p>解决：</p>
<p>新增umem子模块，提供HostUmemHandler和EmulatedUmemHandler</p>
<p>删除冗余的u_dma_buf.rs模块</p>
<p>重构page/host.rs，优化页表管理</p>
<p>状态：已完成</p>
<ol start="3">
<li>测试框架不完善</li>
</ol>
<p>问题：测试脚本缺少文档，调试工具不足，测试流程不规范</p>
<p>解决：</p>
<p>新增335行完整的README.md文档</p>
<p>实现rdma_debug调试库（77行）</p>
<p>提供run_all_tests.sh统一测试入口（108行）</p>
<p>改进多个测试用例的实现</p>
<p>状态：已完成</p>
<h2 id="03-下周规划">03 下周规划</h2>
<p>短期任务（最高优先级）</p>
<p>完善QP带外传输并进行RCCL集成测试</p>
<p>为recv_chan重构添加详细注释和文档</p>
<p>运行完整的send/recv测试套件，验证端口冲突修复的有效性</p>
<p>在仿真模式和RCCL场景下进行压力测试和性能验证</p>
<p>验证IP级别连接复用的稳定性和性能优势</p>
<p>修复RCCL场景下的已知问题</p>
<p>对比重构前后的TCP连接数和性能变化</p>
<p>DMA Buffer系统重构（重构计划优先级最高）</p>
<p>核心问题：</p>
<p>mlock不能保证地址一定不变</p>
<p>需要支持dma-buf机制</p>
<p>PAGE_SIZE大小需要讨论（当前采用64k页面大小以支持GPU）</p>
<p>具体任务：</p>
<p>设计更可靠的内存固定机制</p>
<p>调研dma-buf内核接口的实现细节</p>
<p>评估可变页面大小的可行性</p>
<p>预期效果：</p>
<p>提升内存管理的可靠性</p>
<p>为GPU内存注册奠定基础</p>
<p>中期任务</p>
<p>Driver基础模块重构（重构计划优先级最高）</p>
<p>ring模块持续完善：</p>
<p>补充ProducerRing、ConsumerRing的文档和注释</p>
<p>添加单元测试验证同步逻辑正确性</p>
<p>优化性能和错误处理</p>
<p>mem模块持续重构：</p>
<p>virt_to_phy接口优化：区分CPU内存和GPU内存的地址转换，为dma-buf支持打下基础</p>
<p>地址类型系统完善：完成已开始的地址类型区分工作，提升类型安全性</p>
<p>GPU内存支持准备：基于新的umem抽象设计GPU内存handler，实现ibv_reg_dmabuf_mr verbs支持</p>
<p>仿真器稳定性提升</p>
<p>解决高压稳定性问题（遗留）：</p>
<pre><code>ImmAssert failed in mkBsvTopWithoutHardIpInstance.topLevelDmaChannelMux
DataStream checkFullyPipeline Failed: delta=23
</code></pre>
<p>在重构后重新验证问题是否仍然存在</p>
<p>深入调试流水线控制逻辑</p>
<p>完善cocotb仿真器测试代码</p>
<p>使用cocotb-pcie库实现更完善的硬件仿真</p>
<p>将cocotb升级到2.0版本</p>
<p>提升仿真器的稳定性和可靠性</p>
<p>长期任务（暂缓，等待硬件代码稳定）</p>
<p>Worker模块和生命周期管理优化（暂缓）</p>
<p>说明：由于后续会逐步修改硬件代码，worker的交互逻辑和资源管理可能会变化</p>
<p>当前策略：保持能用即可，暂不进行大规模重构</p>
<p>待解决问题（记录备查）：</p>
<p>worker之间的交互逻辑过于复杂</p>
<p>多线程程序的错误处理困难</p>
<p>存在大量轮询，可考虑改为async框架</p>
<p>重传worker的定时器参数不合理（当前5天）</p>
<p>资源manager需要实现drop避免手动释放</p>
<p>QP资源申请和释放流程需要优化</p>
<p>解决QP地址冲突引入的hashmap需要析构</p>
<h2 id="本周总结">本周总结</h2>
<p>本周主要完成了Send/Recv功能修复、内存管理重构和测试基础设施完善三大任务：</p>
<p>成果：</p>
<p>QP带外传输优化：解决了端口冲突问题，实现了IP级别的连接复用，支持RCCL等多QP场景（426行recv_chan重构）</p>
<p>内存管理优化：新增umem子模块，建立了硬件/仿真环境的统一抽象，删除了119行冗余代码</p>
<p>测试框架完善：新增335行测试文档、108行统一测试脚本、77行调试库，大幅提升测试规范性</p>
<p>代码质量提升：共42个文件改动，新增1397行，删除538行，净增859行高质量代码</p>
<p>挑战：</p>
<p>端口冲突修复验证：recv_chan的426行重构改变了TCP连接管理模式，需要充分测试确保未引入regression</p>
<p>功能与重构平衡：在推进新功能的同时，需要持续优化现有代码架构，特别是DMA buffer系统的重构</p>
<p>GPU内存支持准备：需要在现有架构基础上设计可扩展的GPU内存管理方案</p>
<p>下周重点： 完善QP带外传输的测试和文档，在RCCL场景下进行充分验证；重点推进DMA Buffer系统重构和mem模块优化，为GPU内存支持打好基础。</p>
<p><img src="${p}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${e}" alt="图片"></p>`;export{t as assetURLs,a as default,o as metadata,s as toc};

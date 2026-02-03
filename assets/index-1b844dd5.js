const r="/assets/cover-4fd6b43d.png",p="/assets/image1-bf4f8777.png",e="/assets/image-d0c27c17.png",t=[r,p,e],o={label:"开源周报第六期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第六篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2026-01-22",title:"open source weekly report issue 6"},s=[{label:"本周进展",level:2},{label:"解决的关键问题",level:2},{label:"下周规划",level:2},{label:"本周总结",level:2}],a=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第六篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库：</p>
<p><a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="本周进展">本周进展</h2>
<p>本周核心目标：实现RCCL在sim模式下的初步运行，解决上周遗留的零长度操作支持问题</p>
<p>本周主要聚焦于解决RCCL测试中发现的零长度RDMA操作支持问题，以及完善verbs接口的批量提交功能，最终实现了RCCL在sim模式下的初步成功运行。</p>
<ol>
<li>RTL支持零负载RDMA数据包 (commit: 47a8373)</li>
</ol>
<p>问题背景：</p>
<p>上周RCCL测试遇到零长度WriteImm操作不支持的问题</p>
<p>RCCL协议栈会使用零长度的WRITE_WITH_IMM和SEND_WITH_IMM作为通知机制</p>
<p>RTL侧未正确处理零负载（zero-payload）的RDMA数据包</p>
<p>根因分析：</p>
<p>RQ（Receive Queue）对零负载数据包的hasPayload标记处理不正确</p>
<p>零负载操作仍然会触发不必要的MR表查询</p>
<p>PSN位图更新逻辑未考虑SEND/WRITE_ONLY_WITH_IMMEDIATE零负载情况</p>
<p>解决方案：</p>
<p>在RQ.bsv中根据RETH的dlen字段更新hasPayload标记，使RQ与SQ的hasPayload判断逻辑一致</p>
<p>跳过零负载操作的MR表查询，避免不必要的查表操作</p>
<p>修正SEND/WRITE_ONLY_WITH_IMMEDIATE操作码的PSN位图更新逻辑</p>
<p>实现细节：</p>
<p>src/RQ.bsv: 16行改动（13行新增，3行删除）</p>
<p>src/EthernetFrameIO256.bsv: 12行新增</p>
<p>新增34行代码</p>
<p>效果：</p>
<p>RTL侧正确处理零负载RDMA数据包</p>
<p>避免不必要的内存表查询，提升性能</p>
<p>为RCCL通知机制提供硬件支持</p>
<p>EthernetFrameIO256.bsv RETH提取修复</p>
<p>问题详情：见</p>
<p>@docs/detail/ethernetframeio-reth-extraction-fix.md</p>
<p>在EthernetFrameIO256.bsv的mkRdmaMetaAndPayloadExtractor模块中，RETH (RDMA Extended Transport Header) 的提取位置不正确，导致解析错误。</p>
<p>原始问题：</p>
<p>在handleSecondBeat规则中尝试提取RETH，但此时rdmaExtendHeaderBuf只包含第二个beat的部分扩展头（10字节）</p>
<p>RETH需要16字节，数据不完整导致提取错误</p>
<p>修复方案：</p>
<p>将RETH提取移到handleThirdBeat规则中</p>
<p>在第三个beat中拼接完整的扩展头缓冲区（第二beat的10字节 + 第三beat的32字节）</p>
<p>确保RETH的所有字段（va, rkey, dlen）都能被正确提取</p>
<p>影响：</p>
<p>确保数据完整性，RETH提取正确</p>
<p>能正确识别dlen == 0的情况，避免错误等待负载数据</p>
<ol start="2">
<li>Driver支持零长度RDMA操作 (commit: 95e394e)</li>
</ol>
<p>问题背景：</p>
<p>Driver侧的fragmenter和RDMA worker未正确处理零长度操作</p>
<p>零长度操作被错误地生成0个segment，导致无法发送</p>
<p>PSN计算逻辑在零长度场景下异常</p>
<p>实现内容：</p>
<p>修改rdma_utils/fragmenter.rs，确保零长度操作返回1个segment而非0个</p>
<p>更新num_psn计算逻辑，保证零长度传输至少分配1个PSN</p>
<p>添加验证逻辑，仅允许WRITE_WITH_IMM和SEND_WITH_IMM进行零长度操作</p>
<p>修复workers/rdma.rs，正确处理零长度write操作</p>
<p>优化mr_region_manager.rs，跳过零长度操作的内存区域查找</p>
<p>添加零长度分片的单元测试</p>
<p>实现细节：</p>
<p>rdma_utils/fragmenter.rs: 27行改动</p>
<p>workers/rdma.rs: 26行改动</p>
<p>rdma_utils/mr_region_manager.rs: 8行改动</p>
<p>rdma_utils/types.rs: 15行改动</p>
<p>新增142行代码，删除26行代码</p>
<p>效果：</p>
<p>Driver侧完整支持零长度WRITE_WITH_IMM和SEND_WITH_IMM操作</p>
<p>RCCL通知机制可以正常工作</p>
<p>提升与RCCL等上层应用的兼容性</p>
<ol start="3">
<li>修复post_send和post_recv，支持批量提交WR (commit: 00b80de)</li>
</ol>
<p>问题背景：</p>
<p>原有post_send/post_recv实现每次只能提交单个WR</p>
<p>RCCL等应用通常会通过wr.next链表批量提交多个WR</p>
<p>单次提交限制影响性能和应用兼容性</p>
<p>实现内容：</p>
<p>重构verbs/core.rs中的post_send和post_recv函数</p>
<p>实现对wr.next链表的遍历处理</p>
<p>支持一次提交多个WR请求</p>
<p>保持原子性，确保要么全部成功，要么全部失败</p>
<p>实现细节：</p>
<p>verbs/core.rs: 92行改动（65行新增，27行删除）</p>
<p>优化错误处理和回滚机制</p>
<p>效果：</p>
<p>完整支持标准RDMA verbs的批量提交语义</p>
<p>显著提升RCCL等应用的性能</p>
<p>减少用户态到内核态的切换开销</p>
<ol start="4">
<li>RCCL sim模式初步运行成功</li>
</ol>
<p>重要里程碑：</p>
<p>经过本周的RTL和Driver修复，RCCL在sim模式下实现初步运行成功</p>
<p>验证了零长度操作、批量提交等关键功能</p>
<p>为后续完整支持RCCL奠定基础</p>
<h2 id="解决的关键问题">解决的关键问题</h2>
<ol>
<li>零长度RDMA操作支持</li>
</ol>
<p>问题：RTL和Driver均不支持零长度WRITE_WITH_IMM和SEND_WITH_IMM操作</p>
<p>解决：</p>
<p>RTL侧修正hasPayload标记和PSN位图更新逻辑</p>
<p>Driver侧修复fragmenter和worker处理流程</p>
<p>状态：已完全修复</p>
<ol start="2">
<li>批量WR提交支持</li>
</ol>
<p>问题：post_send/post_recv只能提交单个WR，不支持wr.next链表</p>
<p>解决：重构verbs/core.rs，实现链表遍历和批量提交</p>
<p>状态：已完全修复</p>
<ol start="3">
<li>RCCL sim模式运行</li>
</ol>
<p>问题：RCCL在sim模式下无法正常运行</p>
<p>解决：通过上述修复，实现RCCL sim模式初步运行成功</p>
<p>状态：初步可用，需要进一步测试和完善</p>
<h2 id="下周规划">下周规划</h2>
<h4>短期任务（最高优先级）</h4>
<ol>
<li>Driver代码重构</li>
</ol>
<p>核心目标：提升代码质量和可维护性，为后续功能扩展打下基础</p>
<p>重构内容：</p>
<p>优化模块间接口设计，减少耦合度</p>
<p>统一错误处理机制，完善错误类型定义</p>
<p>重构核心数据结构，提升性能和可读性</p>
<p>改进并发控制，优化锁的使用</p>
<p>梳理模块职责，提升代码组织清晰度</p>
<p>预期效果：</p>
<p>代码更易于理解和维护</p>
<p>为GPU内存支持等新特性提供更好的架构基础</p>
<p>降低后续开发和调试成本</p>
<ol start="2">
<li>完善RCCL测试覆盖</li>
</ol>
<p>在sim模式下运行完整的RCCL测试套件（all_reduce, all_gather, broadcast等）</p>
<p>验证不同通信模式的正确性</p>
<p>识别并修复潜在的稳定性问题</p>
<h4>中期任务</h4>
<p>解决仿真器高压稳定性问题</p>
<p>问题现象（上周遗留）：</p>
<pre><code>ImmAssert failed in mkBsvTopWithoutHardIpInstance.topLevelDmaChannelMux
DataStream checkFullyPipeline Failed: delta=23
</code></pre>
<p>在零长度操作支持后重新验证是否仍然存在</p>
<p>深入调试流水线控制逻辑</p>
<p>分析高压场景下的时序和竞争条件</p>
<h4>长期任务</h4>
<p>完善cocotb仿真器测试代码</p>
<p>使用cocotb-pcie库实现更完善的硬件仿真</p>
<p>将cocotb升级到2.0版本</p>
<p>调研cocotb仿真器行为，确保当前cocotb代码的正确性</p>
<p>提升仿真器的稳定性和可靠性</p>
<p>GPU内存注册支持</p>
<p>调研dma-buf内核接口的实现细节</p>
<p>设计内核模块中的GPU内存映射机制</p>
<p>实现ibv_reg_dmabuf_mr verbs支持</p>
<h2 id="本周总结">本周总结</h2>
<p>本周主要聚焦于解决RCCL集成中发现的关键问题：</p>
<p>成果：</p>
<p>成功实现RTL和Driver对零长度RDMA操作的完整支持</p>
<p>实现verbs批量WR提交功能，提升应用兼容性和性能</p>
<p>重要里程碑：RCCL在sim模式下初步运行成功，验证了基础功能的正确性</p>
<p>挑战：</p>
<p>需要进一步测试RCCL在sim模式下的稳定性</p>
<p>代码重构工作量较大，需要careful planning和分步实施</p>
<p>下周重点： 启动Driver代码重构工作，优化代码架构和可维护性；同时完善RCCL测试覆盖，确保功能稳定性。</p>
<p><img src="${p}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${e}" alt="图片"></p>`;export{t as assetURLs,a as default,o as metadata,s as toc};

const t="/assets/cover-4fd6b43d.png",p="/assets/image1-bf4f8777.png",e="/assets/image-d0c27c17.png",o=[t,p,e],c={label:"开源周报第二期",description:"本文为达坦科技DatenLord新系列文章【开源周报】的第二篇。设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。",cover:"./cover.png",location:"美国",date:"2025-12-18",title:"open source weekly report issue 2"},l=[{label:"本周进展",level:2},{label:"下一步规划",level:2},{label:"本周总结",level:2},{label:"DatenLord 正在积极构建高性能AI+Cloud基础设施平台，现开放AI Infra实习生 岗位招募！",level:2}],i=`<p>本文为达坦科技DatenLord新系列文章【开源周报】的第二篇。</p>
<p>设立这一系列的初衷，是为了更透明地分享达坦科技开源项目的成长轨迹。在这里，我们不仅会同步项目近期的核心开发进展与技术突破，更将通过路线图为您揭示未来的演进方向。</p>
<p>📍 项目地址与参与</p>
<p>GitHub 仓库：</p>
<p><a href="https://github.com/open-rdma/open-rdma-driver">https://github.com/open-rdma/open-rdma-driver</a></p>
<p>（点击文末“阅读原文”跳转）</p>
<p>我们诚挚邀请所有对高性能网络、Rust系统编程或RDMA技术感兴趣的朋友点击链接关注、支持我们的项目。开源的力量源于社区。您的每一次关注、讨论或代码贡献，都是项目前进的重要动力。期待与您携手，共建更完善的高性能基础设施生态。</p>
<h2 id="本周进展">本周进展</h2>
<p>本周核心目标：让 RCCL 测试程序可以在仿真模式(Sim)下跑通</p>
<p>为了达成这一目标，本周进行了三项关键工作：实现内存拦截库、优化设备初始化流程、增强仿真连接稳定性。</p>
<ol>
<li>RCCL 测试套件与内存拦截库实现 (commit: 8d5342b, 1a5c95c)</li>
</ol>
<p>问题背景：</p>
<p>驱动要求注册的 MR 必须使用 2MB 大页内存</p>
<p>RCCL 默认使用普通页分配，不满足驱动要求</p>
<p>需要在不修改 RCCL 源码的前提下解决页大小问题</p>
<p>实现方案： 创建了 RCCL 测试基础设施，核心是 hack_libc 内存拦截库。</p>
<p>hack_libc 核心实现 (tests/hack_libc/src/lib.rs):</p>
<p>通过 LD_PRELOAD 技术拦截内存分配，分为两类关键路径：</p>
<p>第一类：posix_memalign 路径（第211-235行）</p>
<p>作用: 拦截 RCCL 使用的主要内存分配函数</p>
<p>实现:</p>
<p>预先通过 mmap 分配 256MB 的 2MB hugepage 堆</p>
<p>使用 buddy_system_allocator 管理堆内存</p>
<p>posix_memalign 从该堆中分配，自动满足 2MB 对齐要求</p>
<p>配对: 实现对应的 free 函数，正确释放堆内存</p>
<p>第二类：hipHostMalloc 路径（第289-409行）</p>
<p>作用: 劫持 HIP 的主机内存分配函数</p>
<p>实现:</p>
<p>直接 mmap 分配 2MB hugepage (MAP_HUGETLB | MAP_HUGE_2MB)</p>
<p>调用原始的 hipHostRegister 自动注册到 HIP runtime</p>
<p>支持 hipHostMallocDefault、hipHostMallocPortable 等各种 flags</p>
<p>配对: 实现 hipHostFree，先调用 hipHostUnregister 再 munmap</p>
<p>精简劫持范围（commit: 1a5c95c）:</p>
<p>发现: 通过实际测试，RCCL 仅使用 posix_memalign 和 hipHostMalloc 申请 MR 内存</p>
<p>优化: 注释掉其他内存分配函数的劫持（malloc、calloc、realloc、aligned_alloc、memalign）</p>
<p>好处: 减少劫持范围，降低与系统库的兼容性风险，避免影响 RCCL 的其他内存分配行为</p>
<p>RCCL 测试程序 (tests/rccl_test/):</p>
<p>normal_test_nompi.cpp: 无 MPI 依赖的 RCCL 功能测试（228行）</p>
<p>test_alloc.cpp: 验证内存分配和页大小（73行）</p>
<p>Makefile 和测试脚本，需要进一步完善</p>
<p>使用示例:</p>
<pre><code>LD_PRELOAD=./hack_libc/target/debug/libhack_libc.so ./rccl_test
</code></pre>
<p>当前状态:</p>
<p>内存拦截机制已验证可用</p>
<p>测试框架初步能用，但还不够完善</p>
<p>为仿真模式下运行 RCCL 提供了基础环境</p>
<ol start="2">
<li>仿真模式连接稳定性增强 (commit: bf4ef14)</li>
</ol>
<p>问题描述:</p>
<p>Sim 模式下驱动通过 TCP/UDP 与 RTL 模拟器通信</p>
<p>SimpleTcpClient 连接 RTL 模拟器时，因启动顺序问题时常失败：</p>
<p>驱动先启动，模拟器后启动 → 连接失败</p>
<p>单次连接失败导致整个测试流程中断</p>
<p>修复内容: 修改 src/memory_proxy_simple.rs 中的 TCP 客户端逻辑（新增 112 行）：</p>
<p>重试机制: 连接失败时自动重试多次，等待模拟器启动</p>
<p>超时控制: 为每次连接尝试设置合理超时</p>
<p>日志改进: 输出详细的连接状态，便于调试</p>
<p>意义:</p>
<p>解决启动顺序依赖问题，支持驱动和模拟器任意顺序启动</p>
<p>为 RCCL 在仿真模式下运行提供更可靠的底层连接</p>
<p>提高仿真测试的稳定性和自动化程度</p>
<ol start="3">
<li>设备懒加载初始化 (commit: 971ea94)</li>
</ol>
<p>核心问题:</p>
<p>RCCL 行为: RCCL 程序在初始化时会打开系统中所有的 RDMA 设备（ibv_get_device_list）</p>
<p>仿真模式限制:</p>
<p>每个仿真器实例只能服务一个设备（端口号绑定）</p>
<p>如果打开设备时立即初始化，多个设备会尝试连接同一个仿真器端口</p>
<p>无法实现"仿真器-测试程序一对一"的对应关系</p>
<p>实现方案: 修改 src/verbs/ffi.rs 和 src/verbs/core.rs（新增 108 行，删除 35 行）：</p>
<p>FFI 层改造 (ffi.rs::new):</p>
<p>原逻辑: 创建设备时立即调用初始化函数（如 new_hw()/new_emulated()/new_mock()）创建完整的设备上下文</p>
<p>新逻辑: 仅创建 OnceLock 包装器，返回指针。根据编译特性使用不同类型：</p>
<pre><code>// hw 模式
#[cfg(feature = "hw")]
let once_ctx: OnceLock&#x3C;Mutex&#x3C;HwDeviceCtx&#x3C;PciHwDevice>>> = OnceLock::new();

// sim 模式
#[cfg(feature = "sim")]
let once_ctx: OnceLock&#x3C;Mutex&#x3C;HwDeviceCtx&#x3C;EmulatedHwDevice>>> = OnceLock::new();

// mock 模式
#[cfg(feature = "mock")]
let once_ctx: OnceLock&#x3C;Mutex&#x3C;MockDeviceCtx>> = OnceLock::new();

Box::into_raw(Box::new(once_ctx)).cast()
</code></pre>
<p>延迟初始化 (ffi.rs::get_device):</p>
<p>在首次实际使用设备时（如 alloc_pd、create_qp 等）才调用 get_or_init</p>
<p>get_or_init 内部根据模式调用对应的初始化函数：</p>
<pre><code>// hw 模式
device.get_or_init(|| {
    let ctx = BlueRdmaCore::new_hw(&#x26;device_name).unwrap();
    Mutex::new(ctx)
}).lock()

// sim 模式
device.get_or_init(|| {
    let ctx = BlueRdmaCore::new_emulated(&#x26;device_name).unwrap();
    Mutex::new(ctx)
}).lock()

// mock 模式
device.get_or_init(|| {
    let ctx = BlueRdmaCore::new_mock(&#x26;device_name).unwrap();
    Mutex::new(ctx)
}).lock()
</code></pre>
<p>关键改动:</p>
<p>new_hw、new_emulated、new_mock 从 fn 改为 pub(super) fn，供 get_device 调用</p>
<p>根据设备名（uverbs0/uverbs1）动态分配仿真器端口</p>
<p>效果:</p>
<p>RCCL 打开所有设备时，仅创建占位符，不真正初始化</p>
<p>只有实际使用的设备才会连接到对应的仿真器</p>
<p>实现了"一个测试程序-一个仿真器"的一对一映射</p>
<p>当前状态:</p>
<p>懒加载机制已实现，但可能存在 bug，尚未完全验证</p>
<p>为 RCCL 在仿真模式下运行提供了基础，但需要进一步调试和验证</p>
<h2 id="下一步规划">下一步规划</h2>
<h4>短期任务（围绕仿真模式 RCCL 测试）</h4>
<ol>
<li>修复仿真模式下的 RCCL 运行问题（最高优先级）</li>
</ol>
<p>完整验证懒加载初始化机制，修复可能存在的 bug</p>
<p>调试 va->pa 地址翻译问题</p>
<p>确保 RCCL 程序能在仿真模式下成功初始化和运行</p>
<ol start="2">
<li>修复 Sim 模式下的 WriteImm 语义（延续上周任务，支撑 RCCL 运行）</li>
</ol>
<p>将 Mock 模式的修复逻辑移植到 Sim 模式</p>
<p>确保 WriteImm 操作在仿真模式下正确消耗 RQE</p>
<p>这是 RCCL 某些通信模式的必要功能</p>
<ol start="3">
<li>完善 RCCL 测试套件</li>
</ol>
<p>添加更多 collective 操作的测试用例（AllReduce、Broadcast、AllGather 等）</p>
<p>完善测试脚本，支持自动化测试流程</p>
<h4>中期规划</h4>
<ol start="4">
<li>Driver 重构</li>
</ol>
<p>优化代码架构，提升可维护性</p>
<p>重构核心模块，使得模块对外接口更为简洁同时正确处理错误</p>
<ol start="5">
<li>GPU 内存注册支持（延续上周规划）</li>
</ol>
<p>调研 dma-buf 内核接口的实现细节</p>
<p>设计内核模块中的 GPU 内存映射机制</p>
<p>实现 ibv_reg_dmabuf_mr verbs 支持</p>
<h2 id="本周总结">本周总结</h2>
<p>本周围绕 "让 RCCL 测试程序在仿真模式下跑通” 这一核心目标，完成了三项关键工作：</p>
<p>内存拦截库：实现了 posix_memalign 和 hipHostMalloc 两类关键路径的劫持，确保 RCCL 注册的 MR 都使用 2MB 大页，满足驱动要求</p>
<p>懒加载初始化：解决了 RCCL 打开所有设备导致的仿真器端口冲突问题，实现了设备与仿真器的一对一映射</p>
<p>连接稳定性：增加重试机制，支持驱动和仿真器任意顺序启动</p>
<p>这些改进为 RCCL 在仿真模式下运行打下了基础，但测试框架还不够完善，懒加载机制可能存在 bug 且尚未完全验证。下一步将重点进行完整验证和调试，确保 RCCL 能够稳定运行。</p>
<h2 id="datenlord-正在积极构建高性能ai+cloud基础设施平台，现开放ai-infra实习生-岗位招募！">DatenLord 正在积极构建高性能AI+Cloud基础设施平台，现开放AI Infra实习生 岗位招募！</h2>
<p>岗位一：高性能网络驱动程序开发实习生（Rust语言方向）</p>
<p>工作内容：</p>
<p>负责使用Rust语言开发RDMA网卡的用户态驱动程序，与硬件进行交互、控制。</p>
<p>负责使用Rust语言开发RDMA网卡的用户态驱动程序，对上层verbs API提供兼容接口。</p>
<p>负责对Rust语言开发的RDMA网卡驱动程序进行性能测试、性能优化。</p>
<p>岗位要求：</p>
<p>熟练掌握Rust编程语言。</p>
<p>有Linux驱动程序或嵌入式程序开发经验（C语言或Rust语言），熟悉软件与硬件的常见交互方式。</p>
<p>深入了解Linux操作系统，对操作系统内存管理、内存映射等技术有深入理解。</p>
<p>了解RDMA技术及Verbs API。</p>
<p>有开源社区代码贡献经验者优先。</p>
<p>岗位二：高性能RDMA网卡FPGA硬件开发实习生</p>
<p>工作内容：</p>
<p>负责使用Bluespec SystemVerilog语言进行RDMA网卡的RTL编写。</p>
<p>负责使用Bluespec SystemVerilog + cocotb对逻辑功能进行仿真、验证。</p>
<p>负责在FPGA上进行后端P&#x26;R流程、时序调整，确保逻辑上板可用。</p>
<p>岗位要求：</p>
<p>自学掌握Bluespec SystemVerilog语言。</p>
<p>熟悉Xilinx、Altera系列FPGA的开发流程。</p>
<p>熟悉PCIe及以太网控制器相关的开发工作。</p>
<p>熟悉Linux系统下，以太网及PCIe相关调试流程。</p>
<p>能够独立完成FPGA的RTL编写、仿真、时序调整、上板测试工作。</p>
<p>了解RDMA技术。</p>
<p>📮 如何申请？欢迎点击文章 【AI与高性能网络领域】一大波线上线下实习向你袭来！，跳转至我们的官方招聘页面，查看完整的职位详情与申请流程。</p>
<p><img src="${p}" alt="图片">
<strong>达坦科技</strong>始终致力于打造高性能 <strong>Al+ Cloud 基础设施平台</strong>，积极推动 AI 应用的落地。达坦科技通过<strong>软硬件深度融合</strong>的方式，提供高性能存储和高性能网络。为 AI 应用提供<strong>弹性、便利、经济</strong>的基础设施服务，以此满足不同行业客户对 AI+Cloud 的需求。</p>
<p><strong>公众号：</strong> 达坦科技DatenLord</p>
<p><strong>DatenLord官网：</strong> <a href="https://datenlord.github.io/zh-cn/">https://datenlord.github.io/zh-cn/</a></p>
<p><strong>知乎账号：</strong> <a href="https://www.zhihu.com/org/da-tan-ke-ji">https://www.zhihu.com/org/da-tan-ke-ji</a></p>
<p><strong>B站：</strong> <a href="https://space.bilibili.com/2017027518">https://space.bilibili.com/2017027518</a></p>
<p><strong>邮箱：</strong> <a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p>如果您有兴趣加入<strong>达坦科技Rust前沿技术交流群或硬件相关的群</strong>  ，请添加<strong>小助手微信</strong>：DatenLord_Tech
<img src="${e}" alt="图片"></p>`;export{o as assetURLs,i as default,c as metadata,l as toc};

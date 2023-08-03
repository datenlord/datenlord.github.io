const o="/datenlord-web-zh/assets/cover-9c53ea5f.png",r="/datenlord-web-zh/assets/image1-27d3eac6.jpg",t=[o,r],s={label:"相约这个夏天｜达坦科技邀您参加2023开源之夏",description:"开源之夏（英文简称“OSPP”）是中科院软件所“开源软件供应链点亮计划”指导下的系列暑期活动。达坦科技自开源之夏创办首期起每年参与，积极鼓励在校学生积极参与开源软件的开发维护，培养和发掘更多优秀的开发者。今年，DatenLord一如既往带着对开源的热忱与初心，携旗下软硬件开源项目第四次参与开源之夏。",cover:"./cover.png",location:"中国香港",date:"2023-05-04",title:"Meet this summer｜Datan Technology invites you to participate in the 2023 Open Source Summer"},p=[{label:"开源之夏为什么值得参加？",level:2},{label:"DatenLord 项目列表",level:2},{label:"项目一",level:3},{label:"项目二",level:3},{label:"项目三",level:3},{label:"项目四",level:3},{label:"项目五",level:3},{label:"项目六",level:3},{label:"项目七",level:3},{label:"项目八",level:3},{label:"开源之夏 DatenLord 项目往期获奖学生感言",level:2},{label:"活动日程",level:2}],n=`<h2 id="开源之夏为什么值得参加？">开源之夏为什么值得参加？</h2>
<ul>
<li>参与开源之夏，给你的编程能力加个 buff。</li>
<li>结识志同道合的小伙伴，并有机会和技术大牛一起贡献开源。</li>
<li>组委会与开源社区将为您匹配资深的社区导师。</li>
<li>根据项目开发的成果，将获得活动奖金及证书奖励。</li>
</ul>
<p>本年度开源之夏项目难度设基础和进阶两档，对应结项奖金分别为<strong>8000 RMB</strong>（税前）和<strong>12000 RMB</strong>（税前）。</p>
<h2 id="datenlord-项目列表">DatenLord 项目列表</h2>
<h3 id="项目一">项目一</h3>
<p><strong>用 Rust 基于 DPDK 在用户态实现 RDMA RoCEv2 协议</strong></p>
<p><strong>项目简述：</strong> RDMA 被高性能数据中心广泛使用，RDMA RoCEv2 协议因为兼容以太网被各大互联网厂商和云计算提供商所广泛使用。RDMA 的极致性能需要通过专业的 RDMA 网卡实现，但是在某些环境中仍然需要软件模拟来实现相同的功能。现有使用广泛的软件模拟实现为 soft-roce 内核实现，该实现存在不稳定的问题，被 RedHat 踢出了发行版内核。基于上述现状，本项目要求采用 Rust 语言异步编程的方式，基于 DPDK 实现用户态 RoCEv2 协议。通过 DPDK 在用户态实现 RoCEv2 协议一方面具有很高的灵活性，易于调试、便于修改，另一方面也能保证不错的性能。</p>
<p><strong>项目链接：</strong><br>
<a href="https://summer-ospp.ac.cn/org/prodetail/23b970514?list=org&#x26;navpage=org">https://summer-ospp.ac.cn/org/prodetail/23b970514?list=org&#x26;navpage=org</a></p>
<h3 id="项目二">项目二</h3>
<p><strong>用 Rust 实现基于 RDMA 的通用 RPC 框架</strong></p>
<p><strong>项目简述：</strong> RDMA 是被高性能数据中心广泛使用的高性能网络协议栈，但是至今还没有一款好用的基于 RDMA 协议的 Rust 语言的 RPC 框架。本项目要求采用 Rust 实现一个基于 RDMA 协议的通用 RPC 框架。</p>
<p><strong>项目链接：</strong><br>
<a href="https://summer-ospp.ac.cn/org/prodetail/23b970508?list=org&#x26;navpage=org">https://summer-ospp.ac.cn/org/prodetail/23b970508?list=org&#x26;navpage=org</a></p>
<h3 id="项目三">项目三</h3>
<p><strong>用 Rust for Linux 基于 openEuler 实现 RDMA 设备驱动</strong></p>
<p><strong>项目简述：</strong> RDMA 是高性能网络协议栈，常用于超算中心和高端存储。目前 RDMA 的驱动是用 C 语言实现的。Rust for Linux 是采用 Rust 语言来开发 Linux 内核模块的框架。本项目要求采用 Rust for Linux 来实现 RDMA 设备驱动。</p>
<p><strong>项目链接：</strong><br>
<a href="https://summer-ospp.ac.cn/org/prodetail/23b970464?list=org&#x26;navpage=org">https://summer-ospp.ac.cn/org/prodetail/23b970464?list=org&#x26;navpage=org</a></p>
<h3 id="项目四">项目四</h3>
<p><strong>为 openEuler 移植 CXL 模拟测试环境</strong></p>
<p><strong>项目简述：</strong> CXL 是下一代服务器高性能总线，支持 CPU 和外设之间的缓存一致性，大幅度提升了 CPU 和外设之间数据交互的性能。但是目前符合 CXL 规范的硬件设备还很少，需要提供 CXL 的模拟测试环境，以方便驱动和上层相关应用的开发与调试。目前 Linux 内核社区和 QEMU 社区提供了基于 QEMU 的 CXL 模拟测试环境，但是尚未在 openEuler 操作系统上进行移植和性能测试。本项目要求为 openEuler 操作系统移植 CXL 模拟测试环境并给出性能评估。</p>
<p><strong>项目链接：</strong><br>
<a href="https://summer-ospp.ac.cn/org/prodetail/23b970572?list=org&#x26;navpage=org">https://summer-ospp.ac.cn/org/prodetail/23b970572?list=org&#x26;navpage=org</a></p>
<h3 id="项目五">项目五</h3>
<p><strong>用 Rust for Linux 为 openEuler 实现支持 CXL.mem 协议的仿真测试设备</strong></p>
<p><strong>项目简述：</strong> CXL 是下一代服务器高性能总线，支持 CPU 和外设之间的缓存一致性，大幅度提升了 CPU 和外设之间数据交互的性能。但是目前符合 CXL 规范的硬件设备还很少，需要提供 CXL 的模拟测试环境，以方便驱动和上层相关应用的开发与调试。本项目要求采用 Rust for Linux 基于 openEuler 实现支持 CXL.mem 协议的 type3 型设备功能仿真，用于调试 CXL 协议的驱动或开发上层应用。</p>
<p><strong>项目链接：</strong><br>
<a href="https://summer-ospp.ac.cn/org/prodetail/23b970576?list=org&#x26;navpage=org">https://summer-ospp.ac.cn/org/prodetail/23b970576?list=org&#x26;navpage=org</a></p>
<h3 id="项目六">项目六</h3>
<p><strong>基于 SpinalHDL 的 PCIe-DMA 实现</strong></p>
<p><strong>项目简述：</strong> SpinalHDL 是基于函数式编程语言 Scala 打造的新一代硬件描述语言，采用高层次硬件电路抽象，极大地提升了数字硬件系统的开发效率。目前 SpinalHDL 的 library 缺少对 PCIe 和 PCIe-DMA 的支持, 本项目要求基于 SpinalHDL 和 Xilinx 'UltraScale FPGA Gen3 Integrated Block for PCI Express' IP 核提供 PCIe 支持与 PCIe sgDMA 实现. 要求至少支持一款 FPGA 开发板。</p>
<h3 id="项目七">项目七</h3>
<p><strong>SpinalHDL 库 DDRx SDRAM 通用控制器优化</strong></p>
<p><strong>项目简述：</strong> SpinalHDL 是基于 Scala 的新一代硬件描述语言，通过提高数字电路的设计抽象层次，从而大幅提高数字硬件的开发效率。针对 SpinalHDL 当前的 DDRx SDRAM 通用控制器不支持内存模块和 Bank Group 的问题，本项目要求优化 DDRx SDRAM 通用控制器的实现。</p>
<p><strong>项目链接：</strong><br>
<a href="https://summer-ospp.ac.cn/org/prodetail/231bd0385?list=org&#x26;navpage=org">https://summer-ospp.ac.cn/org/prodetail/231bd0385?list=org&#x26;navpage=org</a></p>
<h3 id="项目八">项目八</h3>
<p><strong>RDMA 协议的开源硬件实现</strong></p>
<p><strong>项目简述：</strong> RDMA 是高性能网络协议栈，常用于高性能计算以及高端存储领域。本项目要求采用新一代硬件描述语言，诸如 Bluespec SystemVerilog、SpinalHDL、Chisel 等来实现 RDMA 协议里的部分功能，具体功能要求见项目产出要求。</p>
<p><strong>项目链接：</strong>
<a href="https://summer-ospp.ac.cn/org/prodetail/231bd0386?list=org&#x26;navpage=org">https://summer-ospp.ac.cn/org/prodetail/231bd0386?list=org&#x26;navpage=org</a></p>
<h2 id="开源之夏-datenlord-项目往期获奖学生感言">开源之夏 DatenLord 项目往期获奖学生感言</h2>
<p>“我在 Async-rdma 项目中收获了一段难忘的经历。DatenLord 社区氛围很友好，我的导师是一位经验丰富的工程师，他鼓励我在验证我对项目的想法和假设的同时也要关注工程规范。这让我的视角从一个只关注实现产品原型的学生转变为一个同时也关注产品的可维护性和稳定性的专业工程师。”<br>
<strong>——王恒宇</strong>
<strong>中科院软件所硕士研究生</strong></p>
<p>“在 DatenLord 中参与 Rust for Linux 项目的工作很有意义。这是一个友好互助的社区。即使在修改一个很小的 bug 时，我的导师也鼓励我认真权衡不同的选择。教导我不仅仅是要能够写出代码，更重要的是写出优雅的代码。我在社区中收获到的不仅是理论上的，更是极具实操价值的。”
<strong>——李弘宇</strong>
<strong>北京邮电大学</strong>
<strong>网络与交换国家重点实验室硕士研究生</strong></p>
<p><strong>学生参与指北：</strong></p>
<ol>
<li>成功注册报名的学生自由选择项目。</li>
<li>对于感兴趣的项目，学生与社区导师沟通实现方案，并在官网提交项目计划书。</li>
<li>被选中的学生将在社区导师指导下，按计划完成项目开发工作，并将成果贡献给社区。</li>
<li>社区评估学生的完成度，主办方根据评估结果，给出最终评审结论并发放活动奖金</li>
</ol>
<p>详情请参考：<br>
<a href="https://summer-ospp.ac.cn/help/student/">https://summer-ospp.ac.cn/help/student/</a></p>
<h2 id="活动日程">活动日程</h2>
<p><strong>04/29-06/04</strong><br>
学生报名、挑选项目、与导师沟通并准备项目申请材料、提交申请</p>
<p><strong>06/05-06/25</strong><br>
项目申请审核</p>
<p><strong>06/26</strong><br>
中选公示</p>
<p><strong>07/01-09/30</strong><br>
项目开发</p>
<p><strong>10/01-10/31</strong><br>
导师结项审核-PR/MR 合并阶段</p>
<p><strong>11/01-11/08</strong><br>
组委会结项审核-成果审核阶段</p>
<p><strong>11/09</strong><br>
结项项目公示</p>
<p>对于报名方式有任何疑问，或者对某一个任务非常感兴趣，并且想要深入了解的同学，欢迎<strong>扫码添加小助手微信，加入 DatenLord 社区的开源之夏项目交流群。</strong></p>
<p><img src="${r}" alt="图片"></p>
<p>“开源之夏”活动在众多的开源项目与高校学生之间搭建了一座桥梁。同学们通过参与“开源之夏”的活动，在开源项目导师的指导下，不但可以丰富项目实践经验，提升项目开发的技能，而且可以与开源项目的开发者进行深度的交流，以一种最直接的方式了解开源，深入开源，为后续的学业方向提供参考，职业发展积累人脉。<strong>欢迎各位同学热情参与体验 DatenLord 的开源之夏项目！</strong></p>`;export{t as assetURLs,n as default,s as metadata,p as toc};

const n="/zh/assets/cover-99998007.jpg",e="/zh/assets/image1-6f9cec09.jpg",s=[n,e],t={label:"精彩回顾｜硬件敏捷开发与验证方法学研讨",description:"8月27日，作为2022年第二届RISC-V中国峰会的同期活动，达坦科技成功举办硬件敏捷开发与验证方法学研讨。虽然是线上分享活动，但大家热情依旧，会后在“硬件敏捷开发和验证方法学讨论群”中积极互动提问。长达四小时的就新一代HDL在数字芯片设计方面的实践经验分享，究竟碰撞出了什么新的火花呢？下面我们一起来回顾研讨会的精彩内容。",cover:"./cover.jpg",location:"中国香港",date:"2022-09-08",title:"Discussion on Hardware Agile Development and Verification Methodology"},o=[{label:"芯片敏捷设计与验证之路",level:2},{label:"香山处理器敏捷开发与验证实践",level:2},{label:"通过 Chainsaw 实现硬件算子敏捷开发",level:2},{label:"Scala 在 IC 开发中的应用",level:2},{label:"NaxRiscv CPU: Introduction and Extension Demonstration",level:2},{label:"结束语",level:2}],a=`<p><img src="${n}" alt="封面"></p>
<p>8 月 27 日，作为 2022 年第二届 RISC-V 中国峰会的同期活动，达坦科技成功举办硬件敏捷开发与验证方法学研讨。虽然是线上分享活动，但大家热情依旧，会后在“硬件敏捷开发和验证方法学讨论群”中积极互动提问。长达四小时的就新一代 HDL 在数字芯片设计方面的实践经验分享，究竟碰撞出了什么新的火花呢？下面我们一起来回顾研讨会的精彩内容。</p>
<h2 id="芯片敏捷设计与验证之路">芯片敏捷设计与验证之路</h2>
<p><strong>华南理工大学计算机科学与工程学院赖晓铮副教授</strong>首先分享了 “<strong>让硬件设计像软件设计一样简单</strong>”的愿景，即开发人员编写的代码只占工作量的 10%，剩下 90%由开源芯片生态系统提供。</p>
<p>他介绍了 HDL 语言的发展，强调 Verilog 语言多样性描述是把“双刃剑”，这就导致每个公司都有自己的 Verilog 模版的设计约束。此外，在这个 Meta HDL 的黄金时代，“<strong>万物皆可 HDL</strong>”，那么 Meta HDL 的含义就显得尤为重要，它不仅“超越”硬件描述语言，更是“元”硬件描述语言。赖教授以 Chisel 的 FIRRTL IR 为例，介绍了 MLIR 与 CIRCT，这两个软硬协同的 Multi- level IR- infrastructure 其中涉及的问题。他还将 PyChip 这一开源硬件敏捷设计与框架与 Chisel 进行对比，并着重介绍了 PyHCL IR 语法结构与解析过程，并且进行代码示例。目前 PyHCL 的编译速度达到 Chisel 的 100 倍左右，在 10 万行代码规模中，二者时间可以齐平，因此，赖教授认为可以就此展望单芯片 FPGA 的 openEmulator 的发展。</p>
<h2 id="香山处理器敏捷开发与验证实践">香山处理器敏捷开发与验证实践</h2>
<p><strong>中科院计算机所的王凯帆博士</strong>分别就香山项目基本情况、香山处理器开发进展以及支撑香山研发的敏捷开发基础设施这三个方面进行了分享。</p>
<p>在支持香山研发的敏捷开发基础设施中，王博士主要从设计流程和验证流程两方面进行展示。设计流程中介绍了开源 RISC-V 核与敏捷设计方法，及两个重要的决策：选择 Chisel 和重视构建支持敏捷设计的流程与工具。在敏捷性能验证方法中，王博士主要介绍了<strong>基于 Chisel 的设计空间探索方法和基于仿真的敏捷性能验证方法</strong>，前者虽然解决了准确度和重复工作的问题，但也带来了另一个问题：即如何保证性能验证的效率。后者敏捷验证虽然使用了更低成本完成验证工作，然而传统的性能验证方式在高性能处理器场景下成本依旧很高。王凯帆讲到，要加快性能验证速度，可以通过 RISC-Check point 提高仿真并行度，并通过特征采样来进一步选出具有代表性的程序片段。</p>
<p>最后，王博士进行了 demo 演示，通过现场演示生成 Verilog 代码、仿真环境下验证香山和工具展示来进一步进行说明。</p>
<h2 id="通过-chainsaw-实现硬件算子敏捷开发">通过 Chainsaw 实现硬件算子敏捷开发</h2>
<p><strong>中山大学电子与信息工程学院的李天瑞博士</strong>分享了自己通过 SpinalHDL 进行硬件算子敏捷开发的经验。</p>
<p>他首先回顾上一代硬件算子开发框架 Flopoco，说明了他们的成就和在设计入口上的不足。然后，他介绍了<strong>现代生成器语言在进行硬件算子敏捷开发时的优势</strong>，包括更清晰的语义，与并行语义高度契合的集合方法，丰富的面向对象建模能力和第三方库支持，以及更好的文档和注释系统。在此基础上，他<strong>介绍了目前正在进行的开源算子设计框架 Chiansaw 的一些进展</strong>，展示了 Chainsaw 中的设计模板对算子进行的抽象，以及与这种抽象相伴的一系列能力，包括自动测试，自动流水线，以及高度的可复用性。</p>
<p>最后，李博士说明了该项目的未来目标，包括完成一个面向 FPGA 开箱即用的硬件算子库，以及一套以模板设计为基础的 online judge 系统。</p>
<h2 id="scala-在-ic-开发中的应用">Scala 在 IC 开发中的应用</h2>
<p><strong>小米 SoC 设计专家郭继经</strong>在分享中，分别介绍了 Verilog 中出现的问题、HDL 发展的主要趋势以及 DSL-HDL 的机遇与挑战。</p>
<p>郭继经分别将 DSL-HDL 与 CAD-scripts 和 Super-Verilog 进行对比：第一组对比中 DSL-HDL 利用高级语言的抽象功能，可以进行更好的数据封装，而后者还需要自己写 Parser 以及处理海量的异常，其本质上还是在扁平化处理；与 Super-Verilog 的对比则更加明显，后者具有有限的关键字、没有扩展能力、宏能力有限等，而 Scala 相对于 SpinalHDL 是它的宏，可以随时对创造或加工电路对象，也赋予工程师灵活的手段去丰富电路对象。两组对比充分展现了 DSL-HDL 的优势性。</p>
<p>但他同时也强调，<strong>DSL-HDL 的未来机遇与风险并存</strong>。在复杂性方面，Scala 具有较大复杂性，其已有的第三方代码以及“能力越大责任越大”增加了对于复杂性的担忧；而同时我们又可以<strong>展望其在未来基于 SpinalHDL 的系统开发以及 SpinalHDL 作为底层开发辅助工具的难得机遇</strong>。层次化的 Lib 下，Spinal 提供核心 HDL 描述功能，Scala 提供参数化和元编程能力，使得其具有单平台质量闭环能力，也同样提供了高效的复用能力。</p>
<h2 id="naxriscv-cpu:-introduction-and-extension-demonstration">NaxRiscv CPU: Introduction and Extension Demonstration</h2>
<p><strong>Charles Papon 是新一代硬件描述语言 SpinalHDL 的创始人</strong>，他基于 SpinalHDL 实现了高性能 NaxRiscv 处理器。</p>
<p>在研讨会上，<strong>Charles 对 NaxRiscv 处理器详细介绍了其新特性以及扩展机制</strong>。他详细讲解了 NaxRiscv 的架构，并从仿真运行、扩展等方面依次进行了代码展示，步骤详尽介绍全面。Charles 指出 NaxRiscv 已经支持运行 Debian，并且在 GitHub 上开源。</p>
<h2 id="结束语">结束语</h2>
<p>软件的敏捷开发早已有之，在软件领域，从瀑布式开发到敏捷开发的转变，大大提高了迭代速度。因此，无论是学术界还是产业界都在积极探索硬件的开发怎么落地敏捷开发与验证。本次研讨会无疑为业界提供了一次深入探讨和交流的机会。</p>
<p>请点击如下链接：<br>
<a href="https://t.elecfans.com/live/2113.html%E6%94%B6%E7%9C%8B%E6%9C%AC%E6%AC%A1%E7%A0%94%E8%AE%A8%E4%BC%9A%E7%9A%84%E5%9B%9E%E6%94%BE%E3%80%82">https://t.elecfans.com/live/2113.html收看本次研讨会的回放。</a><br>
也欢迎添加小助手微信，加入“<strong>硬件敏捷开发和验证方法学讨论群</strong>”，进行延伸讨论与互动，并第一时间获得后续相关活动的讯息。</p>
<p><img src="${e}" alt="图片"></p>`;export{s as assetURLs,a as default,t as metadata,o as toc};

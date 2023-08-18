import cover1 from '@/assets/tech-talk/cover1.jpg'
import cover2 from '@/assets/tech-talk/cover2.jpg'
import cover3 from '@/assets/tech-talk/cover3.jpg'
import cover4 from '@/assets/tech-talk/cover4.jpg'
import cover5 from '@/assets/tech-talk/cover5.jpg'
import cover6 from '@/assets/tech-talk/cover6.jpg'
import cover7 from '@/assets/tech-talk/cover7.jpg'
import cover8 from '@/assets/tech-talk/cover8.jpg'
import cover9 from '@/assets/tech-talk/cover9.jpg'
import cover10 from '@/assets/tech-talk/cover10.jpg'
import cover11 from '@/assets/tech-talk/cover11.jpg'
import cover12 from '@/assets/tech-talk/cover12.jpg'
import cover13 from '@/assets/tech-talk/cover13.jpg'
import cover14 from '@/assets/tech-talk/cover14.jpg'
import cover15 from '@/assets/tech-talk/cover15.jpg'
import cover16 from '@/assets/tech-talk/cover16.jpg'
import cover17 from '@/assets/tech-talk/cover17.jpg'
import cover18 from '@/assets/tech-talk/cover18.jpg'
import cover19 from '@/assets/tech-talk/cover19.jpg'
import cover20 from '@/assets/tech-talk/cover20.jpg'
import cover21 from '@/assets/tech-talk/cover21.jpg'
import cover22 from '@/assets/tech-talk/cover22.jpg'
import cover23 from '@/assets/tech-talk/cover23.jpg'
import cover24 from '@/assets/tech-talk/cover24.jpg'
import cover25 from '@/assets/tech-talk/cover25.jpg'
import cover26 from '@/assets/tech-talk/cover26.jpg'
import cover27 from '@/assets/tech-talk/cover27.jpg'
import cover28 from '@/assets/tech-talk/cover28.jpg'
import cover29 from '@/assets/tech-talk/cover29.jpg'
import cover30 from '@/assets/tech-talk/cover30.jpg'
import cover31 from '@/assets/tech-talk/cover31.jpg'
import cover32 from '@/assets/tech-talk/cover32.jpg'
import cover33 from '@/assets/tech-talk/cover33.jpg'
import cover34 from '@/assets/tech-talk/cover34.jpg'
import cover35 from '@/assets/tech-talk/cover35.jpg'
import cover36 from '@/assets/tech-talk/cover36.jpg'
import cover37 from '@/assets/tech-talk/cover37.jpg'
import cover38 from '@/assets/tech-talk/cover38.jpg'
import cover39 from '@/assets/tech-talk/cover39.jpg'
import cover40 from '@/assets/tech-talk/cover40.jpg'
import cover41 from '@/assets/tech-talk/cover41.jpg'
import cover42 from '@/assets/tech-talk/cover42.jpg'
import cover43 from '@/assets/tech-talk/cover43.jpg'

export const techTalkItems = [
  {
    key: 1,
    image: cover1,
    title: 'Virtio-net相关知识介绍与Rust-for-Linux基本知识',
    text: '本场workshop由达坦科技李弘宇进行内容分享，主要介绍了Virtio-net相关知识介绍与Rust-for-Linux基本知识。欢迎参加达坦科技DatenLord相关开源项目：https://github.com/datenlord/linux/tree/rust_virtio',
    date: '2022.08.17',
    url: 'https://www.bilibili.com/video/BV17G4y1a7Bv/',
  },
  {
    key: 2,
    image: cover2,
    title: 'roce-sim Workshop分享',
    text: '本场workshop由达坦科技王恒宇进行内容分享，主要介绍了roce-sim相关知识分享，如果您对这方面有兴趣，欢迎参与达坦科技开源项目:Github链接：https://github.com/datenlord/roce-sim',
    date: '2022.08.25',
    url: 'https://www.bilibili.com/video/BV1UB4y137Tn/',
  },
  {
    key: 3,
    image: cover3,
    title: 'Cocotb Workshop分享',
    text: '本场workshop由达坦科技DatenLord 翁万正进行内容分享，主要进行了cocotb相关知识介绍。',
    date: '2022.09.23',
    url: 'https://www.bilibili.com/video/BV19e4y1k7EE/',
  },
  {
    key: 4,
    image: cover4,
    title: '使用Copilot在分布式系统中容忍暂时变慢的节点',
    text: '本场workshop由达坦科技DatenLord 田野进行内容分享，主要进行了“使用Copilot在分布式系统中容忍暂时变慢的节点“相关知识介绍。',
    date: '2022.09.30',
    url: 'https://www.bilibili.com/video/BV15e411T7pX/',
  },
  {
    key: 5,
    image: cover5,
    title: '硬件设计的集合方法',
    text: '本场workshop由达坦科技DatenLord李天瑞进行内容分享，主要进行了“硬件设计的集合方法”相关知识介绍。',
    date: '2022.10.09',
    url: 'https://www.bilibili.com/video/BV1FK411Q7JV/',
  },
  {
    key: 6,
    image: cover6,
    title: 'VLSI Sharing',
    text: '本场workshop由达坦科技DatenLord李天瑞进行内容分享，主要进行了VLSI相关知识介绍。',
    date: '2022.10.15',
    url: 'https://www.bilibili.com/video/BV1bK411Q7GB/',
  },
  {
    key: 7,
    image: cover7,
    title: 'Corumdum介绍',
    text: '本场workshop由西安电子科技大学 ISN网络与交换团队 硕士研究生李钊进行内容分享，主要进行了Corumdum相关知识介绍。',
    date: '2022.10.16',
    url: 'https://www.bilibili.com/video/BV1qG41177Pq/',
  },
  {
    key: 8,
    image: cover8,
    title: '可编程交换机：原理与使用',
    text: '本场workshop由上海交通大学IPADS实验室博士二年级 张汉泽进行内容分享，主要进行了“可编程交换机：原理与使用”相关知识分享。可编程交换机由安装包处理规则的控制面与负责高速包处理的数据面构成，两者由一根PCIe总线相连。控制面支持高级语言编程，而数据面逻辑需要用P4语言编写。在可编程交换机上设计系统主要面临数据面内存有限与P4编程模型受限两大挑战。',
    date: '2022.10.23',
    url: 'https://www.bilibili.com/video/BV1jm4y1w7w3/',
  },
  {
    key: 9,
    image: cover9,
    title: '形式化验证入门',
    text: '本场workshop由达坦科技DatenLord王璞进行内容分享，主要进行了形式化验证入门相关知识介绍。',
    date: '2022.10.26',
    url: 'https://www.bilibili.com/video/BV1DG411L78p/',
  },
  {
    key: 10,
    image: cover10,
    title: '利用RDMA加速FaaS服务',
    text: '本场workshop由达坦科技DatenLord李弘宇进行内容分享，主要进行了“利用RDMA加速FaaS服务”相关知识介绍。',
    date: '2022.11.06',
    url: 'https://www.bilibili.com/video/BV1et4y1K7Sw/',
  },
  {
    key: 11,
    image: cover11,
    title: 'Rust for Linux',
    text: '本场workshop由苏宇恒进行内容分享，主要进行了“Rust for Linux”相关知识介绍。',
    date: '2022.11.08',
    url: 'https://www.bilibili.com/video/BV1G8411a7CE/',
  },
  {
    key: 12,
    image: cover12,
    title: 'Intel用户态中断',
    text: '本场workshop由韩明聪进行内容分享，主要进行了“Intel用户态中断”相关知识介绍。',
    date: '2022.11.08',
    url: 'https://www.bilibili.com/video/BV1tG4y1t7Lg/',
  },
  {
    key: 13,
    image: cover13,
    title: 'VLSI DSP Sharing',
    text: '本场workshop由达坦科技DatenLord李天瑞进行内容分享，主要进行了“VLSI DSP Intro”相关知识介绍。',
    date: '2022.11.11',
    url: 'https://www.bilibili.com/video/BV18P4y1y7iP/',
  },
  {
    key: 14,
    image: cover14,
    title: 'DSP Sharing Part2',
    text: '本场workshop由达坦科技DatenLord李天瑞进行内容分享，主要就DSP相关知识进行第二次workshop分享',
    date: '2022.11.12',
    url: 'https://www.bilibili.com/video/BV1bM411k7YP/',
  },
  {
    key: 15,
    image: cover15,
    title: 'eunomia-bpf: 结合 wasm 的 ebpf 轻量级开发框架',
    text: '本场workshop由浙江大学学生/eunomia-bpf 开发者 郑昱笙进行内容分享，主要内容围绕“eunomia-bpf: 结合 wasm 的 ebpf 轻量级开发框架”相关知识。',
    date: '2022.11.20',
    url: 'https://www.bilibili.com/video/BV1u84y1C7pQ/',
  },
  {
    key: 16,
    image: cover16,
    title: 'RDMA网络拥塞管理架构',
    text: '本场workshop由北京邮电大学网络与交换国家重点实验室、计算机学院，副研究员、博导：张乙然进行内容分享，主要内容围绕“RDMA网络拥塞管理架构”进行知识介绍。',
    date: '2022.11.27',
    url: 'https://www.bilibili.com/video/BV1Ve4y1g7gx/',
  },
  {
    key: 17,
    image: cover17,
    title: '使用RDMA加速服务器无感知计算容器启动',
    text: '本场workshop由上海交通大学助理教授魏星达进行分享，主要内容围绕“使用RDMA加速服务器无感知计算容器启动”进行知识介绍。',
    date: '2022.12.04',
    url: 'https://www.bilibili.com/video/BV1qG4y1G784/',
  },
  {
    key: 18,
    image: cover18,
    title: 'OPAE-Xilinx平台级复用开源项目介绍',
    text: '本场workshop由微软亚洲工程院Brainwave Beijing项目组经理杨碧波进行分享，主要内容为OPAE-Xilinx平台级复用开源项目介绍。',
    date: '2022.12.11',
    url: 'https://www.bilibili.com/video/BV1AP4y1D7bK/',
  },
  {
    key: 19,
    image: cover19,
    title: '基于智能网卡的数据处理系统',
    text: '本场workshop由浙江大学百人计划研究员 王则可进行分享，主要内容为“基于智能网卡的数据处理系统”介绍。',
    date: '2022.12.18',
    url: 'https://www.bilibili.com/video/BV1Eg411J7fJ/',
  },
  {
    key: 20,
    image: cover20,
    title: '异步事件驱动的电路机制 & 基于RISC-V的全异步超标量CPU体系结构',
    text: '本场workshop由何安平副教授进行分享，主要内容为“异步事件驱动的电路机制 & 基于RISC-V的全异步超标量CPU体系结构”介绍。',
    date: '2022.12.25',
    url: 'https://www.bilibili.com/video/BV1sA411D7on/',
  },
  {
    key: 21,
    image: cover21,
    title: '使用 TLA+ 为分布式算法验证正确性',
    text: '本场workshop由达坦科技DatenLord田野进行分享，主要内容为“使用 TLA+ 为分布式算法验证正确性”介绍。',
    date: '2023.01.09',
    url: 'https://www.bilibili.com/video/BV1pG4y1y7an/',
  },
  {
    key: 22,
    image: cover22,
    title: '喷泉码技术简介',
    text: '本场workshop由兰州大学信息科学与工程学院副教授、通信工程专业系主任袁磊 进行分享，主要内容为“喷泉码技术简介”介绍。',
    date: '2023.01.15',
    url: 'https://www.bilibili.com/video/BV1SM411b77k/',
  },
  {
    key: 23,
    image: cover23,
    title: '数据库隔离级别及MVCC',
    text: '本场workshop由达坦科技DatenLord施继成进行分享，主要内容为“数据库隔离级别及MVCC”介绍。',
    date: '2023.01.29',
    url: 'https://www.bilibili.com/video/BV1sR4y1b7Cu/',
  },
  {
    key: 24,
    image: cover24,
    title: '互联网传输协议优化研究',
    text: '本场workshop由中国人民大学副教授李彤教授进行分享，主要内容为“互联网传输协议优化研究”介绍。',
    date: '2023.02.06',
    url: 'https://www.bilibili.com/video/BV1X84y157vL/',
  },
  {
    key: 25,
    image: cover25,
    title: '高性能RDMA网络协议栈',
    text: '高性能RDMA网络协议栈是RDMA高性能网络的核心组成部分之一，它提供了支持RDMA技术的网络协议和驱动程序。在本周的前沿科技分享中，我们邀请到了湖南大学信息科学与工程学院的陈果教授来给我们分享高性能RDMA网络协议栈的话题。',
    date: '2023.02.28',
    url: 'https://www.bilibili.com/video/BV1Y24y1n7Dk/',
  },
  {
    key: 26,
    image: cover26,
    title: 'GPU抢占式任务调度',
    text: 'GPU编程可以大幅提升计算速度和效率，从而使得许多计算任务得以在合理时间内完成。随着GPU硬件技术的发展和大规模数据处理需求的增加，GPU编程的应用范围不断扩大。在本周的前沿科技分享中，我们邀请到了上海交通大学并行与分布式研究所的韩明聪博士来给我们分享GPU抢占式任务调度。',
    date: '2023.03.05',
    url: 'https://www.bilibili.com/video/BV1cY4y1y7ND/',
  },
  {
    key: 27,
    image: cover27,
    title: '聊聊RaptorQ纠错码',
    text: '喷泉码具有极高的纠错能力，且具有低延迟、地复杂度、高效率等优点，使其在冷存储、分布式存储、无线通信等领域得到广泛应用。达坦科技致力于软硬件融合的解决方案，喷泉码的高效实现在硬件上，作为公司长期的技术储备，在本周的前沿科技分享中，达坦科技的联合创始人兼CTO施继成将为大家分享聊聊 RaptorQ 纠错码 。',
    date: '2023.03.15',
    url: 'https://www.bilibili.com/video/BV1wL411C7DL/',
  },
  {
    key: 28,
    image: cover28,
    title: 'Buddy Compiler 简介和愿景',
    text: '在本次分享中，中国科学院软件研究所博士生张洪滨将介绍Buddy Compiler 编译流程、协同设计、硬件支持。Buddy Compiler 是领域特定的编译器框架，致力于打造基于 MLIR 和 RISC-V 的软硬件协同设计生态。其目标是实现从 DSL 到 DSA 的编译流程和协同设计，愿景是让领域特定的协同设计不再困难。',
    date: '2023.03.21',
    url: 'https://www.bilibili.com/video/BV1YT41167GB/',
  },
  {
    key: 29,
    image: cover29,
    title: '新一代计算架构：超异构计算',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。AGI带来的变化之一是算力将进一步从CPU转到GPU，在本周的前沿技术分享中，我们邀请到了上海矩向科技创始人兼CEO黄朝波为大家分享新一代计算架构：超异构计算。',
    date: '2023.04.04',
    url: 'https://www.bilibili.com/video/BV1Rm4y1q7Dx/',
  },
  {
    key: 30,
    image: cover30,
    title: '通过Chainsaw设计DSP电路',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。DSP在数据压缩、编码和加密方面都发挥了重要的作用；SpinalHDL具有更高的抽象层次和更强的表达能力，可以大大简化DSP电路设计的复杂度和提高开发效率；而Chainsaw框架可以在不同的FPGA平台上运行，提高了设计的灵活性和可移植性。在本周的前沿技术分享中，我们邀请到了中山大学在读博士李天瑞为大家分享通过Chainsaw设计DSP电路。',
    date: '2023.04.18',
    url: 'https://www.bilibili.com/video/BV14o4y1j7bH/',
  },
  {
    key: 31,
    image: cover31,
    title: 'Something About Cache Security',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。在本周的前沿技术分享中，我们邀请到了浙江大学在读硕士研究生缪晨露为大家分享她在MICRO和HPCA上发表的两篇论文的精华，演讲主题是Something About Cache Security。',
    date: '2023.04.25',
    url: 'https://www.bilibili.com/video/BV1p24y1F7fN/',
  },
  {
    key: 32,
    image: cover32,
    title: 'Rust嵌入式开发生态介绍及入门',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。在本周的前沿技术分享中，我们邀请到了一位爱好硬件的软件工程师米明恒，来为大家分享Rust嵌入式开发生态介绍及入门。',
    date: '2023.05.04',
    url: 'https://www.bilibili.com/video/BV1J24y1T7EH/',
  },
  {
    key: 33,
    image: cover33,
    title: 'RDMA赋能数据中心/超算中心间远程互联',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。在本周的前沿技术分享中，我们邀请到了南京大学田臣教授，来为大家分享RDMA赋能数据中心/超算中心间远程互联。',
    date: '2023.06.04',
    url: 'https://www.bilibili.com/video/BV1cz4y1B7cx/',
  },
  {
    key: 34,
    image: cover34,
    title: 'Paper Reading: DPU任务卸载',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。达坦科技一直在探索用硬件加速做分布式跨云存储，在本周的前沿技术分享中，我们邀请到了中南大学在读博士生卢军，来为大家分享DPU任务卸载的相关研究。',
    date: '2023.06.17',
    url: 'https://www.bilibili.com/video/BV1R14y1S79T/',
  },
  {
    key: 35,
    image: cover35,
    title: 'Rust在物理引擎研发中的应用',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。在本周的前沿技术分享中，我们邀请到了Motphys CEO崔汉青，来为大家分享Rust在物理引擎研发中的应用。',
    date: '2023.06.27',
    url: 'https://b23.tv/BZuSvyW',
  },
  {
    key: 36,
    image: cover36,
    title: 'Coroutines Applied to a Tilelink Interconnect Elaboration',
    text: 'SpinalHDL始于2014年，最初是作为VHDL/Verilog的替代而做的创新尝试，伴随着数年来开源硬件设计的蓬勃发展，基于开源技术的硬件设计方法和范式逐渐受到业界的关注。达坦科技联合了SpinalHDL社区，以及四川芯测电子技术有限公司举办了一场题为SpinalHDL的使用和开发经验研讨会，旨在和大家分享SpinalHDL最新的实践、挑战和经验的分享。本视频为Workshop的第一部分，由Charles Popen进行分享。',
    date: '2023.07.08',
    url: 'https://www.bilibili.com/video/BV1Vz4y1J7ck/',
  },
  {
    key: 36,
    image: cover36,
    title: 'Coroutines Applied to a Tilelink Interconnect Elaboration',
    text: 'SpinalHDL始于2014年，最初是作为VHDL/Verilog的替代而做的创新尝试，伴随着数年来开源硬件设计的蓬勃发展，基于开源技术的硬件设计方法和范式逐渐受到业界的关注。达坦科技联合了SpinalHDL社区，以及四川芯测电子技术有限公司举办了一场题为SpinalHDL的使用和开发经验研讨会，旨在和大家分享SpinalHDL最新的实践、挑战和经验的分享。本视频为Workshop的第一部分，由Charles Popen进行分享。',
    date: '2023.07.08',
    url: 'https://www.bilibili.com/video/BV1Vz4y1J7ck/',
  },
  {
    key: 37,
    image: cover37,
    title: 'Stream Transaction Extender设计与验证',
    text: 'SpinalHDL始于2014年，最初是作为VHDL/Verilog的替代而做的创新尝试，伴随着数年来开源硬件设计的蓬勃发展，基于开源技术的硬件设计方法和范式逐渐受到业界的关注。达坦科技联合了SpinalHDL社区，以及四川芯测电子技术有限公司举办了一场题为SpinalHDL的使用和开发经验研讨会，旨在和大家分享SpinalHDL最新的实践、挑战和经验的分享。本视频为Workshop的第二部分，由电子科技大学副教授肖寅东（Readon）进行分享。',
    date: '2023.07.08',
    url: 'https://www.bilibili.com/video/BV1pM4y1j7Lm/',
  },
  {
    key: 38,
    image: cover38,
    title: '面向Multi-Die FPGA的设计与部署自动化方法探索',
    text: 'SpinalHDL始于2014年，最初是作为VHDL/Verilog的替代而做的创新尝试，伴随着数年来开源硬件设计的蓬勃发展，基于开源技术的硬件设计方法和范式逐渐受到业界的关注。达坦科技联合了SpinalHDL社区，以及四川芯测电子技术有限公司举办了一场题为SpinalHDL的使用和开发经验研讨会，旨在和大家分享SpinalHDL最新的实践、挑战和经验的分享。本视频为Workshop的第三部分，由西安交通大学副教授邸志雄进行分享。',
    date: '2023.07.08',
    url: 'https://www.bilibili.com/video/BV1og4y1c7RS/',
  },
  {
    key: 39,
    image: cover39,
    title: '计算机体系结构MIT课程学习社区经验分享',
    text: '在2023年初，达坦科技发起成立硬件设计学习社区，邀请所有有志于从事数字芯片设计的同学加入我们的学习互助自学小组，以理解数字芯片设计的精髓，强化理论知识的同时提升实操技能，继而整体提升设计能力。本场分享主题为【计算机体系结构MIT课程学习社区经验分享】，旨在了解学习社区各位同学学习的状态和面临的挑战，邀请已完成课程的学员分享学习和动手操作LAB的经验和教训，以此更好地辅助大家完成课程。',
    date: '2023.07.08',
    url: 'https://www.bilibili.com/video/BV1cs4y1r7T3/',
  },
  {
    key: 40,
    image: cover40,
    title: '基于BSV的RTL仿真加速设计研究',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。BSV的仿真加速可以提升硬件开发调试的效率。在本周的前沿技术分享中，我们邀请到了梁之杰，来为大家分享基于BSV的RTL仿真加速设计研究。',
    date: '2023.07.09',
    url: 'https://www.bilibili.com/video/BV1ou411L7Yy/',
  },
  {
    key: 41,
    image: cover41,
    title: 'RDMA网络的系统测试方案',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。在本周的前沿技术分享中，我们邀请到了孔心皓，来为大家分享RDMA 网络的系统测试方案。',
    date: '2023.07.16',
    url: 'https://www.bilibili.com/video/BV1tz4y147rw/',
  },
  {
    key: 42,
    image: cover42,
    title: 'RapidWright技术分享会',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。在本周的前沿技术分享中，我们邀请到了西南交通大学邸志雄副教授和他的学生向瀚章，来为大家分享开源FPGA设计工具RapidWright技术。',
    date: '2023.07.28',
    url: 'https://www.bilibili.com/video/BV14z4y1x7a8/',
  },
  {
    key: 43,
    image: cover43,
    title: '基于Karmada实现Kubernetes应用跨集群故障转移',
    text: '达坦科技专注于打造新一代开源跨云存储平台DatenLord，通过软硬件深度融合的方式打通云云壁垒，致力于解决多云架构、多数据中心场景下异构存储、数据统一管理需求等问题，以满足不同行业客户对海量数据跨云、跨数据中心高性能访问的需求。在本周的前沿技术分享中，我们邀请到了开源爱好者，云兴科技软件研发工程师梁远鹏，来为大家分享基于Karmada实现Kubernetes应用跨集群故障转移。',
    date: '2023.08.01',
    url: 'https://www.bilibili.com/video/BV1rN411Y7aZ/',
  },
]

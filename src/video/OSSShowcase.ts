import cover1 from '@/assets/oss-showcase/cover1.jpg'
import cover2 from '@/assets/oss-showcase/cover2.jpg'
import cover3 from '@/assets/oss-showcase/cover3.jpg'

export const OSSShowcaseItems = [
  {
    key: 1,
    image: cover1,
    title: 'Xline-跨数据中心一致性的元数据管理',
    text: '天空计算是云平台上的一层，其目标是打通彼此孤立的云，将分布式系统从数据中心范围扩展到全球范围。Xline是一款开源分布式KV存储系统，基于Curp共识算法实现，旨在提供跨云元数据管理的功能。相比于传统共识协议Raft或Paxos，Curp在天空计算的场景中有着更好的性能表现。本次分享将聚焦于共识算法，从天空计算的背景和挑战出发，介绍Curp共识算法，以及Revision机制与Curp无序性语义之间的冲突，最后，简述下Xline未来的优化方向。欢迎了解更多关于Xline的信息：Https://github.com/datenlord/Xline',
    date: '2023.02.09',
    url: 'https://www.bilibili.com/video/BV1XY411q7X8/',
  },
  {
    key: 2,
    image: cover2,
    title: '源码解读：Xline Curp共识协议的设计与实现',
    text: '传统单数据中心解决方案无法满足跨数据中心的场景对性能和一致性的需求。DatenLord推出开源分布式KV存储Xline，针对多数据中心场景，可以实现数据的高性能跨云、跨数据中心共享访问，并且保证数据的一致性。',
    date: '2023.04.30',
    url: 'https://www.bilibili.com/video/BV1dL411h7YK/',
  },
  {
    key: 3,
    image: cover3,
    title: 'Xline的Lease机制与实现',
    text: '传统单数据中心解决方案无法满足跨数据中心的场景对性能和一致性的需求。DatenLord推出开源分布式KV存储Xline，针对多数据中心场景，可以实现数据的高性能跨云、跨数据中心共享访问，并且保证数据的一致性。',
    date: '2023.06.09',
    url: 'https://www.bilibili.com/video/BV1FX4y1h7X5/',
  },
]

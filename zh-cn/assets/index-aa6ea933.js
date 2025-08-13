const t="/zh-cn/assets/cover-ccfdc2fa.jpg",e="/zh-cn/assets/image1-9be7272d.jpg",a="/zh-cn/assets/image2-20a7bcaa.jpg",n=[t,e,a],c={label:"DatenLord X Segmentfault直播预告 | CURP协议的工业化实践",description:"传统单数据中心解决方案无法满足跨数据中心的场景对性能和一致性的需求。DatenLord推出开源的分布式KV存储Xline，针对多数据中心场景，实现数据的高性能跨云、跨数据中心共享访问，并且保证数据的一致性，方便业务系统实现多地多中心多活部署。",cover:"./cover.jpg",location:"新加坡",date:"2023-08-15",title:"DatenLord X Segmentfault Live Stream Preview l CURP Protocol in Industrial Practice"},s=[{label:"CURP 协议",level:2}],o=`<p><img src="${t}" alt="图片"></p>
<h2 id="curp-协议">CURP 协议</h2>
<p>传统单数据中心解决方案无法满足跨数据中心的场景对性能和一致性的需求。<strong>DatenLord 推出开源的分布式 KV 存储 Xline</strong>，针对多数据中心场景，实现数据的高性能跨云、跨数据中心共享访问，并且保证数据的一致性，方便业务系统实现多地多中心多活部署。</p>
<p>Xline 中所使用的共识协议，即非 Paxos ，也非 Raft，而是一种新的名为 Curp 的共识协议，其全称为 “Consistent Unordered Replication Protocol”。CURP 协议发表于 2019 年，其协议主要论述的是主从备份的场景，共识场景仅仅在附录中有简单表述，缺乏严肃验证。</p>
<p>然而，共识算法的正确性是至关重要的，在生产场景中尤为如此，因此我们尝试使用 TLA+ 工具进行严肃的验证，以此获得 CURP 共识协议的正确性保证。</p>
<p>本次直播分享，达坦科技联合思否，邀请达坦科技的联合创始人兼 CTO 施继成做一个关于 CURP 协议的工业化实践的直播，分享将论述 CURP 协议的正确性，同时以 KV 存储软件 Xline 为例子讲述如何在工业产品中使用该共识算法。</p>
<p><img src="${e}" alt="图片"></p>
<p><strong>会议号：474-6575-9473</strong></p>
<p><img src="${a}" alt="图片"></p>`;export{n as assetURLs,o as default,c as metadata,s as toc};

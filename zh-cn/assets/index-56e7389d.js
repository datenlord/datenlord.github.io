const l="/zh-cn/assets/cover-b206ef91.jpg",e="/zh-cn/assets/image1-e0f43926.jpg",t="/zh-cn/assets/image2-d20c4e0b.jpg",a="/zh-cn/assets/image1-50beaba8.png",o=[l,e,t,a],i={label:"2023 hackathon攻略新鲜出炉！最后一周还不速来报名！",description:"DatenLord Hackathon 2023正式启动！达坦科技基于其跨云分布式文件系统DatenLord项目，结合AI大模型时代背景，搭建了擂台，在此正式向您发出邀约！本次大赛赛题深刻有趣，奖品丰厚多样，借此机会您不仅可以尽情施展才华、与来自全国各地优秀的青年才俊们同台PK，更将有机会与优秀的评委教师对话交流。Clock is Ticking！无需犹豫，行动起来，抓住机遇，创造奇迹！",cover:"./cover.jpg",location:"中国香港",date:"2023-12-05",title:"Ding! 2023 hackathon tips fresh from the oven! Last week to sign up before it's too late!"},n=[{label:"Hackathon2023",level:2},{label:"大赛时间线",level:3},{label:"达坦科技 DatenLord 赛题",level:2},{label:"主题",level:3},{label:"背景介绍",level:3},{label:"赛题介绍",level:3},{label:"项目目标",level:3},{label:"项目假设",level:3},{label:"评估标准",level:3},{label:"注意事项",level:3}],p=`<p><img src="${l}" alt="图片"></p>
<h2 id="hackathon2023">Hackathon2023</h2>
<p><strong>DatenLord Hackathon 2023 正式启动！</strong> 达坦科技基于其跨云分布式文件系统 <strong>DatenLord</strong> 项目，结合 AI 大模型时代背景，搭建了擂台，在此正式向您发出邀约！</p>
<p>本次大赛赛题深刻有趣，奖品丰厚多样，借此机会您不仅可以尽情施展才华、与来自全国各地优秀的青年才俊们同台 PK，更将有机会与优秀的评委教师对话交流。Clock is Ticking！无需犹豫，行动起来，抓住机遇，创造奇迹！</p>
<h3 id="大赛时间线">大赛时间线</h3>
<p>本次挑战赛于 11 月 18 日开放报名。赛事日程表已经新鲜出炉：</p>
<p><strong>报名+组队：11.18 ～ 12.10</strong><br>
组委会整理报名资料：12.10-12.12<br>
开发：12.12 ～ 12.15<br>
<strong>作品提交：12.16</strong><br>
作品初评：12.17 ～ 12.23（评委会投票）<br>
大赛线上路演：12.28<br>
作品颁奖：12.30</p>
<p><img src="${e}" alt="图片"></p>
<h2 id="达坦科技-datenlord-赛题">达坦科技 DatenLord 赛题</h2>
<h3 id="主题">主题</h3>
<p><strong>Explore the Possibilities</strong></p>
<h3 id="背景介绍">背景介绍</h3>
<p>AI 大模型的时代已经来临，大模型训练和推导对数据访问速率的要求也比较高，在某些场景下对存储系统的压力会变得非常大。其中的一种访问 pattern 描述如下：在短时间内，集群中大多数机器对某一个（或者几个）大文件需要同步读取，如果能够在机器之间进行 p2p 的数据传输，存储服务的压力会大大减小，最终提高整个系统的运行效率。</p>
<h3 id="赛题介绍">赛题介绍</h3>
<p>DatenLord 是跨云分布式文件系统，对上层提供 Posix 兼容的文件系统接口，同时针对多云多数据中心的场景进行数据访问加速。DatenLord 使用了本地缓存来加速文件访问速度，缓存中的数据从后端的持久化存储中读取，例如 S3 兼容的对象存储。在某些极端场景中，集群会对同一个或者几个大文件同时进行读取，此时后端的持久化存储的读取压力会剧增，大大降低整个系统的性能和响应速度。针对这种场景，我们需要对这种数据访问模式进行优化，实现缓存之间的 p2p 传输。请参赛选手（或者队伍）针对这种场景，为 DatenLord 设计并实现缓存 p2p 传输和同步模块。</p>
<h3 id="项目目标">项目目标</h3>
<ol>
<li>实现 SIMPLE 内存缓存。</li>
<li>实现 p2p 文件分发协议，以加速缓存升级。</li>
<li>实施测试以验证上述内容是否完成，并找到评估性能的方法。</li>
</ol>
<h3 id="项目假设">项目假设</h3>
<ol>
<li>为简单起见，只使用内存缓存，不使用磁盘缓存。</li>
<li>文件按块存储在 S3 中，块大小固定。</li>
<li>文件元数据保存在本地内存中，例如 HashMap。假设它们在所有节点之间保持一致。</li>
</ol>
<h3 id="评估标准">评估标准</h3>
<p>达坦科技评委会将基于以下三个标准对于提交的作品进行评估：</p>
<ol>
<li>实现功能的完整性</li>
<li>实现性能的优异</li>
<li>代码的规范程度</li>
</ol>
<h3 id="注意事项">注意事项</h3>
<ol>
<li>每支队伍成员限制 1-5 人</li>
<li>第一行代码 commit 时间不得早于 12 月 11 号 23:59，否则视为违规，取消比赛资格</li>
<li>每个项目一个独立目录提交，文件名为团队拼音</li>
<li>代码统一提交至：<br>
<a href="https://github.com/datenlord/Hackathon-2023/">https://github.com/datenlord/Hackathon-2023/</a></li>
</ol>
<p>报名链接即将于 12 月 10 日关闭，感兴趣的同学欢迎抓紧时间报名参加！点击“阅读原文”或扫描以下二维码报名：<br>
报名链接：<br>
<a href="https://www.wjx.cn/vm/rm8zjUu.aspx#">https://www.wjx.cn/vm/rm8zjUu.aspx#</a><br>
报名二维码：</p>
<p><img src="${t}" alt="图片"></p>
<p>如有任何问题欢迎联系达坦科技微信小助手：<strong>DatenLord_Tech</strong>或发送邮件至
<a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p><img src="${a}" alt="图片"></p>`;export{o as assetURLs,p as default,i as metadata,n as toc};

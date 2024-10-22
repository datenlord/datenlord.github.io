const t="/zh-cn/assets/image1-b170e804.jpg",a="/zh-cn/assets/image2-29d090cb.png",o="/zh-cn/assets/image1-50beaba8.png",n=[t,a,o],e={label:"叮！您收到了一封来自达坦科技的Hackthon邀请函",description:"DatenLord Hackathon 2023正式启动！达坦科技基于其跨云分布式文件系统DatenLord项目，结合AI大模型时代背景，搭建了擂台，在此正式向您发出邀约！本次大赛赛题深刻有趣，奖品丰厚多样，借此机会您不仅可以尽情施展才华、与来自全国各地优秀的青年才俊们同台PK，更将有机会与优秀的评委教师对话交流。Clock is Ticking！无需犹豫，行动起来，抓住机遇，创造奇迹！",location:"中国香港",date:"2023-11-17",title:"Ding! You've received a Hackthon invitation from Dartan Technologies!"},s=[{label:"Hackathon2023",level:2},{label:"主题",level:2},{label:"大赛时间线",level:2},{label:"背景介绍",level:2},{label:"赛题介绍",level:2},{label:"评估标准",level:2},{label:"赛题宣讲会",level:2}],l=`<h2 id="hackathon2023">Hackathon2023</h2>
<p><strong>DatenLord Hackathon 2023 正式启动！</strong> 达坦科技基于其跨云分布式文件系统 DatenLord 项目，结合 AI 大模型时代背景，搭建了擂台，在此正式向您发出邀约！</p>
<p>本次大赛赛题深刻有趣，奖品丰厚多样，借此机会您不仅可以尽情施展才华、与来自全国各地优秀的青年才俊们同台 PK，更将有机会与优秀的评委教师对话交流。Clock is Ticking！无需犹豫，行动起来，抓住机遇，创造奇迹！</p>
<h2 id="主题">主题</h2>
<p><strong>Explore the Possibilities</strong></p>
<h2 id="大赛时间线">大赛时间线</h2>
<p><strong>报名+组队：11.18 ～ 12.10</strong><br>
组委会整理报名资料：12.10-12.12<br>
开发：12.12 ～ 12.15<br>
<strong>作品提交：12.16</strong><br>
作品初评：12.17 ～ 12.23（评委会投票）<br>
大赛线上路演：12.28<br>
作品颁奖：12.30</p>
<h2 id="背景介绍">背景介绍</h2>
<p>AI 大模型的时代已经来临，大模型训练和推导对数据访问速率的要求也比较高，在某些场景下对存储系统的压力会变得非常大。其中的一种访问 pattern 描述如下：在短时间内，集群中大多数机器对某一个（或者几个）大文件需要同步读取，如果能够在机器之间进行 p2p 的数据传输，存储服务的压力会大大减小，最终提高整个系统的运行效率。</p>
<h2 id="赛题介绍">赛题介绍</h2>
<p>DatenLord 是跨云分布式文件系统，对上层提供 Posix 兼容的文件系统接口，同时针对多云多数据中心的场景进行数据访问加速。DatenLord 使用了本地缓存来加速文件访问速度，缓存中的数据从后端的持久化存储中读取，例如 S3 兼容的对象存储。在某些极端场景中，集群会对同一个或者几个大文件同时进行读取，此时后端的持久化存储的读取压力会剧增，大大降低整个系统的性能和响应速度。针对这种场景，我们需要对这种数据访问模式进行优化，实现缓存之间的 p2p 传输。请参赛选手（或者队伍）针对这种场景，为 DatenLord 设计并实现缓存 p2p 传输和同步模块。</p>
<h2 id="评估标准">评估标准</h2>
<p>达坦科技评委会将基于以下三个标准对于提交的作品进行评估：</p>
<ol>
<li>实现功能的完整性</li>
<li>实现性能的优异</li>
<li>代码的规范程度</li>
</ol>
<p><img src="${t}" alt="图片"></p>
<p>欢迎扫描<strong>海报中二维码</strong>，或点击文末“<strong>阅读全文</strong>”进行报名，本届 Hackathon 的报名通道将于<strong>2023 年 11 月 18 日</strong>正式开启。</p>
<h2 id="赛题宣讲会">赛题宣讲会</h2>
<p>为了进一步宣传以及讲解 DatenLord Hackathon2023 赛题以及背景，我们将于 <strong>2023 年 11 月 25 日（周六）下午一点</strong>安排一场空中宣讲会。欲了解更多关于本次 Hackathon 的赛制、参赛规则、日程安排，以及达坦科技赛题的介绍、相关资源，欢迎预约报名，我们在空中宣讲会等你，不见不散～</p>
<p><strong>腾讯会议号码：708-101-213</strong></p>
<p><img src="${a}" alt="图片"></p>
<p>如有任何问题欢迎联系达坦科技微信小助手：DatenLord_Tech 或发送邮件至<br>
<a href="mailto:info@datenlord.com">info@datenlord.com</a></p>
<p><img src="${o}" alt="图片"></p>
<p><strong>让我们一起在 Hackathon2023 的舞台上尽情释放创意的火花，期待与优秀的你碰撞出新的想法！</strong></p>`;export{n as assetURLs,l as default,e as metadata,s as toc};

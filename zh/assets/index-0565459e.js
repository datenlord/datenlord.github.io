const a="/datenlord.github.io/zh/assets/cover-12543354.png",s="/datenlord.github.io/zh/assets/image1-d12f17e8.jpg",n="/datenlord.github.io/zh/assets/image2-5cdbcaa2.png",t=[a,s,n],e={label:"Rust China Hackathon 2022 达坦科技组空中宣讲会来啦！",description:"Rust China Hackathon 2022 即将来袭！ 本届Hackathon的主题为「Rust For Fun」，分为「社区组」与「企业组」。",cover:"./cover.png",location:"中国香港",date:"2022-11-24",title:"The Rust China Hackathon 2022 Datan Technology Group Air Presentation is here"},l=[{label:"赛事日程表",level:2},{label:"空中宣讲会",level:2},{label:"达坦科技 DatenLord 赛题",level:2}],o=`<p><strong>Rust China Hackathon 2022 即将来袭！</strong> 本届 Hackathon 的主题为「<strong>Rust For Fun</strong>」，分为「<strong>社区组</strong>」与「<strong>企业组</strong>」。</p>
<p><strong>达坦科技</strong>作为本届 Hackathon 的协办方，赞助参与本次企业组赛道，将基于 <strong>Xline</strong> 这个开源项目，就 Concurrent Indexing，邀请你一起突破固有的思维限制。</p>
<h2 id="赛事日程表">赛事日程表</h2>
<p>本次挑战赛于 <strong>11 月 15 日</strong> 开放报名。赛事日程表已经新鲜出炉：</p>
<ul>
<li><strong>报名+组队：11.15 ～ 12.12</strong></li>
<li>组委会整理报名资料：12.12-12.14</li>
<li>开发：12.15 ～ 12.18</li>
<li><strong>作品提交：12.19</strong></li>
<li>作品初评：12.20 ～ 12.25 （评委会 + 社区投票）</li>
<li>大赛线上路演：12.29（线上直播 ：14:00 ～ 18:00）+ 观众投票 + 社区媒体</li>
<li>作品颁奖：12.30</li>
</ul>
<h2 id="空中宣讲会">空中宣讲会</h2>
<p>经过近两周的预热，收到不少开发者的的积极报名，同时，我们也收到大量关于比赛赛制、赛题解读的咨询和提问。为了更全面地向大家推介 Rust China Hackathon 2022 达坦科技组的比赛，我们特安排此次<strong>空中宣讲会</strong>，向有意参赛的工程师解读赛制、介绍日程安排，分享竞赛平台的相关资源，以帮助工程师们顺利完赛。</p>
<p><strong>直播时间：2022 年 12 月 4 日下午 16:00</strong></p>
<p><img src="${s}" alt="图片"></p>
<h2 id="达坦科技-datenlord-赛题">达坦科技 DatenLord 赛题</h2>
<p><strong>主题</strong><br>
Concurrent Indexing</p>
<p><strong>背景</strong><br>
Xline 是达坦科技推出的分布式元数据 KV 存储器。在使用中，此系统需要处理来自客户端的高并发请求，数目有时甚至可以扩展到数百至数千个。为了在内存中定位到相应 KV 数据，我们维护了一个索引，而此索引也成为了整个系统的瓶颈之一。在这样的情况下，如何提高索引在处理并发请求时的性能就成为了一个问题。</p>
<p><strong>挑战</strong><br>
在本次 Hackathon 中，你将需要通过创建这样一个并发索引来解决此问题，此索引应该满足以下要求：</p>
<ol>
<li>客户端将并发地发送请求，但并不会发送冲突的请求。</li>
<li>无冲突的请求应当被并发执行，以提高生产量。</li>
</ol>
<pre><code class="hljs language-rust"><span class="hljs-comment">/// Operations of Index</span>
<span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">trait</span> <span class="hljs-title class_">IndexOperate</span>&#x3C;K: <span class="hljs-built_in">Ord</span>, V> {
    <span class="hljs-comment">/// Get a range of keys in [key, range_end]</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">get</span>(&#x26;<span class="hljs-keyword">self</span>, key: &#x26;K, range_end: &#x26;K) <span class="hljs-punctuation">-></span> <span class="hljs-type">Vec</span>&#x3C;&#x26;V>;
    <span class="hljs-comment">/// delete a range of keys in [key, range_end]</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">delete</span>(&#x26;<span class="hljs-keyword">self</span>, key: &#x26;K, range_end: &#x26;K) <span class="hljs-punctuation">-></span> <span class="hljs-type">Vec</span>&#x3C;V>;
    <span class="hljs-comment">/// insert of update a key</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">insert_or_update</span>(&#x26;<span class="hljs-keyword">self</span>, key: K, value: V) <span class="hljs-punctuation">-></span> <span class="hljs-type">Option</span>&#x3C;V>;
}
</code></pre>
<p><strong>评估标准</strong><br>
你的实现应遵从上述 Trait 并满足上述要求。我们将使用一定基准测试来进行评估，并根据其结果评分。在基准测试中，我们将发送大量并发请求，因此你也可以创建自己的性能测试来帮助进行优化。</p>
<p>欢迎预约报名 <strong>2022 年 12 月 4 日 16:00</strong> 的空中宣讲会！
腾讯会议二维码如下：</p>
<p><img src="${n}" alt="图片"></p>`;export{t as assetURLs,o as default,e as metadata,l as toc};

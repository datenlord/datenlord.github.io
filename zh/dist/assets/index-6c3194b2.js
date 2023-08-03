const s="/datenlord.github.io/zh/assets/image1-c9ed2270.png",e=[s],a={label:"Rust实现K8S调度扩展",description:"K8S调度器(kube-scheduler)是K8S调度pod的控制器，它作为K8S核心组件运行。调度器基于一定的调度策略为pod找到合适的运行节点。",location:"河南",author:["潘政"],tags:["Rust"],date:"2022-05-27",title:"Rust Implementation of K8S Scheduling Extensions"},o=[{label:"背景介绍",level:2},{label:"调度流程",level:3},{label:"调度算法",level:3},{label:"调度扩展",level:2},{label:"数据结构",level:3},{label:"调度扩展 Web 服务",level:3},{label:"总结",level:2}],l=`<h2 id="背景介绍">背景介绍</h2>
<p><strong>K8S 调度器</strong>(kube-scheduler)是 K8S 调度 pod 的控制器，它作为 K8S 核心组件运行。调度器基于一定的调度策略为 pod 找到合适的运行节点。</p>
<h3 id="调度流程">调度流程</h3>
<p>K8S 调度器调度一个 pod 时候主要分为三个阶段</p>
<ol>
<li>过滤阶段：调用一系列 <code>predicate</code> 函数或者叫 <code>filter</code> 函数过滤掉不合适的节点，比如说某些节点上不满足 pod 声明的运行所需要的资源，如 CPU，内存等资源，那么这些节点会在这个阶段被过滤掉。</li>
<li>打分阶段：调用一系列 <code>priority</code> 函数或者叫 <code>score</code> 函数给通过第一步过滤的节点打分排序。比如有三个节点通过了过滤阶段，当三个节点通过资源均衡函数的打分，那么最终剩余 CPU，内存等资源更多的节点会获得更高的优先级评分</li>
<li>调度阶段：把 pod 调度到选择优先级最高的节点上</li>
</ol>
<p>调度过程如下图所示：</p>
<p><img src="${s}" alt="图片"></p>
<h3 id="调度算法">调度算法</h3>
<p>前文提到，K8S 调度器会调用一系列 <code>filter</code> 函数和 <code>priority</code> 函数，这些函数是 K8S 内置的调度算法, K8S 会根据默认的<strong>调度算法</strong>将 pod 调度到最合适的节点上。<code>filter</code> 函数的目的是过滤掉不符合 pod 要求的节点，通常会有多个节点通过 <code>filter</code> 阶段，<code>prioriry</code> 函数的目的就是在剩下的节点中选出最合适的节点。</p>
<p>我们来介绍一下 K8S 默认的调度策略有哪些。</p>
<ul>
<li><code>filter</code> 策略:
<ul>
<li><code>PodFitsResources</code>: 这条策略是过滤掉所剩资源不满足 pod 要求的节点</li>
<li><code>MatchNodeSelector</code>: 这条策略是过滤掉不匹配 pod nodeSelector 要求的节点</li>
<li><code>PodFitsHostPorts</code>: 这条策略是过滤掉 pod 声明的 HostPort 已经被占用的节点</li>
<li>等等</li>
</ul>
</li>
<li><code>priority</code> 策略：
<ul>
<li><code>BalancedResourceAllocation</code> : 这条策略希望当 pod 被调度到一个节点后 CPU，内存使用率是均衡的。</li>
<li><code>LeastRequestedPriority</code> : 这条策略基于节点的空闲部分，空闲部分基本算法就是（节点总容量 - 已有 pod 的请求 - 将要被调度的 pod 请求）/ 节点总容量，有更多的空闲部分的节点会获得更高的优先级。</li>
<li>等等</li>
</ul>
</li>
</ul>
<p>K8S 提供了很多调度策略，我们在这里就不一一列举，K8S 并不会使用所有的这些调度策略，它会默认使用部分调度策略，我们可以通过 K8S 配置文件来组合使用这些策略来达到最符合我们应用场景的调度策略。</p>
<h2 id="调度扩展">调度扩展</h2>
<p>前文中介绍到 K8S 会提供很多调度策略，它们很大程度上允许我们控制 K8S 调度器的行为，然而 K8S 提供的调度策略也有它的局限性，它只能根据通用的标准如 CPU，内存的使用率来设计调度策略，当我们的应用需要更有针对性的调度策略时，比如说我们想把一个 pod 调度到网路带宽更高，延迟更低的节点上，这时候 K8S 提供的调度策略很难满足我们的需求。幸运的是 K8S 提供了 <strong>K8S 调度扩展</strong>机制。K8S 调度扩展提供给用户扩展调度策略的方法。K8S 调度扩展允许用户提供定制的 <code>predicate/filter</code> 函数和 <code>priority/score</code> 函数来扩展的调度策略。调度扩展的实现方式是用户提供一个 web 服务，并将 web 服务的 url 通过配置文件通知 K8S，K8S 会在调度 pod 的过滤阶段和打分阶段通过 RESTful API 的 <code>POST</code> 方法来调用用户提供的自定义扩展函数，从而达到扩展 K8S 调度策略的效果。具体架构如下图所示：</p>
<ul>
<li>在 K8S 过滤阶段，kube-scheculer 发送 <code>POST ${URL}/filter</code> 到 scheduler-extender，请求中包含 Json 格式序列化的数据 <code>ExtenderArgs</code> ，scheduler-extender 收到请求后，通过本地自定义的 filter 函数，产生 filter 结果 <code>ExtenderFilterResult</code> 并序列化成 Json 格式返回。</li>
<li>在打分阶段，kube-scheculer 发送 <code>POST ${URL}/priority</code> 到 scheduler-extender，请求中包含 Json 格式序列化的数据 <code>ExtenderArgs</code> ，scheduler-extender 收到请求后，通过本地自定义的 <code>priority</code> 函数，产生 score 结果 <code>List&#x3C;HostPriority></code> 并序列化成 Json 格式返回。</li>
</ul>
<h3 id="数据结构">数据结构</h3>
<p>如上所示，K8S 在和用户调度扩展交互的过程中涉及到三个数据结构，K8S 使用 go 语言来定义它们，在通过 http 发送的时候会把它们序列化成 Json 格式。在 Rust 实现的调度扩展中需用将这些数据结构用 Rust 语言定义，并进行序列化和反序列化。</p>
<p><strong>调度扩展请求</strong><br>
这个数据结构是 K8S 发送的调度扩展请求， <code>filter</code> 和 <code>priority</code> 请求的结构是相同的。go 语言定义如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ExtenderArgs</span> <span class="hljs-keyword">struct</span> {
     <span class="hljs-comment">// Pod being scheduled</span>
     Pod *v1.Pod
     <span class="hljs-comment">// List of candidate nodes where the pod can be scheduled; to be populated</span>
     <span class="hljs-comment">// only if Extender.NodeCacheCapable == false</span>
     Nodes *v1.NodeList
     <span class="hljs-comment">// List of candidate node names where the pod can be scheduled; to be</span>
     <span class="hljs-comment">// populated only if Extender.NodeCacheCapable == true</span>
     NodeNames *[]string
}
</code></pre>
<ul>
<li><code>Pod</code> 表示需要调度的 pod</li>
<li><code>Nodes</code> 表示候选的节点列表</li>
<li><code>NodeNames</code> 表示候选的节点名字列表</li>
</ul>
<p>这里需要注意的是 <code>Nodes</code> 和 <code>NodeNames</code> 只有一个会被填写，所以在 Rust 语言中需要将这两个域定义成 <code>Option</code> ，Rust 的定义如下:</p>
<pre><code class="hljs language-rust"><span class="hljs-meta">#[derive(Clone, Debug, Serialize, Deserialize)]</span>
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">ExtenderArgs</span> {
    <span class="hljs-comment">/// Pod being scheduled</span>
    <span class="hljs-keyword">pub</span> Pod: Pod,
    <span class="hljs-comment">/// List of candidate nodes where the pod can be scheduled; to be populated</span>
    <span class="hljs-comment">/// only if Extender.NodeCacheCapable == false</span>
    <span class="hljs-keyword">pub</span> Nodes: <span class="hljs-type">Option</span>&#x3C;NodeList>,
    <span class="hljs-comment">/// List of candidate node names where the pod can be scheduled; to be</span>
    <span class="hljs-comment">/// populated only if Extender.NodeCacheCapable == true</span>
    <span class="hljs-keyword">pub</span> NodeNames: <span class="hljs-type">Option</span>&#x3C;<span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">String</span>>>,
}
</code></pre>
<p><code>filter</code> 请求的应答<br>
这个数据结构作为 <code>predicate</code> 请求的应答，它包含了通过过滤的节点列表，节点失败的原因和错误信息。go 语言的定义如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ExtenderFilterResult</span> <span class="hljs-keyword">struct</span> {
     <span class="hljs-comment">// Filtered set of nodes where the pod can be scheduled; to be populated</span>
     <span class="hljs-comment">// only if Extender.NodeCacheCapable == false</span>
     Nodes *v1.NodeList
     <span class="hljs-comment">// Filtered set of nodes where the pod can be scheduled; to be populated</span>
     <span class="hljs-comment">// only if Extender.NodeCacheCapable == true</span>
     NodeNames *[]string
     <span class="hljs-comment">// Filtered out nodes where the pod can't be scheduled and the failure messages</span>
     FailedNodes FailedNodesMap
     <span class="hljs-comment">// Error message indicating failure</span>
     Error string
}
</code></pre>
<ul>
<li><code>Nodes</code> 表示通过 <code>filter</code> 函数的节点列表</li>
<li><code>NodeNames</code> 表示通过 <code>filter</code> 函数的节点名字列表</li>
<li><code>FailedNodes</code> 是一个 hashmap，保存了没有通过 <code>filter</code> 函数的节点和没有通过的原因</li>
<li><code>Error</code> 表示 <code>filter</code> 函数过程中的失败原因</li>
</ul>
<p>同样 <code>Nodes</code> 和 <code>NodeNames</code> 只有一个会被填写，也需要定义成 <code>Option</code> ，Rust 的定义如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-meta">#[derive(Clone, Debug, Serialize, Deserialize)]</span>
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">ExtenderFilterResult</span> {
    <span class="hljs-comment">/// Filtered set of nodes where the pod can be scheduled; to be populated</span>
    <span class="hljs-comment">/// only if Extender.NodeCacheCapable == false</span>
    <span class="hljs-keyword">pub</span> Nodes: <span class="hljs-type">Option</span>&#x3C;NodeList>,
    <span class="hljs-comment">/// Filtered set of nodes where the pod can be scheduled; to be populated</span>
    <span class="hljs-comment">/// only if Extender.NodeCacheCapable == true</span>
    <span class="hljs-keyword">pub</span> NodeNames: <span class="hljs-type">Option</span>&#x3C;<span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">String</span>>>,
    <span class="hljs-comment">/// Filtered out nodes where the pod can't be scheduled and the failure messages</span>
    <span class="hljs-keyword">pub</span> FailedNodes: HashMap&#x3C;<span class="hljs-type">String</span>, <span class="hljs-type">String</span>>,
    <span class="hljs-comment">/// Error message indicating failure</span>
    <span class="hljs-keyword">pub</span> Error: <span class="hljs-type">String</span>,
}
</code></pre>
<p><strong><code>priority</code> 请求的应答</strong><br>
<code>priority</code> 请求的应答是一个 <code>HostPriority</code> 的列表， <code>HostPrority</code> 包含节点的名字和节点的分数，go 的定义如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">type</span> <span class="hljs-title class_">HostPriority</span> <span class="hljs-keyword">struct</span> {
     <span class="hljs-comment">// Name of the host</span>
     Host string
     <span class="hljs-comment">// Score associated with the host</span>
     Score int64
}
</code></pre>
<ul>
<li><code>Host</code> 表示节点的名字</li>
<li><code>Score</code> 表示 <code>priority</code> 函数给该节点打的分数</li>
</ul>
<p>对应的 Rust 定义如下:</p>
<pre><code class="hljs language-rust"><span class="hljs-meta">#[derive(Clone, Debug, Serialize, Deserialize)]</span>
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">HostPriority</span> {
    <span class="hljs-comment">/// Name of the host</span>
    <span class="hljs-keyword">pub</span> Host: <span class="hljs-type">String</span>,
    <span class="hljs-comment">/// Score associated with the host</span>
    <span class="hljs-keyword">pub</span> Score: <span class="hljs-type">i64</span>,
}
</code></pre>
<p>在前面这三个数据结构中使用的类型比如说 <code>Pod</code> , <code>NodeList</code> 在<strong>K8S-openapi</strong>这个库中有 Rust 版本的定义，可以通过在 Cargo.toml 中加入依赖来使用它</p>
<pre><code class="hljs language-toml"><span class="hljs-attr">K8S-openapi</span> = { version = <span class="hljs-string">"0.11.0"</span>, default-features = <span class="hljs-literal">false</span>, features = [<span class="hljs-string">"v1_19"</span>] }
</code></pre>
<p>这个库是根据 K8S openapi 的定义自动生成的 Rust 定义，节省了大家把 go 定义的数据结构转成 Rust 定义的麻烦，但是这个库只包含 core API 部分的数据结构， <code>ExtenderArgs</code> ， <code>ExtenderFilterResult</code> 和 <code>HostPriority</code> 属于 extender 的 API，所以需要自己定义。在使用过程中发现了 go 语言定义的一个问题, 主要原因是 <code>[]string</code> 在 go 语言中， <code>[]</code> 和 <code>nil</code> 都是有效的值，序列化对应到 Json 中分别是 <code>[]</code> 和 <code>null</code> ，一个域可以是 null 代表了它是 optional 的，所以类型是 <code>[]string</code> 的域需要加上 <code>+optional</code> 标记，相应的在 Rust 定义中也需要定义成 <code>Option</code> 。<br>
详细讨论请参考 <strong>issue</strong>, 目前这个问题在 K8S 中已经得到修复。</p>
<h3 id="调度扩展-web-服务">调度扩展 Web 服务</h3>
<p>有了数据结构就需要实现一个 web 服务来处理 K8S 发起的请求，web 服务 Rust 有丰富的库可以使用，这里使用的是一个轻量级同步 http 的库（<strong>tiny-http</strong>），具体 <code>filter</code> 函数和 <code>priority</code> 函数的实现与具体业务逻辑相关，这里就不具体展示，示意代码如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">match</span> *request.<span class="hljs-title function_ invoke__">method</span>() {
    Method::Post => <span class="hljs-keyword">match</span> request.<span class="hljs-title function_ invoke__">url</span>() {
        <span class="hljs-string">"/filter"</span> | <span class="hljs-string">"/prioritize"</span> => {
            <span class="hljs-keyword">let</span> <span class="hljs-variable">body</span> = request.<span class="hljs-title function_ invoke__">as_reader</span>();
            <span class="hljs-keyword">let</span> <span class="hljs-variable">args</span>: ExtenderArgs = try_or_return_err!(
                request,
                serde_json::<span class="hljs-title function_ invoke__">from_reader</span>(body),
                <span class="hljs-string">"failed to parse request"</span>.<span class="hljs-title function_ invoke__">to_string</span>()
            );

            <span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = <span class="hljs-keyword">if</span> request.<span class="hljs-title function_ invoke__">url</span>() == <span class="hljs-string">"/filter"</span> {
                info!(<span class="hljs-string">"Receive filter"</span>);
                <span class="hljs-comment">/// 处理 filter 请求</span>
                <span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = <span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">filter</span>(args);
                try_or_return_err!(
                    request,
                    serde_json::<span class="hljs-title function_ invoke__">to_string</span>(&#x26;result),
                    <span class="hljs-string">"failed to serialize response"</span>.<span class="hljs-title function_ invoke__">to_string</span>()
                )
            } <span class="hljs-keyword">else</span> {
                info!(<span class="hljs-string">"Receive prioritize"</span>);
                <span class="hljs-comment">/// 处理 priority 请求</span>
                <span class="hljs-keyword">let</span> <span class="hljs-variable">result</span> = <span class="hljs-keyword">Self</span>::<span class="hljs-title function_ invoke__">prioritize</span>(&#x26;args);
                try_or_return_err!(
                    request,
                    serde_json::<span class="hljs-title function_ invoke__">to_string</span>(&#x26;result),
                    <span class="hljs-string">"failed to serialize response"</span>.<span class="hljs-title function_ invoke__">to_string</span>()
                )
            };
            <span class="hljs-title function_ invoke__">Ok</span>(request.<span class="hljs-title function_ invoke__">respond</span>(Response::<span class="hljs-title function_ invoke__">from_string</span>(response))?)
        }
        _ => <span class="hljs-keyword">Self</span>::<span class="hljs-title function_ invoke__">empty_400</span>(request),
    },
    ...省略
}
</code></pre>
<h2 id="总结">总结</h2>
<p>通过本文的介绍我们对 K8S 的调度流程，K8S 的调度算法，K8S 调度扩展机制有了基本的了解。并且我们用 Rust 语言实现了 K8S 调度扩展，用 Rust 语言定义了 K8S 和调度扩展之间交互的数据结构，以及介绍了 Rust 定义中需要定义成 <code>Option</code> 的域以及相关需要注意的问题。</p>`;export{e as assetURLs,l as default,a as metadata,o as toc};

const s="/zh/assets/image1-8eb3851e.png",a="/zh/assets/image2-dcb114f1.png",n="/zh/assets/image3-bca28166.png",l="/zh/assets/image4-002e59a9.png",p=[s,a,n,l],e={label:"Rust实现RDMA异步编程（二）：async Rust封装UCX通信库",description:"UCX 是一个高性能网络通信库，它作为 MPI 所依赖的通信模块之一在高性能计算领域得到广泛的使用。UCX 使用 C 语言编写，为了在 Rust 项目中使用它，我们需要将它的 C 接口包装成 Rust 库。在这个过程中我们充分利用了 Rust 的杀手级特性—— async-await 协程来包装异步 IO 接口，从而极大降低了应用的编程复杂度。",location:"河南",author:["王润基"],tags:["RDMA"],date:"2022-05-27",title:"async Rust wraps UCX communication library"},t=[{label:"UCX 通信接口简介",level:2},{label:"UCX 编程模型简介",level:2},{label:"建立连接",level:3},{label:"内存注册",level:3},{label:"异步任务处理（重点）",level:3},{label:"Rust 封装 UCX",level:2},{label:"生成 Rust 接口",level:3},{label:"封装 UCX 对象",level:3},{label:"封装异步操作（重点）",level:3},{label:"封装 worker progress",level:3},{label:"在 Rust 异步运行时中使用 UCX",level:2},{label:"总结与展望",level:2}],c=`<p>UCX 是一个高性能网络通信库，它作为 MPI 所依赖的通信模块之一在高性能计算领域得到广泛的使用。UCX 使用 C 语言编写，为了在 Rust 项目中使用它，我们需要将它的 C 接口包装成 Rust 库。在这个过程中我们充分利用了 Rust 的杀手级特性—— async-await 协程来包装异步 IO 接口，从而极大降低了应用的编程复杂度</p>
<p>去年我们用 Rust 实现的高性能分布式文件系统 MadFS，底层就使用了我们自己包装过的 UCX 作为通信模块，它在大规模 RDMA 网络上展现出了良好的性能。UCX 官方在得知这一消息后也很开心地宣传了我们这个项目 :)</p>
<p><img src="${s}" alt="图片"></p>
<p>本文首先会介绍一下 UCX 通信库的功能和编程模型，然后介绍我们用 async Rust 封装 UCX 的过程，具体代码可以参考 GitHub 仓库：<strong>async-ucx</strong>。值得注意的是，这里介绍的 IO 模型和封装异步 IO 的方法是通用的，可以适用到其它 IO 库当中。</p>
<h2 id="ucx-通信接口简介">UCX 通信接口简介</h2>
<p>UCX 的全称是 Unified Communication X。正如它名字所展示的，UCX 旨在提供一个统一的抽象通信接口，能够适配任何通信设备，并支持各种应用的需求。</p>
<p>下图是 UCX 官方提供的架构图：</p>
<p><img src="${a}" alt="图片"></p>
<p>可以看到，UCX 整体分为两层：上层的 UCP 接口和底层的 UCT 接口。</p>
<p>底层的 UCT 适配了各种通信设备：从单机的共享内存，到常用的 TCP Socket，以及数据中心常用的 RDMA 协议，甚至新兴的 GPU 上的通信，都有很好的支持。</p>
<p>上层的 UCP 则是在 UCT 不同设备的基础上，封装了更抽象的通信接口，以方便应用使用。具体来说有以下几类：</p>
<ul>
<li>Active Message：最底层的接口，提供类似 RPC 的语义。每条 Active Message 会触发接收端进行一些操作。</li>
<li>RMA / Atomic：是对远程直接内存访问（RDMA）的抽象。通信双方可以直接读写远端的内存，但是需要有额外的内存注册过程。</li>
<li>Tag Matching：常用于高性能计算 MPI 程序中。每条消息都会附带一个 64 位整数作为 tag，接收方每次可以指定接收哪种 tag 的消息</li>
<li>Stream：对字节流（TCP）的抽象。</li>
</ul>
<p>一般来说，和底层通信设备模型最匹配的接口具有最高的性能，其它不匹配的接口都会有一次软件转换过程。另一方面，同一种 UCP 接口发送不同大小的消息可能也会使用不同的 UCT 方法。例如在 RDMA 网络中，由于内存注册也有不小的开销，因此对于小消息来说，拷贝到预注册好的缓冲区再发送的性能更高。这些策略默认是由 UCX 自己决定的，用户也可以通过设置环境变量的方式手动修改。</p>
<p>“在我们的系统中，使用了 UCP Tag 接口并基于此实现了轻量级的 RPC。在 RPC 场景下，Tag 可以用于区分不同上下文的消息：每个链接双方首先随机生成一个 tag 作为请求的标识，对于每次请求再随机生成一个 tag 作为回复的标识。此外 Tag 接口还支持 IO Vector，即将不连续的多个内存段合并成一个消息发送。这个特性可以用来将用户提供的数据缓冲区和 RPC 请求打包在一起，一定程度上避免数据拷贝。”</p>
<h2 id="ucx-编程模型简介">UCX 编程模型简介</h2>
<p>UCX 采用了以异步 IO 为核心的编程模型。其中 UCP 层定义的核心对象有以下四种：</p>
<ul>
<li>Context：全局资源的上下文，管理所有通信设备。一般每个进程创建一个即可。</li>
<li>Worker：任务的管理调度中心，以轮询方式执行任务。一般每个线程创建一个，会映射为网卡上的一个队列。</li>
<li>Listener：类似 TCP Listener，用来在 worker 之间创建连接。</li>
<li>Endpoint：表示一个已经建立的连接。在此之上提供了各种类型的通信接口。</li>
</ul>
<p>它们之间的所属关系如下图所示：</p>
<p><img src="${n}" alt="图片"></p>
<h3 id="建立连接">建立连接</h3>
<p>UCX 中双方首先要建立连接，拿到一个 Endpoint 之后才能进行通信。建立连接一般要通过 Listener，过程和 TCP 比较类似：</p>
<p>通信双方 A/B 首先建立各自的 Context 和 Worker，其中一方 A 在 Worker 上创建 Listener 监听连接请求，Listener 的地址会绑定到本机的一个端口上。用户需要通过某种方法将这个地址传递给另一方 B。B 拿到地址后在 Worker 上发起 connect 操作，此时 A 会收到新连接请求，它可以选择接受或拒绝。如果接受则需要在 Worker 上 accept 这个请求，将其转换为 Endpoint。之后 B 会收到 A 的回复，connect 操作完成，返回一个 Endpoint。此后双方就可以通过这对 Endpoint 进行通信了。</p>
<h3 id="内存注册">内存注册</h3>
<p>对于常规的通信接口，用户可以直接在 Endpoint 上发起请求。但对于 RMA（远程内存访问）操作，需要被访问的一方首先在自己的 Context 上注册内存，同时指定访问权限，获得一个 Mem handle。然后将这个本地 handle 转化为其他节点可以访问的一串 token，称为 remote key（rkey）。最后想办法把 rkey 传给远端。远端拿着这个 rkey 进行远程内存访问操作。</p>
<h3 id="异步任务处理（重点）">异步任务处理（重点）</h3>
<p>为了发挥最高的性能，整个 UCX 通信接口是全异步的。所谓异步指的是 IO 操作的执行不会阻塞当前线程，一次操作的发起和完成是独立的两个步骤。如此一来 CPU 就可以同时发起很多 IO 请求，并且在它们执行的过程中可以做别的事情。</p>
<p>不过接下来问题来了：程序如何知道一个异步任务是否完成了？常见的有两种做法：主动轮询，被动通知。前者还是需要占用 CPU 资源，所以一般都采用通知机制。在 C 这种传统过程式语言中，异步完成的通知一般通过 回调函数（callback）实现：每次发起异步操作时，用户都需要传入一个函数指针作为参数。当任务完成时，后台的运行时框架会调用这个函数来通知用户。下面是 UCX 中一个异步接收接口的定义：</p>
<pre><code class="hljs language-rust">ucs_status_ptr_t <span class="hljs-title function_ invoke__">ucp_tag_recv_nb</span> (
  ucp_worker_h worker,
  void ∗ buffer,
  size_t count,
  ucp_datatype_t datatype,
  ucp_tag_t tag,
  ucp_tag_t tag_mask,
  ucp_tag_recv_callback_t cb  <span class="hljs-comment">// &#x3C;-- 回调函数</span>
);

<span class="hljs-comment">// 回调函数接口的定义</span>
typedef <span class="hljs-title function_ invoke__">void</span>(∗ ucp_tag_recv_callback_t) (
  void ∗request,
  ucs_status_t status,        <span class="hljs-comment">// 执行结果，错误码</span>
  ucp_tag_recv_info_t ∗info   <span class="hljs-comment">// 更多信息，如收到的消息长度等</span>
);
</code></pre>
<p>这个接口的语义是：发起一个异步 Tag-Matching 接收操作，并立即返回。当真的收到 tag 匹配的消息时，UCX 后台会处理这个消息，将其放到用户提供的 buffer 中，最后调用用户传入的 callback，通知用户任务的执行结果。</p>
<p>这里有一个很重要的问题是：上面提到的“后台处理”到底是什么时候执行的？答案是 UCX 并不会自己创建后台线程去执行它们，所有异步任务的后续处理和回调都是在 <code>worker.progress()</code> 函数中，也就是用户主动向 worker 轮询的过程中完成的。这个函数的语义是：“看看你手头要处理的事情，有哪些是能做的？尽力去推动一下，做完的通知我。” 换句话说，Worker 正在处理的所有任务组成了一个状态机，progress 函数的作用就是用新事件推动整个状态机的演进。后面我们会看到，对应到 async Rust 世界中，所有异步 IO 任务组成了最基础的 Future，worker 对应 Runtime，而 progress 及其中的回调函数则充当了 Reactor 的角色。</p>
<p>回到传统的 C 语言，在这里异步 IO 的最大难点是编程复杂性：多个并发任务在同一个线程上交替执行，只能通过回调函数来描述下一步做什么，会使得原本连续的执行逻辑被打散到多个回调函数中。本来局部变量就可以维护的状态，到这里就需要额外的结构体来在多个回调函数之间传递。随着异步操作数量的增加，代码的维护难度将会迅速上升。下面的伪代码展示了在 UCX 中如何通过异步回调函数来实现最简单的 echo 服务：</p>
<pre><code class="hljs language-c"><span class="hljs-comment">// 由于 C 语言语法的限制，这段代码需要从下往上读</span>

<span class="hljs-comment">// 这里存放所有需要跨越函数的状态变量</span>
<span class="hljs-class"><span class="hljs-keyword">struct</span> <span class="hljs-title">CallbackContext</span> {</span>
  ucp_endpoint_h ep;
  <span class="hljs-type">void</span> *buf;
} ctx;

<span class="hljs-type">void</span> <span class="hljs-title function_">send_cb</span><span class="hljs-params">(<span class="hljs-type">void</span> ∗request, <span class="hljs-type">ucs_status_t</span> status)</span> {
  <span class="hljs-comment">//【4】发送完毕</span>
  ucp_request_free(request);
  <span class="hljs-built_in">exit</span>(<span class="hljs-number">0</span>);
}

<span class="hljs-type">void</span> <span class="hljs-title function_">recv_cb</span><span class="hljs-params">(<span class="hljs-type">void</span> ∗request, <span class="hljs-type">ucs_status_t</span> status, <span class="hljs-type">ucp_tag_recv_info_t</span> ∗info)</span> {
  <span class="hljs-comment">//【3】收到消息，发起发送请求</span>
  ucp_tag_send_nb(ctx->ep, ctx->buf, info->length, ..., send_cb);
  ucp_request_free(request);
}

<span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">()</span> {
  <span class="hljs-comment">// 省略 UCX 初始化部分</span>
  <span class="hljs-comment">//【0】初始化任务状态</span>
  ctx->ep = ep;
  ctx->buf = <span class="hljs-built_in">malloc</span>(<span class="hljs-number">0x1000</span>);
  <span class="hljs-comment">//【1】发起异步接收请求</span>
  ucp_tag_recv_nb(worker, ctx->buf, <span class="hljs-number">0x1000</span>, ..., recv_cb);
  <span class="hljs-comment">//【2】不断轮询，驱动后续任务完成</span>
    <span class="hljs-keyword">while</span>(<span class="hljs-literal">true</span>) {
    ucp_worker_progress(worker);
  }
}
</code></pre>
<p>作为对比，假如 UCX 提供的是同步接口，那么同样的逻辑只需要以下几行就够了：</p>
<pre><code class="hljs language-c"><span class="hljs-type">int</span> <span class="hljs-title function_">main</span><span class="hljs-params">()</span> {
  <span class="hljs-comment">// 省略 UCX 初始化部分</span>
  <span class="hljs-type">void</span> *buf = <span class="hljs-built_in">malloc</span>(<span class="hljs-number">0x1000</span>);
  <span class="hljs-type">int</span> len;
  ucp_tag_recv(worker, buf, <span class="hljs-number">0x1000</span>, &#x26;len, ...);
  ucp_tag_send(ep, buf, len, ...);
  <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
</code></pre>
<p>面对传统异步编程带来的“回调地狱”，主流编程语言经过了十几年的持续探索，终于殊途同归，纷纷引入了控制异步的终极解决方案—— async-await 协程。它的杀手锏就是能让开发者用同步的风格编写异步的逻辑。经过我们的封装过后，在 Rust 中用 async 协程编写同样的逻辑是长这样的：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">main</span>() {
  <span class="hljs-comment">// 省略 UCX 初始化部分</span>
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">buf</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0u8</span>; <span class="hljs-number">0x1000</span>];
  <span class="hljs-keyword">let</span> <span class="hljs-variable">len</span> = worker.<span class="hljs-title function_ invoke__">tag_recv</span>(&#x26;<span class="hljs-keyword">mut</span> buf, ...).<span class="hljs-keyword">await</span>.<span class="hljs-title function_ invoke__">unwrap</span>();
  ep.<span class="hljs-title function_ invoke__">tag_send</span>(&#x26;buf[..len], ...).<span class="hljs-keyword">await</span>.<span class="hljs-title function_ invoke__">unwrap</span>();
}
</code></pre>
<p>下面我们就来介绍如何用 Rust 的协程机制包装 UCX 异步接口。</p>
<h2 id="rust-封装-ucx">Rust 封装 UCX</h2>
<h3 id="生成-rust-接口">生成 Rust 接口</h3>
<p>用 Rust 包装 C 语言库的第一步是用社区提供的 <strong>bindgen</strong> 工具，从 C 头文件自动生成 Rust 绑定代码。生成的代码一般直接作为 <code>*-sys</code> 库发布，具体实现可以参考我们封装的 <strong>ucx-sys</strong>。接下来我们要在它的基础上继续封装出高层接口，也就是 async-ucx。</p>
<h3 id="封装-ucx-对象">封装 UCX 对象</h3>
<p>async-ucx 做的第一件事就是封装 UCX 对象。在 C 语言中对象创建出来后用户会拿到一个 handle，也就是一个指针。用户之后需要自己管理对象的生命周期，在用完后手动释放掉资源。</p>
<p>在 Rust 中我们需要将 C 的 handle 包装成一个 struct，通过引用计数来自动管理对象的生命周期，在对象的 Drop 函数中释放其资源。下面的代码展示了对 Worker 对象的封装过程：</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// 创建 Worker 需要依赖 Context，具体实现代码略过</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Context</span> {
  handle: ucp_context_h,
}

<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Worker</span> {
  handle: ucp_worker_h,  <span class="hljs-comment">// 包装 C handle</span>
  context: Arc&#x3C;Context>, <span class="hljs-comment">// 引用上级对象</span>
}
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Worker</span> {
  <span class="hljs-comment">// 从 Context 创建 Worker</span>
  <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">new</span>(context: &#x26;Arc&#x3C;Context>) <span class="hljs-punctuation">-></span> Rc&#x3C;<span class="hljs-keyword">Self</span>> {
    <span class="hljs-comment">// 准备参数和返回值</span>
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">params</span> = MaybeUninit::&#x3C;ucp_worker_params_t>::<span class="hljs-title function_ invoke__">uninit</span>();
    <span class="hljs-keyword">unsafe</span> { (*params.<span class="hljs-title function_ invoke__">as_mut_ptr</span>()).field_mask = <span class="hljs-number">0</span> };
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">handle</span> = MaybeUninit::<span class="hljs-title function_ invoke__">uninit</span>();
    <span class="hljs-comment">// 调用 C 函数创建对象，获得 handle</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">status</span> =
    <span class="hljs-keyword">unsafe</span> { <span class="hljs-title function_ invoke__">ucp_worker_create</span>(context.handle, params.<span class="hljs-title function_ invoke__">as_ptr</span>(), handle.<span class="hljs-title function_ invoke__">as_mut_ptr</span>()) };
    <span class="hljs-built_in">assert_eq!</span>(status, ucs_status_t::UCS_OK);
    <span class="hljs-comment">// 包装为 Rust 对象</span>
    Rc::<span class="hljs-title function_ invoke__">new</span>(Worker {
      handle: <span class="hljs-keyword">unsafe</span> { handle.<span class="hljs-title function_ invoke__">assume_init</span>() },
      context: context.<span class="hljs-title function_ invoke__">clone</span>(),
    })
  }
}
<span class="hljs-comment">// 析构时释放资源</span>
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Drop</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Worker</span> {
  <span class="hljs-keyword">fn</span> <span class="hljs-title function_">drop</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>) {
    <span class="hljs-keyword">unsafe</span> { <span class="hljs-title function_ invoke__">ucp_worker_destroy</span>(<span class="hljs-keyword">self</span>.handle) }
  }
}
</code></pre>
<p>对象其它接口的包装也是类似的：首先将用户传入的参数转化成 C 接口的形式，然后 unsafe 调用 C 接口，最后将返回结果转化成 Rust 的形态返回给用户。</p>
<h3 id="封装异步操作（重点）">封装异步操作（重点）</h3>
<p>接下来到了最重要的一步：用 Future 封装基于回调函数的异步接口。</p>
<p>首先我们来回顾一下 Future 的工作原理：它本质是一个状态机，只提供一个 poll 函数来驱动内部状态的演进。poll 函数的本质是事件轮询，它会检查自己关心的事件是否已经完成，如果完成就继续推进执行，否则就挂起等待。在挂起之前 Future 需要将自己的 waker 注册到后台的事件响应器（Reactor）中，以便在事件发生时能够被唤醒。当事件发生后，Reactor 通过 waker 唤醒 Future，Future 再次执行上述 poll 的过程，这一次它会看到事件已经发生，于是状态机得以继续推进。</p>
<p>基于 Future 的整个异步运行时的工作原理如下图所示：</p>
<p><img src="${l}" alt="图片"></p>
<p>其中 Future 接口的具体定义如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">trait</span> <span class="hljs-title class_">Future</span> {
  <span class="hljs-keyword">type</span> <span class="hljs-title class_">Output</span>;
  <span class="hljs-comment">// 尝试推进状态机：</span>
  <span class="hljs-comment">//   如果事件就绪就返回 Poll::Ready(T)</span>
  <span class="hljs-comment">//   否则从 cx 中拿一个 waker 注册给 reactor，然后返回 Poll::Pending</span>
  <span class="hljs-keyword">fn</span> <span class="hljs-title function_">poll</span>(<span class="hljs-keyword">self</span>: Pin&#x3C;&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span>>, cx: &#x26;<span class="hljs-keyword">mut</span> Context&#x3C;<span class="hljs-symbol">'_</span>>) <span class="hljs-punctuation">-></span> Poll&#x3C;<span class="hljs-keyword">Self</span>::Output>;
}
</code></pre>
<p>下面我们要做的就是：利用回调函数来实现上面的 poll 函数。主要解决两个问题：查询事件状态，注册 waker。</p>
<p>查询事件状态：这个比较好办。因为 UCX 的异步函数都会返回一个 request 对象，并且提供了接口来查询 request 的状态。所以我们只需要将 request 对象加入 Future 的状态中即可。</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// 异步函数的返回值就是 request</span>
ucs_status_ptr_t <span class="hljs-title function_ invoke__">ucp_tag_recv_nb</span> (...);
<span class="hljs-comment">// 查询 request 状态的接口</span>
ucs_status_t <span class="hljs-title function_ invoke__">ucp_tag_recv_request_test</span> (
  void ∗request,
    ucp_tag_recv_info_t ∗info
);
</code></pre>
<ul>
<li>注册 waker：这件事需要一些技巧。之前我们提到 callback 实际上充当了 Reactor 的角色，所以这里我们需要将 waker 从 Future 传递给 callback。</li>
</ul>
<p>观察 UCX callback 函数的定义，可以发现其中一个参数就是 request：<br>
并且 UCX 允许我们塞一些自己的私货到 request 对象中，正好就解决了传递 waker 的问题。</p>
<pre><code class="hljs language-rust">typedef <span class="hljs-title function_ invoke__">void</span>(∗ ucp_tag_recv_callback_t) (
  void ∗request,  <span class="hljs-comment">// 可以通过这里，在 Future 和 callback 之间传递信息</span>
  ucs_status_t status,
  ucp_tag_recv_info_t ∗info
);
</code></pre>
<p>接下来正式开始实现！首先定义我们要向 request 中夹带的私货：</p>
<pre><code class="hljs language-rust"><span class="hljs-meta">#[derive(Default)]</span>
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">Request</span> {
  <span class="hljs-comment">// 只有一个 waker，使用了 futures 库中的 AtomicWaker 来保证原子性</span>
  waker: futures::task::AtomicWaker,
}
<span class="hljs-comment">// NOTE：这里无需 #[repr(C)]，因为操作内部变量都是在 Rust 中实现的</span>
</code></pre>
<p>然后向 UCX Context 注册这个私货：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">Context</span> {
  <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">new</span>() <span class="hljs-punctuation">-></span> Arc&#x3C;<span class="hljs-keyword">Self</span>> {
    <span class="hljs-comment">// 创建 Context 的时候注册私货信息</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">params</span> = ucp_params_t {
      request_size: std::mem::size_of::&#x3C;Request>() <span class="hljs-keyword">as</span> <span class="hljs-type">u64</span>,
      request_init: <span class="hljs-title function_ invoke__">Some</span>(Request::init),
      request_cleanup: <span class="hljs-title function_ invoke__">Some</span>(Request::cleanup),
            ...
    };
    <span class="hljs-comment">// 构造 Context 略</span>
  }
}
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Request</span> {
  <span class="hljs-comment">// 初始化私货（原地构造）</span>
  <span class="hljs-keyword">unsafe</span> <span class="hljs-keyword">extern</span> <span class="hljs-string">"C"</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">init</span>(request: *<span class="hljs-keyword">mut</span> c_void) {
    (request <span class="hljs-keyword">as</span> *<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span>).<span class="hljs-title function_ invoke__">write</span>(Request::<span class="hljs-title function_ invoke__">default</span>());
    <span class="hljs-comment">// 注意：不能使用 *request = xxx; 的写法</span>
    <span class="hljs-comment">// 因为 request 指向的内存是未初始化状态，会导致在未定义内存上触发析构函数！</span>
  }
  <span class="hljs-comment">// 清理私货（原地析构）</span>
  <span class="hljs-keyword">unsafe</span> <span class="hljs-keyword">extern</span> <span class="hljs-string">"C"</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">cleanup</span>(request: *<span class="hljs-keyword">mut</span> c_void) {
    std::ptr::<span class="hljs-title function_ invoke__">drop_in_place</span>(request <span class="hljs-keyword">as</span> *<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span>)
  }
}
</code></pre>
<p>然后向 UCX Context 注册这个私货：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">Context</span> {
  <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">new</span>() <span class="hljs-punctuation">-></span> Arc&#x3C;<span class="hljs-keyword">Self</span>> {
    <span class="hljs-comment">// 创建 Context 的时候注册私货信息</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">params</span> = ucp_params_t {
      request_size: std::mem::size_of::&#x3C;Request>() <span class="hljs-keyword">as</span> <span class="hljs-type">u64</span>,
      request_init: <span class="hljs-title function_ invoke__">Some</span>(Request::init),
      request_cleanup: <span class="hljs-title function_ invoke__">Some</span>(Request::cleanup),
            ...
    };
    <span class="hljs-comment">// 构造 Context 略</span>
  }
}
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Request</span> {
  <span class="hljs-comment">// 初始化私货（原地构造）</span>
  <span class="hljs-keyword">unsafe</span> <span class="hljs-keyword">extern</span> <span class="hljs-string">"C"</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">init</span>(request: *<span class="hljs-keyword">mut</span> c_void) {
    (request <span class="hljs-keyword">as</span> *<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span>).<span class="hljs-title function_ invoke__">write</span>(Request::<span class="hljs-title function_ invoke__">default</span>());
    <span class="hljs-comment">// 注意：不能使用 *request = xxx; 的写法</span>
    <span class="hljs-comment">// 因为 request 指向的内存是未初始化状态，会导致在未定义内存上触发析构函数！</span>
  }
  <span class="hljs-comment">// 清理私货（原地析构）</span>
  <span class="hljs-keyword">unsafe</span> <span class="hljs-keyword">extern</span> <span class="hljs-string">"C"</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">cleanup</span>(request: *<span class="hljs-keyword">mut</span> c_void) {
    std::ptr::<span class="hljs-title function_ invoke__">drop_in_place</span>(request <span class="hljs-keyword">as</span> *<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span>)
  }
}
</code></pre>
<p>接下来将整个 request 包装成一个 Future：</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// 由于不同的操作会有不同的返回值，这里就用泛型参数 T 表示返回值类型</span>
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">RequestHandle</span>&#x3C;T> {
  <span class="hljs-comment">// UCX 返回的 request 对象，它的头部就是我们的私货</span>
  ptr: ucs_status_ptr_t,
  <span class="hljs-comment">// 查询 request 状态的函数</span>
  poll_fn: <span class="hljs-keyword">unsafe</span> <span class="hljs-title function_ invoke__">fn</span>(ucs_status_ptr_t) <span class="hljs-punctuation">-></span> Poll&#x3C;T>,
}
<span class="hljs-comment">//////////////////////// 核心代码 /////////////////////////</span>
<span class="hljs-keyword">impl</span>&#x3C;T> Future <span class="hljs-keyword">for</span> <span class="hljs-title class_">RequestHandle</span>&#x3C;T> {
  <span class="hljs-keyword">type</span> <span class="hljs-title class_">Output</span> = T;
  <span class="hljs-keyword">fn</span> <span class="hljs-title function_">poll</span>(<span class="hljs-keyword">self</span>: Pin&#x3C;&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span>>, cx: &#x26;<span class="hljs-keyword">mut</span> std::task::Context) <span class="hljs-punctuation">-></span> Poll&#x3C;<span class="hljs-keyword">Self</span>::Output> {
    <span class="hljs-comment">// 查询状态，如果就绪直接返回</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">ret</span> @ Poll::<span class="hljs-title function_ invoke__">Ready</span>(_) = <span class="hljs-keyword">unsafe</span> { (<span class="hljs-keyword">self</span>.poll_fn)(<span class="hljs-keyword">self</span>.ptr) } {
      <span class="hljs-keyword">return</span> ret;
    }
    <span class="hljs-comment">// 注册 waker（通过私货）</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = <span class="hljs-keyword">unsafe</span> { &#x26;<span class="hljs-keyword">mut</span> *(<span class="hljs-keyword">self</span>.ptr <span class="hljs-keyword">as</span> *<span class="hljs-keyword">mut</span> Request) };
    request.waker.<span class="hljs-title function_ invoke__">register</span>(cx.<span class="hljs-title function_ invoke__">waker</span>());
    <span class="hljs-comment">// 返回等待，挂起任务</span>
    Poll::Pending
  }
}
<span class="hljs-comment">//////////////////////////////////////////////////////////</span>
<span class="hljs-keyword">impl</span>&#x3C;T> <span class="hljs-built_in">Drop</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">RequestHandle</span>&#x3C;T> {
  <span class="hljs-keyword">fn</span> <span class="hljs-title function_">drop</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>) {
    <span class="hljs-comment">// request 要求手动释放</span>
    <span class="hljs-keyword">unsafe</span> { <span class="hljs-title function_ invoke__">ucp_request_free</span>(<span class="hljs-keyword">self</span>.ptr <span class="hljs-keyword">as</span> _) };
  }
}
</code></pre>
<p>最后，用这个 Future 实现一个完整的 recv 过程：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">Endpoint</span> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">tag_recv</span>(&#x26;<span class="hljs-keyword">self</span>, tag: <span class="hljs-type">u64</span>, buf: &#x26;<span class="hljs-keyword">mut</span> [<span class="hljs-type">u8</span>]) <span class="hljs-punctuation">-></span> <span class="hljs-type">usize</span> {
    <span class="hljs-comment">// 首先实现 callback</span>
    <span class="hljs-keyword">unsafe</span> <span class="hljs-keyword">extern</span> <span class="hljs-string">"C"</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">callback</span>(request: *<span class="hljs-keyword">mut</span> c_void, ...) {
      <span class="hljs-comment">// 只需简单地从 request 中取出 waker 唤醒即可</span>
      <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = &#x26;<span class="hljs-keyword">mut</span> *(request <span class="hljs-keyword">as</span> *<span class="hljs-keyword">mut</span> Request);
      request.waker.<span class="hljs-title function_ invoke__">wake</span>();
    }
    <span class="hljs-comment">// 发起异步操作，调用 C 函数，传入 callback</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">status</span> = <span class="hljs-keyword">unsafe</span> {
      <span class="hljs-title function_ invoke__">ucp_tag_recv_nb</span>(<span class="hljs-keyword">self</span>.handle, ..., <span class="hljs-title function_ invoke__">Some</span>(callback))
    };
    <span class="hljs-keyword">if</span> <span class="hljs-title function_ invoke__">UCS_PTR_IS_PTR</span>(status) {
      <span class="hljs-built_in">panic!</span>(<span class="hljs-string">"failed to recv tag: {:?}"</span>, <span class="hljs-title function_ invoke__">UCS_PTR_RAW_STATUS</span>(status));
    }
    <span class="hljs-comment">// 将返回的 request 包装成 Future 并 await 结果！</span>
    RequestHandle {
      ptr: status,
      poll_fn: poll_tag, <span class="hljs-comment">// 查询状态的具体实现略</span>
    }.<span class="hljs-keyword">await</span>
  }
}
</code></pre>
<p>经过这样一番包装，我们就可以简单地使用一行命令，以同步风格完成 IO 操作了：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">len</span> = worker.<span class="hljs-title function_ invoke__">tag_recv</span>(tag, &#x26;<span class="hljs-keyword">mut</span> buf, ...).<span class="hljs-keyword">await</span>;
</code></pre>
<h3 id="封装-worker-progress">封装 worker progress</h3>
<p>终于结束了吗？别忘了所有的回调函数都是由 worker.progress() 驱动的。用户必须定期调用这个函数，不然所有任务都会卡住不动了。</p>
<p>那么解决方法也非常简单：我们在异步运行时中首先创建一个协程，不停地调用 <code>worker.progress()</code> ，然后 yield 让出。为了做到与具体的异步运行时库无关，我们这里只实现了这个协程本身，用户需要手动 spawn 它：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">Worker</span> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">polling</span>(<span class="hljs-keyword">self</span>: Rc&#x3C;<span class="hljs-keyword">Self</span>>) {
      <span class="hljs-comment">// 不停循环直到 worker 的其它引用都释放了为止</span>
      <span class="hljs-keyword">while</span> Rc::<span class="hljs-title function_ invoke__">strong_count</span>(&#x26;<span class="hljs-keyword">self</span>) > <span class="hljs-number">1</span> {
        <span class="hljs-comment">// 不停地调用 progress，直到没有新事件产生</span>
        <span class="hljs-keyword">while</span> <span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">progress</span>() != <span class="hljs-number">0</span> {}
        <span class="hljs-comment">// 暂时让出 CPU，等待下次调度</span>
        futures_lite::future::<span class="hljs-title function_ invoke__">yield_now</span>().<span class="hljs-keyword">await</span>;
      }
    }
}
<span class="hljs-comment">// 用法示例：tokio::task::spawn_local(worker.clone().polling());</span>
</code></pre>
<p>当所有其它协程任务都挂起时，运行时就会调度运行 polling 协程，用新事件触发若干回调函数，从而唤醒对应的协程。</p>
<h2 id="在-rust-异步运行时中使用-ucx">在 Rust 异步运行时中使用 UCX</h2>
<p>到此为止我们就完成了对 UCX 异步封装的主要工作。值得注意的是，上面过程只用到了 Rust 语言内建的 async-await 语法，以及标准库中定义的最核心接口（Future 等），完全不依赖于任何一种特定的运行时环境（Tokio，async-std，smol 等）。</p>
<p>接下来我们以 Tokio 为例，介绍在 Rust 异步运行时中使用 async-ucx 构建一个完整可用程序的过程。这里我们实现一个最简单的 echo 程序：客户端向服务端发送一条消息，服务端收到后打印出来。完整代码在 <strong>examples/tag.rs</strong>。</p>
<p>首先写主函数：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">use</span> async_ucx::ucp::*;
<span class="hljs-keyword">use</span> std::io::<span class="hljs-type">Result</span>;

<span class="hljs-comment">// 使用 Tokio 默认的单线程运行时</span>
<span class="hljs-meta">#[tokio::main(flavor = <span class="hljs-string">"current_thread"</span>)]</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">main</span>() <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;()> {
  env_logger::<span class="hljs-title function_ invoke__">init</span>();
  <span class="hljs-comment">// 这里需要创建一个 LocalSet，才能 spawn !Send 的单线程 Future</span>
  <span class="hljs-keyword">let</span> <span class="hljs-variable">local</span> = tokio::task::LocalSet::<span class="hljs-title function_ invoke__">new</span>();
  <span class="hljs-comment">// 根据命令行参数决定是服务端还是客户端</span>
  <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(server_addr) = std::env::<span class="hljs-title function_ invoke__">args</span>().<span class="hljs-title function_ invoke__">nth</span>(<span class="hljs-number">1</span>) {
    local.<span class="hljs-title function_ invoke__">run_until</span>(<span class="hljs-title function_ invoke__">client</span>(server_addr)).<span class="hljs-keyword">await</span>?;
  } <span class="hljs-keyword">else</span> {
    local.<span class="hljs-title function_ invoke__">run_until</span>(<span class="hljs-title function_ invoke__">server</span>()).<span class="hljs-keyword">await</span>?;
  }
  <span class="hljs-title function_ invoke__">Ok</span>(())
}
</code></pre>
<p>接下来实现服务端：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">server</span>() <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;()> {
  <span class="hljs-built_in">println!</span>(<span class="hljs-string">"server"</span>);
  <span class="hljs-comment">// 创建 worker 和后台 progress 协程</span>
  <span class="hljs-keyword">let</span> <span class="hljs-variable">context</span> = Context::<span class="hljs-title function_ invoke__">new</span>();
  <span class="hljs-keyword">let</span> <span class="hljs-variable">worker</span> = context.<span class="hljs-title function_ invoke__">create_worker</span>();
  tokio::task::<span class="hljs-title function_ invoke__">spawn_local</span>(worker.<span class="hljs-title function_ invoke__">clone</span>().<span class="hljs-title function_ invoke__">polling</span>());

  <span class="hljs-comment">// 创建 listener 并等待连接</span>
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">listener</span> = worker.<span class="hljs-title function_ invoke__">create_listener</span>(<span class="hljs-string">"0.0.0.0:0"</span>.<span class="hljs-title function_ invoke__">parse</span>().<span class="hljs-title function_ invoke__">unwrap</span>());
  <span class="hljs-built_in">println!</span>(<span class="hljs-string">"listening on {}"</span>, listener.<span class="hljs-title function_ invoke__">socket_addr</span>());
  <span class="hljs-keyword">let</span> <span class="hljs-variable">connection</span> = listener.<span class="hljs-title function_ invoke__">next</span>().<span class="hljs-keyword">await</span>;
  <span class="hljs-keyword">let</span> <span class="hljs-variable">_endpoint</span> = worker.<span class="hljs-title function_ invoke__">accept</span>(connection);
  <span class="hljs-built_in">println!</span>(<span class="hljs-string">"accept"</span>);

  <span class="hljs-comment">// 接收消息并打印出来</span>
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">buf</span> = [<span class="hljs-number">0u8</span>; <span class="hljs-number">0x100</span>];
  <span class="hljs-keyword">let</span> <span class="hljs-variable">len</span> = worker.<span class="hljs-title function_ invoke__">tag_recv</span>(<span class="hljs-number">100</span>, &#x26;<span class="hljs-keyword">mut</span> buf).<span class="hljs-keyword">await</span>;
  <span class="hljs-keyword">let</span> <span class="hljs-variable">msg</span> = std::<span class="hljs-type">str</span>::<span class="hljs-title function_ invoke__">from_utf8</span>(<span class="hljs-keyword">unsafe</span> { <span class="hljs-title function_ invoke__">transmute</span>(&#x26;buf[..len]) }).<span class="hljs-title function_ invoke__">unwrap</span>();
  <span class="hljs-built_in">println!</span>(<span class="hljs-string">"recv: {:?}"</span>, msg);
  <span class="hljs-title function_ invoke__">Ok</span>(())
}
</code></pre>
<p>客户端更加简单：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">client</span>(server_addr: <span class="hljs-type">String</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;()> {
  <span class="hljs-built_in">println!</span>(<span class="hljs-string">"client"</span>);
  <span class="hljs-comment">// 创建 worker 和后台 progress 协程</span>
  <span class="hljs-keyword">let</span> <span class="hljs-variable">context</span> = Context::<span class="hljs-title function_ invoke__">new</span>();
  <span class="hljs-keyword">let</span> <span class="hljs-variable">worker</span> = context.<span class="hljs-title function_ invoke__">create_worker</span>();
  tokio::task::<span class="hljs-title function_ invoke__">spawn_local</span>(worker.<span class="hljs-title function_ invoke__">clone</span>().<span class="hljs-title function_ invoke__">polling</span>());

  <span class="hljs-comment">// 建立连接</span>
  <span class="hljs-keyword">let</span> <span class="hljs-variable">endpoint</span> = worker.<span class="hljs-title function_ invoke__">connect</span>(server_addr.<span class="hljs-title function_ invoke__">parse</span>().<span class="hljs-title function_ invoke__">unwrap</span>());
  <span class="hljs-built_in">println!</span>(<span class="hljs-string">"connect to {:?}"</span>, server_addr);

  <span class="hljs-comment">// 发送消息</span>
  <span class="hljs-keyword">let</span> <span class="hljs-variable">msg</span> = <span class="hljs-string">b"hello"</span>;
  endpoint.<span class="hljs-title function_ invoke__">tag_send</span>(<span class="hljs-number">100</span>, msg).<span class="hljs-keyword">await</span>;
  <span class="hljs-built_in">println!</span>(<span class="hljs-string">"send: {:?}"</span>, msg);
  <span class="hljs-title function_ invoke__">Ok</span>(())
}
</code></pre>
<p>就这么简单，不到 50 行代码就可以实现一个完整的客户端和服务端。相比之下，UCX 官方提供的 <strong>ucp_hello_world</strong> 程序足足用了好几百行 C 代码才实现了同样的功能。这说明我们的封装更加简单易用，同时 async Rust 能够极大的提高异步编程开发效率。</p>
<h2 id="总结与展望">总结与展望</h2>
<p>本文介绍了用 async Rust 封装 UCX 异步接口的主要过程。其中涉及的核心知识技巧包括：</p>
<ul>
<li>C 语言中用回调函数处理异步逻辑的方法</li>
<li>Rust 语言中 Future 的角色和功能，异步运行时的基本原理</li>
<li>如何用 Future 包装回调函数，如何在二者之间传递信息</li>
<li>如何实现 Reactor，用事件驱动整个异步框架的运行</li>
</ul>
<p>目前 async-ucx 已经基本完成了对 UCP 接口的封装，还剩下另一半 UCT 接口没有实现。</p>
<p>此外，目前 async-ucx 还只支持以 busy-polling 轮询模式处理事件，这会使得运行它的 CPU 核一直处于 100% 满载状态。这样做当然性能是最高的，但是不太节能。UCX 自身支持休眠-唤醒机制，可以在没有事件发生的时候休眠当前线程、让出 CPU、等事件发生时再唤醒。其内部实现是为每个 worker 都创建了一个 event_fd，用户可以拿它去做 epoll，从而阻塞线程等待事件发生。</p>
<p>但是，要用好这一机制需要与 Rust 异步执行器进行深度整合。据我了解，至少 Tokio 1.0 是没有暴露相关接口的。而且这部分的实现一旦有任何闪失，都会导致唤醒遗失、程序卡住的问题出现。未来如何科学地实现休眠机制也是一个不小的挑战。</p>
<p>总的来说，异步 IO 在支持极高性能的同时也带来了极大的编程复杂性，而 Rust 的 async 协程机制很好的压制了这种复杂性。在我看来，Rust 是这个时代最适合编写复杂 IO 系统的语言。欢迎感兴趣的读者继续关注，<del>一同加入到我们推翻 C/C++ 旧世界的行列中来！</del></p>`;export{p as assetURLs,c as default,e as metadata,t as toc};

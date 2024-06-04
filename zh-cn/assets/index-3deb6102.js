const e="/zh-cn/assets/cover-4e3a952e.webp",s="/zh-cn/assets/image1-7745272d.webp",l=[e,s],n={label:"Xline 0.7重构性能分析总述",description:"在Xline 0.7.0中，我们完成了对Xline代码库中进行了一次较大的重构。这次重构在某些性能测试中甚至使得Xline获得了近20倍的性能提升。在本文中我会讲解Xline中重构后命令执行流程的新设计，以及我们是如何优化Xline的性能的。",cover:"./cover.webp",location:"中国香港",author:["达坦科技"],date:"2024-05-16",title:"Xline 0.7 Refactoring Performance Analysis Overview"},a=[{label:"重构概述",level:2},{label:"etcd 的性能分析",level:2},{label:"etcd 命令执行流程",level:3},{label:"主要性能开销",level:3},{label:"为什么 etcd 难以在多核 cpu 上扩展性能",level:3},{label:"Xline 重构概述",level:2},{label:"Xline 与 etcd 相似之处",level:3},{label:"CURP 的冲突检测性能",level:3},{label:"WAL 取代 RocksDB",level:3},{label:"Cmd worker/Conflict Checked MPMC",level:3},{label:"Client propose",level:3},{label:"实现中的问题",level:2},{label:"并发执行问题",level:3},{label:"Async 中 IO 阻塞操作真的有害吗?",level:3},{label:"内部可变性",level:3},{label:"隐藏的内存分配",level:3},{label:"无锁数据结构",level:3},{label:"总结",level:2}],c=`<p><img src="${e}" alt="封面"></p>
<h2 id="重构概述">重构概述</h2>
<p>在 Xline 0.7.0 中，我们完成了对 Xline 代码库中进行了一次较大的重构。这次重构在某些性能测试中甚至使得 Xline 获得了近 20 倍的性能提升。在本文中我会讲解 Xline 中重构后命令执行流程的新设计，以及我们是如何优化 Xline 的性能的。</p>
<h2 id="etcd-的性能分析">etcd 的性能分析</h2>
<p>由于 Xline 的实现和 etcd 类似，在 etcd 中的性能瓶颈在 Xline 中同样存在。因此在开始对 Xline 进行分析之前，让我们首先分析一下 etcd 的性能。</p>
<h3 id="etcd-命令执行流程">etcd 命令执行流程</h3>
<p>我们首先需要梳理一下 etcd 命令的执行流程，这有助于我们后面进行的性能分析。etcd 使用的是 Raft 共识算法，命令的执行流程很简单，简要叙述如下：</p>
<ol>
<li>节点接收 client 发送的命令</li>
<li>节点将命令写入自身的 log 中</li>
<li>节点将这条 log 复制到多数 follower 节点上</li>
<li>节点在自身状态机上执行这条命令，持久化到后端存储</li>
<li>节点返回执行结果到 client</li>
</ol>
<h3 id="主要性能开销">主要性能开销</h3>
<p>影响一个 etcd 节点性能的因素有很多，要分析性能首要的问题是分析关键路径上的各类操作，这包括 CPU 时间和各类 IO 操作。接下来我会对这些操作进行逐条分析。由于在 etcd 集群中 leader 的压力是最大的，以下的性能分析中的节点都是指 leader 节点。</p>
<h4>gRPC 请求</h4>
<p>在 etcd 中主要存在两种 gRPC 通信，一种是节点处理 client 发送的命令，另外一种是节点向其他 follower 节点复制 log。对于 etcd 实现来说，第一种显然是在关键路径上的，而由于 etcd 需要提前复制到大多数节点上才会返回结果给 client, 所以第二种同样位于关键路径上。</p>
<p>在 go gRPC 的性能测试中单核 CPU 通常能够每秒处理数十 k 的请求， 而在 etcd 在设计上也通常需要处理每秒数十 k 的请求，这说明对于 etcd gRCP server 的压力是非常大的。因此如果在有限的环境下，gRPC 可能会导致性能瓶颈。</p>
<h4>存储 IO</h4>
<p>对于存储设备上的 IO 主要有两种:</p>
<ol>
<li>对于每个命令，我们需要持久化到 WAL 中</li>
<li>执行命令时，我们需要持久化到后端存储中</li>
</ol>
<p>我们需要这两种操作都执行完成后才会返回给 client，因此它们都是位于关键路径上</p>
<p>由于 Raft 安全性的要求，持久化到 WAL 是需要同步地落盘才能进行后续操作，因此性能瓶颈主要落在了 fsync 的性能上，因为即使在 SSD 上一次 fsync 也需要数百微妙。</p>
<p>而持久化到后端存储则没有很高的安全性要求，仅需要保持原子性即可，不需要每次调用都使用 fsync，因此这些操作大部分都可以在内存中完成，一般情况下都是 non-blocking 的，不会造成明显性能瓶颈。</p>
<h3 id="为什么-etcd-难以在多核-cpu-上扩展性能">为什么 etcd 难以在多核 cpu 上扩展性能</h3>
<p>etcd 保证了 strict serializable，所有操作必须按照一个全局的顺序来完成，这样就造成了我们的命令处理逻辑无法并发地完成。例如在处理 Raft log 时，我们首先需要拿到一把全局的锁，然后才能进行后续操作，同样对于后端的命令执行也需要按顺序逐个进行，无法并行执行。因此，etcd 的吞吐量极大地受限于单线程的性能。</p>
<h2 id="xline-重构概述">Xline 重构概述</h2>
<p>下面我会从整体角度介绍 Xline 本次重构中对性能有较大影响的部分。这其中主要涉及到 Xline 对于 command 的执行机制的修改。</p>
<h3 id="xline-与-etcd-相似之处">Xline 与 etcd 相似之处</h3>
<p>Xline 使用的是 CURP 共识算法，它和 Raft 最主要的区别就是分为前端 commit 和后端 commit，后端 commit 和 Raft 相同，都需要 leader 复制 log 到大多数节点上。而前端 commit 是通过 witness 这个机制来实现的，witness 的机制是 client 直接记录到 witness 上来完成快速 commit。因此，要分析 Xline 的性能，我们需要从前端的 witness 性能和后端 Raft 的性能两方面进行分析。</p>
<h3 id="curp-的冲突检测性能">CURP 的冲突检测性能</h3>
<p>在 CURP 的中，为了保证 witness 上的 commands 的 commutativity， 我们需要对所有 commands 进行冲突检测。</p>
<p>一个直接的想法就是把所有 commands 放在一个列表里，然后当检查一个 command 是否冲突时就遍历这个列表进行检查。这就是 Xline 中旧实现的思路，这样导致关键路径上每次冲突检查的复杂度为 O(n) ，效率很低。同时，这个列表外层还需要加一把锁，造成严重的锁护送(lock convoy)的现象，这一现象我会稍后详细讲解。</p>
<p>在重写后的冲突检测机制中，我们使用了区间树来优化 KV 命令冲突检测的复杂度，使得冲突检测的时间复杂度降至了<code>O(log(n))</code>，使得冲突检测效率大大提升，即使是在关键路径上对性能影响也会比较小。区间树实现可以参见往期文章，这里不再赘述。</p>
<h3 id="wal-取代-rocksdb">WAL 取代 RocksDB</h3>
<p>Xline 最初使用 RocksDB 作为 CURP 的 Log 存储。由于 CURP 的 log 实际上是顺序追加的，RocksDB 并不是最合适的选择，因为 RocksDB 需要先写入到它自己的 WAL 中，然后再写入到 MemTable，最后再写入到 SST 文件中，这对于我们的简单用例来说显得多此一举了。于是在新的实现中，我们实现了我们自己的 WAL 来作为 CURP 的 log 存储。这个 WAL 的实现非常简单，整个存储使用多个 WAL 文件，log 的追加的实现就是单个文件的追加，这样所有的 log 追加操作都是文件的顺序写入，效率很高，并且不存在写放大的现象。</p>
<h3 id="cmd-worker/conflict-checked-mpmc">Cmd worker/Conflict Checked MPMC</h3>
<p>Xline 最初实现了一个称为 conflict checked mpmc 的结构，它的目的是用于命令的并发执行。它能够动态维护命令间的冲突关系，并且将没有冲突的 command 发送到 cmd workers 中进行执行。</p>
<p><img src="${s}" alt="图片"></p>
<p>但是由于需要动态维护冲突的关系，按照命令发送到这个 mpmc 中的顺序，所有节点的冲突关系形成了一个 DAG，那么单次插入的时间复杂度为<code>O(n)</code>，虽然实现上是使用 channel 进行通信不存在锁护送问题，但在面临高吞吐的时候依然效率较低。在最新的设计中，这一结构已经被移除。</p>
<p>另外一个问题是接收 conflict checked mpmc 发出的 command 的 cmd workers。Xline 首先会 spawn 一定数量的 workers，然后这些 workers 通过 channel 和 conflict checked mpmc 进行通信。但实际上这些 worker 是没有必要的，因为 Xline 已经构建在 tokio 的 runtime 上，runtime 本身就使用了 workers 范式。而我们再在 runtime 的 workers 上再实现一个执行 command 的 workers 是没有必要的，并且可能会带来消息传递的 overhead。所以在需要执行一个命令时，直接调用 tokio::spawn 即可。</p>
<h3 id="client-propose">Client propose</h3>
<p>在 CURP 中，client 的 propose 分为 fast path 和 slow path，其中对于没有冲突的命令可以走 fast path，只需要 1RTT 就能够完成，而如果发现有冲突，那么 client 就必须要求 leader 将这条命令同步到大多数节点后再返回结果。</p>
<p>在 Xline 之前的实现中，一个 client propose 可以分为两个 gRPC unary 的请求，一个是向 leader 发送 Propose 请求，这个请求包含实际的命令，返回值是 fast path 的结果。而另外一个是 WaitSynced 请求，它的作用是如果 fast path 失败就等待同步完成后再返回。</p>
<p>这样的设计看似简单，但其实存在性能上的问题。我们可以和 etcd 进行对比，etcd 由于所有命令都是同步完成后才返回给 client，因此 etcd 的 client 只需要发送一个 propose 的 unary 请求即可收到最终的结果。而对于 Xline 的 client 来说需要向 leader 发送两个请求。这样就大大增加了 gRPC server 的负载。在 gRPC 实现性能接近的情况下，相同的 CPU 时间 Xline 大约只能处理相当于 etcd 一半的请求。</p>
<p>为了解决这个问题，我们改用了使用 gRPC 流来实现 client propose。这样 client 和 server 会建立一个双向的流来进行通信，client 只需要向流中发送一条消息，并且根据情况选择接收一条或两条回复。这样 leader 需要处理的消息就从原先的两条变为一条，而且在 fast path 的情况下只需要返回一条消息，这样就大大提高了 gRPC 命令处理的效率。</p>
<h2 id="实现中的问题">实现中的问题</h2>
<h3 id="并发执行问题">并发执行问题</h3>
<p>在 Xline 初始设计中，我们希望能够发挥出 CURP 的优势，尽可能地使用并发执行的策略。</p>
<p>在 CURP 中，对于相互之间不冲突的命令，理论上是可以并发进行执行的。我们最开始设计了 conflict checked mpmc 这一数据结构来实现并发执行，但是事与愿违，这样做反而会对性能产生负面影响。下面我会解释这一现象的原因。</p>
<h4>并发开销</h4>
<ol>
<li>
<p>执行过程很短，并发成本昂贵对于一个 put 的命令，在 speculative execute 的过程中，我们并不需要真正地写入到 DB 中，我们只需要保证命令成功持久化到 witness 上即可返回结果给 client。因此，对于这类不需要进行 DB 操作的命令来说，并发执行是没有必要的。</p>
</li>
<li>
<p>而为了实现并发，需要使用 channel 在不同的 tokio task 间进行通信，这样就会产生不可忽略的开销：</p>
<ul>
<li>线程通信开销，需要复制数据</li>
<li>无法利用 CPU 缓存，造成大量内存访问</li>
</ul>
</li>
<li>
<p>并发执行时对 RocksDB IO 产生负面影响 并发执行时每条命令完成时都会单独向 RocksDB 写入，相当于使用多个线程向 RocksDB 进行写入。这样做实际上是非常低效率的，一方面会造成更多的 IO 操作，另一方面会有严重的写放大现象。即使 RocksDB 底层实现上会对操作进行 batching，但依然比我们手动管理 batch 更为低效。</p>
</li>
</ol>
<p><strong>并发的替代方案</strong></p>
<p>因此，在重构后的版本中，我们删去了并发操作，所有线程的 IO 操作都会由 channel 发送到单独的专用线程中，在这个专用线程中经过 batching 之后再提交到存储当中，这样大大提高了 IO 的效率，系统整体性能也得到提升。</p>
<p>那么读者可能会有疑问，batching 是否会对 latency 产生负面影响呢？我们的解决方法是这样的：用于提交到储存的这个线程从 channel 接受到一个操作后，它会在一个循环中 busy-waiting channel 中是否还会接收更多的操作。由于 Xline 设计上需要每秒处理数十 k 的请求，因此可以循环几百到数千次，这样在高负载下不会一次提交太多，低负载下也不会浪费 CPU 时间，最终对于 latency 不会有显著影响。对比之下如果使用定时器，例如 std::thread::sleep 或者 tokio::time::sleep 就会低效很多，因为前者需要使用系统调用，不仅效率低而且还会 block 住 tokio 的 worker，而后者如果 yeild 到 runtime 之后我们无法准确知道休眠的时间(例如 runtime 处于高负载)，因此几乎无法使用。</p>
<h4>锁护送(lock convoy)</h4>
<p>在最初调试 Xline 时，我们发现 Xline 的 CPU 占用率非常低，即使在最大 throughput 情况下在多核 CPU 上 CPU time 百分比只有数十。可想而知，我们最大的 throughput 也非常低，大约只能每秒处理数千的请求。这是为什么呢？</p>
<p>这个问题的原因就是锁护送(lock convoy)现象，按照我之前所讲解的冲突检测中的例子，我们用一把锁来保护一个数据结构，当我们并发执行的时候，多个线程会尝试获取锁来更新这个数据结构，而这个数据结构更新所需要的 CPU 时间又非常长，这样看似是使用多个线程进行并发执行，实际上线程大部分时间都在等待拿到锁。</p>
<p>更致命的是，tokio 的 async 模型使用的是一个小的固定线程池作为 workers，由于 Xline 中使用的是同步锁，一旦一个 worker 线程持有这个锁的时间过长，那么就会导致其余的 worker 线程都进入休眠状态，这些 worker 线程不仅无法更新这个数据结构，它们也无法执行其他任务，形成了一个锁车队。这样其实就解释了 Xline 的 CPU 占用很低的现象，因为大部分时间都只有一个线程处于运行的状态，无法发挥出异步的优势。</p>
<p>缓解 Xline 中锁护送问题的方法有很多，第一个就是我之前介绍的，优化数据结构的时间复杂度，减少更新操作花费的 CPU 时间。第二个就是使用背压(backpressure)机制，主动减少锁的负载(例如当数据结构中存储数据的规模达到一定限度时，阻止更多线程来继续更新数据结构)，这样能使锁护送现象尽快消散。第三个就是使用单个专用线程来更新数据结构，其他线程使用 channel 将更新操作发送到这个线程，这样虽然会有线程间通信的开销，但不会出现锁护送问题。</p>
<h3 id="async-中-io-阻塞操作真的有害吗?">Async 中 IO 阻塞操作真的有害吗?</h3>
<p>下一个就是 IO 阻塞问题， 我们往往会在 async 代码中处理 IO 操作时倾向于使用各类结构的 async 版本，而不使用它们的同步版本，但是在 async 代码中同步版本真的应该被避免吗?</p>
<h4>WAL 的 IO</h4>
<p>最初我们使用了 async 的 tokio::fs 来实现 WAL，但是当对它进行集成性能测试时，我们发现 WAL 的写入效率非常低，一次 log append 操作就需要花费数毫秒到几十毫秒，即使我们对 log 采用了 batching，这么高的延迟也是不可接受的。</p>
<p>究其原因，我们发现延迟较高的现象是由于 tokio runtime 调度所导致的。如果我们使用 async 的文件，如果当前 runtime 处于高负载的情况下(例如有大量 gRPC 请求)，当文件操作的 future yeild 到 runtime 以后，runtime 可能会忙于处理其他的任务，再次运行这个 future 的时间就没法确定了。这样就导致文件写入的高延迟现象。</p>
<p>再者，tokio::fs 中的文件操作实际上并不都是真正的异步，例如对于 fsync/fdatasync 操作，tokio 使用了 tokio::task::spawn_blocking 将 syscall 的操作移动到 tokio 的 blocking 线程上。我们之前提到，在现代 SSD 上一次 fsync 操作只需要数百微妙，所以通常根本不能算是 blocking 操作，而我们将它移动到其他线程上再发送回结果就显得非常昂贵了。</p>
<p>对于 WAL 使用同步 fs 操作的还有一个理由，就是 WAL 写入是一个高优先级操作，如果 WAL 写入没有完成，那么节点上的其他工作也是无法取得进展的，因此每次 WAL 同步地写入反而是更好的策略，即使极少数情况下 blocking 的时间过长，也只会阻塞一个线程，这在多核 CPU 环境下对系统性能并不会有显著影响。</p>
<p>tokio::fs 的延迟其实一直以来都是一个问题，有关的性能测试可见 tokio repo 中的 issue: <a href="https://github.com/tokio-rs/tokio/issues/3664%E3%80%82%E8%80%8C%E6%9C%80%E7%BB%88%E6%88%91%E4%BB%AC%E4%BD%BF%E7%94%A8">https://github.com/tokio-rs/tokio/issues/3664。而最终我们使用</a> std::fs 替换了 tokio::fs ，在新的性能测试中平均单次 log append 操作的延迟下降到了不到一毫秒。</p>
<h4>RocksDB 的 IO</h4>
<p>重构之初，由于 RocksDB 不支持异步写入，我们使用了 tokio::task::spawn_blocking 将 RocksDB 操作发送到其他线程中执行，但是这样并没有带来性能提升。这主要有两种原因:</p>
<ol>
<li>与 etcd 使用的 BoltDB 类似，在没有 fsync 的情况下，RocksDB 的 IO 操作大部分是在缓存中进行的。所以大部分时候 RocksDB 的操作都能很快完成，并不能算是 blocking 操作，发送到其他线程就多此一举了。</li>
<li>RocksDB 有自己管理的线程池，RocksDB 实际的处理逻辑和 IO 操作都是由这些线程来完成的，因此这些操作不会阻塞 tokio 的 worker 线程。</li>
</ol>
<p>总而言之，RocksDB 的操作是异步友好的，我们可以直接在异步代码中调用这些操作而不需要担心阻塞。</p>
<h3 id="内部可变性">内部可变性</h3>
<p>接下来我会谈谈 Xline 中使用内部可变性的问题。Xline 中因为最初为了能够并发执行，在 API 设计上使用了很多的内部可变性范式。而在多线程代码中，我们最常见到的内部可变性使用方法就是使用 Mutex 或者是 RwLock 这两种锁 。</p>
<p>一个简单的 API 的例子：</p>
<pre><code class="hljs language-rust">
<span class="hljs-keyword">trait</span> <span class="hljs-title class_">KvOperations</span>&#x3C;K, V> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">insert</span>(&#x26;<span class="hljs-keyword">self</span>, key: K, value: V);
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">query</span>(&#x26;<span class="hljs-keyword">self</span>, key: &#x26;K);
}

<span class="hljs-keyword">impl</span> <span class="hljs-title class_">KvOperations</span>&#x3C;K,V> <span class="hljs-keyword">for</span> <span class="hljs-title class_">KvObject</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">insert</span>(&#x26;<span class="hljs-keyword">self</span>, key: K, value: V) {
        <span class="hljs-keyword">self</span>.inner.<span class="hljs-title function_ invoke__">write</span>().<span class="hljs-title function_ invoke__">insert</span>(key, value);
    }
    ...
}

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">thread0</span>&#x3C;T: KvOperations>(a: T, key: K, value: V) {
    a.<span class="hljs-title function_ invoke__">insert</span>(key, value);
}

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">thread1</span>&#x3C;T: KvOperations>(a: T, key: K) {
    a.<span class="hljs-title function_ invoke__">query</span>(key);
}
</code></pre>
<p>对于 insert 这样会实际上会修改数据结构的操作，在 API 定义上只要求一个不可变引用。这样的 API 设计看似方便，但在重构中我们发现这些不可变引用往往屏蔽了底层数据结构实现对于锁的使用，这样使用者往往不会考虑多线程下锁竞争的关系， 例如在上面的 thread0 和 thread1 中，调用者并不清楚底层具体使用了什么锁，它和其他的 thread 有没有竞争关系，这样就会造成 API 的滥用，最终就可能导致多线程下激烈的锁竞争。</p>
<p>所以，在构建 API 时，更好的方法是使用 Rust 的所有权模型，将锁交给调用者处理，修改后的例子如下:</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">trait</span> <span class="hljs-title class_">KvOperations</span>&#x3C;K, V> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">insert</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, key: K, value: V);
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">query</span>(&#x26;<span class="hljs-keyword">self</span>, key: &#x26;K);
}

<span class="hljs-keyword">impl</span> <span class="hljs-title class_">KvOperations</span>&#x3C;K,V> <span class="hljs-keyword">for</span> <span class="hljs-title class_">KvObject</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">insert</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, key: K, value: V) {
        <span class="hljs-keyword">self</span>.inner.<span class="hljs-title function_ invoke__">insert</span>(key, value);
    }
    ...
}

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">thread0</span>&#x3C;T: KvOperations>(a: Arc&#x3C;RwLock&#x3C;T>>) {
    a.<span class="hljs-title function_ invoke__">write</span>().<span class="hljs-title function_ invoke__">insert</span>(key, value);
}

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">thread1</span>&#x3C;T: KvOperations>(a: Arc&#x3C;RwLock&#x3C;T>>) {
    a.<span class="hljs-title function_ invoke__">read</span>().<span class="hljs-title function_ invoke__">query</span>(key, value);
}
</code></pre>
<p>这样做就能够迫使调用者考虑锁竞争的关系，例如我们如果在 thread1 中获取了读锁，就会知道这次操作会阻塞其他线程中的写锁。在代码实现上还会更加灵活，例如持有锁以后可以进行一系列操作，而不是使用多个内部可变重复上锁。</p>
<h3 id="隐藏的内存分配">隐藏的内存分配</h3>
<p>隐藏的内存分配往往也会对性能产生很大影响。在重构中，我们尝试切换 Xline 的内存分配器从 glibc 到 jemalloc，结果是带来了显著的性能提升，这是为什么呢？</p>
<p>我们知道 jemalloc 能够有效避免内存碎片，所以对于很多小分配来说，jemalloc 通常会更快。分析 Xline 的代码，我们发现 Xline 中的确存在非常多的隐藏的堆分配，而且这些堆分配大部分都是用于命令的处理，这包括例如<code>Arc::new</code>，<code>Vec::clone</code>还有各类序列化操作。在 benchmark 用例中，一个命令只有几百个 bytes，所以这些分配都可以视作为小分配。Xline 的问题主要有两个，第一个是小分配太多导致内存碎片化，另外一个是在持有锁的情况下也会进行堆分配，导致持有锁的时间显著增加。因此，在代码中需要谨慎使用<code>Arc::new</code>这样的隐藏的内存分配，多利用 Rust 的生命周期机制，避免不必要的堆分配。另一个就是尽量减少在关键路径上，或者是持有锁的情况下进行堆分配。</p>
<h3 id="无锁数据结构">无锁数据结构</h3>
<p>最后一点就是有关无锁数据结构的使用。在 Xline 性能分析中我们发现，一些无锁数据结构并不像它们宣称的那样是其他需要锁定的数据结构的直接替代，这些无锁数据结构的使用反而堆系统性能造成负面影响。</p>
<p>第一个例子就是 DashMap ，它是 HashMap 的一个并发实现。但是在实际测试中，我们发现 DashMap 遍历效率很低，甚至比 HashMap 要慢了一个数量级，原因是 DashMap 内部使用的 Arc 导致解引用的效率会变低很多。</p>
<p>第二个例子就是对于 crossbeam 中 SkipMap 的使用， SkipMap 虽然支持无锁并发操作，但是与 RwLock 相比，它的单线程插入和删除性能还是要慢了一倍以上，因为即使均摊时间复杂度相同， BTreeMap 树高度更低和对于缓存更加友好的特性使它的性能会更好。</p>
<h2 id="总结">总结</h2>
<p>本次 Xline 的重构中，我们主要针对命令执行流程进行了重大改进，包括冲突检测优化，存储优化，以及 client 请求处理上的优化等等。同时，我们也对于一些影响性能的潜在问题进行了分析和改进。从重构中我们也学到了不少性能优化方面的经验和技巧，这对于 Xline 未来的持续开发和性能提升会有很大的帮助。</p>`;export{l as assetURLs,c as default,n as metadata,a as toc};

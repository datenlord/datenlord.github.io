const s=[],a={label:"内存顺序（Memory Order）问题（二）",description:"上一篇推文介绍了内存模型，并介绍了两种内存顺序， memory_order_acquire（Acquire）和memory_order_release（Release）。个人认为，这两种内存顺序是C++定义的六种内存顺序中最重要的两种， 只有理解了Acquire和Release的语义，才能更好理解其他四种内存顺序的语义。更进一步，在实际使用场景中，Acquire和Release是最常见的两种内存顺序。",location:"浙江",tags:["高性能编程"],date:"2022-06-15",title:"Memory Order (Memory Order) problem (2)"},e=[{label:"Happen-Before 关系",level:2},{label:"Synchronize-With 关系",level:2}],n=`<p>上一篇推文介绍了内存模型，并介绍了两种内存顺序， <code>memory_order_acquire</code>（Acquire）和 <code>memory_order_release</code>（Release）。个人认为，这两种内存顺序是 C++定义的六种内存顺序中最重要的两种， 只有理解了 Acquire 和 Release 的语义，才能更好理解其他四种内存顺序的语义。更进一步，在实际使用场景中，Acquire 和 Release 是最常见的两种内存顺序。</p>
<p>如何判断该使用哪种内存顺序？这是开发者在使用原子类型和无锁化编程时最常碰到的问题。本篇 Blog 用实际的例子来说明，如何判断该使用哪种内存顺序。此外，为了更深入理解基于原子操作和基于锁实现的同步关系的本质区别， 本篇 Blog 还会介绍 Happen-Before 关系和 Synchronize-With 关系。</p>
<h2 id="happen-before-关系">Happen-Before 关系</h2>
<p>线程间的同步关系，是要约定不同线程里发生的事件的先后次序，互斥关系本质也是一种同步关系。Happen-Before 关系就是用于定义不同事件之间的先后次序。Happen-Before 关系可以是在代码里静态约定好（基于锁的方式），也可以是在程序运行时动态发现（基于原子操作和内存顺序的方式）。</p>
<p>先来看一个简单的例子，这个例子解释了 Happen-Before 关系：</p>
<pre><code class="hljs language-c"><span class="hljs-type">int</span> data = <span class="hljs-number">0</span>;
<span class="hljs-type">int</span> flag = <span class="hljs-number">0</span>;

<span class="hljs-comment">// thread 1</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func1</span><span class="hljs-params">()</span> {
    data = <span class="hljs-number">42</span>;
    flag = <span class="hljs-number">1</span>; <span class="hljs-comment">// 事件1</span>
}

<span class="hljs-comment">// thread 2</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func2</span><span class="hljs-params">()</span> {
    <span class="hljs-keyword">if</span> (flag == <span class="hljs-number">1</span>) <span class="hljs-comment">// 事件2</span>
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">"%d"</span>, data);
}
</code></pre>
<p>上面的例子里定义了两个全局变量，线程 1 设置 <code>flag = 1</code> 表示完成对 data 的赋值， 线程 2 读取 <code>flag</code> 的值用以判断线程 1 是否完成对 <code>data</code> 的赋值，如果 <code>flag == 1</code> 则输出 <code>data</code> 的值。我们定义两个事件，事件 1 为 <code>thread_func1</code> 里对 <code>flag</code> 赋值表示对 <code>data</code> 的赋值完成， 事件 2 为 <code>thread_func2</code> 里判断 <code>flag == 1</code>，如果 <code>flag == 1</code> 则输出 <code>data</code> 的值。由于没有用锁的方式在代码里静态规约事件 1 和事件 2 的先后顺序，程序运行时可以有多种结果， 有些结果是合理的，有些结果是不合理的。其中两种合理的结果是：要么线程 2 输出 <code>data</code> 的值 <code>42</code>，要么不输出。也就是说要么事件 1 Happen-Before 事件 2，要么事件 2 Happen-Before 事件 1。但是，还有些不合理的结果，比如线程 2 有可能输出 <code>data</code> 的值为 0，为什么呢？因为编译器或 CPU 会对程序进行优化，使得指令的执行顺序跟代码的逻辑顺序不一致。比如编译器可能对 <code>thread_func2</code> 进行如下优化：</p>
<pre><code class="hljs language-c"><span class="hljs-comment">// thread 2</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func2</span><span class="hljs-params">()</span> {
    <span class="hljs-type">int</span> tmp = data;
    <span class="hljs-keyword">if</span> (flag == <span class="hljs-number">1</span>)
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">"%d"</span>, tmp);
}
</code></pre>
<p>这里 <code>tmp</code> 代表某个寄存器，编译器优化 <code>thread_func2</code> 导致在判断 <code>flag == 1</code> 前把 <code>data</code> 的值先载入寄存器，此时 <code>data</code> 的值可能为 0， 判断完 <code>flag == 1</code> 之后再输出寄存器的值，此时即便 <code>data</code> 已经被 <code>thread_func1</code> 赋值为 1，但是寄存器 tmp 里的值仍然是 0。也就是说，程序运行时产生不合理的结果，是由于没有保证事件 1 和事件 2 之间的先后次序，导致两个事件在运行时有重叠。因此，为了保证上面的例子运行产生合理的结果，我们需要确保要么事件 1 Happen-Before 事件 2，要么事件 2 Happen-Before 事件 1。可以采用基于锁的信号量机制，在代码里静态约定事件 1 在事件 2 之前发生， 也可以采用原子操作和内存顺序在程序运行时动态发现事件 1 和事件 2 之间的关系。</p>
<p>这里我们先给出基于原子操作和内存顺序实现线程同步的实现。分两个步骤，先确定采用何种内存顺序，再确定采用哪种原子操作。</p>
<p>上面的程序产生不合理的结果，究其原因，是因为编译器和 CPU 对程序指令的优化，导致代码逻辑顺序和实际指令执行顺序不一致。因此，我们要用内存顺序来告诉编译器和 CPU 确保指令执行顺序和代码的逻辑顺序一致。上述例子里，<code>thread_func1</code> 里的两行赋值语句（两个写操作）顺序不能颠倒，<code>thread_func2</code> 里判断语句和打印语句（两个读操作）顺序不能颠倒：</p>
<pre><code class="hljs language-c"><span class="hljs-type">int</span> data = <span class="hljs-number">0</span>;
<span class="hljs-type">int</span> flag = <span class="hljs-number">0</span>;

<span class="hljs-comment">// thread 1</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func1</span><span class="hljs-params">()</span> {
    data = <span class="hljs-number">42</span>;
    <span class="hljs-comment">// 写操作之前的写操作，之间的顺序不能改变</span>
    flag = <span class="hljs-number">1</span>; <span class="hljs-comment">// 事件1</span>
}

<span class="hljs-comment">// thread 2</span>
<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func2</span><span class="hljs-params">()</span> {
    <span class="hljs-keyword">if</span> (flag == <span class="hljs-number">1</span>) <span class="hljs-comment">// 事件2</span>
        <span class="hljs-comment">// 读操作之后的读操作，之间的顺序不能改变</span>
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">"%d"</span>, data);
}
</code></pre>
<p>不熟悉读写操作顺序的读者建议先读一下上一篇 Blog 里介绍的四种读操作与写操作的先后顺序关系。回想上一篇 Blog 定义过 Acquire 和 Release 的语义：</p>




















<table><thead><tr><th align="left">内存顺序</th><th align="right">先后次序</th><th align="center">语义</th></tr></thead><tbody><tr><td align="left">Acquire</td><td align="right">读操作在前</td><td align="center">读读、读写</td></tr><tr><td align="left">Release</td><td align="right">写操作在后</td><td align="center">读写、写写</td></tr></tbody></table>
<p>可以看出：要规约“写操作之前的写操作之间的顺序不能改变”（写写），得采用 Release 语义；要规约“读操作之后的读操作，之间的顺序不能改变”（读读），得采用 Acquire 语义。</p>
<p>确定了内存顺序，我们再考虑该如何使用原子操作，确保要么事件 1 Happen-Before 事件 2， 要么事件 2 Happen-Before 事件 1，不能让两个事件在运行时有重叠。一种做法，我们可以让 <code>data</code> 成为原子变量，那就不需要 <code>flag</code> 这个通知变量了，两个线程直接原子访问 <code>data</code>。但是实际中，往往 <code>data</code> 代表的数据会比较大，不适合作为原子变量，因此才需要 <code>flag</code> 这个通知变量。因此，我们让 <code>flag</code> 成为原子变量，两个线程原子访问 <code>flag</code> 来实现同步，进而确保事件 1 和事件 2 之间的先后顺序：</p>
<pre><code class="hljs language-c++"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&#x3C;atomic></span></span>

<span class="hljs-function">std::atomic_int <span class="hljs-title">flag</span><span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>; <span class="hljs-comment">// 初始值为零</span>
<span class="hljs-type">int</span> data = <span class="hljs-number">0</span>;

<span class="hljs-comment">// thread 1</span>
<span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">thread_func1</span><span class="hljs-params">()</span> </span>{
    data = <span class="hljs-number">42</span>;
    flag.<span class="hljs-built_in">store</span>(<span class="hljs-number">1</span>, <span class="hljs-comment">// 事件1</span>
            std::memory_order_release);
}

<span class="hljs-comment">// thread 2</span>
<span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">thread_func2</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-type">int</span> ready = flag.<span class="hljs-built_in">load</span>( <span class="hljs-comment">// 事件2</span>
            std::memory_order_acquire);
    <span class="hljs-keyword">if</span> (ready == <span class="hljs-number">1</span>)
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">"%d"</span>, data);
}

要注意一点，上面采用原子操作和内存顺序，只能
</code></pre>
<p>要注意一点，上面采用原子操作和内存顺序，只能确保事件 1 和事件 2 之间先后发生，存在先后次序关系， 但是不能保证事件 1 一定在事件 2 之前发生，或者事件 2 一定在事件 1 之前发生。两个事件谁先谁后（Happen-Before 关系）需要在程序运行时才能确定。</p>
<h2 id="synchronize-with-关系">Synchronize-With 关系</h2>
<p>Synchronize-With 关系是指，两个事件，如果事件 1 Happen-Before 事件 2，那要把事件 1 同步给事件 2，确保事件 2 得知事件 1 已经发生</p>
<p>先来看采用信号量机制来实现前述事件 1 和事件 2 之间的同步：</p>
<pre><code class="hljs language-c++"><span class="hljs-type">sem_t</span> flag;
<span class="hljs-comment">// 初始化信号量，初始值为0，最大值为1</span>
<span class="hljs-built_in">sem_init</span>(&#x26;flag, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);

<span class="hljs-type">int</span>  = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">thread_func1</span><span class="hljs-params">()</span> </span>{
    data = <span class="hljs-number">42</span>;
    <span class="hljs-built_in">sem_post</span>(&#x26;flag); <span class="hljs-comment">// 事件1</span>
}

<span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">thread_func2</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-built_in">sem_wait</span>(&#x26;flag); <span class="hljs-comment">// 事件2</span>
    <span class="hljs-built_in">printf</span>(<span class="hljs-string">"%d"</span>, data);
}
</code></pre>
<p>采用信号量，使得这两个线程运行结果只有一种（静态规约），即只有一种 Happen-Before 关系，事件</p>
<ul>
<li>不论 <code>thread_func1</code> 和 <code>thread_func2</code> 谁先开始运行，<code>thread_func2</code> 都会等 <code>thread_func1</code> 执行完 <code>sem_post(&#x26;flag)</code>之后，才输出 <code>data</code> 的值 42。</li>
</ul>
<p>显然，大家看到了基于原子操作和内存顺序，与基于信号量的实现，得到不同的结果。这也就是我在上一篇 Blog 里提到的，基于原子操作和内存顺序，跟基于锁和信号量实现的线程间同步关系有本质的差异。基于锁和信号量的线程间同步关系，比基于原子操作和内存顺序的线程间同步关系要更强。</p>
<p>回到之前的例子，基于信号量实现两个线程间的同步，只有一种运行结果（静态规约）， <code>thread_func1</code> 里 <code>sem_post(&#x26;flag)</code>一定在 <code>thread_func2</code> 输出 <code>data</code> 的值之前。也就是说，信号量确保了事件 1 Happen-Before 事件 2，同时也在运行时确保了事件 1 Synchronize-With 事件 2 （通过 <code>thread_func1</code> 里 <code>sem_post(&#x26;flag)</code>和 <code>thread_func2</code> 里 <code>sem_wait(&#x26;flag)</code>来确保 Synchronize-With 关系）， 因而基于信号量的实现保证最终结果一定是 <code>thread_func2</code> 输出 <code>data</code> 的值 42。</p>
<p>但是，对于上述例子，基于原子操作和内存顺序实现两个线程间的同步，会有两种运行结果（动态发现）， 要么 <code>thread_func2</code> 输出 <code>data</code> 的值 42，要么 <code>thread_func2</code> 不输出 <code>data</code> 的值。也就是说，基于原子操作和内存顺序，只能保证事件 1 和事件 2 之间存在先后次序， 即要么事件 1 Happen-Before 事件 2，要么事件 2 Happen-Before 事件 1。可见，基于原子操作和内存顺序，无法保证一定只有事件 1 Happen-Before 事件 2 这一种关系。另外，在运行时，如果事件 1 Happen-Before 事件 2， 基于 flag 这个原子变量的原子操作和内存顺序的实现可以确保事件 1 Synchronize-With 事件 2 （通过 <code>thread_func1</code> 里 <code>flag.store(1, std::memory_order_release)</code>和 <code>thread_func2</code> 里 <code>flag.load(std::memory_order_acquire)</code>来确保）；如果在运行时，事件 2 Happen-Before 事件 1， 那基于 <code>flag</code> 这个原子变量的原子操作和内存顺序的实现无法确保事件 2 和事件 1 之间有 Synchronize-With 关系，需要另行实现。</p>
<p>一句话总结，基于锁的同步机制，是在代码里静态约定不同线程里发生的事件之间的 Happen-Before 关系和 Synchronize-With 关系；而基于原子操作和内存顺序，是在程序运行时动态发现事件之间的 Happen-Before 关系以及 Synchronize-With 关系。</p>`;export{s as assetURLs,n as default,a as metadata,e as toc};

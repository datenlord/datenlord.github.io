const s=[],e={label:"内存顺序（Memory Order）问题（一）",description:"内存顺序，通俗地讲，是关于代码编译成机器指令后的执行顺序问题。内存顺序和编译器、硬件架构密切相关。那为什么会产生内存顺序问题呢？有两方面原因：一方面，编译器为了优化程序性能，不会完全按照开发者写的代码的顺序来生成机器指令；另一方面，在程序运行时，为了提高性能，CPU也不完全按照程序的指令顺序执行，比如体系结构里经典的Tomasulo算法。",location:"浙江",tags:["高性能编程"],date:"2022-06-15",title:"Memory Order (Memory Order) problem (1)"},a=[{label:"内存模型",level:2},{label:"内存顺序",level:2},{label:"原子操作",level:2},{label:"C++的内存顺序",level:2}],c=`<p>内存顺序，通俗地讲，是关于代码编译成机器指令后的执行顺序问题。内存顺序和编译器、硬件架构密切相关。那为什么会产生内存顺序问题呢？有两方面原因：一方面，编译器为了优化程序性能，不会完全按照开发者写的代码的顺序来生成机器指令；另一方面，在程序运行时，为了提高性能，CPU 也不完全按照程序的指令顺序执行，比如体系结构里经典的 Tomasulo 算法。</p>
<p>对于大部分开发者而言，在写单线程程序，或者基于锁（Mutex）和信号量（Semaphore）之类编程框架提供的同步元语写多线程程序的时候，并不需要关心内存顺序的问题。这是因为编译器和硬件架构保证了，虽然指令执行顺序可能跟开发者写的代码语句的顺序不一致，但是执行后的结果是一样的，即语义一致。换句话讲，编译器和硬件架构提供了一层抽象用以屏蔽内存顺序问题，保证代码和编译出来的程序执行语义一致。这样一方面提高程序性能，另一方面让开发者不用关心底层细节。编译器和硬件架构提供的这一层抽象叫作内存模型（Memory Model）。</p>
<p>这种为了便于理解和使用而提出一层抽象以屏蔽底层复杂细节的做法，在各个学科中比比皆是。类比经典力学和相对论，在远低于光速的运动中，适用经典力学，在接近或达到光速的运动中，适用相对论而不适用经典力学；经典力学和相对论之间，有一层抽象，速度远低于光速，抽象成立，速度接近或达到光速，抽象被打破。类似的，编译器和硬件架构提供了内存模型这一层抽象用以屏蔽内存顺序问题。对于大部分开发者而言，写单线程程序，或基于编程框架提供的同步元语写多线程程序的时候，内存模型抽象成立，无需考虑内存顺序问题；当开发者写多线程程序，对于多线程并发访问（或读或写）共享数据，使用原子操作，而不是基于锁互斥访问数据，即无锁化编程的时候， 这时内存模型的抽象被打破，开发者必须考虑内存顺序问题。</p>
<p>内存顺序问题涉及编译器和硬件架构的很多细节，我尝试用对于大部分开发者来说浅显易懂的语言来描述内存顺序问题， 尽可能避免编译器和硬件架构的实现细节，以便于大家理解。下面依次介绍内存模型、内存顺序、原子操作，最后以 C++11 为例讲解开发者如何规约内存顺序。</p>
<h2 id="内存模型">内存模型</h2>
<p>内存模型是编程语言对程序运行时内存访问模式的抽象，即内存被多个程序（进程和线程）共享，程序对内存的访问是无法预知的。通俗地讲，内存模型指的是 CPU 并发随机访问内存，或从内存加载数据（Load）或把数据写入到内存（Store）。Load 和 Store 是机器指令（或汇编语言）的术语，其实就是读（Read）操作和写（Write）操作。这里，内存模型屏蔽了很多硬件的细节，比如 CPU 的寄存器、缓存等等（因为寄存器和缓存属于程序执行上下文，CPU 访问寄存器和缓存不存在并发）。内存模型比较好理解，每个开发者或多或少都接触到内存模型。有了内存模型这一层抽象，那么内存顺序问题可以等价于读操作和写操作的执行顺序问题，因为内存模型里 CPU 对内存的访问只有读和写两种操作。</p>
<p>开发者在写代码时，代码语句的先后顺序往往约定了对内存访问的先后顺序的，即使访问的不是同一个内存地址。但是这个约定是基于内存模型这层抽象成立的前提。前面提到，内存模型在单线程编程和基于编程框架提供的同步元语实现多线程编程的情况下，对内存顺序问题进行屏蔽，怎么理解呢？</p>
<pre><code class="hljs language-c"><span class="hljs-type">int</span> x, y = <span class="hljs-number">0</span>;
x = y + <span class="hljs-number">1</span>;
y = <span class="hljs-number">2</span>;
</code></pre>
<p>这段代码定义了两个整数，x 和 y，并对 y 初始化赋值为 0，然后给 x 赋值的时候用到 y 的值，之后再给 y 赋值。看上去，对 y 的写操作必须在对 x 的写操作之后，但是改写上述代码片段如下：</p>
<pre><code class="hljs language-c"><span class="hljs-type">int</span> x, y = <span class="hljs-number">0</span>;
<span class="hljs-type">int</span> tmp;
tmp = y;
y = <span class="hljs-number">2</span>;
x = tmp + <span class="hljs-number">1</span>;
</code></pre>
<p>增加了变量 <code>tmp</code> 之后，首先把 y 的值付给 <code>tmp</code>，然后就可以先对 y 赋新值，再给 x 赋值。对 <code>x</code> 和 <code>y</code> 来说，上面两段程序的执行结果是等价的。变量 <code>tmp</code> 在这里可以理解为是 CPU 的寄存器，有了寄存器的帮助，代码里的读操作和写操作先后顺序可能被改变。通俗地讲，编译器对代码语句的顺序调整也是类似的原理 （仅供对编译器不熟的读者理解编译器如何对代码语句顺序的调整，实际编译器对代码的优化很复杂，细节暂不展开）。</p>
<p>上述例子说明了，单线程情况下，内存模型的抽象成立，开发者无需考虑内存顺序问题。再考虑多线程的情况，把对 <code>x</code> 的写操作和对 <code>y</code> 的写操作放在不同的线程里：</p>
<pre><code class="hljs language-c"><span class="hljs-type">int</span> x, y = <span class="hljs-number">0</span>;

<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func1</span><span class="hljs-params">()</span> {
    x = y + <span class="hljs-number">1</span>;
}

<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func2</span><span class="hljs-params">()</span> {
    y = <span class="hljs-number">2</span>;
}
</code></pre>
<p>可以看出，x 会有多种结果，取决于程序运行时两个线程的执行顺序，这就跟之前单线程的执行结果不一致了。因为这里没有采用编程框架提供的同步元语来实现线程间同步，内存模型的抽象被打破，编译器和硬件架构无法保证语义一致。此时，开发者要么采用编程框架提供的同步元语实现线程间同步以满足内存模型的抽象，要么显式规约指令执行顺序以保证结果正确。改写上面的例子，可以采用编程框架提供的同步元语，规约程序运行时线程的执行顺序，这里使用信号量来实现线程间同步：</p>
<pre><code class="hljs language-c"><span class="hljs-type">sem_t</span> semaphore;
<span class="hljs-comment">// 初始化信号量，初始值为0，最大值为1</span>
sem_init(&#x26;semaphore, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);

<span class="hljs-type">int</span> x, y = <span class="hljs-number">0</span>;

<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func1</span><span class="hljs-params">()</span> {
    x = y + <span class="hljs-number">1</span>;
    sem_post(&#x26;semaphore);
}

<span class="hljs-type">void</span> <span class="hljs-title function_">thread_func2</span><span class="hljs-params">()</span> {
    sem_wait(&#x26;semaphore);
    y = <span class="hljs-number">2</span>;
}
</code></pre>
<p>可以看出，使用信号量规约了两个线程在程序运行时的执行顺序，线程函数 <code>thread_func2</code> 要等待线程函数 <code>thread_func1</code> 对 <code>x</code> 完成赋值后才能对 <code>y</code> 赋值。上述例子中，采用信号量之后，内存模型的抽象成立，多线程情况下的执行结果和单线程情况下一样，即语义一致。</p>
<h2 id="内存顺序">内存顺序</h2>
<p>从上面对内存模型的介绍可以看出，内存顺序，通俗地讲，就是规约编译器和硬件架构对读写操作的执行顺序。当内存模型抽象成立时，内存模型对内存顺序做出规约，从而对开发者屏蔽内存顺序问题；当内存模型不成立时，开发者就需要显式规约内存顺序。</p>
<p>前述讲内存模型用到的例子展示了对两个写操作的内存顺序问题。推而广之，内存顺序包含四种情况：</p>




















<table><thead><tr><th align="center">四种情况</th><th align="center">读操作在后</th><th align="center">写操作在后</th></tr></thead><tbody><tr><td align="center">读操作在先</td><td align="center">读读</td><td align="center">读写</td></tr><tr><td align="center">写操作在先</td><td align="center">写读</td><td align="center">写写</td></tr></tbody></table>
<p>即，读操作与读操作、读操作与写操作、写操作与读操作、写操作与写操作，四种情况下的指令执行顺序问题（不论是否读写同一个内存地址）。开发者可以要求编译器和硬件架构在上述四种情况下分别做出规约，即：</p>
<ul>
<li>读读，读操作之后的读操作，之间的顺序不能改变；</li>
<li>读写，读操作之后的写操作，之间的顺序不能改变；</li>
<li>写读，写操作之后的读操作，之间的顺序不能改变；</li>
<li>写写，写操作之后的写操作，之间的顺序不能改变。</li>
</ul>
<p>也可以换一种表达：</p>
<ul>
<li>读读，读操作之前的读操作，之间的顺序不能改变；</li>
<li>读写，写操作之前的读操作，之间的顺序不能改变；</li>
<li>写读，读操作之前的写操作，之间的顺序不能改变；</li>
<li>写写，写操作之前的写操作，之间的顺序不能改变。</li>
</ul>
<p>换一种表达是为了方便后面理解 C++原子操作的内存顺序。</p>
<h2 id="原子操作">原子操作</h2>
<p>原子操作要么执行成功，要么尚未开始执行，不存在中间状态。原子操作是要靠底层硬件架构来实现，只有硬件架构的某些指令才能保证原子操作，比如 Compare and Swap（CAS）指令。编程语言基于硬件架构的原子操作指令封装了一些原子类型以及原子操作（函数调用），以方便开发者使用。如前所述，当内存模型抽象成立的时候，开发者无需考虑内存顺序问题；当开发者使用原子操作的时候，内存模型的抽象被打破，此时开发者必须显式规约原子操作的内存顺序。</p>
<p>原子操作要么执行成功，要么尚未开始执行，不存在中间状态。原子操作是要靠底层硬件架构来实现，只有硬件架构的某些指令才能保证原子操作，比如 Compare and Swap（CAS）指令。编程语言基于硬件架构的原子操作指令封装了一些原子类型以及原子操作（函数调用），以方便开发者使用。如前所述，当内存模型抽象成立的时候，开发者无需考虑内存顺序问题；当开发者使用原子操作的时候，内存模型的抽象被打破，此时开发者必须显式规约原子操作的内存顺序。</p>
<h2 id="c++的内存顺序">C++的内存顺序</h2>
<p>下面以 C++语言为例，介绍开发者如何显式对原子操作的内存顺序做出规约，即要求编译器和硬件架构保证按照期望的顺序来执行原子操作指令。</p>
<p>C++11 提供了 <code>Atomic</code> 泛型，用于封装原子类型和原子操作。C++还定义了 <code>atomic_int</code>、<code>atomic_long</code>、<code>atomic_bool</code> 等类型，方便开发者直接使用。下面的代码片段给出了 Atomic 泛型的定义，以及三个 <code>Atomic</code> 泛型的方法（为了便于读者理解，方法的定义略有删节）：</p>
<pre><code class="hljs language-c++"><span class="hljs-keyword">template</span> &#x3C;<span class="hljs-keyword">class</span> <span class="hljs-title class_">T</span>> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">atomic</span>;
...
<span class="hljs-function">T <span class="hljs-title">load</span> <span class="hljs-params">(memory_order sync)</span> <span class="hljs-type">const</span> <span class="hljs-keyword">noexcept</span></span>;
<span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">store</span> <span class="hljs-params">(T val, memory_order sync)</span> <span class="hljs-keyword">noexcept</span></span>;
<span class="hljs-function"><span class="hljs-type">bool</span> <span class="hljs-title">compare_exchange_strong</span> <span class="hljs-params">(T&#x26; expected, T val,
        memory_order sync)</span> <span class="hljs-keyword">noexcept</span></span>;
...
</code></pre>
<p>上面 <code>Atomic</code> 泛型的方法里有个输入参数 <code>sync</code> 的类型 <code>memory_order</code>，用于规约 Atomic 泛型方法的内存顺序。<code>memory_order</code> 在 C++11 里定义为枚举类型，共有六个值，是 C++11 定义的内存顺序类型，可供开发者使用：</p>
<pre><code class="hljs language-c++"><span class="hljs-keyword">typedef</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">memory_order</span> {
    memory_order_relaxed,
    memory_order_consume,
    memory_order_acquire,
    memory_order_release,
    memory_order_acq_rel,
    memory_order_seq_cst
} memory_order;
</code></pre>
<p>限于篇幅，这里只介绍 <code>memory_order_acquire</code>（简称 Acquire）和 <code>memory_order_release</code>（简称 Release）这两种内存顺序，后续再介绍 C++的其他内存顺序。下表给出了 Acquire 和 Release 的语义：</p>




















<table><thead><tr><th align="center">内存顺序</th><th align="center">先后次序</th><th align="center">语义</th></tr></thead><tbody><tr><td align="center">Acquire</td><td align="center">读操作在前</td><td align="center">读读、读写</td></tr><tr><td align="center">Release</td><td align="center">写操作在后</td><td align="center">读写、写写</td></tr></tbody></table>
<p>即，Acquire 要求，针对某个读操作，该读操作之后的读操作或写操作，这两种情况下的指令顺序不能改变；Release 要求，针对某个写操作，该写操作之前的读操作或写操作，这两种情况下的执行顺序不能改变。、 可以看出，Acquire 和 Release 涉及四种内存顺序中的三种情况，读读、读写和写写，不涉及写读这种情况。</p>
<p>采用原子操作和 Acquire 和 Release 语义改写之前介绍内存模型用到的例子：</p>
<pre><code class="hljs language-c++"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&#x3C;atomic></span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&#x3C;iostream></span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&#x3C;vector></span></span>

<span class="hljs-function">std::atomic_int <span class="hljs-title">indicator</span> <span class="hljs-params">(<span class="hljs-number">0</span>)</span></span>; <span class="hljs-comment">// 初始值为零</span>

<span class="hljs-type">int</span> x, y = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">thread_func1</span><span class="hljs-params">()</span> </span>{
    x = y + <span class="hljs-number">1</span>;

    <span class="hljs-comment">// 通知thread_func2</span>
    indicator.<span class="hljs-built_in">store</span>(<span class="hljs-number">1</span>, <span class="hljs-comment">// 写操作</span>
            std::memory_order_release);
}

<span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">thread_func2</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-type">int</span> ready = indicator.<span class="hljs-built_in">load</span>( <span class="hljs-comment">// 读操作</span>
            std::memory_order_acquire);

    <span class="hljs-comment">// 等待thread_func1</span>
    <span class="hljs-keyword">if</span> (read > <span class="hljs-number">0</span>) {
        y = <span class="hljs-number">2</span>;
    }
}
</code></pre>
<p>上述代码定义了一个原子整数变量 <code>indicator</code>， 线程函数 <code>thread_func1</code> 在对 x 赋值完成之后，用 <code>indicator</code> 通知线程函数 <code>thread_func2</code>。特别要注意两个原子操作 <code>indicator.store()</code>和 <code>indicator.load()</code>的内存顺序， 为什么 <code>indicator.store()</code>用 Release 语义，而 <code>indicator.load()</code>用 Acquire 语义呢？</p>
<p>先考虑 <code>indicator.store()</code>的 Release 语义。线程函数 <code>thread_func1</code> 先对 x 赋值，然后调用 <code>indicator.store()</code>把 <code>indicator</code> 的值改为 <code>1</code>， <code>indicator.store()</code>的执行顺序不允许改变，绝不能是先调用 <code>indicator.store()</code>再给 <code>x</code> 赋值。也就是说，对 <code>indicator</code> 的写操作 <code>indicator.store()</code>之前的操作（对 x 赋值），必须保证在 <code>indicator.store()</code>之前执行，符合 Release 的语义。</p>
<p>再看 <code>indicator.load()</code>的 Acquire 语义。线程函数 <code>thread_func2</code> 先是调用 <code>indicator.load()</code>读取 <code>indicator</code> 的值，检查是否不等于零，如果不为零，则对 <code>y</code> 赋值， <code>indicator.load()</code>的执行顺序不允许改变，绝不能是先对 <code>y</code> 赋值，再读取 <code>indicator</code> 的值。也就是说，对 <code>indicator</code> 的读操作 <code>indicator.load()</code>之后的操作（对 <code>y</code> 赋值），必须保证在 <code>indicator.load()</code>之后执行，符合 Acquire 的语义。</p>
<p>简单来说，对于原子写操作要求 Release 语义，对于原子读操作要求 Acquire 语义。有些文章把 Acquire 和 Release 比作是对一个锁进行加锁和解锁操作，个人认为这样的比喻不是很准确。因为，Release 和 Acquire 这类内存顺序，跟锁和信号量的抽象层面不一样，内存顺序比锁和信号量更底层，可以用原子操作和内存顺序来实现锁和信号量。原子操作 <code>indicator.store()</code>和 <code>indicator.load()</code>分别采用 Release 和 Acquire 语义，定义了两个线程间的同步通知关系（Synchronize with）， 用 <code>indicator</code> 这个原子变量来指示 <code>x</code> 是否完成赋值。这种同步通知关系不是静态规约好的，而是在程序运行时动态检查， 即 x 是否完成赋值并不阻塞线程函数 <code>thread_func2</code> 的执行，只是 x 是否完成赋值会影响线程函数 <code>thread_func2</code> 的执行结果， 有可能 x 尚未完成赋值但线程函数 <code>thread_func2</code> 已经执行完毕（此时线程函数 <code>thread_func2</code> 没有对 <code>y</code> 赋新值）。如果采用锁或信号量，则 x 尚未完成赋值会阻塞线程函数 <code>thread_func2</code> 的执行，这样可以保证线程函数 <code>thread_func2</code> 对 <code>y</code> 赋新值。可见，采用原子操作和内存顺序规约的线程同步通知机制，弱于锁和信号量等编程框架提供的同步元语实现的同步机制。因此 Release 不是解锁操作，Acquire 也不是加锁操作，这跟锁的互斥机制不一样。</p>
<p>当然可以改写线程函数 <code>thread_func2</code>，使其忙等待线程函数 <code>thread_func1</code> 对 <code>x</code> 完成赋值：</p>
<pre><code class="hljs language-c++"><span class="hljs-function"><span class="hljs-type">void</span> <span class="hljs-title">thread_func2</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-type">int</span> ready;

    <span class="hljs-comment">// 等待thread_func1</span>
    <span class="hljs-keyword">do</span> {
        ready = indicator.<span class="hljs-built_in">load</span>( <span class="hljs-comment">// 读操作</span>
                std::memory_order_acquire);
    } <span class="hljs-keyword">while</span> (ready == <span class="hljs-number">0</span>);

    y = <span class="hljs-number">2</span>;
}
</code></pre>
<p>这样一来，相当于是基于原子操作和内存顺序实现了一个信号量，只是这个信号量让线程函数 <code>thread_func2</code> 忙等待而不是阻塞休眠。这种做法在 Linux 内核里很常见，比如某个中断响应程序采用自旋锁（Spin Lock）忙等待某个资源，而不采用锁以避免阻塞休眠， 因为中断处理程序本身如果阻塞休眠或被其他程序抢占，会导致很复杂的程序上下文切换，也可能导致死锁。</p>
<p>限于篇幅，我后续再对 C++的其他内存顺序和同步通知机制做详细介绍。</p>`;export{s as assetURLs,c as default,e as metadata,a as toc};

const s=[],a={label:"垃圾回收机制与无锁化编程（一）",description:"垃圾回收机制（GC）对大部分开发者来说应该不陌生，特别是Java开发者或多或少都跟GC打过交道。GC的优点是实现对堆上分配的内存动态回收，避免内存泄漏。但是GC的缺点是对性能有一定影响，特别是stop the world问题， 而且GC什么时候回收内存是不确定的，开发者无法知晓。",location:"浙江",tags:["高性能编程"],date:"2022-06-15",title:"Garbage collection mechanism and lock free programming (1)"},p=[{label:"无锁化编程示例：无锁化堆栈（Lock-Free Stack）的 Java 实现",level:2},{label:"无锁化编程示例：无锁化堆栈的 C++实现",level:2},{label:"对没有垃圾回收机制的语言做无锁化编程的思考",level:2}],l=`<p>垃圾回收机制（GC）对大部分开发者来说应该不陌生，特别是 Java 开发者或多或少都跟 GC 打过交道。GC 的优点是实现对堆上分配的内存动态回收，避免内存泄漏。但是 GC 的缺点是对性能有一定影响，特别是 stop the world 问题， 而且 GC 什么时候回收内存是不确定的，开发者无法知晓。</p>
<p>在无锁化编程场景下，用 Java 这种有 GC 的语言，一定程度简化了对内存的管理，降低了无锁化编程的难度。无锁化编程，顾名思义，就是不用锁。无锁化编程特指在多线程编程的时候，对线程间共享数据的并发修改不使用锁， 而采用基于硬件提供的原子操作能力来修改共享数据，进而提升性能，减少使用锁带来的互斥开销。</p>
<p>最常用的硬件提供的原子操作是 Compare and Swap（简称 CAS），编程语言基于硬件提供的原子操作能力封装出 CAS 库函数调用。先看下 C++里的 CAS 函数调用：</p>
<pre><code class="hljs language-c++"><span class="hljs-type">bool</span> __sync_bool_compare_and_swap(
    type *ptr, type oldval, type newval, ...);
type __sync_val_compare_and_swap(
    type *ptr, type oldval, type newval, ...);
</code></pre>
<p>这两个函数的功能一样，只是返回值不同。为了简化描述，略去了一些细节 （这个细节是关于内存顺序，即程序指令在执行时的顺序问题，这个问题是无锁化编程能否正确实现的关键问题之一，后面我再专门详细介绍）。第一个 CAS 函数比较指针 ptr 指向的变量，看是不是等于 oldval，如果相等就把 ptr 指向的变量改为 newval，并返回 true，否则不做任何改变并返回 false。第二个 CAS 函数也是比较 ptr 指向的变量是否等于 oldval，如果相等就把该变量改为 newval，并返回 oldval，如果不等就不做改变，并返回 ptr 指向变量的当前值。C++的 CAS 函数调用可以保证对 ptr 指向的变量的修改是原子的，要么更改完成，要么不做更改。</p>
<p>再看下硬件提供的原子操作。比如 X86 架构提供了一条 CAS 指令 cmpxchg，这条指令在执行时是由硬件保证原子性，不会被打断。其他硬件架构，比如 ARM、PowerPC 也提供类似的 CAS 原子操作，但是和 X86 的实现机制不一样，这里先不展开。编程语言的编译器在 X86 架构下编译时，会负责把 CAS 库函数调用编译成基于 cmpxchg 的机器代码。比如 C++的编译器 GCC 在编译时如果碰到上面两个 CAS 函数调用，会生成包含 cmpxchg 指令的目标码。</p>
<h2 id="无锁化编程示例：无锁化堆栈（lock-free-stack）的-java-实现">无锁化编程示例：无锁化堆栈（Lock-Free Stack）的 Java 实现</h2>
<p>先来看个简单的无锁化编程的例子，一个无锁化堆栈的 Java 实现（从网上找了一段现成的代码，没经过编译验证，仅做示例）：</p>
<pre><code class="hljs language-java"><span class="hljs-keyword">import</span> java.util.concurrent.atomic.*;
<span class="hljs-keyword">import</span> net.jcip.annotations.*;
<span class="hljs-comment">/**
* ConcurrentStack
*
* <span class="hljs-doctag">@author</span> Brian Goetz and Tim Peierls
*/</span>
<span class="hljs-meta">@ThreadSafe</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ConcurrentStack</span> &#x3C;E> {
    AtomicReference&#x3C;Node&#x3C;E>> top =
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">AtomicReference</span>&#x3C;Node&#x3C;E>>(); <span class="hljs-comment">// 栈顶</span>

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title function_">push</span><span class="hljs-params">( E item )</span> {
        Node&#x3C;E> newNode = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Node</span>&#x3C;E>( item );
        Node&#x3C;E> curTop;
        <span class="hljs-keyword">do</span> {
            curTop = top.get();
            newNode.next = curTop;

        <span class="hljs-comment">// CAS调用修改栈顶</span>
        } <span class="hljs-keyword">while</span> ( !top.compareAndSet(
                curTop, newNode ) );
    }

    <span class="hljs-keyword">public</span> E <span class="hljs-title function_">pop</span><span class="hljs-params">()</span> {
        Node&#x3C;E> curTop;
        Node&#x3C;E> newTop;
        <span class="hljs-keyword">do</span> {
            curTop = top.get();
            <span class="hljs-keyword">if</span> ( curTop == <span class="hljs-literal">null</span> ) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">// 堆栈为空</span>
            }
            newTop = curTop.next;

        <span class="hljs-comment">// CAS调用修改栈顶</span>
        } <span class="hljs-keyword">while</span> ( !top.compareAndSet(
                curTop, newTop ) );

        <span class="hljs-keyword">return</span> curTop.item;
    }

    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Node</span> &#x3C;E> {
        <span class="hljs-keyword">public</span> <span class="hljs-keyword">final</span> E item;
        <span class="hljs-keyword">public</span> Node&#x3C;E> next;

        <span class="hljs-keyword">public</span> <span class="hljs-title function_">Node</span><span class="hljs-params">( E item )</span> {
            <span class="hljs-built_in">this</span>.item = item;
        }
    }
}
</code></pre>
<p>从代码可以看出，这个栈的实现完全没有用锁，栈顶 top 是当前堆栈顶端节点的原子引用 AtomicReference， 每次出栈（pop）入栈（push）的时候，调用 AtomicReference 的 compareAndSet 方法来试图修改栈顶 top。因为有可能有多个线程竞争访问这个无锁化堆栈，即有可能有多个线程同时对栈顶进行修改，或同时 pop、或同时 push，或同时 pop 和 push， CAS 的原子性保证了多个线程并发调用 compareAndSet 方法修改栈顶 top 时，仅有一个线程的调用能修改成功，其他线程的调用不成功， 所以 pop 和 push 操作里要用循环的方式重复调用 compareAndSet 方法试图修改栈顶 top，直到成功返回。</p>
<p>从这个例子可以看出无锁化编程的一个显著特点，对共享数据的修改要多次重试 CAS 操作。虽然 CAS 调用基于硬件提供的原子能力，但是 CAS 调用的代价也不小。比如在 X86 多处理器架构下运行上面的无锁化堆栈，每次 CAS 方法调用会运行 cmpxchg 指令，这个指令使得多个处理器缓存里的栈顶 top 失效， 导致多个处理器要重新从内存加载 top。如果频繁调用 CAS 试图修改共享数据，将导致处理器缓存里的共享数据频繁失效，这个对性能的影响也不小。所以千万不要滥用 CAS 调用。</p>
<h2 id="无锁化编程示例：无锁化堆栈的-c++实现">无锁化编程示例：无锁化堆栈的 C++实现</h2>
<p>上面用 Java 实现无锁化堆栈，还是比较简单的，几十行代码就完成了。那用 C++来实现无锁化堆栈会不会也很简单呢？先看下面的无锁化堆栈 C++实现片段（为了简化描述，还是省略了内存顺序的细节，代码没经过编译验证，仅做示例）：</p>
<pre><code class="hljs language-c++"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&#x3C;atomic></span></span>

<span class="hljs-keyword">struct</span> <span class="hljs-title class_">Node</span> {
    <span class="hljs-type">void</span>* data;
    std::atomic&#x3C; Node * > next;
};

std::atomic&#x3C;Node *> top; <span class="hljs-comment">// 栈顶</span>
top.<span class="hljs-built_in">store</span>( <span class="hljs-literal">nullptr</span> ); <span class="hljs-comment">// 初始化栈顶为空指针</span>

<span class="hljs-function"><span class="hljs-type">bool</span> <span class="hljs-title">push</span><span class="hljs-params">( Node* new_node )</span> </span>{
    Node * cur_top = top.<span class="hljs-built_in">load</span>();
    <span class="hljs-keyword">while</span> ( <span class="hljs-literal">true</span> ) {
        new_node->next.<span class="hljs-built_in">store</span>( cur_top );

        <span class="hljs-comment">// CAS调用修改栈顶</span>
        <span class="hljs-keyword">if</span> ( top.<span class="hljs-built_in">compare_exchange_weak</span>(
                cur_top, new_node )) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }
}

<span class="hljs-function">Node * <span class="hljs-title">pop</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">while</span> ( <span class="hljs-literal">true</span> ) {
        Node * cur_top = top.<span class="hljs-built_in">load</span>();
        <span class="hljs-keyword">if</span> ( cur_top == <span class="hljs-literal">nullptr</span> ) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">nullptr</span>; <span class="hljs-comment">// 堆栈为空</span>
        }
        Node * next = cur_top->next.<span class="hljs-built_in">load</span>();

        <span class="hljs-comment">// CAS调用修改栈顶</span>
        <span class="hljs-keyword">if</span> ( top.<span class="hljs-built_in">compare_exchange_weak</span>(
                cur_top, next )) {
            <span class="hljs-keyword">return</span> cur_top;
        }
    }
}
</code></pre>
<p>看上去 C++的无锁化堆栈实现跟 Java 版本几乎一致，栈顶 top 也是原子类型，但是这个 C++实现有问题。考虑如下使用无锁化堆栈的 C++代码片段：</p>
<pre><code class="hljs language-c++">Node * new_node = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Node</span>();
new_node.data = ...;
<span class="hljs-built_in">push</span>( new_node );
...
Node * pop_node = <span class="hljs-built_in">pop</span>();
<span class="hljs-keyword">if</span> ( pop_node ) {
    <span class="hljs-comment">// 消费出栈节点</span>
    ...
    <span class="hljs-comment">// 不能保证没有其他线程在访问pop_node，</span>
    <span class="hljs-comment">// 此处不应该delete</span>
    <span class="hljs-keyword">delete</span> pop_node;
}
</code></pre>
<p>入栈的每个节点都是 new 出来的，所以可能觉得想当然出栈之后的每个节点在消费过以后要被 delete 掉。但是考虑多线程并发访问的场景，比如有两个线程同时调用出栈 pop 函数，假定这两个线程同时读取到当前栈顶 <code>cur_top = top.load();</code>， 之后其中一个线程被抢占，另一个线程调用 pop 成功取出栈顶节点，并且消费完之后 delete 掉， 这时之前被抢占的线程恢复执行，判断 <code>cur_top</code> 不为空，然后读取 <code>cur_top</code> 的下一个节点 <code>next = cur_top->next.load();</code>, 但是 <code>cur_top</code> 已经被另一个线程 delete 掉了，<code>cur_top</code> 已经变成野指针了，一旦读取就会导致非法内存访问使得程序崩溃。</p>
<p>那为什么 Java 版本的实现就没有问题呢？是因为 GC 的缘故。Java 里没有显式的 delete 操作，所有的内存回收是 GC 自动实现的。回到上面两个线程并发调用出栈 pop 函数的场景，如果用 Java 实现，当两个线程都读取到当前栈顶的引用，其中一个线程被抢占， 另一个线程出栈调用成功，并完成消费出栈节点，此时 Java 的 GC 并不会回收出栈节点，因为 GC 发现出栈节点仍有被其他线程引用。所以 Java 版本的无锁化编程是内存安全的。</p>
<h2 id="对没有垃圾回收机制的语言做无锁化编程的思考">对没有垃圾回收机制的语言做无锁化编程的思考</h2>
<p>从上面无锁化堆栈的例子可以看出，Java 的 GC 一定程度简化了无锁化编程，因为不用考虑内存回收的问题，Java 的 GC 会安全的回收内存， 只是不能确定 Java 的 GC 什么时候回收内存。对比没有 GC 的语言，显然没有 GC 使无锁化编程变得复杂，因为实现的时候不得不自行考虑内存安全回收的问题。这个问题相当于是在用 C++这类没有 GC 的语言做无锁化编程的时候，要自行实现一个 GC，专门处理无锁化编程场景下的内存回收问题，并保证内存安全同时防止内存泄漏。</p>
<p>针对这个问题已经有一些成型的算法，最简单的方法是 Reference Counter（但是 RC 性能非常差，不实用，因此不做考虑）， 复杂些的方法诸如 Hazard pointer，Epoch-Based Reclamation 或 Quiescent State-Based Reclamation。这些方法大都可以看做是一种确定型 GC，更准确的说是相对 Java 的 GC 而言，这些方法执行内存回收的时刻是确定的（只是不同算法的具体内存回收触发逻辑不同）。这种确定型 GC 的思路是，仅针对无锁化编程这种特定场景实现 GC，降低无锁化编程的难度，而不是作为通用型 GC，这比起 Java 的 GC 来说就简单多了。因此，确定型 GC 相比 Java 的 GC，一方面减少复杂度从而大大降低对程序性能的影响，另一方面因其内存回收的确定性所以防止 stop the world 问题出现。当然对开发者而言确定型 GC 也是是透明的，开发者无需关心内存何时回收。限于篇幅，具体的细节这里先不展开，后续我再详细介绍这些确定型内存回收算法。</p>
<p>对没有 GC 的语言，比如 C++，已经有一些针对无锁化编程的内存回收算法的实现，比如 libcds， 更进一步，libcds 还实现了无锁化堆栈、无锁化队列、无锁化哈希表等等。所以对于开发者而言，不需要重复造轮子，可以直接使用这些已有的实现来简化无锁化编程。</p>`;export{s as assetURLs,l as default,a as metadata,p as toc};

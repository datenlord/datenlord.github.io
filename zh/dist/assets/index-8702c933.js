const s=[],e={label:"Rust实现RDMA",description:"RDMA是常⽤于⾼性能计算(HPC)领域的⾼速⽹络，在存储⽹络等专⽤场景也有⼴泛的⽤途。RDMA最⼤的特点是通过软硬件配合，在⽹络传输数据的时候，完全不需要CPU/内核参与，从⽽实现⾼性能的传输⽹络。最早RDMA要求使⽤InfiniBand (IB)⽹络，采⽤专⻔的IB⽹卡和IB交换机。现在RDMA也可以采⽤以太⽹交换机，但是还需要专⽤的IB⽹卡。虽然也有基于以太⽹卡⽤软件实现RDMA的⽅案，但是这种⽅案没有性能优势。",location:"河南",author:["王璞"],editor:["张汉东"],tags:["RDMA"],date:"2022-05-17",title:"Rust Implementation of RDMA"},n=[{label:"RDMA 编程理念",level:2},{label:"RDMA 的 unsafe 封装",level:2},{label:"RDMA 的 safe 封装",level:2},{label:"后续工作",level:2}],a=`<p>RDMA 是常⽤于⾼性能计算(HPC)领域的⾼速⽹络，在存储⽹络等专⽤场景也有⼴泛的⽤途。RDMA 最⼤的特点是通过软硬件配合，在⽹络传输数据的时候，完全不需要 CPU/内核参与，从⽽实现⾼性能的传输⽹络。最早 RDMA 要求使⽤ InfiniBand (IB)⽹络，采⽤专⻔的 IB ⽹卡和 IB 交换机。现在 RDMA 也可以采⽤以太⽹交换机，但是还需要专⽤的 IB ⽹卡。虽然也有基于以太⽹卡⽤软件实现 RDMA 的⽅案，但是这种⽅案没有性能优势。</p>
<p>RDMA 在实际使⽤的时候，需要采⽤特定的接⼝来编程，⽽且由于 RDMA 在传输数据的过程中，CPU/内核不参与，因此很多底层的⼯作需要在 RDMA 编程的时候⾃⾏实现。⽐如 RDMA 传输时涉及的各种内存管理⼯作，都要开发者调⽤ RDMA 的接⼝来完成，甚⾄⾃⾏实现，⽽不像在 socket 编程的时候，有内核帮忙做各种缓存等等。也正是由于 RDMA 编程的复杂度很⾼，再加上先前 RDMA 硬件价格⾼昂，使得 RDMA 不像 TCP/IP 得到⼴泛使⽤。</p>
<p>本⽂主要介绍我们⽤ Rust 对 RDMA 的 C 接⼝封装时碰到的各种问题，并探讨下如何⽤ Rust 对 RDMA 实现 safe 封装。下⾯⾸先简单介绍 RDMA 的基本编程⽅式，然后介绍下采⽤ Rust 对 RDMA 的 C 接⼝封装时碰到的各种技术问题，最后介绍下后续⼯作。我们⽤ Rust 实现的 RDMA 封装已经开源，包括 rdma-sys 和 async-rdma，前者是对 RDMA 接⼝的 unsafe 封装，后者是 safe 封装（尚未完成）。</p>
<h2 id="rdma-编程理念">RDMA 编程理念</h2>
<p>先⾸先简要介绍下 RDMA 编程，因为本⽂重点不是如何⽤ RDMA 编程，所以主要介绍下 RDMA 的编程理念。RDMA 的全称是 Remote Direct Memory Access，从字⾯意思可以看出，RDMA 要实现直接访问远程内存，RDMA 的很多操作就是关于如何在本地节点和远程节点之间实现内存访问。</p>
<p>RDMA 的数据操作分为“单边”和“双边”，双边为 send/receive，单边是 read/write，本质都是在本地和远程节点之间共享内存。对于双边来说，需要双⽅节点的 CPU 共同参与，⽽单边则仅仅需要⼀⽅ CPU 参与即可，对于另⼀⽅的 CPU 是完全透明的，不会触发中断。根据上述解释，⼤家可以看出“单边”传输才是被⽤来传输⼤量数据的主要⽅法。但是“单边”传输也⾯临这下列挑战：</p>
<ol>
<li>
<p>由于 RDMA 在数据传输过程中不需要内核参与，所以内核也⽆法帮助 RDMA 缓存数据，因此 RDMA 要求在写⼊数据的时候，数据的⼤⼩不能超过接收⽅准备好的共享内存⼤⼩，否则出错。所以发送⽅和接收⽅在写数据前必须约定好每次写数据的⼤⼩。</p>
</li>
<li>
<p>此外，由于 RDMA 在数据传输过程中不需要内核参与，因此有可能内核会把本地节点要通过 RDMA 共享给远程节点的内存给交换出去，所以 RDMA 必须要跟内核申请把共享的内存空间常驻内存，这样保证远程节点通过 RDMA 安全访问本地节点的共享内存。</p>
</li>
<li>
<p>再者，虽然 RDMA 需要把本地节点跟远程节点共享的内存空间注册到内核，以防内核把共享内存空间交换出去，但是内核并不保证该共享内存的访问安全。即本地节点的程序在更新共享内存数据时，有可能远程节点正在访问该共享内存，导致远程节点读到不⼀致的数据；反之亦然，远程节点在写⼊共享内存时，有可能本地节点的程序也正在读写该共享内存，导致数据冲突或不⼀致。使⽤ RDMA 编程的开发者必须⾃⾏保证共享内存的数据⼀致性，这也是 RDMA 编程最复杂的关键点。</p>
</li>
</ol>
<p>总之，RDMA 在数据传输过程中绕开了内核，极⼤提升性能的同时，也带来很多复杂度，特别是关于内存管理的问题，都需要开发者⾃⾏解决。</p>
<h2 id="rdma-的-unsafe-封装">RDMA 的 unsafe 封装</h2>
<p>RDMA 的编程接⼝主要是 C 实现的 <strong>rdma-core</strong>，最开始我们觉得⽤ Rust 的 <strong>bingen</strong> 可以很容易⽣成对 rdma-core 的 Rust 封装，但实际中却碰到了很多问题。</p>
<p>⾸先，rdma-core 有⼤量的接⼝函数是 inline ⽅式定义，⾄少上百个 inline 函数接⼝，bindgen 在⽣成 Rust 封装时直接忽略所有的 inline 函数，导致我们必须⼿动实现。Rust 社区有另外⼏个开源项⽬也实现了对 rdma-core 的 Rust 封装，但是都没有很好解决 inline 函数的问题。此外，我们在⾃⾏实现 rdma-core 的 inline 函数 Rust 封装时，保持了原有的函数名和参数名不变。</p>
<p>其次，rdma-core 有不少宏定义，bindgen 在⽣成 Rust 封装时也直接忽略所有的宏定义，于是我们也必须⼿动实现⼀些关键的宏定义，特别是要⼿动实现 rdma-core ⾥⽤宏定义实现的接⼝函数和⼀些关键常量。</p>
<p>再有，rdma-core 有很多数据结构的定义⽤到了 union，但是 bindgen 对 C 的 union 处理得不好，并不是直接转换成 Rust ⾥的 union。更严重的是 rdma-core 的数据结构⾥还⽤到匿名 union，如下所示：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">ibv_wc</span> {
    ...
    union {
        __be32  imm_data;
        uint32_t invalidated_rkey;
    };
    ...
};
</code></pre>
<p>由于 Rust 不⽀持匿名 union，针对这些 rdma-core 的匿名 union，bindgen 在⽣成的 Rust binding ⾥会⾃动⽣成 union 类型的名字，但是 bindgen ⾃动⽣成的名字对开发者很不友好，诸如<strong>ibv_flow_spec</strong>bindgen_ty_1<strong>bindgen_ty_1</strong> 这种名字，所以我们都是⼿动重新定义匿名 union，如下所示：</p>
<pre><code class="hljs language-rust"><span class="hljs-meta">#[repr(C)]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">union</span> <span class="hljs-title class_">imm_data_invalidated_rkey_union_t</span> {
    <span class="hljs-keyword">pub</span> imm_data: __be32,
    <span class="hljs-keyword">pub</span> invalidated_rkey: <span class="hljs-type">u32</span>,
}

<span class="hljs-meta">#[repr(C)]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">ibv_wc</span> {
    ...
    <span class="hljs-keyword">pub</span> imm_data_invalidated_rkey_union: imm_data_invalidated_rkey_union_t,
    ...
}
</code></pre>
<p>再次，rdma-core ⾥引⽤了很多 C 的数据结构，诸如 pthread_mutex_t 和 sockaddr_in 之类，这些数据结构应该使⽤<strong>Rust libc</strong>⾥定义好的，⽽不是由 bindgen 再重新定义⼀遍。所以我们需要配置 bindgen 不重复⽣成 libc ⾥已经定义好的数据结构的 Rust binding。</p>
<p>简单⼀句话总结下，bindgen 对⽣成 rdma-core 的 unsafe 封装只能起到⼀半作⽤，剩下很多⼯作还需要⼿动完成，⾮常细碎。不过好处是，RDMA 接⼝已经稳定，此类⼯作只需要⼀次操作即可，后续⼏乎不会需要⼤量更新。</p>
<h2 id="rdma-的-safe-封装">RDMA 的 safe 封装</h2>
<p>关于 RDMA 的 safe 封装，有两个层⾯的问题需要考虑：</p>
<ul>
<li>如何做到符合 Rust 的规范和惯例；</li>
<li>如何实现 RDMA 操作的内存安全。</li>
</ul>
<p>⾸先，关于 RDMA 的各种数据结构类型，怎样才能封装成对 Rust 友好的类型。rdma-core ⾥充斥着⼤量的指针，绝⼤多数指针被 bindgen 定义为 <code>*mut</code> 类型，少部分定义为 <code>*const</code> 类型。在 Rust ⾥，这些裸指针类型不是 <code>Sync</code> 也不是 <code>Send</code> ，因此不能多线程访问。如果把这些裸指针转化为引⽤，⼜涉及到⽣命周期问题，⽽这些指针指向的数据结构都是 rdma-core ⽣成的，⼤都需要显式的释放，⽐如 <code>struct ibv_wq</code> 这个数据结构由 <code>ibv_create_wq()</code>函数创建，并由 ibv_destroy_wq() 函数释放：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">ibv_wq</span> *<span class="hljs-title function_ invoke__">ibv_create_wq</span>(...);

int <span class="hljs-title function_ invoke__">ibv_destroy_wq</span>(<span class="hljs-keyword">struct</span> <span class="hljs-title class_">ibv_wq</span> *wq);
</code></pre>
<p>但是⽤ Rust 开发 RDMA 应⽤的时候，Rust 代码并不直接管理 struct ibv_wq 这个数据结构的⽣命周期。进⼀步，在 Rust 代码中并不会直接修改 rdma-core 创建的各种数据结构，Rust 代码都是通过调⽤ rdma-core 的接⼝函数来操作各种 RDMA 的数据结构/指针。所以对 Rust 代码来说，rdma-core ⽣成的各种数据结构的指针，本质是⼀个句柄/handler，这个 handler 的类型是不是裸指针类型并不重要。于是，为了在 Rust 代码中便于多线程访问，我们把 rdma-core 返回的裸针类型都转换成 usize 类型，当需要调⽤ rdma-core 的接⼝函数时，再从 usize 转换成相应的裸指针类型。这么做听上去很 hack，但背后的原因还是很显⽽易⻅的。进⼀步，对于在 rdma-core 中需要⼿动释放的资源，可以通过实现 Rust 的 <code>Drop trait</code> ，在 <code>drop()</code> 函数中调⽤ rdma-core 相应的接⼝实现资源⾃动释放。</p>
<p>其次，关于 RDMA 的内存安全问题，这部分⼯作尚未完成。⽬前 RDMA 的共享内存访问安全问题在学术界也是个热⻔研究课题，并没有完美的解决⽅案。本质上讲，RDMA 的共享内存访问安全问题是由于为了实现⾼性能⽹络传输、绕过内核做内存共享带来的，内核在内存管理⽅⾯做了⼤量的⼯作，RDMA 的数据传输绕过内核，因此 RDMA ⽆法利⽤内核的内存管理机制保证内存安全。如果要把内核在内存管理⽅⾯的⼯作都搬到⽤户态来实现 RDMA 共享内存访问安全，这么做的话⼀⽅⾯复杂度太⾼，另⼀⽅⾯也不⼀定有很好的性能。</p>
<p>在实际使⽤中，⼈们会对 RDMA 的使⽤⽅式进⾏规约，⽐如不允许远程节点写本地节点的共享内存，只允许远程节点读。但即便是只允许远程读取，也有可能有数据不⼀致的问题。⽐如远程节点读取了共享内存的前半段数据，本地节点开始更新共享内存。假定本地节点更新的数据很少⽽远程节点读取的数据很多，因此本地节点更新的速度⽐远程节点读取的速度快，导致有可能本地节点在远程节点读后半段数据前更新完毕，这样远程节点读取的是不⼀致的数据，前半段数据不包括更新数据但是后半段包括更新数据。远程节点读到的这个不⼀致的数据，既不是先前真实存在的某个版本的数据，也不是全新版本的数据，破坏了数据⼀致性的保证。</p>
<p>针对 RDMA 内存安全问题，⼀个常⻅的解决⽅案是采⽤⽆锁(Lock-free)数据结构。⽆锁数据结构本质上就是解决并发访问下保证内存安全问题，当多个线程并发修改时，⽆锁数据结构保证结果的⼀致性。针对上⾯提到的远程读、本地写的⽅式，可以采⽤<code>Seqlock</code>来实现。即每块 RDMA 的共享内存空间关联⼀个序列号(sequence number)，本地节点每次修改共享内存前就把序列号加⼀，远程节点在读取开始和结束后检查序列号是否有变化，没有变化说明读取过程中共享内存没有被修改，序列号有变化说明读取过程中共享内存被修改，读到了有可能不⼀致的数据，则远程节点重新读取共享内存。</p>
<p>如果要放宽对 RDMA 的使⽤规约，即远程节点和本地节点都可以读写共享内存的场景，那么就需要采⽤更加复杂的算法或⽆锁数据结构，诸如 <code>Copy-on-Write</code> 和 <code>Read-Copy-Update</code> 等。内核中⼤量使⽤ Copy-on-Write 和 Read-Copy-Update 这两种技术来实现⾼效内存管理。这⽅⾯的⼯作有不少技术难度。</p>
<h2 id="后续工作">后续工作</h2>
<p>下⼀步在完成对 RDMA 的 safe 封装之后，我们规划⽤ Rust 实现对 RDMA 接⼝函数的异步调⽤。因为 RDMA 都是 IO 操作，⾮常适合异步⽅式来实现。</p>
<p>对 RDMA 接⼝函数的异步处理，最主要的⼯作是关于 RDMA 的完成队列的消息处理。RDMA 采⽤了多个⼯作队列，包括接收队列(RQ)，发送队列(SQ)以及完成队列(CQ)，这些队列⼀般是 RDMA 的硬件来实现。其中发送队列和接收队列的功能很好理解，如字⾯意思，分别是存放待发送和待接收的消息，消息是指向内存中的⼀块区域，在发送时该内存区域包含要发送的数据，在接收时该内存区域⽤于存放接收数据。在发送和接收完成后，RDMA 会在完成队列⾥放⼊完成消息，⽤于指示相应的发送消息或接收消息是否成功。⽤户态 RDMA 程序可以定期不定期查询完成队列⾥的完成消息，也可以通过中断的⽅式在 CPU 收到中断后由内核通知应⽤程序处理。</p>
<p>异步 IO 本质上都是利⽤ Linux 的 epoll 机制，由内核来通知⽤户态程序某个 IO 已经就绪。对 RDMA 操作的异步处理，⽅法也⼀样。RDMA 是通过创建设备⽂件来实现⽤户态 RDMA 程序跟内核⾥的 RDMA 模块交互。在安装 RDMA 设备和驱动后，RDMA 会创建⼀个或多个字符设备⽂件， <code>/dev/infiniband/uverbsN</code> ，N 从 0 开始，有⼏个 RDMA 设备就有⼏个 uverbsN 设备⽂件。如果只有⼀个那就是 <code>/dev/infiniband/uverbs0</code> 。⽤户态 RDMA 程序要实现针对 RDMA 完成队列的异步消息处理，就是采⽤ Linux 提供的 epoll 机制，对 RDMA 的 <code>uverbsN</code> 设备⽂件进⾏异步查询，在完成队列有新消息时通知⽤户态 RDMA 程序来处理消息。</p>
<p>关于 RDMA 的封装，这块⼯作我们还没有完成，我们打算把 RDMA 的 safe 封装以及对 RDMA 的共享内存管理都实现，这样才能⽅便地使⽤ Rust 进⾏ RDMA 编程，同时我们欢迎有感兴趣的朋友⼀起参与。</p>`;export{s as assetURLs,a as default,e as metadata,n as toc};

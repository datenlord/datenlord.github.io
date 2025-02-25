const e="/zh-cn/assets/image1-abdba371.png",s="/zh-cn/assets/image2-c99b8752.png",l=[e,s],c={label:"Rust实现RDMA异步编程（一）：基于epoll实现RDMA异步操作",description:"RDMA是一套高性能网络协议栈，多用于高性能计算、高性能存储领域。RDMA的library是用C实现的，但是没有很好用的Rust的binding，不方便Rust开发者使用。于是我们正在封装一层符合Rust风格、便于Rust开发者使用的RDMA Rust binding。特别的，异步编程是近几年很受关注的编程方式，用Rust异步编程来实现IO操作，可以避免操作系统的进程上下文切换，提高性能，而且Rust的异步编程框架也在逐步成熟和完善。本系列文章探讨下如何用异步的方式实现RDMA的操作。本文先讨论下如何基于Linux的epoll机制实现RDMA异步操作，后续的文章再探讨如何用Rust异步编程来实现RDMA异步操作。",location:"河南",author:["王璞"],editor:["张汉东"],tags:["RDMA"],date:"2022-05-27",title:"Rust implementation of RDMA asynchronous programming (I)_ epoll based implementation of RDMA asynchronous operation"},n=[{label:"RDMA 操作简介",level:2},{label:"Linux epoll 异步机制简介",level:2},{label:"RDMA 完成队列 CQ 读取 CQE 的同步和异步方法",level:2},{label:"RDMA 轮询方式读取 CQE",level:3},{label:"RDMA 完成事件通道方式读取 CQE",level:3},{label:"基于 epoll 异步读取 CQE",level:3}],a=`<p>RDMA 是一套高性能网络协议栈，多用于高性能计算、高性能存储领域。RDMA 的 library 是用 C 实现的，但是没有很好用的 Rust 的 binding，不方便 Rust 开发者使用。于是我们正在封装一层符合 Rust 风格、便于 Rust 开发者使用的 RDMA Rust binding。特别的，异步编程是近几年很受关注的编程方式，用 Rust 异步编程来实现 IO 操作，可以避免操作系统的进程上下文切换，提高性能，而且 Rust 的异步编程框架也在逐步成熟和完善。本系列文章探讨下如何用异步的方式实现 RDMA 的操作。本文先讨论下如何基于 Linux 的 epoll 机制实现 RDMA 异步操作，后续的文章再探讨如何用 Rust 异步编程来实现 RDMA 异步操作。</p>
<h2 id="rdma-操作简介">RDMA 操作简介</h2>
<p>RDMA 的编程模型是基于消息的方式来实现网络传输，并且用队列来管理待发送的消息和接收到的消息。RDMA 的网络传输相关操作基本上都是跟队列相关的操作：比如把要发送的消息放入发送队列，消息发送完成后在完成队列里放一个发送完成消息，以供用户程序查询消息发送状态；再比如接收队列里收到消息，也要在完成队列里放个接收完成消息，以供用户程序查询有新消息要处理。</p>
<p><img src="${e}" alt="图片"></p>
<p>由上面的描述可以看出 RDMA 的队列分为几种：发送队列 Send Queue (SQ)，接收队列 Receive Queue(RQ)，和完成队列 Completion Queue (CQ)。其中 SQ 和 RQ 统称工作队列 Work Queue (WQ)，也称为 Queue Pair (QP)。此外，RDMA 提供了两个接口，ibv_post_send 和<code>ibv_post_recv</code>，由用户程序调用，分别用于发送消息和接收消息</p>
<ul>
<li>用户程序调用 <code>ibv_post_send</code> 把发送请求 Send Request (SR)插入 SQ，成为发送队列的一个新的元素 Send Queue Element (SQE)；</li>
<li>用户程序调用 <code>ibv_post_recv</code> 把接收请求 Receive Request (RR)插入 RQ，成为接收队列的一个新元素 Receive Queue Element (RQE)。</li>
</ul>
<p>SQE 和 RQE 也统称工作队列元素 Work Queue Element (WQE)。</p>
<p>当 SQ 里有消息发送完成，或 RQ 有接收到新消息，RDMA 会在 CQ 里放入一个新的完成队列元素 Completion Queue Element (CQE)，用以通知用户程序。用户程序有两种同步的方式来查询 CQ：</p>
<ul>
<li>用户程序调用 <code>ibv_cq_poll</code> 来轮询 CQ，一旦有新的 CQE 就可以及时得到通知，但是这种轮询方式很消耗 CPU 资源；</li>
<li>用户程序在创建 CQ 的时候，指定一个完成事件通道 <code>ibv_comp_channel</code>，然后调用 <code>ibv_get_cq_event</code> 接口等待该完成事件通道来通知有新的 CQE，如果没有新的 CQE，则调用 <code>ibv_get_cq_event</code> 时发生阻塞，这种方法比轮询要节省 CPU 资源，但是阻塞会降低程序性能。</li>
</ul>
<p>关于 RDMA 的 CQE，有个需要注意的地方：对于 RDMA 的 Send 和 Receive 这种双边操作，发送端在发送完成后能收到 CQE，接收端在接收完成后也能收到 CQE；对于 RDMA 的 Read 和 Write 这种单边操作，比如节点 A 从节点 B 读数据，或节点 A 往节点 B 写数据，只有发起 Read 和 Write 操作的一端，即节点 A 在操作结束后能收到 CQE，另一端节点 B 完全不会感知到节点 A 发起的 Read 或 Write 操作，节点 B 也不会收到 CQE。</p>
<h2 id="linux-epoll-异步机制简介">Linux epoll 异步机制简介</h2>
<p>Linux 的 <code>epoll</code> 机制是 Linux 提供的异步编程机制。<code>epoll</code> 专门用于处理有大量 IO 操作请求的场景，检查哪些 IO 操作就绪，使得用户程序不必阻塞在未就绪 IO 操作上，而只处理就绪 IO 操作。<code>epoll</code> 比 Linux 之前的 <code>select</code> 和 <code>poll</code> 这两种异步机制要强大，<code>epoll</code> 特别适合有大量 IO 操作的场景，比如 RDMA 的场景，每个 RDMA 节点同时有很多队列，用于大量传输数据，那么就可以用 <code>epoll</code> 来查询每个 CQ，及时获得 RDMA 消息的发送和接收情况，同时避免同步方式查询 CQ 的缺点，要么用户程序消耗大量 CPU 资源，要么用户程序被阻塞。</p>
<p>Linux 的 <code>epoll</code> 机制提供了三个 API 接口:</p>
<ul>
<li><code>epoll_create</code> 用于创建 <code>epoll</code> 实例，返回 <code>epoll</code> 实例的句柄；</li>
<li><code>epoll_ctl</code> 用于给 <code>epoll</code> 实例增加、修改、删除待检查的 IO 操作事件；</li>
<li><code>epoll_wait</code> 用于检查每个通过 <code>epoll_ctl</code> 注册到 <code>epoll</code> 实例的 IO 操作，看每个 IO 操作是否就绪/有期望的事件发生。</li>
</ul>
<p>具体的 <code>epoll</code> 这三个接口的使用，后面结合代码示例来讲解。这里先解释下 <code>epoll</code> 的 IO 事件检查规则。如下图所示，<code>epoll</code> 有两种检查规则：边沿触发 Edge Trigger (ET)，和电平触发 Level Trigger (LT)。边沿触发和电平触发源自信号处理领域。边沿触发指信号一发生变化就触发事件，比如从 0 变到 1 就触发事件、或者从 1 到 0 就触发事件；电平触发指只要信号的状态处于特定状态就触发事件，比如高电平就一直触发事件，而低电平不触发事件。</p>
<p><img src="${s}" alt="图片"></p>
<p>对应到 <code>epoll</code>，电平触发指的是，只要 IO 操作处于特定的状态，就会一直通知用户程序。比如当 <code>socket</code> 有数据可读时，用户程序调用 <code>epoll_wait</code> 查询到该 <code>socket</code> 有收到数据，只要用户程序没有把该 <code>socket</code> 上次收到的数据读完，每次调用 <code>epoll_wait</code> 都会通知用户程序该 <code>socket</code> 有数据可读；即当 <code>socket</code> 处于有数据可读的状态，就会一直通知用户程序。而 <code>epoll</code> 的边沿触发指的是 <code>epoll</code> 只会在 IO 操作的特定事件发生后通知一次。比如 <code>socket</code> 有收到数据，用户程序 <code>epoll_wait</code> 查询到该 <code>socket</code> 有数据可读，不管用户程序有没有读完该 <code>socket</code> 这次收到的数据，用户程序下次调用 <code>epoll_wait</code> 都不会再通知该 <code>socket</code> 有数据可读，除非这个 <code>socket</code> 再次收到了新的数据；即仅当 <code>socket</code> 每次收到新数据才通知用户程序，并不关心 <code>socket</code> 当前是否有数据可读。</p>
<h2 id="rdma-完成队列-cq-读取-cqe-的同步和异步方法">RDMA 完成队列 CQ 读取 CQE 的同步和异步方法</h2>
<p>本节用 RDMA 读取 CQ 的操作为例展示如何基于 <code>epoll</code> 实现异步操作。先介绍下 RDMA 用轮询和阻塞的方式读取 CQ，再介绍基于 <code>epoll</code> 的异步读取 CQ 的方法。下文的代码仅作为示例，并不能编译通过。</p>
<h3 id="rdma-轮询方式读取-cqe">RDMA 轮询方式读取 CQE</h3>
<p>RDMA 轮询方式读取 CQ 非常简单，就是不停调用 <code>ibv_poll_cq</code> 来读取 CQ 里的 CQE。这种方式能够最快获得新的 CQE，直接用户程序轮询 CQ，而且也不需要内核参与，但是缺点也很明显，用户程序轮询消耗大量 CPU 资源。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">loop</span> {
    <span class="hljs-comment">// 尝试读取一个CQE</span>
    poll_result = <span class="hljs-title function_ invoke__">ibv_poll_cq</span>(cq, <span class="hljs-number">1</span>, &#x26;<span class="hljs-keyword">mut</span> cqe);
    <span class="hljs-keyword">if</span> poll_result != <span class="hljs-number">0</span> {
        <span class="hljs-comment">// 处理CQE</span>
    }
}
</code></pre>
<h3 id="rdma-完成事件通道方式读取-cqe">RDMA 完成事件通道方式读取 CQE</h3>
<p>RDMA 用完成事件通道读取 CQE 的方式如下：</p>
<ul>
<li>用户程序通过调用 <code>ibv_create_comp_channel</code> 创建完成事件通道；</li>
<li>接着在调用 <code>ibv_create_cq</code> 创建 CQ 时关联该完成事件通道；</li>
<li>再通过调用 <code>ibv_req_notify_cq</code> 来告诉 CQ 当有新的 CQE 产生时从完成事件通道来通知用户程序；</li>
<li>然后通过调用 <code>ibv_get_cq_event</code> 查询该完成事件通道，没有新的 CQE 时阻塞，有新的 CQE 时返回；</li>
<li>接下来用户程序从 <code>ibv_get_cq_event</code> 返回之后，还要再调用 <code>ibv_poll_cq</code> 从 CQ 里读取新的 CQE，此时调用 <code>ibv_poll_cq</code> 一次就好，不需要轮询。</li>
</ul>
<p>RDMA 用完成事件通道读取 CQE 的代码示例如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// 创建完成事件通道</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">completion_event_channel</span> = <span class="hljs-title function_ invoke__">ibv_create_comp_channel</span>(...);
<span class="hljs-comment">// 创建完成队列，并关联完成事件通道</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">cq</span> = <span class="hljs-title function_ invoke__">ibv_create_cq</span>(completion_event_channel, ...);

<span class="hljs-keyword">loop</span> {
    <span class="hljs-comment">// 设置CQ从完成事件通道来通知下一个新CQE的产生</span>
    <span class="hljs-title function_ invoke__">ibv_req_notify_cq</span>(cq, ...);
    <span class="hljs-comment">// 通过完成事件通道查询CQ，有新的CQE就返回，没有新的CQE则阻塞</span>
    <span class="hljs-title function_ invoke__">ibv_get_cq_event</span>(completion_event_channel, &#x26;<span class="hljs-keyword">mut</span> cq, ...);
    <span class="hljs-comment">// 读取一个CQE</span>
    poll_result = <span class="hljs-title function_ invoke__">ibv_poll_cq</span>(cq, <span class="hljs-number">1</span>, &#x26;<span class="hljs-keyword">mut</span> cqe);
    <span class="hljs-keyword">if</span> poll_result != <span class="hljs-number">0</span> {
        <span class="hljs-comment">// 处理CQE</span>
    }
    <span class="hljs-comment">// 确认一个CQE</span>
    <span class="hljs-title function_ invoke__">ibv_ack_cq_events</span>(cq, <span class="hljs-number">1</span>);
}
</code></pre>
<p>用 RDMA 完成事件通道的方式来读取 CQE，本质是 RDMA 通过内核来通知用户程序 CQ 里有新的 CQE。事件队列是通过一个设备文件，<code>/dev/infiniband/uverbs0</code>（如果有多个 RDMA 网卡，则每个网卡对应一个设备文件，序号从 0 开始递增），来让内核通过该设备文件通知用户程序有事件发生。用户程序调用 <code>ibv_create_comp_channel</code> 创建完成事件通道，其实就是打开上述设备文件；用户程序调用 <code>ibv_get_cq_event</code> 查询该完成事件通道，其实就是读取打开的设备文件。但是这个设备文件只用于做事件通知，通知用户程序有新的 CQE 可读，但并不能通过该设备文件读取 CQE，用户程序还要是调用 <code>ibv_poll_cq</code> 来从 CQ 读取 CQE。</p>
<p>用完成事件通道的方式来读取 CQE，比轮询的方法要节省 CPU 资源，但是调用 <code>ibv_get_cq_event</code> 读取完成事件通道会发生阻塞，进而影响用户程序性能。</p>
<h3 id="基于-epoll-异步读取-cqe">基于 epoll 异步读取 CQE</h3>
<p>上面提到用 RDMA 完成事件通道的方式来读取 CQE，本质是用户程序通过事件队列打开 <code>/dev/infiniband/uverbs0</code> 设备文件，并读取内核产生的关于新 CQE 的事件通知。从完成事件通道 <code>ibv_comp_channel</code> 的定义可以看出，里面包含了一个 Linux 文件描述符，指向打开的设备文件：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">ibv_comp_channel</span> {
    ...
    <span class="hljs-keyword">pub</span> fd: RawFd,
    ...
}
</code></pre>
<p>于是可以借助 <code>epoll</code> 机制来检查该设备文件是否有新的事件产生，避免用户程序调用 <code>ibv_get_cq_event</code> 读取完成事件通道时（即读取该设备文件时）发生阻塞。</p>
<p>首先，用 <code>fcntl</code> 来修改完成事件通道里设备文件描述符的 IO 方式为非阻塞：</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// 创建完成事件通道</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">completion_event_channel</span> = <span class="hljs-title function_ invoke__">ibv_create_comp_channel</span>(...);
<span class="hljs-comment">// 创建完成队列，并关联完成事件通道</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">cq</span> = <span class="hljs-title function_ invoke__">ibv_create_cq</span>(completion_event_channel, ...);
<span class="hljs-comment">// 获取设备文件描述符当前打开方式</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">flags</span> =
    libc::<span class="hljs-title function_ invoke__">fcntl</span>((*completion_event_channel).fd, libc::F_GETFL);
<span class="hljs-comment">// 为设备文件描述符增加非阻塞IO方式</span>
libc::<span class="hljs-title function_ invoke__">fcntl</span>(
    (*completion_event_channel).fd,
    libc::F_SETFL,
    flags | libc::O_NONBLOCK
);
</code></pre>
<p>接着，创建 <code>epoll</code> 实例，并把要检查的事件注册给 <code>epoll</code> 实例：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">use</span> nix::sys::epoll;

<span class="hljs-comment">// 创建epoll实例</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">epoll_fd</span> = epoll::<span class="hljs-title function_ invoke__">epoll_create</span>()?;
<span class="hljs-comment">// 完成事件通道里的设备文件描述符</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">channel_dev_fd</span> = (*completion_event_channel).fd;
<span class="hljs-comment">// 创建epoll事件实例，并关联设备文件描述符，</span>
<span class="hljs-comment">// 当该设备文件有新数据可读时，用边沿触发的方式通知用户程序</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">epoll_ev</span> = epoll::EpollEvent::<span class="hljs-title function_ invoke__">new</span>(
    epoll::EpollFlags::EPOLLIN | epoll::EpollFlags::EPOLLET,
    channel_dev_fd
);
<span class="hljs-comment">// 把创建好的epoll事件实例，注册到之前创建的epoll实例</span>
epoll::<span class="hljs-title function_ invoke__">epoll_ctl</span>(
    epoll_fd,
    epoll::EpollOp::EpollCtlAdd,
    channel_dev_fd,
    &#x26;<span class="hljs-keyword">mut</span> epoll_ev,
)
</code></pre>
<p>上面代码有两个注意的地方：
● <code>EPOLLIN</code> 指的是要检查设备文件是否有新数据/事件可读；
● <code>EPOLLET</code> 指的是 epoll 用边沿触发的方式来通知。</p>
<p>然后，循环调用 <code>epoll_wait</code> 检查设备文件是否有新数据可读，有新数据可读说明有新的 CQE 产生，再调用 <code>ibv_poll_cq</code> 来读取 CQE：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">timeout_ms</span> = <span class="hljs-number">10</span>;
<span class="hljs-comment">// 创建用于epoll_wait检查的事件列表</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">event_list</span> = [epoll_ev];
<span class="hljs-keyword">loop</span> {
    <span class="hljs-comment">// 设置CQ从完成事件通道来通知下一个新CQE的产生</span>
    <span class="hljs-title function_ invoke__">ibv_req_notify_cq</span>(cq, ...);
    <span class="hljs-comment">// 调用epoll_wait检查是否有期望的事件发生</span>
    <span class="hljs-keyword">let</span> <span class="hljs-variable">nfds</span> = epoll::<span class="hljs-title function_ invoke__">epoll_wait</span>(epoll_fd, &#x26;<span class="hljs-keyword">mut</span> event_list, timeout_ms)?;
    <span class="hljs-comment">// 有期望的事件发生</span>
    <span class="hljs-keyword">if</span> nfds > <span class="hljs-number">0</span> {
        <span class="hljs-comment">// 通过完成事件通道查询CQ，有新的CQE就返回，没有新的CQE则阻塞</span>
        <span class="hljs-title function_ invoke__">ibv_get_cq_event</span>(completion_event_channel, &#x26;<span class="hljs-keyword">mut</span> cq, ...);
        <span class="hljs-comment">// 循环读取CQE，直到CQ读空</span>
        <span class="hljs-keyword">loop</span> {
            <span class="hljs-comment">// 读取一个CQE</span>
            poll_result = <span class="hljs-title function_ invoke__">ibv_poll_cq</span>(cq, <span class="hljs-number">1</span>, &#x26;<span class="hljs-keyword">mut</span> cqe);
            <span class="hljs-keyword">if</span> poll_result != <span class="hljs-number">0</span> {
                <span class="hljs-comment">// 处理CQE</span>
                ...
                <span class="hljs-comment">// 确认一个CQE</span>
                <span class="hljs-title function_ invoke__">ibv_ack_cq_events</span>(cq, <span class="hljs-number">1</span>);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">break</span>;
            }
        }
    }
}
</code></pre>
<p>上面代码有个要注意的地方，因为 <code>epoll</code> 是用边沿触发，所以每次有新 CQE 产生时，都要调用 <code>ibv_poll_cq</code> 把 CQ 队列读空。考虑如下场景，同时有多个新的 CQE 产生，但是 <code>epoll</code> 边沿触发只通知一次，如果用户程序收到通知后没有读空 CQ，那 <code>epoll</code> 也不会再产生新的通知，除非再有新的 CQE 产生，<code>epoll</code> 才会再次通知用户程序。</p>
<p>总之，本文用 <code>epoll</code> 机制实现 RDMA 异步读取 CQE 的例子，展示了如何实现 RDMA 的异步操作。RDMA 还有类似的操作，都可以基于 <code>epoll</code> 机制实现异步操作。</p>
<p>对Rust和RDMA感兴趣的朋友，可以关注我们的开源项目:<br>
<a href="https://github.com/datenlord/async-rdma/">https://github.com/datenlord/async-rdma/</a></p>`;export{l as assetURLs,a as default,c as metadata,n as toc};

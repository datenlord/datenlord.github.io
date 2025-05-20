const e="/zh-cn/assets/image1-c4dd53d1.png",p="/zh-cn/assets/image2-fa66fb73.png",n="/zh-cn/assets/image3-8880c3cc.png",d="/zh-cn/assets/image4-b570d690.png",r="/zh-cn/assets/image5-8de7d7ee.png",a="/zh-cn/assets/image6-a0e12934.png",t="/zh-cn/assets/image7-98cf4bc1.png",l=[e,p,n,d,r,a,t],i={label:"blue-rdma 设计介绍 （一）—— 如何实现RDMA操作",description:"blue-rdma是一个新的RDMA实现。本文将介绍blue-rdma是如何实现常见的几种RDMA操作的，并且我们会分析blue-rdma设计和InfiniBand的异同点。",location:"中国香港",cover:"./image1.png",author:["尹正皓"],date:"2025-04-24",title:"Introduction to Blue RDMA Design (I)–How to Implement RDMA Operations"},R=[{label:"RDMA 操作类型",level:2},{label:"blue-rdma和InfiniBand的设计区别",level:2},{label:"blue-rdma驱动和硬件的消息传递",level:2},{label:"RDMA WRITE 操作",level:2},{label:"RDMA SEND/RECV 操作",level:2},{label:"RDMA READ 操作",level:2},{label:"总结",level:2},{label:"关于作者",level:2}],s=`<p><img src="${e}" alt="图片"></p>
<p>blue-rdma是一个新的RDMA实现。本文将介绍blue-rdma是如何实现常见的几种RDMA操作的，并且我们会分析blue-rdma设计和InfiniBand的异同点。</p>
<p>Table of Contents</p>
<ol>
<li>RDMA 操作类型</li>
<li>blue-rdma和InfiniBand的设计区别</li>
<li>blue-rdma驱动和硬件的消息传递</li>
<li>RDMA WRITE 操作
a. 驱动/硬件的职责
b. 操作完成(Completion)处理</li>
<li>RDMA SEND/RECV 操作</li>
<li>RDMA READ 操作
a. Signaled READ</li>
<li>总结</li>
<li>关于作者</li>
</ol>
<h2 id="rdma-操作类型">RDMA 操作类型</h2>
<p>blue-rdma支持的是InfiniBand操作类型的一个子集，目前支持RC(Reliable Connection)服务类型，而其他服务类型如UD(Unreliable Datagram)或UC(Unreliable Connection)尚未实现，这是由于大多数工作负载要求数据完整性，RC能够提供更简单的编程模型，未来blue-rdma可能会支持更多的服务类型。</p>
<p>blue-rdma支持最常见的几种操作类型，包括:</p>
<p>RDMA WRITE</p>
<p>允许本地节点直接写入远程节点的内存。发起方指定本地源地址和远程目标地址，数据直接DMA到远程内存。</p>
<p>RDMA READ</p>
<p>允许本地节点直接从远程节点内存读取数据。发起方指定远程源地址和本地目标地址，数据直接DMA到本地内存。</p>
<p>SEND / RECV</p>
<p>双边操作模型，需要远程节点预先发布接收缓冲区。发送方(SEND)将数据发送到接收方，接收方(RECV)必须预先准备好接收缓冲区。</p>
<h2 id="blue-rdma和infiniband的设计区别">blue-rdma和InfiniBand的设计区别</h2>
<p>在InfiniBand中，数据路径上几乎所有工作都由硬件完成，它的设计思想是尽可能绕过CPU和操作系统处理，避免CPU参与传输。而blue-rdma设计思路是遵循软硬件结合的思想，将一部分硬件的工作交给软件处理，以降低硬件的复杂度，并且利用软件的灵活性提供可定制化的功能。同时，blue-rdma主要在用户态实现大部分驱动功能，避免内核驱动开发的繁琐。blue-rdma架构方案设计如下图所示：</p>
<p><img src="${p}" alt="图片"></p>
<p>接下来的文章中，我们会具体介绍blue-rdma是如何实现各类RDMA操作的，以及它如何平衡在HCA和CPU之间的负载分配，并且分析它和标准InfiniBand协议之间的区别。</p>
<h2 id="blue-rdma驱动和硬件的消息传递">blue-rdma驱动和硬件的消息传递</h2>
<p>在blue-rdma中，驱动和硬件之间通过几对环形缓冲区进行通信。这几对环形缓冲区由用户态驱动分配，并且通过BAR空间在硬件初始化时进行配置。驱动通过向缓冲区中下发描述符通知硬件进行相关操作，或者接收硬件传回的描述符进行处理。</p>
<p>在blue-rdma中驱动和硬件主要通过下面4个环形缓冲区进行通信:</p>
<p>Cmd Queue</p>
<p>用于控制路径，下发控制命令，例如注册MR、创建QP等操作。</p>
<p>Cmd Resp Queue</p>
<p>用于接收Cmd Queue的返回结果</p>
<p>Send Queue</p>
<p>用于数据路径，下发Work Request。</p>
<p>Meta Report Queue</p>
<p>用于数据路径，接收数据包的信息以进行重传等操作。</p>
<p>与InfiniBand不同的是，InfiniBand对于每一个用户QP，都需要维护一对环形缓冲区。而在blue-rdma中，驱动仅仅维护这4个环形缓冲区。在数据路径上，blue-rdma驱动使用QPN(Queue Pair Number)对单个环形缓冲区进行多路复用，极大降低了硬件的复杂度。</p>
<p>例如，对于单个Send Queue的复用如下图所示:</p>
<p><img src="${n}" alt="图片"></p>
<h2 id="rdma-write-操作">RDMA WRITE 操作</h2>
<p>下面我们来具体介绍RDMA操作是如何在blue-rdma中实现的。RDMA WRITE操作是blue-rdma支持的基础操作类型。本质上来说，blue-rdma在硬件上只支持RDMA WRITE的发送逻辑和接收逻辑，而其他操作类型都是在WRITE操作基础上扩展出来的，因此我们首先会了解它的实现机制。</p>
<p>下面这段代码展示了如何在用户程序中使用ibverbs API构造一个RDMA WRITE请求:</p>
<pre><code>uint64_t remote_addr = 0x12345678;
uint32_t rkey = 0x9ABCDEF0;
struct ibv_send_wr *bad_wr;

struct ibv_sge sge = {
    .addr = (uintptr_t)local_buf,
    .length = 4096,
    .lkey = mr->lkey,
};

struct ibv_send_wr wr = {
    .wr_id = 1,
    .sg_list = &#x26;sge,
    .num_sge = 1,
    .opcode = IBV_WR_RDMA_WRITE,
    .send_flags = IBV_SEND_SIGNALED,
    .wr.rdma = {
        .remote_addr = remote_addr,
        .rkey = rkey,
    },
};

ibv_post_send(qp, &#x26;wr, &#x26;bad_wr);
</code></pre>
<p>从构造一个 ibv_send_wr 中，我们可以看出一个RDMA WRITE请求包含的信息：</p>
<p>本地内存地址 (sge.addr)</p>
<p>内存区域的长度 (sge.length)</p>
<p>本地内存的密钥 (sge.lkey)</p>
<p>远程内存地址 (rdma.remote_addr)</p>
<p>远程内存的密钥 (rdma.rkey)</p>
<p>最后我们通过 ibv_post_send 提交我们的WR(Work Request)到WQ(Work Queue)中。在InfiniBand中，当一个WR被提交到WQ中，HCA会读取WQ中的描述符，然后根据描述符的内容从内存中读取源数据，然后构建成多个数据包发送给接收端。</p>
<p>所以对于一个RDMA WRITE操作，它本质上就是将本地一段内存数据拷贝到远程的一段内存中。更进一步细分，它主要可以分为以下几个步骤:</p>
<p>读取本地内存的数据</p>
<p>将数据拆分成多个不大于PMTU(Path MTU)的段，并且对每段构建一个数据包</p>
<p>将每一个数据包发送到远程的HCA</p>
<p>远程HCA将数据包按顺序放入对应远端内存区域</p>
<p>驱动/硬件的职责</p>
<p>和InfiniBand不同，在blue-rdma的设计中，硬件不直接读取用户下发的WR，而是先经过驱动处理。驱动会将一个WR拆分成多个64kB的chunks，然后将每个chunk转换成为描述符传递给硬件。硬件接收到描述符之后，再根据描述符内容构建数据包发送到接收端。</p>
<p><img src="${d}" alt="图片"></p>
<p>为什么blue-rdma需要拆分成chunks再下发呢？我们可以进行分析，对于向硬件下发WR，可能存在三种方案:</p>
<p>方案1: 拆分成一定大小的chunk，再下发给硬件</p>
<p>方案2: 拆分成packet，并且下发给硬件直接发送</p>
<p>方案3: 不拆分，直接向硬件下发WR，让硬件负责拆分，即InfiniBand的方法</p>
<p>第一种是blue-rdma选择的方案。对于方案2，如果需要拆分成packet，那么驱动就需要对于每个数据包都要构造一个描述符放入缓冲区，如果假设有100G的吞吐量，PMTU为4096，那么每秒需要的描述符约为 3 × 10^6 个，显然对于内存和CPU都会造成很大压力。对于方案3，一个下发的WR大小可能有数GB，如果让硬件负责拆分数据包，则会加大硬件的复杂度和计算成本。</p>
<p>每当接收端硬件收到一个数据包时，就直接写入到远端内存。在InfiniBand中，对于RDMA WRITE操作，仅在首个包中包括了RETH(RDMA Extended Transport Header)，RETH的作用是指定写入包的地址和长度。和InfiniBand不同的是，blue-rdma支持乱序数据包的直接放置，其中每一个数据包都包含RETH头，这样使得如果因为丢包或者数据包从不同路径乱序到达，HCA可以直接将乱序的数据包写入到包本身指定的内存地址，而不需要丢弃数据包。而在InfiniBand规范中对于乱序数据包是直接丢弃的，这可能会在丢包情况下增加延迟。</p>
<p>操作完成(Completion)处理</p>
<p>在blue-rdma中，同样为了简化硬件，一个操作的完成情况并不由硬件直接追踪，而是由驱动维护。对于一个WRITE操作，可能存在两种Completion:</p>
<p>设置了 IBV_SEND_SIGNALED flag，即要求在操作完成时在发送端CQ生成一个Completion Event</p>
<p>设置了 Solicited Event flag，常用在 WRITE with Immediate 操作中，要求在WRITE完成时在接收端CQ生成一个Completion Event，并包含Imm数据</p>
<p>所以，要支持Completion的处理，我们需要同时在发送端和接收端驱动中维护数据包的状态。</p>
<p>和InfiniBand类似，在blue-rdma中，每个数据包都关联了一个PSN(Packet Sequence Number)，用于跟踪数据包的顺序，帮助接收方检测丢失或重复的数据包，对于每一对QP都维护独立的PSN (发送PSN/接收PSN)。当一个消息的所有包都收到了（一个PSN的range)，我们就认为这个消息已经完成了。</p>
<p>在blue-rdma中，接收端硬件会向驱动上报两种数据包接收的信息:</p>
<p>每个消息第一个和最后一个数据包的包头部分</p>
<p>当前数据包接收的状态，驱动维护了一个bitmap窗口，会定期上报窗口中的信息，并同时通过ACK发送给发送端</p>
<p>在blue-rdma驱动中，我们在发送端和接收端都维护了一个PSN Tracker，根据硬件上报的信息，我们能够追踪全局的数据包接收状态。因此对于每一个需要产生Completion Event的WRITE消息，我们都追踪它的状态，当所有的数据包都收到后，在CQ中产生对应的Completion Event。</p>
<p>同样，为了简化硬件实现，在blue-rdma中，硬件不直接维护CQ，所有的CQ都是由驱动模拟并且追踪状态，当驱动检测到一个操作完成时，如果需要产生Completion Event，会将其放入CQ中。</p>
<h2 id="rdma-send/recv-操作">RDMA SEND/RECV 操作</h2>
<p>由于blue-rdma硬件只支持WRITE操作，那么我们如何在WRITE操作基础上扩展出SEND/RECV呢?首先我们还是从代码入手，看看用户程序是如何使用ibverbs API进行SEND/RECV操作的。</p>
<pre><code>int post_recv(struct context *ctx) {
    struct ibv_sge sge = {
        .addr = (uintptr_t)ctx->buf,
        .length = ctx->size,
        .lkey = ctx->mr->lkey
    };

    struct ibv_recv_wr wr = {
        .wr_id = 1,
        .sg_list = &#x26;sge,
        .num_sge = 1
    };

    struct ibv_recv_wr *bad_wr;
    return ibv_post_recv(ctx->qp, &#x26;wr, &#x26;bad_wr);
}

int post_send(struct rdma_context *ctx, const char *msg) {
    strncpy(ctx->buf, msg, ctx->size);

    struct ibv_sge sge = {
        .addr = (uintptr_t)ctx->buf,
        .length = strlen(msg) + 1,
        .lkey = ctx->mr->lkey
    };

    struct ibv_send_wr wr = {
        .wr_id = 2,
        .sg_list = &#x26;sge,
        .num_sge = 1,
        .opcode = IBV_WR_SEND,
        .send_flags = IBV_SEND_SIGNALED
    };

    struct ibv_send_wr *bad_wr;
    return ibv_post_send(ctx->qp, &#x26;wr, &#x26;bad_wr);
}
</code></pre>
<p>对于SEND/RECV操作，和普通RDMA WRITE操作最大的区别就是SEND/RECV遵循的是传统消息传递模型，可以认为是一个channel的语义。它不需要发送端指定远程的写入地址，而是由接收端预先准备接收缓冲区，当一个SEND操作被接收到时，HCA会取出一个接收端SGE，并且向其中的缓冲区写入消息。</p>
<p>我们在之前提到了，每一个blue-rdma的包都必须包含RETH头，意味着接收端硬件必须知道写入的地址才能正常工作。对于SEND/RECV语义，是不包含这一地址的。因此，blue-rdma必须通过带外通道交换接收端SGE的内容，以了解接收端写入的地址。</p>
<p>当前blue-rdma的实现是在内部使用TCP交换Post Recv操作发布的SGE，这样SGE的处理实际上由接收端移动到了发送端。当发送端用户程序发送一个SEND操作时，驱动会检查是否已经收到过Recv的SGE，然后通过这个SGE的地址构建一个WRITE操作写入到接收端内存。</p>
<p><img src="${r}" alt="图片"></p>
<p>读者可能会疑惑，为什么不直接使用blue-rdma硬件内部的传输机制，而是使用了TCP呢？这实际上是blue-rdma做出的另一个取舍，在blue-rdma网络中，会存在丢包的现象，如果我们使用blue-rdma硬件发包交换Post Recv请求，那么就需要另外实现一整套数据包重传机制，这样会大幅增加系统复杂性。因此，在目前的版本中，我们使用TCP进行交换，由于Post Recv属于控制路径，不会对真正的传输吞吐量产生影响。</p>
<p>从接口行为的角度来说，blue-rdma对于SEND/RECV的实现和InfiniBand还是有细微的差异。在InfiniBand中，用户首先会通过外带通道进行握手后确定接收端Post Recv已经完成，然后发送端才会调用Post Send操作。在blue-rdma中，这个握手流程实际上被移动到了驱动内部完成。</p>
<h2 id="rdma-read-操作">RDMA READ 操作</h2>
<p>最后是RDMA READ操作，它在blue-rdma实现中相比于SEND/RECV会更复杂一些。</p>
<p>RDMA READ的用户代码和RDMA WRITE代码基本相同，它们复用的同一套接口发送请求，唯一区别是RDMA操作的方向不一样，WRITE是从本地地址写入到远端地址，READ是从远端地址读取写到本地地址:</p>
<pre><code>uint64_t remote_addr = 0x12345678;
uint32_t rkey = 0x9ABCDEF0;
struct ibv_send_wr *bad_wr;

struct ibv_sge sge = {
    .addr = (uintptr_t)local_buf,
    .length = 4096,
    .lkey = mr->lkey,
};

struct ibv_send_wr wr = {
    .wr_id = 1,
    .sg_list = &#x26;sge,
    .num_sge = 1,
    .opcode = IBV_WR_RDMA_READ,
    .send_flags = IBV_SEND_SIGNALED,
    .wr.rdma = {
        .remote_addr = remote_addr,
        .rkey = rkey,
    },
};

ibv_post_send(qp, &#x26;wr, &#x26;bad_wr);
</code></pre>
<p>在blue-rdma中，硬件不直接支持读取操作，读取操作的实现方法是将一个读操作转换为写操作，即读请求的接收端收到读请求后，向读请求的发送端发送一个RDMA WRITE操作。分为几个步骤:</p>
<p>发送一个payload为空的WRITE WR，并且设置包头类型为RDMA READ。</p>
<p>硬件如果收到了一个包头类型为RDMA READ的请求，那么它不会进行处理，而是通过描述符上报给驱动。根据我们之前的介绍，每个WRITE请求的包头都包括RETH， RETH中包含了接收端的内存地址信息。同时，为了转化读请求成为一个WRITE操作，除了RETH中的信息以外，还需要包括发送端的内存地址信息。</p>
<p>驱动根据上报的这两组地址信息，重新构建一个WRITE操作的WR，然后按照RDMA WRITE的流程写入到另一端的内存中。这样就完成了整个读取的流程。</p>
<p><img src="${a}" alt="图片"></p>
<p>Signaled READ</p>
<p>仅看READ的大致步骤，似乎流程很简单，但为什么说READ操作的实现在blue-rdma中会更复杂呢？这是因为READ实际上由两步基础WRITE操作组合而成，并且内部复用了相同的WRITE逻辑，这两步操作在实现上彼此关联，因此需要考虑更多细节。特别是对于Signaled READ，要判断READ操作何时真正完成，必须确保这两步WRITE按顺序全部完成后才能产生完成事件。具体原因如下：</p>
<p>对于一个Signaled READ，在驱动中必须追踪两个完成事件：</p>
<p>READ请求发起端执行的payload为空的WRITE。它需要被设置为Signaled，以便产生发送端的Completion事件</p>
<p>READ请求接收端发起的WRITE。它在READ请求发起端也需要被追踪，以便在接收端完成并返回后，确认数据已经正确到达。</p>
<p>从逻辑上分析，第二个事件的完成似乎可以代表READ请求结束，但因为第一个事件对应的是发送端的Completion，第二个事件对应的是接收端的Completion，这两条发送和接收路径在物理上是独立的，但在blue-rdma READ的实现中被整合在一起。要满足READ请求在Send CQ和完成数据接收两方面的要求就必须保证这两个事件的完成顺序正确。</p>
<p>在RC模型中，所有Post操作都按严格顺序执行，一个Signaled操作的完成事件往往隐含了该操作之前所有操作的完成状态。然而，在blue-rdma中，若仅依赖于第二个事件来判断整个READ操作的完成，就可能忽略发送端的完成状态，从而破坏整个操作的正确顺序。为防止这种情况出现，必须让第一个事件先行阻塞后续完成事件，确保整个流程按预定顺序执行。</p>
<p><img src="${t}" alt="图片"></p>
<p>在目前的设计中，两条路径的同步会造成一定的开销，但由于只有Signaled READ需要特殊处理，对一般应用性能不会产生太大影响。</p>
<h2 id="总结">总结</h2>
<p>在本篇文章中，我们介绍了blue-rdma对于几种InfiniBand操作的实现，并且分析了它和InfiniBand的异同点，以及在系统设计上所做出的取舍。在之后的文章中，我们会对于blue-rdma的软硬件实现进行更深入的分析和讲解，例如在本篇文章中涉及较少的错误处理以及性能问题讨论，有兴趣的读者可以继续关注。</p>
<h2 id="关于作者">关于作者</h2>
<p>作者是达坦科技的RDMA软件工程师，目前负责blue-rdma驱动的开发和维护工作。欢迎通过Github(@bsbds)与我交流。</p>`;export{l as assetURLs,s as default,i as metadata,R as toc};

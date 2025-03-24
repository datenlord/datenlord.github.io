const e="/zh-cn/assets/image1-5ce6797d.png",t="/zh-cn/assets/image2-62bec92b.png",a=[e,t],r={label:"用async_rdma库加速 Datenlord KVCache 模块",description:"本文讨论了如何利用 RDMA 技术加速 Datenlord 分布式 KVCache 模块。当前的 KVCache 模块使用 TCP 进行数据传输，这会消耗大量 CPU 资源。通过引入 RDMA 技术，建立零拷贝传输通道，消除不必要的内存拷贝并节省 CPU 资源，节省了 KVCache 模块的开销，提高了整个系统的效率。具体来讲，本文详细描述了如何设计和实现一套混合传输方案，并使用 Datenlord 开发的 async_rdma 库完成这套方案，从原理到实践指导开发者开发一个实用的 RDMA 应用。",location:"中国香港",cover:"./image1.png",author:["陈添"],date:"2025-03-05",title:"Accelerating the Datenlord KVCache Module with the Async_rdma Library"},c=[{label:"引言",level:2},{label:"背景知识",level:2},{label:"方案设计",level:2},{label:"基础代码设计",level:2},{label:"性能优化实践",level:2},{label:"未来展望",level:2},{label:"总结",level:2}],l=`<p><img src="${e}" alt="图片"></p>
<h2 id="引言">引言</h2>
<p>在生成式 AI 席卷全球的今天，提升大型语言模型(LLM)的推理效率一直是行业攻坚的核心命题。</p>
<p>当用户向 Deepseak 等大语言模型发起对话时，看似流畅的文字输出背后，模型需要为每个新生成的词语重新计算数十亿参数的关联关系，而这些关联关系往往都和之前的对话上下文有着密切的联系。</p>
<p>而这正是 KVCache(Key-Value Cache) 技术大显身手的战场 —— 通过缓存推理引擎的中间计算结果，它如同为推理引擎安装 "记忆加速器"，在存在重复上下文的场景下，能够复用之前的计算结果来避免重复计算，从而显著降低生成新 Token 的延迟。</p>
<p>这样既减少了算力资源的消耗，又降低了用户响应的延迟，为用户节省了资费，提升了用户体验。</p>
<p>当场景扩展至分布式集群，达坦科技设计研发的 Datenlord Distributed KVCache 模块进一步消除了跨节点冗余计算问题，提升了系统的资源利用效率。</p>
<p>现有的 Datenlord 分布式 KVCache 模块使用 TCP 来进行跨节点的数据传输，在数据拷贝过程中浪费了大量的 CPU 资源，使得分布式 KVCache 的潜力难以完全释放。</p>
<p>这也正是选择 RDMA(Remote Direct Memory Access, 远程直接内存访问) 技术的原因，通过建立端到端的零拷贝传输通道，从而消除多余的内存拷贝，节省 CPU 资源的消耗。</p>
<p>Deepseek 近期开源的 3FS（Fire-Flyer File System）就是一个利用了 RDMA 技术进行加速的分布式文件系统，Datenlord 的 RDMA 优化方案与 3FS 殊途同归——均致力于通过零拷贝传输和硬件卸载，释放 AI 集群的算力潜能，并为 AI 基础设施领域做出开源贡献。</p>
<p>下文将讲解如何通过 RDMA 技术加速 Datenlord 的 KVCache 模块，进一步提高 KVCache 的性能，手把手教你如何利用 async_rdma 开源库，基于 Rust 写一个 RDMA 应用。</p>
<h2 id="背景知识">背景知识</h2>
<p>KVCache</p>
<p>在大型语言模型（LLM）的推理过程中，KVCache 用于缓存历史 Token 在注意力层（Attention Layer）计算的中间结果（Key 和 Value 矩阵），是优化自回归生成效率的核心机制之一。</p>
<p>每当缓存命中时，推理引擎可以通过读取 KVCache 缓存的中间结果，避免在生成每个新 token 时进行重复的计算，从而显著降低首 token 延迟，同时提升长文本生成的推理速度，降低资源消耗。</p>
<p>Datenlord Distributed KVCache</p>
<p>在 Datenlord Distributed KVCache 的 PR[^1] 中，datenlord 引入了分布式 KVCache 的功能。</p>
<p>用户可以通过 datenlord 提供的 sdk, 使用 match_prefix、try_load 和 insert API 来与 datenlord 分布式 KVCache 进行交互。</p>
<p><img src="${t}" alt="图片"></p>
<p>Datenlord 分布式 KVCache 使得多个推理节点共用一套缓存，可以让推理节点可以复用来自其他节点的计算结果，更进一步提升了系统的性能。</p>
<p>RDMA</p>
<p>RDMA（远程直接内存访问）是一种高性能网络传输技术，通过绕过操作系统内核和零拷贝数据传输机制，实现跨网络节点的内存直接读写。它彻底解放了传统网络通信对 CPU 的依赖，将端到端延迟压缩至微秒级，同时提供接近硬件带宽的吞吐性能。这一特性使其成为分布式存储、高性能计算、AI 训练等场景的底层加速利器。RDMA 通过 InfiniBand、RoCE 或 iWARP 协议运行，支持大规模集群中数以万计节点的并发高效通信，并凭借 CPU 卸载能力为数据中心节省海量算力资源。随着云原生与算力密集型应用崛起，RDMA 正从超算领域走向通用数据中心，重新定义低延迟、高可靠的网络编程范式。</p>
<p>async_rdma</p>
<p>达坦科技研发的 async_rdma 开源库是一款基于 Rust 语言打造的高性能、异步 RDMA 开发框架，旨在为开发者提供安全、易用且零开销的远程内存直接访问能力。通过深度结合 Rust 的内存安全特性与异步编程模型，async_rdma 避免了传统 RDMA 开发中繁琐的底层操作和复杂的内存管理逻辑。它通过简洁的异步 API 封装了 RDMA 的核心功能 ，开发者无需关注硬件细节即可轻松构建低延迟、高吞吐的分布式系统。无论是分布式存储还是实时计算场景，async_rdma 均能以极简的代码释放 RDMA 的极限性能，同时规避传统 C/C++ 库中常见的内存泄漏与并发风险。其与 Rust 生态的无缝集成（如 tokio），为社区开发者提供了开箱即用的网络编程体验。</p>
<h2 id="方案设计">方案设计</h2>
<p>原始方案分析</p>
<p>用户通过 SDK 调用 DistributeKVCacheClient 的 match_prefix、try_load 和 insert 方法，经过现有 RPC 框架进行基于 TCP 协议的数据传输。</p>
<p>RPC 框架中提供了 KVCacheIndexMatchRequest, KVBlockGetRequest, KVBlockBatchPutRequest 等消息类型来具体实现相关操作。</p>
<p>通过分析代码可以发现以下核心问题：</p>
<p>典型场景下（如 KVBlockBatchPutRequest 请求），消息体(Payload)占比超过 99%, 但现有方案对包头(Header)和包体采用统一传输路径。</p>
<pre><code>消息结构示例：
+--------------+-------------+
| Header (64B) | Body (64MB) |
+--------------+-------------+
</code></pre>
<p>尽管原有 RPC 框架下对于这类消息已经做出了一定程度的优化（如预先分配大块内存），但是内存的拷贝仍旧消耗了大量的 CPU 资源。</p>
<p>但是如果对所有消息（含Header）启用 RDMA，小消息场景（如 KVCacheIdAllocateRequest 等一些 Header-only 请求）也需要注册对应的 RDMA 内存区域，而注册 RDMA 内存区域往往都需要进入内核态，最终达到的效果可能会不如直接使用 TCP 传输数据。</p>
<p>综合考虑，最终选择采用 TCP 传输包头，RDMA 传输包体的混合传输方案。</p>
<p>混合传输方案设计</p>
<ol>
<li>采用协议分层的策略</li>
</ol>
<p>针对特定消息类型，使用 RDMA 传输包体部分，如 KVBlockGetRequest, KVBlockBatchPutRequest 消息。</p>
<p>对于小消息则复用 TCP 进行传输以避免 RDMA 内存注册的开销。</p>
<ol start="2">
<li>由服务端驱动 RDMA 操作</li>
</ol>
<p>传输方案尽量减少 Client 端（推理节点）的 CPU 占用，将 RDMA 操作主体设置在 Server 端，由 Server 端发起 RDMA Read/Write 操作，Client 端仅需暴露内存地址(RKey + Addr)，从而避免 Client 侧 CPU 参与数据传输，提高 Client 端 CPU 的利用率。</p>
<ol start="3">
<li>进行模块化改造</li>
</ol>
<p>仅在 RPC 框架下添加新的 RDMA 支持，不需要使用 RDMA 重构整个 RPC 消息传输框架。</p>
<p>原有 TCP 通道作为基础层保留，新增的 RDMA 支持作为增强层，保留 TCP 作为回退机制，确保无 RDMA 环境的功能完整性。</p>
<h2 id="基础代码设计">基础代码设计</h2>
<p>连接建立</p>
<p>RDMA 通信的实现依赖于客户端与服务端之间 RDMA 连接的建立。</p>
<p>当前使用的方案参考了 async_rdma 库中给出的示例代码，在现有 TCP 连接机制的基础上扩展 RDMA 支持。</p>
<p>客户端连接建立</p>
<p>Client 向 Server 请求 TCP 连接的代码位于 DistributeKVCacheClientInner::get_client[^2], 也在此处建立 RDMA 连接：</p>
<pre><code>// src/distribute_kv_cache/kvclient.rs
async fn get_client(&#x26;self, addr: String) -> DatenLordResult&#x3C;Arc&#x3C;RpcClient&#x3C;KVCachePacket&#x3C;K>>>> {
    // 原有 TCP 连接建立
    let connect_stream = connect_timeout!(addr_clone, timeout_options.read_timeout).await?;
    let mut rpc_client = RpcClient::new(connect_stream, &#x26;timeout_options);

    // RDMA 连接初始化
+   if let Ok(rdma) = async_rdma::RdmaBuilder::default()
+       .set_timeout(timeout_options.rdma_timeout)
+       .connect(rdma_listen_addr)
+       .await
+   {
+       rpc_client.init_rdma(rdma);
+   }

    // 启动接收线程
    rpc_client.start_recv();
    Ok(Arc::new(rpc_client))
}
</code></pre>
<p>服务端连接监听</p>
<p>对应的 Server 端用于监听 TCP 连接的代码位于 RpcServer::listen[^3], 在与 Client 端建立 TCP 连接后再监听 RDMA 连接。</p>
<pre><code>// src/distribute_kv_cache/rpc/server.rs
pub async fn listen(&#x26;mut self, addr: &#x26;str) -> Result&#x3C;(), RpcError> {
    // ...
    tokio::task::spawn(async move { loop {
        // 接受 TCP 连接
        let Ok((mut stream, _)) = listener.accept().await else {
            continue;
        }
        // 初始化 RPC 连接上下文
        let mut conn = RpcServerConnection::new(
            stream,
            Arc::clone(&#x26;factory.worker_pool),
            conn_timeout_options,
            factory.get_dispatch_handler(),
        );

        // 新增 RDMA 连接处理
+       if let Ok(rdma) = async_rdma::RdmaBuilder::default()
+           .set_timeout(rdma_timeout)
+           .listen(rdma_listen_addr)
+           .await
+       {
+           conn.init_rdma(rdma);
+       }

        factory.serve(conn);
    }});
    Ok(())
}
</code></pre>
<p>主要的设计有：</p>
<p>复用现有 TCP 连接流程，新增 RDMA 连接在原本连接附近。</p>
<p>通过 init_rdma 方法将 RDMA 连接绑定到 RPC 实例中，不改动原有的创建 RPC 实例的代码。</p>
<p>连接失败时自动降级至纯 TCP 模式（不影响原有功能）。</p>
<p>在 Server 的监听部分实际没有确保 TCP 与 RDMA 连接来自同一客户端, 后文将会说明如何解决这个问题。</p>
<p>数据传输操作</p>
<p>数据传输模型</p>
<p>Client 发起 Get 操作。</p>
<p>①Client 分配好 local_mr, 再向 Server 发送 Get 请求，请求中包含 MrToken.</p>
<p>②Server 收到 Get 请求，从请求中取出 MrToken, 构造 remote_mr.</p>
<p>③Server 分配 local_mr, 将要传输的数据复制到 local_mr.</p>
<p>④Server 使用 RDMA write, 将 local_mr 的数据发送到 remote_mr.</p>
<p>⑤Server 发送 Get 响应通知 Client 写入完毕。</p>
<p>⑥Client 收到 Get 响应，从 local_mr 取出数据返回给调用者。</p>
<p>Client 发起 Put 操作。</p>
<p>①Client 分配好 local_mr, 并写好 local_mr 的内容，再向 Server 发送 Put 请求，请求中包含 MrToken.</p>
<p>②Server 收到 Put 请求，从请求中取出 MrToken,  构造 remote_mr.</p>
<p>③Server 分配 local_mr, 使用 RDMA read,  读取 remote_mr 的数据到 local_mr.</p>
<p>④Server 从 local_mr 读取数据存储到 CacheManager.</p>
<p>⑤Server 发送 Put 响应通知 Client 读取完毕。</p>
<p>⑥Client 收到 Get 响应，通知调用者完成操作。</p>
<p>RPC 消息类型</p>
<p>为了实现 RDMA 的优化方案，在原有消息的基础上新添加了两条专门用于 RDMA 传输的 RPC 消息，与原有的消息不同的是这些消息请求中会带有 Client 端的 RDMA 内存区域信息（RKey + Addr）。</p>
<p>async_rdma 中对于这类情景，提供了 MrToken 类型，新添加的消息可以直接通过 TCP 连接传输 MrToken 使得 Server 端可以直接构造相应的 RemoteMr.</p>
<pre><code>// src/distribute_kv_cache/rpc/rdma/message.rs
pub struct KVBlockGetRequestWithRdma {
    pub block_size: u64,
    pub kv_cache_id: u64,
    pub mr_token: MrToken,
}
pub struct KVBlockGetResponseWithRdma {
    pub block_size: u64,
    pub kv_cache_id: u64,
    pub status: StatusCode,
}
pub struct KVBlockPutRequestWithRdma {
    pub block_size: u64,
    pub kv_cache_id: u64,
    pub mr_token: MrToken,
}
pub struct KVBlockPutResponseWithRdma {
    pub kv_cache_id: u64,
    pub status: StatusCode,
}
</code></pre>
<p>RPC 消息处理</p>
<p>KVCache Client 端</p>
<p>Client 端构造读取请求（GET 操作）</p>
<pre><code>// src/distribute_kv_cache/kvclient.rs
async fn get_block(&#x26;self, addr: String, kv_cache_id: u64) -> DatenLordResult&#x3C;bytes::Bytes> {
    let (tx, rx) = flume::unbounded::&#x3C;Result&#x3C;KVCacheResponse, KVCacheRequest>>();
    let rpc_client = self.get_client(addr.clone()).await?;

    let mut opcode = ReqType::KVBlockGetRequest.to_u8();
    let mut kv_cache_request = KVCacheRequest::KVBlockGetRequest(KVBlockGetRequest {
        block_size: self.block_size,
        kv_cache_id,
    });

    // 新增 RDMA 消息构造
+   let mut local_mr_opt = None; // local_mr 需要在整个 get_block 的过程中都有效
+   if let Some(rdma) = rpc_client.get_rdma() {
+       let layout = Layout::from_size_align(self.block_size, 4096).unwrap();
+       let local_mr = rdma.alloc_local_mr(layout)?
+       let mr_token = local_mr.token_with_timeout(timeout).unwrap();
+
+       local_mr_opt = Some(Arc::new(local_mr));
+
+       opcode = ReqType::KVBlockGetRequestWithRdma.to_u8();
+       kv_cache_request = KVCacheRequest::KVBlockGetRequestWithRdma(KVBlockGetRequestWithRdma {
+           block_size: self.block_size,
+           kv_cache_id,
+           mr_token,
+       });
+   }

    let packet = KVCachePacket::new(opcode, kv_cache_request, tx.clone());
    rpc_client.send_request(packet).await?;

    let response = rx.recv_async().await??;
    match response {
        KVCacheResponse::KVBlockGetResponse(response) => Ok(response.data), // TCP fallback: 直接返回数据
+       KVCacheResponse::KVBlockGetResponseWithRdma(response) => {
+           let local_mr = local_mr_opt.as_ref().unwrap();
+           let data = mr.as_slice();
+           Ok(bytes::Bytes::from(data.to_owned())) // RDMA ：从注册的内存区域中读取
+       },
        _ => Err(InvalidResponseError),
    }
}
</code></pre>
<p>Client 端构造写入请求（PUT 操作）</p>
<pre><code>// src/distribute_kv_cache/kvclient.rs
async fn put_block(&#x26;self, addr: String, kv_block: KVBlock) -> DatenLordResult&#x3C;()> {
    let (tx, rx) = flume::unbounded::&#x3C;Result&#x3C;KVCacheResponse, KVCacheRequest>>();
    let rpc_client = self.get_client(addr.clone()).await?;

    let mut opcode = ReqType::KVBlockPutRequest.to_u8();
    let mut kv_cache_request = KVCacheRequest::KVBlockPutRequest(KVBlockPutRequest {
        block_size: self.block_size,
        kv_cache_id: kv_block.block_id,
        data: bytes::Bytes::from(kv_block.data),
    });

    // 新增 RDMA 消息构造
+   let mut local_mr_opt = None; // local_mr 需要在整个 put_block 的过程中都有效
+   if let Some(rdma) = rpc_client.get_rdma() {
+       let layout = Layout::from_size_align(self.block_size, 4096).unwrap();
+       let mut local_mr = rdma.alloc_local_mr(layout)?;
+       local_mr.as_mut_slice().copy_from_slice(&#x26;data);
+       let mr_token = local_mr.token_with_timeout(timeout).unwrap();
+
+       local_mr_opt = Some(Arc::new(local_mr));
+
+       opcode = ReqType::KVBlockPutRequestWithRdma.to_u8();
+       kv_cache_request = KVCacheRequest::KVBlockPutRequestWithRdma(KVBlockPutRequestWithRdma {
+           block_size: self.block_size,
+           kv_cache_id,
+           mr_token,
+       });
+   }

    let packet = KVCachePacket::new(opcode, kv_cache_request, tx.clone());
    rpc_client.send_request(packet).await?;

    let response = rx.recv_async().await??;
    match response {
        KVCacheResponse::KVBlockPutResponse(_) => Ok(()),
+       KVCacheResponse::KVBlockPutResponseWithRdma(_) => Ok(()),
        _ => Err(InvalidResponseError),
    }
}
</code></pre>
<p>KVCache Server 端响应请求</p>
<p>Server 端响应读取请求处理流程（响应 GET 操作）</p>
<pre><code>// src/distribute_kv_cache/rpc/rdma/handler.rs
async fn handle_get_rdma(&#x26;self, req: KVBlockGetRequestWithRdma) -> Result&#x3C;KVBlockGetResponseWithRdma> {
    let block = self.cache_manager.read(metadata).await?
        .ok_or(BlockNotFoundError)?;
    let data: Bytes = block.read().unwrap().get_data();
    
    let rdma = self.rdma.as_ref().unwrap();

    let layout = Layout::from_size_align(req.block_size, 4096).unwrap();
    let mut local_mr = rdma.alloc_local_mr(layout)?;
    local_mr.as_mut_slice().copy_from_slice(&#x26;data);
    
    let mut remote_mr = RemoteMr::new(req.mr_token);
    rdma.write(&#x26;local_mr, &#x26;mut remote_mr).await?; // RDMA单边写入（服务端->客户端）
    
    Ok(KVBlockGetResponseWithRdma {
        kv_cache_id,
        block_size,
        status: StatusCode::Success,
    })
}
</code></pre>
<p>Server 端响应写入请求处理流程（响应 PUT 操作）：</p>
<pre><code>// src/distribute_kv_cache/rpc/rdma/handler.rs
async fn handle_put_rdma(&#x26;self, req: KVBlockPutRequestWithRdma) -> Result&#x3C;KVBlockPutResponseWithRdma> {
    let rdma = self.rdma.as_ref().unwrap();
    let layout = Layout::from_size_align(req.block_size, 4096).unwrap();
    let mut local_mr = rdma.alloc_local_mr(layout)?;
    
    let remote_mr = RemoteMr::new(req.mr_token);
    rdma.read(&#x26;mut local_mr, &#x26;remote_mr).await?; // RDMA单边读取（服务端&#x3C;-客户端）
    
    let kv_block = Block::new(metadata, local_mr.as_slice().to_owned().into());
    self.cache_manager.write(kv_block).await?;
    
    Ok(KVBlockPutResponseWithRdma {
        kv_cache_id,
        block_size,
        status: StatusCode::Success,
    })
}
</code></pre>
<h2 id="性能优化实践">性能优化实践</h2>
<p>保存 RDMA 状态</p>
<p>KVCache Client 端</p>
<p>每次 KVCacheClient 通过 RdmaBuilder::connect 中创建 RDMA 连接都会生成一个全新的 Rdma 实例。</p>
<p>实际上可以复用之前与 Server 连接时创建的 RDMA 连接状态。</p>
<p>正好 async_rdma 库中提供了 Rdma::new_connect[^4] 方法可以让新创建的连接继承原有 RDMA 的状态。</p>
<p>不过需要将 RDMA 状态存储至 DistributeKVCacheClient 当中。</p>
<pre><code>// src/distribute_kv_cache/kvclient.rs
pub struct DistributeKVCacheClientInner {
    // ... 其他成员 ...
    rdma: Option&#x3C;Arc&#x3C;Mutex&#x3C;Rdma>>>, // KV Cache Client 的 RDMA 状态
}
impl DistributeKVCacheClientInner {
    pub fn init_rdma(&#x26;mut self, rdma: Rdma) {
        self.rdma = Some(Arc::new(Mutex::new(rdma)));
    }
    async fn get_client(&#x26;self, addr: String) -> DatenLordResult&#x3C;Arc&#x3C;RpcClient&#x3C;KVCachePacket&#x3C;K>>>> {
        // ... 初始化新的 RPC Client ...
        // RDMA 连接复用 KV Cache Client 中存储的 RDMA 状态
        if let Some(rdma) = self.rdma.as_ref() {
            let parent = rdma.lock().await;
            if let Ok(rdma) = parent.new_connect(rdma_server_addr).await {
                rpc_client.init_rdma(rdma);
            }
        }
        // ...
    }
}
</code></pre>
<p>KVCache Server 端</p>
<p>类似的，Server 端也能够复用 RDMA 的连接状态。</p>
<p>async_rdma 库中除了使用 RdmaBulider::listen 监听连接之外，在 Rdma 类型中也提供了 listen 方法，通过这个方法调用创建一个继承原有 RDMA 状态的 RDMA 实例。</p>
<p>Server 端的 RDMA 状态可以直接存储到监听线程当中。</p>
<pre><code>// src/distribute_kv_cache/rpc/server.rs
pub async fn listen(&#x26;mut self, addr: &#x26;str) -> Result&#x3C;(), RpcError> {
    // RPC Server 的状态可以直接
    let mut parent_rdma = async_rdma::RdmaBuilder::default()
        .set_timeout(rdma_timeout)
        .build()
        .ok();
    tokio::task::spawn(async move {
        loop {
            // ... 初始化连接上下文 ...
            // 复用 TCP 连接与客户端进行 RDMA 元数据的交换
            if let Some(rdma) = parent_rdma.as_mut() {
                if let Ok(rdma) = rdma.listen(rdma_listen_addr).await {
                    conn.init_rdma(rdma);
                }
            }
            // ...
        }
    });
}
</code></pre>
<p>RDMA 连接复用 TCP Stream</p>
<p>前文提到之前的实现无法确保 TCP 与 RDMA 连接来自同一客户端，这是因为在 Server 端实际上分别为 TCP 和 RDMA 监听了两个不同的端口，因此可能会有两个不同的 Client 分别与 Server 建立连接，却被误认为同一个客户端。</p>
<p>解决这个问题的方案之一是让 RDMA 建立连接的过程中，直接复用之前创建的 TCP 连接进行元数据的交换，而不要新监听一个端口。</p>
<p>不过很可惜的是 async_rdma 库并没有直接提供复用 TCP Stream 进行连接建立的接口。</p>
<p>但是如果查看 async_rdma 源码的话就能发现，在 tcp_connect_helper[^5] 和 [tcp_listen[^6] 这两个没有导出的辅助函数中，正好提供了通过 TCP Stream 进行交换元数据的功能。</p>
<p>于是可以通过修改依赖的 async_rdma 库，将上述辅助函数的主体代码分别抽取出来编写两个新的函数 exchange_metadata_client[^7] 以及 exchange_metadata_server[^8].</p>
<p>并为 Rdma 添加新的公开方法，为 async_rdma 库添加复用 TCP Stream 进行连接建立的接口。</p>
<pre><code>// async_rdma/src/lib.rs
impl Rdma {
    pub async fn transmit_metadata_by_stream(&#x26;mut self, stream: &#x26;mut TcpStream) -> io::Result&#x3C;Self> {
        let mut rdma = self.clone()?;
        let remote = exchange_metadata_client(stream, &#x26;rdma.endpoint()).await?;
        self.setup_new_connection(&#x26;mut rdma, &#x26;remote).await?;
        Ok(rdma)
    }
    pub async fn receive_metadata_by_stream(&#x26;mut self, stream: &#x26;mut TcpStream) -> io::Result&#x3C;Self> {
        let mut rdma = self.clone()?
        let remote = exchange_metadata_server(stream, &#x26;rdma.endpoint()).await?;
        self.setup_new_connection(&#x26;mut rdma, &#x26;remote).await?;
        Ok(rdma)
    }
}
</code></pre>
<p>修改 Client 端与 Server 建立连接的代码，使用新的 API 复用原有的 TCP 连接。</p>
<pre><code>// src/distribute_kv_cache/kvclient.rs
async fn get_client(&#x26;self, addr: String) -> DatenLordResult&#x3C;Arc&#x3C;RpcClient&#x3C;KVCachePacket&#x3C;K>>>> {
    // 原有 TCP 连接建立
    let mut connect_stream = connect_timeout!(addr_clone, timeout_options.read_timeout).await?;
    // ... 初始化新的 RPC Client ...
    if let Some(rdma) = self.rdma.as_ref() {
        let parent = rdma.lock().await;
        // 复用 TCP 连接与 Server 端进行 RDMA 元数据的交换
        if let Ok(rdma) = parent.transmit_metadata_by_stream(&#x26;mut connect_stream).await {
            rpc_client.init_rdma(rdma);
        }
    }
    // ...
}
</code></pre>
<p>Server 端不再监听 RDMA 连接，而是直接从接收到的 TCP Stream 中获取 RDMA 元数据并进行连接。</p>
<pre><code>// src/distribute_kv_cache/rpc/server.rs
pub async fn listen(&#x26;mut self, addr: &#x26;str) -> Result&#x3C;(), RpcError> {
    // RPC Server 中保存 rdma 状态
    let mut rdma = async_rdma::RdmaBuilder::default()
        .set_timeout(rdma_timeout)
        .build()?;
    tokio::task::spawn(async move {
        loop {
            // 接受 TCP 连接
            let Ok((mut stream, _)) = listener.accept().await else {
                continue;
            }
            // ... 初始化连接上下文 ...
            // 复用 TCP 连接与客户端进行 RDMA 元数据的交换
            if let Ok(rdma) = rdma.receive_metadata_by_stream(&#x26;mut stream).await {
                conn.init_rdma(rdma);
            }
            // ...
        }
    });
}
</code></pre>
<p>复用 TCP Stream 不仅能解决 Server 与 Client 精准建立连接的问题，还能够提升一定的性能。</p>
<p>Server 端直接存储 LocalMR 来减少拷贝</p>
<p>前文的实现里，服务端处理 Get 和 Put 请求时，仍旧需要将本地 Block 的数据复制到 RDMA 本地内存区域或是从 RDMA 本地内存区域复制一份数据存储到 Block 里。</p>
<p>这样的实现会导致多余的内存拷贝，降低性能。</p>
<p>为了避免这个问题，可以直接将 Block 的数据存储在 RDMA 本地内存区域中，这样就避免了拷贝的开销。</p>
<pre><code>// src/distribute_kv_cache/local_cache/block.rs
pub struct Block {
    meta_data: MetaData,
    data: bytes::Bytes,
    local_mr: Option&#x3C;Arc&#x3C;LocalMr>>, // 直接存储 RDMA 内存区域
}
impl Block {
    pub fn new_with_local_mr(meta_data: MetaData, local_mr: LocalMr) -> Self {
        Block {
            meta_data,
            data: bytes::Bytes::new(),
            local_mr: Some(Arc::new(local_mr)),
        }
    }
    pub fn get_local_mr(&#x26;self) -> Option&#x3C;Arc&#x3C;LocalMr>> {
        self.local_mr.clone()
    }
}
</code></pre>
<p>这样在 Server 端处理 Get 和 Put 请求时，只需直接从 Block 中取出 LocalMr，而不需要再复制数据。</p>
<pre><code>// src/distribute_kv_cache/rpc/rdma/handler.rs
async fn handle_get_rdma(&#x26;self, req: KVBlockGetRequestWithRdma) -> DatenLordResult&#x3C;KVBlockGetResponseWithRdma> {
    // ...
    // 直接获取注册好的内存区域
    let Some(local_mr) = block.read().unwrap().get_local_mr() else {
        return Err(LocalMrNotFoundError);
    }
    rdma.write(&#x26;local_mr, &#x26;mut remote_mr).await?;
    // ...
}
async fn handle_put_rdma(&#x26;self, req: KVBlockPutRequestWithRdma) -> DatenLordResult&#x3C;KVBlockPutResponseWithRdma> {
    // ...
    rdma.read(&#x26;mut local_mr, &#x26;remote_mr).await?;
    // 直接将 local_mr 存入 block 当中
    let kv_block = Block::new_with_local_mr(metadata, local_mr);
    self.cache_manager.write(kv_block).await?;
    // ...
}
</code></pre>
<h2 id="未来展望">未来展望</h2>
<p>将 RDMA 支持使用泛型做进一步抽象</p>
<p>在当前的实现上，我们采用的是动态分发的形式，Client 在运行时检测 RDMA 的状态来选择将要发送的消息类型。而通常我们的环境是可控的，要么节点都有 RDMA 支持，要么都没有，通过泛型来同时实现 TCP 版本和 RDMA 版本，让用户来自由选择使用哪一种版本的 Datenlord Distributed KVCache SDK, 消除动态分发带来的开销。</p>
<p>为 async_rdma 库添加 GPU Direct RDMA Copy 的功能</p>
<p>当前我们使用达坦科技开发的 async_rdma 开源库来进行 RDMA 操作，async_rdma 开源库目前并不支持直接对 GPU 内存进行 RDMA 读写。我们考虑利用 NVIDIA 提出的高性能数据传输技术 GPU Direct RDMA Copy 为 async_rdma 库添加访问 GPU 内存的功能。实现跨节点的 GPU 显存与远程内存之间的零拷贝直接传输。为 AI 训练推理提供更高效易用的基础设施。</p>
<p>进一步的性能测试</p>
<p>本文尚未展开对 RDMA 加速方案的系统性性能评估，在下一篇文章中我将会详细介绍如何利用 RDMA 生态工具链以及 Rust 生态中的各类工具测试一个 RDMA 应用的延迟和吞吐量。以 Datenlord 分布式 KVCache 为例验证 RDMA 技术带来的性能收益。</p>
<h2 id="总结">总结</h2>
<p>本文讨论了如何利用 RDMA 技术加速 Datenlord 分布式 KVCache 模块。当前的 KVCache 模块使用 TCP 进行数据传输，这会消耗大量 CPU 资源。通过引入 RDMA 技术，建立零拷贝传输通道，消除不必要的内存拷贝并节省 CPU 资源，节省了 KVCache 模块的开销，提高了整个系统的效率。具体来讲，本文详细描述了如何设计和实现一套混合传输方案，并使用 Datenlord 开发的 async_rdma 库完成这套方案，从原理到实践指导开发者开发一个实用的 RDMA 应用。</p>
<p>在 AI 基础设施领域，开源生态正迎来爆发式创新，Deepseek 3FS 等开源方案受到热烈关注。达坦科技始终践行开源驱动创新的理念，诚挚邀请开发者加入 Datenlord 开源社区，共同推动技术演进，打造下一代高性能、开放化的 AI 算力基座。</p>`;export{a as assetURLs,l as default,r as metadata,c as toc};

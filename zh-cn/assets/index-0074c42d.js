const e="/zh-cn/assets/cover-6865ae02.png",s="/zh-cn/assets/image1-75d9ab84.png",a="/zh-cn/assets/image2-7e7f67b4.png",l="/zh-cn/assets/image3-417a5ca9.png",n=[e,s,a,l],p={label:"Xline 源码解读 （二）—— Lease 的机制与实现",description:"Xline 是一款开源的分布式 KV 存储引擎，用于管理少量的关键性数据，其核心目标是实现高性能的数据访问，以及保证跨数据中心场景下的强一致性。Xline 对外提供了一系列兼容 etcd 的访问接口，比如 KV、Watch、Lease 等等。本文将会着重介绍一下其中的 Lease 接口。",cover:"./cover.png",location:"中国香港",author:["关宇"],tags:["Xline"],date:"2023-07-20",title:"Xline Source Code Interpretation (II) Lease Mechanism and Implementation"},c=[{label:"简介",level:2},{label:"架构",level:2},{label:"源码分析",level:2},{label:"源码组织",level:3},{label:"Lease 的创建",level:3},{label:"Lease 的使用",level:3},{label:"Lease 的主动删除",level:3},{label:"Lease 的过期",level:3},{label:"Lease 的续租",level:3},{label:"Lease 信息的读取",level:3},{label:"总结",level:2}],o=`<p><img src="${e}" alt="封面"></p>
<h2 id="简介">简介</h2>
<p><strong>Xline 是一款开源的分布式 KV 存储引擎，用于管理少量的关键性数据，其核心目标是实现高性能的数据访问，以及保证跨数据中心场景下的强一致性。</strong> Xline 对外提供了一系列兼容 etcd 的访问接口，比如 KV、Watch、Lease 等等。本文将会着重介绍一下其中的 <strong>Lease 接口</strong>。</p>
<p>Lease 是一种客户端和服务端之间的租约机制。类似于我们现实生活中的租车服务，当我们需要使用一辆车时，我们可以向租车公司申请一个 lease，租车公司会给我们分配一辆车，并且保证在我们和租车公司约定的有效期内不会把这辆车分配给其他人，如果我们想要延长使用时间，我们可以向租车公司续租，如果我们不再需要使用这辆车，我们可以主动归还并取消，或者等待 lease 过期后自动归还。</p>
<p>在 Xline 中对 lease 的使用和现实生活中的租车服务很相似，客户端可以向服务点申请一个 lease，服务端会保证在 lease 的有效期内不会删除这个 lease，客户端也可以通过相应的接口提前结束或者延长 lease 的时间，与现实中租车不同的是，我们可以在这个 lease 上绑定一些 key-value，这些 key-value 会随着 lease 的过期被删除。</p>
<p>根据以上介绍的 lease 的能力，我们可以在很多场景下使用 lease 来实现我们的目的，以下是几个常见的 lease 应用场景：</p>
<ul>
<li><strong>分布式锁：</strong> 分布式锁是通过多个机制一同实现的，lease 在分布式锁中起到避免死锁的作用。客户端在请求分布式锁的时候，会创建一个 lease 并不断续租，并且写入 key-value 并附加该 lease，这个 key-value 代表分布式锁的占用状态，如果占用该锁的客户端因故障无法主动释放锁，lease 机制也会保证在 lease 过期后自动删除对应的 key-value 来释放当前锁。</li>
<li><strong>服务注册中心：</strong> 注册新服务时创建 lease，并写入服务相关信息的 key-value 附加该 lease，在服务存活期间，对应服务会一直对其 lease 续租，服务故障后无法自动续租，对应 key-value 自动删除，相应的服务就会在注册中心中注销。</li>
<li><strong>分布式系统中的授权管理：</strong> 客户端通过申请 lease 来获取资源的访问权限，如果客户端失去与服务端的连接，或者由于故障没有及时续租，导致 lease 过期，该客户端就会失去相应的权限</li>
</ul>
<h2 id="架构">架构</h2>
<p><img src="${s}" alt="图片"></p>
<p>上图是一个 lease 实现的简单架构图，外部 Client 可以通过两种方式向 Xline 集群发送请求，一种是直接通过 <code>Curp</code> 协议向集群内所有节点广播请求，<code>Curp</code> 模块达成共识后，会把这个请求应用到状态机，也就是将其写入存储层；另一种发送请求的方式就是 Client 直接将请求发送到集群中一个节点的 <code>LeaseServer</code>，这也是与 etcd 兼容的请求方式，请求到达 <code>LeaseServer</code> 后，会有两条不同的处理路径，多数请求会通过 Server 端绑定的 Curp client 广播给集群中所有节点，剩下的少部分请求可能只有部分节点能够处理，这些请求就会被转发到这些节点的 <code>LeaseServer</code>，然后应用到状态机。</p>
<h2 id="源码分析">源码分析</h2>
<h3 id="源码组织">源码组织</h3>
<p>Lease 相关的源码主要保存在以下文件中，大致分为三个部分：</p>
<ol>
<li>RPC 定义：
<ul>
<li>xlineapi/proto/rpc.proto：Xline 内各 Server 的 rpc 接口定义，包括 LeaseServer 接口定义。</li>
<li>xlineapi/proto/lease.proto：lease 的 rpc message 定义。</li>
</ul>
</li>
<li>LeaseServer 实现：
<ul>
<li>xline/src/server/lease_server.rs：负责提供 Lease RPC service 的具体实现，主要目的是提供 etcd 兼容接口，如果使用外部的 curp client 直接发送 propose 可以不经过此接口，但也有部分不经过共识协议的请求必须通过 LeaseServer 处理。</li>
</ul>
</li>
<li>LeaseStore 实现：
<ul>
<li>xline/src/storage/lease_store/lease.rs：定义了 Lease 数据结构，用于保存 Lease 相关的信息，比如 Lease 上绑定的所有 Key， Lease 的过期时间，Lease 的剩余 TTL 长度等。并为其实现了一些实用的方法。</li>
<li>xline/src/storage/lease_store/lease_queue.rs：定义了 LeaseQueue 和相关的方法，LeaseQueue 是一个由 lease id 以及 lease 过期时间组成的优先队列，一个后台常驻 task 会定时通过此结构获取所有过期 lease 的 id。</li>
<li>xline/src/storage/lease_store/lease_collection.rs：定义了 LeaseCollection 和相关的方法，LeasCollection 是 lease 核心数据结构的集合，提供 lease 机制的核心能力。结构内部主要包含三个部分，lease_map 保存所有 lease 结构；item_map 缓存 key 到 lease id 映射；expired_queue 管理 lease 过期时间，expired_queue 只在 leader 节点上有意义，其它节点上为空。</li>
<li>xline/src/storage/lease_store/mod.rs：LeaseStore 的定义及方法实现。负责提供 lease 的存储层抽象，对外提供所有 lease 相关操作的存储层接口。其内部包含 LeaseCollection 以及和 KvStore 共享的一些数据结构。</li>
</ul>
</li>
</ol>
<h3 id="lease-的创建">Lease 的创建</h3>
<p>想要使用 lease，首先就要创建一个 lease，创建 lease 时需要使用 <code>LeaseServer</code> 提供的 <code>LeaseGrant</code> <code>接口。LeaseServer</code> 中对 <code>LeaseGrant</code> 的处理很简单，就是分配一个 lease id，然后通过 propose 把请求交给共识协议处理，达成共识后，请求会在 <code>LeaseStore</code> 中被执行。</p>
<p><code>LeaseStore</code> 会在 <code>LeaseCollection</code> 中创建并插入一个新的 Lease，其核心代码逻辑如下：</p>
<pre><code class="hljs language-rust">...
<span class="hljs-keyword">if</span> is_leader {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">expiry</span> = lease.<span class="hljs-title function_ invoke__">refresh</span>(Duration::ZERO);
    <span class="hljs-keyword">let</span> <span class="hljs-variable">_ignore</span> = inner.expired_queue.<span class="hljs-title function_ invoke__">insert</span>(lease_id, expiry);
} <span class="hljs-keyword">else</span> {
    lease.<span class="hljs-title function_ invoke__">forever</span>();
}
<span class="hljs-keyword">let</span> <span class="hljs-variable">_ignore</span> = inner.lease_map.<span class="hljs-title function_ invoke__">insert</span>(lease_id, lease.<span class="hljs-title function_ invoke__">clone</span>());
...
</code></pre>
<p>需要注意的是，如果当前节点是 leader 节点的话，还需要承担管理 lease 过期时间的任务，所以需要通过 <code>refresh</code> 方法计算 <code>Lease</code> 的过期时间，并将其插入到 <code>expired_queue</code> 中。其他节点则不需要这一步处理，只需要将新的 <code>Lease</code> 插入到 <code>lease_map</code> 中。计算过期时间使用的 refresh 定义如下：</p>
<p>Lease 创建完成后，服务端会给客户端返回一个包含 lease id 的响应。</p>
<h3 id="lease-的使用">Lease 的使用</h3>
<p><img src="${a}" alt="图片"></p>
<p>获取到 lease id 后，客户端就可以通过 lease id 来使用这个 lease，在 Put 一对 key value 时可以附加 lease id，这个 Put 请求被应用到状态机时，除了直接在 KvStore 的 Index 和 DB 中写入 key-value 以外，还会通过 LeaseCollection 提供的 detach 方法分离当前 key 和旧的 lease ，并通过 attach 将需要 put 的 key 附加到新的 lease id 上。</p>
<pre><code class="hljs language-rust"><span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">fn</span> <span class="hljs-title function_">attach</span>(&#x26;<span class="hljs-keyword">self</span>, lease_id: <span class="hljs-type">i64</span>, key: <span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">u8</span>>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;(), ExecuteError> {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">inner</span> = <span class="hljs-keyword">self</span>.inner.<span class="hljs-title function_ invoke__">write</span>();
    <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(lease) = inner.lease_map.<span class="hljs-title function_ invoke__">get_mut</span>(&#x26;lease_id) <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span>  <span class="hljs-title function_ invoke__">Err</span>(ExecuteError::<span class="hljs-title function_ invoke__">lease_not_found</span>(lease_id));
    };
    lease.<span class="hljs-title function_ invoke__">insert_key</span>(key.<span class="hljs-title function_ invoke__">clone</span>());
    <span class="hljs-keyword">let</span> <span class="hljs-variable">_ignore</span> = inner.item_map.<span class="hljs-title function_ invoke__">insert</span>(key, lease_id);
    <span class="hljs-title function_ invoke__">Ok</span>(())
}
</code></pre>
<p><code>attach</code> 的具体实现就是通过 <code>lease id</code> 找到对应的 <code>Lease</code>，并将 key 附加到 <code>Lease</code> 上，以及在 <code>item_map</code> 中添加 key 到 lease id 的映射关系。<code>detach</code> 的实现与 <code>attach</code> 的相反，它会移除 <code>attach</code> 时插入的内容。</p>
<p>经过以上的过程，我们已经成功将 key 和 lease id 关联在一起，此时如果这个 <code>Lease</code> 被主动 revoke 或者超时，那么这个 <code>Lease</code> 以及它关联的所有 key，都会被删除。</p>
<h3 id="lease-的主动删除">Lease 的主动删除</h3>
<p>删除一个 lease 需要调用 <code>LeaseRevoke</code> 接口，这个接口在 <code>LeaseServer</code> 中的处理与 <code>LeaseGrant</code> 基本相同，都是将请求交给共识协议处理，唯一的不同是 <code>LeaseRevoke</code> 不需要分配 lease id。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">del_keys</span> = <span class="hljs-keyword">match</span> <span class="hljs-keyword">self</span>.lease_collection.<span class="hljs-title function_ invoke__">look_up</span>(req.id) {
    <span class="hljs-title function_ invoke__">Some</span>(l) => l.<span class="hljs-title function_ invoke__">keys</span>(),
    <span class="hljs-literal">None</span> => <span class="hljs-keyword">return</span> <span class="hljs-title function_ invoke__">Err</span>(ExecuteError::<span class="hljs-title function_ invoke__">lease_not_found</span>(req.id)),
};
<span class="hljs-keyword">if</span> del_keys.<span class="hljs-title function_ invoke__">is_empty</span>() {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">_ignore</span> = <span class="hljs-keyword">self</span>.lease_collection.<span class="hljs-title function_ invoke__">revoke</span>(req.id);
    <span class="hljs-keyword">return</span> <span class="hljs-title function_ invoke__">Ok</span>(<span class="hljs-type">Vec</span>::<span class="hljs-title function_ invoke__">new</span>());
}

<span class="hljs-comment">// delete keys ...</span>

<span class="hljs-keyword">let</span> <span class="hljs-variable">_ignore</span> = <span class="hljs-keyword">self</span>.lease_collection.<span class="hljs-title function_ invoke__">revoke</span>(req.id);
</code></pre>
<p><code>LeaseRevoke</code> 被执行时，首先会尝试查找 <code>Lease</code> 是否有关联的 key，如果没有，那么就可以直接通过 <code>LeaseCollection</code> 上的 <code>revoke</code> 方法将 <code>Lease</code> 删除，如果有关联的 key 的话那么就需要将关联的所有 key 从 <code>KvStore</code> 中删除，并清理 <code>LeaseCollection</code> 中这些 key 和 lease id 的关系，然后才能从 <code>LeaseCollection</code> 中 <code>reovke</code> 这个 <code>Lease</code>。</p>
<h3 id="lease-的过期">Lease 的过期</h3>
<p><img src="${l}" alt="图片"></p>
<p>Lease 过期时的处理流程如上图所示，此处省略了共识的部分，在初始化 <code>LeaseServer</code> 时，会创建一个后台常驻的 <code>revoke_expired_leases_task</code>，这个 task 的主体代码如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">loop</span> {
    <span class="hljs-comment">// only leader will check expired lease</span>
    <span class="hljs-keyword">if</span> lease_server.lease_storage.<span class="hljs-title function_ invoke__">is_primary</span>() {
        <span class="hljs-keyword">for</span> <span class="hljs-variable">id</span> <span class="hljs-keyword">in</span> lease_server.lease_storage.<span class="hljs-title function_ invoke__">find_expired_leases</span>() {
            <span class="hljs-keyword">let</span> <span class="hljs-variable">_handle</span> = tokio::<span class="hljs-title function_ invoke__">spawn</span>({
                <span class="hljs-keyword">let</span> <span class="hljs-variable">s</span> = Arc::<span class="hljs-title function_ invoke__">clone</span>(&#x26;lease_server);
                <span class="hljs-keyword">async</span> <span class="hljs-keyword">move</span> {
                    <span class="hljs-keyword">let</span>  <span class="hljs-variable">request</span> = tonic::Request::<span class="hljs-title function_ invoke__">new</span>(LeaseRevokeRequest { id });
                    <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Err</span>(e) = s.<span class="hljs-title function_ invoke__">lease_revoke</span>(request).<span class="hljs-keyword">await</span> {
                        warn!(<span class="hljs-string">"Failed to revoke expired leases: {}"</span>, e);
                    }
                }
            });
        }
    }
    time::<span class="hljs-title function_ invoke__">sleep</span>(DEFAULT_LEASE_REQUEST_TIME).<span class="hljs-keyword">await</span>;
}
</code></pre>
<p>在负责管理 <code>Lease</code> 过期时间节点上，这个 task 会定时通过 <code>find_expired_leases</code> 获取已经过期的所有 lease id， 然后调用 lease server 上的 <code>lease_revoke</code> 接口来删除过期的 <code>Lease</code>，这个接口和客户度主动删除 <code>Lease</code> 时使用的是同一个接口。</p>
<p><code>find_expired_leases</code> 是 <code>LeaseCollection</code> 上一个核心方法，具体实现如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">fn</span> <span class="hljs-title function_">find_expired_leases</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">i64</span>> {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">expired_leases</span> = <span class="hljs-built_in">vec!</span>[];
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">inner</span> = <span class="hljs-keyword">self</span>.inner.<span class="hljs-title function_ invoke__">write</span>();
    <span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(expiry) = inner.expired_queue.<span class="hljs-title function_ invoke__">peek</span>() {
        <span class="hljs-keyword">if</span> *expiry &#x3C;= Instant::<span class="hljs-title function_ invoke__">now</span>() {
            <span class="hljs-meta">#[allow(clippy::unwrap_used)]</span> <span class="hljs-comment">// queue.peek() returns Some</span>
            <span class="hljs-keyword">let</span> <span class="hljs-variable">id</span> = inner.expired_queue.<span class="hljs-title function_ invoke__">pop</span>().<span class="hljs-title function_ invoke__">unwrap</span>();
            <span class="hljs-keyword">if</span> inner.lease_map.<span class="hljs-title function_ invoke__">contains_key</span>(&#x26;id) {
                expired_leases.<span class="hljs-title function_ invoke__">push</span>(id);
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">break</span>;
        }
    }
    expired_leases
}
</code></pre>
<p>在创建 <code>Lease</code> 时，我们已经计算过了 <code>Lease</code> 过期的时间并将其插入了 <code>expired_queue</code> ，调用 <code>find_expired_queue</code> 时会一直尝试从优先队列队头拿出已经过期的 <code>Lease</code> ，直到遇到第一个不过期的 <code>Lease</code> 后停止尝试，然后将拿到的所有 lease id 返回。</p>
<h3 id="lease-的续租">Lease 的续租</h3>
<p>如果想要让创建的 <code>Lease</code> 能够持续更长时间，那就需要在客户端和服务端之间维护一条 stream，客户端定时向服务端发送 <code>LeaseKeepAlive</code> 请求。和前面提到的请求不同，<code>LeaseKeepAlive</code> 请求不需要经过共识协议，因为这个请求依赖只存在于 leader 节点上的 <code>Lease</code> 过期时间，因此只有 leader 节点能够处理 LeaseKeepAlive 请求，follower 节点会把请求转发至 leader 节点上处理。具体的转发逻辑可以参考 <code>lease_server.rs</code> 内的源码。</p>
<p>在 leader 和 client 建立起 stream 后，每当 leader 从 stream 中收到 lease id，都会为这个 lease 续租，最终续租的逻辑是通过 <code>LeaseCollection</code> 提供的 <code>renew</code> 方法实现的。该方法定义如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">fn</span> <span class="hljs-title function_">renew</span>(&#x26;<span class="hljs-keyword">self</span>, lease_id: <span class="hljs-type">i64</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;<span class="hljs-type">i64</span>, ExecuteError> {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">inner</span> = <span class="hljs-keyword">self</span>.inner.<span class="hljs-title function_ invoke__">write</span>();
    <span class="hljs-keyword">let</span> (expiry, ttl) = {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(lease) = inner.lease_map.<span class="hljs-title function_ invoke__">get_mut</span>(&#x26;lease_id) <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-title function_ invoke__">Err</span>(ExecuteError::<span class="hljs-title function_ invoke__">lease_not_found</span>(lease_id));
        };
        <span class="hljs-keyword">if</span> lease.<span class="hljs-title function_ invoke__">expired</span>() {
            <span class="hljs-keyword">return</span> <span class="hljs-title function_ invoke__">Err</span>(ExecuteError::<span class="hljs-title function_ invoke__">lease_expired</span>(lease_id));
        }
        <span class="hljs-keyword">let</span> <span class="hljs-variable">expiry</span> = lease.<span class="hljs-title function_ invoke__">refresh</span>(Duration::<span class="hljs-title function_ invoke__">default</span>());
        <span class="hljs-keyword">let</span> <span class="hljs-variable">ttl</span> = lease.<span class="hljs-title function_ invoke__">ttl</span>().<span class="hljs-title function_ invoke__">as_secs</span>().<span class="hljs-title function_ invoke__">cast</span>();
        (expiry, ttl)
    };
    <span class="hljs-keyword">let</span> <span class="hljs-variable">_ignore</span> = inner.expired_queue.<span class="hljs-title function_ invoke__">update</span>(lease_id, expiry);
    <span class="hljs-title function_ invoke__">Ok</span>(ttl)
}
</code></pre>
<p>Renew 会先检查对应 <code>Lease</code> 是否已经过期，没有过期的话就会重新计算过期时间，然后更新它在 <code>expired_queue</code> 中的顺序。</p>
<p>只要 client 和 server 之间的连接不中断，client 就会一直通过 stream 向服务端发送 <code>LeaseKeepAlive</code> 请求，这个 lease 也就不会超时，前文提到的 lease 主要的应用场景中，几乎都用到了这个特性来判断客户端是否在正常运行。</p>
<h3 id="lease-信息的读取">Lease 信息的读取</h3>
<p>Lease 有两个读取接口，一个是 <code>LeaseTimeToLive</code>，这个接口会读取一个 lease 的详细信息，包括它的过期时间，和 <code>LeaseKeepAlive</code> 一样，因为过期时间只存在于 leader 节点，因此该请求需要转发只 leader 处理；另一个读取接口是 <code>LeaseLeases</code>，这个接口会列出系统中所有的 lease id，这个接口不需要 lease 过期时间的信息，因此可以直接交给共识协议处理，所以在 <code>LeaseServer</code> 中的处理和 <code>LeaseGrant</code> 、<code>LeaseRevoke</code> 相似。此处不再赘述。</p>
<p><code>LeaseTimeToLive</code> 和 <code>LeaseLeases</code> 读取信息的能力最终由 <code>LeaseCollection</code> 实现，源码如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">fn</span> <span class="hljs-title function_">look_up</span>(&#x26;<span class="hljs-keyword">self</span>, lease_id: <span class="hljs-type">i64</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Option</span>&#x3C;Lease> {
    <span class="hljs-keyword">self</span>.inner.<span class="hljs-title function_ invoke__">read</span>().lease_map.<span class="hljs-title function_ invoke__">get</span>(&#x26;lease_id).<span class="hljs-title function_ invoke__">cloned</span>()
}

<span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">fn</span> <span class="hljs-title function_">leases</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Vec</span>&#x3C;Lease> {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">leases</span> = <span class="hljs-keyword">self</span>
        .inner
        .<span class="hljs-title function_ invoke__">read</span>()
        .lease_map
        .<span class="hljs-title function_ invoke__">values</span>()
        .<span class="hljs-title function_ invoke__">cloned</span>()
        .collect::&#x3C;<span class="hljs-type">Vec</span>&#x3C;_>>();
    leases.<span class="hljs-title function_ invoke__">sort_by_key</span>(Lease::remaining);
    leases
}
</code></pre>
<h2 id="总结">总结</h2>
<p>本文介绍了 Xline 下的一个重要接口 Lease，用户可以通过 Lease 实现一组 key 的定时过期，并且能够通过 KeepAlive 接口为 Lease 续租，服务端也能够根据此特性探测客户端是否在正常运作。依赖于 Lease 机制的这些特点，也诞生出了很多典型的应用场景，比如本文介绍过的分布式锁、服务注册中心，授权管理等等。</p>
<p>文章中也讲解了 Lease 的用户使用 Lease 过程，以及该过程中一些关键能力是如何实现的，如果想要了解更加详细的代码，也可以参考我们的开源仓库：<a href="https://github.com/xline-kv/Xline">https://github.com/xline-kv/Xline</a> 。</p>`;export{n as assetURLs,o as default,p as metadata,c as toc};

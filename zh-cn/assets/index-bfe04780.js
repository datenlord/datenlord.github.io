const s=[],e={label:"Etcd 客户端缓存实践",description:"Etcd 是一个支持强一致性的分布式 KV 存储，主要用于 metadata 的管理、服务发现、分布式锁等场景。DatenLord 使用 etcd 来管理集群的 metadata，DatenLord 的应用会频繁查询 etcd 中的 metadata，但是极少更改，是典型的读多写少的场景。在使用过程中我们发现一次 etcd 操作带来的网络开销成为了性能瓶颈，所以我们想到通过实现客户端缓存的方式来省去不必要的网络的开销。具体想法是在客户端缓存查询结果，这样每次需要查询 etcd 的时候，如果缓存命中，则只需要访问一次本地内存省掉一次网络开销，如果没有命中，再到 etcd 中查询，并将查询结果加入缓存，这极大地降低了频繁查询 etcd 所带来的开销和延迟。接下来会详细介绍我们的实现和遇到的问题以及解决方案。",location:"浙江",tags:["高性能编程"],date:"2022-06-15",title:"Etcd client cache practice"},a=[{label:"简介和背景",level:2},{label:"Etcd Watch 机制",level:2},{label:"Etcd watch 机制保证",level:2},{label:"Etcd Revision",level:2},{label:"缓存",level:2},{label:"Get 请求",level:2},{label:"Put 请求和 Delete 请求",level:2},{label:"客户端缓存的局限性",level:2},{label:"总结",level:2}],n=`<h2 id="简介和背景">简介和背景</h2>
<p>Etcd 是一个支持强一致性的分布式 KV 存储，主要用于 metadata 的管理、服务发现、分布式锁等场景。DatenLord 使用 etcd 来管理集群的 metadata，DatenLord 的应用会频繁查询 etcd 中的 metadata，但是极少更改，是典型的读多写少的场景。在使用过程中我们发现一次 etcd 操作带来的网络开销成为了性能瓶颈，所以我们想到通过实现客户端缓存的方式来省去不必要的网络的开销。具体想法是在客户端缓存查询结果，这样每次需要查询 etcd 的时候，如果缓存命中，则只需要访问一次本地内存省掉一次网络开销，如果没有命中，再到 etcd 中查询，并将查询结果加入缓存，这极大地降低了频繁查询 etcd 所带来的开销和延迟。接下来会详细介绍我们的实现和遇到的问题以及解决方案。</p>
<h2 id="etcd-watch-机制">Etcd Watch 机制</h2>
<p>在启用缓存之后就会面临本地缓存更新的问题，因为 etcd 是一个分布式的 KV 存储，允许多个客户端并发操作并保证一致性，那么如果其他客户端更新了 etcd 中的数据，那么如何更新本客户端本地缓存中的数据呢？一个方案是定时轮询 etcd 来获取数据更新，但是这个方案有明显弊端，如轮询的间隔设定，如果设置过大将无法及时更新本地缓存，导致长时间拿到旧的数据，如果设置很短，随着本地缓存数据量的增加，逐一轮询会同时增加 etcd 和客户端的负担。</p>
<p>幸运的是 etcd 提供了 watch 机制可以克服轮询方案的弊端。etcd 的 watch 机制允许客户端告诉 etcd 它要关注的 key，如果该 key 有任何修改，etcd 会通知客户端。具体实现方式是在客户端和服务器端建立一个长连接，这个长连接提供了两个功能，1. 客户端会通过这个长连接来告诉 etcd 它要 watch 的 key，以及不再想 watch 某些 key，即对应 WatchCreateRequest 和 WatchCancelRequest。watch 请求可以针对单个 key 或者 prefix。2. watch 请求成功后，只要该 key 或者满足 prefix 的 key 有更新，etcd 就会通过这个长连接以 WatchResponse 的形式通知到客户端。需要注意的是所有的 watch 请求都复用这一条长连接。我们来看一下 <code>WatchCreateRequest</code>，<code>WatchCancelRequest</code>，<code>WatchResponse</code>，<code>Event</code> 的 protobuf 定义：</p>
<pre><code class="hljs language-rust">message WatchCreateRequest {
  bytes key = <span class="hljs-number">1</span>;
  bytes range_end = <span class="hljs-number">2</span>;
  int64 start_revision = <span class="hljs-number">3</span>;
  <span class="hljs-type">bool</span> progress_notify = <span class="hljs-number">4</span>;

  <span class="hljs-keyword">enum</span> <span class="hljs-title class_">FilterType</span> {
    NOPUT = <span class="hljs-number">0</span>;
    NODELETE = <span class="hljs-number">1</span>;
  }
  repeated FilterType filters = <span class="hljs-number">5</span>;
  <span class="hljs-type">bool</span> prev_kv = <span class="hljs-number">6</span>;
}

message WatchCancelRequest {
   int64 watch_id = <span class="hljs-number">1</span>;
}

message WatchResponse {
  ResponseHeader header = <span class="hljs-number">1</span>;
  int64 watch_id = <span class="hljs-number">2</span>;
  <span class="hljs-type">bool</span> created = <span class="hljs-number">3</span>;
  <span class="hljs-type">bool</span> canceled = <span class="hljs-number">4</span>;
  int64 compact_revision = <span class="hljs-number">5</span>;

  repeated mvccpb.Event events = <span class="hljs-number">11</span>;
}

message Event {
  <span class="hljs-keyword">enum</span> <span class="hljs-title class_">EventType</span> {
    PUT = <span class="hljs-number">0</span>;
    DELETE = <span class="hljs-number">1</span>;
  }
  EventType <span class="hljs-keyword">type</span> = <span class="hljs-number">1</span>;
  KeyValue kv = <span class="hljs-number">2</span>;
  KeyValue prev_kv = <span class="hljs-number">3</span>;
}
</code></pre>
<p>具体每个 field 的意义请参考官方文档（etcd3 API | etcd），就不一一解释，这里只介绍我们关心的 field.</p>
<p>首先每一个 <code>WatchCreateRequest</code> 会收到一个 <code>WatchResponse，之后的更新也会以</code> <code>WatchResponse</code> 的形式从 etcd 发送到客户端，<code>WatchResponse</code> 里面包含一个 <code>watch_id</code>，这个 id 代表了该回复对应的 watch，因为所有的 watch 请求都会复用同一个长链接，所以客户端需要自己维护 <code>watched key/prefix</code> 到 <code>watch_id</code> 的 mapping，以便知道这个 <code>WatchResponse</code> 对应的是那个 key 或者 prefix，并且取消 watch 发送的 <code>WatchCancelRequest</code> 也是用 <code>watch_id</code> 作为唯一标识符。</p>
<p>另外一个我们关系的 filed 是 <code>WatchCreateRequest</code> 里的 <code>start_revision</code> 表示客户端希望从 key 的哪一个 revision 开始 watch，etcd 会把从该 revision 开始之后所有的更新都发送给客户端。关于 revision 后面会有详细介绍这里先跳过。</p>
<h2 id="etcd-watch-机制保证">Etcd watch 机制保证</h2>
<p>Etcd watch 机制做出了三条保证，基于这三条保证用户才可以建立一套可靠的应用</p>
<ul>
<li>顺序性：etcd 会按照 revision 的顺序来发送消息，revision 代表了事件发生的先后顺序</li>
<li>可靠性：连续的事件不会丢失，如果收到了发生更晚的事件，那么早于这个事件的事件一定已经被收到</li>
<li>原子性：在同一个 revision 发生的事件不会分成多个消息来发送</li>
</ul>
<h2 id="etcd-revision">Etcd Revision</h2>
<p>Etcd 实现了 MVCC，每当存储的数据发生改变，etcd 就会把全局的 revision 加一来表示产生了一个新的版本，并会保留每一个版本的数据。因为 revision 是全局单调递增的，所以 revision 代表了修改发生的顺序，revision 大的数据一定比 revision 小的数据更新。因为 etcd 保留了每一个 revision 的数据，所以 etcd 支持历史 revision 的查询，前面提到的从 key 的某一个 revision 开始 watch 就是这个原理。etcd 的 KeyValue 定义如下：</p>
<pre><code class="hljs language-rust">message KeyValue {
  bytes key = <span class="hljs-number">1</span>;
  int64 create_revision = <span class="hljs-number">2</span>;
  int64 mod_revision = <span class="hljs-number">3</span>;
  int64 version = <span class="hljs-number">4</span>;
  bytes value = <span class="hljs-number">5</span>;
  int64 lease = <span class="hljs-number">6</span>;
}
</code></pre>
<p>一个 <code>KeyValue</code> 关联了三个版本号，</p>
<ul>
<li>create_revision: 该 key 被创建时的 revision</li>
<li><code>mod_revision</code>：该 key 最后一次被修改时候的 revision</li>
<li><code>version</code>：该 key 在最近一次被创建后经历了多少个版本，每一次修改 version 会加一</li>
</ul>
<p>我们主要使用了 mod_revision，我们可以通过比较同一个 key 的 mod_revision 来知道哪一个值更新。</p>
<p>##　客户端缓存的实现</p>
<p>有了 etcd 的 watch 机制和 revision 我们就可以实现一个客户端的缓存。客户端会维护一个从 key 到 <code>KeyValue</code> 的 hashmap，并通知 etcd 我们需要 watch 这些 key，从而收到数据的更新。</p>
<h2 id="缓存">缓存</h2>
<p>缓存是一个无锁的 hashmap 用于存 key 到 <code>CacheEntry</code> 的映射和一个优先队列用于淘汰缓存。<code>CacheEntry</code> 包含 <code>revision</code> 和 <code>Option&#x3C;KeyValue></code>两个 field，revision 的目的是在多线程并发更新缓存的时候，使用 revision 来保证缓存中的数据是目前最新的，因为 etcd 的 revision 是全局唯一单调递增的，所以对同一个 key 来说，revision 更大的值更新。在更新缓存的时候，会检查自己的 <code>mod_revision</code> 是否比缓存中的 revision 高，如果高则会更新，否则不会更新。使用 <code>Option&#x3C;KeyValue></code>而不是直接用 <code>KeyValue</code> 的目的在后面 Get 请求部分会有介绍。</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">/// Cache entry</span>
<span class="hljs-meta">#[derive(Debug, Clone, PartialEq)]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">CacheEntry</span> {
    <span class="hljs-comment">/// current revision of key in cache</span>
    revision: <span class="hljs-type">i64</span>,
    <span class="hljs-comment">/// key value, None means key has been deleted</span>
    <span class="hljs-comment">/// but watch is not cancelled yet.</span>
    kv: <span class="hljs-type">Option</span>&#x3C;KeyValue>,
}
<span class="hljs-comment">/// Cache struct contains a lock-free hashTable.</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Cache</span> {
    <span class="hljs-comment">/// map to store key value</span>
    hashtable: LockFreeCuckooHash&#x3C;<span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">u8</span>>, CacheEntry>,
    <span class="hljs-comment">/// lru queue of the keys in hashtable.</span>
    lru_queue: Mutex&#x3C;PriorityQueue&#x3C;<span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">u8</span>>, <span class="hljs-type">u64</span>>>,
}
</code></pre>
<h2 id="get-请求">Get 请求</h2>
<p>当客户端执行 Get 请求，它会先查找本地缓存，如果本地缓存命中则直接返回给用户。如果没有命中则会把请求给 etcd，当拿到 etcd 的返回后会做两件事情</p>
<ol>
<li>把拿到的值插入到缓存中，这里就用到了 <code>CacheEntry</code> 中的 revision，如果两个线程同时来缓存查询同一个 key，发现缓存中没有命中，同时将请求发到 etcd，拿到了两个不同的值，那么这两个不同的值会对应不同的 <code>mod_revision</code>，有了 revision 的保证，只有更新的值才会插入到缓存中。</li>
<li>向 etcd 发起对该 key 的 watch 请求，只有当 key 第一次插入缓存的时候才会发起 watch 请求，多个线程同时插入缓存只有一个线程会成功插入，其他线程要么变成更新缓存要么因为 revision 不够高而放弃, 这样就避免的多个线程同时插入缓存产生重复 watch 的情况。在发送 watch 请求的时候会以 <code>key</code> 当前的 <code>mod_revision</code> 作为 <code>WatchCreateRequest</code> 的 <code>start_revision</code>，这样保证了不会丢失在建立 watch 请求过程中该 key 在 etcd 中的修改。</li>
</ol>
<p>因为我们会在 key 被第一次加到缓存中的时候建立对该 key 的 watch，所以为了防止频繁建立取消 watch，在 key 被删掉的时候，我们只是把缓存中该 key 对应的 CacheEntry 中的 kv 置成 None 来表示 key 已经被删掉了，而没有发送 <code>WatchCancelRequest</code> 来取消 watch，这样当 key 被重新在 etcd 中创建的时候，就会收到 watch 更新，不需要重新建立 watch。只有当缓存中的 key 的数量超过阈值的时候，会触发 LRU 回收，发送取消 watch 请求，在收到 etcd 的回复时，再将 key 从缓存中删除。Get 请求的代码如下</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">get</span>(&#x26;<span class="hljs-keyword">self</span>, req: EtcdGetRequest) <span class="hljs-punctuation">-></span> Res&#x3C;EtcdGetResponse> {
    <span class="hljs-comment">// cache is enabled</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(<span class="hljs-keyword">ref</span> kvcache) = <span class="hljs-keyword">self</span>.kvcache {
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(value) = kvcache.<span class="hljs-title function_ invoke__">load</span>().cache.<span class="hljs-title function_ invoke__">search</span>(req.<span class="hljs-title function_ invoke__">get_key</span>()).<span class="hljs-keyword">await</span> {
            <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">response</span> = RangeResponse::<span class="hljs-title function_ invoke__">new</span>();
            response.<span class="hljs-title function_ invoke__">set_count</span>(<span class="hljs-number">1</span>);
            response.<span class="hljs-title function_ invoke__">set_kvs</span>(RepeatedField::<span class="hljs-title function_ invoke__">from_vec</span>(<span class="hljs-built_in">vec!</span>[value]));
            <span class="hljs-keyword">return</span> <span class="hljs-title function_ invoke__">Ok</span>(EtcdGetResponse::<span class="hljs-title function_ invoke__">new</span>(response));
        }
    }

    <span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = retryable!(|| <span class="hljs-keyword">async</span> {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = <span class="hljs-keyword">self</span>.client.<span class="hljs-title function_ invoke__">range_async</span>(&#x26;req.<span class="hljs-title function_ invoke__">clone</span>().<span class="hljs-title function_ invoke__">into</span>())?;
        <span class="hljs-title function_ invoke__">Ok</span>(resp.<span class="hljs-keyword">await</span>?)
    });

    <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(<span class="hljs-keyword">ref</span> kvcache_arc) = <span class="hljs-keyword">self</span>.kvcache {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">kvs</span> = resp.<span class="hljs-title function_ invoke__">get_kvs</span>();
        <span class="hljs-keyword">let</span> <span class="hljs-variable">kvcache</span> = kvcache_arc.<span class="hljs-title function_ invoke__">load</span>();
        <span class="hljs-keyword">for</span> <span class="hljs-variable">kv</span> <span class="hljs-keyword">in</span> kvs {
            <span class="hljs-keyword">let</span> (succeed, is_insert) = kvcache
                .cache
                .<span class="hljs-title function_ invoke__">insert_or_update</span>(kv.<span class="hljs-title function_ invoke__">get_key</span>().<span class="hljs-title function_ invoke__">to_vec</span>(), kv.<span class="hljs-title function_ invoke__">clone</span>())
                .<span class="hljs-keyword">await</span>;
            <span class="hljs-keyword">if</span> succeed &#x26;&#x26; is_insert {
                <span class="hljs-comment">// Creates a new watch request and adds to the send queue.</span>
                <span class="hljs-keyword">let</span> <span class="hljs-variable">watch_request</span> =
                    LocalWatchRequest::<span class="hljs-title function_ invoke__">create</span>(kv.<span class="hljs-title function_ invoke__">get_key</span>().<span class="hljs-title function_ invoke__">to_vec</span>(), kv.<span class="hljs-title function_ invoke__">get_mod_revision</span>());
                <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Err</span>(e) = kvcache.watch_sender.<span class="hljs-title function_ invoke__">send</span>(watch_request).<span class="hljs-keyword">await</span> {
                    warn!(
                        <span class="hljs-string">"Fail to send watch request, the error is {}, restart cache"</span>,
                        e
                    );
                    <span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">restart_kvcache</span>();
                    <span class="hljs-keyword">return</span> <span class="hljs-title function_ invoke__">Err</span>(e.<span class="hljs-title function_ invoke__">into</span>());
                }
                <span class="hljs-comment">// Adjust cache size</span>
                ......
            }
        }
    }
    <span class="hljs-title function_ invoke__">Ok</span>(<span class="hljs-built_in">From</span>::<span class="hljs-title function_ invoke__">from</span>(resp))
}
</code></pre>
<h2 id="put-请求和-delete-请求">Put 请求和 Delete 请求</h2>
<p>Put 请求和 Delete 请求都是修改操作，处理方式基本相同。首先请求会直接发送到 etcd，如果该 key 没有在缓存中，那么直接将请求的回复返回给用户。如果该 key 已经在缓存中了，那么要等到缓存中值更新到当前的值或者更新的值得时候再返回给用户（通过 revision 来保证），因为 Put 请求是一次修改操做，并且我们已经 watch 过该 key 了，那么 etcd 一定会通过 watch 来通知本次更新，甚至更新的修改。这样做的目的是如果不等待缓存更新就直接返回给用户，那么该用户在拿到回复后立即做一次 Get 请求，那么就有几率读到旧的值，仿佛刚刚的 Put 请求没有生效，这个是不符合用户认知的，并会破坏一致性。Put 请求的代码如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">put</span>(&#x26;<span class="hljs-keyword">self</span>, req: EtcdPutRequest) <span class="hljs-punctuation">-></span> Res&#x3C;EtcdPutResponse> {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span>: EtcdPutResponse = retryable!(|| <span class="hljs-keyword">async</span> {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">resp</span> = <span class="hljs-keyword">self</span>.client.<span class="hljs-title function_ invoke__">put_async</span>(&#x26;req.<span class="hljs-title function_ invoke__">clone</span>().<span class="hljs-title function_ invoke__">into</span>())?;
        <span class="hljs-title function_ invoke__">Ok</span>(<span class="hljs-built_in">From</span>::<span class="hljs-title function_ invoke__">from</span>(resp.<span class="hljs-keyword">await</span>?))
    });
    <span class="hljs-comment">// Wait until cache is updated and then return</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(<span class="hljs-keyword">ref</span> kvcache) = <span class="hljs-keyword">self</span>.kvcache {
        <span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(kv) = kvcache.<span class="hljs-title function_ invoke__">load</span>().cache.<span class="hljs-title function_ invoke__">search</span>(req.<span class="hljs-title function_ invoke__">get_key</span>()).<span class="hljs-keyword">await</span> {
            <span class="hljs-keyword">if</span> kv.<span class="hljs-title function_ invoke__">get_mod_revision</span>() >= resp.<span class="hljs-title function_ invoke__">get_revision</span>() {
                <span class="hljs-keyword">break</span>;
            }
            Timer::<span class="hljs-title function_ invoke__">after</span>(Duration::<span class="hljs-title function_ invoke__">from_millis</span>(<span class="hljs-number">1</span>)).<span class="hljs-keyword">await</span>;
        }
    }
    <span class="hljs-title function_ invoke__">Ok</span>(resp)
}
</code></pre>
<h2 id="客户端缓存的局限性">客户端缓存的局限性</h2>
<p>使用客户端缓存后，极大地加速了访问 etcd 的速度，但是这种实现有它的局限性，主要体现在两点：</p>
<ol>
<li>无法支持 prefix 缓存：因为缓存和 etcd 都是以 key-value 的形式来存储数据，一个 prefix 可能会对应任意多个 key，如果想要在缓存中查找 prefix 就需要有和 etcd 一样的全量数据，这个对于缓存是不现实的。所以我们的实现放弃了对 prefix 缓存的支持，所有的针对 prefix 的请求都会直接发到 etcd。</li>
<li>某些场景下会退化成最终一致性：我们在 Put 请求中做了一定的优化来保证一致性，但是还是不能保证所有场景的强一致性。我们来假设这样一个场景，本地主机上有两个进程，分别起了两个客户端，也就对应了两份缓存。线程 1 把 key A 的值从 1 修改到 2，然后通过某种进程间通信机制告诉线程 2 key A 的值已经改成 2 了，这个时候线程 2 去 etcd 查询 key A 的值，如果之前 key A 被缓存过，在 etcd 的 watch 通知到达之前，缓存里的值还是 1，这个时候线程 2 就读到了旧的值，破坏了 etcd 保证的强一致性，但是最终线程 2 的缓存会收到 etcd 的 watch 通知从而更新 key A 的值为 2，这符合最终一致性的要求。</li>
</ol>
<h2 id="总结">总结</h2>
<p>本文介绍了如何基于 etcd 的 watch 机制来实现客户端缓存，有了客户端缓存，极大地降低了访问 etcd 的延迟并提高了吞吐，非常适合读多写少的场景。在获得性能提升的同时，客户端缓存也会带来一致性的问题，请大家根据自己的应用场景来取舍。</p>
<p>详细代码请参考 datenlord/etcd-client，欢迎大家来讨论。</p>`;export{s as assetURLs,n as default,e as metadata,a as toc};

---
label: Etcd 客户端缓存实践
description: Etcd 是一个支持强一致性的分布式 KV 存储，主要用于 metadata 的管理、服务发现、分布式锁等场景。DatenLord 使用 etcd 来管理集群的 metadata，DatenLord 的应用会频繁查询 etcd 中的 metadata，但是极少更改，是典型的读多写少的场景。在使用过程中我们发现一次 etcd 操作带来的网络开销成为了性能瓶颈，所以我们想到通过实现客户端缓存的方式来省去不必要的网络的开销。具体想法是在客户端缓存查询结果，这样每次需要查询 etcd 的时候，如果缓存命中，则只需要访问一次本地内存省掉一次网络开销，如果没有命中，再到 etcd 中查询，并将查询结果加入缓存，这极大地降低了频繁查询 etcd 所带来的开销和延迟。接下来会详细介绍我们的实现和遇到的问题以及解决方案。
location: 浙江
tags: [高性能编程]
---

## 简介和背景

Etcd 是一个支持强一致性的分布式 KV 存储，主要用于 metadata 的管理、服务发现、分布式锁等场景。DatenLord 使用 etcd 来管理集群的 metadata，DatenLord 的应用会频繁查询 etcd 中的 metadata，但是极少更改，是典型的读多写少的场景。在使用过程中我们发现一次 etcd 操作带来的网络开销成为了性能瓶颈，所以我们想到通过实现客户端缓存的方式来省去不必要的网络的开销。具体想法是在客户端缓存查询结果，这样每次需要查询 etcd 的时候，如果缓存命中，则只需要访问一次本地内存省掉一次网络开销，如果没有命中，再到 etcd 中查询，并将查询结果加入缓存，这极大地降低了频繁查询 etcd 所带来的开销和延迟。接下来会详细介绍我们的实现和遇到的问题以及解决方案。

## Etcd Watch 机制

在启用缓存之后就会面临本地缓存更新的问题，因为 etcd 是一个分布式的 KV 存储，允许多个客户端并发操作并保证一致性，那么如果其他客户端更新了 etcd 中的数据，那么如何更新本客户端本地缓存中的数据呢？一个方案是定时轮询 etcd 来获取数据更新，但是这个方案有明显弊端，如轮询的间隔设定，如果设置过大将无法及时更新本地缓存，导致长时间拿到旧的数据，如果设置很短，随着本地缓存数据量的增加，逐一轮询会同时增加 etcd 和客户端的负担。

幸运的是 etcd 提供了 watch 机制可以克服轮询方案的弊端。etcd 的 watch 机制允许客户端告诉 etcd 它要关注的 key，如果该 key 有任何修改，etcd 会通知客户端。具体实现方式是在客户端和服务器端建立一个长连接，这个长连接提供了两个功能，1. 客户端会通过这个长连接来告诉 etcd 它要 watch 的 key，以及不再想 watch 某些 key，即对应 WatchCreateRequest 和 WatchCancelRequest。watch 请求可以针对单个 key 或者 prefix。2. watch 请求成功后，只要该 key 或者满足 prefix 的 key 有更新，etcd 就会通过这个长连接以 WatchResponse 的形式通知到客户端。需要注意的是所有的 watch 请求都复用这一条长连接。我们来看一下 `WatchCreateRequest`，`WatchCancelRequest`，`WatchResponse`，`Event` 的 protobuf 定义：

```rust
message WatchCreateRequest {
  bytes key = 1;
  bytes range_end = 2;
  int64 start_revision = 3;
  bool progress_notify = 4;

  enum FilterType {
    NOPUT = 0;
    NODELETE = 1;
  }
  repeated FilterType filters = 5;
  bool prev_kv = 6;
}

message WatchCancelRequest {
   int64 watch_id = 1;
}

message WatchResponse {
  ResponseHeader header = 1;
  int64 watch_id = 2;
  bool created = 3;
  bool canceled = 4;
  int64 compact_revision = 5;

  repeated mvccpb.Event events = 11;
}

message Event {
  enum EventType {
    PUT = 0;
    DELETE = 1;
  }
  EventType type = 1;
  KeyValue kv = 2;
  KeyValue prev_kv = 3;
}
```

具体每个 field 的意义请参考官方文档（etcd3 API | etcd），就不一一解释，这里只介绍我们关心的 field.

首先每一个 `WatchCreateRequest` 会收到一个 `WatchResponse，之后的更新也会以` `WatchResponse` 的形式从 etcd 发送到客户端，`WatchResponse` 里面包含一个 `watch_id`，这个 id 代表了该回复对应的 watch，因为所有的 watch 请求都会复用同一个长链接，所以客户端需要自己维护 `watched key/prefix` 到 `watch_id` 的 mapping，以便知道这个 `WatchResponse` 对应的是那个 key 或者 prefix，并且取消 watch 发送的 `WatchCancelRequest` 也是用 `watch_id` 作为唯一标识符。

另外一个我们关系的 filed 是 `WatchCreateRequest` 里的 `start_revision` 表示客户端希望从 key 的哪一个 revision 开始 watch，etcd 会把从该 revision 开始之后所有的更新都发送给客户端。关于 revision 后面会有详细介绍这里先跳过。

## Etcd watch 机制保证

Etcd watch 机制做出了三条保证，基于这三条保证用户才可以建立一套可靠的应用

- 顺序性：etcd 会按照 revision 的顺序来发送消息，revision 代表了事件发生的先后顺序
- 可靠性：连续的事件不会丢失，如果收到了发生更晚的事件，那么早于这个事件的事件一定已经被收到
- 原子性：在同一个 revision 发生的事件不会分成多个消息来发送

## Etcd Revision

Etcd 实现了 MVCC，每当存储的数据发生改变，etcd 就会把全局的 revision 加一来表示产生了一个新的版本，并会保留每一个版本的数据。因为 revision 是全局单调递增的，所以 revision 代表了修改发生的顺序，revision 大的数据一定比 revision 小的数据更新。因为 etcd 保留了每一个 revision 的数据，所以 etcd 支持历史 revision 的查询，前面提到的从 key 的某一个 revision 开始 watch 就是这个原理。etcd 的 KeyValue 定义如下：

```rust
message KeyValue {
  bytes key = 1;
  int64 create_revision = 2;
  int64 mod_revision = 3;
  int64 version = 4;
  bytes value = 5;
  int64 lease = 6;
}
```

一个 `KeyValue` 关联了三个版本号，

- create_revision: 该 key 被创建时的 revision
- `mod_revision`：该 key 最后一次被修改时候的 revision
- `version`：该 key 在最近一次被创建后经历了多少个版本，每一次修改 version 会加一

我们主要使用了 mod_revision，我们可以通过比较同一个 key 的 mod_revision 来知道哪一个值更新。

##　客户端缓存的实现

有了 etcd 的 watch 机制和 revision 我们就可以实现一个客户端的缓存。客户端会维护一个从 key 到 `KeyValue` 的 hashmap，并通知 etcd 我们需要 watch 这些 key，从而收到数据的更新。

## 缓存

缓存是一个无锁的 hashmap 用于存 key 到 `CacheEntry` 的映射和一个优先队列用于淘汰缓存。`CacheEntry` 包含 `revision` 和 `Option<KeyValue>`两个 field，revision 的目的是在多线程并发更新缓存的时候，使用 revision 来保证缓存中的数据是目前最新的，因为 etcd 的 revision 是全局唯一单调递增的，所以对同一个 key 来说，revision 更大的值更新。在更新缓存的时候，会检查自己的 `mod_revision` 是否比缓存中的 revision 高，如果高则会更新，否则不会更新。使用 `Option<KeyValue>`而不是直接用 `KeyValue` 的目的在后面 Get 请求部分会有介绍。

```rust
/// Cache entry
#[derive(Debug, Clone, PartialEq)]
pub struct CacheEntry {
    /// current revision of key in cache
    revision: i64,
    /// key value, None means key has been deleted
    /// but watch is not cancelled yet.
    kv: Option<KeyValue>,
}
/// Cache struct contains a lock-free hashTable.
pub struct Cache {
    /// map to store key value
    hashtable: LockFreeCuckooHash<Vec<u8>, CacheEntry>,
    /// lru queue of the keys in hashtable.
    lru_queue: Mutex<PriorityQueue<Vec<u8>, u64>>,
}
```

## Get 请求

当客户端执行 Get 请求，它会先查找本地缓存，如果本地缓存命中则直接返回给用户。如果没有命中则会把请求给 etcd，当拿到 etcd 的返回后会做两件事情

1. 把拿到的值插入到缓存中，这里就用到了 `CacheEntry` 中的 revision，如果两个线程同时来缓存查询同一个 key，发现缓存中没有命中，同时将请求发到 etcd，拿到了两个不同的值，那么这两个不同的值会对应不同的 `mod_revision`，有了 revision 的保证，只有更新的值才会插入到缓存中。
2. 向 etcd 发起对该 key 的 watch 请求，只有当 key 第一次插入缓存的时候才会发起 watch 请求，多个线程同时插入缓存只有一个线程会成功插入，其他线程要么变成更新缓存要么因为 revision 不够高而放弃, 这样就避免的多个线程同时插入缓存产生重复 watch 的情况。在发送 watch 请求的时候会以 `key` 当前的 `mod_revision` 作为 `WatchCreateRequest` 的 `start_revision`，这样保证了不会丢失在建立 watch 请求过程中该 key 在 etcd 中的修改。

因为我们会在 key 被第一次加到缓存中的时候建立对该 key 的 watch，所以为了防止频繁建立取消 watch，在 key 被删掉的时候，我们只是把缓存中该 key 对应的 CacheEntry 中的 kv 置成 None 来表示 key 已经被删掉了，而没有发送 `WatchCancelRequest` 来取消 watch，这样当 key 被重新在 etcd 中创建的时候，就会收到 watch 更新，不需要重新建立 watch。只有当缓存中的 key 的数量超过阈值的时候，会触发 LRU 回收，发送取消 watch 请求，在收到 etcd 的回复时，再将 key 从缓存中删除。Get 请求的代码如下

```rust
pub async fn get(&self, req: EtcdGetRequest) -> Res<EtcdGetResponse> {
    // cache is enabled
    if let Some(ref kvcache) = self.kvcache {
        if let Some(value) = kvcache.load().cache.search(req.get_key()).await {
            let mut response = RangeResponse::new();
            response.set_count(1);
            response.set_kvs(RepeatedField::from_vec(vec![value]));
            return Ok(EtcdGetResponse::new(response));
        }
    }

    let resp = retryable!(|| async {
        let resp = self.client.range_async(&req.clone().into())?;
        Ok(resp.await?)
    });

    if let Some(ref kvcache_arc) = self.kvcache {
        let kvs = resp.get_kvs();
        let kvcache = kvcache_arc.load();
        for kv in kvs {
            let (succeed, is_insert) = kvcache
                .cache
                .insert_or_update(kv.get_key().to_vec(), kv.clone())
                .await;
            if succeed && is_insert {
                // Creates a new watch request and adds to the send queue.
                let watch_request =
                    LocalWatchRequest::create(kv.get_key().to_vec(), kv.get_mod_revision());
                if let Err(e) = kvcache.watch_sender.send(watch_request).await {
                    warn!(
                        "Fail to send watch request, the error is {}, restart cache",
                        e
                    );
                    self.restart_kvcache();
                    return Err(e.into());
                }
                // Adjust cache size
                ......
            }
        }
    }
    Ok(From::from(resp))
}
```

## Put 请求和 Delete 请求

Put 请求和 Delete 请求都是修改操作，处理方式基本相同。首先请求会直接发送到 etcd，如果该 key 没有在缓存中，那么直接将请求的回复返回给用户。如果该 key 已经在缓存中了，那么要等到缓存中值更新到当前的值或者更新的值得时候再返回给用户（通过 revision 来保证），因为 Put 请求是一次修改操做，并且我们已经 watch 过该 key 了，那么 etcd 一定会通过 watch 来通知本次更新，甚至更新的修改。这样做的目的是如果不等待缓存更新就直接返回给用户，那么该用户在拿到回复后立即做一次 Get 请求，那么就有几率读到旧的值，仿佛刚刚的 Put 请求没有生效，这个是不符合用户认知的，并会破坏一致性。Put 请求的代码如下：

```rust
pub async fn put(&self, req: EtcdPutRequest) -> Res<EtcdPutResponse> {
    let resp: EtcdPutResponse = retryable!(|| async {
        let resp = self.client.put_async(&req.clone().into())?;
        Ok(From::from(resp.await?))
    });
    // Wait until cache is updated and then return
    if let Some(ref kvcache) = self.kvcache {
        while let Some(kv) = kvcache.load().cache.search(req.get_key()).await {
            if kv.get_mod_revision() >= resp.get_revision() {
                break;
            }
            Timer::after(Duration::from_millis(1)).await;
        }
    }
    Ok(resp)
}
```

## 客户端缓存的局限性

使用客户端缓存后，极大地加速了访问 etcd 的速度，但是这种实现有它的局限性，主要体现在两点：

1. 无法支持 prefix 缓存：因为缓存和 etcd 都是以 key-value 的形式来存储数据，一个 prefix 可能会对应任意多个 key，如果想要在缓存中查找 prefix 就需要有和 etcd 一样的全量数据，这个对于缓存是不现实的。所以我们的实现放弃了对 prefix 缓存的支持，所有的针对 prefix 的请求都会直接发到 etcd。
2. 某些场景下会退化成最终一致性：我们在 Put 请求中做了一定的优化来保证一致性，但是还是不能保证所有场景的强一致性。我们来假设这样一个场景，本地主机上有两个进程，分别起了两个客户端，也就对应了两份缓存。线程 1 把 key A 的值从 1 修改到 2，然后通过某种进程间通信机制告诉线程 2 key A 的值已经改成 2 了，这个时候线程 2 去 etcd 查询 key A 的值，如果之前 key A 被缓存过，在 etcd 的 watch 通知到达之前，缓存里的值还是 1，这个时候线程 2 就读到了旧的值，破坏了 etcd 保证的强一致性，但是最终线程 2 的缓存会收到 etcd 的 watch 通知从而更新 key A 的值为 2，这符合最终一致性的要求。

## 总结

本文介绍了如何基于 etcd 的 watch 机制来实现客户端缓存，有了客户端缓存，极大地降低了访问 etcd 的延迟并提高了吞吐，非常适合读多写少的场景。在获得性能提升的同时，客户端缓存也会带来一致性的问题，请大家根据自己的应用场景来取舍。

详细代码请参考 datenlord/etcd-client，欢迎大家来讨论。

---
label: 无锁化编程场景下的垃圾回收机制（二）
description: 上一篇推文介绍了无锁化编程场景下的一种垃圾回收机制，Epoch-based Memory Reclaimation（EB)。本篇介绍另一种无锁化编程场景下的垃圾回收机制，Hazard Pointer（HP）。HP也是一种确定型GC。
location: 浙江
tags: [高性能编程]
---

上一篇推文介绍了无锁化编程场景下的一种垃圾回收机制，Epoch-based Memory Reclaimation（EB)。本篇介绍另一种无锁化编程场景下的垃圾回收机制，Hazard Pointer（HP）。HP 也是一种确定型 GC。

HP 的内存回收方法比较简单：对无锁化编程场景下的每个线程，需要显式标注出该线程要竞争访问的共享对象，即线程把要竞争访问的对象的指针标注为危险指针（Hazard Pointer）， 访问结束后或取消标注该危险指针、或标注该危险指针指向的共享对象为待回收。在回收内存时，HP 判断每个待回收的共享对象是否可以安全回收，只需要检查该对象的指针是否正被某个线程标注为危险指针，如果没有就能回收，否则不能回收。HP 跟 EB 一样也是采用空间换时间的策略，并不是马上回收每个可以被回收的共享对象，而是批量回收，以减少内存回收对程序性能的影响。

## 确定型 GC 算法 Hazard Pointer（HP）

继续沿用无锁化堆栈作为例子来展示 HP 的用法，然后再介绍 HP 的细节。

## Hazard Pointer（HP）的用法

采用 HP 作为 GC 的无锁化堆栈的入栈和出栈操作实现如下所示。

```c++
struct Node {
    void* data;
    std::atomic< Node * > next;
};

std::atomic<Node *> top; // 栈顶
top.store( nullptr ); // 初始化栈顶为空指针

bool push( Node* new_node ) {
    // 线程本地的危险指针队列里新增一个危险指针
    HP * hazard_cur_top = LocalHP::new_hp();

    while ( true ) {
        Node * cur_top = top.load();

        // 标注当前栈顶指针cur_top为危险指针
        hazard_cur_top.set(cur_top);

        new_node->next.store( cur_top );

        // CAS调用修改栈顶
        if ( top.compare_exchange_weak(
                cur_top, new_node )) {
            break; // 修改栈顶成功
        }
    }

    // 入栈操作成功，取消标注cur_top为危险指针
    hazard_cur_top.set(nullptr);
    return true;
}

Node * pop() {
    // 线程本地的危险指针队列里新增两个危险指针
    HP * hazard_cur_top = LocalHP::new_hp();
    HP * hazard_next = LocalHP::new_hp();

    while ( true ) {
        Node * cur_top = top.load();
        if ( cur_top == nullptr ) {
            break; // 堆栈为空
        }

        // 标注当前栈顶指针cur_top为危险指针
        hazard_cur_top.set(cur_top);

        Node * next = cur_top->next.load();

        // 标注当前栈顶的下一节点指针next为危险指针
        hazard_next.set(cur_top);

        // CAS调用修改栈顶
        if ( top.compare_exchange_weak(
                cur_top, next )) {
            break; // 修改栈顶成功
        }
    }

    if ( cur_top != nullptr ) {
        // 出栈操作成功，标注cur_top为待回收对象
        hazard_cur_top.maybe_reclaim();
    } else {
        // 栈为空，取消标注cur_top为危险指针
        hazard_cur_top.set(nullptr);
    }

    // 出栈操作结束，取消标注next为危险指针
    hazard_next.set(nullptr);

    return cur_top;
}
```

上面的实现可以看出，入栈操作和出栈操作有不同的危险指针。对于入栈操作：

- 入栈操作只修改堆栈的当前栈顶指针，因此只需要标注一个危险指针，即当前栈顶为危险指针；
- 入栈操作里每次循环，会更新栈顶指针，同时也要更新危险指针，即只把最新的栈顶指针标注为危险指针；
- 入栈操作成功后，取消标注该危险指针，因为原栈顶节点还在堆栈里，不能被回收，即入栈操作不产生待回收对象。

  对于出栈操作：

- 出栈操作会修改堆栈的当前栈顶指针以及栈顶的下一节点指针，因此要标注两个危险指针；
- 出栈操作里每次循环，要更新栈顶指针和栈顶的下一节点指针，同时也要更新对应的两个危险指针；
- 如果出栈操作失败，即堆栈为空，则取消标注这两个危险指针；
- 如果出栈操作成功，要标注当前栈顶指针为待回收对象，并取消标注栈顶的下一节点指针为危险指针。

## HP 如何安全回收内存？

为什么 HP 能保证安全回收内存呢？这里我们只考虑出栈操作，因为入栈操作不涉及内存回收。

假定有两个线程 A 和 B 同时调用无锁化堆栈的出栈操作，这两个线程都读取了当前栈顶指针 cur_top， 这时线程 A 被抢占导致休眠，线程 B 继续执行出栈操作并成功取出 cur_top 指向的栈顶节点。线程 B 由于成功执行出栈操作而标注 cur_top 指向的原栈顶节点为待回收对象，但是此时尚不能回收 cur_top， 因为线程 A 还未执行完毕出栈操作，即线程 A 标注 cur_top 为危险指针。只有等线程 A 恢复执行后，发现 cur_top 已经不是最新的栈顶指针，更新了栈顶指针并更新了对应的危险指针之后，才能安全回收原栈顶节点的内存。

由此可见，HP 判断共享对象是否可回收的方法和上一篇推文里介绍的 EB 不一样。EB 是标注出每个线程对共享对象的访问阶段，有点像是标注出临界区，不同的访问阶段产生不同的待回收对象指针，然后回收处于最老阶段的待回收对象的内存；HP 是标注出每个线程要修改的共享对象的指针，而不是标注出临界区，因此 HP 标注的粒度更细。但是 HP 和 EB 的回收策略相似，都是批量回收。

## Hazard Pointer（HP）的实现

HP 的实现比较直观，简单描述下 HP 的实现机制：

- 每个线程维护一个本地队列 LocalHP，用于保存线程本地标注的危险指针；
- 再维护一个全局队列 GlobalHP，用于保存待回收对象指针；
- 每次线程调用 maybe_reclaim()标注某个危险指针为待回收对象时，把该待回收对象从本地队列推送到全局队列；
- 如果调用 maybe_reclaim()推送待回收对象时，发现全局队列已满，则触发内存回收，即逐个检查全局队列里每个待回收对象是否可回收，同时回收可回收对象的内存并从全局队列中删除之。

可见 HP 也是确定型 GC，内存回收发生在调用 maybe_reclaim()且全局队列已满时。此外，`LocalHP` 和 `GlobalHP` 要采用无锁化队列，来保证 HP 的实现也是无锁的

HP 虽然比较简单直观，但是 HP 在内存回收时的开销比 EB 大， 因为 HP 要逐个判断全局队列里每个待回收对象是否可回收，即检查每个待回收对象的指针是否有被某个线程正标注为危险指针，如果待回收对象比较多，而且线程也比较多，那检查工作量会比较大；而 EB 在回收内存时，一股脑回收处于最老阶段的所有待回收对象，每个待回收对象在回收前已经关联了其产生的阶段，回收时无需挨个检查每个待回收对象。  
libcds 里已经有 HP 的 C++实现，开发者无需自行实现 HP。

const s="/datenlord-web-zh/assets/cover-2bc22b2e.jpg",a="/datenlord-web-zh/assets/image1-460865eb.png",n=[s,a],e={label:"如何优雅地组织Rust项目中的异步代码？",description:"很多使用过Async Rust的人都可能有过被其要求的约束所困扰的经历，例如，spawned task有'static的要求，MutexGuard不能跨越.await，等等。克服这些约束需要仔细地设计代码结构，很可能会导致晦涩和嵌套的代码，这对开发人员和审查人员都是一种挑战。在这篇文章中，我将首先列出我在编写async Rust代码时的一些痛点。然后，我将指出我们真正需要异步代码的场景，并讨论为什么我们应该把异步和非异步代码分开。最后，我将展示我是如何在最近的一次Curp重构中实践这一原则的。",cover:"./cover.jpg",location:"中国香港",author:["陈天予"],tags:["Rust"],date:"2023-04-20",title:"How to elegantly organize asynchronous code in a Rust project"},l=[{label:"概 要",level:2},{label:"痛 点",level:2},{label:"Spawned Task 必须是'static",level:3},{label:"非 Send 的变量的持有不可以跨越.await 点",level:3},{label:"使用异步 Rust 的场景和组织方式",level:2},{label:"I/O",level:3},{label:"后台任务",level:3},{label:"并发任务",level:3},{label:"依赖等待",level:3},{label:"关于 Curp 的一次大型重构",level:2},{label:"我们的项目：Xline",level:2}],t=`<p><img src="${s}" alt="图片"></p>
<h2 id="概-要">概 要</h2>
<p>很多使用过 Async Rust 的人都可能有过被其要求的约束所困扰的经历，例如，<code>spawned task</code> 有<code>'static</code> 的要求，<code>MutexGuard</code> 不能跨越<code>.await</code>，等等。克服这些约束需要仔细地设计代码结构，很可能会导致晦涩和嵌套的代码，这对开发人员和审查人员都是一种挑战。在这篇文章中，我将首先列出我在编写 async Rust 代码时的一些痛点。然后，我将指出我们真正需要异步代码的场景，并讨论为什么我们应该把异步和非异步代码分开。最后，我将展示我是如何在最近的一次 Curp 重构中实践这一原则的。</p>
<h2 id="痛-点">痛 点</h2>
<h3 id="spawned-task-必须是&#x27;static">Spawned Task 必须是'static</h3>
<p>在 spawn 一个新的 async task 的时候，编译器并不知道该 task 会被执行多久，可能很短暂，也可能会一直执行至程序运行结束。所以，编译器会要求该 task 所含的所有类型都拥有<code>'static</code> 的生命周期。</p>
<p>这样的限制使得我们常常能在 spawn 前看到不少的 clone 代码。当然，这些代码从某种角度来讲可以帮助程序员更好地理清哪些变量的所有权是要被移交给新的 task 的，但同时，也会使得代码看上去很啰嗦，不够简洁。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">a_arc</span> = Arc::<span class="hljs-title function_ invoke__">clone</span>(&#x26;a);
<span class="hljs-keyword">let</span> <span class="hljs-variable">b_arc</span> = Arc::<span class="hljs-title function_ invoke__">clone</span>(&#x26;b);
tokio::<span class="hljs-title function_ invoke__">spawn</span>(<span class="hljs-keyword">async</span> <span class="hljs-keyword">move</span> {
    <span class="hljs-comment">// ...</span>
});
</code></pre>
<h3 id="非-send-的变量的持有不可以跨越.await-点">非 Send 的变量的持有不可以跨越.await 点</h3>
<p>这点限制背后的原因 tokio 的 task 并不是固定在一个线程上执行的，空闲线程会主动“偷取”忙碌线程的 task，这就需要 task 可以被 <code>Send</code>。</p>
<p>请看下面一段代码：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">log_l</span> = log.<span class="hljs-title function_ invoke__">lock</span>();
log_l.<span class="hljs-title function_ invoke__">append</span>(new_entry.<span class="hljs-title function_ invoke__">clone</span>());
<span class="hljs-title function_ invoke__">broadcast</span>(new_entry).<span class="hljs-keyword">await</span>;
</code></pre>
<p>尝试编译后，会发现报错：<code>log_l</code> 不能跨越<code>.await</code> 点持有。</p>
<p>自然，为了使得拿着锁的 critical section 尽量地短，我们不需要拿着锁过<code>.await</code> 点，所以我们在其中加一行放锁的代码：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">log_l</span> = log.<span class="hljs-title function_ invoke__">lock</span>();
log_l.<span class="hljs-title function_ invoke__">append</span>(new_entry.<span class="hljs-title function_ invoke__">clone</span>());
<span class="hljs-title function_ invoke__">drop</span>(log_l);
<span class="hljs-title function_ invoke__">broadcast</span>(new_entry).<span class="hljs-keyword">await</span>;
</code></pre>
<p>很可惜，还是不能通过编译，这是因为编译器目前只能通过计算代码 Scope 的方式来判断一个 task 是否可以被 <code>Send</code>。如果说上一个痛点还有一定的好处，那么这个问题就纯粹来源于编译器的限制了。所以我们必须把代码改成这个样子：</p>
<pre><code class="hljs language-rust">{
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">log_w</span> = log.<span class="hljs-title function_ invoke__">write</span>();
    log_w.<span class="hljs-title function_ invoke__">append</span>(new_entry.<span class="hljs-title function_ invoke__">clone</span>());
}
<span class="hljs-title function_ invoke__">broadcast</span>(new_entry).<span class="hljs-keyword">await</span>;
</code></pre>
<p>如果一个函数中有需要拿多把锁，又有很多的异步调用，代码就会嵌套起来，变得复杂晦涩。Side Note: 我们知道 tokio 自己有个异步的锁 <code>tokio::sync::Mutex</code>，它是可以被 hold 过<code>.await</code> 的。但要注意的是，大多数情况下，我们并不会需要异步锁，因为异步锁通常意味着拿着锁的 critical section 是会非常长的。所以，如果我们需要在异步代码中拿锁，不要不加思索地使用异步锁，事实上，在 tokio 官方文档中，也是更加建议使用同步锁的。</p>
<h2 id="使用异步-rust-的场景和组织方式">使用异步 Rust 的场景和组织方式</h2>
<p>如果我们经常在项目开发中遇到上述问题，自然就会开始思考其产生的原因以及该怎样避免。我认为一个很重要的因素就是没有把 async 和非 async 的代码给分开，或者说，更本质的原因是我们没有在设计项目架构的时候将需要 async 的部分和不需要 async 的部分分开。所以接下来，我将梳理我们什么时候才能真正地用到 Async Rust？</p>
<h3 id="i/o">I/O</h3>
<p>当我们进行比较耗时的 I/O 操作，我们不想让这些操作 block 住我们当前的线程。所以我们用异步 I/O，当运行到 await 的时候，I/O 就可以到后台去做，让其它的 task 执行。</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// .await will enable other scheduled tasks to progress</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">file</span> = File::<span class="hljs-title function_ invoke__">create</span>(“foo.txt”).<span class="hljs-keyword">await</span>?;

file.<span class="hljs-title function_ invoke__">write</span>(<span class="hljs-string">b"some bytes"</span>).<span class="hljs-keyword">await</span>?;
</code></pre>
<h3 id="后台任务">后台任务</h3>
<p>后台任务的 task 通常会伴随着一个 channel 的接收端出现。</p>
<pre><code class="hljs language-rust">tokio::<span class="hljs-title function_ invoke__">spawn</span>(<span class="hljs-keyword">async</span> <span class="hljs-keyword">move</span> {
    <span class="hljs-keyword">while</span> <span class="hljs-keyword">let</span> <span class="hljs-variable">Some</span>(job) = rx.<span class="hljs-title function_ invoke__">recv</span>().<span class="hljs-keyword">await</span> {
        <span class="hljs-comment">// ...</span>
    }
};
</code></pre>
<h3 id="并发任务">并发任务</h3>
<p>并发地 spawn 多个 task 可以更高效地利用多核处理器。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">chunks</span> = data.<span class="hljs-title function_ invoke__">chunks</span>(data.<span class="hljs-title function_ invoke__">len</span>() / N_TASKS);
<span class="hljs-keyword">for</span> <span class="hljs-variable">chunk</span> <span class="hljs-keyword">in</span> chunks {
  tokio::<span class="hljs-title function_ invoke__">spawn</span>(<span class="hljs-title function_ invoke__">work_on</span>(chunk));
}
</code></pre>
<h3 id="依赖等待">依赖等待</h3>
<p>使用<code>.await</code> 等待依赖。这种使用相对较少一些。</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// wait for some event</span>
event.<span class="hljs-title function_ invoke__">listen</span>().<span class="hljs-keyword">await</span>;

<span class="hljs-comment">// barrier</span>
barrier.<span class="hljs-title function_ invoke__">wait</span>().<span class="hljs-keyword">await</span>;
</code></pre>
<p>可以看到，使用 Async 代码的地方，主要集中在 I/O、并发与后台任务。在开发之前，我们也不妨有意识地去分离项目中的 async 与 sync 部分：缩小 Async 部分的函数，将处理逻辑移动至普通函数中。将这两部分分离，不仅可以缓解文章开头所说的痛点，更可以帮我理清代码结构。</p>
<pre><code class="hljs language-rust">{
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">log_w</span> = log.<span class="hljs-title function_ invoke__">write</span>();
    log_w.<span class="hljs-title function_ invoke__">append</span>(new_entry.<span class="hljs-title function_ invoke__">clone</span>());
    <span class="hljs-comment">// ...</span>
}
<span class="hljs-title function_ invoke__">broadcast</span>(new_entry).<span class="hljs-keyword">await</span>;

<span class="hljs-comment">// move the logic to another function instead</span>

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">update_log</span>(log: &#x26;<span class="hljs-keyword">mut</span> Log, new_entry: Entry) {
    log.<span class="hljs-title function_ invoke__">append</span>(new_entry);
    <span class="hljs-comment">// ...</span>
}

<span class="hljs-title function_ invoke__">update_log</span>(&#x26;<span class="hljs-keyword">mut</span> log.<span class="hljs-title function_ invoke__">write</span>(), new_entry.<span class="hljs-title function_ invoke__">clone</span>());
<span class="hljs-title function_ invoke__">broadcast</span>(new_entry).<span class="hljs-keyword">await</span>;
</code></pre>
<h2 id="关于-curp-的一次大型重构">关于 Curp 的一次大型重构</h2>
<p>在重构之前，由于一次次的迭代，代码的可读性和结构变得越来越差。具体来说，由于我们有若干个带锁结构需要在 curp server 的各个部分中共享，而 curp server 的大部分函数又是 async 的，async 和拿锁的代码混杂在一起，就导致了我们常常在开发过程中遇到上述痛点。</p>
<p>所以，我们重新调整了 curp server 的结构，将其分为了 async 部分的 <code>CurpNode</code> 和非 async 部分的 <code>RawCurp</code>：<code>CurpNode</code> 包括了异步 IO（接收，发送网络请求，数据持久化），后台任务（定时检查 leader 活性，leader 在每个节点上复制数据、校准各 follower）；<code>RawCurp</code> 可被视为一个状态机，它接收来自 <code>CurpNode</code> 的调用，并更新状态。如果 <code>RawCurp</code> 想要做一些异步操作（比如广播心跳），它就可以通过返回值让 <code>CurpNode</code> 去替它发请求。</p>
<p><img src="${a}" alt="图片"></p>
<p>举一个 tick task 的例子，在未 refactor 之前，由于我们不能 <code>LockGuard</code> 不能过<code>.await</code> 点，以及有多逻辑分支的限制，不得不将代码组织成这样的一个形式:</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">loop</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">_now</span> = ticker.<span class="hljs-title function_ invoke__">tick</span>().<span class="hljs-keyword">await</span>;
    <span class="hljs-keyword">let</span> <span class="hljs-variable">task</span> = {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">state_c</span> = Arc::<span class="hljs-title function_ invoke__">clone</span>(&#x26;state);
        <span class="hljs-keyword">let</span> <span class="hljs-variable">state_r</span> = state.<span class="hljs-title function_ invoke__">upgradable_read</span>();
        <span class="hljs-keyword">if</span> state_r.<span class="hljs-title function_ invoke__">is_leader</span>() {
            <span class="hljs-keyword">if</span> state_r.needs_hb
            {
                <span class="hljs-keyword">let</span> <span class="hljs-variable">resps</span> = <span class="hljs-title function_ invoke__">bcast_heartbeats</span>(connects.<span class="hljs-title function_ invoke__">clone</span>(), state_r, rpc_timeout);
                Either::<span class="hljs-title function_ invoke__">Left</span>(<span class="hljs-title function_ invoke__">handle_heartbeat_responses</span>(
                    resps,
                    state_c,
                    Arc::<span class="hljs-title function_ invoke__">clone</span>(&#x26;timeout),
                ))
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">continue</span>;
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">state_w</span> = RwLockUgradableReadGuard::<span class="hljs-title function_ invoke__">upgrade</span>(state_r);
            <span class="hljs-comment">// ...</span>
            <span class="hljs-keyword">let</span> <span class="hljs-variable">resps</span> = <span class="hljs-title function_ invoke__">bcast_votes</span>(connects.<span class="hljs-title function_ invoke__">clone</span>(), state_r, rpc_timeout);
            Either::<span class="hljs-title function_ invoke__">Right</span>(<span class="hljs-title function_ invoke__">handle_vote_responses</span>(resps, state_c))
        }
    };
    task.<span class="hljs-keyword">await</span>;
}
</code></pre>
<p>在 refactor 之后，处理逻辑都被放在了 <code>RawCurp</code> 中，<code>CurpNode</code> 中的代码就清晰多了：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">loop</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">_now</span> = ticker.<span class="hljs-title function_ invoke__">tick</span>().<span class="hljs-keyword">await</span>;
    <span class="hljs-keyword">let</span> <span class="hljs-variable">action</span> = curp.<span class="hljs-title function_ invoke__">tick</span>();
    <span class="hljs-keyword">match</span> action {
        TickAction::<span class="hljs-title function_ invoke__">Heartbeat</span>(hbs) => {
            <span class="hljs-keyword">Self</span>::<span class="hljs-title function_ invoke__">bcast_heartbeats</span>(Arc::<span class="hljs-title function_ invoke__">clone</span>(&#x26;curp), &#x26;connects, hbs).<span class="hljs-keyword">await</span>;
        }
        TickAction::<span class="hljs-title function_ invoke__">Votes</span>(votes) => {
            <span class="hljs-keyword">Self</span>::<span class="hljs-title function_ invoke__">bcast_votes</span>(Arc::<span class="hljs-title function_ invoke__">clone</span>(&#x26;curp), &#x26;connects, votes).<span class="hljs-keyword">await</span>;
        }
        TickAction::Nothing => {}
    }
}
</code></pre>
<h2 id="我们的项目：xline">我们的项目：Xline</h2>
<p>**Xline 是一个用于元数据管理的分布式 KV 存储。**以上为对 Xline 中使用的 Curp 共识协议的重构总结。</p>
<p>如果你想了解更多关于Xline的信息，请参考我们的Github：<br>
<a href="https://github.com/datenlord/Xline">https://github.com/datenlord/Xline</a></p>`;export{n as assetURLs,t as default,e as metadata,l as toc};

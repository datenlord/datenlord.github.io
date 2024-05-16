const s="/zh-cn/assets/cover-bb683e66.webp",a="/zh-cn/assets/image1-67dc5aad.webp",l="/zh-cn/assets/image2-5e5cc8ab.webp",n=[s,a,l],p={label:"常见设计模式及其Rust实现",description:"本文提供了一个设计模式的综合概述，涵盖了设计模式的必要性，基本原则以及23种常见模式的概括性描述。结合Rust语言自身的特性，重点阐述了Rust中Builder，Combinator，RAII,Typestate(state machine), Command, Strategy和Visitor七种设计模式的应用。本文前半部分主要在阐述设计模式的思想和具体实例，如果读者已经很熟悉这一部分，可以自行跳转到第二小节。",cover:"./cover.webp",location:"中国香港",author:["邱奇琛"],date:"2024-04-25",title:"Common Design Patterns and Their Rust Implementations"},e=[{label:"速览设计模式",level:2},{label:"为什么需要设计模式",level:3},{label:"设计模式中的基本原则",level:3},{label:"常见设计模式",level:3},{label:"Rust 中设计模式的应用",level:2},{label:"Builder",level:3},{label:"Combinator",level:3},{label:"RAII",level:3},{label:"Typestate",level:3},{label:"Command",level:3},{label:"Strategy",level:3},{label:"Visitor",level:3},{label:"参考",level:2}],t=`<p><img src="${s}" alt="封面"></p>
<p>本文提供了一个设计模式的综合概述，涵盖了设计模式的必要性，基本原则以及 23 种常见模式的概括性描述。结合 Rust 语言自身的特性，重点阐述了 Rust 中 Builder，Combinator，RAII,Typestate(state machine), Command, Strategy 和 Visitor 七种设计模式的应用。本文前半部分主要在阐述设计模式的思想和具体实例，如果读者已经很熟悉这一部分，可以自行跳转到第二小节。</p>
<h2 id="速览设计模式">速览设计模式</h2>
<h3 id="为什么需要设计模式">为什么需要设计模式</h3>
<ul>
<li><strong>减小代码的耦合程度</strong></li>
</ul>
<p>低耦合度的系统更易于管理和扩展，同时降低了修改一个组件时影响其他组件的风险。具体来说，低耦合的系统能够更方便添加新的功能，也有益于单元测试的划分。</p>
<ul>
<li><strong>良好的编程范式有利于避免一些逻辑错误</strong></li>
</ul>
<p>设计模式提供了一套经过验证的最佳实践，帮助程序员遵循良好的编程原则，如单一责任原则和开闭原则等。这些原则和模式指导开发者如何正确地组织代码结构和逻辑，从而减少编程中可能出现的逻辑错误。例如，在状态机模式中，使用者不能调用非当前状态的方法；在 RAII 模式中，资源会在变量被释放时自动释放。</p>
<ul>
<li><strong>有利于代码复用</strong></li>
</ul>
<p>设计模式鼓励使用通用的方法来解决相似问题。这种方式使得核心算法的设计得以复用，而具体的步骤可以根据不同的需求进行调整和重用。</p>
<h3 id="设计模式中的基本原则">设计模式中的基本原则</h3>
<p>设计模式中著名的 SOLID 原则概括了面向对象设计的五个基本法则，帮助开发者构建更健壮、灵活的系统。在设计代码架构时，开发者不应仅限于应用常见的设计模式，而应深入理解并实践 SOLID 的核心思想。</p>
<ul>
<li><strong>单一职责 (Single Responsibility Principle, SRP)</strong></li>
</ul>
<p>每个类应只有一个引起变化的原因，即一个类应只负责一项任务或功能。</p>
<ul>
<li><strong>开闭原则 (Open/Closed Principle, OCP)</strong></li>
</ul>
<p>软件实体（如类、模块、函数等）应对扩展开放，对修改关闭。这通常通过使用接口或抽象类实现，允许通过添加新的子类来扩展功能，而不需修改现有代码。</p>
<ul>
<li><strong>里氏替换 (Liskov Substitution Principle, LSP)</strong></li>
</ul>
<p>子类对象应能够替换它们的父类对象而不破坏程序的正确性。设计子类时，应保证能够替代父类功能，不引入额外异常行为或削弱原有功能。</p>
<ul>
<li><strong>接口隔离 (Interface Segregation Principle, ISP)</strong></li>
</ul>
<p>应将大接口（提供多功能的接口）拆分为更小、更具体的接口，使实现接口的类只需关心它们真正需要的方法。</p>
<ul>
<li><strong>依赖倒置(Dependency Inversion Principle, DIP)</strong></li>
</ul>
<p>高层模块不应依赖于低层模块，两者都应依赖于抽象。抽象不应依赖于细节，细节应依赖于抽象。</p>
<ul>
<li><strong>迪米特法则（Law of Demeter）</strong></li>
</ul>
<p>除此以外，GoF 一书还提到了迪米特法则（Law of Demeter），也称为最少知识原则。如果两个实体不需要直接通信，就不应发生直接调用。例如，使用 a.Method()而非 a.b.Method()可以减少系统耦合，增强可修改性和扩展性。</p>
<h3 id="常见设计模式">常见设计模式</h3>
<p>介绍设计模式及其应用的博客在互联网上已经有很多，本文不打算再进行重复，而是试图用简短的语句向读者概括一下设计模式及其使用的场景。如果读者不了解设计模式，可以搜索对应的关键词查看其他博客。</p>
<p>下面简单介绍了各种模式的含义和常用场景。</p>
<h4>建造型</h4>
<ul>
<li><strong>工厂模式 Factory</strong></li>
</ul>
<p>定义一个创建对象的接口，让子类决定实例化哪一个类，使得类的实例化延迟到子类中。<br>
当类的初始化需要依赖于具体情况和配置时，往往会用这种方式</p>
<ul>
<li><strong>抽象工厂 Abstract Factory</strong></li>
</ul>
<p>定义一个接口来创建几种不同种类的类，其中每个种类可能有若干相互依赖的组件。用户无需指定需要用哪些特定的组件。<br>
当需要创建一组相关或依赖的对象时，会使用这种方式。</p>
<ul>
<li><strong>建造者 Builder</strong></li>
</ul>
<p>定义一个接口，允许用户指定对象的步骤和过程；核心是分离的构造和表示两个步骤。<br>
主要用于创建复杂的对象，或者希望用相同的创建过程可以创建不同的表示。</p>
<ul>
<li><strong>原型 Prototype</strong></li>
</ul>
<p>通过复制的方式创建对象。<br>
使用于构造表示比较复杂的对象。</p>
<ul>
<li><strong>单例 Singleton</strong></li>
</ul>
<p>确保一个类只能有一个示例，并提供一个全局访问点来获取这个实例的设计模式<br>
当全局只需要一个实例时常用这种模式（例如线程池）</p>
<h4>结构型</h4>
<ul>
<li><strong>适配器 Adapter</strong></li>
</ul>
<p>创建一个中间层，使得已有接口和新接口能交互。<br>
一般已有接口是不可变或不方便修改的，例如 glibc 库等等</p>
<ul>
<li><strong>组合 Composite</strong></li>
</ul>
<p>将对象组合为树形结构，上层对象会对用下层方法完成某个操作。这使得对单个对象和组合对象的使用具有一致性。<br>
一般在需要同时处理复杂对象和简单对象时，这种模式比较常用</p>
<ul>
<li><strong>桥接 Birdge</strong></li>
</ul>
<p>将抽象部分和实现部分通过组合的方式分离（组合替代继承）<br>
很多时候都会用到这个模式，例如拆分庞大功能的类。</p>
<ul>
<li><strong>代理 Proxy</strong></li>
</ul>
<p>通过一个对象管理资源的访问<br>
当访问资源开销较大，或需要权限检查等额外功能时，会使用这个模式</p>
<ul>
<li><strong>装饰器 Decorator</strong></li>
</ul>
<p>定义函数的接口与被覆盖函数的接口相同，用户可以无感调用拓展功能的接口<br>
适合在原接口上无感拓展新的功能。</p>
<ul>
<li><strong>享元 Flywight</strong></li>
</ul>
<p>当有大量结构体共享一部分相同的数据时，将这部分数据独立出来，所有结构体共享这部分数据。<br>
适用于不可变状态较多时节省内存。</p>
<ul>
<li><strong>外观 Facade</strong></li>
</ul>
<p>将许多抽象的小接口汇聚为一个对象，对象内部不对接口做任何处理<br>
主要用于向外部提供统一接口</p>
<h4>行为型</h4>
<ul>
<li><strong>职责链 Chiain of responsibility</strong></li>
</ul>
<p>让请求以链式的形式逐一被处理。<br>
解耦发送者和执行者时常用</p>
<ul>
<li><strong>命令 Command</strong></li>
</ul>
<p>将操作抽象为对象（通过函数指针等形式），从而允许使用不同的请求、队列或日志来参数化其他对象。<br>
常用于参数化对象或者排队执行一些操作。</p>
<ul>
<li><strong>策略 Strategy</strong></li>
</ul>
<p>通过不同的上下文执行不同的算法变体，分离业务逻辑和具体的算法实现细节<br>
通常用来抽象做一件事的多种方式。</p>
<ul>
<li><strong>迭代器 Iterator</strong></li>
</ul>
<p>隐藏迭代的细节，简化用户访问某个数据结构的代码<br>
访问各种数据结构时都可用</p>
<ul>
<li><strong>状态 State</strong></li>
</ul>
<p>将不同的状态设计为不同的类<br>
当涉及到状态控制和转移的时候常用</p>
<ul>
<li><strong>备忘录 Memento</strong></li>
</ul>
<p>将数据结构的状态保存一份，用于后续恢复状态<br>
常用于做 snapshot 等恢复状态的操作。</p>
<ul>
<li><strong>模板 Template</strong></li>
</ul>
<p>在父类定义一个算法框架，子类实现算法的特定部分。<br>
常用于一些有固定执行逻辑的算法。</p>
<ul>
<li><strong>观察者 Observer</strong></li>
</ul>
<p>订阅监听模式，使用一个对象维护事件和对象间的一对多关系，当被监听事件产生时，会通知每个监听的对象<br>
常用于需要处理事件，绑定回调函数的场景</p>
<ul>
<li><strong>访问者 Visitor</strong></li>
</ul>
<p>将算法与其作用的对象结构分离，通过在被访问的对象中添加一个接受方法来接受访问者，从而实现在不修改这些对象的类的情况下定义新的操作。<br>
通常访问异构数据结构（例如树型）时常用</p>
<ul>
<li><strong>中介者 Mediator</strong></li>
</ul>
<p>引入一个中心对象来简化多个对象间的通信，从而减少这些对象之间的直接引用<br>
通常用于解耦数据结构的的相互引用</p>
<ul>
<li><strong>解释器 interprete</strong></li>
</ul>
<p>定义了一种语法用于特定的问题，并通过一个解释器来解释语言中的句子，用于实现语言的语法或表达式的解析和执行。
当特定问题有特定的写法时，常用 interpreter 来解决。</p>
<h2 id="rust-中设计模式的应用">Rust 中设计模式的应用</h2>
<p>Rust 设计之初就在语言嵌入了很多优雅的模式，例如模式匹配，所有权机制，零成本抽象等等。下面，我们以 Rust 语言为例，介绍如何结合语言特性更好地利用设计模式。</p>
<h3 id="builder">Builder</h3>
<p>Builder 可能是 Rust 中应用最多的设计模式。<br>
定义一个函数的接口不总是那么简单，尤其是当你遇到下面的情况时：</p>
<ul>
<li>有大量参数</li>
<li>有多个可选参数</li>
<li>只有某些参数的组合是有效的</li>
</ul>
<p>加之 Rust 语言设计没有类似 Python 的关键字参数等特性，且不支持直接的函数重载，让我们处理复杂的接口定义更加棘手。</p>
<blockquote>
<p>Rust 并不是没有重载，相反，trait 中可以定义一个和类型实现中同名的方法，这就是一种重载。可以参考这篇文章：<br>
Abstraction without overhead: traits in Rust<br>
<a href="https://blog.rust-lang.org/2015/05/11/traits.html">https://blog.rust-lang.org/2015/05/11/traits.html</a></p>
</blockquote>
<p>例如，我们需要一个函数来处理打开文件的选项。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">fn</span> <span class="hljs-title function_">set_flag</span>(
    is_read: <span class="hljs-type">bool</span>,is_write: <span class="hljs-type">bool</span>,is_append: <span class="hljs-type">bool</span>,is_truncate: <span class="hljs-type">bool</span>,is_create: <span class="hljs-type">bool</span>,
) <span class="hljs-punctuation">-></span> <span class="hljs-type">u32</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">flag</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> is_read {
        flag |= <span class="hljs-number">0x0001</span>;
    }
    <span class="hljs-comment">// ....</span>
    flag
}

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">main</span>(){
    <span class="hljs-keyword">let</span> <span class="hljs-variable">flag</span> = <span class="hljs-title function_ invoke__">set_flag</span>(<span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>);
}
</code></pre>
<p>这种写法可读性很差，非常有可能导致你传错参数。</p>
<p>一种做法是将上面的参数组合为一个结构体，然后在结构体中实现约束。作为一个特殊的例子，我们可以直接用 bitflag 去抽象上面的参数。</p>
<p>另一种做法是使用 builder。std 中的 fs::OpenOptions 就使用了这种写法。</p>
<p>以用读/写权限打开 foo.txt 为例：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">use</span> std::fs::OpenOptions;
<span class="hljs-keyword">let</span> <span class="hljs-variable">file</span> = OpenOptions::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">read</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">write</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">open</span>(<span class="hljs-string">"foo.txt"</span>);
</code></pre>
<p>这种写法就十分的清晰。让我们来看看 std 中这个结构体的实现：</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">// unix OpenOptions: library/std/src/sys/pal/unix/fs.rs</span>
<span class="hljs-comment">// library/std/src/fs.rs</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">OpenOptions</span>(OpenOptions);
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">OpenOptions</span> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">read</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, read: <span class="hljs-type">bool</span>) <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span> {
        <span class="hljs-keyword">self</span>.<span class="hljs-number">0</span>.<span class="hljs-title function_ invoke__">read</span>(read);
        <span class="hljs-keyword">self</span>
    }
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">write</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, write: <span class="hljs-type">bool</span>) <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span> {
        <span class="hljs-keyword">self</span>.<span class="hljs-number">0</span>.<span class="hljs-title function_ invoke__">write</span>(write);
        <span class="hljs-keyword">self</span>
    }
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">open</span>&#x3C;P: <span class="hljs-built_in">AsRef</span>&#x3C;Path>>(&#x26;<span class="hljs-keyword">self</span>, path: P) <span class="hljs-punctuation">-></span> io::<span class="hljs-type">Result</span>&#x3C;File> {
        <span class="hljs-comment">// self._open调用了对应操作系统抽象层的open函数</span>
        <span class="hljs-keyword">self</span>._open(path.<span class="hljs-title function_ invoke__">as_ref</span>())
    }
}
</code></pre>
<p>可以看到，在设置完参数 flag(read/write)后，会返回 builder 自己的可修改引用，这样就能使用链式调用了。</p>
<p>Builder 这个设计模式的写法是相对比较固定的，因此有人开发了 derive_builder 这个 crate，你可以通过添加 attribute 的形式快速为一个结构体添加它的 builder。</p>
<pre><code class="hljs language-rust"><span class="hljs-meta">#[derive(Default, Builder, Debug)]</span>
<span class="hljs-meta">#[builder(setter(into))]</span>
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">Channel</span> {
    token: <span class="hljs-type">i32</span>,
    special_info: <span class="hljs-type">i32</span>,
}
<span class="hljs-keyword">fn</span> <span class="hljs-title function_">main</span>() {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">ch</span> = ChannelBuilder::<span class="hljs-title function_ invoke__">default</span>()
        .<span class="hljs-title function_ invoke__">special_info</span>(<span class="hljs-number">42u8</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-number">19124</span>)
        .<span class="hljs-title function_ invoke__">build</span>()
        .<span class="hljs-title function_ invoke__">unwrap</span>();
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">"{:?}"</span>, ch);
}
</code></pre>
<p>这样生成出来的 Builder 模式是比较固定的，读者自己参照这个模式去实现。如果需要定制化地实现一个建造者，可以阅读 Rust API 指南中的几个 tips 后再进行实现。</p>
<h3 id="combinator">Combinator</h3>
<p>Combinator 是一个函数式编程的概念，但如今也在许多函数是一等公民的语言中。Combinator 指的是一个函数仅通过其他函数的组合来完成工作。在 Rust 中，最常见的应用是在异常处理中（Option and Result）。当然，上面的 builder 也是 combinator 一个特化形式。Option 和 Result 提供了大量 combinator 函数供用户转换和处理异常，同时提供了?语法糖简化常见的 match 语句。下面以 option 的 API 为例，简单介绍如何写出 combinator 风格的错误处理。Option 提供了一系列 Transform 高阶函数，例如：</p>
<ul>
<li><code>Option  -> Result :  Option::ok_or, Option::ok_or_else</code></li>
<li><code>Option&#x3C;T>  ->  Option&#x3C;T>  : Filter</code></li>
<li><code>Option&#x3C;Option&#x3C;T>>  -> Option&#x3C;T> : flatten</code></li>
<li><code>Option&#x3C;T> -> Option&#x3C;U>  : map,map_or, map_or_else</code></li>
<li><code>Option&#x3C;T>  -> Option&#x3C;(T,U)> : zip, zip_with, unzip.</code></li>
</ul>
<pre><code class="hljs language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">maybe_some_string</span> = <span class="hljs-title function_ invoke__">Some</span>(<span class="hljs-type">String</span>::<span class="hljs-title function_ invoke__">from</span>(<span class="hljs-string">"Hello, World!"</span>));

<span class="hljs-keyword">let</span> <span class="hljs-variable">maybe_some_len</span> = maybe_some_string.<span class="hljs-title function_ invoke__">map</span>(|s| s.<span class="hljs-title function_ invoke__">len</span>());
<span class="hljs-built_in">assert_eq!</span>(maybe_some_len, <span class="hljs-title function_ invoke__">Some</span>(<span class="hljs-number">13</span>));

<span class="hljs-keyword">let</span> <span class="hljs-variable">x</span>: <span class="hljs-type">Option</span>&#x3C;&#x26;<span class="hljs-type">str</span>> = <span class="hljs-literal">None</span>;
<span class="hljs-built_in">assert_eq!</span>(x.<span class="hljs-title function_ invoke__">map</span>(|s| s.<span class="hljs-title function_ invoke__">len</span>()), <span class="hljs-literal">None</span>);
</code></pre>
<p>此外，我们可以对 Option 做 bool 操作。例如调用 Option::and。如果调用的 Option 不为空，且传入的 Option 也不为空，则返回 Option。我们也可以传入一个函数。Option::and_then()传入一个函数，该函数接收一个 Option 内部的类型。如果 Option 非空，则执行这个函数。and_then 能帮助你更好地处理异常。Rust example 上有这样一个例子。例如，有下面两种结构体，Food 和 Day。</p>
<pre><code class="hljs language-rust"><span class="hljs-meta">#[derive(Debug)]</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">Food</span> { CordonBleu, Steak, Sushi }
<span class="hljs-meta">#[derive(Debug)]</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">Day</span> { Monday, Tuesday, Wednesday }
</code></pre>
<p>当 Food 为 Sushi 时，have_ingredients 返回一个 None，表示没有原料；当 Food 为 CordonBleu，have_recipe 返回一个 None，表示没有菜谱。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">fn</span> <span class="hljs-title function_">have_ingredients</span>(food: Food) <span class="hljs-punctuation">-></span> <span class="hljs-type">Option</span>&#x3C;Food> {
    <span class="hljs-keyword">match</span> food {
        Food::Sushi => <span class="hljs-literal">None</span>,
        _           => <span class="hljs-title function_ invoke__">Some</span>(food),
    }
}

<span class="hljs-keyword">fn</span> <span class="hljs-title function_">have_recipe</span>(food: Food) <span class="hljs-punctuation">-></span> <span class="hljs-type">Option</span>&#x3C;Food> {
    <span class="hljs-keyword">match</span> food {
        Food::CordonBleu => <span class="hljs-literal">None</span>,
        _                => <span class="hljs-title function_ invoke__">Some</span>(food),
    }
}
</code></pre>
<p>接下来要实现一个 cookable 函数，表示一个食物既有菜谱，又有原料，如果使用 match 语句就会显得有点冗长。我们可以使用 option 中的 and_then 将其转化为 combinator。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">fn</span> <span class="hljs-title function_">cookable</span>(food: Food) <span class="hljs-punctuation">-></span> <span class="hljs-type">Option</span>&#x3C;Food> {
    <span class="hljs-title function_ invoke__">have_recipe</span>(food).<span class="hljs-title function_ invoke__">and_then</span>(have_ingredients)
}
</code></pre>
<p>如果 have_recipe 返回 None，那么这个函数也会返回 None。否则，它会执行 have_ingredients 再去检查。事实上，and_then 内部也是一个 match 语句。虽然这样写编译的产物没有发生很大变化，但是使用 combinator 后整体的逻辑变得更加清晰，同时也有利于编译器做优化。</p>
<pre><code class="hljs language-rust">    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">and_then</span>&#x3C;U, F>(<span class="hljs-keyword">self</span>, f: F) <span class="hljs-punctuation">-></span> <span class="hljs-type">Option</span>&#x3C;U>
    <span class="hljs-keyword">where</span>
        F: <span class="hljs-title function_ invoke__">FnOnce</span>(T) <span class="hljs-punctuation">-></span> <span class="hljs-type">Option</span>&#x3C;U>,
    {
        <span class="hljs-keyword">match</span> <span class="hljs-keyword">self</span> {
            <span class="hljs-title function_ invoke__">Some</span>(x) => <span class="hljs-title function_ invoke__">f</span>(x),
            <span class="hljs-literal">None</span> => <span class="hljs-literal">None</span>,
        }
    }
</code></pre>
<h3 id="raii">RAII</h3>
<p>RAII 指的是 Resource Acquisition Is Initialization，意思是资源初始化在对象的构造器中完成，最终化（资源释放）在析构器中完成。RAII 可以简化类似 C 中复杂的异常处理，同时又可以避免程序员一些逻辑错误导致资源没有释放。</p>
<p><img src="${a}" alt="图片"></p>
<p>利用 RAII 的思想，可以设计一类 Guard 结构体，它们提供对资源访问的唯一安全接口。Rust 中 Mutex 等锁就利用了这一思想。</p>
<p>一个 C 风格的锁如下面的代码所示：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Mutex</span>&#x3C;T> {
    data: UnsafeCell&#x3C;T>,
    system_mutex: SystemMutex,
}

<span class="hljs-keyword">impl</span>&#x3C;T> Mutex&#x3C;T> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">new</span>(t: T) <span class="hljs-punctuation">-></span> <span class="hljs-keyword">Self</span> { <span class="hljs-comment">/* .. */</span>}
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">lock</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-keyword">mut</span> T {
        <span class="hljs-keyword">self</span>.system_mutex.<span class="hljs-title function_ invoke__">lock</span>();
        <span class="hljs-keyword">unsafe</span> { &#x26;<span class="hljs-keyword">mut</span> *<span class="hljs-keyword">self</span>.data.<span class="hljs-title function_ invoke__">get</span>() }
    }
     <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">unlock</span>(&#x26;<span class="hljs-keyword">self</span>) {
        <span class="hljs-keyword">self</span>.system_mutex.<span class="hljs-title function_ invoke__">unlock</span>();
    }
}
</code></pre>
<p>用户需要调用 unlock 来解锁。这么写可能有个问题：</p>
<ul>
<li>调用者调用 lock 后，忘记 unlcok 了，导致死锁，这种情形在多出口的 while 循环中很常见。</li>
</ul>
<p>在标准库中，调用 Mutex::lock 后，不会返回对资源的直接引用，而是一个被 MutexGuard 保护的资源的引用：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">MutexGuard</span>&#x3C;<span class="hljs-symbol">'a</span>, T: ?<span class="hljs-built_in">Sized</span> + <span class="hljs-symbol">'a</span>> {
    lock: &#x26;<span class="hljs-symbol">'a</span> Mutex&#x3C;T>,
}

<span class="hljs-keyword">impl</span>&#x3C;<span class="hljs-symbol">'a</span>, T> MutexGuard&#x3C;<span class="hljs-symbol">'a</span>, T> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">new</span>(lock: &#x26;<span class="hljs-symbol">'a</span> Mutex&#x3C;T>) <span class="hljs-punctuation">-></span> <span class="hljs-keyword">Self</span> {
        lock.system_mutex.<span class="hljs-title function_ invoke__">lock</span>();
        MutexGuard { lock }
    }

     <span class="hljs-keyword">fn</span> <span class="hljs-title function_">get</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-keyword">mut</span> T {
        &#x26;<span class="hljs-keyword">mut</span> *<span class="hljs-keyword">self</span>.lock.<span class="hljs-title function_ invoke__">get_mut</span>()
    }
}
</code></pre>
<p>调用者可以调用 guard 的 get 方法来获取内部引用。<br>
同时，Guard 还实现了 drop 特性：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span>&#x3C;<span class="hljs-symbol">'a</span>, T:?<span class="hljs-built_in">Sized</span>> <span class="hljs-built_in">Drop</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">MutexGuard</span>&#x3C;<span class="hljs-symbol">'a</span>, T> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">drop</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>) {
        <span class="hljs-keyword">self</span>.lock.system_mutex.<span class="hljs-title function_ invoke__">unlock</span>();
    }
}
</code></pre>
<p>当 Guard 离开作用域时，就会自动调用 unlock 方法解锁。除了使用 Guard 的方式保护内部变量，还可以提供回调接口的方式进行保护。比如</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span>&#x3C;T> Mutex&#x3C;T> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">lock_closure</span>(&#x26;<span class="hljs-keyword">self</span>, <span class="hljs-keyword">mut</span> f: <span class="hljs-keyword">impl</span> <span class="hljs-title class_">FnMut</span>(&#x26;<span class="hljs-keyword">mut</span> T)) {
        <span class="hljs-keyword">self</span>.system_mutex.<span class="hljs-title function_ invoke__">lock</span>();
        <span class="hljs-title function_ invoke__">f</span>(<span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">get_mut</span>());
        <span class="hljs-keyword">self</span>.system_mutex.<span class="hljs-title function_ invoke__">unlock</span>();
    }
}
</code></pre>
<ul>
<li>Guard 保护的一般是完整的结构体，如果想要用户只能访问结构体内部的某些字段，除了可以用多个锁的方案，可以尝试 parking_lot 中的 try_map 方法。</li>
</ul>
<p>Guard 最场景的用途是在锁资源的保护中，但并不意味着这种模式只能用于锁，当我们需要实现一些延迟访问或者批量处理的操作也可以用这个模式。</p>
<h3 id="typestate">Typestate</h3>
<p>typestate 是 Rust 中另一个经典的模式。传统的状态模式用一个枚举值来表示状态，而 Rust 中你可以利用 enum 的特性来实现使用基于类型的状态管理。这个模式被称为 Typestate，也有称为 session type。Typestate 相较于传统的枚举值有很多好处：</p>
<ul>
<li>防止用户从非开始状态进入</li>
<li>防止发生错误的转换</li>
<li>特别地,Rust 的所有权机制可以消耗掉状态，使得用户手上的状态发生转换后就不会存在。</li>
</ul>
<p>下面以一个文件打开、读取操作为例，简单介绍 typestate 模式。</p>
<p><img src="${l}" alt="图片"></p>
<p>一个文件的读写操作可能涉及到上面的状态转移图。我们可以用 Rust 抽象这一过程。完整的代码见此：</p>
<p><a href="https://play.rust-lang.org/?version=stable&#x26;mode=debug&#x26;edition=2021&#x26;gist=46e1d2efa6954acfd7a5b028c70f4612">https://play.rust-lang.org/?version=stable&#x26;mode=debug&#x26;edition=2021&#x26;gist=46e1d2efa6954acfd7a5b028c70f4612</a></p>
<p>我们定义一个保存读取内容和 fd 的结构体：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">File</span> {
    fd: libc::c_int,
    buf: <span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">u8</span>>,
}
</code></pre>
<p>调用和封装 C FFI 的 open 和 read：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">use</span> std::ffi::CString;
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">File</span> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">open</span>(path: <span class="hljs-type">String</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;File, <span class="hljs-type">String</span>> {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">fd</span> = <span class="hljs-keyword">unsafe</span> { libc::<span class="hljs-title function_ invoke__">open</span>(CString::<span class="hljs-title function_ invoke__">new</span>(path).<span class="hljs-title function_ invoke__">unwrap</span>().<span class="hljs-title function_ invoke__">as_ptr</span>(), <span class="hljs-number">0</span>) };<span class="hljs-comment">// 调用c ffi</span>
        <span class="hljs-comment">// 返回结果..</span>
    }
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">read</span>(<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, bytes: <span class="hljs-type">usize</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;<span class="hljs-type">usize</span>, <span class="hljs-type">String</span>> {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">bytes_read</span> =
            <span class="hljs-keyword">unsafe</span> { libc::<span class="hljs-title function_ invoke__">read</span>(<span class="hljs-keyword">self</span>.fd, <span class="hljs-keyword">self</span>.buf.<span class="hljs-title function_ invoke__">as_mut_ptr</span>() <span class="hljs-keyword">as</span> *<span class="hljs-keyword">mut</span> libc::c_void, bytes) };
        <span class="hljs-keyword">if</span> bytes_read == -<span class="hljs-number">1</span> {<span class="hljs-keyword">return</span> <span class="hljs-title function_ invoke__">Err</span>(std::io::Error::<span class="hljs-title function_ invoke__">last_os_error</span>().<span class="hljs-title function_ invoke__">to_string</span>());} <span class="hljs-comment">// 处理异常</span>
        <span class="hljs-keyword">unsafe</span>{<span class="hljs-keyword">self</span>.buf.<span class="hljs-title function_ invoke__">set_len</span>(<span class="hljs-keyword">self</span>.buf.<span class="hljs-title function_ invoke__">len</span>() + bytes_read <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>)};
        <span class="hljs-title function_ invoke__">Ok</span>(bytes_read <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>)
    }
}
</code></pre>
<p>注意到上面的代码中，如果 read 进入到 eof 状态时，它返回 bytes_read 小于期望读取的字符数，但是这里并没有做特殊的处理；同时，进入 eof 状态后，我们并不希望调用者再去调用 read 函数了。我们可以将 EOF 状态和正常状态分为两个结构体：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">FileEof</span>(<span class="hljs-type">i32</span>);
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">ReadResult</span> {
    <span class="hljs-title function_ invoke__">File</span>(File),
    <span class="hljs-title function_ invoke__">FileEof</span>(FileEof),
    <span class="hljs-title function_ invoke__">Error</span>(<span class="hljs-type">String</span>),
}
</code></pre>
<p>然后，在 read 方法中，针对 c ffi 中 read 的不同结果返回不同类型：</p>
<ul>
<li>如果 read 返回-1, 那么返回 ReadResult::Error</li>
<li>如果 read 返回小于要求的字节数，说明到达 EOF 状态，返回 ReadResult::FileEof</li>
<li>否则，返回 ReadResult::File 状态</li>
</ul>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">File</span> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">open</span>(path: <span class="hljs-type">String</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;File, <span class="hljs-type">String</span>> {<span class="hljs-comment">// same as before}</span>

    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">read</span>(<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, bytes: <span class="hljs-type">usize</span>) <span class="hljs-punctuation">-></span> ReadResult {
        <span class="hljs-comment">// same as before</span>
        <span class="hljs-comment">// bytes_read是read读取的字节数</span>
        <span class="hljs-title function_ invoke__">if</span> (bytes_read <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>) &#x3C; bytes {
            ReadResult::<span class="hljs-title function_ invoke__">FileEof</span>(<span class="hljs-title function_ invoke__">FileEof</span>(<span class="hljs-keyword">self</span>.fd))
        } <span class="hljs-keyword">else</span> {
            ReadResult::<span class="hljs-title function_ invoke__">File</span>(<span class="hljs-keyword">self</span>)
        }
    }
}
</code></pre>
<p>当 Read 返回时，除了异常状态，它可能返回的是一个正常的 File，也可能是一个 FileEof 结构体。对于前者，调用者仍然可以继续调用 read 读取；然而后者则没有实现 read 方法。这样，我们就从类型的层面隔离了两种状态。同时，用户也可以通过 match 等方法判断是否出现了文件读取 EOF 的情形。</p>
<p>我们还没实现 close 方法。close 方法无论是普通状态还是 EOF 状态都有。这样，我们就不得不分别为两个结构体实现一个相同的方法，这并不优雅。</p>
<p>注意到类似 C 语言中使用枚举值表示状态的写法，只需要写一个结构体，并且为该结构体实现方法。有没有办法既利用 Rust 的类型系统隔离两种类型，又只需要写一个结构体呢？Rust 的泛型和零成本抽象可以帮助我们解决这个问题。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">use</span> std::marker::PhantomData;

<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Reading</span>;
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Eof</span>;

<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">File</span>&#x3C;S> {
  fd: libc::c_int,
  buf: <span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">u8</span>>,
  closed : <span class="hljs-type">bool</span>,
  _marker: PhantomData&#x3C;S>,
}

<span class="hljs-keyword">pub</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">ReadResult</span> { <span class="hljs-title function_ invoke__">File</span>(File&#x3C;Reading>), <span class="hljs-title function_ invoke__">FileEof</span>(File&#x3C;Eof>), <span class="hljs-title function_ invoke__">Error</span>(<span class="hljs-type">String</span>) }
</code></pre>
<p>区分不同类型的枚举值仍然是类型，与之前不同的是，我们将类型作为 File 结构体的参数传入。例如，普通状态的 File 结构体是 File，而读取结束的 File 结构体则是 File。</p>
<p>然后，我们可以为 File 特化实现一个 Read 方法：</p>
<pre><code class="hljs language-rust">mpl File&#x3C;Reading> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">open</span>(path: <span class="hljs-type">String</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;File&#x3C;Reading>, <span class="hljs-type">String</span>> {
       <span class="hljs-comment">// same as before</span>
    }

     <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">read</span>(<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, bytes: <span class="hljs-type">usize</span>) <span class="hljs-punctuation">-></span> ReadResult {
       <span class="hljs-comment">// same as before</span>
    }
}
</code></pre>
<p>然后再为 File<reading>和 File<eof>同时实现一个 close 方法：</eof></reading></p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span>&#x3C;S> File&#x3C;S> {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">close</span>(<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;(), <span class="hljs-type">String</span>> {
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">unsafe</span>{libc::<span class="hljs-title function_ invoke__">close</span>(<span class="hljs-keyword">self</span>.fd)} == -<span class="hljs-number">1</span> {
            <span class="hljs-title function_ invoke__">Err</span>(std::io::Error::<span class="hljs-title function_ invoke__">last_os_error</span>().<span class="hljs-title function_ invoke__">to_string</span>())
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-title function_ invoke__">Ok</span>(())
        }
    }
}
</code></pre>
<p>当然，我们还应该将 close 实现为 drop trait，而不只是一个方法</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span>&#x3C;S> <span class="hljs-built_in">Drop</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">File</span>&#x3C;S> {
  <span class="hljs-keyword">fn</span> <span class="hljs-title function_">drop</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>) {
    <span class="hljs-keyword">if</span> !<span class="hljs-keyword">self</span>.closed {
      <span class="hljs-keyword">unsafe</span> { libc::<span class="hljs-title function_ invoke__">close</span>(<span class="hljs-keyword">self</span>.fd); }
    }
  }
}
</code></pre>
<p>许多开源项目都使用了 typestate 这种设计模式，例如</p>
<blockquote>
<p>hyper 中实现 http2 协议的部分代码如下
<a href="https://github.com/hyperium/hyper/blob/master/src/proto/h2/server.rs#L92">https://github.com/hyperium/hyper/blob/master/src/proto/h2/server.rs#L92</a></p>
</blockquote>
<pre><code class="hljs language-rust"><span class="hljs-keyword">enum</span> <span class="hljs-title class_">State</span>&#x3C;T, B>
<span class="hljs-keyword">where</span>
    B: Body,
{
    Handshaking {
        ping_config: ping::Config,
        hs: Handshake&#x3C;Compat&#x3C;T>, SendBuf&#x3C;B::Data>>,
    },
    <span class="hljs-title function_ invoke__">Serving</span>(Serving&#x3C;T, B>),
    Closed,
}
</code></pre>
<p>这里的 state 表示服务器的三个状态。Handshaking 表示在进行握手阶段，例如在建立连接时的初始握手。Serving 表示服务器已经成功握手并正在服务请求。它包含了一个 Serving 结构体，其中具体实现了请求的处理逻辑。.Closed 表示连接已经关闭，不携带任何额外数据。在 poll 函数中，hyper 实现了不同状态的转换。</p>
<p>Handshaking 状态:</p>
<ul>
<li>当服务器处于 Handshaking 状态时，它尝试完成握手过程。</li>
<li>使用 poll 方法检查底层握手（hs）是否准备好继续进行。如果 hs 没有准备好，这将返回 Poll::Pending 并将当前任务注册到要通知的 Waker。</li>
<li>如果握手完成，它检查是否需要配置 Ping 功能（基于 ping_config）。如果需要，它设置与 ping 相关的逻辑。</li>
<li>状态转变为 Serving，这意味着服务器准备开始服务请求。</li>
</ul>
<p>Serving 状态:</p>
<ul>
<li>在 Serving 状态中，服务器开始处理传入的请求。</li>
<li>poll_server 被调用以继续处理或完成请求。这可能涉及读取网络数据，执行应用程序逻辑，以及发送响应。</li>
<li>如果服务器完成了所有的服务工作，它会返回 Poll::Ready(Ok(Dispatched::Shutdown))，表示服务器准备关闭。</li>
</ul>
<p>Closed 状态:</p>
<ul>
<li>如果服务器在完成握手前已经被标记为关闭（Closed），则直接返回 Poll::Ready(Ok(Dispatched::Shutdown))。</li>
</ul>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span>&#x3C;T, S, B, E> Future <span class="hljs-keyword">for</span> <span class="hljs-title class_">Server</span>&#x3C;T, S, B, E>
<span class="hljs-keyword">where</span>
    T: Read + Write + Unpin,
    S: HttpService&#x3C;IncomingBody, ResBody = B>,
    S::Error: <span class="hljs-built_in">Into</span>&#x3C;<span class="hljs-type">Box</span>&#x3C;<span class="hljs-keyword">dyn</span> StdError + <span class="hljs-built_in">Send</span> + <span class="hljs-built_in">Sync</span>>>,
    B: Body + <span class="hljs-symbol">'static</span>,
    E: Http2ServerConnExec&#x3C;S::Future, B>,
{
    <span class="hljs-keyword">type</span> <span class="hljs-title class_">Output</span> = crate::<span class="hljs-type">Result</span>&#x3C;Dispatched>;
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">poll</span>(<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>: Pin&#x3C;&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">Self</span>>, cx: &#x26;<span class="hljs-keyword">mut</span> Context&#x3C;<span class="hljs-symbol">'_</span>>) <span class="hljs-punctuation">-></span> Poll&#x3C;<span class="hljs-keyword">Self</span>::Output> {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">me</span> = &#x26;<span class="hljs-keyword">mut</span> *<span class="hljs-keyword">self</span>;
        <span class="hljs-keyword">loop</span> {
            <span class="hljs-keyword">let</span> <span class="hljs-variable">next</span> = <span class="hljs-keyword">match</span> me.state {
                State::Handshaking {<span class="hljs-keyword">ref</span> <span class="hljs-keyword">mut</span> hs,<span class="hljs-keyword">ref</span> ping_config} => {
                   <span class="hljs-comment">// 处理握手状态</span>
                }
                State::<span class="hljs-title function_ invoke__">Serving</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">mut</span> srv) => {
                  <span class="hljs-comment">// 处理连接状态</span>
                }
                State::Closed => {
                  <span class="hljs-comment">// 优雅关闭</span>
                }
            };
            me.state = next;
        }
    }
}
</code></pre>
<p>通过利用 typestate 机制，hyper 实现了一个编译期就能进行检查状态管理安全性的 Server 结构。</p>
<h3 id="command">Command</h3>
<p>命令模式的基本思想是将操作分离为对象，并将它们作为参数传递。在 Rust 中，主要有以下两种种方式可以绑定</p>
<ul>
<li>Trait 对象</li>
<li>函数指针</li>
</ul>
<p>例如，我们要针对一个窗体执行一系列的 GUI 命令，有 open,close 等等.如果使用 Trait 的话，我们可以定义如下：</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">trait</span> <span class="hljs-title class_">Command</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">execute</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-type">str</span>;
}
</code></pre>
<p>我们分别实现一个 Open 和 Close Command:</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Open</span>;
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Command</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Open</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">execute</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-type">str</span> {
        <span class="hljs-string">"open"</span>
    }
}

<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Close</span>;
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Command</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Close</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">execute</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-type">str</span> {
        <span class="hljs-string">"close"</span>
    }
}
</code></pre>
<p>最后定义一个 Executor，逐一取出容器内的命令执行即可。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Executor</span> {
    commands: <span class="hljs-type">Vec</span>&#x3C;<span class="hljs-type">Box</span>&#x3C;<span class="hljs-keyword">dyn</span> Command>>,
}

<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Executor</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">execute</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Vec</span>&#x3C;&#x26;<span class="hljs-type">str</span>> {
        <span class="hljs-keyword">self</span>.commands.<span class="hljs-title function_ invoke__">iter</span>().<span class="hljs-title function_ invoke__">map</span>(|cmd| cmd.<span class="hljs-title function_ invoke__">execute</span>()).<span class="hljs-title function_ invoke__">collect</span>()
    }
}
</code></pre>
<p>如果命令本身比较简单，也可以直接将函数指针传入</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FnPtr</span> = <span class="hljs-title function_ invoke__">fn</span>() <span class="hljs-punctuation">-></span> &#x26;<span class="hljs-symbol">'static</span> <span class="hljs-type">str</span>;
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Command</span>{
    execute : FnPtr,
}
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">Executor</span>; <span class="hljs-comment">// same as before</span>

<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Executor</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">add_command</span>(&#x26;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, command: FnPtr) {
        <span class="hljs-keyword">self</span>.commands.<span class="hljs-title function_ invoke__">push</span>(Command { execute: command });
    }
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">execute</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Vec</span>&#x3C;&#x26;<span class="hljs-type">str</span>> {
        <span class="hljs-keyword">self</span>.commands.<span class="hljs-title function_ invoke__">iter</span>().<span class="hljs-title function_ invoke__">map</span>(|cmd| (cmd.execute)()).<span class="hljs-title function_ invoke__">collect</span>()
    }
}
</code></pre>
<p>但是这种形式的 command 没有类型上的隔离，可读性不如上一种。此外，我们可能在 Command 中存有其他的上下文或者变量。如果你的命令本身比较复杂的话，第一种方式会是更好的选择。</p>
<h3 id="strategy">Strategy</h3>
<p>策略模式和命令模式十分类似，但是策略模式更注重表达“做一件事的不同方式"。</p>
<p>例如，我们希望实现一个 Serializate 特定数据结构的类。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Point</span>{
    x : <span class="hljs-type">f32</span>,
    y : <span class="hljs-type">f32</span>
}
</code></pre>
<p>我们希望能将他转为以下两种形式：</p>
<ul>
<li>普通的字符串，形如"{x},{y}"</li>
<li>Json 字符串</li>
</ul>
<p>我们可以实现一个 Trait，这个 trait 接受一个 Point 结构体，然后将其放入到字符串中</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">trait</span> <span class="hljs-title class_">Serialize</span> {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">serialize</span>(&#x26;<span class="hljs-keyword">self</span>, data: &#x26;Point, buf: &#x26;<span class="hljs-keyword">mut</span> <span class="hljs-type">String</span>);
}
</code></pre>
<p>然后，分别为两种策略实现 serialize 方法</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">NormalSerializer</span>;

<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Serialize</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">NormalSerializer</span>{
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">serialize</span>(&#x26;<span class="hljs-keyword">self</span>, data: &#x26;Point, buf: &#x26;<span class="hljs-keyword">mut</span> <span class="hljs-type">String</span>) {
        buf.<span class="hljs-title function_ invoke__">push_str</span>(&#x26;<span class="hljs-built_in">format!</span>(<span class="hljs-string">"{},{}"</span>, data.x, data.y));
    }
}

<span class="hljs-keyword">struct</span> <span class="hljs-title class_">JsonSerializer</span>;
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Serialize</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">JsonSerializer</span>{
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">serialize</span>(&#x26;<span class="hljs-keyword">self</span>, data: &#x26;Point, buf: &#x26;<span class="hljs-keyword">mut</span> <span class="hljs-type">String</span>) {
        buf.<span class="hljs-title function_ invoke__">push_str</span>(&#x26;<span class="hljs-built_in">format!</span>(<span class="hljs-string">"{{"x":{}, "y":{}}}"</span>, data.x, data.y));
    }
}
</code></pre>
<p>使用时，首先构建想要序列化的方法的结构体，然后调用其序列化方法即可。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">fn</span> <span class="hljs-title function_">main</span>() {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">point</span> = Point { x: <span class="hljs-number">1.0</span>, y: <span class="hljs-number">2.0</span> };
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">buf</span> = <span class="hljs-type">String</span>::<span class="hljs-title function_ invoke__">new</span>();
    <span class="hljs-keyword">let</span> <span class="hljs-variable">normal_serializer</span> = NormalSerializer;
    normal_serializer.<span class="hljs-title function_ invoke__">serialize</span>(&#x26;point, &#x26;<span class="hljs-keyword">mut</span> buf);
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">"{}"</span>, buf);
}
</code></pre>
<h3 id="visitor">Visitor</h3>
<p>Visitor 模式可以将对多种对象数据的行为单独放在一个类中，可以视为是 Command 的加强版。一般而言，在解析异构数据（例如树结构）时我们常常会用到 Visitor。Visitor 可以分离解析数据和操作数据两件事情。</p>
<p>在 Rust 中，常用 Visitor 的场景主要在遍历 AST 树和进行反序列化。</p>
<p>考虑上面 strategy 的例子，如果我们需要写一个反序列化器，从文本转为 Point。我们可以采用类似的思路</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span> <span class="hljs-title class_">Deserialize</span>&#x3C;&#x26;<span class="hljs-type">str</span>> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Point</span> {
    <span class="hljs-keyword">type</span> <span class="hljs-title class_">Error</span> = PointDeserializationError;

     <span class="hljs-keyword">fn</span> <span class="hljs-title function_">deserialize</span>(input: &#x26;<span class="hljs-type">str</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;<span class="hljs-keyword">Self</span>, <span class="hljs-keyword">Self</span>::Error> {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">split</span> = input.<span class="hljs-title function_ invoke__">split</span>(<span class="hljs-string">","</span>).collect::&#x3C;<span class="hljs-type">Vec</span>&#x3C;_>>();
        <span class="hljs-title function_ invoke__">Ok</span>(Point {
            x: split[<span class="hljs-number">0</span>].<span class="hljs-title function_ invoke__">parse</span>().<span class="hljs-title function_ invoke__">map_err</span>(|_| PointDeserializationError)?,
            y: split[<span class="hljs-number">1</span>].<span class="hljs-title function_ invoke__">parse</span>().<span class="hljs-title function_ invoke__">map_err</span>(|_| PointDeserializationError)?,
        })
    }
}
</code></pre>
<p>同样，如果要从 Json 形式转为 Point，可以用 newtype 封装一下 json</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">Json</span>(<span class="hljs-type">String</span>);

<span class="hljs-keyword">impl</span> <span class="hljs-title class_">Deserialize</span>&#x3C;Json> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Point</span> {
    <span class="hljs-keyword">type</span> <span class="hljs-title class_">Error</span> = PointDeserializationError;

     <span class="hljs-keyword">fn</span> <span class="hljs-title function_">deserialize</span>(input: Json) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;<span class="hljs-keyword">Self</span>, <span class="hljs-keyword">Self</span>::Error> {
        todo!()
    }
}
</code></pre>
<p>如果此时，你需要又要从 Hashmap 转为 Point。这个操作很简单。但是你可能突然想到，上面 Json 转为 Point，似乎也可以先从 Json 转为 Hashmap，再从 Hashmap 转为具体的数据结构。进一步来说，如果我有 M 种要反序列化的结构体，有 N 种目标结构体，使用一一对应的方式我们就需要实现 M<em>N 种方式，而且这其中有许多代码是可以被复用的。而假如我们添加一个中间层，提供 X 种方式（X 是一个相对小的数），那么这样就只需要实现 M</em>X + X*N 种方式了。Serde 的反序列化器定义类似下面的结构</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">trait</span> <span class="hljs-title class_">Visitor</span>&#x3C;<span class="hljs-symbol">'de</span>> {
    <span class="hljs-keyword">type</span> <span class="hljs-title class_">Value</span>;
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">visit_map</span>&#x3C;M>(<span class="hljs-keyword">self</span>, map: M) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;<span class="hljs-keyword">Self</span>::Value, M:: Error>
    <span class="hljs-keyword">where</span>
        M: MapAccess&#x3C;<span class="hljs-symbol">'de</span>>;
}

<span class="hljs-keyword">trait</span> <span class="hljs-title class_">Deserializer</span>&#x3C;<span class="hljs-symbol">'de</span>> {
    <span class="hljs-keyword">type</span> <span class="hljs-title class_">Error</span>;
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">deserialize_struct</span>&#x3C;V>(<span class="hljs-keyword">self</span>, visitor: V) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;V::Value, <span class="hljs-keyword">Self</span>::Error>
    <span class="hljs-keyword">where</span>
        V: Visitor&#x3C;<span class="hljs-symbol">'de</span>>;
}
</code></pre>
<p>Deserializer 中除了定义 deserialize_struct 还定义了其他反序列化方法，visitor 也是一样，这里仅列出两个本例中所提到的方法。</p>
<p>我们就可以将一个 Json 的反序列化实现为下面的形式。</p>
<p>首先我们需要定义一个 JsonDeserializer。这个结构体负责将 Json 格式的字符串转化为一个中间表示 MapAccess。</p>
<blockquote>
<p>MapAccess 是 Serde 中提供给 Visitor 的参数之一。读者可以阅读 Serde 文档了解更多关于 MapAccess 的信息，这里不再展开
<a href="https://docs.rs/serde/latest/serde/de/trait.MapAccess.html">https://docs.rs/serde/latest/serde/de/trait.MapAccess.html</a></p>
</blockquote>
<p>类似地，当你再写其他更多的序列化器时，就可以专注于解析成特定的中间表示，而不是将这些功能都放在一个类中。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">JsonDeserializer</span> {<span class="hljs-comment">//...}</span>
<span class="hljs-keyword">impl</span>&#x3C;> JsonDeserializer {
    <span class="hljs-comment">// 假设这里实现了解析Json的功能，并返回了一个MapAccess</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">parse_map</span>(&#x26;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;<span class="hljs-type">Box</span>&#x3C;<span class="hljs-keyword">dyn</span> MapAccess>, JsonError> {todo!()}
}
<span class="hljs-keyword">struct</span> <span class="hljs-title class_">JsonError</span>;
</code></pre>
<p>接下来为 JsonDeserializer 实现 Deserializer Trait。这里我们调用 JsonDeserializer 的解析方法，然后将它传给一个实现了 visit_map 方法的 Visitor。Visitor 将会决定我们反序列化的结果是什么。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">impl</span>&#x3C;<span class="hljs-symbol">'de</span>> Deserializer&#x3C;<span class="hljs-symbol">'de</span>> <span class="hljs-keyword">for</span> <span class="hljs-title class_">JsonDeserializer</span> {
    <span class="hljs-keyword">type</span> <span class="hljs-title class_">Error</span> = JsonError;
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">deserialize_struct</span>&#x3C;V>(<span class="hljs-keyword">self</span>, visitor: V) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;V::Value, <span class="hljs-keyword">Self</span>::Error>
    <span class="hljs-keyword">where</span>
        V: Visitor&#x3C;<span class="hljs-symbol">'de</span>>
    {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">map</span> = <span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">parse_map</span>().<span class="hljs-title function_ invoke__">map_err</span>(|_| JsonError)?;
        visitor.<span class="hljs-title function_ invoke__">visit_map</span>(map).<span class="hljs-title function_ invoke__">map_err</span>(|_| JsonError)
    }
 }
</code></pre>
<p>我们还需要实现一个 Visitor,这个 visitor 接受一个 MapAccess 结构体作为参数，返回一个目标结构体——这里就是我们的 Point 结构体。</p>
<pre><code class="hljs language-rust"><span class="hljs-keyword">struct</span> <span class="hljs-title class_">PointVisitor</span>;
<span class="hljs-keyword">impl</span>&#x3C;<span class="hljs-symbol">'de</span>> Visitor&#x3C;<span class="hljs-symbol">'de</span>> <span class="hljs-keyword">for</span> <span class="hljs-title class_">PointVisitor</span>{
    <span class="hljs-keyword">type</span> <span class="hljs-title class_">Value</span> = Point;

    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">visit_map</span>&#x3C;M>(<span class="hljs-keyword">self</span>, <span class="hljs-keyword">mut</span> access: MapAccess&#x3C;<span class="hljs-symbol">'de</span>>) <span class="hljs-punctuation">-></span> <span class="hljs-type">Result</span>&#x3C;<span class="hljs-keyword">Self</span>::Value, M::Error>
    {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">x</span> = access.<span class="hljs-title function_ invoke__">next_value</span>()?
        <span class="hljs-keyword">let</span> <span class="hljs-variable">y</span> = access.<span class="hljs-title function_ invoke__">next_value</span>()?
        <span class="hljs-title function_ invoke__">Ok</span>(Point{x,y})
    }
}
</code></pre>
<p>如果此时，你接到了新的需求，需要将输出改为一个元组。这时你只需要简单的实现一个新的 Visitor 即可。</p>
<p>我们将这样的形式称为”双分派“。Visitor 只处理确定形式的结构体，例如 MapAccess 等等，由于 Rust 中没有直接的重载，调用者需要显式的调用”visit_map“。我们称这个操作为”分派“(dispatch)。在其他语言例如 C++，这里可以直接调用 visit 函数，由于其参数的类型是编译期就知道的，所以会产生一个静态的分派。</p>
<p>上面第一部分的 Deserializer 结构体对应的是是 Serde 文档中的 Implementing a Deserializer，而第二部分的 Visitor 则对应的是 Serde 文档中的 Implementing deserialize。读者可以进一步阅读这两个文档。</p>
<p>Visitor 模式可以很好的解耦数据解析和数据处理两个操作，在 Serde 中的反序列化被大量使用。</p>
<h2 id="参考">参考</h2>
<ol>
<li><a href="https://refactoringguru.cn/design-patterns/catalog">https://refactoringguru.cn/design-patterns/catalog</a></li>
<li><a href="https://fomalhauthmj.github.io/patterns/">https://fomalhauthmj.github.io/patterns/</a></li>
<li><a href="https://towardsdatascience.com/nine-rules-for-elegant-rust-library-apis-9b986a465247">https://towardsdatascience.com/nine-rules-for-elegant-rust-library-apis-9b986a465247</a></li>
<li><a href="https://rust-lang.github.io/api-guidelines/about.html">https://rust-lang.github.io/api-guidelines/about.html</a></li>
<li><a href="https://willcrichton.net/rust-api-type-patterns/">https://willcrichton.net/rust-api-type-patterns/</a></li>
<li><a href="https://deterministic.space/elegant-apis-in-rust.html">https://deterministic.space/elegant-apis-in-rust.html</a></li>
<li><a href="https://docs.rs/derive_builder/latest/derive_builder/">https://docs.rs/derive_builder/latest/derive_builder/</a></li>
<li><a href="https://doc.rust-lang.org/rust-by-example/error/option_unwrap/and_then.html">https://doc.rust-lang.org/rust-by-example/error/option_unwrap/and_then.html</a></li>
<li><a href="https://stanford-cs242.github.io/f19/lectures/08-2-typestate#sharing-state-methods">https://stanford-cs242.github.io/f19/lectures/08-2-typestate#sharing-state-methods</a></li>
<li><a href="https://jelenkovic.xyz/posts/serde-visitor/">https://jelenkovic.xyz/posts/serde-visitor/</a></li>
</ol>`;export{n as assetURLs,t as default,p as metadata,e as toc};

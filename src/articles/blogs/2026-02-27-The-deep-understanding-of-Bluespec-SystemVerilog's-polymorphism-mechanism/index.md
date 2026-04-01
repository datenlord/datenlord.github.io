---
label: 深入理解Bluespec SystemVerilog的多态机制
description: Bluespec SystemVerilog(以下简称BSV)的多态（Polymorphism）机制使得RTL的开发者可以编写高度抽象、可复用的代码逻辑，虽然该机制从语法层面上与SystemVerilog（以下简称SV）有一定的相似性，可以降低开发者从SV到BSV的学习成本，但BSV中的多态机制与函数式编程语言中的Proviso机制深度耦合，也给初学者造成了很多的困惑。因此，本文将以实际的代码案例，为BSV的初学者详细梳理BSV中的多态机制，以及其附加引入的Proviso机制，从而帮助读者快速掌握上述内容。
location: 美国
cover: ./image1.png
author: [达坦科技DatenLord]
---
![图片](./image1.png)

Bluespec SystemVerilog(以下简称BSV)的多态（Polymorphism）机制使得RTL的开发者可以编写高度抽象、可复用的代码逻辑，虽然该机制从语法层面上与SystemVerilog（以下简称SV）有一定的相似性，可以降低开发者从SV到BSV的学习成本，但BSV中的多态机制与函数式编程语言中的Proviso机制深度耦合，也给初学者造成了很多的困惑。因此，本文将以实际的代码案例，为BSV的初学者详细梳理BSV中的多态机制，以及其附加引入的Proviso机制，从而帮助读者快速掌握上述内容。

首先来看如下一个非常简单的PrioritySearchBuffer模块，该模块是一个固定深度的FIFO，但同时附加一个查找元素的端口，可以通过tag来检索出FIFO中的数据，因此本质上这是一个具有淘汰机制的Cache模块。
````
import Vector :: *;

interface PrioritySearchBuffer#(numeric type depth, type t_tag, type t_val);
    method Action enq(t_tag tag, t_val value);
    method ActionValue#(Maybe#(t_val)) search(t_tag tag);
endinterface

// A fifo like buffer, if buffer is full, new enq will lead to deq of the oldest element.
// if the same tags exist in the buffer, the newest enququed element will be returned.
module mkPrioritySearchBuffer(PrioritySearchBuffer#(depth, t_tag, t_val)) provisos (
    Bits#(t_tag, sz_tag),
    Bits#(t_val, sz_val),
    Eq#(t_tag),
    FShow#(t_tag),
    FShow#(t_val),
    FShow#(Tuple2#(t_tag, t_val))
);
    Vector#(depth, Reg#(Maybe#(Tuple2#(t_tag, t_val)))) bufferVec <- replicateM(mkReg(tagged Invalid));

    method Action enq(t_tag tag, t_val value);
        for (Integer idx=0; idx < valueOf(depth)-1; idx=idx+1) begin
            bufferVec[idx+1] <= bufferVec[idx];
        end
        bufferVec[0] <= tagged Valid tuple2(tag, value);
    endmethod

    method ActionValue#(Maybe#(t_val)) search(t_tag tag);
        Maybe#(t_val) ret = tagged Invalid;
        for (Integer idx=valueOf(depth)-1; idx >=0 ; idx=idx-1) begin
            if (bufferVec[idx] matchestagged Valid .readTuple) begin
                let {readTag, readVal} = readTuple;
                if (readTag == tag) begin
                    ret = tagged Valid readVal;
                end
            end
        end
        return ret;
    endmethod
endmodule

module mkTB(Empty);
    PrioritySearchBuffer#(10, Bit#(10), Bit#(10)) a <- mkPrioritySearchBuffer;
endmodule
````

首先观察开头的interface定义：
````
interface PrioritySearchBuffer#(numeric type depth, type t_tag, type t_val);
    method Action enq(t_tag tag, t_val value);
    method ActionValue#(Maybe#(t_val)) search(t_tag tag);
endinterface
````

这里，第1行通过在interface名称后面跟一个#的写法来使用多态特性，在#后面的括号中定义了depth、t_tag、t_val这3个类型变量（type variable）。类型变量表示未知（但特定）的类型，也就是说这个类型在不同的接口实例中可以有不同的值，但是对于某一个特定的接口实例，这个这个变量所代表的类型就是固定的。



在interface中定义的类型变量可以简单的理解为一个“占位符”，因为它并没有过多的约束，即我们不能在interface的定义中添加provisos关键字来对类型变量做出约束。但是，有一个简单的约束可以用在这里，即numeric前缀，它表示这个类型必须是一个代表数值的类型，也就是说这个我们可以使用valueOf()伪函数将该类型转换为一个Integer类型，而不带有numeric前缀的类型变量所代表的类型则不可以使用valueOf()进行转换。



再继续观察第2和第3行，这里引用了第1行定义的t_tag和t_val两个类型变量，再未来有module要使用这个接口时，类型变量这个“占位符”将被对应的真实类型所替代。



细心的读者可能会发现，在这个接口中定义的depth类型变量并没有被使用，这是为什么呢？先将其留作一个问题，看完下文就会知道答案。



再来观察下面使用该Interface的Module定义，这里我们只关心Module的接口部分以及一小部分用到类型参数的代码，将代码搬运如下：
````
module mkPrioritySearchBuffer(PrioritySearchBuffer#(depth, t_tag, t_val)) provisos (
    Bits#(t_tag, sz_tag),
    Bits#(t_val, sz_val),
    Eq#(t_tag),
    FShow#(t_tag),
    FShow#(t_val),
    FShow#(Tuple2#(t_tag, t_val))
);
    Vector#(depth, Reg#(Maybe#(Tuple2#(t_tag, t_val)))) bufferVec <- replicateM(mkReg(tagged Invalid));

    method Action enq(t_tag tag, t_val value);
        for (Integer idx=0; idx < valueOf(depth)-1; idx=idx+1) begin
        end
    endmethod
endmodule
````

在这段代码中，第1行定义了一个名为mkPrioritySearchBuffer的Module，其对外的接口类型为PrioritySearchBuffer#(depth, t_tag, t_val)，很明显，这里又出现了类型参数depth、t_tag和t_val，这三个类型参数与interface定义中的三个类型参数之间通过先后顺序的位置来建立对应关系，也就是说，module定义中的这三个类型参数可以使用其他的名字，在上述示例中只是为了描述简洁而使用了同样的名称。



继续观察第1行的结尾，有一个名为provisos的关键字，这个关键字继承于Haskell这样的函数式编程语言（BSV的前身Bluespec Classic就是一个Haskell形式的语言），用于对类型变量进行约束。实际上，经常有人把BSV和Verilog的关系类比为Rust和C，如果读者熟悉Rust语言的话，则可以认为BSV中的provisos和Rust中通过where语句对泛型参数施加Trait约束是一样的，当然，我们并不假设读者了解Rust语言，所以接下来我们会详细介绍上述代码中2~7行所表示的含义。



Provisos语句的作用是对各个类型变量进行约束，要求这些类型变量不能代表任意类型，而只能代表具有某些特征的类型。以上述第3行为例，Eq#(t_tag)这个约束表示t_tag这个类型变量所代表类型必须支持“相等比较”这个操作，换句话说，就是t_tag这个类型变量代表的是一个未知的类型，这个类型只有在程序的其他地方被实例化时才会确定下来，但是，虽然我们不知道他的具体类型时什么，但这个类型必须具备可以进行“相等比较”这个操作的能力。通常来说，BSV中的基础数据类型，如Bit等，都是可以进行相等比较的，而通过struct定义的结构体则默认是不可比较的。



再来观察下面5~7行的FShow约束，这个主要是为了在仿真过程中可以在$display中使用fshow函数来将一个信号友好的打印出来，如果不加入这两个约束，则该模块中将不能使用fshow来打印t_tag和t_val类型的数据。这里需要注意的是，provisos是不会自动传导的，以第7行为例，虽然t_tag和t_val都已经添加了FShow约束，但是由这两种类型构成的复合类型Tuple2#(t_tag, t_val)并不会自动具备FShow约束，仍然需要手工添加。



然后我们来观察上述代码的2~3行，这里的Bits约束由两个类型，分别是t_tag和sz_tag，这里涉及到了provisos语句块中的一个特性：Provisos不仅可以为已经出现过的类型变量添加约束，还可以定义新的类型变量。以Bits#(t_tag, sz_tag)为例，如果按照代码从上向下阅读的顺序，t_tag是我们已经定义好的一个类型变量（因为他出现在第1行的Interface定义中），而sz_tag这个标识符还是第一次出现，所以这里本质上是新定义了一个叫做sz_tag的类型变量，且约束sz_tag是一个数值型的类型（numeric type），而且其取值是t_tag的位宽。



为了加深读者的理解，这里再介绍一下上面实例代码中没有出现的Add#(n1, n2, n3)约束，这个约束需要传入三个类型变量，且这三个变量满足n1 + n2 = n3这个条件。一种常见的写法（以及在BSB编译器报错中经常可以看到的）是形如Add#(n1, a__, n2)的约束，这里的a__写法是一个约定俗成的占位符写法，由于BSV中用类型来表示的数值（numeric type）必须是非负的，表示这个值我不关心（在复杂的Provisos语句中可能还会看到更多的占位符，例如b__, c__等等），由于n1加上一个我不关心的非负数后等于n2，所以这里表达的意思是n2 >= n1。



接下来解决一下前面的遗留问题：为什么Interface的定义里出现了一个没有用到的depth类型变量呢？我们可以观察上述代码块（为了方便，将重要的几行代码摘抄到下面）：
````
Vector#(depth, Reg#(Maybe#(Tuple2#(t_tag, t_val)))) bufferVec <- replicateM(mkReg(tagged Invalid));
for (Integer idx=0; idx < valueOf(depth)-1; idx=idx+1) begin
````

可以看到，上述代码第1行定义了一个Vector用于存储数据，而Vector的大小是由depth这个数值类型定义的；此外，上述第2行代码中编写了一个for循环，循环语句中也使用valueOf(depth)将depth这个numeric type所代表的数值转换成为Integer类型，以便for语句可以使用这个数值。因此，在Interface中定义的类型变量depth虽然没有在Interface定义中被使用到，但是却可以在module定义时被使用。



最后，我们再来演示一下这种带有provisos约束的类型如何使用，一个最简单的应用案例如下所示：
````
module mkTB(Empty);
    PrioritySearchBuffer#(10, Bit#(10), Bit#(10)) a <- mkPrioritySearchBuffer;
endmodule
````

上述代码在实例化a的时候需要明确指定a的类型为PrioritySearchBuffer#(10, Bit#(10), Bit#(10)),通过这种方式，BSV的编译器就可以将类型变量固定为一个具体的类型。上述代码中，由于Bit是一个内置的基础类型，因此他本身就被派生了FShow，所以上述代码编译并不会报错。但如果将上述代码改为下面的样子：
````
typedef struct {
    Bit#(10)      bar;
} Foo;

module mkTB(Empty);
    PrioritySearchBuffer#(10, Foo, Bit#(10)) a <- mkPrioritySearchBuffer;
endmodule
````

则会得到如下报错信息：
````
Error: "a.bsv", line 46, column 46: (T0031)
  The provisos for this expression could not be resolved because there are no
  instances of the form:
    FShow#(a::Foo)
  The proviso was implied by expressions at the following positions:
    "a.bsv", line 46, column 51
Error: "a.bsv", line 46, column 46: (T0031)
  The provisos for this expression could not be resolved because there are no
  instances of the form:
    Eq#(a::Foo)
  The proviso was implied by expressions at the following positions:
    "a.bsv", line 46, column 51
Error: "a.bsv", line 46, column 46: (T0031)
  The provisos for this expression could not be resolved because there are no
  instances of the form:
    Bits#(a::Foo, a__)
  The proviso was implied by expressions at the following positions:
    "a.bsv", line 46, column 51
````

关注上述报错的第2~4行、8~10行和14~16行，可以看到编译器发现Foo类型不满足FShow、Eq和Bits这三个provisos约束，为了解决这个问题，我们需要向Foo类型添加必要的功能。由于Foo内部的每个成员都是满足FShow、Eq和Bits的，因此我们可以使用一个简单的派生方式，让Foo也成为FShow、Eq和Bits的，详细代码如下。但这里需要注意，如果某个复杂类型内部有任意成员不支持指定的功能，则无法使用自动派生，必须手写typeclass实现，这种情况较为复杂，本文不再介绍，感兴趣的读者可以阅读文章最后的参考材料中关于typeclass的介绍。
````
typedef struct {
    Bit#(10)      bar;
} Foo deriving(Bits, Eq, FShow);
````

通过上述介绍，我们已经涵盖了BSV中多态绝大多数的应用场景，希望可以帮助各位读者扫清学习BSV路上的一些障碍。关于详细了解BSV的语法，可以参考文章结尾给出参考资料中的《BluespecTM SystemVerilog Language Reference Guide》一书。



参考资料：

https://github.com/B-Lang-org/bsc/releases/download/2025.07/BSV_lang_ref_guide.pdf

https://github.com/open-rdma/open-rdma-rtl


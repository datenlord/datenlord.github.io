const e="/zh-cn/assets/image1-88766b18.png",r=[e],t={label:"实现一个 RDMA 用户态驱动程序",description:"为了让更多开发者能够对RDMA底层实现有更清晰的了解，我们会在近期开源一套全新的100G RDMA加速卡软硬件方案：blue-rdma。与此同时，我们也会为大家带来一系列文章，涵盖了RDMA驱动程序开发、RDMA硬件原理、RDMA生态适配、RDMA性能调优等多方面内容，干货满满。",location:"中国香港",cover:"./image1.png",author:["陈添"],date:"2025-02-25",title:"Implement a User Mode RDMA Driver"},i=[{label:"背景知识",level:2},{label:"技术实现路径",level:2},{label:"总结",level:2},{label:"未来展望",level:2},{label:"关于作者",level:2}],d=`<p><img src="${e}" alt="图片">
写在前面</p>
<p>随着DeepSeek的火爆，当众人将目光集中到模型优化时，底层网络通信基础设施的重要性往往容易被忽略。实际上，高性能、易维护、易定制的网络基础设施对于提升AI训练、推理的效率是至关重要的一环。目前，主流的高性能网络通信方案基本被几家头部公司垄断，其提供的标准API接口也已经被精心封装，绝大多数开发者无需关心底层实现细节。达坦科技始终致力于国产高性能网络基础设施解决方案的研发，深知网络通信基础设施在AI大模型生态中的重要地位。</p>
<p>为了让更多开发者能够对RDMA底层实现有更清晰的了解，我们会在近期开源一套全新的100G RDMA加速卡软硬件方案：blue-rdma。与此同时，我们也会为大家带来一系列文章，涵盖了RDMA驱动程序开发、RDMA硬件原理、RDMA生态适配、RDMA性能调优等多方面内容，干货满满。</p>
<p>由于目前blue-rdma还处于非常早期的阶段，希望大家在阅读全系列后文章后，能够对整个软件及硬件方案有深入了解；可以在社区中一起为blue-rdma提PR，不断改进blue-rdma；甚至自己定制开发blue-rdma来满足自己的使用需要。在文章的末尾，可以添加达坦的微信小助手，加入blue-rdma的讨论群。</p>
<p>好了，言归正传，这次分享的文章与blue-rdma本身的实现没有关系，而是一个关于在Linux操作系统上如何实现一个简单RDMA用户态驱动程序的介绍。</p>
<h2 id="背景知识">背景知识</h2>
<p>RDMA (Remote Direct Memory Access) 是一种可以将主机用户内存数据直接传输到另一台主机用户内存数据中的技术。和 DMA 技术相同，在数据的传输写入过程中不需要 CPU 的参与，从而减轻 CPU 的负担，这使得 CPU 能够专注于计算任务，从而提高计算效率。同时 RDMA 也是一种内核旁路技术，允许服务器之间进行内存到内存的数据传输的过程中，绕过操作系统的网络栈，从而降低网络传输的延迟以及提高网络带宽的利用效率。对于在同一个数据中心内的 AI 大模型训练以及大数据，云计算的场景下，RDMA 的这些优势能够很好的发挥 。</p>
<p>RDMA 设备驱动可以分为内核态和用户态两部分：</p>
<p>内核态：</p>
<p>负责硬件资源的管理：创建和管理相应的 RDMA 对象，对硬件进行资源隔离，使得多个用户态程序可以安全地共享设备资源。</p>
<p>内存管理：提供注册用户态内存作为 DMA 区域的接口，使设备可以直接读取相应内存，减少 CPU 开销。提供将设备内存地址空间映射到用户态的能力，使得用户态程序能够通过 mmap 系统调用将设备的寄存器等资源映射到用户程序的地址空间，给予用户程序绕过内核直接与硬件进行交互的能力。</p>
<p>用户态：</p>
<p>硬件接口抽象：利用内核驱动提供的功能，封装硬件操作，向用户提供一组易用的 API，让用户程序可以通过 API 来控制硬件，发送和接收数据。</p>
<p>直接内存访问：允许应用程序注册内存区域，直接进行 RDMA 读写，而无需内核参与数据拷贝。</p>
<p>这种设计减少了内核与用户空间之间的切换，提升了性能。</p>
<p>在我们的工作场景下发现，我们的工作负载往往是单用户单进程独占 RDMA 设备进行传输。这让我们意识到也许并不需要操作系统来提供对 RDMA 设备的共享访问与权限控制，可以将驱动的主要逻辑放到用户态来实现。基于这个想法，我们开发了 blue-rdma 项目，将驱动开发的重心从内核模块转移到用户态驱动。通过牺牲操作系统对设备的安全访问控制，我们得到了几点好处：</p>
<p>在用户态开发驱动程序意味着不需要和内核版本绑定，能够方便地移植到不同内核版本的机器上。</p>
<p>内核态驱动只需要简单的实现，原本需要同时面对内核态驱动和用户态驱动的复杂度，现在只需要关注用户态驱动的复杂度。</p>
<p>用户态驱动程序往往比内核模块更容易测试与调试。</p>
<p>用户态驱动程序的 bug 不会直接导致 kernel panic.</p>
<p>用户态驱动程序所使用的开发语言可以不限于传统驱动开发所使用的 C 语言，支持多语言开发（如Rust）。</p>
<p>使用Rust在用户态开发驱动程序</p>
<p>我们的 blue-rdma 项目选择使用 Rust 来作为用户态驱动的开发语言。</p>
<p>Rust 的所有权系统和借用检查机制确保了内存安全的同时，其性能也十分优秀。Rust 对多线程和异步编程支持相当成熟，这使得在用户态开发中实现高效且安全的并发操作变得更加容易，从而满足现代多核处理器环境下对并发性能的需求。Rust 还拥有拥有现代化的工具链和丰富的库。这些工具使得开发者能够快速构建、测试和维护驱动程序，提升开发效率。Rust 也能够通过外部函数接口（FFI）与 C/C++ 代码进行交互，这使得开发者可以利用现有的库和资源。</p>
<h2 id="技术实现路径">技术实现路径</h2>
<p>大部分 RDMA 开发者都习惯使用 libibverbs 来进行开发，因此 blue-rdma 也想要适配 libibverbs 的接口，方便开发者们使用。</p>
<p>rdma-core 是 RDMA 用户态驱动的框架，libibverbs 就是这个框架提供的其中一个组件，类似的还有 librdmacm 组件以及 libibumad 组件。除此之外还有一些示例代码以及测试套件。</p>
<p>适配 libibverbs 需要修改 rdma-core, 接下来我以 rdma-core 的 stable-v55 分支作为示例，讲解如何让 libibverbs 支持 blue-rdma 后端。</p>
<p>基于 rdma-core 框架添加新的 provider</p>
<p>以下以 rdma-core 分支 stable-v55 为例。</p>
<p>rdma-core 作为 RDMA 用户态驱动框架，通过 provider 机制支持不同硬件的适配，只需要在 providers 文件夹下添加新的实现，就可以通过 verbs 接口调用支持的方法了。</p>
<p>下面以 blue-rdma provider 为例，介绍如何在 rdma-core 下添加新的 provider.</p>
<p>目录结构与构建配置</p>
<p>首先需要在 providers 文件夹下创建新的 provider, 基本文件夹结构如下。</p>
<pre><code>>>> tree rdma-core/providers
providers/
├── bluerdma
│   ├── CMakeLists.txt    # 构建规则
│   ├── bluerdma-abi.h    # 内核交互 ABI 定义
│   ├── bluerdma.c        # 数据结构声明
│   └── bluerdma.h        # 驱动实现与注册逻辑
├── bnxt_re
</code></pre>
<p>CMakeLists.txt 描述了怎样编译 provider。</p>
<p>bluerdma-abi.h 中包含了与内核模块交互时请求参数类型和回复参数类型的声明。</p>
<p>bluerdma.h 中包含了用户态驱动所需结构体的声明。</p>
<p>bluerdma.c 中包含了用户态驱动的具体实现以及注册当前 provider.</p>
<p>此外，还需要修改 rdma-core 的 CMakeLists.txt 文件让构建系统将新编写的 provider 包括进去。</p>
<pre><code>>>> git diff rdma-core/CMakeLists.txt
diff --git a/CMakeLists.txt b/CMakeLists.txt
--- a/CMakeLists.txt
+++ b/CMakeLists.txt
@@ -711,6 +711,7 @@

 # Providers
 if (HAVE_COHERENT_DMA)
+add_subdirectory(providers/bluerdma) # 引入 bluerdma
 add_subdirectory(providers/bnxt_re)
 add_subdirectory(providers/cxgb4) # NO SPARSE
 add_subdirectory(providers/efa)
</code></pre>
<p>我们的驱动需要 COHERENT_DMA 支持，同时我注意到之前的 providers 都是按照字典序来排序的，所以这里将 bluerdma 放在了第一个，实际位置可以调整。</p>
<p>注：如果想要合入 rdma-core 主线的话，需要修改更多的文件，比如 MAINTAINERS. 可以在那些已经合入主线中的驱动中找到更全面的修改，比如 erdma 的 PR[1].</p>
<p>接下来介绍新增文件夹中每个文件中的内容以及相关信息。</p>
<p>CMakeLists.txt 里描述了 provider 的构建规则。</p>
<pre><code>>>> cat rdma-core/providers/bluerdma/CMakeLists.txt
rdma_provider(bluerdma
  bluerdma.c
)
</code></pre>
<p>在 rdma-core 里已经有相当不错的基础设施来辅助编写 provider 了，这里 rdma_provider[2] 函数定义在 rdma-core/buildlib/rdma_functions.cmake 当中，最终会将 bluerdma.c 编译成一个动态链接库。</p>
<p>实际的编译产物是 BUILD_DIR/lib/libbluerdma-rdmav34.so.</p>
<p>值得一提的是，大部分情况下使用 rdma_provider就已经能满足需求，比如 rxe, erdma 等 provider 都只使用了 rdma_provider 描述构建目标。</p>
<p>但是在 mlx 驱动中的 CMakeLists.txt 里可以发现他们的驱动还依赖了 libmlx.so 这个动态库，对于这样的需求， rdma-core 在 rdma_functions.cmake 中提供了 rdma_pkg_config[3] 这个函数，其内部通过 pkg-config 来添加依赖。</p>
<p>关键代码实现</p>
<p>bluerdma-abi.h 用于声明和内核模块交互时 command 的请求参数类型以及回复参数类型。</p>
<pre><code>#ifndef __BLUERDMA_ABI_H__
#define __BLUERDMA_ABI_H__

#include &#x3C;infiniband/kern-abi.h>
#include &#x3C;rdma/bluerdma-abi.h>
#include &#x3C;kernel-abi/bluerdma-abi.h>

DECLARE_DRV_CMD(bluerdma_cmd_alloc_context, IB_USER_VERBS_CMD_GET_CONTEXT, empty, empty);

#endif /* __BLUERDMA_ABI_H__ */
</code></pre>
<p>这里使用的 DECLARE_DRV_CMD[4] 定义在 rdma-core/libibverbs/kern-abi.h 当中。</p>
<pre><code>#define DECLARE_DRV_CMD(_name, _enum, _kabi_req, _kabi_resp)
</code></pre>
<p>作用是声明 command 对应的请求参数类型以及回复参数类型，并做类型大小以及对齐的检查。</p>
<p>生成的请求参数类型以及回复参数类型最终会放置在 BUILD_DIR/include/kernel-abi/bluerdma-abi.h 当中。</p>
<p>DECLARE_DRV_CMD 的第 3 个参数是请求的 payload 类型, 第 4 个参数是回复的 payload 类型，这两个类型通常是定义在 rdma-core/kernel-headers/rdma/ 文件夹下对应的头文件当中。</p>
<p>如果不需要带 payload, 可以用 empty 占位符来代替，kern-abi.h 中定义了相关的类型。</p>
<p>实际上，在 kern-abi.h 中还定义了默认的请求参数类型以及回复参数类型。在 rxe.c 中对 ibv_cmd_alloc_context的调用[5]使用就是这些默认参数类型。值得一提的是，尽管可以直接在 kernel-headers/rdma/ 下直接添加自己使用的 abi header, 但是逻辑上 abi header 规定的是与内核模块交互所用到的类型，因此更好的方式是使用 rdma-core/kernel-headers/update 这个脚本从 linux kernel 生成对应的 kernel-headers, 同时也能避免 abi 兼容问题。</p>
<p>bluerdma.h 中包含了用户态驱动所需结构体的声明。</p>
<pre><code>#ifndef __BLUERDMA_ABI_H__
#define __BLUERDMA_ABI_H__

#include &#x3C;infiniband/driver.h>
#include &#x3C;infiniband/verbs.h>

struct bluerdma_device {
        struct verbs_device verbs_dev;
        void* driver_data;
};
struct bluerdma_context {
        struct verbs_context verbs_ctx;
};

#endif /* __BLUERDMA_ABI_H__ */
</code></pre>
<p>bluerdma.c 中包含了用户态驱动的具体实现以及注册当前 provider.</p>
<pre><code>static const struct verbs_match_ent bluerdma_match_table[] = {
        VERBS_DRIVER_ID(RDMA_DRIVER_UNKNOWN),
        VERBS_NAME_MATCH("bluerdma", NULL),
        {},
};
static const struct verbs_device_ops bluerdma_dev_ops = {
        .name = "bluerdma",
        .match_min_abi_version = 1,
        .match_max_abi_version = 1,
        .match_table = bluerdma_match_table,
        .alloc_device = bluerdma_alloc_device,
        .uninit_device = bluerdma_uninit_device,
        .alloc_context = bluerdma_alloc_context,
};
PROVIDER_DRIVER(bluerdma, bluerdma_dev_ops);
</code></pre>
<p>这里的 PROVIDER_DRIVER[6], VERBS_DRIVER_ID[7] 和 VERBS_NAME_MATCH[8] 都定义在 rdma-core/libibverbs/driver.h 当中。</p>
<p>PROVIDER_DRIVER 的作用就是注册相应的 verbs_device_ops.</p>
<p>当用户想要使用 verbs 接口时，会先调用 ibv_get_device_list[9] 获取所有的 uverbs 设备信息。在第一次调用 ibv_get_device_list 时，会进行所有 uverbs 设备的初始化，将现有的 uverbs 设备与所有 verbs_device_ops 的 match_table 进行匹配，如果成功匹配，就调用相应的 alloc_device 进行分配。</p>
<p>整个初始化的过程都由 dev_list_lock 锁进行保护，保证了 alloc_device 是单线程的并最多只被调用一次。</p>
<p>尽管在 driver.h 当中推荐新的驱动只使用合适的 VERBS_DRIVER_ID 进行匹配，但是这里依旧使用了 RDMA_DRIVER_UNKNOWN.</p>
<p>这样做的原因是，如果不使用RDMA_DRIVER_UNKNOWN 而去自己添加新的设备 ID 的话，新添加的 ID 应当位于 rdma-core/kernel-headers/rdma/ib_user_ioctl_verbs.h 当中，前面提到过，kernel-headers 最好是使用 update 脚本从 linux kernel 进行生成，所以这里选择使用 RDMA_DRIVER_UNKNOWN.</p>
<p>而从 rdma-core/libibverbs/init.c 中 match_driver_id[10]的实现来看，RDMA_DRIVER_UNKNOWN 会让 match_driver_id 永远返回 NULL, 因此需要其他匹配方式。</p>
<p>VERBS_NAME_MATCH 是基于 uverbs 名字的匹配方案，尽管 driver.h 当中不鼓励使用 VERBS_NAME_MATCH 来匹配设备，但是 VERBS_NAME_MATCH 作为 VERBS_DRIVER_ID 的替代方案是相当合适的。</p>
<p>match_min_abi_version 以及 match_max_abi_version 都设置为 1, 这是因为新 driver 的 abi version 都应该从 1 开始[11]，而 rxe 的 abi_version[12] 在 32bit 平台下不兼容才需要新的 abi version.</p>
<p>alloc_device 分配的 verbs_device 结构体内都带有一个引用计数，当这个引用计数变为 0 的时候，会调用 uninit_device 来回收分配的内存。</p>
<p>当用户通过 ibv_get_device_list 拿到了相应的设备之后，再通过 ibv_open_device[13] 打开设备。在 ibv_open_device 里会调用注册的 alloc_context 回调函数分配 context.</p>
<pre><code>static struct verbs_context_ops bluerdma_ctx_ops = {
        // ...
        .query_port = bluerdma_query_port,
        .free_context = bluerdma_free_context,
        // ...
};
static struct verbs_context *
bluerdma_alloc_context(struct ibv_device *ibdev, int cmd_fd, void *private_data)
{
        struct bluerdma_device *dev = to_bdev(ibdev);
        struct bluerdma_context *context;
        context = verbs_init_and_alloc_context(ibdev, cmd_fd, context, ibv_ctx,
                                               RDMA_DRIVER_UNKNOWN);
        if (!context)
                return NULL;
        if (ibv_cmd_get_context(&#x26;context->ibv_ctx, NULL, 0, NULL, 0))
                goto err_out;
        verbs_set_ops(&#x26;context->ibv_ctx, &#x26;bluerdma_ctx_ops);
        return &#x26;context->ibv_ctx;
err_out:
        verbs_uninit_context(&#x26;context->ibv_ctx);
        free(context);
        return NULL;
}
</code></pre>
<p>在 alloc_context 中需要使用 ibv_cmd_get_context 来通知内核模块分配 uverbs 相关的上下文，不然的话无法使用内核模块中 uverbs 的相关接口。</p>
<p>在 alloc_context 中也会向 context 中注册 verbs 相关的回调函数，如果不注册对应的相关函数，则默认使用 verbs_init_and_alloc_context[14]当中注册的默认回调函数[15]。</p>
<p>注册了相关回调函数后，我们的 provider 就可以向用户提供 verbs 的接口了。</p>
<p>最后还需要将 Rust 编写的驱动核心逻辑接入 provider, 这一点可以通过前文提到的 rdma_pkg_config将 Rust 编写的动态链接库链接到 provider 当中，也可使用动态加载的方式，在 alloc_context 的时候通过 dlopen, dlsym 加载相应的函数。</p>
<p>值得一提的是，大部分常用的 ibv_* 系列接口最终都会调用到 provider 注册的回调函数，但是也会存在一些函数并没有对应的回调函数。比如 ibv_query_gid[16] 和 ibv_query_pkey[17] 函数。其中 ibv_query_gid 是利用 ioctl 或者 write 系统调用向 uverbs 设备发起请求，在内核模块中根据设备的 core_cap_flags 来调用对应的方法获取 gid, 在 rdma-core 的框架下需要进入内核态来完成这个请求。类似的， ibv_query_pkey 是通过使用 read 系统调用读取与 verbs_device 相应的 sysfs 文件来获取 pkey.</p>
<p>编写 Rust 胶水层连接具体驱动逻辑</p>
<p>完成了 rdma-core 中 provider 的实现后，接下来还需要做的是将 verbs_context_ops 中注册的回调函数连接到我们用 Rust 实现的具体驱动逻辑，为此我们需要编写一个 ffi 胶水层。</p>
<p>对于 Rust 具体驱动逻辑，这个胶水层需要将 provider 中定义的 C 类型导入到 Rust 当中，从而让胶水层可以导出签名正确的回调函数，并访问 C 类型中的成员，将 Rust 驱动的实例存储在 C provider 当中。</p>
<p>对于 C provider，这个胶水层需要编译出一个动态链接库，这个动态链接库包含了回调函数的具体实现，让 C provider 可以通过动态链接或者动态加载的方式，使用 verbs_set_ops 宏注册所需的回调函数。</p>
<p>FFI 绑定生成</p>
<p>将 provider 中定义的 C 类型导入到 Rust 当中需要使用到 bindgen 来生成 C 到 Rust 的 ffi 类型，这部分可以参考 rust-ibverbs-sys[18] 库来编写 bulid.rs。</p>
<pre><code>// build.rs
use std::env;
use std::path::{Path, PathBuf};
use std::process::Command;

fn main() {
    let manifest_dir = env::var("CARGO_MANIFEST_DIR").expect("failed to get current directory");
    let rdma_core_dir = format!("{manifest_dir}/../rdma-core-v55");
    
    println!("cargo:include={rdma_core_dir}/build/include");
    println!("cargo:rustc-link-search=native={rdma_core_dir}/build/lib");
    println!("cargo:rustc-link-lib=ibverbs");
    
    // build rdma-core
    // note that we only build it to generate the bindings!
    let built_in = cmake::Config::new(&#x26;rdma_core_dir)
        .define("NO_MAN_PAGES", "1")
        .no_build_target(true)
        .build();
    let built_in = built_in.to_str().expect("build directory path is not valid UTF-8");

    let provider = "bluerdma";
    let bindings = bindgen::Builder::default()
        .header(format!("{rdma_core_dir}/providers/{provider}/{provider}.h"))
        .clang_arg(format!("-I{built_in}/build/include/"))
        .allowlist_type("ibv_.*")
        .allowlist_type("verbs_.*")
        .allowlist_type(format!("{provider}_.*"))
        .generate()
        .expect("Unable to generate bindings");

    // write the bindings to the $OUT_DIR/bindings.rs file.
    let out_path = PathBuf::from(env::var("OUT_DIR").unwrap());
    bindings
        .write_to_file(out_path.join("bindings.rs"))
        .expect("Could not write bindings");
}
</code></pre>
<p>这样就可以通过 bindgen 生成出来的 Rust 文件来访问 C 文件中定义的结构体了。</p>
<pre><code>// src/ffi.rs
use std::mem::size_of;
include!(concat!(env!("OUT_DIR"), "/bindings.rs"));
const _: () = assert!(size_of::&#x3C;bluerdma_device>() == size_of::&#x3C;verbs_device>() + size_of::&#x3C;*const std::ffi::c_void>());
</code></pre>
<p>我们还需要为 C provider 提供一个动态链接库，只需要在 Cargo.toml 声明 lib 类型为 cdylib 即可。</p>
<pre><code># Cargo.toml
[package]
name = "bluerdma_rust"
version = "0.0.0"
edition = "2024"

[lib]
crate-type = ["cdylib"]
</code></pre>
<p>跨语言接口设计</p>
<p>接下来就可以实现并导出相关的函数。#[unsafe(export_name="xxx")] 用来声明导出的符号，其中 unsafe 部分是 Rust Edition 2024 之后要求的，之前的版本可以不加。导出的函数会被 C 调用因此需要加上 extern "C" 来满足 ffi 规范。而 C provider 要求的回调函数签名基本都需要和指针打交道，胶水层也没有办法对外部 C 调用做出约束，所以这些函数都带有 unsafe 标识。</p>
<pre><code>// src/exports.rs
#[unsafe(export_name = "bluerdma_new")]
pub unsafe extern "C" fn bluerdma_new(sysfs_name: *const c_char) -> *mut c_void {
    // Safety: caller must ensure 'sysfs_name' is a valid C str.
    let sysfs_name = unsafe { CStr::from_ptr(sysfs_name) }.to_str().unwrap();
    Box::into_raw(Box::new(BlueRdmaDriver::new(sysfs_name)).cast()
}
#[unsafe(export_name = "bluerdma_free")]
pub unsafe extern "C" fn bluerdma_free(driver_data: *const c_void) {
    let ptr = driver_data.cast::&#x3C;BlueRdmaDriver>().cast_mut();
    // Safety: caller must ensure 'driver_data' is a valid Box.
    let _ = unsafe { Box::from_raw(ptr) };
}
#[unsafe(export_name = "bluerdma_query_port")]
pub unsafe extern "C" fn bluerdma_query_port(
    context: *mut ffi::ibv_context,
    port_num: u8,
    port_attr: *mut ffi::ibv_port_attr,
) -> ::std::os::raw::c_int {
    // Safety: caller must ensure 'context' is valid.
    let Some(ibdev) = unsafe { context.as_ref() }.map(|ctx| ctx.device) else {
        return libc::EINVAL;
    };
    let driver = unsafe { to_driver(ibdev).as_ref() };
    let Some(driver) = driver else {
        return libc::EINVAL;
    };
    let Some(port_data) = driver.query_port(port_num) else {
        return libc::EINVAL;
    };

    // set 'port_attr' from 'port_data'
    
    return 0;
}
</code></pre>
<p>bluerdma_new 以及 bluerdma_free 都不是回调函数，而是初始化和释放 Rust driver 的函数。在 C provider 初始化的时候会调用 bluerdma_new, 并将得到的 Rust driver 的指针存储到 bluerdma_device 中，在释放的时候也需要调用 bluerdma_free 函数。之后对 verbs api 的调用中都能从 ibv_context 中取得 Rust driver 的指针。</p>
<p>bluerdma_query_port 则是回调函数，libibverbs 提供的 ibv_query_port 函数最终就会调用这个回调函数。在 bluerdma_query_port 的实现中，从 context 取得 Rust driver 的指针，经过检查后转换为共享引用，再调用 driver 上的方法来实现具体功能，最后按照 C provider 回调函数的规范设置参数以及返回值。</p>
<p>其中 blue_query_port 中 to_driver 函数的作用是通过 ibv_device 的指针得到 driver_data 的指针，它的实现使用了类似 kernel 中的 container_of 宏的功能，在 Rust-For-Linux 中也有对应的 container_of 宏[19]。</p>
<pre><code>// src/export.rs
const unsafe fn to_driver(ibdev: *mut ffi::ibv_device) -> *const BlueRdmaDriver {
    let ibdev = ibdev.cast_const().cast::&#x3C;u8>();
    let offset: usize = ::core::mem::offset_of!(bluerdma_device, verbs_dev.device);
    let bdev = unsafe { ibdev.sub(offset) }.cast::&#x3C;bluerdma_device>();
    
    if let Some(bdev) = unsafe { bdev.as_ref() } {
        bdev.driver_data.cast()
    } else {
        ptr::null()
    }
}
// 类似的 C 函数
inline static void* to_driver(struct ibv_device *ibdev) {
    struct bluerdma_device* bdev = container_of(ibdev, struct bluerdma_device, verbs_dev.device);
    return bdev ? bdev->driver_data : NULL;
}
</code></pre>
<h2 id="总结">总结</h2>
<p>本文主要讲解了在用户态使用 Rust 开发 RDMA 驱动程序中，如何为 libibverbs 的 verbs API 添加一个新的后端实现。具体实现上，本文详细描述了如何在 rdma-core 框架上新增一个新的 provider, 使得 verbs API 可以调用到在 provider 中注册的回调函数。同时提供一个实例讲解如何通过编写 Rust ffi 胶水层，将 C provider 与 Rust 核心驱动逻辑进行连接。最终实现了用户态 Rust 开发的 RDMA 驱动程序与 libibverbs 生态的兼容，为 RDMA 相关开发人员提供了熟悉的 API 接口。</p>
<h2 id="未来展望">未来展望</h2>
<p>本文讲述的 blue-rdma 实际上还不是很完善，还存在不少可以改进的点。</p>
<p>ibv_context 单例化：根据我们的场景，我们核心 Rust driver 只会实例化一次，同时驱动的状态也都存储在 Rust driver 当中，因此在 alloc_context 的时候可以复用同一个 context, 降低一些开销。这点可以参考 HabanaLabs provider 的实现[20]，使用引用计数和全局静态变量，在 provider 中第一次调用 alloc_context 用 bluerdma_new 创建新的实例并存储在一个全局的 context 中，之后调用 alloc_context 时仅增加引用计数并返回这个全局 context，而不实际分配资源给新的 context. 回收时在 free_context 中减少引用计数，如果计数为 0, 再通过 bluerdma_free 释放 Rust driver 以及释放全局的 context 资源。</p>
<p>将 Rust driver 的生命周期与设备绑定：目前的实现机制中，Rust driver 由 C provider 创建并存储在 provider 定义的结构体中。这个结构体由 rdma-core 管理生命周期，因此当 rdma-core 相关的动态链接库，如 libibverbs, 全部从内存中卸载掉时，Rust driver 之前存储的状态就丢失了。我们更希望 Rust driver 的生命周期与内核态的设备保持一致，这样即便进程退出，卸载了 rdma-core 相关的动态链接库，Rust driver 仍旧存储着进程之前设置的状态。这样下次进程重新使用 verbs 接口时可以不必重新初始化 Rust driver 的状态。</p>
<p>本文的重点放在了 RDMA 驱动程序的用户态，不过内核态的驱动程序也承担了很重要的职责，之后考虑出一篇文章单独讲讲内核态驱动的实现。</p>
<h2 id="关于作者">关于作者</h2>
<p>作者是达坦科技软硬件联合开发小组的工程师，负责 RDMA 相关的开发和维护。欢迎在 Github (Foreverhighness) 上与我交流。</p>`;export{r as assetURLs,d as default,t as metadata,i as toc};

const p="/assets/image1-481d8d0f.png",e="/assets/image2-5fe5e73e.png",a="/assets/image3-26368f09.png",t="/assets/image4-8600c16d.png",o="/assets/image5-82377525.png",r="/assets/image6-92870d1b.png",n="/assets/image7-3aaed6cf.png",s="/assets/image8-e698fe49.png",i="/assets/image9-e74c99d7.png",l="/assets/image10-1ab4f7fd.png",_="/assets/image11-59b45388.png",m="/assets/image12-cee22446.png",c="/assets/image13-bcf89810.png",d=[p,e,a,t,o,r,n,s,i,l,_,m,c],g={label:"vLLM 内部：高吞吐量 LLM 推理系统解剖",description:"在这篇文章中，我将逐步介绍构成现代高吞吐量 LLM 推理系统的所有核心系统组件和高级特性。特别地，我将对 vLLM [1] 的工作原理进行拆解。本文是系列文章的第一篇。它由浅入深，然后逐层深入（遵循倒金字塔方法），以便你能够建立起整个系统的准确高层心理模型，而不会沉溺于细节之中。",location:"美国",cover:"./image1.png",author:["达坦科技DatenLord"],date:"2026-03-19",title:"vLLM internal: high throughput LLM inference system anatomy part"},u=[{label:"引言",level:2},{label:"01 LLM 引擎与引擎核心",level:2},{label:"02 LLM 引擎构造函数",level:2},{label:"03 生成函数",level:2},{label:"04 调度器",level:2},{label:"05 运行前向传播",level:2},{label:"06 高级特性 —— 扩展核心引擎逻辑",level:2}],L=`<p><img src="${p}" alt="图片"></p>
<h2 id="引言">引言</h2>
<p>在这篇文章中，我将逐步介绍构成现代高吞吐量 LLM 推理系统的所有核心系统组件和高级特性。特别地，我将对 vLLM [1] 的工作原理进行拆解。</p>
<p>本文是系列文章的第一篇。它由浅入深，然后逐层深入（遵循倒金字塔方法），以便你能够建立起整个系统的准确高层心理模型，而不会沉溺于细节之中。</p>
<p>后续文章将深入探讨特定的子系统。</p>
<p>本文结构分为五个部分：</p>
<p>LLM 引擎与引擎核心：vLLM 的基础（调度、分页注意力、连续批处理等）</p>
<p>高级特性：分块预填充（Chunked Prefill）、前缀缓存、引导式和投机式解码、解耦的 P/D（预填充/解码）</p>
<p>规模扩展：从单 GPU 到多 GPU 执行</p>
<p>服务层：分布式/并发 Web 脚手架</p>
<p>基准测试与自动调优：测量延迟和吞吐量</p>
<p>📝 注释</p>
<p>分析基于 commit 42172ad（2025 年 8 月 9 日）。</p>
<p>目标受众：任何对最先进 LLM 引擎工作原理感到好奇的人，以及那些有兴趣为 vLLM、SGLang 等做出贡献的人。</p>
<p>我将重点关注 V1 引擎。我也探索过 V0（现已弃用），这对于理解项目的演变过程很有价值，且许多概念仍然适用。</p>
<p>关于 LLM 引擎/引擎核心的第一部分可能会有点令人生畏/枯燥——但博客的其余部分有大量的示例和视觉效果。:)</p>
<p>本文是文章：Inside vLLM: Anatomy of a High-Throughput LLM Inference System 的翻译版。点击文末 “阅读原文”跳转英文原文。</p>
<h2 id="01-llm-引擎与引擎核心">01 LLM 引擎与引擎核心</h2>
<p>LLM 引擎是 vLLM 的基本构建块。它本身已经能够实现高吞吐量推理——但仅限于离线设置。你还不能通过 Web 将其提供给客户。</p>
<p>我们将使用以下离线推理片段作为运行示例（改编自 basic.py）。</p>
<pre><code>from vllm import LLM, SamplingParams

prompts = [
    "Hello, my name is",
    "The president of the United States is",
]

sampling_params = SamplingParams(temperature=0.8, top_p=0.95)

def main():
    llm = LLM(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0")

    outputs = llm.generate(prompts, sampling_params)

if __name__ == "__main__":
    main()
</code></pre>
<p>📝 环境变量：</p>
<p>VLLM_USE_V1="1" # 我们正在使用 V1 引擎</p>
<p>VLLM_ENABLE_V1_MULTIPROCESSING="0" # 我们在单个进程中运行</p>
<p>此配置为：</p>
<p>离线（无 Web/分布式系统脚手架）</p>
<p>同步（所有执行都发生在一个单一的阻塞进程中）</p>
<p>单 GPU（无数据/模型/流水线/专家并行；DP/TP/PP/EP = 1）</p>
<p>使用标准 Transformer [2]（支持像 Jamba 这样的混合模型需要更复杂的混合 KV 缓存内存分配器）</p>
<p>从这里开始，我们将逐步构建出一个在线、异步、多 GPU、多节点的推理系统——但仍然服务于标准的 Transformer。 在这个示例中，我们做了两件事：</p>
<p>实例化一个引擎</p>
<p>调用 generate 方法，从给定的提示词中进行采样</p>
<p>让我们开始分析构造函数。</p>
<h2 id="02-llm-引擎构造函数">02 LLM 引擎构造函数</h2>
<p>引擎的主要组件包括：</p>
<p>vLLM 配置（vLLM config）（包含用于配置模型、缓存、并行度等的所有旋钮）</p>
<p>处理器（processor）（通过验证、分词和处理，将原始输入 → EngineCoreRequests）</p>
<p>引擎核心客户端（engine core client）（在我们的运行示例中，我们使用 InprocClient，它基本上等同于 EngineCore；我们将逐步构建到支持大规模服务的 DPLBAsyncMPClient）</p>
<p>输出处理器（output processor）（将原始的 EngineCoreOutputs → 用户看到的 RequestOutput）</p>
<p>📝 注意： 随着 V0 引擎被弃用，类名和细节可能会有所变动。我将强调核心思想而非精确的方法签名。我会抽象掉部分但非全部的细节。</p>
<p>引擎核心本身由几个子组件组成：</p>
<p>模型执行器（Model Executor）（驱动模型的前向传播，我们目前处理的是 UniProcExecutor，它在单个 GPU 上有一个单一的 Worker 进程）。我们将逐步构建到支持多 GPU 的 MultiProcExecutor。</p>
<p>结构化输出管理器（Structured Output Manager）（用于引导式解码——我们稍后会讨论这个）。</p>
<p>调度器（Scheduler）（决定哪些请求进入下一个引擎步进）——它进一步包含：</p>
<p>策略设置——可以是 FCFS（先来先服务）或 priority（高优先级请求优先服务）。</p>
<p>等待（waiting）和运行（running）队列。</p>
<p>KV 缓存管理器（KV cache manager）——分页注意力（PagedAttention）的核心 [3]。</p>
<p>KV 缓存管理器维护一个 free_block_queue——这是一个可用 KV 缓存块的池（通常在数十万个量级，取决于 VRAM 大小和块大小）。在分页注意力期间，这些块充当索引结构，将令牌（tokens）映射到它们计算出的 KV 缓存块。</p>
<p><img src="${e}" alt="图片"></p>
<p>以上章节描述到的核心部件以及他们的关系</p>
<p>标准 Transformer 层（非 MLA [4]）的块大小（Block size）计算如下： 2 (键/值) * block_size (默认=16) * num_kv_heads * head_size * dtype_num_bytes (例如 bf16 为 2)</p>
<p>在模型执行器（Model Executor）构建期间，会创建一个 Worker 对象，并执行三个关键过程。（随后，在 MultiProcExecutor 中，这些相同的过程会在不同 GPU 的每个工作进程上独立运行。）</p>
<p>初始化设备（Init device）：</p>
<p>为工作线程分配一个 CUDA 设备（例如 "cuda:0"），并检查模型数据类型（dtype）是否受支持（例如 bf16）。</p>
<p>根据请求的 gpu_memory_utilization（例如 0.8 → 总 VRAM 的 80%）验证是否有足够的 VRAM 可用。</p>
<p>设置分布式设置（DP / TP / PP / EP 等）。</p>
<p>实例化一个 model_runner（持有采样器、KV 缓存和前向传播缓冲区，如 input_ids、positions 等）。</p>
<p>实例化一个 InputBatch 对象（持有 CPU 侧前向传播缓冲区、用于 KV 缓存索引的块表、采样元数据等）。</p>
<p>加载模型（Load model）：</p>
<p>实例化模型架构。</p>
<p>加载模型权重。</p>
<p>调用 model.eval()（PyTorch 的推理模式）。</p>
<p>可选：在模型上调用 torch.compile()。</p>
<p>初始化 KV 缓存（Initialize KV cache）：</p>
<p>获取逐层 KV 缓存规范。历史上这始终是 FullAttentionSpec（同构 Transformer），但随着混合模型（滑动窗口、类似 Jamba 的 Transformer/SSM 混合）的出现，它变得更加复杂（参见 Jenga [5]）。</p>
<p>运行一次虚拟/性能剖析前向传播（dummy/profiling forward pass），并获取 GPU 内存快照，以计算可用 VRAM 中可以容纳多少个 KV 缓存块。</p>
<p>分配、重塑并将 KV 缓存张量绑定到注意力层。</p>
<p>准备注意力元数据（例如将后端设置为 FlashAttention），随后由内核在前向传播期间消耗。</p>
<p>除非提供了 --enforce-eager，否则对于每个预热批次大小，执行一次虚拟运行并捕获 CUDA 图（CUDA graphs）。CUDA 图将整个 GPU 工作序列记录为一个 DAG（有向无环图）。稍后在前向传播期间，我们启动/回放预制好的图，从而减少内核启动开销并提高延迟性能。</p>
<p>我在这里抽象了许多底层细节——但这些是核心部分，因为我将在接下来的章节中反复引用它们。 现在引擎已经初始化完毕，让我们进入 generate 函数。</p>
<h2 id="03-生成函数">03 生成函数</h2>
<p>第一步是验证并将请求输入引擎。对于每个提示词（prompt），我们：</p>
<p>创建一个唯一的请求 ID 并记录其到达时间。</p>
<p>调用输入预处理器对提示词进行分词，并返回一个包含 prompt、prompt_token_ids 和 type（文本、令牌、嵌入等）的字典。</p>
<p>将这些信息打包进一个 EngineCoreRequest，并添加优先级、采样参数和其他元数据。</p>
<p>将请求传递给引擎核心，引擎核心将其封装在一个 Request 对象中并将状态设置为 WAITING。随后该请求被添加到调度器的 waiting 队列中（如果是 FCFS 则追加，如果是优先级调度则进行堆入栈操作）。</p>
<p>此时引擎已获得输入，执行可以开始。在同步引擎示例中，这些初始提示词是我们处理的唯一内容——没有在中途注入新请求的机制。相比之下，异步引擎支持这一点（又名连续批处理（continuous batching） [6]）：在每一步之后，都会同时考虑新旧请求。</p>
<p>由于前向传播会将批次展平为单个序列，且自定义内核能够高效处理它，因此即使在同步引擎中，连续批处理在根本上也是受支持的。</p>
<p>接下来，只要有待处理的请求，引擎就会反复调用其 step() 函数。每一步包含三个阶段：</p>
<p>调度（Schedule）：选择在这一步中运行哪些请求（解码，和/或（分块）预填充）。</p>
<p>前向传播（Forward pass）：运行模型并采样令牌。</p>
<p>后处理（Postprocess）：将采样的令牌 ID 追加到每个 Request，进行去分词（detokenize），并检查停止条件。如果一个请求已完成，则进行清理（例如将其 KV 缓存块归还给 free_block_queue）并提前返回输出。</p>
<p>📝 停止条件包括：</p>
<p>请求超过其长度限制（max_model_length 或其自身的 max_tokens）。</p>
<p>采样的令牌是 EOS ID（除非启用了 ignore_eos -> 这在我们要强制生成特定数量的输出令牌进行基准测试时很有用）。</p>
<p>采样的令牌匹配采样参数中指定的任何 stop_token_ids。</p>
<p>输出中出现了停止字符串（Stop strings）——我们截断输出直到第一个停止字符串出现，并在引擎中终止该请求（注意 stop_token_ids 会保留在输出中，但停止字符串不会）。</p>
<p><img src="${a}" alt="图片"></p>
<p>在流式传输模式下，我们会发送生成的中间令牌，但现在先忽略这一点。</p>
<p>接下来，我们将更详细地检查调度过程。</p>
<h2 id="04-调度器">04 调度器</h2>
<p>推理引擎处理的工作负载主要有两种类型：</p>
<p>预填充（Prefill）请求 —— 对所有提示词令牌进行一次前向传播。这些通常是计算受限型（compute-bound）（阈值取决于硬件和提示词长度）。最后，我们从最后一个令牌位置的概率分布中采样出一个令牌。</p>
<p>解码（Decode）请求 —— 仅对最近的一个令牌进行一次前向传播。之前所有的 KV 向量都已被缓存。这些是内存带宽受限型（memory-bandwidth-bound），因为我们仍需加载所有 LLM 权重（和 KV 缓存）仅为了计算一个令牌。</p>
<p>在基准测试章节中，我们将分析所谓的 GPU 性能屋顶模型（Roofline Model）。那将更详细地探讨预填充/解码性能背后的剖析。</p>
<p>得益于更智能的设计选择，V1 调度器可以在同一步进中混合处理这两种类型的请求。相比之下，V0 引擎一次只能处理预填充或解码中的一种。</p>
<p>调度器优先处理解码请求 —— 即那些已经在**运行（running）**队列中的请求。对于每个此类请求，它会：</p>
<p>计算要生成的新令牌数量（由于投机采样和异步调度，并不总是 1 —— 稍后详细介绍）。</p>
<p>调用 KV 缓存管理器的 allocate_slots 函数（详见下文）。</p>
<p>通过减去第 1 步中的令牌数量来更新令牌预算。</p>
<p>在此之后，它处理来自等待（waiting）队列的预填充请求，它会：</p>
<p>检索已计算块的数量（如果禁用前缀缓存则返回 0 —— 我们稍后会介绍）。</p>
<p>调用 KV 缓存管理器的 allocate_slots 函数。</p>
<p>从等待队列中弹出请求并将其移动到运行队列，将其状态设置为 RUNNING。</p>
<p>更新令牌预算。</p>
<p>现在让我们看看 allocate_slots 做了什么，它会：</p>
<p>计算块数量 —— 确定必须分配多少个新的 KV 缓存块 (n)。默认情况下，每个块存储 16 个令牌。例如，如果一个预填充请求有 17 个新令牌，我们需要ceil(17/16) = 2个块。</p>
<p>检查可用性 —— 如果管理器池中没有足够的块，则提前退出。根据是解码还是预填充请求，引擎可能会尝试通过驱逐低优先级请求来进行重计算抢占（recompute preemption）（V0 支持交换抢占），即调用 kv_cache_manager.free 将 KV 块归还至块池；或者它可能会跳过调度并继续执行。</p>
<p>分配块 —— 通过 KV 缓存管理器的协调器，从块池（前面提到的 free_block_queue 双向链表）中获取前 n个块。存储到 req_to_blocks 中，该字典将每个 request_id 映射到其 KV 缓存块列表。</p>
<p><img src="${t}" alt="图片"></p>
<p>我们终于准备好进行前向传播了！</p>
<h2 id="05-运行前向传播">05 运行前向传播</h2>
<p>我们调用模型执行器的 execute_model，它委托给 Worker，而 Worker 又进一步委托给模型运行器（model runner）。</p>
<p>以下是主要步骤：</p>
<p>更新状态 —— 从 input_batch 中剪除已完成的请求；更新与前向传播相关的各类元数据（例如，每个请求对应的 KV 缓存块，这些块将用于索引分页 KV 缓存内存）。</p>
<p>准备输入 —— 将缓冲区从 CPU 复制到 GPU；计算位置信息；构建 slot_mapping（详见后续示例）；构建注意力元数据。</p>
<p>前向传播 —— 使用自定义的分页注意力内核运行模型。所有序列被展平并拼接成一个长的“超级序列”。位置索引和注意力掩码确保每个序列仅关注自身的令牌，从而在无需右填充（right-padding）的情况下实现连续批处理。</p>
<p>收集最后令牌状态 —— 提取每个序列最后位置的隐藏状态并计算逻辑值（logits）。</p>
<p>采样 —— 根据采样配置（贪婪采样、温度采样、top-p、top-k 等）从计算出的逻辑值中采样令牌。</p>
<p>前向传播步骤本身有两种执行模式：</p>
<p>急切模式（Eager mode） —— 当启用急切执行时，运行标准的 PyTorch 前向传播。</p>
<p>“捕获”模式（"Captured" mode） —— 当未强制使用急切模式时，执行/回放预先捕获的 CUDA 图（记得我们在引擎构建期间的“初始化 KV 缓存”过程中捕获了这些图）。</p>
<p>这里有一个具体示例，应该能让你清晰理解连续批处理和分页注意力：</p>
<p><img src="${o}" alt="图片"></p>
<h2 id="06-高级特性-——-扩展核心引擎逻辑">06 高级特性 —— 扩展核心引擎逻辑</h2>
<p>有了基础的引擎流程，我们现在可以看看高级特性。</p>
<p>我们已经讨论了抢占（preemption）、分页注意力（paged attention）和连续批处理（continuous batching）。</p>
<p>接下来，我们将深入探讨：</p>
<p>分块预填充（Chunked prefill）</p>
<p>前缀缓存（Prefix caching）</p>
<p>引导式解码（Guided decoding）（通过语法约束的有限状态机）</p>
<p>投机采样（Speculative decoding）</p>
<p>解耦的 P/D（预填充/解码）</p>
<p>分块预填充（Chunked prefill）</p>
<p>分块预填充是一种处理长提示词的技术，通过将其预填充步骤拆分为更小的块。如果没有它，一个超长请求可能会垄断某一个引擎步进，导致其他预填充请求无法运行。这会推迟所有其他请求并增加它们的延迟。</p>
<p>例如，假设每个块包含 n（=8）个令牌，用小写字母表示，并用“-”分隔。一个长提示词P可能看起来像 x-y-z，其中P 是一个不完整的块（例如 2 个令牌）。执行 P的完整预填充将需要>=3个引擎步进（如果它在其中某一步未被调度执行，则可能 > 3），并且只有在最后一个分块预填充步骤中，我们才会采样出一个新令牌。</p>
<p>这是该示例的视觉呈现：</p>
<p><img src="${r}" alt="图片"></p>
<p>实现方式非常直接：限制每步步进中新令牌的数量。如果请求的数量超过了 long_prefill_token_threshold，则将其重置为该阈值的精确值。底层的索引逻辑（如前所述）会处理剩余的部分。</p>
<p>在 vLLM V1 中，你可以通过将 long_prefill_token_threshold 设置为一个正整数来启用分块预填充。（从技术上讲，即使不设置，如果提示词长度超过了令牌预算，系统也会对其进行截断并运行分块预填充。）</p>
<p>前缀缓存（Prefix Caching）</p>
<p>为了解释前缀缓存的工作原理，让我们对原始代码示例进行微调：</p>
<pre><code>from vllm import LLM, SamplingParams

# 一段编码后超过 block_size 个令牌的文本
long_prefix = "&#x3C;a piece of text that is encoded into more than block_size tokens>"

prompts = [
    "Hello, my name is",
    "The president of the United States is",
]

sampling_params = SamplingParams(temperature=0.8, top_p=0.95)

def main():
    llm = LLM(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0")
    # 两个请求共享相同的 long_prefix
    outputs = llm.generate(long_prefix + prompts[0], sampling_params)
    outputs = llm.generate(long_prefix + prompts[1], sampling_params)

if __name__ == "__main__":
    main()
</code></pre>
<p>前缀缓存避免了对多个提示词开头共享的令牌进行重复计算——因此被称为前缀（prefix）。</p>
<p>关键部分是 long_prefix：它被定义为任何长于一个 KV 缓存块（默认 16 个令牌）的前缀。为了简化示例，假设 long_prefix 的长度恰好是n x block_size（其中 n>= 1）。</p>
<p>即它完美地与块边界对齐——否则我们将不得不重新计算 long_prefix_len % block_size 个令牌，因为我们无法缓存不完整的块。</p>
<p>如果没有前缀缓存：每次处理具有相同 long_prefix 的新请求时，我们都要重新计算所有 n x block_siz 个令牌。</p>
<p>有了前缀缓存：这些令牌仅计算一次（其 KV 存储在 KV 缓存分页内存中）并被复用，因此只有新的提示词令牌需要处理。这加速了预填充请求（尽管它对解码阶段没有帮助）。</p>
<p>这在 vLLM 中是如何运作的？</p>
<p>在第一次 generate 调用期间，在调度阶段，引擎会在 kv_cache_manager.get_computed_blocks 内部调用 hash_request_tokens：</p>
<p>该函数将 long_prefix + prompts[0] 分割成 16 令牌的块。</p>
<p>对于每个完整的块，它计算一个哈希值（使用内置哈希或 SHA-256，后者较慢但碰撞更少）。哈希值结合了前一个块的哈希、当前令牌以及可选的元数据。</p>
<p>可选元数据包括：多模态（MM）哈希、LoRA ID、缓存盐（注入第一个块的哈希中，确保只有带有该缓存盐的请求才能复用块）。</p>
<p>每个结果都存储为一个 BlockHash 对象，包含哈希值及其令牌 ID。我们返回一个块哈希列表。</p>
<p>该列表存储在 self.req_to_block_hashes[request_id] 中。</p>
<p>接下来，引擎调用 find_longest_cache_hit 来检查这些哈希中是否已有任何一个存在于 cached_block_hash_to_block 中。在第一个请求时，找不到命中项。</p>
<p><img src="${n}" alt="图片"></p>
<p>然后我们调用 allocate_slots，它会调用 coordinator.cache_blocks，将新的 BlockHash 条目与分配的 KV 块关联，并记录在 cached_block_hash_to_block 中。</p>
<p>随后，前向传播将填充与我们上面分配的 KV 缓存块相对应的分页 KV 缓存内存中的 KV 值。</p>
<p>在经过许多个引擎步进后，它会分配更多的 KV 缓存块，但这对于我们的示例并不重要，因为前缀在 long_prefix 之后立即发生了分化。</p>
<p><img src="${s}" alt="图片"></p>
<p>在具有相同前缀的第二次 generate 调用中，步骤 1-3 会重复，但现在 find_longest_cache_hit（通过线性搜索）为所有 n个块找到了匹配项。引擎可以直接复用这些 KV 块。</p>
<p><img src="${i}" alt="图片"></p>
<p>如果原始请求仍然存活，这些块的引用计数将增加（例如增加到 2）。在本例中，第一个请求已经完成，因此块已被释放回池中，其引用计数被设回 0。因为我们能够从 cached_block_hash_to_block 中检索到它们，我们知道它们是有效的（KV 缓存管理器的逻辑就是这样设置的），所以我们只需再次将它们从 free_block_queue 中移除。</p>
<p>📝高级注释：</p>
<p>KV 缓存块只有在即将从 free_block_queue（从左侧弹出）被重新分配，且我们发现该块仍然具有关联的哈希值并存在于 cached_block_hash_to_block 中时，才会变得无效。在那一刻，我们清除该块的哈希并从 cached_block_hash_to_block 中移除其条目，确保它不能再通过前缀缓存被复用（至少对于那个旧前缀不行）。</p>
<p>这就是前缀缓存的精髓：不要重新计算你已经见过的前缀——只需复用它们的 KV 缓存！</p>
<p>如果你理解了这个例子，也就理解了分页注意力（paged attention）的工作原理。</p>
<p>前缀缓存默认启用。如需禁用：enable_prefix_caching = False。</p>
<p>引导式解码 (FSM)</p>
<p>引导式解码（Guided decoding）是一种技术，在每个解码步骤中，逻辑值（logits）都受到基于语法的有限状态机（FSM）的约束。这确保了只有语法允许的令牌才能被采样。</p>
<p>这是一个强大的设置：你可以强制执行从正则语法（乔姆斯基 3 型，例如任意正则表达式模式）一直到上下文无关语法（2 型，涵盖大多数编程语言）的任何规则。</p>
<p>为了让它不那么抽象，让我们从最简单的例子开始，在之前的代码基础上构建：</p>
<pre><code>from vllm import LLM, SamplingParams
from vllm.sampling_params import GuidedDecodingParams

prompts = [
    "This sucks",
    "The weather is beautiful",
]

# 强制输出只能是 "Positive" 或 "Negative"
guided_decoding_params = GuidedDecodingParams(choice=["Positive", "Negative"])
sampling_params = SamplingParams(guided_decoding=guided_decoding_params)

def main():
    llm = LLM(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0")
    outputs = llm.generate(prompts, sampling_params)

if __name__ == "__main__":
    main()
</code></pre>
<p>在我给出的这个小例子中（假设是字符级分词）：在预填充阶段，FSM 会掩盖（mask）逻辑值，使得只有 "P" 或 "N" 是可行的。如果采样到了 "P"，FSM 就会移动到 "Positive" 分支；下一步只允许采样 "o"，依此类推。</p>
<p><img src="${l}" alt="图片"></p>
<p>这在 vLLM 中是如何运作的：</p>
<p>在 LLM 引擎构建时，会创建一个 StructuredOutputManager；它有权访问分词器（tokenizer）并维护一个 _grammar_bitmask 张量。</p>
<p>添加请求时，其状态被设置为 WAITING_FOR_FSM，且 grammar_init 会选择后端编译器（例如 xgrammar [7]；请注意后端是第三方代码）。</p>
<p>该请求的语法是异步编译的。</p>
<p>在调度期间，如果异步编译已完成，状态切换为 WAITING，且 request_id 被添加到 structured_output_request_ids 中；否则它会被放入 skipped_waiting_requests 中，在下一个引擎步进中重试。</p>
<p>在调度循环之后（仍处于调度阶段内），如果有 FSM 请求，StructuredOutputManager 会要求后端准备/更新 _grammar_bitmask。</p>
<p>在前向传播产生逻辑值（logits）后，xgr_torch_compile 的函数将位掩码（bitmask）扩展到词表大小（32 倍扩展比，因为我们使用 32 位整数），并将不允许的逻辑值掩蔽为负无穷。</p>
<p>在采样下一个令牌后，通过 accept_tokens 推进该请求的 FSM。在视觉上，我们在 FSM 图中移动到了下一个状态。</p>
<p>第 6 步值得进一步澄清：</p>
<p>如果 vocab_size = 32，_grammar_bitmask 是一个单一整数；其二进制表示编码了哪些令牌是允许的（“1”）与不允许的（“0”）。例如，“101…001” 扩展为一个长度为 32 的数组 [1, 0, 1, …, 0, 0, 1]；位置为 0 的逻辑值被设为 -infty。对于更大的词表，则使用多个 32 位字并进行相应的扩展/拼接。后端（如 xgrammar）负责利用当前的 FSM 状态生成这些位模式。</p>
<p>📝注意：</p>
<p>这里的大部分复杂性都隐藏在像 xgrammar 这样的第三方库中。</p>
<p>对于那些喜欢我画的视觉图的人，这里有一个 vocab_size = 8 和 8 位整数的更简单例子：</p>
<p><img src="${_}" alt="图片"></p>
<p>你可以通过传入所需的 guided_decoding 配置在 vllm 中启用此功能。</p>
<p>投机采样（Speculative Decoding）</p>
<p>在自回归生成中，每个新令牌都需要大语言模型（Large LM）进行一次前向传播。这是很昂贵的——每一步都要重新加载并应用所有模型权重，仅仅是为了计算一个令牌！（假设批次大小 B=1，通常为 B）。</p>
<p>投机采样 [8] 通过引入一个较小的草稿模型（Draft LM）来加速这一过程。草稿模型廉价地提议 k 个令牌。但我们最终并不想从较小的模型中采样——它在那里的作用仅仅是猜测候选的后续内容。大模型仍然决定什么是有效的。</p>
<p>步骤如下：</p>
<p>草稿（Draft）：在当前上下文运行小模型，并提议 k 个令牌。</p>
<p>验证（Verify）：在“上下文 + k个草稿令牌”上运行一次大模型。这会产生这 k 个位置的概率，外加一个额外位置的概率（因此我们得到 k+1 个候选者）。</p>
<p>接受/拒绝（Accept/reject）：从左到右遍历这 k 个草稿令牌：</p>
<p>如果大模型对草稿令牌的概率 >=草稿模型的概率，则接受它。</p>
<p>否则，以p_large(token)/p_draft(token)的概率接受它。</p>
<p>在第一次拒绝时停止，或者接受所有 k 个草稿令牌。</p>
<p>如果所有 k 个草稿令牌都被接受，还可以从大模型“免费”采样额外的第 (k+1) 个令牌（我们已经计算了该分布）。</p>
<p>如果发生了拒绝，在该位置创建一个新的重新平衡的分布（p_large - p_draft，下限截断为 0，归一化使总和为 1），并从中采样最后一个令牌。</p>
<p>为什么有效：虽然我们使用小模型来提议候选者，但“接受/拒绝”规则保证了从期望上看，序列的分布与我们逐个令牌从大模型采样完全一致。这意味着投机采样在统计上等同于标准的自回归解码——但潜在速度要快得多，因为一次大模型前向传播可以产生多达 k+1 个令牌。</p>
<p>📝注意：</p>
<p>我建议查看 gpt-fast 以了解简单的实现，并阅读原始论文以了解数学细节及与全模型采样等效性的证明。</p>
<p>vLLM V1 不支持“LLM 草稿模型”方法，而是实现了更快但精度较低的提议方案：n-gram、EAGLE [9] 和 Medusa [10]。</p>
<p>各自的一句话简介：</p>
<p>n-gram：获取最后 prompt_lookup_max 个令牌；在序列中寻找先前的匹配项；如果找到，提议该匹配项之后的 k个令牌；否则减小窗口并重试，直到 prompt_lookup_min。</p>
<p>目前的实现在第一个匹配后返回 k个令牌。引入近因偏差（recency bias）并反转搜索方向（即最后一个匹配项）感觉会更自然？</p>
<p>Eagle：对大语言模型进行“模型手术”——保留嵌入层（embeddings）和输出头（LM head），将 Transformer 堆栈替换为轻量级 MLP；将其微调为廉价的草稿模型。</p>
<p>Medusa：在大模型顶部（输出头之前的嵌入层）训练辅助线性头，以并行预测接下来的 k 个令牌；使用这些头提议令牌比运行一个单独的小模型更高效。</p>
<p>以下是如何在 vLLM 中使用 ngram 作为草稿方法来调用投机采样：</p>
<pre><code>from vllm import LLM, SamplingParams

prompts = [
    "Hello, my name is",
    "The president of the United States is",
]

sampling_params = SamplingParams(temperature=0.8, top_p=0.95)

speculative_config = {
    "method": "ngram",
    "prompt_lookup_max": 5,
    "prompt_lookup_min": 3,
    "num_speculative_tokens": 3,
}

def main():
    llm = LLM(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", speculative_config=speculative_config)
    outputs = llm.generate(prompts, sampling_params)

if __name__ == "__main__":
    main()
</code></pre>
<p>这在 vLLM 中是如何运作的？</p>
<p>设置阶段（引擎构建期间）：</p>
<p>初始化设备：创建一个 drafter（草稿模型，例如 NgramProposer）和一个 rejection_sampler（部分代码用 Triton 编写）。</p>
<p>加载模型：加载草稿模型权重（对于 n-gram 是空操作）。</p>
<p>之后在 generate 函数中（假设我们得到一个全新的请求）：</p>
<p>在大模型上运行常规的预填充步骤。</p>
<p>在前向传播和标准采样后，调用 propose_draft_token_ids(k) 从草稿模型采样 k 个草稿令牌。</p>
<p>将这些存储在 request.spec_token_ids 中（更新请求元数据）。</p>
<p>在下一个引擎步进中，当请求处于运行队列时，将 len(request.spec_token_ids) 添加到“新令牌”计数中，以便 allocate_slots 为前向传播预留足够的 KV 块。</p>
<p>将 spec_token_ids 复制到 input_batch.token_ids_cpu 中以形成（上下文 + 草稿）令牌。</p>
<p>通过 _calc_spec_decode_metadata 计算元数据（这会从 input_batch.token_ids_cpu 复制令牌、准备逻辑值等），然后在草稿令牌上运行大模型前向传播。</p>
<p>不进行常规的逻辑值采样，而是使用 rejection_sampler 从左到右进行接受/拒绝，并生成 output_token_ids。</p>
<p>重复步骤 2-7，直到满足停止条件。</p>
<p>内化这一点的最好方法是启动调试器并逐步运行代码库，但本节希望能让你对其有所了解。下面的内容也是如此：</p>
<p><img src="${m}" alt="图片"></p>
<p>解耦的 P/D (Disaggregated P/D)</p>
<p>我已经在此前暗示过解耦 P/D（预填充/解码）背后的动机。</p>
<p>预填充和解码具有截然不同的性能特征（计算受限 vs. 内存带宽受限），因此将它们的执行分离开来是一个明智的设计。这能更精细地控制延迟——包括 TFTT（首字到达时间）和 ITL（令牌间延迟）——关于这方面的更多内容将在基准测试章节中介绍。</p>
<p>在实践中，我们运行 N 个 vLLM 预填充实例和 M 个 vLLM 解码实例，并根据实时请求组合进行自动扩缩容。预填充工作线程将 KV 写入专用的 KV 缓存服务；解码工作线程从中读取。这实现了将耗时且具有突发性的预填充任务与稳定且对延迟敏感的解码任务隔离开来。</p>
<p>这在 vLLM 中是如何运作的？</p>
<p>为了清晰起见，下面的示例依赖于 SharedStorageConnector，这是一种用于说明机制的调试连接器实现。</p>
<p>连接器（Connector）是 vLLM 处理实例间 KV 交换的抽象。连接器接口目前尚不稳定，计划中的一些近期改进将涉及变动，其中某些变动可能具有破坏性。</p>
<p>我们启动 2 个 vLLM 实例（GPU 0 用于预填充，GPU 1 用于解码），然后在它们之间传输 KV 缓存：</p>
<pre><code>import os
import time
from multiprocessing import Event, Process
import multiprocessing as mp
from vllm import LLM, SamplingParams
from vllm.config import KVTransferConfig

prompts = [
    "Hello, my name is",
    "The president of the United States is",
]

def run_prefill(prefill_done):
    os.environ["CUDA_VISIBLE_DEVICES"] = "0"
    sampling_params = SamplingParams(temperature=0, top_p=0.95, max_tokens=1)
    ktc = KVTransferConfig(
        kv_connector="SharedStorageConnector",
        kv_role="kv_both",
        kv_connector_extra_config={"shared_storage_path": "local_storage"},
    )
    llm = LLM(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", kv_transfer_config=ktc)
    llm.generate(prompts, sampling_params)
    prefill_done.set()  # 通知解码实例 KV 缓存已就绪try:
        whileTrue:
            time.sleep(1)
    except KeyboardInterrupt:
        print("脚本被用户停止。")

def run_decode(prefill_done):
    os.environ["CUDA_VISIBLE_DEVICES"] = "1"
    sampling_params = SamplingParams(temperature=0, top_p=0.95)
    ktc = KVTransferConfig(
        kv_connector="SharedStorageConnector",
        kv_role="kv_both",
        kv_connector_extra_config={"shared_storage_path": "local_storage"},
    )
    llm = LLM(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", kv_transfer_config=ktc)
    prefill_done.wait()  # 阻塞等待来自预填充实例的 KV 缓存
    outputs = llm.generate(prompts, sampling_params)

if __name__ == "__main__":
    prefill_done = Event()
    prefill_process = Process(target=run_prefill, args=(prefill_done,))
    decode_process = Process(target=run_decode, args=(prefill_done,))
    prefill_process.start()
    decode_process.start()
    decode_process.join()
    prefill_process.terminate()
</code></pre>
<p>📝注意：</p>
<p>我还尝试过 LMCache [11]，它是最快且生产就绪的连接器（使用 NVIDIA 的 NIXL 作为后端），但它仍处于前沿阶段，我遇到了一些 bug。由于其大部分复杂性存在于外部仓库中，因此 SharedStorageConnector 是进行解释的更好选择。</p>
<p>vLLM 中的执行步骤：</p>
<p>实例化 —— 在引擎构建期间，连接器在两个地方被创建：</p>
<p>在工作线程（worker）的初始化设备过程中（位于初始化工作线程分布式环境函数下），角色为 "worker"。</p>
<p>在调度器（scheduler）构造函数内部，角色为 "scheduler"。</p>
<p>缓存查找 —— 当调度器处理来自 waiting 队列的预填充请求时（在本地前缀缓存检查之后），它会调用连接器的 get_num_new_matched_tokens。这会检查 KV 缓存服务器中是否存在外部缓存的令牌。预填充在这里总是看到 0；解码可能会有缓存命中。在调用 allocate_slots 之前，结果会被添加到本地计数中。</p>
<p>状态更新 —— 调度器随后调用 connector.update_state_after_alloc，记录具有缓存的请求（对预填充而言是空操作）。</p>
<p>元数据构建（Meta build） —— 在调度结束时，调度器调用 meta = connector.build_connector_meta：</p>
<p>预填充将所有 is_store=True 的请求添加进去（以进行 KV 上传）。</p>
<p>解码将所有 is_store=False 的请求添加进去（以进行 KV 获取）。</p>
<p>上下文管理器 —— 在前向传播之前，引擎进入一个 KV 连接器上下文管理器：</p>
<p>进入时：调用 kv_connector.start_load_kv。对于解码，这会从外部服务器加载 KV 并将其注入分页内存。对于预填充，这是空操作。</p>
<p>退出时：调用 kv_connector.wait_for_save。对于预填充，这会阻塞直到 KV 上传到外部服务器。对于解码，这是空操作。</p>
<p>这是视觉示例：</p>
<p><img src="${c}" alt="图片"></p>
<p>📝附加说明：</p>
<p>对于 SharedStorageConnector，“外部服务器”只是本地文件系统。</p>
<p>根据配置，KV 传输也可以逐层进行（在每个注意力层之前/之后）。</p>`;export{d as assetURLs,L as default,g as metadata,u as toc};

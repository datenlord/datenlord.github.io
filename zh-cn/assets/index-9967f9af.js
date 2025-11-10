const e="/zh-cn/assets/image1-9a4a5f83.png",p=[e],t={label:"从循环到融合：理解 Fused MoE 算子原理（一）",description:"MoE 层的完整工作流包含“路由选择”和“专家计算”两个核心环节，本文将聚焦于后者。这里首先从一个直观易懂的朴素实现入手，来展示 MoE 专家计算的完整逻辑，也为理解后续内容打下基础。本系列文章还将介绍 Fused MoE, 它是一种通过算子融合进行优化的方案，将多个独立的计算合并成一个单一的批处理操作，从而加速 MoE 中的专家计算环节。",location:"中国香港",cover:"./image1.png",author:["陈添"],date:"2025-11-05",title:"From Loop to Fusion Understanding the Principles of Fused MoE Operators (I)"},i=[{label:"引言",level:2},{label:"第一部分：MoE 专家计算的直观实现",level:2},{label:"总结",level:2},{label:"展望",level:2}],r=`<p><img src="${e}" alt="图片"></p>
<h2 id="引言">引言</h2>
<p>在当今大语言模型（LLM）的浪潮中，模型规模的持续扩张是提升性能的关键驱动力。然而，随着模型参数量的激增，训练和推理的计算成本也随之飙升。为了解决这一挑战，混合专家模型（Mixture-of-Experts, MoE）架构应运而生，并已成为许多前沿模型（如 Mixtral 8x7B, DeepSeek-V3）的核心技术之一。</p>
<p>MoE 的核心思想非常巧妙：它不再要求模型的每一部分处理所有的输入数据，而是引入了多个“专家”子网络——这些专家本质上就是标准的前馈网络。通过一个门控网络（Gating Network），系统可以为每个输入（token）动态地、稀疏地选择并激活一小部分专家进行计算。这样，模型可以在总参数量巨大的同时，保持单次前向传播的计算量相对可控，实现了规模与效率的精妙平衡。</p>
<p>MoE 层的完整工作流包含“路由选择”和“专家计算”两个核心环节，本文将聚焦于后者。这里首先从一个直观易懂的朴素实现入手，来展示 MoE 专家计算的完整逻辑，也为理解后续内容打下基础。本系列文章还将介绍 Fused MoE, 它是一种通过算子融合进行优化的方案，将多个独立的计算合并成一个单一的批处理操作，从而加速 MoE 中的专家计算环节。</p>
<p>通过对比这两种实现，希望能让读者深刻理解 Fused MoE 算子的原理。</p>
<h2 id="第一部分：moe-专家计算的直观实现">第一部分：MoE 专家计算的直观实现</h2>
<p>在 MoE 模型中，一旦门控网络为每个输入的 token 分配好了对应的专家，接下来的任务就是执行计算。本部分将介绍一种直观的、基于循环的实现方式。这种方式虽然不是性能最高的，但其逻辑非常清晰，是理解 MoE 工作原理的绝佳起点。</p>
<h4>1. 基本设定：从 MLP 到 Expert</h4>
<p>首先需要明确 MoE 中的“专家”（Expert）到底是什么。本质上，一个专家模块就是一个标准的前馈神经网络（Feed-Forward Network, FFN），或者说多层感知机（MLP）。在 Transformer 架构中，它通常由两个或三个线性层组成，负责对 token 的特征进行非线性变换。</p>
<p>一个 MoE 层正是由多个这样的 Expert 模块以及一个负责调度的 gate 模块组成的集合。</p>
<p>以下是 DeepSeek-V3 中 MoE 模块的完整实现[1]，可以了解其具体结构。</p>
<pre><code>class Expert(nn.Module):
    """
    Expert layer for Mixture-of-Experts (MoE) models.
    Attributes:
        w1 (nn.Module): Linear layer for input-to-hidden transformation.
        w2 (nn.Module): Linear layer for hidden-to-output transformation.
        w3 (nn.Module): Additional linear layer for feature transformation.
    """
    def __init__(self, dim: int, inter_dim: int):
        """
        Initializes the Expert layer.
        Args:
            dim (int): Input and output dimensionality.
            inter_dim (int): Hidden layer dimensionality.
        """
        super().__init__()
        self.w1 = Linear(dim, inter_dim)
        self.w2 = Linear(inter_dim, dim)
        self.w3 = Linear(dim, inter_dim)
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Forward pass for the Expert layer.
        Args:
            x (torch.Tensor): Input tensor.
        Returns:
            torch.Tensor: Output tensor after expert computation.
        """
        return self.w2(F.silu(self.w1(x)) * self.w3(x))
class MoE(nn.Module):
    """
    Mixture-of-Experts (MoE) module.
    Attributes:
        dim (int): Dimensionality of input features.
        n_routed_experts (int): Total number of experts in the model.
        n_local_experts (int): Number of experts handled locally in distributed systems.
        n_activated_experts (int): Number of experts activated for each input.
        gate (nn.Module): Gating mechanism to route inputs to experts.
        experts (nn.ModuleList): List of expert modules.
        shared_experts (nn.Module): Shared experts applied to all inputs.
    """
    def __init__(self, args: ModelArgs):
        """
        Initializes the MoE module.
        Args:
            args (ModelArgs): Model arguments containing MoE parameters.
        """
        super().__init__()
        self.dim = args.dim
        assert args.n_routed_experts % world_size == 0, f"Number of experts must be divisible by world size (world_size={world_size})"
        self.n_routed_experts = args.n_routed_experts
        self.n_local_experts = args.n_routed_experts // world_size
        self.n_activated_experts = args.n_activated_experts
        self.experts_start_idx = rank * self.n_local_experts
        self.experts_end_idx = self.experts_start_idx + self.n_local_experts
        self.gate = Gate(args)
        self.experts = nn.ModuleList([Expert(args.dim, args.moe_inter_dim) if self.experts_start_idx &#x3C;= i &#x3C; self.experts_end_idx else None
                                      for i in range(self.n_routed_experts)])
        self.shared_experts = MLP(args.dim, args.n_shared_experts * args.moe_inter_dim)
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Forward pass for the MoE module.
        Args:
            x (torch.Tensor): Input tensor.
        Returns:
            torch.Tensor: Output tensor after expert routing and computation.
        """
        shape = x.size()
        x = x.view(-1, self.dim)
        weights, indices = self.gate(x)
        y = torch.zeros_like(x)
        counts = torch.bincount(indices.flatten(), minlength=self.n_routed_experts).tolist()
        for i in range(self.experts_start_idx, self.experts_end_idx):
            if counts[i] == 0:
                continue
            expert = self.experts[i]
            idx, top = torch.where(indices == i)
            y[idx] += expert(x[idx]) * weights[idx, top, None]
        z = self.shared_experts(x)
        if world_size > 1:
            dist.all_reduce(y)
        return (y + z).view(shape)
</code></pre>
<h4>2. 基于循环的计算流程</h4>
<p>这里重点分析 MoE 模块中 forward 方法的核心逻辑。在本文的讨论中会忽略共享专家（shared_experts）和分布式通信（dist.all_reduce）部分，专注于专家的计算。</p>
<p>其计算流程可以拆解如下：</p>
<p>输入整形与路由：</p>
<p>x = x.view(-1, self.dim): 将输入张量 x 整形为二维，形状为 [token总数, 特征维度]。</p>
<p>weights, indices = self.gate(x): 调用门控网络，得到每个 token 对应的专家权重 weights 和专家索引 indices。</p>
<p>专家计算循环：</p>
<p>y = torch.zeros_like(x): 初始化一个全零的输出张量 y，用于累加结果。</p>
<p>counts = torch.bincount(...): 这是一个优化。它会统计每个专家被分配了多少个 token。</p>
<p>for i in range(...): 核心的 for 循环，遍历当前设备上的所有专家。</p>
<p>if counts[i] == 0: continue: 如果一个专家没有被分配任何 token，则直接跳过，避免不必要的计算。</p>
<p>idx, top = torch.where(indices == i): 查找所有被分配给当前专家 i 的 token 的索引。</p>
<p>y[idx] += expert(x[idx]) * weights[idx, top, None]: 这是最关键的一步。它执行以下操作：</p>
<p>x[idx]: 筛选出需要由专家 i 处理的 token。</p>
<p>expert(...): 将这些 token 送入专家网络进行计算。</p>
<ul>
<li>weights[...]: 将专家输出与对应的权重相乘。</li>
</ul>
<p>y[idx] += ...: 将加权后的结果累加到输出张量 y 的相应位置。</p>
<p>这种实现方式可以被称为“专家视角”的计算模式：它的主逻辑是“对于我这个专家，有哪些 token 需要我来处理？”。它一步步地完成计算，逻辑非常清晰。</p>
<h4>3. 实例演算：一步步看懂计算过程</h4>
<p>为了让整个过程更具体，这里用一个完整的例子来手动演算一遍。详细展示 Expert 内部的每一次矩阵乘法。</p>
<p>设定参数：</p>
<p>输入 token 数量 M = 2</p>
<p>Token 维度 dim = 3</p>
<p>专家中间层维度 inter_dim = 2</p>
<p>总专家数量 E = 4</p>
<p>激活专家数 topk = 2</p>
<p>预设输入和路由结果：</p>
<p>输入 x (形状 [2, 3]):</p>
<pre><code>[[1, 1, 1],
 [2, 2, 2]]
</code></pre>
<p>专家索引 indices (形状 [2, 2]):</p>
<pre><code>[[0, 2],  # Token 0 -> Expert 0, Expert 2
 [2, 3]]  # Token 1 -> Expert 2, Expert 3
</code></pre>
<p>专家权重 weights (形状 [2, 2]):</p>
<pre><code>[[0.5, 0.5],
 [0.5, 0.5]]
</code></pre>
<p>专家参数设定：</p>
<p>我们假设4个专家的所有权重矩阵（w1, w2, w3）都用一个固定的值填充。</p>
<p>w1 和 w3 的权重矩阵形状为 [inter_dim, dim] 即 [2, 3]。</p>
<p>w2 的权重矩阵形状为 [dim, inter_dim] 即 [3, 2]。</p>
<p>Expert 0 (所有参数为 1):</p>
<p>W1_0 = [[1, 1, 1], [1, 1, 1]]</p>
<p>W3_0 = [[1, 1, 1], [1, 1, 1]]</p>
<p>W2_0 = [[1, 1], [1, 1], [1, 1]]</p>
<p>Expert 1 (所有参数为 2):</p>
<p>W1_1 = [[2, 2, 2], [2, 2, 2]]</p>
<p>W3_1 = [[2, 2, 2], [2, 2, 2]]</p>
<p>W2_1 = [[2, 2], [2, 2], [2, 2]]</p>
<p>Expert 2 (所有参数为 3):</p>
<p>W1_2 = [[3, 3, 3], [3, 3, 3]]</p>
<p>W3_2 = [[3, 3, 3], [3, 3, 3]]</p>
<p>W2_2 = [[3, 3], [3, 3], [3, 3]]</p>
<p>Expert 3 (所有参数为 4):</p>
<p>W1_3 = [[4, 4, 4], [4, 4, 4]]</p>
<p>W3_3 = [[4, 4, 4], [4, 4, 4]]</p>
<p>W2_3 = [[4, 4], [4, 4], [4, 4]]</p>
<p>演算流程：</p>
<ol>
<li>初始化:</li>
</ol>
<p>y 被初始化为 [[0, 0, 0], [0, 0, 0]]。</p>
<ol start="2">
<li>for i = 0 (处理 Expert 0):</li>
</ol>
<p>torch.where(indices == 0) 找到 idx = [0]。输入为 x_in = x[0] = [1, 1, 1]。</p>
<p>Expert 0 内部计算:</p>
<p>h1 = x_in @ W1_0.T = [3, 3]</p>
<p>h3 = x_in @ W3_0.T = [3, 3]</p>
<p>silu(h1) = [2.8577, 2.8577]</p>
<p>combined = silu(h1) * h3 = [8.5732, 8.5732]</p>
<p>output = combined @ W2_0.T = [17.1463, 17.1463, 17.1463]</p>
<p>加权并累加:</p>
<p>weighted_output = output * 0.5 = [8.5732, 8.5732, 8.5732]</p>
<p>y[0] += weighted_output</p>
<p>y 变为 [[8.5732, 8.5732, 8.5732], [0, 0, 0]]。</p>
<ol start="3">
<li>for i = 1 (处理 Expert 1):</li>
</ol>
<p>torch.where(indices == 1) 没有找到匹配项，跳过。</p>
<ol start="4">
<li>for i = 2 (处理 Expert 2):</li>
</ol>
<p>torch.where(indices == 2) 找到 idx = [0, 1]。该专家需处理两个 token。</p>
<p>处理 Token 0 (x_in = x[0] = [1, 1, 1]):</p>
<p>h1 = x_in @ W1_2.T = [9, 9]</p>
<p>h3 = x_in @ W3_2.T = [9, 9]</p>
<p>silu(h1) = [8.9989, 8.9989]</p>
<p>combined = silu(h1) * h3 = [80.9900, 80.9900]</p>
<p>output0 = combined @ W2_2.T = [485.9400, 485.9400, 485.9400]</p>
<p>处理 Token 1 (x_in = x[1] = [2, 2, 2]):</p>
<p>h1 = x_in @ W1_2.T = [18, 18]</p>
<p>h3 = x_in @ W3_2.T = [18, 18]</p>
<p>silu(h1) = [18.0000, 18.0000]</p>
<p>combined = silu(h1) * h3 = [324.0000, 324.0000]</p>
<p>output1 = combined @ W2_2.T = [1944.0000, 1944.0000, 1944.0000]</p>
<p>加权并累加:</p>
<p>weighted0 = output0 * 0.5 = [242.9700, 242.9700, 242.9700]</p>
<p>weighted1 = output1 * 0.5 = [972.0000, 972.0000, 972.0000]</p>
<p>y[0] += weighted0: y[0] 变为 [8.5732, 8.5732, 8.5732] + [242.9700, 242.9700, 242.9700] = [251.5432, 251.5432, 251.5432]</p>
<p>y[1] += weighted1: y[1] 变为 [972.0000, 972.0000, 972.0000]</p>
<ol start="5">
<li>for i = 3 (处理 Expert 3):</li>
</ol>
<p>torch.where(indices == 3) 找到 idx = [1]。输入为 x_in = x[1] = [2, 2, 2]。</p>
<p>Expert 3 内部计算:</p>
<p>h1 = x_in @ W1_3.T = [24, 24]</p>
<p>h3 = x_in @ W3_3.T = [24, 24]</p>
<p>silu(h1) = [24.0000, 24.0000]</p>
<p>combined = silu(h1) * h3 = [576.0000, 576.0000]</p>
<p>output = combined @ W2_3.T = [4608.0000, 4608.0000, 4608.0000]</p>
<p>加权并累加:</p>
<p>weighted_output = output * 0.5 = [2304.0000, 2304.0000, 2304.0000]</p>
<p>y[1] += weighted_output: y[1] 变为 [972.0000, 972.0000, 972.0000] + [2304.0000, 2304.0000, 2304.0000] = [3276.0000, 3276.0000, 3276.0000]</p>
<p>最终结果:</p>
<p>演算结束后，输出张量 y 的值为：</p>
<pre><code>[[251.5432, 251.5432, 251.5432],
 [3276.0000, 3276.0000, 3276.0000]]
</code></pre>
<p>通过这个极其详细的数值演算，可以看到 token 是如何被分发和结果如何被汇总的，并了解在每个专家内部，数据是如何经过一系列线性变换和激活函数处理的。</p>
<h2 id="总结">总结</h2>
<p>本节详细介绍了一种基于循环的朴素实现。这种实现方式的优点在于逻辑清晰、直观易懂。这种实现方式采取的是一种“专家视角”的计算模式，也就是按顺序遍历每一个专家，并为该专家筛选出所有分配给它的 token 并执行计算，最终将结果加权累积到对应的输出位置。</p>
<p>本节还通过代码分析和详尽的实例演算一步步地展示了计算的全过程。</p>
<p>这个朴素的实现虽然不是为高性能而设计的，但它为我们理解更复杂的优化算子，如下一部分将要介绍的 Fused MoE，提供了一个不可或缺的、关于“计算正确性”的基准。我们必须先知道要计算“什么”，才能更好地探讨如何“更快地”计算。</p>
<h2 id="展望">展望</h2>
<p>至此，我们通过对一个朴素、基于循环的 MoE 实现方案的分析，可以清晰地理解 MoE 计算的内在逻辑与最终目标。</p>
<p>然而，这个实现在逻辑清晰的同时，却也暴露了其计算模式是由大量独立、小规模的计算组成的。而现代 GPU 通常是为了进行大规模并行计算而设计的，其峰值性能只有在处理大型、连续的数据块时才能被充分激发。这也正是下一部分将要深入探讨的 Fused MoE 方案所要解决的核心问题。</p>
<p>参考链接：
[1]: <a href="https://github.com/deepseek-ai/DeepSeek-V3/blob/9b4e9788e4a3a731f7567338ed15d3ec549ce03b/inference/model.py#L636">https://github.com/deepseek-ai/DeepSeek-V3/blob/9b4e9788e4a3a731f7567338ed15d3ec549ce03b/inference/model.py#L636</a></p>`;export{p as assetURLs,r as default,t as metadata,i as toc};

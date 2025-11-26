---
label: 从循环到融合：理解 Fused MoE 算子原理（二）
description: MoE 层的完整工作流包含“路由选择”和“专家计算”两个核心环节，本文将聚焦于后者。本文是系列文章第二篇，第一篇首先从一个直观易懂的朴素实现入手，来展示 MoE 专家计算的完整逻辑，也为理解后续内容打下基础。
location: 中国香港
cover: ./image1.png
author: [陈添]
---
![图片](./image1.png)

## 引言
在当今大语言模型（LLM）的浪潮中，模型规模的持续扩张是提升性能的关键驱动力。然而，随着模型参数量的激增，训练和推理的计算成本也随之飙升。为了解决这一挑战，混合专家模型（Mixture-of-Experts, MoE）架构应运而生，并已成为许多前沿模型（如 Mixtral 8x7B, DeepSeek-V3）的核心技术之一。



MoE 的核心思想非常巧妙：它不再要求模型的每一部分处理所有的输入数据，而是引入了多个“专家”子网络——这些专家本质上就是标准的前馈网络。通过一个门控网络（Gating Network），系统可以为每个输入（token）动态地、稀疏地选择并激活一小部分专家进行计算。这样，模型可以在总参数量巨大的同时，保持单次前向传播的计算量相对可控，实现了规模与效率的精妙平衡。



MoE 层的完整工作流包含“路由选择”和“专家计算”两个核心环节，本文将聚焦于后者。本文是系列文章第二篇，第一篇首先从一个直观易懂的朴素实现入手，来展示 MoE 专家计算的完整逻辑，也为理解后续内容打下基础。第一篇文章参考：从循环到融合：理解 Fused MoE 算子原理（一）



本文将介绍 Fused MoE, 它是一种通过算子融合进行优化的方案，将多个独立的计算合并成一个单一的批处理操作，从而加速 MoE 中的专家计算环节。



通过对比这两种实现，希望能让读者深刻理解 Fused MoE 算子的原理。

## 第二部分：基于算子融合的 MoE 高效实现
在第一部分的结尾，可以看到基于循环的朴素实现包含了大量独立、小规模的计算。在 GPU 这种为大规模并行计算设计的硬件上，这种模式无法充分发挥其计算潜力。优化的关键在于将这些零散的任务融合（Fuse）成一个大规模的批处理操作，从而减少调度开销，提升硬件利用率。

#### 1. 从循环到批处理
要实现上述优化，我们将 Python for 循环替换为等价的、向量化的张量操作。不再逐个遍历专家，而是通过精巧的索引和矩阵操作，让 GPU 一次性完成所有 token 对其各自所需专家的计算。



这个过程也伴随着一个视角上的变化。朴素的循环实现可以看作是“专家视角”，其逻辑主线是遍历专家，并回答“我这个专家要处理哪些 token？”。而接下来要介绍的融合算子，则体现了“Token 视角”，它关心的是“对于每一个 token，我需要哪些专家的计算结果？”。

#### 2. 融合算子 expert_moe_matmul：核心构件
要实现高效的批处理操作，我们需要一个可重用的核心算子。下面的 expert_moe_matmul 函数就是这个核心构件。一个完整的 Expert 模块计算（包含 w1, w3, w2 三次矩阵乘法）就是通过连续调用这个算子（或其变体）来完成的。

````
def expert_moe_matmul(x: torch.Tensor, weight: torch.Tensor, topk_ids: torch.Tensor) -> torch.Tensor:
    """
    根据 topk_ids 对输入的 x 和指定的 expert 权重进行矩阵乘法。
    参数:
    x (torch.Tensor): 输入张量，形状为 [M, K]。
    weight (torch.Tensor): 专家权重张量，形状为 [E, N, K]。
    topk_ids (torch.Tensor): 指定每个输入要使用的专家索引，形状为 [M, topk]。
    返回:
    torch.Tensor: 输出张量，形状为 [M, topk, N]。
    """
    # 检查输入张量的维度
    assert x.dim() == 2, "输入 x 的维度应为 2"
    assert weight.dim() == 3, "输入 weight 的维度应为 3"
    assert topk_ids.dim() == 2, "输入 topk_ids 的维度应为 2"
    # M, K
    M, K = x.shape
    # E, N, K_weight
    E, N, K_weight = weight.shape
    # M_ids, topk
    M_ids, topk = topk_ids.shape
    # 确保维度匹配
    assert K == K_weight, f"x 和 weight 的 K 维度不匹配: {K} vs {K_weight}"
    assert M == M_ids, f"x 和 topk_ids 的 M 维度不匹配: {M} vs {M_ids}"
    # 1. 根据 topk_ids 选择专家权重
    # topk_ids 的形状是 [M, topk], weight 的形状是 [E, N, K]
    # selected_weights 的形状将是 [M, topk, N, K]
    selected_weights = weight[topk_ids]
    # 2. 调整 x 的形状以进行批处理矩阵乘法
    # x 的形状是 [M, K], 我们需要将其和 [M, topk] 个 [N, K] 的矩阵相乘
    # 将 x 的形状调整为 [M, 1, K, 1] 以便进行广播
    x_reshaped = x.unsqueeze(1).unsqueeze(-1)
    # 3. 执行批处理矩阵乘法
    # selected_weights: [M, topk, N, K]
    # x_reshaped: [M, 1, K, 1]
    # 广播后 x_reshaped 的有效形状为 [M, topk, K, 1]
    # 输出 o 的形状为 [M, topk, N, 1]
    o = torch.matmul(selected_weights, x_reshaped)
    # 4. 调整输出形状
    # 将形状从 [M, topk, N, 1] 变为 [M, topk, N]
    o = o.squeeze(-1)
    return o
````

这个函数摒弃了 for 循环，完全通过张量操作完成了计算。其核心步骤如下：

1. 权重选择 (weight[topk_ids]): 这是整个融合操作的核心。它利用了 PyTorch 的高级索引（Advanced Indexing）功能。weight[topk_ids] 这个操作会根据 topk_ids 中的专家索引，从 weight 中“挑选”出每个 token 对应的 topk 个专家的权重矩阵，并将它们堆叠成一个新的张量 selected_weights（形状为 [M, topk, N, K]）。这一步操作，等效地替代了朴素实现中的整个 for 循环和 torch.where。

2. 输入重塑 (x.unsqueeze): 为了和 selected_weights 进行批处理矩阵乘法，需要将输入 x（[M, K]）调整为合适的形状 [M, 1, K, 1]。

3. 批处理矩阵乘法 (torch.matmul): 这是性能提升的关键。torch.matmul 在这里会利用广播（Broadcasting）机制，一次性地、并行地执行 M * topk 个 [N, K] @ [K, 1] 的矩阵乘法。

4. 调整输出形状 (o.squeeze(-1)): 最后，去掉多余的维度，得到形状为 [M, topk, N] 的最终输出。这个张量包含了每个 token 经过其选择的 topk 个专家计算后的（未加权的）中间结果。

#### 3. 实例演算：追踪 Fused MoE 的数据流

现在，使用与第一部分完全相同的参数和预设值，来完整地演算一遍 Fused MoE 的流程。这个过程将清晰地展示算子融合是如何通过批处理操作，得到与循环实现完全相同的结果的。



准备输入：

输入 x (形状 [2, 3])

专家索引 topk_ids (形状 [2, 2])

门控权重 weights (形状 [2, 2])

所有专家的 W1 权重 (堆叠成 W1_all, 形状 [4, 2, 3])

所有专家的 W3 权重 (堆叠成 W3_all, 形状 [4, 2, 3])

所有专家的 W2 权重 (堆叠成 W2_all, 形状 [4, 3, 2])



演算流程：

1. 计算 h1:

首先调用 h1_fused = expert_moe_matmul(x, W1_all, topk_ids)。让我们深入这个函数内部，看看发生了什么：



1.1 权重选择 selected_weights = weight[topk_ids]:

对于 Token 0，topk_ids[0] 是 [0, 2]。系统会取出 weight[0] 和 weight[2]。

对于 Token 1，topk_ids[1] 是 [2, 3]。系统会取出 weight[2] 和 weight[3]。
最终 selected_weights 的形状是 [2, 2, 2, 3]，内容为：

````
[[[[1,1,1],[1,1,1]],  # Token 0, Expert 0 的 W1
  [[3,3,3],[3,3,3]]], # Token 0, Expert 2 的 W1
 [[[3,3,3],[3,3,3]],  # Token 1, Expert 2 的 W1
  [[4,4,4],[4,4,4]]]] # Token 1, Expert 3 的 W1
````

1.2 输入重塑 x_reshaped = x.unsqueeze(1).unsqueeze(-1):

x 的形状从 [2, 3] 变为 [2, 1, 3, 1]。



1.3 批处理矩阵乘法 o = torch.matmul(selected_weights, x_reshaped):

selected_weights[2, 2, 2, 3]



x_reshaped[2, 1, 3, 1] -> 广播为 [2, 2, 3, 1]

执行 2 * 2 = 4 次并行的矩阵乘法：
T0_E0_out = [[1,1,1],[1,1,1]].T @ [1,1,1] -> [3, 3]
T0_E2_out = [[3,3,3],[3,3,3]].T @ [1,1,1] -> [9, 9]
T1_E2_out = [[3,3,3],[3,3,3]].T @ [2,2,2] -> [18, 18]
T1_E3_out = [[4,4,4],[4,4,4]].T @ [2,2,2] -> [24, 24]

输出 o 的形状为 [2, 2, 2, 1]， squeeze 后为 [2, 2, 2]，内容为：

````
[[[3, 3],    # Token 0, Expert 0 的 h1
  [9, 9]],   # Token 0, Expert 2 的 h1
 [[18, 18],  # Token 1, Expert 2 的 h1
  [24, 24]]] # Token 1, Expert 3 的 h1
````

可以发现，这个结果与第一部分演算中手动计算出的 h1 值完全一致。



2. 计算 h3 (第二次调用融合算子):

再次调用融合算子 h3_fused = expert_moe_matmul(x, W3_all, topk_ids)。

由于在本例的设定中 W1_all 和 W3_all 的值相同，所以 h3_fused 的结果也与 h1_fused 完全相同。



3. 组合与激活:

接下来对 h1_fused 逐元素应用 silu 激活函数，再与 h3_fused 逐元素相乘。这些都是高效的批处理操作。

combined = F.silu(h1_fused) * h3_fused

得到的 combined 张量形状仍为 [2, 2, 2]，其内容为：


````
[[[  8.5732,   8.5732],  # T0, E0 的 combined
  [ 80.9900,  80.9900]], # T0, E2 的 combined
 [[324.0000, 324.0000],  # T1, E2 的 combined
  [576.0000, 576.0000]]] # T1, E3 的 combined
````

4. 计算最终专家输出 (第三次调用融合算子):

现在将 combined 张量作为输入，与所有专家的 W2 权重进行最后一次融合矩阵乘法。

经过计算，得到 final_expert_outputs 形状为 [2, 2, 3]，内容是每个 token 经过其 topk 个专家完整计算后的最终输出：

````
[[[  17.1463,   17.1463,   17.1463],  # T0, E0 output
  [ 485.9400,  485.9400,  485.9400]], # T0, E2 output
 [[1944.0000, 1944.0000, 1944.0000],  # T1, E2 output
  [4608.0000, 4608.0000, 4608.0000]]] # T1, E3 outpu
````

5. 加权求和:

最后一步，将所有专家的输出根据门控网络的权重 weights 进行加权求和。

weighted_outputs = final_expert_outputs * weights.unsqueeze(-1)

然后，沿 dim=1（topk 所在的维度）进行求和：y = torch.sum(weighted_outputs, dim=1)

y[0] = [8.5732, ...] + [242.9700, ...] = [251.5432, 251.5432, 251.5432]

y[1] = [972.0000, ...] + [2304.0000, ...] = [3276.0000, 3276.0000, 3276.0000]



最终结果:

````
[[251.5432, 251.5432, 251.5432],
 [3276.0000, 3276.0000, 3276.0000]]
````

这个最终结果与之前第一部分通过循环和逐一计算得到的结果完全相同。这清晰地证明了，算子融合方法在数学上与朴素实现是等价的，但它将复杂的、串行的循环逻辑，转化为了几个简单、高效、可大规模并行的张量运算。

## 总结

通过 expert_moe_matmul 这一核心构件，利用高级索引和批处理矩阵乘法，将零散的计算任务聚合成一个大规模的并行操作。这种实现方式展示了如何高效地达成计算目标，更能发挥现代硬件，尤其是 GPU 的并行计算优势。



本文还通过详尽的演算和最终一致的结果，验证了 Fused MoE 的正确性。

## 展望

至此，我们已经通过 PyTorch 完整地理解了 Fused MoE 算子的核心原理。可以看到如何将一个逻辑上稀疏、分散的任务，通过张量操作重构成一个适合 GPU 并行处理的密集计算问题。

然而，PyTorch 的实现虽然简洁易懂，但在追求极致性能的道路上，它只是第一步。为了真正压榨出硬件的每一分性能，还需要深入到更底层，直接控制 GPU 的计算和内存访问模式。

在下一篇文章中，我们将踏上一段更硬核的旅程：从 PyTorch 到 Triton.
我们将使用 OpenAI 推出的 Triton 语言，从零开始编写一个高性能的 Fused MoE 计算核（Kernel），亲手实现本文中讨论的融合矩阵乘法。

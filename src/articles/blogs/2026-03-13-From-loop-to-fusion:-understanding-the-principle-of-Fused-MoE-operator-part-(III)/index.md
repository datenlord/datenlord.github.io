---
label: 从循环到融合：理解 Fused MoE 算子原理（三）
description: 在本文（Part 3）中，我们将使用 OpenAI Triton 语言编写一个 Fused MoE Kernel，通过精细管理显存读写与计算任务调度，实现更底层的算子融合。
location: 美国
cover: ./image1.png
author: [达坦科技DatenLord]
---
![图片](./image1.png)


## 引言

在本系列文章的前两个部分中，我们探讨了 MoE 专家计算从基础逻辑到向量化优化的演进过程。



在 Part 1 中，我们通过 for 循环构建了 MoE 计算的基准模型。这种“专家视角”的实现虽然逻辑清晰，但在执行层面会产生大量细粒度的算子调用（Kernel Launch），增加了系统调度开销，难以充分利用 GPU 的并行计算能力。

（参考：从循环到融合：理解 Fused MoE 算子原理（一））



在 Part 2 中，我们利用 PyTorch 的高级索引和广播机制，实现了一种向量化的 Fused MoE。通过切换到“Token 视角”，我们将零散的专家计算聚合为大规模的批处理矩阵乘法。这种方法显著提升了计算密度，并消除了 Python 层的循环开销。（参考：从循环到融合：理解 Fused MoE 算子原理（二））



尽管 Part 2 的实现在代码层面完成了算子的合并，但从性能的角度看，这种基于高层算子组合的方案在底层执行上仍处于非最优状态。它虽然解决了粒度问题，却也同时引入了显著的显存访问瓶颈。为了解决这个问题，进一步提升效率，一个有效的路径是绕开框架的抽象限制，在底层直接控制硬件的计算与访存逻辑。



在本文（Part 3）中，我们将使用 OpenAI Triton 语言编写一个 Fused MoE Kernel，通过精细管理显存读写与计算任务调度，实现更底层的算子融合。



## 01 PyTorch 实现的性能瓶颈

在前文的 PyTorch 实现中，Fused MoE 的实现依赖于 expert_moe_matmul 函数，其核心是利用 PyTorch 的高级索引功能来替代循环。尽管代码简洁，但是其中却存在着一段会导致严重性能瓶颈的一行代码：

````
selected_weights = weight[topk_ids]
````
要理解该行代码的低效性，得从 GPU 的内存架构和数据流动的角度进行分析。



1. 显存读写分析

现代 GPU 的内存系统是分层的，简化后可以大致分为两个主要层级：



1. 高带宽内存（HBM）：也常被称为全局内存（Global Memory）。其容量巨大（例如几十 GB），但访问延迟相对较高。通过 PyTorch 创建的所有张量（如 weight, x）都存储在此。



2. 片上内存（On-Chip Memory / SRAM）：位于 GPU 计算核心旁的高速缓存。其容量非常小（例如几十 MB），但访问速度极快。实际的计算（如矩阵乘法）必须将数据从 HBM 加载到 SRAM 中才能执行。



HBM -> SRAM 的数据传输带宽是决定许多计算密集型任务性能的关键瓶颈。



追踪 selected_weights = weight[topk_ids] 及其后续 torch.matmul 操作背后完整的数据流动路径，可分解为以下步骤：



1. 第一次读（HBM -> SRAM）：GPU 启动一个索引/收集操作的 Kernel。该 Kernel 根据 topk_ids 的内容，从 HBM 中读取原始 weight 张量中被选中的部分，并将它们加载到 SRAM 中。



2. 一次写（SRAM -> HBM）：索引 Kernel 在 SRAM 中完成数据的拼接和重组后，会创建一个全新的、巨大的张量 selected_weights，并将其写回到 HBM 中。



3. 第二次读（HBM -> SRAM）：接下来，GPU 启动 torch.matmul 的 Kernel。为了执行计算，该 Kernel 需要将刚刚被写入 HBM 的 selected_weights 张量，重新读取 到 SRAM 中。



这个流程中可以看到问题的主要原因。



2. 中间张量问题

selected_weights 是一个中间张量。它只是为了满足 torch.matmul 接口的数据格式要求而被创建出的临时产物。



这种“先写回 HBM，再立刻读回 SRAM”的模式，造成了显存带宽的冗余消耗。理想情况下，数据从 HBM 读入 SRAM 后，应被直接用于计算，而不是进行一次不必要的数据交换。



在前文的 PyTorch 实现中，selected_weights 的形状为 [M, topk, N, K]。当 Token 数量 M 很大时，这个中间张量会占用不小的显存空间，并产生巨大的读写流量，成为整个计算流程的瓶颈。



3. 优化方案

为了解决这个瓶颈，一个优化方案是实现真正的算子融合：将“索引”和“矩阵乘法”这两个操作，在同一个 GPU Kernel 内部完成，从而彻底消除中间张量的产生。



在这种理想模式下，数据流将变为：



单个 Fused Kernel 启动。

Kernel 根据 topk_ids，直接计算出所需权重在 HBM 中的内存地址。

Kernel 直接从这些地址将所需权重加载到 SRAM 中。

数据一旦进入 SRAM，立刻被用于矩阵乘法计算。

最终的计算结果被直接写回 HBM。



通过这种方式，可以避免对 HBM 的冗余写入和读取，将数据流动压缩到最小。



OpenAI Triton 提供了在 Python 环境中编写自定义 GPU Kernel 的能力，并且相较于 CUDA C++ 更加简单，本文选择 Triton 作为实现这种算子融合优化的示例。

## 02 Triton 编程模型简介

在深入特定的 Kernel 实现之前，有必要先了解 Triton 的核心编程模型。Triton 采用 SPMD（Single Program, Multiple Data）范式，即同一个 Kernel 程序（Program）会在 GPU 上以大规模并行的方式启动多个实例，每个实例处理不同的数据（Data）。理解其任务划分和数据映射机制是编写 Triton Kernel 的基础。



1. Block（分块）：计算的基本单元

与逐元素（element-wise）操作的标量代码不同，Triton Kernel 的基本操作单元是Block或Tile。代码逻辑被设计为对一个小的数据块进行操作，而不是单个数据点。例如，在实现矩阵乘法时，其核心逻辑不是两个元素的相乘，而是两个小矩阵块（例如 32x32）的相乘。



这种分块计算的方式与 GPU 硬件的 SIMT (Single Instruction, Multiple Threads) 架构高度契合，允许单条指令同时处理一组数据，从而实现高吞吐。此外，这种编程模型能够高效利用现代 GPU 内置的专用计算单元，例如 NVIDIA 的 Tensor Core。Tensor Core 本身就是为执行小规模矩阵的点积（Dot Product）运算而设计的。当开发者在 Triton 中以 Block 为单位执行矩阵乘法（tl.dot）时，Triton 编译器能够自动将这些高级操作映射到底层硬件的 Tensor Core 指令上，从而在无需手动编写底层代码的情况下，压榨出硬件的峰值性能。



2. Grid（网格）与 PID：并行任务的索引系统

一个完整的计算任务（例如处理一个 1024x1024 的矩阵）会被分解成一个由多个 Block 组成的Grid。当启动一个 Triton Kernel 时，需要指定 Grid 的维度，这相当于定义了总共要启动多少个并行的程序实例来覆盖整个任务。



每个运行中的 Kernel 实例都可以通过其唯一的程序 ID（Program ID, pid）来定位自己在 Grid 中的坐标，从而确定自己应该负责处理哪一部分数据。pid 是通过 triton.language.program_id(axis) 函数获取的，其中 axis 参数指定了坐标轴：



pid_0 = tl.program_id(axis=0): 获取当前实例在 Grid 第 0 维的索引。

pid_1 = tl.program_id(axis=1): 获取当前实例在 Grid 第 1 维的索引。



通过 pid 和预定义的块大小（BLOCK_SIZE），每个 Kernel 实例就能够计算出它需要处理的数据在输入张量中的具体偏移量（Offset）。这个从 pid 映射到数据偏移量的机制是所有 Triton Kernel 的基础，它确保了虽然所有实例运行的是相同的代码，但它们操作的是输入数据的不同部分，从而协同完成整个大规模计算任务。



## 03 Fused MoE Kernel 的设计与实现

本章将详细介绍如何构建一个真正的融合算子。相比于通过 Pytorch 实现的逻辑融合，本章的目标是在单个 GPU Kernel 启动周期内，直接根据路由索引完成权重的定位与矩阵乘法计算。



1. Kernel 设计思路

任务定义

实现 Fused MoE 需要处理以下输入并产生对应的输出：



输入：

特征矩阵 x：形状为 [M, K]，表示 M 个特征维度为 K 的 Token。

专家权重堆叠 weight：形状为 [E, N, K]，将 E 个专家的权重矩阵（每个大小为 [N, K]）在第 0 维进行堆叠。

路由索引 topk_ids：形状为 [M, topk]，存储了每个 Token 所路由到的 topk 个专家的索引编号。



输出：

结果矩阵 output：形状为 [M, topk, N]，存储每个 Token 经过了其选定的 topk 个专家权重后，计算得到的结果。



Grid 划分策略

为了充分利用 GPU 的并行能力，这里将计算任务被划分为一个二维的 Grid，其维度与输出矩阵的维度相对应：

第 0 维（Token 轴）：对应 Token 维度 M。这里将 M 切分为若干个大小为 BLOCK_SIZE_M 的分块，Grid 的第 0 维大小为 ceil(M / BLOCK_SIZE_M)。

第 1 维（特征轴）：对应输出特征维度 N。这里将 M 切分为若干个大小为 BLOCK_SIZE_N 的分块，Grid 的第 0 维大小为 ceil(N / BLOCK_SIZE_N)。



这种划分方式意味着每一个 Block 负责计算一部分 Token 在输出特征轴上的一个 tile。



为了降低实现复杂度并更清晰地展示 MoE 的核心逻辑，本文将 BLOCK_SIZE_M 设为 1。



这意味着：每一个程序实例（Program Instance）在 Token 轴上仅负责处理输入中的一个特定 Token。 此时，Grid 的第 0 维大小精确等于 M。这种设定避免了在同一个实例中处理多个具有不同专家索引的 Token，显著简化了内存寻址逻辑。



在这种划分方式下，每个 PID 实例的职责非常明确：计算第 m 个 Token 在输出特征维度第 n 个分块上，与其对应的所有 topk 个专家的矩阵乘法结果。



2. 核心实现：通过间接寻址融合 topk 维度

之前的 Grid 划分，每个程序实例负责为单个 Token（由 pid_m 决定）计算其在某个输出特征分块（由 pid_n 决定）上的结果。



一个朴素的思路是在实例内部使用一个 for 循环来依次处理每个专家。但这会导致在循环内执行多次小规模的 tl.dot 运算，无法充分喂饱 GPU 的 Tensor Core，造成计算资源的浪费。



为了达到极致的性能，我们采用一种更激进的融合策略：在加载权重数据时，直接将 topk 个专家对应的权重块“拼接”起来，从而将 topk 次小矩阵乘法，融合成一次大规模的矩阵乘法。



我们可以使用 Triton 中指针运算和间接寻址的能力来实现这个方案。



步骤一：将 topk 维度“编码”到计算中

我们的目标是消除 topk 循环，因此不能再显式地处理 topk 索引。取而代之，我们将计算的“宽度”从处理单个专家的 BLOCK_SIZE_N 扩展为同时处理所有 topk 个专家的 FUSED_N。其中 FUSED_N = topk * BLOCK_SIZE_N.



接着，在一个 Block 内部，我们生成一个覆盖整个融合宽度 FUSED_N 的偏移量，并将其“解码”，从而推断出每个计算单元分别属于哪个专家以及对应的局部特征索引。

````
# 1. 生成 [1, FUSED_N] 的一维偏移量
fused_n_offsets = tl.arange(0, FUSED_N)[None, :]

# 2. 解码：推导出每个计算槽对应的 topk 索引和 N 内部索引
# topk_idx 形如 [0,0,...,0, 1,1,...,1, ...]
topk_idx = fused_n_offsets // BLOCK_SIZE_N
# n_inner 形如 [0,1,...,N-1, 0,1,...,N-1, ...]
n_inner  = fused_n_offsets % BLOCK_SIZE_N
````
通过这种方式，我们用一次性的并行计算，取代了原先的串行循环逻辑。



步骤二：间接寻址与权重 Gather

现在，我们拥有了 topk_idx，它可以告诉我们 FUSED_N 宽度上的每个计算槽分别对应哪个专家。接下来，我们利用这个信息，从 topk_ids 张量中一次性地加载出当前 Token 需要的所有专家 ID。
````
# 1. 计算所有 FUSED_N 个槽位对应的专家 ID 地址
expert_ids_ptr = topk_ids_ptr + pid_m * stride_topk_m + topk_idx * stride_topk_k

# 2. 一次性加载所有专家 ID
expert_ids = tl.load(expert_ids_ptr)
````
expert_ids 张量现在包含了类似 [0,0,...,0, 2,2,...,2] 这样的数据（根据 Token 0 的路由 [0, 2]），它成为了我们定位最终权重的“地图”。



我们通过构建一个二维的指针“网格”，使其每个坐标 (k, n) 都可以通过 expert_ids 直接计算出其在 HBM 中的地址。
````
# K 维度的行偏移
k_offsets_col = tl.arange(0, BLOCK_SIZE_K)[:, None]

# N 维度的全局列偏移
n_global = pid_n * BLOCK_SIZE_N + n_inner

# 构建融合权重的二维指针网格
w_ptrs = (weight_ptr 
          + expert_ids * stride_w_e        # 1. 根据专家ID跳跃到正确的专家块
          + n_global * stride_w_n          # 2. 在专家块内，移动到正确的特征列
          + k_offsets_col * stride_w_k)    # 3. 在特征列内，沿 K 维度连续移动
````
虽然 expert_ids 中的值可能是不连续的（例如从专家0跳到专家2），导致物理访存地址是跳跃的，但 Triton 的 tl.load 能够有效地处理这种 Gather（收集） 操作，将这些分散在 HBM 不同位置的数据块，汇聚到 SRAM 中，形成一个逻辑上连续的、形状为 [BLOCK_SIZE_K, FUSED_N] 的大权重矩阵。



步骤三：一次融合计算与结果写回

准备工作完成后，核心计算就回归到了一个标准的、但规模更大的分块矩阵乘法循环（仅沿 K 维度）。
````
# 1. 初始化一个更宽的累加器
acc = tl.zeros((1, FUSED_N), dtype=tl.float32)

# 2. 仅保留 K 维度的内循环
for k in range(0, K, BLOCK_SIZE_K):
    # 2.1 加载 x 的数据块 (形状 [1, BLOCK_SIZE_K])
    x_chunk = tl.load(x_ptr + ...)
    # 2.2 通过 Gather 加载融合后的权重块 (形状 [BLOCK_SIZE_K, FUSED_N])
    w_chunk = tl.load(w_ptrs + ...)
    # 2.3 执行一次大规模的点积运算
    acc += tl.dot(x_chunk, w_chunk)

# 3. 将融合计算的结果写回
# output 指针的计算方式与 w_ptrs 类似，也利用 topk_idx 和 n_global
out_ptrs = output_ptr + ...
tl.store(out_ptrs, acc)
````

最终的 tl.store 会利用与加载时相同的解码逻辑，将 acc 中一维展开的结果，精准地“散播”回 output 张量 [M, topk, N] 的正确位置，自动完成了数据的拆分。

通过这种“编码-融合计算-解码”的模式，我们成功地将 topk 循环完全展开到了并行计算中，从而提升计算密度和执行效率。



3. 完整实现与验证

理论的探讨最终需要通过代码来验证。本节将展示集成了“融合 topk 维度”优化策略的完整 Triton Kernel，并使用与前文一致的数值样例来驱动它，从而验证其正确性。



最终的 Triton Kernel



以下是 fused_moe_kernel 的完整实现。它接收输入张量、权重、路由索引以及它们的步长（Stride）作为参数，内部实现了我们上面讨论的完整逻辑：

````
import torch
import triton
import triton.language as tl

@triton.jit
def fused_moe_kernel(
    # --- 指针定义 ---
    x_ptr, weight_ptr, topk_ids_ptr, output_ptr,
    # --- 维度信息 ---
    M, K, N, topk,
    # --- Strides (步长) ---
    stride_x_m, stride_x_k,
    stride_w_e, stride_w_n, stride_w_k,
    stride_topk_m, stride_topk_k,
    stride_out_m, stride_out_topk, stride_out_n,
    # --- 元参数 ---
    BLOCK_SIZE_M: tl.constexpr,
    BLOCK_SIZE_K: tl.constexpr,
    BLOCK_SIZE_N: tl.constexpr,
    FUSED_N: tl.constexpr,
):
    pid_m = tl.program_id(axis=0)  # 当前 Token 的 ID
    pid_n = tl.program_id(axis=1)  # 当前 N 维度的 Block ID

    # --- 1. 坐标与维度解码 ---
    fused_n_offsets = tl.arange(0, FUSED_N)[None, :]
    topk_idx = fused_n_offsets // BLOCK_SIZE_N
    n_inner  = fused_n_offsets % BLOCK_SIZE_N
    n_global = pid_n * BLOCK_SIZE_N + n_inner

    # --- 2. 间接寻址与权重 Gather ---
    # 加载专家 ID
    expert_ids_ptr = topk_ids_ptr + pid_m * stride_topk_m + topk_idx * stride_topk_k
    expert_ids_mask = topk_idx < topk
    expert_ids = tl.load(expert_ids_ptr, mask=expert_ids_mask, other=0)

    # --- 3. 核心计算循环 (仅沿 K 维度) ---
    acc = tl.zeros((1, FUSED_N), dtype=tl.float32)
    k_offsets_row = tl.arange(0, BLOCK_SIZE_K)[None, :]
    k_offsets_col = tl.arange(0, BLOCK_SIZE_K)[:, None]

    for k in range(0, K, BLOCK_SIZE_K):
        # 加载 X
        x_ptrs = x_ptr + pid_m * stride_x_m + (k + k_offsets_row) * stride_x_k
        x_mask = (k + k_offsets_row) < K
        x_chunk = tl.load(x_ptrs, mask=x_mask, other=0.0)

        # 构建权重指针网格并加载 (Gather)
        w_ptrs = (weight_ptr
                  + expert_ids * stride_w_e
                  + n_global * stride_w_n
                  + (k + k_offsets_col) * stride_w_k)
        
        w_mask = ((k + k_offsets_col) < K) & (n_global < N) & (topk_idx < topk)
        w_chunk = tl.load(w_ptrs, mask=w_mask, other=0.0)

        # 累加
        # acc += tl.dot(x_chunk, w_chunk)
        acc += tl.sum(tl.trans(x_chunk) * w_chunk, axis=0)[None, :]

    # --- 4. 结果写回 ---
    out_ptrs = (output_ptr
                + pid_m * stride_out_m
                + topk_idx * stride_out_topk
                + n_global * stride_out_n)
    
    out_mask = (n_global < N) & (topk_idx < topk)
    tl.store(out_ptrs, acc, mask=out_mask)
````

测试与验证

现在，我们使用与前文中相同的参数和数据来驱动这个 Kernel，以检验其计算结果是否与原始的、基于循环的逻辑一致。



参数设定:

Token 数量 M = 2

Token 维度 K = 3

专家中间层维度 N = 2

总专家数量 E = 4

激活专家数 topk = 2



输入数据:

x = [[1, 1, 1], [2, 2, 2]]

topk_ids = [[0, 2], [2, 3]]

weight：专家0权重全为1，专家1全为2，专家2全为3，专家3全为4。



PyTorch 驱动脚本:
````
def run_triton_test():
    # --- 1. 准备数据 ---
    M, K, N, E, topk = 2, 3, 2, 4, 2
    x = torch.tensor([[1, 1, 1], [2, 2, 2]], dtype=torch.float32, device='cuda')
    topk_ids = torch.tensor([[0, 2], [2, 3]], dtype=torch.int32, device='cuda')
    
    weights = torch.zeros((E, N, K), dtype=torch.float32, device='cuda')
    weights[0], weights[1], weights[2], weights[3] = 1.0, 2.0, 3.0, 4.0
    
    # 准备接收输出的张量
    output = torch.zeros((M, topk, N), dtype=torch.float32, device='cuda')

    # --- 2. 配置 Triton 启动参数 ---
    BLOCK_SIZE_K = 2
    BLOCK_SIZE_N = 2
    FUSED_N = topk * BLOCK_SIZE_N

    grid = (M, triton.cdiv(N, BLOCK_SIZE_N))

    # --- 3. 启动 Kernel ---
    fused_moe_kernel[grid](
        x, weights, topk_ids, output,
        M, K, N, topk,
        x.stride(0), x.stride(1),
        weights.stride(0), weights.stride(1), weights.stride(2),
        topk_ids.stride(0), topk_ids.stride(1),
        output.stride(0), output.stride(1), output.stride(2),
        BLOCK_SIZE_M=1, BLOCK_SIZE_K=BLOCK_SIZE_K, BLOCK_SIZE_N=BLOCK_SIZE_N, FUSED_N=FUSED_N
    )

    # --- 4. 打印并验证结果 ---
    print("Triton Fused MoE Kernel 输出结果:")
    print(output)
    
    # --- 与 Part 1 中的手工计算结果进行比对 ---
    # Token 0 -> Expert 0, Expert 2
    # x @ W0.T = [1,1,1] @ [[1,1],[1,1],[1,1]] = [3, 3]
    # x @ W2.T = [1,1,1] @ [[3,3],[3,3],[3,3]] = [9, 9]
    # Token 1 -> Expert 2, Expert 3
    # x @ W2.T = [2,2,2] @ [[3,3],[3,3],[3,3]] = [18, 18]
    # x @ W3.T = [2,2,2] @ [[4,4],[4,4],[4,4]] = [24, 24]
    
    print("\n预期结果:")
    expected_output = torch.tensor([
        [[3., 3.], [9., 9.]],      # Token 0 的结果
        [[18., 18.], [24., 24.]]   # Token 1 的结果
    ], device='cuda')
    print(expected_output)
    
    assert torch.allclose(output, expected_output)
    print("\n✅ 结果验证通过！")

if __name__ == "__main__":
    run_triton_test()
````
运行结果:

````
Triton Fused MoE Kernel 输出结果:
tensor([[[ 3.,  3.],
         [ 9.,  9.]],

        [[18., 18.],
         [24., 24.]]], device='cuda:0')

预期结果:
tensor([[[ 3.,  3.],
         [ 9.,  9.]],

        [[18., 18.],
         [24., 24.]]], device='cuda:0')

✅ 结果验证通过！
````

最终的输出与我们手工推导以及在 Part 1 中通过简单循环得到的结果完全一致。这证明了我们编写的 Fused MoE Kernel 在逻辑上的正确性，并成功地将在概念层面的融合优化，转化为了实际可执行的高性能 GPU 代码。

## 04 总结

在本文中，我们深入探讨了从高层 PyTorch 算子组合到低层 Triton 自定义 Kernel 的 Fused MoE 演进之路。通过分析 PyTorch 实现中因“中间张量”导致的冗余显存读写瓶颈，我们明确了通过自定义 Kernel 实现算子融合的必要性。



最终实现的 Triton Kernel 能够在单个 Kernel 内完成“索引”和“矩阵乘法”两个操作，从而消除了 selected_weights 这个中间张量的创建、写回 HBM 以及二次读取的过程。数据从 HBM 被直接加载到 SRAM 后立刻用于计算，极大地减少了对高延迟、低带宽的全局内存的访问次数。

## 05 展望

现在我们已经掌握了 Fused MoE Kernel 的核心设计思想与优化技巧。那么，这些思想在工业级的推理框架中是如何应用的呢？



在本系列的下一篇文章（Part 4）中，我们将深入 vLLM 项目，剖析其生产环境下的 Fused MoE Triton 内核。我们将看到本文介绍的核心概念（如间接寻址、融合topk）是如何被直接用于实现实际的 FusedMoE 算子。敬请期待！

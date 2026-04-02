const p="/assets/image1-0eb095c8.png",e="/assets/image2-28100740.png",o="/assets/image3-f7aa5bb1.png",t="/assets/image4-06ffd8a4.png",r="/assets/image5-04262ac7.png",s="/assets/image6-0539ac13.png",n="/assets/image7-d229b064.png",i="/assets/image8-c97cfe29.png",a="/assets/image9-bce36e71.png",d="/assets/image10-40742804.png",c="/assets/image11-676ad301.png",l=[p,e,o,t,r,s,n,i,a,d,c],x={label:"深入 NVIDIA GPU：高性能矩阵乘法算子解构（三）",description:"在本篇博文中，我将逐步介绍支撑最尖端（SOTA）NVIDIA GPU 矩阵乘法（matmul）算子的核心硬件概念和编程技术。",location:"美国",cover:"./image1.png",author:["达坦科技DatenLord"],date:"2026-02-05",title:"deep dive into nvidia gpu high performance matrix multiplication operator deconstruction part (III)"},B=[{label:"引言",level:2},{label:"设计近乎 SOTA 的同步矩阵乘法内核",level:2}],M=`<p><img src="${p}" alt="图片"></p>
<h2 id="引言">引言</h2>
<p>本文是文章：Inside NVIDIA GPUs: Anatomy of high performance matmul kernels 的翻译版。本篇文章翻译将分为四个部分，本文是第三部分。</p>
<h2 id="设计近乎-sota-的同步矩阵乘法内核">设计近乎 SOTA 的同步矩阵乘法内核</h2>
<p>在本章中，我们将解构一个在以下限制条件下接近 SOTA 的 fp32 内核：</p>
<p>无 TMA</p>
<p>无异步内存指令</p>
<p>无张量核心 (Tensor Cores)</p>
<p>仅限 fp32（无 bf16）</p>
<p>换句话说，这是在 Volta 架构之前的 GPU 模型下的 SOTA（在 Volta/Ampere 上也接近 SOTA）：</p>
<p>Volta 引入了张量核心。</p>
<p>Ampere 引入了异步内存指令。</p>
<p>Hopper 引入了 TMA。</p>
<p>我们将学习的技术称为线程束平铺（warp-tiling）。</p>
<p>在深入研究之前，让我们对之前的内核进行微小的修改，看看会发生什么。具体来说，我们将改变 row 和 col 变量的计算方式。</p>
<p>原始版本：</p>
<pre><code>const int row = blockIdx.x * BLOCKSIZE + (threadIdx.x / BLOCKSIZE);
const int col = blockIdx.y * BLOCKSIZE + (threadIdx.x % BLOCKSIZE);
</code></pre>
<p>修改版本：</p>
<pre><code>const int row = blockIdx.x * BLOCKSIZE + (threadIdx.x % BLOCKSIZE);
const int col = blockIdx.y * BLOCKSIZE + (threadIdx.x / BLOCKSIZE);
</code></pre>
<p>换句话说，我们只是交换了 % 和 / 运算符。</p>
<p>交换 row 和 col 是与前一示例相比在逻辑结构上唯一的改变：</p>
<p>交换 row 和 col 是与前一示例相比在逻辑结构上唯一的改变：</p>
<p><img src="${e}" alt="图片">
图 24：row 和 col 变量的新逻辑组织</p>
<p>以下是修改后的内核现在的表现：</p>
<p><img src="${o}" alt="图片">
图 25：具有非合并（uncoalesced）GMEM 访问的朴素内核</p>
<p>这个看似无害的微调使得我们的 GMEM 访问变得非合并。</p>
<p>在我的 H100 PCIe 卡上，性能从 3171 GFLOP/s 骤降至仅 243 GFLOP/s——慢了 13 倍。这正是我们之前在 GMEM 章节中看到的惩罚（Stephen Jones 的跨步 GMEM 访问实验）。</p>
<p>从外部看，这只是两个运算符之间微不足道的交换。但如果你没有硬件的认知模型，你永远不会预料到如此戏剧性的影响。</p>
<p><img src="${t}" alt="图片">
图 26：屋顶线模型（Roofline Model）</p>
<p>观察屋顶线模型，你可以看到我们的内核深陷于图中的内存带宽受限（memory-bandwidth-bound）区域。我们为算力付给 NVIDIA 大笔资金，所以我们理应瞄准计算受限（compute-bound）区域。</p>
<p>📝 屋顶线模型 (Roofline Model)</p>
<p>屋顶线模型在 y 轴上绘制性能 (FLOP/s)，在 x 轴上绘制算术强度 (Arithmetic Intensity, AI)。</p>
<p>算术强度定义为：每从设备内存/GMEM 加载一个字节所执行的浮点运算次数（默认情况下）。</p>
<p>“脊点”（ridge point）出现在：峰值性能 / GMEM 带宽。对于我的 H100 PCIe，这个数值大约是 410。只有当算术强度超过这个值时，内核才能进入计算受限状态。</p>
<p>在继续之前，让我们重新审视一下串行矩阵乘法代码。供参考：</p>
<pre><code>for (int m = 0; m &#x3C; M; m++) {
    for (int n = 0; n &#x3C; N; n++) {
        float tmp = 0.0f;  // 点积累加器for (int k = 0; k &#x3C; K; k++) {
            tmp += A[m][k] * B[k][n];
        }
        C[m][n] = tmp;
    }
}
</code></pre>
<p>我想在这里强调的关键点是：语义对循环顺序是不变量。换句话说，我们可以将这三个嵌套循环以 3! = 6 种方式中的任何一种进行置换，结果仍然是一个正确的矩阵乘法。</p>
<p>在这六种置换中，最有趣的是将 K 放在最外层的顺序。（m 和 n 的相对顺序较不重要，所以让我们假设“规范的” m-n 顺序）：</p>
<pre><code>for (int k = 0; k &#x3C; K; k++) {
    for (int m = 0; m &#x3C; M; m++) {
        float a = A[m][k];  // 在遍历 N 的过程中复用这个加载（减少 GMEM 访问）for (int n = 0; n &#x3C; N; n++) {
            C[m][n] += a * B[k][n];
        }
    }
}
</code></pre>
<p>如果这些加载来自 GMEM，通过将 A 的加载次数从N^3 减少到 N^2，我们刚刚节省了大约 2x 的带宽。</p>
<p>但更重要的洞察是算法层面的：这个版本将矩阵乘法计算为外积的偏部分和（partial sum of outer products）。这种视角对于理解我们接下来要深入探讨的线程束平铺（warp-tiling）方法至关重要。</p>
<p><img src="${r}" alt="图片">
图 27：矩阵乘法作为部分外积之和</p>
<p>这可能显而易见，但值得强调：一个点积等同于多个部分点积之和：</p>
<p><img src="${s}" alt="图片">
图 28：点积等同于部分点积之和</p>
<p>这很重要，因为它允许我们将计算分解为一系列块矩阵乘法（block matmuls）（每个块产生部分点积）。通过在执行计算之前将这些块移动到 SMEM 中，我们可以减少 GMEM 流量并显著提高速度。</p>
<p>如果不进行分块（chunking），我们根本无法将其放入 SMEM 内部。</p>
<p>还请回想一下，我们最初的内核算术强度非常低——它们在加载每个字节时完成的工作很少。为了改进这一点，我们需要：</p>
<p>每个线程计算多个输出元素。</p>
<p>使输出分块（tiles）尽可能接近正方形。</p>
<p>这里有一个视觉直觉，解释了为什么这很重要：</p>
<p><img src="${n}" alt="图片">
图 29：当每个线程计算多个输出且分块接近正方形时，算术强度会提高</p>
<p>至此，我们已经收集了理解线程束平铺（warp-tiling）所需的大部分拼图。让我们把它们拼在一起。</p>
<p>我们知道两件关键的事：</p>
<p>输出分块应该是正方形的（以最大化算术强度）。</p>
<p>计算应该分解为子步骤，以便中间块可以放入 SMEM。</p>
<p>考虑到这一点，算法的高层结构如下所示：</p>
<p><img src="${i}" alt="图片">
图 30：线程束平铺算法的高层结构，也称为块平铺（block tiling）</p>
<p>参考代码在这里：</p>
<p><a href="https://github.com/siboehm/SGEMM_CUDA/blob/master/src/kernels/10_kernel_warptiling.cuh%E3%80%82%E6%88%91%E5%BB%BA%E8%AE%AE%E5%85%88%E4%BB%8E%E6%88%91%E7%9A%84%E5%9B%BE%E8%A1%A8%E5%BC%80%E5%A7%8B%EF%BC%8C%E7%84%B6%E5%90%8E%E6%89%93%E5%BC%80%E4%BB%A3%E7%A0%81%E5%B0%86%E6%89%80%E6%9C%89%E8%A6%81%E7%82%B9%E8%BF%9E%E6%8E%A5%E8%B5%B7%E6%9D%A5%E3%80%82">https://github.com/siboehm/SGEMM_CUDA/blob/master/src/kernels/10_kernel_warptiling.cuh。我建议先从我的图表开始，然后打开代码将所有要点连接起来。</a></p>
<p>📝 注意：</p>
<p>我将使用与 Simon 博客文章中相同的分块大小（未针对我的 H100 进行自动调优）：</p>
<p>Bm = Bn = 128, Bk = 16</p>
<p>由于每个块的计算是独立的——而且我们已经确信部分点积可以累加为完整的点积——我们只需要关注单个块的单个步骤。其余部分（另外 1023 个块，4096/128 * 4096/128 = 32*32 = 1024 总计）将遵循相同的逻辑。</p>
<p>📝 给自己的笔记：</p>
<p>出于某种原因，我很难忽略其他的块。所以，念咒语时间：“其他一切都是正确的；我只需要专注于下一步。局部正确性导致全局正确性。” :)</p>
<p>带着这种心态，让我们放大到蓝色块的第一步（红箭头转换前的计算），它对应于输出分块 C[0,0]（注意是分块，而不是单个元素）。</p>
<p>矩阵 A的分块维度为 Bm × Bk，矩阵 $B$ 的分块维度为 Bk × Bn。这些数据被加载到 SMEM 缓冲区 As 和 Bs 中。</p>
<p>加载/存储 B 	o Bs 是很直接的，因为 Bs 没有经过转置。4 个线程束中的每一个都从 GMEM 抓取 B 的一行，每个线程发布一次向量化加载（LDG.128），随后执行一次向量化存储（STS.128）。每个线程束循环 4 次，步长为 4 行。</p>
<p>对应代码（我增加了注释并删除了 Simon 注释掉的代码）：</p>
<pre><code>for (uint offset = 0; offset + rowStrideB &#x3C;= BK; offset += rowStrideB) {
    // 我们需要 reinterpret_cast 来强制执行 LDG.128 指令 (128b = 4 个 4B 浮点数)reinterpret_cast&#x3C;float4 *>(
        &#x26;Bs[(innerRowB + offset) * BN + innerColB * 4])[0] =
        reinterpret_cast&#x3C;const float4 *>(
            &#x26;B[(innerRowB + offset) * N + innerColB * 4])[0];
}
</code></pre>
<p><img src="${a}" alt="图片">
图 31：将 B 的分块（GMEM）加载到 Bs（SMEM）中</p>
<p>加载 A 	o As。这一步更棘手，因为 As 是经过转置的。转置的原因是它允许在随后的计算阶段进行向量化加载（LDS.128）。</p>
<p>权衡之处在于存储无法向量化：从 A 的一行中提取的 4 个浮点数现在必须离散地存入 As 的一列中，而这一列映射到了同一个内存银行（bank）。这是可以接受的，因为我们优先考虑快速加载——在计算过程中，As 的每个元素会被多次访问，而存储仅发生一次。</p>
<p>图中的 innerRowX 和 innerColX 注解准确展示了每个线程负责的工作。</p>
<p>对应代码：</p>
<pre><code>for (uint offset = 0; offset + rowStrideA &#x3C;= BM; offset += rowStrideA) {
  // 需要 reinterpret_cast 来强制执行 LDG.128 指令const float4 tmp = reinterpret_cast&#x3C;const float4 *>(
      &#x26;A[(innerRowA + offset) * K + innerColA * 4])[0];
  As[(innerColA * 4 + 0) * BM + innerRowA + offset] = tmp.x;
  As[(innerColA * 4 + 1) * BM + innerRowA + offset] = tmp.y;
  As[(innerColA * 4 + 2) * BM + innerRowA + offset] = tmp.z;
  As[(innerColA * 4 + 3) * BM + innerRowA + offset] = tmp.w;
}
</code></pre>
<p><img src="${d}" alt="图片"></p>
<p>图 32：将 A 的分块（GMEM）加载到 As（SMEM）中(1)(2)</p>
<p>加载完成后，我们同步线程块（__syncthreads()），以确保所有数据在 As 和 Bs 中均已就绪。</p>
<p>现在进入计算阶段。</p>
<p>对应代码（建议扫视一下代码，并在代码与绘图之间进行几次对照阅读）：</p>
<pre><code>for (uint dotIdx = 0; dotIdx &#x3C; BK; ++dotIdx) {
  // dotIdx 是最外层循环// WM = 64，这就是为什么 As 被拆分为 2x64 部分// TM = 8，这就是为什么线程处理来自 As 的 8 行// WMITER = 1，这就是为什么 As 中只有单个切片（图附录中的第 2 部分）for (uint wSubRowIdx = 0; wSubRowIdx &#x3C; WMITER; ++wSubRowIdx) {
    // 从 As 加载到寄存器 regMfor (uint i = 0; i &#x3C; TM; ++i) {
      regM[wSubRowIdx * TM + i] =
          As[(dotIdx * BM) + warpRow * WM + wSubRowIdx * WSUBM +
              threadRowInWarp * TM + i];
    }
  }
  // WN = 64，这就是为什么 Bs 被拆分为 2x64 部分// TN = 4，这就是为什么 Bs 的每个切片有 4 列// WNITER = 4，这就是为什么 Bs 中有四个切片// WSUBN = WN/WNITER = 16 (用于在切片间迭代)for (uint wSubColIdx = 0; wSubColIdx &#x3C; WNITER; ++wSubColIdx) {
    for (uint i = 0; i &#x3C; TN; ++i) {
      // 从 Bs 加载到寄存器 regN
      regN[wSubColIdx * TN + i] =
          Bs[(dotIdx * BN) + warpCol * WN + wSubColIdx * WSUBN +
              threadColInWarp * TN + i];
    }
  }
  // 通过部分外积之和执行线程束平铺矩阵乘法for (uint wSubRowIdx = 0; wSubRowIdx &#x3C; WMITER; ++wSubRowIdx) {
    for (uint wSubColIdx = 0; wSubColIdx &#x3C; WNITER; ++wSubColIdx) {
      for (uint resIdxM = 0; resIdxM &#x3C; TM; ++resIdxM) {
        for (uint resIdxN = 0; resIdxN &#x3C; TN; ++resIdxN) {
          threadResults[(wSubRowIdx * TM + resIdxM) * (WNITER * TN) +
                        (wSubColIdx * TN) + resIdxN] +=
              regM[wSubRowIdx * TM + resIdxM] *
              regN[wSubColIdx * TN + resIdxN];
        }
      }
    }
  }
}
</code></pre>
<p><img src="${c}" alt="图片">
图 33：将 As 和 Bs 之间的矩阵乘法执行为一系列线程级外积（线程束平铺 + 线程平铺）</p>
<p>一旦分块处理完毕，我们再次同步。这可以防止竞争条件——如果没有它，一些线程可能会开始将下一个分块写入 As 和 Bs，而其他线程仍在处理当前分块。</p>
<p>同步后，我们将 A 和 B 的指针推进 Bk 距离，算法重复执行直到所有分块处理完毕。</p>
<pre><code>A += BK;     // 将 BK 列向右移动
B += BK * N; // 将 BK 行向下移动
</code></pre>
<p>最后，一旦循环完成，128 个线程将其私有的 threadResults 寄存器刷入矩阵 C 对应的输出分块中（此时该分块已包含完整的点积结果！）。</p>
<p>在实践中，你会针对特定的 GPU 对该算法的参数进行自动调优。但正如前面指出的，这种风格的内核已不再是首选方法——现代 GPU 拥有异步内存机制和张量核心（Tensor Cores），能将性能推向远超单靠线程束平铺所能达到的水平。</p>
<p>接下来，让我们转向 Hopper 上的真正 SOTA。</p>
<p>📝 下一章的补充阅读：</p>
<p>我强烈推荐 Pranjal 的优秀博文 [15]，它读起来更像是一份工作日志。在本章中，我将遵循他日志中的内核。与 Simon 的工作一样，大部分代码似乎也受到了 CUTLASS 的启发（例如这些帖子：CUTLASS ping pong 内核 [16] 和高效 GEMM）。</p>
<p>值得注意的是，细节决定成败，Pranjal 成功超越了 cuBLAS SOTA——在一些目标矩阵维度上达到了 cuBLAS 性能的约 107%。</p>`;export{l as assetURLs,M as default,x as metadata,B as toc};

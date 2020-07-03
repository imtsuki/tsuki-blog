---
title: PageRank
date: 2020-04-27
tags:
  - PageRank
  - Google
---

import Mark, { Highlight, Box, Circle, Underline } from "@/components/Mark";

## Rationale

PageRank 算法基于以下<Box>两个假设</Box>：

1. **数量假设：**某页面接受到的<Underline>入链数量越多</Underline>，则该页面越重要；
2. **质量假设：**某页面接受到的<Underline>入链质量越高</Underline>，则该页面越重要。

假设 2 事实上为每个页面都赋予了一个权重。PageRank 算法基于上述假设，利用入链的数量与质量，来估算该页面的重要性。

## PageRank Algorithm

PageRank 算法可概括为：<Highlight>如果某页面入链等级之和越高，则该页面的等级也越高</Highlight>。

首先，我们从一个简化版的 PageRank 算法出发。令 $p$ 为一页面，$F_p$ 为 $p$ 链出页面的集合，$B_p$ 为 $p$ 入链页面的集合。令 $N_p = |F_p|$ 为页面 $p$ 出链的数目。简化版的 PageRank 值 $R$ 定义如下：

$$
R_{t + 1}(p) = c\sum_{q \in B_p}\frac{R_{t}(q)}{N_q}
$$

其中，$c$ 为正则化常数，使得整体值收敛。该公式形式化了我们之前对 PageRank 算法的概括：页面 $p$ 的 PageRank 值为其入链贡献之和。这里注意到，每个入链 $q$ 的 $R$ 值根据其链出总数 $N_q$ 平分。也就是说，$q$ 会把其自身的 $R$ 值平均分配给其所有的出链。

这个公式事实上是递归迭代的。不过在完整的 PageRank 算法下，<Highlight>对于任意的初值，以该公式经过迭代计算，最终总能收敛到一组稳定值。</Highlight>实践中，常取初值 $R_0(p_i) = 1 / n$。

该公式也可以采用矩阵形式表述。设 $A$ 为一方阵，其行列对应所有页面。若有从 $p$ 指向 $q$ 的一条链接，则令 $A_{p, q} =  {1}/{N_p}$；否则 $A_{p, q} = 0$。这样，上述定义可表示为

$$
\mathbf{R}_{t + 1} = cA\mathbf{R}_{t}
$$

其中 $\mathbf{R}$ 是 PageRank 值的向量表示

$$
\begin{aligned}
  \mathbf{R} &= \begin{bmatrix}
    R(p_1) \\
    R(p_2) \\
    \vdots \\
    R(p_n)
  \end{bmatrix}
\end{aligned}
$$

这样，PageRank 向量 $\mathbf{R}$ 事实上即为矩阵 $A$ 的一个特征向量。

该简化版本的 PageRank 事实上有一些缺陷：如果一组网页相互成环且没有出链，且有一些其他页面指向这组页面，那么在迭代计算时，这个局部会不断积累 $R$ 值，导致整体无法收敛。这被称作 <Box>rank sink</Box>。

### Random Surfer Model

为了解决 rank sink 的问题，PageRank 引入了<Box>阻尼系数 (decay factor)</Box> 的概念[^Haveliwala(1999)]。阻尼系数基于这样一个假设：在用户随机地点击页面链接进行浏览的过程中，如果用户进入了一个 rank sink，他并不会在这组网页中无限循环，而是很有可能停止点击，随机开启另一个新的页面重新开始浏览。这样，经过修改的完整 PageRank 算法 $R'$ 定义如下：

[^Haveliwala(1999)]: Taher Haveliwala. Efficient computation of pagerank. Technical report, Stanford, 1999.

$$
R'_{t + 1}(p) = \frac{1 - d}{n} + d\sum_{q \in B_p}\frac{R'_{t}(q)}{N_q}, \text{where } d \in (0, 1)
$$

这里，$d$ 为阻尼系数。在论文中，它被设置为<Circle> $0.85$</Circle>，代表用户继续点击的概率[^Page.et.al.(1999)]。

[^Page.et.al.(1999)]: Lawrence Page, Sergey Brin, Rajeev Motwani, and Terry Winograd. The pagerank citation ranking: Bringing order to the web. Technical report, Stanford InfoLab, 1999.

使用矩阵形式重写如下：

$$
\mathbf{R'}_{t + 1} = \frac{1 - d}{n}\mathbf{1} +  dA\mathbf{R'}_{t}
$$

其中，$\mathbf{1}$ 是全为 $1$ 的列向量。

### Rank Leak

Page Rank 的另一个问题是所谓<Box>悬空链接 (dangling links)</Box>，指没有出链的独立网页。解决方法很简单：将这些节点先从图中去除，待计算完成后在加入进去。这些节点不会对整体的结果造成太大的影响。

## Properties of PageRank Algorithm

**Property 1.** 对于任意 $t > 0$，有

$$
\sum_{i = 1}^{n} R'_t(p_i) \leq 1
$$

**Property 2.** 进一步地，若对任意 $1 \leq j \leq n$ 有 $N_j \geq 1$，则对于任意 $t > 0$，$\{R'_t(p_i)\}_{1 \leq i \leq n}$ 为一概率分布。即对于任意 $t > 0$，有

$$
\sum_{i = 1}^{n} R'_t(p_i) = 1
$$

**Proof.** 我们知道 $\sum_{i = 1}^{n} R'_0(p_i) = 1$，因 $R'_0(p_i) = 1 / n$。设命题对某 $t \geq 0$ 成立，若对任意 $1 \leq j \leq n$ 有 $N_j \geq 1$，则

$$
\begin{aligned}
  \sum_{i = 1}^{n} R'_{t + 1}(p_i) &= (1 - d) + d\sum_{i = 1}^{n}\sum_{q \in B_{p_i}}\frac{R'_{t}(q)}{N_q} \\
  &= (1 - d) + d\sum_{i = 1}^{n}\sum_{j = 1}^{n}\frac{R'_{t}(p_j)}{N_{p_j}}\mathbb{I}_{\{p_j \in B_{p_i}\}}\\
  &= (1 - d) + d\sum_{j = 1}^{n}(\sum_{i = 1}^{n}\mathbb{I}_{\{p_j \in B_{p_i}\}})\frac{R'_{t}(p_j)}{N_{p_j}}\\
  &= (1 - d) + d\sum_{j = 1}^{n}N_{p_j}\frac{R'_{t}(p_j)}{N_{p_j}}\\
  & = 1
\end{aligned}
$$

从而由归纳法知，命题对 $\forall t \geq 0$ 成立。

## Computing PageRank

我们知道 PageRank 的迭代公式为

$$
\mathbf{R'}_{t + 1} = \frac{1 - d}{n}\mathbf{1} + dA\mathbf{R'}_{t}
$$

通过迭代法来计算 PageRank 值，在以下任一条件终止

1. 对于某极小值 $\epsilon > 0$，有 $|\mathbf{R'}_{t + 1} - \mathbf{R'}_{t} < \epsilon|$，
2. 迭代次数 $t > K$，$K$ 为设定最大的迭代次数。

原文中，在规模约 $322,000,000$ 的网页数据集上，经过 $52$ 次迭代，PageRank 值基本收敛；在一半规模的数据集上，则经过 $45$ 次迭代后收敛。

在 PageRank 的计算过程中，我们并没有考虑到用户查询的影响。事实上，PageRank 是一个与用户查询无关的静态算法，其可以预先离线计算并存储，从而大大减少用户进行在线查询时实时的计算量。

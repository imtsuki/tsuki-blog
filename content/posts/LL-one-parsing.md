---
title: LL(1) 语法分析及抽象语法树的构建
date: 2018-03-16
description:
tags:
  - PL
---

## 左递归的消除

对于文法

$$A \rightarrow A\alpha_1 | A\alpha_2|...|\beta_1|\beta_2|...$$

其最左推导会产生左递归（$A\rightarrow A\alpha_1 \rightarrow AA\alpha_1...$），导致推导无法终止。

为消除左递归，注意到 $A$ 的每个最终推导的起始（非）终结符号必然是 $\beta_1,\beta_2...$ 中的一个；因而这里引入中间产生式

$$R_A \rightarrow \alpha_1R_A|\alpha_2R_A|...|\epsilon$$

同时将产生式 $A$ 改写为

$$A \rightarrow \beta_1R_A|\beta_2R_A|...$$

这样便消除了左递归。

（间接左递归略去）

## Todo

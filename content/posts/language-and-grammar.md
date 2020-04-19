---
title: 语言及文法
date: 2019-02-22
tags:
  - PL
---
## 语言的定义及运算

### 字母表

以 $T/\Sigma$ 表示，为字符的集合。

英文字母表 $\{\texttt{a}, \texttt{b},\texttt{c},...,\texttt{A},\texttt{B},\texttt{C},... \}$

### 字符串

字母表 $T$ 上的字符串，为 $T$ 中字符构成的有限序列。

**空串**，用 $\epsilon$ 表示。

字符串的**长度** $\lvert w \rvert​$，为 $w​$ 中字符的个数。如，$\lvert \epsilon \rvert = 0​$，$\lvert \texttt{abbaa} \rvert = 5​$。

约定，$a,b,c,d$ 等小写斜体表示单个字符，$t,u,v,w,x,y,z$ 表示字符串。

$a^i​$，表示 $i​$ 个 $a​$ 的字符串。

#### 字符串的运算

##### 连接

设 $x = a_1a_2...a_m$，$y = b_1b_2...b_n$，则 $xy = a_1a_2...a_mb_1b_2...b_n$。

连接具有以下性质：

- $(xy)z=x(yz)$

- $\epsilon x = x \epsilon = x$

- $\lvert xy \rvert = \lvert x \rvert + \lvert y \rvert$

##### 前缀，后缀，子串

设 $w_1,w_2,w_3$ 为 $T$ 上的字符串，则 $w_1$ 为 $w_1w_2$ 的前缀，$w_2$ 为 $w_1w_2$ 的后缀，$w_2$ 为 $w_1w_2w_3$ 的子串。

##### 逆

$w = b_1b_2...b_n$，$\overline w = b_nb_{n-1}...b_1$

## 字母表的运算

### 幂运算

1. $T^0 = \{\epsilon \}$
2. $x \in T^{n-1}, a \in T \Rightarrow ax \in T^n​$

### 闭包

**$*$ 闭包**：$T^* = T^0 \cup T^1 \cup T^2 \cup ...$

**$+$ 闭包**：$T^+ = T^1 \cup T^2 \cup ...$

$T^* = T^+ \cup \{\epsilon\}$，$T^+ = T^* - \{\epsilon\}$

闭包为 $T$ 上所有字符串的集合。

## 语言

设 $T$ 为字母表，则集合 $L \sub T^*$ 为 $T$ 上的一个**语言**。

如，设 $T = \{\texttt{a},\texttt{b}\}$

- $L_1 = \{\texttt{a}^n\texttt{b}^n|n\geq 1\}​$
- $L_2 = \{\epsilon\}​$ 只有一个空句子的语言
- $L_3 = \{\} = \emptyset​$ 空语言

### 语言的运算

#### 积/幂

字符串的连接。

## 文法

**元语言**：描述语言的语言

### BNF 范式

$\langle\text{digit}\rangle::=\texttt0|\texttt1|\texttt2|\texttt3|\texttt4|\texttt5|\texttt6|\texttt7|\texttt8|\texttt9$
$\langle\text{letter}\rangle::=\texttt A|\texttt B|\texttt C|...|\texttt z|\texttt a|\texttt b|\texttt c|...|\texttt z$
$\langle\text{identifier}\rangle::=\langle\text{letter}\rangle|\langle\text{identifier}\rangle\langle\text{digit}\rangle|\langle\text{identifier}\rangle\langle\text{letter}\rangle$

### 文法定义

文法 $G$ 是一个四元组 $G = (N, T, P, S)$，其中

- $N$ 为非终结符的有限集合；
- $T$ 为终结符的有限集合，$N\cap T = \emptyset$；
- $P$ 为形式为 $\alpha \to \beta$ 的生成式的有限集合，其中 $\alpha \in (N\cup T)^*N^+ (N\cup T)^*$，$\beta \in (N\cup T)^*$；
- $S​$ 为推导起始符，且 $S \in N​$。

### 推导

**直接推导**：一步直接产生。

若存在推导序列使得 $\alpha \Rightarrow \alpha_1 \Rightarrow ... \Rightarrow \alpha'$，则把 $\alpha$ 推导出 $\alpha'$ 记作

$$
\alpha \xrightarrow[G]*\alpha'
$$

若推导序列长度大于 0，则记作

$$
\alpha \xrightarrow[G]+\alpha'
$$

推导时每一步产生的中间字符串称作**句型**。

**句型**：字符串 $\alpha$ 是文法 $G$ 的句型，当且仅当 $S\xrightarrow[G]*\alpha$，且 $\alpha \in (N\cup T)^*$。

**句子**：字符串 $\omega​$ 是文法 $G​$ 的句子，当且仅当 $S \xrightarrow[G]*\omega​$，且 $\omega \in T^*​$。

句子仅由终结符组成，句型包含句子。

**文法产生的语言**：由文法 $G$ 产生的语言记作 $L(G)$。
$$
L(G) = \{\omega|\omega \in T^*\wedge S \xrightarrow[G]*\omega\}
$$

## Chomsky 文法的分类

### 0 型文法

### 1 型文法/上下文有关文法

**定义**：生成式具有形式 $\alpha \to \beta$，$\alpha, \beta \in (N\cup T)^+$，且满足 $\lvert\alpha\rvert \leq \lvert\beta\rvert$。

### 2 型文法/上下文无关文法

**定义**：生成式具有形式 $A \to \beta$，$A \in N$，$\beta \in (N\cup T)^*$。

### 3 型文法/正则文法

**定义**：生成式具有形式

- 右线性文法：$A \to \omega B | \omega$，$A, B \in N, \omega \in T^*$
- 左线性文法：$A \to B\omega | \omega$，$A, B \in N, \omega \in T^*$

### 四种文法的关系

- 0 型：无限制；
- 1 型：不允许 $A \to \epsilon$；
- 2 型
- 3 型：属于 2 型；
- 不含有 $A \to \epsilon$ 的 2 型、3 型属于 1 型，1 型、2 型和 3 型均属于 0 型。

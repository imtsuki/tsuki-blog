---
title: TensorFlow 笔记
date: 2018-04-21
description: 一些基本概念。
tags:
  - Deep Learning
---

The Beginning Of Everything:

```python
import tensorflow as tf
```

我们需要首先定义计算图，即 `Graph`：

```python
# 定义 Graph
x = 1
y = 2
add_op = tf.add(x, y, name='add_op') # 定义 Graph 结点 加法
mul_op = tf.multiply(x, y, name='mul_op') # 乘法
pow_op = tf.pow(add_op, mul_op, name='pow_op') # 幂
"""
x--(+)-------\
 X          (**)
y--(*)-------/
"""
```

`Graph` 只是定义了计算图的结构，真正的计算不会就此发生。例如，当我们尝试打印 `pow_op`：

```python
print(pow_op)
```

只会打印出：

```bash
>>> Tensor("pow_op:0", shape=(), dtype=int32)
```

真正的计算过程必须通过 `Session` 计算，把想要计算的节点传入 `Session.run()`：

```python
with tf.Session() as sess:
    print(sess.run(pow_op))
```

这样就会输出：

```bash
>>> 9
```

`Session` 采用惰性计算。例如, 加入一个无用节点：

```python
useless = tf.multiply(x, add_op, name='useless')
with tf.Session() as sess:
    sess.run(pow_op)
```

因为计算 `pow_op` 不需要 `useless` 的值, 所以 `useless` 不会被计算。

`Session` 还可传入一个要计算的节点的列表:

```python
with tf.Session() as sess:
    pow_op_result, useless_result = sess.run([pow_op, useless])
```

这样都会被计算：

```bash
>>> [9, 3]
```

```python
# fetches 为想要计算的结点 (Tensor) 列表
tf.Session.run(fetches,
              feed_dict=None,
              options=None,
              run_metadata=None)
```

TensorFlow 支持分布式计算。例如，我们可以将部分 `Graph` 指定在某个设备上计算：

```python
# 分布式计算
with tf.device('/gpu:1'):
    a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], name='a') # 常量节点
    b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], name='b')
    c = tf.multiply(a, b, name='c')
with tf.Session(config=tf.ConfigProto(log_device_placement=True)) as sess:
    print(sess.run(c))
```

以上代码会在 `GPU:1` 上计算 `c`，并打印出日志：

```bash
>>> c: (Mul): /job:localhost/replica:0/task:0/device:GPU:1
>>> b: (Const): /job:localhost/replica:0/task:0/device:GPU:1
>>> a: (Const): /job:localhost/replica:0/task:0/device:GPU:1
```

这里从日志输出顺序也可看出惰性求值的求值顺序。

每一个 `Session` 对应一个 `Graph`。不要创建多个 `Session` 或 `Graph`。每个 `Session` 默认占用所有系统资源，而且不同 `Session` 间无法传递数据。可以在同一个 `Graph` 中创建不连通的子图, 并在同一个 `Session` 中分别计算。

如果非得这么做，那么就使用 `tf.Graph()`。Tensorflow 在程序开始时会隐式创建一个 Default Graph，所有直接声明的节点都会加入这个 `Graph`：

```python
# 创建新的 Graph:
g = tf.Graph()
with g.as_default():
    x = tf.add(3, 5, name='x in g')
```

创建 `Session` 时，要指定其所对应的 `Graph`，否则就会使用默认的 `Graph`：

```python
with tf.Session(graph=g) as sess:
    sess.run(x)
```

要小心，不要把默认 `Graph` 与 自定义 `Graph` 搞混：

```python
# 获得默认 Graph
g_default = tf.get_default_graph()

# 然后分别添加节点
with g_default.as_default():
    m = tf.constant(1)
with g.as_default():
    n = tf.constant(2)
```

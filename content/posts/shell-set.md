---
title: Shell 之道
date: 2019-01-05
tags:
  - Shell
---
## > set

`set` 命令用于定制 shell 的运行环境。

以下命令，常常放在 shell 脚本的前面：

```bash
set -euxo pipefail
```

每个参数分别有如下效果。

### `set -e`

脚本执行中发生错误时，立即终止脚本的执行。

### `set -u`

当脚本执行中遇到未定义的变量时，报错并终止执行。

### `set -o pipefail`

如果在管道命令中，前几个命令报错，但最后一个命令执行正确，那么 `set -e` 就不能让脚本停止执行。这个时候，利用 `set -o pipefail`，就可让管道命令执行错误时，脚本也会停止执行。

### `set -x`

打开命令的回显。例如，如下脚本

```bash
#!/bin/bash
set -x
echo foobar
```

将会产生如下输出

```bash
$ bash script.sh
+ echo foobar
foobar
```

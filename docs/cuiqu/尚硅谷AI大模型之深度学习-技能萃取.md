# 教程萃取：尚硅谷AI大模型之深度学习

> **来源**：`/Users/shenyandu/Desktop/ai-lab/00_文档资料/尚硅谷/尚硅谷AI大模型之深度学习`
> **萃取时间**：2026-09-16
> **文档类型**：docx 笔记 V1.3.0（9 章理论+代码）+ dl_tutorial 代码库（9 章 60 文件）
> **状态**：已学完 ✓（本文档为简历素材萃取，非学习计划）

---

## 1. 核心技能清单（含子技术拆解）

### 技能 1：神经网络基础（从零手写）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 感知机模型 | 加权求和 + 阈值/偏置，二分类 | ch02 | 神经元数学原型 |
| 激活函数六件套 | 阶跃 / Sigmoid / Tanh / ReLU / Softmax / Softplus + 选型策略 | ch02 + `activation_functions/` | 非线性能力来源 |
| 激活函数选型 | 隐藏层 ReLU 优先、输出层按任务定（回归恒等/二分类 Sigmoid/多分类 Softmax） | ch02 | 工程默认选型依据 |
| 三层网络前向传播 | 输入层→两隐层→输出层矩阵运算手写 | `2_digit_recognizer.py` | 理解"层"的本质 |
| NumPy 手写实现 | 纯 NumPy 搭建 + 手写数字识别推理 | ch02 | 摆脱框架依赖的底层理解 |

**简历关键词**：`神经网络` `激活函数` `前向传播` `NumPy`

### 技能 2：损失函数与模型训练原理

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 回归损失 | MSE / MAE / Smooth L1 | ch03 + `loss_functions/3_regression_loss.ipynb` | 回归任务度量 |
| 交叉熵 | 二分类 BCE / 多分类 CE / NLL | ch03 + `1_bce` `2_cross_entropy` | 分类任务度量 |
| 数值微分 | 导数定义、中心差分近似梯度 | `1_tangent_line.py` | 理解梯度的计算本质 |
| 梯度下降法 | 参数沿负梯度更新、学习率作用 | `3_gradient_descent.py` | 优化理论的起点 |
| 训练概念三分 | Epoch / Batch Size / Iteration 关系 | ch03 | 面试高频、工程必懂 |
| mini-batch 训练 | 批量梯度训练手写数字识别 | `3_digit_recognizer_batch.py` | 收敛速度与显存平衡 |

**简历关键词**：`交叉熵` `梯度下降` `mini-batch` `Epoch/Batch/Iteration`

### 技能 3：反向传播算法（手推 + 手写）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 链式法则 | 复合函数求导，反向逐层传播 | ch04 | BP 的数学基础 |
| 加法/乘法节点 | 加法直通、乘法交换乘子 | ch04 + `common/layers.py` | 计算图局部反向 |
| 各层反向传播 | ReLU / Sigmoid / Affine / Softmax-with-Loss 四层手写 | `two_layer_net.py` | 理解框架 `backward()` 内部 |
| 计算图思维 | 加法层/乘法层/激活层模块化组装 | `common/layers.py` | 现代框架的设计源头 |
| 手写两层网络完整训练 | forward + backward + 梯度校验 | `4_digit_recognizer_nn_train_bp.py` | NumPy 端到端训练闭环 |

**简历关键词**：`反向传播` `链式法则` `计算图` `手写 BP`

### 技能 4：优化算法演进（手写对比实验）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| SGD 缺陷分析 | 各向异性峡谷震荡、收敛慢 | ch05 | 为什么需要更好的优化器 |
| Momentum | 历史梯度加权惯性，冲出震荡 | `optimizer/1_momentum.py` | 震荡抑制 |
| AdaGrad | 梯度平方累计、学习率自适应衰减 | `5_adagrad.py` | 稀疏特征场景 |
| RMSProp | 指数移动平均解决 AdaGrad 衰减过快 | `6_rmsprop.py` | 长训练稳定性 |
| Adam | 一阶+二阶动量 + 偏差修正 | `7_adam.py` | 工业默认优化器 |
| 学习率衰减三策略 | 等间隔 StepLR / 多段 MultiStepLR / 指数 ExponentialLR | `2~4_*.py` | 后期精调 |
| 可视化对比 | 等高线图对比各优化器路径 | `1_optimizer_compare.py` + ch05 手动实现 | 直觉化理解差异 |

**简历关键词**：`Adam` `Momentum` `RMSProp` `学习率衰减`

### 技能 5：深度网络训练技巧

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 梯度消失/爆炸 | 深层网络 Sigmoid 饱和区导数≈0 | ch05 | 深层训练失败根因 |
| 参数初始化五法 | 常数（不可用）/ 秩 / 正态 / 均匀 / Xavier、He | `1_init.ipynb` | 初始化决定收敛 |
| BatchNorm | 批归一化稳定分布 | ch05 | 训练加速 + 正则 |
| Dropout 随机失活 | 训练随机置零、推理全保留缩放 | `2_dropout.ipynb` | 过拟合抑制 |
| 权值衰减 | L2 范数惩罚项 | ch05 | 参数范数约束 |

**简历关键词**：`Xavier/He 初始化` `BatchNorm` `Dropout` `L2 正则`

### 技能 6：PyTorch 张量与自动求导

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 张量创建全法 | 标量/列表/ndarray、指定类型、区间、填充、随机、随机种子 | `1~3_*.ipynb` | 数据基础操作 |
| 张量转换 | type/long 类型转换、Tensor↔ndarray（含共享内存陷阱与 copy 规避） | `2_tensor_conversion.ipynb` | 踩坑点直接规避 |
| 张量计算/统计/索引 | 四则、广播、argmax/max、花式索引、view/reshape/permute | `3~6_*.ipynb` | 数据变换基本功 |
| autograd 自动求导 | requires_grad、backward、梯度累积与 zero_grad | `7_tensor_grad.ipynb` | 理解训练循环底层 |
| detach 语义 | detach vs data 的计算图隔离 | `8` `9_*.ipynb` | 推理/可视化场景防梯度污染 |

**简历关键词**：`PyTorch` `Tensor` `autograd` `广播机制` `计算图`

### 技能 7：PyTorch 建模全流程

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| nn.Module 自定义 | `__init__` 定义层、forward 前向、Sequential 两种风格 | `3_nn_test.py` `4_nn_sequential.py` | 模型定义标准范式 |
| 训练循环标准写法 | forward → loss → zero_grad → backward → step + 验证循环 + 进度条 | `5_house_price.py` | 可复用训练模板 |
| 房价预测综合案例 | 特征工程（数值/类别分流 ColumnTransformer + Pipeline）→ 模型 → 训练可视化 | ch07 应用案例 | 表格数据端到端建模 |
| 线性回归手写 | PyTorch 实现最简回归 | `10_linear_regression.py` | 入门闭环 |
| nn 损失与优化器 API | `nn.MSELoss` / `nn.CrossEntropyLoss` / `optim.*` | `loss_functions/` `optimizer/` | API 与原理对齐 |

**简历关键词**：`nn.Module` `训练循环` `特征工程` `Pipeline`

### 技能 8：CNN 卷积神经网络

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 卷积运算 | 3 维数据卷积、stride 步幅、padding 填充 | `1_conv_test.ipynb` | 局部感受野 + 参数共享 |
| 池化层 | MaxPool / AvgPool 下采样 | `2_pooling_test.ipynb` | 平移不变性 + 降维 |
| 经典架构三座山 | AlexNet（ReLU+Dropout）/ GoogleNet（Inception 多尺度）/ ResNet（残差连接） | ch08 | 深层网络设计演进 |
| Fashion-MNIST 服装分类 | LeNet 风格 CNN 搭建 + 训练 + 准确率统计 | `4_fashion_category.py` | 图像分类完整实战 |
| 逐层形状追踪 | 每层输出 shape 检查法 | ch08 案例代码 | 调试 CNN 的工程习惯 |

**简历关键词**：`CNN` `卷积/池化` `ResNet` `图像分类`

### 技能 9：RNN 与 NLP 基础

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| NLP 方法演进 | 同义词典（WordNet）→ 计数（共现矩阵/SVD）→ 推理（word2vec） | ch09 | 词向量的来龙去脉 |
| 词嵌入层 | `nn.Embedding`、jieba 分词、词→索引映射、随机种子 | `1_embedding_test.ipynb` | 离散符号→稠密向量 |
| RNN 循环层 | 时序展开、隐藏状态传递、`nn.RNN` API | `2_rnn_test.ipynb` `3_poems_generation.py` | 序列建模能力 |
| 自定义 Dataset | `__init__`/`__len__`/`__getitem__` 三件套 + DataLoader | 古诗生成案例 | 自有数据接入训练 |
| 古诗生成案例 | 语料清洗 → 构建词表 → 索引序列 → RNN 训练 → 文本生成 | `3_poems_generation.py` | 中文文本生成端到端 |

**简历关键词**：`nn.Embedding` `RNN` `jieba 分词` `自定义 Dataset` `文本生成`

---

## 2. 项目可改进点

| 教程技能 | 适配项目模块 | 改进建议 | 预期收益 |
|---------|------------|---------|---------|
| 优化器对比可视化 | `sy-llm` | 文档/示例补"SGD vs Adam 等高线对比"案例，展示教程级代码质量 | 库的教程完整性↑ |
| 特征工程 Pipeline | `faq-text-matching` | 混合特征预处理可用 ColumnTransformer + Pipeline 收敛散乱代码 | 数据管道工程化 |
| 逐层 shape 追踪习惯 | `government-advanced-rag` | 自研 BGE 微调脚本补"逐层输出形状断言"，早发现维度错配 | 调试效率↑ |
| nn.Embedding + jieba | `faq-text-matching` | ES 稠密向量之外可加"jieba + Embedding 词向量相似度"轻量基线 | 召回多路融合 |
| 自定义 Dataset 三件套 | `government-advanced-rag` | 微调数据加载若为手写循环，重构为标准 Dataset/DataLoader | 与 PyTorch 生态对齐 |
| Dropout/L2 正则 | `government-advanced-rag` | 微调若过拟合，可按教程调 Dropout 比例做消融 | 泛化提升实验维度 |
| 训练循环模板 | `government-advanced-rag` | BGE 微调训练循环对齐"zero_grad→backward→step"标准范式 + 进度条 | 代码规范性 |

### 2.1 高优先级改进

1. **`government-advanced-rag` 微调脚本对齐标准训练范式**
   - 应用技能：技能 7（训练循环标准写法）+ 技能 6（autograd 语义）
   - 改造路径：训练循环补 `zero_grad` 检查、验证阶段 `model.eval()` + `torch.no_grad()`、进度条可视化
   - 验证指标：代码规范审查通过 + 训练日志可读性

2. **`faq-text-matching` 加 Embedding 词向量轻量召回路**
   - 应用技能：技能 9（nn.Embedding + jieba）
   - 改造路径：jieba 分词 → 词表映射 → Embedding 平均池化 → 与 ES/BGE 召回加权融合
   - 验证指标：多路召回 top5 命中率对比

3. **`sy-llm` 补优化器对比示例**
   - 应用技能：技能 4（五优化器手写 + 等高线可视化）
   - 改造路径：examples/ 加 optimizer_compare.py，代码源自教程并规范化
   - 验证指标：示例可运行 + README 更新

---

## 3. 简历段落（直接可用）

### 3.1 项目经验段落

> **深度学习底层原理实战（9 章从零手写体系）**：
> - 不依赖框架，纯 NumPy 手写完整深度学习栈：三层神经网络前向传播、五种激活函数、交叉熵/MSE 损失、链式法则反向传播（ReLU/Sigmoid/Affine 层逐层手推）、五种优化器（SGD/Momentum/AdaGrad/RMSProp/Adam）手动实现并等高线可视化对比，完成手写数字识别端到端训练
> - PyTorch 工程化：Tensor 操作/autograd/detach 语义、nn.Module 与 Sequential 双范式建模、学习率衰减三策略、Xavier/He 初始化、BatchNorm/Dropout/L2 三重正则
> - 三大综合案例：房价预测（ColumnTransformer + Pipeline 特征工程全流程）、Fashion-MNIST 服装分类（CNN + 逐层 shape 追踪）、古诗生成（jieba 分词 + nn.Embedding + 自定义 Dataset + RNN 文本生成）

### 3.2 技术栈关键词（直接加进简历 Skills 段）

```
深度学习：反向传播（链式法则手推）| 激活函数选型 | 交叉熵/MSE | Adam/Momentum/RMSProp | Xavier/He 初始化 | BatchNorm | Dropout | CNN（卷积/池化/ResNet）| RNN | nn.Embedding | PyTorch（Tensor/autograd/nn.Module/DataLoader）
```

### 3.3 个人简介片段

> 具备扎实的深度学习底层功底：能纯 NumPy 手写神经网络、反向传播与主流优化器，理解框架背后的数学原理；熟悉 PyTorch 全栈建模流程（张量 → autograd → nn.Module → 训练循环 → 验证），并有 CNN 图像分类与 RNN 文本生成完整实战。

### 3.4 面试弹药（简历不写，被问必答）

- 为什么激活函数必须非线性？（否则多层等效单层线性变换）
- ReLU 相比 Sigmoid 为什么缓解梯度消失？（正区间导数恒 1，无饱和区）
- Adam = Momentum + RMSProp + 偏差修正（一阶二阶动量、t 从 1 起步修正初始化偏差）
- Dropout 推理时怎么处理？（全保留 + 按保留概率缩放 / `model.eval()`）
- AdaGrad 什么场景失效？（累积平方和越来越大 → 学习率趋零，长训练学不动，RMSProp 指数移动平均解决）
- Xavier vs He 初始化？（Xavier 配 Sigmoid/Tanh 保持方差、He 配 ReLU 补偿减半方差）
- Tensor↔ndarray 共享内存陷阱？（共享底层内存，改动互相影响，`copy()` 解耦）
- detach 和 data 区别？（detach 追踪计算图共享梯度版本安全，data 不追踪有隐患）
- ResNet 为什么能训得深？（残差恒等映射，梯度直通缓解消失）
- Epoch/Batch Size/Iteration 换算？（1 Epoch = N/Batch Size 个 iteration）
- RNN 长序列什么问题？（梯度消失 → LSTM/GRU 门控）
- 训练循环为什么必须 zero_grad？（PyTorch 梯度默认累积）

---

## 4. 关联资源

- **教程仓库**：`00_文档资料/尚硅谷/尚硅谷AI大模型之深度学习`（docx 笔记 + dl_tutorial 代码）
- **《深度学习入门：基于Python的理论与实现》**（斋藤康毅，本教程 ch02-05 手写部分的主要参考）
- **[PyTorch 官方教程](https://pytorch.org/tutorials/)**
- **[动手学深度学习（李沐）](https://zh.d2l.ai/)**

---

## 5. 已同步到技能库

本次 9 项技能（含 60+ 子技术点）已追加至 `~/.agents/skills/learning-resume-miner/assets/skill-library.md`。
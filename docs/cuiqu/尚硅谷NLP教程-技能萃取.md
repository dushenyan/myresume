# 教程萃取：尚硅谷AI大模型之NLP教程

> **来源**：`/Users/shenyandu/Desktop/ai-lab/00_文档资料/尚硅谷/尚硅谷AI大模型之NLP教程`
> **萃取时间**：2026-09-16
> **文档类型**：HTML 笔记（6584 行）+ 12 个代码项目 + bert-base-chinese 预训练模型
> **状态**：已学完 ✓（本文档为简历素材萃取，非学习计划）

---

## 1. 核心技能清单（含子技术拆解）

### 技能 1：中文分词与 Tokenization

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| jieba 精确模式 | `jieba.lcut()` 按最精确边界切分，适合文本分析 | 笔记 + `text_rep` 项目 | 分析型任务的高质量切分 |
| jieba 全模式 | `cut_all=True` 扫出所有可成词的词语 | 笔记代码 | 搜索引擎场景召回优先 |
| jieba 搜索引擎模式 | 精确模式基础上对长词再切分 | 笔记代码 | 搜索场景兼顾召回与精度 |
| 自定义词典 | `load_userdict()`，格式：词语 词频 词性 | 笔记（格式详解） | 垂直领域术语误切分 |
| BPE（Byte Pair Encoding） | 统计高频相邻字符对迭代合并构建词表 | 笔记原理详解 | 子词级 OOV 问题 |
| WordPiece | BPE 变体，BERT 系列采用 | 笔记 + bert-base-chinese tokenizer | 预训练模型输入编码 |
| OOV 处理 | 未登录词替换 `<UNK>` 的取舍策略 | 笔记（词级分词缺陷分析） | 词表覆盖不足导致语义丢失 |
| 中英文分词差异 | 英文天然空格分隔；中文依赖词典/模型 | 笔记对比分析 | 中文 NLP 预处理选型 |

**简历关键词**：`jieba` `BPE` `WordPiece` `OOV` `子词分词`

### 技能 2：词向量（Word Embedding）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| Word2Vec CBOW | 上下文词平均 → 预测中心词 | 笔记原理（含参数矩阵推导） | 用上下文学语义表示 |
| Word2Vec Skip-gram | 中心词 → 预测上下文词 | 笔记原理（词向量矩阵更新过程） | 小语料下更稳的向量学习 |
| 分布假设 | 词义由上下文决定（"观其伴知其义"） | 笔记理论基础 | 无监督语义学习的合法性 |
| Gensim 加载公开词向量 | `KeyedVectors.load_word2vec_format()` | 加载 sgns.weibo（19.5万词/300维） | 复用大规模预训练语义 |
| Gensim 自训练 | `Word2Vec(sentences)` API + ChineseNLPCorpus | `text_rep` 项目 | 领域语料定制词向量 |
| 词向量文件格式 | 首行"词数+维度"，后续"词+向量值" | 笔记格式约定 | 不同工具间互通 |
| 相似度查询 | `most_similar()` / 向量距离 | 笔记 API 演示 | 语义检索、关键词扩展 |

**简历关键词**：`Word2Vec` `CBOW` `Skip-gram` `Gensim` `KeyedVectors`

### 技能 3：Embedding 层与预训练初始化

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| Embedding 查找表机制 | 输入索引 → 输出向量行（lookup table 本质） | 笔记原理 | 离散 token 到稠密空间的映射 |
| 预训练词向量初始化 | Word2Vec 向量加载进 `nn.Embedding.weight` | PyTorch 代码示例 | 低资源任务的先验知识注入 |
| 冻结 vs 微调选择 | 初始化后 Embedding 是否参与训练 | 笔记讨论 | 小数据防过拟合 |
| 词表 → 向量矩阵构建 | vocab 遍历填充权重矩阵 | PyTorch 代码 | 词表与预训练对齐 |
| 静态向量局限 | 同一词多义无法区分（"苹果"公司 vs 水果） | 笔记引出上下文表示 | 推动 contextual embedding |

**简历关键词**：`nn.Embedding` `迁移学习` `预训练初始化`

### 技能 4：RNN / LSTM / GRU 序列建模

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| RNN 时间步循环 | 隐藏状态逐步传递，融合前文信息 | 笔记结构图解 | 词序信息建模 |
| RNN 梯度消失/爆炸 | 长序列反向传播梯度问题 | 笔记缺陷分析 | 引出 LSTM 动机 |
| LSTM 门控机制 | 输入门/遗忘门/输出门 + 细胞状态 | 笔记原理 | 长距离依赖 |
| GRU 简化设计 | 更新门/重置门，参数更少 | 笔记对比 | 训练效率 |
| 结构变体 | one-to-many / many-to-one / many-to-many | 笔记示意图 | 不同任务的 IO 形态选型 |
| 输入法预测（RNN） | 上文 → top-5 候选词 | `input-method-rnn` 完整项目 | 中文输入法候选排序 |
| 情感分析（LSTM/GRU） | 末位隐藏状态 → 二分类 | `review-analyze-lstm/gru` 项目 | 评论正负面判断 |

**简历关键词**：`RNN` `LSTM` `GRU` `序列建模` `门控机制`

### 技能 5：Seq2Seq 与注意力机制

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| Encoder-Decoder 框架 | 编码压缩 → 解码生成 | 笔记原理 | 变长输入到变长输出 |
| 上下文向量瓶颈 | 定长向量信息损失 | 笔记缺陷分析 | 引出 Attention 动机 |
| 注意力对齐 | 解码每步回看编码器全部隐藏状态加权 | 笔记原理 | 长句翻译质量 |
| 缩放点积注意力 | Q·K/√d → softmax → 加权 V | `test-scaled-attention` 项目 | Transformer 核心算子 |
| Teacher Forcing | 训练时用真值替代上步输出 | `translation-seq2seq` 项目 | 训练收敛加速 |
| 机器翻译实战 | 中英短句数据集端到端 | `translation-seq2seq` `translation-attention` | 完整翻译 pipeline |

**简历关键词**：`Seq2Seq` `Encoder-Decoder` `Attention` `Teacher Forcing`

### 技能 6：Transformer 架构

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 自注意力（Self-Attention） | 序列内部 token 互相计算相关性 | 笔记 + `transformer` 项目 | 并行化上下文建模 |
| Q/K/V 投影 | 输入经三个矩阵变换后的角色分工 | `test-scaled-attention` 实现 | 查询-键-值的检索语义 |
| 多头注意力 | 多组注意力并行 + 拼接 | 笔记原理 | 多角度语义子空间 |
| 位置编码 | 正弦/余弦函数注入顺序信息 | 笔记原理 | 无循环结构的顺序缺失 |
| 残差连接 + LayerNorm | 每个子层后归一化 | 笔记结构 | 深层网络训练稳定 |
| Cross-Attention | Decoder 查询 Encoder 键值 | `translation-transformer` | 翻译的跨序列交互 |

**简历关键词**：`Transformer` `Self-Attention` `Multi-Head` `位置编码`

### 技能 7：预训练语言模型（BERT / GPT）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| BERT MLM 预训练 | 遮词预测，双向编码 | 笔记原理 | 上下文双向理解 |
| GPT 自回归 | 因果掩码，从左到右生成 | 笔记原理 | 生成任务底座 |
| BERT 三层 Embedding | Token + Position + Segment | `bert-encoder` 项目可视化 | 输入表示构成 |
| 特征提取 vs 全参数微调 | 冻结 BERT 取句向量 vs 端到端训练 | `bert-encoder` 对比实验 | 算力与效果取舍 |
| BertForXxx 任务头 | SequenceClassification / TokenClassification / QA 等系列 | `review-analyze-bert` | 下游任务快速适配 |
| 迁移学习范式 | 预训练 → 微调两阶段 | 笔记发展史 | 通用语言能力复用 |
| 中文模型选型 | bert-base-chinese 特点与 tokenizer | `3.预训练模型/bert-base-chinese` | 中文任务底座 |

**简历关键词**：`BERT` `GPT` `MLM` `微调` `bert-base-chinese`

### 技能 8：Hugging Face 生态

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| transformers 模型加载 | `AutoModel` / `AutoTokenizer` | `hugging-face` 项目 | 统一的模型获取接口 |
| datasets 数据集库 | 标准化数据加载 | 教程工具链（pip install） | 训练数据流统一 |
| 模型微调流程 | 预训练模型 + 任务头 + 训练循环 | `review-analyze-bert` | 完整微调实战 |
| TensorBoard 集成 | 训练指标可视化 | 教程工具链 | 训练监控 |

**简历关键词**：`Hugging Face` `transformers` `datasets`

### 技能 9：NLP 任务工程化 Pipeline

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 分词 → 词表 → ID 编码 | `JiebaTokenizer` 类封装（分词/编码/词表管理三合一） | 全部项目通用组件 | 输入标准化 |
| JSONL 数据集 + DataLoader | 自定义 Dataset 类 + 张量化 | 输入法/情感分析项目 | PyTorch 数据流规范 |
| 训练循环封装 | epoch 循环 + loss 优化 + 评估函数 | 各项目 `train.py` | 可复现训练框架 |
| Top-K 预测与交互 | 批量 top-5 + 单条交互预测 | 输入法项目 | 产品化推理接口 |
| 准确率评估 | 模型评估函数 + 测试集 | 情感分析项目 | 效果度量 |

**简历关键词**：`PyTorch` `DataLoader` `训练循环` `推理服务`

### 技能 10：NLP 发展史与选型视野

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 规则时代 | Georgetown-IBM / ELIZA，扩展性差 | 笔记导论 | 技术演进起点认知 |
| 统计机器学习时代 | SVM / CRF / 特征工程 | 笔记导论 | 与深度学习对比 |
| 深度学习崛起 | RNN → Transformer → 预训练 | 笔记导论 | 大模型技术脉络 |
| 任务全景 | 文本分类 / NER / 翻译 / 问答 / 摘要 | 笔记应用梳理 | 需求到任务的映射 |

**简历关键词**：`技术选型` `NLP 全景`

---

## 2. 项目可改进点

| 教程技能 | 适配项目模块 | 改进建议 | 预期收益 |
|---------|------------|---------|---------|
| jieba 自定义词典 | `word2vec-recommend-key` | 业务词典 → `load_userdict()` → 重训词向量 | 业务关键词命中率↑ |
| Word2Vec → Embedding 初始化 | `intent-classify` | 词向量作为 Embedding 初始权重对比收敛速度 | 小数据提点 |
| BERT 四方案对比补齐 | `intent-classify` | 补 accuracy/F1/QPS 对比表（代码已有） | 简历量化数据 |
| Transformer 手写注意力 | `bert-encoder` | 新增缩放点积注意力 Notebook + Q/K 可视化 | 面试佐证 |
| Trainer 统一训练循环 | `fine-tuning`（LoRA） | HuggingFace Trainer + LoRA 替代手写循环 | 代码量↓ 30% |
| Word2Vec 平均向量 baseline | `faq-text-matching` | 与 Sentence-Transformers 对比 | 混合检索叙事更立体 |
| 输入法项目教学映射 | `input-method-rnn` | README 整理「教程代码 → 项目实战」对应关系 | 学习成果显性化 |
| bert-base-chinese 6 任务 | `bert-encoder` | README 列全 6 大中文任务示例 | 中文 NLP 全任务标签 |

### 2.1 高优先级改进

1. **`intent-classify` 四方案量化对比**
   - 应用技能：技能 7（BertForSequenceClassification）+ 技能 8
   - 改造路径：统一评估脚本 → 1000 条测试集 → 准确率/QPS/成本三维表
   - 验证指标：四方案差距表（简历最硬数据）

2. **`word2vec-recommend-key` 接 jieba 业务词典**
   - 应用技能：技能 1（自定义词典）+ 技能 2（Gensim 自训练）
   - 改造路径：整理 50 个业务术语 → 自定义词典 → A/B 命中率
   - 验证指标：Top-10 业务关键词命中率

3. **`bert-encoder` 补 Transformer 底层叙事**
   - 应用技能：技能 6（缩放点积 + 多头 + 可视化）
   - 改造路径：手写 ScaledDotProduct → 多头封装 → 注意力热力图
   - 验证指标：4-8 头注意力矩阵可视化图

---

## 3. 简历段落（直接可用）

### 3.1 项目经验段落

> **bert-encoder 项目（扩展）**：
> - 复现 BERT 6 大中文任务 pipeline（分类 / NER / 句对 / 特征提取 / 问答 / 序列标注），掌握 Token+Position+Segment 三层输入表示与自注意力可视化
> - 手写缩放点积注意力与多头机制，验证 Q/K/V 投影对语义相关性的捕捉

> **intent-classify 项目（量化补全）**：
> - 实现 regex / TF-IDF+ML / BERT 微调 / Few-shot LLM 四方案统一 pipeline，三维（准确率/QPS/成本）对比形成选型决策树

> **word2vec-recommend-key 项目（业务化）**：
> - 基于 jieba 自定义业务词典 + Gensim 训练领域 Word2Vec，作为关键词召回冷启动底座，业务术语 Top-10 命中率提升 XX%

> **input-method-rnn 项目（教学转实战）**：
> - 从零实现中文输入法候选排序：jieba 分词 → 词表管理 → RNN 序列模型 → top-5 候选推理，完整落地「分词-编码-训练-预测」NLP pipeline

### 3.2 技术栈关键词（直接加进简历 Skills 段）

```
NLP：jieba | Word2Vec (CBOW/Skip-gram) | Gensim | RNN/LSTM/GRU | Seq2Seq | Attention | Transformer | BERT/GPT | Hugging Face transformers | bert-base-chinese | PyTorch
```

### 3.3 个人简介片段

> 覆盖 NLP 完整技术栈：分词（jieba/WordPiece）→ 词向量（Word2Vec/Gensim）→ 序列模型（RNN/LSTM）→ 注意力（Seq2Seq/Transformer）→ 预训练模型（BERT 微调/Hugging Face），可在原理与工程两端独立交付。

### 3.4 面试弹药（简历不写，被问必答）

- 为什么 Transformer 取代 RNN？（并行化 + 长距离依赖）
- BERT 为什么双向、GPT 为什么单向？（MLM vs 自回归任务性质）
- Word2Vec 两种结构怎么选？（Skip-gram 小语料更稳）
- BPE 怎么缓解 OOV？（子词拆分，词表内重组）
- 预训练词向量初始化 Embedding 什么时候值得？（低资源任务）

---

## 4. 关联资源

- **教程仓库**：`00_文档资料/尚硅谷/尚硅谷AI大模型之NLP教程`（含 12 个代码项目）
- **预训练模型**：`2.资料/3.预训练模型/bert-base-chinese`（本地已缓存）
- **[Hugging Face Transformers 文档](https://huggingface.co/docs/transformers)**
- **[Gensim Word2Vec](https://radimrehurek.com/gensim/models/word2vec.html)**
- **[jieba](https://github.com/fxsjy/jieba)**
- **[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)**（面试前必读）

---

## 5. 已同步到技能库

本次 10 项技能（含 50+ 子技术点）已追加至 `~/.agents/skills/learning-resume-miner/assets/skill-library.md`。
# 简历项目信息提取（2026-09-16 整理）

> 用途：写简历 / 准备面试话术的素材库。每个项目按「定位、技术点、问题解决、量化数据、简历示例、面试追问、待补数据」整理。
> 使用原则：简历只写 2-3 个详项目 + 若干一句话项目，其余内容留作面试弹药。

---

## 〇、总体叙事线（简历开场可用）

9 个项目构成一条完整的 AI 工程成长路径：

```
基础原理（bert-encoder / input-method-rnn / word2vec）
    ↓
模型实战（fine-tuning LoRA 微调 / intent-classify 四方案对比）
    ↓
工程落地（faq-text-matching 智能问答系统 / sy-llm 统一封装层）
    ↓
架构进阶（government-advanced-rag 三存储架构 / depth-research-assistant Agent 编排）
```

一句话人设：**前端工程师出身，自研后端 + AI 应用全栈，覆盖「模型微调、语义检索、RAG、Agent」完整链路**。

---

## 一、faq-text-matching —— 客服工作台与智能问答系统（第一梯队，详写）

**一句话定位**：FastAPI 异步全栈的 FAQ 智能问答平台，集成知识生产、双环境发布、语义检索、多渠道服务。

### 技术点
- FastAPI + ASGI 异步 IO，MySQL + SQLAlchemy 2.0（aiomysql 异步驱动）
- Elasticsearch 8.x：单索引同时建全文（BM25）字段 + dense_vector 向量字段，支持语义相似匹配
- Sentence-Transformers 本地生成 embedding 向量
- Redis 多级缓存：7 类缓存 key（类目树 / FAQ 详情 / 答案视角 / 搜索结果 / 渠道配置 / 热门 FAQ / 导航目录）按业务特性设置差异化 TTL（5 分钟～24 小时）
- 缓存装饰器 `@cached` + `@invalidate_cache` 主动失效 + 版本控制强制刷新
- ES 客户端单例 + `bulk` 批量写入，超时重试配置
- WebSocket 长连接支持
- 分层架构：routers（admin 管理端 / service 对外服务 / sync 发布同步）+ schemas + models + services
- 单元测试覆盖（test_faqs / test_categories / test_env / test_service / test_config）
- Streamlit 演示前端（类目 / FAQ / 问答 / 搜索 4 个页面）

### 业务设计亮点（问题解决）
1. **双环境隔离机制**：「测试环境配置、模拟验证、发布中心一键同步、正式环境生效」。表设计用 `env` 字段隔离 + `original_id` 溯源（正式记录指向来源测试记录），解决知识上线前无法安全验证的问题。
2. **多视角答案体系**：同一问题可按微信 / App / 网页渠道返回差异化答案（faq_solutions 表 perspective 字段），答案类型支持纯文本 / 富文本 / 交互式卡片。
3. **类目树 + 删除校验**：删除类目前校验下属 FAQ，防误删；支持物理/软删除。
4. **批量导入导出**：支持 3000 条导入 / 50000 条导出。
5. **缓存一致性**：写操作（增删改 FAQ/类目）时按 key 模式主动清缓存，解决"改了知识但线上还是旧答案"的经典问题。

### 可量化数据
- 批量操作：3000 导入 / 50000 导出
- 缓存 TTL 设计 7 类，搜索结果缓存 5 分钟
- 接口覆盖：管理端 CRUD + 批量 + 对外 ask/nav/faq/recommend 共 15+ 个 endpoint

### 简历示例（STAR）
> 独立设计并实现 FAQ 智能问答平台：基于 FastAPI 异步生态 + MySQL/SQLAlchemy 2.0 构建知识管理后端，采用 Elasticsearch 全文+向量混合检索与 Sentence-Transformers 本地语义模型实现多路召回；设计 Redis 多级缓存（7 类业务 key 差异化 TTL + 写时主动失效）降低数据库压力；首创"测试-正式双环境隔离 + original_id 溯源"的发布机制，实现知识"验证后一键上线"，配套 Streamlit 演示端。

### 面试可能被追问
- 混合检索怎么融合 BM25 分数和向量相似度分数？（RRF / 加权归一）
- 缓存和数据库一致性怎么保证的？（主动失效 + TTL 兜底）
- 双环境同步时数据冲突怎么处理？

### 待补数据
- ab 压测 QPS 数据（可借用 intent-classify 的压测方法补测）
- 缓存命中率、检索 Top-3 召回率

---

## 二、government-advanced-rag —— 政务 RAG 系统（第一梯队，详写）

**一句话定位**：面向政务知识库的检索增强生成系统，三存储架构 + bge 向量/重排双模型。

### 技术点
- **三存储架构**：MySQL/SQLite 存元信息（知识库、文档）+ Elasticsearch 存文档全文与 chunk（含 embedding_vector 数组字段）+ Neo4j 知识图谱（规划中，README 标 TODO）
- chunk 化设计：chunk_id / 页码 / 文字内容 / 关联图片 / 关联表格 / 语义向量同表存储，为多模态引用留好接口
- **bge-small-zh-v1.5 / bge-base-zh-v1.5** 中文 embedding（SentenceTransformer，normalize_embeddings）
- **bge-reranker-base 重排序**：BERT 分类模型对 (query, text) 对打分，model.eval() + tokenizer 编码对
- 混合检索 + rerank 两阶段检索管线
- 模型全局缓存：embedding/rerank 模型服务启动时加载一次，模块级全局变量共享实例（避免每请求重复加载几 GB 权重）
- pdfplumber 解析 PDF、split_text_with_overlap 重叠分块
- OpenAI 兼容协议接入 LLM 对话（openai SDK）
- 设备自适应：cuda / cpu / mps 可配置
- FastAPI 分模块：apps/knowledge（知识库管理）+ apps/engine（RAG 引擎）+ common（db/es/config）
- demo.ipynb 交互验证

### 业务设计亮点（问题解决）
1. **为什么模型放全局变量**：transformers/sentence-transformers 加载一次极耗时（几 GB 权重 + GPU 初始化），启动时加载一次、请求复用——这是面试可讲的工程权衡。
2. **为什么 rerank 前必须 tokenizer 编码 (query, text) 对 + model.eval()**：Dropout/LayerNorm 行为与训练不一致会掉点——细节正确性。
3. **chunk 冗余存储图片/表格路径**：为"回答引用原文图表"的多模态场景预留。

### 简历示例
> 设计政务领域 RAG 系统：采用「MySQL 元数据 + ES 向量存储 + Neo4j 知识图谱」三存储架构，实现 PDF 解析、重叠分块、bge 中文向量召回、bge-reranker 精排两阶段检索管线；通过模型全局单例加载解决大模型重复加载导致的内存与耗时问题，支持 cuda/mps/cpu 自适应部署。

### 面试可能被追问
- 为什么要 rerank？（召回阶段快而糙，精排准而慢）
- chunk 大小和 overlap 怎么定的？
- Neo4j 打算用来干什么？（实体关系增强检索/多跳问答——目前是 TODO，要么补完要么只字不提）

### 待补数据
- 检索准确率/召回率对比（纯 BM25 vs 向量 vs 混合+rerank）
- 语料规模、响应耗时

---

## 三、depth-research-assistant —— 深度研究助手（第一梯队，详写）

**一句话定位**：多 Agent 编排的深度研究工具，输入主题自动"检索-阅读-判断补检-综合"，产出带来源引用和置信度的结构化报告。

### 技术点
- **四角色 Agent + 编排器架构**：KeywordAgent（规划关键词）/ SummaryAgent（综合正文）/ JudgeAgent（判断是否补检）/ ReportAgent（生成报告）；engine.py 是编排器，**只做确定性控制流、不做任何 LLM 调用**——职责分离干净
- 迭代检索循环：规划、逐关键词 web_search、累积草稿、JudgeAgent 判"是否足够"，不足则用新关键词进入下一轮，max_rounds 上限收敛
- on_progress 回调：每轮结束把中间结果（process.steps / draft / sources）快照交给调用方落盘——**中间过程可保存可回放**
- 来源按 URL 去重；确定性计算置信度（基于来源时间分布）
- Jinja2 prompt 模板（keyword/summary/judge/report/report_html 5 个模板）
- 单次检索失败兜底为空结果，不中断整体流程（容错设计）
- FastAPI 后端 + start.sh 启动

### 业务设计亮点（问题解决）
1. **区别于一次性问答**：人工调研一个主题 2-3 小时且来源不可溯、自动产出「结构化报告 + 来源列表 + 研究过程记录 + 置信度说明」，无来源结论标注"模型推断"。
2. **编排器不调 LLM 的设计**：控制流可测试、可复现，Agent 只负责语言任务——很好的架构叙事。
3. **中间结果落盘**：研究过程透明可审计，契合"来源可追溯"的产品要求。

### 可量化数据
- 默认 3 轮检索上限，每轮多关键词
- 产品宣称：人工 2-3 小时、自动化产出（可写"调研效率提升 10 倍级"）

### 简历示例
> 设计多 Agent 深度研究助手：采用「规划-检索-综合-判断补检-报告」四角色 Agent 架构，编排器只做确定性控制流、Agent 只做语言任务，实现可收敛的多轮自动调研；产出带来源引用、置信度标注、过程可回放的研究报告，将单主题人工调研从 2-3 小时压缩到分钟级。

### 面试可能被追问
- JudgeAgent 怎么判断"信息足够"？
- 搜索 API 失败/限流怎么兜底？
- 置信度怎么算的？

### 待补数据
- 单次研究报告平均耗时、检索轮数统计
- 报告质量评估（人工评审 or 对照人工报告）

---

## 四、intent-classify —— 意图识别服务（第二梯队，一句话 + 深挖点）

**一句话定位**：意图识别全链路服务，regex/tfidf/bert/few-shot LLM 四种方案对比 + 压测，集成 FastAPI 推理。

### 技术点
- 四级方案递进：**regex 规则、TF-IDF+ML、BERT 微调、Few-shot Prompt（LLM）**，体现"按成本和效果选方案"的选型意识
- Few-shot 方案亮点：动态从训练集检索与待识别文本**最相似的 10 个样本**注入 prompt（`retriever.py` + `prompt_template.py`），不是死模板
- BERT 微调（transformers + torch + sklearn）
- FastAPI 集成训练好的模型做推理服务（`/v1/text-cls/{regex|tfidf|bert}`）
- **ab 压测**：`ab -n 100 -c 100` 对三条推理路径分别压测

### 可量化数据
- 压测配置：100 并发 × 100 请求（结果数据需补）
- 场景示例："帮我播放周杰伦的歌曲"、Music-Play 类意图

### 简历示例
> 构建意图识别服务：实现规则、TF-IDF、BERT 微调、动态 Few-shot 大模型四种方案并压测对比，以"低成本规则优先、语义复杂度递进"的策略平衡效果与成本，模型推理集成至 FastAPI 统一服务。

### 待补数据
- 四方案的准确率对比表（最有说服力的量化）
- ab 压测的 QPS / RT 数据

---

## 五、fine-tuning —— 大模型 LoRA 微调实战（第二梯队）

**一句话定位**：Qwen2.5-Instruct 的 LoRA 全流程微调（理论-数据-训练-推理），附成体系教程文档。

### 技术点
- PEFT/LoRA：r=8, alpha=16, dropout=0.05, target_modules=[q_proj, v_proj]，仅训练 ~0.1-0.4% 参数
- **loss mask**：prompt 部分 labels 置 -100 不计 loss，只学 response——面试高频考点
- ChatML 格式一致性：训练和推理必须用完全相同的 prompt 格式
- 双停止符：同时设置 `<|im_end|>` 和 `<|endoftext|>`，解决"生成不停止"问题
- Alpaca 数据格式 + 转 ChatML；模型本地缓存管理（download_model.py --check/--remove）
- 生成参数：temperature/top_p/repetition_penalty 可调
- uv 依赖管理、可扩展到 QLoRA（4-bit 量化）和 7B 模型

### 简历示例
> 实践 Qwen2.5 LoRA 微调全流程：掌握 loss mask（仅对 response 计损）、ChatML 格式一致性、双停止符设置等关键细节，理解 LoRA 低秩分解原理（0.4% 参数量达到接近全量微调效果）与 QLoRA 量化方案的适用边界。

### 面试可能被追问
- LoRA 低秩分解公式和 r 的选择
- 为什么用 Instruct 版本不用 base
- loss 为什么只算 response

---

## 六、sy-llm（scripts）—— 统一 LLM 调用封装层（第二梯队，体现工程素养）

**一句话定位**：零明文 key、同步异步双链路的 LLM 统一封装库（Ollama 本地 + DeepSeek 云端）。

### 技术点
- `BaseLLM` 抽象基类：新增模型只需实现 `_call_once / _acall_once` 两个方法，业务侧零改动
- 同步 + 异步双链路同一份代码（CLI 与 FastAPI 场景通用）
- 凭证管理：全部从 .env/环境变量加载，业务代码零明文 key
- **零运行时依赖**：仅用标准库 urllib/asyncio/dataclasses
- src-layout 包结构 + 可安装（`uv pip install -e .`）

### 简历示例
> 设计统一 LLM 调用封装库 sy-llm：BaseLLM 抽象 + 同步/异步双链路，支持 Ollama/DeepSeek 一键切换；零运行时依赖（纯标准库实现），凭证全走环境变量，配套标准 src-layout 包工程。

---

## 七、bert-encoder —— BERT 原理实战（第三梯队，技能佐证）

**一句话定位**：6 个递进示例覆盖 BERT 从原理到中文实战。

### 看点（面试弹药，不单独占简历条目）
- 三层 Embedding（Token/Position/Segment）、自注意力矩阵可视化
- 特征提取模式（冻结 BERT 算句向量做相似度）vs 全参数微调对比
- 中文 6 大任务实战（bert-base-chinese）
- 变体对比：RoBERTa / ALBERT / DistilBERT / ELECTRA；中文模型选型：BERT-wwm / RoBERTa-wwm-ext / ERNIE / NEZHA

---

## 八、input-method-rnn —— RNN 下一个词预测（第三梯队）

**一句话定位**：模拟输入法候选词推荐的 vanilla RNN 项目，完整训练管线。

### 看点
- jieba 分词 + 词表构建 + 滑动窗口造样本（前 5 词预测第 6 词）
- 完整管线：process、dataset、train、evaluate、predict，全部 `python -m src.xxx` 可运行
- **现成量化指标**：Top-1 准确率 ≈ 0.21，Top-5 ≈ 0.40，训练损失 ≈ 1.86
- 评估维度意识：Top-K 准确率（正是输入法候选场景的正确指标）

---

## 九、word2vec-recommend-key —— 搜索关键词推荐（第三梯队）

**一句话定位**：类 B 站搜索联想的 word2vec 关键词推荐系统，CLI + Web 演示。

### 看点
- word2vec 词向量训练 + 相似词扩展生成推荐（"在pycharm中使用"、10 条联想）
- 工程完整度：CLI 子命令（train/eval/recommend/check）+ 数据清洗 loader + eval metrics + eval_set 评测集 + webapp 演示
- 记录用户历史输入做个性化（README 提及）

### 风险提醒
- README 里残留大段 AI 对话原始记录（"Let me first review..."），对外展示前必须清理重写

---

## 十、全局风险与待办

### 对外展示前必须处理
1. **depth-research-assistant/README.md 含明文 API key（Bocha 搜索）**——立即从 README 删除并考虑吊销该 key
2. **word2vec-recommend-key/README.md 含 AI 对话原始记录**——重写
3. fine-tuning / bert-encoder README 标注来源 runoob——简历措辞用"实战/学习项目"，勿写"主导研发"

### 待补数字清单（补齐后简历说服力翻倍）
| 项目 | 缺什么 | 怎么补 |
|------|--------|--------|
| faq-text-matching | QPS、缓存命中率、检索召回率 | ab 压测 + Redis INFO + 人工标注评测集 |
| government-advanced-rag | BM25/向量/混合+rerank 三路对比准确率 | 构建评测问答对，逐一跑分 |
| depth-research-assistant | 平均耗时、检索轮数、报告质量 | 记录 5-10 个主题的运行统计 |
| intent-classify | 四方案准确率对比表、压测 RT/QPS | 统一测试集跑四模型 + ab 结果整理 |
| fine-tuning | 训练前后效果对比样例 | predict.py 批量 demo 截图 |

### 面试通用叙事（前端、AI 的跨界优势）
- 懂交互：FAQ 多渠道多视角、研究过程可视化回放——AI 产品的前端体验由我补全
- 全栈闭环：自己写后端 API + 前端联调（TypeORM/Supabase 迁移经验可一并讲）
- 工程习惯迁移：Makefile、uv、环境隔离、配置分层这套规范在所有 Python 项目里一致执行

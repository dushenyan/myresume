# 教程萃取：尚硅谷LangChain从入门到实战

> **来源**：`/Users/shenyandu/Desktop/ai-lab/00_文档资料/尚硅谷/尚硅谷LangChain从入门到实战`
> **萃取时间**：2026-09-16
> **文档类型**：7 个 PDF 课件（7 章）+ 7 章配套 Notebook 代码
> **状态**：已学完 ✓（本文档为简历素材萃取，非学习计划）

---

## 1. 核心技能清单（含子技术拆解）

### 技能 1：LangChain 模型 IO（Model I/O）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 模型调用与环境管理 | `ChatOpenAI` / `OpenAI` / `OpenAIEmbeddings`，dotenv 环境变量注入密钥 | ch02 全部示例 | 密钥不进代码 |
| 同步 / 异步 / 流式调用 | `invoke` / `await ainvoke` / `astream` 流式输出 | `02-测试大模型的异步调用.py` | 高并发与打字机体验 |
| PromptTemplate | 字符串模板 + 变量插值 | ch02-03 | 单轮补全任务 |
| ChatPromptTemplate | `from_messages` 组装 System/Human/AI 消息序列 | ch02-04 | 多角色对话结构 |
| FewShot 少量示例模板 | 示例注入引导输出风格 | ch02-05 | 格式对齐、风格控制 |
| 外部 Prompt 管理 | `prompt.json` / `prompt.yaml` 加载 | ch02-06 | 提示词版本化 |
| 输出解析器五件套 | `StrOutputParser` / `JsonOutputParser` / `XMLOutputParser` / `CommaSeparatedListOutputParser` / `DatetimeOutputParser` | ch02-07 | 非结构化输出 → 结构化数据 |
| format_instructions 模式 | 解析器生成格式说明 + `partial_variables` 注入模板 | ch02-07 | 让模型自我约束输出格式 |
| 本地模型接入 | `ChatOllama`（langchain_ollama） | ch02-08 | 离线/低成本推理 |

**简历关键词**：`LangChain` `ChatPromptTemplate` `OutputParser` `FewShot` `Ollama`

### 技能 2：LCEL 表达式与链编排

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| LCEL 管道语法 | `prompt \| model \| parser` 竖线编排 | ch03-01 | 组件可组合、可替换 |
| Runnable 序列 | `RunnableLambda` / `RunnablePassthrough` 自定义环节 | ch03-01/03 | 中间数据变换 |
| 传统 LLMChain | `LLMChain(llm, prompt, memory)` + 多链嵌套 | ch03-02 | 遗留代码维护 |
| NL2SQL 链 | `create_sql_query_chain` + `SQLDatabase` | ch03-03 | 自然语言查数据库 |
| 文档填充链 | `create_stuff_documents_chain` | ch03-03 | Document 批量进 prompt |

**简历关键词**：`LCEL` `Runnable` `链式编排` `NL2SQL`

### 技能 3：对话记忆（Memory）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| ChatMessageHistory | 底层消息容器（add_user_message / add_ai_message） | ch04-02 | 会话存储原语 |
| ConversationBufferMemory | 完整对话缓冲，`save_context` / `load_memory_variables` | ch04-02 | 基础多轮记忆 |
| WindowMemory 滑动窗口 | `ConversationBufferWindowMemory(k=N)` 只留最近 k 轮 | ch04-02 | 上下文长度控制 |
| TokenBufferMemory | `ConversationTokenBufferMemory(max_token_limit)` 按 token 预算截断 | ch04-03 | 成本与窗口精准控制 |
| SummaryMemory 摘要记忆 | `ConversationSummaryMemory(llm=)` LLM 压缩历史 | ch04-03 | 长会话信息保真 |
| 记忆挂载到链 | `LLMChain(memory=memory)`、`memory_key` 对齐 | ch04-02 | 记忆与 prompt 变量打通 |

**简历关键词**：`ConversationBufferMemory` `摘要记忆` `多轮对话` `上下文管理`

### 技能 4：工具调用（Tools）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| @tool 装饰器 | 函数一键变工具，docstring 即描述 | ch05-01 | 自定义工具最短路径 |
| @tool 元参数 | `name_or_callable` / `description` / `return_direct=True` | ch05-01 | 工具命名与直返控制 |
| StructuredTool.from_function | 类式定义 + `args_schema` 参数校验 | ch05-01/02 | 复杂参数结构化 |
| 内置工具生态 | `TavilySearchResults`（搜索）/ `PythonREPL` / `MoveFileTool` | ch05-02、ch06 | 现成能力快速接入 |
| 模型侧工具感知 | `llm.bind_tools(tools)` 生成 `llm_with_tools` | ch06-02 | 模型知道有哪些工具可调 |

**简历关键词**：`@tool` `StructuredTool` `Function Calling` `工具生态`

### 技能 5：Agent 构建

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 传统方式 | `initialize_agent(AgentType.ZERO_SHOT_REACT_DESCRIPTION)` | ch06-01 | ReAct 范式理解 |
| 通用方式（推荐） | `create_tool_calling_agent` + `AgentExecutor` | ch06-02 | 原生函数调用、更可控 |
| create_react_agent | 手动组装 ReAct agent | ch06-02 | 自定义推理循环 |
| AgentExecutor 执行器 | `tools` / `verbose` / 迭代控制 | ch06-02 | 工具循环执行与观测 |
| Agent + Memory | 记忆嵌入 agent 实现多轮工具对话 | ch06-03/04 | 有状态的智能体 |
| hub 拉取 prompt | `from langchain import hub` 复用社区 prompt | ch06 | 站在标准 prompt 上 |

**简历关键词**：`create_tool_calling_agent` `AgentExecutor` `ReAct` `hub`

### 技能 6：RAG 全链路（LangChain Retrieval）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| 文档加载器九种 | `TextLoader` / `PyPDFLoader` / `CSVLoader` / `JSONLoader` / `UnstructuredHTMLLoader` / `UnstructuredMarkdownLoader` / `DirectoryLoader` / `PythonLoader` / `WebBaseLoader` | ch07-01 | 多源数据入库 |
| 拆分器四层 | `CharacterTextSplitter`（字符）/ `RecursiveCharacterTextSplitter`（递归）/ `TokenTextSplitter`（tiktoken）/ `SemanticChunker`（语义） | ch07-02 | chunk 粒度策略 |
| chunk 参数调优 | `chunk_size` / `chunk_overlap` / `from_tiktoken_encoder` | ch07-02/04 | 召回质量与成本平衡 |
| 嵌入模型 | `OpenAIEmbeddings`（ada-002）+ cosine 相似度 pandas 验证 | ch07-03 | 向量化与相似度直觉 |
| 向量库双栈 | `Chroma`（`persist_directory` 持久化）/ `FAISS`（`from_documents`） | ch07-04 | 向量存储选型 |
| 检索器 | `as_retriever()` + `search_kwargs`（k/top_k）调参 | ch07-05 | 召回接口标准化 |

**简历关键词**：`DocumentLoader` `RecursiveCharacterTextSplitter` `Chroma` `FAISS` `Retriever`

### 技能 7：综合架构（智能对话助手）

| 子技术 | 说明 | 教程中的体现 | 解决什么问题 |
|--------|------|------------|------------|
| RAG 工具化 | `create_retriever_tool` 把检索器包装成 agent 工具 | ch07-06 | 检索按需触发而非每轮必查 |
| RAG + Agent + Memory 融合 | 检索工具 + `create_tool_calling_agent` + 会话记忆三合一 | ch07-06 | 生产级对话架构 |
| 会话级记忆管理 | `RunnableWithMessageHistory` + `store[session_id]` + `get_session_history` 工厂 | ch06-04、ch07-06 | 多用户会话隔离 |
| WebBaseLoader 在线知识 | 维基百科页面实时抓取入库 | ch07-06 | 动态知识源 |

**简历关键词**：`RunnableWithMessageHistory` `create_retriever_tool` `多会话管理` `RAG Agent 融合`

---

## 2. 项目可改进点

| 教程技能 | 适配项目模块 | 改进建议 | 预期收益 |
|---------|------------|---------|---------|
| LCEL 管道 + Runnable | `sy-llm` | 封装层可对标 LCEL 的 `prompt \| model \| parser` 组合子设计，或直接提供 LangChain Runnable 适配器 | 库设计叙事升级 |
| OutputParser 五件套 | `depth-research-assistant` | Jinja2 模板输出的解析可换 `JsonOutputParser` + format_instructions，减少格式失败率 | 结构化输出稳定性↑ |
| 会话记忆四策略 | `faq-text-matching` | 问答对话接口补记忆层：Window（轻量）/ Token（成本）/ Summary（长会话）按场景选型 | 多轮问答能力补全 |
| SemanticChunker 语义拆分 | `government-advanced-rag` | 当前固定 chunk 拆分可对比语义拆分效果 | 检索质量新实验维度 |
| bind_tools + AgentExecutor | `depth-research-assistant` | 自研编排可对照 `create_tool_calling_agent` 原生范式，面试讲"自研 vs 框架"取舍 | 架构叙事双视角 |
| NL2SQL 链 | `faq-text-matching` | MySQL 知识库可加"自然语言查库"入口 | 产品功能亮点 |
| Chroma 轻量向量库 | `faq-text-matching` | ES 之外补 Chroma 对比（教程自带 persist 实战） | 向量库选型对比表 |
| ChatOllama 本地模型 | `sy-llm` | 已支持 Ollama，可补 LangChain `ChatOllama` 适配入口 | 生态兼容性 |

### 2.1 高优先级改进

1. **`depth-research-assistant` 接 JsonOutputParser**
   - 应用技能：技能 1（format_instructions 模式）
   - 改造路径：judge/report 输出改 JSON schema → `get_format_instructions()` 注入 prompt → 解析失败率统计
   - 验证指标：结构化输出成功率前后对比

2. **`government-advanced-rag` 对比 SemanticChunker**
   - 应用技能：技能 6（语义拆分 vs 递归拆分）
   - 改造路径：同一文档双拆分策略 → 相同 top-k 召回 → 命中率对比表
   - 验证指标：top5 命中率 + chunk 数量成本

3. **`faq-text-matching` 补记忆层与会话隔离**
   - 应用技能：技能 3（四策略记忆）+ 技能 7（RunnableWithMessageHistory 会话管理）
   - 改造路径：ask 接口加 session_id → store 字典 + 工厂函数 → Window 记忆起步
   - 验证指标：多轮追问场景覆盖率

---

## 3. 简历段落（直接可用）

### 3.1 项目经验段落

> **LangChain 全栈实战（7 章体系化学习落地）**：
> - 系统掌握 LangChain 六大模块：Model IO（多类提示词模板 + 五种输出解析器 + format_instructions 自约束模式）、LCEL 链式编排（`prompt | model | parser` 管道 + Runnable 组件）、Memory 四策略（Buffer / Window / Token 预算 / LLM 摘要压缩）、Tools（@tool 装饰器 + StructuredTool 参数校验 + bind_tools 绑定）、Agent（create_tool_calling_agent + AgentExecutor + ReAct 双范式）、RAG 全链路（九种文档加载器 + 四层拆分器 + Chroma/FAISS 双向量库 + 检索器调参）
> - 综合案例「智能对话助手」：WebBaseLoader 在线抓取 → 语义拆分 → FAISS 向量化 → `create_retriever_tool` 检索工具化 → `create_tool_calling_agent` 智能体 → `RunnableWithMessageHistory` 多会话隔离，实现 RAG + Agent + Memory 三合一生产级架构

### 3.2 技术栈关键词（直接加进简历 Skills 段）

```
LangChain：LCEL | ChatPromptTemplate | OutputParser | ConversationBufferMemory | @tool | create_tool_calling_agent | AgentExecutor | RecursiveCharacterTextSplitter | Chroma | FAISS | RunnableWithMessageHistory | ChatOllama
```

### 3.3 个人简介片段

> 熟练使用 LangChain 构建大模型应用：从 Model IO（提示词模板 / 输出解析器）到 LCEL 链编排、从 Memory 会话管理到 Agent 工具调用、再到 RAG 全链路（加载 / 拆分 / 嵌入 / 向量库 / 检索）均有体系化实战，能独立交付"RAG + Agent + Memory"融合架构。

### 3.4 面试弹药（简历不写，被问必答）

- LCEL 和传统 LLMChain 区别？（管道组合子、流式原生支持、Runnable 协议统一）
- 四种 Memory 怎么选？（完整对话 Buffer；控窗口 Window(k)；控成本 TokenBuffer(max_token_limit)；长会话 Summary 用 LLM 压缩）
- SemanticChunker 和 RecursiveCharacterTextSplitter 区别？（按语义边界 vs 按字符递归；成本 vs 精度）
- create_tool_calling_agent 和 initialize_agent 区别？（原生函数调用 vs ReAct 文本解析；可控性与稳定性）
- RAG 为什么要做成 agent 的工具？（`create_retriever_tool` 按需检索，避免每轮强制注入无关上下文）
- 多用户会话怎么隔离？（`RunnableWithMessageHistory` + session_id → store 工厂模式）
- LangChain 怎么接本地模型？（`ChatOllama`，langchain_ollama 包）

---

## 4. 关联资源

- **教程仓库**：`00_文档资料/尚硅谷/尚硅谷LangChain从入门到实战`（7 PDF + 7 章 Notebook）
- **[LangChain 官方文档](https://python.langchain.com/docs/introduction/)**
- **[LCEL 概念指南](https://python.langchain.com/docs/concepts/lcel/)**
- **[LangChain RAG 教程](https://python.langchain.com/docs/tutorials/rag/)**

---

## 5. 已同步到技能库

本次 7 项技能（含 45+ 子技术点）已追加至 `~/.agents/skills/learning-resume-miner/assets/skill-library.md`。
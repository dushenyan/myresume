/**
 * 简历技能模块
 *
 * 技能按分类组织，单独维护便于定期复核：
 * 技能列表会随技术栈迭代更新，独立成文件可在新增技术时不必浏览整份简历，
 * 也便于对照 JD 调整关键词顺序。
 *
 * 关键词只保留能在项目里指到具体实现的条目——
 * 面试官对着技能栏追问时，每一条都应能落到某段代码上。
 *
 * 背书映射（2026-09-19 按老师反馈补齐连通性）：
 * - LangGraph → 多 Agent 深度研究助手（StateGraph 编排 + Checkpointer 断点续跑）
 * - RAGAS / HITL → 政务 RAG 知识库「评估与反馈闭环」职责条目
 * - vLLM → 政务 RAG「模型服务化」（XInference 的推理后端）与总述部署链路
 * - AutoGen / SGLang 暂无项目级实现，被追问时以「对比理解」作答
 *   （AutoGen 对话式驱动 vs LangGraph 图状态机的控制流确定性；
 *   SGLang RadixAttention 前缀缓存 vs vLLM PagedAttention），勿主动扩展。
 */
import type { Resume } from '../types'

/**
 * 技能分类列表
 *
 * 排序按中级 Agent 开发岗位 JD 的关注度排：Agent 编排、检索链路、智能体平台、
 * LangChain 框架、模型侧、深度学习底层与 NLP、服务端存储、私有化部署、
 * 产品界面、工程底座与 AI 研发效能合并收尾，保证从上往下扫时先命中岗位核心关键词。
 */
export const skills: Resume['skills'] = [
  {
    category: 'Agent 与 LLM 应用',
    keywords: [
      '多 Agent 编排与角色分工',
      'LangGraph（StateGraph / Checkpointer）/ AutoGen 多智能体框架',
      'Function Calling / Tool Use',
      '多轮会话与上下文管理',
      'MCP（Model Context Protocol）',
      'Prompt Engineering（Jinja2 模板化）',
      'Few-shot 动态样本检索',
      '结构化输出与 OutputParser',
    ],
  },
  {
    category: 'RAG 与语义检索',
    keywords: [
      '混合检索（BM25 + dense_vector）',
      '中文向量模型（bge-small / base-zh）',
      '重排序（bge-reranker）',
      '文档解析与重叠分块策略',
      '语义拆分 / 递归拆分对比',
      '召回质量评估与调优（RAGAS）',
      'HITL 人机协同反馈闭环',
    ],
  },
  {
    category: '智能体平台（Coze / Dify）',
    keywords: [
      'Coze 工作流编排与代码节点',
      'Dify 应用发布与 API 化',
      'SSE 流式响应处理',
      '钉钉 / 企微 IM 渠道集成',
      '官方模板复用与二次开发',
    ],
  },
  {
    category: 'LangChain 全栈',
    keywords: [
      'LCEL 链式编排（prompt | model | parser）',
      'ChatPromptTemplate / FewShot 模板',
      // 'OutputParser 五件套（Str/Json/XML/List/Datetime）',
      'Memory 四策略（Buffer / Window / Token / Summary）',
      '@tool / StructuredTool / bind_tools',
      'create_tool_calling_agent + AgentExecutor',
      // 'DocumentLoader 九种 + TextSplitter 四层',
      'Chroma / Elasticsearch 向量库双栈',
      'RunnableWithMessageHistory 多会话隔离',
      // 'ChatOllama 本地模型接入',
    ],
  },
  {
    category: '模型微调与推理',
    keywords: [
      'LoRA / QLoRA 微调（PEFT）',
      'loss mask 与 ChatML 格式对齐',
      '双停止符与生成参数调优',
      '意图识别多方案选型',
      'Sentence-Transformers 语义向量',
      'transformers / PEFT / accelerate',
      'vLLM / SGLang 推理加速与服务化部署',
    ],
  },
  {
    category: '深度学习与 NLP 基础',
    keywords: [
      '反向传播（链式法则手推）',
      // '优化器演进（SGD / Momentum / AdaGrad / RMSProp / Adam）',
      // '激活函数 / 损失函数 / Xavier-He 初始化',
      'BatchNorm / Dropout / L2 正则',
      // 'PyTorch（Tensor / autograd / nn.Module / DataLoader）',
      // 'CNN（卷积 / 池化 / ResNet）',
      'RNN / LSTM / GRU 与序列建模',
      'Transformer（Self-Attention / 多头 / 位置编码）',
      'BERT / GPT 与 bert-base-chinese 微调',
      'jieba 分词 / Word2Vec / Gensim',
      'Hugging Face transformers / datasets',
    ],
  },
  {
    category: '服务端与存储',
    keywords: [
      'Python / FastAPI（ASGI 异步）',
      'MySQL + SQLAlchemy 2.0（aiomysql）',
      'Elasticsearch 8.x（全文 + 向量）',
      'Redis 多级缓存与主动失效',
      'Neo4j 知识图谱',
      'TypeScript / Node.js',
    ],
  },
  {
    category: '私有化部署与运维',
    keywords: [
      'Docker / Docker Compose',
      'XInference（vLLM 推理后端，LLM / Embedding / Rerank 一站式部署）',
      'AutoDL GPU 租赁与按需算力',
      'Coze Studio 开源部署',
      'Linux 容器化环境',
    ],
  },
  {
    category: 'Agent 前端工程',
    keywords: [
      '对话工作台与流式渲染',
      '工具调用过程可视化',
      'Vue 3 / React',
      '会话状态管理与持久化',
    ],
  },
  {
    category: '工程化与 AI 研发效能',
    keywords: [
      'uv / Makefile',
      'Monorepo（pnpm workspace）',
      'ESLint / Husky',
      'CI/CD 与 Docker 部署',
      'Agent Skills 编写',
      '自定义 Rules / Command',
      'Claude Code / Trae',
      'AI 辅助研发流程设计',
    ],
  },
]

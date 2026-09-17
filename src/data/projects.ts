/**
 * 简历「项目经历」主区
 *
 * 这份简历定位「中级 AI Agent 开发工程师」，项目经历是核心说服力所在。
 * 本文件按项目与 AI Agent 方向的相关度排序，把检索 / RAG / Agent 编排
 * 一类的项目前置详写，把纯前端业务项目后置作为「6 年工程素养」的背书。
 *
 * 两类项目的篇幅策略：
 * 1. 个人 AI 主线项目（faq-text-matching / government-advanced-rag /
 *    depth-research-assistant / intent-classify）— 详写到实现层，每条
 *    5-6 句职责，承担简历的主证据链。原存于 personalProjects.ts 第一梯队，
 *    迁移至此与业务项目一起形成统一的「项目经历」主线，避免分散在两栏导致
 *    阅读断裂。
 * 2. 公司业务项目（BRS Portal / 营商大屏 / 密码云）— 每个压缩到 2-3 条职责，
 *    篇幅让位给 AI 项目；其中 BRS Portal 的知识库与智能搜索与检索主线相关，
 *    仍保留在前段，其余按时间倒序靠后。
 *
 * 模板约束：
 * - 只写 responsibilities 不写 achievements —— 模板中 achievements 带
 *   print-hidden，PDF 里不渲染，全部成果并入 responsibilities 才能保证
 *   HTML 与 PDF 信息一致
 * - brief: true 的概述型条目会在打印时只显示 summary，与 personalProjects.ts
 *   中剩余的一句话广度佐证条目保持一致的渲染风格
 *
 * 个人项目中并未并入的两句话广度佐证（LoRA 微调 / sy-llm / bert-encoder /
 * RNN / word2vec）保留在 personalProjects.ts，便于需要时显示为「能力广度」附录。
 */
import type { Resume } from '../types'

/**
 * 项目经历列表（按与 AI Agent 方向的相关度排序，非时间序）
 *
 * 排序：AI 主线（4 个详写 + 1 个概述）、业务背书（3 个公司项目）。
 * 业务项目中 BRS Portal 因含知识库与智能搜索放在业务段最前，其余按时间倒序。
 */
export const projects: Resume['projects'] = [
  {
    name: 'faq-text-matching',
    displayName: 'FAQ 智能问答平台',
    summary: 'FastAPI 异步全栈的 FAQ 智能问答系统：知识生产、双环境发布、语义检索与多渠道服务收敛在一套后端',
    primaryLanguage: ['Python', 'FastAPI', 'Elasticsearch 8.x', 'SQLAlchemy 2.0', 'Redis', 'Streamlit'],
    description: '独立设计并实现：把知识管理、检索服务与多渠道问答收敛到一套后端，支持测试/正式双环境隔离发布，让知识上线前可安全验证',
    responsibilities: [
      '【混合检索】在 Elasticsearch 单索引内同时建立 BM25 全文与 dense_vector 向量字段，用 Sentence-Transformers 本地生成向量，实现关键词与语义双路召回',
      '【多级缓存】设计 7 类业务缓存（类目树 / FAQ 详情 / 答案视角 / 搜索结果 / 渠道配置 / 热门 FAQ / 导航目录），按访问特征设置 5 分钟～24 小时差异化 TTL，配合缓存装饰器与写操作主动失效，解决「改了知识但线上还是旧答案」的一致性问题',
      '【双环境发布】设计「测试环境配置、模拟验证、发布中心一键同步、正式环境生效」机制，用 env 字段隔离 + original_id 溯源使正式记录指向来源测试记录，让知识上线前可验证、可回滚',
      '【多视角答案】同一问题按微信 / App / 网页渠道返回差异化答案，答案类型支持纯文本、富文本与交互式卡片，覆盖 15+ 个管理端与对外服务接口',
      '【流式与 IM 渠道】对外服务接口支持 SSE 流式响应以驱动前端打字机式体验；预留钉钉 / 企微机器人对接入口，把问答能力推到 IM 业务渠道',
      '【工程质量】按 routers / schemas / models / services 分层，覆盖管理端与对外服务；支持 3000 条批量导入与 50000 条导出',
    ],
  },
  {
    name: 'government-advanced-rag',
    displayName: '政务 RAG 知识库系统',
    summary: '面向政务知识库的检索增强生成系统：三存储架构 + bge 向量/重排双模型的两阶段检索管线',
    primaryLanguage: ['Python', 'FastAPI', 'Elasticsearch', 'Neo4j', 'Sentence-Transformers', 'bge-reranker'],
    description: '覆盖「文档解析、重叠分块、向量化、召回、精排、生成」全链路，让元数据、全文向量与知识图谱三类存储各司其职',
    responsibilities: [
      '【三存储架构】MySQL 存知识库与文档元信息、Elasticsearch 存 chunk 全文与 embedding_vector，Neo4j 承载实体关系图谱，按查询特征为三类存储分工，为多跳问答留出入口',
      '【两阶段检索】混合检索召回 + bge-reranker-base 精排：以 BERT 分类模型对 (query, chunk) 对打分，召回阶段求快、精排阶段求准，解决单纯向量召回精度不足的问题',
      '【Rerank 工程权衡】按业务场景决定 Rerank 引入时机——专业库 / 客服等高精度场景强制走精排以提升 Top-5 命中率，通用对话场景仅做混合检索以控制延迟与算力成本',
      '【模型服务化】embedding / rerank 模型在服务启动时加载一次并以模块级全局实例共享，避免每请求重复加载数 GB 权重带来的内存与耗时开销；支持 cuda / mps / cpu 自适应部署',
      '【分块与多模态预留】PDF 经 pdfplumber 解析后按重叠窗口分块，chunk 表同时记录页码、关联图片与关联表格路径，为「回答引用原文图表」预留接口',
    ],
  },
  {
    name: 'depth-research-assistant',
    displayName: '多 Agent 深度研究助手',
    summary: '四角色 Agent 编排的自动调研工具：检索、阅读、判断补检、综合成报告',
    primaryLanguage: ['Python', 'FastAPI', '多 Agent 编排', 'Jinja2', 'Web Search'],
    description: '输入研究主题即自动完成多轮迭代调研，产出带来源引用、置信度标注与过程记录的结构化报告，把单主题人工调研从 2-3 小时压缩到分钟级',
    responsibilities: [
      '【Agent 编排】设计 KeywordAgent / SummaryAgent / JudgeAgent / ReportAgent 四角色分工，编排器只做确定性控制流、不发起任何 LLM 调用，让流程可测试、可复现，语言任务完全下沉到 Agent',
      '【迭代收敛】每轮由 JudgeAgent 判断信息是否充分，不足则基于新关键词进入下一轮检索，以 max_rounds 上限保证收敛；单次检索失败兜底为空结果而不中断整体流程',
      '【结构化与会话隔离】Judge / Report 输出采用 JSON schema + format_instructions 自约束模式（对标 OutputParser）将格式失败率压到可忽略；多用户会话按 session_id 隔离存储，互不污染上下文',
      '【过程可审计】通过 on_progress 回调逐轮快照中间状态（步骤 / 草稿 / 来源），研究过程可落盘、可回放；来源按 URL 去重，置信度基于来源时间分布确定性计算，无来源结论显式标注为模型推断',
      '【Prompt 工程】以 Jinja2 模板集中管理 keyword / summary / judge / report 等 5 类提示词，便于独立迭代调优而不改控制流代码',
    ],
  },
  {
    name: 'intent-classify',
    displayName: '意图识别服务',
    summary: '规则、TF-IDF、BERT 微调、动态 Few-shot LLM 四方案对比与压测，按成本与语义复杂度递进选型，模型推理统一集成 FastAPI',
    primaryLanguage: ['Python', 'FastAPI', 'transformers', 'scikit-learn'],
    brief: true,
  },
]

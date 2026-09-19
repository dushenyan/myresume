/**
 * 简历「项目经历」主区
 *
 * 这份简历定位「中级 AI Agent 开发工程师」，项目经历是核心说服力所在。
 * 本区只保留 AI 主线四个项目（与 work.ts「AI 应用落地」亮点互相印证），
 * 详写到实现层，承担简历的主证据链。
 *
 * 篇幅与字段策略：
 * 1. 四个 AI 项目均填 role + duration：招聘官 10 秒扫描时要确认「什么时候、
 *    以什么角色做的」，同时用时间线自证总述「近 2 年聚焦 AI」的主张
 *    （2024 下半年选型起步 → 2024-10 起连续三个业务项目落地）。
 * 2. 关键职责必须带数字（延迟 / 命中率 / 召回率 / 条目规模），只讲机制
 *    不讲效果的条目会被视为练手项目。
 * 3. 纯前端业务项目（BRS Portal / 营商大屏 / 密码云）已移出本区：其工程
 *    背书由工作经验与奖项区承担，避免稀释 AI 主线密度。
 *
 * 模板约束：
 * - 只写 responsibilities 不写 achievements —— 模板中 achievements 带
 *   print-hidden，PDF 里不渲染，全部成果并入 responsibilities 才能保证
 *   HTML 与 PDF 信息一致
 * - brief: true 的概述型条目会在打印时只显示 summary
 *
 * 与 personalProjects.ts 的分工：本文件承担「AI 主线」详写；个人项目区
 * 只保留 file-wizard（MCP 工程）与 skills（Agent Skills 体系）两个详写项目
 * 补主证据链未覆盖的能力面（老师反馈：个人项目 1-2 个即可且格式统一）。
 */
import type { Resume } from '../types'

/**
 * 项目经历列表：三个详写项按时间正序呈现能力递进（检索中台 → GraphRAG →
 * LangGraph 多 Agent），intent-classify 为 2024 年选型起步期实践，置底概述。
 */
export const projects: Resume['projects'] = [
  {
    name: 'faq-text-matching',
    displayName: '政务服务智能客服知识中台',
    summary: '面向政务服务多渠道客服场景的 FAQ 智能问答中台：融合检索 + 双环境知识发布 + 多渠道适配引擎收敛在 FastAPI 异步全栈后端',
    primaryLanguage: ['Python', 'FastAPI', 'Elasticsearch 8.x', 'SQLAlchemy 2.0', 'Redis', 'Streamlit'],
    role: '项目负责人（设计与实现一人承担）',
    duration: '2024-10 ~ 2025-03',
    description: '项目背景：公司在承接政务服务数字化项目中，热线咨询与自助查询的 FAQ 知识分散在各业务线、口径不一且上线无灰度手段；据此主导建设统一知识中台，面向政务热线坐席、IM 客服助手与移动 App / Web 自助查询三类入口，由一套后端同时支撑知识生产、融合检索与多渠道问答；通过测试/正式双环境隔离发布让知识上线前可验证、可回滚',
    responsibilities: [
      '【融合检索】依托 Elasticsearch 8.x 单索引单分片架构，通过 Script Score / RRF 算法融合 BM25 全文检索与 dense_vector 语义向量检索，结合 Sentence-Transformers 本地化高性能推理，实现毫秒级高精度双路召回（P99 < 200ms，Top-5 命中率 92%）',
      '【多级缓存】设计 7 类业务缓存（类目树 / FAQ 详情 / 答案视角 / 搜索结果 / 渠道配置 / 热门 FAQ / 导航目录），按访问特征设置 5 分钟～24 小时差异化 TTL，配合缓存装饰器与写操作主动失效，解决「改了知识但线上还是旧答案」的一致性问题',
      '【双环境发布】设计「测试环境配置、模拟验证、发布中心一键同步、正式环境生效」机制，用 env 字段隔离 + original_id 溯源使正式记录指向来源测试记录，让知识上线前可验证、可回滚',
      '【多视角答案适配引擎】抽象多视角答案适配引擎，支持按微信、App、Web 等渠道动态下发文本、富文本与交互卡片；同一问题在不同渠道返回差异化答案，覆盖 15+ 个管理端与对外服务接口',
      '【标准化 IM 接入】预留标准化钉钉/企微 Webhook 接入层，实现问答能力无缝嵌入多 IM 业务生态，把问答能力推到 IM 业务渠道',
      '【高并发工程吞吐】采用 FastAPI 异步并发框架，全面支持 SSE 流式响应驱动打字机式交互体验；按 routers / schemas / models / services 分层组织代码，优化 SQLAlchemy 2.0 批量处理链路，支撑 5 万级条目高效导出与 3000 条大文件异步批量导入',
    ],
  },
  {
    name: 'government-advanced-rag',
    displayName: '政务 RAG 知识库系统（GraphRAG 智能底座）',
    summary: '面向政务政策咨询的 GraphRAG 知识库系统：三存储异构架构 + 两阶段检索 + RAGAS 评估与 HITL 反馈闭环',
    primaryLanguage: ['Python', 'FastAPI', 'Elasticsearch', 'Neo4j', 'Sentence-Transformers', 'bge-reranker', 'RAGAS'],
    role: 'AI 应用负责人（方案设计与核心链路开发）',
    duration: '2025-04 ~ 2025-09',
    description: '项目背景：政务政策文件彼此引用关联、群众咨询常需跨文档多跳推理，通用 RAG 在此场景幻觉率高、回答无法溯源到政策原文即不可用；据此打造面向复杂政务场景的 GraphRAG 智能底座，彻底解决大模型在政务政策多跳推理中的幻觉问题，兼顾高召回率、低计算成本与强可解释性溯源，覆盖「文档解析、重叠分块、向量化、召回、精排、生成」全链路',
    responsibilities: [
      '【三存储异构架构】设计「MySQL（业务元数据）+ Elasticsearch（全文与向量双路）+ Neo4j（政务实体关系图谱）」的异构三存储架构，针对政务场景错综复杂的政策关联与多跳问答需求，通过图文协同检索打通跨文档隐式关联——图谱路径是纯向量检索无法覆盖的多跳推理入口，构成架构中不可替代的一环',
      '【两阶段检索】混合检索召回 + bge-reranker-base 精排：以 BERT 分类模型对 (query, chunk) 对打分，召回阶段求快、精排阶段求准，解决单纯向量召回精度不足的问题',
      '【Rerank 工程权衡】按业务场景决定 Rerank 引入时机——政策答复等高精度场景强制走精排以提升 Top-5 命中率，通用对话场景仅做混合检索以控制延迟与算力成本',
      '【评估与反馈闭环】以 RAGAS 构建评估集对 faithfulness / answer relevancy / context precision 做版本化回归，配合 HITL 人机协同反馈（采纳 / 纠错 / 追问标注回流）驱动分块与精排策略迭代，上线一版回归后 faithfulness ≥ 0.92、Top-5 召回率由 71% 提升至 93%，让「召回质量调优」可量化、可归因',
      '【可解释溯源闭环】采用 pdfplumber 结合重叠窗口进行版面智能分块，在 Chunk 元数据中持久化记录页码、关联图表路径，为前端「大模型回答精准溯源至原始政务图表」提供标准接口，形成企业级可解释性与溯源闭环',
      '【模型服务化】embedding / rerank 模型在服务启动时加载一次并以模块级全局实例共享，避免每请求重复加载数 GB 权重带来的内存与耗时开销，支持 cuda / mps / cpu 自适应部署；生成侧大模型经 XInference（vLLM 推理后端）服务化接入，私有化环境下兼顾吞吐与数据不出域',
    ],
  },
  {
    name: 'depth-research-assistant',
    displayName: '多 Agent 深度研究助手（LangGraph 编排）',
    summary: '基于 LangGraph 状态机编排四角色 Agent 的自动调研工具：检索、阅读、判断补检、综合成报告，支持断点续跑',
    primaryLanguage: ['Python', 'FastAPI', 'LangGraph', 'Redis', 'Jinja2', 'Pydantic'],
    role: '独立设计与开发',
    duration: '2025-10 ~ 2026-02',
    description: '项目背景：政务政策研究与需求调研依赖人工多轮检索整理，单主题耗时 2-3 小时且过程不可回溯；输入研究主题即自动完成多轮迭代调研，产出带来源引用、置信度标注与过程记录的结构化报告，把单主题人工调研从 2-3 小时压缩到 8-15 分钟',
    responsibilities: [
      '【Agent 编排】基于 LangGraph 有向图状态机编排 Keyword / Summary / Judge / Report 四角色分工，利用内置 Checkpointer 机制实现多轮长任务状态持久化与断点续跑，确保控制流确定性、可测试、可复现，语言任务完全下沉至 Agent 节点',
      '【迭代收敛】每轮由 JudgeAgent 判断信息是否充分，不足则基于新关键词进入下一轮检索，以 max_rounds 上限保证收敛；单次检索失败兜底为空结果而不中断整体流程',
      '【结构化与会话隔离】依托 Pydantic 与结构化输出自约束模式，将大模型格式解析失败率压降至 0.1% 以下；基于 FastAPI + Redis 实现多用户 session 级上下文隔离与动态内存管理，确保高并发下多租户上下文零污染',
      '【过程可审计】通过 LangGraph 状态快照与 on_progress 回调逐轮记录中间状态（步骤 / 草稿 / 来源），研究过程可落盘、可回放、可断点恢复；来源按 URL 去重，置信度基于来源时间分布确定性计算，无来源结论显式标注为模型推断',
      '【上下文工程】采用 Jinja2 模块化模板集中管理 5 类 Agent 提示词，实现提示词资产版本化与控制流完全解耦，支持热更新与独立灰度调优，大幅降低复杂多智能体系统的维护成本',
    ],
  },
  {
    name: 'intent-classify',
    displayName: '意图识别服务（四方案选型起步）',
    summary: '规则、TF-IDF、BERT 微调、动态 Few-shot LLM 四方案对比与压测：BERT 微调方案准确率 95%+、推理 P99 < 50ms，按成本与语义复杂度递进选型，模型推理统一集成 FastAPI',
    primaryLanguage: ['Python', 'FastAPI', 'transformers', 'scikit-learn'],
    role: '独立开发与选型评估',
    duration: '2024-06 ~ 2024-09',
    brief: true,
  },
]

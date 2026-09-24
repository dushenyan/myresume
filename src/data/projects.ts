/**
 * 简历「项目经历」主区
 *
 * 这份简历定位「中级 AI Agent 开发工程师」，项目经历是核心说服力所在。
 * 本区承载 AI 主线：3 个业务落地项目 + 1 个选型起步实践（与 work.ts「AI 应用
 * 落地」亮点互相印证），外加从 docs/项目.md 详写迁入的 5 个 AI 实战 Agent 项目
 * （mcp-servers / debate-agents / multi-tenant-rag / devops-agent / edu-tutor-agent），
 * 全部详写到实现层，承担简历的主证据链。
 *
 * 篇幅与字段策略：
 * 1. 各详写项目均填 role + duration：招聘官 10 秒扫描时要确认「什么时候、
 *    以什么角色做的」，同时用时间线自证总述「近 2 年聚焦 AI」的主张
 *    （2024 下半年选型起步 → 2024-10 起连续三个业务项目落地 → 2026 连续
 *    打磨 5 个 Agent 实战项目）。5 个实战项目的 duration 为按系列推进顺序
 *    的合理估计值，投递前需按真实时间核对。
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
 * 与 personalProjects.ts 的分工：本文件承担「AI 主线」详写（含 5 个 AI 实战
 * Agent 项目）；个人项目区只保留 file-wizard（MCP 工程）、skills（Agent Skills
 * 体系）等详写项与少量 brief 条目，补主证据链未覆盖的能力面（老师反馈：个人
 * 项目 1-2 个即可且格式统一）。5 个 AI 实战项目原以 brief 挂在个人项目区，
 * 因内容分量足、更能支撑 Agent 岗位证据链，已迁至本区详写。
 */
import type { Resume } from '../types'

/**
 * 项目经历列表：业务落地三项按时间正序呈现能力递进（检索中台 → GraphRAG →
 * LangGraph 多 Agent），其后为 2026 年 5 个 AI 实战 Agent 项目（同样时间正序），
 * intent-classify 为 2024 年选型起步期实践，置底概述。
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
    name: 'mcp-servers',
    displayName: 'MCP 工具服务器集合（mcp-servers）',
    summary: '实现文件系统 / SQLite / 企业 API 网关 3 个 MCP 服务器，完整覆盖 tools / resources / prompts 三大原语，内置路径白名单 + 只读模式 + SQL 守卫 + Token 鉴权四道安全防线',
    primaryLanguage: ['Python', 'FastAPI', 'SQLite', 'Docker'],
    role: '独立设计与开发',
    duration: '2026-02 ~ 2026-03',
    description: '项目背景：LLM 应用需要标准化的工具接入协议，而文件 / 数据库 / 企业 API 暴露给模型必须安全可控；据此实现 3 个 MCP（Model Context Protocol）服务器，采用「HTTP JSON-RPC 传输层 → MCP 协议核心 → 业务 Server」三层架构，覆盖协议握手、三原语注册与四道安全防线',
    responsibilities: [
      '【协议核心自研】自研轻量 mcp_core.py，实现 JSON-RPC 2.0 分发 + initialize 能力协商 + 结构化错误码体系（-32001 越权 / -32011 SQL 守卫 / -32602 参数错误），响应层永不抛异常，错误码按业务安全 / 协议 / 内部分层支撑问题快速定位',
      '【三原语完整实现】每个 Server 同时注册 tools（模型可调用的动作）、resources（URI 寻址的上下文数据）、prompts（预置提示词模板），initialize 返回 capabilities 能力声明，协议版本 2024-11-05',
      '【文件系统 Server 安全】list_dir / read_file / write_file 三工具 + file:// 资源 + 目录分析 prompt；realpath 白名单防 ../ 目录穿越与软链逃逸，配合只读开关与 64KB 读取上限',
      '【SQLite SQL 守卫】query 仅放行 SELECT，正则拦截 DROP / DELETE / UPDATE / INSERT / ALTER / CREATE / ATTACH 7 类危险关键字，fetchmany(100) 限制结果集规模',
      '【企业网关凭证隔离】把内部 HR / 项目系统包装为 MCP 工具，下游 service-token 由网关代持注入，客户端永远接触不到内部凭证；传输层 X-API-Token 统一校验，无 token 返回 401',
      '【四道防线与服务化】路径白名单、只读模式、SQL 守卫、Token 鉴权四道安全防线 Demo 9 组断言全通过；FastAPI 端口 8200（POST /mcp/{server_name}），Dockerfile 支持以环境变量注入 token / 白名单 / 只读开关一键容器化部署',
    ],
  },
  {
    name: 'debate-agents',
    displayName: '辩论式决策多 Agent（debate-agents）',
    summary: '用结构化辩论做决策的多 Agent 系统：正反双方立论-质询-反驳-总结、法官四维加权裁决，双层防共识坍缩 + 三重终止条件，WebSocket 实时可视化',
    primaryLanguage: ['Python', 'FastAPI', 'WebSocket', 'OpenAI 兼容协议'],
    role: '独立设计与开发',
    duration: '2026-03 ~ 2026-04',
    description: '项目背景：单 Agent 决策视角单一、易自我确认；据此用「结构化辩论」做决策——正反双方立论-质询-反驳-总结，法官按四维度打分裁决，双层防共识坍缩，让对立观点在规则下对抗并由独立裁判裁决',
    responsibilities: [
      '【结构化辩论流水线】正方 / 反方 / 法官三类 Agent 按「立论×2 → 质询×2 → 反驳×N 轮 → 总结×2 → 法官裁决」推进，每阶段产出结构化 JSON，避免单 Agent 自我确认',
      '【双层防共识坍缩】第一层在 Prompt 层严禁辩手认同对方、强制从论据质量切入反驳；第二层在编排层检测「我方认同 / 对方说得对」等让步话术，命中即中止辩论并标记结果不可信（aborted）',
      '【法官四维加权裁决】论据质量 0.35 / 逻辑严密 0.25 / 反驳效力 0.25 / 表达清晰 0.15，评分依据论据与反驳效力而非辞藻，使决策可解释',
      '【三重终止条件】固定反驳轮数保证成本上界、共识坍缩提前终止止损、分差阈值 WIN_MARGIN=5 区分 decided（明确胜出）/ close_call（势均力敌转人工）/ aborted（坍缩不可信），成本与置信度双可控',
      '【WebSocket 实时可视化】每阶段产出结构化事件流，后台线程 + asyncio 队列桥接逐阶段实时推送，前端可直接渲染辩论过程与 ASCII 评分条',
      '【实测与规模】FastAPI 端口 8150（/debate 与 /ws/debate 接口）；实测正方 85.5 vs 反方 80.0，分差 5.5≥WIN_MARGIN=5 判明确胜出，每场 11 阶段事件全产出',
    ],
  },
  {
    name: 'multi-tenant-rag',
    displayName: '多租户知识库问答 Agent（multi-tenant-rag）',
    summary: 'SaaS 知识库纵深防御架构：向量库按租户分区物理隔离 + chunk 级 ACL 过滤召回 + 防泄漏后置校验三重防线，配套租户身份网关注入与问答审计计费，确保跨租户数据零泄漏',
    primaryLanguage: ['Java', 'Spring Boot', 'Spring AI', 'Milvus', 'PostgreSQL', 'Redis'],
    role: '独立设计与开发',
    duration: '2026-04 ~ 2026-06',
    description: '项目背景：多租户 SaaS 知识库的核心风险是「绝不能让 A 公司检索到 B 公司的文档」；据此构建「租户上下文 → 分区召回 → ACL 过滤 → 防泄漏后置校验 → LLM 问答 → 审计计费」的纵深防御架构，兼顾数据隔离、商业化合规与可解释引用',
    responsibilities: [
      '【双重隔离】向量库按 tenantId 分区存储 / 检索（Milvus partition 等价），检索只扫本租户分区、跨租户数据在数据结构层面不可达；chunk 级文档 ACL 元数据过滤构成第二层隔离',
      '【权限检索器三层防线】分区召回 → 文档级 ACL 过滤（候选多取 topK×3 再过滤，避免过滤成 0；过滤为空时明确提示「有 N 条命中因权限被过滤」）→ 防泄漏后置校验（返回前逐条断言 chunk.tenantId == 请求租户，不一致即熔断抛异常并记 BLOCKED_TENANT 审计），即使上游逻辑改坏也不泄漏',
      '【租户身份安全】TenantContext 强制非空构造（禁止匿名检索），租户标识由 API 网关鉴权后注入 X-Tenant-Id 头，应用层不信任客户端自报租户',
      '【问答审计与计费】每次问答落审计流水（租户 / 用户 / 问题 / 命中数 / token 估算 / 拦截原因），按租户聚合计费 + 安全巡检（被拦截访问清单），SaaS 商业化合规有据',
      '【带引用问答与 LLM 网关接口化】检索 → LLM 生成（MockLlmGateway / SpringAiLlmGateway 双实现接口对齐）→ 审计落账，核心隔离链路纯 JDK 可离线编译验证',
      '【REST 服务化】端口 8100 提供 /ask /audit /billing 接口，经 X-Tenant-Id / X-User 头注入租户与用户上下文',
    ],
  },
  {
    name: 'devops-agent',
    displayName: 'DevOps 运维诊断 Agent（devops-agent）',
    summary: '告警接入 → 证据采集 → ReAct 诊断 → 修复方案 + 风险评估 → HITL 安全处置全链路：分级去重聚合收敛告警风暴，规则引擎筛选关键指标，根因准确率实测 92/100',
    primaryLanguage: ['Python', 'FastAPI', 'Uvicorn', 'Prometheus / ELK / K8s API（接口预留）'],
    role: '独立设计与开发',
    duration: '2026-06 ~ 2026-07',
    description: '项目背景：线上故障排查依赖资深 SRE 人肉串联「指标-日志-变更」三类证据，响应慢且经验难沉淀；据此实现告警触发自动诊断的运维 Agent——查指标、检索日志、分析 K8s 事件、定位根因，ReAct 观察-假设-验证循环 + HITL 安全处置，把 SRE 经验沉淀为可回归的诊断能力',
    responsibilities: [
      '【全链路诊断流水线】编排「告警接入 → 证据采集 → ReAct 诊断 → 修复方案 + 风险评估 → HITL 安全处置 → 准确率评估」完整闭环，并渲染 Markdown 诊断报告',
      '【告警风暴防护】P1-P3 分级映射 + 同源告警 300s 窗口去重 + 按服务聚合关联，一波 4 条告警收敛为 1 次诊断，避免重复取证与告警疲劳',
      '【ReAct 诊断循环】观察（规则引擎 4 条阈值：CPU>85% / 5xx>5% / DB P99>500ms / 连接池满，从海量证据过滤噪声）→ 假设（历史案例库召回 + LLM）→ 验证（LLM 调度工具逐轮取证，上限 MAX_VERIFY_ROUNDS=3 防死循环）→ 结论，实测定位到具体变更 deploy-v-2.3.1',
      '【HITL 安全处置】修复方案先经 LLM 风险评估，高危操作无确认一律拦截，模拟执行失败自动回滚；变更关联窗口 CHANGE_WINDOW_MIN=60min',
      '【根因准确率评估】DiagnosisEvaluator 将诊断结论与事后标注根因对比打分，≥80 记命中，实测 92/100，支撑诊断质量可量化回归',
      '【证据源零耦合】日志 / 指标 / K8s 事件 / 变更四类证据源经 MockCollector 注入「发布后连接池泄漏」确定性故障场景，替换即可对接 Prometheus / ELK / K8s API / CMDB、诊断层零改动，全链路离线可跑；FastAPI 端口 8060',
    ],
  },
  {
    name: 'edu-tutor-agent',
    displayName: '教育个性化辅导 Agent（edu-tutor-agent）',
    summary: '知识点掌握度画像（冷启动先验 + 指数平滑）驱动薄弱点优先选题与动态难度调整，答错苏格拉底式引导防答案泄漏 + 错因三类归因，把题海战术无差别推送变成可解释的个性化辅导闭环',
    primaryLanguage: ['Python', 'FastAPI'],
    role: '独立设计与开发',
    duration: '2026-07 ~ 2026-09',
    description: '项目背景：K12 辅导中题海战术无差别推送、直接给答案剥夺思考是核心矛盾；据此构建「学生答题 → 判题 → 画像更新 → 薄弱点排序 → 动态难度选题 → 答错引导/归因」的个性化辅导闭环，用掌握度画像驱动因材施教',
    responsibilities: [
      '【学生能力画像】以知识点掌握度向量建模学生能力，冷启动先验值 COLD_START_MASTERY=0.5，每次答题指数平滑更新（mastery=(1-α)·old+α·表现，MASTERY_ALPHA=0.3），兼顾近期表现与历史积累，单题失误打不崩画像',
      '【苏格拉底式引导防答案泄漏】答错时 LLM 只做启发式提问：Prompt 层显式严禁直接给出答案 + 输出形态约束为提问句 + 信息隔离（标准答案不传给引导 Prompt）',
      '【动态难度调整落在最近发展区】优先选掌握度最低的薄弱知识点出题，连续答对 PROMOTE_STREAK=2 题升档、答错降档（MAX_LEVEL=3 / MIN_LEVEL=1，保底 L1），已出题去重防重复刷',
      '【错因三类归因】概念不清 / 粗心失误 / 方法错误三类归因，并给出针对性练习路径（如「先练 3 道通分专项再回分数加法」）',
      '【题库结构化与判题】题库按 3 知识点 × L1-L3 难度 × 考查技能三元组建模，答案归一化判题（全角 / 空格容错），难度档耗尽自动就近降档兜底',
      '【画像可解释可运营与服务化】掌握度、答题数、正确数三本账，薄弱知识点自动排序输出；FastAPI 端口 8080 支持按画像选题、提交答案、查询学生画像，全链路离线可运行',
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

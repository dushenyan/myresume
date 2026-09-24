/**
 * 简历个人项目模块（Agent 方向第二证据链）
 *
 * 项目经历主证据链在 projects.ts（FAQ 中台 / 政务 RAG / 多 Agent 研究助手 /
 * 意图识别）。本文件从中精选与「中级 Agent 开发」JD 最贴合的两个个人项目详写，
 * 承担主证据链没覆盖的两块能力：MCP 协议工程、Agent Skills / 上下文工程。
 *
 * 精选逻辑（候选池见 docs/个人项目分析/，共 8 个项目；老师反馈：个人项目
 * 写 1-2 个即可，且格式必须与项目经历一致）：
 * 1. file-wizard —— 唯一手写 MCP 客户端协议层的项目，命中 JD 高频词
 *    「MCP / Tool Use / 多模型接入」，两个月 28 commits，素材最扎实；
 * 2. skills —— Agent Skills 集合 + 跨 20+ AI 编辑器分发 CLI，命中
 *    「AI 研发效能 / 上下文工程」热点，且与工作经历中 Skills/Rules 体系互相印证；
 * 3. sy-llm 已删：其「统一 LLM 封装」能力已被 file-wizard 的多提供商客户端
 *    职责覆盖，单列显得重复；
 * 4. fine-tuning 已移出列表（老师反馈个人项目控制在 1-2 个）：LoRA 微调主张
 *    由「专业技能-模型微调与推理」分类与总述承接，仓库仍在 GitHub，被追问时
 *    现场展示即可；
 * 5. name-sprout / bert-encoder / input-method-rnn / word2vec / Page-Marking /
 *    use-command-model / vscode-rule-coverage-viewer 未选：或与 file-wizard
 *    技术形态重复，或为纯前端项目与 Agent 岗位无关，或素材单薄撑不起详写。
 *
 * 两点约定：
 * 1. file-wizard 与 skills 仓库当前为私有（GitHub API 确认 404），不填
 *    githubUrl——简历上挂死链比不挂更糟；若后续开源可补链接；
 * 2. 两个项目均用与 projects.ts 相同的完整结构（name / displayName /
 *    summary / description / primaryLanguage / responsibilities），不再使用
 *    brief 概述条目。
 *
 * 2026-09 新增：AI 实战系列五个 Agent 项目（mcp-servers / debate-agents /
 * multi-tenant-rag / devops-agent / edu-tutor-agent，素材见 docs/项目.md）
 * 以 brief 概述条目追加在列表尾部：不挤占两个详写项目的版面，
 * 但让技能栏里的 MCP / 多 Agent / RAG 隔离 / ReAct 等主张在简历上有实体项目可指，
 * 面试展开时配合 docs/quiz 押题面板准备详版。
 *
 * 事实来源：docs/个人项目分析/file-wizard.md、skills.md，
 * 并已对照本地仓库（~/Desktop/emphasis/file-wizard、skills）源码与
 * git log 复核——skills 仓库在文档生成后已演进（新增 clarify / socratic
 * 等技能与分发 CLI），以仓库现状为准。
 */
import type { Resume } from '../types'

/**
 * 个人实战项目列表（按与 Agent 岗位贴合度排序：MCP 工程、Skills 体系、模型微调）
 */
export const personalProjects: Resume['personalProjects'] = [
  {
    name: 'file-wizard',
    displayName: 'AI 文件整理助手 file-wizard（MCP 工具调用）',
    summary: 'AI 驱动的文件整理 CLI：手写 MCP 客户端协议层 + 六家 AI 提供商统一抽象，把「模型工具调用」做成可复现的工程实现',
    description: '独立设计与实现，两个月 28 次提交持续迭代：按规则或 AI 语义对文件分类、重命名，AI 侧打通「提供商客户端—MCP 工具调用—批量调度」完整链路',
    primaryLanguage: ['TypeScript', 'Node.js', 'MCP', 'commander', 'zod'],
    responsibilities: [
      '【MCP 客户端自研】以 JSON-RPC 2.0 over stdio 手写 MCP 协议层：initialize 握手与能力协商、tools/list 发现与 tools/call 调用、MCP server 进程（如 filesystem server）的拉起与生命周期管理，不依赖重型 SDK，协议细节可控可调',
      '【多提供商统一抽象】设计 Groq / Gemini / DeepSeek / Qwen / OpenRouter / 智谱 六家提供商的统一客户端接口：基类抽象 + 配置化模型参数，切换提供商只需改一行 YAML，密钥全走环境变量零明文',
      '【AI 调用成本与安全】批量处理管线合并文件元数据减少 AI 调用次数以适配免费层限流；dry-run 模拟执行先验后动，配合目录级自定义提示词，解决「AI 误操作不可回滚」与「命名风格不可控」两个落地问题',
      '【配置校验与健壮性】YAML 配置经 zod schema 启动前校验并给出定位错误提示；系统代理自动检测与手动覆盖双通道保障 AI 服务连通；verbose 日志贯穿 MCP 与提供商调用链',
      '【CLI 工程底座】commander + @clack/prompts 双交互模式（命令行 / 向导式），tsdown 打包输出 CLI 与类型声明，vitest 单测保障重构安全网',
    ],
  },
  {
    name: 'skills',
    displayName: 'Agent Skills 体系与跨编辑器分发（skills）',
    summary: '个人 Agent Skills 资产库：9 个手写/生成技能 + 自动检测 20+ AI 客户端的一键分发 CLI，把「上下文工程」沉淀为可复用资产',
    description: '技能随 Claude Code / Qoder / Codex / Cursor / Trae 等日常 AI 工作流长期打磨，与工作履历中「沉淀 Agent Skills 与自定义 Rules 约束 AI 产出」互相印证',
    primaryLanguage: ['TypeScript', 'Markdown', 'Git submodule', 'pnpm'],
    responsibilities: [
      '【技能设计规范】以 AGENTS.md 驱动技能生成流程：只写「代理需要的能力与使用模式」、剔除入门内容与模型已知常识，按 core / features / best-practices / advanced 四级组织，控制上下文占用',
      '【三源维护架构】手写偏好技能、官方文档生成技能（Git submodule 直引上游、随文档更新保持新鲜）、vendor 第三方同步三类来源分策略维护，覆盖 CLI 开发、Python 工程规范、简历诊断、论文解读等场景',
      '【跨客户端分发 CLI】自动检测 20+ AI 编辑器 / CLI 的技能目录，软链接全量对齐 + 删除清理保证多工具间技能一致，提供 --target / --skill / --dry-run / --uninstall 细粒度控制',
    ],
  },
  {
    name: 'fine-tuning',
    displayName: '大模型 LoRA 微调实战（fine-tuning）',
    summary: 'Qwen2.5-Instruct LoRA 微调全流程：从理论到数据准备、训练、推理调优，掌握「仅微调约 0.4% 参数即可接近全量效果」的工程平衡；细节上严格区分训练与推理解码格式、双停止符配置，理解 QLoRA 量化方案在资源受限时如何进一步压缩',
    primaryLanguage: ['Python', 'PEFT / LoRA', 'transformers', 'QLoRA'],
    brief: true,
  },
  {
    name: 'sy-llm',
    displayName: '统一 LLM 调用封装库（sy-llm）',
    summary: '零运行时依赖的 LLM 统一封装：抽象基类支持 Ollama 本地 / DeepSeek 云端一键切换，同步异步双链路复用一份代码；密钥全走环境变量、业务代码零明文，配套标准 src-layout 包工程',
    primaryLanguage: ['Python', '标准库', 'Ollama'],
    brief: true,
  },
  {
    name: 'mcp-servers',
    displayName: 'MCP 工具服务器集合（mcp-servers）',
    summary: '实现文件系统 / SQLite / 企业 API 网关 3 个 MCP 服务器，完整覆盖 tools / resources / prompts 三大原语；内置路径白名单 + 只读模式 + SQL 守卫 + Token 鉴权四道安全防线，解决 LLM 工具接入标准化与数据暴露安全可控问题',
    primaryLanguage: ['Python', 'FastAPI', 'SQLite', 'Docker'],
    brief: true,
  },
  {
    name: 'debate-agents',
    displayName: '辩论式决策多 Agent（debate-agents）',
    summary: '用结构化辩论做决策的多 Agent 系统：正反双方立论-质询-反驳-总结，法官四维加权裁决；双层防共识坍缩 + 三重终止条件，WebSocket 实时可视化辩论过程，解决单 Agent 视角单一、自我确认的问题',
    primaryLanguage: ['Python', 'FastAPI', 'WebSocket'],
    brief: true,
  },
  {
    name: 'multi-tenant-rag',
    displayName: '多租户知识库问答 Agent（multi-tenant-rag）',
    summary: 'SaaS 知识库纵深防御架构：向量库按租户分区物理隔离 + chunk 级 ACL 过滤召回 + 防泄漏后置校验三重防线，配套租户身份网关注入与问答审计计费，确保跨租户数据零泄漏',
    primaryLanguage: ['Java', 'Spring Boot', 'Spring AI', 'Milvus'],
    brief: true,
  },
  {
    name: 'devops-agent',
    displayName: 'DevOps 运维诊断 Agent（devops-agent）',
    summary: '告警接入→证据采集→ReAct 诊断→修复方案 + 风险评估→HITL 安全处置全链路：分级去重聚合收敛告警风暴，规则引擎筛选关键指标，根因准确率实测 92/100，把资深 SRE 人肉排查经验沉淀为可回归的诊断能力',
    primaryLanguage: ['Python', 'FastAPI', 'Prometheus / ELK（接口预留）'],
    brief: true,
  },
  {
    name: 'edu-tutor-agent',
    displayName: '教育个性化辅导 Agent（edu-tutor-agent）',
    summary: '知识点掌握度画像（冷启动先验 + 指数平滑）驱动薄弱点优先选题与动态难度调整，答错苏格拉底式引导防答案泄漏 + 错因三类归因，把「题海战术无差别推送」变成可解释的个性化辅导闭环',
    primaryLanguage: ['Python', 'FastAPI'],
    brief: true,
  },
  // {
  //   name: 'bert-encoder',
  //   displayName: 'BERT 原理实战（bert-encoder）',
  //   summary: 'BERT 原理系统实战：从 Token / Position / Segment 三层 Embedding 与自注意力机制可视化，到「冻结特征提取 vs 全参数微调」的对比，并完成中文六大任务迁移与变体模型选型（RoBERTa / ALBERT / DistilBERT / ELECTRA）',
  //   primaryLanguage: ['Python', 'transformers', 'PyTorch'],
  //   brief: true,
  // },
  // {
  //   name: 'input-method-rnn',
  //   displayName: 'RNN 输入法候选词预测（input-method-rnn）',
  //   summary: '用 vanilla RNN 模拟输入法候选词推荐：jieba 分词 + 词表构建 + 滑动窗口造样本，全管线（数据、训练、评估、推理）可独立运行；Top-1 准确率 0.21、Top-5 0.40',
  //   primaryLanguage: ['Python', 'PyTorch', 'RNN'],
  //   brief: true,
  // },
  // {
  //   name: 'word2vec-recommend-key',
  //   displayName: '搜索关键词推荐（word2vec-recommend-key）',
  //   summary: 'word2vec 词向量相似词扩展驱动的搜索联想系统，工程完整度高：CLI 子命令（train / eval / recommend / check）+ 评测集与指标 + Web 演示，并记录历史输入做个性化推荐',
  //   primaryLanguage: ['Python', 'word2vec', 'CLI'],
  //   brief: true,
  // },
]

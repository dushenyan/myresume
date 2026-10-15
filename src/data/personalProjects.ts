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
 * 3. fine-tuning / sy-llm / bert-encoder / input-method-rnn / word2vec 为
 *    「AI 基础算法与模型侧动手」学习簇：均已按完整结构补 responsibilities，
 *    但统一 showPDF: false——只在开发/在线视图详写作知识储备佐证，不进 PDF、
 *    不占个人项目「1-2 个」额度、不冲淡 file-wizard / skills 的 Agent 主线叙事；
 *    其中 LoRA 微调与统一 LLM 封装主张另由「专业技能-模型微调与推理」分类承接，
 *    被追问时现场演示仓库即可；
 * 4. name-sprout / Page-Marking / use-command-model /
 *    vscode-rule-coverage-viewer 未选：或与 file-wizard
 *    技术形态重复，或为纯前端项目与 Agent 岗位无关，或素材单薄撑不起详写。
 *
 * 两点约定：
 * 1. file-wizard 与 skills 仓库当前为私有（GitHub API 确认 404），不填
 *    githubUrl——简历上挂死链比不挂更糟；若后续开源可补链接；
 * 2. 两个项目均用与 projects.ts 相同的完整结构（name / displayName /
 *    summary / description / primaryLanguage / responsibilities），不再使用
 *    brief 概述条目。
 *
 * 2026-09 变更：AI 实战系列五个 Agent 项目（mcp-servers / debate-agents /
 * multi-tenant-rag / devops-agent / edu-tutor-agent，素材见 docs/项目.md）曾以
 * brief 概述条目挂在本区尾部；因内容分量足、更能支撑 Agent 岗位证据链，
 * 已迁至 projects.ts「项目经历」区按 responsibilities 详写，本区不再保留。
 *
 * 事实来源：docs/个人项目分析/file-wizard.md、skills.md，
 * 并已对照本地仓库（~/Desktop/emphasis/file-wizard、skills）源码与
 * git log 复核——skills 仓库在文档生成后已演进（新增 clarify / socratic
 * 等技能与分发 CLI），以仓库现状为准；
 * fine-tuning / sy-llm / bert-encoder / input-method-rnn / word2vec 学习簇的
 * responsibilities 取材自 docs/cuiqu/ 尚硅谷 NLP、深度学习教程技能萃取（这些
 * 项目即教程配套代码）与 src/data/skills.ts「模型微调与推理」关键词，无独立
 * 项目分析文档，被追问时以本地仓库现场演示为准。
 */
import type { Resume } from '../types'

/**
 * 个人实战项目列表（按与 Agent 岗位贴合度排序：MCP 工程、Skills 体系、模型微调）
 */
export const personalProjects: Resume['personalProjects'] = [
  {
    name: 'file-wizard',
    displayName: 'AI 文件整理助手',
    summary: 'AI 驱动的文件整理 CLI：手写 MCP 客户端协议层 + 多家 AI 提供商统一抽象，把「模型工具调用」做成可复现的工程实现',
    description: '独立设计与实现：按规则或 AI 语义对文件分类、重命名，AI 侧打通「提供商客户端—MCP 工具调用—批量调度」完整链路',
    primaryLanguage: ['TypeScript', 'Node.js', 'MCP', 'commander', 'zod'],
    showPDF: true,
    responsibilities: [
      '【MCP 客户端自研】以 JSON-RPC 2.0 over stdio 手写 MCP 协议层：initialize 握手与能力协商、tools/list 发现与 tools/call 调用、MCP server 进程（如 filesystem server）的拉起与生命周期管理，不依赖重型 SDK，协议细节可控可调',
      '【多提供商统一抽象】设计 Gemini / DeepSeek / Qwen 等多家提供商的统一客户端接口：基类抽象 + 配置化模型参数，切换提供商只需改一行 YAML，密钥全走环境变量零明文',
      '【规则分类引擎】按扩展名 / 日期 / 大小 / 名称多维规则分类，叠加 AI 语义分类与重命名并结合文件内容分析提升归类准确度，原生支持中文文件名；配置文件维护排除（ignore）模式精准筛选待处理文件',
      '【AI 调用成本与安全】批量处理管线合并文件元数据减少 AI 调用次数以适配免费层限流；dry-run 模拟执行先验后动，配合目录级自定义提示词，解决「AI 误操作不可回滚」与「命名风格不可控」两个落地问题',
      // '【配置校验与健壮性】YAML 配置经 zod schema 启动前校验并给出定位错误提示；系统代理自动检测与手动覆盖双通道保障 AI 服务连通；verbose 日志贯穿 MCP 与提供商调用链',
      '【CLI 工程底座】commander + @clack/prompts 双交互模式（命令行 / 向导式），chalk / fs-extra / yaml 支撑终端输出与文件操作，tsdown 打包输出 CLI 与类型声明，vitest 单测保障重构安全网',
      // '【可配置调优项】提供商 / 模型、批量大小与限流、dry-run 与 verbose 开关、目录级自定义提示词、系统 / 手动代理双通道均可经 YAML 配置，改一行即切换后端；-V 版本显示、子命令自定义帮助与 bumpp 一键发布收敛日常操作',
    ],
  },
  {
    name: 'skills',
    displayName: 'Agent Skills 体系与跨编辑器分发',
    summary: '个人 Agent Skills 资产库：9 个技能 + 自动检测 20+ AI 客户端的一键分发 CLI，把「上下文工程」沉淀为可复用资产',
    description: '技能随 Claude Code / Qoder / Codex / Cursor / Trae 等日常 AI 工作流长期打磨，与工作履历中「沉淀 Agent Skills 与自定义 Rules 约束 AI 产出」互相印证',
    primaryLanguage: ['TypeScript', 'Markdown', 'Git submodule', 'pnpm'],
    responsibilities: [
      '【技能设计规范】以 AGENTS.md 驱动技能生成流程：只写「代理需要的能力与使用模式」、剔除入门内容与模型已知常识，按 core / features / best-practices / advanced 四级组织，控制上下文占用',
      '【三源维护架构】手写偏好技能（shenyan）、官方文档生成技能（Git submodule 直引 vue / vite / pnpm 上游、随文档更新保持新鲜）、vendor 第三方同步（tsdown / turborepo）三类来源分策略维护，覆盖 CLI 开发、包管理、简历诊断、论文解读等场景',
      '【跨客户端分发 CLI】自动检测 20+ AI 编辑器 / CLI 的技能目录，软链接全量对齐 + 删除清理保证多工具间技能一致，提供 --target（指定客户端）/ --skill（选技能子集）/ --dry-run（预览不写入）/ --uninstall（一键回滚）细粒度调优，按需引入以规避上下文窗口超限',
      '【自动化工作流】init / sync / cleanup 子命令（基于 degit + tsx）编排子模块克隆与第三方技能同步，meta.ts 集中声明 submodule URL、技能映射与重命名策略，一条命令保持全库与上游新鲜',
    ],
    showPDF: false
  },
  {
    name: 'fine-tuning',
    displayName: '基于AutoDL端 Qwen微调 LoRA 实战',
    summary: 'Qwen2.5-Instruct LoRA 微调全流程：从理论到数据准备、训练、推理调优，掌握「仅微调约 0.4% 参数即可接近全量效果」的工程平衡；细节上严格区分训练与推理解码格式、双停止符配置，理解 QLoRA 量化方案在资源受限时如何进一步压缩',
    primaryLanguage: ['Python', 'PEFT / LoRA', 'transformers', 'QLoRA'],
    responsibilities: [
      '【数据准备与格式对齐】整理指令数据集并转成 ChatML 对话格式，用 loss mask 只对 assistant 回复段计算损失，避免 prompt 部分污染训练信号',
      '【LoRA 训练配置】基于 PEFT 注入低秩适配器（仅约 0.4% 参数可训练），对比 rank / alpha / dropout 与目标模块（q_proj / v_proj 等）对收敛与显存的影响，在消费级单卡跑通 Qwen2.5-Instruct 微调',
      '【训练与推理解码一致性】严格区分训练拼接格式与推理 generate 模板，配置双停止符（EOS + 自定义 stop token）防越界续写，调优 temperature / top_p 平衡稳定性与多样性',
      '【QLoRA 资源优化】掌握 QLoRA 4bit 量化 + LoRA 组合在显存受限时如何进一步压缩，理解 offline / online 量化与 paged optimizer 的取舍',
    ],
    showPDF: true
  },
  {
    name: 'sy-llm',
    displayName: '统一 LLM 调用封装库',
    summary: '零运行时依赖的 LLM 统一封装：抽象基类支持 Ollama 本地 / DeepSeek 云端一键切换，同步异步双链路复用一份代码；密钥全走环境变量、业务代码零明文，配套标准 src-layout 包工程',
    primaryLanguage: ['Python', '标准库', 'Ollama'],
    showPDF: false,
    responsibilities: [
      '【统一抽象基类】以抽象基类定义 chat / embed 接口，子类分别对接 Ollama 本地与 DeepSeek 云端，业务层只依赖接口、换后端一行配置即可',
      '【同步异步双链路】同一套协议适配同时提供同步与异步客户端，复用请求构造与响应解析逻辑，避免两份代码漂移',
      '【零依赖与密钥安全】仅用 Python 标准库实现 HTTP 与流式解析、无第三方运行时依赖；API Key 全走环境变量，业务代码零明文',
      '【包工程规范】采用标准 src-layout 打包，配 pyproject 元数据，可 pip install -e 本地安装与最小示例验证',
    ],
  },
  {
    name: 'input-method-rnn',
    displayName: 'RNN 输入法候选词预测',
    summary: '用 vanilla RNN 模拟输入法候选词推荐：jieba 分词 + 词表构建 + 滑动窗口造样本，全管线（数据、训练、评估、推理）可独立运行；Top-1 准确率 0.21、Top-5 0.40',
    primaryLanguage: ['Python', 'PyTorch', 'RNN'],
    showPDF: false,
    responsibilities: [
      '【语料与词表构建】jieba 分词清洗中文语料，统计词频构建词表并完成「词 ↔ ID」编码，用滑动窗口从上文构造（输入序列 → 目标词）训练样本',
      '【RNN 建模与训练】用 vanilla RNN 做 many-to-one 序列建模，末位隐藏状态接 softmax 输出候选词概率；封装 JSONL Dataset + DataLoader + 训练循环，全链路可复现',
      '【候选预测与评估】实现批量 Top-K（top-5）候选预测与单条交互推理接口，在测试集上度量 Top-1 0.21 / Top-5 0.40，并复盘梯度消失对长上文建模的限制',
    ],
  },
  {
    name: 'word2vec-recommend-key',
    displayName: '搜索关键词推荐',
    summary: 'word2vec 词向量相似词扩展驱动的搜索联想系统，工程完整度高：CLI 子命令（train / eval / recommend / check）+ 评测集与指标 + Web 演示，并记录历史输入做个性化推荐',
    primaryLanguage: ['Python', 'word2vec', 'CLI'],
    showPDF: false,
    responsibilities: [
      '【词向量训练与加载】用 Gensim 在领域语料自训练 Word2Vec（CBOW / Skip-gram），并加载公开大规模词向量（如 sgns.weibo 19.5 万词 / 300 维）做冷启动，理解分布假设与负采样',
      '【相似词扩展驱动的搜索联想】以 most_similar() 做关键词语义扩展，把用户输入映射到相近词再召回，构成搜索 / 推荐联想链路',
      '【工程完整度】CLI 拆分 train / eval / recommend / check 子命令，配套评测集与命中率指标 + Web 演示，并记录用户历史输入做个性化加权',
    ],
  },
  {
    name: 'bert-encoder',
    displayName: 'BERT 原理实战（bert-encoder）',
    summary: 'BERT 原理系统实战：从 Token / Position / Segment 三层 Embedding 与自注意力机制可视化，到「冻结特征提取 vs 全参数微调」的对比，并完成中文六大任务迁移与变体模型选型（RoBERTa / ALBERT / DistilBERT / ELECTRA）',
    primaryLanguage: ['Python', 'transformers', 'PyTorch'],
    showPDF: false,
    responsibilities: [
      '【输入表示可视化】拆解 Token / Position / Segment 三层 Embedding 相加构成模型输入的过程，用 bert-base-chinese 演示 WordPiece 分词与 [CLS] / [SEP] 子词编码',
      '【自注意力机制剖析】手动计算缩放点积注意力并可视化注意力权重矩阵，理解 Q / K / V 投影、多头注意力与双向 / 因果掩码的区别',
      '【冻结 vs 全参微调对比】对比「冻结 BERT 取句向量接分类头」与「端到端全参数微调」两条路线的算力开销与效果，落地低资源场景的选型判断',
      '【中文六大任务迁移】用 BertForXxx 任务头完成文本分类 / NER / 句对分类 / QA 等下游任务，并按场景在 RoBERTa / ALBERT / DistilBERT / ELECTRA 变体间选型',
    ]
  },
]

/**
 * 简历个人项目模块（能力广度佐证）
 *
 * 这份简历里项目经历的主证据链已迁移至 projects.ts：FAQ 智能问答平台、
 * 政务 RAG、多 Agent 深度研究助手、意图识别共 4 项作为「AI 主线」详写，
 * 与业务项目一起形成统一的「项目经历」板块，避免主证据链分散在两栏造成
 * 阅读断裂。
 *
 * 本文件当前仅承载「能力广度佐证」的 5 个一句话概述项目（全部 brief: true）：
 * LoRA 微调、sy-llm、bert-encoder、input-method-rnn、word2vec-recommend-key。
 * 这些条目覆盖「模型微调 / LLM 封装 / Transformer / RNN / 词向量」等基础
 * 技术栈，不展开职责，用于补全技能图谱的横向宽度。
 *
 * 两点约定：
 * 1. 全部为本地实战项目、未开源，因此不填 githubUrl——简历上挂死链比不挂更糟；
 * 2. 概述型条目标记 brief: true，模板据此在打印时渲染 summary 并隐藏职责列表，
 *    保证同一份内容在 HTML 与 PDF 里都可见、且不重复。
 */
import type { Resume } from '../types'

/**
 * 个人实战项目列表（能力广度佐证，按技术栈由上到下递进：微调、LLM 封装、
 * Transformer、RNN、词向量）
 */
export const personalProjects: Resume['personalProjects'] = [
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

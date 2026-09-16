/**
 * 简历兴趣方向模块
 *
 * 单独维护兴趣列表：兴趣反映个人技术倾向与职业规划，
 * 独立成文件便于根据投递岗位动态调整。
 */
import type { Resume } from '../types'

/**
 * 技术兴趣方向（与中级 Agent 开发岗位指向保持一致，覆盖底层原理 → 框架 → 平台 → 部署）
 */
export const interests: Resume['interests'] = [
  '大模型应用与多 Agent 编排',
  'RAG 检索质量与召回评测',
  'Coze / Dify 智能体平台与代码节点',
  'LangChain 全栈（LCEL / Memory / Tools）',
  '深度学习底层原理与 PyTorch 工程化',
  'Transformer / BERT / Hugging Face 生态',
  'AI 私有化部署（Docker / XInference / AutoDL）',
  'MCP 工具生态与 AI 辅助研发',
]

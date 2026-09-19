/**
 * 简历兴趣方向模块
 *
 * 单独维护兴趣列表：兴趣反映个人技术倾向与职业规划，
 * 独立成文件便于根据投递岗位动态调整。
 */
import type { Resume } from '../types'

/**
 * 技术兴趣方向
 *
 * 招聘官视角：兴趣区若复读技能栏关键词会被判定为堆砌，因此这里只写
 * 「技能栏之外、能体现持续投入」的行为化兴趣，与博客 / GitHub 可互相印证。
 */
export const interests: Resume['interests'] = [
  '技术写作与博客长期更新（求职向沉淀 + 论文解读）',
  '开源工具与 MCP 生态试用收集',
  'AI 编码工作流折腾与效率实验',
  '前端工程史与交互设计拆解',
  '大模型应用与多 Agent 编排',
  'RAG 检索质量与召回评测',
  'Coze / Dify 智能体平台与代码节点',
  'LangChain 全栈（LCEL / Memory / Tools）',
  '深度学习底层原理与 PyTorch 工程化',
  'Transformer / BERT / Hugging Face 生态',
  'AI 私有化部署（Docker / XInference / AutoDL）',
  'MCP 工具生态与 AI 辅助研发',
]

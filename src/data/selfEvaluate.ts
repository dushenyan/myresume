/**
 * 简历自我评价模块
 *
 * 独立维护自我评价：这部分内容直接影响 HR 第一印象，
 * 单独成文件便于针对不同岗位 JD 快速迭代话术。
 */
import type { Resume } from '../types'

/**
 * 自我评价条目
 */
export const selfEvaluate: Resume['selfEvaluate'] = [
  '6年前端开发经验，政务数字化与企业SaaS方向，近年聚焦 AI 应用开发与 AI 辅助研发工作流',
  '熟练运用 Cursor / Trae / OpenClaw / Codex 等 AI 工具，编写 Agent Skills 与自定义 Rules 沉淀可复用的 AI 开发规范',
  '具备多 AI 提供商（Groq/DeepSeek/Gemini/Qwen）集成与 MCP 协议开发经验，独立落地 file-wizard 等 AI 工具与 Agent Skills 集合',
  '精通Vue3技术栈与微前端架构，主导的营商数据大屏项目获海南省数据应用创新奖',
  '注重工程化与代码质量，自研脚手架和组件库，推动团队技术栈升级与自动化流程',
]

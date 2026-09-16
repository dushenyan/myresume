/**
 * 简历基本信息模块
 *
 * 将个人信息从主数据源中拆出独立维护：
 * 个人信息更新频率较高（头像、联系方式、社交账号等），独立成文件便于定位修改，
 * 也避免在编辑联系方式时误触项目经历等业务数据。
 */
import type { Resume } from '../types'

/**
 * 个人基本信息（姓名、联系方式、社交账号、个人简介等）
 */
export const basicInfo: Resume['basics'] = {
  name: '杜审言',
  picture: 'https://avatars.githubusercontent.com/u/63347504',
  label: '前端开发工程师 / AI 应用开发',
  headline: '6年前端开发经验 | AI 应用开发 & MCP / Agent 工程化 | Vue3 技术专家',
  summary: '6年前端开发经验，专注政务数字化与企业级SaaS，近年深入 AI 辅助研发与 AI 应用工程化。\n'
    + '\n'
    + '核心优势：\n'
    + '• 熟练运用 Cursor / Trae / OpenClaw / Codex 等 AI 编码工具，通过 Agent Skills 与自定义 Rules 规范 AI 开发流程\n'
    + '• 落地多个 AI 应用：多 AI 提供商集成（Groq/DeepSeek/Gemini/Qwen）、MCP 服务端开发、Agent Skills 工程化\n'
    + '• 精通Vue3技术栈，主导政府密码云平台（等保三级）、营商数据大屏（省级获奖）等核心项目\n'
    + '• 自研CLI脚手架与组件库，具备从0到1的工程化架构能力',
  website: 'https://duhenyanblog.netlify.app/',
  address: '海南 海口',
  projects_url: 'https://github.com/dushenyan',
  image_avatar: 'https://avatars.githubusercontent.com/u/63347504',
  username: 'dushenyan',
  email: 'shenyandu@qq.com',
  html_title: '杜审言-前端-AI应用',
  languages: '中文',
  phone: '18379514819',
  wechat: 'Sy508080',
  profiles: [
    {
      network: 'GitHub',
      url: 'https://github.com/dushenyan',
      username: 'dushenyan',
    },
    {
      network: 'Website',
      username: 'dushenyan',
      url: 'https://duhenyanblog.netlify.app/',
    },
    {
      network: 'Knowledge',
      url: 'https://mainsibaodian.netlify.app/',
      username: 'dushenyan',
    },
  ],
}

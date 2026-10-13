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
  name: '杜省严',
  // 头像走仓库内本地文件：渲染时由 transform 内联成 data URI，不依赖外网头像域
  picture: 'assets/images/avatar.jpg',
  label: '前端开发工程师 / AI 应用开发',
  headline: '5年前端开发经验 | Vue3 技术专家 · 微前端 · 数据可视化 | AI 应用开发 & MCP / Agent 工程化',
  // 参照 data 的写法：按招聘官 6 秒扫描写——首句即定位（年限+成长轨迹+差异化主张），
  // 四条核心优势每条只留「能力 + 一个锚点」，细节全部留给项目区展开；
  // 个人特点聚焦「前端 × AI 双轨」：不是只会用 AI 写代码，而是能把 AI 能力做成业务系统里的产品模块
  summary: '5 年前端经验，从前端开发成长到技术负责人，交付政务数字化与企业级 SaaS 产品；「前端工程 + AI 应用」双轨实践者——既能扛起前端架构与疑难攻坚，也能把 AI 能力作为产品模块落地进业务系统。\n'
    + '\n'
    + '核心优势：\n'
    + '• 前端纵深：精通 Vue3 技术栈与微前端架构，主导政府密码云平台（等保三级、10万+ 日活、首屏 5s→1.2s）与营商数据大屏（海南省数据应用创新奖、百万级数据实时渲染）\n'
    + '• AI 应用落地：集成多 AI 提供商（Groq/DeepSeek/Gemini/Qwen），自研 MCP 服务端并落地文件整理工具 file-wizard，独立交付 AI 工具产品\n'
    + '• AI 研发效能：熟练运用 Cursor / Trae / OpenClaw / Codex，通过 Agent Skills 与自定义 Rules 建立可复用的 AI 开发工作流并在团队推广\n'
    + '• 工程化架构：自研 liuyun-cli 脚手架与 liuyun-ui 组件库，主导 Vue2→Vue3+TS 技术栈升级，团队开发效率提升 50%',
  website: 'https://duhenyanblog.netlify.app/',
  address: '海南 海口',
  projects_url: 'https://github.com/dushenyan',
  image_avatar: 'https://avatars.githubusercontent.com/u/63347504',
  username: 'dushenyan',
  email: 'dushenyan88@gmail.com',
  html_title: '杜省严-前端-AI应用',
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

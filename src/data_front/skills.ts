/**
 * 简历技能模块
 *
 * 技能按分类组织，单独维护便于定期复核：
 * 技能列表会随技术栈迭代更新，独立成文件可在新增技术时不必浏览整份简历，
 * 也便于对照 JD 调整关键词顺序。
 *
 * 参照 data 的约束：关键词只保留能在项目里指到具体实现的条目——
 * 面试官对着技能栏追问时，每一条都应能落到某段代码上。
 *
 * 背书映射：
 * - MCP / Agent Skills / 多提供商集成 → 个人项目 file-wizard、skills
 * - 微前端 / 性能优化 / 安全合规 → 政府密码云服务平台
 * - WebGL / Three.js / 大屏适配 / 实时数据 → 营商数据大屏（省级获奖）
 * - liuyun-cli / liuyun-ui → 工作经历与同名项目条目
 * - Vue 2/3（深入源码）无项目级输出，被追问时以源码级原理解答自证。
 */
import type { Resume } from '../types'

/**
 * 技能分类列表
 *
 * 排序按前端 × AI 双轨岗位的 JD 关注度排：AI 应用开发置顶命中差异化卖点，
 * 其余按核心语言 → 框架 → 工程化 → 性能 → 可视化 → 质量收尾，
 * 保证从上往下扫时先命中岗位核心关键词。
 */
export const skills: Resume['skills'] = [
  {
    category: 'AI 应用开发',
    keywords: [
      'Cursor',
      'Trae',
      'OpenClaw',
      'Codex',
      'MCP（Model Context Protocol）',
      'Agent Skills 编写',
      '自定义 Rules',
      'Prompt Engineering',
      'Groq / DeepSeek / Gemini / Qwen',
    ],
  },
  {
    category: '核心语言',
    keywords: [
      'JavaScript / TypeScript',
      'ES6+',
      'Node.js',
      'HTML5语义化',
      'CSS3 / Less',
      '响应式设计',
    ],
  },
  {
    category: '框架生态',
    keywords: [
      'Vue 2/3（深入源码）',
      'React（项目实践）',
      'Vuex / Pinia',
      'Vue Router / React Router',
      'Nuxt.js',
      'uni-app',
    ],
  },
  {
    category: '工程化',
    keywords: [
      'Webpack 5',
      'Vite',
      'Rollup',
      'Monorepo（pnpm workspace）',
      'CI/CD',
      'liuyun-cli（自研脚手架）',
      'liuyun-ui（自研组件库）',
    ],
  },
  {
    category: '性能优化',
    keywords: [
      'Web Vitals优化',
      '首屏加载优化',
      '渲染性能（Canvas / WebGL）',
      '微前端（qiankun / Module Federation）',
      '虚拟滚动',
      'Service Worker缓存策略',
    ],
  },
  {
    category: '数据可视化',
    keywords: [
      'ECharts 5',
      'D3.js',
      'WebGL / Three.js',
      '大屏适配（vw方案）',
      '实时数据（WebSocket）',
      '大数据渲染优化',
    ],
  },
  {
    category: '测试与质量',
    keywords: [
      'Vitest',
      'ESLint / Prettier / Husky',
      'TypeScript类型系统',
      'Code Review',
    ],
  },
]

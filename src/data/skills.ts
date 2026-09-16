/**
 * 简历技能模块
 *
 * 技能按分类组织，单独维护便于定期复核：
 * 技能列表会随技术栈迭代更新，独立成文件可在新增技术时不必浏览整份简历，
 * 也便于对照 JD 调整关键词顺序。
 */
import type { Resume } from '../types'

/**
 * 技能分类列表（AI 应用开发置顶，其余按核心 → 工程化顺序排列）
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

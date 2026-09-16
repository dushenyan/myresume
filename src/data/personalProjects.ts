/**
 * 简历个人项目模块
 *
 * 个人开源项目独立成文件：与公司业务项目区分维护，
 * 便于在投递不同岗位时按需调整展示顺序或隐藏部分项目。
 */
import type { Resume } from '../types'

/**
 * 个人开源项目列表
 */
export const personalProjects: Resume['personalProjects'] = [
  {
    name: 'file-wizard',
    displayName: 'file-wizard（文件魔法师）',
    summary: 'AI 驱动的文件整理 CLI 工具，支持多 AI 提供商、MCP 协议集成与交互式 UI',
    primaryLanguage: ['TypeScript', 'Node.js', 'MCP', 'Commander', 'Groq / DeepSeek / Qwen / Gemini'],
    githubUrl: 'https://github.com/dushenyan/file-wizard',
    description: '使用 Cursor + Trae 辅助开发，集成 MCP（Model Context Protocol）协议，支持 6 种主流 AI 提供商，实现智能文件分类、批量重命名与内容分析',
    responsibilities: [
      '【AI 集成】统一封装 Groq、DeepSeek、Qwen、Gemini、OpenRouter、智谱 AI 等多提供商客户端，支持配置化切换',
      '【MCP 协议】实现 MCP 服务端，暴露文件元数据提取与内容分析工具，供 AI 代理调用',
      '【CLI 设计】基于 Commander + @clack/prompts 实现交互式命令行，支持 dry-run 安全预览',
      '【工程化】tsdown 打包，vitest 单元测试，自定义 Agent Skills 与 rules 规范 AI 开发流程',
    ],
  },
  {
    name: 'skills',
    displayName: 'skills（Agent Skills 集合）',
    summary: '精心策划的 Agent Skills 集合，反映个人偏好、经验与最佳实践，供 AI 代理按需引用',
    primaryLanguage: ['TypeScript', 'Markdown', 'pnpm workspace', 'Git submodule'],
    githubUrl: 'https://github.com/dushenyan/skills',
    description: '使用 Trae + OpenClaw 辅助开发，通过 Git 子模块引用 Vue / Vite / pnpm 等官方文档，自动生成并同步 Agent Skills，配套自定义 rules 规范 AI 代理行为',
    responsibilities: [
      '【技能管理】三层来源架构：手写个人偏好技能、从官方文档生成技能、从第三方同步技能（tsdown / turborepo）',
      '【自动化】CLI 工具支持子模块初始化、技能同步与清理，Git 子模块保持与上游文档同步',
      '【AI 工作流】编写自定义 rules 和 AGENTS.md，规范 AI 代理的代码生成行为与最佳实践',
    ],
  },
]

/**
 * 简历工作经历模块
 *
 * 工作经历按公司维度拆分独立维护：每段经历的 highlights 较多，
 * 单独成文件可在准备面试讲述时快速定位某家公司的关键产出。
 *
 * 排序说明：同一段经历按「与 AI Agent 岗位的距离」重排讲法——知识库与检索、
 * AI 研发效能排在架构与性能之前，内容均为既有事实的重新编排，未新增事实。
 */
import type { Resume } from '../types'

/**
 * 工作经历列表（按时间倒序）
 */
export const work: Resume['work'] = [
  {
    company: '海南流云科技有限公司',
    companyInfo: '（政务数字化服务商 | 海南省重点软件企业）',
    position: '前端开发工程师 / 技术负责人',
    website: 'http://www.hainanbi.com/',
    location: '海南海口',
    isCurrentRole: true,
    startDate: '2022-07-01',
    endDate: '',
    description: '负责政务数字化核心产品的架构设计与交付，主导团队从纯前端向「前端 + AI 应用」双轨能力转型：业务侧落地知识库与智能检索产品，研发侧引入 AI 编码工具与 Skills/Rules 体系',
    highlights: [
      '【AI 研发效能】在项目中引入 Cursor / Trae 等 AI 编码工具，沉淀 Agent Skills 与自定义 Rules 约束 AI 生成代码的规范与边界，统一项目初始化流程与代码风格',
      '【架构与工程化】主导 Vue2 至 Vue3 + TS 技术栈升级并建立统一组件库（liuyun-ui），开发效率提升 50%；自研 liuyun-cli 脚手架统一项目初始化流程，为后续 AI 应用集成统一脚手架基线',
      '【团队建设】带领 5 人前端团队，建立 Code Review 与自动化测试流程，代码质量问题减少 60%；牵头团队每周 AI 技术分享，推动团队整体向 AI 应用方向转型',
    ],
  },
  {
    company: '江西蓝源科技有限公司',
    position: '前端开发工程师 / 技术骨干',
    website: 'http://blueorigintech.com/',
    location: '江西南昌',
    summary: '产品研发与工程架构部',
    startDate: '2018-12-01',
    endDate: '2022-07-01',
    description: '负责公司核心产品的前端开发与性能优化，参与技术方案设计与评审，推动工程规范建设',
    highlights: [
      '【数据可视化】优化大型数据可视化组件，以 Canvas 替代 SVG，数据渲染速度提升 200%',
      '【规范建设】建立前端开发规范与代码评审流程，推动 ESLint + Prettier 统一代码风格，输出 10+ 篇技术文档',
    ],
  },
]

/**
 * 简历工作经历模块
 *
 * 工作经历按公司维度拆分独立维护：每段经历的 highlights 较多，
 * 单独成文件可在准备面试讲述时快速定位某家公司的关键产出。
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
    description: '负责政务数字化核心产品的前端架构设计与开发，推动技术栈升级和工程化建设',
    highlights: [
      '【架构升级】主导Vue2→Vue3+TS技术栈升级，建立统一组件库（liuyun-ui），开发效率提升50%，发布周期从3天缩短至1天',
      '【工程化】自研liuyun-cli脚手架工具，统一项目初始化流程；设计微前端架构，支持多子应用独立开发部署，系统解耦度提升40%',
      '【性能优化】优化政府密码云平台首屏加载，从5s降至1.2s（↑76%），支持10万+日活稳定运行',
      '【安全合规】主导前端安全加固（XSS/CSRF防护、敏感数据加密），通过等保三级认证',
      '【团队建设】带领5人前端团队，建立Code Review和自动化测试流程，代码质量问题减少60%',
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
    description: '负责公司核心产品的前端开发与优化，参与技术方案设计与评审，推动前端工程化建设与性能优化',
    highlights: [
      '【核心产品】开发低代码/无代码平台的市场展示网站，包含文档站点、演示环境与编码 playground',
      '【性能优化】优化大型数据可视化组件，使用Canvas替代SVG，数据渲染速度提升200%',
      '【规范建设】建立前端开发规范与代码评审流程，推动ESLint+Prettier统一代码风格，代码质量问题减少60%',
      '【技术分享】参与团队培训和知识分享，输出10+篇技术文档，提升团队整体技术水平',
    ],
  },
]

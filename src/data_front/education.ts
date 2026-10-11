/**
 * 简历教育经历模块
 *
 * 单独维护教育背景：教育经历变更频率最低，
 * 独立成文件可避免在编辑高频变动的项目经历时误改教育信息。
 */
import type { Resume } from '../types'

/**
 * 教育与持续学习经历
 *
 * 参照 data 的处理：学历条目不隐藏学校与专业，但去掉 studyType「专科」标签；
 * 自学板块不强调「自学」来源，改以通用领域表述记录体系补齐，
 * 与求职方向（前端 × AI 双轨）形成呼应——只强调覆盖范围。
 */
export const education: Resume['education'] = [
  {
    institution: '江西交通职业技术学院',
    area: '计算机网络技术',
    department: '信息工程系',
    // studyType: '专科',
    startDate: '2018-09-01',
    endDate: '2021-06-01',
    description: '主修课程：计算机网络、Web前端开发、数据库原理、软件工程等',
    activities: '担任技术社团负责人，组织多次技术分享与实践活动',
    courses: ['计算机网络', '数据库原理', 'Web前端开发', '软件工程'],
  },
  {
    institution: '前端与 AI 工程体系',
    area: '前端架构 · 性能优化 · AI 应用开发',
    studyType: '体系化学习',
    startDate: '2021-06-01',
    endDate: '',
    description: '按「框架源码、架构实践、AI 工程化」三阶持续补齐前端纵深与 AI 应用落地两条链路',
  },
]

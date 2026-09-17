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
 * 学历条目不变；自学板块以通用领域表述记录四块体系补齐，
 * 与求职方向（中级 Agent 开发）形成呼应——不强调来源，只强调覆盖范围。
 */
export const education: Resume['education'] = [
  {
    institution: '江西交通职业技术学院',
    area: '计算机网络技术',
    department: '信息工程系',
    studyType: '专科',
    startDate: '2018-09-01',
    endDate: '2021-06-01',
    description: '主修课程：计算机网络、Web前端开发、数据库原理、软件工程等',
    activities: '担任技术社团负责人，组织多次技术分享与实践活动',
    courses: ['计算机网络', '数据库原理', 'Web前端开发', '软件工程'],
  },
  {
    institution: '大模型应用体系（自学）',
    area: '深度学习 · NLP · LangChain · 智能体工程',
    studyType: '体系化学习',
    startDate: '2024-01-01',
    endDate: '',
    description: '按「底层原理、工程框架、平台交付」三阶系统补齐大模型应用链路，全部配套代码已落地为简历项目区 9 个 AI 项目',
  },
]

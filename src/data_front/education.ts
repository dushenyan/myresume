/**
 * 简历教育经历模块
 *
 * 单独维护教育背景：教育经历变更频率最低，
 * 独立成文件可避免在编辑高频变动的项目经历时误改教育信息。
 */
import type { Resume } from '../types'

/**
 * 教育与持续学习经历
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
    courses: ['Web前端开发', 'JavaScript编程', '计算机网络', '数据库原理'],
  },
  {
    institution: '自学与在线课程',
    area: '前端架构与性能优化',
    studyType: '持续学习',
    startDate: '2021-06-01',
    endDate: '',
    description: '持续学习前沿前端技术与架构实践，参与多个在线课程与技术社区交流',
    courses: ['前端架构设计与实践', '大型应用性能优化策略', '微前端架构与实践', 'TypeScript编程'],
  },
]

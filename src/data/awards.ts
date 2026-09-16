/**
 * 简历奖项模块
 *
 * 独立维护奖项数据：奖项是简历的亮点信息，集中放置便于在面试前快速回顾和强调。
 */
import type { Resume } from '../types'

/**
 * 获奖记录列表
 */
export const awards: Resume['awards'] = [
  {
    title: '海南省数据应用创新奖',
    summary: '海南营商数据大屏项目',
    awarder: '海南省大数据管理局',
    date: '2023-10',
  },
  {
    title: '公司年度优秀技术负责人',
    summary: '技术创新与团队建设突出',
    awarder: '海南流云科技有限公司',
    date: '2023-01-01',
  },
]

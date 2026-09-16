/**
 * 简历兴趣方向模块
 *
 * 单独维护兴趣列表：兴趣反映个人技术倾向与职业规划，
 * 独立成文件便于根据投递岗位动态调整。
 */
import type { Resume } from '../types'

/**
 * 技术兴趣方向
 */
export const interests: Resume['interests'] = [
  '前端架构与工程化',
  'Web性能优化',
  '微前端与模块化开发',
  '技术团队管理与人才培养',
  '开源贡献与技术社区',
]

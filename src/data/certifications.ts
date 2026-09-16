/**
 * 简历认证模块
 *
 * 单独维护认证信息：认证条目通常随职业发展周期性新增，
 * 独立成文件可在新增认证时不必滚动浏览整份简历数据。
 */
import type { Resume } from '../types'

/**
 * 职业认证列表
 */
export const certifications: Resume['certifications'] = [
  {
    name: '软件设计师（中级）',
    issuer: '海南省人力资源和社会保障厅',
    date: '2025-05-26',
  },
]

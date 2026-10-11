/**
 * 简历认证模块
 *
 * 单独维护认证信息：认证条目通常随职业发展周期性新增，
 * 独立成文件可在新增认证时不必滚动浏览整份简历数据。
 */
import type { Resume } from '../types'

/**
 * 职业认证列表
 *
 * 参照 data 的取舍：仅保留国家职业资格证书，在线课程结业证书不进入认证板块——
 * 学习成果通过 education.ts 的体系化学习条目与项目经历体现。
 */
export const certifications: Resume['certifications'] = [
  {
    name: '软件设计师（中级）',
    issuer: '海南省人力资源和社会保障厅',
    date: '2025-05-26',
  },
]

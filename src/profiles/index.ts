import type { ResumeProfile } from './types'
import { socialProfile } from './social'

/**
 * 简历配置注册表
 *
 * 新增一份简历：创建 src/profiles/<id>.ts（实现 ResumeProfile 接口），
 * 再加入此数组即可，generate / build 会自动为它多产出一份 JSON、HTML 与 PDF。
 */
export const profiles: ResumeProfile[] = [
  socialProfile,
]

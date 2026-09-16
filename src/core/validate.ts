import type { Resume } from '../types'

/**
 * 校验简历数据完整性，返回错误列表（空数组 = 通过）
 */
export function validateResume(resume: Resume): string[] {
  const errors: string[] = []
  const { basics } = resume

  if (!basics.name)
    errors.push('基本信息缺少姓名')
  if (!basics.label)
    errors.push('基本信息缺少职位标签')
  if (!basics.summary)
    errors.push('基本信息缺少个人简介')

  resume.work?.forEach((work, index) => {
    if (!work.company)
      errors.push(`工作经历[${index}]缺少公司名称`)
    if (!work.position)
      errors.push(`工作经历[${index}]缺少职位`)
  })

  resume.education?.forEach((education, index) => {
    if (!education.institution)
      errors.push(`教育经历[${index}]缺少学校名称`)
    if (!education.area)
      errors.push(`教育经历[${index}]缺少专业领域`)
  })

  resume.skills?.forEach((skill, index) => {
    if (!skill.category)
      errors.push(`技能[${index}]缺少名称`)
  })

  resume.projects?.forEach((project, index) => {
    if (!project.name)
      errors.push(`项目[${index}]缺少名称`)
  })

  return errors
}

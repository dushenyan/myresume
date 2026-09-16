import type { Resume } from '../types'
import gravatar from 'gravatar'
import moment from 'moment'

const DATE_FORMAT = 'YYYY.MM'

/**
 * 工作时长的人性化描述（在职时按年月展示，刚入职时按天展示）
 */
function humanizeDuration(duration: moment.Duration, didLeaveCompany: boolean): string {
  const months = duration.months()
  const years = duration.years()
  const monthStr = months > 1 ? 'months' : 'month'
  const yearStr = years > 1 ? 'years' : 'year'

  if (months && years)
    return `${years} ${yearStr} ${months} ${monthStr}`

  if (months)
    return `${months} ${monthStr}`

  if (years)
    return `${years} ${yearStr}`

  if (didLeaveCompany) {
    const days = duration.days()
    return days > 1 ? `${days} days` : `${days} day`
  }

  return 'Recently joined'
}

/**
 * 格式化工作经历的起止日期，并计算工作时长（endDate 为空表示在职，计算到现在）
 */
function formatWorkDates(work: NonNullable<Resume['work']>): void {
  work.forEach((workInfo) => {
    const startDate = workInfo.startDate ? new Date(workInfo.startDate) : undefined
    const endDate = workInfo.endDate ? new Date(workInfo.endDate) : undefined

    if (startDate)
      workInfo.startDate = moment(startDate).format(DATE_FORMAT)

    if (endDate)
      workInfo.endDate = moment(endDate).format(DATE_FORMAT)

    if (startDate) {
      workInfo.duration = humanizeDuration(
        moment.duration((endDate ?? new Date()).getTime() - startDate.getTime()),
        !!endDate,
      )
    }
  })
}

/**
 * 格式化教育经历的起止日期
 */
function formatEducationDates(education: NonNullable<Resume['education']>): void {
  education.forEach((item) => {
    for (const field of ['startDate', 'endDate'] as const) {
      const value = item[field]
      if (value)
        item[field] = moment(new Date(value)).format(DATE_FORMAT)
    }
  })
}

/**
 * 头像兜底：未配置头像时用邮箱生成 gravatar
 */
function applyGravatarPicture(resume: Resume): void {
  if (resume.basics.email && !resume.basics.picture) {
    resume.basics.picture = gravatar.url(resume.basics.email.replace('(at)', '@'), {
      s: '100',
      r: 'pg',
      d: 'mm',
    })
  }
}

/**
 * 模板渲染前的数据加工：日期格式化、工作时长计算、头像兜底。
 * 直接原地修改传入的简历对象。
 */
export function applyResumeTransforms(resume: Resume): void {
  applyGravatarPicture(resume)

  if (resume.work)
    formatWorkDates(resume.work)

  if (resume.education)
    formatEducationDates(resume.education)
}

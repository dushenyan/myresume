import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import gravatar from 'gravatar'
import moment from 'moment'

const DATE_FORMAT = 'YYYY.MM'

/** 头像内联时用到的 MIME（只支持简历会用到的几种图片格式） */
const IMAGE_MIME: Record<string, string> = {
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

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
 * 头像内联：picture 写成仓库内相对路径时，读文件转成 data URI。
 *
 * 走外链（GitHub 头像域）在国内网络下时不时加载失败：屏上显示不出头像，
 * 打印 / PDF 构建里 Skia 只会留下头像的圆形遮罩（图本体没落地）。
 * 本地文件内联后页面不依赖任何外网，屏上、打印、部署三个场景共用同一份图；
 * picture 写 http(s) / data 时保持原样，gravatar 兜底逻辑也不受影响。
 */
function inlineLocalPicture(resume: Resume): void {
  const picture = resume.basics.picture
  if (!picture || /^(?:https?:)?\/\//.test(picture) || picture.startsWith('data:'))
    return

  const file = path.join(process.cwd(), picture)
  if (!fs.existsSync(file)) {
    console.warn(`⚠️ 头像文件不存在，页面将显示不出头像: ${picture}`)
    return
  }

  const mime = IMAGE_MIME[path.extname(file).toLowerCase()] ?? 'image/jpeg'
  resume.basics.picture = `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`
}

/**
 * 模板渲染前的数据加工：日期格式化、工作时长计算、头像兜底与内联。
 * 直接原地修改传入的简历对象。
 */
export function applyResumeTransforms(resume: Resume): void {
  applyGravatarPicture(resume)
  inlineLocalPicture(resume)

  if (resume.work)
    formatWorkDates(resume.work)

  if (resume.education)
    formatEducationDates(resume.education)
}

import type { ResumeProfile } from '../profiles/types'
import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import fsExtra from 'fs-extra'
import { renderMarkdown } from '../core/mdRenderer'
import { loadQuizBanks } from '../core/quiz'
import { renderHtml } from '../core/render'
import { DOC_VIEWER_FILE, injectDocViewer } from '../dev/injectDocViewer'
import { injectQuizPanel } from '../dev/injectQuizPanel'

/** 生产页里内嵌演示的上游源（与 dev 反代目标同一含义，部署到其他演示站时改环境变量） */
const DEMO_ORIGIN = process.env.FRAME_BASE || 'http://134.175.23.212:8581'

/**
 * 读取简历配置对应的 JSON 并渲染为 HTML
 */
export function renderProfileHtml(profile: ResumeProfile): string {
  if (!fs.existsSync(profile.jsonOutput)) {
    throw new Error(`简历 JSON 不存在: ${profile.jsonOutput}，请先执行简历数据生成（npm run resume:generate）`)
  }

  const resume = JSON.parse(fs.readFileSync(profile.jsonOutput, 'utf-8')) as Resume
  return renderHtml(resume)
}

/**
 * 将 HTML 写入简历配置指定的输出路径
 */
export async function writeProfileHtml(profile: ResumeProfile, html: string): Promise<void> {
  await fsExtra.ensureDir(path.dirname(profile.htmlOutput))
  fs.writeFileSync(profile.htmlOutput, html, 'utf-8')
  console.log(`✅ [${profile.id}] HTML生成完成: ${profile.htmlOutput}`)
}

/**
 * 给生产 HTML 加上押题面板与面试诊断报告抽屉（默认不注入，需显式调用）。
 *
 * 静态页没有 dev 服务，所以所有数据构建期内联：题包 JSON、外置解答 md、报告 md；
 * 运行期不再请求任何接口。frame 题的 iframe 直连 DEMO_ORIGIN（跳站部署时会被对方
 * X-Frame-Options 拦住内嵌，属于已接受的取舍）。PDF 不走这一层，保持纯净。
 */
export function injectResumePanels(html: string): string {
  const banks = loadQuizBanks()
  const docPath = path.join(process.cwd(), 'docs', DOC_VIEWER_FILE)
  const docHtml = fs.existsSync(docPath)
    ? renderMarkdown(fs.readFileSync(docPath, 'utf-8'), { stripFrontMatter: true })
    : null

  if (!docHtml)
    console.warn(`⚠️ 未找到诊断报告 ${DOC_VIEWER_FILE}，生产页报告抽屉将为空`)

  return injectDocViewer(
    injectQuizPanel(html, banks, { inlineAnswers: true, frameOrigin: DEMO_ORIGIN }),
    docHtml,
  )
}

/**
 * 为一份简历配置构建 HTML：读取 JSON、渲染、注入面板与报告抽屉、写盘
 */
export async function buildProfileHtml(profile: ResumeProfile): Promise<void> {
  await writeProfileHtml(profile, injectResumePanels(renderProfileHtml(profile)))
}

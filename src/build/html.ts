import type { ResumeProfile } from '../profiles/types'
import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import fsExtra from 'fs-extra'
import { renderMarkdown } from '../core/mdRenderer'
import { loadQuizBanks } from '../core/quiz'
import { renderHtml } from '../core/render'
import { assembleBaseResume } from '../data_front'
import { DOC_VIEWER_FILE, injectDocViewer } from '../dev/injectDocViewer'
import { injectQuizPanel } from '../dev/injectQuizPanel'
import { injectTocPanel } from '../dev/injectTocPanel'

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
 * 给生产 HTML 加上押题面板、面试诊断报告抽屉与目录大纲（默认不注入，需显式调用）。
 *
 * 静态页没有 dev 服务，所以所有数据构建期内联：题包 JSON、外置解答 md、报告 md；
 * 运行期不再请求任何接口。frame 题的 iframe 直连 DEMO_ORIGIN（跳站部署时会被对方
 * X-Frame-Options 拦住内嵌，属于已接受的取舍）。目录大纲纯前端扫描成品 DOM，
 * 无任何运行期依赖，dev 与生产共用同一份注入。PDF 不走这一层，保持纯净。
 */
export function injectResumePanels(html: string): string {
  const banks = loadQuizBanks()
  const docPath = path.join(process.cwd(), 'docs', DOC_VIEWER_FILE)
  const docHtml = fs.existsSync(docPath)
    ? renderMarkdown(fs.readFileSync(docPath, 'utf-8'), { stripFrontMatter: true })
    : null

  if (!docHtml)
    console.warn(`⚠️ 未找到诊断报告 ${DOC_VIEWER_FILE}，生产页报告抽屉将为空`)

  return injectTocPanel(injectDocViewer(
    injectQuizPanel(html, banks, { inlineAnswers: true, frameOrigin: DEMO_ORIGIN }),
    docHtml,
  ))
}

/** data_front 生产产物：目录形式落地，Netlify 与 nginx（try_files $uri/）都能直接命中 /data_front */
const DATA_FRONT_OUTPUT = 'dist/data_front/index.html'

/**
 * 构建前端方向简历的生产页：直接从 src/data_front 组装数据渲染，
 * 不走 JSON 生成管线（与 dev 的 /data_front 实时路由同一数据源），
 * 面板注入与主页同一套 injectResumePanels，保证两端 URL 与内容一致。
 */
export async function buildDataFrontHtml(): Promise<void> {
  const html = injectResumePanels(renderHtml(assembleBaseResume()))
  await fsExtra.ensureDir(path.dirname(DATA_FRONT_OUTPUT))
  fs.writeFileSync(DATA_FRONT_OUTPUT, html, 'utf-8')
  console.log(`✅ [data_front] HTML生成完成: ${DATA_FRONT_OUTPUT}`)
}

/**
 * 为一份简历配置构建 HTML：读取 JSON、渲染、注入面板与报告抽屉、写盘
 */
export async function buildProfileHtml(profile: ResumeProfile): Promise<void> {
  await writeProfileHtml(profile, injectResumePanels(renderProfileHtml(profile)))
}

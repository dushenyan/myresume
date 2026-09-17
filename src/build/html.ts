import type { ResumeProfile } from '../profiles/types'
import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import fsExtra from 'fs-extra'
import { renderHtml } from '../core/render'

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
 * 为一份简历配置构建 HTML：读取 JSON、渲染、写盘
 */
export async function buildProfileHtml(profile: ResumeProfile): Promise<void> {
  await writeProfileHtml(profile, renderProfileHtml(profile))
}

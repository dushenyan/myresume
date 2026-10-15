/**
 * CLI 入口：构建 PDF
 *
 * 用法：
 *   npx esno src/scripts/build-pdf.ts                    构建全部简历的 HTML + PDF
 *   npx esno src/scripts/build-pdf.ts --profile=social   只构建指定简历
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import fsExtra from 'fs-extra'
import { injectResumePanels, renderProfileHtml, writeProfileHtml } from '../build/html'
import { buildProfilePdf } from '../build/pdf'
import { parseProfileFilter, selectProfiles } from '../core/profiles'

async function main(): Promise<void> {
  const selected = selectProfiles(parseProfileFilter(process.argv.slice(2)))

  console.log('开始生成简历...')

  for (const profile of selected) {
    const html = renderProfileHtml(profile)
    // 落盘的 HTML 带上押题/报告面板（与 build:html 产出保持一致）；
    // PDF 用未注入的纯净 HTML，版面不会出现任何交互按钮
    await writeProfileHtml(profile, injectResumePanels(html))

    try {
      await buildProfilePdf(profile, html)
    }
    catch (error) {
      // PDF 生成失败不判定构建失败：无 Chrome 的环境（如 Netlify CI）里
      // HTML 已生成，从 docs/ 复制同名预置 PDF 兜底，保证线上链接可访问
      console.error(`❌ [${profile.id}] PDF构建失败，尝试 docs/ 预置文件兜底:`, error)
      const fallbackSrc = path.join('docs', path.basename(profile.pdfOutput))
      if (fs.existsSync(fallbackSrc)) {
        await fsExtra.ensureDir(path.dirname(profile.pdfOutput))
        fs.copyFileSync(fallbackSrc, profile.pdfOutput)
        console.log(`✅ [${profile.id}] 已从 docs/ 复制预置 PDF: ${profile.pdfOutput}`)
      }
      else {
        console.warn(`⚠️  [${profile.id}] docs/ 中未找到 ${path.basename(profile.pdfOutput)}，PDF 链接将 404`)
        console.warn('    请先本地运行 make build，再执行以下命令将 PDF 提交到 git：')
        console.warn(`    cp dist/${path.basename(profile.pdfOutput)} docs/ && git add docs/${path.basename(profile.pdfOutput)}`)
      }
    }
  }
}

main().catch((error) => {
  console.error('构建失败:', error)
  process.exit(1)
})

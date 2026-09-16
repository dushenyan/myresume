/**
 * CLI 入口：构建 PDF
 *
 * 用法：
 *   npx esno src/scripts/build-pdf.ts                    构建全部简历的 HTML + PDF
 *   npx esno src/scripts/build-pdf.ts --profile=social   只构建指定简历
 */
import process from 'node:process'
import { renderProfileHtml, writeProfileHtml } from '../build/html'
import { buildProfilePdf } from '../build/pdf'
import { parseProfileFilter, selectProfiles } from '../core/profiles'

async function main(): Promise<void> {
  const selected = selectProfiles(parseProfileFilter(process.argv.slice(2)))

  console.log('开始生成简历...')

  for (const profile of selected) {
    const html = renderProfileHtml(profile)
    // build-pdf 同时落盘 HTML，保证 grunt build 一条命令产出 HTML + PDF
    await writeProfileHtml(profile, html)

    try {
      await buildProfilePdf(profile, html)
    }
    catch (error) {
      // PDF 失败不判定构建失败（沿用旧语义）：无 Chrome 的环境（如 CI）里
      // HTML 已生成，PDF 可从浏览器手动打印导出，不应中断部署
      console.error(`❌ [${profile.id}] PDF构建失败，但HTML已生成:`, error)
    }
  }
}

main().catch((error) => {
  console.error('构建失败:', error)
  process.exit(1)
})

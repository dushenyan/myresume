import process from 'node:process'
/**
 * CLI 入口：构建 HTML
 *
 * 用法：
 *   npx esno src/scripts/build-html.ts                    构建全部简历的 HTML
 *   npx esno src/scripts/build-html.ts --profile=social   只构建指定简历
 */
import fsExtra from 'fs-extra'
import { buildProfileHtml } from '../build/html'
import { parseProfileFilter, selectProfiles } from '../core/profiles'

async function main(): Promise<void> {
  const filter = parseProfileFilter(process.argv.slice(2))
  const selected = selectProfiles(filter)

  // 全量构建时先清空 dist 避免残留旧产物；指定 profile 时保留其他简历的输出
  if (!filter)
    await fsExtra.remove('dist')

  for (const profile of selected)
    await buildProfileHtml(profile)
}

main().catch((error) => {
  console.error('HTML构建失败:', error)
  process.exit(1)
})

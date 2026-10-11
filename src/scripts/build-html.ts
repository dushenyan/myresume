import process from 'node:process'
/**
 * CLI 入口：构建 HTML
 *
 * 用法：
 *   npx esno src/scripts/build-html.ts                    构建全部简历的 HTML
 *   npx esno src/scripts/build-html.ts --profile=social   只构建指定简历
 */
import fsExtra from 'fs-extra'
import { buildDataFrontHtml, buildProfileHtml } from '../build/html'
import { parseProfileFilter, selectProfiles } from '../core/profiles'

async function main(): Promise<void> {
  const filter = parseProfileFilter(process.argv.slice(2))
  const selected = selectProfiles(filter)

  // 全量构建时先清空 dist 避免残留旧产物；指定 profile 时保留其他简历的输出
  if (!filter)
    await fsExtra.remove('dist')

  for (const profile of selected)
    await buildProfileHtml(profile)

  // data_front 不在 profiles 注册表里（独立平行数据源），固定跟随构建，
  // 保证线上 /data_front 与 dev 实时路由一致；指定 --profile 时也重新渲染它
  await buildDataFrontHtml()
}

main().catch((error) => {
  console.error('HTML构建失败:', error)
  process.exit(1)
})

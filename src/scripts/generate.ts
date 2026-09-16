/**
 * CLI 入口：简历数据生成
 *
 * 用法：
 *   npx esno src/scripts/generate.ts generate [--profile=<id>]   单次生成
 *   npx esno src/scripts/generate.ts watch                       监听模式（数据/配置变更自动重生成）
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { generateAllProfiles } from '../core/generate'
import { parseProfileFilter, selectProfiles } from '../core/profiles'

// __dirname = <项目根>/src/scripts，向上回到 src/ 再拼接各模块目录
const SRC_ROOT = path.resolve(__dirname, '..')

// 监听范围：共享数据与简历配置，二者任一变更都需要重新生成
const WATCH_DIRS = ['data', 'profiles'].map(dir => path.join(SRC_ROOT, dir))

const DEBOUNCE_MS = 200

/**
 * 清除 data/ 与 profiles/ 在 require.cache 中的所有模块缓存。
 * 拆分为目录后仅清入口缓存不够：basics.ts 等子模块仍会命中旧缓存，
 * 导致修改不生效，因此按目录前缀递归清除。
 */
function clearSourceModuleCache(): void {
  for (const dir of WATCH_DIRS) {
    for (const key of Object.keys(require.cache)) {
      if (key.startsWith(dir)) {
        delete require.cache[key]
      }
    }
  }
}

/**
 * 监听数据源目录变化并自动重新生成全部简历 JSON
 */
function watch(): void {
  console.log(`开始监听目录变化: \n${WATCH_DIRS.map(dir => `  ${dir}`).join('\n')}`)

  generateAllProfiles(selectProfiles())

  // 防抖：编辑器多次保存会触发多次 change 事件，合并为一次重新生成
  let debounceTimer: NodeJS.Timeout | null = null

  const watchers = WATCH_DIRS.map(dir => fs.watch(dir, { recursive: true }, (eventType, filename) => {
    // 仅关注 .ts 文件变更，忽略其他噪音事件
    if (!filename || !filename.endsWith('.ts'))
      return

    if (debounceTimer)
      clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
      console.log(`\n🔄 检测到 ${filename} 更新，重新生成简历...`)

      clearSourceModuleCache()
      generateAllProfiles(selectProfiles())

      console.log('✅ 简历更新完成，继续监听文件变化...\n')
    }, DEBOUNCE_MS)
  }))

  process.on('SIGINT', () => {
    console.log('\n正在停止监听...')
    watchers.forEach(watcher => watcher.close())
    process.exit(0)
  })
}

function main(): void {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'watch':
      watch()
      break

    case 'generate':
      generateAllProfiles(selectProfiles(parseProfileFilter(args.slice(1))))
      break

    default:
      console.log('📖 用法: npx esno src/scripts/generate.ts <generate|watch> [--profile=<id>]')
      process.exit(command ? 1 : 0)
  }
}

main()

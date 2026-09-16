import type { ResumeProfile } from '../profiles/types'
import process from 'node:process'

/**
 * 加载简历配置注册表
 *
 * 用动态 require 而非静态 import：watch 模式下会先清除 data/ 与 profiles/
 * 的模块缓存再调用此处，静态 import 会一直命中首次加载的旧缓存。
 */
export function loadProfiles(): ResumeProfile[] {
  // eslint-disable-next-line ts/no-require-imports
  return require('../profiles').profiles as ResumeProfile[]
}

/**
 * 解析命令行中的 --profile=<id> 参数（也支持 --profile <id>）
 */
export function parseProfileFilter(args: string[]): string | undefined {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--profile=')) {
      return arg.slice('--profile='.length)
    }
    if (arg === '--profile' && args[i + 1]) {
      return args[i + 1]
    }
  }
  return undefined
}

/**
 * 按命令行 --profile 参数筛选简历配置；未传则返回全部
 */
export function selectProfiles(filter?: string): ResumeProfile[] {
  const profiles = loadProfiles()

  if (!filter)
    return profiles

  const matched = profiles.filter(profile => profile.id === filter)
  if (matched.length === 0) {
    console.error(`❌ 未找到简历配置: ${filter}（可选: ${profiles.map(p => p.id).join(', ')}）`)
    process.exit(1)
  }
  return matched
}

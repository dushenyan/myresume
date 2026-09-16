import type { ResumeProfile } from '../profiles/types'
import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import { validateResume } from './validate'

/**
 * 加载共享基础数据
 *
 * 与 loadProfiles 同理使用动态 require：watch 模式下先清缓存再调用，
 * 保证拿到的总是最新数据（静态 import 会命中旧缓存）。
 */
function loadBaseResume(): Resume {
  // eslint-disable-next-line ts/no-require-imports
  return require('../data').assembleBaseResume() as Resume
}

/**
 * 生成单份简历 JSON：基础数据 → profile 覆盖 → 校验 → 写盘
 *
 * 校验失败时仅告警不中断：开发中常改一半数据，写出的 JSON 便于
 * HTML 预览排错；发布前由 grunt build 中的 typecheck/lint 环节把关。
 */
export function generateProfileJson(profile: ResumeProfile): Resume {
  const resume = profile.build(loadBaseResume())
  const errors = validateResume(resume)

  if (errors.length > 0) {
    console.log(`❌ [${profile.id}] 数据验证失败:`)
    errors.forEach(error => console.log(`  - ${error}`))
  }
  else {
    console.log(`✅ [${profile.id}] 数据验证通过`)
  }

  const json = `${JSON.stringify(resume, null, 2)}\n`
  fs.mkdirSync(path.dirname(profile.jsonOutput), { recursive: true })
  fs.writeFileSync(profile.jsonOutput, json, 'utf8')
  console.log(`📄 [${profile.id}] 简历数据已导出到: ${profile.jsonOutput}`)

  return resume
}

/**
 * 生成全部（或 --profile 指定的）简历 JSON
 */
export function generateAllProfiles(selected: ResumeProfile[]): void {
  for (const profile of selected)
    generateProfileJson(profile)
}

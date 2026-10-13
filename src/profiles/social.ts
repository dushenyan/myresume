import type { ResumeProfile } from './types'

/**
 * 默认简历：AI Agent 工程师方向（社招）
 *
 * 基础数据（src/data）本身就是该方向的叙事，profile 无需做任何覆盖与筛选，
 * 因此 build 原样返回 base。若日后需要「前端方向」「数据可视化方向」等变体，
 * 再各自新增一个 profile 文件并在其上覆盖/筛选即可。
 */
export const socialProfile: ResumeProfile = {
  id: 'social',
  displayName: 'AI Agent 工程师',
  jsonOutput: 'resume/resume.json',
  htmlOutput: 'dist/index.html',
  // 与 src/data/basics.ts 的 pdfLink 保持逐字一致：页底「PDF版本」链接按相对路径命中本文件
  pdfOutput: 'dist/杜省严-Agent开发工程师-社招-海口.pdf',
  build: base => base,
}

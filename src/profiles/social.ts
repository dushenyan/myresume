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
  pdfOutput: 'dist/杜审言-AI Agent 工程师-社招.pdf',
  build: base => base,
}

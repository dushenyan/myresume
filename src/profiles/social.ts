import type { ResumeProfile } from './types'

/**
 * 默认简历：AI 应用方向（基础数据即为 AI 方向，无需覆盖）
 */
export const socialProfile: ResumeProfile = {
  id: 'social',
  displayName: 'AI 应用',
  jsonOutput: 'resume/resume.json',
  htmlOutput: 'dist/index.html',
  pdfOutput: 'dist/杜审言-AI 应用方向-社招.pdf',
  build: base => base,
}

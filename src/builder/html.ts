import type { Resume } from '../types'
import path from 'node:path'
import fs from 'fs-extra'
import { render } from '../core/renderer'

export interface BuildHtmlOptions {
  resume: Resume
  outputDir?: string
  templatePath?: string
  cssPath?: string
}

export async function buildHTML(options: BuildHtmlOptions): Promise<string> {
  const { resume, outputDir = './dist', templatePath, cssPath } = options

  await fs.remove(outputDir)
  await fs.ensureDir(outputDir)

  const htmlRender = await render(resume, templatePath, cssPath)
  const outputPath = path.join(outputDir, 'index.html')

  fs.writeFileSync(outputPath, htmlRender, 'utf-8')
  console.log(`HTML生成完成！输出到: ${outputPath}`)

  return htmlRender
}

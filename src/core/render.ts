import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import Handlebars from 'handlebars'
import { registerTemplateHelpers } from './helpers'
import { applyResumeTransforms } from './transform'

const TEMPLATE_PATH = 'resume/resume.hbs'

/**
 * 读取构建产物 CSS：优先开发版（带 sourcemap），回退压缩版
 */
function loadThemeCss(): string {
  const cssDir = path.join(process.cwd(), 'assets/css')
  try {
    return fs.readFileSync(path.join(cssDir, 'theme.css'), 'utf-8')
  }
  catch {
    console.log('未找到theme.css，使用theme.min.css')
    return fs.readFileSync(path.join(cssDir, 'theme.min.css'), 'utf-8')
  }
}

/**
 * 将简历数据渲染为完整 HTML（CSS 内联进页面）
 */
export function renderHtml(resume: Resume): string {
  const css = loadThemeCss()
  const template = fs.readFileSync(path.join(process.cwd(), TEMPLATE_PATH), 'utf-8')

  registerTemplateHelpers()
  applyResumeTransforms(resume)

  return Handlebars.compile(template)({
    css,
    resume,
  })
}

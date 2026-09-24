/**
 * 押题库解析器：读取 docs/quiz/*.md 学习素材
 *
 * 文件约定：front-matter（matchName / title / stack）+
 * 「## 预测押题」（- 列表问题，题目下方缩进行为参考解答）+
 *「## 项目亮点挖掘」（编号亮点）。
 * matchName 为简历项目 displayName 的子串，匹配不到的主题
 * 由前端面板在浏览器控制台告警（不展示入口）。
 *
 * 仅供 dev 预览服务（serve.ts）使用，不参与 HTML/PDF 构建管线。
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export interface QuizHighlight {
  title: string
  detail: string
}

export interface QuizQuestion {
  q: string
  a: string
}

export interface QuizBank {
  /** 文件名（含扩展名），作为进度存储与 DOM 关联的唯一 key */
  file: string
  /** 与简历项目 displayName 匹配的子串，可为空（空 = 不绑定项目） */
  matchName: string
  title: string
  stack: string
  questions: QuizQuestion[]
  highlights: QuizHighlight[]
}

const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/
// 亮点行：编号 + **标题**（标题不含 *）+ 同行描述；避免重叠量词引发回溯告警
const HIGHLIGHT_RE = /^\d+\.\s*\*\*([^*]+)\*\*(.*)$/

function parseFrontMatter(raw: string): Record<string, string> {
  const meta: Record<string, string> = {}
  for (const line of raw.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1)
      continue
    // 剥离 YAML 风格行内注释（空格 + # 之后为注释），栈值的 | 分隔符不受影响
    const value = line.slice(idx + 1).replace(/\s+#.*$/, '').trim()
    meta[line.slice(0, idx).trim()] = value
  }
  return meta
}

/** 按二级标题把正文切成 { 标题: 行内容 } 的段 */
function splitSections(body: string): Record<string, string[]> {
  const sections: Record<string, string[]> = {}
  let current: string[] | null = null

  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)/)
    if (heading) {
      current = sections[heading[1].trim()] ??= []
      continue
    }
    if (current)
      current.push(line)
  }
  return sections
}

/** 题目行以 - 开头；紧随其后的非空行（缩进书写）并入该题的参考解答 */
function parseQuestions(lines: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  let current: QuizQuestion | null = null

  for (const raw of lines) {
    const line = raw.trim()
    if (!line)
      continue
    if (line.startsWith('- ')) {
      current = { q: line.replace(/^-\s*/, ''), a: '' }
      questions.push(current)
    }
    else if (current) {
      current.a = current.a ? `${current.a} ${line}` : line
    }
  }
  return questions
}

function parseHighlights(lines: string[]): QuizHighlight[] {
  const highlights: QuizHighlight[] = []

  for (const line of lines) {
    const matched = line.match(HIGHLIGHT_RE)
    if (matched) {
      // 编号行：标题 + 同行可能存在的描述；后续缩进行续接描述
      highlights.push({ title: matched[1].trim(), detail: matched[2].trim() })
      continue
    }
    const detail = line.trim()
    if (detail && highlights.length) {
      const last = highlights[highlights.length - 1]
      last.detail = last.detail ? `${last.detail} ${detail}` : detail
    }
  }
  return highlights
}

/** 解析单个押题 md；缺少 front-matter 或两个正文段时视为无效文件返回 null */
export function parseQuizMarkdown(raw: string, file: string): QuizBank | null {
  const fmMatch = raw.match(FRONT_MATTER_RE)
  if (!fmMatch)
    return null

  const meta = parseFrontMatter(fmMatch[1])
  if (!meta.title)
    return null

  const sections = splitSections(raw.slice(fmMatch[0].length))
  const questions = parseQuestions(sections['预测押题'] ?? [])
  const highlights = parseHighlights(sections['项目亮点挖掘'] ?? [])

  if (!questions.length && !highlights.length)
    return null

  return {
    file,
    matchName: meta.matchName ?? '',
    title: meta.title,
    stack: meta.stack ?? '',
    questions,
    highlights,
  }
}

/** 加载全部押题库；目录缺失返回空数组，单文件解析失败只告警不阻塞 */
export function loadQuizBanks(quizDir = path.join(process.cwd(), 'docs', 'quiz')): QuizBank[] {
  if (!fs.existsSync(quizDir))
    return []

  const banks: QuizBank[] = []
  for (const file of fs.readdirSync(quizDir).filter(f => f.endsWith('.md') && f !== 'README.md').sort()) {
    try {
      const bank = parseQuizMarkdown(fs.readFileSync(path.join(quizDir, file), 'utf-8'), file)
      if (bank)
        banks.push(bank)
      else
        console.warn(`⚠️ 押题文件格式无效（已跳过）: ${file}`)
    }
    catch (error) {
      console.warn(`⚠️ 押题文件解析失败（已跳过）: ${file}`, error)
    }
  }
  return banks
}

/**
 * 押题库解析器：读取 docs/quiz/*.md 学习素材
 *
 * 文件约定：front-matter（matchName / title / stack）+
 * 「## 预测押题」（- 列表问题，题目下方缩进行为参考解答）+
 *「## 项目亮点挖掘」（编号亮点）。当题包内联解答过长时，
 * 可在解答行写 `@answer: 文件名.md` 引用 docs/quiz/answers/ 下的
 * 独立 md 文件（详情视图按需通过 /api/quiz/answer 读取渲染）。
 * 题目还可写 `@frame:` 关联在线演示：值可以是演示 uuid（拼到默认演示站的
 * resume-quiz 路径下），也可以是完整嵌入 URL（按 embed 文档粘的地址）；
 * dev 预览走同源反代路径，生产构建直接拼上游站点地址内嵌。
 * matchName 为简历项目 displayName 的子串，匹配不到的主题
 * 由前端面板在浏览器控制台告警（不展示入口）。
 *
 * 调用方：dev 预览服务（serve.ts，外置解答与报告走接口按需读）与
 * 生产 HTML 构建（build/html.ts，全部数据构建期内联）。
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { renderMarkdown } from './mdRenderer'

export interface QuizHighlight {
  title: string
  detail: string
}

export interface QuizQuestion {
  q: string
  a: string
  /** 外置解答文件名（位于 docs/quiz/answers/），存在时详情视图优先按需读取该文件 */
  aFile?: string
  /** 在线演示引用（@frame: 行）：演示 uuid 或完整嵌入 URL，存在时详情视图内嵌对应 iframe */
  frame?: string
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
// 外置解答引用行：@answer: 文件名.md（不含空白与路径分隔符，服务端再取 basename 兼防穿越）；
// 允许被 HTML 注释包裹（<!-- @answer: x.md -->），注释本身不进入解答正文
const ANSWER_REF_RE = /^(?:<!--\s*)?@answer:\s*([^\s/\\]+\.md)\s*(?:-->)?$/
// 在线演示引用行：@frame: 演示 uuid 或完整嵌入 URL（均不含空白）；同上支持注释包裹
const FRAME_REF_RE = /^(?:<!--\s*)?@frame:\s*(\S+)\s*(?:-->)?$/
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

/** 题目行以顶格 `- ` 开头；紧随其后的缩进行（含 markdown 列表/代码）按原行结构并入参考解答 */
function parseQuestions(lines: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  let current: QuizQuestion | null = null

  for (const raw of lines) {
    if (!raw.trim())
      continue
    // 顶格 `- ` 视为新问题；带缩进的行（哪怕以 - 开头）归入当前题，以支持答案内的 markdown 列表
    if (/^-\s+/.test(raw)) {
      current = { q: raw.replace(/^-\s*/, ''), a: '' }
      questions.push(current)
    }
    else if (current) {
      const content = raw.replace(/^ {0,2}/, '').replace(/\s+$/, '')
      const ref = content.match(ANSWER_REF_RE)
      if (ref) {
        current.aFile = ref[1]
        continue
      }
      const frame = content.match(FRAME_REF_RE)
      if (frame) {
        // 完整 URL 归一为「不含协议与主机」的路径部分，主机交绐代理解析：
        // 题包里粘的任何演示站地址都能走同一套同源代理，浏览器控制台不会泄露上游主机
        current.frame = normalizeFrameRef(frame[1])
        continue
      }
      current.a = current.a ? `${current.a}\n${content}` : content
    }
  }
  return questions
}

function parseHighlights(lines: string[]): QuizHighlight[] {
  const highlights: QuizHighlight[] = []
  let current: QuizHighlight | null = null

  for (const raw of lines) {
    if (!raw.trim())
      continue
    const matched = raw.match(HIGHLIGHT_RE)
    if (matched) {
      // 编号行：标题 + 同行可能存在的描述；后续缩进行续接描述（保留行结构以支持 markdown）
      current = { title: matched[1].trim(), detail: matched[2].trim() }
      highlights.push(current)
      continue
    }
    if (current) {
      const content = raw.replace(/^ {0,3}/, '').replace(/\s+$/, '')
      current.detail = current.detail ? `${current.detail}\n${content}` : content
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

/** 把 @frame 值归一：完整 URL 削成 <host>/<path>?<query>#<hash> 的相对形式，uuid 原样保留 */
function normalizeFrameRef(value: string): string {
  if (!/^https?:\/\//i.test(value))
    return value
  try {
    const url = new URL(value)
    return `${url.host}${url.pathname}${url.search}${url.hash}`
  }
  catch {
    return value
  }
}

/** 外置解答 md 文件的存放目录（dev 专属，随题包目录一起维护） */
export function quizAnswersDir(quizDir = path.join(process.cwd(), 'docs', 'quiz')): string {
  return path.join(quizDir, 'answers')
}

/**
 * 读取并渲染一篇外置解答 md（docs/quiz/answers/<file>）为 HTML 片段。
 * 文件名非法、越出解答目录或不存在时返回 null，由调用方决定报 404 还是降级。
 */
export function readQuizAnswerHtml(file: string, answersDir = quizAnswersDir()): string | null {
  const name = path.basename(file)
  if (!name.endsWith('.md'))
    return null
  const full = path.join(answersDir, name)
  if (!full.startsWith(answersDir) || !fs.existsSync(full))
    return null
  try {
    return renderMarkdown(fs.readFileSync(full, 'utf-8'), { stripFrontMatter: true })
  }
  catch {
    return null
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

/**
 * 押题库解析器：读取 docs/quiz/<目录>/*.md 学习素材
 *
 * 目录即分类：docs/quiz/project/ 存「项目经历」题包（matchName 挂项目标题），
 * docs/quiz/skill/ 存「专业技能」题包（keywords 挂技能区关键词词条），
 * answers/ 为外置解答目录不参与扫描；加载器递归子目录，把目录名写进 bank.category。
 *
 * 文件约定：front-matter（matchName / keywords / title / stack）+
 * 「## 预测押题」（- 列表问题，题目下方缩进行为参考解答）+
 *「## 项目亮点挖掘」（编号亮点）。当题包内联解答过长时，
 * 可在解答行写 `@answer: 相对路径.md` 引用 docs/quiz/answers/ 下的
 * 独立 md 文件（详情视图按需通过 /api/quiz/answer 读取渲染）。
 * 现行约定是一道题一个目录：目录名取该题 @frame 演示 uuid 的前八位，
 * 答案固定为该目录下的 ans.md（如 `@answer: 086b8c26/ans.md`）；
 * 旧的扁平引用（`@answer: xxx.md`）仍兼容。顶格单行 HTML 注释（`<!-- ... -->`）作为源码级梯队/难度分组标记，解析时整行跳过、不并入解答也不新建题目。
 * 题目还可写 `@frame:` 关联在线演示：值可以是演示 uuid（拼到默认演示站的
 * resume-quiz 路径下），也可以是完整嵌入 URL（按 embed 文档粘的地址）；
 * dev 预览走同源反代路径，生产构建直接拼上游站点地址内嵌。
 * matchName 为简历项目 displayName 的子串，keywords 为技能关键词子串（| 分隔），
 * 匹配不到的主题由前端面板在浏览器控制台告警（不展示入口）。
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
  /** 外置解答文件相对路径（相对 docs/quiz/answers/，如 086b8c26/ans.md），存在时详情视图优先按需读取该文件 */
  aFile?: string
  /** 在线演示引用（@frame: 行）：演示 uuid 或完整嵌入 URL，存在时详情视图内嵌对应 iframe */
  frame?: string
}

export interface QuizBank {
  /** 文件名（含扩展名），作为进度存储与 DOM 关联的唯一 key */
  file: string
  /** 与简历项目 displayName 匹配的子串，可为空（空 = 不绑定项目） */
  matchName: string
  /** 题包归属目录：project = 项目经历，skill = 专业技能（取一级子目录名） */
  category: 'project' | 'skill'
  /** 技能题包绑定的关键词子串（front-matter keywords，| 分隔），命中技能词条时挂载入口 */
  keywords: string[]
  title: string
  stack: string
  questions: QuizQuestion[]
  highlights: QuizHighlight[]
}

const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/
// 外置解答引用行：@answer: 相对路径.md，支持一层或多层目录（如 086b8c26/ans.md）；
// 禁空白与反斜杠，穿越由 readQuizAnswerHtml 的目录包含校验兜住；
// 允许被 HTML 注释包裹（<!-- @answer: x.md -->），注释本身不进入解答正文
const ANSWER_REF_RE = /^(?:<!--\s*)?@answer:\s*([^\s\\]+\.md)\s*(?:-->)?$/
// 在线演示引用行：@frame: 演示 uuid 或完整嵌入 URL（均不含空白）；同上支持注释包裹
const FRAME_REF_RE = /^(?:<!--\s*)?@frame:\s*(\S+)\s*(?:-->)?$/
// 单行 HTML 注释：题包里用作源码级分组标记（如梯队/难度分隔），解析时整行跳过、不并入任何解答题目与亮点段均适用
const COMMENT_LINE_RE = /^<!--.*-->$/
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
      // 顶格单行 HTML 注释作为源码级分组标记（如梯队分隔），既不并入解答也不新建题目，直接跳过
      if (COMMENT_LINE_RE.test(content))
        continue
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
    category: 'project',
    keywords: (meta.keywords ?? '').split('|').map(s => s.trim()).filter(Boolean),
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
 * 读取并渲染一篇外置解答 md（docs/quiz/answers/<相对路径>，如 086b8c26/ans.md）为 HTML 片段。
 * 路径非法（绝对路径、含 .. 或反斜杠）、越出解答目录或文件不存在时返回 null，
 * 由调用方决定报 404 还是降级。
 */
export function readQuizAnswerHtml(file: string, answersDir = quizAnswersDir()): string | null {
  const root = path.resolve(answersDir)
  const name = file.trim().replace(/^\/+/, '')
  if (!name.endsWith('.md') || name.includes('\\') || name.split('/').includes('..'))
    return null
  const full = path.resolve(root, name)
  if (!full.startsWith(root + path.sep) || !fs.existsSync(full))
    return null
  try {
    return renderMarkdown(fs.readFileSync(full, 'utf-8'), { stripFrontMatter: true })
  }
  catch {
    return null
  }
}

/** 扫描单层目录的题包 md；README.md 是格式说明，跳过 */
function loadQuizBanksFromDir(dir: string, category: QuizBank['category'], banks: QuizBank[]): void {
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'README.md').sort()) {
    try {
      const bank = parseQuizMarkdown(fs.readFileSync(path.join(dir, file), 'utf-8'), file)
      if (bank)
        banks.push({ ...bank, category })
      else
        console.warn(`⚠️ 押题文件格式无效（已跳过）: ${file}`)
    }
    catch (error) {
      console.warn(`⚠️ 押题文件解析失败（已跳过）: ${file}`, error)
    }
  }
}

/**
 * 加载全部押题库；目录缺失返回空数组，单文件解析失败只告警不阻塞。
 * 一级子目录名即分类（project / skill），直接放在根目录的 md 按项目题包处理；
 * answers/ 是外置解答目录，不参与扫描。
 */
export function loadQuizBanks(quizDir = path.join(process.cwd(), 'docs', 'quiz')): QuizBank[] {
  if (!fs.existsSync(quizDir))
    return []

  const banks: QuizBank[] = []
  for (const entry of fs.readdirSync(quizDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      if (entry.name === 'answers')
        continue
      loadQuizBanksFromDir(path.join(quizDir, entry.name), entry.name as QuizBank['category'], banks)
    }
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
      loadQuizBanksFromDir(quizDir, 'project', banks)
      break // 同层 md 由上面一次扫描完成，避免重复读取
    }
  }
  return banks
}

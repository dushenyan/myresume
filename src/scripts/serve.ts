/**
 * CLI 入口：本地预览服务器
 *
 * 用法：
 *   npx esno src/scripts/serve.ts                    预览默认简历（注册表中的第一份）
 *   npx esno src/scripts/serve.ts --profile=social   预览指定简历
 *
 * dev 专属能力：响应前注入「预测押题」面板（docs/quiz/*.md）与
 * 「面试诊断报告」抽屉（docs/*.md）；两者也会由构建管线内联到生产 HTML，
 * 区别只在 dev 把外置解答/报告留成接口按需读、演示页走同源反代。
 */
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { Readable } from 'node:stream'
import { renderProfileHtml } from '../build/html'
import { renderMarkdown } from '../core/mdRenderer'
import { loadProfiles, parseProfileFilter } from '../core/profiles'
import { loadQuizBanks, readQuizAnswerHtml } from '../core/quiz'
import { injectDocViewer } from '../dev/injectDocViewer'
import { injectQuizPanel } from '../dev/injectQuizPanel'

// 默认 8888；被占用时可用 PORT=9000 npx esno src/scripts/serve.ts 换端口起第二份
const PORT = Number(process.env.PORT) || 8888
const PUBLIC_DIR = path.join(process.cwd(), 'dist')
/** 默认演示站（@frame: 只写 uuid 时拼到这里）；可用 FRAME_BASE 环境变量改成本地跑起来的演示应用 */
const QUIZ_FRAME_BASE = process.env.FRAME_BASE || 'http://134.175.23.212:8581'

const MIME_TYPES: Record<string, string> = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.less': 'text/css',
  '.woff': 'application/font-woff',
  '.woff2': 'application/font-woff2',
  '.ttf': 'application/font-truetype',
  '.eot': 'application/vnd.ms-fontobject',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown; charset=utf-8',
}

/**
 * 启动时解析一次预览的简历配置：无效的 --profile 立即失败退出，
 * 而不是等到第一次请求才报错
 */
function selectPreviewProfile() {
  const filter = parseProfileFilter(process.argv.slice(2))
  const profiles = loadProfiles()
  const profile = filter
    ? profiles.find(item => item.id === filter)
    : profiles[0]

  if (!profile) {
    console.error(`❌ 未找到简历配置: ${filter}（可选: ${profiles.map(p => p.id).join(', ')}）`)
    process.exit(1)
  }

  return profile
}

const previewProfile = selectPreviewProfile()

/**
 * 外置解答 md 文件读取（dev 专属）：/api/quiz/answer?file=xxx.md
 * 从 docs/quiz/answers/ 下按 basename 取文件（basename 已剔除目录，防路径穿越），
 * 渲染为 HTML 片段返回，供详情视图按需加载。
 */
function handleQuizAnswer(reqUrl: string, res: http.ServerResponse) {
  const file = new URL(reqUrl, `http://localhost:${PORT}`).searchParams.get('file') || ''
  const htmlBody = readQuizAnswerHtml(file)

  if (htmlBody === null) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<p class="q-p">（未找到解答文件）</p>')
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end(htmlBody)
}

/** 逐跳头 + 不能原样透传的头：解压器已把 gzip 展开，再带 content-encoding 会让浏览器解码失败；x-frame-options 会阻止内嵌 */
const PROXY_DROP_HEADERS = new Set(['connection', 'keep-alive', 'transfer-encoding', 'content-encoding', 'content-length', 'x-frame-options'])

/**
 * 演示站内嵌反代理（dev 专属）：把本服务未本地接管的所有请求，按原路径转发到演示站。
 *
 * 为什么要整站反代而非只代理一个前缀：目标站 X-Frame-Options: SAMEORIGIN + SPA 前端路由。
 * iframe 必须从同源的真实路径（/resume-quiz/<uuid>?embed=1）加载，才能让 SPA 读到正确的
 * location.pathname 去解析 dataSource/questionId；而它的运行时会 fetch('/api/...')、加载 /assets/*
 * 这些根绝对地址——只有整站反代才能让这些请求也回到本服务并转发上游（无需改写 HTML）。
 * base 固定为环境变量配置的单一反代目标，不是开放代理（调用方无法指定任意主机）。
 * POST 类接口（如 /api/knowledges/question/detail）必须连请求体与 content-type 一起转发，
 * 否则上游收到空 body 会报「Question not found」。
 */
async function proxyToDemo(req: http.IncomingMessage, res: http.ServerResponse) {
  const target = new URL(req.url || '/', QUIZ_FRAME_BASE)
  const headers: Record<string, string> = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string' && ['user-agent', 'accept', 'accept-language', 'cookie', 'referer', 'content-type'].includes(key)) {
      headers[key] = value
    }
  }
  headers.host = target.host
  headers.origin = QUIZ_FRAME_BASE

  // 非 GET/HEAD 先缓存整个请求体再转发（dev 量级下简单可靠）
  const chunks: Buffer[] = []
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    for await (const chunk of req) {
      chunks.push(chunk as Buffer)
    }
  }
  const body = chunks.length ? Buffer.concat(chunks) : undefined

  try {
    const upstream = await fetch(target, { method: req.method, headers, body })
    const outHeaders: Record<string, string | number> = {}
    upstream.headers.forEach((value, key) => {
      if (!PROXY_DROP_HEADERS.has(key.toLowerCase())) {
        outHeaders[key] = value
      }
    })
    res.writeHead(upstream.status, outHeaders)
    // 流式转发（支持 SSE 等长连接）；无 body 时直接结束
    if (upstream.body) {
      Readable.fromWeb(upstream.body as never).pipe(res)
    }
    else {
      res.end()
    }
  }
  catch (error) {
    console.error('演示站代理错误:', error)
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<p class="q-p">（在线演示服务不可达）</p>')
  }
}

/**
 * docs/ 根层 md 文件读取（dev 专属）：/api/doc?file=xxx.md
 * 从 docs/ 根目录按 basename 取文件（basename 已剔除目录，防路径穿越），
 * 渲染为 HTML 片段返回，供面试诊断报告抽屉按需加载。
 */
function handleDoc(reqUrl: string, res: http.ServerResponse) {
  const file = new URL(reqUrl, `http://localhost:${PORT}`).searchParams.get('file') || ''
  const name = path.basename(file)
  const docsDir = path.join(process.cwd(), 'docs')
  const full = path.join(docsDir, name)

  if (!name.endsWith('.md') || !full.startsWith(docsDir) || !fs.existsSync(full)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<p class="q-p">（未找到 md 文件）</p>')
    return
  }

  try {
    const htmlBody = renderMarkdown(fs.readFileSync(full, 'utf-8'), { stripFrontMatter: true })
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(htmlBody)
  }
  catch (error) {
    console.error('md 文件读取错误:', error)
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<p class="q-p">（md 文件读取失败）</p>')
  }
}

const server = http.createServer(async (req, res) => {
  // 根路径：实时渲染预览简历（改数据后刷新浏览器即可看到；
  // 押题 md / 诊断报告同样每次请求重读，改 docs 后刷新即生效）
  if (req.url === '/') {
    try {
      // 注入顺序有依赖：押题脚本先执行创建 .quiz-trigger，
      // 诊断报告脚本后执行才能把入口挂到押题按钮旁边
      const html = injectDocViewer(injectQuizPanel(await renderProfileHtml(previewProfile), loadQuizBanks()))
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(html)
    }
    catch (error) {
      console.error('渲染错误:', error)
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end('<h1>渲染失败，请检查错误信息</h1>')
    }
    return
  }

  // 外置解答 md 文件接口：详情视图按需拉取
  if (req.url && req.url.startsWith('/api/quiz/answer')) {
    handleQuizAnswer(req.url, res)
    return
  }

  // docs/ 根层 md 接口：诊断报告抽屉按需拉取
  if (req.url && req.url.startsWith('/api/doc')) {
    handleDoc(req.url, res)
    return
  }

  // 本地构建产物（dist）优先：命中则直接托管，否则整站反代到演示站。
  // iframe 的 /resume-quiz/* 不会命中本地（dist 只有 index.html），因此落到 proxyToDemo，
  // 连同其运行时的 /assets/*、/api/* 请求一起同源转发，SPA 路由与数据拉取都能解析。
  const reqPath = (req.url || '/').split('?')[0]
  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(reqPath))

  try {
    if (filePath.startsWith(PUBLIC_DIR) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
      res.writeHead(200, { 'Content-Type': contentType })
      fs.createReadStream(filePath).pipe(res)
      return
    }
    await proxyToDemo(req, res)
  }
  catch (error) {
    console.error('请求处理错误:', error)
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end('<h1>500 Internal Server Error</h1>')
  }
})

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ 端口 ${PORT} 已被占用，请先关闭占用进程（lsof -i :${PORT}）`)
  }
  else {
    console.error('服务器启动失败:', error)
  }
  process.exit(1)
})

server.listen(PORT)

console.log(`\n🐥 预览: http://localhost:${PORT}/`)
console.log(`预览简历: [${previewProfile.id}] ${previewProfile.displayName}`)

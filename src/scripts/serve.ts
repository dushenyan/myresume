/**
 * CLI 入口：本地预览服务器
 *
 * 用法：
 *   npx esno src/scripts/serve.ts                    预览默认简历（注册表中的第一份）
 *   npx esno src/scripts/serve.ts --profile=social   预览指定简历
 *
 * dev 专属能力：响应前注入「预测押题」面板（docs/quiz/*.md），
 * 仅存在于内存中的响应体，不写盘、不进 HTML/PDF 构建产物。
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { renderProfileHtml } from '../build/html'
import { loadProfiles, parseProfileFilter } from '../core/profiles'
import { loadQuizBanks } from '../core/quiz'
import { injectQuizPanel } from '../dev/injectQuizPanel'

const PORT = 8888
const PUBLIC_DIR = path.join(process.cwd(), 'dist')

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

const server = http.createServer(async (req, res) => {
  // 根路径：实时渲染预览简历（改数据后刷新浏览器即可看到；
  // 押题 md 同样每次请求重读，改 docs/quiz 后刷新即生效）
  if (req.url === '/') {
    try {
      const html = injectQuizPanel(await renderProfileHtml(previewProfile), loadQuizBanks())
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

  // 其他路径：托管 dist 静态资源
  const filePath = req.url
    ? path.join(PUBLIC_DIR, decodeURIComponent(req.url))
    : PUBLIC_DIR

  try {
    if (fs.existsSync(filePath)) {
      const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
      res.writeHead(200, { 'Content-Type': contentType })
      fs.createReadStream(filePath).pipe(res)
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
    }
  }
  catch (error) {
    console.error('静态资源读取错误:', error)
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

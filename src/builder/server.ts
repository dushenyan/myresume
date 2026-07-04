import type { Resume } from '../types'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'
import { render } from '../core/renderer'

export interface ServerOptions {
  port?: number
  publicDir?: string
  resume?: Resume
}

function loadResumeFromJson(): Resume | undefined {
  const resumeJsonPath = path.join(process.cwd(), 'resume/resume.json')
  if (fs.existsSync(resumeJsonPath)) {
    try {
      return JSON.parse(fs.readFileSync(resumeJsonPath, 'utf8'))
    }
    catch {
      console.log('读取 resume.json 失败')
    }
  }
  return undefined
}

export function createServer(options: ServerOptions = {}): http.Server {
  const { port = 8888, publicDir = 'dist', resume } = options
  const publicPath = path.join(process.cwd(), publicDir)

  const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })

      let renderedHtml: string
      const jsonResume = loadResumeFromJson()

      if (jsonResume) {
        renderedHtml = await render(jsonResume)
      }
      else if (resume) {
        renderedHtml = await render(resume)
      }
      else {
        renderedHtml = '<h1>渲染失败，请检查简历数据</h1>'
      }

      res.end(renderedHtml)
    }
    else {
      const filePath = req.url ? path.join(publicPath, decodeURIComponent(req.url)) : publicPath

      try {
        if (fs.existsSync(filePath)) {
          const ext = path.extname(filePath).toLowerCase()
          const contentType = {
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
          }[ext] || 'application/octet-stream'

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
    }
  })

  server.listen(port, () => {
    console.log(`\n🐥 预览: http://localhost:${port}/`)
  })

  return server
}

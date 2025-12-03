#!/usr/bin/node
//
// This script will run a local development server. This is useful when
// developing the theme.
//
// Usage:
// `serve.js` to use the default JSONResume example
// `serve.js <filename>` to open a particular resume file

import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'
import optimist from 'optimist'

const argv = optimist.argv
const port = 8888
const publicDir = path.join(process.cwd(), 'assets')

http
  .createServer(async (req, res) => {
    // 处理根路径请求
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(await render())
    }
    // 处理静态资源请求
    else {
      const filePath = path.join(publicDir, req.url)

      try {
        if (fs.existsSync(filePath)) {
          // 确定文件类型
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
  .listen(port)

console.log(`预览: http://localhost:${port}/`)

async function render() {
  try {
    const resume = argv._.length
      ? JSON.parse(fs.readFileSync(argv._[0], 'utf8'))
      : (await import('resume-schema')).resumeJson

    const indexModule = await import('./index')
    return indexModule.render(resume)
  }
  catch (error) {
    // 添加错误信息输出以便调试
    console.error('渲染错误:', error)
    // https://stackoverflow.com/questions/33655700/github-api-fetch-issues-with-exceeds-rate-limit-prematurely
    return '<h1>渲染失败，请检查错误信息</h1>'
  }
}

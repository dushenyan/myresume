import type Buffer from 'node:buffer'
import type { ResumeProfile } from '../profiles/types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import fsExtra from 'fs-extra'
import puppeteer from 'puppeteer'

/**
 * 检测系统中可用的 Chrome 可执行文件
 */
function getChromeExecutablePath(): string | undefined {
  // 优先使用环境变量指定
  if (process.env.CHROME_BIN) {
    return process.env.CHROME_BIN
  }

  const platformPaths: Record<NodeJS.Platform, string[]> = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
    ],
    win32: [
      `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
    ],
    aix: [],
    android: [],
    freebsd: [],
    haiku: [],
    openbsd: [],
    sunos: [],
    cygwin: [],
    netbsd: [],
  }

  for (const filePath of platformPaths[process.platform] ?? []) {
    if (fs.existsSync(filePath)) {
      console.log(`找到可用的浏览器: ${filePath}`)
      return filePath
    }
  }

  return undefined
}

/**
 * 将渲染好的 HTML 通过 headless Chrome 输出为 PDF
 *
 * 外部资源（Google Fonts / iconify）被移除、网络请求被整体拦截，
 * 避免打印时因外网请求超时导致构建失败。
 */
export async function buildProfilePdf(profile: ResumeProfile, html: string): Promise<void> {
  const offlineHtml = html
    // 移除 Google Fonts（打印时用系统字体兜底）
    .replace(/<link[^>]*fonts\.googleapis\.com[^>]*>/g, '')
    // 移除 iconify 脚本（打印时图标不显示也无妨）
    .replace(/<script[^>]*iconify[^>]*><\/script>/g, '')

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--font-render-hinting=none',
      ],
      executablePath: getChromeExecutablePath(),
      timeout: 60000,
      ignoreHTTPSErrors: true,
    })

    const page = await browser.newPage()

    // 拦截非必要外部请求，避免打印时因外网超时导致构建失败；
    // 头像图片域（gravatar / GitHub avatars）放行，否则 PDF 中头像会缺失。
    const ALLOWED_IMAGE_HOSTS = new Set([
      'gravatar.com',
      'www.gravatar.com',
      'avatars.githubusercontent.com',
      'user-images.githubusercontent.com',
      'raw.githubusercontent.com',
    ])
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const url = req.url()
      if (url.startsWith('data:')) {
        req.continue()
        return
      }
      if (req.resourceType() === 'image') {
        try {
          const host = new URL(url).host
          if (ALLOWED_IMAGE_HOSTS.has(host)) {
            req.continue()
            return
          }
        }
        catch {}
        req.abort()
        return
      }
      req.abort()
    })

    await page.setContent(offlineHtml, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })

    // 等待样式渲染稳定
    await new Promise(resolve => setTimeout(resolve, 1500))

    const pdf = await page.pdf({
      format: 'A4',
      displayHeaderFooter: false,
      printBackground: true,
      // 页边距交给 print.less 的 @page 规则统一控制，
      // 保证 headless 构建与浏览器手动打印的分页/留白完全一致
      preferCSSPageSize: true,
    }) as Buffer

    await browser.close()

    await fsExtra.ensureDir(path.dirname(profile.pdfOutput))
    fs.writeFileSync(profile.pdfOutput, pdf)
    console.log(`✅ [${profile.id}] PDF生成完成: ${profile.pdfOutput}`)
  }
  catch (error) {
    // 生成详细的错误提示页面，便于定位 Chrome 环境问题
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : ''

    const errorHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PDF生成失败</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #d9534f; }
          pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
          .help { background: #f0f8ff; padding: 15px; border-radius: 5px; border-left: 5px solid #5bc0de; }
        </style>
      </head>
      <body>
        <h1>PDF生成失败</h1>
        <p><strong>错误原因:</strong> ${errorMessage}</p>
        <div class="help">
          <h3>解决方法:</h3>
          <ol>
            <li>确保您已安装 Google Chrome 或兼容的浏览器</li>
            <li>如果使用环境变量指定 Chrome 路径，请检查 CHROME_BIN 环境变量是否设置正确</li>
            <li>尝试手动从 HTML 导出 PDF: 打开 dist/index.html，然后使用浏览器的"打印"功能导出为 PDF</li>
            <li>如果问题持续，请运行: <code>npm install puppeteer --ignore-scripts && npx puppeteer install</code></li>
          </ol>
        </div>
        <h3>错误详情:</h3>
        <pre>${errorStack}</pre>
      </body>
      </html>
    `
    fs.writeFileSync('./dist/pdf-error.html', errorHTML, 'utf-8')

    console.log('已生成错误提示页面: dist/pdf-error.html')
    throw new Error(`[${profile.id}] PDF生成失败，请查看dist/pdf-error.html获取详细信息和解决方法`)
  }
}

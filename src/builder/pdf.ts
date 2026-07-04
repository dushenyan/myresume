import type Buffer from 'node:buffer'
import type { Resume } from '../types'
import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import puppeteer from 'puppeteer'
import { render } from '../core/renderer'

export interface BuildPdfOptions {
  resume: Resume
  outputDir?: string
  outputFilename?: string
  templatePath?: string
  cssPath?: string
}

function getChromeExecutablePath(): string | undefined {
  if (process.env.CHROME_BIN) {
    return process.env.CHROME_BIN
  }

  const macPaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ]

  for (const chromePath of macPaths) {
    if (fs.existsSync(chromePath)) {
      console.log(`找到可用的浏览器: ${chromePath}`)
      return chromePath
    }
  }

  if (process.platform === 'linux') {
    const linuxPaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
    ]

    for (const chromePath of linuxPaths) {
      if (fs.existsSync(chromePath)) {
        return chromePath
      }
    }
  }

  if (process.platform === 'win32') {
    const winPaths = [
      `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
    ]

    for (const chromePath of winPaths) {
      if (fs.existsSync(chromePath)) {
        console.log(`找到可用的浏览器: ${chromePath}`)
        return chromePath
      }
    }
  }

  return undefined
}

export async function buildPDF(options: BuildPdfOptions): Promise<Buffer> {
  const { resume, outputDir = './dist', outputFilename = 'resume.pdf', templatePath, cssPath } = options

  const html = await render(resume, templatePath, cssPath)
  const chromePath = getChromeExecutablePath()

  const offlineHtml = html
    .replace(/<link[^>]*fonts\.googleapis\.com[^>]*>/g, '')
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
      executablePath: chromePath,
      timeout: 60000,
      ignoreHTTPSErrors: true,
    })

    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const url = req.url()
      if (url.startsWith('http') && !url.startsWith('data:')) {
        req.abort()
      }
      else {
        req.continue()
      }
    })

    await page.setContent(offlineHtml, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })

    await new Promise(resolve => setTimeout(resolve, 1500))

    const pdf = await page.pdf({
      format: 'A4',
      displayHeaderFooter: false,
      printBackground: true,
      margin: {
        top: '0.4in',
        bottom: '0.4in',
        left: '0.4in',
        right: '0.4in',
      },
    })

    await browser.close()

    await fs.ensureDir(outputDir)
    const outputPath = path.join(outputDir, outputFilename)
    fs.writeFileSync(outputPath, pdf)
    console.log(`PDF生成完成! 输出到: ${outputPath}`)

    return pdf
  }
  catch (error) {
    console.error('PDF生成失败:', error)

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
    fs.writeFileSync(path.join(outputDir, 'pdf-error.html'), errorHTML, 'utf-8')

    console.log('已生成错误提示页面: dist/pdf-error.html')
    throw new Error('PDF生成失败，请查看dist/pdf-error.html获取详细信息和解决方法')
  }
}

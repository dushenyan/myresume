import type Buffer from 'node:buffer'
import process from 'node:process'
import fs from 'fs-extra'
import puppeteer from 'puppeteer'

const resumePath = './resume/resume.json'

async function buildHTML() {
  await fs.remove('./dist')
  await fs.ensureDir('./dist')

  let resume

  if (fs.existsSync(resumePath)) {
    resume = JSON.parse(fs.readFileSync(resumePath, 'utf-8'))
  }
  else {
    throw new Error('resume.json 文件不存在')
  }
  const html = await import('./index')
  const htmlRender = await html.render(resume)
  fs.writeFileSync('./dist/index.html', htmlRender, 'utf-8')
  return htmlRender
}

// 检测系统中可能的 Chrome 路径
function getChromeExecutablePath(): string | undefined {
  // 先检查环境变量
  if (process.env.CHROME_BIN) {
    return process.env.CHROME_BIN
  }

  // macOS 常见的 Chrome 路径
  const macPaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ]

  // 检查是否存在这些路径
  for (const path of macPaths) {
    if (fs.existsSync(path)) {
      console.log(`找到可用的浏览器: ${path}`)
      return path
    }
  }

  // Linux 常见的 Chrome 路径
  if (process.platform === 'linux') {
    const linuxPaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
    ]

    for (const path of linuxPaths) {
      if (fs.existsSync(path)) {
        // console.log(`找到可用的浏览器: ${path}`)
        return path
      }
    }
  }

  // Windows 常见的 Chrome 路径
  if (process.platform === 'win32') {
    const winPaths = [
      `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
    ]

    for (const path of winPaths) {
      if (fs.existsSync(path)) {
        console.log(`找到可用的浏览器: ${path}`)
        return path
      }
    }
  }

  return undefined
}

async function buildPDF(html: string): Promise<Buffer> {
  const chromePath = getChromeExecutablePath()

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--remote-debugging-port=9222',
      ],
      // 使用找到的浏览器路径，如果没有找到则让 Puppeteer 尝试默认行为
      executablePath: chromePath,
      // 增加超时设置
      timeout: 30000,
      ignoreHTTPSErrors: true,
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })

    // 等待页面完全渲染
    await page.waitForTimeout(2000)

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
    console.log('开始生成简历...')
    fs.writeFileSync('./dist/杜审言-前端-社招-深圳.pdf', pdf)
    console.log('PDF生成完成!')
    return pdf
  }
  catch (error) {
    console.error('PDF生成失败:', error)

    // 创建详细的错误提示HTML
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
    throw new Error('PDF生成失败，请查看dist/pdf-error.html获取详细信息和解决方法')
  }
}

async function buildAll(): Promise<void> {
  try {
    const html = await buildHTML()

    try {
      await buildPDF(html)
    }
    catch (pdfError) {
      console.error('PDF构建失败，但HTML已成功生成:', pdfError)
      // 即使PDF生成失败，也让构建过程返回成功，因为HTML已经生成
      console.log('构建完成! HTML文件已成功生成到 dist/index.html')
    }
  }
  catch (error) {
    console.error('构建过程中出现错误:', error)
    process.exit(1)
  }
}

buildAll().catch((error) => {
  console.error('构建失败:', error)
  process.exit(1)
})

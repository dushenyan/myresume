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
    console.log(`从语言环境加载 resume.json"`)
    resume = JSON.parse(fs.readFileSync(resumePath, 'utf-8'))
  }
  else {
    throw new Error('resume.json 文件不存在')
  }
  console.log('读取中...')
  const html = await import('./index')
  const htmlRender = await html.render(resume)
  console.log('保存文件中...')
  fs.writeFileSync('./dist/index.html', htmlRender, 'utf-8')
  console.log('完成!')
  return htmlRender
}

async function buildPDF(html: string): Promise<Buffer> {
  try {
    // 尝试使用更健壮的配置来启动Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
      // 尝试使用系统已安装的Chrome浏览器，如果可用的话
      executablePath: process.env.CHROME_BIN || undefined,
      // 忽略默认下载，使用系统已有的浏览器
      ignoreDefaultArgs: ['--disable-extensions'],
    })

    const page = await browser.newPage()
    console.log('开始进行...')
    await page.setContent(html, { waitUntil: 'networkidle0' })
    console.log('同步 PDF...')
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
    console.log('完成!')
    return pdf
  }
  catch (error) {
    console.error('PDF生成失败:', error)

    // 如果Puppeteer失败，尝试提供一个降级方案
    console.log('尝试使用备选方案...')
    // 创建一个简单的错误提示PDF（仅作为示例，实际使用需要更多逻辑）
    const errorMessage = `PDF生成失败，请手动从HTML导出PDF。错误原因：${error instanceof Error ? error.message : String(error)}`

    // 创建一个简单的HTML文件作为替代
    const errorHTML = `
      <!DOCTYPE html>
      <html>
      <head><title>PDF生成失败</title></head>
      <body><h1>PDF生成失败</h1><p>${errorMessage}</p></body>
      </html>
    `
    fs.writeFileSync('./dist/pdf-error.html', errorHTML, 'utf-8')

    throw new Error('PDF生成失败，请查看dist/pdf-error.html获取详细信息')
  }
}

async function buildAll(): Promise<void> {
  try {
    const html = await buildHTML()
    await buildPDF(html)
  }
  catch (error) {
    console.error('构建过程中出现错误:', error)
    // 即使PDF生成失败，也让构建过程能够继续生成HTML
    console.log('HTML文件已生成，但PDF生成失败')
    process.exit(1)
  }
}

buildAll().catch((e) => {
  console.error(e)
  process.exit(1)
})

const fs = require('fs-extra')
const puppeteer = require('puppeteer')

async function buildHTML() {
  await fs.remove('./dist')
  await fs.ensureDir('./dist')

  let resume
  if (fs.existsSync('./resume.json')) {
    console.log(`从语言环境加载 resume.json"`)
    resume = JSON.parse(fs.readFileSync('./resume.json', 'utf-8'))
  }
  console.log('读取中...')
  const html = await require("./index.js").render(resume)
  console.log('保存文件中...')
  fs.writeFileSync('./dist/index.html', html, 'utf-8')
  console.log('完成!')
  return html
}

async function buildPDF(html) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage();
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
    }
  })
  await browser.close()
  console.log('开始生成简历...')
  fs.writeFileSync('./dist/杜审言-前端-社招-深圳.pdf', pdf)
  console.log('完成!')
  return pdf
}

async function buildAll() {
  const html = await buildHTML()
  await buildPDF(html)
}

buildAll().catch(e => {
  console.error(e)
  process.exit(1)
})

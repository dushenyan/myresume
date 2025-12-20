import fs from 'fs-extra'

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

  console.log('HTML生成完成！')
  return htmlRender
}

async function buildAll(): Promise<void> {
  try {
    await buildHTML()
    console.log('HTML构建完成! 文件已生成到 dist/index.html')
  }
  catch (error) {
    console.error('HTML构建过程中出现错误:', error)
    process.exit(1)
  }
}

buildAll().catch((error) => {
  console.error('HTML构建失败:', error)
  process.exit(1)
})

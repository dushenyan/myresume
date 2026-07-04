#!/usr/bin/env node
import type { Resume } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { buildHTML } from '../builder/html'
import { buildPDF } from '../builder/pdf'
import { createServer } from '../builder/server'
import { resumeSource } from '../data/resume'

function loadResumeData(jsonPath?: string): Resume {
  const defaultPath = './resume/resume.json'
  const targetPath = jsonPath || defaultPath

  if (fs.existsSync(targetPath)) {
    try {
      const jsonContent = fs.readFileSync(targetPath, 'utf8')
      return JSON.parse(jsonContent)
    }
    catch {
      console.log(`读取 ${targetPath} 失败，使用默认数据源`)
      return resumeSource
    }
  }
  return resumeSource
}

interface CliOptions {
  command: string
  template?: string
  outputDir?: string
  outputFilename?: string
  port?: number
  watch?: boolean
}

function parseArgs(): CliOptions {
  const args = process.argv.slice(2)
  const command = args[0] || 'build'
  const options: CliOptions = { command }

  for (let i = 1; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=')
      switch (key) {
        case 'template':
          options.template = value || args[++i]
          break
        case 'output-dir':
        case 'outputDir':
          options.outputDir = value || args[++i]
          break
        case 'output-filename':
        case 'outputFilename':
          options.outputFilename = value || args[++i]
          break
        case 'port':
          options.port = Number.parseInt(value || args[++i], 10)
          break
        case 'watch':
          options.watch = true
          break
      }
    }
  }

  return options
}

async function run() {
  const options = parseArgs()

  try {
    switch (options.command) {
      case 'build': {
        const resume = loadResumeData()
        await buildHTML({
          resume,
          outputDir: options.outputDir,
        })
        try {
          await buildPDF({
            resume,
            outputDir: options.outputDir,
            outputFilename: options.outputFilename || `${resume.basics.name}-${resume.basics.label}-社招.pdf`,
          })
        }
        catch (pdfError) {
          console.error('PDF构建失败，但HTML已成功生成:', pdfError)
          console.log('构建完成! HTML文件已成功生成')
        }
        break
      }

      case 'build:html': {
        const resume = loadResumeData()
        await buildHTML({
          resume,
          outputDir: options.outputDir,
        })
        break
      }

      case 'build:pdf': {
        const resume = loadResumeData()
        await buildPDF({
          resume,
          outputDir: options.outputDir,
          outputFilename: options.outputFilename || `${resume.basics.name}-${resume.basics.label}-社招.pdf`,
        })
        break
      }

      case 'serve': {
        createServer({
          port: options.port,
          resume: loadResumeData(),
        })
        break
      }

      case 'dev': {
        const resume = loadResumeData()
        await buildHTML({
          resume,
          outputDir: options.outputDir,
        })
        createServer({
          port: options.port,
          resume,
        })
        break
      }

      case 'watch': {
        const outputPath = options.outputDir || './resume/resume.json'
        const sourcePath = path.resolve(__dirname, '../data/resume.ts')

        console.log(`开始监听文件变化: ${sourcePath}`)

        const generateResumeJson = () => {
          delete require.cache[require.resolve('../data/resume')]
          // eslint-disable-next-line ts/no-require-imports
          const freshSource = require('../data/resume').default || require('../data/resume').resumeSource
          const resumeData = JSON.stringify(freshSource, null, 2)
          fs.writeFileSync(outputPath, resumeData, 'utf8')
          console.log(`简历数据已生成到: ${outputPath}`)
        }

        generateResumeJson()

        fs.watchFile(sourcePath, { interval: 1000 }, (curr, prev) => {
          if (curr.mtime !== prev.mtime) {
            console.log('\n🔄 检测到 resume.ts 文件更新，重新生成简历...')
            generateResumeJson()
            console.log('✅ 简历更新完成，继续监听文件变化...\n')
          }
        })

        process.on('SIGINT', () => {
          console.log('\n正在停止监听...')
          fs.unwatchFile(sourcePath)
          process.exit(0)
        })
        break
      }

      default:
        console.log(`
          简历构建工具

          使用方法:
            npx esno src/cli/index.ts <command> [options]

          命令:
            build          构建 HTML 和 PDF
            build:html     只构建 HTML
            build:pdf      只构建 PDF
            serve          启动开发服务器
            dev            构建并启动开发服务器
            watch          监听简历数据变化并自动生成 JSON

          选项:
            --template     指定模板名称
            --output-dir   指定输出目录 (默认: ./dist)
            --output-filename 指定PDF输出文件名
            --port         指定服务器端口 (默认: 8888)
            --watch        启用监听模式

          示例:
            npx esno src/cli/index.ts build
            npx esno src/cli/index.ts build:html --output-dir ./build
            npx esno src/cli/index.ts serve --port 3000
            npx esno src/cli/index.ts dev
        `)
    }
  }
  catch (error) {
    console.error('执行失败:', error)
    process.exit(1)
  }
}

run()

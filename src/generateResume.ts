/**
 * 简历生成器 - 用于创建、验证和导出简历数据
 *
 * 功能：
 * - 提供TypeScript接口定义
 * - 创建简历数据
 * - 验证数据完整性
 * - 导出为JSON文件
 * - 提供示例模板
 */

import type { Education, Project, Resume, ResumeBasics, Skill, Work } from './types'
import fs from 'node:fs'
import path from 'node:path'
import resumeSource from './resumeSource'

/**
 * 简历生成器类
 */
export class ResumeGenerator {
  private resumeData: Resume

  /**
   * 初始化简历生成器
   * @param initialData 初始简历数据，可选
   */
  constructor(initialData?: Partial<Resume>) {
    // 使用初始数据或空模板
    this.resumeData = {
      basics: this.createBasicsTemplate(),
      work: [],
      education: [],
      skills: [],
      projects: [],
      ...initialData,
    }
  }

  /**
   * 创建基本信息模板
   */
  private createBasicsTemplate(): ResumeBasics {
    return {
      languages: 'zh-CN',
      name: '',
      label: '',
      picture: '',
      email: '',
      phone: '',
      website: '',
      summary: '',
      location: {
        address: '',
        postalCode: '',
        city: '',
        countryCode: 'CN',
        region: '',
      },
      profiles: [],
    }
  }

  /**
   * 设置基本信息
   */
  setBasics(basics: Partial<ResumeBasics>): this {
    this.resumeData.basics = {
      ...this.resumeData.basics,
      ...basics,
    }
    return this
  }

  /**
   * 添加工作经历
   */
  addWork(work: Work): this {
    if (!this.resumeData.work) {
      this.resumeData.work = []
    }
    this.resumeData.work.push(work)
    return this
  }

  /**
   * 添加教育经历
   */
  addEducation(education: Education): this {
    if (!this.resumeData.education) {
      this.resumeData.education = []
    }
    this.resumeData.education.push(education)
    return this
  }

  /**
   * 添加技能
   */
  addSkill(skill: Skill): this {
    if (!this.resumeData.skills) {
      this.resumeData.skills = []
    }
    this.resumeData.skills.push(skill)
    return this
  }

  /**
   * 添加项目
   */
  addProject(project: Project): this {
    if (!this.resumeData.projects) {
      this.resumeData.projects = []
    }
    this.resumeData.projects.push(project)
    return this
  }

  /**
   * 获取当前简历数据
   */
  getResume(): Resume {
    return this.resumeData
  }

  /**
   * 验证简历数据完整性
   */
  validate(): { isValid: boolean, errors: string[] } {
    const errors: string[] = []

    // 验证基本信息
    if (!this.resumeData.basics.name) {
      errors.push('基本信息缺少姓名')
    }

    if (!this.resumeData.basics.label) {
      errors.push('基本信息缺少职位标签')
    }

    if (!this.resumeData.basics.summary) {
      errors.push('基本信息缺少个人简介')
    }

    // 验证工作经历
    if (this.resumeData.work && this.resumeData.work.length > 0) {
      this.resumeData.work.forEach((work, index) => {
        if (!work.company) {
          errors.push(`工作经历[${index}]缺少公司名称`)
        }
        if (!work.position) {
          errors.push(`工作经历[${index}]缺少职位`)
        }
      })
    }

    // 验证教育经历
    if (this.resumeData.education && this.resumeData.education.length > 0) {
      this.resumeData.education.forEach((edu, index) => {
        if (!edu.institution) {
          errors.push(`教育经历[${index}]缺少学校名称`)
        }
        if (!edu.area) {
          errors.push(`教育经历[${index}]缺少专业领域`)
        }
      })
    }

    // 验证技能
    if (this.resumeData.skills && this.resumeData.skills.length > 0) {
      this.resumeData.skills.forEach((skill, index) => {
        if (!skill.category) {
          errors.push(`技能[${index}]缺少名称`)
        }
      })
    }

    // 验证项目
    if (this.resumeData.projects && this.resumeData.projects.length > 0) {
      this.resumeData.projects.forEach((project, index) => {
        if (!project.name) {
          errors.push(`项目[${index}]缺少名称`)
        }
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * 导出为JSON文件
   * @param filePath 输出文件路径
   * @param format 是否格式化JSON
   */
  exportToJson(filePath: string, format: boolean = true): void {
    try {
      const jsonStr = format
        ? JSON.stringify(this.resumeData, null, 2)
        : JSON.stringify(this.resumeData)

      // 确保目录存在
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.writeFileSync(filePath, jsonStr, 'utf8')
      console.log(`简历数据已成功导出到: ${filePath}`)
    }
    catch (error) {
      console.error('导出失败:', error)
      throw error
    }
  }

  /**
   * 从JSON文件导入数据
   * @param filePath JSON文件路径
   */
  importFromJson(filePath: string): this {
    try {
      const jsonStr = fs.readFileSync(filePath, 'utf8')
      const data = JSON.parse(jsonStr)

      // 合并数据，保留现有数据
      this.resumeData = {
        ...this.resumeData,
        ...data,
      }

      console.log(`简历数据已从 ${filePath} 成功导入`)
      return this
    }
    catch (error) {
      console.error('导入失败:', error)
      throw error
    }
  }

  /**
   * 监听 resumeSource 文件变化并自动重新生成
   */
  static watchResumeSource(outputPath: string = './resume/resume.json'): void {
    const resumeSourcePath = path.resolve(__dirname, 'resumeSource.ts')
    
    console.log(`开始监听文件变化: ${resumeSourcePath}`)

    // 首次生成
    this.generateFromSource(outputPath)

    // 监听文件变化
    fs.watchFile(resumeSourcePath, { interval: 1000 }, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        console.log('\n🔄 检测到 resumeSource.ts 文件更新，重新生成简历...')
        
        // 清除模块缓存以获取最新数据
        delete require.cache[require.resolve('./resumeSource')]
        
        // 重新生成简历
        this.generateFromSource(outputPath)
        
        console.log('✅ 简历更新完成，继续监听文件变化...\n')
      }
    })
  }

  /**
   * 从 resumeSource 生成简历文件
   */
  static generateFromSource(outputPath: string): void {
    try {
      // 清除模块缓存
      delete require.cache[require.resolve('./resumeSource')]
      
      // 重新导入最新的 resumeSource
      const freshResumeSource = require('./resumeSource').default || require('./resumeSource').resumeSource
      
      const generator = new ResumeGenerator(freshResumeSource)
      
      // 验证数据
      const validation = generator.validate()
      if (!validation.isValid) {
        console.log('❌ 数据验证失败:')
        validation.errors.forEach(error => console.log(`  - ${error}`))
      } else {
        console.log('✅ 数据验证通过!')
      }
      
      // 导出到文件
      generator.exportToJson(outputPath)
      
    } catch (error) {
      console.error('❌ 生成简历时出错:', error)
    }
  }

  /**
   * 停止监听文件变化
   */
  static stopWatching(): void {
    const resumeSourcePath = path.resolve(__dirname, 'resumeSource.ts')
    fs.unwatchFile(resumeSourcePath)
    console.log('🛑 停止监听文件变化')
  }
}

// 如果直接运行此脚本，则执行示例
if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'watch':
      // 监听模式
      const outputPath = args[1] || './resume/resume.json'
      ResumeGenerator.watchResumeSource(outputPath)
      
      // 处理程序退出
      process.on('SIGINT', () => {
        console.log('\n正在停止监听...')
        ResumeGenerator.stopWatching()
        process.exit(0)
      })
      break

    case 'generate':
      // 单次生成模式
      const generatePath = args[1] || './resume/resume.json'
      ResumeGenerator.generateFromSource(generatePath)
      break

    default:
      // 默认模式：生成并显示使用说明
      // 创建示例简历
      const generator = new ResumeGenerator(resumeSource)

      // 验证数据
      const validation = generator.validate()
      if (!validation.isValid) {
        console.log('数据验证失败:')
        validation.errors.forEach(error => console.log(`- ${error}`))
      }
      else {
        console.log('数据验证通过!')
      }

      // 导出到文件
      generator.exportToJson('./resume/resume.json')

      console.log('\n示例简历生成完成!')
      console.log('\n📖 使用说明:')
      console.log(`
1. 单次生成简历:
   npx esno src/generateResume.ts generate [输出路径]

2. 监听模式 (推荐用于开发):
   npx esno src/generateResume.ts watch [输出路径]

3. 编程方式使用:
import { ResumeGenerator } from './src/generateResume'

// 方法1: 创建空白简历并逐步添加数据
const generator = new ResumeGenerator()
generator.setBasics({ name: '你的姓名', label: '你的职位' })
generator.addWork({ company: '公司名', position: '职位', ... })
generator.addSkill({ name: '技能名称', level: '精通', ... })
generator.exportToJson('./resume/my-resume.json')

// 方法2: 监听 resumeSource.ts 文件变化
ResumeGenerator.watchResumeSource('./resume/resume.json')

// 方法3: 手动从 resumeSource 生成
ResumeGenerator.generateFromSource('./resume/resume.json')
      `)

      console.log('\n🔥 监听模式启动命令:')
      console.log('npx esno src/generateResume.ts watch')
      break
  }
}

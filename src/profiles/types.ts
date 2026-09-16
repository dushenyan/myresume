import type { Resume } from '../types'

/**
 * 简历配置
 *
 * 每份简历 = 一份共享基础数据（src/data）+ 一组覆盖/筛选逻辑 + 独立的输出路径。
 * 投递新岗位时在 src/profiles/ 下新增一个配置文件并注册到 index.ts 即可，
 * generate / build-html / build-pdf 会自动为它多产出一份 JSON、HTML 与 PDF。
 */
export interface ResumeProfile {
  /**
   * 配置标识（用于命令行 --profile 过滤与日志输出）
   */
  id: string
  /**
   * 展示名称（如「前端-社招」）
   */
  displayName: string
  /**
   * 生成的简历 JSON 输出路径（serve 预览也读取该文件）
   */
  jsonOutput: string
  /**
   * 生成的 HTML 输出路径
   */
  htmlOutput: string
  /**
   * 生成的 PDF 输出路径
   */
  pdfOutput: string
  /**
   * 基于共享基础数据生成本份简历：
   * 可覆盖 html_title / summary / label，筛选或重排 projects、skills 等。
   * 默认简历应原样返回 base，保证输出与基础数据一致。
   */
  build: (base: Resume) => Resume
}

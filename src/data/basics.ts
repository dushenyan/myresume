/**
 * 简历基本信息模块
 *
 * 将个人信息从主数据源中拆出独立维护：
 * 个人信息更新频率较高（头像、联系方式、社交账号等），独立成文件便于定位修改，
 * 也避免在编辑联系方式时误触项目经历等业务数据。
 */
import type { Resume } from '../types'

/**
 * 个人基本信息（姓名、联系方式、社交账号、个人简介等）
 */
export const basicInfo: Resume['basics'] = {
  name: '杜审言',
  picture: 'https://avatars.githubusercontent.com/u/63347504',
  label: 'Agent 开发工程师',
  headline: 'Agent 开发 · 多 Agent 编排 · RAG · 智能体平台 · LLM 微调与推理',
  summary: '前端工程师出身，近 8 年工程经验；近 2 年系统转向 AI Agent 与 LLM 应用开发，个人项目覆盖「模型微调 → 语义检索 → RAG → 多 Agent 编排」完整链路。\n'
    + '\n'
    + '核心优势：\n'
    + '• Agent 与编排：自研四角色 Agent 编排器（控制流与语言任务分离）、Coze/Dify 低代码平台 8+ 业务智能体交付、LangChain 全栈（LCEL / Memory / Tools / RAG）\n'
    + '• RAG 与模型：三存储 RAG 架构、BM25 + 向量混合检索 + bge-reranker 精排两阶段管线、Qwen2.5 LoRA 微调、bge 中文向量与重排模型自适应部署\n'
    + '• 服务与部署：Python / FastAPI 异步全栈（MySQL / ES / Redis / Neo4j），Docker + XInference + AutoDL 私有化部署链路（数据不出内网）',
  website: 'https://duhenyanblog.netlify.app/',
  address: '海南 海口',
  projects_url: 'https://github.com/dushenyan',
  image_avatar: 'https://avatars.githubusercontent.com/u/63347504',
  username: 'dushenyan',
  email: 'shenyandu@qq.com',
  html_title: '杜审言-Agent 开发工程师',
  // 页脚 PDF 链接：HTML 与 PDF 同落在 dist/ 根，故只写文件名
  pdfLink: '杜审言-Agent 开发工程师-社招.pdf',
  languages: '中文',
  phone: '18379514819',
  wechat: 'Sy508080',
  profiles: [
    {
      network: 'GitHub',
      url: 'https://github.com/dushenyan',
      username: 'dushenyan',
    },
    {
      network: 'Website',
      username: 'dushenyan',
      url: 'https://duhenyanblog.netlify.app/',
    },
    {
      network: 'Knowledge',
      url: 'https://mainsibaodian.netlify.app/',
      username: 'dushenyan',
    },
  ],
}

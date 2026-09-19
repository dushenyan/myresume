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
  // 合并原「自我评价」区块后的总述：按招聘官 6 秒扫描写——首句即定位（方向+落地数字），
  // 四条核心优势每条只留「能力 + 一个锚点」，细节全部留给项目区展开
  summary: '近 2 年聚焦 AI Agent 与 LLM 应用开发，在政务业务场景主导 3 个 AI 应用从 0 到 1 上线（智能客服知识中台 / GraphRAG 知识库 / LangGraph 多 Agent 研究助手）；近 8 年前端工程底蕴，对话工作台、流式渲染与过程可视化可独立完成，能把 Agent 从 Demo 推进到可交付产品。\n'
    + '\n'
    + '核心优势：\n'
    + '• Agent 与编排：LangGraph 有向图状态机编排四角色 Agent（Checkpointer 断点续跑、控制流与语言任务分离）；Coze/Dify 低代码交付 8+ 业务智能体，双轨覆盖技术与场景\n'
    + '• RAG 与检索：GraphRAG 三存储异构架构、BM25 + 向量 RRF 融合检索、bge-reranker 两阶段精排、RAGAS 评估与 HITL 反馈闭环，Top-5 召回率 71% → 93%\n'
    + '• 模型与底层：Qwen2.5 LoRA 微调（loss mask / ChatML / QLoRA）、意图识别四方案选型（BERT 方案 95%+ 准确率）、bge 向量与重排模型自适应部署\n'
    + '• 服务与部署：Python / FastAPI 异步全栈（MySQL / ES / Redis / Neo4j），Docker + XInference（vLLM 推理后端）+ AutoDL 私有化链路，数据不出域',
  website: 'https://duhenyanblog.netlify.app/',
  address: '海南 海口',
  projects_url: 'https://github.com/dushenyan',
  image_avatar: 'https://avatars.githubusercontent.com/u/63347504',
  username: 'dushenyan',
  email: 'shenyandu@qq.com',
  html_title: '杜审言-Agent 开发工程师',
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
      url: 'http://134.175.23.212:8681/',
      username: 'cockpit-desktop',
    },
    {
      network: 'Book',
      url: 'http://134.175.23.212:8581/',
      username: 'facial-makeup',
    },
  ],
}

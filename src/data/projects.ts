/**
 * 简历业务项目模块
 *
 * 项目经历是简历的核心内容，单文件容易膨胀至数百行。
 * 拆分后按业务项目独立维护，新增/迭代项目时无需滚动浏览其他模块，
 * 也便于按项目维度做版本对比。
 * 避免冲淡 AI 应用方向的核心叙事。
 */
import type { Resume } from '../types'

/**
 * 业务项目经历列表（按时间倒序，主项目在前，次要项目标记 printHidden）
 */
export const projects: Resume['projects'] = [
  {
    name: '政府密码云服务平台',
    displayName: '政府密码云服务平台',
    summary: '政务SaaS平台，支持多租户隔离、高并发访问，通过等保三级认证',
    primaryLanguage: ['Vue3', 'TypeScript', 'Pinia', 'VueRouter4', 'Element Plus', 'Vite'],
    description: '作为前端架构师，主导设计并实现政府密码云服务平台的前端架构。平台采用微前端架构，支持多租户隔离，日均访问量超过10万，服务20+政府部门',
    responsibilities: [
      '【架构设计】设计微前端架构，实现多个子应用独立开发部署，支持多租户数据隔离和细粒度权限管理',
      '【性能优化】首屏加载从5s优化至1.2s（↑76%）：路由懒加载、关键CSS内联、图片WebP+CDN、Gzip压缩',
      '【安全加固】实现CSP策略、XSS/CSRF防护、敏感数据加密传输，主导通过等保三级认证',
      '【工程化】建立CI/CD流程，实现自动化构建测试部署，发布周期从3天缩短至1天',
    ],
    achievements: [
      '系统稳定性99.9%，支持10万+日活，零安全事故',
      '开发效率提升50%，迭代周期从2周缩短至1周',
      '成功通过等保三级认证，服务20+政府部门',
    ],
  },
  {
    name: '营商环境大数据综合信息平台（大屏）',
    displayName: '营商环境大数据综合信息平台',
    summary: '政府营商环境监测4K数据可视化大屏，实时展示多维度营商数据',
    primaryLanguage: ['Vue3', 'ECharts 5', 'TypeScript', 'WebGL', 'D3.js', 'Three.js'],
    description: '作为技术负责人，带领团队开发海南营商数据大屏项目。实现实时数据监控、多维度数据分析与可视化展示，为政府决策者提供直观数据支持，7×24小时稳定运行',
    responsibilities: [
      '【性能优化】Canvas替代SVG渲染，性能提升300%，支持百万级数据实时渲染；Web Worker处理数据计算，避免主线程阻塞',
      '【可视化】基于ECharts深度定制10+图表，D3.js实现关系图，Three.js/WebGL实现3D地图和粒子效果',
      '【实时数据】WebSocket实时推送+增量更新策略，本地缓存，数据延迟<100ms',
      '【稳定性】实现自动重连、内存泄漏监控、错误降级，大屏设备多分辨率兼容适配',
    ],
    achievements: [
      '获海南省数据应用创新奖（省级奖项）',
      '性能提升300%，支持百万级数据流畅渲染',
      '已在海南省10+政府部门部署使用',
    ],
  },
  {
    name: '大数据资源服务门户（BRS Portal）',
    displayName: '大数据资源服务门户',
    summary: '政务大数据资源管理与服务平台，涵盖资源管理、智能搜索、审批流程等核心模块',
    primaryLanguage: ['Vue2', 'Element UI', 'ECharts', 'Vuex', 'Vue Router'],
    description: '参与大数据资源服务门户开发，负责知识库系统、政务信息整合、资源总览看板等核心模块，累计提交1490+次',
    responsibilities: [
      '【知识库系统】实现栏目管理、文档管理（发布/删除/撤回/回收站）、附件管理等完整功能',
      '【政务整合】实现任务清单新增编辑、完成情况统计下钻、佐证材料上传（支持1G大文件）',
      '【智能搜索】接入智能搜索接口，实现关键词高亮、多维度搜索、长文本优化处理',
      '【代办中心】实现9个新目录待办数量显示，云资源变更/注销审批流程，部分同意和驳回处理',
    ],
    achievements: [
      '负责模块功能完整交付，通过测试验收',
      '优化搜索响应速度和准确性，提升用户体验',
      '建立可复用组件库，提高团队开发效率',
    ],
  },
  {
    name: 'liuyun-cli 脚手架工具',
    displayName: 'liuyun-cli 脚手架工具',
    summary: '基于Node.js+TypeScript的团队内部CLI工具，统一项目初始化流程',
    primaryLanguage: ['Node.js', 'TypeScript', 'Commander', 'Inquirer'],
    description: '独立开发并维护团队内部CLI脚手架工具，支持交互式项目初始化、多模板选择、代码仓库下载，已在团队内部推广使用',
    responsibilities: [
      '基于Commander+Inquirer实现交互式命令行，支持多种项目模板选择',
      '集成download-git-repo实现代码仓库下载，支持进度显示和错误处理',
      '完善开发文档，推动团队统一项目初始化规范',
    ],
    achievements: [
      '团队内部推广使用，统一项目初始化流程',
      '减少新项目搭建时间，提升团队开发效率',
    ],
  },
]

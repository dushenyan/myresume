import type { Resume } from './types'

export const basicInfo: Resume['basics'] = {
  name: '杜审言',
  picture: 'https://avatars.githubusercontent.com/u/63347504',
  label: '前端开发工程师',
  headline: '6年前端开发经验 | 政务数字化 & 企业SaaS方向 | Vue3 / React 技术专家',
  summary: '6年前端开发经验，专注政务数字化和企业级SaaS应用开发。主导过多个核心产品从0到1的全生命周期，涵盖架构设计、性能优化与工程化建设。\n'
    + '\n'
    + '核心优势：\n'
    + '• 主导政府密码云平台（等保三级）、营商数据大屏（省级获奖）、ERP系统等核心项目\n'
    + '• 精通Vue3/React双栈，深入源码原理，有微前端架构与多租户SaaS设计实践\n'
    + '• 自研CLI脚手架工具与组件库，推动团队工程化提效\n'
    + '• 获海南省数据应用创新奖、软件设计师中级认证、公司年度优秀技术负责人',
  website: 'https://duhenyanblog.netlify.app/',
  address: '海南 海口',
  projects_url: 'https://github.com/dushenyan',
  image_avatar: 'https://avatars.githubusercontent.com/u/63347504',
  username: 'dushenyan',
  email: 'shenyandu@qq.com',
  html_title: '杜审言-前端开发-6年-深圳',
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

export const certifications: Resume['certifications'] = [
  {
    name: '软件设计师（中级）',
    issuer: '海南省人力资源和社会保障厅',
    date: '2025-05-26',
    fullDate: {
      year: 2025,
      month: 5,
    },
  },
]

export const awards: Resume['awards'] = [
  {
    title: '海南省数据应用创新奖',
    summary: '海南营商数据大屏项目',
    awarder: '海南省大数据管理局',
    date: '2023-10',
    fullDate: { year: 2023, month: 10 },
  },
  {
    title: '公司年度优秀技术负责人',
    summary: '技术创新与团队建设突出',
    awarder: '海南流云科技有限公司',
    date: '2023-01-01',
    fullDate: { year: 2023, month: 1 },
  },
  {
    title: '全国大学生数学建模竞赛',
    summary: '获得省级二等奖',
    awarder: '江西省教育厅',
    date: '2019-10',
    fullDate: { year: 2019, month: 10 },
  },
]

/**
 * 创建简历模板 - 海口
 */
export const resumeSource: Resume = {
  basics: {
    ...basicInfo,
  },
  projects: [
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
      printHidden: true,
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
      name: '流云ERP系统（Web + 移动端）',
      displayName: '流云ERP系统',
      summary: '企业级ERP管理系统，涵盖销售、采购、财务、仓库、生产、协同审批等全流程',
      primaryLanguage: ['Vue3', 'TypeScript', 'Element Plus', 'Pinia', 'uni-app', 'Wot Design'],
      description: '参与流云ERP Web端（Vue3+Element Plus）和移动端（uni-app，支持微信小程序+H5）的开发，负责个人中心、开单模块、协同审批、路由权限等核心功能',
      responsibilities: [
        '【移动端】负责个人中心（修改密码、关于我们）、开单菜单配置、协同审批（审批人多选、抄送人处理）等模块',
        '【路由权限】配置路由拦截前置白名单，实现登录自动授权，处理分包构建和发布目录设置',
        '【组件封装】封装公共列表显示组件，提升代码复用率',
        '【跨平台】基于uni-app实现微信小程序和H5双端适配，处理iOS底部小黑条等兼容性问题',
      ],
      achievements: [
        '移动端支持微信小程序和H5双端运行',
        '协同审批功能完整交付，支持多种审批类型',
        '路由权限体系完善，系统安全性提升',
      ],
    },
    {
      printHidden: true,
      name: '海政通待办系统（Web + H5）',
      displayName: '海政通待办系统',
      summary: '海南省政务服务平台待办事项管理系统，支持消息转待办、第三方待办、评论协作等功能',
      primaryLanguage: ['Vue2', 'Vant UI', 'Element UI', 'UAA认证', 'Vue Router'],
      description: '参与海政通待办H5（148次提交）和Web管理端的开发，负责消息转待办、第三方待办处理、生产环境配置等核心功能',
      responsibilities: [
        '【消息转待办】实现消息内容解析、大文件切片上传（支持1G）、参数验证、参与人和附件信息展示',
        '【第三方待办】修复移动端搜索页跳转三方待办详情地址错误，处理嵌入三方页面和门户跳转逻辑',
        '【生产配置】海政通信创版本SDK更换，替换项目所有源文件地址，关闭生产调试打印',
        '【Web端】开发待办详情页（基本信息/任务进度/操作记录）、标签管理、海政通选人组件集成',
      ],
      achievements: [
        '消息转待办功能完整交付，支持大文件上传',
        '修复多个关键缺陷，系统稳定性提升',
        '海政通SDK集成，通过信创环境适配验证',
      ],
    },
    {
      name: 'GrandTag保险服务网站',
      displayName: 'GrandTag保险服务网站',
      summary: '国际化保险服务平台，支持多语言、多币种、多地区',
      primaryLanguage: ['React 17', 'TypeScript', 'Next.js', 'Redux Toolkit', 'Ant Design Pro', 'Styled Components'],
      description: '作为前端技术负责人，负责GrandTag保险服务网站的整体架构设计与开发。面向全球用户，支持多语言切换、多币种展示与跨境支付',
      responsibilities: [
        '【SSR优化】采用Next.js实现服务端渲染，首屏加载速度提升50%，SEO效果显著提升',
        '【国际化】基于i18next实现10种语言无缝切换，支持RTL布局和多币种展示',
        '【响应式】建立响应式设计系统，确保移动端、平板与桌面端一致体验',
        '【性能优化】数据预加载、接口缓存、图片优化，全球访问速度平均优化40%',
      ],
      achievements: [
        '网站访问量提升120%，转化率提升35%',
        '全球访问速度平均优化40%，低网速地区体验显著提升',
        '支持日访问量峰值50万，系统稳定运行无故障',
      ],
    },
    {
      printHidden: true,
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
    {
      printHidden: true,
      name: 'liuyun-ui 组件库',
      displayName: 'liuyun-ui 组件库',
      summary: '基于Vue3+TypeScript的团队内部组件库，支持Vue2和Vue3双版本',
      primaryLanguage: ['Vue3', 'TypeScript', 'Element Plus', 'Vite', 'VitePress'],
      description: '独立开发并维护团队内部UI组件库，采用Monorepo结构，提供LyButton、LyPersonSelect等核心组件，配套VitePress文档网站',
      responsibilities: [
        '设计Monorepo架构（pnpm workspace），实现组件、文档、测试分包管理',
        '开发LyPersonSelect人员选择组件，同时支持Vue2和Vue3，解决审批人选择窗口被隐藏等问题',
        '配置vite-plugin-dts自动生成类型声明，unplugin-auto-import实现自动导入',
        '解决组件样式被外层覆盖、生产接口跨域等实际问题',
      ],
      achievements: [
        '组件库在多个项目中落地使用',
        '支持Vue2/Vue3双版本，降低迁移成本',
        '配套文档网站，降低团队使用门槛',
      ],
    },
    {
      printHidden: true,
      name: '流云统一认证登录系统',
      displayName: '流云统一认证登录系统',
      summary: '企业级统一认证登录平台，支持钉钉免密登录、RSA密码加密、多租户',
      primaryLanguage: ['Vue3', 'Element Plus', 'jsencrypt', 'dingtalk-jsapi'],
      description: '参与流云统一认证登录系统开发，负责登录页面设计、验证码功能、路由参数处理和RSA加密优化',
      responsibilities: [
        '实现验证码功能（开启表单查看密码、提交失败重新请求验证码）',
        '处理统一认证路由携带参数，支持表单回车登录',
        '优化RSA公钥格式化，移除多余变量声明，提升代码可读性',
        '调整登录页面样式和表单输入框定位，优化用户体验',
      ],
      achievements: [
        '系统稳定运行，支持多系统统一认证接入',
        '钉钉免密登录功能完整交付',
        '通过信创环境适配验证',
      ],
    },
    {
      printHidden: true,
      name: '沉香树溯源系统（Web + H5）',
      displayName: '沉香树溯源系统',
      summary: '数字海南沉香树木管理与溯源平台，支持树木全生命周期管理',
      primaryLanguage: ['Vue2', 'Vue.js', 'Element UI', 'Vant UI', 'TypeScript'],
      description: '参与沉香树溯源系统Web管理后台和H5移动端的开发，实现树木管理、用户管理、申请审核、资讯管理等核心功能',
      responsibilities: [
        '对接树木管理（列表/详情/上下线/溯源记录）、用户管理、区域管理等接口',
        '实现批量导入树木（Excel）、下载二维码、富文本编辑等功能',
        '开发登录模块（身份证号登录）、首次登录修改密码、权限路由控制',
        '处理图片压缩上传、请求超时控制（3分钟）、树木编辑日期保存等问题',
      ],
      achievements: [
        '系统功能完整交付，通过测试验收',
        '批量导入功能支持大批量树木数据录入',
        '移动端H5适配良好，用户体验流畅',
      ],
    },
    {
      name: '海政通公告系统（Web + H5）',
      displayName: '海政通公告系统',
      summary: '海南省政务公告管理平台，支持公告发布、查阅统计、多端适配',
      primaryLanguage: ['Vue2', 'Element UI', 'Vant UI', 'WangEditor'],
      description: '参与海政通公告系统Web管理后台（150次提交）和H5移动端（80次提交）的开发，负责权限逻辑、富文本编辑器、信创环境适配等',
      responsibilities: [
        '修复公告详情长文本换行、表单校验、权限缓存等问题',
        '优化富文本编辑器（字体、图片上传），实现查阅统计导出功能',
        '处理信创环境SDK依赖问题，配置生产环境，处理角色权限逻辑',
        '实现水印显示、租户改造、持久缓存等功能',
      ],
      achievements: [
        '系统稳定运行，服务海南省政务平台用户',
        '通过信创环境适配，支持国产化部署',
        '多端（PC+移动）功能完整交付',
      ],
    },
  ],
  work: [
    {
      company: '海南流云科技有限公司',
      companyInfo: '（政务数字化服务商 | 海南省重点软件企业）',
      position: '前端开发工程师 / 技术负责人',
      website: 'http://www.hainanbi.com/',
      location: '海南海口',
      isCurrentRole: true,
      startDate: '2022-07-01',
      endDate: '',
      start: { year: 2022, month: 7 },
      end: {},
      description: '负责政务数字化核心产品的前端架构设计与开发，推动技术栈升级和工程化建设',
      highlights: [
        '【架构升级】主导Vue2→Vue3+TS技术栈升级，建立统一组件库（liuyun-ui），开发效率提升50%，发布周期从3天缩短至1天',
        '【工程化】自研liuyun-cli脚手架工具，统一项目初始化流程；设计微前端架构，支持多子应用独立开发部署，系统解耦度提升40%',
        '【性能优化】优化政府密码云平台首屏加载，从5s降至1.2s（↑76%），支持10万+日活稳定运行',
        '【安全合规】主导前端安全加固（XSS/CSRF防护、敏感数据加密），通过等保三级认证',
        '【团队建设】带领5人前端团队，建立Code Review和自动化测试流程，代码质量问题减少60%',
      ],
    },
    {
      company: '江西蓝源科技有限公司',
      position: '前端开发工程师 / 技术骨干',
      website: 'http://blueorigintech.com/',
      location: '江西南昌',
      summary: '产品研发与工程架构部',
      startDate: '2018-12-01',
      endDate: '2022-07-01',
      start: { year: 2018, month: 12 },
      end: { year: 2022, month: 7 },
      description: '负责公司核心产品的前端开发与优化，参与技术方案设计与评审，推动前端工程化建设与性能优化',
      highlights: [
        '【核心产品】开发低代码/无代码平台的市场展示网站，包含文档站点、演示环境与编码 playground',
        '【性能优化】优化大型数据可视化组件，使用Canvas替代SVG，数据渲染速度提升200%',
        '【规范建设】建立前端开发规范与代码评审流程，推动ESLint+Prettier统一代码风格，代码质量问题减少60%',
        '【技术分享】参与团队培训和知识分享，输出10+篇技术文档，提升团队整体技术水平',
      ],
    },
  ],
  skills: [
    {
      category: '核心语言',
      keywords: [
        'JavaScript / TypeScript',
        'ES6+',
        'Node.js',
        'HTML5语义化',
        'CSS3 / Less',
        '响应式设计',
      ],
    },
    {
      category: '框架生态',
      keywords: [
        'Vue 2/3（深入源码）',
        'React 16+/18',
        'React Hooks',
        'Vuex / Pinia',
        'React Router',
        'Nuxt.js',
        'uni-app',
      ],
    },
    {
      category: '工程化',
      keywords: [
        'Webpack 5',
        'Vite',
        'Rollup',
        'Monorepo（pnpm workspace）',
        'CI/CD',
        'liuyun-cli（自研脚手架）',
        'liuyun-ui（自研组件库）',
      ],
    },
    {
      category: '性能优化',
      keywords: [
        'Web Vitals优化',
        '首屏加载优化',
        '渲染性能（Canvas / WebGL）',
        '微前端（qiankun / Module Federation）',
        '虚拟滚动',
        'Service Worker缓存策略',
      ],
    },
    {
      category: '数据可视化',
      keywords: [
        'ECharts 5',
        'D3.js',
        'WebGL / Three.js',
        '大屏适配（vw方案）',
        '实时数据（WebSocket）',
        '大数据渲染优化',
      ],
    },
    {
      category: '测试与质量',
      keywords: [
        'Vitest',
        'ESLint / Prettier / Husky',
        'TypeScript类型系统',
        'Code Review',
      ],
    },
  ],
  selfEvaluate: [
    '6年前端开发经验，专注政务数字化和企业级SaaS应用，主导过多个项目的全生命周期',
    '精通Vue3/React技术栈，深入理解响应式原理和性能优化，有微前端架构实践经验',
    '自研CLI脚手架工具和组件库，推动团队工程化和开发效率提升',
    '擅长数据可视化和大数据渲染优化，主导的营商大屏项目获海南省数据应用创新奖',
    '注重代码质量和工程规范，推动团队技术栈升级、自动化流程和统一开发标准',
  ],
  education: [
    {
      institution: '江西交通职业技术学院',
      area: '计算机网络技术',
      department: '信息工程系',
      studyType: '专科',
      startDate: '2018-09-01',
      endDate: '2021-06-01',
      start: { year: 2018, month: 9 },
      end: { year: 2021, month: 6 },
      description: '主修课程：计算机网络、Web前端开发、数据库原理、软件工程等',
      activities: '担任技术社团负责人，组织多次技术分享与实践活动',
      courses: ['Web前端开发', 'JavaScript编程', '计算机网络', '数据库原理'],
    },
    {
      institution: '自学与在线课程',
      area: '前端架构与性能优化',
      studyType: '持续学习',
      startDate: '2021-06-01',
      endDate: '',
      start: { year: 2021, month: 6 },
      end: {},
      description: '持续学习前沿前端技术与架构实践，参与多个在线课程与技术社区交流',
      courses: ['前端架构设计与实践', '大型应用性能优化策略', '微前端架构与实践', 'TypeScript编程'],
    },
  ],
  certifications,
  awards,
  // publications: [
  //   {
  //     name: '大型前端应用架构设计与实践',
  //     publisher: '掘金技术社区',
  //     releaseDate: '2023-06-01',
  //     url: 'https://juejin.cn/post/example123',
  //     summary: '分享了大型前端应用的架构设计思路、技术选型与实践经验',
  //   },
  //   {
  //     name: '前端性能优化实战指南',
  //     publisher: '知乎专栏',
  //     releaseDate: '2022-08-01',
  //     url: 'https://zhihu.com/example456',
  //     summary: '总结了前端性能优化的方法论与实战案例，包括加载优化、渲染优化与运行时优化',
  //   },
  // ],
  interests: ['前端架构与工程化', 'Web性能优化', '微前端与模块化开发', '技术团队管理与人才培养', '开源贡献与技术社区'],
}

export default resumeSource

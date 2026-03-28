import type { Resume } from './types'

export const basicInfo: Resume['basics'] = {
  name: '杜审言',
  picture: 'https://avatars.githubusercontent.com/u/63347504',
  label: '高级前端开发工程师',
  headline: '专注于构建高性能、可扩展的企业级前端应用，六年技术沉淀与架构实践',
  summary: '我是杜审言，拥有六年专业前端开发经验，专注于构建高质量、高性能的Web应用。我擅长前端架构设计、性能优化与团队技术治理，在大型企业级项目中积累了丰富的实战经验。\n'
    + '\n'
    + '我热衷于探索前沿技术并将其应用于实际项目，持续推动团队技术栈演进与工程化水平提升。作为技术负责人，我主导过多个重要项目的全生命周期，从需求分析到架构设计，再到最终上线与持续优化。\n'
    + '\n'
    + '我也是一名活跃的技术分享者，定期在团队内部组织技术沙龙，并在社区发表技术文章。',
  website: 'https://duhenyanblog.netlify.app/',
  address: '海南 海口',
  projects_url: 'https://github.com/dushenyan',
  image_avatar: 'https://avatars.githubusercontent.com/u/63347504',
  username: 'dushenyan',
  email: 'shenyandu@qq.com',
  html_title: '杜审言-高级前端-社招-深圳',
  languages: '中文',
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
    name: '软件设计师中级',
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
  skills: [
    {
      category: '核心语言',
      keywords: [
        'JS/TS (精通)',
        'ES6+',
        'Node.js',
        'HTML5语义化',
        'CSS3高级特性',
        '响应式设计',
      ],
    },
    {
      category: '框架生态',
      keywords: [
        'Vue 2/3 (深入源码)',
        'React 16+/18',
        'React Hooks',
        'Vuex/Pinia',
        'React Router',
        'Next.js',
        'Nuxt.js',
      ],
    },
    {
      category: '工程化',
      keywords: [
        'Webpack 5 (自定义插件)',
        'Vite',
        'Rollup',
        'Monorepo',
        'CI/CD',
        'Docker',
        'Git工作流优化',
      ],
    },
    {
      category: '性能优化',
      keywords: [
        'Web Vitals优化',
        '首屏加载优化',
        '渲染性能',
        '大型应用架构拆分',
        '微前端实践',
        'Service Worker缓存策略',
      ],
    },
    {
      category: '测试与质量',
      keywords: [
        'Jest',
        'Vitest',
        'Cypress',
        '单元测试',
        'E2E测试',
        'TS类型系统',
        'ESLint规范制定',
      ],
    },
    {
      category: '团队协作',
      keywords: [
        '技术方案设计',
        'Code Review',
        '技术文档编写',
        '团队培训',
        '跨部门沟通',
        '敏捷开发流程优化',
      ],
    },
  ],
  selfEvaluate: [
    '六年大型互联网公司前端开发经验，主导过多个企业级项目的全生命周期',
    '具备深厚的前端架构设计能力，能够构建高性能、可扩展的大型应用',
    '精通前端工程化与性能优化，持续提升开发效率与用户体验',
    '注重代码质量与工程规范，建立团队统一的开发标准与最佳实践',
    '良好的技术视野，持续关注行业动态并引入新技术提升产品竞争力',
    '优秀的团队协作与沟通能力，能够带领团队攻克复杂技术难题',
  ],
  projects: [
    {
      name: '政府密码云服务平台',
      displayName: '政府密码云服务平台',
      summary: '大规模企业级SaaS平台，支持多租户、高并发访问',
      primaryLanguage: [
        'Vue3',
        'TypeScript',
        'Pinia',
        'VueRouter4',
        'Element Plus',
        'Vite',
      ],
      description: '作为前端架构师，主导设计并实现了政府密码云服务平台的前端架构。平台采用微前端架构，支持多租户隔离，日均访问量超过10万',
      responsibilities: [
        '负责前端架构设计与实现',
        '领导前端团队，协调项目进度与质量',
        '与后端开发人员合作，确保前端功能的正常运行',
        '负责前端代码的版本控制与代码质量',
      ],
      achievements: [
        '系统稳定性达到99.9%，用户满意度提升40%',
        '开发效率提升50%，迭代周期从2周缩短至1周',
        '平台成功通过等保三级认证',
      ],
    },
    {
      name: '海南营商数据大屏',
      displayName: '海南营商数据大屏',
      summary: '实时大数据可视化平台，支持多维度数据展示与分析',
      primaryLanguage: ['Vue3', 'ECharts 5', 'TypeScript', 'WebGL', 'D3.js', 'Pinia'],
      description: '作为技术负责人，带领团队开发了海南营商数据大屏项目。该项目实现了实时数据监控、多维度数据分析与可视化展示，为决策者提供了直观的数据支持',
      responsibilities: [
        '设计了高性能的可视化架构，解决了大量数据渲染的性能瓶颈',
        '实现了数据缓存与增量更新策略，确保实时性的同时减轻服务器压力',
        '优化了WebGL渲染性能，实现了流畅的3D数据可视化效果',
        '设计了可配置的数据展示组件，提高了系统的可扩展性',
        '解决了大屏设备的兼容性问题，确保在不同分辨率下的良好展示效果',
      ],
      achievements: [
        '数据可视化性能提升300%，支持百万级数据实时渲染',
        '项目获得海南省数据应用创新奖',
        '平台已在多个政府部门部署使用',
      ],
    },
    {
      name: 'GrandTag保险服务网站',
      displayName: 'GrandTag保险服务网站',
      summary: '国际化保险服务平台，支持多语言、多币种、多地区',
      primaryLanguage: [
        'React 17',
        'TypeScript',
        'Next.js',
        'Redux Toolkit',
        'Ant Design Pro',
        'Styled Components',
      ],
      description: '作为前端技术负责人，负责GrandTag保险服务网站的整体架构设计与开发。该项目面向全球用户，支持多语言切换、多币种展示与跨境支付',
      responsibilities: [
        '采用Next.js框架实现了服务端渲染(SSR)，提升了SEO效果与首屏加载速度',
        '设计并实现了基于i18next的国际化方案，支持10种语言无缝切换',
        '建立了响应式设计系统，确保在移动端、平板与桌面端的一致体验',
        '实现了前端微服务化架构，支持多个团队并行开发与独立部署',
        '优化了API调用策略，实现了数据预加载与缓存，提升了用户体验',
      ],
      achievements: [
        '网站访问量提升120%，转化率提升35%',
        '全球访问速度平均优化40%，尤其在低网速地区表现突出',
        '支持日访问量峰值50万，系统稳定运行无故障',
      ],
    },
    {
      name: '自研办公管理系统',
      displayName: '自研办公管理系统',
      summary: '企业级办公自动化平台，支持多模块集成与定制化配置',
      primaryLanguage: [
        'Vue3',
        'TypeScript',
        'Vite',
        'Pinia',
        'VueRouter4',
        'Arco Design',
      ],
      description: '作为项目负责人，主导开发了公司内部使用的办公管理系统。系统涵盖了人力资源、行政、财务、项目管理等多个模块，支持高度定制化配置',
      responsibilities: [
        '设计了模块化的系统架构，实现了各业务模块的解耦与独立演进',
        '建立了完善的权限管理体系，支持细粒度的功能权限与数据权限控制',
        '实现了表单引擎，支持业务人员自定义表单与流程',
        '优化了大型数据列表的渲染性能，支持虚拟滚动与高效筛选',
        '建立了完善的前端测试体系，确保代码质量与系统稳定性',
      ],
      achievements: [
        '系统上线后，员工工作效率提升60%，行政流程处理时间缩短70%',
        '支持5000+用户同时在线，系统响应时间控制在200ms以内',
        '通过了公司内部的安全审计与性能测试',
      ],
    },
    {
      name: '用户统一认证系统',
      displayName: '用户统一认证系统',
      summary: '基于OAuth2.0协议的企业级用户认证与授权平台',
      primaryLanguage: [
        'Node.js',
        'Express',
        'MongoDB',
        'OAuth2.0',
      ],
      description: '作为项目负责人，主导开发了公司内部使用的用户认证系统。系统采用OAuth2.0协议，支持多租户、多应用、多用户类型',
      responsibilities: [
        '设计并实现了基于JWT的认证与授权机制，支持多租户隔离与单点登录',
        '实现了基于OAuth2.0的客户端认证与授权流程，支持第三方应用接入',
        '实现了用户管理与权限控制，支持用户自助注册与管理',
        '实现了API网关与反向代理，支持跨域与安全控制',
        '优化了系统性能，支持高并发访问与海量用户认证',
      ],
      achievements: [
        '系统上线后，用户认证速度提升50%，系统稳定性提升30%',
        '支持10000+用户同时在线，系统响应时间控制在100ms以内',
        '通过了公司内部的安全审计与性能测试',
      ],
    },
    {
      name: '租户管理系统',
      displayName: '租户管理系统',
      summary: '基于SaaS架构的多租户管理平台',
      primaryLanguage: [
        'Vue3',
        'TypeScript',
        'Vite',
        'Pinia',
        'VueRouter4',
        'Element Plus',
      ],
      description: '作为项目负责人，主导开发了公司内部使用的租户管理系统。系统支持多租户管理、租户配置与监控',
      responsibilities: [
        '设计并实现了租户隔离与数据加密机制，保障租户数据安全',
        '实现了租户配置与管理功能，支持租户自定义设置',
        '实现了监控与告警系统，实时监控租户使用情况',
        '优化了系统性能，支持高并发访问与大规模租户管理',
      ],
      achievements: [
        '系统上线后，租户管理效率提升40%，系统响应时间控制在50ms以内',
        '支持1000+租户同时在线，系统稳定性达到99.9%',
        '通过了公司内部的安全审计与性能测试',
      ],
    },
    {
      name: '流云数字化转型小程序',
      displayName: '流云数字化转型小程序',
      summary: '基于Uniapp的数字化转型工具',
      primaryLanguage: [
        '微信小程序',
        'JavaScript',
        'Uniapp',
        'ECharts 5',
      ],
      description: '开发了流云数字化转型小程序，助力企业快速实现数字化转型，提供在线调研、分析与报告生成等功能',
      achievements: [
        '上线后，月活跃用户增长300%，用户反馈积极',
        '实现了数据可视化分析，提升了用户体验',
        '通过了微信小程序商店审核，正式上线发布',
      ],
    },
    {
      name: 'DRS 数据资源一本账',
      displayName: 'DRS 数据资源一本账',
      summary: '数据资源管理与分析平台',
      primaryLanguage: [
        'Vue.js',
        'TypeScript',
      ],
      description: '开发了DRS数据资源一本账平台，提供数据资源的统一管理和分析服务',
      achievements: [
        '实现了数据资源的全量管理与分析功能',
        '优化了数据查询性能，支持大规模数据处理',
        '提高了数据安全性和合规性',
      ],
    },
    {
      name: '信创公告管理',
      displayName: '信创公告管理',
      summary: '信创公告管理系统',
      primaryLanguage: [
        'Vue.js',
        'TypeScript',
      ],
      description: '开发了信创公告管理系统，提供信创相关公告的发布与管理服务',
      achievements: [
        '实现了公告的发布、编辑与删除功能',
        '优化了系统性能，提高了响应速度',
        '确保了系统的稳定性和安全性',
      ],
    },
    {
      name: '海政通待办',
      displayName: '海政通待办',
      summary: '海南省政务服务平台待办事项管理系统',
      primaryLanguage: [
        'Vue.js',
        'TypeScript',
      ],
      description: '开发了海政通待办系统，提供海南省政务服务平台待办事项管理服务',
      achievements: [
        '实现了待办事项的全量管理与分析功能',
        '优化了数据查询性能，支持大规模数据处理',
        '提高了数据安全性和合规性',
      ],
    },
    {
      name: '沉香树溯源系统',
      displayName: '沉香树溯源系统',
      summary: '沉香树溯源系统',
      primaryLanguage: [
        'Vue.js',
        'TypeScript',
      ],
      description: '开发了沉香树溯源系统，提供沉香树的溯源信息查询与分析服务',
      achievements: [
        '实现了沉香树溯源信息的查询与分析功能',
        '优化了数据查询性能，支持大规模数据处理',
        '提高了数据安全性和合规性',
      ],
    },
  ],
  work: [
    {
      company: '海南流云科技有限公司',
      position: '高级前端开发工程师 / 技术负责人',
      website: 'http://www.hainanbi.com/',
      location: '海南海口',
      isCurrentRole: true,
      startDate: '2022-07-01',
      endDate: '',
      start: { year: 2022, month: 7 },
      end: {},
      description: '作为前端技术负责人，负责公司前端团队的技术规划、架构设计与团队建设。主导多个核心产品的前端开发与优化，推动技术栈升级与工程化建设',
      highlights: [
        '主导公司前端技术栈从Vue2升级到Vue3 + TypeScript，提升代码质量与开发效率',
        '建立了统一的前端组件库与设计系统，降低了30%的开发成本',
        '优化了CI/CD流程，实现了自动化构建、测试与部署，发布周期从3天缩短至1天',
        '设计并实施了微前端架构，支持多团队并行开发，系统解耦度提升40%',
        '带领5人前端团队完成多个大型项目的开发，培养了2名中级前端工程师',
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
        '开发了低代码/无代码平台的市场展示网站，包含文档站点、演示环境与编码 playground',
        '优化了大型数据可视化组件的性能，数据渲染速度提升200%',
        '建立了前端开发规范与代码评审流程，代码质量问题减少60%',
        '负责多个项目的前端架构设计与技术选型，确保系统的可扩展性与可维护性',
        '参与团队培训与知识分享，提升团队整体技术水平',
      ],
    },
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
      gpa: '优秀',
      courses: ['Web前端开发', 'JavaScript高级编程', '计算机网络', '数据库原理'],
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
      courses: ['前端架构设计与实践', '大型应用性能优化策略', '微前端架构与实践', 'TypeScript高级编程'],
    },
  ],
  certifications,
  awards,
  publications: [
    {
      name: '大型前端应用架构设计与实践',
      publisher: '掘金技术社区',
      releaseDate: '2023-06-01',
      url: 'https://juejin.cn/post/example123',
      summary: '分享了大型前端应用的架构设计思路、技术选型与实践经验',
    },
    {
      name: '前端性能优化实战指南',
      publisher: '知乎专栏',
      releaseDate: '2022-08-01',
      url: 'https://zhihu.com/example456',
      summary: '总结了前端性能优化的方法论与实战案例，包括加载优化、渲染优化与运行时优化',
    },
  ],
  interests: ['前端架构与工程化', 'Web性能优化', '微前端与模块化开发', '技术团队管理与人才培养', '开源贡献与技术社区'],
}

export const resumeOptimized: Resume = {
  basics: {
    ...basicInfo,
    label: '前端开发工程师',
    headline: '6年前端开发经验 | 政务数字化&企业SaaS方向 | Vue3/React技术专家',
    summary: '6年前端开发经验，专注政务数字化和企业级SaaS应用开发。擅长Vue3/React技术栈、微前端架构设计和性能优化。\n\n核心优势：\n• 主导过政府密码云平台（等保三级）、营商数据大屏（省级获奖）等核心项目\n• 精通多租户SaaS架构、权限管理体系和数据可视化技术\n• 具备完整的前端工程化实践经验，推动团队技术栈升级和效率提升\n• 获海南省数据应用创新奖、公司年度优秀技术负责人',
    html_title: '杜审言-前端开发-6年-深圳',
  },
  work: [
    {
      company: '海南流云科技有限公司',
      companyInfo: '（政务数字化服务商 | 200+人规模 | 海南省重点软件企业）',
      position: '高级前端开发工程师',
      location: '海南海口',
      isCurrentRole: true,
      startDate: '2022-07-01',
      endDate: '',
      start: {
        year: 2022,
        month: 7,
      },
      end: {},
      description: '负责政务数字化核心产品的前端架构设计与开发，推动技术栈升级和工程化建设。',
      highlights: [
        '【架构升级】主导Vue2→Vue3+TS技术栈升级，建立统一组件库，开发效率提升50%，发布周期从3天缩短至1天',
        '【性能优化】优化政府密码云平台首屏加载，从5s降至1.2s（提升76%），支持10万+日活稳定运行',
        '【工程化】设计并实施微前端架构，支持5个子应用独立开发部署，系统解耦度提升40%',
        '【安全合规】主导前端安全加固，通过等保三级认证，实现XSS/CSRF防护和敏感数据加密',
        '【团队建设】带领5人前端团队，建立Code Review和自动化测试流程，代码质量问题减少60%',
      ],
    },
    {
      company: '江西蓝源科技有限公司',
      companyInfo: '（企业数字化服务商 | 150+人规模 | 低代码平台研发）',
      position: '前端开发工程师',
      location: '江西南昌',
      startDate: '2018-12-01',
      endDate: '2022-07-01',
      start: {
        year: 2018,
        month: 12,
      },
      end: {
        year: 2022,
        month: 7,
      },
      description: '负责低代码平台和数据可视化产品的前端开发，参与技术方案设计和性能优化。',
      highlights: [
        '【核心产品】开发低代码平台的市场展示网站，包含文档站、演示环境和在线Playground，月访问量5万+',
        '【性能优化】优化大型数据可视化组件，使用Canvas替代SVG，数据渲染速度提升200%，支持10万+数据点流畅展示',
        '【规范建设】建立前端开发规范和代码评审流程，推动ESLint+Prettier统一代码风格',
        '【技术分享】参与团队培训和知识分享，输出10+篇技术文档，提升团队整体技术水平',
      ],
    },
  ],
  education: [
    {
      institution: '江西交通职业技术学院',
      area: '计算机网络技术',
      studyType: '专科',
      startDate: '2018-09-01',
      endDate: '2021-06-01',
      start: {
        year: 2018,
        month: 9,
      },
      end: {
        year: 2021,
        month: 6,
      },
      gpa: '优秀 | 技术社团负责人',
    },
  ],
  skills: [
    {
      category: '前端技术栈',
      level: '精通',
      keywords: [
        'Vue 2/3（深入源码，响应式原理）',
        'React 16+/18（Hooks、并发特性）',
        'TypeScript（类型系统、泛型编程）',
        'ES6+、HTML5、CSS3',
      ],
    },
    {
      category: '工程化&架构',
      level: '熟练',
      keywords: [
        '微前端（qiankun、Module Federation）',
        'Webpack 5（自定义插件）、Vite、Rollup',
        'Monorepo（pnpm workspace）',
        'CI/CD（GitLab CI、自动化部署）',
      ],
    },
    {
      category: '性能&可视化',
      level: '熟练',
      keywords: [
        '性能优化（首屏加载、渲染优化、Web Vitals）',
        '数据可视化（ECharts 5、D3.js、WebGL）',
        '大数据渲染（虚拟滚动、Canvas优化）',
      ],
    },
    {
      category: '质量&协作',
      level: '熟练',
      keywords: [
        '测试（Jest、Vitest、Cypress）',
        '代码规范（ESLint、Prettier、Husky）',
        '团队协作（Code Review、技术文档、敏捷开发）',
      ],
    },
  ],
  projects: [
    {
      name: '政府密码云服务平台',
      displayName: '政府密码云服务平台',
      primaryLanguage: [
        'Vue3',
        'TypeScript',
        'Pinia',
        'Element Plus',
        'Vite',
      ],
      description: '面向政府部门的密码服务SaaS平台，支持多租户隔离和等保三级安全要求。',
      responsibilities: [
        '【架构设计】设计微前端架构，实现5个子应用独立开发部署，支持多租户数据隔离和权限管理',
        '【性能优化】首屏加载从5s优化至1.2s（↓76%）：路由懒加载、关键CSS内联、图片WebP+CDN、Gzip压缩',
        '【安全加固】实现CSP策略、XSS/CSRF防护、敏感数据加密传输，通过等保三级认证',
        '【工程化】建立CI/CD流程，实现自动化构建测试部署，发布周期从3天缩短至1天',
      ],
      achievements: [
        '系统稳定性99.9%，支持10万+日活，零安全事故',
        '开发效率提升50%，迭代周期从2周缩短至1周',
        '成功通过等保三级认证，服务20+政府部门',
      ],
    },
    {
      name: '海南营商数据大屏',
      displayName: '海南营商数据大屏',
      primaryLanguage: [
        'Vue3',
        'TypeScript',
        'ECharts 5',
        'D3.js',
      ],
      description: '政府营商环境监测的4K数据可视化大屏，实时展示多维度营商数据。',
      responsibilities: [
        '【性能优化】Canvas替代SVG渲染，性能提升300%，支持百万级数据实时渲染；Web Worker处理数据计算，避免主线程阻塞',
        '【可视化】基于ECharts深度定制10+图表，D3.js实现关系图，WebGL实现3D地图和粒子效果',
        '【实时数据】WebSocket实时推送+增量更新，本地缓存策略，数据延迟<100ms',
        '【稳定性】实现自动重连、内存泄漏监控、错误降级，7×24小时稳定运行',
      ],
      achievements: [
        '获海南省数据应用创新奖（省级奖项）',
        '性能提升300%，支持百万级数据流畅渲染',
        '已在海南省10+政府部门部署使用',
      ],
    },
    {
      name: '企业办公管理系统',
      displayName: '企业办公管理系统',
      primaryLanguage: [
        'Vue3',
        'TypeScript',
        'Arco Design',
        'Vite',
      ],
      description: '企业级办公自动化平台，涵盖人力、行政、财务、项目管理等模块。',
      responsibilities: [
        '【架构设计】模块化架构，各业务模块解耦独立演进；RBAC权限模型，支持功能权限和数据权限',
        '【表单引擎】实现拖拽式表单设计器，支持20+表单组件和自定义校验规则',
        '【性能优化】虚拟滚动处理万级数据列表，响应时间<200ms；图片懒加载和压缩',
        '【质量保障】建立前端测试体系，单元测试覆盖率80%+，E2E测试覆盖核心流程',
      ],
      achievements: [
        '员工工作效率提升60%，行政流程处理时间缩短70%',
        '支持5000+用户同时在线，响应时间<200ms',
        '节省外部系统采购成本100万+/年',
      ],
    },
    {
      name: 'GrandTag保险服务网站',
      displayName: 'GrandTag保险服务网站',
      primaryLanguage: [
        'React 17',
        'Next.js',
        'Redux Toolkit',
      ],
      description: '国际化保险服务平台，支持10种语言、多币种和跨境支付。',
      responsibilities: [
        '【SSR优化】Next.js实现服务端渲染，首屏加载速度提升50%，SEO效果显著提升',
        '【国际化】基于i18next实现10种语言无缝切换，支持RTL布局和多币种展示',
        '【响应式】建立响应式设计系统，确保移动端、平板、桌面端一致体验',
        '【性能优化】数据预加载、接口缓存、图片优化，全球访问速度平均优化40%',
      ],
      achievements: [
        '网站访问量提升120%，转化率提升35%',
        '支持日访问量峰值50万，系统稳定运行',
        '全球访问速度优化40%，低网速地区体验显著提升',
      ],
    },
  ],
  certifications,
  awards,
  selfEvaluate: [
    '6年前端开发经验，专注政务数字化和企业级SaaS应用，有完整的项目全生命周期经验',
    '精通Vue3/React技术栈，深入理解响应式原理和性能优化，有微前端架构实践经验',
    '擅长数据可视化和大数据渲染优化，主导的营商大屏项目获省级创新奖',
    '注重代码质量和工程规范，推动团队技术栈升级和自动化流程建设',
    '良好的学习能力和技术视野，持续关注前端新技术并应用于实际项目',
  ],
}

export default resumeSource

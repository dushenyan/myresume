import { Resume } from "./types";

/**
 * 创建示例简历模板
 */
export const resumeSource: Resume = {
    basics: {
        name: '杜审言',
        picture: 'https://avatars.githubusercontent.com/u/63347504',
        label: '高级前端开发工程师',
        headline: '专注于构建高性能、可扩展的企业级前端应用，六年技术沉淀与架构实践',
        summary: '我是杜审言，拥有六年专业前端开发经验，专注于构建高质量、高性能的Web应用。我擅长前端架构设计、性能优化与团队技术治理，在大型企业级项目中积累了丰富的实战经验。\n' +
            '\n' +
            '我热衷于探索前沿技术并将其应用于实际项目，持续推动团队技术栈演进与工程化水平提升。作为技术负责人，我主导过多个重要项目的全生命周期，从需求分析到架构设计，再到最终上线与持续优化。\n' +
            '\n' +
            '我也是一名活跃的技术分享者，定期在团队内部组织技术沙龙，并在社区发表技术文章。',
        website: 'https://duhenyanblog.netlify.app/',
        address: '海南 海口',
        projects_url: 'https://github.com/dushenyan',
        image_avatar: 'https://avatars.githubusercontent.com/u/63347504',
        username: 'dushenyan',
        email: 'dushenyan88@gmail.com',
        html_title: '杜审言-高级前端-社招-深圳',
        languages: '中文',
        profiles: [
            {
                network: 'GitHub',
                url: 'https://github.com/dushenyan',
                username: 'dushenyan'
            },
            {
                network: 'Twitter',
                url: 'https://twitter.com/ShenyanDu',
                username: 'dushenyan'
            },
            {
                network: 'Website',
                username: 'dushenyan',
                url: 'https://duhenyanblog.netlify.app/'
            },
            {
                network: 'Knowledge',
                url: 'https://mainsibaodian.netlify.app/',
                username: 'dushenyan'
            }
        ]
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
                '响应式设计'
            ]
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
                'Nuxt.js'
            ]
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
                'Git工作流优化'
            ]
        },
        {
            category: '性能优化',
            keywords: [
                'Web Vitals优化',
                '首屏加载优化',
                '渲染性能',
                '大型应用架构拆分',
                '微前端实践',
                'Service Worker缓存策略'
            ]
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
                'ESLint规范制定'
            ]
        },
        {
            category: '团队协作',
            keywords: [
                '技术方案设计',
                'Code Review',
                '技术文档编写',
                '团队培训',
                '跨部门沟通',
                '敏捷开发流程优化'
            ]
        }
    ],
    selfEvaluate: [
        '六年大型互联网公司前端开发经验，主导过多个企业级项目的全生命周期',
        '具备深厚的前端架构设计能力，能够构建高性能、可扩展的大型应用',
        '精通前端工程化与性能优化，持续提升开发效率与用户体验',
        '注重代码质量与工程规范，建立团队统一的开发标准与最佳实践',
        '良好的技术视野，持续关注行业动态并引入新技术提升产品竞争力',
        '优秀的团队协作与沟通能力，能够带领团队攻克复杂技术难题'
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
                'Vite'
            ],
            description: '作为前端架构师，主导设计并实现了政府密码云服务平台的前端架构。平台采用微前端架构，支持多租户隔离，日均访问量超过10万。主要贡献包括：\n' +
                '\n' +
                '1. 设计并实现了基于Vue3 + TypeScript的技术栈升级，提升了代码质量与开发效率\n' +
                '2. 建立了统一的组件库与设计系统，确保了跨团队开发的一致性\n' +
                '3. 实现了前端性能优化，将首屏加载时间从5秒优化至1.2秒\n' +
                '4. 主导建立了完善的CI/CD流程，实现了自动化构建、测试与部署\n' +
                '5. 解决了大量兼容性与安全相关问题，确保平台稳定运行',
            achievements: [
                '系统稳定性达到99.9%，用户满意度提升40%',
                '开发效率提升50%，迭代周期从2周缩短至1周',
                '平台成功通过等保三级认证'
            ]
        },
        {
            name: '海南营商数据大屏',
            displayName: '海南营商数据大屏',
            summary: '实时大数据可视化平台，支持多维度数据展示与分析',
            primaryLanguage: ['Vue3', 'ECharts 5', 'TypeScript', 'WebGL', 'D3.js', 'Pinia'],
            description: '作为技术负责人，带领团队开发了海南营商数据大屏项目。该项目实现了实时数据监控、多维度数据分析与可视化展示，为决策者提供了直观的数据支持。主要工作包括：\n' +
                '\n' +
                '1. 设计了高性能的可视化架构，解决了大量数据渲染的性能瓶颈\n' +
                '2. 实现了数据缓存与增量更新策略，确保实时性的同时减轻服务器压力\n' +
                '3. 优化了WebGL渲染性能，实现了流畅的3D数据可视化效果\n' +
                '4. 设计了可配置的数据展示组件，提高了系统的可扩展性\n' +
                '5. 解决了大屏设备的兼容性问题，确保在不同分辨率下的良好展示效果',
            achievements: [
                '数据可视化性能提升300%，支持百万级数据实时渲染',
                '项目获得海南省数据应用创新奖',
                '平台已在多个政府部门部署使用'
            ]
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
                'Styled Components'
            ],
            description: '作为前端技术负责人，负责GrandTag保险服务网站的整体架构设计与开发。该项目面向全球用户，支持多语言切换、多币种展示与跨境支付。主要贡献包括：\n' +
                '\n' +
                '1. 采用Next.js框架实现了服务端渲染(SSR)，提升了SEO效果与首屏加载速度\n' +
                '2. 设计并实现了基于i18next的国际化方案，支持10种语言无缝切换\n' +
                '3. 建立了响应式设计系统，确保在移动端、平板与桌面端的一致体验\n' +
                '4. 实现了前端微服务化架构，支持多个团队并行开发与独立部署\n' +
                '5. 优化了API调用策略，实现了数据预加载与缓存，提升了用户体验',
            achievements: [
                '网站访问量提升120%，转化率提升35%',
                '全球访问速度平均优化40%，尤其在低网速地区表现突出',
                '支持日访问量峰值50万，系统稳定运行无故障'
            ]
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
                'Arco Design'
            ],
            description: '作为项目负责人，主导开发了公司内部使用的办公管理系统。系统涵盖了人力资源、行政、财务、项目管理等多个模块，支持高度定制化配置。主要工作包括：\n' +
                '\n' +
                '1. 设计了模块化的系统架构，实现了各业务模块的解耦与独立演进\n' +
                '2. 建立了完善的权限管理体系，支持细粒度的功能权限与数据权限控制\n' +
                '3. 实现了表单引擎，支持业务人员自定义表单与流程\n' +
                '4. 优化了大型数据列表的渲染性能，支持虚拟滚动与高效筛选\n' +
                '5. 建立了完善的前端测试体系，确保代码质量与系统稳定性',
            achievements: [
                '系统上线后，员工工作效率提升60%，行政流程处理时间缩短70%',
                '支持5000+用户同时在线，系统响应时间控制在200ms以内',
                '通过了公司内部的安全审计与性能测试'
            ]
        },
        {
            name: '用户统一认证系统',
            displayName: '用户统一认证系统',
            summary: '基于OAuth2.0协议的企业级用户认证与授权平台',
            primaryLanguage: [
                'Node.js',
                'Express',
                'MongoDB',
                'OAuth2.0'
            ],
            description: '作为项目负责人，主导开发了公司内部使用的用户认证系统。系统采用OAuth2.0协议，支持多租户、多应用、多用户类型。主要工作包括：\n' +
                '\n' +
                '1. 设计并实现了基于JWT的认证与授权机制，支持多租户隔离与单点登录\n' +
                '2. 实现了基于OAuth2.0的客户端认证与授权流程，支持第三方应用接入\n' +
                '3. 实现了用户管理与权限控制，支持用户自助注册与管理\n' +
                '4. 实现了API网关与反向代理，支持跨域与安全控制\n' +
                '5. 优化了系统性能，支持高并发访问与海量用户认证',
            achievements: [
                '系统上线后，用户认证速度提升50%，系统稳定性提升30%',
                '支持10000+用户同时在线，系统响应时间控制在100ms以内',
                '通过了公司内部的安全审计与性能测试'
            ]
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
                'Element Plus'
            ],
            description: '作为项目负责人，主导开发了公司内部使用的租户管理系统。系统支持多租户管理、租户配置与监控，主要工作包括：\n' +
                '\n' +
                '1. 设计并实现了租户隔离与数据加密机制，保障租户数据安全\n' +
                '2. 实现了租户配置与管理功能，支持租户自定义设置\n' +
                '3. 实现了监控与告警系统，实时监控租户使用情况\n' +
                '4. 优化了系统性能，支持高并发访问与大规模租户管理',
            achievements: [
                '系统上线后，租户管理效率提升40%，系统响应时间控制在50ms以内',
                '支持1000+租户同时在线，系统稳定性达到99.9%',
                '通过了公司内部的安全审计与性能测试'
            ]
        },
        {
            name: '流云数字化转型小程序',
            displayName: '流云数字化转型小程序',
            summary: '基于Uniapp的数字化转型工具',
            primaryLanguage: [
                '微信小程序',
                'JavaScript',
                'Uniapp',
                'ECharts 5'
            ],
            description: '开发了流云数字化转型小程序，助力企业快速实现数字化转型，提供在线调研、分析与报告生成等功能。',
            achievements: [
                '上线后，月活跃用户增长300%，用户反馈积极',
                '实现了数据可视化分析，提升了用户体验',
                '通过了微信小程序商店审核，正式上线发布'
            ]
        },
        {
            name: 'DRS 数据资源一本账',
            displayName: 'DRS 数据资源一本账',
            summary: '数据资源管理与分析平台',
            primaryLanguage: [
                'Vue.js',
                'TypeScript',
            ],
            description: '开发了DRS数据资源一本账平台，提供数据资源的统一管理和分析服务。',
            achievements: [
                '实现了数据资源的全量管理与分析功能',
                '优化了数据查询性能，支持大规模数据处理',
                '提高了数据安全性和合规性'
            ]
        },
        {
            name: '信创公告管理',
            displayName: '信创公告管理',
            summary: '信创公告管理系统',
            primaryLanguage: [
                'Vue.js',
                'TypeScript',
            ],
            description: '开发了信创公告管理系统，提供信创相关公告的发布与管理服务。',
            achievements: [
                '实现了公告的发布、编辑与删除功能',
                '优化了系统性能，提高了响应速度',
                '确保了系统的稳定性和安全性'
            ]
        },
        {
            name: "海政通待办",
            displayName: '海政通待办',
            summary: '海南省政务服务平台待办事项管理系统',
            primaryLanguage: [
                'Vue.js',
                'TypeScript',
            ],
            description: '开发了海政通待办系统，提供海南省政务服务平台待办事项管理服务。',
            achievements: [
                '实现了待办事项的全量管理与分析功能',
                '优化了数据查询性能，支持大规模数据处理',
                '提高了数据安全性和合规性'
            ]
        },
        {
            name: '沉香树溯源系统',
            displayName: '沉香树溯源系统',
            summary: '沉香树溯源系统',
            primaryLanguage: [
                'Vue.js',
                'TypeScript',
            ],
            description: '开发了沉香树溯源系统，提供沉香树的溯源信息查询与分析服务。',
            achievements: [
                '实现了沉香树溯源信息的查询与分析功能',
                '优化了数据查询性能，支持大规模数据处理',
                '提高了数据安全性和合规性'
            ]
        }
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
            description: '作为前端技术负责人，负责公司前端团队的技术规划、架构设计与团队建设。主导多个核心产品的前端开发与优化，推动技术栈升级与工程化建设。',
            highlights: [
                '主导公司前端技术栈从Vue2升级到Vue3 + TypeScript，提升代码质量与开发效率',
                '建立了统一的前端组件库与设计系统，降低了30%的开发成本',
                '优化了CI/CD流程，实现了自动化构建、测试与部署，发布周期从3天缩短至1天',
                '设计并实施了微前端架构，支持多团队并行开发，系统解耦度提升40%',
                '带领5人前端团队完成多个大型项目的开发，培养了2名中级前端工程师'
            ]
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
            description: '负责公司核心产品的前端开发与优化，参与技术方案设计与评审，推动前端工程化建设与性能优化。',
            highlights: [
                '开发了低代码/无代码平台的市场展示网站，包含文档站点、演示环境与编码 playground',
                '优化了大型数据可视化组件的性能，数据渲染速度提升200%',
                '建立了前端开发规范与代码评审流程，代码质量问题减少60%',
                '负责多个项目的前端架构设计与技术选型，确保系统的可扩展性与可维护性',
                '参与团队培训与知识分享，提升团队整体技术水平'
            ]
        }
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
            courses: ['Web前端开发', 'JavaScript高级编程', '计算机网络', '数据库原理']
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
            courses: ['前端架构设计与实践', '大型应用性能优化策略', '微前端架构与实践', 'TypeScript高级编程']
        }
    ],
    certifications: [
        {
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            date: '2023-05-01',
            fullDate: { year: 2023, month: 5 }
        },
        {
            name: 'Google Professional Web Developer',
            issuer: 'Google Cloud',
            date: '2022-08-01',
            fullDate: { year: 2022, month: 8 }
        }
    ],
    awards: [
        {
            title: '海南省数据应用创新奖',
            summary: '海南营商数据大屏项目',
            awarder: '海南省大数据管理局',
            date: '2023-10-01',
            fullDate: { year: 2023, month: 10 }
        },
        {
            title: '公司年度优秀技术负责人',
            summary: '带领团队完成多个核心项目，技术创新与团队建设突出',
            awarder: '海南流云科技有限公司',
            date: '2023-01-01',
            fullDate: { year: 2023, month: 1 }
        },
        {
            title: '全国大学生数学建模竞赛',
            summary: '获得省级二等奖',
            awarder: '江西省教育厅',
            date: '2019-10-01',
            fullDate: { year: 2019, month: 10 }
        }
    ],
    publications: [
        {
            name: '大型前端应用架构设计与实践',
            publisher: '掘金技术社区',
            releaseDate: '2023-06-01',
            url: 'https://juejin.cn/post/example123',
            summary: '分享了大型前端应用的架构设计思路、技术选型与实践经验'
        },
        {
            name: '前端性能优化实战指南',
            publisher: '知乎专栏',
            releaseDate: '2022-08-01',
            url: 'https://zhihu.com/example456',
            summary: '总结了前端性能优化的方法论与实战案例，包括加载优化、渲染优化与运行时优化'
        }
    ],
    interests: ['前端架构与工程化', 'Web性能优化', '微前端与模块化开发', '技术团队管理与人才培养', '开源贡献与技术社区']
}

export default resumeSource
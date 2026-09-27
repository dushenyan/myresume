# 流云ERP Web管理系统项目文档

## 项目概况

**项目名称**: liuyun-erp-web  
**项目类型**: 企业级ERP管理系统  
**技术栈**: Vue 3.5 + TypeScript + Element Plus + Pinia + Vue Router  
**开发时间**: 2023年2月 - 2023年3月（基于芋道源码重构）  
**提交次数**: 约200次  

**核心功能模块**：
- 系统管理（用户、角色、菜单、部门、字典、租户等）
- 工作流管理（流程模型、流程定义、任务管理等）
- 财务管理（收支管理、现金流等）
- 生产管理（生产计划、生产任务、领料、入库等）
- 销售管理（销售订单、出库、退货等）
- 采购管理（采购订单、入库、退货等）
- 仓库管理（库存管理、库存变动、库存盘点等）
- 客户关系管理（CRM）
- 考勤管理
- 资产管理
- 数据分析与报表
- AI 功能集成

## 项目亮点

### 技术亮点

1. **现代化技术栈**：Vue 3.5 + TypeScript + Element Plus，代码类型安全
2. **状态管理**：使用 Pinia 进行状态管理，支持持久化
3. **路由管理**：Vue Router 4.4，支持动态路由和权限控制
4. **UI 组件库**：Element Plus 2.9.5，界面美观大方
5. **富文本编辑**：集成 WangEditor 5.1.23，支持复杂内容编辑
6. **数据可视化**：集成 ECharts 5.6.0，支持图表展示
7. **工作流引擎**：集成 BPMN.js，支持流程设计和管理
8. **表单构建**：集成 Form-Create，支持动态表单
9. **国际化**：Vue I18n 9.10.2，支持多语言
10. **构建工具**：Vite 5.1.4，构建速度快，支持热更新
11. **代码质量**：ESLint + Prettier + Stylelint，代码规范
12. **性能优化**：使用 Unocss，减少 CSS 体积

### 功能亮点

1. **完整的系统管理**：用户、角色、菜单、权限、部门、字典、租户等
2. **强大的工作流**：流程设计、任务管理、审批流程等
3. **全面的业务管理**：销售、采购、生产、仓库、财务等
4. **智能的数据分析**：图表展示、数据报表、统计分析
5. **AI 功能集成**：智能客服、图像识别、思维导图等
6. **多租户支持**：支持多企业、多组织管理
7. **权限精细化**：基于角色的权限控制，细粒度权限管理
8. **响应式设计**：适配不同屏幕尺寸
9. **文件管理**：支持文件上传、预览、管理
10. **日志管理**：操作日志、登录日志、错误日志等

## 已解决和优化的问题

**已解决问题**：
- 字典表页面加载时报错问题
- 表单验证不通过问题
- el-tree 组件父子级选中问题
- 标签值为零时不渲染问题
- 配置管理表单加载问题
- 邮件模板重构问题
- 短信渠道翻写问题
- 文件管理功能重构问题
- 数据源配置功能重构问题
- 配置管理功能重构问题

**优化项**：
- 代码规范优化（ESLint 校验）
- 构建脚本内存配置优化
- 主题切换样式优化
- 表格组件性能优化
- 抽屉弹出样式优化
- 搜索组件样式优化
- 表单样式优化
- 加载状态优化
- 权限判断函数优化
- 日期格式化函数优化

## 主要贡献者

### 芋道源码（YunaiV）

**主要贡献**：
- 项目初始化和基础架构搭建
- Vue3 重构核心功能模块
- 系统管理模块重构
- 工作流模块重构
- 表单和表格组件优化
- 构建配置优化

**技术特点**：
- 擅长项目架构和基础配置
- 注重代码质量和性能
- 熟悉 Vue 3 生态系统
- 善于解决复杂的技术问题

### puhui999

**主要贡献**：
- 短信日志迁移到 Vue3
- 日期格式化函数迁移
- 表单验证问题修复
- 字典标签渲染问题修复
- 代码规范优化
- TODO 问题修复

**技术特点**：
- 擅长前端表单处理
- 注重用户体验细节
- 熟悉 TypeScript
- 善于解决兼容性问题

### 周建

**主要贡献**：
- 测试人员所提 bug 修改
- 系统管理中 id 显示序号 bug 修复
- 租户和角色管理菜单权限滚动问题
- 搜索日期显示问题修复
- 构建脚本内存配置优化

**技术特点**：
- 擅长 bug 修复和问题排查
- 注重系统稳定性
- 熟悉项目构建和部署

### bimei

**主要贡献**：
- 主题切换 XTable 颜色修改
- 字典点击表格红色报错修改
- keepalive 缓存优化
- 角色提交问题修改
- XTable var 修改

**技术特点**：
- 擅长 UI/UX 设计
- 注重界面美观度
- 熟悉 Element Plus 组件库

### 其他贡献者

**东方白**：系统管理->租户管理重构
**凌太虚**：部门管理页面重写
**oldBaby**：错误日志重构
**Chika**：岗位管理使用 Element Plus 原生实现
**syd**：敏感词模块重构
**kinlon92**：错误码管理重构
**xiaowuye**：文件管理功能重构
**矿泉水**：短信渠道翻写

## Git命令参考

### 查看完整提交历史

```bash
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看指定提交者的提交历史

```bash
# 查看杜审言的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="杜审言"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dushenyan"

# 查看 Elegant 的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="Elegant"

# 查看其他提交者的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="shenyandu"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="十七"
```

### 查看特定时间段的提交

```bash
# 查看2023年3月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2023-03-01" --until="2023-03-31"

# 查看2023年2月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2023-02-01" --until="2023-02-28"
```

### 查看特定功能的提交

```bash
# 查看与系统管理相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --grep="系统管理" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与工作流相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --grep="工作流" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与表单相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --grep="表单" --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看提交统计信息

```bash
# 查看提交者统计
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git shortlog -sn

# 查看提交趋势
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --pretty=format:"%ad" --date=short | sort | uniq -c

# 查看代码提交量
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-web
git log --numstat --pretty="%h" | awk '{add += $1; subs += $2; loc += $1 - $2} END {printf "Added lines: %s, Removed lines: %s, Total lines: %s\n", add, subs, loc}'
```

## 技术栈详情

**核心依赖**：
- Vue 3.5.12
- TypeScript 5.3.3
- Element Plus 2.9.5
- Pinia 2.3.1
- Vue Router 4.4.5
- Vue I18n 9.10.2
- Axios 1.8.4
- Dayjs 1.11.13
- ECharts 5.6.0
- WangEditor 5.1.23
- BPMN.js 17.11.1
- Form-Create 3.2.20

**开发工具**：
- Vite 5.1.4
- ESLint 8.57.1
- Prettier 3.5.3
- Stylelint 16.18.0
- Vue-TSC 1.8.27
- SASS 1.86.3

**构建配置**：
- 多环境构建（local、dev、test、stage、prod）
- 构建内存配置优化
- 代码压缩和优化

## 项目结构

```
src/
├── api/              # API 接口定义
├── assets/           # 静态资源
├── components/       # 公共组件
├── config/           # 配置文件
├── directives/       # 自定义指令
├── hooks/            # 自定义 hooks
├── layout/           # 布局组件
├── locales/          # 国际化语言包
├── plugins/          # 插件配置
├── router/           # 路由配置
├── store/            # Pinia 状态管理
├── styles/           # 样式文件
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── App.vue           # 根组件
├── main.ts           # 入口文件
└── menuData.ts       # 菜单数据
```

## 部署信息

### 构建命令

```bash
# 安装依赖
pnpm i

# 开发环境
pnpm dev

# 开发服务器环境
pnpm dev-server

# 类型检查
pnpm ts:check

# 本地构建
pnpm build:local

# 开发环境构建
pnpm build:dev

# 测试环境构建
pnpm build:test

# 预发布环境构建
pnpm build:stage

# 生产环境构建
pnpm build:prod

# 代码检查和格式化
pnpm lint:eslint
pnpm lint:format
pnpm lint:style
```

### 环境配置

- **本地环境**：.env.local
- **开发环境**：.env.dev
- **测试环境**：.env.test
- **预发布环境**：.env.stage
- **生产环境**：.env.prod

## 总结

流云ERP Web管理系统是一个功能全面、技术先进的企业级管理系统。系统基于 Vue 3 + TypeScript + Element Plus 技术栈开发，涵盖了企业管理的多个核心模块，包括系统管理、工作流管理、财务管理、生产管理、销售管理、采购管理、仓库管理、客户关系管理等。

**主要优势**：
- 技术栈先进，代码质量高
- 功能全面，覆盖企业管理核心流程
- 界面美观，用户体验良好
- 性能优化，运行流畅
- 扩展性强，易于定制

**未来发展**：
- 持续优化用户体验
- 增加更多行业特定功能
- 提升系统性能和稳定性
- 支持更多集成和扩展
- 增强数据分析和 AI 能力

系统已经在实际生产环境中稳定运行，为企业提供了全面的管理解决方案。
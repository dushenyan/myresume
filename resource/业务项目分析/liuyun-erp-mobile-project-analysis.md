# 流云ERP移动端项目文档

## 项目概况

**项目名称**: liuyun-erp-mobile  
**项目类型**: 移动端应用（微信小程序 + H5）  
**技术栈**: Vue 3.4 + TypeScript + uni-app + Pinia + Wot Design  
**开发时间**: 2024年12月 - 2025年2月  
**提交次数**: 约150次  

**核心功能模块**：
- 首页数据看板（销售统计、采购统计、生产数据）
- 开单管理（销售订单、采购订单、生产任务等）
- 财务管理（付款单、收款单）
- 仓库管理（产品库存、仓库信息）
- 生产管理（生产计划、生产任务、生产领料、生产入库）
- 协同审批（发起审批、审批管理）
- 考勤打卡
- 个人中心

## 项目亮点

### 技术亮点

1. **现代化技术栈**：Vue 3.4 + TypeScript + Pinia，代码类型安全
2. **跨平台开发**：基于 uni-app，支持微信小程序和 H5
3. **组件化设计**：封装了多个可复用组件（LyCardCell、LyUpload、ProCard等）
4. **状态管理**：使用 Pinia 进行状态管理，支持持久化
5. **UI 框架**：集成 Wot Design Uni 组件库
6. **数据可视化**：集成 ECharts 实现数据图表展示
7. **路由管理**：使用 uniapp-router-next 进行路由管理
8. **工具库**：集成 lodash-es、dayjs、decimal.js 等实用工具
9. **构建工具**：使用 Vite 构建，支持热更新
10. **代码规范**：ESLint + Prettier 代码规范

### 功能亮点

1. **数据看板**：首页销售统计、采购统计图表展示，支持数据可视化
2. **开单管理**：集成销售订单、采购订单、生产任务等多种开单功能
3. **财务管理**：付款单、收款单管理，支持附件上传
4. **仓库管理**：产品库存查询、仓库信息管理
5. **生产管理**：生产计划、任务、领料、入库全流程管理
6. **协同审批**：支持多种审批类型（请假、报销、离职等）
7. **考勤打卡**：智能考勤系统，支持打卡状态管理
8. **个人中心**：个人信息管理、密码修改、关于我们
9. **附件上传**：统一的文件上传组件，支持多种文件类型
10. **数据字典**：通过接口获取字典数据，确保数据一致性

## 已解决和优化的问题

**已解决问题**：
- 销售订单/采购订单商品数据重置问题
- 客户管理删除提示语错误问题
- 财务管理付款单/收款单功能问题
- 配送管理分页查询数据展示异常
- 协同审批流程ID空白问题
- 审批人多选拼接处理问题
- 仓库信息新增跳转无效路由问题
- 开单模块图标不显示问题
- 登录自动授权功能实现
- 首页数据显示不全问题

**优化项**：
- 数量进步器限制小数点后两位
- 打卡页面边距调整
- 个人中心页面内容展示优化
- 开单菜单子项配置渲染结构优化
- 全局列表组件逻辑完善
- iOS底部小黑条适配
- 首页数据超过十万金额单位转换
- 请求统一拦截处理
- 附件上传功能增强
- 字典获取通过接口获取

## 主要贡献者

### 杜审言（dushenyan）

**主要贡献**：
- 项目初始化和基础架构搭建
- 个人中心模块开发（修改密码、关于我们）
- 开单模块菜单配置和路由管理
- 协同审批功能开发（审批人多选、抄送人处理）
- 仓库管理模块页面调整
- 登录自动授权功能实现
- 服务协议内容文案修改
- 路由拦截前置白名单配置
- 发布版本目录设置和分包构建
- 公共列表显示组件封装

**技术特点**：
- 擅长项目架构和基础配置
- 注重用户体验细节优化
- 熟悉 uni-app 跨平台开发
- 善于解决路由和权限相关问题

### 郑生德

**主要贡献**：
- 销售管理模块开发（销售订单、销售出库、销售退货）
- 采购管理模块开发（采购订单、采购入库、采购退货）
- 财务管理模块开发（付款单、收款单）
- 统一请求封装（支持 get、post、put、delete）
- 请求拦截和错误处理
- 文件上传功能实现
- 首页数据对接和图表展示
- 字典调用和数据处理
- iOS 底部小黑条适配
- 各种 bug 修复和功能优化

**技术特点**：
- 擅长业务逻辑实现
- 注重代码质量和性能
- 熟悉 API 对接和数据处理
- 善于解决复杂的业务问题

### 林和强

**主要贡献**：
- 财务管理模块开发（付款单、收款单）
- 项目初始化
- 代码合并和版本管理

**技术特点**：
- 擅长财务管理相关功能
- 注重代码结构和组织

### 黄盛发

**主要贡献**：
- 生产管理模块开发（生产计划、生产任务、生产领料、生产入库）
- 生产管理逻辑调整和优化
- 生产任务保存功能修复

**技术特点**：
- 擅长生产管理相关功能
- 注重业务流程的完整性

### 陈元崇

**主要贡献**：
- 考勤打卡模块开发
- 打卡功能优化（定时器管理）
- 休息小狗删除
- .gitignore 文件更新

**技术特点**：
- 擅长考勤系统开发
- 注重用户体验细节

### 钟小视

**主要贡献**：
- 仓库管理模块开发（产品库存、仓库信息）
- 开单页面样式优化
- 图标和样式调整
- 仓库信息搜索功能增强

**技术特点**：
- 擅长 UI/UX 设计
- 注重视觉效果和用户体验

## Git命令参考

### 查看完整提交历史

```bash
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看指定提交者的提交历史

```bash
# 查看杜审言的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="杜审言"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dushenyan"

# 查看其他提交者的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="Elegant"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="shenyandu"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="十七"
```

### 查看特定时间段的提交

```bash
# 查看2025年1月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2025-01-01" --until="2025-01-31"

# 查看2024年12月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2024-12-01" --until="2024-12-31"
```

### 查看特定功能的提交

```bash
# 查看与财务管理相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --grep="财务" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与生产管理相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --grep="生产" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与协同审批相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --grep="审批" --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看提交统计信息

```bash
# 查看提交者统计
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git shortlog -sn

# 查看提交趋势
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --pretty=format:"%ad" --date=short | sort | uniq -c

# 查看代码提交量
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-erp-mobile
git log --numstat --pretty="%h" | awk '{add += $1; subs += $2; loc += $1 - $2} END {printf "Added lines: %s, Removed lines: %s, Total lines: %s\n", add, subs, loc}'
```

## 技术栈详情

**核心依赖**：
- Vue 3.4.21
- TypeScript 5.8.3
- uni-app 3.0.0
- Pinia 2.0.36
- Wot Design Uni 1.9.1
- dayjs 1.11.10
- lodash-es 4.17.21
- decimal.js 10.5.0
- z-paging 2.8.7

**开发工具**：
- Vite 5.2.8
- ESLint 8.57.1
- Prettier
- Vue-TSC
- SASS

**构建配置**：
- 支持微信小程序构建
- 支持 H5 构建
- 分包构建优化

## 项目结构

```
src/
├── api/              # API接口定义
├── components/       # 公共组件
├── configs/          # 配置文件
├── hooks/            # 自定义 hooks
├── interceptors/     # 拦截器
├── layouts/          # 布局组件
├── pages/            # 页面组件
├── pages-sub/        # 分包页面
├── router/           # 路由配置
├── static/           # 静态资源
├── store/            # Pinia 状态管理
├── style/            # 样式文件
├── types/            # TypeScript 类型定义
└── uni_modules/      #  uni-app 模块
```

## 部署信息

### 构建命令

```bash
# 开发环境（微信小程序）
npm run dev

# 开发环境（H5）
npm run dev:h5

# 生产构建（微信小程序）
npm run build

# 生产构建（H5）
npm run build:h5

# 类型检查
npm run type-check
```

### 环境配置

- **开发环境**：env/.env.development
- **生产环境**：env/.env.production
- **测试环境**：env/.env.test

## 总结

流云ERP移动端是一个功能完善、技术先进的企业级移动应用，基于 Vue 3 + TypeScript + uni-app 技术栈开发。系统涵盖了企业管理的多个核心模块，包括销售、采购、财务、仓库、生产、协同审批等功能。

**主要优势**：
- 现代化技术栈，代码类型安全
- 跨平台开发，支持微信小程序和 H5
- 功能完善，覆盖企业管理核心流程
- 数据可视化，直观展示业务数据
- 组件化设计，代码复用率高
- 性能优化，用户体验流畅

**未来发展**：
- 持续优化用户体验
- 增加更多功能模块
- 提升系统性能和稳定性
- 支持更多移动平台
- 增强数据分析能力

系统已经在实际生产环境中稳定运行，为企业提供了便捷的移动办公解决方案。
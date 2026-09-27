# DRS Portal H5 项目信息

## 项目概述

**项目名称**: drs-portal-h5  
**版本**: 0.0.1  
**项目类型**: H5 移动端应用  
**初始化时间**: 2024年7月1日  
**当前分支**: feature/20240830  
**仓库地址**: 
- GitLab SSH: ssh://gitlab.digitalhainan.com.cn:8083/brs/drs-portal-h5
- GitLab HTTPS: https://gitlab.digitalhainan.com.cn:8082/brs/drs-portal-h5

## 技术栈

### 核心框架
- **Vue.js**: 2.6.11
- **Vue Router**: 3.1.5
- **Vuex**: 3.1.2
- **Vue I18n**: 8.16.0 (国际化)

### UI 组件库
- **Vant UI**: 2.10.13 (移动端 UI 组件库)
- **@szhn/sword-flow-ui**: 1.0.0-beta.6 (流程组件)

### 数据可视化
- **ECharts**: 5.5.1
- **echarts-liquidfill**: 3.1.0 (液体填充图)
- **leader-line**: 1.0.6 (连线组件)

### 工具库
- **Axios**: 0.19.2 (HTTP 请求)
- **Day.js**: 1.8.23 (日期处理)
- **Lodash-es**: 4.17.21 (工具函数)
- **VeeValidate**: 3.2.5 (表单验证)
- **Vue PDF**: 4.3.0 (PDF 预览)

### 开发工具
- **Vue CLI**: 4.2.0
- **ESLint**: 6.7.2 (代码规范)
- **Prettier**: 代码格式化
- **Husky**: 7.0.2 (Git 钩子)
- **Commitizen**: 4.0.3 (提交规范)
- **Standard-version**: 8.0.2 (版本管理)

### 构建工具
- **PostCSS**: 
  - postcss-px-to-viewport: 移动端适配
  - postcss-pxtorem: rem 转换
- **Less**: 3.11.1
- **Sass**: 1.69.5

## 项目结构

```
drs-portal-h5/
├── public/                    # 静态资源
│   ├── img/                   # 图片资源
│   ├── js/                    # 第三方 JS 库
│   └── index.html             # HTML 模板
├── src/
│   ├── api/                   # API 接口
│   │   ├── auth.js           # 认证接口
│   │   ├── common.js         # 通用接口
│   │   ├── dict.js           # 字典接口
│   │   ├── home.js           # 首页接口
│   │   ├── indicator.js      # 指标接口
│   │   ├── unify-todo.js     # 统一待办接口
│   │   └── user.js           # 用户接口
│   ├── assets/                # 资源文件
│   │   ├── icons/            # 图标
│   │   ├── images/           # 图片
│   │   ├── js/               # JS 文件
│   │   ├── styles/           # 样式文件
│   │   └── toast/            # Toast 组件
│   ├── components/            # 公共组件
│   │   ├── DUploader/        # 上传组件
│   │   ├── EchartView/       # 图表组件
│   │   ├── HotTable/         # 热力图表格
│   │   ├── PopUp/            # 弹窗组件
│   │   ├── RouteView/        # 路由视图
│   │   ├── ScrollActive/     # 滚动激活
│   │   ├── SvgIcon/          # SVG 图标
│   │   └── Tag/              # 标签组件
│   ├── config/                # 配置文件
│   │   ├── index.js          # 主配置
│   │   ├── indicator.js      # 指标配置
│   │   └── uaa.js            # UAA 配置
│   ├── directives/            # 指令
│   ├── filters/               # 过滤器
│   ├── layout/                # 布局组件
│   │   ├── header/           # 头部
│   │   └── footer/           # 底部
│   ├── locales/               # 多语言
│   │   ├── en.json           # 英文
│   │   └── zh-CN.json        # 中文
│   ├── manager/               # 管理器
│   ├── plugins/               # 插件
│   ├── router/                # 路由
│   │   ├── routes/           # 路由配置
│   │   └── index.js          # 路由入口
│   ├── store/                 # Vuex 状态管理
│   │   ├── modules/          # 模块
│   │   ├── getters.js        # Getters
│   │   └── index.js          # Store 入口
│   ├── utils/                 # 工具函数
│   ├── views/                 # 页面视图
│   │   ├── home/             # 首页
│   │   ├── preview/          # 预览
│   │   ├── prompt-page/      # 提示页面
│   │   ├── resource-overview/# 资源概览
│   │   └── unify-todo/       # 统一待办
│   ├── App.vue                # 根组件
│   ├── main.js                # 入口文件
│   └── settings.js            # 设置
├── docs/                      # 文档
├── examples/                  # 示例
└── 配置文件
```

## 主要功能模块

### 1. 资源概览 (Resource Overview)
- **应用系统资源**: 应用系统分布、集成情况、使用情况
- **云资源**: 云资源列表、降级情况、概览、使用情况
- **组件资源**: 组件资源统计
- **数据资源**: 数据开放总量、接口调用量、数据共享总量
- **项目资源**: 项目列表
- **安全资源**: 
  - 数据安全：告警分类、重要系统监控、风险趋势、安全监控
  - 网络安全：告警分类、处置超时单位、重要系统监控、风险趋势、安全监控、安全通报单位
- **服务资源**: 接入单位列表、概览、通用平台资源概览、专网集成

### 2. 统一待办 (Unify Todo)
- **待办列表**: 支持检索、分页
- **待办详情**: 
  - 基本信息
  - 任务进度
  - 操作记录
  - 操作按钮（转办、审核、驳回等）
- **操作功能**:
  - 转办选人
  - 审核确认
  - 驳回
  - 处理
  - PC 处理

### 3. 首页 (Home)
- 角色列表展示
- 部门信息
- 用户昵称
- 工作台入口
- 我的事项跳转

### 4. 提示页面 (Prompt Page)
- 403 无权限页面
- 未登录页面
- 404 页面

## 开发团队

### 主要开发者
1. **姜潘磊** (jiangpanlei)
   - 邮箱: jianglei.pan@digitalhainan.com.cn
   - 职责: 项目架构、基础设施、权限管理、UAA 接入

2. **杜审言** (2645472474@qq.com)
   - 职责: 统一待办功能、业务逻辑、UI 交互

3. **黄盛发** (1342241510@qq.com)
   - 职责: 首页功能、样式调整、用户体验

4. **王其标** ("qibiao.wang@digitalhainan.com.cn")
   - 职责: CDN 配置、环境配置

## 开发历史

### 2024年7月
- **7月1日**: 项目初始化
- **7月1日-7月2日**: 
  - 完成各个平台的 key 申请
  - 二级域名配置
- **7月4日-7月5日**:
  - 权限角色和 UAA 接入
  - 字典相关通用能力接入
- **7月8日-7月9日**:
  - 待办详情页面开发
  - 流程组件集成
  - 列表检索组件开发
  - 首页功能开发
- **7月10日-7月12日**:
  - 待办详情功能完善
  - 操作按钮逻辑实现
  - 任务进度详情下拉刷新
  - 底部操作按钮显示判断
- **7月15日-7月16日**:
  - 待办处理详情补充字段处理
  - 系列设计缺陷问题回归处理
  - 详情进入操作按钮显示问题修复
  - UED 走查和样式调整
- **7月30日**: 流程版本更新

## 开发规范

### 代码提交规范
遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

**提交格式**:
```
<type>(<scope>): <subject>
```

**Type 类型**:
- `feat`: 新功能
- `fix`: 修补 bug
- `docs`: 文档
- `style`: 代码格式
- `refactor`: 重构
- `test`: 增加测试
- `perf`: 优化性能
- `revert`: 代码回滚
- `chore`: 构建过程或辅助工具的变动
- `ci`: 持续集成配置
- `build`: 项目构建或外部依赖变更

### 命名规范
- **组件文件**: PascalCase (大驼峰)，除了 `index.vue`
- **视图文件**: kebab-case (横线连接)
- **JS 文件**: kebab-case 或 camelCase (小驼峰)
- **Store 模块**: camelCase

### 注意事项
- 不适用缓存的路由页面，需在路由 meta 中添加 keepAlive
- `vant-ui` 组件的引入在 `vant-ui.js` 中
- 项目使用 `dayjs` 代替 `moment`
- 当路由过多时，可在 `@/router` 中新建 `modules` 文件夹

## 环境配置

### 环境变量
- `.env.development`: 开发环境
- `.env.test`: 测试环境
- `.env.preview`: 预览环境
- `.env.production`: 生产环境

### 构建命令
```bash
# 开发环境
npm run serve

# 生产构建
npm run build

# 测试环境构建
npm run build:test

# 预览环境构建
npm run build:preview

# 代码检查
npm run lint

# 规范提交
npm run commit

# 版本发布
npm run release
```

## 技术特性

### 移动端适配
- 使用 `postcss-px-to-viewport` 进行移动端适配
- 使用 `postcss-pxtorem` 进行 rem 转换

### 国际化
- 使用 `vue-i18n` 实现多语言支持
- 支持中文和英文

### 权限管理
- 集成 UAA 认证
- 角色权限控制
- 动态路由

### 流程管理
- 集成 `@szhn/sword-flow-ui` 流程组件
- 支持待办流程

### 数据可视化
- 使用 ECharts 实现图表展示
- 支持液体填充图、趋势图等

### 性能优化
- 按需加载
- 代码分割
- 图片压缩
- CDN 加速

## 依赖管理

### 核心依赖
- Vue 生态系统 (Vue, Vue Router, Vuex)
- Vant UI (移动端组件库)
- Axios (HTTP 客户端)
- ECharts (数据可视化)

### 开发依赖
- Vue CLI (脚手架)
- ESLint (代码规范)
- Prettier (代码格式化)
- Husky (Git 钩子)
- Commitizen (提交规范)

## 项目特点

1. **移动端优先**: 专为 H5 移动端设计
2. **组件化开发**: 高度模块化的组件设计
3. **流程驱动**: 集成工作流引擎
4. **数据可视化**: 丰富的图表展示
5. **国际化支持**: 多语言切换
6. **权限控制**: 细粒度的权限管理
7. **代码规范**: 严格的代码提交规范
8. **自动化**: Git 钩子和代码检查自动化

## 未来规划

根据提交记录和项目结构，未来可能的发展方向：
- 继续完善统一待办功能
- 扩展资源概览的数据展示
- 优化用户体验和性能
- 增加更多业务模块
- 完善国际化支持

## 相关文档

- [Vant UI 主题色配置](./docs/vant-ui主题色配置.md)
- [二级域名配置](./docs/二级域名配置.md)
- [关于适配](./docs/关于适配.md)
- [多语言](./docs/多语言.md)
- [性能](./docs/性能.md)
- [技术选型](./docs/技术选型.md)
- [环境配置](./docs/环境配置.md)
- [生产环境保护](./docs/生产环境保护.md)
- [页面title动态加载](./docs/页面title动态加载.md)
- [项目结构说明](./docs/项目结构说明.md)
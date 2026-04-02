# 流云UI组件库项目文档

## 项目概况

**项目名称**: liuyun-ui  
**项目类型**: Vue 组件库  
**技术栈**: Vue 3.3.4 + TypeScript 5.0.4 + Element Plus 2.9.0 + Vite 4.3.3  
**开发时间**: 2024年11月 - 2025年5月  
**提交次数**: 约20次  

**核心功能**：
- LyButton 按钮组件
- LyPersonSelect 人员选择组件（支持 Vue 2 和 Vue 3）
- 工具函数库
- 文档网站
- 测试框架

## 项目亮点

### 技术亮点

1. **现代化技术栈**：Vue 3.3.4 + TypeScript 5.0.4，类型安全
2. **组件库架构**：Monorepo 结构，使用 pnpm workspace
3. **构建工具**：Vite 4.3.3，构建速度快
4. **UI 基础**：基于 Element Plus 2.9.0
5. **代码质量**：ESLint + Prettier + TypeScript 类型检查
6. **测试框架**：Vitest 测试框架
7. **文档系统**：VitePress 文档网站
8. **自动导入**：unplugin-auto-import + unplugin-vue-components
9. **样式处理**：Less + Sass
10. **类型生成**：vite-plugin-dts 自动生成类型声明

### 功能亮点

1. **LyButton 组件**：自定义按钮组件，支持多种样式和状态
2. **LyPersonSelect 组件**：人员选择组件，支持弹框选择，同时支持 Vue 2 和 Vue 3
3. **工具函数库**：包含认证、通用工具、请求等函数
4. **全局导入**：支持全局导入 liuyun-ui 库
5. **跨域解决方案**：生产接口跨域问题解决
6. **样式隔离**：解决组件样式被外层样式覆盖问题
7. **过滤器函数**：引入部分过滤器函数及使用案例
8. **参考实例**：提供组件使用参考实例

## 已解决和优化的问题

**已解决问题**：
- 审批人、抄送人选择人员窗口，输入人员后窗口被隐藏问题
- 组件样式被外层样式覆盖问题
- 局部样式冲突问题
- 生产接口跨域问题
- Vue 3 模式打包问题
- 构建规则调整问题

**优化项**：
- 标注工具包最新版本
- 调整展示内容
- 全局状态引入处理
- 构建规则优化
- 组件包全局导入引用示例调整

## 主要贡献者

### 杜审言（dushenyan）

**主要贡献**：
- 项目初始化和基础架构搭建
- LyButton 组件开发
- LyPersonSelect 组件开发（支持 Vue 2 和 Vue 3）
- 工具函数编写和全局导入
- 全局状态引入处理
- 生产接口跨域问题解决
- 构建规则调整和参考实例写入
- 组件样式冲突和覆盖问题修复
- 审批人选择窗口问题修复
- 标注工具包版本更新

**技术特点**：
- 擅长 Vue 组件开发
- 熟悉 TypeScript 和 Vite 构建
- 注重组件样式和用户体验
- 善于解决跨域和样式冲突问题
- 熟悉 Monorepo 项目结构

## Git命令参考

### 查看完整提交历史

```bash
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看指定提交者的提交历史

```bash
# 查看杜审言的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="杜审言"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dushenyan"

# 查看其他提交者的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="Elegant"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="shenyandu"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="十七"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dbudaiya"
```

### 查看特定时间段的提交

```bash
# 查看2025年5月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2025-05-01" --until="2025-05-31"

# 查看2025年2月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2025-02-01" --until="2025-02-28"

# 查看2024年11月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2024-11-01" --until="2024-11-30"
```

### 查看特定功能的提交

```bash
# 查看与组件相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --grep="组件" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与样式相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --grep="样式" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与构建相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --grep="构建" --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看提交统计信息

```bash
# 查看提交者统计
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git shortlog -sn

# 查看提交趋势
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --pretty=format:"%ad" --date=short | sort | uniq -c

# 查看代码提交量
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-ui
git log --numstat --pretty="%h" | awk '{add += $1; subs += $2; loc += $1 - $2} END {printf "Added lines: %s, Removed lines: %s, Total lines: %s\n", add, subs, loc}'
```

## 技术栈详情

**核心依赖**：
- Vue 3.3.4
- TypeScript 5.0.4
- Element Plus 2.9.0
- Vite 4.3.3
- Axios 1.7.9
- Less 4.1.3
- Sass 1.82.0

**开发工具**：
- ESLint 8.41.0
- Prettier 2.8.8
- Vitest 测试框架
- VitePress 文档系统
- Commitlint 提交规范
- Lint-staged 代码检查

**构建配置**：
- Monorepo 结构（pnpm workspace）
- 自动类型生成（vite-plugin-dts）
- 自动导入（unplugin-auto-import）
- 组件自动注册（unplugin-vue-components）

## 项目结构

```
liuyun-ui/
├── packages/
│   ├── components/     # 组件包
│   │   ├── src/
│   │   │   ├── LyButton/      # 按钮组件
│   │   │   ├── LyPersonSelect/ # 人员选择组件
│   │   │   ├── api/           # API 接口
│   │   │   ├── composables/   # 组合式函数
│   │   │   ├── style/         # 样式文件
│   │   │   ├── types/         # 类型定义
│   │   │   ├── utils/         # 工具函数
│   │   │   └── index.ts       # 组件导出
│   │   └── package.json       # 组件包配置
│   ├── site/          # 文档网站
│   │   ├── docs/              # 文档内容
│   │   └── package.json       # 网站配置
│   └── tests/         # 测试工具
├── package.json       # 根配置
├── pnpm-workspace.yaml # 工作区配置
└── tsconfig.json      # TypeScript 配置
```

## 核心组件

### LyButton 组件
- 支持多种按钮类型和样式
- 支持 loading 状态
- 支持禁用状态
- 支持自定义样式

### LyPersonSelect 组件
- 人员选择功能
- 支持弹框选择
- 支持 Vue 2 和 Vue 3 版本
- 支持输入搜索
- 解决输入人员后窗口被隐藏的问题

## 工具函数

- **auth.ts**：认证相关工具
- **common.ts**：通用工具函数
- **request.ts**：网络请求工具

## 文档网站

- 组件文档和使用示例
- 快速开始指南
- 演示案例

## 开发流程

### 常用命令

```bash
# 安装依赖
pnpm install

# 开发组件
pnpm dev

# 构建组件
pnpm build

# 构建文档
pnpm docs:build

# 发布组件
pnpm pub

# 代码检查
pnpm lint

# 运行测试
pnpm test

# 查看测试覆盖率
pnpm coverage

# 生成测试报告
pnpm report
```

### 组件开发流程

1. 在 `packages/components/src/` 下创建组件目录
2. 编写组件代码和类型定义
3. 在 `index.ts` 中导出组件
4. 在文档网站中添加使用示例
5. 运行测试确保组件正常工作
6. 构建并发布组件

## 部署与发布

### 发布流程

```bash
# 构建组件
pnpm build

# 发布到 npm
pnpm publish --filter liuyun-ui
```

### 文档网站部署

```bash
# 构建文档
pnpm docs:build

# 部署到静态网站服务器
# 将 docs/.vitepress/dist 目录部署到服务器
```

## 总结

流云UI组件库是一个功能完善、易于使用的 Vue 组件库。项目基于现代化的技术栈，提供了常用的 UI 组件和工具函数，同时支持 Vue 2 和 Vue 3。

**主要优势**：
- 现代化技术栈，代码质量高
- 支持 Vue 2 和 Vue 3
- 完善的文档和测试
- 易于扩展和定制
- 解决了实际项目中的常见问题

**未来发展**：
- 添加更多常用组件
- 完善组件文档和示例
- 支持更多定制化选项
- 优化组件性能
- 扩展工具函数库

流云UI组件库已经在实际项目中得到应用，为开发团队提供了便捷的 UI 组件解决方案。
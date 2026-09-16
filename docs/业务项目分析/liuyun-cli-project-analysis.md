# 流云CLI工具项目文档

## 项目概况

**项目名称**: liuyun-cli  
**项目类型**: 命令行工具  
**技术栈**: Node.js + TypeScript + Commander + Inquirer  
**开发时间**: 2023年12月 - 2025年2月  
**提交次数**: 约6次  

**核心功能**：
- 项目初始化（create 命令）
- 模板下载与配置
- 交互式命令行交互
- 项目构建和发布

## 项目亮点

### 技术亮点

1. **TypeScript 开发**：类型安全，代码质量高
2. **现代化命令行工具**：使用 Commander 构建命令行界面
3. **交互式用户体验**：使用 Inquirer 实现交互式问答
4. **模板下载**：集成 download-git-repo 实现代码仓库下载
5. **构建系统**：TypeScript 编译，支持开发和生产构建
6. **错误处理**：完善的错误处理和用户反馈
7. **开发工具链**：ESLint 代码规范，nodemon 开发热更新

### 功能亮点

1. **项目初始化**：快速创建新项目
2. **模板选择**：支持多种项目模板
3. **交互式配置**：通过问答形式配置项目
4. **目录检测**：检测目录是否存在并处理
5. **进度显示**：下载过程中显示加载动画
6. **版本管理**：支持版本更新和发布
7. **文档支持**：提供开发使用文档

## 已解决和优化的问题

**已解决问题**：
- 项目模板选项名称变更
- 构建工具版本大迭代
- 部分代码重构处理
- 发布版本更新

**优化项**：
- 代码结构优化
- 错误处理改进
- 用户交互体验提升
- 构建流程优化

## 主要贡献者

### 杜审言（dushenyan）

**主要贡献**：
- 项目初始化和基础架构搭建
- 构建工具版本大迭代
- 变更模板项目选项名称
- 补充开发使用文档
- 发布版本更新
- 部分代码重构处理
- 错误修复和优化

**技术特点**：
- 擅长命令行工具开发
- 熟悉 TypeScript 和 Node.js
- 注重代码质量和用户体验
- 善于解决构建和发布问题

## Git命令参考

### 查看完整提交历史

```bash
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看指定提交者的提交历史

```bash
# 查看杜审言的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="杜审言"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dushenyan"

# 查看其他提交者的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="Elegant"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="shenyandu"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="十七"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dbudaiya"
```

### 查看特定时间段的提交

```bash
# 查看2025年2月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2025-02-01" --until="2025-02-28"

# 查看2024年11月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2024-11-01" --until="2024-11-30"

# 查看2023年12月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2023-12-01" --until="2023-12-31"
```

### 查看特定功能的提交

```bash
# 查看与构建相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --grep="构建" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与版本相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --grep="版本" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与模板相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --grep="模板" --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看提交统计信息

```bash
# 查看提交者统计
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git shortlog -sn

# 查看提交趋势
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --pretty=format:"%ad" --date=short | sort | uniq -c

# 查看代码提交量
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-cli
git log --numstat --pretty="%h" | awk '{add += $1; subs += $2; loc += $1 - $2} END {printf "Added lines: %s, Removed lines: %s, Total lines: %s\n", add, subs, loc}'
```

## 技术栈详情

**核心依赖**：
- Node.js
- TypeScript 4.9.4
- Commander 11.0.0（命令行参数解析）
- Inquirer 8.2.5（交互式命令行）
- download-git-repo 3.0.2（代码仓库下载）
- fs-extra 11.1.1（文件系统操作）
- chalk 4.1.2（命令行颜色）
- ora 5.4.1（加载动画）

**开发工具**：
- ESLint 8.42.0
- nodemon 2.0.22
- rimraf 5.0.1
- vite 4.3.9

**构建配置**：
- TypeScript 编译到 CommonJS 模块
- 输出目录：lib
- 入口文件：bin/cli.js

## 项目结构

```
liuyun-cli/
├── bin/
│   └── cli.js        # 命令行入口
├── lib/             # 编译后的代码
│   ├── commands/     # 命令实现
│   ├── utils/        # 工具函数
│   └── ...
├── src/             # 源代码
│   ├── commands/     # 命令实现
│   │   └── create/    # create 命令
│   ├── utils/        # 工具函数
│   ├── const.ts      # 常量定义
│   ├── index.ts      # 主入口
│   ├── runner.ts     # 命令运行器
│   └── types.ts      # 类型定义
├── types/           # TypeScript 类型声明
├── package.json     # 项目配置
├── tsconfig.json    # TypeScript 配置
└── README.md        # 项目文档
```

## 核心功能模块

### 1. 命令行入口（bin/cli.js）
- 解析命令行参数
- 调用相应的命令处理函数

### 2. Create 命令
- 交互式询问用户配置
- 检测目录是否存在
- 下载代码模板
- 初始化项目

### 3. 工具函数
- 仓库下载
- 加载动画
- 交互式提示

### 4. 构建系统
- TypeScript 编译
- 代码规范检查
- 开发热更新

## 使用方法

### 安装

```bash
# 全局安装
npm install -g liuyun-cli

# 本地安装
npm install liuyun-cli --save-dev
```

### 基本命令

```bash
# 创建新项目
liuyun create <project-name>

# 查看版本
liuyun --version

# 查看帮助
liuyun --help
```

### 开发流程

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 代码检查
npm run lint

# 提交代码
npm run commit

# 生成 changelog
npm run changelog
```

## 部署与发布

### 发布到 npm

```bash
# 构建项目
npm run build

# 登录 npm
npm login

# 发布版本
npm publish
```

### 版本管理

项目使用语义化版本控制：
- 主版本号：不兼容的 API 变更
- 次版本号：向下兼容的功能性新增
- 补丁版本号：向下兼容的问题修正

## 总结

流云CLI工具是一个功能完善、易于使用的命令行工具，用于快速初始化项目。项目基于 TypeScript 开发，具有良好的代码质量和用户体验。

**主要优势**：
- 类型安全：使用 TypeScript 开发
- 交互友好：提供交互式配置
- 功能完善：支持项目初始化和模板下载
- 易于扩展：模块化设计，易于添加新功能

**未来发展**：
- 支持更多项目模板
- 增加更多命令功能
- 优化下载速度和用户体验
- 提供更多配置选项
- 支持自定义模板源

流云CLI工具已经在实际开发中得到应用，为开发团队提供了便捷的项目初始化工具。
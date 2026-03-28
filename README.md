# 杜审言-前端简历项目

## 项目简介

基于前端技术栈的个人简历生成项目，支持热更新、自动构建和多格式输出（HTML、PDF）。

- **在线预览**：[杜审言-前端简历](https://dushenyan-resume.netlify.app/)
- **技术栈**：TypeScript、Grunt（构建工具，负责任务管理、文件监听、编译等）、Less、Handlebars（模板引擎）
- **特性**：热更新、自动构建、响应式设计、多格式输出

## 功能特性

### 🚀 核心功能
- **热更新机制**：修改 `src/resumeSource.ts` 文件时自动更新 `resume/resume.json`
- **多格式输出**：支持生成 HTML 和 PDF 格式简历
- **响应式设计**：适配不同设备屏幕
- **模块化架构**：清晰的代码结构和构建流程

### 🔧 构建特性
- **Grunt 集成**：完整的构建流程和任务管理
- **TypeScript 支持**：类型安全的代码开发
- **Less 预编译**：模块化的样式管理
- **并发构建**：提高构建速度

## 快速开始

### 环境要求
- Node.js 22.0+
- pnpm 10.18+

### 安装依赖

```bash
# 使用 Make 命令（推荐）
make install

# 或直接使用 pnpm
pnpm install
```

### 开发模式

```bash
# 启动开发服务器和简历监听
make dev

# 或使用 pnpm
pnpm dev
```

### 构建命令

| 命令 | 描述 |
|------|------|
| `make build` | 完整构建（生成 HTML 和 PDF） |
| `make build-quick` | 快速构建（仅生成 HTML） |
| `make build-pdf` | 构建并生成 PDF |
| `make build-release` | 发布构建（生成压缩包） |
| `make lint` | 代码检查 |
| `make typecheck` | TypeScript 类型检查 |
| `make preview` | 构建并预览 |

## 热更新功能

### 功能介绍
支持在修改 `src/resumeSource.ts` 文件时自动更新 `resume/resume.json` 文件，无需手动重新编译。

### 使用方法

#### 开发模式（推荐）
```bash
make resume:watch
```

#### 完整开发环境
同时启动简历监听和开发服务器：
```bash
make resume:dev
```

### 热更新机制
1. **文件监听**：使用 `fs.watchFile` 监听 `src/resumeSource.ts` 文件变化
2. **模块缓存清理**：检测到文件变化时自动清除模块缓存
3. **数据验证**：重新生成前验证简历数据完整性
4. **自动导出**：验证通过后自动导出到指定路径

## 项目结构

```
├── src/                  # 源代码目录
│   ├── resumeSource.ts   # 简历数据源
│   ├── types.ts          # TypeScript 类型定义
│   └── generateResume.ts # 简历生成器
├── resume/               # 生成的简历文件
│   ├── resume.json       # 简历 JSON 数据
│   ├── resume.hbs        # 简历模板
│   └── resume.html       # 生成的 HTML 简历
├── docs/                 # 文档目录
│   ├── BUILD_OPTIMIZATION.md    # 构建优化说明
│   └── RESUME_HOT_RELOAD.md     # 热更新使用说明
├── Gruntfile.js          # Grunt 构建配置
├── package.json          # 项目配置和依赖
├── Makefile              # 快捷命令配置
└── README.md             # 项目自述文件
```

## 技术栈

- **前端**：TypeScript、Less、Handlebars
- **构建工具**：Grunt、npm scripts、Make
- **开发工具**：ESLint、Prettier
- **部署**：Netlify

## 简历数据管理

简历数据存储在 `src/resumeSource.ts` 文件中，包含两个主要导出：

1. **resumeSource**：原始简历数据
2. **resumeOptimized**：优化后的简历数据

修改数据后，热更新机制会自动生成新的 `resume/resume.json` 文件。

## 部署说明

### 构建部署文件
```bash
make deploy
```

### Netlify 部署
项目已配置 Netlify 自动部署，每次推送代码到主分支时会自动构建和部署。

## 参考资料

### 简历优化资源
- [工作三年的前端开发20k简历标准](https://juejin.cn/post/6995109164712214564)
- [手把手教你写一份优质的前端技术简历](https://juejin.cn/post/6844903638440116237)
- [面试官到底想看什么样的简历？](https://juejin.cn/post/6844903879973273607)
- [一份来自前端开发工程师的规范简历](https://zhuanlan.zhihu.com/p/29046955)

### 面试学习资源
- [小李前端-JS语法基础篇以及各类面试演练实操](https://space.bilibili.com/487429033/?spm_id_from=333.999.0.0)
- [林三心的挖掘机-面试进阶之路](https://space.bilibili.com/74475600/channel/seriesdetail?sid=502323)
- [前端小哥-前端大厂实习面经系列](https://space.bilibili.com/141227835/?spm_id_from=333.999.0.0)
- [OpenCoder-各类计算机知识](https://space.bilibili.com/516201363/?spm_id_from=333.999.0.0)

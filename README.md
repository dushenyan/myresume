# 杜审言-前端简历项目

## 项目简介

基于前端技术栈的个人简历生成项目，支持热更新、自动构建、多份简历配置和多格式输出（HTML、PDF）。

- **在线预览**：[杜审言-前端简历](https://dushenyan-resume.netlify.app/)
- **技术栈**：TypeScript、Grunt（构建工具，负责任务管理、文件监听、编译等）、Less、Handlebars（模板引擎）
- **特性**：热更新、自动构建、多简历配置、响应式设计、多格式输出

## 功能特性

### 🚀 核心功能
- **多简历配置**：共享同一份基础数据，按岗位维护多套简历配置（覆盖简介/筛选项目等），各自独立产出 JSON、HTML、PDF
- **热更新机制**：修改 `src/data/` 或 `src/profiles/` 下的文件时自动重新生成简历数据
- **多格式输出**：支持生成 HTML 和 PDF 格式简历
- **响应式设计**：适配不同设备屏幕
- **分层架构**：数据（data）→ 配置（profiles）→ 领域逻辑（core）→ 构建（build）→ CLI（scripts）各层职责单一

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
| `make build` | 完整构建（生成全部简历的 HTML 和 PDF） |
| `make build-quick` | 快速构建（仅生成 HTML） |
| `make resume` | 生成全部简历 JSON 数据 |
| `make resume-watch` | 监听数据变化自动重新生成 |
| `make lint` | 代码检查 |
| `make typecheck` | TypeScript 类型检查 |
| `make preview` | 构建并预览 |

## 多简历配置

所有简历共享 `src/data/` 下的一份基础数据；每份简历变体在 `src/profiles/` 下独立配置。

### 新增一份简历

1. 创建 `src/profiles/ai.ts`：

```ts
import type { ResumeProfile } from './types'

export const aiProfile: ResumeProfile = {
  id: 'ai',
  displayName: 'AI应用方向',
  jsonOutput: 'resume/ai.json',
  htmlOutput: 'dist/ai/index.html',
  pdfOutput: 'dist/杜审言-前端-AI应用方向.pdf',
  build: base => ({
    ...base,
    basics: {
      ...base.basics,
      html_title: '杜审言-前端-AI应用方向',
    },
    // 例：只展示与 AI 相关的个人项目
    personalProjects: base.personalProjects?.filter(p =>
      ['file-wizard', 'name-sprout', 'skills'].includes(p.name),
    ),
  }),
}
```

2. 注册到 `src/profiles/index.ts` 的 `profiles` 数组。

之后 `make build` 会自动为该配置多产出一份 JSON、HTML 和 PDF；也可以单独构建：

```bash
npx esno src/scripts/build-pdf.ts --profile=ai
```

### 输出路径

每个 profile 显式声明 `jsonOutput` / `htmlOutput` / `pdfOutput` 三个输出路径，互不影响；默认简历 `social` 的输出路径与项目历史输出保持一致。

## 热更新功能

### 使用方法

```bash
# 仅监听简历数据
make resume-watch

# 同时启动简历监听和开发服务器（推荐）
pnpm resume:dev
```

### 热更新机制
1. **目录监听**：使用 `fs.watch` 监听 `src/data/` 与 `src/profiles/` 目录变化（覆盖所有子模块）
2. **模块缓存清理**：检测到变化时按目录前缀清除 require 缓存，确保拿到最新数据
3. **数据验证**：重新生成前校验简历数据完整性，失败时告警但不中断
4. **自动导出**：校验通过后写入各 profile 声明的 JSON路径

## 项目结构

```
├── src/                      # 源代码
│   ├── types.ts              # 领域类型定义（唯一数据契约）
│   ├── data/                 # 共享简历数据（按模块拆分）
│   │   ├── basics.ts         # 基本信息
│   │   ├── work.ts           # 工作经历
│   │   ├── projects.ts       # 业务项目
│   │   ├── personalProjects.ts # 个人项目
│   │   ├── skills.ts / education.ts / certifications.ts
│   │   ├── awards.ts / interests.ts / selfEvaluate.ts
│   │   └── index.ts          # assembleBaseResume()：组装基础简历
│   ├── profiles/             # 多简历配置层
│   │   ├── types.ts          # ResumeProfile 接口
│   │   ├── social.ts         # 默认简历（前端-社招）
│   │   └── index.ts          # 配置注册表
│   ├── core/                 # 领域逻辑（与 IO、CLI 分离）
│   │   ├── generate.ts       # 组装 → 校验 → 写 JSON
│   │   ├── validate.ts       # 数据完整性校验
│   │   ├── transform.ts      # 渲染前数据加工（日期/工时/头像兜底）
│   │   ├── helpers.ts        # Handlebars helpers
│   │   ├── render.ts         # 模板 + CSS 注入渲染
│   │   └── profiles.ts       # 配置加载与 --profile 参数解析
│   ├── build/                # 构建动作
│   │   ├── html.ts           # JSON → HTML
│   │   └── pdf.ts            # HTML → PDF（Chrome 探测 + Puppeteer）
│   └── scripts/              # CLI 薄壳入口
│       ├── generate.ts       # 简历数据生成（含 watch 模式）
│       ├── build-html.ts     # HTML 构建
│       ├── build-pdf.ts      # PDF 构建
│       └── serve.ts          # 本地预览服务器
├── resume/                   # 生成的简历数据
│   ├── resume.hbs            # Handlebars 模板
│   └── resume.json           # 默认简历 JSON（由 generate 产出）
├── assets/less/              # Less 样式源码
├── dist/                     # 构建产物（HTML / PDF）
├── Gruntfile.js              # Grunt 构建配置
├── Makefile                  # 快捷命令
└── package.json              # 项目配置和依赖
```

## 技术栈

- **前端**：TypeScript、Less、Handlebars
- **构建工具**：Grunt、npm scripts、Make
- **开发工具**：ESLint、TypeScript
- **部署**：Netlify

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

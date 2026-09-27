# Skills 项目文档

> 基于 Git 提交历史生成的项目全面分析报告
> 生成日期：2026-04-02

---

## 📋 目录

- [项目概况](#项目概况)
- [项目亮点](#项目亮点)
- [已解决和优化的问题](#已解决和优化的问题)
- [主要贡献者](#主要贡献者)
- [Git 历史查询命令](#git-历史查询命令)

---

## 📊 项目概况

### 基本信息

| 项目属性 | 详情 |
|---------|------|
| **项目名称** | skills（Shenyan Du 的技能集） |
| **项目类型** | Agent Skills 集合 |
| **描述** | 精心策划的 Agent Skills 集合，反映 Shenyan Du 的偏好、经验和最佳实践 |
| **作者** | Shenyan Du (dushenyan) |
| **仓库地址** | https://github.com/dushenyan/skills |
| **开发语言** | TypeScript |
| **包管理器** | pnpm@10.32.1 |
| **项目周期** | 2026-03-26（单日开发） |

### 技术栈

**核心依赖：**
- `@clack/prompts` - 现代化交互式提示库
- `degit` - Git 仓库克隆工具
- `tsx` - TypeScript 执行引擎
- `typescript` - TypeScript 编译器

**开发工具：**
- `@antfu/eslint-config` - ESLint 配置
- `eslint` - 代码质量检查
- `lint-staged` - Git 暂存文件检查
- `simple-git-hooks` - Git 钩子管理

### 项目结构

```
skills/
├── instructions/          # 技能生成说明
│   ├── pnpm.md
│   ├── tsdown.md
│   ├── vite.md
│   └── vue.md
├── scripts/              # 脚本工具
│   └── cli.ts
├── skills/               # 技能输出目录
│   ├── cli/             # CLI 开发最佳实践
│   ├── pnpm/            # pnpm 包管理器指南
│   ├── resume/          # 简历技能
│   ├── shenyan/         # 个人偏好和最佳实践
│   ├── tsdown/          # TypeScript 库打包工具
│   └── web-design-guidelines/  # 网页设计指南
├── sources/              # 源文档（Git 子模块）
│   ├── pnpm/            # pnpm 官方文档
│   └── vite/            # Vite 官方文档
├── vendor/               # 第三方技能
│   └── tsdown/          # tsdown 官方技能
├── meta.ts               # 项目元数据配置
└── AGENTS.md             # 技能生成指南
```

### 代码统计

| 指标 | 数值 |
|------|------|
| **总提交次数** | 5 次 |
| **代码新增** | 491,470 行 |
| **代码删除** | 255 行 |
| **净增代码** | 491,215 行 |
| **开发时长** | 1 天（2026-03-26） |

### 技能分类

#### 手动维护的技能
- **shenyan** - Shenyan Du 对应用/库项目的偏好和最佳实践

#### 从官方文档生成的技能
- **pnpm** - 快速、磁盘空间高效的包管理器
- **vite** - Vite 构建工具配置、插件、SSR、库模式
- **vue** - Vue.js 核心、响应式、组件、组合式 API

#### 第三方技能
- **tsdown**（官方）- 由 Rolldown 驱动的 TypeScript 库打包工具
- **turborepo**（官方）- 用于 monorepo 的高性能构建系统
- **web-design-guidelines** - 构建美观界面的网页设计指南

---

## ✨ 项目亮点

### 1. 创新的技能管理理念

**核心理念：**
- **可共享性** - 提示更容易在项目之间管理和重用
- **按需使用** - 技能可以根据需要被引入，规模远超上下文窗口限制
- **标准化格式** - 纯 Markdown 文件，作为代理的知识库

**技术优势：**
- 使用 Git 子模块直接引用源文档
- 技能随上游更改自动同步
- 灵活的模板化设计

### 2. 多类型技能来源

#### 类型 1：生成的技能（sources/）
- 从 OSS 项目文档自动生成
- 适用于没有现有技能的项目
- 工作流程：阅读文档 → 理解 → 生成技能

**代表项目：**
- Vue.js - 渐进式 JavaScript 框架
- Vite - 下一代前端构建工具
- pnpm - 快速、磁盘空间高效的包管理器

#### 类型 2：同步的技能（vendor/）
- 从维护自己技能的项目同步
- 保持与上游同步更新
- 可选重命名和定制

**代表项目：**
- tsdown - TypeScript 库打包工具
- turborepo - Monorepo 构建系统

#### 类型 3：手写的技能
- 基于个人偏好和经验
- 包含最佳实践和约定
- 体现个人技术品味

### 3. 完善的技能生成系统

**AGENTS.md 驱动：**
- 详细的生成指南和最佳实践
- 标准化的目录结构
- 清晰的工作流程定义

**生成原则：**
- 专注于代理的能力和实际使用模式
- 忽略面向用户的指南和入门内容
- 忽略 LLM 代理已知的内容
- 保持简洁，避免过多引用

**分类体系：**
- `core` - 核心功能
- `features` - 高级特性
- `best-practices` - 最佳实践
- `advanced` - 高级用法

### 4. 丰富的技能生态

#### CLI 开发技能
**覆盖领域：**
- 架构设计模式
- 参数解析（Commander.js）
- 交互式提示（@clack/prompts）
- 日志输出和配置管理
- 错误处理和测试策略

**技术栈：**
- Commander.js - 命令行解析
- @clack/prompts - 交互式界面
- chalk - 终端样式
- ora - 加载动画
- Zod - 数据验证

#### pnpm 包管理技能
**核心内容：**
- 核心概念和存储布局
- 工作区管理和 monorepo 支持
- 配置选项和最佳实践

**主要优势：**
- 节省磁盘空间（内容寻址存储）
- 更快的安装速度
- 清洁的 node_modules
- 严格的依赖管理

#### tsdown 打包技能
**功能特性：**
- TypeScript/JavaScript 库打包
- 多格式输出（ESM, CJS, IIFE, UMD）
- 类型声明生成
- 树摇和压缩优化
- 框架支持（React, Vue, Solid, Svelte）

**高级功能：**
- CSS 处理和预处理
- 可执行文件生成
- 工作区支持
- CI 环境适配

### 5. 灵活的配置系统

**meta.ts 配置：**
```typescript
// 项目元数据定义
export const submodules = {
  'vue': 'https://github.com/vuejs/docs',
  'vite': 'https://github.com/vitejs/vite',
  'pnpm': 'https://github.com/pnpm/pnpm.io',
  // ...
}
```

**配置特性：**
- 子模块 URL 管理
- 技能映射和重命名
- 同步策略定义

### 6. 自动化工作流程

**CLI 工具支持：**
```bash
# 初始化子模块
pnpm start init

# 同步第三方技能
pnpm start sync

# 清理现有技能
pnpm start cleanup
```

**自动化流程：**
- Git 子模块自动克隆
- 技能文件自动同步
- 元数据自动生成

---

## 🔧 已解决和优化的问题

### 项目初始化

#### 1. 项目结构搭建
**问题：** 需要建立一个可扩展的技能管理系统。

**解决方案：**
- 设计三层技能来源结构
- 创建标准化的输出目录
- 配置 Git 子模块引用源文档

**影响：** 建立了清晰的项目架构，支持多种技能来源。

### 技能生成优化

#### 2. 简历技能文档重构
**问题：** 简历技能文档结构需要优化，缺少参考文件。

**解决方案：**
- 重构简历技能文档结构
- 添加新的参考文件
- 优化文档分类和组织

**影响：** 提升了简历技能的可用性和完整性。

#### 3. CLI 技能文档完善
**问题：** 缺少现代 CLI 应用程序开发的最佳实践文档。

**解决方案：**
- 添加 CLI 开发最佳实践文档
- 涵盖架构设计、参数解析、交互式提示等
- 提供完整的测试策略

**影响：** 为 CLI 开发提供了全面的指导。

### 文档管理

#### 4. AGENTS.md 格式优化
**问题：** AGENTS.md 文档格式需要改进以提升可读性。

**解决方案：**
- 更新文档格式和内容
- 优化章节结构
- 增强生成指南的清晰度

**影响：** 提升了技能生成的效率和质量。

---

## 👥 主要贡献者

### Elegant

**贡献概览：**
- **提交次数：** 3 次
- **代码变更：** 新增 488,861 行，删除 250 行
- **贡献日期：** 2026-03-26
- **主要角色：** 项目初始化者、核心架构师

**主要贡献：**

#### 项目初始化
- 🎯 初始化项目文件结构
- 🏗️ 建立技能管理系统架构
- 📦 配置 Git 子模块和依赖

#### 技能开发
- 📝 重构简历技能文档结构并添加新参考文件
- 🎨 设计技能分类和组织方式
- 🔧 创建技能生成工作流程

#### 文档完善
- 📚 建立项目文档体系
- 📋 创建提交模板
- 🎯 定义技能生成最佳实践

**贡献特点：**
- 注重架构设计和可扩展性
- 关注文档质量和可读性
- 推动项目从概念到实现的快速落地

---

### dushenyan

**贡献概览：**
- **提交次数：** 2 次
- **代码变更：** 新增约 2,609 行，删除约 5 行
- **贡献日期：** 2026-03-26
- **主要角色：** 文档优化者、功能完善者

**主要贡献：**

#### 文档优化
- 📖 添加现代 CLI 应用程序开发的最佳实践和模式文档
- 📝 更新 AGENTS.md 文档格式和内容
- 🎨 优化文档结构和可读性

#### 功能完善
- 🔧 完善技能生成指南
- 📚 扩展技能覆盖范围
- 🎯 提升文档实用性

**贡献特点：**
- 专注于文档质量和完整性
- 注重最佳实践的总结和分享
- 持续优化用户体验

---

### 其他指定提交者

#### 杜审言
**状态：** 未在 Git 提交历史中找到相关记录

**可能原因：**
- 该名称可能为别名或昵称
- 可能使用了不同的 Git 配置
- 可能参与了非代码贡献（如文档编写、测试等）

#### shenyandu
**状态：** 未在 Git 提交历史中找到相关记录

**可能原因：**
- 该名称可能是邮箱用户名的一部分
- 可能使用了不同的 Git 配置
- 可能参与了其他形式的贡献

#### 十七
**状态：** 未在 Git 提交历史中找到相关记录

**可能原因：**
- 该名称可能为昵称或代号
- 可能使用了不同的 Git 配置
- 可能参与了非代码贡献

---

## 🔍 Git 历史查询命令

以下命令供您查询详细的提交历史记录：

### 查看完整提交历史

```bash
# 查看所有提交的详细信息
git log --all --pretty=format:'%H|%an|%ae|%ad|%s' --date=iso

# 查看简洁的提交历史
git log --all --oneline --graph

# 查看最近 N 次提交
git log -n 10 --oneline
```

### 按提交者查询

```bash
# 查看 Elegant 的所有提交
git log --all --author="Elegant" --pretty=format:'%ad|%s' --date=short

# 查看 dushenyan 的所有提交
git log --all --author="dushenyan" --pretty=format:'%ad|%s' --date=short

# 查看指定邮箱的所有提交
git log --all --author="63347504+dushenyan@users.noreply.github.com" --oneline

# 查看所有提交者列表
git log --all --format='%aN' | sort -u
```

### 统计分析命令

```bash
# 查看提交次数统计
git shortlog -sn --all

# 查看代码变更统计
git log --all --numstat --pretty=format:'' | awk 'NF==3 {add+=$1; del+=$2} END {printf "Added: %d lines, Deleted: %d lines\n", add, del}'

# 查看指定作者的代码变更统计
git log --all --author="Elegant" --numstat --pretty=format:'' | awk 'NF==3 {add+=$1; del+=$2} END {printf "Added: %d lines, Deleted: %d lines\n", add, del}'

# 查看每个提交者的详细统计
git log --all --format='%aN' | sort -u | while read name; do
  echo -en "$name\t"
  git log --all --author="$name" --pretty=tformat: --numstat | awk '{add+=$1; del+=$2} END {printf "Added: %d, Deleted: %d\n", add, del}'
done
```

### 按时间范围查询

```bash
# 查看指定日期范围的提交
git log --all --since="2026-01-01" --until="2026-12-31" --oneline

# 查看某个月的提交
git log --all --since="2026-03-01" --until="2026-03-31" --oneline

# 查看最近一周的提交
git log --all --since="1 week ago" --oneline
```

### 按文件或目录查询

```bash
# 查看某个文件的修改历史
git log --all --follow -- <文件路径>

# 查看某个目录的所有提交
git log --all -- <目录路径>

# 查看某个文件的所有修改者
git log --all --format='%aN' -- <文件路径> | sort -u
```

### 提交内容分析

```bash
# 查看每次提交的文件变更统计
git log --all --stat --oneline

# 查看某次提交的详细内容
git show <commit-hash>

# 查看某次提交的文件列表
git show --name-only <commit-hash>
```

### 按提交类型查询

```bash
# 查看所有功能添加提交
git log --all --grep='feat' --oneline

# 查看所有问题修复提交
git log --all --grep='fix' --oneline

# 查看所有重构提交
git log --all --grep='refactor' --oneline

# 查看所有文档更新提交
git log --all --grep='docs' --oneline
```

### 生成提交报告

```bash
# 生成简洁的提交报告
git log --all --pretty=format:'%h - %an, %ar : %s' --date=relative

# 生成详细的提交报告（包含文件统计）
git log --all --pretty=format:'%H%n作者: %an <%ae>%n日期: %ad%n说明: %s%n' --date=iso --stat

# 导出提交历史到文件
git log --all --pretty=format:'%H|%an|%ae|%ad|%s' --date=iso > commit-history.csv
```

### 子模块相关查询

```bash
# 查看子模块状态
git submodule status

# 查看子模块更新历史
git log --all --grep='submodule' --oneline

# 查看特定子模块的变更
git log --all -- sources/<project-name>/
```

---

## 📈 项目发展趋势

### 开发时间线

```
2026-03-26  项目初始化
    ↓
2026-03-26  技能文档重构和完善
    ↓
2026-03-26  CLI 最佳实践文档添加
    ↓
2026-03-26  AGENTS.md 格式优化
```

### 项目特色

**概念验证：**
- 从源文档生成代理技能并保持同步
- 使用 Git 子模块直接引用源文档
- 提供更可靠的上下文和自动同步能力

**技术优势：**
- 标准化的技能格式
- 灵活的来源管理
- 自动化的工作流程

### 未来规划

根据项目定位，可能的演进方向：
- 扩展更多技能来源
- 优化技能生成算法
- 增强技能验证机制
- 提供技能测试框架

---

## 🎯 总结

Skills 项目是一个创新的 Agent Skills 管理系统，通过标准化的格式和自动化的工作流程，为 AI 代理提供了可共享、可重用的知识库。

**核心优势：**
- 创新的技能管理理念
- 多类型技能来源支持
- 完善的生成系统
- 丰富的技能生态
- 灵活的配置管理
- 自动化工作流程

**技术亮点：**
- Git 子模块引用源文档
- 三层技能来源架构
- AGENTS.md 驱动的生成流程
- 标准化的技能格式

**团队协作：**
- Elegant 主导项目初始化和架构设计
- dushenyan 负责文档优化和功能完善
- 单日完成项目搭建和核心功能实现

项目展现了高效的开發节奏和清晰的架构设计，为 Agent Skills 的管理和使用提供了优秀的解决方案。通过持续优化和扩展，有望成为 AI 代理技能管理的重要工具。

---

*本文档基于 Git 提交历史自动生成，数据截止至 2026-03-26*

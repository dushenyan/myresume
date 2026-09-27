# Name Sprout 项目文档

> 📅 文档生成日期：2026-04-02  
> 📂 项目路径：/Users/shenyandu/Desktop/emphasis/name-sprout

---

## 📋 目录

- [项目概况](#项目概况)
- [项目亮点](#项目亮点)
- [已解决与优化的问题](#已解决与优化的问题)
- [核心贡献者分析](#核心贡献者分析)
- [Git 查询命令参考](#git-查询命令参考)

---

## 🎯 项目概况

### 基本信息

| 项目属性 | 内容 |
|---------|------|
| **项目名称** | Name Sprout |
| **版本** | 0.1.0 |
| **项目定位** | 终端里的命名灵感助手 |
| **核心功能** | 基于 AI 的智能命名建议工具 |
| **作者** | dushenyan <dushenyan88@gmail.com> |
| **仓库地址** | https://github.com/dushenyan/name-sprout |
| **开发语言** | TypeScript |
| **运行环境** | Node.js >= 18.17 |
| **首次提交** | 2025-11-26 |
| **最新提交** | 2026-01-05 |
| **总提交数** | 12 次 |

### 项目简介

Name Sprout 是一款面向开发者的命令行工具，旨在解决编程过程中的命名难题。通过集成多种主流 AI 提供商（Gemini、DeepSeek、Groq），为用户提供智能化的命名建议服务。该工具支持多种命名风格转换，并允许用户通过参数调优来控制 AI 输出行为，极大地提升了开发效率和代码可读性。

### 技术栈

**核心依赖：**
- `commander` - CLI 命令行框架
- `@clack/prompts` - 交互式命令行界面
- `chalk` - 终端文本样式
- `ora` - 优雅的终端加载动画
- `yaml` - YAML 配置文件解析
- `zod` - 数据验证
- `undici` - HTTP 客户端

**开发工具：**
- `typescript` - 类型安全
- `tsdown` - 构建打包工具
- `vitest` - 单元测试框架
- `eslint` - 代码质量检查

---

## ✨ 项目亮点

### 1. 多 AI 提供商支持

项目创新性地集成了三大 AI 提供商，为用户提供灵活的选择：

- **Groq（推荐）**：提供免费层服务，30 requests/minute，无 Token 限制
- **DeepSeek**：国内可访问，响应快速
- **Gemini**：Google 最新模型，质量优秀

这种设计让用户可以根据自己的网络环境和预算选择最合适的提供商，特别推荐 Groq 的免费层，降低了使用门槛。

### 2. 多样化命名风格

支持四种主流命名风格，覆盖绝大多数编程场景：

- `lowerCamelCase` - 小驼峰（JavaScript/Java 常用）
- `snake_case` - 蛇形命名（Python/Ruby 常用）
- `PascalCase` - 大驼峰（类名/组件名）
- `kebab-case` - 短横线命名（CSS/URL）

### 3. 智能代理检测

项目内置了代理自动检测功能，解决了国内用户访问国外 API 的网络问题：

- 自动检测系统代理配置
- 提供友好的错误提示
- 支持手动配置代理地址
- 详细的代理配置指南文档

### 4. 高度可配置

通过 YAML 配置文件实现团队级配置共享：

- 自定义提示词模板
- 调整 AI 参数（temperature、top_k）
- 设置默认命名风格
- 配置代理和 API Key

### 5. 优秀的用户体验

- **交互式选择界面**：使用箭头键快速切换候选命名
- **纯文本模式**：支持脚本化调用，便于集成到其他工具
- **中文释义**：每条命名附带中文说明，快速理解含义
- **实时反馈**：优雅的加载动画和错误提示

### 6. 完善的开发体验

- TypeScript 全栈类型安全
- ESLint 代码规范检查
- Vitest 单元测试支持
- 监听模式的开发环境
- 全局 CLI 命令支持

---

## 🔧 已解决与优化的问题

### 阶段一：项目初始化与基础功能（2025-11-26）

#### ✅ 项目基础架构搭建
**问题**：需要从零开始构建一个完整的 CLI 工具项目。

**解决方案**：
- 创建完整的项目配置文件（package.json、tsconfig.json）
- 配置 TypeScript 开发环境
- 实现 CLI 工具的核心功能
- 设置构建和开发脚本

**影响**：为后续功能开发奠定了坚实的基础。

#### ✅ 版本控制优化
**问题**：构建产物和依赖锁定文件不应纳入版本控制。

**解决方案**：
- 更新 .gitignore 文件
- 忽略 dist 目录（构建产物）
- 忽略 lock 文件（依赖锁定）

**影响**：保持仓库整洁，避免不必要的冲突。

---

### 阶段二：代理功能增强（2025-11-28）

#### ✅ 代理自动检测功能
**问题**：国内用户访问 Gemini API 需要配置代理，手动配置繁琐且容易出错。

**解决方案**：
- 实现代理自动检测功能
- 新增代理自动检测指南文档（PROXY_GUIDE.md）
- 提供详细的配置说明和故障排查指南

**影响**：显著降低了国内用户的使用门槛。

#### ✅ 代理检测功能优化
**问题**：代理检测失败时错误提示不够友好，代码结构需要改进。

**解决方案**：
- 优化代理检测功能的代码结构
- 增强错误提示信息
- 提供更清晰的故障排查指引

**影响**：用户遇到代理问题时能快速定位和解决。

#### ✅ 错误处理改进
**问题**：代理检测失败时抛出错误会中断程序运行。

**解决方案**：
- 注释掉代理检测失败的错误抛出
- 改为友好的警告提示
- 允许程序在无代理情况下继续运行

**影响**：提升了程序的容错性和用户体验。

---

### 阶段三：代码质量提升（2025-12-11）

#### ✅ 代码规范配置
**问题**：项目缺乏统一的代码风格规范。

**解决方案**：
- 添加 ESLint 配置文件
- 使用 @antfu/eslint-config 规范
- 更新 package.json 元信息

**影响**：提升了代码质量和团队协作效率。

#### ✅ 项目配置优化
**问题**：项目配置需要根据实际使用情况调整。

**解决方案**：
- 优化项目配置参数
- 调整默认设置
- 完善项目元数据

**影响**：项目配置更加合理，便于使用和维护。

---

### 阶段四：功能扩展（2026-01-05）

#### ✅ 多 AI 提供商支持
**问题**：项目最初只支持 Gemini，用户选择单一，且 Gemini 在国内访问困难。

**解决方案**：
- 新增 DeepSeek 提供商支持（国内可访问）
- 新增 Groq 提供商支持（免费层推荐）
- 实现提供商切换机制
- 更新配置文件结构

**影响**：
- 用户可以根据网络环境选择合适的提供商
- Groq 免费层降低了使用成本
- DeepSeek 为国内用户提供了便利

#### ✅ TypeScript 配置优化
**问题**：模块导入时包含文件扩展名，不符合最佳实践。

**解决方案**：
- 移除模块文件扩展名
- 更新 TypeScript 配置
- 统一导入规范

**影响**：代码更加简洁，符合 TypeScript 最佳实践。

#### ✅ 提示词优化
**问题**：命名服务提示中对英文标识符的说明不够清晰。

**解决方案**：
- 更新命名服务提示内容
- 完善英文标识符说明
- 提高命名建议的准确性

**影响**：AI 生成的命名建议更加准确和实用。

---

## 👥 核心贡献者分析

### 贡献者统计概览

| 提交者 | 提交次数 | 占比 | 活跃时间 |
|--------|---------|------|---------|
| Elegant | 12 | 100% | 2025-11-26 至 2026-01-05 |

> **说明**：根据 Git 历史记录分析，Elegant 的提交邮箱为 `63347504+dushenyan@users.noreply.github.com`，这表明 Elegant 与 dushenyan 为同一贡献者的不同身份标识。其他指定贡献者（杜审言、shenyandu、十七）在本项目中暂无提交记录。

---

### 🏆 Elegant (dushenyan) 的主要贡献

**身份标识**：
- Git 用户名：Elegant
- GitHub 用户：dushenyan
- 提交邮箱：63347504+dushenyan@users.noreply.github.com

**贡献概览**：作为项目的唯一贡献者，Elegant 完成了项目的全部开发工作，展现了全栈开发能力和产品思维。

#### 🎯 核心贡献领域

**1. 项目架构设计（占比：25%）**
- ✅ 设计并实现了完整的 CLI 工具架构
- ✅ 建立了模块化的代码组织结构
- ✅ 配置了现代化的 TypeScript 开发环境
- ✅ 集成了多种开发工具（ESLint、Vitest、tsdown）

**关键提交**：
- `ea2c212` - 新增项目基础配置与 CLI 工具实现
- `89b4db6` - 添加 ESLint 配置并更新 package.json 元信息

**2. AI 提供商集成（占比：20%）**
- ✅ 实现了 Gemini API 集成
- ✅ 新增 DeepSeek 提供商支持
- ✅ 新增 Groq 提供商支持（免费层推荐）
- ✅ 设计了灵活的提供商切换机制

**关键提交**：
- `c59729d` - 支持 DeepSeek 和 Groq 作为新的 AI 提供商

**技术亮点**：
- 通过配置文件实现提供商的灵活切换
- 为每个提供商提供独立的参数配置
- 推荐使用 Groq 免费层，降低用户成本

**3. 用户体验优化（占比：25%）**
- ✅ 实现了交互式命令行界面
- ✅ 添加了优雅的加载动画和错误提示
- ✅ 支持纯文本模式输出
- ✅ 为每条命名提供中文释义

**关键提交**：
- `ea2c212` - CLI 工具实现
- `331f776` - 更新命名服务提示中的英文标识符说明

**用户价值**：
- 交互式界面大幅提升了使用效率
- 中文释义帮助用户快速理解命名含义
- 纯文本模式便于集成到自动化流程

**4. 网络问题解决（占比：20%）**
- ✅ 实现了代理自动检测功能
- ✅ 编写了详细的代理配置指南
- ✅ 优化了错误提示和故障排查流程
- ✅ 改进了代理检测的容错性

**关键提交**：
- `c4456ae` - 新增代理自动检测指南文档
- `07b1919` - 优化代理检测功能，增强错误提示和代码结构
- `8a62ccd` - 注释掉 Git 代理检测失败的错误抛出

**解决问题**：
- 解决了国内用户访问国外 API 的网络障碍
- 提供了清晰的故障排查指引
- 平衡了功能性和容错性

**5. 代码质量保障（占比：10%）**
- ✅ 引入 ESLint 代码规范
- ✅ 优化 TypeScript 配置
- ✅ 统一代码风格和导入规范
- ✅ 完善项目元数据

**关键提交**：
- `898018b` - 添加 ESLint 配置并更新 package.json 元信息
- `3ac90ec`、`89b4db6` - 移除模块文件扩展名并更新TS配置

**质量提升**：
- 代码风格统一，便于维护
- TypeScript 类型安全，减少运行时错误
- 符合社区最佳实践

#### 📊 贡献时间线

```
2025-11-26  项目启动
    └─ 新增项目基础配置与 CLI 工具实现
    └─ 更新 .gitignore

2025-11-28  代理功能增强
    └─ 新增代理自动检测指南文档
    └─ 优化代理检测功能
    └─ 改进错误处理

2025-12-11  代码质量提升
    └─ 添加 ESLint 配置
    └─ 项目配置优化

2026-01-05  功能扩展
    └─ 支持 DeepSeek 和 Groq
    └─ TypeScript 配置优化
    └─ 提示词优化
```

#### 💡 技术特色

**架构设计**：
- 采用模块化设计，职责分离清晰
- 配置驱动，易于扩展和维护
- 类型安全，减少运行时错误

**工程实践**：
- 完善的开发工具链
- 规范的代码风格
- 详细的文档说明

**用户导向**：
- 解决了实际痛点（命名难题、网络问题）
- 提供了灵活的选择（多提供商、多风格）
- 注重用户体验（交互式界面、友好提示）

---

### 其他指定贡献者说明

根据 Git 提交历史分析，以下贡献者在当前项目中暂无提交记录：

- **杜审言**：未发现相关提交记录
- **shenyandu**：未发现相关提交记录
- **十七**：未发现相关提交记录

> **注**：这些贡献者可能在其他分支、fork 仓库或通过其他方式（如 Issue、PR Review）参与项目。建议使用后续提供的 Git 命令进行更详细的查询。

---

## 📚 Git 查询命令参考

本章节提供了一系列实用的 Git 命令，供您查询详细的提交历史和贡献者信息。

### 基础查询命令

#### 查看完整提交历史
```bash
# 查看所有提交的详细信息（包含哈希、作者、日期、提交说明）
git log --all --pretty=format:"%H|%an|%ae|%ad|%s" --date=iso

# 查看简洁版提交历史（单行显示）
git log --all --oneline

# 查看最近 N 条提交
git log --all -n 10 --oneline
```

#### 查看提交统计信息
```bash
# 按提交者统计提交次数
git shortlog -sn --all

# 查看每个提交者的详细提交列表
git shortlog -sne --all

# 按时间范围统计（例如：2025年11月）
git log --all --since="2025-11-01" --until="2025-11-30" --oneline
```

### 贡献者相关查询

#### 查询指定贡献者的提交
```bash
# 查询 Elegant 的所有提交
git log --all --author="Elegant" --pretty=format:"%H|%ad|%s" --date=short

# 查询 dushenyan 的所有提交
git log --all --author="dushenyan" --pretty=format:"%H|%ad|%s" --date=short

# 查询包含特定关键词的提交者
git log --all --author="杜审言\|Elegant\|shenyandu\|dushenyan\|十七" --oneline
```

#### 查看贡献者的代码变更统计
```bash
# 查看某贡献者的代码行数统计
git log --all --author="Elegant" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'

# 查看某贡献者修改的文件列表
git log --all --author="Elegant" --name-only --pretty=format: | sort -u
```

### 文件和功能相关查询

#### 查看特定文件的修改历史
```bash
# 查看 README.md 的完整修改历史
git log --all --follow --pretty=format:"%H|%ad|%an|%s" --date=short -- README.md

# 查看某个目录的所有修改
git log --all --pretty=format:"%H|%ad|%an|%s" --date=short -- src/

# 查看最近一次修改某文件的提交
git log -1 --all --pretty=format:"%H|%ad|%an|%s" --date=iso -- package.json
```

#### 按提交类型筛选
```bash
# 查看所有功能新增（feat）的提交
git log --all --grep="feat:" --oneline

# 查看所有文档更新（docs）的提交
git log --all --grep="docs:" --oneline

# 查看所有问题修复（fix）的提交
git log --all --grep="fix:" --oneline

# 查看所有重构（refactor）的提交
git log --all --grep="refactor:" --oneline

# 查看所有配置相关（chore）的提交
git log --all --grep="chore:" --oneline
```

### 时间范围查询

#### 按日期范围查询
```bash
# 查询 2025年11月的所有提交
git log --all --since="2025-11-01" --until="2025-11-30" --pretty=format:"%H|%ad|%an|%s" --date=short

# 查询最近 30 天的提交
git log --all --since="30 days ago" --oneline

# 查询某日期之后的所有提交
git log --all --after="2025-12-01" --pretty=format:"%H|%ad|%an|%s" --date=short

# 查询两个日期之间的提交
git log --all --since="2025-11-01" --until="2026-01-05" --oneline
```

### 详细变更查询

#### 查看提交的详细变更内容
```bash
# 查看某次提交的详细变更
git show <commit-hash>

# 查看某次提交的统计信息
git show --stat <commit-hash>

# 查看某次提交的文件变更列表
git show --name-only <commit-hash>

# 查看某次提交的代码差异
git show --color-words <commit-hash>
```

#### 对比不同版本
```bash
# 对比两个提交之间的差异
git diff <commit-hash-1> <commit-hash-2>

# 对比两个提交之间的文件变更统计
git diff --stat <commit-hash-1> <commit-hash-2>

# 对比两个提交之间的特定文件
git diff <commit-hash-1> <commit-hash-2> -- <file-path>
```

### 分支和标签查询

#### 查看分支信息
```bash
# 查看所有分支
git branch -a

# 查看分支的提交历史
git log --all --graph --oneline --decorate

# 查看某个分支的提交历史
git log <branch-name> --oneline
```

#### 查看标签信息
```bash
# 查看所有标签
git tag -l

# 查看某个标签的详细信息
git show <tag-name>

# 查看某个标签的提交历史
git log <tag-name> --oneline
```

### 高级查询技巧

#### 组合查询
```bash
# 查询某作者在某时间段内的提交
git log --all --author="Elegant" --since="2025-11-01" --until="2025-12-31" --pretty=format:"%H|%ad|%s" --date=short

# 查询某作者修改某文件的提交
git log --all --author="Elegant" --pretty=format:"%H|%ad|%s" --date=short -- src/naming-service.ts

# 查询包含特定关键词的提交说明
git log --all --grep="代理" --oneline
git log --all --grep="AI" --oneline
git log --all --grep="优化" --oneline
```

#### 导出查询结果
```bash
# 将提交历史导出到文件
git log --all --pretty=format:"%H|%an|%ae|%ad|%s" --date=iso > commit-history.csv

# 将某作者的提交导出到文件
git log --all --author="Elegant" --pretty=format:"%H|%ad|%s" --date=short > elegant-commits.txt

# 导出代码统计信息
git log --all --author="Elegant" --shortstat > code-stats.txt
```

### 可视化查询

#### 图形化显示
```bash
# 以图形方式显示提交历史
git log --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

# 简洁的图形化显示
git log --all --graph --oneline --decorate

# 使用 gitk 图形界面
gitk --all

# 使用 gitg 图形界面（如果安装）
gitg
```

---

## 📝 附录

### 项目目录结构

```
name-sprout/
├── .vscode/              # VS Code 配置
│   └── settings.json
├── prompts/              # 提示词配置
│   └── naming.yaml
├── src/                  # 源代码目录
│   ├── cli.ts           # CLI 入口
│   ├── config.ts        # 配置管理
│   ├── deepseek-client.ts  # DeepSeek API 客户端
│   ├── gemini-client.ts    # Gemini API 客户端
│   ├── groq-client.ts      # Groq API 客户端
│   ├── naming-service.ts   # 命名服务核心逻辑
│   ├── prompts.ts       # 提示词处理
│   ├── proxy-detector.ts   # 代理检测
│   ├── proxy-utils.ts      # 代理工具函数
│   ├── types.ts         # 类型定义
│   └── ui.ts            # 用户界面
├── tests/               # 测试文件
│   └── naming-service.test.ts
├── .gitignore
├── .nvmrc
├── PROXY_GUIDE.md       # 代理配置指南
├── README.md            # 项目说明
├── eslint.config.mjs    # ESLint 配置
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json        # TypeScript 配置
├── tsdown.config.ts     # 构建配置
└── vitest.config.ts     # 测试配置
```

### 快速开始

```bash
# 安装依赖
ni

# 构建项目
npm run build

# 开发模式运行
npm run dev -- "your description"

# 全局安装
npm link
namesprout "your description"

# 运行测试
npm run test

# 代码检查
npm run lint
```

---

## 📌 总结

Name Sprout 是一个设计精良、功能完善的命令行工具，成功解决了开发者在命名过程中的痛点。项目从 2025年11月启动至今，经过持续迭代，已经具备了：

- ✅ 多 AI 提供商支持（Groq、DeepSeek、Gemini）
- ✅ 多种命名风格转换
- ✅ 智能代理检测与配置
- ✅ 优秀的用户体验
- ✅ 完善的代码质量保障

项目展现了良好的架构设计和工程实践，代码质量高，文档完善，是一个值得学习和使用的优秀开源项目。

---

**文档版本**：v1.0  
**最后更新**：2026-04-02  
**维护者**：自动生成文档系统

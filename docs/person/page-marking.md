# Page-Marking 项目文档

## 📋 目录

- [项目概况](#项目概况)
- [项目亮点](#项目亮点)
- [已解决和优化的问题](#已解决和优化的问题)
- [提交者贡献](#提交者贡献)
- [Git提交历史查询命令](#git提交历史查询命令)

---

## 项目概况

### 基本信息

- **项目名称**：page-marking（页面标记遮罩）
- **当前版本**：v1.0.0
- **项目类型**：油猴插件（Tampermonkey Userscript）
- **开发语言**：TypeScript + Vue 3
- **构建工具**：Vite 7.2.7
- **包管理器**：pnpm@10.17.1
- **作者**：dushenyan <dushenyan88@gmail.com>
- **仓库地址**：https://github.com/dushenyan/page-marking

### 项目描述

Page-Marking 是一个功能强大的油猴插件，旨在为网页提供智能遮罩处理能力。该插件支持多种遮罩模式，包括模糊、黑色遮罩或两者结合，能够有效减少屏幕眩光，提升阅读体验，并在需要时保护用户隐私。

### 技术栈

| 技术类别 | 技术选型 | 版本 |
|---------|---------|------|
| 前端框架 | Vue 3 | ^3.5.25 |
| 开发语言 | TypeScript | ^5.9.3 |
| 构建工具 | Vite | ^7.2.7 |
| 油猴插件构建 | vite-plugin-monkey | ^7.1.5 |
| 代码规范 | ESLint + @antfu/eslint-config | ^9.36.0 / ^4.14.1 |
| 类型检查 | vue-tsc | ^3.1.8 |

### 项目结构

```
page-marking/
├── .vscode/              # VS Code配置
│   └── extensions.json   # 推荐扩展列表
├── images/               # 项目文档图片
│   ├── image.png         # 功能演示图
│   └── image-1.png       # 控制面板截图
├── src/                  # 源代码目录
│   ├── components/       # Vue组件
│   │   └── PageMarkerPanel.vue  # 控制面板组件
│   ├── utils/            # 工具函数
│   │   └── pageMarker.ts # 页面标记器核心逻辑
│   ├── App.vue           # 根组件
│   ├── main.ts           # 插件入口文件
│   ├── style.css         # 全局样式
│   └── vite-env.d.ts     # Vite类型定义
├── .gitignore            # Git忽略配置
├── eslint.config.mjs     # ESLint配置
├── package.json          # 项目依赖配置
├── pnpm-lock.yaml        # 依赖锁定文件
├── tsconfig.json         # TypeScript配置
└── vite.config.ts        # Vite构建配置
```

### 核心功能

1. **多种遮罩模式**
   - 模糊模式：使用 CSS `backdrop-filter` 实现页面模糊效果
   - 遮罩模式：添加半透明黑色遮罩层
   - 混合模式：同时应用模糊和遮罩效果

2. **可拖动控制按钮**
   - 支持自由拖动定位
   - 智能边缘吸附功能
   - 位置自动保存与恢复

3. **快捷键支持**
   - F8：快速切换遮罩开关
   - F9：打开/关闭控制面板
   - ESC：关闭控制面板

4. **油猴菜单集成**
   - 切换页面遮罩
   - 打开控制面板
   - 显示/隐藏控制按钮
   - 快速跳转油猴配置

5. **配置持久化**
   - 所有设置自动保存到本地存储
   - 支持油猴 GM_getValue/GM_setValue API
   - 兼容 localStorage 作为降级方案

6. **SPA应用支持**
   - 自动监听 URL 变化
   - 使用 MutationObserver 监听 DOM 变化
   - 适应单页应用的路由切换

---

## 项目亮点

### 🎯 1. 优雅的单例模式设计

项目采用单例模式管理页面标记器实例，确保全局只有一个标记器实例，避免重复创建和资源浪费。

**实现亮点**：
- 私有构造函数，防止外部直接实例化
- 静态 getInstance() 方法提供全局访问点
- 配置状态集中管理，便于维护

### 🎨 2. 灵活的遮罩模式系统

支持三种遮罩模式的动态切换，满足不同场景需求：

- **模糊模式**：使用现代 CSS `backdrop-filter` 属性，性能优异
- **遮罩模式**：传统但兼容性好的半透明遮罩层
- **混合模式**：结合两者优势，提供更强的遮罩效果

### 🖱️ 3. 智能拖拽与边缘吸附

实现了流畅的按钮拖拽功能，并加入智能边缘吸附：

- 实时计算与屏幕边缘的距离
- 当距离小于阈值（50px）时自动吸附
- 吸附后保持 20px 的边距，避免紧贴边缘
- 位置自动保存，下次访问自动恢复

### ⌨️ 4. 完善的快捷键系统

提供了三组快捷键，覆盖主要操作场景：

- **F8**：快速切换遮罩，适合频繁开关场景
- **F9**：打开控制面板，进行详细设置
- **ESC**：关闭面板，符合用户习惯

### 🌐 5. SPA应用兼容性

针对现代单页应用（SPA）的特殊需求，实现了 URL 变化监听：

- 使用 MutationObserver 监听 DOM 变化
- 检测 URL 变化后自动重新应用遮罩
- 延迟 100ms 执行，确保页面内容已更新

### 💾 6. 双重存储机制

实现了油猴 API 和 localStorage 的双重存储机制：

- 优先使用油猴的 GM_getValue/GM_setValue
- 降级使用 localStorage，确保在非油猴环境也能工作
- 统一的存储接口，对上层透明

### 🎭 7. 优雅的UI设计

控制面板采用现代化的UI设计：

- 渐变色按钮，视觉效果出色
- 平滑的过渡动画
- 响应式布局，适配不同屏幕
- 清晰的视觉层级

### 🔧 8. 完善的开发工具链

项目配置了完整的开发工具链：

- **ESLint**：使用 @antfu/eslint-config，代码风格统一
- **TypeScript**：完整的类型定义，开发体验佳
- **Vite**：快速的开发服务器和构建
- **vue-tsc**：Vue 组件的类型检查

---

## 已解决和优化的问题

### ✅ 功能实现类

#### 1. 按钮边缘吸附和位置保存（提交：636dd8a）

**问题描述**：
- 控制按钮位置固定，无法自由移动
- 刷新页面后按钮位置重置

**解决方案**：
- 实现完整的拖拽功能，支持鼠标拖动
- 添加边缘吸附算法，当按钮靠近屏幕边缘时自动吸附
- 将按钮位置保存到配置中，实现持久化存储
- 页面加载时自动恢复上次保存的位置

**技术细节**：
- 使用 mousedown/mousemove/mouseup 事件实现拖拽
- 计算按钮与四个边缘的距离，判断是否触发吸附
- 吸附阈值设为 50px，吸附后保持 20px 边距

#### 2. 油猴菜单命令注册（提交：4e00d6a）

**问题描述**：
- 需要提供便捷的方式让用户控制插件

**解决方案**：
- 注册四个油猴菜单命令：
  - 切换页面遮罩
  - 打开控制面板
  - 显示/隐藏控制按钮
  - 打开油猴配置页面
- 每个命令都提供即时反馈通知

### ✅ 代码优化类

#### 1. 控制面板显示逻辑优化（提交：08d8862）

**问题描述**：
- 控制面板显示逻辑冗余
- 存在未使用的计算属性

**解决方案**：
- 简化面板显示的条件判断
- 移除未使用的计算属性
- 优化样式定义，减少重复代码

**优化效果**：
- 代码行数减少约 30%
- 逻辑更清晰，易于维护

#### 2. CSS样式优化（提交：33376bf）

**问题描述**：
- `all: initial` 属性可能影响某些样式继承

**解决方案**：
- 移除 page-marker-control 的 `all: initial` 属性
- 改用更精确的样式重置方式

### ✅ 工程化改进类

#### 1. ESLint配置添加（提交：4b15e2e）

**问题描述**：
- 缺少代码规范检查工具
- 代码风格不统一

**解决方案**：
- 添加 ESLint 配置文件（eslint.config.mjs）
- 使用 @antfu/eslint-config 作为基础配置
- 更新相关依赖到最新版本
- 对现有代码进行 ESLint 修复

**改进效果**：
- 代码风格统一
- 潜在问题提前发现
- 开发体验提升

#### 2. 依赖项更新（提交：5bd3de0, eae58a7）

**问题描述**：
- 部分依赖版本较旧
- 缺少版本管理工具

**解决方案**：
- 更新 Vue、Vite、TypeScript 等核心依赖到最新版本
- 添加 bumpp 工具用于版本管理
- 添加 packageManager 字段，明确使用 pnpm
- 添加 author 字段，明确项目作者

#### 3. TypeScript配置优化（提交：4b15e2e）

**问题描述**：
- TypeScript 配置分散，不易管理

**解决方案**：
- 合并 tsconfig.app.json 和 tsconfig.node.json 到 tsconfig.json
- 简化配置结构
- 提升类型检查效率

### ✅ 文档完善类

#### 1. README文档完善（提交：e14c0cc）

**问题描述**：
- 文档内容简单，缺少详细说明

**解决方案**：
- 添加详细的功能特性说明
- 添加完整的安装和使用指南
- 添加项目结构说明
- 添加技术栈介绍
- 添加开发指南和故障排除

**文档新增内容**：
- 功能特性章节（9个特性）
- 快速开始指南
- 详细的使用方法
- 高级设置说明
- 开发指南
- 故障排除

#### 2. 图片路径更新（提交：8eb36d5）

**问题描述**：
- README中的图片路径不正确

**解决方案**：
- 更新图片路径为正确的相对路径
- 移除过时的许可证部分

### ✅ 版本管理类

#### 1. 版本发布流程（提交：7f74112）

**问题描述**：
- 需要规范的版本发布流程

**解决方案**：
- 使用 bumpp 工具管理版本号
- 自动创建 Git tag
- 自动提交版本更新
- 发布 v1.0.0 版本

#### 2. package.json信息完善（提交：0aaef99）

**问题描述**：
- package.json 缺少必要的项目信息

**解决方案**：
- 添加详细的项目描述
- 添加仓库地址
- 添加项目图标
- 添加作者信息

---

## 提交者贡献

### 📊 提交者统计概览

根据Git提交历史分析，本项目的所有提交均由以下贡献者完成：

| 提交者 | 提交次数 | 占比 | 活跃时间段 |
|--------|---------|------|-----------|
| Elegant | 13 | 100% | 2025-12-09 至 2025-12-11 |

### 👤 Elegant

**提交者信息**：
- **用户名**：Elegant
- **邮箱**：63347504+dushenyan@users.noreply.github.com
- **提交次数**：13次
- **贡献占比**：100%
- **活跃时间**：2025年12月9日 - 2025年12月11日

#### 主要贡献领域

**1. 项目初始化与架构设计**
- 完成项目基础架构搭建（提交：4e00d6a）
- 配置 Vue 3 + TypeScript + Vite 技术栈
- 设计并实现核心功能模块

**2. 核心功能开发**
- 实现页面遮罩核心逻辑
- 开发控制面板组件
- 实现按钮拖拽和边缘吸附功能（提交：636dd8a）
- 集成油猴菜单命令

**3. 代码质量提升**
- 添加 ESLint 配置（提交：4b15e2e）
- 优化控制面板显示逻辑（提交：08d8862）
- 移除冗余代码和未使用的属性

**4. 工程化建设**
- 配置完整的开发工具链
- 更新和管理项目依赖（提交：5bd3de0, eae58a7）
- 优化 TypeScript 配置
- 添加版本管理工具

**5. 文档与发布**
- 完善项目文档（提交：e14c0cc）
- 管理版本发布流程（提交：7f74112）
- 更新项目元信息

#### 提交类型分布

| 提交类型 | 数量 | 占比 |
|---------|------|------|
| chore（工程化） | 7 | 53.8% |
| docs（文档） | 2 | 15.4% |
| feat（新功能） | 1 | 7.7% |
| refactor（重构） | 1 | 7.7% |
| 其他 | 2 | 15.4% |

#### 详细提交记录

1. **fa8fefc** - chore: 项目配置修改
2. **0aaef99** - chore: 更新package.json描述，添加仓库地址和图标
3. **5bd3de0** - chore: 更新依赖项版本，添加packageManager和author字段
4. **8eb36d5** - docs: 更新图片路径并移除许可证部分
5. **eae58a7** - chore: 更新依赖项，添加bumpp和相关工具链依赖
6. **7f74112** - chore: release v1.0.0
7. **e14c0cc** - docs: 完善README文档，添加详细功能说明和使用指南
8. **08d8862** - refactor: 优化控制面板显示逻辑和样式，移除未使用的计算属性
9. **4b15e2e** - chore: 添加ESLint配置并更新相关依赖
10. **8e14722** - chore: 更新版本号至0.2.0并移除过时配置说明
11. **636dd8a** - feat：添加按钮边缘吸附和位置保存
12. **33376bf** - 移除 page-marker-control 的 all: initial 属性
13. **4e00d6a** - 初始化项目：添加基础配置、依赖和文档

### 📝 其他指定提交者说明

根据Git提交历史分析，以下提交者在当前仓库中未发现直接的Git提交记录：

- **杜审言**：未发现Git提交记录
- **shenyandu**：未发现Git提交记录
- **dushenyan**：未发现Git提交记录（注：项目作者信息中包含此名称，但Git提交记录显示为Elegant）
- **十七**：未发现Git提交记录

**可能的原因**：
1. 这些提交者可能在其他分支或仓库中有贡献
2. 可能使用了不同的Git用户名进行提交
3. 可能通过其他方式（如Issue、PR审查等）参与项目

**建议查询命令**：
```bash
# 查询所有提交者的详细信息
git log --all --format='%an <%ae>' | sort -u

# 查询特定提交者的提交记录（替换NAME为提交者名称）
git log --all --author='NAME' --oneline

# 查询提交者别名
git log --all --format='%an' | sort | uniq -c
```

---

## Git提交历史查询命令

### 基础查询命令

#### 1. 查看所有提交历史

```bash
# 查看完整提交历史
git log --all --oneline --no-merges

# 查看详细提交信息（包含作者、日期等）
git log --all --no-merges --pretty=format:"%H|%an|%ae|%ad|%s" --date=iso

# 查看图形化提交历史
git log --all --graph --oneline --decorate
```

#### 2. 按提交者查询

```bash
# 查看所有提交者统计
git shortlog -sn --all --no-merges

# 查看特定提交者的提交记录
git log --all --author='Elegant' --oneline

# 查看特定邮箱的提交记录
git log --all --author='63347504+dushenyan@users.noreply.github.com' --oneline

# 查看提交者详细信息
git log --all --format='%an <%ae>' | sort -u
```

#### 3. 按时间查询

```bash
# 查看特定时间段的提交
git log --all --since='2025-12-01' --until='2025-12-31' --oneline

# 查看最近N天的提交
git log --all --since='7 days ago' --oneline

# 查看某天的提交
git log --all --since='2025-12-09' --until='2025-12-10' --oneline
```

#### 4. 按提交类型查询

```bash
# 查看所有功能提交
git log --all --grep='feat' --oneline

# 查看所有文档更新
git log --all --grep='docs' --oneline

# 查看所有重构提交
git log --all --grep='refactor' --oneline

# 查看所有工程化相关提交
git log --all --grep='chore' --oneline
```

### 高级查询命令

#### 1. 查看文件变更统计

```bash
# 查看每个提交的文件变更统计
git log --all --no-merges --numstat --pretty=format:"COMMIT:%H|%an|%s"

# 查看特定文件的修改历史
git log --all --follow -- <文件路径>

# 查看某次提交的详细变更
git show <提交哈希>
```

#### 2. 查看代码行数统计

```bash
# 统计每个提交者的代码行数
git log --all --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --all --author="$name" --pretty=tformat: --numstat | awk '{add+=$1; subs+=$2} END {print add," additions, ",subs," deletions"}'; done

# 查看项目总代码行数变化
git log --all --shortstat --no-merges
```

#### 3. 查看版本标签

```bash
# 查看所有标签
git tag -l

# 查看标签详细信息
git show v1.0.0

# 查看标签对应的提交
git rev-list -n 1 v1.0.0
```

#### 4. 对比查询

```bash
# 对比两个提交之间的差异
git diff <提交哈希1> <提交哈希2>

# 查看某次提交引入的变更
git diff <提交哈希>^ <提交哈希>

# 查看两个版本之间的提交
git log v1.0.0..HEAD --oneline
```

### 导出查询结果

#### 1. 导出提交历史到文件

```bash
# 导出完整提交历史到文本文件
git log --all --no-merges --pretty=format:"%H|%an|%ae|%ad|%s" --date=iso > commit-history.txt

# 导出提交统计到CSV文件
git log --all --no-merges --pretty=format:'"%H","%an","%ae","%ad","%s"' --date=iso > commits.csv
```

#### 2. 生成提交报告

```bash
# 生成简洁的提交报告
git shortlog -sn --all --no-merges > contributors.txt

# 生成详细的变更报告
git log --all --no-merges --stat > changes-report.txt
```

### 实用组合命令

#### 1. 查找特定功能的实现提交

```bash
# 查找添加了特定功能的提交
git log --all --grep='边缘吸附' --oneline

# 查找修改了特定功能的提交
git log --all -S 'snapToEdge' --oneline
```

#### 2. 查看项目演进历史

```bash
# 查看项目重要里程碑
git log --all --oneline --grep='release\|init\|feat'

# 查看文档演进
git log --all --oneline -- '*.md'
```

#### 3. 分析提交模式

```bash
# 查看每日提交统计
git log --all --date=short --pretty=format:'%ad' | sort | uniq -c

# 查看每小时提交分布
git log --all --date=format:'%H' --pretty=format:'%ad' | sort | uniq -c
```

---

## 附录

### 项目里程碑

- **2025-12-09**：项目初始化，完成基础架构搭建
- **2025-12-09**：添加核心功能（按钮拖拽、边缘吸附）
- **2025-12-09**：完善工程化配置（ESLint、TypeScript）
- **2025-12-09**：发布 v1.0.0 版本
- **2025-12-11**：完善项目元信息和文档

### 技术债务与改进方向

1. **测试覆盖**：当前项目缺少单元测试和E2E测试
2. **国际化**：暂不支持多语言
3. **性能优化**：可考虑使用 Web Worker 处理复杂计算
4. **可访问性**：可增强键盘导航和屏幕阅读器支持

### 联系方式

- **项目仓库**：https://github.com/dushenyan/page-marking
- **作者邮箱**：dushenyan88@gmail.com
- **问题反馈**：https://github.com/dushenyan/page-marking/issues

---

**文档生成时间**：2026-04-02  
**文档版本**：v1.0  
**最后更新**：基于Git提交历史分析生成

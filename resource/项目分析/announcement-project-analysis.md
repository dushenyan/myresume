# 海政通公告系统项目文档

## 项目概况

### hztxc-announcement-h5（移动端）

**项目名称**: hztxc-announcement-h5  
**版本**: 0.0.1  
**项目类型**: 移动端H5应用  
**主要功能**: 公告列表展示、搜索、详情查看、附件下载、水印显示、预览功能  
**技术栈**: Vue 2.6 + Vant UI + Vuex + Vue Router + axios  
**开发时间**: 2023年12月 - 2024年7月  
**提交次数**: 约80次  

### hztxc-announcement-web（管理后台）

**项目名称**: hztxc-announcement-web  
**版本**: 0.0.1  
**项目类型**: PC端管理后台系统  
**主要功能**: 公告管理、分类管理、用户管理、角色管理、权限管理、查阅统计  
**技术栈**: Vue 2.6 + Element UI + WangEditor + Vuex + Vue Router + axios  
**开发时间**: 2023年12月 - 2025年1月  
**提交次数**: 约150次  

## 项目亮点

### 技术亮点

1. **前后端分离架构**：采用Vue 2.6框架，实现前后端完全分离
2. **多端适配**：移动端使用Vant UI，PC端使用Element UI，实现多端统一体验
3. **富文本编辑**：集成WangEditor富文本编辑器，支持复杂内容编辑
4. **响应式设计**：移动端适配不同屏幕尺寸，PC端支持响应式布局
5. **性能优化**：图片压缩、懒加载、缓存策略等多种性能优化手段
6. **安全性**：统一认证、权限控制、数据加密等安全措施
7. **国际化支持**：内置多语言切换功能
8. **模块化开发**：组件化设计，代码复用率高

### 功能亮点

1. **智能搜索**：支持关键词搜索、分类筛选、时间范围查询
2. **附件管理**：支持多种文件类型上传、下载、预览
3. **水印功能**：管理端和用户端均支持水印显示，增强安全性
4. **多端预览**：支持PC端和移动端预览，确保内容显示效果一致
5. **未读标识**：公告未读状态标记，提升用户体验
6. **查阅统计**：详细的阅读统计数据，支持导出功能
7. **权限管理**：基于角色的权限控制，细粒度权限管理
8. **租户隔离**：支持多租户场景，数据隔离

## 已解决和优化的问题

### 移动端（hztxc-announcement-h5）

**已解决问题**：
- 公告详情英文/数字长文本换行问题
- 列表单选框边框兼容机型异常空白问题
- 搜索列表数据重复问题
- 搜索条件保留问题
- 未读红点显示问题
- 附件下载功能优化
- 页面缓存定位问题
- 海政通环境认证问题
- 统一域名项目缓存冲突问题

**优化项**：
- 首页搜索可点击全框调整
- 详情页loading效果
- 字体样式优化（宋体、仿宋字体支持）
- 标题加粗字重调整
- 下载按钮禁用操作
- 水印显示功能
- 预览页面功能

### 管理后台（hztxc-announcement-web）

**已解决问题**：
- 公告正文长文本换行问题
- 附件信息显示问题
- 分页无效问题
- 表单校验问题
- 权限缓存问题
- 信创环境SDK依赖问题
- 统一域名缓存冲突问题
- 未读人数统计问题
- 下载功能优化

**优化项**：
- 富文本编辑器功能增强（字体、图片上传）
- 查阅统计导出功能
- 水印显示用户名称
- 表单间距调整
- 列表标题显示优化
- 租户改造、持久缓存
- 文件类型icon显示
- 下载URL参数优化

## 主要贡献者

### 杜审言（dushenyan、杜 审言）

**移动端贡献**：
- 修复公告详情英文/数字长文本换行问题
- 修复列表单选框边框兼容问题
- 修复统一域名项目缓存冲突问题
- 配置火熊以及水熊生产环境
- 修复信创环境SDK依赖问题
- 优化标题加粗字重
- 处理部署异步脚本构建
- 替换项目源文件地址

**管理后台贡献**：
- 修复公告详情长文本换行问题
- 修复表单校验问题
- 修复权限缓存问题
- 优化富文本编辑器
- 处理文件下载功能
- 修复信创环境SDK依赖问题
- 配置生产环境
- 处理角色权限逻辑
- 修复只看未读不重置分页数据问题

**技术特点**：
- 擅长解决跨环境兼容性问题
- 注重用户体验细节优化
- 熟悉信创环境适配
- 善于处理复杂的权限逻辑

### 其他主要贡献者

**林和强**：
- 负责移动端和管理后台的静态页面开发
- 优化整体样式和用户界面
- 处理登录配置和路由调整
- 实现预览模式功能

**曹东泉**：
- 优化字体样式（宋体、仿宋）
- 处理角色管理页面问题
- 调整内嵌页面地址

**张太炜**：
- 优化文件下载功能
- 处理租户改造和持久缓存
- 优化企业承诺书功能
- 修复合同发布时间筛选问题

**李畅**：
- 处理UAA版本更新
- 合并代码到生产环境

**肖龙**：
- 更新UAA版本
- 合并代码分支

## Git命令参考

### 查看完整提交历史

```bash
# 移动端项目
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-h5
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 管理后台项目
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看指定提交者的提交历史

```bash
# 查看杜审言的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-h5
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="杜审言"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dushenyan"

cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="杜审言"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dushenyan"
```

### 查看特定时间段的提交

```bash
# 查看2024年1月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-h5
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2024-01-01" --until="2024-01-31"

cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2024-01-01" --until="2024-01-31"
```

### 查看特定功能的提交

```bash
# 查看与富文本编辑器相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
git log --grep="富文本" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与附件相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
git log --grep="附件" --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看提交统计信息

```bash
# 查看提交者统计
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-h5
git shortlog -sn

cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
git shortlog -sn

# 查看提交趋势
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-h5
git log --pretty=format:"%ad" --date=short | sort | uniq -c

cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
git log --pretty=format:"%ad" --date=short | sort | uniq -c
```

## 技术栈详情

### 移动端（hztxc-announcement-h5）

**核心依赖**：
- Vue 2.6.11
- Vant 2.10.13
- Vuex 3.1.2
- Vue Router 3.1.5
- axios 0.19.2
- dayjs 1.8.23
- vant 2.10.13
- vee-validate 3.2.5

**开发工具**：
- Vue CLI 4.2.0
- ESLint 6.7.2
- Babel
- Sass

### 管理后台（hztxc-announcement-web）

**核心依赖**：
- Vue 2.6.10
- Element UI 2.15.17
- WangEditor 4.7.8 / @wangeditor/editor 5.1.23
- Vuex 3.1.0
- Vue Router 3.0.2
- axios 0.18.1
- dayjs 1.8.36
- file-saver 2.0.1
- xlsx 0.14.1

**开发工具**：
- Vue CLI 4.0.4
- ESLint 6.7.2
- Babel
- Jest（单元测试）

## 项目结构

### 移动端（hztxc-announcement-h5）

```
src/
├── api/              # API接口定义
├── assets/           # 静态资源
├── components/       # 公共组件
├── config/           # 配置文件
├── locales/          # 国际化语言包
├── plugins/          # 插件配置
├── router/           # 路由配置
├── store/            # Vuex状态管理
├── utils/            # 工具函数
└── views/            # 页面组件
    ├── demo/         # 示例页面
    ├── detail/       # 详情页面
    ├── file-preview/ # 文件预览
    ├── home/         # 首页
    ├── main/         # 主页面
    ├── search/       # 搜索页面
    └── show-QR-page/ # 二维码展示
```

### 管理后台（hztxc-announcement-web）

```
src/
├── api/              # API接口定义
├── assets/           # 静态资源
├── components/       # 公共组件
├── config/           # 配置文件
├── directive/        # 自定义指令
├── filters/          # 过滤器
├── icons/            # 图标
├── lang/             # 国际化语言包
├── layout/           # 布局组件
├── router/           # 路由配置
├── store/            # Vuex状态管理
├── styles/           # 样式文件
├── utils/            # 工具函数
├── vendor/           # 第三方库
└── views/            # 页面组件
    ├── bulletin/     # 公告管理
    ├── org/          # 组织管理
    ├── role/         # 角色管理
    ├── sort-manager/ # 分类管理
    └── user/         # 用户管理
```

## 部署信息

### 环境配置

- **开发环境**：.env.development
- **测试环境**：.env.test
- **预发布环境**：.env.preview
- **生产环境**：.env.production

### 构建命令

```bash
# 移动端项目
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-h5
npm run build:prod      # 生产构建
npm run build:preview   # 预发布构建
npm run build:test      # 测试构建

# 管理后台项目
cd /Users/dushenyan/CodeFree/company-bussiness-project/hztxc-announcement-web
npm run build:prod      # 生产构建
npm run build:preview   # 预发布构建
npm run build:test      # 测试构建
```

## 总结

海政通公告系统是一个功能完善、技术先进的公告管理平台，包含移动端和管理后台两个部分。系统采用现代化的前端技术栈，实现了公告的发布、管理、查询、统计等全流程功能。

**主要优势**：
- 多端适配，用户体验一致
- 功能完善，满足各种公告管理需求
- 技术先进，采用现代前端技术栈
- 性能优化，用户体验流畅
- 安全可靠，权限控制严格

**未来发展**：
- 持续优化用户体验
- 增加更多个性化功能
- 提升系统性能和稳定性
- 支持更多终端设备
- 增强数据分析能力

系统已经在实际生产环境中稳定运行，为海政通平台的公告管理提供了有力支持。
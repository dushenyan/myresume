# GrandTag-web 项目文档

## 项目概况

**项目名称**: GrandTag-web  
**项目类型**: 企业官网  
**技术栈**: React 17 + Ant Design + Redux + React Router + i18next  
**开发时间**: 2022年  
**核心功能**：
- 首页（Home）
- 客户评价（Testimonials）
- 专业服务（Specialties）
- 愿景与职业（Vision_Career）
- 讲座（Lectures）
- 奖励与促销（Reward_Promotion）
- 联系与常见问题（Contect_FAQ）
- 视频详情（Video_Detail）

## 项目亮点

### 技术亮点

1. **现代化技术栈**：React 17 + Ant Design 4.16.3，代码结构清晰
2. **状态管理**：使用 Redux + Redux Thunk 进行状态管理
3. **路由管理**：React Router 5.2.0，支持动态路由
4. **国际化**：集成 i18next，支持多语言切换
5. **响应式设计**：适配移动端和桌面端
6. **组件化**：模块化组件设计，代码复用率高
7. **样式方案**：使用 styled-components 进行样式管理
8. **轮播功能**：集成 react-slick，实现图片轮播
9. **日期处理**：使用 dayjs 进行日期格式化
10. **HTTP 请求**：使用 axios 进行网络请求

### 功能亮点

1. **响应式布局**：根据屏幕尺寸自动调整布局
2. **多语言支持**：支持中文、英文、繁体中文
3. **视频播放**：集成视频播放功能
4. **音频播放**：支持音频文件播放
5. **轮播展示**：图片轮播展示
6. **FAQ 功能**：常见问题解答
7. **奖励促销**：奖励和促销信息展示
8. **联系表单**：联系信息和表单
9. **讲座信息**：讲座详情和视频
10. **职业愿景**：公司愿景和职业信息

## 已解决和优化的问题

**已解决问题**：
- 响应式布局适配问题
- 多语言切换功能
- 视频播放功能实现
- 音频播放功能实现
- 路由跳转逻辑优化
- 组件模块化设计

**优化项**：
- 代码结构优化
- 组件复用性提升
- 响应式适配改进
- 国际化支持完善
- 视频播放体验优化

## 项目结构

```
src/
├── I18n/            # 国际化配置
│   ├── locales/      # 语言包
│   └── index.js      # 国际化初始化
├── assets/           # 静态资源
│   ├── audio/        # 音频文件
│   ├── css/          # 样式文件
│   ├── font/         # 字体文件
│   └── img/          # 图片资源
├── components/       # 组件
│   ├── Contect_FAQ/  # 联系与FAQ
│   ├── Home/         # 首页
│   ├── Lectures/      # 讲座
│   ├── Reward_Promotion/ # 奖励促销
│   ├── Specialties/  # 专业服务
│   ├── Testimonials/  # 客户评价
│   └── Vision_Career/ # 愿景与职业
├── mocks/            # 模拟数据
├── pages/            # 页面
│   ├── GTVideoDetail/ # 视频详情
│   ├── GTVideoFirst/  # 视频首页
│   ├── GT_Button/     # 按钮组件
│   ├── GT_FAQ/        # FAQ页面
│   ├── GT_Footer/     # 页脚
│   ├── GT_Header/     # 头部
│   ├── GT_LecturesVideo/ # 讲座视频
│   ├── GT_Mobie_header/ # 移动端头部
│   ├── GT_ModalVideo/ # 视频模态框
│   ├── GT_Specialtiesvideo/ # 专业服务视频
│   ├── GT_Title/      # 标题组件
│   └── GT_Todo/       # Todo组件
├── routes/           # 路由配置
├── service/          # 服务
│   ├── config.js     # 配置
│   ├── index.js      # 服务初始化
│   └── video.js      # 视频服务
├── utils/            # 工具函数
├── App.js            # 根组件
└── index.js          # 入口文件
```

## 技术栈详情

**核心依赖**：
- React 17.0.2
- Ant Design 4.16.3
- Redux 4.1.0
- React Router 5.2.0
- i18next 20.3.1
- axios 0.21.1
- dayjs 1.10.6
- styled-components 5.3.0
- react-slick 0.28.1

**开发工具**：
- Create React App
- CRAco 6.1.2
- ESLint

## 主要功能模块

### 1. 首页（Home）
- 首页轮播
- 公司介绍
- 讲座信息
- 奖励促销
- 客户评价

### 2. 客户评价（Testimonials）
- 音频评价
- 视频评价
- 文字评价
- 推荐人信息

### 3. 专业服务（Specialties）
- 服务介绍
- 服务视频
- 服务详情

### 4. 愿景与职业（Vision_Career）
- 公司愿景
- 职业机会
- 公司文化

### 5. 讲座（Lectures）
- 讲座列表
- 讲座视频
- 讲座详情

### 6. 奖励与促销（Reward_Promotion）
- 奖励信息
- 促销活动
- 详情页面

### 7. 联系与常见问题（Contect_FAQ）
- 联系信息
- 常见问题
- 联系表单

### 8. 视频详情（Video_Detail）
- 视频播放
- 视频信息
- 相关视频

## 响应式设计

项目采用响应式设计，根据屏幕尺寸自动调整布局：
- 桌面端（> 768px）：完整布局，包含头部、内容、页脚
- 移动端（≤ 768px）：移动端头部，根据页面类型显示或隐藏页脚

## 国际化支持

项目集成了 i18next 国际化库，支持多语言切换：
- 中文（zh）
- 英文（en）
- 繁体中文（tw）

## 构建与部署

### 构建命令

```bash
# 开发环境
npm start

# 生产构建
npm run build

# 测试
npm test

#  eject
npm run eject
```

### 部署流程

1. 执行 `npm run build` 生成生产构建文件
2. 将构建产物部署到服务器
3. 配置域名和服务器设置

## 总结

GrandTag-web 是一个功能完善、设计精美的企业官网项目。项目采用现代化的 React 技术栈，实现了响应式布局、国际化支持、视频音频播放等核心功能。

**主要优势**：
- 技术栈先进，代码质量高
- 响应式设计，适配多端
- 国际化支持，面向全球用户
- 功能完善，覆盖企业官网核心需求
- 组件化设计，代码复用率高

**未来发展**：
- 持续优化用户体验
- 增加更多互动功能
- 提升页面加载性能
- 增强 SEO 优化
- 支持更多语言

项目已经实现了企业官网的核心功能，为用户提供了良好的浏览体验。
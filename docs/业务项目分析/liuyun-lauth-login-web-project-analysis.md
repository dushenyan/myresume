# 流云统一认证登录系统项目文档

## 项目概况

**项目名称**: liuyun-lauth-login-web  
**项目类型**: 统一认证登录系统  
**技术栈**: Vue 3.2 + Element Plus + axios + jsencrypt + dingtalk-jsapi  
**开发时间**: 2024年6月 - 2025年10月  
**提交次数**: 约60次  

**核心功能**：
- 统一登录认证
- 钉钉免密登录
- 密码 RSA 加密
- 多租户支持
- 验证码功能
- 响应式登录页面
- 错误处理和用户反馈

## 项目亮点

### 技术亮点

1. **现代化技术栈**：Vue 3.2 + Element Plus，代码结构清晰
2. **安全性**：密码 RSA 加密，保护用户密码安全
3. **多平台支持**：集成钉钉 JSAPI，支持钉钉内免密登录
4. **多租户架构**：支持多租户场景，实现租户隔离
5. **响应式设计**：登录页面适配不同设备尺寸
6. **用户体验**：验证码功能、密码可见性切换、错误提示
7. **构建优化**：多环境构建配置（开发、测试）
8. **代码质量**：ESLint 代码规范

### 功能亮点

1. **统一认证**：作为企业统一登录入口，支持多系统集成
2. **钉钉免密**：在钉钉应用内实现免密登录，提升用户体验
3. **密码加密**：使用 RSA 加密算法对密码进行加密传输
4. **多租户支持**：通过租户 ID 实现多租户隔离
5. **验证码**：防止暴力破解，提高安全性
6. **错误处理**：完善的错误提示和异常处理
7. **Loading 状态**：钉钉登录过程中显示加载状态
8. **响应式布局**：适配不同屏幕尺寸

## 已解决和优化的问题

**已解决问题**：
- 页面 title 修改问题
- 验证码显示不清楚问题
- 钉钉登录 Loading 报错问题
- 多租户实现问题
- 密码加密逻辑问题
- 路由参数处理问题
- 表单样式定位问题

**优化项**：
- 登录页面样式优化
- 代码结构优化
- RSA 公钥格式化，提高可读性
- 移除多余的 RSA 公钥变量声明
- 统一登录布局优化
- 表单回车登录支持
- 测试开发本地重定向链接效正

## 主要贡献者

### 杜审言（dushenyan）

**主要贡献**：
- 登录页面设计调整和样式优化
- 表单输入框样式定位调整
- 验证码功能实现（开启表单查看密码、提交失败重新请求验证码）
- 统一认证路由携带参数处理
- 构建配置调整
- 表单回车登录支持
- 测试开发本地重定向链接效正
- RSA 公钥格式化和优化
- 移除多余的 RSA 公钥变量声明

**技术特点**：
- 擅长前端页面设计和用户体验优化
- 注重代码质量和安全性
- 熟悉 Vue 3 和 Element Plus
- 善于解决路由和参数传递问题

### Elegant

**主要贡献**：
- 项目初始化
- 添加 .nvmrc 文件
- 更新依赖包
- 优化登录页面样式及代码结构

**技术特点**：
- 擅长项目初始化和配置
- 注重代码结构和样式优化
- 熟悉依赖管理和版本控制

### 曹东泉

**主要贡献**：
- 多租户概念实现
- 登录密码加密功能
- 钉钉应用内调试
- 动态更改请求头 appKey 值
- 启动异常修复
- 钉钉免密登录相关处理

**技术特点**：
- 擅长后端逻辑和认证机制
- 熟悉多租户架构设计
- 了解钉钉集成和企业应用开发

### 盛子恒

**主要贡献**：
- 钉钉免密登录程序实现
- 执行钉钉免密登录时添加 loading
- 登录逻辑完善
- 测试和调试

**技术特点**：
- 擅长钉钉集成开发
- 注重用户体验细节
- 善于解决实际问题

## Git命令参考

### 查看完整提交历史

```bash
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看指定提交者的提交历史

```bash
# 查看杜审言的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="杜审言"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="dushenyan"

# 查看 Elegant 的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="Elegant"

# 查看其他提交者的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="shenyandu"
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --author="十七"
```

### 查看特定时间段的提交

```bash
# 查看2025年1月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2025-01-01" --until="2025-01-31"

# 查看2024年11月的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --pretty=format:"%h|%an|%ad|%s" --date=short --all --since="2024-11-01" --until="2024-11-30"
```

### 查看特定功能的提交

```bash
# 查看与钉钉登录相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --grep="钉钉" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与密码加密相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --grep="加密" --pretty=format:"%h|%an|%ad|%s" --date=short --all

# 查看与多租户相关的提交
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --grep="租户" --pretty=format:"%h|%an|%ad|%s" --date=short --all
```

### 查看提交统计信息

```bash
# 查看提交者统计
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git shortlog -sn

# 查看提交趋势
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --pretty=format:"%ad" --date=short | sort | uniq -c

# 查看代码提交量
cd /Users/dushenyan/CodeFree/company-bussiness-project/liuyun-lauth-login-web
git log --numstat --pretty="%h" | awk '{add += $1; subs += $2; loc += $1 - $2} END {printf "Added lines: %s, Removed lines: %s, Total lines: %s\n", add, subs, loc}'
```

## 技术栈详情

**核心依赖**：
- Vue 3.2.13
- Element Plus 2.7.6
- axios 0.18.1
- jsencrypt 3.3.2（RSA 加密）
- dingtalk-jsapi 3.0.36（钉钉集成）
- vconsole 3.15.1（调试工具）

**开发工具**：
- Vue CLI 5.0.0
- ESLint 7.32.0
- SASS 1.77.7
- Vue Router 4.4.0

**构建配置**：
- 开发环境构建
- 测试环境构建

## 项目结构

```
src/
├── api/              # API 接口定义
├── assets/           # 静态资源
├── components/       # 公共组件
├── config/           # 配置文件
├── router/           # 路由配置
├── styles/           # 样式文件
├── utils/            # 工具函数
│   ├── request.js    # 请求封装
│   ├── rsa.js        # RSA 加密
│   └── store.js      # 状态管理
├── views/            # 页面组件
│   └── login/        # 登录页面
├── App.vue           # 根组件
└── main.js           # 入口文件
```

## 部署信息

### 构建命令

```bash
# 开发环境
npm run serve

# 生产构建（开发环境配置）
npm run build

# 测试环境构建
npm run build:test

# 代码检查
npm run lint
```

### 环境配置

- **开发环境**：.env.development
- **测试环境**：.env.test

## 总结

流云统一认证登录系统是一个功能完善、安全可靠的企业级登录认证平台。系统基于 Vue 3 + Element Plus 技术栈开发，支持统一登录认证、钉钉免密登录、密码加密、多租户等核心功能。

**主要优势**：
- 安全性高：密码 RSA 加密，保护用户密码安全
- 用户体验好：响应式设计，支持钉钉免密登录
- 功能完善：多租户支持，验证码功能，错误处理
- 技术先进：使用现代化前端技术栈
- 易于集成：作为统一认证入口，支持多系统集成

**未来发展**：
- 支持更多第三方登录方式
- 增加登录日志和安全审计
- 优化性能和用户体验
- 支持更多设备和平台
- 增强安全防护能力

系统已经在实际生产环境中稳定运行，为企业提供了安全、便捷的统一登录认证服务。
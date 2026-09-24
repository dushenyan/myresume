---
matchName: MCP 工具服务器集合
title: MCP 工具服务器集合
stack: Python 3.9+ | FastAPI | SQLite | Docker
---

## 预测押题

- MCP 的三大原语 tools/resources/prompts 分别是什么？你的 Server 怎么实现的？
  tools 是模型可调用的函数（带 schema 与副作用），resources 是可读取的上下文数据（URI 寻址、只读），prompts 是预置模板（用户主动触发）。三个 Server 都按能力声明注册对应 handler：如文件 Server 的 read_file 是 tool、文档目录是 resource。
- MCP 协议握手机制是怎样的（initialize/能力协商）？为什么需要能力声明？
  客户端发 initialize 带协议版本+自身能力，服务端回自己的版本与能力（tools/resources/prompts 开关），客户端确认后发 initialized 通知。声明机制让双方只实现交集，可选原语不强制，新旧版本兼容。
- 你的 MCP Server 鉴权是怎么设计的？为什么分传输层和下游两层？
  传输层验客户端持有的网关 Token（谁能连），下游层用服务账号访问真实数据源（能干什么）。分层理由：客户端不该也不允许拿到数据库凭证，权限在 Server 内收敛映射，泄露面与审计边界清晰。
- 路径白名单和 SQL 守卫分别防什么攻击？怎么实现？
  防提示词注入驱动的工具滥用：文件 Server 把所有路径 resolve 后限定在配置的根目录内（防 ../ 穿越）；SQLite Server 只读模式 + 语句解析拦截非 SELECT/多语句/DML，拒绝即返回结构化错误。都是白名单思路，不靠黑名单枚举危险模式。
- MCP Server 出问题时你怎么调试？你的错误码体系怎么支撑定位？
  每个 Server 输出结构化日志（请求 id、方法、耗时、错误码），错误码分协议层（无效请求/方法不存在）与业务层（路径越权/SQL 拒绝/连接失败），客户端报障带码即可定位到具体防线与环节，配合 verbose 回放 JSON-RPC 报文。
- tools/call 的 isError 和顶层 error 有什么区别？为什么这样设计？
  顶层 error 是协议层失败（请求本身无效，模型无需理解）；isError 是工具执行完成但业务失败（参数合法但文件不存在），结果内容仍返回给模型供其自我修正。区分后模型只对业务错误做反应，不被协议噪声干扰。
- 为什么用 HTTP JSON-RPC 而不是 stdio 传输？对接 Claude Desktop 怎么改？
  HTTP 适合多客户端共享、跨机器部署与网关鉴权；stdio 是本地单客户端子进程模式。接 Claude Desktop 只需配置里把传输换成 command 启动 stdio 适配器：协议核心与传输层解耦，换的是帧读写实现不是业务逻辑。
- 自研协议核心 vs 官方 mcp SDK，取舍是什么？
  取舍点：可控性（错误码、日志、超时自定义）与学习深度 vs 开发速度与生态跟进。项目目标是吃透协议且只需核心子集，自研成本可接受；生产项目会选官方 SDK 降低维护风险，两种选择都讲得出理由。
- 新增一个 MCP Server（如日历/邮件）要改哪些地方？
  协议核心零改动：复用 JSON-RPC 框架、鉴权中间件、错误码体系，新 Server 只写工具 schema + handler + 下游凭证配置，参加能力声明。集合层只加部署配置——框架化程度决定了扩展成本。
- 这套 Server 集合如何做权限细分（不同客户端可用工具不同）？
  Token 绑定角色/作用域，tools/list 按作用域过滤后下发（看不到的工具不可调），tools/call 再校验一道——列表过滤是体验，调用校验是安全，两道都要有，不能只靠前者。

## 项目亮点挖掘

1. **三原语完整实现**
   tools/resources/prompts 每个 Server 全注册，协议版本 2024-11-05。
2. **自研轻量 MCP 协议核心**
   JSON-RPC 分发 + 能力协商 + 分层错误码，响应层永不抛异常。
3. **四道安全防线**
   路径白名单、只读模式、SQL 守卫、Token 鉴权，Demo 9 组断言全通过。
4. **企业网关凭证隔离**
   下游 service-token 网关代持注入，客户端永不接触内部凭证。
5. **错误码分层定位**
   -320xx 业务安全/-326xx 协议/-32603 内部，快速定位问题层。
6. **Docker 一键部署**
   Dockerfile 已提供，环境变量注入 token/白名单/只读开关。

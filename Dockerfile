# syntax=docker/dockerfile:1
# ============================================================================
# myresume 简历服务 Docker 构建
#
# 生产镜像（默认 target）：多阶段构建，nginx 托管 dist/ 静态产物（HTML + PDF）
#   docker build -t myresume .
#   docker run -d -p 8080:80 myresume
#
# dev 镜像（--target dev）：跑项目自带的开发服务器（押题面板 / 诊断报告 / 演示站反代）
#   docker build -t myresume-dev --target dev .
#   docker run -d -p 8888:8888 -e FRAME_BASE=http://134.175.23.212:8581 myresume-dev
# ============================================================================

# ----------------------------------------------------------------------------
# 阶段一：builder —— 安装依赖并执行完整构建（HTML + PDF）
# ----------------------------------------------------------------------------
FROM node:22-bookworm-slim AS builder

# Chromium 用于 puppeteer 生成 PDF；fonts-noto-cjk 保证中文在 PDF 中正常渲染
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
  && rm -rf /var/lib/apt/lists/*

# 让 pdf.ts 通过 CHROME_BIN 找到系统 Chromium（并跳过 puppeteer 自带的 Chrome 下载）
ENV CHROME_BIN=/usr/bin/chromium \
  PUPPETEER_SKIP_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
  COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  PORT=8888

WORKDIR /app

# pnpm store 放到镜像内固定路径，避免退出时被清掉导致后续步骤重装
ENV PNPM_HOME=/pnpm \
  XDG_DATA_HOME=/app/.local-share
RUN corepack enable

# 先只复制锁文件，最大化依赖层缓存
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# 复制源码与静态资源（docs 供押题面板读取，dist 会被构建覆盖）
COPY . .

# grunt build = clean → less 生产样式 → 生成简历 JSON → tsc 校验 → HTML + PDF
RUN pnpm run build

# ----------------------------------------------------------------------------
# 阶段二：dev —— 保留完整工具链的开发服务器镜像
# ----------------------------------------------------------------------------
FROM builder AS dev

EXPOSE 8888

# serve.ts 默认监听 8888，可用 PORT 覆盖；FRAME_BASE 配置 @frame 演示站反代目标
CMD ["pnpm", "run", "dev"]

# ----------------------------------------------------------------------------
# 阶段三：nginx —— 生产静态托管镜像（默认）
# ----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS nginx

# 容器内渲染不需要字体，此处仅保留声明方便排查；产物 PDF 已在 builder 渲染完成
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO /dev/null http://127.0.0.1/ || exit 1

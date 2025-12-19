# 简历生成项目 Makefile

# Node.js 命令
NODE := node
NPM := npm
PNPM := pnpm
GRUNT := npx grunt

# 源文件和目标文件目录
SRC_DIR := ./src
RESUME_DIR := resume
DIST_DIR := dist
ASSETS_DIR := assets
RESUME_FILE := $(RESUME_DIR)/resume.json
HBS_FILE := $(RESUME_DIR)/resume.hbs

# 默认目标
.DEFAULT_GOAL := help

# 项目版本（从 package.json 读取）
VERSION := $(shell node -p "require('./package.json').version")

# 颜色定义
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# 帮助信息
.PHONY: help
help:
	@echo "$(BLUE)简历生成项目命令说明：$(NC)"
	@echo ""
	@echo "$(GREEN)基础命令:$(NC)"
	@echo "  make install       - 安装依赖（自动选择 npm/pnpm）"
	@echo "  make clean         - 清理构建产物"
	@echo "  make help          - 显示此帮助信息"
	@echo "  make version       - 显示当前项目版本"
	@echo "  make info          - 显示项目信息"
	@echo "  make check-files   - 检查必要的文件是否存在"
	@echo "  make ci            - 完整的CI/CD流程"
	@echo ""
	@echo "$(GREEN)开发命令:$(NC)"
	@echo "  make dev           - 启动开发服务器（实时预览）"
	@echo "  make serve         - 启动开发服务器的别名"
	@echo "  make watch         - 监听文件变化并自动编译"
	@echo ""
	@echo "$(GREEN)构建命令:$(NC)"
	@echo "  make build         - 完整构建（生成HTML和PDF）"
	@echo "  make build-quick   - 快速构建（仅生成HTML）"
	@echo "  make build-pdf     - 构建并生成PDF文件"
	@echo "  make build-release - 发布构建（生成压缩包）"
	@echo "  make compile       - 编译LESS文件"
	@echo ""
	@echo "$(GREEN)质量检查:$(NC)"
	@echo "  make lint          - 代码检查"
	@echo "  make lint-fix      - 自动修复代码问题"
	@echo "  make typecheck     - TypeScript类型检查"
	@echo "  make test          - 测试构建流程"
	@echo ""
	@echo "$(GREEN)预览和部署:$(NC)"
	@echo "  make preview       - 构建并在浏览器中预览"
	@echo "  make deploy        - 准备部署文件"
	@echo "  make package       - 创建发布包"

# 安装依赖
.PHONY: install
install:
	@echo "$(YELLOW)正在安装依赖...$(NC)"
	@if command -v $(PNPM) &> /dev/null; then \
		echo "$(GREEN)使用 pnpm 安装$(NC)"; \
		$(PNPM) install; \
	else \
		echo "$(GREEN)使用 npm 安装$(NC)"; \
		$(NPM) install; \
	fi
	@echo "$(GREEN)依赖安装完成！$(NC)"

# 清理构建产物
.PHONY: clean
clean:
	@echo "$(YELLOW)清理构建产物...$(NC)"
	@rm -rf $(DIST_DIR)
	@$(GRUNT) clean
	@echo "$(GREEN)清理完成！$(NC)"

# 开发服务器
.PHONY: dev serve watch
dev:
	@echo "$(BLUE)启动开发服务器...$(NC)"
	@$(GRUNT) serve

serve: dev

watch:
	@echo "$(BLUE)启动文件监听...$(NC)"
	@$(GRUNT) watch

# 构建命令
.PHONY: build build-quick build-pdf build-release compile
build:
	@echo "$(BLUE)开始完整构建...$(NC)"
	@$(GRUNT) build
	@echo "$(GREEN)构建完成！文件位于 dist/ 目录$(NC)"

build-quick:
	@echo "$(BLUE)快速构建（仅HTML）...$(NC)"
	@$(GRUNT) build:quick
	@echo "$(GREEN)快速构建完成！$(NC)"

build-pdf:
	@echo "$(BLUE)构建并生成PDF...$(NC)"
	@$(GRUNT) build:pdf
	@echo "$(GREEN)PDF构建完成！$(NC)"

build-release:
	@echo "$(BLUE)发布构建...$(NC)"
	@$(GRUNT) build:release
	@echo "$(GREEN)发布构建完成！压缩包位于 dist/$(NC)"

compile:
	@echo "$(BLUE)编译LESS文件...$(NC)"
	@$(GRUNT) less:development
	@echo "$(GREEN)LESS编译完成！$(NC)"

# 代码质量检查
.PHONY: lint lint-fix typecheck test
lint:
	@echo "$(BLUE)运行代码检查...$(NC)"
	@$(GRUNT) lint

lint-fix:
	@echo "$(BLUE)自动修复代码问题...$(NC)"
	@$(GRUNT) lint:fix

typecheck:
	@echo "$(BLUE)TypeScript类型检查...$(NC)"
	@npx tsc --noEmit

test:
	@echo "$(BLUE)测试构建流程...$(NC)"
	@$(NPM) run test:build
	@echo "$(GREEN)测试通过！$(NC)"

# 预览和部署
.PHONY: preview deploy package
preview:
	@echo "$(BLUE)构建并预览...$(NC)"
	@$(NPM) run preview
	@echo "$(GREEN)预览已在浏览器中打开$(NC)"

deploy:
	@echo "$(BLUE)准备部署文件...$(NC)"
	@$(NPM) run deploy
	@echo "$(GREEN)部署文件已准备就绪！$(NC)"

package: build-release

# 版本信息
.PHONY: version
version:
	@echo "当前项目版本: $(VERSION)"

# 项目信息
.PHONY: info
info:
	@echo "$(BLUE)项目信息:$(NC)"
	@echo "  名称: $(shell node -p "require('./package.json').name")"
	@echo "  版本: $(VERSION)"
	@echo "  描述: $(shell node -p "require('./package.json').description")"
	@echo "  Node.js: $(shell node --version)"
	@echo "  npm: $(shell npm --version 2>/dev/null || echo '未安装')"

# 检查必要的文件是否存在
.PHONY: check-files
check-files:
	@if [ ! -f $(RESUME_FILE) ]; then \
		echo "$(RED)错误：找不到简历数据文件 $(RESUME_FILE)$(NC)"; \
		exit 1; \
	fi
	@if [ ! -f $(HBS_FILE) ]; then \
		echo "$(RED)错误：找不到简历模板文件 $(HBS_FILE)$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)必要文件检查通过$(NC)"

# 完整的CI/CD流程
.PHONY: ci
ci: install lint typecheck build
	@echo "$(GREEN)CI/CD流程完成！$(NC)"

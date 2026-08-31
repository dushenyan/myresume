# ============================================================================
# MyResume - 简历生成项目
# ============================================================================

NPM := npm
PNPM := pnpm
GRUNT := npx grunt
DIST_DIR := dist

.DEFAULT_GOAL := help
VERSION := $(shell node -p "require('./package.json').version")

# 颜色
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
NC := \033[0m

NOW_CMD :=dev


.PHONY: help install dev build lint clean deploy ci version

## 显示命令帮助
help:
	@echo "$(BLUE)简历生成项目命令说明：$(NC)"
	@echo ""
	@echo "$(GREEN)开发:$(NC)"
	@echo "  make dev       启动开发服务器（实时预览）"
	@echo ""
	@echo "$(GREEN)构建与部署:$(NC)"
	@echo "  make build     完整构建（HTML + PDF）"
	@echo "  make deploy    准备部署文件"
	@echo ""
	@echo "$(GREEN)质量与工具:$(NC)"
	@echo "  make lint      代码检查"
	@echo "  make clean     清理构建产物"
	@echo "  make ci        完整 CI/CD 流程"
	@echo ""
	@echo "$(GREEN)信息:$(NC)"
	@echo "  make version   显示项目版本"

## 安装依赖
install:
	@if command -v $(PNPM) &> /dev/null; then \
		echo "$(GREEN)使用 pnpm 安装$(NC)"; \
		$(PNPM) install; \
	else \
		echo "$(GREEN)使用 npm 安装$(NC)"; \
		$(NPM) install; \
	fi

## 启动开发服务器
dev:
	@echo "$(BLUE)启动开发服务器...$(NC)"
	@$(GRUNT) serve

## 完整构建（HTML + PDF）
build:
	@echo "$(BLUE)开始构建...$(NC)"
	@$(GRUNT) build
	@echo "$(GREEN)构建完成！文件位于 dist/ 目录$(NC)"

## 准备部署文件
deploy:
	@echo "$(BLUE)准备部署文件...$(NC)"
	@$(NPM) run deploy
	@echo "$(GREEN)部署文件已准备就绪！$(NC)"

## 代码检查
lint:
	@echo "$(BLUE)运行代码检查...$(NC)"
	@$(GRUNT) lint

## 清理构建产物
clean:
	@echo "$(YELLOW)清理构建产物...$(NC)"
	@rm -rf $(DIST_DIR)
	@$(GRUNT) clean
	@echo "$(GREEN)清理完成！$(NC)"

## 完整 CI/CD 流程
ci: install lint build
	@echo "$(GREEN)CI/CD 流程完成！$(NC)"

## 显示项目版本
version:
	@echo "当前项目版本: $(VERSION)"
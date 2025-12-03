# 简历生成项目 Makefile

# Node.js 命令
NODE := node
NPM := npm
PNPM := pnpm

# 源文件和目标文件目录
SRC_DIR := ./src
RESUME_DIR := resume
DIST_DIR := dist
RESUME_FILE := $(RESUME_DIR)/resume.json
HBS_FILE := $(RESUME_DIR)/resume.hbs

# 默认目标
.DEFAULT_GOAL := help

# 帮助信息
.PHONY: help
help:
	@echo "简历生成项目命令说明："
	@echo "  make install     - 安装依赖（使用pnpm）"
	@echo "  make clean       - 清理构建产物"

# 安装依赖
.PHONY: install
install:
	@echo "正在安装依赖..."
	@if command -v $(PNPM) &> /dev/null; then \
		$(PNPM) install; \
	else \
		$(NPM) install; \
	fi

# 清理构建产物
.PHONY: clean
clean:
	@echo "清理构建产物..."
	@rm -rf $(DIST_DIR)
	@echo "清理完成！"

# 检查文件是否存在
$(RESUME_FILE):
	@echo "错误：找不到简历数据文件 $@"
	@exit 1

$(HBS_FILE):
	@echo "错误：找不到简历模板文件 $@"
	@exit 1

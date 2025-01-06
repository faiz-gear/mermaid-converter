# Mermaid Converter

[English](#english) | [中文](#中文)

# 中文

基于 Next.js 和 LangChain 的需求文档转 Mermaid 图表工具。

## 功能特点

- 📝 支持多种文档格式（.txt, .doc, .docx, .pdf, .md）
- 🔄 自动转换为 Mermaid Graph TD 格式
- 👀 实时预览生成的流程图
- 📊 结构化输出（标题、描述、节点、关系）
- 💾 支持导出 Mermaid 文件
- 🎨 清晰的节点和关系展示

## 技术栈

- Next.js 15
- LangChain.js
- Mermaid
- Tailwind CSS
- TypeScript

## 快速开始

1. 克隆项目

```bash
git clone https://github.com/yourusername/mermaid-converter.git
cd mermaid-converter
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local 添加必要的配置
```

4. 启动开发服务器

```bash
npm run dev
```

## 代码提交

使用规范化的提交信息：

```bash
npm run commit
```

## 开发路线图

### 1.0 版本

- [x] 基础文档转换功能
- [x] Mermaid 图表预览
- [x] 导出功能
- [x] 错误处理
- [x] 类型安全

### 2.0 版本（进行中）

- [ ] UI 优化

  - [ ] 集成 shadcn/ui 组件库
  - [ ] 优化布局和交互体验
  - [ ] 添加深色模式支持
  - [ ] 响应式设计优化

- [ ] 提示词优化

  - [ ] 优化文档解析准确度
  - [ ] 支持更复杂的流程图生成
  - [ ] 添加更多图表类型支持
  - [ ] 自定义提示词模板

- [ ] 项目管理集成
  - [ ] 支持项目维度的需求管理
  - [ ] 需求版本控制
  - [ ] 需求关联关系
  - [ ] 导出完整项目文档

---

# English

A tool for converting requirement documents to Mermaid diagrams, built with Next.js and LangChain.

## Features

- 📝 Multiple document formats support (.txt, .doc, .docx, .pdf, .md)
- 🔄 Automatic conversion to Mermaid Graph TD format
- 👀 Real-time diagram preview
- 📊 Structured output (title, description, nodes, relationships)
- 💾 Mermaid file export
- 🎨 Clear node and relationship visualization

## Tech Stack

- Next.js 15
- LangChain.js
- Mermaid
- Tailwind CSS
- TypeScript

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/yourusername/mermaid-converter.git
cd mermaid-converter
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

```bash
cp .env.example .env.local
# Edit .env.local with necessary configurations
```

4. Start development server

```bash
npm run dev
```

## Commit Code

Use standardized commit messages:

```bash
npm run commit
```

## Roadmap

### Version 1.0

- [x] Basic document conversion
- [x] Mermaid diagram preview
- [x] Export functionality
- [x] Error handling
- [x] Type safety

### Version 2.0 (In Progress)

- [ ] UI Improvements

  - [ ] Integration of shadcn/ui components
  - [ ] Layout and interaction optimization
  - [ ] Dark mode support
  - [ ] Responsive design enhancement

- [ ] Prompt Optimization

  - [ ] Improve document parsing accuracy
  - [ ] Support for more complex flowcharts
  - [ ] Additional diagram type support
  - [ ] Custom prompt templates

- [ ] Project Management Integration
  - [ ] Project-level requirement management
  - [ ] Requirement version control
  - [ ] Requirement relationship mapping
  - [ ] Complete project documentation export

## License

[MIT](LICENSE)

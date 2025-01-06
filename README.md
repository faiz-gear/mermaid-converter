# Mermaid Converter

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

## 本地开发

1. 克隆项目

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

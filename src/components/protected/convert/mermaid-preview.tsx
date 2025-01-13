"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { ConversionOutput } from "@/lib/mermaid-converter";

interface MermaidPreviewProps {
  data: ConversionOutput;
}

export default function MermaidPreview({ data }: MermaidPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAndRender = async () => {
      try {
        // 重置容器内容
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        // 初始化配置
        await mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          flowchart: {
            htmlLabels: true,
            curve: "linear",
          },
        });

        if (containerRef.current && data.mermaidCode) {
          // 确保代码格式正确
          const code = `graph TD\n${data.mermaidCode.replace(/^graph TD\s*/i, "")}`;
          console.log("Rendering mermaid code:", code); // 调试用

          // 创建新的渲染容器
          const tempId = `mermaid-${Date.now()}`;
          containerRef.current.innerHTML = `<div id="${tempId}"></div>`;

          const { svg } = await mermaid.render(tempId, code);
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="text-red-500 p-4">
              图表渲染失败: ${error instanceof Error ? error.message : "未知错误"}
            </div>
          `;
        }
      }
    };

    initAndRender();
  }, [data.mermaidCode]);

  return (
    <div className="space-y-4">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-gray-600">{data.description}</p>
      </div>
      <div className="border rounded-lg p-4">
        <div ref={containerRef} className="overflow-auto" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">节点信息</h3>
          <ul className="space-y-2">
            {data?.nodes?.map((node) => (
              <li key={node.id} className="text-sm">
                <span className="font-medium">{node.label}</span>
                {node.description && (
                  <p className="text-gray-500 ml-2">{node.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">连接关系</h3>
          <ul className="space-y-2">
            {data?.edges?.map((edge, index) => (
              <li key={index} className="text-sm">
                {edge.from} → {edge.to}
                {edge.label && (
                  <span className="text-gray-500 ml-2">({edge.label})</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

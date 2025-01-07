"use client";

import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ConversionOutput } from "@/lib/mermaid-converter";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileConverted: (code: ConversionOutput) => void;
}

export default function FileUpload({ onFileConverted }: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback(
    async (file: File) => {
      if (!file) return;

      // 验证文件类型
      const allowedTypes = [".txt", ".doc", ".docx", ".pdf", ".md"];
      const fileExtension = file.name
        .toLowerCase()
        .substring(file.name.lastIndexOf("."));
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          variant: "destructive",
          title: "不支持的文件类型",
          description: "请上传 txt, doc, docx, pdf 或 md 格式的文件",
        });
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "转换失败");
        }

        onFileConverted(data);
        toast({
          title: "转换成功",
          description: "文档已成功转换为 Mermaid 图表",
        });
      } catch (error) {
        console.error("转换失败:", error);
        toast({
          variant: "destructive",
          title: "转换失败",
          description: error instanceof Error ? error.message : "未知错误",
        });
      } finally {
        setLoading(false);
      }
    },
    [onFileConverted],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // 重置 input 值，允许选择相同文件
    e.target.value = "";
  };

  // 处理点击上传按钮
  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-colors",
            isDragging && "border-primary bg-muted/50",
            !isDragging && "border-muted-foreground/25",
          )}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <Button
                disabled={loading}
                variant="ghost"
                size="sm"
                onClick={handleUploadClick}
                className="relative"
              >
                <span className="text-primary">点击上传</span>
                <span className="text-muted-foreground"> 或拖拽文件到此处</span>
              </Button>
              <p className="text-sm text-muted-foreground">
                支持 .txt, .doc, .docx, .pdf, .md 格式
              </p>
            </div>
          </div>
          <input
            id="fileInput"
            type="file"
            accept=".txt,.doc,.docx,.pdf,.md"
            onChange={handleFileSelect}
            className="hidden"
          />
          {loading && (
            <div className="text-sm text-muted-foreground">
              正在转换文档，请稍候...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

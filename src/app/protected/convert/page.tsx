"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import FileUpload from "@/components/FileUpload";
import MermaidPreview from "@/components/MermaidPreview";
import ExportButton from "@/components/ExportButton";
import { ConversionOutput } from "@/lib/mermaid-converter";

export default function Home() {
  const [conversionData, setConversionData] = useState<ConversionOutput | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-xl font-bold">需求文档转换工具</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 space-y-8">
        <FileUpload onFileConverted={setConversionData} />
        {conversionData && (
          <div className="space-y-8">
            <MermaidPreview data={conversionData} />
            <div className="flex justify-end">
              <ExportButton mermaidCode={conversionData.mermaidCode} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

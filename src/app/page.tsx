'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import MermaidPreview from '@/components/MermaidPreview'
import ExportButton from '@/components/ExportButton'
import { z } from 'zod'

const previewSchema = z.object({
  title: z.string(),
  description: z.string(),
  mermaidCode: z.string(),
  nodes: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      description: z.string().optional()
    })
  ),
  edges: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      label: z.string().optional()
    })
  )
})

export default function Home() {
  const [conversionData, setConversionData] = useState<z.infer<typeof previewSchema> | null>(null)

  const handleFileConverted = (data: z.infer<typeof previewSchema>) => {
    setConversionData(data)
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">需求文档转换工具</h1>
      <div className="grid grid-cols-1 gap-8">
        <FileUpload onFileConverted={handleFileConverted} />
        {conversionData && (
          <>
            <MermaidPreview data={conversionData} />
            <ExportButton mermaidCode={conversionData.mermaidCode} />
          </>
        )}
      </div>
    </main>
  )
}

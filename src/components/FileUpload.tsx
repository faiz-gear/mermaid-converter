'use client'

import { ConversionOutput } from '@/lib/mermaid-converter'
import { useState } from 'react'

interface FileUploadProps {
  onFileConverted: (code: ConversionOutput) => void
}

export default function FileUpload({ onFileConverted }: FileUploadProps) {
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      onFileConverted(data)
    } catch (error) {
      console.error('转换失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-2 border-dashed p-8 rounded-lg text-center">
      <input
        type="file"
        accept=".txt,.doc,.docx,.pdf,.md"
        onChange={handleFileUpload}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? '正在转换...' : '上传需求文档'}
      </label>
    </div>
  )
}

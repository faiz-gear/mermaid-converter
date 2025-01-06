import { NextRequest, NextResponse } from 'next/server'
import { convertToMermaid, ConversionError } from '@/lib/mermaid-converter'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: '未找到上传的文件' }, { status: 400 })
    }

    const text = await file.text()
    const result = await convertToMermaid(text)

    return NextResponse.json(result)
  } catch (error) {
    console.error('转换失败:', error)

    if (error instanceof ConversionError) {
      return NextResponse.json(
        {
          error: error.message,
          details: error.details
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: '服务器内部错误',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, message: 'Không có file được upload' })
    }

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'Chỉ được upload file ảnh' })
    }

    // Kiểm tra kích thước file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File quá lớn (max 5MB)' })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Tạo tên file unique
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}_${randomString}.${fileExtension}`

    // Đường dẫn lưu file
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    const filePath = join(uploadsDir, fileName)

    // Tạo thư mục nếu chưa tồn tại
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Lưu file
    await writeFile(filePath, buffer)

    // Trả về URL của file
    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileName: fileName,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Lỗi upload file:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi khi upload file' 
    }, { status: 500 })
  }
}

// Xử lý DELETE request để xóa ảnh
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get('fileName')

    if (!fileName) {
      return NextResponse.json({ success: false, message: 'Không có tên file' })
    }

    const filePath = join(process.cwd(), 'public', 'uploads', fileName)
    
    if (existsSync(filePath)) {
      const { unlink } = await import('fs/promises')
      await unlink(filePath)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Lỗi xóa file:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi khi xóa file' 
    }, { status: 500 })
  }
}

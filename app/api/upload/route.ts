import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Debug environment variables
console.log('Cloudinary Config Debug:')
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME)
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY)
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***' : 'undefined')

// Configure Cloudinary with hardcoded values for testing
cloudinary.config({
  cloud_name: 'diaogiqvy',
  api_key: '174729922943923',
  api_secret: 'qV-jAPVNx8QdZeAiqG4eYvtvwNM',
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ 
        success: false, 
        message: 'No file provided' 
      }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'blog-images',
          resource_type: 'auto',
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return NextResponse.json({
      success: true,
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
      width: (result as any).width,
      height: (result as any).height
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to upload image',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

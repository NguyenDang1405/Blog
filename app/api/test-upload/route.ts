import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Test upload API is working',
    timestamp: new Date().toISOString(),
    env: {
      cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
      cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'undefined'
    }
  })
}

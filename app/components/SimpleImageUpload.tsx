'use client'

import React, { useState } from 'react'

interface SimpleImageUploadProps {
  onImageUpload: (url: string) => void
  className?: string
}

const SimpleImageUpload: React.FC<SimpleImageUploadProps> = ({ onImageUpload, className = '' }) => {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Chỉ được upload file ảnh!')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn (max 5MB)!')
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      console.log('Uploading to /api/upload...')
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Upload result:', result)

      if (result.success) {
        onImageUpload(result.url)
        alert('Upload thành công!')
      } else {
        alert(`Lỗi upload: ${result.message}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Lỗi khi upload ảnh: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        {uploading && (
          <div className="mt-4 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Đang upload...</span>
          </div>
        )}
        
        <p className="mt-2 text-sm text-gray-500">
          Chọn ảnh để upload lên Cloudinary
        </p>
      </div>
    </div>
  )
}

export default SimpleImageUpload

'use client'

import { useState } from 'react'
import SimpleImageUpload from '../components/SimpleImageUpload'

export default function TestUpload() {
  const [uploadedImage, setUploadedImage] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Test Upload Ảnh lên Cloudinary
          </h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Upload ảnh:
            </h2>
            <SimpleImageUpload
              onImageUpload={setUploadedImage}
              className="mb-4"
            />
          </div>

          {uploadedImage && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Ảnh đã upload:
              </h2>
              <div className="space-y-4">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="max-w-full h-auto rounded-lg border"
                />
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">URL:</p>
                  <code className="text-xs text-blue-600 break-all">
                    {uploadedImage}
                  </code>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Hướng dẫn:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Chọn file ảnh từ máy tính</li>
              <li>• File phải là ảnh (JPG, PNG, GIF)</li>
              <li>• Kích thước tối đa 5MB</li>
              <li>• Ảnh sẽ được upload lên Cloudinary</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

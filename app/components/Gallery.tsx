'use client'

import { useState } from 'react'
import ImageUpload from './ImageUpload'

interface GalleryProps {
  images: string[]
  onChange: (images: string[]) => void
  className?: string
}

const Gallery: React.FC<GalleryProps> = ({ images, onChange, className = '' }) => {
  const [isUploading, setIsUploading] = useState(false)

  const handleImageAdd = (imageUrl: string) => {
    onChange([...images, imageUrl])
  }

  const handleImageRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const handleImageReorder = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [removed] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, removed)
    onChange(newImages)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Thư viện ảnh (Gallery)
      </label>

      {/* Gallery Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                >
                  Xóa
                </button>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleImageReorder(index, index - 1)}
                    className="opacity-0 group-hover:opacity-100 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-all"
                    title="Di chuyển lên"
                  >
                    ↑
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleImageReorder(index, index + 1)}
                    className="opacity-0 group-hover:opacity-100 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-all"
                    title="Di chuyển xuống"
                  >
                    ↓
                  </button>
                )}
              </div>
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload New Image */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <ImageUpload
          onImageUpload={handleImageAdd}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-2">
          Thêm ảnh vào thư viện (có thể thêm nhiều ảnh)
        </p>
      </div>

      {images.length > 0 && (
        <p className="text-sm text-gray-600">
          Tổng số ảnh: {images.length}
        </p>
      )}
    </div>
  )
}

export default Gallery


'use client'

import { useState } from 'react'

interface GalleryViewerProps {
  images: string[]
  title?: string
  className?: string
}

const GalleryViewer: React.FC<GalleryViewerProps> = ({ 
  images, 
  title = 'Thư viện ảnh',
  className = '' 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!images || images.length === 0) return null

  return (
    <div className={`mt-8 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image)}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={selectedImage}
              alt="Gallery view"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 rounded-full px-4 py-2">
              {images.indexOf(selectedImage) + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryViewer


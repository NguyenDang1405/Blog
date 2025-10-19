'use client'

import React, { useState } from 'react'

interface RelatedLink {
  title: string
  url: string
  description?: string
}

interface RelatedLinksProps {
  links: RelatedLink[]
  onChange: (links: RelatedLink[]) => void
  className?: string
}

const RelatedLinks: React.FC<RelatedLinksProps> = ({ links, onChange, className = '' }) => {
  const [newLink, setNewLink] = useState<RelatedLink>({
    title: '',
    url: '',
    description: ''
  })

  const addLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      // Validate URL
      try {
        new URL(newLink.url)
        onChange([...links, { ...newLink }])
        setNewLink({ title: '', url: '', description: '' })
      } catch {
        alert('Vui lòng nhập URL hợp lệ')
      }
    }
  }

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index)
    onChange(newLinks)
  }

  const updateLink = (index: number, field: keyof RelatedLink, value: string) => {
    const newLinks = [...links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    onChange(newLinks)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Chủ đề liên quan
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Thêm các liên kết hữu ích liên quan đến bài viết
        </p>
      </div>

      {/* Existing Links */}
      {links.map((link, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tiêu đề
              </label>
              <input
                type="text"
                value={link.title}
                onChange={(e) => updateLink(index, 'title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tiêu đề liên kết"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                URL
              </label>
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="w-full px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Mô tả (tùy chọn)
            </label>
            <input
              type="text"
              value={link.description || ''}
              onChange={(e) => updateLink(index, 'description', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả ngắn về liên kết"
            />
          </div>
        </div>
      ))}

      {/* Add New Link */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-800 mb-3">Thêm liên kết mới</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tiêu đề *
              </label>
              <input
                type="text"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tiêu đề liên kết"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                URL *
              </label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Mô tả (tùy chọn)
            </label>
            <input
              type="text"
              value={newLink.description}
              onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mô tả ngắn về liên kết"
            />
          </div>
          <button
            type="button"
            onClick={addLink}
            disabled={!newLink.title.trim() || !newLink.url.trim()}
            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm liên kết
          </button>
        </div>
      </div>

      {links.length > 0 && (
        <div className="text-sm text-gray-600">
          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Đã thêm {links.length} liên kết liên quan
        </div>
      )}
    </div>
  )
}

export default RelatedLinks

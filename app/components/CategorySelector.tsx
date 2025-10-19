'use client'

import React, { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface CategorySelectorProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onCategoryChange, 
  className = '' 
}) => {
  const categories = useQuery(api.categories.getAllCategories) || []
  const [isOpen, setIsOpen] = useState(false)

  const predefinedCategories = [
    { name: 'Công nghệ', slug: 'cong-nghe', color: 'bg-blue-500' },
    { name: 'Lập trình', slug: 'lap-trinh', color: 'bg-green-500' },
    { name: 'Thiết kế', slug: 'thiet-ke', color: 'bg-purple-500' },
    { name: 'Kinh doanh', slug: 'kinh-doanh', color: 'bg-orange-500' },
    { name: 'Giáo dục', slug: 'giao-duc', color: 'bg-pink-500' },
    { name: 'Du lịch', slug: 'du-lich', color: 'bg-cyan-500' },
    { name: 'Ẩm thực', slug: 'am-thuc', color: 'bg-red-500' },
    { name: 'Thể thao', slug: 'the-thao', color: 'bg-yellow-500' },
  ]

  const allCategories = [...predefinedCategories, ...categories]

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Danh mục
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-left flex items-center justify-between"
        >
          <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
            {selectedCategory 
              ? allCategories.find(cat => cat.slug === selectedCategory)?.name || selectedCategory
              : 'Chọn danh mục...'
            }
          </span>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <button
                type="button"
                onClick={() => {
                  onCategoryChange('')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                  selectedCategory === '' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                Không có danh mục
              </button>
              
              {allCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => {
                    onCategoryChange(category.slug)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
                    selectedCategory === category.slug ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategorySelector

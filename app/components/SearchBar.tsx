'use client'

import React, { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import Link from 'next/link'

interface SearchBarProps {
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  
  const searchResults = useQuery(
    api.posts.searchPosts, 
    searchTerm ? { searchTerm } : "skip"
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setIsSearching(true)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full px-4 py-3 pl-12 pr-4 border-2 border-[#92B9E3]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#92B9E3] focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-[#92B9E3] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isSearching && searchResults && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-2">
              <div className="px-3 py-2 text-sm font-semibold text-gray-600 border-b border-gray-100">
                Kết quả tìm kiếm ({searchResults.length})
              </div>
              {searchResults.slice(0, 5).map((post) => (
                <Link
                  key={post._id}
                  href={`/post/${post._id}`}
                  className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => {
                    setIsSearching(false)
                    setSearchTerm('')
                  }}
                >
                  <h4 className="font-semibold text-gray-900 line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </Link>
              ))}
              {searchResults.length > 5 && (
                <div className="px-3 py-2 text-sm text-[#92B9E3] border-t border-gray-100">
                  Và {searchResults.length - 5} kết quả khác...
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Không tìm thấy bài viết nào
            </div>
          )}
        </div>
      )}

      {/* Overlay to close search results */}
      {isSearching && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setIsSearching(false)}
        />
      )}
    </div>
  )
}

export default SearchBar

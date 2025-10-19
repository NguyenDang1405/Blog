'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BlogPost {
  _id: string
  title: string
  content: string
  author: string
  createdAt: string
}

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Giả lập dữ liệu cho demo
    const mockPosts: BlogPost[] = [
      {
        _id: '1',
        title: 'Chào mừng đến với Blog App',
        content: 'Đây là bài viết đầu tiên trong blog của chúng ta. Blog này được xây dựng với Next.js và Convex.',
        author: 'Admin',
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Hướng dẫn sử dụng Blog',
        content: 'Bạn có thể tạo bài viết mới bằng cách nhấn vào nút "Tạo bài viết" ở trên.',
        author: 'Admin',
        createdAt: new Date().toISOString()
      }
    ]
    
    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog của tôi</h1>
        <p className="text-lg text-gray-600">Chia sẻ những suy nghĩ và kinh nghiệm của tôi</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Tác giả: {post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="mt-4">
              <Link 
                href={`/post/${post._id}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Đọc thêm →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Chưa có bài viết nào. Hãy tạo bài viết đầu tiên!</p>
          <Link 
            href="/create"
            className="mt-4 inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700"
          >
            Tạo bài viết đầu tiên
          </Link>
        </div>
      )}
    </div>
  )
}

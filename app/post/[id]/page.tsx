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

export default function PostDetail({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Giả lập việc lấy dữ liệu bài viết
    const mockPost: BlogPost = {
      _id: params.id,
      title: 'Chào mừng đến với Blog App',
      content: `Đây là bài viết đầu tiên trong blog của chúng ta. Blog này được xây dựng với Next.js và Convex.

Trong bài viết này, chúng ta sẽ tìm hiểu về:
- Cách tạo ứng dụng blog với Next.js
- Kết nối với database Convex
- Deploy lên Vercel

Next.js là một framework React mạnh mẽ cho phép chúng ta xây dựng các ứng dụng web hiện đại. Với tính năng Server-Side Rendering (SSR) và Static Site Generation (SSG), Next.js giúp tối ưu hóa hiệu suất và SEO.

Convex là một backend-as-a-service hiện đại, cung cấp real-time database và serverless functions. Với Convex, chúng ta có thể dễ dàng xây dựng các tính năng real-time mà không cần phải quản lý server.

Vercel là một platform tuyệt vời để deploy các ứng dụng Next.js. Với chỉ vài cú click, chúng ta có thể đưa ứng dụng lên production.`,
      author: 'Admin',
      createdAt: new Date().toISOString()
    }
    
    setTimeout(() => {
      setPost(mockPost)
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          ← Quay về trang chủ
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex justify-between items-center text-gray-600">
            <span>Tác giả: {post.author}</span>
            <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {post.content}
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t border-gray-200">
          <Link 
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            ← Quay về trang chủ
          </Link>
        </footer>
      </div>
    </article>
  )
}

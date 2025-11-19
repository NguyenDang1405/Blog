'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface NewsletterFormProps {
  className?: string
  variant?: 'default' | 'inline' | 'modal'
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  className = '',
  variant = 'default'
}) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const subscribe = useMutation(api.newsletter.subscribeNewsletter)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await subscribe({
        email: email.trim(),
        name: name.trim() || undefined,
      })
      setSuccess(true)
      setEmail('')
      setName('')
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi đăng ký')
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email của bạn"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all"
        >
          {loading ? 'Đang gửi...' : 'Đăng ký'}
        </button>
      </form>
    )
  }

  if (variant === 'modal') {
    return (
      <div className={`bg-white rounded-lg p-6 shadow-xl ${className}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký nhận tin</h3>
        <p className="text-gray-600 mb-4">Nhận những bài viết mới nhất qua email</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn (tùy chọn)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email của bạn *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600">✓ Đăng ký thành công! Cảm ơn bạn đã quan tâm.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all font-semibold"
          >
            {loading ? 'Đang gửi...' : 'Đăng ký ngay'}
          </button>
        </form>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký nhận tin</h3>
        <p className="text-gray-600 mb-6">
          Nhận những bài viết mới nhất, cập nhật và tin tức qua email
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn (tùy chọn)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn *"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all font-semibold whitespace-nowrap"
            >
              {loading ? 'Đang gửi...' : 'Đăng ký'}
            </button>
          </div>
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600">✓ Đăng ký thành công! Cảm ơn bạn đã quan tâm.</p>
          )}
        </form>
        
        <p className="text-xs text-gray-500 mt-4">
          Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
        </p>
      </div>
    </div>
  )
}

export default NewsletterForm


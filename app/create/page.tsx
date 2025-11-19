'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import TinyMCEEditor from '../components/TinyMCEEditor'
import ImageUpload from '../components/ImageUpload'
import RelatedLinks from '../components/RelatedLinks'
import CategorySelector from '../components/CategorySelector'
import TagInput from '../components/TagInput'
import DestinationSelector from '../components/DestinationSelector'
import Gallery from '../components/Gallery'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../contexts/AuthContext'
import { Id } from '../../convex/_generated/dataModel'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(true)
  const [relatedLinks, setRelatedLinks] = useState<Array<{title: string, url: string, description?: string}>>([])
  // SEO fields
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [seoKeywords, setSeoKeywords] = useState<string[]>([])
  const [seoKeywordInput, setSeoKeywordInput] = useState('')
  // Scheduled posts
  const [scheduledAt, setScheduledAt] = useState('')
  // Phân cấp Điểm đến
  const [destinationId, setDestinationId] = useState<Id<"destinations"> | undefined>(undefined)
  // Gallery
  const [gallery, setGallery] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const createPost = useMutation(api.posts.createPost)
  const { user } = useAuth()

  // Set author từ user hiện tại
  useState(() => {
    if (user) {
      setAuthor(user.name)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

      try {
        if (!user) {
          throw new Error('Bạn cần đăng nhập để tạo bài viết')
        }

        await createPost({
          title,
          content,
          author,
          userId: user._id, // Truyền userId
          featuredImage,
          category: category || undefined,
          tags: tags.length > 0 ? tags : undefined,
          isFeatured,
          isPublished,
          relatedLinks: relatedLinks.length > 0 ? relatedLinks : undefined,
          // SEO fields
          seoTitle: seoTitle || undefined,
          seoDescription: seoDescription || undefined,
          seoKeywords: seoKeywords.length > 0 ? seoKeywords : undefined,
          // Scheduled posts
          scheduledAt: scheduledAt ? new Date(scheduledAt).getTime() : undefined,
          // Phân cấp Điểm đến
          destinationId: destinationId,
          // Gallery
          gallery: gallery.length > 0 ? gallery : undefined,
        })
        router.push('/')
      } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error)
      alert('Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">Tạo bài viết mới</h1>
            <p className="text-blue-100">Chia sẻ ý tưởng và kinh nghiệm của bạn với cộng đồng</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                    Tiêu đề bài viết *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nhập tiêu đề hấp dẫn..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-3">
                    Tác giả *
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tên của bạn..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Ảnh đại diện (tùy chọn)
                </label>
                {featuredImage ? (
                  <div className="mb-4">
                    <img 
                      src={featuredImage} 
                      alt="Featured" 
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => setFeaturedImage('')}
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Xóa ảnh
                    </button>
                  </div>
                ) : (
                  <ImageUpload
                    onImageUpload={setFeaturedImage}
                    className="mb-4"
                  />
                )}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-3">
                  Nội dung bài viết *
                </label>
                <TinyMCEEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Viết nội dung bài viết của bạn... Bạn có thể sử dụng các công cụ định dạng để tạo nội dung phong phú."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategorySelector
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                />
                
                <TagInput
                  tags={tags}
                  onChange={setTags}
                />
              </div>

              {/* Phân cấp Điểm đến */}
              <div>
                <DestinationSelector
                  selectedDestinationId={destinationId}
                  onDestinationChange={setDestinationId}
                />
              </div>

              {/* Gallery */}
              <div>
                <Gallery
                  images={gallery}
                  onChange={setGallery}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Bài viết nổi bật
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Hiển thị bài viết ở phần nổi bật
                  </p>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Xuất bản ngay
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Bài viết sẽ hiển thị công khai
                  </p>
                </div>
              </div>

              <div>
                <RelatedLinks
                  links={relatedLinks}
                  onChange={setRelatedLinks}
                />
              </div>

              {/* SEO Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tối ưu SEO</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="seoTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                      Tiêu đề SEO (tùy chọn)
                    </label>
                    <input
                      type="text"
                      id="seoTitle"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tiêu đề tối ưu cho Google (nếu để trống sẽ dùng tiêu đề bài viết)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Độ dài khuyến nghị: 50-60 ký tự
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="seoDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mô tả SEO (tùy chọn)
                    </label>
                    <textarea
                      id="seoDescription"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Mô tả ngắn gọn về nội dung bài viết (nếu để trống sẽ tự động tạo từ nội dung)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Độ dài khuyến nghị: 150-160 ký tự
                    </p>
                  </div>

                  <div>
                    <label htmlFor="seoKeywords" className="block text-sm font-semibold text-gray-700 mb-2">
                      Từ khóa SEO (tùy chọn)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {seoKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => setSeoKeywords(seoKeywords.filter((_, i) => i !== index))}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="seoKeywords"
                        value={seoKeywordInput}
                        onChange={(e) => setSeoKeywordInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            if (seoKeywordInput.trim() && !seoKeywords.includes(seoKeywordInput.trim())) {
                              setSeoKeywords([...seoKeywords, seoKeywordInput.trim()])
                              setSeoKeywordInput('')
                            }
                          }
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nhập từ khóa và nhấn Enter"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (seoKeywordInput.trim() && !seoKeywords.includes(seoKeywordInput.trim())) {
                            setSeoKeywords([...seoKeywords, seoKeywordInput.trim()])
                            setSeoKeywordInput('')
                          }
                        }}
                        className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduled Posts Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lên lịch bài viết</h3>
                <div>
                  <label htmlFor="scheduledAt" className="block text-sm font-semibold text-gray-700 mb-2">
                    Lên lịch xuất bản (tùy chọn)
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduledAt"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nếu chọn, bài viết sẽ tự động xuất bản vào thời gian đã chọn
                  </p>
                  {scheduledAt && (
                    <p className="text-sm text-blue-600 mt-2">
                      Bài viết sẽ được xuất bản vào: {new Date(scheduledAt).toLocaleString('vi-VN')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang lưu...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Xuất bản bài viết
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}

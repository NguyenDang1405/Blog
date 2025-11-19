'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import TinyMCEEditor from '../../components/TinyMCEEditor'
import ImageUpload from '../../components/ImageUpload'
import RelatedLinks from '../../components/RelatedLinks'
import CategorySelector from '../../components/CategorySelector'
import TagInput from '../../components/TagInput'
import DestinationSelector from '../../components/DestinationSelector'
import Gallery from '../../components/Gallery'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useAuth } from '../../contexts/AuthContext'

export default function EditPost({ params }: { params: { id: string } }) {
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
  
  // Lấy id từ params
  const postId = params.id as Id<"posts">
  const post = useQuery(api.posts.getPostById, { id: postId })
  const updatePost = useMutation(api.posts.updatePost)
  const { user } = useAuth()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setAuthor(post.author)
      setFeaturedImage(post.featuredImage || '')
      setCategory(post.category || '')
      setTags(post.tags || [])
      setIsFeatured(post.isFeatured || false)
      setIsPublished(post.isPublished !== false)
      setRelatedLinks(post.relatedLinks || [])
      // SEO fields
      setSeoTitle(post.seoTitle || '')
      setSeoDescription(post.seoDescription || '')
      setSeoKeywords(post.seoKeywords || [])
      // Scheduled posts
      setScheduledAt(post.scheduledAt ? new Date(post.scheduledAt).toISOString().slice(0, 16) : '')
      // Phân cấp Điểm đến
      setDestinationId(post.destinationId)
      // Gallery
      setGallery(post.gallery || [])
    }
  }, [post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) {
        throw new Error('Bạn cần đăng nhập để chỉnh sửa bài viết')
      }

      await updatePost({
        id: postId,
        title,
        content,
        author,
        userId: user._id, // Truyền userId để kiểm tra quyền
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
      console.error('Lỗi khi cập nhật bài viết:', error)
      alert('Có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  if (post === undefined) {
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
        <button 
          onClick={() => router.push('/')}
          className="text-primary-600 hover:text-primary-700"
        >
          ← Quay về trang chủ
        </button>
      </div>
    )
  }

  // Kiểm tra quyền sở hữu (chỉ nếu bài viết có userId)
  if (post && user && post.userId && post.userId !== user._id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white mb-2">Không có quyền</h1>
              <p className="text-red-100">Bạn không có quyền chỉnh sửa bài viết này</p>
            </div>
            <div className="p-8 text-center">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">Sửa bài viết</h1>
            <p className="text-orange-100">Chỉnh sửa và cập nhật nội dung bài viết của bạn</p>
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                  placeholder="Chỉnh sửa nội dung bài viết của bạn... Bạn có thể sử dụng các công cụ định dạng để tạo nội dung phong phú."
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
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
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => setSeoKeywords(seoKeywords.filter((_, i) => i !== index))}
                            className="ml-2 text-orange-600 hover:text-orange-800"
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
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
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
                        className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nếu chọn, bài viết sẽ tự động xuất bản vào thời gian đã chọn
                  </p>
                  {scheduledAt && (
                    <p className="text-sm text-orange-600 mt-2">
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
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang cập nhật...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Cập nhật bài viết
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

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import SimpleRichEditor from '../components/SimpleRichEditor'
import ImageUpload from '../components/ImageUpload'
import RelatedLinks from '../components/RelatedLinks'
import CategorySelector from '../components/CategorySelector'
import TagInput from '../components/TagInput'

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
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const createPost = useMutation(api.posts.createPost)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

      try {
        await createPost({
          title,
          content,
          author,
          featuredImage,
          category: category || undefined,
          tags: tags.length > 0 ? tags : undefined,
          isFeatured,
          isPublished,
          relatedLinks: relatedLinks.length > 0 ? relatedLinks : undefined
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
                <SimpleRichEditor
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
  )
}

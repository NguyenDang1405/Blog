'use client'

import SearchBar from '../components/SearchBar'

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em] text-center">Search</p>
      <h1 className="text-4xl font-bold text-slate-900 text-center mt-4">Tìm kiếm bài viết trên blog</h1>
      <p className="text-slate-600 text-center mt-4">
        Nhập từ khóa (điểm đến, chuyên mục, tác giả…) để tìm nhanh nội dung bạn cần. Công cụ hỗ trợ tiếng Việt có dấu và không dấu.
      </p>
      <div className="mt-10">
        <SearchBar />
      </div>
    </div>
  )
}


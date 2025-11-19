const curatedGalleries = [
  {
    title: 'Hành trình Nhật Bản mùa hoa đào',
    description: 'Bộ ảnh từ Tokyo, Kyoto đến Osaka với gam màu pastel dịu nhẹ',
    photos: 24,
    tags: ['Japan', 'Spring', 'Cityscape'],
  },
  {
    title: 'Sống chậm ở Bắc Âu',
    description: 'Một vòng qua Na Uy và Iceland với aurora, fjord và kiến trúc tối giản',
    photos: 32,
    tags: ['Nordic', 'Nature', 'Winter'],
  },
  {
    title: 'Biển xanh – Cát trắng – Nắng vàng',
    description: 'Những bờ biển được yêu thích nhất Đông Nam Á',
    photos: 18,
    tags: ['Beach', 'Tropical', 'Relax'],
  },
]

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center">
        <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Gallery</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">Thư viện ảnh cảm hứng</h1>
        <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
          Bộ sưu tập ảnh chất lượng cao để bạn dùng làm moodboard, lên ý tưởng chuyến đi hay đơn giản là thư giãn ngắm nhìn.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {curatedGalleries.map(gallery => (
          <div key={gallery.title} className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-[#92B9E3]/10 p-6 flex flex-col">
            <div className="h-40 rounded-xl bg-gradient-to-br from-[#92B9E3]/30 to-[#FBA2D0]/30 mb-6" />
            <h2 className="text-xl font-semibold text-slate-900">{gallery.title}</h2>
            <p className="text-sm text-slate-500 mt-2 flex-1">{gallery.description}</p>
            <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
              <span>{gallery.photos} tấm ảnh</span>
              <div className="flex gap-2 flex-wrap">
                {gallery.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


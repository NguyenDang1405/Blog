const collections = [
  {
    name: 'Weekend Getaway',
    description: 'Ý tưởng cho chuyến đi 2-3 ngày: lịch trình, khách sạn boutique và food tour.',
    items: ['Đà Lạt moodboard', 'Seoul in 48h', 'Cần Thơ chill trip'],
  },
  {
    name: 'Slow Travel',
    description: 'Ở lại lâu hơn để tận hưởng nhịp sống địa phương. Gợi ý địa điểm lưu trú dài ngày.',
    items: ['Chiang Mai ở 1 tháng', 'Workation tại Đà Nẵng', 'Living like a local ở Hội An'],
  },
  {
    name: 'Adventure & Nature',
    description: 'Những cung đường trekking, diving và camping đẹp nhất.',
    items: ['Trekking Annapurna', 'Camping Đà Lạt', 'Lặn ngắm san hô Phú Quốc'],
  },
]

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="text-center">
        <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Collections</p>
        <h1 className="text-4xl font-bold text-slate-900 mt-4">Bộ sưu tập chủ đề</h1>
        <p className="text-lg text-slate-600 mt-4">
          Các bộ nội dung tuyển chọn giúp bạn lên kế hoạch nhanh cho từng kiểu chuyến đi.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {collections.map(collection => (
          <div key={collection.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-[#92B9E3]/10">
            <h2 className="text-2xl font-semibold text-slate-900">{collection.name}</h2>
            <p className="text-slate-600 text-sm mt-3">{collection.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {collection.items.map(item => (
                <li key={item} className="flex gap-2 items-center">
                  <span className="text-[#92B9E3]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-5 inline-flex items-center gap-2 text-[#92B9E3] font-semibold">
              Xem chi tiết →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


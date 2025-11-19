const featuredVideos = [
  {
    title: '48 giờ ở Seoul',
    duration: '12:36',
    description: 'Food tour, shopping Myeongdong và vintage cafe hunting',
    platform: 'YouTube',
  },
  {
    title: 'Workation ở Đà Nẵng',
    duration: '9:10',
    description: 'Chọn chỗ ở, quán cafe làm việc và hoạt động cuối tuần',
    platform: 'YouTube',
  },
  {
    title: 'Hành trình săn cực quang ở Iceland',
    duration: '7:55',
    description: 'Kinh nghiệm thuê xe tự lái, săn aurora và các lưu ý an toàn',
    platform: 'YouTube',
  },
]

export default function VideosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <header className="text-center">
        <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Video & Vlog</p>
        <h1 className="text-4xl font-bold text-slate-900 mt-4">Hành trình thực tế bằng video</h1>
        <p className="text-lg text-slate-600 mt-4">
          Xem lại cảm xúc tại điểm đến trước khi bạn xách balo lên đường. Tất cả video đều có phụ đề tiếng Việt và checklist đi kèm.
        </p>
      </header>

      <section className="mt-12 grid gap-6">
        {featuredVideos.map(video => (
          <article key={video.title} className="bg-white border border-slate-100 rounded-2xl shadow-lg shadow-[#92B9E3]/10 p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-60 h-36 rounded-xl bg-gradient-to-br from-[#92B9E3]/30 to-[#FBA2D0]/30 flex items-center justify-center text-white font-semibold">
              {video.duration}
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{video.platform}</p>
              <h2 className="text-2xl font-semibold text-slate-900 mt-2">{video.title}</h2>
              <p className="text-slate-600 mt-3">{video.description}</p>
              <button className="mt-4 inline-flex items-center gap-2 text-[#92B9E3] font-semibold">
                ▶ Xem video
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}


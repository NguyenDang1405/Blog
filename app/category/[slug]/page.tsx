import { notFound } from 'next/navigation'

const categoryContent: Record<
  string,
  {
    title: string
    description: string
    highlights: string[]
    tips: string[]
  }
> = {
  itinerary: {
    title: 'Lịch trình gợi ý',
    description:
      'Các lịch trình du lịch chi tiết theo ngày giúp bạn tiết kiệm thời gian lập kế hoạch. Từ city tour 2 ngày đến các hành trình khám phá dài hơi.',
    highlights: [
      'Gợi ý lịch trình 3 ngày tại Tokyo, Bangkok, Singapore',
      'Hành trình 7 ngày khám phá Bắc Âu',
      'Roadtrip 5 ngày Hà Giang',
    ],
    tips: [
      'Luôn dành 10% thời gian để nghỉ ngơi hoặc xử lý tình huống phát sinh',
      'Kiểm tra thời tiết trước 5 ngày để điều chỉnh hoạt động ngoài trời',
      'Đặt vé tham quan online trước để tránh xếp hàng',
    ],
  },
  tips: {
    title: 'Mẹo du lịch',
    description:
      'Tổng hợp các mẹo giúp chuyến đi suôn sẻ hơn: từ chuẩn bị hành lý, tối ưu chi phí đến bảo vệ sức khỏe khi di chuyển',
    highlights: [
      'Chiến lược săn vé máy bay giá tốt trong năm',
      'Checklist hành lý 5kg cho chuyến đi 4 ngày',
      'Bí quyết đổi tiền & dùng thẻ ở châu Âu',
    ],
    tips: [
      'Ưu tiên hành lý đa dụng và dễ phối đồ',
      'Scan toàn bộ giấy tờ quan trọng để lưu bản mềm',
      'Luôn mang theo ít nhất 2 phương thức thanh toán',
    ],
  },
  food: {
    title: 'Ẩm thực',
    description:
      'Khám phá văn hóa ẩm thực địa phương, quán ăn địa phương được dân bản địa yêu thích và mẹo thưởng thức bền vững',
    highlights: [
      '15 món không thể bỏ lỡ ở Seoul',
      'Local food tour tự túc tại Bangkok',
      'Cà phê specialty ở Đà Lạt',
    ],
    tips: [
      'Hỏi người địa phương về khung giờ ăn chính để trải nghiệm đúng vibe',
      'Ưu tiên quán ăn sử dụng nguyên liệu bản địa và hạn chế nhựa dùng 1 lần',
      'Thử các lớp học nấu ăn để hiểu hơn về văn hóa',
    ],
  },
  'hotel-review': {
    title: 'Review khách sạn',
    description:
      'Trải nghiệm thực tế tại các khách sạn, homestay và resort từ bình dân đến cao cấp. Tập trung vào sự thoải mái và tính chân thật.',
    highlights: [
      'Top boutique hotel tại Đà Nẵng dưới 2 triệu/đêm',
      'So sánh 3 khu resort tại Phú Quốc',
      'Homestay địa phương ở Sapa',
    ],
    tips: [
      'Đọc kỹ chính sách hoàn tiền trước khi đặt',
      'Luôn liên hệ trực tiếp để hỏi về ưu đãi đi kèm',
      'Mang theo ổ cắm chuyển đổi và dây nối dài',
    ],
  },
  'local-experience': {
    title: 'Trải nghiệm địa phương',
    description:
      'Sống chậm cùng cộng đồng bản địa: tham gia workshop thủ công, học nấu món truyền thống, hoặc ở homestay để kết nối với văn hóa.',
    highlights: [
      'Workshop nhuộm chàm ở Cao Bằng',
      'Một ngày làm nông dân ở Hội An',
      'Tour văn hóa cà phê Buôn Ma Thuột',
    ],
    tips: [
      'Tôn trọng quy tắc, tín ngưỡng địa phương',
      'Luôn xin phép trước khi chụp ảnh người dân',
      'Ưu tiên dịch vụ do người bản địa vận hành',
    ],
  },
  workation: {
    title: 'Workation',
    description:
      'Kết hợp làm việc từ xa và du lịch. Gợi ý địa điểm có hạ tầng tốt, không gian truyền cảm hứng và cộng đồng freelancer năng động.',
    highlights: [
      'Co-living space ở Bali dành cho digital nomad',
      'Danh sách quán cafe làm việc tại Sài Gòn & Hà Nội',
      'Workation 1 tháng ở Đà Nẵng',
    ],
    tips: [
      'Ưu tiên chỗ ở có bàn làm việc và internet ổn định',
      'Chia khung thời gian rõ ràng giữa làm việc và khám phá',
      'Mang theo bộ phát Wi-Fi dự phòng',
    ],
  },
}

type CategoryPageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(categoryContent).map(slug => ({ slug }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const content = categoryContent[params.slug]

  if (!content) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Category</p>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">{content.title}</h1>
      <p className="text-lg text-slate-600 mt-4 leading-relaxed">{content.description}</p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="p-6 rounded-2xl bg-white shadow-lg shadow-[#92B9E3]/10 border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Nổi bật</h2>
          <ul className="space-y-3 text-slate-600">
            {content.highlights.map(item => (
              <li key={item} className="flex gap-3">
                <span className="text-[#92B9E3]">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white shadow-lg shadow-[#FBA2D0]/10 border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Tips nhanh</h2>
          <ul className="space-y-3 text-slate-600">
            {content.tips.map(item => (
              <li key={item} className="flex gap-3">
                <span className="text-[#FBA2D0]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


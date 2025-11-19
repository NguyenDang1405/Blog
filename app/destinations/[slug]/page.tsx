import { notFound } from 'next/navigation'

const destinationContent: Record<
  string,
  {
    title: string
    subtitle: string
    highlights: { title: string; description: string }[]
    travelTips: string[]
    bestTime: string
  }
> = {
  asia: {
    title: 'Châu Á',
    subtitle: 'Hòa trộn giữa văn hóa lâu đời và nhịp sống hiện đại',
    highlights: [
      { title: 'Tokyo', description: 'Ẩm thực đỉnh cao, công nghệ và sự tinh tế trong từng chi tiết' },
      { title: 'Bangkok', description: 'Thiên đường street food, chợ đêm và các quán rooftop bar' },
      { title: 'Seoul', description: 'Kết hợp giữa K-culture, shopping và thiên nhiên ở ngoại ô' },
    ],
    travelTips: [
      'Tải trước ứng dụng dịch và bản đồ offline',
      'Mang theo tiền mặt địa phương vì nhiều khu chợ chưa chấp nhận thẻ',
      'Đặt sim hoặc eSIM trước để tránh xếp hàng tại sân bay',
    ],
    bestTime: 'Tháng 3-5 (mùa xuân) hoặc 9-11 (mùa thu) là thời điểm lý tưởng cho hầu hết các thành phố.',
  },
  europe: {
    title: 'Châu Âu',
    subtitle: 'Kiến trúc cổ điển, bảo tàng đẳng cấp và cảnh quan thơ mộng',
    highlights: [
      { title: 'Paris', description: 'Nghệ thuật, thời trang và ẩm thực Pháp lãng mạn' },
      { title: 'Rome', description: 'Dấu ấn La Mã cổ điển và văn hóa cà phê sidewalk' },
      { title: 'Prague', description: 'Thành phố cổ tích với chi phí dễ chịu' },
    ],
    travelTips: [
      'Nên mua thẻ giao thông (travel card) để tiết kiệm',
      'Mang giày tốt cho việc đi bộ nhiều trên đường lát đá',
      'Đặt vé tham quan bảo tàng/nhà thờ online để tránh hàng dài',
    ],
    bestTime: 'Mùa xuân và đầu thu ít khách, tiết trời dễ chịu; mùa đông phù hợp để trải nghiệm chợ Noel.',
  },
  americas: {
    title: 'Châu Mỹ',
    subtitle: 'Sự đối lập thú vị giữa đô thị sôi động và thiên nhiên hùng vĩ',
    highlights: [
      { title: 'New York', description: 'Đa văn hóa, bảo tàng hàng đầu và skyline biểu tượng' },
      { title: 'Cusco', description: 'Cửa ngõ di sản Inca và Machu Picchu' },
      { title: 'Patagonia', description: 'Thiên đường trekking của người mê phiêu lưu' },
    ],
    travelTips: [
      'Chuẩn bị hành lý linh hoạt theo nhiều kiểu thời tiết',
      'Kiểm tra yêu cầu visa và giấy tờ nhập cảnh kỹ lưỡng',
      'Luôn có bảo hiểm du lịch, đặc biệt khi đến vùng núi/hoang dã',
    ],
    bestTime: 'Tùy khu vực: Bắc Mỹ đẹp nhất mùa thu, Nam Mỹ nên đi tháng 10-3 để tránh mùa mưa.',
  },
  islands: {
    title: 'Biển đảo',
    subtitle: 'Nơi dành cho những buổi sáng trên bãi cát trắng và hoàng hôn trên biển',
    highlights: [
      { title: 'Maldives', description: 'Overwater villa và hoạt động lặn ngắm san hô' },
      { title: 'Phú Quốc', description: 'Ẩm thực tươi ngon, nhiều beach club mới' },
      { title: 'Bali', description: 'Kết hợp yoga retreat, surf và văn hóa Hindu' },
    ],
    travelTips: [
      'Mang theo kem chống nắng reef-safe để bảo vệ san hô',
      'Đặt tour riêng cho hoạt động lặn/đi đảo để chủ động lịch',
      'Luôn kiểm tra tình trạng biển trước khi tham gia sport dưới nước',
    ],
    bestTime: 'Tháng 11-4 ít mưa, biển êm. Bali có thể ghé quanh năm nhưng tránh mùa cao điểm 7-8.',
  },
  mountains: {
    title: 'Núi rừng',
    subtitle: 'Không khí trong lành, trekking và trải nghiệm văn hóa bản địa',
    highlights: [
      { title: 'Sapa', description: 'Ruộng bậc thang, trekking bản làng và ẩm thực miền núi' },
      { title: 'Đà Lạt', description: 'Thời tiết se lạnh, cafe specialty và check-in rừng thông' },
      { title: 'Nepal', description: 'Thiên đường trekking Annapurna, Everest Base Camp' },
    ],
    travelTips: [
      'Mang giày trekking đã được làm mềm trước',
      'Luôn hỏi dự báo thời tiết trước khi trekking',
      'Đừng quên thuốc chống say độ cao với cung đường trên 3000m',
    ],
    bestTime: 'Mùa khô (tháng 10-4) giúp đường trekking an toàn hơn và tầm nhìn đẹp nhất.',
  },
  cities: {
    title: 'Thành phố hiện đại',
    subtitle: 'Nhịp sống sôi động, shopping và hạ tầng du lịch tuyệt vời',
    highlights: [
      { title: 'Singapore', description: 'Thành phố xanh, sạch và cực kỳ tiện lợi cho khách du lịch' },
      { title: 'Dubai', description: 'Xa hoa, công viên giải trí và sa mạc' },
      { title: 'Seoul', description: 'K-culture, mua sắm và cafe hiện đại' },
    ],
    travelTips: [
      'Tận dụng hệ thống metro/bus để tiết kiệm chi phí',
      'Đặt vé show/nhạc kịch trước vài tuần',
      'Mang theo adapter vì ổ cắm có thể khác chuẩn Việt Nam',
    ],
    bestTime: 'Đa phần các thành phố hiện đại có thể ghé quanh năm; tránh mùa bão ở khu vực nhiệt đới.',
  },
}

type DestinationPageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(destinationContent).map(slug => ({ slug }))
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const content = destinationContent[params.slug]

  if (!content) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Destination</p>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">{content.title}</h1>
      <p className="text-lg text-slate-500 mt-3">{content.subtitle}</p>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {content.highlights.map(item => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-[#92B9E3]/10 hover:-translate-y-1 transition"
          >
            <p className="text-sm font-semibold text-[#92B9E3] uppercase tracking-widest">{item.title}</p>
            <p className="mt-3 text-slate-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="p-6 rounded-2xl bg-[#92B9E3]/10 border border-[#92B9E3]/20">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Kinh nghiệm chuẩn bị</h2>
          <ul className="space-y-3 text-slate-700">
            {content.travelTips.map(tip => (
              <li key={tip} className="flex gap-3">
                <span>✔</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-[#FBA2D0]/10">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Thời gian lý tưởng</h2>
          <p className="text-slate-600 leading-relaxed">{content.bestTime}</p>
        </div>
      </section>
    </div>
  )
}


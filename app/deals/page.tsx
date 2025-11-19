const deals = [
  {
    title: 'Staycation Sài Gòn 5*',
    description: 'Combo 2N1Đ tại khách sạn Riverside Luxury, bao gồm breakfast & spa voucher',
    price: '4.200.000đ',
    expire: 'HSD: 31/12/2025',
  },
  {
    title: 'Vé máy bay Hà Nội ↔ Tokyo',
    description: 'Giảm đến 25% cho chuyến đi từ tháng 3-5. Tặng thêm 20kg hành lý ký gửi',
    price: 'Từ 9.800.000đ',
    expire: 'Đặt trước 28/02/2025',
  },
  {
    title: 'Tour khám phá Bali 4N3Đ',
    description: 'Lịch trình riêng tối đa 6 người, bao gồm photographer & private driver',
    price: '11.500.000đ',
    expire: 'Khởi hành hàng tuần',
  },
]

export default function DealsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center">
        <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Deals & Voucher</p>
        <h1 className="text-4xl font-bold text-slate-900 mt-4">Ưu đãi mới cập nhật</h1>
        <p className="text-slate-600 mt-4">Các deal/flash sale uy tín được kiểm duyệt kỹ, phù hợp với độc giả của blog.</p>
      </header>

      <div className="mt-10 space-y-4">
        {deals.map(deal => (
          <div key={deal.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-[#92B9E3]/10 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-slate-900">{deal.title}</h2>
              <p className="text-slate-600 mt-2">{deal.description}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mt-3">{deal.expire}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#92B9E3]">{deal.price}</p>
              <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#92B9E3]">
                Nhận ưu đãi →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


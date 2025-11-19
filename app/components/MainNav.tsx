'use client'

import Link from 'next/link'
import { useState, type FocusEvent } from 'react'

interface NavItem {
  title: string
  description?: string
  href: string
  badge?: string
}

interface DropdownSection {
  heading: string
  items: NavItem[]
}

const categorySections: DropdownSection[] = [
  {
    heading: 'Kinh nghiệm',
    items: [
      { title: 'Lịch trình', description: 'Gợi ý hành trình theo ngày', href: '/category/itinerary' },
      { title: 'Mẹo du lịch', description: 'Chuẩn bị hành lý, ngân sách', href: '/category/tips' },
      { title: 'Ẩm thực', description: 'Ăn gì ở mỗi điểm đến', href: '/category/food' },
    ],
  },
  {
    heading: 'Cộng đồng',
    items: [
      { title: 'Review khách sạn', description: 'Trải nghiệm lưu trú thực tế', href: '/category/hotel-review' },
      { title: 'Trải nghiệm địa phương', description: 'Văn hóa & con người', href: '/category/local-experience' },
      { title: 'Workation', description: 'Làm việc từ xa', href: '/category/workation', badge: 'Hot' },
    ],
  },
]

const destinationSections: DropdownSection[] = [
  {
    heading: 'Châu lục',
    items: [
      { title: 'Châu Á', description: 'Tokyo, Seoul, Bangkok...', href: '/destinations/asia' },
      { title: 'Châu Âu', description: 'Paris, Rome, Prague...', href: '/destinations/europe' },
      { title: 'Châu Mỹ', description: 'New York, Lima, Cusco...', href: '/destinations/americas' },
    ],
  },
  {
    heading: 'Theo chủ đề',
    items: [
      { title: 'Biển đảo', description: 'Maldives, Phú Quốc, Bali', href: '/destinations/islands' },
      { title: 'Núi rừng', description: 'Sapa, Đà Lạt, Nepal', href: '/destinations/mountains' },
      { title: 'Thành phố hiện đại', description: 'Singapore, Dubai, Seoul', href: '/destinations/cities' },
    ],
  },
]

const resourceSections: DropdownSection[] = [
  {
    heading: 'Tài nguyên',
    items: [
      { title: 'Thư viện ảnh', description: 'Bộ sưu tập ảnh chất lượng cao', href: '/gallery' },
      { title: 'Video & Vlog', description: 'Hành trình thực tế', href: '/videos' },
      { title: 'Bản tin', description: 'Newsletter hàng tuần', href: '/newsletter', badge: 'Miễn phí' },
    ],
  },
  {
    heading: 'Công cụ',
    items: [
      { title: 'Tính chi phí', description: 'Dự toán ngân sách chuyến đi', href: '/tools/budget' },
      { title: 'Checklist hành lý', description: 'Không bỏ sót đồ quan trọng', href: '/tools/packing' },
      { title: 'Deals & Voucher', description: 'Ưu đãi khách sạn, tour', href: '/deals' },
    ],
  },
]

const primaryLinks: NavItem[] = [
  { title: 'Trang chủ', href: '/' },
  { title: 'Bài viết mới', href: '/#latest' },
  { title: 'Bộ sưu tập', href: '/collections' },
]

function NavDropdown({ title, sections }: { title: string; sections: DropdownSection[] }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFocus = () => setIsOpen(true)
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null
    if (!event.currentTarget.contains(next)) {
      setIsOpen(false)
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <button
        className="flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-slate-600 transition hover:text-[#92B9E3] focus:outline-none"
        aria-expanded={isOpen}
      >
        {title}
        <svg className={`w-4 h-4 transition ${isOpen ? 'rotate-180 text-[#92B9E3]' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`absolute left-0 top-full pt-4 w-[520px] z-40 transition duration-200 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
        }`}
      >
        <div className="rounded-3xl bg-white/90 border border-white shadow-xl shadow-[#92B9E3]/10 p-6 grid grid-cols-2 gap-6 backdrop-blur-xl">
          {sections.map(section => (
            <div key={section.heading}>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{section.heading}</p>
              <div className="space-y-3">
                {section.items.map(item => (
                  <Link key={item.title} href={item.href} className="block rounded-xl p-3 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                      {item.badge && (
                        <span className="text-[10px] uppercase font-semibold text-white bg-[#FBA2D0] px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-slate-500 mt-1 leading-5">{item.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="relative text-sm">
      <div className="hidden lg:flex items-center gap-3 rounded-full border border-white bg-white/60 px-4 py-2 shadow-sm shadow-[#92B9E3]/10">
        {primaryLinks.map(link => (
          <Link
            key={link.title}
            href={link.href}
            className="rounded-full px-3 py-1 text-slate-500 hover:text-[#92B9E3] transition"
          >
            {link.title}
          </Link>
        ))}
        <NavDropdown title="Chuyên mục" sections={categorySections} />
        <NavDropdown title="Điểm đến" sections={destinationSections} />
        <NavDropdown title="Tài nguyên" sections={resourceSections} />
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#92B9E3]/40 text-sm font-semibold text-[#92B9E3] hover:text-white hover:bg-gradient-to-r hover:from-[#92B9E3] hover:to-[#FBA2D0] transition"
        >
          🔍 Tìm kiếm
        </Link>
      </div>

      <button
        type="button"
        className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 text-sm font-semibold"
        onClick={() => setMobileOpen(prev => !prev)}
      >
        Menu
        <svg
          className={`w-4 h-4 transition ${mobileOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="lg:hidden absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 space-y-4 z-40">
          {primaryLinks.map(link => (
            <Link
              key={link.title}
              href={link.href}
              className="block text-gray-700 font-semibold hover:text-[#92B9E3]"
            >
              {link.title}
            </Link>
          ))}

          {[
            { title: 'Chuyên mục', sections: categorySections },
            { title: 'Điểm đến', sections: destinationSections },
            { title: 'Tài nguyên', sections: resourceSections },
          ].map(group => (
            <div key={group.title}>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">{group.title}</p>
              <div className="space-y-2">
                {group.sections.flatMap(section => section.items).map(item => (
                  <Link key={`${group.title}-${item.title}`} href={item.href} className="block text-sm text-slate-700">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/search"
            className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 rounded-full border border-[#92B9E3]/40 text-sm font-semibold text-[#92B9E3] hover:text-white hover:bg-gradient-to-r hover:from-[#92B9E3] hover:to-[#FBA2D0]"
          >
            🔍 Tìm kiếm bài viết
          </Link>
        </div>
      )}
    </div>
  )
}


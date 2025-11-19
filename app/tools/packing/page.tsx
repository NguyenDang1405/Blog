'use client'

import { useState } from 'react'

const items = [
  { name: 'Hộ chiếu/CMND + bản sao', category: 'Giấy tờ' },
  { name: 'Vé máy bay / booking khách sạn', category: 'Giấy tờ' },
  { name: 'Thẻ tín dụng + tiền mặt', category: 'Giấy tờ' },
  { name: 'Áo khoác nhẹ / áo mưa', category: 'Trang phục' },
  { name: 'Giày sneakers/trekking', category: 'Trang phục' },
  { name: 'Bộ skincare mini', category: 'Cá nhân' },
  { name: 'Thuốc cơ bản & vitamin', category: 'Cá nhân' },
  { name: 'Adapter, dây sạc, pin dự phòng', category: 'Thiết bị' },
  { name: 'Tai nghe khử ồn', category: 'Thiết bị' },
  { name: 'Sổ tay / Kindle', category: 'Giải trí' },
]

export default function PackingToolPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleItem = (name: string) => {
    setCheckedItems(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const progress = Math.round((Object.values(checkedItems).filter(Boolean).length / items.length) * 100)

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Travel Tool</p>
      <h1 className="text-4xl font-bold text-slate-900 mt-4">Checklist hành lý thông minh</h1>
      <p className="text-slate-600 mt-4">
        Đánh dấu những món đã xếp vào vali. Checklist chia theo nhóm giúp bạn không bỏ sót món quan trọng.
      </p>

      <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-6 shadow-lg shadow-[#92B9E3]/10">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-slate-900">Tiến độ chuẩn bị</p>
          <span className="text-sm text-slate-500">{progress}% done</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#92B9E3] to-[#FBA2D0]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-10 grid gap-4">
        {items.map(item => (
          <label
            key={item.name}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm cursor-pointer hover:border-[#92B9E3]/40 transition"
          >
            <input
              type="checkbox"
              checked={Boolean(checkedItems[item.name])}
              onChange={() => toggleItem(item.name)}
              className="h-5 w-5 rounded-lg border-2 border-[#92B9E3] text-[#92B9E3] focus:ring-[#92B9E3]"
            />
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{item.category}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}


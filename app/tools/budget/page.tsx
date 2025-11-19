'use client'

import { useState } from 'react'

type ExpenseItem = {
  label: string
  value: number
}

export default function BudgetToolPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { label: 'Vé máy bay', value: 450 },
    { label: 'Khách sạn', value: 300 },
    { label: 'Ăn uống & cafe', value: 180 },
    { label: 'Di chuyển nội địa', value: 90 },
    { label: 'Hoạt động', value: 120 },
  ])

  const total = expenses.reduce((sum, item) => sum + item.value, 0)

  const updateExpense = (index: number, value: number) => {
    setExpenses(prev => prev.map((item, i) => (i === index ? { ...item, value } : item)))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold text-[#92B9E3] uppercase tracking-[0.3em]">Travel Tool</p>
      <h1 className="text-4xl font-bold text-slate-900 mt-4">Tính chi phí chuyến đi</h1>
      <p className="text-slate-600 mt-4">
        Nhập dự toán cho từng hạng mục để nắm bức tranh tổng quan. Công cụ sẽ giúp bạn cân đối ngân sách trước khi đặt dịch vụ.
      </p>

      <div className="mt-10 space-y-4">
        {expenses.map((item, index) => (
          <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700">{item.label}</p>
              <input
                type="number"
                min={0}
                value={item.value}
                onChange={e => updateExpense(index, Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#92B9E3]"
              />
            </div>
            <span className="font-semibold text-slate-900">${item.value.toFixed(0)}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#92B9E3] to-[#FBA2D0] text-white p-6 flex items-center justify-between">
        <div>
          <p className="uppercase text-xs tracking-[0.4em] text-white/80">Tổng ngân sách</p>
          <p className="text-4xl font-bold mt-3">${total.toFixed(0)}</p>
        </div>
        <div className="text-sm text-white/90 max-w-sm">
          <p>Tip: Nên dự phòng thêm 10-15% cho các chi phí phát sinh (mua sắm, quà tặng, upgrade dịch vụ...).</p>
        </div>
      </div>
    </div>
  )
}


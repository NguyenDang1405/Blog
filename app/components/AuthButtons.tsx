'use client'

import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'

export default function AuthButtons() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-16"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg h-8 w-20"></div>
      </div>
    )
  }

  if (user) {
    return null // UserMenu sẽ hiển thị thay thế
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-gray-700 hover:text-[#92B9E3] font-medium transition-colors"
      >
        Đăng nhập
      </Link>
      <Link
        href="/register"
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#92B9E3] to-[#FBA2D0] text-white font-semibold rounded-full hover:from-[#7BA3D9] hover:to-[#F99BC6] transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Đăng ký
      </Link>
    </div>
  )
}

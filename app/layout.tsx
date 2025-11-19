import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { AuthProvider } from './contexts/AuthContext'
import Link from 'next/link'
import UserMenu from './components/UserMenu'
import AuthButtons from './components/AuthButtons'
import MainNav from './components/MainNav'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'Một ứng dụng blog đơn giản',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] via-white to-[#FFF5FB]">
              <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
                  <Link href="/" className="flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm shadow-[#92B9E3]/10">
                    <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-[#92B9E3] to-[#FBA2D0] text-white text-sm font-semibold grid place-items-center">
                      B
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                      Travel Journal
                    </div>
                  </Link>

                  <div className="hidden lg:flex flex-1 justify-center">
                    <MainNav />
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <Link href="/create" className="rounded-full bg-gradient-to-r from-white to-[#F0F6FF] border border-white px-4 py-2 shadow-sm shadow-[#92B9E3]/10 hover:-translate-y-0.5 transition">
                      Viết bài
                    </Link>
                    <Link href="/newsletter" className="hidden md:inline-flex rounded-full border border-[#92B9E3]/30 px-4 py-2 text-[#92B9E3] hover:bg-[#92B9E3]/10 transition">
                      Newsletter
                    </Link>
                    <UserMenu />
                    <AuthButtons />
                  </div>
                </div>
              </nav>

              <main>{children}</main>

              <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Đăng ký nhận tin</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                      Nhận những bài viết mới nhất, cập nhật và tin tức qua email
                    </p>
                    <Link
                      href="/newsletter"
                      className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Đăng ký ngay
                    </Link>
                  </div>
                  <div className="mt-8 pt-8 border-t border-blue-400/30 text-center text-blue-100 text-sm">
                    <p>&copy; {new Date().getFullYear()} Blog App. Tất cả quyền được bảo lưu.</p>
                  </div>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { AuthProvider } from './contexts/AuthContext'
import Link from 'next/link'
import UserMenu from './components/UserMenu'
import AuthButtons from './components/AuthButtons'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'Một ứng dụng blog đơn giản',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-[#92B9E3]/10 via-white to-[#FBA2D0]/10">
              <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-[#92B9E3]/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#92B9E3] to-[#FBA2D0] rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">B</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#92B9E3] to-[#FBA2D0] bg-clip-text text-transparent">
                          Blog App
                        </span>
                      </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                      <Link 
                        href="/" 
                        className="text-gray-700 hover:text-[#92B9E3] font-medium transition-colors"
                      >
                        Trang chủ
                      </Link>
                      <UserMenu />
                      <AuthButtons />
                    </div>
                  </div>
                </div>
              </nav>
              <main>
                {children}
              </main>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

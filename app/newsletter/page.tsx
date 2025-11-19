'use client'

import NewsletterForm from '../components/NewsletterForm'
import Link from 'next/link'

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Về trang chủ
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đăng ký nhận tin
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nhận những bài viết mới nhất, cập nhật và tin tức qua email. Chúng tôi sẽ không làm phiền bạn với quá nhiều email.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <NewsletterForm variant="default" />
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cập nhật mới nhất</h3>
            <p className="text-gray-600 text-sm">
              Nhận thông báo về các bài viết mới và nội dung độc quyền
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không spam</h3>
            <p className="text-gray-600 text-sm">
              Chúng tôi chỉ gửi email khi có nội dung thực sự có giá trị
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bảo mật</h3>
            <p className="text-gray-600 text-sm">
              Email của bạn được bảo vệ và bạn có thể hủy đăng ký bất cứ lúc nào
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tần suất gửi email như thế nào?</h3>
              <p className="text-gray-600 text-sm">
                Chúng tôi chỉ gửi email khi có bài viết mới hoặc nội dung quan trọng. Thường là 1-2 lần mỗi tuần.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tôi có thể hủy đăng ký không?</h3>
              <p className="text-gray-600 text-sm">
                Có, bạn có thể hủy đăng ký bất cứ lúc nào bằng cách click vào link hủy đăng ký ở cuối mỗi email.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email của tôi có được chia sẻ không?</h3>
              <p className="text-gray-600 text-sm">
                Không, chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Email của bạn sẽ không bao giờ được chia sẻ với bên thứ ba.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


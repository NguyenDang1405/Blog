# 📝 Blog App - Ứng dụng Blog hiện đại

> Một ứng dụng blog được xây dựng với Next.js 14, Convex, Cloudinary và Tailwind CSS.  
> Hỗ trợ upload ảnh, rich text editor và quản lý nội dung blog chuyên nghiệp.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Convex](https://img.shields.io/badge/Convex-Database-orange?style=flat)](https://convex.dev/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=flat)](https://cloudinary.com/)

---

## 🚀 Tính năng chính

<table>
<tr>
<td width="33%">

### ✨ Tính năng cốt lõi
- 📝 **Tạo bài viết mới** - Rich text editor với TinyMCE
- 🖼️ **Upload ảnh** - Tích hợp Cloudinary cho lưu trữ ảnh
- 📋 **Quản lý bài viết** - Xem, chỉnh sửa, xóa bài viết
- 🔍 **Tìm kiếm** - Tìm kiếm bài viết theo tiêu đề và nội dung
- 🏷️ **Phân loại** - Hệ thống category và tags

</td>
<td width="33%">

### 🎨 Tính năng giao diện
- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **Modern UI** - Giao diện đẹp với Tailwind CSS
- 🌙 **Dark/Light Mode** - Hỗ trợ chế độ sáng/tối
- 🔍 **SEO Optimized** - Tối ưu cho công cụ tìm kiếm

</td>
<td width="33%">

### 🔧 Tính năng kỹ thuật
- ⚡ **Real-time Database** - Convex cho đồng bộ thời gian thực
- 🚀 **Image Upload** - Cloudinary CDN cho hiệu suất cao
- 🛡️ **TypeScript** - Type safety và developer experience tốt
- 🛣️ **App Router** - Next.js 14 App Router mới nhất

</td>
</tr>
</table>

---

## 🛠️ Công nghệ sử dụng

<div align="center">

| Category | Technology | Description |
|----------|------------|-------------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js) | React framework với App Router |
| | ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) | UI library với hooks mới nhất |
| | ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript) | Type safety và IntelliSense |
| | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css) | Utility-first CSS framework |
| **Backend** | ![Convex](https://img.shields.io/badge/Convex-Database-orange?style=flat) | Real-time database và backend functions |
| | ![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=flat) | CDN và image management |
| | ![TinyMCE](https://img.shields.io/badge/TinyMCE-Editor-5A67D8?style=flat) | Rich text editor |
| **Deploy** | ![Vercel](https://img.shields.io/badge/Vercel-Hosting-000?style=flat&logo=vercel) | Hosting và deployment |
| | ![Git](https://img.shields.io/badge/Git-Version_Control-F05032?style=flat&logo=git) | Version control |
| | ![npm](https://img.shields.io/badge/npm-Package_Manager-CB3837?style=flat&logo=npm) | Package management |

</div>

---

## 📦 Cài đặt

### 📋 Yêu cầu hệ thống:
- **Node.js** 18+ 
- **npm** hoặc **yarn**

### 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/NguyenDang1405/Blog.git
cd Blog

# 2. Cài đặt dependencies
npm install

# 3. Thiết lập Convex
npm install -g convex
convex login
convex dev

# 4. Tạo file .env.local (xem bên dưới)

# 5. Chạy ứng dụng
npm run dev
```

### ⚙️ Cấu hình Environment

Tạo file `.env.local` trong thư mục gốc:

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
CONVEX_DEPLOY_KEY=your_deploy_key_here

# Cloudinary Configuration (cho upload ảnh)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 🔧 Thiết lập Cloudinary (tùy chọn)

1. **Đăng ký tài khoản** tại [Cloudinary](https://cloudinary.com/)
2. **Lấy thông tin API** từ Dashboard → Settings → Security
3. **Cập nhật** các giá trị trong `.env.local`

### 🧪 Test Upload ảnh

Truy cập [http://localhost:3000/test-upload](http://localhost:3000/test-upload) để test tính năng upload ảnh.

---

## 🚀 Deploy

### Deploy nhanh:
1. **Convex**: `convex deploy`
2. **Vercel**: `vercel --prod`

Xem hướng dẫn chi tiết trong [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📁 Cấu trúc Project

```
Blog/
├── app/                           # Next.js App Router
│   ├── api/                       # API Routes
│   │   ├── upload/                # Upload ảnh API
│   │   └── test-upload/           # Test API
│   ├── components/                # React Components
│   │   ├── ImageUpload.tsx        # Upload ảnh component
│   │   ├── RichTextEditor.tsx     # TinyMCE editor
│   │   └── SimpleImageUpload.tsx  # Simple upload component
│   ├── create/                    # Tạo bài viết mới
│   │   └── page.tsx
│   ├── edit/[id]/                 # Chỉnh sửa bài viết
│   │   └── page.tsx
│   ├── post/[id]/                 # Chi tiết bài viết
│   │   └── page.tsx
│   ├── test-upload/               # Test upload ảnh
│   │   └── page.tsx
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Trang chủ
├── convex/                        # Convex backend
│   ├── schema.ts                  # Database schema
│   ├── posts.ts                   # API functions
│   ├── categories.ts              # Categories API
│   └── client.ts                  # Convex client config
├── components/                     # Legacy components
├── pages/                         # Legacy pages (Pages Router)
├── public/                        # Static files
├── .env.local                     # Environment variables
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
├── next.config.js                 # Next.js config
├── tailwind.config.js             # Tailwind config
└── README.md                      # Documentation
```

---

## 🎯 Cách sử dụng

### ✍️ Tạo bài viết mới:
1. Click nút "Viết bài mới" trên navigation
2. Điền thông tin cơ bản (tiêu đề, tác giả)
3. Upload ảnh đại diện (tùy chọn)
4. Sử dụng rich text editor để viết nội dung
5. Thêm category và tags
6. Click "Xuất bản bài viết"

### 📖 Xem và quản lý bài viết:
1. **Trang chủ**: Xem danh sách tất cả bài viết
2. **Chi tiết**: Click "Đọc thêm" để xem toàn bộ nội dung
3. **Chỉnh sửa**: Click "Chỉnh sửa" để sửa bài viết
4. **Tìm kiếm**: Sử dụng thanh tìm kiếm để tìm bài viết

### 🖼️ Upload ảnh:
1. **Trong editor**: Click biểu tượng ảnh trong TinyMCE
2. **Test upload**: Truy cập `/test-upload` để test riêng
3. **Drag & drop**: Kéo thả ảnh vào vùng upload
4. **Tự động resize**: Ảnh sẽ được tối ưu tự động

---

## 🔧 Development

### Scripts có sẵn:
```bash
npm run dev          # Chạy development server
npm run build        # Build cho production
npm run start        # Chạy production server
npm run lint         # Chạy ESLint
```

### Convex commands:
```bash
convex dev           # Chạy Convex development
convex deploy        # Deploy Convex functions
convex logs          # Xem logs
```

---

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **Convex connection failed**:
   - Kiểm tra `NEXT_PUBLIC_CONVEX_URL` trong `.env.local`
   - Đảm bảo Convex project đã được deploy
   - Chạy `convex dev` để khởi động Convex

2. **Cloudinary upload failed**:
   - Kiểm tra các biến môi trường Cloudinary
   - Đảm bảo API key và secret đúng
   - Test tại `/test-upload` để debug

3. **TinyMCE plugins 404**:
   - Đã được sửa bằng cách loại bỏ plugins không cần thiết
   - Nếu vẫn lỗi, kiểm tra network connection

4. **Build failed**:
   - Chạy `npm run build` để kiểm tra lỗi
   - Kiểm tra TypeScript errors
   - Đảm bảo tất cả dependencies đã được cài đặt

5. **Styling không hiển thị**:
   - Kiểm tra Tailwind CSS đã được cấu hình đúng
   - Đảm bảo `globals.css` được import
   - Restart development server

---

## 📚 Tài liệu tham khảo

### Core Technologies:
- [Next.js 14 Documentation](https://nextjs.org/docs) - App Router, API Routes
- [Convex Documentation](https://docs.convex.dev/) - Real-time database
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/docs/) - Type safety

### Third-party Services:
- [Cloudinary Documentation](https://cloudinary.com/documentation) - Image management
- [TinyMCE Documentation](https://www.tiny.cloud/docs/) - Rich text editor
- [Vercel Documentation](https://vercel.com/docs) - Deployment

### Development Tools:
- [Git Documentation](https://git-scm.com/doc) - Version control
- [npm Documentation](https://docs.npmjs.com/) - Package management

---

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📞 Liên hệ

Nếu có câu hỏi hoặc cần hỗ trợ, hãy tạo issue trên GitHub.

---

<div align="center">

**⭐ Nếu project này hữu ích, hãy cho một star nhé! ⭐**

</div>
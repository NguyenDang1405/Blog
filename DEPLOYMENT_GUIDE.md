# Hướng dẫn Deploy Blog App lên Vercel và Convex

## Tổng quan
Ứng dụng blog này được xây dựng với:
- **Frontend**: Next.js 14 với TypeScript
- **Database**: Convex (Real-time database)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 2 Chức năng chính
1. **Tạo bài viết mới** - Cho phép người dùng viết và lưu bài viết
2. **Xem danh sách bài viết** - Hiển thị tất cả bài viết đã tạo

## Bước 1: Chuẩn bị môi trường

### 1.1 Cài đặt Node.js
- Tải và cài đặt Node.js từ [nodejs.org](https://nodejs.org/)
- Kiểm tra: `node --version` và `npm --version`

### 1.2 Cài đặt dependencies
```bash
cd D:\Project\Blog
npm install
```

## Bước 2: Thiết lập Convex Database

### 2.1 Cài đặt Convex CLI
```bash
npm install -g convex
```

### 2.2 Đăng nhập Convex
```bash
convex login
```

### 2.3 Khởi tạo Convex project
```bash
convex dev
```
- Lệnh này sẽ tạo file `convex.json` và `.env.local`
- Lưu lại URL và deploy key từ output

### 2.4 Cấu hình environment variables
Tạo file `.env.local` với nội dung:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
CONVEX_DEPLOY_KEY=your_deploy_key_here
```

### 2.5 Deploy Convex schema
```bash
convex deploy
```

## Bước 3: Deploy lên Vercel

### 3.1 Cài đặt Vercel CLI
```bash
npm install -g vercel
```

### 3.2 Đăng nhập Vercel
```bash
vercel login
```

### 3.3 Deploy project
```bash
vercel
```
- Chọn project settings theo hướng dẫn
- Vercel sẽ tự động detect Next.js project

### 3.4 Cấu hình Environment Variables trên Vercel
1. Vào Vercel Dashboard
2. Chọn project của bạn
3. Vào Settings > Environment Variables
4. Thêm các biến:
   - `NEXT_PUBLIC_CONVEX_URL`: URL từ Convex
   - `CONVEX_DEPLOY_KEY`: Deploy key từ Convex

### 3.5 Redeploy
```bash
vercel --prod
```

## Bước 4: Kiểm tra ứng dụng

### 4.1 Truy cập ứng dụng
- Mở URL được cung cấp bởi Vercel
- Kiểm tra trang chủ hiển thị danh sách bài viết

### 4.2 Test chức năng
1. **Tạo bài viết mới**:
   - Click "Tạo bài viết"
   - Điền thông tin và submit
   - Kiểm tra bài viết xuất hiện trên trang chủ

2. **Xem chi tiết bài viết**:
   - Click "Đọc thêm" trên bất kỳ bài viết nào
   - Kiểm tra trang chi tiết hiển thị đúng

## Bước 5: Cấu hình Production

### 5.1 Cập nhật Convex cho Production
```bash
convex deploy --prod
```

### 5.2 Cấu hình Custom Domain (Tùy chọn)
1. Vào Vercel Dashboard
2. Settings > Domains
3. Thêm domain của bạn

## Troubleshooting

### Lỗi thường gặp:

1. **Convex connection failed**:
   - Kiểm tra `NEXT_PUBLIC_CONVEX_URL` trong environment variables
   - Đảm bảo Convex project đã được deploy

2. **Build failed trên Vercel**:
   - Kiểm tra TypeScript errors: `npm run build`
   - Kiểm tra environment variables

3. **Database không hoạt động**:
   - Kiểm tra Convex schema đã được deploy
   - Kiểm tra functions trong `convex/posts.ts`

### Debug commands:
```bash
# Kiểm tra build local
npm run build

# Test Convex connection
convex dev

# Kiểm tra Vercel deployment
vercel logs
```

## Cấu trúc Project

```
D:\Project\Blog\
├── app/                    # Next.js App Router
│   ├── page.tsx           # Trang chủ
│   ├── create/             # Tạo bài viết
│   └── post/[id]/         # Chi tiết bài viết
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── posts.ts           # API functions
│   └── client.ts          # Convex client
├── package.json
├── next.config.js
├── tailwind.config.js
└── DEPLOYMENT_GUIDE.md
```

## Tính năng nâng cao (Tùy chọn)

### Thêm Authentication
```bash
npm install convex-auth
```

### Thêm Image Upload
```bash
npm install convex-file-storage
```

### Thêm Real-time Comments
- Sử dụng Convex subscriptions
- Thêm comment schema và functions

## Liên kết hữu ích

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

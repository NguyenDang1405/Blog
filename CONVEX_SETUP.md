# Hướng dẫn cấu hình Convex Cloud

## Bước 1: Tạo tài khoản Convex

1. Truy cập [convex.dev](https://convex.dev)
2. Click "Sign Up" hoặc "Get Started"
3. Đăng nhập bằng GitHub hoặc email

## Bước 2: Tạo project mới

1. Vào [Convex Dashboard](https://dashboard.convex.dev)
2. Click "New Project"
3. Đặt tên project: `blog-app` (hoặc tên bạn muốn)
4. Chọn region gần nhất (ví dụ: Asia Pacific)
5. Click "Create Project"

## Bước 3: Cài đặt Convex CLI

```bash
npm install -g convex
```

## Bước 4: Đăng nhập và kết nối project

```bash
# Đăng nhập Convex
convex login

# Kết nối với project (chạy trong thư mục D:\Project\Blog)
convex dev
```

## Bước 5: Lấy thông tin cấu hình

Sau khi chạy `convex dev`, bạn sẽ thấy output như này:

```
✅ Convex functions ready!

Your deployment URL: https://your-deployment-name.convex.cloud
Deploy key: cvx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Bước 6: Tạo file .env.local

1. Copy file `env.example` thành `.env.local`:
```bash
copy env.example .env.local
```

2. Mở file `.env.local` và thay thế các giá trị:

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://scintillating-gerbil-351.convex.cloud
CONVEX_DEPLOY_KEY=cvx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Lưu ý**: Thay thế `your-deployment-name` và `cvx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` bằng giá trị thực từ output của `convex dev`

## Bước 7: Deploy schema và functions

```bash
# Deploy cho development
convex dev

# Deploy cho production
convex deploy
```

## Bước 8: Kiểm tra kết nối

1. Chạy ứng dụng:
```bash
npm run dev
```

2. Mở [http://localhost:3000](http://localhost:3000)
3. Kiểm tra console không có lỗi Convex

## Cấu trúc Environment Variables

### Development (.env.local)
```env
NEXT_PUBLIC_CONVEX_URL=https://your-dev-deployment.convex.cloud
CONVEX_DEPLOY_KEY=cvx_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Production (Vercel Environment Variables)
```env
NEXT_PUBLIC_CONVEX_URL=https://your-prod-deployment.convex.cloud
CONVEX_DEPLOY_KEY=cvx_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Troubleshooting

### Lỗi "Convex connection failed"
1. Kiểm tra `NEXT_PUBLIC_CONVEX_URL` có đúng không
2. Đảm bảo Convex project đã được deploy
3. Kiểm tra network connection

### Lỗi "Invalid deploy key"
1. Kiểm tra `CONVEX_DEPLOY_KEY` có đúng không
2. Đảm bảo deploy key chưa hết hạn
3. Tạo deploy key mới nếu cần

### Lỗi "Schema not found"
1. Chạy `convex deploy` để deploy schema
2. Kiểm tra file `convex/schema.ts` có đúng không

## Commands hữu ích

```bash
# Xem status của deployment
convex status

# Xem logs
convex logs

# Deploy chỉ schema
convex deploy --only-schema

# Deploy chỉ functions
convex deploy --only-functions

# Xem dashboard
convex dashboard
```

## Cấu hình cho Vercel

Khi deploy lên Vercel, thêm các environment variables sau:

1. Vào Vercel Dashboard
2. Chọn project của bạn
3. Vào Settings > Environment Variables
4. Thêm:
   - `NEXT_PUBLIC_CONVEX_URL`: URL từ Convex
   - `CONVEX_DEPLOY_KEY`: Deploy key từ Convex

## Liên kết hữu ích

- [Convex Documentation](https://docs.convex.dev/)
- [Convex Dashboard](https://dashboard.convex.dev)
- [Convex CLI Reference](https://docs.convex.dev/cli)

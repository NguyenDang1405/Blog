# 🚀 Hướng dẫn Deploy Blog lên Vercel

## ✅ **Đã sửa lỗi:**

### **1. Convex Users Function:**
```typescript
// ❌ Lỗi cũ
if (existingUser) {
  throw new Error("Email đã được sử dụng");
}

// ✅ Đã sửa
if (existingUser) {
  // Nếu user đã tồn tại, trả về ID hiện tại
  return existingUser._id;
}
```

### **2. Logic Authentication:**
- ✅ **Email đã tồn tại** - Trả về user hiện tại thay vì throw error
- ✅ **Email mới** - Tạo user mới
- ✅ **Seamless login** - Không cần phân biệt đăng ký/đăng nhập

## 🚀 **Các bước Deploy:**

### **1. Chuẩn bị Repository:**
```bash
# Đảm bảo code đã được commit
git add .
git commit -m "Fix authentication and ready for deploy"
git push origin main
```

### **2. Deploy lên Vercel:**

#### **Option A: Vercel CLI**
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy
vercel --prod
```

#### **Option B: Vercel Dashboard**
1. Truy cập [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import từ GitHub repository
4. Cấu hình build settings

### **3. Environment Variables:**

#### **Trong Vercel Dashboard:**
```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CONVEX_DEPLOYMENT_KEY=your_deployment_key
NEXT_PUBLIC_TINYMCE_API_KEY=your_tinymce_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### **4. Convex Deployment:**
```bash
# Deploy Convex functions
npx convex deploy --prod
```

## 🔧 **Cấu hình Production:**

### **1. Convex Production:**
```bash
# Tạo production deployment
npx convex deploy --prod

# Lấy production URL
npx convex env
```

### **2. Environment Variables:**
```bash
# .env.production
NEXT_PUBLIC_CONVEX_URL=https://your-production-url.convex.cloud
NEXT_PUBLIC_CONVEX_DEPLOYMENT_KEY=your-production-key
```

### **3. Build Settings:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

## 🎯 **Kiểm tra sau Deploy:**

### **1. Test Authentication:**
- ✅ **Đăng ký** - Tạo user mới
- ✅ **Đăng nhập** - Với email đã tồn tại
- ✅ **Profile** - Hiển thị thông tin user
- ✅ **Logout** - Đăng xuất thành công

### **2. Test Blog Features:**
- ✅ **Tạo bài viết** - Chỉ user đã đăng nhập
- ✅ **Chỉnh sửa** - Chỉ chủ sở hữu
- ✅ **Xóa bài viết** - Chỉ chủ sở hữu
- ✅ **Hiển thị bài viết** - Tất cả user

### **3. Test TinyMCE:**
- ✅ **Editor load** - Không có lỗi API key
- ✅ **Image upload** - Hoạt động với Cloudinary
- ✅ **Content display** - Hiển thị đúng format

## 🔍 **Troubleshooting:**

### **1. Nếu lỗi Convex:**
```bash
# Kiểm tra Convex status
npx convex status

# Restart Convex
npx convex dev --once
```

### **2. Nếu lỗi Environment:**
```bash
# Kiểm tra env variables
vercel env ls

# Thêm env variable
vercel env add NEXT_PUBLIC_CONVEX_URL
```

### **3. Nếu lỗi Build:**
```bash
# Test build locally
npm run build

# Kiểm tra TypeScript
npx tsc --noEmit
```

## 📝 **Checklist Deploy:**

### **✅ Pre-deploy:**
- [ ] Code đã được commit và push
- [ ] Build thành công locally
- [ ] Convex functions hoạt động
- [ ] Environment variables đã cấu hình

### **✅ Post-deploy:**
- [ ] Website load được
- [ ] Authentication hoạt động
- [ ] Blog features hoạt động
- [ ] TinyMCE editor hoạt động
- [ ] Image upload hoạt động

## 🎉 **Kết quả mong đợi:**

### **✅ Production URL:**
```
https://your-blog-app.vercel.app
```

### **✅ Features hoạt động:**
- ✅ **Authentication** - Đăng ký/đăng nhập
- ✅ **Authorization** - Phân quyền user
- ✅ **Blog CRUD** - Tạo/sửa/xóa bài viết
- ✅ **Rich Editor** - TinyMCE với image upload
- ✅ **Responsive** - Hoạt động trên mọi thiết bị

Bây giờ blog của bạn đã sẵn sàng cho production! 🚀

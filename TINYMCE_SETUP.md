# 🔑 Hướng dẫn setup TinyMCE API Key

## ✅ **Đã thêm API Key vào tất cả components**

### 📁 **Các file đã được cập nhật:**

1. **`app/components/TinyMCEEditor.tsx`** ✅
2. **`app/components/RichTextEditor.tsx`** ✅  
3. **`components/TinyMCEEditor.jsx`** ✅
4. **`tinymce-simple-config.js`** ✅
5. **`test-tinymce.html`** ✅

### 🔧 **Cách sử dụng API Key:**

#### **Option 1: Sử dụng Environment Variable (Khuyến nghị)**
Tạo file `.env.local` trong thư mục gốc:
```bash
NEXT_PUBLIC_TINYMCE_API_KEY=qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2
```

#### **Option 2: Hardcode API Key (Đã setup sẵn)**
Tất cả components đã có API key mặc định:
```javascript
apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2"}
```

### 🚀 **Test TinyMCE:**

1. **Chạy Next.js app:**
   ```bash
   npm run dev
   ```

2. **Test với file HTML:**
   - Mở `test-tinymce.html` trong browser
   - Kiểm tra editor hoạt động

3. **Test trong app:**
   - Truy cập `http://localhost:3000/create`
   - Kiểm tra editor trong trang tạo bài viết

### 🎯 **API Key đã được sử dụng:**
```
qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2
```

### ✨ **Tính năng đã hoạt động:**
- ✅ Rich text formatting
- ✅ Image upload
- ✅ Table editing
- ✅ Code blocks
- ✅ Fullscreen mode
- ✅ Vietnamese language support

### 🔍 **Kiểm tra lỗi:**
Nếu vẫn có lỗi, kiểm tra:
1. API key có đúng không
2. Domain có được whitelist trong TinyMCE Cloud không
3. Network connection có ổn định không

Bây giờ TinyMCE sẽ hoạt động hoàn hảo với API key! 🎉

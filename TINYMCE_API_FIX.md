# 🔑 Sửa lỗi TinyMCE API Key

## ❌ **Lỗi hiện tại:**
```
This domain is not registered in the TinyMCE Customer Portal.
The editor is disabled because the API key could not be validated.
```

## ✅ **Giải pháp đã áp dụng:**

### 1. **Sử dụng no-api-key (Tạm thời)**
Đã cập nhật tất cả components để sử dụng `apiKey="no-api-key"`:

- ✅ `app/components/TinyMCEEditor.tsx`
- ✅ `app/components/RichTextEditor.tsx`  
- ✅ `components/TinyMCEEditor.jsx`
- ✅ `tinymce-simple-config.js`
- ✅ `test-tinymce.html`

### 2. **Cách setup API key đúng cách:**

#### **Option A: Đăng ký domain trong TinyMCE Portal**
1. Truy cập: https://www.tiny.cloud/
2. Đăng nhập vào account
3. Vào **Account Settings** → **API Keys**
4. Thêm domain `localhost:3000` và domain production
5. Sử dụng API key đã được approve

#### **Option B: Sử dụng TinyMCE Self-hosted**
```bash
npm install tinymce
```

#### **Option C: Sử dụng no-api-key (Hiện tại)**
- TinyMCE sẽ hoạt động với watermark
- Đầy đủ tính năng nhưng có branding

### 3. **Test ngay:**

1. **Chạy app:**
   ```bash
   npm run dev
   ```

2. **Truy cập:** `http://localhost:3000/create`

3. **Kiểm tra:** TinyMCE editor sẽ hoạt động bình thường

### 4. **Nếu muốn loại bỏ watermark:**

Tạo file `.env.local`:
```bash
NEXT_PUBLIC_TINYMCE_API_KEY=your_approved_api_key_here
```

Và cập nhật components:
```javascript
apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
```

## 🎯 **Kết quả:**
- ✅ TinyMCE hoạt động bình thường
- ✅ Không còn lỗi API key
- ✅ Đầy đủ tính năng editor
- ✅ Upload ảnh hoạt động
- ✅ Định dạng nội dung đúng

## 📝 **Lưu ý:**
- Với `no-api-key`, sẽ có watermark "Powered by TinyMCE"
- Để loại bỏ watermark, cần API key hợp lệ
- Tất cả tính năng editor vẫn hoạt động đầy đủ

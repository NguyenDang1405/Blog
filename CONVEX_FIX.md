# 🔧 Khắc phục lỗi Convex - "Could not find public function"

## ❌ **Lỗi hiện tại:**
```
[CONVEX M(users:createUser)] [Request ID: a33cf7d4ac633fb6] Server Error 
Could not find public function for 'users:createUser'. 
Did you forget to run `npx convex dev` or `npx convex deploy`?
```

## ✅ **Giải pháp:**

### **1. Chạy Convex Dev Server:**
```bash
cd D:\Project\Blog
npx convex dev
```

### **2. Kiểm tra Convex Status:**
```bash
npx convex status
```

### **3. Nếu cần deploy:**
```bash
npx convex deploy
```

## 🔍 **Nguyên nhân lỗi:**

### **1. Convex Dev chưa chạy:**
- Convex functions chưa được load
- Database chưa được khởi tạo
- API endpoints chưa sẵn sàng

### **2. Schema chưa được sync:**
- Database schema chưa được cập nhật
- Functions chưa được generate
- Types chưa được tạo

### **3. Network issues:**
- Kết nối internet không ổn định
- Convex dashboard chưa accessible
- Authentication issues

## 🚀 **Các bước khắc phục:**

### **Bước 1: Kiểm tra Convex**
```bash
# Kiểm tra Convex đã cài đặt chưa
npm list convex

# Nếu chưa có, cài đặt
npm install convex
```

### **Bước 2: Chạy Convex Dev**
```bash
# Chạy Convex development server
npx convex dev

# Hoặc chạy trong background
npx convex dev --once
```

### **Bước 3: Kiểm tra Functions**
```bash
# Kiểm tra functions đã được generate
ls convex/_generated/

# Kiểm tra API file
cat convex/_generated/api.d.ts
```

### **Bước 4: Restart nếu cần**
```bash
# Dừng Convex dev
Ctrl + C

# Chạy lại
npx convex dev
```

## 🔧 **Troubleshooting:**

### **1. Nếu vẫn lỗi:**
```bash
# Clear Convex cache
rm -rf convex/_generated/
npx convex dev
```

### **2. Nếu schema lỗi:**
```bash
# Kiểm tra schema syntax
npx convex dev --once
```

### **3. Nếu network lỗi:**
```bash
# Kiểm tra kết nối
ping convex.dev
```

## 📝 **Lưu ý:**

### **1. Convex Dev phải chạy:**
- Luôn chạy `npx convex dev` khi development
- Không tắt terminal chạy Convex
- Kiểm tra status thường xuyên

### **2. Functions phải được export:**
```typescript
// convex/users.ts
export const createUser = mutation({...})
export const getUserByEmail = query({...})
```

### **3. API phải được generate:**
- File `convex/_generated/api.d.ts` phải tồn tại
- Functions phải có trong API
- Types phải được generate

## 🎯 **Kết quả mong đợi:**

Sau khi chạy `npx convex dev`:
- ✅ Convex dashboard accessible
- ✅ Functions được load
- ✅ Database schema được sync
- ✅ API endpoints sẵn sàng
- ✅ Authentication hoạt động

## 🚨 **Nếu vẫn lỗi:**

1. **Kiểm tra Convex config:**
   ```bash
   cat convex.json
   ```

2. **Kiểm tra environment:**
   ```bash
   cat .env.local
   ```

3. **Restart toàn bộ:**
   ```bash
   # Dừng tất cả
   Ctrl + C
   
   # Xóa node_modules
   rm -rf node_modules
   npm install
   
   # Chạy lại
   npx convex dev
   ```

Bây giờ hãy chạy `npx convex dev` và thử lại đăng ký! 🚀

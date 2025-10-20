# 🔐 Hệ thống Phân quyền - Blog App

## ✅ **Đã hoàn thành:**

### 🏗️ **Cấu trúc phân quyền:**

#### **1. Database Schema:**
- ✅ **Posts table** - Thêm `userId` để lưu chủ sở hữu
- ✅ **Users table** - Quản lý thông tin user và role
- ✅ **Indexes** - Tối ưu truy vấn theo userId

#### **2. Backend Functions:**
- ✅ **createPost** - Yêu cầu userId, chỉ user đã đăng nhập
- ✅ **updatePost** - Kiểm tra quyền sở hữu trước khi cập nhật
- ✅ **deletePost** - Chỉ chủ sở hữu mới được xóa
- ✅ **getPostsByUser** - Lấy bài viết của user cụ thể
- ✅ **checkPostOwnership** - Kiểm tra quyền sở hữu

#### **3. Frontend Protection:**
- ✅ **ProtectedRoute** - Bảo vệ routes yêu cầu đăng nhập
- ✅ **Ownership checks** - Kiểm tra quyền sở hữu trong UI
- ✅ **Conditional rendering** - Chỉ hiển thị nút cho chủ sở hữu

### 🎯 **Tính năng phân quyền:**

#### **1. Tạo bài viết:**
```typescript
// Chỉ user đã đăng nhập mới được tạo bài viết
if (!user) {
  throw new Error('Bạn cần đăng nhập để tạo bài viết')
}

await createPost({
  title,
  content,
  author,
  userId: user._id, // Lưu userId
  // ... other fields
})
```

#### **2. Chỉnh sửa bài viết:**
```typescript
// Kiểm tra quyền sở hữu
if (post.userId !== args.userId) {
  throw new Error("Bạn không có quyền chỉnh sửa bài viết này")
}
```

#### **3. Xóa bài viết:**
```typescript
// Chỉ chủ sở hữu mới được xóa
if (post.userId !== args.userId) {
  throw new Error("Bạn không có quyền xóa bài viết này")
}
```

#### **4. UI Protection:**
```tsx
// Chỉ hiển thị nút cho chủ sở hữu
{user && post.userId === user._id && (
  <>
    <Link href={`/edit/${post._id}`}>Sửa bài viết</Link>
    <button onClick={handleDelete}>Xóa bài viết</button>
  </>
)}
```

### 🔒 **Bảo mật đã được thực hiện:**

#### **1. Backend Security:**
- ✅ **User ID validation** - Kiểm tra userId trong mọi mutations
- ✅ **Ownership verification** - Xác minh quyền sở hữu trước khi thao tác
- ✅ **Error handling** - Thông báo lỗi rõ ràng khi không có quyền
- ✅ **Database constraints** - Schema đảm bảo tính toàn vẹn

#### **2. Frontend Security:**
- ✅ **Route protection** - Bảo vệ các trang yêu cầu đăng nhập
- ✅ **Conditional UI** - Chỉ hiển thị chức năng cho user có quyền
- ✅ **Loading states** - Xử lý trạng thái loading khi kiểm tra quyền
- ✅ **Error boundaries** - Xử lý lỗi khi không có quyền

#### **3. User Experience:**
- ✅ **Clear messaging** - Thông báo rõ ràng khi không có quyền
- ✅ **Smooth redirects** - Chuyển hướng mượt mà khi cần đăng nhập
- ✅ **Visual indicators** - Hiển thị trạng thái quyền trong UI
- ✅ **Confirmation dialogs** - Xác nhận trước khi xóa

### 🎨 **UI/UX Features:**

#### **1. Conditional Rendering:**
- ✅ **Edit button** - Chỉ hiển thị cho chủ sở hữu
- ✅ **Delete button** - Chỉ hiển thị cho chủ sở hữu
- ✅ **Loading states** - Hiển thị khi đang xử lý
- ✅ **Error messages** - Thông báo lỗi rõ ràng

#### **2. User Feedback:**
- ✅ **Success messages** - Thông báo thành công
- ✅ **Error handling** - Xử lý lỗi gracefully
- ✅ **Loading indicators** - Hiển thị trạng thái loading
- ✅ **Confirmation dialogs** - Xác nhận trước khi xóa

### 📱 **Responsive Design:**
- ✅ **Mobile-first** - Tối ưu cho mobile
- ✅ **Touch-friendly** - Nút bấm dễ dàng trên mobile
- ✅ **Responsive layout** - Layout linh hoạt
- ✅ **Accessibility** - Hỗ trợ accessibility

### 🚀 **Cách sử dụng:**

#### **1. Tạo bài viết:**
```
1. Đăng nhập vào hệ thống
2. Truy cập /create
3. Điền thông tin bài viết
4. Nhấn "Xuất bản bài viết"
```

#### **2. Chỉnh sửa bài viết:**
```
1. Truy cập bài viết của bạn
2. Nhấn "Sửa bài viết" (chỉ hiển thị cho chủ sở hữu)
3. Chỉnh sửa nội dung
4. Nhấn "Cập nhật bài viết"
```

#### **3. Xóa bài viết:**
```
1. Truy cập bài viết của bạn
2. Nhấn "Xóa bài viết" (chỉ hiển thị cho chủ sở hữu)
3. Xác nhận xóa
4. Bài viết sẽ bị xóa vĩnh viễn
```

### 🔍 **Kiểm tra quyền:**

#### **1. Backend Validation:**
- ✅ Mọi mutations đều kiểm tra userId
- ✅ So sánh userId với post.userId
- ✅ Throw error nếu không có quyền
- ✅ Return success nếu có quyền

#### **2. Frontend Validation:**
- ✅ Kiểm tra user đã đăng nhập
- ✅ So sánh user._id với post.userId
- ✅ Ẩn/hiện UI elements dựa trên quyền
- ✅ Redirect nếu không có quyền

## 🎉 **Kết quả:**

Hệ thống phân quyền hoàn chỉnh với:
- ✅ **Bảo mật cao** - Kiểm tra quyền ở cả backend và frontend
- ✅ **UX tốt** - UI/UX mượt mà và trực quan
- ✅ **Error handling** - Xử lý lỗi tốt
- ✅ **Responsive** - Hoạt động trên mọi thiết bị

Bây giờ blog của bạn đã có hệ thống phân quyền hoàn chỉnh! 🚀

# Sửa lỗi TinyMCE trong dự án Blog

## Các vấn đề đã được sửa:

### 1. **Thống nhất cấu hình TinyMCE**
- Tạo file `tinymce-config.ts` để quản lý cấu hình thống nhất
- Loại bỏ việc sử dụng CDN và API key không cần thiết
- Sử dụng package `@tinymce/tinymce-react` thống nhất

### 2. **Sửa lỗi định dạng**
- Cải thiện CSS styling cho nội dung
- Thêm responsive design cho ảnh
- Cải thiện typography và spacing
- Thêm styling cho table, code blocks, blockquotes

### 3. **Cải thiện upload ảnh**
- Sửa lỗi upload ảnh với error handling tốt hơn
- Thêm validation cho file types
- Cải thiện UI feedback khi upload

### 4. **Tối ưu hóa component**
- Giảm code duplication
- Sử dụng cấu hình thống nhất
- Cải thiện performance

## Các file đã được sửa:

1. **`app/components/TinyMCEEditor.tsx`** - Component chính sử dụng TinyMCE
2. **`app/components/RichTextEditor.tsx`** - Component editor nâng cao
3. **`app/components/tinymce-config.ts`** - File cấu hình thống nhất
4. **`app/create/page.tsx`** - Trang tạo bài viết
5. **`app/edit/[id]/page.tsx`** - Trang chỉnh sửa bài viết

## Cách sử dụng:

```tsx
import TinyMCEEditor from '../components/TinyMCEEditor'

// Trong component
<TinyMCEEditor
  value={content}
  onChange={setContent}
  placeholder="Viết nội dung bài viết..."
/>
```

## Tính năng đã được cải thiện:

- ✅ Rich text formatting (bold, italic, underline, strikethrough)
- ✅ Headings (H1-H6)
- ✅ Lists (ordered, unordered)
- ✅ Links và media
- ✅ Tables
- ✅ Code blocks
- ✅ Image upload với drag & drop
- ✅ Fullscreen mode
- ✅ Responsive design
- ✅ Vietnamese language support

## Lưu ý:

- Đảm bảo API upload hoạt động tại `/api/upload`
- Cấu hình có thể được tùy chỉnh trong `tinymce-config.ts`
- Tất cả components đều sử dụng cấu hình thống nhất

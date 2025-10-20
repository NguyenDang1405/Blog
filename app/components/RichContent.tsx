'use client'
import './rich-content.css'

interface RichContentProps {
  content: string
  className?: string
}

export default function RichContent({ content, className = "" }: RichContentProps) {
  // Xử lý nội dung để giữ nguyên định dạng
  const processedContent = content
    // Giữ nguyên các thẻ HTML
    .replace(/\n/g, '<br>') // Chuyển xuống dòng thành <br>
    .replace(/\s{2,}/g, '&nbsp;&nbsp;') // Giữ nguyên khoảng trắng

  return (
    <div 
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

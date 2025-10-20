'use client'
import './rich-content.css'

interface ContentRendererProps {
  content: string
  className?: string
}

export default function ContentRenderer({ content, className = "" }: ContentRendererProps) {
  // Xử lý nội dung để giữ nguyên định dạng
  const processContent = (htmlContent: string) => {
    // Tách nội dung thành các đoạn
    const paragraphs = htmlContent.split(/\n\s*\n/).filter(p => p.trim())
    
    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim()
      
      // Nếu là HTML tag, giữ nguyên
      if (trimmedParagraph.startsWith('<') && trimmedParagraph.endsWith('>')) {
        return trimmedParagraph
      }
      
      // Nếu có xuống dòng trong đoạn, chuyển thành <br>
      const processedParagraph = trimmedParagraph
        .replace(/\n/g, '<br>')
        .replace(/\s{2,}/g, '&nbsp;&nbsp;')
      
      // Wrap trong <p> tag nếu chưa có
      if (!processedParagraph.startsWith('<')) {
        return `<p>${processedParagraph}</p>`
      }
      
      return processedParagraph
    }).join('')
  }

  const processedContent = processContent(content)

  return (
    <div 
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}

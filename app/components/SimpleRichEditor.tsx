'use client'

import { useState } from 'react'

interface SimpleRichEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function SimpleRichEditor({ value, onChange, placeholder }: SimpleRichEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const insertFormat = (format: string) => {
    const textarea = document.getElementById('rich-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    let newText = ''
    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`
        break
      case 'italic':
        newText = `*${selectedText}*`
        break
      case 'underline':
        newText = `<u>${selectedText}</u>`
        break
      case 'link':
        const url = prompt('Nhập URL:')
        if (url) newText = `[${selectedText}](${url})`
        break
      case 'image':
        const imageUrl = prompt('Nhập URL ảnh:')
        if (imageUrl) newText = `![${selectedText}](${imageUrl})`
        break
      case 'heading':
        newText = `# ${selectedText}`
        break
      case 'quote':
        newText = `> ${selectedText}`
        break
      case 'code':
        newText = `\`${selectedText}\``
        break
      case 'list':
        newText = `- ${selectedText}`
        break
    }

    const newValue = value.substring(0, start) + newText + value.substring(end)
    onChange(newValue)
  }

  const renderPreview = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => insertFormat('bold')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => insertFormat('italic')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertFormat('underline')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 underline"
          title="Underline"
        >
          U
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => insertFormat('heading')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Heading"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => insertFormat('quote')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Quote"
        >
          "
        </button>
        <button
          type="button"
          onClick={() => insertFormat('code')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 font-mono"
          title="Code"
        >
          &lt;/&gt;
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => insertFormat('link')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => insertFormat('image')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="Image"
        >
          🖼️
        </button>
        <button
          type="button"
          onClick={() => insertFormat('list')}
          className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100"
          title="List"
        >
          • List
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`px-2 py-1 text-sm border rounded ${
            isPreview 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white border-gray-300 hover:bg-gray-100'
          }`}
        >
          {isPreview ? '✏️ Edit' : '👁️ Preview'}
        </button>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          id="rich-editor"
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder || "Viết nội dung bài viết của bạn... Bạn có thể sử dụng các công cụ định dạng để tạo nội dung phong phú."}
          className={`w-full p-4 min-h-[500px] border-0 resize-none focus:outline-none font-mono text-sm ${isPreview ? 'hidden' : 'block'}`}
          style={{ fontFamily: 'inherit' }}
        />
        {isPreview && (
          <div 
            className="p-4 min-h-[500px] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        )}
      </div>

      {/* Help text */}
      <div className="bg-gray-50 border-t border-gray-200 p-2 text-xs text-gray-600">
        <strong>Markdown shortcuts:</strong> **bold**, *italic*, `code`, # heading, &gt; quote, - list, [link](url), ![image](url)
      </div>
    </div>
  )
}

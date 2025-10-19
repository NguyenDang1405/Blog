'use client'

import { useEffect, useRef } from 'react'

interface TinyMCEEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

declare global {
  interface Window {
    tinymce: any
  }
}

export default function TinyMCEEditor({ value, onChange, placeholder }: TinyMCEEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Load TinyMCE script if not already loaded
    if (!window.tinymce) {
      const script = document.createElement('script')
      script.src = 'https://cdn.tiny.cloud/1/qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2/tinymce/6/tinymce.min.js'
      script.onload = () => {
        initializeEditor()
      }
      document.head.appendChild(script)
    } else {
      initializeEditor()
    }

    return () => {
      if (window.tinymce && isInitialized.current) {
        window.tinymce.remove(`#${editorRef.current?.id}`)
      }
    }
  }, [])

  const initializeEditor = () => {
    if (!editorRef.current || isInitialized.current) return

    window.tinymce.init({
      selector: `#${editorRef.current.id}`,
      // API Key từ TinyMCE Cloud
      api_key: 'qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2',
      plugins: 'lists link image table code help wordcount',
      toolbar: 'undo redo | formatselect | bold italic backcolor color | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help',
      height: 400,
      menubar: 'file edit view', 
      branding: false,
      content_style: `
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
          font-size: 16px; 
          line-height: 1.6;
          color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
          color: #2c3e50;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        p {
          margin-bottom: 1em;
        }
        blockquote {
          border-left: 4px solid #3498db;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #666;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }
        table th, table td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }
        table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        code {
          background-color: #f1f3f4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
        }
        pre {
          background-color: #f8f9fa;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
        }
      `,
      setup: (editor: any) => {
        editor.on('change', () => {
          onChange(editor.getContent())
        })
      },
      file_picker_callback: (cb: any, value: any, meta: any) => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')

        input.addEventListener('change', async (e: any) => {
          const file = e.target.files[0]
          if (!file) return

          try {
            // Upload to Cloudinary
            const formData = new FormData()
            formData.append('file', file)
            
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData
            })
            
            const result = await response.json()
            
            if (result.success) {
              cb(result.url, { title: file.name })
            } else {
              console.error('Upload failed:', result.message)
              alert('Upload ảnh thất bại: ' + result.message)
            }
          } catch (error) {
            console.error('Upload error:', error)
            alert('Lỗi khi upload ảnh')
          }
        })

        input.click()
      }
    })

    isInitialized.current = true
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <textarea
        ref={editorRef}
        id="tinymce-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Viết nội dung bài viết của bạn..."}
        className="w-full p-4 min-h-[400px] border-0 resize-none focus:outline-none"
        style={{ display: 'none' }}
      />
    </div>
  )
}

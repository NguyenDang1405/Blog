'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        apiKey="qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2"
        onInit={(evt: any, editor: any) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline strikethrough | alignleft aligncenter ' +
            'alignright alignjustify | outdent indent |  numlist bullist | ' +
            'forecolor backcolor removeformat | pagebreak | charmap emoticons | ' +
            'fullscreen preview save print | insertfile image media template link anchor codesample | ' +
            'ltr rtl | showcomments addcomment',
          font_family_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
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
          placeholder: placeholder,
          branding: false,
          statusbar: true,
          resize: 'both',
          image_advtab: true,
          images_upload_url: '/api/upload',
          images_upload_base_path: '/uploads',
          images_upload_credentials: true,
          file_picker_types: 'image',
          file_picker_callback: (callback: any, value: any, meta: any) => {
            if (meta.filetype === 'image') {
              const input = document.createElement('input')
              input.setAttribute('type', 'file')
              input.setAttribute('accept', 'image/*')
              
              input.onchange = async function() {
                const file = (this as HTMLInputElement).files?.[0]
                if (file) {
                  const formData = new FormData()
                  formData.append('file', file)
                  
                         try {
                           const response = await fetch('/api/upload', {
                             method: 'POST',
                             body: formData
                           })
                    
                    const result = await response.json()
                    
                    if (result.success) {
                      callback(result.url, { title: file.name })
                    } else {
                      console.error('Upload failed:', result.message)
                    }
                  } catch (error) {
                    console.error('Upload error:', error)
                  }
                }
              }
              
              input.click()
            }
          },
          setup: (editor: any) => {
            editor.on('change', () => {
              onChange(editor.getContent())
            })
            
            // Add custom buttons
            editor.ui.registry.addButton('save', {
              text: 'Lưu',
              onAction: () => {
                console.log('Save button clicked')
              }
            })
          }
        }}
      />
    </div>
  )
}

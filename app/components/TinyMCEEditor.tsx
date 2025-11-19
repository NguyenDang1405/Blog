'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import { tinymceConfig } from './tinymce-config'

interface TinyMCEEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function TinyMCEEditor({ value, onChange, placeholder }: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null)
  
  // Lấy API key từ environment variable
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'
  
  // Debug: log API key (chỉ trong development)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('TinyMCE API Key loaded:', apiKey ? `${apiKey.substring(0, 15)}...` : 'NOT FOUND')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        apiKey={apiKey}
        onInit={(evt: any, editor: any) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={{
          ...tinymceConfig,
          placeholder: placeholder,
          setup: (editor: any) => {
            editor.on('change', () => {
              onChange(editor.getContent())
            })
          }
        }}
      />
    </div>
  )
}

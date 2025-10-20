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

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2"}
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

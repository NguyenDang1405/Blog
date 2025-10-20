'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import { tinymceConfig } from './tinymce-config'

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
        apiKey="no-api-key"
        onInit={(evt: any, editor: any) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={{
          ...tinymceConfig,
          placeholder: placeholder,
          font_family_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
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

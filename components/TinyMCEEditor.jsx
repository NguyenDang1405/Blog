import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCEEditor({ value, onChange, onSave }) {
  const editorRef = useRef(null);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log('Content to save:', content);
      if (onSave) {
        onSave(content);
      }
    }
  };

  return (
    <div className="tinymce-editor">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | save',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
          // Simple image upload handler
          images_upload_handler: async (blobInfo) => {
            try {
              // For now, return a placeholder URL
              const placeholderUrl = `https://via.placeholder.com/400x300/cccccc/666666?text=Image+${Date.now()}`;
              return placeholderUrl;
            } catch (error) {
              console.error('Image upload error:', error);
              return '';
            }
          },
          
          // Enable image uploads
          automatic_uploads: true,
          file_picker_types: 'image',
          
          // Save button configuration
          save_onsavecallback: handleSave,
          
          // Additional configurations
          branding: false,
          promotion: false,
        }}
      />
      
      {/* Save Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu nội dung
        </button>
      </div>
    </div>
  );
}

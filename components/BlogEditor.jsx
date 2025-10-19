import React, { useState } from 'react';
import SimpleEditor from './SimpleEditor';

export default function BlogEditor() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (editorContent) => {
    setIsSaving(true);
    
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: editorContent,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Lưu thành công!');
        console.log('Saved content:', result.data);
      } else {
        alert('Lỗi khi lưu: ' + result.message);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Lỗi khi lưu: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Editor</h1>
      
      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu đề bài viết
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề bài viết..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Simple Editor */}
      <SimpleEditor
        value={content}
        onChange={setContent}
        onSave={handleSave}
      />

      {/* Status */}
      {isSaving && (
        <div className="mt-4 text-blue-600">
          Đang lưu...
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function SimpleEditor({ value, onChange, onSave }) {
  const [content, setContent] = useState(value || '');

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const handleImageUpload = (imageHtml) => {
    const newContent = content + '\n' + imageHtml + '\n';
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  return (
    <div className="simple-editor">
      {/* Image Upload */}
      <ImageUpload onImageUpload={handleImageUpload} />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nội dung bài viết:
        </label>
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập nội dung bài viết của bạn..."
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Lưu nội dung
        </button>
      </div>
    </div>
  );
}

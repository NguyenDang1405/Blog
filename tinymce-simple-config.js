// Cấu hình TinyMCE đã được sửa lỗi
// Sử dụng cấu hình này thay vì code cũ của bạn

tinymce.init({
    selector: 'textarea.tiny-mce',
    // API Key từ TinyMCE Cloud
    api_key: 'qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2',
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
    toolbar: 'undo redo | blocks | ' +
        'bold italic underline strikethrough | alignleft aligncenter ' +
        'alignright alignjustify | outdent indent | numlist bullist | ' +
        'forecolor backcolor removeformat | charmap | ' +
        'fullscreen preview | insertfile image media link anchor | ' +
        'ltr rtl',
    height: 500,
    menubar: false,
    branding: false,
    statusbar: true,
    resize: 'both',
    image_advtab: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    
    // CSS styling cải thiện
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
    
    // File picker callback đã được sửa lỗi
    file_picker_callback: (callback, value, meta) => {
        if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = async function() {
                const file = this.files?.[0];
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    try {
                        const response = await fetch('/api/upload', {
                            method: 'POST',
                            body: formData
                        });
                        
                        const result = await response.json();
                        
                        if (result.success) {
                            callback(result.url, { title: file.name });
                        } else {
                            console.error('Upload failed:', result.message);
                            alert('Upload ảnh thất bại: ' + result.message);
                        }
                    } catch (error) {
                        console.error('Upload error:', error);
                        alert('Lỗi khi upload ảnh');
                    }
                }
            };
            
            input.click();
        }
    },
    
    // Setup callback để xử lý thay đổi nội dung
    setup: (editor) => {
        editor.on('change', () => {
            // Trigger change event nếu cần
            const event = new CustomEvent('tinymce-change', {
                detail: { content: editor.getContent() }
            });
            document.dispatchEvent(event);
        });
    }
});

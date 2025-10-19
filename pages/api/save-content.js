export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and content are required' 
      });
    }

    // For now, just return success
    // TODO: Save to database
    const savedData = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    res.status(200).json({ 
      success: true, 
      message: 'Content saved successfully',
      data: savedData
    });
    
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save content',
      error: error.message 
    });
  }
}
export default function handler(req, res) {
  res.status(200).json({
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'undefined',
    all_env_keys: Object.keys(process.env).filter(key => key.includes('CLOUDINARY'))
  });
}

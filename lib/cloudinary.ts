import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'ovmougmy',
  api_key: process.env.CLOUDINARY_API_KEY || '759266941214867',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'lc1e6lM-wk5qkI3pRmHkR8y-hfU',
  secure: true,
});

export { cloudinary };
export default cloudinary;

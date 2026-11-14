async function sha1Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'ovmougmy';
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '';
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || '';

  // 1. Direct Signed Upload to Cloudinary REST API from Browser (works on any static host without PHP/Node runtime)
  if (cloudName && apiKey && apiSecret && typeof window !== 'undefined' && window.crypto?.subtle) {
    try {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const folder = 'jfk-liquors/products';
      const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = await sha1Hex(paramsToSign);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('folder', folder);
      formData.append('signature', signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.secure_url) {
        return data.secure_url as string;
      }
      throw new Error(data?.error?.message || 'Cloudinary upload failed');
    } catch (err) {
      console.warn('Direct Cloudinary upload failed, trying fallback:', err);
    }
  }

  // 2. Fallback to Next.js API route if running on a Node.js server
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/upload-image', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      if (data.url) return data.url as string;
    }
  } catch {
    // Ignore when hosted statically
  }

  throw new Error('Failed to upload image to Cloudinary. Please check your Cloudinary credentials.');
}

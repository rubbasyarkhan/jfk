import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadProductImage(
  productId: string,
  file: File,
  filename?: string
): Promise<string> {
  const name = filename || `${Date.now()}.webp`;
  const storageRef = ref(storage, `products/${productId}/${name}`);

  // Convert to WebP via API route
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/convert-webp', {
    method: 'POST',
    body: formData,
  });

  let blob: Blob;
  if (res.ok) {
    blob = await res.blob();
  } else {
    // Fallback: upload original
    blob = file;
  }

  await uploadBytes(storageRef, blob, {
    contentType: 'image/webp',
  });

  return getDownloadURL(storageRef);
}

export async function uploadCategoryImage(
  categoryId: string,
  file: File
): Promise<string> {
  return uploadProductImage(categoryId, file, 'cover.webp');
}

export async function deleteStorageFile(url: string): Promise<void> {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (err) {
    console.warn('Could not delete storage file:', err);
  }
}

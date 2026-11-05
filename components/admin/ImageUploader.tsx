'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  productId?: string;
}

export default function ImageUploader({ value, onChange, productId }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newUrls: string[] = [];
    const pid = productId || `prod-${Date.now()}`;

    for (const file of Array.from(files)) {
      try {
        // Use client-side FormData to server WebP conversion endpoint
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/convert-webp', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const blob = await res.blob();
          // Create local Object URL or upload to Firebase Storage if available
          try {
            const { uploadProductImage } = await import('@/lib/storage');
            const webpFile = new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.webp`, {
              type: 'image/webp',
            });
            const downloadUrl = await uploadProductImage(pid, webpFile);
            newUrls.push(downloadUrl);
          } catch (storageErr) {
            console.warn('Firebase Storage offline, using direct WebP data URL:', storageErr);
            // Convert to data URI for immediate persistent storage in Firestore/document
            const reader = new FileReader();
            const dataUrlPromise = new Promise<string>((resolve) => {
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            const dataUrl = await dataUrlPromise;
            newUrls.push(dataUrl);
          }
        }
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }

    if (newUrls.length > 0) {
      onChange([...value, ...newUrls]);
    }
    setUploading(false);
  }

  function removeImage(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  }

  function setMainImage(index: number) {
    if (index === 0) return;
    const item = value[index];
    const filtered = value.filter((_, i) => i !== index);
    onChange([item, ...filtered]);
  }

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <div
        className={`relative rounded-xl p-8 text-center cursor-pointer border-2 border-dashed transition-all ${
          dragOver
            ? 'border-gold bg-gold/10'
            : 'border-line hover:border-gold/60 bg-ink-3'
        }`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
            <p className="text-xs font-bold text-gold uppercase tracking-wider">
              Converting to .WebP &amp; Storing...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 text-gold border border-gold/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-paper">
                Drop bottle photos here or <span className="text-gold underline">click to browse</span>
              </p>
              <p className="text-xs text-muted mt-1">
                Automatic server-side conversion to .WebP &amp; Firebase Storage
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image Gallery Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {value.map((url, idx) => (
            <div
              key={idx}
              className={`relative aspect-square rounded-xl overflow-hidden border bg-ink-2 group ${
                idx === 0 ? 'border-gold ring-2 ring-gold/30' : 'border-line'
              }`}
            >
              <Image
                src={url}
                alt={`Product visual ${idx + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />

              {/* Badges */}
              {idx === 0 && (
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold text-ink-4">
                  Primary
                </span>
              )}

              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-ink-4/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => setMainImage(idx)}
                    className="p-1.5 rounded-lg bg-gold text-ink-4 text-xs font-bold hover:bg-gold-light"
                    title="Make Main Image"
                  >
                    ★ Main
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600"
                  title="Remove Image"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

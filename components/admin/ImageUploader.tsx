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
  const [customUrl, setCustomUrl] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          newUrls.push(data.url);
        } else {
          setError(data.error || 'Failed to upload image to Cloudinary');
        }
      } catch (err: any) {
        console.error('Upload error:', err);
        setError(err?.message || 'Network error during image upload');
      }
    }

    if (newUrls.length > 0) {
      onChange([...value, ...newUrls]);
    }
    setUploading(false);
  }

  function handleAddCustomUrl(e: React.FormEvent) {
    e.preventDefault();
    if (!customUrl.trim()) return;
    onChange([...value, customUrl.trim()]);
    setCustomUrl('');
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
      {error && (
        <div className="p-3 rounded-lg bg-red-900/60 border border-red-500/50 text-red-200 text-xs">
          {error}
        </div>
      )}

      {/* Drag & Drop Area */}
      <div
        className={`relative rounded-xl p-8 text-center cursor-pointer border-2 border-dashed transition-all ${
          dragOver
            ? 'border-[#F5D900] bg-[#F5D900]/10'
            : 'border-white/15 hover:border-[#F5D900]/60 bg-[#161616]'
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
            <div className="w-8 h-8 rounded-full border-2 border-[#F5D900] border-t-transparent animate-spin" />
            <p className="text-xs font-bold text-[#F5D900] uppercase tracking-wider font-sans">
              Uploading Directly to Cloudinary...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#F5D900]/10 text-[#F5D900] border border-[#F5D900]/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Drop bottle photos here or <span className="text-[#F5D900] underline">click to browse</span>
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Direct Cloudinary CDN upload &bull; Auto-optimized WebP
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Or Paste Direct Image URL */}
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Or paste an existing Cloudinary / Image URL..."
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          className="flex-1 bg-[#161616] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
        />
        <button
          type="button"
          onClick={handleAddCustomUrl}
          className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#333333] border border-white/10 text-xs font-semibold text-white uppercase tracking-wider"
        >
          Add URL
        </button>
      </div>

      {/* Image Gallery Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {value.map((url, idx) => (
            <div
              key={idx}
              className={`relative aspect-square rounded-xl overflow-hidden border bg-[#111111] group ${
                idx === 0 ? 'border-[#F5D900] ring-2 ring-[#F5D900]/30' : 'border-white/10'
              }`}
            >
              <Image
                src={url}
                alt={`Product visual ${idx + 1}`}
                fill
                className="object-cover object-center"
                sizes="150px"
              />

              {/* Main Badge */}
              {idx === 0 && (
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5D900] text-[#050505]">
                  Primary
                </span>
              )}

              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => setMainImage(idx)}
                    className="p-1.5 rounded-lg bg-[#F5D900] text-[#050505] text-xs font-bold hover:bg-[#FFE524]"
                    title="Make Main Image"
                  >
                    ★ Main
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700"
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

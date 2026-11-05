'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/lib/firestore';
import ImageUploader from './ImageUploader';
import type { Product } from '@/types';

interface Props {
  initialData?: Product;
  productId?: string;
}

const CATEGORIES = [
  { label: 'Spirits & Bourbon', value: 'spirits' },
  { label: 'Wines & Champagne', value: 'wines' },
  { label: 'Beer & Craft', value: 'beer' },
  { label: 'Agave, Mezcal & Mixers', value: 'agave-and-more' },
];

const BADGES = ['', 'Allocated', 'Featured', 'Limited', 'New', 'Sale'];

export default function ProductForm({ initialData, productId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'spirits');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [volume, setVolume] = useState(initialData?.volume || '');
  const [abv, setAbv] = useState(initialData?.abv?.toString() || '');
  const [badge, setBadge] = useState(initialData?.badge || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [brand, setBrand] = useState(initialData?.brand || '');
  const [origin, setOrigin] = useState(initialData?.origin || '');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [inStock, setInStock] = useState(initialData?.inStock ?? true);
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  function handleNameChange(val: string) {
    setName(val);
    if (!productId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productPayload = {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        price: price ? parseFloat(price) : undefined,
        volume: volume || undefined,
        abv: abv ? parseFloat(abv) : undefined,
        badge: (badge || undefined) as Product['badge'],
        brand: brand || undefined,
        origin: origin || undefined,
        tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        shortDescription,
        description,
        featured,
        inStock,
        images,
        thumbnailUrl: images[0] || '',
        sortOrder: initialData?.sortOrder || 1,
      };

      if (productId) {
        await updateProduct(productId, productPayload);
      } else {
        await createProduct(productPayload);
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err?.message || 'Failed to save product to database');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl text-[#FFFFFF]">
      {error && (
        <div className="p-4 rounded-xl bg-[#5B1018]/60 border border-[#5B1018] text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Media Upload Section in Charcoal */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-4">
        <div>
          <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
            Bottle Imagery &amp; WebP Conversion
          </h3>
          <p className="text-xs text-[#A0A0A0] font-light">
            Upload high-res bottle photos. Images are automatically converted to optimized modern <strong>.WebP</strong> format.
          </p>
        </div>
        <ImageUploader value={images} onChange={setImages} productId={productId} />
      </div>

      {/* Primary Details in Charcoal */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
        <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
          Bottle Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="admin-label">Product Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Kentucky Straight Bourbon 10 Year"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">URL Slug *</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. kentucky-straight-bourbon"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Department / Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="admin-input"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-label">Promotional Badge</label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="admin-input"
            >
              {BADGES.map((b) => (
                <option key={b} value={b}>
                  {b || '— None —'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Short & Full Description */}
        <div>
          <label className="admin-label">Short Card Description (1-2 sentences)</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="e.g. Rich, sweet and oaky with notes of vanilla and baking spice."
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Full Tasting Notes &amp; Story</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed tasting notes, history, maturation details, and distillery background..."
            className="admin-input leading-relaxed"
          />
        </div>
      </div>

      {/* Specifications & Pricing */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
        <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
          Pricing &amp; Technical Specs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="admin-label">Bottle Price ($ USD)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="64.99"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Volume</label>
            <input
              type="text"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="e.g. 750ml, 1L, 6-Pack"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Alcohol (% ABV)</label>
            <input
              type="number"
              step="0.1"
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
              placeholder="e.g. 45.0"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Region / Origin</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Kentucky, USA"
              className="admin-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="admin-label">Brand / Producer</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Buffalo Trace"
              className="admin-input"
            />
          </div>

          <div>
            <label className="admin-label">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. Single Barrel, Small Batch, Allocated"
              className="admin-input"
            />
          </div>
        </div>

        {/* Stock & Feature Toggles */}
        <div className="pt-4 border-t border-[#3A3A3A] flex flex-wrap items-center gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-5 h-5 rounded border-[#3A3A3A] bg-[#111111] accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-sm font-bold text-[#FFFFFF]">Active in Stock</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-[#3A3A3A] bg-[#111111] accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-sm font-bold text-[#FFFFFF]">Highlight in Homepage Allocated Vault</span>
          </label>
        </div>
      </div>

      {/* Submit Actions: Gold Button with Black Text + Ghost Cancel */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-gold !py-3.5"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-[#111111] border-t-transparent animate-spin" />
              Saving Product...
            </span>
          ) : (
            <span>{productId ? 'Update Product' : 'Publish Product to Store'} &rarr;</span>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="btn-ghost !py-3.5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

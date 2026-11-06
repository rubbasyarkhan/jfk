'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/types';

interface Props {
  initialCategories: Category[];
}

export default function CategoryManager({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState('1');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function openCreateModal() {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setBannerText('');
    setImageUrl('');
    setSortOrder((categories.length + 1).toString());
    setError('');
    setIsModalOpen(true);
  }

  function openEditModal(cat: Category) {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setBannerText(cat.bannerText || '');
    setImageUrl(cat.imageUrl || '');
    setSortOrder((cat.sortOrder || 1).toString());
    setError('');
    setIsModalOpen(true);
  }

  function handleNameChange(val: string) {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      );
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
      } else {
        setError(data.error || 'Failed to upload category image to Cloudinary');
      }
    } catch (err: any) {
      setError(err?.message || 'Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: description.trim(),
        bannerText: bannerText.trim(),
        imageUrl: imageUrl.trim(),
        sortOrder: Number(sortOrder) || 1,
      };

      if (editingCategory) {
        // Update existing
        const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to update category');
        }

        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id ? { ...c, ...payload } : c
          )
        );
      } else {
        // Create new
        const res = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to create category');
        }

        const newCat: Category = {
          id: data.id || payload.slug,
          ...payload,
        };
        setCategories((prev) => [...prev, newCat]);
      }

      setIsModalOpen(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to save category');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(catId: string, catName: string) {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/categories/${catId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete category');
      }

      setCategories((prev) => prev.filter((c) => c.id !== catId));
    } catch (err: any) {
      alert(`Error deleting category: ${err.message}`);
    }
  }

  return (
    <div className="space-y-8 max-w-6xl text-[#FFFFFF]">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Catalog Taxonomy</p>
          <h1 className="font-anton text-3xl sm:text-4xl text-[#FFFFFF] uppercase tracking-wide">
            Departments &amp; Categories
          </h1>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#F5D900] text-[#050505] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#FFE524] transition-all shadow-lg cursor-pointer"
        >
          <span>+ Add New Department</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-sm bg-[#16171C] border border-white/[0.08] overflow-hidden flex flex-col justify-between transition-all hover:border-[#F5D900]/60 shadow-xl"
          >
            <div>
              {/* Category Image Header */}
              {cat.imageUrl && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0A0A0A] border-b border-white/[0.06]">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16171C] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-sm text-[10px] font-sans font-bold uppercase tracking-wider bg-[#050505]/90 text-[#F5D900] border border-[#F5D900]/30 backdrop-blur-sm">
                    Order #{cat.sortOrder || 1}
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                    /products/{cat.slug}
                  </span>
                </div>

                <h3 className="font-anton text-2xl text-white mb-2 uppercase tracking-wide">
                  {cat.name}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4 line-clamp-3">
                  {cat.description || 'No description added yet.'}
                </p>

                {cat.bannerText && (
                  <div className="p-3 rounded-sm bg-[#0E0F12] border border-white/[0.06] text-xs text-neutral-300 italic font-sans mb-2">
                    &ldquo;{cat.bannerText}&rdquo;
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 border-t border-white/[0.06] flex items-center justify-between text-xs font-sans">
              <Link
                href={`/products/${cat.slug}`}
                target="_blank"
                className="font-bold text-[#F5D900] hover:underline uppercase tracking-wider text-[11px]"
              >
                View Live ↗
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(cat)}
                  className="px-3 py-1.5 rounded-sm bg-[#222329] hover:bg-[#2A2B33] text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="px-3 py-1.5 rounded-sm bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-semibold uppercase tracking-wider border border-red-800/50 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-sm bg-[#16171C] border border-white/[0.12] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                {editingCategory ? `Edit: ${editingCategory.name}` : 'Create New Department'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-sm bg-red-950/70 border border-red-500/50 text-red-200 text-xs font-sans">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5 font-sans">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Department Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Japanese Whisky, Agave Vault, Single Barrel"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. japanese-whisky"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm font-mono text-neutral-300 focus:outline-none focus:border-[#F5D900]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short department overview for cards and meta tags..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Hero Header Banner Narrative
                </label>
                <textarea
                  rows={2}
                  placeholder="Prominent quote or editorial introduction displayed on the category hero..."
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Category Image (Cloudinary)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    placeholder="Paste Cloudinary URL or upload below..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
                />
                {uploadingImage && (
                  <p className="text-xs text-[#F5D900] mt-1 font-semibold">
                    Uploading directly to Cloudinary...
                  </p>
                )}
                {imageUrl && (
                  <div className="relative aspect-[16/9] w-36 rounded-sm overflow-hidden border border-white/10 mt-2 bg-[#0A0A0A]">
                    <Image src={imageUrl} alt="" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Sort Order Number
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-24 bg-[#0E0F12] border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                />
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-sm bg-[#222329] hover:bg-[#2A2B33] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-sm bg-[#F5D900] hover:bg-[#FFE524] text-[#050505] text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Saving...' : editingCategory ? 'Update Department' : 'Create Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

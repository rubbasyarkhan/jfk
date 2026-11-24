'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import ProductCard from '@/components/site/ProductCard';
import {
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  updateCategory,
} from '@/lib/firestore';
import type { Product, Category, ProductCustomField } from '@/types';

interface Props {
  initialData?: Product;
  productId?: string;
  availableCategories?: Category[];
}

const BADGES = ['', 'Allocated', 'Featured', 'Limited', 'New', 'Offer', 'Sale'];

const CARD_FIELD_OPTIONS: { key: string; label: string }[] = [
  { key: 'badge', label: 'Top-Left Badge' },
  { key: 'offerText', label: 'Top-Right Offer Pill' },
  { key: 'volumeOverlay', label: 'Photo Volume Pill' },
  { key: 'tags', label: 'Top Tags Line' },
  { key: 'description', label: 'Short Description' },
  { key: 'category', label: 'Department Name' },
  { key: 'subcategory', label: 'Subcategory' },
  { key: 'brand', label: 'Brand / Producer' },
  { key: 'origin', label: 'Region / Origin' },
  { key: 'abv', label: 'Alcohol (% ABV)' },
  { key: 'customFields', label: 'Custom Fields' },
  { key: 'footerVolume', label: 'Footer Volume' },
  { key: 'stockStatus', label: 'In-Stock Indicator' },
  { key: 'ctaButton', label: 'Bottom Action Button' },
];

export default function ProductForm({
  initialData,
  productId,
  availableCategories,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState('');

  const [allCategories, setAllCategories] = useState<Category[]>(
    availableCategories || []
  );

  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'spirits');
  const [subcategory, setSubcategory] = useState(
    initialData?.subcategory || ''
  );
  const [newSubcategoryInput, setNewSubcategoryInput] = useState('');
  const [volume, setVolume] = useState(initialData?.volume || '');
  const [abv, setAbv] = useState(initialData?.abv?.toString() || '');
  const [badge, setBadge] = useState(initialData?.badge || '');
  const [isOffer, setIsOffer] = useState(Boolean(initialData?.isOffer));
  const [offerText, setOfferText] = useState(initialData?.offerText || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [brand, setBrand] = useState(initialData?.brand || '');
  const [origin, setOrigin] = useState(initialData?.origin || '');
  const [sortOrder, setSortOrder] = useState(
    (initialData?.sortOrder || 1).toString()
  );
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ''
  );
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [inStock, setInStock] = useState(initialData?.inStock ?? true);
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  // Dynamic Custom Fields
  const [customFields, setCustomFields] = useState<ProductCustomField[]>(
    Array.isArray(initialData?.customFields) ? initialData!.customFields! : []
  );

  // Per-Product Card Field Override
  const [useCustomCardFields, setUseCustomCardFields] = useState<boolean>(
    Array.isArray(initialData?.cardFieldsOverride) &&
      initialData!.cardFieldsOverride!.length > 0
  );
  const [cardFieldsOverride, setCardFieldsOverride] = useState<string[]>(
    Array.isArray(initialData?.cardFieldsOverride) &&
      initialData!.cardFieldsOverride!.length > 0
      ? initialData!.cardFieldsOverride!
      : [
          'badge',
          'offerText',
          'volumeOverlay',
          'tags',
          'price',
          'description',
          'subcategory',
          'brand',
          'origin',
          'abv',
          'customFields',
          'footerVolume',
          'stockStatus',
          'ctaButton',
        ]
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        if (Array.isArray(cats) && cats.length > 0) {
          setAllCategories(cats);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    loadCategories();
  }, []);

  const selectedCatObj = allCategories.find(
    (c) => c.slug === category || c.id === category
  );
  const availableSubcategories = Array.isArray(selectedCatObj?.subcategories)
    ? selectedCatObj!.subcategories!
    : [];

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

  async function handleQuickAddSubcategory() {
    const trimmed = newSubcategoryInput.trim();
    if (!trimmed || !selectedCatObj) return;
    const subSlug = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const existingSubs = Array.isArray(selectedCatObj.subcategories)
      ? selectedCatObj.subcategories
      : [];
    if (!existingSubs.some((s) => s.slug === subSlug)) {
      const updatedSubs = [
        ...existingSubs,
        { id: subSlug, name: trimmed, slug: subSlug },
      ];
      await updateCategory(selectedCatObj.id, { subcategories: updatedSubs });
      setAllCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCatObj.id ? { ...c, subcategories: updatedSubs } : c
        )
      );
    }
    setSubcategory(subSlug);
    setNewSubcategoryInput('');
  }

  function addCustomField() {
    setCustomFields((prev) => [
      ...prev,
      {
        id: `cf-${Date.now()}-${prev.length}`,
        label: '',
        value: '',
        showOnCard: true,
      },
    ]);
  }

  function updateCustomField(
    index: number,
    patch: Partial<ProductCustomField>
  ) {
    setCustomFields((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, ...patch } : item))
    );
  }

  function removeCustomField(index: number) {
    setCustomFields((prev) => prev.filter((_, idx) => idx !== index));
  }

  function toggleCardFieldOverride(key: string) {
    setCardFieldsOverride((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cleanedCustomFields = customFields.filter(
        (f) => f.label.trim() && f.value.trim()
      );

      const productPayload = {
        name: name.trim(),
        slug: (slug || name)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        category,
        subcategory: subcategory.trim(),
        volume: volume.trim(),
        abv: abv ? parseFloat(abv) : 0,
        badge: (badge || '') as Product['badge'],
        isOffer,
        offerText: offerText.trim(),
        brand: brand.trim(),
        origin: origin.trim(),
        tags: tags
          ? tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        shortDescription: shortDescription.trim(),
        description: description.trim(),
        featured,
        inStock,
        images,
        thumbnailUrl: images[0] || '',
        customFields: cleanedCustomFields,
        cardFieldsOverride: useCustomCardFields ? cardFieldsOverride : [],
        sortOrder: Number(sortOrder) || 1,
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
      setError(err?.message || 'Failed to save product to Firebase Firestore');
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmDeleteProduct() {
    if (!productId) return;
    setDeleting(true);
    setError('');
    try {
      await deleteProduct(productId);
      setShowDeleteConfirm(false);
      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete product');
      setDeleting(false);
    }
  }

  // Live preview product object
  const previewProduct: Product = {
    id: productId || 'preview',
    name: name || 'Your Bottle Title',
    slug: slug || 'preview-bottle',
    category: category || 'spirits',
    subcategory: subcategory || '',
    volume: volume || '750ml',
    abv: abv ? parseFloat(abv) : 0,
    badge: (badge || '') as Product['badge'],
    isOffer,
    offerText,
    brand,
    origin,
    tags: tags
      ? tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    shortDescription:
      shortDescription ||
      'Preview how your bottle description and selected fields will appear on the storefront card.',
    description,
    featured,
    inStock,
    images,
    thumbnailUrl: images[0] || '',
    customFields: customFields.filter((f) => f.label && f.value),
    cardFieldsOverride: useCustomCardFields ? cardFieldsOverride : [],
    sortOrder: Number(sortOrder) || 1,
    createdAt: '',
    updatedAt: '',
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start text-[#FFFFFF]">
      {/* Left 8 Columns: Product Form */}
      <form
        onSubmit={handleSubmit}
        className="xl:col-span-8 space-y-8 text-[#FFFFFF]"
      >
        {error && (
          <div className="p-4 rounded-xl bg-[#5B1018]/60 border border-[#5B1018] text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Media Upload Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-4">
          <div>
            <h3 className="text-xs font-bold text-[#F5D900] uppercase tracking-wider mb-1">
              Bottle Imagery (Cloudinary Media)
            </h3>
            <p className="text-xs text-[#A0A0A0] font-light">
              Upload bottle photos directly. Images are hosted on Cloudinary CDN
              and saved permanently in Firebase Firestore.
            </p>
          </div>
          <ImageUploader
            value={images}
            onChange={setImages}
            productId={productId}
          />
        </div>

        {/* Primary Details & Subcategory */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
          <h3 className="text-xs font-bold text-[#F5D900] uppercase tracking-wider">
            Bottle Information, Category &amp; Subcategory
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
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory('');
                }}
                className="admin-input"
              >
                {allCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="admin-label">Subcategory</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="admin-input"
              >
                <option value="">— None / General —</option>
                {availableSubcategories.map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {/* Quick Add New Subcategory on the fly */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Or create new subcategory..."
                  value={newSubcategoryInput}
                  onChange={(e) => setNewSubcategoryInput(e.target.value)}
                  className="flex-1 bg-[#161616] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                />
                <button
                  type="button"
                  onClick={handleQuickAddSubcategory}
                  className="px-3 py-1.5 rounded-lg bg-[#161616] hover:bg-[#F5D900] hover:text-[#050505] text-xs font-bold text-[#F5D900] border border-[#F5D900]/40 transition-colors cursor-pointer"
                >
                  + Add Subcategory
                </button>
              </div>
            </div>
          </div>

          {/* Short & Full Description */}
          <div>
            <label className="admin-label">
              Short Card Description (1-2 sentences)
            </label>
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

        {/* Offers & Promotional Badges */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-[#F5D900] uppercase tracking-wider">
                Offers Page &amp; Promotional Badges
              </h3>
              <p className="text-xs text-[#A0A0A0]">
                Feature this bottle on the /offers page or display promotional badges.
              </p>
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer px-3.5 py-2 rounded-lg bg-[#161616] border border-[#F5D900]/40">
              <input
                type="checkbox"
                checked={isOffer}
                onChange={(e) => setIsOffer(e.target.checked)}
                className="w-4 h-4 rounded accent-[#F5D900] cursor-pointer"
              />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#F5D900]">
                Feature on Offers Page (/offers)
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label className="admin-label">Offer Highlight Pill Text</label>
              <input
                type="text"
                value={offerText}
                onChange={(e) => setOfferText(e.target.value)}
                placeholder="e.g. Special Store Offer / Limited Drop"
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Standard Specifications */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
          <h3 className="text-xs font-bold text-[#F5D900] uppercase tracking-wider">
            Standard Bottle Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
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

            <div>
              <label className="admin-label">Display Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                placeholder="1"
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
                className="w-5 h-5 rounded border-[#3A3A3A] bg-[#111111] accent-[#F5D900] cursor-pointer"
              />
              <span className="text-sm font-bold text-[#FFFFFF]">
                Active in Stock
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 rounded border-[#3A3A3A] bg-[#111111] accent-[#F5D900] cursor-pointer"
              />
              <span className="text-sm font-bold text-[#FFFFFF]">
                Highlight in Homepage Allocated Vault
              </span>
            </label>
          </div>
        </div>

        {/* Dynamic Custom Fields & Card Field Chooser */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-[#F5D900] uppercase tracking-wider">
                Custom Fields &amp; Card Field Selection
              </h3>
              <p className="text-xs text-[#A0A0A0] mt-0.5">
                Add as many custom fields as you want (e.g. Age, Proof, Barrel, Vintage, Rating) and choose whether each shows on the product card.
              </p>
            </div>
            <button
              type="button"
              onClick={addCustomField}
              className="px-4 py-2 rounded-lg bg-[#F5D900] hover:bg-[#FFE524] text-[#050505] text-xs font-extrabold uppercase tracking-wider cursor-pointer flex-shrink-0"
            >
              + Add Custom Field
            </button>
          </div>

          {customFields.length > 0 ? (
            <div className="space-y-3">
              {customFields.map((field, index) => (
                <div
                  key={field.id || index}
                  className="p-3.5 rounded-xl bg-[#161616] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                >
                  <input
                    type="text"
                    placeholder="Field Name (e.g. Age, Proof, Cask)"
                    value={field.label}
                    onChange={(e) =>
                      updateCustomField(index, { label: e.target.value })
                    }
                    className="flex-1 bg-[#0E0F12] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                  />
                  <input
                    type="text"
                    placeholder="Field Value (e.g. 12 Years, 107 Proof)"
                    value={field.value}
                    onChange={(e) =>
                      updateCustomField(index, { value: e.target.value })
                    }
                    className="flex-1 bg-[#0E0F12] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                  />
                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer whitespace-nowrap px-2">
                    <input
                      type="checkbox"
                      checked={field.showOnCard !== false}
                      onChange={(e) =>
                        updateCustomField(index, {
                          showOnCard: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded accent-[#F5D900]"
                    />
                    <span>Show on Card</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeCustomField(index)}
                    className="px-3 py-2 rounded-lg bg-red-950/70 hover:bg-red-900 text-red-200 text-xs font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#161616] border border-dashed border-white/15 text-center text-xs text-neutral-400">
              No custom fields added yet. Click &ldquo;+ Add Custom Field&rdquo; above to add custom bottle attributes.
            </div>
          )}

          {/* Optional Per-Product Card Fields Override */}
          <div className="pt-4 border-t border-[#3A3A3A] space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useCustomCardFields}
                onChange={(e) => setUseCustomCardFields(e.target.checked)}
                className="w-4 h-4 rounded accent-[#F5D900]"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Customize which fields appear on this specific bottle&apos;s card (Override Global Card Template)
              </span>
            </label>

            {useCustomCardFields && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4 rounded-xl bg-[#161616] border border-white/10">
                {CARD_FIELD_OPTIONS.map((opt) => {
                  const checked = cardFieldsOverride.includes(opt.key);
                  return (
                    <label
                      key={opt.key}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                        checked
                          ? 'bg-[#242424] border-[#F5D900]/50 text-white font-semibold'
                          : 'bg-[#111111] border-white/5 text-neutral-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCardFieldOverride(opt.key)}
                        className="w-3.5 h-3.5 rounded accent-[#F5D900]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading} className="btn-gold !py-3.5">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-[#111111] border-t-transparent animate-spin" />
                  Saving to Firebase...
                </span>
              ) : (
                <span>
                  {productId
                    ? 'Update Product in Firebase'
                    : 'Publish Product to Store'}{' '}
                  &rarr;
                </span>
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

          {productId && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-5 py-3.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Delete Product
            </button>
          )}
        </div>
      </form>

      {showDeleteConfirm && productId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#18191C] border border-red-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="font-anton text-2xl text-white uppercase tracking-wide mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-neutral-300 mb-6">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white">
                &ldquo;{name || initialData?.name || productId}&rdquo;
              </strong>
              ? It will be removed immediately from the admin panel, Firebase
              Firestore, and the live website.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDeleteProduct}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold uppercase tracking-wider text-white shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete Bottle'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right 4 Columns: Live Interactive Card Preview */}
      <div className="xl:col-span-4 xl:sticky xl:top-24 space-y-4">
        <div className="p-5 rounded-2xl bg-[#1E1F23] border border-[#F5D900]/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#F5D900]">
                Live Storefront Card Preview
              </p>
              <h4 className="font-anton text-lg text-white uppercase">
                How This Card Will Look
              </h4>
            </div>
            <a
              href="/admin/content?tab=card_designer"
              className="text-[11px] font-bold text-[#F5D900] hover:underline"
            >
              Global Card Designer ↗
            </a>
          </div>

          <ProductCard product={previewProduct} />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getCategories,
  getAllProducts,
  getInstantCategories,
  getInstantProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
} from '@/lib/firestore';
import { uploadImageToCloudinary } from '@/lib/cloudinaryClient';
import type { Category, Subcategory, Product } from '@/types';

interface Props {
  initialCategories: Category[];
}

export default function CategoryManager({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Quick Add Product inside Category Modal State
  const [productModalCat, setProductModalCat] = useState<Category | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodSubcategory, setProdSubcategory] = useState('');
  const [prodVolume, setProdVolume] = useState('750ml');
  const [prodAbv, setProdAbv] = useState('');
  const [prodBadge, setProdBadge] = useState<Product['badge']>('');
  const [prodIsOffer, setProdIsOffer] = useState(false);
  const [prodOfferText, setProdOfferText] = useState('');
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [uploadingProdImg, setUploadingProdImg] = useState(false);
  const [savingProd, setSavingProd] = useState(false);

  // Inline Quick Subcategory input per category ID
  const [newSubInputs, setNewSubInputs] = useState<Record<string, string>>({});
  const [newSubDescInputs, setNewSubDescInputs] = useState<
    Record<string, string>
  >({});
  const [newSubImgInputs, setNewSubImgInputs] = useState<
    Record<string, string>
  >({});
  const [uploadingSubKey, setUploadingSubKey] = useState<string | null>(null);
  const [uploadingCatHeroId, setUploadingCatHeroId] = useState<string | null>(
    null
  );

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    setCategories(getInstantCategories());
    setProducts(getInstantProducts());
    setHydrated(true);

    async function refreshAll() {
      const [latestCats, latestProds] = await Promise.all([
        getCategories(),
        getAllProducts(),
      ]);
      setCategories(latestCats);
      setProducts(latestProds);
    }
    refreshAll();
    window.addEventListener('jfk-catalog-updated', refreshAll);
    window.addEventListener('storage', refreshAll);
    return () => {
      window.removeEventListener('jfk-catalog-updated', refreshAll);
      window.removeEventListener('storage', refreshAll);
    };
  }, []);

  // Category Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productsBgUrl, setProductsBgUrl] = useState('');
  const [sortOrder, setSortOrder] = useState('1');
  const [showInNavbar, setShowInNavbar] = useState(true);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [modalNewSubName, setModalNewSubName] = useState('');
  const [modalNewSubDesc, setModalNewSubDesc] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingProductsBg, setUploadingProductsBg] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function openCreateModal() {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setBannerText('');
    setImageUrl('');
    setProductsBgUrl('');
    setSortOrder((categories.length + 1).toString());
    setShowInNavbar(true);
    setSubcategories([]);
    setModalNewSubName('');
    setModalNewSubDesc('');
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
    setProductsBgUrl(cat.productsBgUrl || '');
    setSortOrder((cat.sortOrder || 1).toString());
    setShowInNavbar(cat.showInNavbar !== false);
    setSubcategories(
      Array.isArray(cat.subcategories) ? [...cat.subcategories] : []
    );
    setModalNewSubName('');
    setModalNewSubDesc('');
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

  function handleAddModalSubcategory() {
    const trimmed = modalNewSubName.trim();
    if (!trimmed) return;
    const subSlug = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    if (subcategories.some((s) => s.slug === subSlug)) {
      setModalNewSubName('');
      setModalNewSubDesc('');
      return;
    }
    setSubcategories((prev) => [
      ...prev,
      {
        id: subSlug,
        name: trimmed,
        slug: subSlug,
        description: modalNewSubDesc.trim() || undefined,
      },
    ]);
    setModalNewSubName('');
    setModalNewSubDesc('');
  }

  function handleRemoveModalSubcategory(subSlug: string) {
    setSubcategories((prev) => prev.filter((s) => s.slug !== subSlug));
  }

  async function handleModalSubImageUpload(
    subSlug: string,
    file: File | undefined
  ) {
    if (!file) return;
    const key = `modal:${subSlug}`;
    setUploadingSubKey(key);
    try {
      const uploadedUrl = await uploadImageToCloudinary(
        file,
        'jfk-liquors/categories'
      );
      setSubcategories((prev) =>
        prev.map((s) =>
          s.slug === subSlug ? { ...s, imageUrl: uploadedUrl } : s
        )
      );
    } catch (err: any) {
      setError(err?.message || 'Error uploading subcategory image');
    } finally {
      setUploadingSubKey(null);
    }
  }

  async function handleToggleNavbar(cat: Category) {
    const nextVal = !(cat.showInNavbar !== false);
    setCategories((prev) =>
      prev.map((c) => (c.id === cat.id ? { ...c, showInNavbar: nextVal } : c))
    );
    try {
      await updateCategory(cat.id, { showInNavbar: nextVal });
      setFeedback({
        type: 'success',
        message: nextVal
          ? `"${cat.name}" is now shown as a tab in the main Navbar.`
          : `"${cat.name}" is now hidden from the main Navbar.`,
      });
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to update navbar visibility',
      });
    }
  }

  async function handleQuickCategoryHeroUpload(
    cat: Category,
    file: File | undefined
  ) {
    if (!file) return;
    setUploadingCatHeroId(cat.id);
    try {
      const uploadedUrl = await uploadImageToCloudinary(
        file,
        'jfk-liquors/categories'
      );
      setCategories((prev) =>
        prev.map((c) =>
          c.id === cat.id
            ? { ...c, imageUrl: uploadedUrl, productsBgUrl: uploadedUrl }
            : c
        )
      );
      await updateCategory(cat.id, {
        imageUrl: uploadedUrl,
        productsBgUrl: uploadedUrl,
      });
      setFeedback({
        type: 'success',
        message: `Updated Hero Banner Picture for "${cat.name}" in Cloudinary & Firebase!`,
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to upload category hero image',
      });
    } finally {
      setUploadingCatHeroId(null);
    }
  }

  async function handleQuickNewSubImageUpload(
    catId: string,
    file: File | undefined
  ) {
    if (!file) return;
    setUploadingSubKey(`new:${catId}`);
    try {
      const uploadedUrl = await uploadImageToCloudinary(
        file,
        'jfk-liquors/categories'
      );
      setNewSubImgInputs((prev) => ({ ...prev, [catId]: uploadedUrl }));
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to upload new subcategory image',
      });
    } finally {
      setUploadingSubKey(null);
    }
  }

  async function handleQuickAddSubcategory(cat: Category) {
    const rawName = (newSubInputs[cat.id] || '').trim();
    const rawDesc = (newSubDescInputs[cat.id] || '').trim();
    const rawImg = (newSubImgInputs[cat.id] || '').trim();
    if (!rawName) return;
    const subSlug = rawName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const currentSubs = Array.isArray(cat.subcategories)
      ? cat.subcategories
      : [];
    if (currentSubs.some((s) => s.slug === subSlug)) {
      setNewSubInputs((prev) => ({ ...prev, [cat.id]: '' }));
      setNewSubDescInputs((prev) => ({ ...prev, [cat.id]: '' }));
      setNewSubImgInputs((prev) => ({ ...prev, [cat.id]: '' }));
      return;
    }
    const updatedSubs: Subcategory[] = [
      ...currentSubs,
      {
        id: subSlug,
        name: rawName,
        slug: subSlug,
        ...(rawDesc ? { description: rawDesc } : {}),
        ...(rawImg ? { imageUrl: rawImg } : {}),
      },
    ];
    setCategories((prev) =>
      prev.map((c) =>
        c.id === cat.id ? { ...c, subcategories: updatedSubs } : c
      )
    );
    setNewSubInputs((prev) => ({ ...prev, [cat.id]: '' }));
    setNewSubDescInputs((prev) => ({ ...prev, [cat.id]: '' }));
    setNewSubImgInputs((prev) => ({ ...prev, [cat.id]: '' }));

    try {
      await updateCategory(cat.id, { subcategories: updatedSubs });
      setFeedback({
        type: 'success',
        message: `Added subcategory "${rawName}" to ${cat.name} in Firebase!`,
      });
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to save subcategory',
      });
    }
  }

  async function handleQuickSubImageUpload(
    cat: Category,
    subSlug: string,
    file: File | undefined,
    subNameFallback?: string
  ) {
    if (!file) return;
    const key = `${cat.id}:${subSlug}`;
    setUploadingSubKey(key);
    try {
      const uploadedUrl = await uploadImageToCloudinary(
        file,
        'jfk-liquors/categories'
      );
      const currentSubs = Array.isArray(cat.subcategories)
        ? cat.subcategories
        : [];
      const exists = currentSubs.some((s) => s.slug === subSlug);
      const updatedSubs = exists
        ? currentSubs.map((s) =>
            s.slug === subSlug ? { ...s, imageUrl: uploadedUrl } : s
          )
        : [
            ...currentSubs,
            {
              id: subSlug,
              slug: subSlug,
              name:
                subNameFallback ||
                subSlug
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (l) => l.toUpperCase()),
              imageUrl: uploadedUrl,
            },
          ];
      setCategories((prev) =>
        prev.map((c) =>
          c.id === cat.id ? { ...c, subcategories: updatedSubs } : c
        )
      );
      await updateCategory(cat.id, { subcategories: updatedSubs });
      setFeedback({
        type: 'success',
        message: `Updated Hero Banner Picture for subcategory "${subNameFallback || subSlug}" in Cloudinary & Firebase!`,
      });
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to upload subcategory image',
      });
    } finally {
      setUploadingSubKey(null);
    }
  }

  async function handleQuickRemoveSubcategory(cat: Category, subSlug: string) {
    const currentSubs = Array.isArray(cat.subcategories)
      ? cat.subcategories
      : [];
    const updatedSubs = currentSubs.filter((s) => s.slug !== subSlug);
    setCategories((prev) =>
      prev.map((c) =>
        c.id === cat.id ? { ...c, subcategories: updatedSubs } : c
      )
    );
    try {
      await updateCategory(cat.id, { subcategories: updatedSubs });
      setFeedback({
        type: 'success',
        message: `Removed subcategory from ${cat.name}.`,
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to remove subcategory',
      });
    }
  }

  function openAddProductModal(cat: Category) {
    setProductModalCat(cat);
    setProdName('');
    setProdSubcategory(cat.subcategories?.[0]?.slug || '');
    setProdVolume('750ml');
    setProdAbv('');
    setProdBadge('');
    setProdIsOffer(false);
    setProdOfferText('');
    setProdShortDesc('');
    setProdDesc('');
    setProdImageUrl('');
  }

  async function handleUploadQuickProdImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingProdImg(true);
    try {
      const url = await uploadImageToCloudinary(file, 'jfk-liquors/products');
      setProdImageUrl(url);
    } catch (err: any) {
      alert(err?.message || 'Error uploading product image');
    } finally {
      setUploadingProdImg(false);
    }
  }

  async function handleCreateProductInCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!productModalCat || !prodName.trim()) return;
    setSavingProd(true);
    try {
      const prodSlug = prodName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const images = prodImageUrl ? [prodImageUrl] : [];
      await createProduct({
        name: prodName.trim(),
        slug: prodSlug,
        category: productModalCat.slug,
        subcategory: prodSubcategory,
        volume: prodVolume.trim(),
        abv: prodAbv ? parseFloat(prodAbv) : 0,
        badge: prodBadge,
        isOffer: prodIsOffer,
        offerText: prodOfferText.trim(),
        shortDescription: prodShortDesc.trim(),
        description: prodDesc.trim() || prodShortDesc.trim(),
        inStock: true,
        featured: true,
        images,
        thumbnailUrl: images[0] || '',
        tags: prodSubcategory
          ? [prodSubcategory.replace(/-/g, ' ')]
          : [productModalCat.name],
        sortOrder: 1,
      });

      const latestProds = await getAllProducts();
      setProducts(latestProds);
      setFeedback({
        type: 'success',
        message: `Added bottle "${prodName.trim()}" directly into ${productModalCat.name}!`,
      });
      setTimeout(() => setFeedback(null), 4000);
      setProductModalCat(null);
    } catch (err: any) {
      alert(err?.message || 'Failed to create product');
    } finally {
      setSavingProd(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');

    try {
      const uploadedUrl = await uploadImageToCloudinary(
        file,
        'jfk-liquors/categories'
      );
      setImageUrl(uploadedUrl);
    } catch (err: any) {
      setError(err?.message || 'Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleProductsBgUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProductsBg(true);
    setError('');

    try {
      const uploadedUrl = await uploadImageToCloudinary(
        file,
        'jfk-liquors/categories'
      );
      setProductsBgUrl(uploadedUrl);
    } catch (err: any) {
      setError(err?.message || 'Error uploading products background image');
    } finally {
      setUploadingProductsBg(false);
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
        slug:
          slug.trim() ||
          name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
        description: description.trim(),
        bannerText: bannerText.trim(),
        imageUrl: imageUrl.trim(),
        productsBgUrl: productsBgUrl.trim(),
        sortOrder: Number(sortOrder) || 1,
        showInNavbar,
        subcategories,
      };

      if (editingCategory) {
        await updateCategory(editingCategory.id, payload);
        setCategories((prev) =>
          prev
            .map((c) =>
              c.id === editingCategory.id ? { ...c, ...payload } : c
            )
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        );
        setFeedback({
          type: 'success',
          message: `Category "${payload.name}" updated and saved to Firebase Firestore!`,
        });
      } else {
        const newId = await createCategory(payload);
        const newCat: Category = {
          id: newId || payload.slug,
          ...payload,
        };
        setCategories((prev) =>
          [...prev, newCat].sort(
            (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
          )
        );
        setFeedback({
          type: 'success',
          message: `Category "${payload.name}" created and saved to Firebase Firestore!`,
        });
      }

      setTimeout(() => setFeedback(null), 4000);
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
      await deleteCategory(catId);
      setCategories((prev) => prev.filter((c) => c.id !== catId));
      setFeedback({
        type: 'success',
        message: `Category "${catName}" deleted from Firebase Firestore.`,
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      alert(`Error deleting category: ${err.message}`);
    }
  }

  return (
    <div className="space-y-8 max-w-7xl text-[#FFFFFF]">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">
            Navbar Tabs, Subcategories &amp; Products &bull; Firebase
          </p>
          <h1 className="font-anton text-3xl sm:text-4xl text-[#FFFFFF] uppercase tracking-wide">
            Categories, Subcategories &amp; Navbar Tabs
          </h1>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Choose which categories appear as tabs in the Navbar, manage subcategories inside each category, and add products directly.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#F5D900] text-[#050505] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#FFE524] transition-all shadow-lg cursor-pointer"
        >
          <span>+ Add New Category</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border text-sm ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
              : 'bg-red-950/80 border-red-500/60 text-red-200'
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.slug);
          // Merge defined subcategories with any subcategory slugs present on products in this category
          const catSubcategories: Subcategory[] = (() => {
            const list: Subcategory[] = Array.isArray(cat.subcategories)
              ? [...cat.subcategories]
              : [];
            const seen = new Set(list.map((s) => s.slug));
            for (const p of catProducts) {
              if (p.subcategory && !seen.has(p.subcategory)) {
                seen.add(p.subcategory);
                list.push({
                  id: p.subcategory,
                  slug: p.subcategory,
                  name: p.subcategory
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                });
              }
            }
            return list;
          })();
          const inNav = cat.showInNavbar !== false;
          const catHeroPreview = cat.productsBgUrl || cat.imageUrl || '';

          return (
            <div
              key={cat.id}
              className="rounded-xl bg-[#16171C] border border-white/[0.1] overflow-hidden flex flex-col justify-between transition-all hover:border-[#F5D900]/60 shadow-xl"
            >
              <div>
                {/* Category Image Header with 1-Click Hero Picture Upload */}
                <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#0A0A0A] border-b border-white/[0.06]">
                  {catHeroPreview && (
                    <Image
                      src={catHeroPreview}
                      alt={cat.name}
                      fill
                      className="object-cover object-center opacity-85"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16171C] via-black/30 to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-sm text-[10px] font-sans font-bold uppercase tracking-wider bg-[#050505]/90 text-[#F5D900] border border-[#F5D900]/30 backdrop-blur-sm">
                      Tab Order #{cat.sortOrder || 1}
                    </span>

                    {/* 1-Click Change Category Hero Picture Button */}
                    <label className="px-3 py-1 rounded-sm text-[10px] font-sans font-extrabold uppercase tracking-wider bg-[#F5D900] hover:bg-[#FFE524] text-[#050505] shadow-lg cursor-pointer transition-all">
                      {uploadingCatHeroId === cat.id
                        ? 'Uploading Hero...'
                        : 'Change Category Hero Picture'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleQuickCategoryHeroUpload(
                            cat,
                            e.target.files?.[0]
                          )
                        }
                      />
                    </label>
                  </div>

                  {/* 1-Click Navbar Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleNavbar(cat)}
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                      inNav
                        ? 'bg-[#F5D900] text-[#050505] border-[#F5D900] shadow-lg'
                        : 'bg-[#050505]/90 text-neutral-400 border-white/20 hover:text-white'
                    }`}
                    title="Click to show or hide this category in the website Navbar"
                  >
                    {inNav ? '✓ Shown in Navbar' : 'Hidden from Navbar'}
                  </button>

                  <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                    <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-sans font-bold text-[#F5D900]">
                      {catProducts.length} Products &bull;{' '}
                      {catSubcategories.length} Subcategories
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {cat.description || 'No description added yet.'}
                  </p>

                  {/* SUBCATEGORIES SECTION */}
                  <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/[0.07] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#F5D900]">
                        Subcategories &amp; Subcategory Hero Pictures ({catSubcategories.length})
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Each subcategory can have its own Hero Banner Picture
                      </span>
                    </div>

                    {catSubcategories.length > 0 ? (
                      <div className="space-y-2">
                        {catSubcategories.map((sub) => {
                          const isUploadingThisSub =
                            uploadingSubKey === `${cat.id}:${sub.slug}`;
                          const effectiveSubImg = sub.imageUrl || catHeroPreview;
                          return (
                            <div
                              key={sub.slug}
                              className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-[#1C1D22] border border-white/10 text-xs text-neutral-200"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {effectiveSubImg ? (
                                  <img
                                    src={effectiveSubImg}
                                    alt={sub.name}
                                    className="w-12 h-8 rounded object-cover border border-[#F5D900]/40 flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-8 rounded bg-[#0E0F12] border border-white/10 flex items-center justify-center text-[9px] text-neutral-500 flex-shrink-0">
                                    HERO
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-bold text-white truncate">
                                      {sub.name}
                                    </p>
                                    <Link
                                      href={`/products/${cat.slug}?sub=${encodeURIComponent(sub.slug)}`}
                                      target="_blank"
                                      className="text-[10px] text-[#F5D900] hover:underline"
                                    >
                                      View Page ↗
                                    </Link>
                                  </div>
                                  <p className="text-[10px] text-neutral-400 truncate max-w-[240px]">
                                    {sub.imageUrl
                                      ? '✓ Custom Subcategory Hero Picture'
                                      : 'Using Category Hero Picture (click right to set custom)'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <label
                                  className="px-2.5 py-1.5 rounded bg-[#F5D900] hover:bg-[#FFE524] text-[#050505] text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow"
                                  title="Upload Hero Banner Picture for this Subcategory page (Cloudinary)"
                                >
                                  {isUploadingThisSub
                                    ? 'Uploading...'
                                    : sub.imageUrl
                                      ? 'Change Hero Picture'
                                      : '+ Upload Hero Picture'}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleQuickSubImageUpload(
                                        cat,
                                        sub.slug,
                                        e.target.files?.[0],
                                        sub.name
                                      )
                                    }
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuickRemoveSubcategory(cat, sub.slug)
                                  }
                                  className="text-neutral-500 hover:text-red-400 font-bold px-1.5 py-0.5 cursor-pointer"
                                  title="Remove subcategory"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-500 italic">
                        No subcategories yet. Add one below:
                      </p>
                    )}

                    {/* Quick Add Subcategory Input with Hero Image Upload */}
                    <div className="space-y-2 pt-1">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder={`New subcategory in ${cat.name} (e.g. Single Malt)...`}
                          value={newSubInputs[cat.id] || ''}
                          onChange={(e) =>
                            setNewSubInputs((prev) => ({
                              ...prev,
                              [cat.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleQuickAddSubcategory(cat);
                            }
                          }}
                          className="flex-1 bg-[#16171C] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                        />
                        <input
                          type="text"
                          placeholder="Optional banner text..."
                          value={newSubDescInputs[cat.id] || ''}
                          onChange={(e) =>
                            setNewSubDescInputs((prev) => ({
                              ...prev,
                              [cat.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleQuickAddSubcategory(cat);
                            }
                          }}
                          className="flex-1 bg-[#16171C] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                        />
                        <label className="px-3 py-1.5 rounded-lg bg-[#16171C] hover:border-[#F5D900] text-[#F5D900] text-xs font-bold uppercase tracking-wider border border-white/15 transition-colors cursor-pointer shrink-0 inline-flex items-center justify-center">
                          {uploadingSubKey === `new:${cat.id}`
                            ? 'Uploading...'
                            : newSubImgInputs[cat.id]
                              ? '✓ Hero Image Set'
                              : '+ Hero Picture'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleQuickNewSubImageUpload(
                                cat.id,
                                e.target.files?.[0]
                              )
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleQuickAddSubcategory(cat)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#F5D900] hover:bg-[#FFE524] text-[#050505] text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                        >
                          + Add Subcategory
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* PRODUCTS IN THIS CATEGORY SECTION */}
                  <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/[0.07] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-white">
                        Products in {cat.name} ({catProducts.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => openAddProductModal(cat)}
                        className="px-3 py-1 rounded-md bg-[#F5D900] hover:bg-[#FFE524] text-[#050505] text-[11px] font-extrabold uppercase tracking-wider cursor-pointer"
                      >
                        + Add Product Here
                      </button>
                    </div>

                    {catProducts.length > 0 ? (
                      <div className="max-h-44 overflow-y-auto divide-y divide-white/[0.05] pr-1">
                        {catProducts.map((prod) => (
                          <div
                            key={prod.id}
                            className="py-2 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {(prod.images?.[0] || prod.thumbnailUrl) && (
                                <img
                                  src={prod.images?.[0] || prod.thumbnailUrl}
                                  alt=""
                                  className="w-7 h-7 rounded object-cover border border-white/10 flex-shrink-0"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="text-neutral-200 font-semibold truncate">
                                  {prod.name}
                                </p>
                                {prod.subcategory && (
                                  <p className="text-[10px] text-[#F5D900] capitalize">
                                    {prod.subcategory.replace(/-/g, ' ')}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Link
                              href={`/admin/products/${prod.id}`}
                              className="text-[11px] font-bold text-[#F5D900] hover:underline flex-shrink-0"
                            >
                              Edit &rarr;
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-500 italic">
                        No products in this category yet. Click &ldquo;+ Add Product Here&rdquo; to add one.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-sans">
                <Link
                  href={`/products/${cat.slug}`}
                  target="_blank"
                  className="font-bold text-[#F5D900] hover:underline uppercase tracking-wider text-[11px]"
                >
                  View Live Tab ↗
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(cat)}
                    className="px-3.5 py-1.5 rounded-sm bg-[#222329] hover:bg-[#2A2B33] text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                  >
                    Edit Category
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="px-3.5 py-1.5 rounded-sm bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-semibold uppercase tracking-wider border border-red-800/50 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-xl bg-[#16171C] border border-white/[0.12] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                {editingCategory
                  ? `Edit Category: ${editingCategory.name}`
                  : 'Create New Category'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Beer & Seltzers"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. beer-and-seltzers"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm font-mono text-neutral-300 focus:outline-none focus:border-[#F5D900]"
                  />
                </div>
              </div>

              {/* Show in Navbar Toggle */}
              <div className="p-4 rounded-lg bg-[#0E0F12] border border-[#F5D900]/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    Show as Tab in Website Navbar
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    When enabled, this category appears directly in the top navigation bar.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={showInNavbar}
                  onChange={(e) => setShowInNavbar(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#F5D900] cursor-pointer"
                />
              </div>

              {/* Subcategories Manager inside Modal */}
              <div className="p-4 rounded-lg bg-[#0E0F12] border border-white/10 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F5D900]">
                  Subcategories ({subcategories.length})
                </label>
                {subcategories.length > 0 && (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {subcategories.map((sub) => {
                      const isUploadingModalSub =
                        uploadingSubKey === `modal:${sub.slug}`;
                      return (
                        <div
                          key={sub.slug}
                          className="p-2.5 rounded bg-[#1C1D22] border border-white/10 space-y-2 text-xs text-white"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              {sub.imageUrl && (
                                <img
                                  src={sub.imageUrl}
                                  alt={sub.name}
                                  className="w-6 h-6 rounded object-cover border border-[#F5D900]/40 flex-shrink-0"
                                />
                              )}
                              <span className="font-semibold truncate">
                                {sub.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="px-2 py-1 rounded bg-[#242424] hover:bg-[#F5D900] hover:text-[#050505] text-[10px] font-bold uppercase tracking-wider border border-white/10 cursor-pointer">
                                {isUploadingModalSub
                                  ? 'Uploading...'
                                  : sub.imageUrl
                                    ? 'Change Bg'
                                    : '+ Bg Image'}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleModalSubImageUpload(
                                      sub.slug,
                                      e.target.files?.[0]
                                    )
                                  }
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveModalSubcategory(sub.slug)
                                }
                                className="text-neutral-400 hover:text-red-400 font-bold px-1"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Subcategory description / banner text..."
                              value={sub.description || ''}
                              onChange={(e) =>
                                setSubcategories((prev) =>
                                  prev.map((s) =>
                                    s.slug === sub.slug
                                      ? { ...s, description: e.target.value }
                                      : s
                                  )
                                )
                              }
                              className="bg-[#16171C] border border-white/10 rounded px-2.5 py-1 text-[11px] text-neutral-200 focus:outline-none focus:border-[#F5D900]"
                            />
                            <input
                              type="url"
                              placeholder="Subcategory background image URL..."
                              value={sub.imageUrl || ''}
                              onChange={(e) =>
                                setSubcategories((prev) =>
                                  prev.map((s) =>
                                    s.slug === sub.slug
                                      ? { ...s, imageUrl: e.target.value }
                                      : s
                                  )
                                )
                              }
                              className="bg-[#16171C] border border-white/10 rounded px-2.5 py-1 text-[11px] text-neutral-200 focus:outline-none focus:border-[#F5D900]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="New subcategory name (e.g. Bourbon & Whiskey)..."
                    value={modalNewSubName}
                    onChange={(e) => setModalNewSubName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddModalSubcategory();
                      }
                    }}
                    className="flex-1 bg-[#16171C] border border-white/15 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                  />
                  <input
                    type="text"
                    placeholder="Optional description..."
                    value={modalNewSubDesc}
                    onChange={(e) => setModalNewSubDesc(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddModalSubcategory();
                      }
                    }}
                    className="flex-1 bg-[#16171C] border border-white/15 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                  />
                  <button
                    type="button"
                    onClick={handleAddModalSubcategory}
                    className="px-4 py-2 rounded bg-[#F5D900] text-[#050505] text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Short department overview for cards and meta tags..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Hero Header Banner Narrative / Card Subtitle
                </label>
                <textarea
                  rows={2}
                  placeholder="Prominent quote or editorial introduction displayed on the category hero..."
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Category Hero &amp; Default Background Image (Cloudinary CDN)
                  </label>
                  <p className="text-[11px] text-neutral-400 mb-2">
                    Used as the category hero banner and as the default background behind this category&apos;s product cards grid.
                  </p>
                  <input
                    type="url"
                    placeholder="Paste Cloudinary URL or upload below..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900] mb-2"
                  />
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
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Navbar Tab Order
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full bg-[#0E0F12] border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F5D900]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0E0F12] border border-white/10 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#F5D900]">
                  Optional Products Section Background Image Override (Cloudinary CDN)
                </label>
                <p className="text-[11px] text-neutral-400">
                  Leave blank to use the Category Image above behind the product cards grid, or upload a separate background image specifically for this category&apos;s product cards area.
                </p>
                <input
                  type="url"
                  placeholder="Optional custom products grid background URL..."
                  value={productsBgUrl}
                  onChange={(e) => setProductsBgUrl(e.target.value)}
                  className="w-full bg-[#16171C] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
                />
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductsBgUpload}
                    className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
                  />
                  {uploadingProductsBg && (
                    <span className="text-xs text-[#F5D900] font-semibold">
                      Uploading to Cloudinary...
                    </span>
                  )}
                </div>
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
                  {submitting
                    ? 'Saving to Firebase...'
                    : editingCategory
                      ? 'Update Category'
                      : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Add Product Directly Inside Category Modal */}
      {productModalCat && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-xl bg-[#16171C] border border-[#F5D900]/40 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F5D900]">
                  Direct Category Product Creation
                </p>
                <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                  Add Product to {productModalCat.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setProductModalCat(null)}
                className="text-neutral-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateProductInCategory}
              className="space-y-4 font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Product / Bottle Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eagle Rare 10 Year"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="admin-label">Subcategory</label>
                  <select
                    value={prodSubcategory}
                    onChange={(e) => setProdSubcategory(e.target.value)}
                    className="admin-input"
                  >
                    <option value="">— Select Subcategory —</option>
                    {(productModalCat.subcategories || []).map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Volume</label>
                  <input
                    type="text"
                    value={prodVolume}
                    onChange={(e) => setProdVolume(e.target.value)}
                    placeholder="750ml"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">ABV (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={prodAbv}
                    onChange={(e) => setProdAbv(e.target.value)}
                    placeholder="45.0"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="admin-label">Badge</label>
                  <select
                    value={prodBadge}
                    onChange={(e) => setProdBadge(e.target.value as any)}
                    className="admin-input"
                  >
                    <option value="">— None —</option>
                    <option value="Allocated">Allocated</option>
                    <option value="Featured">Featured</option>
                    <option value="Limited">Limited</option>
                    <option value="New">New</option>
                    <option value="Offer">Offer</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prodIsOffer}
                      onChange={(e) => setProdIsOffer(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#F5D900]"
                    />
                    <span className="text-xs font-bold text-[#F5D900] uppercase tracking-wider">
                      Show on Offers Page (/offers)
                    </span>
                  </label>
                </div>
              </div>

              {prodIsOffer && (
                <div>
                  <label className="admin-label">Offer Highlight Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Special Store Offer / Save $10 In-Store"
                    value={prodOfferText}
                    onChange={(e) => setProdOfferText(e.target.value)}
                    className="admin-input"
                  />
                </div>
              )}

              <div>
                <label className="admin-label">Short Description</label>
                <input
                  type="text"
                  placeholder="Brief 1-2 sentence tasting summary..."
                  value={prodShortDesc}
                  onChange={(e) => setProdShortDesc(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">
                  Bottle Photo (Cloudinary Upload or URL)
                </label>
                <input
                  type="url"
                  placeholder="https://res.cloudinary.com/..."
                  value={prodImageUrl}
                  onChange={(e) => setProdImageUrl(e.target.value)}
                  className="admin-input mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadQuickProdImage}
                  className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
                />
                {uploadingProdImg && (
                  <p className="text-xs text-[#F5D900] mt-1 font-semibold">
                    Uploading to Cloudinary...
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalCat(null)}
                  className="px-4 py-2.5 rounded-sm bg-[#222329] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProd}
                  className="px-6 py-2.5 rounded-sm bg-[#F5D900] text-[#050505] text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  {savingProd
                    ? 'Saving to Firebase...'
                    : `Add to ${productModalCat.name}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

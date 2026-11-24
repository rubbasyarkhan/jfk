'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/site/ProductCard';
import {
  getSiteContent,
  getInstantSiteContent,
  updateSiteContent,
} from '@/lib/firestore';
import { DEFAULT_SITE_CONTENT } from '@/lib/initialData';
import { uploadImageToCloudinary } from '@/lib/cloudinaryClient';
import type { SiteContent, Product } from '@/types';

type TabKey =
  | 'brand'
  | 'card_designer'
  | 'hero'
  | 'homepage'
  | 'pages'
  | 'footer_age';

const TABS: { key: TabKey; label: string; desc: string }[] = [
  {
    key: 'brand',
    label: 'Brand, Contact & Hours',
    desc: 'Logo, store phone, address, hours, maps & compliance',
  },
  {
    key: 'card_designer',
    label: 'Product Card Designer',
    desc: 'Choose which fields, how many & how they display on bottle cards',
  },
  {
    key: 'hero',
    label: 'Homepage Hero',
    desc: 'Hero background image, headlines, description & CTA buttons',
  },
  {
    key: 'homepage',
    label: 'Homepage Sections',
    desc: 'Delivery, Departments, Vault, Promo Banner, Story & Location',
  },
  {
    key: 'pages',
    label: 'About, Contact & Offers',
    desc: 'Our Story (/about), Contact (/contact) & Offers (/offers) copy',
  },
  {
    key: 'footer_age',
    label: 'Catalog, Footer & Age Gate',
    desc: 'All Products hero, global footer & 21+ verification popup',
  },
];

const SAMPLE_PREVIEW_PRODUCT: Product = {
  id: 'sample-preview',
  name: 'Kentucky Single Barrel Reserve 12 Year',
  slug: 'bourbon-american-whiskey',
  category: 'spirits',
  subcategory: 'bourbon-whiskey',
  brand: 'Buffalo Trace Distillery',
  origin: 'Kentucky, USA',
  volume: '750ml',
  abv: 53.5,
  badge: 'Allocated',
  isOffer: true,
  offerText: 'In-Store Offer',
  inStock: true,
  featured: true,
  tags: ['Single Barrel', 'Kentucky', 'Cask Strength', 'Small Batch'],
  shortDescription:
    'Hand-selected charred oak single barrel with rich notes of dark caramel, Madagascar vanilla, toasted pecans, and warm baking spice.',
  description: '',
  images: [
    'https://res.cloudinary.com/ovmougmy/image/upload/v1794247348/jfk-liquors/bourbon-kentucky-reserve.jpg',
  ],
  thumbnailUrl:
    'https://res.cloudinary.com/ovmougmy/image/upload/v1794247348/jfk-liquors/bourbon-kentucky-reserve.jpg',
  customFields: [
    { id: '1', label: 'Age', value: '12 Years', showOnCard: true },
    { id: '2', label: 'Proof', value: '107 Proof', showOnCard: true },
    { id: '3', label: 'Barrel', value: 'Char #4 Oak', showOnCard: true },
    { id: '4', label: 'Rating', value: '96 Points', showOnCard: true },
  ],
  createdAt: '',
  updatedAt: '',
};

export default function SiteContentManager() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [activeTab, setActiveTab] = useState<TabKey>('brand');
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    setContent(getInstantSiteContent());
    if (typeof window !== 'undefined') {
      const tabParam = new URLSearchParams(window.location.search).get(
        'tab'
      ) as TabKey | null;
      if (tabParam && TABS.some((t) => t.key === tabParam)) {
        setActiveTab(tabParam);
      }
    }
    setHydrated(true);

    async function loadFromFirestore() {
      try {
        const latest = await getSiteContent();
        if (latest) setContent(latest);
      } catch (err) {
        console.error('Error loading site content from Firestore:', err);
      }
    }
    loadFromFirestore();
  }, []);

  function updateSection<K extends keyof SiteContent>(
    section: K,
    field: keyof SiteContent[K],
    value: any
  ) {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  }

  async function handleImageUpload<K extends keyof SiteContent>(
    section: K,
    field: keyof SiteContent[K],
    file: File | undefined,
    folder = 'jfk-liquors/site'
  ) {
    if (!file) return;
    const fieldId = `${String(section)}.${String(field)}`;
    setUploadingField(fieldId);
    setFeedback(null);

    try {
      const secureUrl = await uploadImageToCloudinary(file, folder);
      updateSection(section, field, secureUrl);
      setFeedback({
        type: 'success',
        message:
          'Image uploaded to Cloudinary CDN! Click "Save All Changes" to publish to Firebase.',
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to upload image to Cloudinary.',
      });
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const saved = await updateSiteContent(content);
      setContent(saved);
      setFeedback({
        type: 'success',
        message:
          'All website content & card layout settings saved permanently to Firebase Firestore!',
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: any) {
      console.error('Save site content error:', err);
      setFeedback({
        type: 'error',
        message:
          err?.message || 'Failed to save website content to Firebase Firestore.',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleResetDefaults() {
    if (
      !confirm(
        'Reset all website text, card layout, and images back to the original JFK Liquors default content?'
      )
    ) {
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const saved = await updateSiteContent(DEFAULT_SITE_CONTENT);
      setContent(saved);
      setFeedback({
        type: 'success',
        message:
          'Website content reset to defaults and synced to Firebase Firestore.',
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to reset content',
      });
    } finally {
      setSaving(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="py-16 text-center text-[#A0A0A0] text-sm">
        Loading website content editor from Firebase...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-6xl text-[#FFFFFF]">
      {/* Top Action Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#2E2E2E]">
        <div>
          <p className="eyebrow mb-1">
            Full Website CMS &bull; Firebase + Cloudinary
          </p>
          <h1 className="font-anton text-3xl sm:text-4xl text-[#FFFFFF] uppercase tracking-wide">
            Website Content &amp; Card Designer
          </h1>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Edit every heading, paragraph, product card layout, hours, delivery link, and photo across the entire website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl border border-white/15 bg-[#1B1B1B] hover:bg-[#242424] text-xs font-bold uppercase tracking-wider text-neutral-300 transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>

          <button
            type="submit"
            disabled={saving}
            className="btn-gold !py-3 !px-6 shadow-xl cursor-pointer"
          >
            {saving ? 'Saving to Firebase...' : 'Save All Changes to Firebase'}
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
              : 'bg-red-950/80 border-red-500/60 text-red-200'
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs underline ml-4 opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Section Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#D4AF37] text-[#111111] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                  : 'bg-[#1E1F23] text-[#FFFFFF] border-white/10 hover:border-[#D4AF37]/50'
              }`}
            >
              <p
                className={`text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                  isActive ? 'text-[#111111]' : 'text-[#D4AF37]'
                }`}
              >
                {tab.label}
              </p>
              <p
                className={`text-[10.5px] leading-snug line-clamp-2 ${
                  isActive ? 'text-[#111111]/80 font-medium' : 'text-[#A0A0A0]'
                }`}
              >
                {tab.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* TAB: PRODUCT CARD DESIGNER */}
      {activeTab === 'card_designer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
              <div>
                <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                  1. Choose Which Fields Appear on Cards
                </h2>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  Toggle on or off any field across all product cards on the Homepage, Department pages, Catalog, and Offers page.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'showBadge',
                    label: 'Top-Left Badge (Allocated, Featured, etc.)',
                  },
                  {
                    key: 'showOfferText',
                    label: 'Top-Right Offer Highlight Pill',
                  },
                  {
                    key: 'showVolumeOverlay',
                    label: 'Photo Corner Volume Pill (e.g. 750ml)',
                  },
                  {
                    key: 'showTags',
                    label: 'Tags Above Bottle Title',
                  },
                  {
                    key: 'showDescription',
                    label: 'Short Tasting Description',
                  },
                  {
                    key: 'showCategory',
                    label: 'Department / Category Name',
                  },
                  {
                    key: 'showSubcategory',
                    label: 'Subcategory Label',
                  },
                  {
                    key: 'showBrand',
                    label: 'Brand / Producer Field',
                  },
                  {
                    key: 'showOrigin',
                    label: 'Region / Origin Field',
                  },
                  {
                    key: 'showAbv',
                    label: 'Alcohol Percentage (% ABV)',
                  },
                  {
                    key: 'showCustomFields',
                    label: 'Admin Custom Fields (Age, Proof, etc.)',
                  },
                  {
                    key: 'showFooterVolume',
                    label: 'Footer Volume Text',
                  },
                  {
                    key: 'showStockStatus',
                    label: 'In-Stock / Call Store Indicator',
                  },
                  {
                    key: 'showCtaButton',
                    label: 'Bottom Action Button',
                  },
                ].map((item) => {
                  const checked = Boolean(
                    (content.cardConfig as any)[item.key]
                  );
                  return (
                    <label
                      key={item.key}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        checked
                          ? 'bg-[#1A1B20] border-[#F5D900]/50 text-white font-semibold'
                          : 'bg-[#141518] border-white/5 text-neutral-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          updateSection(
                            'cardConfig',
                            item.key as any,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 rounded accent-[#F5D900] cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* How Many & How to Display */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
              <div>
                <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                  2. How Many Fields &amp; How They Show on the Card
                </h2>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  Control how many tags, custom fields, and description lines appear, and choose their visual layout style.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="admin-label">
                    How Many Tags to Show
                  </label>
                  <select
                    value={content.cardConfig.maxTagsCount}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'maxTagsCount',
                        Number(e.target.value)
                      )
                    }
                    className="admin-input"
                  >
                    <option value={1}>1 Tag</option>
                    <option value={2}>2 Tags</option>
                    <option value={3}>3 Tags</option>
                    <option value={4}>4 Tags</option>
                    <option value={6}>Up to 6 Tags</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">
                    How Many Custom Fields
                  </label>
                  <select
                    value={content.cardConfig.maxCustomFieldsCount}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'maxCustomFieldsCount',
                        Number(e.target.value)
                      )
                    }
                    className="admin-input"
                  >
                    <option value={1}>1 Custom Field</option>
                    <option value={2}>2 Custom Fields</option>
                    <option value={3}>3 Custom Fields</option>
                    <option value={4}>4 Custom Fields</option>
                    <option value={6}>Up to 6 Custom Fields</option>
                    <option value={10}>All Custom Fields</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">
                    Description Max Lines
                  </label>
                  <select
                    value={content.cardConfig.descriptionLines}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'descriptionLines',
                        Number(e.target.value) as any
                      )
                    }
                    className="admin-input"
                  >
                    <option value={1}>1 Line (Compact)</option>
                    <option value={2}>2 Lines (Balanced)</option>
                    <option value={3}>3 Lines (Detailed)</option>
                    <option value={4}>4 Lines (Expanded)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="admin-label">
                    Fields Display Style
                  </label>
                  <select
                    value={content.cardConfig.customFieldsDisplayStyle}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'customFieldsDisplayStyle',
                        e.target.value as any
                      )
                    }
                    className="admin-input"
                  >
                    <option value="pills">Pill Badges (Gold &amp; Charcoal)</option>
                    <option value="rows">Key-Value Table Rows</option>
                    <option value="inline">Inline Dot-Separated Line</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">
                    Photo Frame Aspect Ratio
                  </label>
                  <select
                    value={content.cardConfig.imageAspect}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'imageAspect',
                        e.target.value as any
                      )
                    }
                    className="admin-input"
                  >
                    <option value="4/3">4:3 Editorial Landscape</option>
                    <option value="1/1">1:1 Square Frame</option>
                    <option value="4/5">4:5 Tall Bottle Portrait</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">
                    Card Content Alignment
                  </label>
                  <select
                    value={content.cardConfig.textAlign}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'textAlign',
                        e.target.value as any
                      )
                    }
                    className="admin-input"
                  >
                    <option value="left">Left Aligned</option>
                    <option value="center">Centered</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="admin-label">
                    Cards Per Row (Desktop Grid)
                  </label>
                  <select
                    value={content.cardConfig.cardsPerRow || 4}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'cardsPerRow',
                        Number(e.target.value) as 3 | 4
                      )
                    }
                    className="admin-input"
                  >
                    <option value={4}>4 Cards in a Row (Default)</option>
                    <option value={3}>3 Cards in a Row</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">
                    Card Action Button Label
                  </label>
                  <input
                    type="text"
                    value={content.cardConfig.ctaButtonText}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'ctaButtonText',
                        e.target.value
                      )
                    }
                    placeholder="View Details & Availability"
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Products Section Background Image */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-5">
              <div>
                <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                  3. Products Section Background Image (Cloudinary CDN)
                </h2>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  This background image is displayed behind the product cards grid section across the storefront (Homepage Vault, Catalog, and Offers). Individual categories and subcategories can also override it with their own background image.
                </p>
              </div>

              <div className="space-y-3">
                <label className="admin-label">
                  Products Section Background Image URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={content.cardConfig.sectionBackgroundImageUrl || ''}
                    onChange={(e) =>
                      updateSection(
                        'cardConfig',
                        'sectionBackgroundImageUrl',
                        e.target.value
                      )
                    }
                    placeholder="https://res.cloudinary.com/..."
                    className="admin-input flex-1"
                  />
                  {content.cardConfig.sectionBackgroundImageUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        updateSection(
                          'cardConfig',
                          'sectionBackgroundImageUrl',
                          ''
                        )
                      }
                      className="px-4 py-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-bold uppercase tracking-wider border border-red-800/50 transition-colors cursor-pointer shrink-0"
                    >
                      Clear Background
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        'cardConfig',
                        'sectionBackgroundImageUrl',
                        e.target.files?.[0],
                        'jfk-liquors/site'
                      )
                    }
                    className="text-xs text-neutral-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
                  />
                  {uploadingField === 'cardConfig.sectionBackgroundImageUrl' && (
                    <span className="text-xs text-[#F5D900] font-bold animate-pulse">
                      Uploading to Cloudinary...
                    </span>
                  )}
                </div>

                {content.cardConfig.sectionBackgroundImageUrl && (
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10">
                    <Image
                      src={content.cardConfig.sectionBackgroundImageUrl}
                      alt="Products Section Background Preview"
                      fill
                      className="object-cover object-center opacity-75"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5D900]">
                        Live Products Section Background Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Interactive Preview Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="p-6 rounded-2xl bg-[#18191C] border border-[#F5D900]/40 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#F5D900]">
                    Interactive Live Preview
                  </p>
                  <h3 className="font-anton text-xl text-white uppercase">
                    Storefront Product Card
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-[#F5D900]/10 text-[#F5D900] border border-[#F5D900]/30">
                  Real-Time
                </span>
              </div>

              <ProductCard
                product={SAMPLE_PREVIEW_PRODUCT}
                configOverride={content.cardConfig}
              />

              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Click <strong className="text-[#F5D900]">Save All Changes to Firebase</strong> to apply this card layout across the entire store. You can also add custom fields or override fields on any individual bottle when editing a product.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: BRAND, CONTACT & HOURS */}
      {activeTab === 'brand' && (
        <div className="space-y-8">
          {/* Logo & Store Identity */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <div>
              <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                1. Brand Identity &amp; Logo (Cloudinary)
              </h2>
              <p className="text-xs text-[#A0A0A0] mt-1">
                Used in the sticky navigation bar, footer, 21+ age verification gate, and admin portal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <label className="admin-label">Store Name</label>
                <input
                  type="text"
                  value={content.brand.storeName}
                  onChange={(e) =>
                    updateSection('brand', 'storeName', e.target.value)
                  }
                  className="admin-input"
                />

                <label className="admin-label mt-4">
                  Header Action Button Text
                </label>
                <input
                  type="text"
                  value={content.brand.headerCtaText}
                  onChange={(e) =>
                    updateSection('brand', 'headerCtaText', e.target.value)
                  }
                  className="admin-input"
                />

                <label className="admin-label mt-4">
                  Airport Proximity Tag
                </label>
                <input
                  type="text"
                  value={content.brand.airportNote}
                  onChange={(e) =>
                    updateSection('brand', 'airportNote', e.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div className="space-y-3">
                <label className="admin-label">
                  Store Logo Image (Cloudinary URL or Upload)
                </label>
                <input
                  type="url"
                  value={content.brand.logoUrl}
                  onChange={(e) =>
                    updateSection('brand', 'logoUrl', e.target.value)
                  }
                  placeholder="https://res.cloudinary.com/..."
                  className="admin-input"
                />
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        'brand',
                        'logoUrl',
                        e.target.files?.[0],
                        'jfk-liquors/site'
                      )
                    }
                    className="text-xs text-neutral-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
                  />
                  {uploadingField === 'brand.logoUrl' && (
                    <span className="text-xs text-[#F5D900] font-bold animate-pulse">
                      Uploading to Cloudinary...
                    </span>
                  )}
                </div>
                {content.brand.logoUrl && (
                  <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 inline-flex items-center justify-center">
                    <Image
                      src={content.brand.logoUrl}
                      alt="Logo Preview"
                      width={160}
                      height={54}
                      className="object-contain h-12 w-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phone, Address & Hours */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              2. Phone Numbers, Physical Address &amp; Store Hours
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="admin-label">
                  Phone Display Format (Header/Buttons)
                </label>
                <input
                  type="text"
                  value={content.brand.phoneDisplay}
                  onChange={(e) =>
                    updateSection('brand', 'phoneDisplay', e.target.value)
                  }
                  placeholder="(281) 590-3300"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">
                  Full Phone with Country Code
                </label>
                <input
                  type="text"
                  value={content.brand.phoneFull}
                  onChange={(e) =>
                    updateSection('brand', 'phoneFull', e.target.value)
                  }
                  placeholder="+1 281-590-3300"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">
                  Clickable Tel Dial Number (No spaces)
                </label>
                <input
                  type="text"
                  value={content.brand.phoneTel}
                  onChange={(e) =>
                    updateSection('brand', 'phoneTel', e.target.value)
                  }
                  placeholder="+12815903300"
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Street Address &amp; Suite</label>
                <input
                  type="text"
                  value={content.brand.addressLine1}
                  onChange={(e) =>
                    updateSection('brand', 'addressLine1', e.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">City, State &amp; ZIP</label>
                <input
                  type="text"
                  value={content.brand.addressLine2}
                  onChange={(e) =>
                    updateSection('brand', 'addressLine2', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="admin-label">Weekday Label</label>
                <input
                  type="text"
                  value={content.brand.hoursWeekdayLabel}
                  onChange={(e) =>
                    updateSection('brand', 'hoursWeekdayLabel', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Weekday Hours</label>
                <input
                  type="text"
                  value={content.brand.hoursWeekdayTime}
                  onChange={(e) =>
                    updateSection('brand', 'hoursWeekdayTime', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Sunday Label</label>
                <input
                  type="text"
                  value={content.brand.hoursSundayLabel}
                  onChange={(e) =>
                    updateSection('brand', 'hoursSundayLabel', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Sunday Hours / Status</label>
                <input
                  type="text"
                  value={content.brand.hoursSundayTime}
                  onChange={(e) =>
                    updateSection('brand', 'hoursSundayTime', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">
                  Google Maps Directions URL
                </label>
                <input
                  type="url"
                  value={content.brand.directionsUrl}
                  onChange={(e) =>
                    updateSection('brand', 'directionsUrl', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">
                  Google Maps Iframe Embed URL
                </label>
                <input
                  type="url"
                  value={content.brand.mapEmbedUrl}
                  onChange={(e) =>
                    updateSection('brand', 'mapEmbedUrl', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">
                Store Availability &amp; Compliance Notice
              </label>
              <input
                type="text"
                value={content.brand.complianceNotice}
                onChange={(e) =>
                  updateSection('brand', 'complianceNotice', e.target.value)
                }
                className="admin-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOMEPAGE HERO */}
      {activeTab === 'hero' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
          <div>
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              Homepage Primary Hero Section
            </h2>
            <p className="text-xs text-[#A0A0A0] mt-1">
              Full-screen editorial opening section of the homepage. Upload a high-resolution bottle background photo to Cloudinary.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-4">
            <label className="admin-label">
              Hero Background Image (Cloudinary CDN)
            </label>
            <input
              type="url"
              value={content.hero.backgroundImageUrl}
              onChange={(e) =>
                updateSection('hero', 'backgroundImageUrl', e.target.value)
              }
              className="admin-input"
            />
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(
                    'hero',
                    'backgroundImageUrl',
                    e.target.files?.[0],
                    'jfk-liquors/site'
                  )
                }
                className="text-xs text-neutral-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
              />
              {uploadingField === 'hero.backgroundImageUrl' && (
                <span className="text-xs text-[#F5D900] font-bold animate-pulse">
                  Uploading to Cloudinary...
                </span>
              )}
            </div>
            {content.hero.backgroundImageUrl && (
              <div className="relative aspect-[21/9] w-full max-w-2xl rounded-xl overflow-hidden border border-white/10 bg-[#050505]">
                <Image
                  src={content.hero.backgroundImageUrl}
                  alt="Hero Background Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Top Eyebrow Tag</label>
              <input
                type="text"
                value={content.hero.eyebrow}
                onChange={(e) =>
                  updateSection('hero', 'eyebrow', e.target.value)
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Heading Line 1 (White)</label>
              <input
                type="text"
                value={content.hero.titleLine1}
                onChange={(e) =>
                  updateSection('hero', 'titleLine1', e.target.value)
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">
                Heading Line 2 (Highlighted Gold #F5D900)
              </label>
              <input
                type="text"
                value={content.hero.titleLine2Gold}
                onChange={(e) =>
                  updateSection('hero', 'titleLine2Gold', e.target.value)
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Heading Line 3 (White)</label>
              <input
                type="text"
                value={content.hero.titleLine3}
                onChange={(e) =>
                  updateSection('hero', 'titleLine3', e.target.value)
                }
                className="admin-input"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Hero Description Paragraph</label>
            <textarea
              rows={3}
              value={content.hero.description}
              onChange={(e) =>
                updateSection('hero', 'description', e.target.value)
              }
              className="admin-input leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="admin-label">Primary Button Text</label>
              <input
                type="text"
                value={content.hero.primaryCtaText}
                onChange={(e) =>
                  updateSection('hero', 'primaryCtaText', e.target.value)
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Primary Button Target / URL</label>
              <input
                type="text"
                value={content.hero.primaryCtaHref}
                onChange={(e) =>
                  updateSection('hero', 'primaryCtaHref', e.target.value)
                }
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">
                Secondary Directions Button Text
              </label>
              <input
                type="text"
                value={content.hero.secondaryCtaText}
                onChange={(e) =>
                  updateSection('hero', 'secondaryCtaText', e.target.value)
                }
                className="admin-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HOMEPAGE SECTIONS */}
      {activeTab === 'homepage' && (
        <div className="space-y-8">
          {/* 1. Delivery Section */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              1. Delivery Section (Uber Eats &amp; DoorDash)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.delivery.eyebrow}
                  onChange={(e) =>
                    updateSection('delivery', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Headline Line 1 (White)</label>
                <input
                  type="text"
                  value={content.delivery.headingLine1}
                  onChange={(e) =>
                    updateSection('delivery', 'headingLine1', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Headline Line 2 (Gold)</label>
                <input
                  type="text"
                  value={content.delivery.headingLine2Gold}
                  onChange={(e) =>
                    updateSection(
                      'delivery',
                      'headingLine2Gold',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Delivery Description</label>
                <textarea
                  rows={2}
                  value={content.delivery.description}
                  onChange={(e) =>
                    updateSection('delivery', 'description', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">21+ Delivery Disclaimer</label>
                <textarea
                  rows={2}
                  value={content.delivery.disclaimer}
                  onChange={(e) =>
                    updateSection('delivery', 'disclaimer', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#3A3A3A]">
              <div className="p-5 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-4">
                <h3 className="text-xs font-bold text-[#67cb89] uppercase tracking-wider">
                  Uber Eats Card
                </h3>
                <div>
                  <label className="admin-label">Card Title</label>
                  <input
                    type="text"
                    value={content.delivery.uberEatsTitle}
                    onChange={(e) =>
                      updateSection('delivery', 'uberEatsTitle', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Card Subtitle</label>
                  <input
                    type="text"
                    value={content.delivery.uberEatsDesc}
                    onChange={(e) =>
                      updateSection('delivery', 'uberEatsDesc', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">CTA Link Text</label>
                  <input
                    type="text"
                    value={content.delivery.uberEatsCta}
                    onChange={(e) =>
                      updateSection('delivery', 'uberEatsCta', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Uber Eats Store URL</label>
                  <input
                    type="url"
                    value={content.delivery.uberEatsUrl}
                    onChange={(e) =>
                      updateSection('delivery', 'uberEatsUrl', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-4">
                <h3 className="text-xs font-bold text-[#ff6451] uppercase tracking-wider">
                  DoorDash Card
                </h3>
                <div>
                  <label className="admin-label">Card Title</label>
                  <input
                    type="text"
                    value={content.delivery.doorDashTitle}
                    onChange={(e) =>
                      updateSection('delivery', 'doorDashTitle', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Card Subtitle</label>
                  <input
                    type="text"
                    value={content.delivery.doorDashDesc}
                    onChange={(e) =>
                      updateSection('delivery', 'doorDashDesc', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">CTA Link Text</label>
                  <input
                    type="text"
                    value={content.delivery.doorDashCta}
                    onChange={(e) =>
                      updateSection('delivery', 'doorDashCta', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">DoorDash Store URL</label>
                  <input
                    type="url"
                    value={content.delivery.doorDashUrl}
                    onChange={(e) =>
                      updateSection('delivery', 'doorDashUrl', e.target.value)
                    }
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Departments & Featured Vault Section Headings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-4">
              <h2 className="font-anton text-xl text-white uppercase tracking-wide">
                2. Curated Departments Section Header
              </h2>
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.departmentsSection.eyebrow}
                  onChange={(e) =>
                    updateSection(
                      'departmentsSection',
                      'eyebrow',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading (White)</label>
                <input
                  type="text"
                  value={content.departmentsSection.headingWhite}
                  onChange={(e) =>
                    updateSection(
                      'departmentsSection',
                      'headingWhite',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Highlight (Gold)</label>
                <input
                  type="text"
                  value={content.departmentsSection.headingGold}
                  onChange={(e) =>
                    updateSection(
                      'departmentsSection',
                      'headingGold',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Top-Right Browse Link Text</label>
                <input
                  type="text"
                  value={content.departmentsSection.browseAllText}
                  onChange={(e) =>
                    updateSection(
                      'departmentsSection',
                      'browseAllText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Department Card CTA Text</label>
                <input
                  type="text"
                  value={content.departmentsSection.cardCtaText}
                  onChange={(e) =>
                    updateSection(
                      'departmentsSection',
                      'cardCtaText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-4">
              <h2 className="font-anton text-xl text-white uppercase tracking-wide">
                3. Featured &amp; Allocated Vault Header
              </h2>
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.vaultSection.eyebrow}
                  onChange={(e) =>
                    updateSection('vaultSection', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading (White)</label>
                <input
                  type="text"
                  value={content.vaultSection.headingWhite}
                  onChange={(e) =>
                    updateSection(
                      'vaultSection',
                      'headingWhite',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Highlight (Gold)</label>
                <input
                  type="text"
                  value={content.vaultSection.headingGold}
                  onChange={(e) =>
                    updateSection('vaultSection', 'headingGold', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Top-Right Browse Link Text</label>
                <input
                  type="text"
                  value={content.vaultSection.browseAllText}
                  onChange={(e) =>
                    updateSection(
                      'vaultSection',
                      'browseAllText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">
                  Number of Featured Bottles to Display
                </label>
                <input
                  type="number"
                  min={3}
                  max={24}
                  value={content.vaultSection.maxItems}
                  onChange={(e) =>
                    updateSection(
                      'vaultSection',
                      'maxItems',
                      Number(e.target.value) || 6
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* 4. Promotional Burgundy Drop Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              4. Deep Burgundy Allocation Drop Banner
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Eyebrow Badge</label>
                <input
                  type="text"
                  value={content.promoBanner.eyebrow}
                  onChange={(e) =>
                    updateSection('promoBanner', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Banner Main Headline</label>
                <input
                  type="text"
                  value={content.promoBanner.heading}
                  onChange={(e) =>
                    updateSection('promoBanner', 'heading', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Banner Description</label>
              <textarea
                rows={2}
                value={content.promoBanner.description}
                onChange={(e) =>
                  updateSection('promoBanner', 'description', e.target.value)
                }
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Primary Call Button Text</label>
                <input
                  type="text"
                  value={content.promoBanner.primaryCtaText}
                  onChange={(e) =>
                    updateSection(
                      'promoBanner',
                      'primaryCtaText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">
                  Secondary Directions Button Text
                </label>
                <input
                  type="text"
                  value={content.promoBanner.secondaryCtaText}
                  onChange={(e) =>
                    updateSection(
                      'promoBanner',
                      'secondaryCtaText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* 5. Editorial Store Heritage / Story Section */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              5. Store Heritage &amp; Photo Spread Section
            </h2>

            <div className="p-5 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-4">
              <label className="admin-label">
                Story Feature Photo (Cloudinary CDN)
              </label>
              <input
                type="url"
                value={content.storySection.imageUrl}
                onChange={(e) =>
                  updateSection('storySection', 'imageUrl', e.target.value)
                }
                className="admin-input"
              />
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(
                      'storySection',
                      'imageUrl',
                      e.target.files?.[0],
                      'jfk-liquors/site'
                    )
                  }
                  className="text-xs text-neutral-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
                />
                {uploadingField === 'storySection.imageUrl' && (
                  <span className="text-xs text-[#F5D900] font-bold animate-pulse">
                    Uploading to Cloudinary...
                  </span>
                )}
              </div>
              {content.storySection.imageUrl && (
                <div className="relative aspect-[16/10] w-64 rounded-lg overflow-hidden border border-white/10 bg-[#050505]">
                  <Image
                    src={content.storySection.imageUrl}
                    alt="Story Section Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">
                  Photo Corner Gold Badge Text
                </label>
                <input
                  type="text"
                  value={content.storySection.imageBadgeText}
                  onChange={(e) =>
                    updateSection(
                      'storySection',
                      'imageBadgeText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.storySection.eyebrow}
                  onChange={(e) =>
                    updateSection('storySection', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Line 1 (White)</label>
                <input
                  type="text"
                  value={content.storySection.headingLine1}
                  onChange={(e) =>
                    updateSection(
                      'storySection',
                      'headingLine1',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Line 2 (Gold)</label>
                <input
                  type="text"
                  value={content.storySection.headingLine2Gold}
                  onChange={(e) =>
                    updateSection(
                      'storySection',
                      'headingLine2Gold',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Paragraph 1</label>
                <textarea
                  rows={3}
                  value={content.storySection.paragraph1}
                  onChange={(e) =>
                    updateSection('storySection', 'paragraph1', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Paragraph 2</label>
                <textarea
                  rows={3}
                  value={content.storySection.paragraph2}
                  onChange={(e) =>
                    updateSection('storySection', 'paragraph2', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-2">
                <label className="admin-label">Stat 1 Value &amp; Label</label>
                <input
                  type="text"
                  value={content.storySection.stat1Value}
                  onChange={(e) =>
                    updateSection('storySection', 'stat1Value', e.target.value)
                  }
                  className="admin-input"
                />
                <input
                  type="text"
                  value={content.storySection.stat1Label}
                  onChange={(e) =>
                    updateSection('storySection', 'stat1Label', e.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-2">
                <label className="admin-label">Stat 2 Value &amp; Label</label>
                <input
                  type="text"
                  value={content.storySection.stat2Value}
                  onChange={(e) =>
                    updateSection('storySection', 'stat2Value', e.target.value)
                  }
                  className="admin-input"
                />
                <input
                  type="text"
                  value={content.storySection.stat2Label}
                  onChange={(e) =>
                    updateSection('storySection', 'stat2Label', e.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-2">
                <label className="admin-label">Stat 3 Value &amp; Label</label>
                <input
                  type="text"
                  value={content.storySection.stat3Value}
                  onChange={(e) =>
                    updateSection('storySection', 'stat3Value', e.target.value)
                  }
                  className="admin-input"
                />
                <input
                  type="text"
                  value={content.storySection.stat3Label}
                  onChange={(e) =>
                    updateSection('storySection', 'stat3Label', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Bottom Link Text</label>
                <input
                  type="text"
                  value={content.storySection.ctaText}
                  onChange={(e) =>
                    updateSection('storySection', 'ctaText', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Bottom Link URL</label>
                <input
                  type="text"
                  value={content.storySection.ctaHref}
                  onChange={(e) =>
                    updateSection('storySection', 'ctaHref', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* 6. Location Section Headings */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              6. Storefront Location &amp; Map Section Headings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.locationSection.eyebrow}
                  onChange={(e) =>
                    updateSection('locationSection', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Line 1 (White)</label>
                <input
                  type="text"
                  value={content.locationSection.headingLine1}
                  onChange={(e) =>
                    updateSection(
                      'locationSection',
                      'headingLine1',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Line 2 (Gold)</label>
                <input
                  type="text"
                  value={content.locationSection.headingLine2Gold}
                  onChange={(e) =>
                    updateSection(
                      'locationSection',
                      'headingLine2Gold',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Airport Proximity Caption</label>
                <input
                  type="text"
                  value={content.locationSection.proximityNote}
                  onChange={(e) =>
                    updateSection(
                      'locationSection',
                      'proximityNote',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Directions Button Text</label>
                <input
                  type="text"
                  value={content.locationSection.directionsBtnText}
                  onChange={(e) =>
                    updateSection(
                      'locationSection',
                      'directionsBtnText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ABOUT, CONTACT & OFFERS PAGES */}
      {activeTab === 'pages' && (
        <div className="space-y-8">
          {/* Offers Page */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                1. Offers Page (/offers) &amp; Navbar Tab
              </h2>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.offersPage.showInNavbar !== false}
                  onChange={(e) =>
                    updateSection(
                      'offersPage',
                      'showInNavbar',
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 rounded accent-[#F5D900]"
                />
                <span className="text-xs font-bold uppercase text-[#F5D900]">
                  Show Offers Tab in Navbar
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="admin-label">Navbar Tab Label</label>
                <input
                  type="text"
                  value={content.offersPage.navbarLabel}
                  onChange={(e) =>
                    updateSection('offersPage', 'navbarLabel', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.offersPage.eyebrow}
                  onChange={(e) =>
                    updateSection('offersPage', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading (White)</label>
                <input
                  type="text"
                  value={content.offersPage.headingWhite}
                  onChange={(e) =>
                    updateSection('offersPage', 'headingWhite', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Highlight (Gold)</label>
                <input
                  type="text"
                  value={content.offersPage.headingGold}
                  onChange={(e) =>
                    updateSection('offersPage', 'headingGold', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Offers Page Description</label>
              <textarea
                rows={2}
                value={content.offersPage.description}
                onChange={(e) =>
                  updateSection('offersPage', 'description', e.target.value)
                }
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Bottom Banner Tag</label>
                <input
                  type="text"
                  value={content.offersPage.bannerTag}
                  onChange={(e) =>
                    updateSection('offersPage', 'bannerTag', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Bottom Banner Title</label>
                <input
                  type="text"
                  value={content.offersPage.bannerTitle}
                  onChange={(e) =>
                    updateSection('offersPage', 'bannerTitle', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>
            <div>
              <label className="admin-label">Bottom Banner Text</label>
              <textarea
                rows={2}
                value={content.offersPage.bannerText}
                onChange={(e) =>
                  updateSection('offersPage', 'bannerText', e.target.value)
                }
                className="admin-input"
              />
            </div>
          </div>

          {/* About Us Page */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              2. Our Story / About Us Page (/about)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.aboutPage.eyebrow}
                  onChange={(e) =>
                    updateSection('aboutPage', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Main Heading (White)</label>
                <input
                  type="text"
                  value={content.aboutPage.headingWhite}
                  onChange={(e) =>
                    updateSection('aboutPage', 'headingWhite', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">
                  Main Heading Italic Highlight (Gold)
                </label>
                <input
                  type="text"
                  value={content.aboutPage.headingGold}
                  onChange={(e) =>
                    updateSection('aboutPage', 'headingGold', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-4">
              <label className="admin-label">
                About Page Banner Photo (Cloudinary CDN)
              </label>
              <input
                type="url"
                value={content.aboutPage.heroImageUrl}
                onChange={(e) =>
                  updateSection('aboutPage', 'heroImageUrl', e.target.value)
                }
                className="admin-input"
              />
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(
                      'aboutPage',
                      'heroImageUrl',
                      e.target.files?.[0],
                      'jfk-liquors/site'
                    )
                  }
                  className="text-xs text-neutral-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#F5D900] file:text-[#050505] hover:file:bg-[#FFE524] cursor-pointer"
                />
                {uploadingField === 'aboutPage.heroImageUrl' && (
                  <span className="text-xs text-[#F5D900] font-bold animate-pulse">
                    Uploading to Cloudinary...
                  </span>
                )}
              </div>
              {content.aboutPage.heroImageUrl && (
                <div className="relative aspect-[21/9] w-full max-w-xl rounded-lg overflow-hidden border border-white/10 bg-[#050505]">
                  <Image
                    src={content.aboutPage.heroImageUrl}
                    alt="About Page Banner Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="admin-label">Lead Paragraph</label>
                <textarea
                  rows={3}
                  value={content.aboutPage.leadParagraph}
                  onChange={(e) =>
                    updateSection('aboutPage', 'leadParagraph', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Story Paragraph 2</label>
                <textarea
                  rows={3}
                  value={content.aboutPage.paragraph2}
                  onChange={(e) =>
                    updateSection('aboutPage', 'paragraph2', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Story Paragraph 3</label>
                <textarea
                  rows={3}
                  value={content.aboutPage.paragraph3}
                  onChange={(e) =>
                    updateSection('aboutPage', 'paragraph3', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-3">
                <label className="admin-label">Value Card 1</label>
                <input
                  type="text"
                  value={content.aboutPage.card1Title}
                  onChange={(e) =>
                    updateSection('aboutPage', 'card1Title', e.target.value)
                  }
                  className="admin-input"
                />
                <textarea
                  rows={3}
                  value={content.aboutPage.card1Text}
                  onChange={(e) =>
                    updateSection('aboutPage', 'card1Text', e.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-3">
                <label className="admin-label">Value Card 2</label>
                <input
                  type="text"
                  value={content.aboutPage.card2Title}
                  onChange={(e) =>
                    updateSection('aboutPage', 'card2Title', e.target.value)
                  }
                  className="admin-input"
                />
                <textarea
                  rows={3}
                  value={content.aboutPage.card2Text}
                  onChange={(e) =>
                    updateSection('aboutPage', 'card2Text', e.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 space-y-3">
                <label className="admin-label">Value Card 3</label>
                <input
                  type="text"
                  value={content.aboutPage.card3Title}
                  onChange={(e) =>
                    updateSection('aboutPage', 'card3Title', e.target.value)
                  }
                  className="admin-input"
                />
                <textarea
                  rows={3}
                  value={content.aboutPage.card3Text}
                  onChange={(e) =>
                    updateSection('aboutPage', 'card3Text', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="admin-label">Primary CTA Text</label>
                <input
                  type="text"
                  value={content.aboutPage.primaryCtaText}
                  onChange={(e) =>
                    updateSection('aboutPage', 'primaryCtaText', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Primary CTA Link</label>
                <input
                  type="text"
                  value={content.aboutPage.primaryCtaHref}
                  onChange={(e) =>
                    updateSection('aboutPage', 'primaryCtaHref', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Secondary CTA Text</label>
                <input
                  type="text"
                  value={content.aboutPage.secondaryCtaText}
                  onChange={(e) =>
                    updateSection(
                      'aboutPage',
                      'secondaryCtaText',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Secondary CTA Link</label>
                <input
                  type="text"
                  value={content.aboutPage.secondaryCtaHref}
                  onChange={(e) =>
                    updateSection(
                      'aboutPage',
                      'secondaryCtaHref',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Contact Page Header */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              3. Contact Page Header (/contact)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.contactPage.eyebrow}
                  onChange={(e) =>
                    updateSection('contactPage', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading (White)</label>
                <input
                  type="text"
                  value={content.contactPage.headingWhite}
                  onChange={(e) =>
                    updateSection('contactPage', 'headingWhite', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Highlight (Gold)</label>
                <input
                  type="text"
                  value={content.contactPage.headingGold}
                  onChange={(e) =>
                    updateSection('contactPage', 'headingGold', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>
            <div>
              <label className="admin-label">Contact Page Subtitle</label>
              <textarea
                rows={2}
                value={content.contactPage.subtitle}
                onChange={(e) =>
                  updateSection('contactPage', 'subtitle', e.target.value)
                }
                className="admin-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CATALOG, FOOTER & AGE GATE */}
      {activeTab === 'footer_age' && (
        <div className="space-y-8">
          {/* All Products / Catalog Hero */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              1. All Products Catalog Hero &amp; Service Card (/products)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="admin-label">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.catalogPage.eyebrow}
                  onChange={(e) =>
                    updateSection('catalogPage', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading (White)</label>
                <input
                  type="text"
                  value={content.catalogPage.headingWhite}
                  onChange={(e) =>
                    updateSection('catalogPage', 'headingWhite', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Heading Highlight (Gold)</label>
                <input
                  type="text"
                  value={content.catalogPage.headingGold}
                  onChange={(e) =>
                    updateSection('catalogPage', 'headingGold', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Catalog Intro Description</label>
              <textarea
                rows={2}
                value={content.catalogPage.description}
                onChange={(e) =>
                  updateSection('catalogPage', 'description', e.target.value)
                }
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="admin-label">Service Card Header</label>
                <input
                  type="text"
                  value={content.catalogPage.serviceBoxTitle}
                  onChange={(e) =>
                    updateSection(
                      'catalogPage',
                      'serviceBoxTitle',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Service Card Status Badge</label>
                <input
                  type="text"
                  value={content.catalogPage.serviceBoxBadge}
                  onChange={(e) =>
                    updateSection(
                      'catalogPage',
                      'serviceBoxBadge',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Service Card Call Prompt</label>
                <input
                  type="text"
                  value={content.catalogPage.serviceBoxCallLabel}
                  onChange={(e) =>
                    updateSection(
                      'catalogPage',
                      'serviceBoxCallLabel',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Global Footer */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
              2. Website Footer Content
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Footer Brand Tagline</label>
                <textarea
                  rows={2}
                  value={content.footer.tagline}
                  onChange={(e) =>
                    updateSection('footer', 'tagline', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">License / Retailer Badge</label>
                <input
                  type="text"
                  value={content.footer.licenseBadge}
                  onChange={(e) =>
                    updateSection('footer', 'licenseBadge', e.target.value)
                  }
                  className="admin-input"
                />

                <label className="admin-label mt-4">
                  Delivery Note Under Hours
                </label>
                <input
                  type="text"
                  value={content.footer.deliveryNote}
                  onChange={(e) =>
                    updateSection('footer', 'deliveryNote', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="admin-label">Column 2 Heading</label>
                <input
                  type="text"
                  value={content.footer.findUsHeading}
                  onChange={(e) =>
                    updateSection('footer', 'findUsHeading', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Storefront Bold Title</label>
                <input
                  type="text"
                  value={content.footer.storefrontTitle}
                  onChange={(e) =>
                    updateSection('footer', 'storefrontTitle', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Column 3 Heading</label>
                <input
                  type="text"
                  value={content.footer.hoursHeading}
                  onChange={(e) =>
                    updateSection('footer', 'hoursHeading', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Column 4 Heading</label>
                <input
                  type="text"
                  value={content.footer.departmentsHeading}
                  onChange={(e) =>
                    updateSection(
                      'footer',
                      'departmentsHeading',
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Copyright Line</label>
                <input
                  type="text"
                  value={content.footer.copyrightText}
                  onChange={(e) =>
                    updateSection('footer', 'copyrightText', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">21+ Legal Disclaimer</label>
                <input
                  type="text"
                  value={content.footer.legalDisclaimer}
                  onChange={(e) =>
                    updateSection('footer', 'legalDisclaimer', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* 21+ Age Gate Modal */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-anton text-2xl text-white uppercase tracking-wide">
                  3. 21+ Legal Age Verification Popup
                </h2>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  Displayed once per visitor session when entering the store.
                </p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.ageGate.enabled}
                  onChange={(e) =>
                    updateSection('ageGate', 'enabled', e.target.checked)
                  }
                  className="w-5 h-5 rounded border-[#3A3A3A] bg-[#111111] accent-[#F5D900] cursor-pointer"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Enable Age Gate
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Top Eyebrow</label>
                <input
                  type="text"
                  value={content.ageGate.eyebrow}
                  onChange={(e) =>
                    updateSection('ageGate', 'eyebrow', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Main Question Heading</label>
                <input
                  type="text"
                  value={content.ageGate.heading}
                  onChange={(e) =>
                    updateSection('ageGate', 'heading', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-label">Popup Description</label>
              <textarea
                rows={2}
                value={content.ageGate.description}
                onChange={(e) =>
                  updateSection('ageGate', 'description', e.target.value)
                }
                className="admin-input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="admin-label">Confirm (21+) Button Text</label>
                <input
                  type="text"
                  value={content.ageGate.confirmText}
                  onChange={(e) =>
                    updateSection('ageGate', 'confirmText', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Exit Button Text</label>
                <input
                  type="text"
                  value={content.ageGate.denyText}
                  onChange={(e) =>
                    updateSection('ageGate', 'denyText', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Exit Redirect URL</label>
                <input
                  type="url"
                  value={content.ageGate.denyUrl}
                  onChange={(e) =>
                    updateSection('ageGate', 'denyUrl', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Bottom Address Caption</label>
                <input
                  type="text"
                  value={content.ageGate.footerText}
                  onChange={(e) =>
                    updateSection('ageGate', 'footerText', e.target.value)
                  }
                  className="admin-input"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Save Bar */}
      <div className="p-5 rounded-2xl bg-[#18191C] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="text-xs text-[#C7C7C7]">
          <span className="text-[#F5D900] font-bold">
            Firebase Firestore + Cloudinary Active:
          </span>{' '}
          All text, card layouts, and uploaded photos are stored in the cloud and survive every redeployment.
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-gold !py-3.5 !px-8 w-full sm:w-auto justify-center shadow-xl cursor-pointer"
        >
          {saving ? 'Saving to Firebase...' : 'Save All Changes to Firebase →'}
        </button>
      </div>
    </form>
  );
}

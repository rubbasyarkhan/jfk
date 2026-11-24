'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllProducts,
  getInstantProducts,
  updateProduct,
  getSiteContent,
  getInstantSiteContent,
  updateSiteContent,
} from '@/lib/firestore';
import type { Product, SiteContent } from '@/types';

export default function OffersManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(
    getInstantSiteContent()
  );
  const [hydrated, setHydrated] = useState(false);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'offers'>('all');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savingHeader, setSavingHeader] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    setProducts(getInstantProducts());
    setSiteContent(getInstantSiteContent());
    setHydrated(true);

    async function load() {
      const [prods, content] = await Promise.all([
        getAllProducts(),
        getSiteContent(),
      ]);
      setProducts(prods);
      setSiteContent(content);
    }
    load();
  }, []);

  async function handleSaveOffersPageHeader(e: React.FormEvent) {
    e.preventDefault();
    setSavingHeader(true);
    setFeedback(null);
    try {
      const updated = await updateSiteContent({
        offersPage: siteContent.offersPage,
      });
      setSiteContent(updated);
      setFeedback({
        type: 'success',
        message: 'Offers page header & navbar settings saved to Firebase Firestore!',
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to save Offers page settings',
      });
    } finally {
      setSavingHeader(false);
    }
  }

  async function handleToggleOffer(product: Product) {
    const nextIsOffer = !product.isOffer;
    const nextOfferText = nextIsOffer
      ? product.offerText || 'Special Store Offer'
      : '';
    const nextBadge =
      !nextIsOffer && (product.badge === 'Offer' || product.badge === 'Sale')
        ? ''
        : product.badge;
    setSavingId(product.id);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              isOffer: nextIsOffer,
              offerText: nextOfferText,
              badge: nextBadge,
            }
          : p
      )
    );
    try {
      await updateProduct(product.id, {
        isOffer: nextIsOffer,
        offerText: nextOfferText,
        badge: nextBadge,
      });
      setFeedback({
        type: 'success',
        message: nextIsOffer
          ? `"${product.name}" added to the Offers page!`
          : `"${product.name}" removed from the Offers page.`,
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to update product offer status',
      });
    } finally {
      setSavingId(null);
    }
  }

  async function handleClearAllOffers() {
    const activeOffers = products.filter(
      (p) => p.isOffer || Boolean(p.offerText) || p.badge === 'Offer' || p.badge === 'Sale'
    );
    if (activeOffers.length === 0) return;
    if (!confirm('Remove all products from the Offers page?')) return;

    setSavingHeader(true);
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        isOffer: false,
        offerText: '',
        badge: p.badge === 'Offer' || p.badge === 'Sale' ? '' : p.badge,
      }))
    );
    try {
      await Promise.all(
        activeOffers.map((p) =>
          updateProduct(p.id, {
            isOffer: false,
            offerText: '',
            badge: p.badge === 'Offer' || p.badge === 'Sale' ? '' : p.badge,
          })
        )
      );
      setFeedback({
        type: 'success',
        message: 'Removed all products from the Offers page in Firebase Firestore!',
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to clear offers',
      });
    } finally {
      setSavingHeader(false);
    }
  }

  async function handleUpdateOfferDetails(
    product: Product,
    offerText: string
  ) {
    setSavingId(product.id);
    try {
      await updateProduct(product.id, {
        isOffer: true,
        offerText: offerText.trim(),
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                isOffer: true,
                offerText: offerText.trim(),
              }
            : p
        )
      );
      setFeedback({
        type: 'success',
        message: `Saved offer details for "${product.name}" to Firebase!`,
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to save offer details',
      });
    } finally {
      setSavingId(null);
    }
  }

  if (!hydrated) {
    return (
      <div className="py-16 text-center text-[#A0A0A0] text-sm">
        Loading Offers Manager...
      </div>
    );
  }

  const activeOffersCount = products.filter((p) => p.isOffer).length;

  const filteredProducts = products.filter((p) => {
    const matchesMode = filterMode === 'all' || p.isOffer;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.offerText || '').toLowerCase().includes(search.toLowerCase());
    return matchesMode && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl text-[#FFFFFF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Promotions &amp; Specials &bull; Firebase</p>
          <h1 className="font-anton text-3xl sm:text-4xl text-[#FFFFFF] uppercase tracking-wide">
            Store Offers Manager ({activeOffersCount} Active)
          </h1>
          <p className="text-xs text-[#A0A0A0] mt-1">
            Control the Offers tab in the navbar, edit the /offers page headlines, and choose which bottles appear as special offers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {activeOffersCount > 0 && (
            <button
              type="button"
              onClick={handleClearAllOffers}
              className="px-4 py-2.5 rounded-sm bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Remove All Offers ({activeOffersCount})
            </button>
          )}
          <Link
            href="/offers"
            target="_blank"
            className="btn-ghost !py-2.5"
          >
            View Live Offers Page ↗
          </Link>
          <Link
            href="/admin/products/new"
            className="btn-gold !py-2.5"
          >
            + Add New Offer Bottle
          </Link>
        </div>
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

      {/* 1. Offers Page Header & Navbar Settings */}
      <form
        onSubmit={handleSaveOffersPageHeader}
        className="p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A] space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A3A3A]">
          <div>
            <h2 className="font-anton text-xl text-white uppercase tracking-wide">
              Offers Navbar Tab &amp; Page Content
            </h2>
            <p className="text-xs text-[#A0A0A0]">
              Customize how the Offers tab appears in the navbar and the hero copy on /offers.
            </p>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={siteContent.offersPage.showInNavbar !== false}
              onChange={(e) =>
                setSiteContent((prev) => ({
                  ...prev,
                  offersPage: {
                    ...prev.offersPage,
                    showInNavbar: e.target.checked,
                  },
                }))
              }
              className="w-5 h-5 rounded accent-[#F5D900] cursor-pointer"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5D900]">
              Show &ldquo;{siteContent.offersPage.navbarLabel || 'Offers'}&rdquo; Tab in Navbar
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="admin-label">Navbar Tab Label</label>
            <input
              type="text"
              value={siteContent.offersPage.navbarLabel}
              onChange={(e) =>
                setSiteContent((prev) => ({
                  ...prev,
                  offersPage: {
                    ...prev.offersPage,
                    navbarLabel: e.target.value,
                  },
                }))
              }
              placeholder="Offers"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Hero Eyebrow</label>
            <input
              type="text"
              value={siteContent.offersPage.eyebrow}
              onChange={(e) =>
                setSiteContent((prev) => ({
                  ...prev,
                  offersPage: { ...prev.offersPage, eyebrow: e.target.value },
                }))
              }
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Heading (White)</label>
            <input
              type="text"
              value={siteContent.offersPage.headingWhite}
              onChange={(e) =>
                setSiteContent((prev) => ({
                  ...prev,
                  offersPage: {
                    ...prev.offersPage,
                    headingWhite: e.target.value,
                  },
                }))
              }
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Heading Highlight (Gold)</label>
            <input
              type="text"
              value={siteContent.offersPage.headingGold}
              onChange={(e) =>
                setSiteContent((prev) => ({
                  ...prev,
                  offersPage: {
                    ...prev.offersPage,
                    headingGold: e.target.value,
                  },
                }))
              }
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Offers Page Intro Description</label>
          <textarea
            rows={2}
            value={siteContent.offersPage.description}
            onChange={(e) =>
              setSiteContent((prev) => ({
                ...prev,
                offersPage: {
                  ...prev.offersPage,
                  description: e.target.value,
                },
              }))
            }
            className="admin-input"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={savingHeader}
            className="btn-gold !py-2.5 !px-6 cursor-pointer"
          >
            {savingHeader
              ? 'Saving...'
              : 'Save Offers Page Settings to Firebase'}
          </button>
        </div>
      </form>

      {/* 2. Select & Configure Offer Bottles */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#18191C] border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-anton text-xl text-white uppercase tracking-wide">
              Assign Bottles to Offers Page &amp; Set Offer Labels
            </h2>
            <p className="text-xs text-neutral-400">
              Toggle any product onto the Offers page and set its Offer Badge text (e.g. &ldquo;15% Off In-Store&rdquo;, &ldquo;Special Offer&rdquo;) or promotional price.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search bottles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#121316] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
            />
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value as any)}
              className="bg-[#121316] border border-white/15 rounded-xl px-3.5 py-2 text-xs font-bold uppercase text-neutral-200"
            >
              <option value="all">All Bottles ({products.length})</option>
              <option value="offers">
                Active Offers Only ({activeOffersCount})
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <OfferProductRow
              key={product.id + (product.updatedAt || '')}
              product={product}
              saving={savingId === product.id}
              onToggle={() => handleToggleOffer(product)}
              onSaveDetails={(offerText) =>
                handleUpdateOfferDetails(product, offerText)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferProductRow({
  product,
  saving,
  onToggle,
  onSaveDetails,
}: {
  product: Product;
  saving: boolean;
  onToggle: () => void;
  onSaveDetails: (offerText: string) => void;
}) {
  const [offerText, setOfferText] = useState(product.offerText || '');

  const imageSrc =
    product.images?.[0] ||
    product.thumbnailUrl ||
    'https://res.cloudinary.com/ovmougmy/image/upload/v1793981778/jfk-liquors/bourbon-jim-beam.jpg';

  return (
    <div
      className={`p-4 rounded-xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
        product.isOffer
          ? 'bg-[#242424] border-[#F5D900]/50'
          : 'bg-[#141518] border-white/[0.06]'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-[#0A0A0A]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-white truncate">
              {product.name}
            </p>
            {product.isOffer && (
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#F5D900] text-[#050505]">
                Active Offer
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 capitalize">
            {product.category.replace(/-/g, ' ')}
            {product.subcategory
              ? ` • ${product.subcategory.replace(/-/g, ' ')}`
              : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Offer Label (e.g. Special Store Offer / Limited Drop)"
          value={offerText}
          onChange={(e) => setOfferText(e.target.value)}
          className="w-64 bg-[#111111] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5D900]"
        />

        <button
          type="button"
          disabled={saving}
          onClick={() => onSaveDetails(offerText)}
          className="px-3.5 py-2 rounded-lg bg-[#F5D900] hover:bg-[#FFE524] text-[#050505] text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Save Offer
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={onToggle}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer ${
            product.isOffer
              ? 'bg-red-950/70 border-red-500/40 text-red-200 hover:bg-red-900'
              : 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200 hover:bg-emerald-900'
          }`}
        >
          {product.isOffer ? 'Remove from Offers' : '+ Add to Offers'}
        </button>
      </div>
    </div>
  );
}

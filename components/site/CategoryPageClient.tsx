'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import CategorySwitcher from './CategorySwitcher';
import {
  getProducts,
  getCategoryBySlug,
  getCategories,
  getInstantProducts,
  getInstantCategories,
} from '@/lib/firestore';
import { useSiteContent } from '@/lib/useSiteContent';
import type { Product, Category } from '@/types';

interface Props {
  categorySlug: string;
  initialProducts: Product[];
  initialCategory: Category | null;
  initialCategories: Category[];
}

export default function CategoryPageClient({
  categorySlug: propCategorySlug,
  initialProducts,
  initialCategory,
  initialCategories,
}: Props) {
  const [resolvedSlug, setResolvedSlug] = useState(propCategorySlug);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [allCategories, setAllCategories] =
    useState<Category[]>(initialCategories);
  const [hydrated, setHydrated] = useState(false);
  const { brand, catalogPage } = useSiteContent();

  useEffect(() => {
    let activeSlug = propCategorySlug;
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname
        .replace(/\/+$/, '')
        .split('/')
        .filter(Boolean);
      if (parts[0] === 'products' && parts[1]) {
        activeSlug = decodeURIComponent(parts[1]);
      }
      const subParam = new URLSearchParams(window.location.search).get('sub');
      if (subParam) {
        setSelectedSubcategory(subParam);
      } else {
        setSelectedSubcategory('all');
      }
    }
    setResolvedSlug(activeSlug);

    const instCats = getInstantCategories();
    const instCat =
      instCats.find((c) => c.slug === activeSlug || c.id === activeSlug) ||
      null;
    setAllCategories(instCats);
    if (instCat) setCategory(instCat);
    setProducts(
      getInstantProducts().filter((p) => p.category === activeSlug)
    );
    setHydrated(true);

    async function syncCatPage() {
      const [latestProds, latestCat, latestCats] = await Promise.all([
        getProducts(activeSlug),
        getCategoryBySlug(activeSlug),
        getCategories(),
      ]);
      setProducts(latestProds);
      if (latestCat) setCategory(latestCat);
      setAllCategories(latestCats);
    }
    syncCatPage();
    window.addEventListener('jfk-catalog-updated', syncCatPage);
    window.addEventListener('storage', syncCatPage);
    return () => {
      window.removeEventListener('jfk-catalog-updated', syncCatPage);
      window.removeEventListener('storage', syncCatPage);
    };
  }, [propCategorySlug]);

  const catName = !hydrated
    ? ''
    : category?.name || resolvedSlug.replace(/-/g, ' ');
  const bannerText = !hydrated
    ? ''
    : category?.bannerText ||
      category?.description ||
      'Curated collection handpicked for quality, character, and exceptional value.';

  // Gather subcategories defined on the category + any subcategory values present on products
  const subcategoriesList = (() => {
    const map = new Map<string, string>();
    if (Array.isArray(category?.subcategories)) {
      for (const sub of category!.subcategories!) {
        if (sub.slug && sub.name) {
          map.set(sub.slug, sub.name);
        }
      }
    }
    for (const p of products) {
      if (p.subcategory && !map.has(p.subcategory)) {
        map.set(
          p.subcategory,
          p.subcategory
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase())
        );
      }
    }
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  })();

  const displayedProducts =
    selectedSubcategory === 'all'
      ? products
      : products.filter(
          (p) =>
            p.subcategory === selectedSubcategory ||
            p.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase()
        );

  return (
    <div className="bg-[#050505] text-[#FFFFFF] min-h-screen">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/[0.08] overflow-hidden bg-[#07080A]">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 85% 15%, rgba(245, 217, 0, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 15% 90%, rgba(91, 16, 24, 0.25) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F5D900] animate-pulse" />
                <p className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#F5D900]">
                  {brand.storeName.toUpperCase()} &bull; {catName.toUpperCase()}
                </p>
              </div>

              <h1
                className="font-anton tracking-wide uppercase text-white mb-6 leading-[0.95]"
                style={{ fontSize: 'clamp(2.8rem, 6.2vw, 5.5rem)' }}
              >
                {catName}
              </h1>

              {bannerText && (
                <p className="font-sans font-normal text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                  {bannerText}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-400 uppercase tracking-widest">
                <Link
                  href="/"
                  className="hover:text-[#F5D900] transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/products"
                  className="hover:text-[#F5D900] transition-colors"
                >
                  The Vault
                </Link>
                <span>/</span>
                <span className="text-[#F5D900] font-bold">{catName}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-white">
                  {displayedProducts.length} Bottles
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-sm bg-[#121316]/95 border border-white/[0.12] p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5D900] via-[#F5D900]/70 to-transparent" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-neutral-400">
                    {catalogPage.serviceBoxTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#F5D900]/10 text-[#F5D900] border border-[#F5D900]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900]" />
                    {catalogPage.serviceBoxBadge}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-neutral-400 block mb-1">
                    {catalogPage.serviceBoxCallLabel}
                  </span>
                  <a
                    href={`tel:${brand.phoneTel}`}
                    className="font-anton text-3xl sm:text-4xl text-[#F5D900] hover:text-white transition-colors tracking-wide inline-flex items-center gap-2"
                  >
                    <span>{brand.phoneDisplay}</span>
                    <span className="text-base text-neutral-400">↗</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/[0.08] text-xs font-sans text-neutral-300 leading-relaxed">
                  <p>
                    <span className="text-[#F5D900] font-semibold">
                      Stock changes daily.
                    </span>{' '}
                    Call{' '}
                    <a
                      href={`tel:${brand.phoneTel}`}
                      className="text-[#F5D900] font-bold underline hover:text-white transition-colors"
                    >
                      {brand.phoneFull}
                    </a>{' '}
                    to check availability. Must be 21+ with valid ID.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-sans text-neutral-400">
                  <span>
                    {brand.hoursWeekdayLabel}: {brand.hoursWeekdayTime}
                  </span>
                  <span className="text-neutral-500">
                    {brand.hoursSundayLabel}: {brand.hoursSundayTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategorySwitcher active={resolvedSlug} categories={allCategories} />

      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-14 sm:py-20">
        {/* Subcategory Filter Bar (if category has subcategories) */}
        {subcategoriesList.length > 0 && (
          <div className="mb-10 pb-6 border-b border-white/[0.08]">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Filter {catName} by Subcategory
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedSubcategory('all')}
                className={`px-4 py-2 rounded-sm text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSubcategory === 'all'
                    ? 'bg-[#F5D900] text-[#050505] shadow-md'
                    : 'bg-[#121316] text-neutral-300 border border-white/10 hover:border-[#F5D900] hover:text-[#F5D900]'
                }`}
              >
                All {catName} ({products.length})
              </button>
              {subcategoriesList.map((sub) => {
                const count = products.filter(
                  (p) => p.subcategory === sub.slug
                ).length;
                const active = selectedSubcategory === sub.slug;
                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => setSelectedSubcategory(sub.slug)}
                    className={`px-4 py-2 rounded-sm text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-[#F5D900] text-[#050505] shadow-md'
                        : 'bg-[#121316] text-neutral-300 border border-white/10 hover:border-[#F5D900] hover:text-[#F5D900]'
                    }`}
                  >
                    {sub.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <p className="text-xs font-sans uppercase tracking-wider text-neutral-400">
            Showing{' '}
            <span className="text-[#F5D900] font-bold">
              {displayedProducts.length}
            </span>{' '}
            Curated Bottles
          </p>
          <a
            href={`tel:${brand.phoneTel}`}
            className="text-xs font-sans text-[#F5D900] font-semibold hover:underline"
          >
            Call Store: {brand.phoneDisplay}
          </a>
        </div>

        {!hydrated ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded bg-[#121316] border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-24 rounded bg-[#161616] border border-white/10">
            <h3 className="font-anton text-3xl text-[#FFFFFF] mb-2 uppercase tracking-wide">
              No Bottles In This Filter
            </h3>
            <p className="text-neutral-300 font-sans text-sm max-w-md mx-auto mb-6">
              Our inventory changes daily with fresh distributor allocations.
              View all bottles in this department or call the store directly.
            </p>
            {selectedSubcategory !== 'all' ? (
              <button
                type="button"
                onClick={() => setSelectedSubcategory('all')}
                className="btn-primary cursor-pointer"
              >
                Show All {catName}
              </button>
            ) : (
              <a href={`tel:${brand.phoneTel}`} className="btn-primary">
                Call Store: {brand.phoneFull} ↗
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
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
}: Props) {
  const [resolvedSlug, setResolvedSlug] = useState(propCategorySlug);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [hydrated, setHydrated] = useState(false);
  const { brand, catalogPage, cardConfig } = useSiteContent();

  useEffect(() => {
    function readUrlState() {
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
        setSelectedSubcategory(subParam ? decodeURIComponent(subParam) : 'all');
      }
      setResolvedSlug(activeSlug);
      return activeSlug;
    }

    readUrlState();

    function handleMemoryUpdate() {
      const currentSlug = readUrlState();
      const instCats = getInstantCategories();
      const instCat =
        instCats.find((c) => c.slug === currentSlug || c.id === currentSlug) ||
        null;
      if (instCat) setCategory(instCat);
      setProducts(
        getInstantProducts().filter((p) => p.category === currentSlug)
      );
    }
    handleMemoryUpdate();
    setHydrated(true);

    async function syncCatPage() {
      const currentSlug = readUrlState();
      const [latestProds, latestCat] = await Promise.all([
        getProducts(currentSlug),
        getCategoryBySlug(currentSlug),
        getCategories(),
      ]);
      setProducts(latestProds);
      if (latestCat) setCategory(latestCat);
    }
    syncCatPage();

    function handleSubEvent(e: Event) {
      const custom = e as CustomEvent<{ category?: string; sub?: string }>;
      if (custom.detail?.sub) {
        setSelectedSubcategory(custom.detail.sub);
      } else {
        readUrlState();
      }
    }

    window.addEventListener('jfk-catalog-updated', handleMemoryUpdate);
    window.addEventListener('jfk-sub-change', handleSubEvent);
    window.addEventListener('popstate', readUrlState);
    window.addEventListener('focus', syncCatPage);
    return () => {
      window.removeEventListener('jfk-catalog-updated', handleMemoryUpdate);
      window.removeEventListener('jfk-sub-change', handleSubEvent);
      window.removeEventListener('popstate', readUrlState);
      window.removeEventListener('focus', syncCatPage);
    };
  }, [propCategorySlug]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const subParam = new URLSearchParams(window.location.search).get('sub');
      const targetSub = subParam ? decodeURIComponent(subParam) : 'all';
      if (targetSub !== selectedSubcategory) {
        setSelectedSubcategory(targetSub);
      }
    }
  });

  const catName = !hydrated
    ? ''
    : category?.name || resolvedSlug.replace(/-/g, ' ');

  const normSub = selectedSubcategory
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const activeSubObj =
    selectedSubcategory !== 'all' && Array.isArray(category?.subcategories)
      ? category!.subcategories!.find(
          (s) =>
            s.slug === selectedSubcategory ||
            s.id === selectedSubcategory ||
            s.slug?.toLowerCase() === selectedSubcategory.toLowerCase() ||
            s.name
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '') === normSub
        )
      : undefined;

  const activeSubName =
    selectedSubcategory !== 'all'
      ? activeSubObj?.name ||
        selectedSubcategory
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())
      : '';

  const mainHeading =
    selectedSubcategory !== 'all' && activeSubName ? activeSubName : catName;

  const bannerText = !hydrated
    ? ''
    : (selectedSubcategory !== 'all' && activeSubObj?.description) ||
      category?.bannerText ||
      category?.description ||
      'Curated collection handpicked for quality, character, and exceptional value.';

  // Hero section background image set by admin (Subcategory Image -> Category Image -> Global Hero Image)
  const heroBgImage =
    (selectedSubcategory !== 'all' && activeSubObj?.imageUrl) ||
    category?.productsBgUrl ||
    category?.imageUrl ||
    cardConfig?.sectionBackgroundImageUrl ||
    '';

  const displayedProducts =
    selectedSubcategory === 'all'
      ? products
      : products.filter(
          (p) =>
            p.subcategory === selectedSubcategory ||
            p.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase()
        );

  const gridColsClass =
    cardConfig?.cardsPerRow === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

  return (
    <div className="bg-[#050505] text-[#FFFFFF] min-h-screen">
      {/* Hero Header (Background Image ONLY on this section, bright and clearly visible) */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 border-b border-white/[0.08] overflow-hidden bg-[#07080A]">
        {heroBgImage && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={heroBgImage}
              alt={mainHeading}
              fill
              className="object-cover object-center opacity-85"
              priority
            />
            {/* Clean directional vignette so text is readable while the background photo stays vivid and clear */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
          </div>
        )}

        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F5D900] animate-pulse" />
                <p className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#F5D900] drop-shadow">
                  {brand.storeName.toUpperCase()} &bull; {catName.toUpperCase()}
                  {selectedSubcategory !== 'all' && activeSubName
                    ? ` • ${activeSubName.toUpperCase()}`
                    : ''}
                </p>
              </div>

              <h1
                className="font-anton tracking-wide uppercase text-white mb-6 leading-[0.95] drop-shadow-lg"
                style={{ fontSize: 'clamp(2.8rem, 6.2vw, 5.5rem)' }}
              >
                {mainHeading}
              </h1>

              {bannerText && (
                <p className="font-sans font-normal text-neutral-200 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 drop-shadow">
                  {bannerText}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-neutral-300 uppercase tracking-widest">
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
                {selectedSubcategory !== 'all' && activeSubName ? (
                  <>
                    <Link
                      href={`/products/${resolvedSlug}`}
                      onClick={() => setSelectedSubcategory('all')}
                      className="hover:text-[#F5D900] transition-colors"
                    >
                      {catName}
                    </Link>
                    <span>/</span>
                    <span className="text-[#F5D900] font-bold">
                      {activeSubName}
                    </span>
                  </>
                ) : (
                  <span className="text-[#F5D900] font-bold">{catName}</span>
                )}
                <span className="text-neutral-500">•</span>
                <span className="text-white">
                  {displayedProducts.length}{' '}
                  {displayedProducts.length === 1 ? 'Bottle' : 'Bottles'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-sm bg-[#121316]/90 border border-white/[0.15] p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
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

      {/* Product Cards Section (Clean Solid Dark Background — 4 Cards Per Row) */}
      <section className="relative py-14 sm:py-20 bg-[#050505]">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <p className="text-xs font-sans uppercase tracking-wider text-neutral-400">
              Showing{' '}
              <span className="text-[#F5D900] font-bold">
                {displayedProducts.length}
              </span>{' '}
              {mainHeading}{' '}
              {displayedProducts.length === 1 ? 'Bottle' : 'Bottles'}
            </p>
            <a
              href={`tel:${brand.phoneTel}`}
              className="text-xs font-sans text-[#F5D900] font-semibold hover:underline"
            >
              Call Store: {brand.phoneDisplay}
            </a>
          </div>

          {!hydrated ? (
            <div className={`grid ${gridColsClass}`}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] rounded bg-[#121316] border border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-24 rounded bg-[#161616] border border-white/10">
              <h3 className="font-anton text-3xl text-[#FFFFFF] mb-2 uppercase tracking-wide">
                No Bottles Found in {mainHeading}
              </h3>
              <p className="text-neutral-300 font-sans text-sm max-w-md mx-auto mb-6">
                Our inventory changes daily with fresh distributor allocations.
                View all bottles in {catName} or call the store directly.
              </p>
              {selectedSubcategory !== 'all' ? (
                <Link
                  href={`/products/${resolvedSlug}`}
                  onClick={() => setSelectedSubcategory('all')}
                  className="btn-primary cursor-pointer"
                >
                  View All {catName}
                </Link>
              ) : (
                <a href={`tel:${brand.phoneTel}`} className="btn-primary">
                  Call Store: {brand.phoneFull} ↗
                </a>
              )}
            </div>
          ) : (
            <div className={`grid ${gridColsClass}`}>
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

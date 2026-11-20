'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import CategorySwitcher from './CategorySwitcher';
import {
  getProducts,
  getCategories,
  getInstantProducts,
  getInstantCategories,
} from '@/lib/firestore';
import { useSiteContent } from '@/lib/useSiteContent';
import type { Product, Category } from '@/types';

interface Props {
  initialProducts: Product[];
  initialCategories: Category[];
}

export default function AllProductsClient({
  initialProducts,
  initialCategories,
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [hydrated, setHydrated] = useState(false);
  const { brand, catalogPage } = useSiteContent();

  useEffect(() => {
    setProducts(getInstantProducts());
    setCategories(getInstantCategories());
    setHydrated(true);

    async function syncAll() {
      const [latestProds, latestCats] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(latestProds);
      setCategories(latestCats);
    }
    syncAll();
    window.addEventListener('jfk-catalog-updated', syncAll);
    window.addEventListener('storage', syncAll);
    return () => {
      window.removeEventListener('jfk-catalog-updated', syncAll);
      window.removeEventListener('storage', syncAll);
    };
  }, []);

  return (
    <div className="bg-[#050505] text-[#FFFFFF] min-h-screen">
      {/* Editorial Luxury Hero Section */}
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
                  {catalogPage.eyebrow}
                </p>
              </div>

              <h1
                className="font-anton tracking-wide uppercase text-white mb-6 leading-[0.95]"
                style={{ fontSize: 'clamp(2.8rem, 6.2vw, 5.5rem)' }}
              >
                {catalogPage.headingWhite}{' '}
                <span className="text-[#F5D900]">
                  {catalogPage.headingGold}
                </span>
              </h1>

              <p className="font-sans font-normal text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                {catalogPage.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-400 uppercase tracking-widest">
                <Link
                  href="/"
                  className="hover:text-[#F5D900] transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-white font-medium">
                  All Curated Bottles
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-[#F5D900] font-bold">
                  {products.length} Bottles Registered
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

      <CategorySwitcher active="" categories={categories} />

      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-white/[0.08] gap-3">
          <p className="text-xs font-sans uppercase tracking-wider text-neutral-400">
            Showing{' '}
            <span className="text-[#F5D900] font-bold">{products.length}</span>{' '}
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
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded bg-[#121316] border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 rounded bg-[#121316] border border-white/10">
            <h3 className="font-anton text-3xl text-white mb-2 uppercase tracking-wide">
              Catalog Updating
            </h3>
            <p className="text-neutral-300 font-sans text-sm max-w-md mx-auto mb-6">
              Our inventory changes daily with fresh distributor allocations.
              Please call the store directly or visit us in person.
            </p>
            <a href={`tel:${brand.phoneTel}`} className="btn-primary">
              Call Store: {brand.phoneFull} ↗
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

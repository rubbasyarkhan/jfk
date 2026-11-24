'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import {
  getAllProducts,
  getCategories,
  getInstantProducts,
  getInstantCategories,
} from '@/lib/firestore';
import { useSiteContent } from '@/lib/useSiteContent';
import type { Product } from '@/types';

export default function OffersPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { brand, offersPage, catalogPage, cardConfig } = useSiteContent();

  useEffect(() => {
    function handleMemoryUpdate() {
      setProducts(getInstantProducts());
      getInstantCategories();
    }
    handleMemoryUpdate();
    setHydrated(true);

    async function syncOffers() {
      const [latestProds] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);
      setProducts(latestProds);
    }
    syncOffers();
    window.addEventListener('jfk-catalog-updated', handleMemoryUpdate);
    window.addEventListener('focus', syncOffers);
    return () => {
      window.removeEventListener('jfk-catalog-updated', handleMemoryUpdate);
      window.removeEventListener('focus', syncOffers);
    };
  }, []);

  // Products explicitly marked as Offers, or fallback to featured if none marked
  const allOffers = (() => {
    const tagged = products.filter(
      (p) =>
        p.isOffer ||
        p.badge === 'Sale' ||
        p.badge === 'Offer' ||
        Boolean(p.offerText)
    );
    return tagged.length > 0 ? tagged : products.filter((p) => p.featured);
  })();

  const displayedOffers = allOffers;
  const sectionBgImage = cardConfig?.sectionBackgroundImageUrl || '';
  const gridColsClass =
    cardConfig?.cardsPerRow === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

  return (
    <div className="bg-[#050505] text-[#FFFFFF] min-h-screen">
      {/* Offers Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/[0.08] overflow-hidden bg-[#07080A]">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(245, 217, 0, 0.14) 0%, transparent 60%), radial-gradient(ellipse at 15% 85%, rgba(91, 16, 24, 0.35) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F5D900] animate-pulse" />
                <p className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#F5D900]">
                  {offersPage.eyebrow}
                </p>
              </div>

              <h1
                className="font-anton tracking-wide uppercase text-white mb-6 leading-[0.95]"
                style={{ fontSize: 'clamp(2.8rem, 6.2vw, 5.5rem)' }}
              >
                {offersPage.headingWhite}{' '}
                <span className="text-[#F5D900]">
                  {offersPage.headingGold}
                </span>
              </h1>

              <p className="font-sans font-normal text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                {offersPage.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-400 uppercase tracking-widest">
                <Link
                  href="/"
                  className="hover:text-[#F5D900] transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#F5D900] font-bold">
                  {offersPage.navbarLabel || 'Offers'}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-white font-medium">
                  {allOffers.length} Active Store Offers
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-sm bg-[#121316]/95 border border-[#F5D900]/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5D900] via-[#F5D900]/70 to-transparent" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-neutral-400">
                    {catalogPage.serviceBoxTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#F5D900]/10 text-[#F5D900] border border-[#F5D900]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900]" />
                    Active Offers Today
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-neutral-400 block mb-1">
                    Call to Reserve or Check Offer Availability
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
                  <p>{brand.complianceNotice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {sectionBgImage && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={sectionBgImage}
              alt=""
              fill
              className="object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/80 to-[#050505]/95" />
          </div>
        )}

        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-white/[0.08] gap-3">
            <p className="text-xs font-sans uppercase tracking-wider text-neutral-400">
              Showing{' '}
              <span className="text-[#F5D900] font-bold">
                {displayedOffers.length}
              </span>{' '}
              Featured Store Offers
            </p>
            <Link
              href="/products"
              className="text-xs font-sans text-[#F5D900] font-semibold hover:underline"
            >
              Browse Complete Store Catalog ↗
            </Link>
          </div>

          {!hydrated ? (
            <div className={`grid ${gridColsClass}`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] rounded bg-[#121316] border border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          ) : displayedOffers.length === 0 ? (
            <div className="text-center py-24 rounded bg-[#121316] border border-white/10">
              <h3 className="font-anton text-3xl text-white mb-2 uppercase tracking-wide">
                No Active Offers Right Now
              </h3>
              <p className="text-neutral-300 font-sans text-sm max-w-md mx-auto mb-6">
                Check our full collection or call our JFK Boulevard store
                directly for today&apos;s in-store specials.
              </p>
              <Link href="/products" className="btn-primary cursor-pointer">
                Browse Full Collection
              </Link>
            </div>
          ) : (
            <div className={`grid ${gridColsClass}`}>
              {displayedOffers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Offer Highlight Banner */}
      <section className="py-16 bg-[#4A0A10] border-t border-[#F5D900]/25">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-mono font-bold text-[#F5D900] uppercase tracking-[0.2em] mb-2">
              {offersPage.bannerTag}
            </p>
            <h2 className="font-anton text-2xl sm:text-4xl text-white uppercase tracking-wide mb-3">
              {offersPage.bannerTitle}
            </h2>
            <p className="text-sm text-white/90 font-light leading-relaxed">
              {offersPage.bannerText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <a href={`tel:${brand.phoneTel}`} className="btn-gold">
              Call {brand.phoneDisplay}
            </a>
            <a
              href={brand.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost border-white/30 hover:border-white hover:text-white"
            >
              Get Directions ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import { getFeaturedProducts, getInstantProducts } from '@/lib/firestore';
import { useSiteContent } from '@/lib/useSiteContent';
import type { Product } from '@/types';

interface Props {
  initialProducts: Product[];
}

export default function FeaturedVaultSection({ initialProducts }: Props) {
  const [featuredProducts, setFeaturedProducts] =
    useState<Product[]>(initialProducts);
  const [hydrated, setHydrated] = useState(false);
  const { vaultSection, cardConfig } = useSiteContent();
  const maxItems = Number(vaultSection.maxItems) || 8;
  const sectionBgImage = cardConfig?.sectionBackgroundImageUrl || '';
  const gridColsClass =
    cardConfig?.cardsPerRow === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

  useEffect(() => {
    function handleMemoryUpdate() {
      setFeaturedProducts(
        getInstantProducts()
          .filter((p) => p.featured)
          .slice(0, maxItems)
      );
    }
    handleMemoryUpdate();
    setHydrated(true);

    async function syncFeatured() {
      const latest = await getFeaturedProducts(maxItems);
      setFeaturedProducts(latest);
    }
    syncFeatured();
    window.addEventListener('jfk-catalog-updated', handleMemoryUpdate);
    window.addEventListener('focus', syncFeatured);
    return () => {
      window.removeEventListener('jfk-catalog-updated', handleMemoryUpdate);
      window.removeEventListener('focus', syncFeatured);
    };
  }, [maxItems]);

  if (hydrated && featuredProducts.length === 0) return null;

  return (
    <section
      id="vault"
      className="py-24 sm:py-32 relative bg-[#0B0C0E] border-b border-white/[0.08] overflow-hidden"
    >
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
        {/* Vault Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <p className="meta-tag mb-3">{vaultSection.eyebrow}</p>
            <h2
              className="font-anton tracking-wide uppercase text-white"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                lineHeight: 1.05,
              }}
            >
              {vaultSection.headingWhite}{' '}
              <span className="text-[#F5D900]">
                {vaultSection.headingGold}
              </span>
            </h2>
          </div>

          <Link
            href="/products"
            prefetch={true}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#F5D900] hover:underline transition-all"
          >
            <span>{vaultSection.browseAllText}</span>
            <span>↗</span>
          </Link>
        </div>

        {/* 4 Cards In A Row Grid */}
        <div className={`grid ${gridColsClass}`}>
          {!hydrated
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] rounded bg-[#121316] border border-white/[0.06] animate-pulse"
                />
              ))
            : featuredProducts.map((product) => (
                <ProductCard
                  key={product.id + (product.updatedAt || '')}
                  product={product}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

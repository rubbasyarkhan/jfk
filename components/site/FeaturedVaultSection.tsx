'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  const { vaultSection } = useSiteContent();
  const maxItems = Number(vaultSection.maxItems) || 6;

  useEffect(() => {
    setFeaturedProducts(
      getInstantProducts()
        .filter((p) => p.featured)
        .slice(0, maxItems)
    );
    setHydrated(true);

    async function syncFeatured() {
      const latest = await getFeaturedProducts(maxItems);
      setFeaturedProducts(latest);
    }
    syncFeatured();
    window.addEventListener('jfk-catalog-updated', syncFeatured);
    window.addEventListener('storage', syncFeatured);
    return () => {
      window.removeEventListener('jfk-catalog-updated', syncFeatured);
      window.removeEventListener('storage', syncFeatured);
    };
  }, [maxItems]);

  if (hydrated && featuredProducts.length === 0) return null;

  return (
    <section
      id="vault"
      className="py-24 sm:py-32 relative bg-[#0B0C0E] border-b border-white/[0.08]"
    >
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
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

        {/* 3 Cards In A Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!hydrated
            ? Array.from({ length: 3 }).map((_, i) => (
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

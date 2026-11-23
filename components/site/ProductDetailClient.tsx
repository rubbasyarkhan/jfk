'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import ProductImageGallery from './ProductImageGallery';
import {
  getProductBySlug,
  getProducts,
  getInstantProducts,
} from '@/lib/firestore';
import { useSiteContent } from '@/lib/useSiteContent';
import type { Product } from '@/types';

interface Props {
  slug: string;
  initialProduct: Product;
  initialRelated: Product[];
}

export default function ProductDetailClient({
  slug: propSlug,
  initialProduct,
  initialRelated,
}: Props) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [relatedProducts, setRelatedProducts] =
    useState<Product[]>(initialRelated);
  const [hydrated, setHydrated] = useState(false);
  const { brand } = useSiteContent();

  useEffect(() => {
    let activeSlug = propSlug;
    if (typeof window !== 'undefined') {
      const parts = window.location.pathname
        .replace(/\/+$/, '')
        .split('/')
        .filter(Boolean);
      if (parts[0] === 'products' && parts.length >= 3) {
        activeSlug = decodeURIComponent(parts[parts.length - 1]);
      }
    }

    const allInst = getInstantProducts();
    const instProd = allInst.find(
      (p) => p.slug === activeSlug || p.id === activeSlug
    );
    if (instProd) {
      setProduct(instProd);
      setRelatedProducts(
        allInst
          .filter(
            (p) =>
              p.category === instProd.category &&
              p.slug !== instProd.slug &&
              p.id !== instProd.id
          )
          .slice(0, 3)
      );
    }
    setHydrated(true);

    async function syncDetail() {
      const latestProd = await getProductBySlug(activeSlug);
      if (latestProd) {
        setProduct(latestProd);
        const allCatProds = await getProducts(latestProd.category);
        setRelatedProducts(
          allCatProds
            .filter(
              (p) => p.slug !== latestProd.slug && p.id !== latestProd.id
            )
            .slice(0, 3)
        );
      }
    }
    syncDetail();
    window.addEventListener('jfk-catalog-updated', syncDetail);
    window.addEventListener('storage', syncDetail);
    return () => {
      window.removeEventListener('jfk-catalog-updated', syncDetail);
      window.removeEventListener('storage', syncDetail);
    };
  }, [propSlug]);

  if (!hydrated) {
    return (
      <div className="bg-[#050505] text-[#FFFFFF] min-h-screen py-20 sm:py-28">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6 aspect-[4/5] rounded bg-[#121316] border border-white/[0.06] animate-pulse" />
            <div className="lg:col-span-6 space-y-6">
              <div className="h-12 w-3/4 rounded bg-[#121316] animate-pulse" />
              <div className="h-24 w-full rounded bg-[#121316] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnailUrl];

  return (
    <div className="bg-[#050505] text-[#FFFFFF] min-h-screen py-20 sm:py-28">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Minimal Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-10 uppercase tracking-widest font-sans">
          <Link href="/" className="hover:text-[#F5D900] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-[#F5D900] transition-colors"
          >
            The Collection
          </Link>
          <span>/</span>
          <Link
            href={`/products/${product.category}`}
            className="hover:text-[#F5D900] transition-colors capitalize"
          >
            {product.category.replace(/-/g, ' ')}
          </Link>
          {product.subcategory && (
            <>
              <span>/</span>
              <Link
                href={`/products/${product.category}?sub=${encodeURIComponent(product.subcategory)}`}
                className="hover:text-[#F5D900] transition-colors capitalize"
              >
                {product.subcategory.replace(/-/g, ' ')}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white truncate max-w-[220px] font-medium">
            {product.name}
          </span>
        </nav>

        {/* Minimal Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Visual Showcase with Interactive Image Switcher */}
          <div className="lg:col-span-6">
            <ProductImageGallery
              key={product.id + (product.updatedAt || '')}
              images={images}
              name={product.name}
              badge={product.badge}
            />
          </div>

          {/* Right Column: Editorial Details & Clear Action */}
          <div className="lg:col-span-6 lg:pl-4">
            {product.tags?.length > 0 && (
              <p className="text-xs font-sans font-bold text-[#F5D900] tracking-[0.2em] uppercase mb-3">
                {product.tags.join(' • ')}
              </p>
            )}

            {(product.isOffer || product.offerText) && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#F5D900] text-[#050505] text-xs font-sans font-extrabold uppercase tracking-wider mb-3">
                <span>{product.offerText || 'Special In-Store Offer'}</span>
              </div>
            )}

            <h1
              className="font-anton tracking-wide uppercase text-white mb-4 leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
            >
              {product.name}
            </h1>

            {product.price !== undefined &&
              product.price !== null &&
              Number(product.price) > 0 && (
                <div className="flex items-baseline gap-3 mb-5 font-sans">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#F5D900]">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {product.comparePrice &&
                    Number(product.comparePrice) > Number(product.price) && (
                      <span className="text-base text-neutral-500 line-through">
                        ${Number(product.comparePrice).toFixed(2)}
                      </span>
                    )}
                </div>
              )}

            <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-white/10">
              {product.inStock !== false ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  In Store Today
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider bg-red-950/70 text-red-300 border border-red-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Call For Allocation
                </span>
              )}

              {product.volume && (
                <span className="px-3 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10">
                  {product.volume}
                </span>
              )}
              {product.abv ? (
                <span className="px-3 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10">
                  {product.abv}% ABV
                </span>
              ) : null}
              {product.origin && (
                <span className="px-3 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10">
                  {product.origin}
                </span>
              )}
              {product.brand && (
                <span className="px-3 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10">
                  {product.brand}
                </span>
              )}
              {product.subcategory && (
                <span className="px-3 py-1 rounded-sm text-xs font-sans font-medium text-[#F5D900] bg-[#161616] border border-[#F5D900]/30 capitalize">
                  {product.subcategory.replace(/-/g, ' ')}
                </span>
              )}
              {product.category && (
                <span className="px-3 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10 capitalize">
                  {product.category.replace(/-/g, ' ')}
                </span>
              )}
            </div>

            {/* Custom Fields Table if present */}
            {Array.isArray(product.customFields) &&
              product.customFields.filter((f) => f.label && f.value).length >
                0 && (
                <div className="mb-6 rounded-sm bg-[#121316] border border-white/10 divide-y divide-white/[0.06]">
                  {product.customFields
                    .filter((f) => f.label && f.value)
                    .map((field, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2.5 flex items-center justify-between text-xs font-sans"
                      >
                        <span className="font-bold uppercase tracking-wider text-neutral-400">
                          {field.label}
                        </span>
                        <span className="font-semibold text-white">
                          {field.value}
                        </span>
                      </div>
                    ))}
                </div>
              )}

            <div className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-normal mb-8">
              <p>{product.description || product.shortDescription}</p>
            </div>

            <div className="p-4 rounded-sm bg-[#121316] border border-[#F5D900]/30 text-xs sm:text-[13px] font-sans text-neutral-300 leading-relaxed mb-8">
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
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={`tel:${brand.phoneTel}`}
                className="btn-primary flex-1 text-center justify-center !py-4 text-xs font-bold uppercase tracking-[0.16em]"
              >
                <span>Call Store: {brand.phoneDisplay}</span>
              </a>

              <a
                href={brand.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center justify-center !py-4 text-xs font-semibold uppercase tracking-[0.14em]"
              >
                <span>Get Directions ↗</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-sans">
              <span>
                {brand.storeName} &bull; {brand.addressLine1}
              </span>
              <span className="text-[#F5D900] font-medium">
                {brand.airportNote}
              </span>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-28 pt-16 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="meta-tag mb-1">More In This Department</p>
                <h2 className="font-anton tracking-wide uppercase text-3xl sm:text-4xl text-white">
                  Related Selections
                </h2>
              </div>
              <Link
                href={`/products/${product.category}`}
                className="text-xs font-sans font-bold uppercase tracking-wider text-[#F5D900] hover:underline"
              >
                View Department ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

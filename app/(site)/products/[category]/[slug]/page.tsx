import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';
import { getProductBySlug, getProducts } from '@/lib/firestore';
import { INITIAL_PRODUCTS } from '@/lib/initialData';
import ProductCard from '@/components/site/ProductCard';
import ProductImageGallery from '@/components/site/ProductImageGallery';
import type { Metadata } from 'next';

export const revalidate = 120;

interface Props {
  params: { category: string; slug: string };
}

const getCachedProduct = cache(async (slug: string) => {
  return getProductBySlug(slug);
});

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getCachedProduct(params.slug);
  if (!product) {
    return { title: 'Bottle Not Found | JFK Liquors Houston' };
  }
  return {
    title: `${product.name} | JFK Liquors Houston`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getCachedProduct(params.slug);
  if (!product) {
    notFound();
  }

  // 3 related products for 3-cards-in-a-row layout
  const relatedProducts = (await getProducts(product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const images = product.images?.length > 0 ? product.images : [product.thumbnailUrl];

  return (
    <div className="bg-[#050505] text-[#FFFFFF] min-h-screen py-20 sm:py-28">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Minimal Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-10 uppercase tracking-widest font-sans">
          <Link href="/" className="hover:text-[#F5D900] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#F5D900] transition-colors">The Collection</Link>
          <span>/</span>
          <Link href={`/products/${product.category}`} className="hover:text-[#F5D900] transition-colors capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[220px] font-medium">{product.name}</span>
        </nav>

        {/* Minimal Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Visual Showcase with Interactive Image Switcher */}
          <div className="lg:col-span-6">
            <ProductImageGallery
              images={images}
              name={product.name}
              badge={product.badge}
            />
          </div>

          {/* Right Column: Editorial Details & Clear Action */}
          <div className="lg:col-span-6 lg:pl-4">
            
            {/* Tags in Montserrat */}
            {product.tags?.length > 0 && (
              <p className="text-xs font-sans font-bold text-[#F5D900] tracking-[0.2em] uppercase mb-3">
                {product.tags.join(' • ')}
              </p>
            )}

            {/* Bottle Title in Bold Anton Display */}
            <h1
              className="font-anton tracking-wide uppercase text-white mb-5 leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
            >
              {product.name}
            </h1>

            {/* Price & Specs Header */}
            <div className="flex flex-wrap items-baseline gap-4 mb-6 pb-6 border-b border-white/10">
              {product.price ? (
                <span className="font-anton text-3xl sm:text-4xl text-[#F5D900] tracking-wide">
                  ${product.price.toFixed(2)}
                </span>
              ) : (
                <span className="text-2xl text-[#F5D900] font-anton tracking-wide">Inquire in Store</span>
              )}

              {/* Specs Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.volume && (
                  <span className="px-2.5 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10">
                    {product.volume}
                  </span>
                )}
                {product.abv && (
                  <span className="px-2.5 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10">
                    {product.abv}% ABV
                  </span>
                )}
                {product.category && (
                  <span className="px-2.5 py-1 rounded-sm text-xs font-sans font-medium text-neutral-300 bg-[#161616] border border-white/10 capitalize">
                    {product.category.replace(/-/g, ' ')}
                  </span>
                )}
              </div>
            </div>

            {/* Description in Clean Montserrat */}
            <div className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-normal mb-8">
              <p>{product.description || product.shortDescription}</p>
            </div>

            {/* Compliance & Availability Line (Strict User Requirement) */}
            <div className="p-4 rounded-sm bg-[#121316] border border-[#F5D900]/30 text-xs sm:text-[13px] font-sans text-neutral-300 leading-relaxed mb-8">
              <span className="text-[#F5D900] font-semibold">Stock changes daily.</span>{' '}
              Call{' '}
              <a href="tel:+12815903300" className="text-[#F5D900] font-bold underline hover:text-white transition-colors">
                +1 281-590-3300
              </a>{' '}
              to check availability. Must be 21+ with valid ID.
            </div>

            {/* Dual CTAs: Call Store & Directions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="tel:+12815903300"
                className="btn-primary flex-1 text-center justify-center !py-4 text-xs font-bold uppercase tracking-[0.16em]"
              >
                <span>Call Store: (281) 590-3300</span>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center justify-center !py-4 text-xs font-semibold uppercase tracking-[0.14em]"
              >
                <span>Get Directions ↗</span>
              </a>
            </div>

            {/* Storefront Location Note */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-sans">
              <span>JFK Liquors &bull; 15655 John F Kennedy Blvd</span>
              <span className="text-[#F5D900] font-medium">3 min from IAH Airport</span>
            </div>

          </div>

        </div>

        {/* Related Selections — 3 Cards in a Row */}
        {relatedProducts.length > 0 && (
          <section className="mt-28 pt-16 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="meta-tag mb-1">More In This Department</p>
                <h2 className="font-anton tracking-wide uppercase text-3xl sm:text-4xl text-white">Related Selections</h2>
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

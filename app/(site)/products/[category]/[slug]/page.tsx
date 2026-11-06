import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getProducts } from '@/lib/firestore';
import { INITIAL_PRODUCTS } from '@/lib/initialData';
import ProductCard from '@/components/site/ProductCard';
import type { Metadata } from 'next';

interface Props {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Bottle Not Found | JFK Liquors Houston' };
  }
  return {
    title: `${product.name} | JFK Liquors Houston`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
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
          
          {/* Left Column: Visual Showcase (The Bottle is the Hero) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-sm overflow-hidden border border-white/[0.08] bg-[#0B0C0E] shadow-2xl">
              <Image
                src={images[0] || 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=85'}
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-103"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Subtle Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Minimal Allocation Badge */}
              {product.badge && (
                <span className="absolute top-5 left-5 px-3 py-1.5 rounded-sm text-[11px] font-sans font-bold uppercase tracking-[0.16em] bg-[#5B1018] text-[#F5D900] border border-[#F5D900]/40 shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Row if Multiple Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-sm overflow-hidden border border-white/10 bg-[#121316]">
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Editorial Details & Clear Action */}
          <div className="lg:col-span-6 lg:pl-4">
            
            {/* Tags in Montserrat */}
            {product.tags?.length > 0 && (
              <p className="text-xs font-sans font-bold text-[#F5D900] tracking-[0.2em] uppercase mb-3">
                {product.tags.join(' • ')}
              </p>
            )}

            {/* Bottle Title in Authoritative Playfair Display Serif */}
            <h1
              className="font-serif tracking-tight text-white mb-5 leading-[1.12]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)' }}
            >
              {product.name}
            </h1>

            {/* Price & Specs Header */}
            <div className="flex flex-wrap items-baseline gap-4 mb-6 pb-6 border-b border-white/10">
              {product.price ? (
                <span className="font-serif text-3xl sm:text-4xl text-[#F5D900] font-semibold">
                  ${product.price.toFixed(2)}
                </span>
              ) : (
                <span className="text-2xl text-[#F5D900] font-serif font-semibold">Inquire in Store</span>
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
                <h2 className="font-serif text-3xl sm:text-4xl text-white">Related Selections</h2>
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

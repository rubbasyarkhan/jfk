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
    return { title: 'Product Not Found | JFK Liquors' };
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

  const relatedProducts = (await getProducts(product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const images = product.images?.length > 0 ? product.images : [product.thumbnailUrl];

  return (
    <div className="bg-[#111111] text-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#A0A0A0] mb-10 uppercase tracking-widest font-bold">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/products/${product.category}`} className="hover:text-[#D4AF37] transition-colors">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-[#FFFFFF] truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Media Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#3A3A3A] bg-[#242424] shadow-2xl">
              <Image
                src={images[0] || 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#5B1018] text-[#D4AF37] border border-[#D4AF37]/40 shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#3A3A3A] bg-[#242424]">
                    <Image src={img} alt={`${product.name} preview ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Meta & Details */}
          <div className="lg:col-span-6">
            
            {/* Tags */}
            {product.tags?.length > 0 && (
              <p className="eyebrow mb-2">
                {product.tags.join(' • ')}
              </p>
            )}

            <h1
              className="font-display tracking-tight text-[#FFFFFF] uppercase mb-4"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', lineHeight: 1.05 }}
            >
              {product.name}
            </h1>

            {/* Price & Stock Row */}
            <div className="flex items-center gap-6 py-4 border-y border-[#242424] my-6">
              {product.price ? (
                <div>
                  <span className="text-[11px] text-[#A0A0A0] block uppercase tracking-wider mb-1 font-bold">Standard Bottle</span>
                  <span className="font-display text-3xl sm:text-4xl text-[#D4AF37]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-[#D4AF37] font-bold">In-Store Allocation</span>
              )}

              <div className="h-10 w-px bg-[#3A3A3A]" />

              <div>
                <span className="text-[11px] text-[#A0A0A0] block uppercase tracking-wider mb-1 font-bold">Availability</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  In Stock At JFK Blvd
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="text-[#C7C7C7] font-light leading-relaxed mb-8 text-base">
              <p>{product.description || product.shortDescription}</p>
            </div>

            {/* Bottle Specifications in Charcoal Box */}
            <div className="rounded-2xl border border-[#3A3A3A] bg-[#242424] p-6 mb-8 space-y-3">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
                Bottle Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[#A0A0A0] block text-xs uppercase font-bold">Department</span>
                  <span className="font-semibold text-[#FFFFFF] capitalize">{product.category.replace(/-/g, ' ')}</span>
                </div>
                {product.volume && (
                  <div>
                    <span className="text-[#A0A0A0] block text-xs uppercase font-bold">Volume</span>
                    <span className="font-semibold text-[#FFFFFF]">{product.volume}</span>
                  </div>
                )}
                {product.abv && (
                  <div>
                    <span className="text-[#A0A0A0] block text-xs uppercase font-bold">Alcohol Content</span>
                    <span className="font-semibold text-[#FFFFFF]">{product.abv}% ABV</span>
                  </div>
                )}
                {product.origin && (
                  <div>
                    <span className="text-[#A0A0A0] block text-xs uppercase font-bold">Origin</span>
                    <span className="font-semibold text-[#FFFFFF]">{product.origin}</span>
                  </div>
                )}
                {product.brand && (
                  <div>
                    <span className="text-[#A0A0A0] block text-xs uppercase font-bold">Distiller / Brand</span>
                    <span className="font-semibold text-[#FFFFFF]">{product.brand}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions: Gold Call Button + Ghost Directions */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+12815903300"
                  className="btn-gold flex-1 justify-center !py-3.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call To Hold Bottle: (281) 590-3300
                </a>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex-1 justify-center !py-3.5"
                >
                  Get Directions
                </a>
              </div>

              {/* Delivery Partner Strip */}
              <div className="p-4 rounded-xl border border-[#3A3A3A] bg-[#242424] flex items-center justify-between text-xs text-[#A0A0A0]">
                <span>Order on delivery apps:</span>
                <div className="flex gap-4 font-bold uppercase tracking-wider">
                  <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="text-[#67cb89] hover:underline">Uber Eats</a>
                  <span>&bull;</span>
                  <a href="https://www.doordash.com" target="_blank" rel="noopener noreferrer" className="text-[#ff6451] hover:underline">DoorDash</a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-28 pt-16 border-t border-[#242424]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="eyebrow mb-1">More In This Department</p>
                <h2 className="font-display text-3xl text-[#FFFFFF]">Related Selections</h2>
              </div>
              <Link href={`/products/${product.category}`} className="text-xs font-bold uppercase text-[#D4AF37] hover:underline">
                View Department &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

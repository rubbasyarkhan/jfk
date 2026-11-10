import { getProducts, getCategories } from '@/lib/firestore';
import ProductCard from '@/components/site/ProductCard';
import CategorySwitcher from '@/components/site/CategorySwitcher';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products & Curated Collection | JFK Liquors Houston',
  description:
    'Explore our complete collection of allocated bourbons, single malt scotch, cellar wines, cold craft beer, and premium tequila near IAH airport in Houston.',
};

export default async function AllProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="bg-[#050505] text-[#FFFFFF] min-h-screen">
      {/* Editorial Luxury Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/[0.08] overflow-hidden bg-[#07080A]">
        {/* Subtle Atmospheric Gold Warmth Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 85% 15%, rgba(245, 217, 0, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 15% 90%, rgba(91, 16, 24, 0.25) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            
            {/* Left Column: Authoritative Editorial Heading & Narrative */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F5D900] animate-pulse" />
                <p className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#F5D900]">
                  THE PRIVATE ARCHIVE &bull; COMPLETE CELLAR
                </p>
              </div>

              <h1
                className="font-anton tracking-wide uppercase text-white mb-6 leading-[0.95]"
                style={{ fontSize: 'clamp(2.8rem, 6.2vw, 5.5rem)' }}
              >
                The Curated <span className="text-[#F5D900]">Vault.</span>
              </h1>

              <p className="font-sans font-normal text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                Allocated Kentucky bourbons, rare single malts, collector-grade cellar wines, chilled Texas craft beers, and 100% Blue Agave tequilas curated along Houston’s IAH airport corridor.
              </p>

              {/* Minimal Navigation Breadcrumb & Quick Filter */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-400 uppercase tracking-widest">
                <Link href="/" className="hover:text-[#F5D900] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white font-medium">All Curated Bottles</span>
                <span className="text-neutral-600">•</span>
                <span className="text-[#F5D900] font-bold">{products.length} Bottles Registered</span>
              </div>
            </div>

            {/* Right Column: Luxury Cellar Concierge Card */}
            <div className="lg:col-span-5">
              <div className="rounded-sm bg-[#121316]/95 border border-white/[0.12] p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                {/* Accent top gold line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5D900] via-[#F5D900]/70 to-transparent" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-neutral-400">
                    Cellar Concierge Service
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#F5D900]/10 text-[#F5D900] border border-[#F5D900]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900]" />
                    In-Store Today
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-neutral-400 block mb-1">
                    Direct Bottle Inquiry & Holding
                  </span>
                  <a
                    href="tel:+12815903300"
                    className="font-anton text-3xl sm:text-4xl text-[#F5D900] hover:text-white transition-colors tracking-wide inline-flex items-center gap-2"
                  >
                    <span>(281) 590-3300</span>
                    <span className="text-base text-neutral-400">↗</span>
                  </a>
                </div>

                {/* User's Required Notice */}
                <div className="pt-4 border-t border-white/[0.08] text-xs font-sans text-neutral-300 leading-relaxed">
                  <p>
                    <span className="text-[#F5D900] font-semibold">Stock changes daily.</span> Call{' '}
                    <a href="tel:+12815903300" className="text-[#F5D900] font-bold underline hover:text-white transition-colors">
                      +1 281-590-3300
                    </a>{' '}
                    to check availability. Must be 21+ with valid ID.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-sans text-neutral-400">
                  <span>Mon–Sat 11:00 AM – 9:00 PM</span>
                  <span className="text-neutral-500">Sun Closed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Switcher Tabs */}
      <CategorySwitcher active="" categories={categories} />

      {/* Product Grid — 3 Cards In A Row */}
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-white/[0.08] gap-3">
          <p className="text-xs font-sans uppercase tracking-wider text-neutral-400">
            Showing <span className="text-[#F5D900] font-bold">{products.length}</span> Curated Bottles
          </p>
          <a
            href="tel:+12815903300"
            className="text-xs font-sans text-[#F5D900] font-semibold hover:underline"
          >
            Direct Cellar Reserve: (281) 590-3300
          </a>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 rounded bg-[#121316] border border-white/10">
            <h3 className="font-anton text-3xl text-white mb-2 uppercase tracking-wide">
              Catalog Updating
            </h3>
            <p className="text-neutral-300 font-sans text-sm max-w-md mx-auto mb-6">
              Our inventory changes daily with fresh distributor allocations. Please call the store directly or visit us in person.
            </p>
            <a href="tel:+12815903300" className="btn-primary">
              Call Store: +1 281-590-3300 ↗
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

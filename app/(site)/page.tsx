import HeroSection from '@/components/site/HeroSection';
import CollectionGrid from '@/components/site/CollectionGrid';
import PromotionalBanner from '@/components/site/PromotionalBanner';
import StorySection from '@/components/site/StorySection';
import DeliverySection from '@/components/site/DeliverySection';
import LocationSection from '@/components/site/LocationSection';
import ProductCard from '@/components/site/ProductCard';
import { getFeaturedProducts, getCategories } from '@/lib/firestore';
import Link from 'next/link';

export const metadata = {
  title: 'JFK Liquors — Houston, TX | Luxury Spirits, Fine Wine & Allocated Vault Near IAH',
  description:
    'Houston’s premier private spirits and cellar destination along the IAH airport corridor. Allocated bourbons, rare single malts, fine wines & on-demand delivery.',
};

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(6),
    getCategories(),
  ]);

  return (
    <div className="bg-[#050505] text-[#FFFFFF]">
      {/* 1. Primary Viewport Hero: High-Impact Editorial Canvas */}
      <HeroSection />

      {/* 2. Curated Department Gallery (01 // THE ARCHIVE) */}
      <CollectionGrid categories={categories} />

      {/* 3. The Allocated Vault / Featured Bottles — 3 Cards in a Row */}
      {featuredProducts.length > 0 && (
        <section id="vault" className="py-24 sm:py-32 relative bg-[#0B0C0E] border-b border-white/[0.08]">
          <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
            
            {/* Vault Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div>
                <p className="meta-tag mb-3">
                  02 // PRIVATE CELLAR ALLOCATIONS
                </p>
                <h2
                  className="font-anton tracking-wide uppercase text-white"
                  style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)', lineHeight: 1.05 }}
                >
                  Featured &amp;{' '}
                  <span className="text-[#F5D900]">
                    Allocated Vault.
                  </span>
                </h2>
              </div>

              <Link
                href="/products"
                prefetch={true}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#F5D900] hover:underline transition-all"
              >
                <span>Browse Entire Collection</span>
                <span>↗</span>
              </Link>
            </div>

            {/* 3 Cards In A Row Grid (Responsive 1 on mobile, 2 on tablet, 3 on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 4. Deep Burgundy Allocation Drop Banner */}
      <PromotionalBanner />

      {/* 5. Editorial Store Heritage & Bottle Photo Spread */}
      <StorySection />

      {/* 6. Delivery Concierge (Uber Eats & DoorDash) */}
      <DeliverySection />

      {/* 7. Storefront Presence & Dark Map */}
      <LocationSection />
    </div>
  );
}

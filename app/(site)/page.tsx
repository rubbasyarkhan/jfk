import HeroSection from '@/components/site/HeroSection';
import InfoBand from '@/components/site/InfoBand';
import CollectionGrid from '@/components/site/CollectionGrid';
import PromotionalBanner from '@/components/site/PromotionalBanner';
import StorySection from '@/components/site/StorySection';
import DeliverySection from '@/components/site/DeliverySection';
import LocationSection from '@/components/site/LocationSection';
import ProductCard from '@/components/site/ProductCard';
import { getFeaturedProducts } from '@/lib/firestore';
import Link from 'next/link';

export const metadata = {
  title: 'JFK Liquors — Houston, TX | Luxury Spirits, Fine Wine & Allocated Vault Near IAH',
  description:
    'Houston’s premier private spirits and cellar destination along the IAH airport corridor. Allocated bourbons, rare single malts, fine wines & on-demand delivery.',
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div className="bg-[#050505] text-[#FFFFFF]">
      {/* 1. Primary Viewport Hero: High-Impact Editorial Canvas with Top Header & Split Bottom Alignment */}
      <HeroSection />

      {/* 2. Precision 3-Column Info Ticker */}
      <InfoBand />

      {/* 3. Curated Department Gallery (01 // THE ARCHIVE) */}
      <CollectionGrid />

      {/* 4. The Allocated Vault / Featured Bottles (id="vault") */}
      {featuredProducts.length > 0 && (
        <section id="vault" className="py-24 sm:py-32 relative bg-[#0B0C0E] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            {/* Vault Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div>
                <p className="meta-tag mb-3">
                  02 // PRIVATE CELLAR ALLOCATIONS
                </p>
                <h2
                  className="font-serif tracking-tight text-white"
                  style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)', lineHeight: 1.05 }}
                >
                  Featured &amp;{' '}
                  <span className="italic text-[#F5D900] font-serif">
                    Allocated Vault.
                  </span>
                </h2>
              </div>

              <Link
                href="/products/spirits"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#F5D900] hover:underline transition-all"
              >
                <span>Browse Entire Collection</span>
                <span>↗</span>
              </Link>
            </div>

            {/* Grid of Gallery Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 5. Deep Burgundy Allocation Drop Banner */}
      <PromotionalBanner />

      {/* 6. Editorial Store Heritage & Bottle Photo Spread */}
      <StorySection />

      {/* 7. Delivery Concierge (Uber Eats & DoorDash) */}
      <DeliverySection />

      {/* 8. Storefront Presence & Dark Map */}
      <LocationSection />
    </div>
  );
}

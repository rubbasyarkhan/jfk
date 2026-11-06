import AnnouncementBar from '@/components/site/AnnouncementBar';
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
  title: 'JFK Liquors — Houston, TX | Luxury Spirits, Fine Wine & Cold Beer Near IAH',
  description:
    'Houston’s elevated spirits destination minutes from George Bush Intercontinental Airport. Allocated bourbons, rare single malts, fine wines & on-demand delivery.',
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div className="bg-[#111111] text-[#FFFFFF]">
      {/* 1. Announcement Bar in Deep Burgundy */}
      <AnnouncementBar />

      {/* 2. Minimal Luxury Hero Section with Bottle Highlight & Staged Art */}
      <HeroSection />

      {/* 3. Essential Store Strip in Charcoal */}
      <InfoBand />

      {/* 4. Curated Department Cards (The Collection) */}
      <CollectionGrid />

      {/* 5. Featured Bottles & Allocated Vault (Bottles are the star!) */}
      {featuredProducts.length > 0 && (
        <section className="py-24 relative bg-[#111111] border-b border-[#242424]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
              <div>
                <p className="eyebrow mb-2">CURATED SHELVES</p>
                <h2
                  className="font-serif tracking-tight text-[#FFFFFF]"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1.05 }}
                >
                  Featured &amp;{' '}
                  <span className="italic text-[#F5D900] font-serif">
                    Allocated Vault
                  </span>
                </h2>
              </div>

              <Link
                href="/products/spirits"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#F5D900] hover:underline transition-all"
              >
                <span>Browse All Departments</span>
                <span>↗</span>
              </Link>
            </div>

            {/* Grid of Charcoal Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Promotional Banner in Deep Burgundy */}
      <PromotionalBanner />

      {/* 7. Local Store Story & Real Bottle Art */}
      <StorySection />

      {/* 8. Delivery Partners (Uber Eats & DoorDash) */}
      <DeliverySection />

      {/* 9. Location & Interactive Google Map */}
      <LocationSection />
    </div>
  );
}

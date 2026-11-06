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
    'Discover allocated bourbon, rare single malts, cellar wines, and cold craft beer on JFK Boulevard, Houston. 3 minutes from George Bush Intercontinental Airport (IAH).',
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <div className="bg-[#111111] text-[#FFFFFF]">
      {/* 1. Announcement Bar in Deep Burgundy */}
      <AnnouncementBar />

      {/* 2. Minimal Luxury Hero Section (Complete black background, heromain on right/background, 2 CTAs) */}
      <HeroSection />

      {/* 3. Essential Store Strip in Charcoal (Exact match to reference photo) */}
      <InfoBand />

      {/* 4. Curated Department Tiles (The Collection) */}
      <CollectionGrid />

      {/* 5. Featured Bottles & Allocated Vault */}
      {featuredProducts.length > 0 && (
        <section className="py-24 relative bg-[#111111] border-b border-[#242424]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5D900] mb-2 font-sans">
                  CURATED SHELVES
                </p>
                <h2
                  className="font-serif tracking-tight text-[#FFFFFF]"
                  style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.05 }}
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

      {/* 7. Local Store Story & Bottle Photo */}
      <StorySection />

      {/* 8. Delivery Partners (Exact match to reference photo) */}
      <DeliverySection />

      {/* 9. Location & Interactive Google Map */}
      <LocationSection />
    </div>
  );
}

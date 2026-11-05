import AnnouncementBar from '@/components/site/AnnouncementBar';
import HeroSection from '@/components/site/HeroSection';
import InfoBand from '@/components/site/InfoBand';
import RareEditionsShowcase from '@/components/site/RareEditionsShowcase';
import CollectionGrid from '@/components/site/CollectionGrid';
import ReserveWinesShowcase from '@/components/site/ReserveWinesShowcase';
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
    <div className="bg-[#0E0D0D] text-[#FFFFFF]">
      {/* 1. Top Announcement Strip */}
      <AnnouncementBar />

      {/* 2. Hero Section with Staged ART Image & Editorial Headline (Whisky Foundation inspired) */}
      <HeroSection />

      {/* 3. Essential Store Band */}
      <InfoBand />

      {/* 4. Rare Editions Collector Corner Showcase (Whispering Spirits altar display inspired) */}
      <RareEditionsShowcase />

      {/* 5. Core Departments Grid */}
      <CollectionGrid />

      {/* 6. Reserve Wines Showcase (ReserveBar 5-Bottle Backlit Lineup inspired) */}
      <ReserveWinesShowcase />

      {/* 7. Deep Burgundy Promotional Section */}
      <PromotionalBanner />

      {/* 8. Featured Products Vault */}
      {featuredProducts.length > 0 && (
        <section className="py-24 relative bg-[#080808] border-b border-[#262626]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
              <div>
                <p className="eyebrow mb-2">Curated Selections</p>
                <h2
                  className="font-serif tracking-tight text-[#FFFFFF]"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
                >
                  Featured &amp; <span className="text-[#D4AF37]">Allocated Vault</span>
                </h2>
                <div className="w-16 h-0.5 bg-[#D4AF37] mt-4 mb-0" />
              </div>

              <Link
                href="/products/spirits"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] hover:underline transition-all"
              >
                <span>Browse All Departments</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Grid of Luxury Charcoal Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Editorial Story Section ("Our Collections" & Meukow Statement) */}
      <StorySection />

      {/* 10. On-Demand Delivery Partners (Uber Eats & DoorDash) */}
      <DeliverySection />

      {/* 11. Location & Interactive Google Map */}
      <LocationSection />
    </div>
  );
}

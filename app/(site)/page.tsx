import HeroSection from '@/components/site/HeroSection';
import CollectionGrid from '@/components/site/CollectionGrid';
import FeaturedVaultSection from '@/components/site/FeaturedVaultSection';
import PromotionalBanner from '@/components/site/PromotionalBanner';
import StorySection from '@/components/site/StorySection';
import DeliverySection from '@/components/site/DeliverySection';
import LocationSection from '@/components/site/LocationSection';
import { getFeaturedProducts, getCategories } from '@/lib/firestore';

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

      {/* 2. Curated Department Gallery (THE ARCHIVE) */}
      <CollectionGrid categories={categories} />

      {/* 3. The Allocated Vault / Featured Bottles — 3 Cards in a Row */}
      <FeaturedVaultSection initialProducts={featuredProducts} />

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

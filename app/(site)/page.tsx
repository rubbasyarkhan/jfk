import HeroSection from '@/components/site/HeroSection';
import CollectionGrid from '@/components/site/CollectionGrid';
import FeaturedVaultSection from '@/components/site/FeaturedVaultSection';
import PromotionalBanner from '@/components/site/PromotionalBanner';
import StorySection from '@/components/site/StorySection';
import DeliverySection from '@/components/site/DeliverySection';
import LocationSection from '@/components/site/LocationSection';
import { getFeaturedProducts, getCategories } from '@/lib/firestore';

export const metadata = {
  title: 'JFK Liquors — Houston, TX | Your Neighborhood Liquor Store Near IAH',
  description:
    'Your neighborhood retail liquor store on JFK Boulevard in Houston near IAH airport. Wide selection of bourbon, whiskey, wine, chilled craft beer, tequila & on-demand delivery.',
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

      {/* 2. Delivery Concierge (DoorDash & Uber Eats — Moved Up for Immediate Access) */}
      <DeliverySection />

      {/* 3. Curated Department Gallery (THE ARCHIVE) */}
      <CollectionGrid categories={categories} />

      {/* 4. The Allocated Vault / Featured Bottles — 3 Cards in a Row */}
      <FeaturedVaultSection initialProducts={featuredProducts} />

      {/* 5. Deep Burgundy Allocation Drop Banner */}
      <PromotionalBanner />

      {/* 6. Editorial Store Heritage & Bottle Photo Spread */}
      <StorySection />

      {/* 7. Storefront Presence & Dark Map */}
      <LocationSection />
    </div>
  );
}

import OffersPageClient from '@/components/site/OffersPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Store Offers | JFK Liquors Houston Near IAH',
  description:
    'Explore special in-store bottle offers, featured allocations, and seasonal promotions at JFK Liquors on JFK Boulevard near IAH airport in Houston.',
};

export default function OffersPage() {
  return <OffersPageClient />;
}

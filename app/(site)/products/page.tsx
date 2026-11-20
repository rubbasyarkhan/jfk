import { getProducts, getCategories } from '@/lib/firestore';
import AllProductsClient from '@/components/site/AllProductsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products & Store Catalog | JFK Liquors Houston',
  description:
    'Explore our complete retail selection of bourbon, single malt scotch, wine, champagne, cold craft beer, and premium tequila near IAH airport in Houston.',
};

export default async function AllProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <AllProductsClient initialProducts={products} initialCategories={categories} />;
}

import { getAllProducts, getCategories } from '@/lib/firestore';
import ProductListManager from '@/components/admin/ProductListManager';

export const revalidate = 0; // Dynamic admin view

export default async function AdminProductsListPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <div className="space-y-8 text-[#FFFFFF] max-w-7xl">
      <ProductListManager initialProducts={products} categories={categories} />
    </div>
  );
}

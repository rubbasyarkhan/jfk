import { getCategories } from '@/lib/firestore';
import ProductForm from '@/components/admin/ProductForm';

export const revalidate = 0;

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-1">Catalog Expansion</p>
        <h1 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-wide">
          Add New Bottle / Product
        </h1>
      </div>

      <ProductForm availableCategories={categories} />
    </div>
  );
}

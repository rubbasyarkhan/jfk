import { notFound } from 'next/navigation';
import { getProductById, getCategories } from '@/lib/firestore';
import ProductForm from '@/components/admin/ProductForm';

export const revalidate = 0;

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const [product, categories] = await Promise.all([
    getProductById(params.id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-1">Catalog Editing</p>
        <h1 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-wide">
          Edit: {product.name}
        </h1>
      </div>

      <ProductForm initialData={product} productId={params.id} availableCategories={categories} />
    </div>
  );
}

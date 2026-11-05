import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/firestore';
import ProductForm from '@/components/admin/ProductForm';

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const product = await getProductById(params.id);
  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-1">Catalog Editing</p>
        <h1 className="font-display text-3xl sm:text-4xl text-paper uppercase">
          Edit: {product.name}
        </h1>
      </div>

      <ProductForm initialData={product} productId={params.id} />
    </div>
  );
}

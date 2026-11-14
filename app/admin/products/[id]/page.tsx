import { getAllProducts, getProductById, getCategories } from '@/lib/firestore';
import EditProductClient from '@/components/admin/EditProductClient';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function EditProductPage({ params }: Props) {
  const [product, categories] = await Promise.all([
    getProductById(params.id),
    getCategories(),
  ]);

  return (
    <EditProductClient
      initialProduct={product || undefined}
      productId={params.id}
      availableCategories={categories}
    />
  );
}

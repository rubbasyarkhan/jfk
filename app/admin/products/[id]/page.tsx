import { getAllProducts, getProductById, getCategories } from '@/lib/firestore';
import { INITIAL_PRODUCTS } from '@/lib/initialData';
import EditProductClient from '@/components/admin/EditProductClient';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  const ids = new Set<string>();
  for (const p of INITIAL_PRODUCTS) ids.add(p.id);
  for (const p of products) ids.add(p.id);
  return Array.from(ids).map((id) => ({ id }));
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

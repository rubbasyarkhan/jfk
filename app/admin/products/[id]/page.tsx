import { getAllProducts, getProductById, getCategories } from '@/lib/firestore';
import { INITIAL_PRODUCTS } from '@/lib/initialData';
import EditProductClient from '@/components/admin/EditProductClient';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  // Generate lightweight static shell; EditProductClient resolves all 150+ products live from URL & Firestore
  const firstId =
    INITIAL_PRODUCTS[0]?.id || 'pappy-van-winkle-s-family-reserve-23-year';
  return [{ id: firstId }];
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

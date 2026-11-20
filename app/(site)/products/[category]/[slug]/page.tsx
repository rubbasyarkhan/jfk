import { cache } from 'react';
import { getAllProducts, getProductBySlug, getProducts } from '@/lib/firestore';
import { INITIAL_PRODUCTS } from '@/lib/initialData';
import ProductDetailClient from '@/components/site/ProductDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: { category: string; slug: string };
}

const getCachedProduct = cache(async (slug: string) => {
  return getProductBySlug(slug);
});

export async function generateStaticParams() {
  const firestoreProducts = await getAllProducts();
  const map = new Map<string, { category: string; slug: string }>();

  for (const p of INITIAL_PRODUCTS) {
    map.set(`${p.category}/${p.slug}`, { category: p.category, slug: p.slug });
  }
  for (const p of firestoreProducts) {
    map.set(`${p.category}/${p.slug}`, { category: p.category, slug: p.slug });
  }

  return Array.from(map.values());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product =
    (await getCachedProduct(params.slug)) ||
    INITIAL_PRODUCTS.find((p) => p.slug === params.slug) ||
    INITIAL_PRODUCTS[0];
  if (!product) {
    return { title: 'Bottle Details | JFK Liquors Houston' };
  }
  return {
    title: `${product.name} | JFK Liquors Houston`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product =
    (await getCachedProduct(params.slug)) ||
    INITIAL_PRODUCTS.find((p) => p.slug === params.slug) ||
    INITIAL_PRODUCTS[0];

  const relatedProducts = (await getProducts(product.category))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <ProductDetailClient
      slug={params.slug}
      initialProduct={product}
      initialRelated={relatedProducts}
    />
  );
}

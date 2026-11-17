import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProductBySlug, getProducts } from '@/lib/firestore';
import { INITIAL_PRODUCTS } from '@/lib/initialData';
import ProductDetailClient from '@/components/site/ProductDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: { category: string; slug: string };
}

const getCachedProduct = cache(async (slug: string) => {
  return getProductBySlug(slug);
});

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getCachedProduct(params.slug);
  if (!product) {
    return { title: 'Bottle Not Found | JFK Liquors Houston' };
  }
  return {
    title: `${product.name} | JFK Liquors Houston`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getCachedProduct(params.slug);
  if (!product) {
    notFound();
  }

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

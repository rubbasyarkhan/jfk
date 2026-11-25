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
  // Generate lightweight static shell; ProductDetailClient resolves all 150+ products live from URL & Firestore
  const first = INITIAL_PRODUCTS[0] || {
    category: 'spirits',
    slug: 'pappy-van-winkle-s-family-reserve-23-year',
  };
  return [{ category: first.category, slug: first.slug }];
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

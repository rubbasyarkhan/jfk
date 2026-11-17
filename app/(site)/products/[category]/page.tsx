import { notFound } from 'next/navigation';
import { getProducts, getCategoryBySlug, getCategories } from '@/lib/firestore';
import CategoryPageClient from '@/components/site/CategoryPageClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category);
  const catName = category?.name || params.category.replace(/-/g, ' ');
  const capitalized = catName.charAt(0).toUpperCase() + catName.slice(1);
  return {
    title: `${capitalized} Department | JFK Liquors Houston`,
    description: category?.bannerText || category?.description || `Explore our ${capitalized} collection at JFK Liquors Houston near IAH.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const [products, category, allCategories] = await Promise.all([
    getProducts(params.category),
    getCategoryBySlug(params.category),
    getCategories(),
  ]);

  if (!category && products.length === 0) {
    notFound();
  }

  return (
    <CategoryPageClient
      categorySlug={params.category}
      initialProducts={products}
      initialCategory={category}
      initialCategories={allCategories}
    />
  );
}

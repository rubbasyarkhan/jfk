import { getProducts, getCategoryBySlug, getCategories } from '@/lib/firestore';
import { INITIAL_CATEGORIES } from '@/lib/initialData';
import CategoryPageClient from '@/components/site/CategoryPageClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const categories = await getCategories();
  const slugs = new Set<string>();
  for (const c of INITIAL_CATEGORIES) slugs.add(c.slug);
  for (const c of categories) slugs.add(c.slug);
  return Array.from(slugs).map((category) => ({ category }));
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
    description:
      category?.bannerText ||
      category?.description ||
      `Explore our ${capitalized} collection at JFK Liquors Houston near IAH.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const [products, category, allCategories] = await Promise.all([
    getProducts(params.category),
    getCategoryBySlug(params.category),
    getCategories(),
  ]);

  return (
    <CategoryPageClient
      categorySlug={params.category}
      initialProducts={products}
      initialCategory={category}
      initialCategories={allCategories}
    />
  );
}

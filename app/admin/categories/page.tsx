import { getCategories } from '@/lib/firestore';
import CategoryManager from '@/components/admin/CategoryManager';

export const revalidate = 0; // dynamic admin dashboard

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 max-w-6xl text-[#FFFFFF]">
      <CategoryManager initialCategories={categories} />
    </div>
  );
}

import { getCategories } from '@/lib/firestore';
import Link from 'next/link';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8 max-w-5xl text-[#FFFFFF]">
      <div>
        <p className="eyebrow mb-1">Taxonomy</p>
        <h1 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] uppercase">
          Departments &amp; Categories
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Dept {cat.sortOrder}
                </span>
                <span className="text-xs text-[#A0A0A0] font-mono">
                  /products/{cat.slug}
                </span>
              </div>

              <h3 className="font-display text-2xl text-[#FFFFFF] mb-2">
                {cat.name}
              </h3>
              
              <p className="text-sm text-[#C7C7C7] leading-relaxed mb-4 font-light">
                {cat.description}
              </p>

              {cat.bannerText && (
                <div className="p-3.5 rounded-xl bg-[#111111] border border-[#3A3A3A] text-xs text-[#F4F4F4] italic">
                  &ldquo;{cat.bannerText}&rdquo;
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-[#3A3A3A] flex justify-between items-center">
              <Link
                href={`/products/${cat.slug}`}
                target="_blank"
                className="text-xs font-bold text-[#D4AF37] hover:underline uppercase tracking-wider"
              >
                View on Store &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

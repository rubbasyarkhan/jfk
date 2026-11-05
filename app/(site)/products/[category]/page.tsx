import { notFound } from 'next/navigation';
import { getProducts, getCategoryBySlug } from '@/lib/firestore';
import ProductCard from '@/components/site/ProductCard';
import CategorySwitcher from '@/components/site/CategorySwitcher';
import type { Metadata } from 'next';

const VALID_CATEGORIES = ['spirits', 'wines', 'beer', 'agave-and-more'];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

const CATEGORY_BANNERS: Record<string, string> = {
  spirits: 'From allocated bourbon to peated single malts, the spirits wall is the heart of our store.',
  wines: 'Weeknight value bottles, gift-worthy labels, and celebration French Champagne.',
  beer: 'Cold and ready to go: Texas craft, national favorites, and European imports.',
  'agave-and-more': '100% Blue Agave tequila from blanco to añejo, Oaxaca mezcal, liqueurs, mixers, and ice.',
};

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = params.category.replace(/-/g, ' ');
  const capitalized = cat.charAt(0).toUpperCase() + cat.slice(1);
  return {
    title: `${capitalized} Department | JFK Liquors Houston`,
    description: CATEGORY_BANNERS[params.category] || 'Shop our curated collection at JFK Liquors Houston near IAH.',
  };
}

export default async function CategoryPage({ params }: Props) {
  if (!VALID_CATEGORIES.includes(params.category)) {
    notFound();
  }

  const [products, category] = await Promise.all([
    getProducts(params.category),
    getCategoryBySlug(params.category),
  ]);

  const bannerText = category?.bannerText || CATEGORY_BANNERS[params.category] || '';
  const catName = category?.name || params.category.replace(/-/g, ' & ');

  return (
    <div className="bg-[#111111] text-[#FFFFFF] min-h-screen">
      {/* Category Header Banner */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center relative border-b border-[#242424] bg-gradient-to-b from-[#1E1E1E] to-[#111111]">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-3">JFK Liquors Catalog</p>
          <h1
            className="font-display tracking-tight text-[#FFFFFF] uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)' }}
          >
            {catName}
          </h1>
          <div className="section-divider mx-auto my-5" />
          {bannerText && (
            <p className="text-[#C7C7C7] text-base sm:text-lg leading-relaxed font-light max-w-xl mx-auto">
              {bannerText}
            </p>
          )}
        </div>
      </section>

      {/* Category Switcher Tabs */}
      <CategorySwitcher active={params.category} />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#242424]">
          <p className="text-xs font-bold tracking-wider uppercase text-[#A0A0A0]">
            Showing <span className="text-[#D4AF37] font-bold">{products.length}</span> Curated Bottles
          </p>
          <p className="text-xs text-[#D4AF37] font-semibold">
            Direct Store Reserve: (281) 590-3300
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-[#242424] border border-[#3A3A3A]">
            <h3 className="font-display text-2xl text-[#FFFFFF] mb-2">
              Catalog Updating
            </h3>
            <p className="text-[#A0A0A0] text-sm max-w-md mx-auto mb-6">
              Our inventory changes daily with fresh distributor allocations. Please call the store directly or visit us in person.
            </p>
            <a href="tel:+12815903300" className="btn-gold">
              Call Store: +1 281-590-3300
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

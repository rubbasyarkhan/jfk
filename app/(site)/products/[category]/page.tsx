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
    <div className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen">
      {/* Category Header Banner */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center relative border-b border-white/[0.08] bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto">
          <p className="index-tag mb-3">01 // THE ARCHIVE &bull; CATALOG</p>
          <h1
            className="font-serif tracking-tight text-[#FFFFFF]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
          >
            {catName}
          </h1>
          {bannerText && (
            <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed font-light max-w-xl mx-auto mt-4">
              {bannerText}
            </p>
          )}
        </div>
      </section>

      {/* Category Switcher Tabs */}
      <CategorySwitcher active={params.category} />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <p className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Showing <span className="text-[#F5D900] font-bold">{products.length}</span> Curated Bottles
          </p>
          <p className="text-xs font-mono text-[#F5D900] font-semibold">
            Direct Store Reserve: (281) 590-3300
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#FFFFFF] mb-2">
              Catalog Updating
            </h3>
            <p className="text-[#A0A0A0] text-sm max-w-md mx-auto mb-6">
              Our inventory changes daily with fresh distributor allocations. Please call the store directly or visit us in person.
            </p>
            <a href="tel:+12815903300" className="btn-gold">
              Call Store: +1 281-590-3300 ↗
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

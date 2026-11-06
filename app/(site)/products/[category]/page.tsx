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
      <section className="pt-28 pb-16 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center relative border-b border-white/[0.08] bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <p className="meta-tag mb-3">01 // THE ARCHIVE &bull; CATALOG</p>
          <h1
            className="font-serif tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', lineHeight: 1.08 }}
          >
            {catName}
          </h1>
          {bannerText && (
            <p className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto mb-6">
              {bannerText}
            </p>
          )}

          {/* Compliance & Availability Line Required by User */}
          <div className="inline-block px-4 py-2 rounded-sm bg-[#141414] border border-[#F5D900]/30 text-xs sm:text-[13px] font-sans text-neutral-300">
            <span className="text-[#F5D900] font-semibold">Stock changes daily.</span>{' '}
            Call{' '}
            <a href="tel:+12815903300" className="text-[#F5D900] font-bold underline hover:text-white transition-colors">
              +1 281-590-3300
            </a>{' '}
            to check availability. Must be 21+ with valid ID.
          </div>
        </div>
      </section>

      {/* Category Switcher Tabs */}
      <CategorySwitcher active={params.category} />

      {/* Product Grid — 3 Cards In A Row */}
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <p className="text-xs font-sans uppercase tracking-wider text-neutral-400">
            Showing <span className="text-[#F5D900] font-bold">{products.length}</span> Curated Bottles
          </p>
          <a
            href="tel:+12815903300"
            className="text-xs font-sans text-[#F5D900] font-semibold hover:underline"
          >
            Direct Store Reserve: (281) 590-3300
          </a>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#FFFFFF] mb-2">
              Catalog Updating
            </h3>
            <p className="text-neutral-300 font-sans text-sm max-w-md mx-auto mb-6">
              Our inventory changes daily with fresh distributor allocations. Please call the store directly or visit us in person.
            </p>
            <a href="tel:+12815903300" className="btn-primary">
              Call Store: +1 281-590-3300 ↗
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    num: '01',
    slug: 'spirits',
    label: 'Spirits & Bourbon',
    desc: 'Allocated bourbon, single malt scotch, premium vodka, botanical gin & French cognac.',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02',
    slug: 'wines',
    label: 'Wines & Champagne',
    desc: 'Cellar-worthy Cabernet, smooth Merlot, chilled Sauvignon Blanc & Grande Marque Champagne.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03',
    slug: 'beer',
    label: 'Craft & Cold Beer',
    desc: 'Independent Texas IPAs, national favorites, crisp imports, hard seltzers & RTD cocktails.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04',
    slug: 'agave-and-more',
    label: 'Agave & Mixers',
    desc: '100% Blue Agave blanco to extra añejo, artisanal Oaxaca mezcal, bitters, syrups & crystal ice.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CollectionGrid() {
  return (
    <section id="collection" className="py-24 sm:py-32 relative bg-[#0E0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="eyebrow mb-2">Departments</p>
          <h2
            className="font-serif tracking-tight text-[#FFFFFF]"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)', lineHeight: 1.05 }}
          >
            Curated <span className="text-[#D4AF37]">Departments</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-5" />
          <p className="text-[#A5A5A5] max-w-lg mx-auto text-sm sm:text-base font-light">
            Browse our core departments, each carefully stocked with rare allocations, cellar vintages, and everyday favorites.
          </p>
        </div>

        {/* 4 Luxury Department Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group block relative rounded-2xl overflow-hidden bg-[#161616] border border-[#2E2E2E] transition-all duration-500 hover:border-[#D4AF37] hover:shadow-2xl"
              style={{ minHeight: '440px' }}
            >
              {/* Background Photo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-40 group-hover:opacity-50"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Dark Vignette Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #0E0D0D 0%, rgba(22,22,22,0.85) 55%, rgba(22,22,22,0.5) 100%)',
                  }}
                />
              </div>

              {/* Card Foreground Content */}
              <div className="relative z-10 h-full p-7 flex flex-col justify-between">
                
                {/* Top: Department Number Badge in Charcoal with Gold border */}
                <div className="flex items-center justify-between">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-serif text-sm font-bold text-[#D4AF37] border border-[#D4AF37]/40 bg-[#0E0D0D]/90"
                  >
                    {cat.num}
                  </span>
                  <span className="text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    View Dept &rarr;
                  </span>
                </div>

                {/* Bottom: Info & Action */}
                <div>
                  <h3 className="font-serif text-2xl text-[#FFFFFF] mb-2 group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed line-clamp-3 mb-6 font-light">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors">
                    <span>Explore Department</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#D4AF37]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

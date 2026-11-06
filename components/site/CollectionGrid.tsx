import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    num: '01',
    slug: 'spirits',
    label: 'Spirits',
    subtitle: 'Bourbon & Single Malts',
    desc: 'Allocated Kentucky bourbon, peated Islay scotch & rare French cognac.',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02',
    slug: 'wines',
    label: 'Wines',
    subtitle: 'Cellar & Champagne',
    desc: 'Napa Valley Cabernet, Burgundy pinot noir & Grand Cru vintage champagne.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03',
    slug: 'beer',
    label: 'Beer',
    subtitle: 'Texas Craft & Imports',
    desc: 'Chilled local IPAs, Belgian ales, crisp lagers & party-ready cold packs.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04',
    slug: 'agave-and-more',
    label: 'Agave & More',
    subtitle: 'Tequila, Mezcal & Mixers',
    desc: '100% Blue Agave blanco to extra añejo, artisanal Oaxaca mezcal & crystal ice.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CollectionGrid() {
  return (
    <section id="collection" className="py-24 sm:py-32 relative bg-[#0A0A0A]">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="meta-tag mb-3">
              01 // THE ARCHIVE
            </p>
            <h2
              className="font-serif tracking-tight text-[#FFFFFF]"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)', lineHeight: 1.05 }}
            >
              Find your{' '}
              <span className="italic text-[#F5D900] font-serif">
                next favorite.
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.18em] text-[#F5D900] hover:underline"
            >
              <span>Browse All Products</span>
              <span>↗</span>
            </Link>
          </div>
        </div>

        {/* 4 Architectural Gallery Cards with Clearly Visible Bottle Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group block relative rounded-sm overflow-hidden bg-[#121316] border border-white/[0.08] transition-all duration-500 hover:border-[#F5D900]/70 hover:shadow-2xl cursor-pointer"
              style={{ minHeight: '440px' }}
            >
              {/* Bottle Photo Background — Bright & Clearly Visible */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.92] opacity-85 group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Directed Vignette: Light on top to see bottles clearly, dark at bottom for crisp text */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.65) 42%, rgba(10,10,10,0.15) 75%, transparent 100%)',
                  }}
                />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 h-full p-7 flex flex-col justify-between">
                
                {/* Number Badge & Subtitle in Montserrat */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans tracking-widest text-[#F5D900] font-bold">
                    [ {cat.num} ]
                  </span>
                  <span className="text-[11px] font-sans tracking-wider text-neutral-300 uppercase font-medium">
                    {cat.subtitle}
                  </span>
                </div>

                {/* Title & Explore Link */}
                <div>
                  <h3 className="font-serif text-3xl sm:text-[2rem] text-[#FFFFFF] mb-2 group-hover:text-[#F5D900] transition-colors leading-tight">
                    {cat.label}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed mb-6 font-sans font-normal min-h-[38px]">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#F5D900]">
                    <span>Explore selection</span>
                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
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

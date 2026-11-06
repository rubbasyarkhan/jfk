import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    num: '01',
    slug: 'spirits',
    label: 'Spirits',
    subtitle: 'Bourbon & Single Malts',
    desc: 'Allocated Kentucky bourbon, peated Islay scotch & rare French cognac.',
    image: 'https://images.unsplash.com/photo-1604681310895-d3ddfd650861?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02',
    slug: 'wines',
    label: 'Wines',
    subtitle: 'Cellar & Champagne',
    desc: 'Napa Valley Cabernet, Burgundy pinot noir & Grand Cru vintage champagne.',
    image: 'https://images.unsplash.com/photo-1645784125191-d93e079b5861?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03',
    slug: 'beer',
    label: 'Beer',
    subtitle: 'Texas Craft & Imports',
    desc: 'Chilled local IPAs, Belgian ales, crisp lagers & party-ready cold packs.',
    image: 'https://images.unsplash.com/photo-1703564803585-48b51539e119?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04',
    slug: 'agave-and-more',
    label: 'Agave & More',
    subtitle: 'Tequila, Mezcal & Mixers',
    desc: '100% Blue Agave blanco to extra añejo, artisanal Oaxaca mezcal & crystal ice.',
    image: 'https://images.unsplash.com/photo-1698288547419-407ca6bafe2a?auto=format&fit=crop&w=800&q=80',
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
              className="font-anton tracking-wide uppercase text-white"
              style={{ fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)', lineHeight: 1.05 }}
            >
              Find your{' '}
              <span className="text-[#F5D900]">
                next favorite.
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/products"
              prefetch={true}
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.18em] text-[#F5D900] hover:underline"
            >
              <span>Browse All Products</span>
              <span>↗</span>
            </Link>
          </div>
        </div>

        {/* 4 Standalone Minimal Department Cards (NO Image Overlay - Content Strictly Below) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              prefetch={true}
              className="group flex flex-col justify-between rounded-sm overflow-hidden bg-[#121316] border border-white/[0.08] transition-all duration-300 hover:border-[#F5D900]/70 hover:shadow-2xl cursor-pointer"
            >
              {/* Standalone Image Frame — 100% Crisp, Strong, No Dimming Overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Minimal Corner Department Index */}
                {/* <span className="absolute top-3 left-3 px-2.5 py-1 rounded-sm text-[10px] font-sans font-bold uppercase tracking-[0.18em] bg-[#0A0A0A]/90 text-[#F5D900] border border-white/10 backdrop-blur-sm shadow-md">
                  [ {cat.num} ]
                </span> */}
              </div>

              {/* Detail Content Strictly Below the Image */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Department Subtitle in Montserrat */}
                  <p className="text-[11px] font-sans font-bold text-[#F5D900] mb-2 tracking-[0.2em] uppercase">
                    {cat.subtitle}
                  </p>

                  {/* Department Title in Anton */}
                  <h3 className="font-anton text-2xl sm:text-3xl text-white tracking-wide uppercase mb-2.5 group-hover:text-[#F5D900] transition-colors leading-tight">
                    {cat.label}
                  </h3>

                  {/* Description in Montserrat */}
                  <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans font-normal mb-6 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                {/* Bottom CTA Link in Montserrat */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider text-[#F5D900] group-hover:text-white transition-colors">
                  <span>Explore Department</span>
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

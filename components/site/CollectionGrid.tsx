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
    <section id="collection" className="py-24 sm:py-32 relative bg-[#0D0D0D]">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="index-tag mb-3">
              01 // THE ARCHIVE
            </p>
            <h2
              className="font-serif tracking-tight text-[#FFFFFF]"
              style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)', lineHeight: 1.04 }}
            >
              Find your
              <br />
              <span className="italic text-[#F5D900] font-serif">
                next favorite.
              </span>
            </h2>
          </div>
          <p className="text-[#A0A0A0] max-w-md text-sm sm:text-base font-light leading-relaxed">
            Four ways to explore the shelves. Whether you know your go-to or want to discover an allocated release, start here.
          </p>
        </div>

        {/* 4 Architectural Gallery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group block relative rounded overflow-hidden bg-[#161616] border border-white/[0.08] transition-all duration-500 hover:border-[#F5D900]/70 hover:shadow-2xl"
              style={{ minHeight: '430px' }}
            >
              {/* Bottle Photo Background with cinematic zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-40 group-hover:opacity-50"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Vignette Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #0D0D0D 0%, rgba(22,22,22,0.85) 45%, rgba(22,22,22,0.2) 100%)',
                  }}
                />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 h-full p-7 flex flex-col justify-between">
                
                {/* Number Badge & Subtitle */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest text-[#F5D900] font-bold">
                    [ {cat.num} ]
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-[#888888] uppercase">
                    {cat.subtitle}
                  </span>
                </div>

                {/* Title & Explore Link */}
                <div>
                  <h3 className="font-serif text-3xl text-[#FFFFFF] mb-2 group-hover:text-[#F5D900] transition-colors leading-tight">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed mb-6 font-light min-h-[36px]">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F5D900]">
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

import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    num: '01',
    slug: 'spirits',
    label: 'Spirits',
    desc: 'Bourbon, scotch & cocktail essentials',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02',
    slug: 'wines',
    label: 'Wines',
    desc: 'Everyday favorites & celebration bottles',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03',
    slug: 'beer',
    label: 'Beer',
    desc: 'Craft, domestic & imported favorites',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04',
    slug: 'agave-and-more',
    label: 'Agave & More',
    desc: 'Tequila, mezcal & the finishing touches',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CollectionGrid() {
  return (
    <section id="collection" className="py-24 sm:py-32 relative bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5D900] mb-3 font-sans">
              THE COLLECTION
            </p>
            <h2
              className="font-serif tracking-tight text-[#FFFFFF]"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', lineHeight: 1.05 }}
            >
              Find your
              <br />
              <span className="italic text-[#F5D900] font-serif">
                next favorite.
              </span>
            </h2>
          </div>
          <p className="text-[#A0A0A0] max-w-md text-sm sm:text-base font-light leading-relaxed">
            Four ways to explore the shelves. Whether you know your go-to or want to try something different, start here.
          </p>
        </div>

        {/* 4 Clean Minimal Charcoal Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group block relative rounded-lg overflow-hidden bg-[#1A1A1A] border border-[#333333] transition-all duration-300 hover:border-[#F5D900]"
              style={{ minHeight: '410px' }}
            >
              {/* Bottle Photo Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-40 group-hover:opacity-50"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Vignette Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #111111 0%, rgba(26,26,26,0.85) 45%, rgba(26,26,26,0.2) 100%)',
                  }}
                />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs font-mono text-[#FFFFFF]">
                  {cat.num}
                </div>

                {/* Title & Link */}
                <div>
                  <h3 className="font-serif text-3xl text-[#FFFFFF] mb-2 group-hover:text-[#F5D900] transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-[#C7C7C7] leading-relaxed mb-6 font-light min-h-[36px]">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5D900]">
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

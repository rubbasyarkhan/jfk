import Image from 'next/image';
import Link from 'next/link';

const WINE_LINEUP = [
  {
    name: 'Wayfarer Golden Slope Chardonnay',
    vintage: '2021',
    region: 'Fort Ross-Seaview, Sonoma Coast',
    notes: 'Meyer lemon curd, toasted brioche, flinty mineral salinity',
    price: 89.99,
    image: 'https://res.cloudinary.com/ovmougmy/image/upload/v1793981784/jfk-liquors/wine-white-bottle.jpg',
  },
  {
    name: 'Shafer TD-9 Napa Valley Red Blend',
    vintage: '2019',
    region: 'Stags Leap District, Napa Valley',
    notes: 'Black plum, crushed blackberries, licorice, and sweet tobacco',
    price: 74.99,
    image: 'https://res.cloudinary.com/ovmougmy/image/upload/v1793981782/jfk-liquors/wine-silver-oak.jpg',
  },
  {
    name: 'Sea Sun California Chardonnay',
    vintage: '2022',
    region: 'Coastal Vineyards, California',
    notes: 'Crisp green apple, warm toasted oak, and smooth vanilla finish',
    price: 24.99,
    image: 'https://res.cloudinary.com/ovmougmy/image/upload/v1793981785/jfk-liquors/wine-champagne.jpg',
  },
  {
    name: 'Quilt Reserve Cabernet Sauvignon',
    vintage: '2018',
    region: 'Rutherford & Oakville, Napa Valley',
    notes: 'Dark currant, cocoa, cassis, and velvety full-bodied tannins',
    price: 119.99,
    image: 'https://res.cloudinary.com/ovmougmy/image/upload/v1793981784/jfk-liquors/wine-dark-bottle.jpg',
  },
  {
    name: 'Diora La Petite Grace Pinot Noir',
    vintage: '2020',
    region: 'San Bernabe Vineyard, Monterey',
    notes: 'Wild black cherry, roasted mocha, dark chocolate, and spice',
    price: 29.99,
    image: 'https://res.cloudinary.com/ovmougmy/image/upload/v1793981782/jfk-liquors/wine-silver-oak.jpg',
  },
];

export default function ReserveWinesShowcase() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0A0A0A] text-[#FFFFFF] border-b border-[#262626]">
      {/* Symmetrical warm backlit halo behind the bottle lineup (direct ReserveBar aesthetic) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-20 filter blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #5B1018 45%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Symmetrical Backlit 5-Bottle Lineup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#141414] via-[#0E0D0D] to-[#080808] border border-[#2E2E2E] p-6 sm:p-8 shadow-2xl">

              {/* Backlit spotlight glow behind bottles */}
              <div
                className="absolute inset-x-8 top-12 bottom-16 opacity-30 filter blur-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, rgba(212, 175, 55, 0.45) 0%, rgba(91, 16, 24, 0.3) 60%, transparent 85%)',
                }}
              />

              {/* 5-Bottle Showcase Grid */}
              <div className="relative z-10 grid grid-cols-5 gap-2 sm:gap-4 items-end pb-4">
                {WINE_LINEUP.map((wine, i) => (
                  <div
                    key={wine.name}
                    className={`flex flex-col items-center group transition-transform duration-500 hover:-translate-y-2 ${i === 2 ? 'scale-105 z-20' : 'scale-95'
                      }`}
                  >
                    {/* Bottle thumbnail */}
                    <div className="relative w-full aspect-[1/3] rounded-lg overflow-hidden bg-[#080808] border border-[#262626] group-hover:border-[#D4AF37] transition-colors shadow-lg">
                      <Image
                        src={wine.image}
                        alt={wine.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-1.5 inset-x-1 text-center">
                        <span className="text-[9px] font-bold text-[#D4AF37] block font-mono">
                          {wine.vintage}
                        </span>
                      </div>
                    </div>

                    {/* Price Tag */}
                    <span className="font-serif text-[11px] sm:text-xs text-[#FFFFFF] group-hover:text-[#D4AF37] mt-2 font-medium">
                      ${wine.price.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Reflective Dark Base Slab */}
              <div className="w-full h-3 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="mt-4 text-center">
                <p className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#F5D900]">
                  Napa Valley &bull; Sonoma Coast &bull; Bordeaux &bull; Champagne
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Typography matching the ReserveBar headline */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            <p className="eyebrow mb-3">
              Enjoy From The Comfort of Home
            </p>

            <h2
              className="font-serif text-[#FFFFFF] tracking-tight mb-5"
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                lineHeight: 1.05,
              }}
            >
              JFK Reserve Wines &amp;{' '}
              <span className="italic text-[#D4AF37] block sm:inline">
                Cellar Vintages
              </span>
            </h2>

            <div className="w-16 h-0.5 bg-[#D4AF37] mb-6" />

            <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed font-light mb-8">
              We now have you covered with a curated selection of fine cellar vintages delivered straight to your door or ready for 15-minute curbside pickup on JFK Blvd. Whether you are curling up to watch your favorite show or toasting with friends on a Houston evening, enjoy it with the perfect bottle.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products/wines"
                className="py-3 px-8 rounded border border-[#FFFFFF] text-[#FFFFFF] font-serif tracking-widest uppercase text-xs hover:bg-[#FFFFFF] hover:text-[#0E0D0D] transition-all duration-300"
              >
                Shop Now
              </Link>

              <Link
                href="/products/wines"
                className="btn-gold py-3 px-6 text-xs uppercase tracking-wider font-bold"
              >
                Explore Wine Cellar
              </Link>
            </div>

            {/* Curated wine guarantee highlights */}
            <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-[#262626] text-xs">
              <div>
                <span className="text-[#D4AF37] font-bold block uppercase tracking-wider mb-0.5">
                  Temperature Controlled
                </span>
                <span className="text-[#F5D900]">Stored at precise 55°F cellar condition</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-bold block uppercase tracking-wider mb-0.5">
                  Fast Delivery
                </span>
                <span className="text-[#F5D900]">Via Uber Eats &amp; DoorDash partners</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

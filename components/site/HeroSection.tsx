import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#111111]">
      
      {/* Subtle gold and burgundy ambient lighting (No clutter, pure mood) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 75% 35%, rgba(245, 217, 0, 0.12) 0%, transparent 60%), radial-gradient(circle at 20% 85%, rgba(91, 16, 24, 0.22) 0%, transparent 55%)',
        }}
      />

      {/* Subtle top divider line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5D900]/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#242424] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clean Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900]" />
              <p className="text-[11px] font-bold tracking-[0.22em] text-[#F5D900] uppercase font-sans">
                Your Neighborhood Bottle Shop &bull; Houston, TX
              </p>
            </div>

            {/* Headline */}
            <h1
              className="font-serif text-[#FFFFFF] tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
                lineHeight: 1.04,
              }}
            >
              Good taste.
              <br />
              Great company.
              <br />
              <span className="italic text-[#F5D900] font-serif">
                JFK Liquors.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#C7C7C7] mb-8 leading-relaxed font-light max-w-xl">
              From your everyday favorite to a bottle worth celebrating. Discover allocated bourbons, rare single malts, cellar wines, and cold Texas craft beers on JFK Boulevard — 3 minutes from IAH Airport.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="#collection" className="btn-gold group">
                <span>Explore Our Selection</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Get Directions
              </a>

              <a
                href="tel:+12815903300"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5D900] uppercase tracking-wider hover:underline ml-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (281) 590-3300
              </a>
            </div>

            {/* Location Line */}
            <div className="pt-6 border-t border-[#242424] flex items-center gap-3 text-xs text-[#A0A0A0]">
              <svg className="w-4 h-4 text-[#F5D900] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                <strong className="text-[#FFFFFF] font-semibold">Near George Bush Intercontinental Airport (IAH)</strong> &bull; 15655 John F Kennedy Blvd, Suite D &bull; Houston, TX
              </span>
            </div>

          </div>

          {/* Right Column: Hero Bottle Art Presentation with Heritage Seal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md group">
              
              {/* Backlit gold halo behind the bottle */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 filter blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-45"
                style={{
                  background:
                    'radial-gradient(circle, rgba(245, 217, 0, 0.35) 0%, rgba(91, 16, 24, 0.3) 65%, transparent 80%)',
                }}
              />

              {/* Minimal Luxury Bottle Art Showcase */}
              <div className="relative rounded-2xl overflow-hidden bg-[#242424] border border-[#383838] p-4 shadow-2xl transition-all duration-500 group-hover:border-[#F5D900]/50">
                
                {/* The Staged ART Image (Highlighting the bottle & amber whiskey glass) */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#111111]">
                  <Image
                    src="/assets/hero-whisky-art.jpg"
                    alt="Fine spirits and whiskey bottle at JFK Liquors"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/20 opacity-80" />
                  
                  {/* Amber liquid lighting glow */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F5D900]/25 to-transparent pointer-events-none" />

                  {/* Burgundy Allocation Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#5B1018] border border-[#F5D900]/50 text-[#F5D900] text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    Allocated Bottles In Stock
                  </div>
                </div>

                {/* Heritage Stamp Seal (Replicating the original storefront badge) */}
                <div className="mt-4 px-3 py-2 flex items-center justify-between border-t border-[#333333] text-xs">
                  <div>
                    <span className="text-[10px] text-[#F5D900] font-bold uppercase tracking-widest block font-sans">
                      Houston Landmark Vault
                    </span>
                    <span className="font-serif text-sm text-[#FFFFFF]">
                      Spirits &bull; Fine Wine &bull; Cold Beer
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#A0A0A0]">
                    EST. 2016
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

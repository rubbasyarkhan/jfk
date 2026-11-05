import Image from 'next/image';
import Link from 'next/link';

export default function StorySection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0E0D0D] border-t border-[#262626]">
      
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, #5B1018 0%, #D4AF37 50%, transparent 80%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split: "Our Collections" (Direct replica of Whisky Foundation lower layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Column: Connoisseur Tasting Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#2E2E2E] bg-[#161616] aspect-[4/5] shadow-2xl group">
              <Image
                src="/assets/collection-story.jpg"
                alt="Connoisseur tasting single malt scotch at JFK Liquors"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              
              {/* Cinematic Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, #0E0D0D 0%, rgba(14,13,13,0.3) 60%, transparent 100%)',
                }}
              />
              
              {/* Overlay Tag in Deep Burgundy & Liquid Gold */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0E0D0D]/95 border border-[#5B1018] shadow-xl backdrop-blur-sm">
                <p className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase mb-1">
                  Private Barrel Selection
                </p>
                <p className="text-xs text-[#E5E5E5] font-light leading-relaxed">
                  Every cask is hand-selected in person from Kentucky rickhouses and Speyside cellars for Houston’s discerning palates.
                </p>
              </div>
            </div>

            {/* Decorative Gold Frame */}
            <div className="absolute -inset-3 rounded-2xl border border-[#D4AF37]/20 -z-10 -rotate-1 hidden sm:block pointer-events-none" />
          </div>

          {/* Right Column: Editorial "Our Collections" Narrative + Pedestal Showcase */}
          <div className="lg:col-span-7">
            
            <p className="eyebrow mb-2">The JFK Liquors Cellar</p>
            
            <h2
              className="font-serif tracking-tight text-[#FFFFFF] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.05 }}
            >
              Our Collections
            </h2>

            <div className="w-16 h-0.5 bg-[#D4AF37] mb-6" />

            <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed font-light mb-8 max-w-xl">
              These whiskies and rare spirits are a collection of expressions that have been hand-picked by our team because we think they&apos;re absolutely exquisite. If you&apos;re looking for a top-quality independent bottling, an allocated wheated bourbon, or a rare cask release but aren&apos;t really sure where to start, this is the place to be.
            </p>

            {/* Featured Pedestal Display (Matches Kingsbury & Macallan display from photo) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              
              <div className="p-4 rounded-xl bg-[#161616] border border-[#2E2E2E] flex items-center gap-4 group hover:border-[#D4AF37]/60 transition-colors">
                <div className="relative w-16 h-20 rounded bg-[#0E0D0D] border border-[#262626] overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80"
                    alt="Kingsbury Vintage Cask"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#D4AF37] font-mono uppercase block">Vintage Cask</span>
                  <h4 className="font-serif text-sm text-[#FFFFFF] leading-snug">Kingsbury 1990 Rare Reserve</h4>
                  <p className="font-serif text-xs text-[#D4AF37] font-semibold mt-1">Private Cellar Stock</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#161616] border border-[#2E2E2E] flex items-center gap-4 group hover:border-[#D4AF37]/60 transition-colors">
                <div className="relative w-16 h-20 rounded bg-[#0E0D0D] border border-[#262626] overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80"
                    alt="The Macallan 15 Triple Cask"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#D4AF37] font-mono uppercase block">Highland Single Malt</span>
                  <h4 className="font-serif text-sm text-[#FFFFFF] leading-snug">The Macallan 15 Triple Cask</h4>
                  <p className="font-serif text-xs text-[#D4AF37] font-semibold mt-1">$179.99</p>
                </div>
              </div>

            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/products/spirits" className="btn-gold">
                Explore Full Collection &rarr;
              </Link>
              <Link href="/about" className="btn-ghost">
                Our Story &amp; Heritage
              </Link>
            </div>

          </div>

        </div>

        {/* Lower Banner: MEUKOW Inspired Editorial Statement ("QUALITY IS NOT AN ACT IT IS HABIT") */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-[#2E2E2E] p-8 sm:p-14 shadow-2xl">
          
          {/* Subtle Watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[4.5rem] sm:text-[7rem] font-serif font-black text-[#222222]/40 select-none pointer-events-none tracking-widest hidden md:block">
            JFK LIQUORS
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-3 text-[#D4AF37]">
              The JFK Liquors Philosophy
            </p>

            <h3
              className="font-serif text-[#FFFFFF] tracking-tight uppercase mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05 }}
            >
              &ldquo;Quality is not an act,
              <br />
              <span className="text-[#D4AF37]">it is habit.&rdquo;</span>
            </h3>

            <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed font-light mb-8">
              Unravel the story of JFK Liquors &amp; Fine Spirits — serving Houston travelers, international airport flight crews, and our beloved local community with authentic hospitality, genuine bottle provenance, and fair allocation access.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#FFFFFF] transition-colors"
            >
              <span>Discover Our Heritage</span>
              <svg className="w-4 h-4 transition-transform hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

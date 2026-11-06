import Link from 'next/link';

export default function PromotionalBanner() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-[#5B1018] text-[#FFFFFF] border-y border-[#F5D900]/25 shadow-2xl">
      {/* Subtle gold radial lighting */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 50%, #F5D900 0%, transparent 45%), radial-gradient(circle at 85% 50%, #781520 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Banner Copy */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900] animate-pulse" />
              <span className="text-[11px] font-bold text-[#F5D900] tracking-[0.2em] uppercase font-sans">
                Allocated Whiskey Drops &bull; In Store Only
              </span>
            </div>

            <h2
              className="font-serif tracking-tight text-[#FFFFFF] mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08 }}
            >
              Seeking Blanton&apos;s, Weller, or Eagle Rare?
            </h2>

            <p className="text-sm sm:text-base text-[#FFFFFF]/90 font-light leading-relaxed">
              We receive limited releases throughout the week. Visit our JFK Boulevard location or call our cellar counter directly to verify today&apos;s bottle availability.
            </p>
          </div>

          {/* Banner Actions */}
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <a
              href="tel:+12815903300"
              className="btn-gold shadow-xl"
            >
              <svg className="w-4 h-4 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call (281) 590-3300</span>
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost border-[#FFFFFF]/40 hover:border-[#FFFFFF] hover:text-[#FFFFFF]"
            >
              Get Directions ↗
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

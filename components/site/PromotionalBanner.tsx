import Link from 'next/link';

export default function PromotionalBanner() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-r from-[#3F0B10] via-[#5B1018] to-[#24060A] text-[#FFFFFF] border-y border-[#D4AF37]/25 shadow-2xl">
      {/* Decorative background radial pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 40%), radial-gradient(circle at 80% 50%, #781520 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Banner Copy */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3F0B10] border border-[#D4AF37]/40 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10.5px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                Allocated Whiskey Drops &bull; In Store Only
              </span>
            </div>

            <h2
              className="font-serif tracking-tight text-[#FFFFFF] mb-3"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              Seeking Blanton&apos;s, Weller, or Eagle Rare?
            </h2>

            <p className="text-sm sm:text-base text-[#F4F4F4]/90 font-light leading-relaxed">
              We receive limited releases throughout the week. Visit our JFK Boulevard location or call our cellar counter directly to verify today&apos;s allocation availability.
            </p>
          </div>

          {/* Banner Actions */}
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <a
              href="tel:+12815903300"
              className="py-3 px-7 rounded bg-[#D4AF37] text-[#0E0D0D] font-bold text-xs uppercase tracking-wider hover:bg-[#E5C268] transition-all duration-300 shadow-xl inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (281) 590-3300
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded border border-[#FFFFFF]/80 text-[#FFFFFF] font-serif tracking-widest uppercase text-xs hover:bg-[#FFFFFF] hover:text-[#0E0D0D] transition-all duration-300"
            >
              Get Directions
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

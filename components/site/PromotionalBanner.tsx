'use client';

import { useSiteContent } from '@/lib/useSiteContent';

export default function PromotionalBanner() {
  const { brand, promoBanner } = useSiteContent();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-[#4A0A10] text-[#FFFFFF] border-y border-[#F5D900]/25 shadow-2xl">
      {/* Subtle gold radial lighting */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 50%, #F5D900 0%, transparent 45%), radial-gradient(circle at 85% 50%, #781520 0%, transparent 50%)',
        }}
      />

      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Banner Copy */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900] animate-pulse" />
              <span className="text-[10.5px] font-mono font-bold text-[#F5D900] tracking-[0.22em] uppercase">
                {promoBanner.eyebrow}
              </span>
            </div>

            <h2
              className="font-anton tracking-wide uppercase text-[#FFFFFF] mb-3"
              style={{
                fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
                lineHeight: 1.06,
              }}
            >
              {promoBanner.heading}
            </h2>

            <p className="text-sm sm:text-base text-[#FFFFFF]/90 font-light leading-relaxed">
              {promoBanner.description}
            </p>
          </div>

          {/* Banner Actions */}
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <a href={`tel:${brand.phoneTel}`} className="btn-gold shadow-xl">
              <span>{promoBanner.primaryCtaText}</span>
            </a>

            <a
              href={brand.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost border-white/30 hover:border-white hover:text-white"
            >
              <span>{promoBanner.secondaryCtaText}</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

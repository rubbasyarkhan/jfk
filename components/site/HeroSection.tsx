import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh] min-h-[640px] max-h-[1080px] w-full flex flex-col justify-between overflow-hidden bg-[#050505]">
      
      {/* 1. Visual Canvas: High-Resolution Bottle Image (heromain.jpg) Clearly Visible */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/heromain.jpg"
          alt="JFK Liquors Private Collection & Rare Cellar Reserve"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center brightness-[0.92]"
        />
        
        {/* Directed Cinematic Dark Gradient:
            Protects left-side text legibility while allowing the bottles on the right and center to shine clearly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.80) 35%, rgba(5,5,5,0.35) 68%, rgba(5,5,5,0.12) 100%)',
          }}
        />

        {/* Subtle Top & Bottom Vignettes for Seamless Contrast */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none" />
      </div>

      {/* Main Spatial Grid Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-14">
        
        {/* 2. Top Alignment: Editorial Main Heading in Refined Luxury Cinzel Font */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 bg-[#F5D900]" />
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#F5D900] font-semibold">
              Private Client Cellar &bull; Houston, Texas
            </p>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] tracking-[0.04em] uppercase font-semibold text-white leading-[1.28] sm:leading-[1.32]">
            <span>Rare Provenance.</span>
            <span className="block mt-1.5 sm:mt-2.5 text-[#F5D900] font-normal">
              Uncompromising
            </span>
            <span className="block mt-1.5 sm:mt-2.5 text-white">
              Distinction.
            </span>
          </h1>
        </div>

        {/* 3. Bottom Layer: Split Asymmetric Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pt-6 border-t border-white/10">
          
          {/* Bottom-Left Block: Concise Narrative Paragraph */}
          <div className="lg:col-span-7 max-w-lg">
            <p className="text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-light">
              Curating allocated single casks, vintage cellar acquisitions, and rare barrel reserves for collectors and connoisseurs worldwide. Headquartered along Houston’s IAH airport corridor, providing discreet acquisition and bespoke advisory.
            </p>
          </div>

          {/* Bottom-Right Block: Exactly Two Crisp Luxury CTAs */}
          <div className="lg:col-span-5 flex flex-row flex-wrap sm:flex-nowrap gap-3.5 sm:gap-4 justify-start lg:justify-end items-center">
            <Link
              href="#vault"
              className="btn-primary w-full sm:w-auto text-center !px-6 !py-3.5 text-xs font-bold uppercase tracking-[0.16em]"
            >
              <span>Explore Vault</span>
              <span className="text-[10px]">↗</span>
            </Link>

            <Link
              href="/contact"
              className="btn-secondary w-full sm:w-auto text-center !px-6 !py-3.5 text-xs font-semibold uppercase tracking-[0.14em]"
            >
              Private Concierge
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}

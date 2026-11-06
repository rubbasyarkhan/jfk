import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh] min-h-[700px] w-full flex flex-col justify-between overflow-hidden bg-[#050505]">
      
      {/* 1. Visual Canvas (Full-Bleed Background Layer with AAA Contrast Overlay) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/heromain.jpg"
          alt="JFK Liquors Private Collection & Rare Cellar Reserve"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle Multi-Axis Darkening to guarantee AAA contrast ratios */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Main Spatial Grid Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-12 md:pb-16">
        
        {/* 2. Top Alignment: Editorial Main Heading */}
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 bg-[#F5D900]" />
            <p className="meta-tag">
              Private Client Cellar &bull; Houston, Texas
            </p>
          </div>

          <h1
            className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none sm:leading-[0.98]"
          >
            Rare Provenance.
            <br />
            <span className="italic font-serif text-[#F5D900]">
              Uncompromising
            </span>{' '}
            Distinction.
          </h1>
        </div>

        {/* 3. Bottom Layer: Split Asymmetric Footer Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-8 sm:pt-10 border-t border-white/10">
          
          {/* Bottom-Left Block (Narrative Paragraph) */}
          <div className="lg:col-span-7 max-w-md lg:max-w-lg">
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
              Curating allocated single casks, vintage cellar acquisitions, and rare barrel reserves for collectors and connoisseurs worldwide. Headquartered along Houston’s IAH airport corridor, providing discreet acquisition and bespoke advisory.
            </p>
          </div>

          {/* Bottom-Right Block (Dual Call-To-Action) */}
          <div className="lg:col-span-5 flex flex-row flex-wrap sm:flex-nowrap gap-4 md:gap-5 justify-start lg:justify-end items-center">
            <Link
              href="#vault"
              className="btn-primary w-full sm:w-auto text-center px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] rounded-none"
            >
              Explore Private Vault
            </Link>

            <Link
              href="/contact"
              className="btn-secondary w-full sm:w-auto text-center px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] rounded-none"
            >
              Private Concierge
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}

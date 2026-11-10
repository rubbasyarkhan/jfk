import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] sm:h-[100dvh] min-h-[600px] w-full flex flex-col justify-between overflow-hidden bg-[#050505]">
      
      {/* 1. Visual Canvas: High-Resolution Bottle Collection clearly showcasing multiple spirits (Tequila, Gin, Tonic, Bourbon & Scotch) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/ovmougmy/image/upload/v1794246857/jfk-liquors/hero-collection-bottles.jpg"
          alt="JFK Liquors Curated Spirits Collection - Artisanal Tequila, Craft Gin, Botanical Tonic & Fine Scotch"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />
      </div>

      {/* Main Spatial Grid Container (Expanded for Big Screens with Zero Awkward Gaps) */}
      <div className="relative z-10 w-full h-full max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-14">
        
        {/* 2. Top Alignment: Editorial Main Heading in Luxury Playfair Display Serif */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <p className="meta-tag">
              Private Client Cellar &bull; Houston, Texas
            </p>
          </div>

          <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] tracking-wide uppercase text-white leading-[1.04]">
            <span>Rare Provenance.</span>
            <span className="block mt-1 sm:mt-2 text-[#F5D900]">
              Uncompromising
            </span>
            <span className="block mt-1 sm:mt-2 text-white">
              Distinction.
            </span>
          </h1>
        </div>

        {/* 3. Bottom Layer: Split Asymmetric Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pt-6 border-t border-white/10">
          
          {/* Bottom-Left Block: Concise Narrative Paragraph in Clean Montserrat */}
          <div className="lg:col-span-7 max-w-lg">
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
              Curating allocated single casks, vintage cellar acquisitions, and rare barrel reserves for collectors and connoisseurs worldwide. Headquartered along Houston’s IAH airport corridor, providing discreet acquisition and bespoke advisory.
            </p>
          </div>

          {/* Bottom-Right Block: Exactly Two Crisp Luxury CTAs (Responsive Stack on Mobile) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start lg:justify-end items-stretch sm:items-center">
            <Link
              href="#vault"
              className="btn-primary w-full sm:w-auto text-center !px-6 !py-3.5 text-xs font-bold uppercase tracking-[0.16em]"
            >
              <span>Explore Vault</span>
              <span className="text-[10px]">↗</span>
            </Link>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto text-center !px-6 !py-3.5 text-xs font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-1.5"
            >
              <span>Get Directions</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}

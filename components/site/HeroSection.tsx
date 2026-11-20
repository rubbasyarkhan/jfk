'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSiteContent } from '@/lib/useSiteContent';

export default function HeroSection() {
  const { brand, hero } = useSiteContent();

  return (
    <section className="relative min-h-[100dvh] sm:h-[100dvh] min-h-[600px] w-full flex flex-col justify-between overflow-hidden bg-[#050505]">
      {/* 1. Visual Canvas: High-Resolution Bottle Collection */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            hero.backgroundImageUrl ||
            'https://res.cloudinary.com/ovmougmy/image/upload/v1794246857/jfk-liquors/hero-collection-bottles.jpg'
          }
          alt={`${brand.storeName} Selection - Houston, Texas Near IAH`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />
      </div>

      {/* Main Spatial Grid Container */}
      <div className="relative z-10 w-full h-full max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-14">
        {/* 2. Top Alignment: Main Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <p className="meta-tag">{hero.eyebrow}</p>
          </div>

          <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] tracking-wide uppercase text-white leading-[1.04]">
            <span>{hero.titleLine1}</span>
            <span className="block mt-1 sm:mt-2 text-[#F5D900]">
              {hero.titleLine2Gold}
            </span>
            <span className="block mt-1 sm:mt-2 text-white">
              {hero.titleLine3}
            </span>
          </h1>
        </div>

        {/* 3. Bottom Layer: Split Asymmetric Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pt-6 border-t border-white/10">
          {/* Bottom-Left Block: Friendly, Professional Retail Description */}
          <div className="lg:col-span-7 max-w-lg">
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
              {hero.description}
            </p>
          </div>

          {/* Bottom-Right Block: Two Primary CTAs */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start lg:justify-end items-stretch sm:items-center">
            <Link
              href={hero.primaryCtaHref || '#vault'}
              className="btn-primary w-full sm:w-auto text-center !px-6 !py-3.5 text-xs font-bold uppercase tracking-[0.16em]"
            >
              <span>{hero.primaryCtaText || 'Explore Vault'}</span>
              <span className="text-[10px]">↗</span>
            </Link>

            <a
              href={brand.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto text-center !px-6 !py-3.5 text-xs font-semibold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-1.5"
            >
              <span>{hero.secondaryCtaText || 'Get Directions'}</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

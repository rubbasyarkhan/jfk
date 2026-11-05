'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SLIDES = [
  {
    eyebrow: 'EST. 2016 • HOUSTON, TX • 3 MIN FROM IAH',
    headlineMain: 'We bring you',
    headlineAccent: 'Close to the cask...',
    description:
      'Curated single barrel bourbons, rare scotch expressions, and cellar-grade vintages on John F Kennedy Boulevard. Houston’s premier spirits vault, minutes from George Bush Intercontinental Airport.',
    bottleLabel: 'The Macallan 12 Year & Rare Bourbon',
    bottleOrigin: 'Speyside & Kentucky Private Casks',
    bottlePrice: '$84.99',
    ctaPrimary: 'Explore Collection',
    ctaPrimaryHref: '#collection',
  },
  {
    eyebrow: 'PRIVATE ALLOCATION VAULT • RARE RELEASES',
    headlineMain: 'Curated by master',
    headlineAccent: 'Texas palates...',
    description:
      'Hand-selected single barrels, cask strength rye, and coveted allocated bottles — from Blanton’s Gold and Eagle Rare to Japanese Yamazaki 12.',
    bottleLabel: 'Blanton’s Single Barrel Private Reserve',
    bottleOrigin: 'Warehouse H • Frankfort, Kentucky',
    bottlePrice: '$169.99',
    ctaPrimary: 'View Allocated Spirits',
    ctaPrimaryHref: '/products/spirits',
  },
  {
    eyebrow: 'CELLAR-WORTHY WINES • DIRECT PICKUP & DELIVERY',
    headlineMain: 'Sip perfection from',
    headlineAccent: 'Napa to Bordeaux...',
    description:
      'Grand cru champagnes, Napa Valley estate cabernets, and chilled craft beer. Order on Uber Eats & DoorDash or visit our boutique vault.',
    bottleLabel: 'Caymus Napa Valley Cabernet Sauvignon',
    bottleOrigin: 'Rutherford • Napa Valley, California',
    bottlePrice: '$99.99',
    ctaPrimary: 'Browse Wine Cellar',
    ctaPrimaryHref: '/products/wines',
  },
];

const PREVIEW_BOTTLES = [
  {
    name: 'The Macallan Speyside Single Malt',
    category: 'spirits',
    slug: 'scotch-whisky',
    price: 89.99,
    abv: '43% ABV',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Small Batch & Allocated Bourbon Vault',
    category: 'spirits',
    slug: 'bourbon-american-whiskey',
    price: 64.99,
    abv: '45% ABV',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0E0D0D]">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.16) 0%, transparent 65%), radial-gradient(circle at 10% 80%, rgba(91, 16, 24, 0.28) 0%, transparent 60%)',
        }}
      />

      {/* Subtle top & bottom gold hair lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
        
        {/* Main Grid: Left Editorial Story + Center ART Image + Right Preview Shelf */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full mb-6 bg-[#161616] border border-[#2E2E2E] w-fit shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                {slide.eyebrow}
              </span>
            </div>

            {/* Editorial Serif Headline */}
            <h1
              className="font-serif text-[#FFFFFF] tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
                lineHeight: 1.05,
              }}
            >
              {slide.headlineMain}
              <br />
              <span className="italic text-[#D4AF37] font-serif block mt-1">
                {slide.headlineAccent}
              </span>
            </h1>

            {/* Body */}
            <p className="text-sm sm:text-base text-[#A5A5A5] mb-8 leading-relaxed font-light max-w-lg">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href={slide.ctaPrimaryHref} className="btn-gold group">
                {slide.ctaPrimary}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:underline ml-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Store
              </a>
            </div>

            {/* Slider Navigation & Pagination (Exact Whisky Foundation aesthetic) */}
            <div className="flex items-center gap-5 pt-4 border-t border-[#262626]/80">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-7 h-2 rounded-full bg-[#D4AF37]'
                        : 'w-2 h-2 rounded-full bg-[#3A3A3A] hover:bg-[#666666]'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <span className="text-xs font-mono text-[#A5A5A5] tracking-widest">
                0{currentSlide + 1} / 0{SLIDES.length}
              </span>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-[#2E2E2E] bg-[#161616] text-[#FFFFFF] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
                  aria-label="Previous slide"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-[#2E2E2E] bg-[#161616] text-[#FFFFFF] hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
                  aria-label="Next slide"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* Center Column: The Staged ART Image on Tasting Stone Slab */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[420px] group">
              
              {/* Backlit gold aura */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-35 filter blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-50"
                style={{
                  background:
                    'radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(91, 16, 24, 0.4) 60%, transparent 80%)',
                }}
              />

              {/* ART Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#161616] border border-[#2E2E2E] shadow-2xl p-3 sm:p-4 transition-all duration-500 group-hover:border-[#D4AF37]/60">
                
                {/* Header Tag inside ART frame */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#262626] mb-3">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.22em]">
                    Cask Vault Selection
                  </span>
                  <span className="text-[10px] text-[#A5A5A5] font-mono tracking-wider">
                    JFK BLVD • HOUSTON
                  </span>
                </div>

                {/* Staged High-Resolution ART Image */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#080808]">
                  <Image
                    src="/assets/hero-whisky-art.jpg"
                    alt="The Art of Fine Scotch & Bourbon at JFK Liquors"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  
                  {/* Subtle dark gradient overlay to give cinematic depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0D] via-transparent to-black/20 opacity-80" />
                  
                  {/* Amber liquid underglow */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#D4AF37]/30 to-transparent pointer-events-none" />

                  {/* Burgundy Allocation Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#5B1018] border border-[#D4AF37]/50 text-[#FFFFFF] text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    Allocated Cask
                  </div>

                  {/* Bottom Image Overlay Description */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-lg bg-[#0E0D0D]/90 border border-[#262626] backdrop-blur-sm">
                    <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      {slide.bottleOrigin}
                    </p>
                    <p className="font-serif text-sm text-[#FFFFFF] font-medium leading-snug">
                      {slide.bottleLabel}
                    </p>
                  </div>
                </div>

                {/* Pedestal Bottom Status */}
                <div className="mt-3 px-3 py-2 flex items-center justify-between text-xs">
                  <span className="text-[#A5A5A5] text-[11px]">In Stock on JFK Blvd</span>
                  <span className="font-serif text-lg text-[#D4AF37] font-semibold">{slide.bottlePrice}</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: "Shop Whisky" Preview Shelf (Directly inspired by Whisky Foundation layout) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Shelf Eyebrow */}
            <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
              <h3 className="font-serif text-xl text-[#FFFFFF] tracking-wide">
                Shop Whisky
              </h3>
              <Link
                href="/products/spirits"
                className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase hover:underline"
              >
                All &rarr;
              </Link>
            </div>

            {/* 2 Vertical Bottle Cards */}
            <div className="flex flex-col gap-3">
              {PREVIEW_BOTTLES.map((bottle) => (
                <div
                  key={bottle.slug}
                  className="group relative rounded-xl overflow-hidden bg-[#161616] border border-[#262626] p-3.5 transition-all duration-300 hover:border-[#D4AF37]/70 hover:shadow-xl"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Bottle thumbnail */}
                    <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#0E0D0D] border border-[#2E2E2E] flex-shrink-0">
                      <Image
                        src={bottle.image}
                        alt={bottle.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Bottle details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#A5A5A5] uppercase font-mono">{bottle.abv}</p>
                      <h4 className="font-serif text-xs sm:text-sm text-[#FFFFFF] line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                        {bottle.name}
                      </h4>
                      <p className="font-serif text-sm sm:text-base text-[#D4AF37] font-semibold mt-1">
                        ${bottle.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Clean White "Buy Now" button like Whisky Foundation */}
                  <Link
                    href={`/products/${bottle.category}/${bottle.slug}`}
                    className="mt-3 block w-full text-center py-1.5 px-3 rounded bg-[#FFFFFF] text-[#0E0D0D] font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0E0D0D] transition-colors"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>

            {/* Quick airport pickup guarantee */}
            <div className="p-3 rounded-xl bg-[#161616] border border-[#262626] text-[11px] text-[#A5A5A5] leading-relaxed flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#5B1018] flex-shrink-0" />
              <span>
                3 Minutes from IAH Terminal C &bull; Curbside hold ready within 15 minutes.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

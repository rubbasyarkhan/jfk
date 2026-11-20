'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSiteContent } from '@/lib/useSiteContent';

export default function StorySection() {
  const { storySection } = useSiteContent();

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0A0A0A] border-t border-white/[0.08]">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Real Bottle Art Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded overflow-hidden border border-white/10 bg-[#141414] aspect-[4/3] sm:aspect-[16/11] shadow-2xl group">
              <Image
                src={
                  storySection.imageUrl ||
                  'https://res.cloudinary.com/ovmougmy/image/upload/v1793981770/jfk-liquors/collection-story.jpg'
                }
                alt="Spirits, wine, and beer selection at JFK Liquors Houston"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gold Label on bottom left */}
              {storySection.imageBadgeText && (
                <div className="absolute bottom-0 left-0 bg-[#F5D900] text-[#0A0A0A] py-3 px-5 text-[10.5px] font-bold tracking-[0.16em] uppercase">
                  {storySection.imageBadgeText}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6">
            <p className="index-tag mb-3">{storySection.eyebrow}</p>

            <h2
              className="font-anton tracking-wide uppercase text-[#FFFFFF] mb-6"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                lineHeight: 1.05,
              }}
            >
              {storySection.headingLine1}
              <br />
              <span className="text-[#F5D900]">
                {storySection.headingLine2Gold}
              </span>
            </h2>

            <div className="space-y-4 text-[#C7C7C7] leading-relaxed font-light text-base sm:text-lg mb-8 max-w-xl">
              {storySection.paragraph1 && <p>{storySection.paragraph1}</p>}
              {storySection.paragraph2 && <p>{storySection.paragraph2}</p>}
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 mb-8 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-[#F5D900] block mb-1">
                  {storySection.stat1Value}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#e0e0e0]">
                  {storySection.stat1Label}
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-[#FFFFFF] block mb-1">
                  {storySection.stat2Value}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#e0e0e0]">
                  {storySection.stat2Label}
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-[#F5D900] block mb-1">
                  {storySection.stat3Value}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#e0e0e0]">
                  {storySection.stat3Label}
                </span>
              </div>
            </div>

            <div>
              <Link
                href={storySection.ctaHref || '/about'}
                prefetch={true}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5D900] border-b border-[#F5D900]/40 pb-1 hover:border-[#F5D900] transition-colors"
              >
                <span>{storySection.ctaText}</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

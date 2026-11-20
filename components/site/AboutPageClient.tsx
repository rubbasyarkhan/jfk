'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSiteContent } from '@/lib/useSiteContent';

export default function AboutPageClient() {
  const { aboutPage } = useSiteContent();

  return (
    <div className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="index-tag mb-3">{aboutPage.eyebrow}</p>
          <h1
            className="font-serif tracking-tight text-[#FFFFFF]"
            style={{
              fontSize: 'clamp(3rem, 6vw, 4.8rem)',
              lineHeight: 1.05,
            }}
          >
            {aboutPage.headingWhite}{' '}
            <span className="italic text-[#F5D900] font-serif">
              {aboutPage.headingGold}
            </span>
          </h1>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-[21/9] rounded overflow-hidden border border-white/10 mb-16 shadow-2xl bg-[#141414]">
          <Image
            src={
              aboutPage.heroImageUrl ||
              'https://res.cloudinary.com/ovmougmy/image/upload/v1793981770/jfk-liquors/collection-story.jpg'
            }
            alt="JFK Liquors Houston Retail Selection"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
        </div>

        {/* Story Prose */}
        <div className="space-y-6 text-[#C7C7C7] font-light text-base sm:text-lg leading-relaxed">
          {aboutPage.leadParagraph && (
            <p className="text-xl text-[#FFFFFF] font-normal leading-relaxed">
              {aboutPage.leadParagraph}
            </p>
          )}
          {aboutPage.paragraph2 && <p>{aboutPage.paragraph2}</p>}
          {aboutPage.paragraph3 && <p>{aboutPage.paragraph3}</p>}
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#F5D900] mb-3">
              {aboutPage.card1Title}
            </h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              {aboutPage.card1Text}
            </p>
          </div>
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#FFFFFF] mb-3">
              {aboutPage.card2Title}
            </h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              {aboutPage.card2Text}
            </p>
          </div>
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#F5D900] mb-3">
              {aboutPage.card3Title}
            </h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              {aboutPage.card3Text}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="text-center pt-8 border-t border-white/10 flex flex-wrap justify-center gap-4">
          <Link
            href={aboutPage.primaryCtaHref || '/contact'}
            prefetch={true}
            className="btn-gold"
          >
            {aboutPage.primaryCtaText}
          </Link>
          <Link
            href={aboutPage.secondaryCtaHref || '/products/spirits'}
            prefetch={true}
            className="btn-ghost"
          >
            {aboutPage.secondaryCtaText}
          </Link>
        </div>
      </div>
    </div>
  );
}

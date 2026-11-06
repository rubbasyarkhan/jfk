'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  name: string;
  badge?: string;
}

export default function ProductImageGallery({ images, name, badge }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images?.length > 0 ? images : [
    'https://res.cloudinary.com/ovmougmy/image/upload/v1793981778/jfk-liquors/bourbon-jim-beam.jpg'
  ];

  return (
    <div className="space-y-5">
      {/* Main Luxury Bottle Display — Generous Space & No Cropping */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-sm overflow-hidden border border-white/[0.12] bg-gradient-to-b from-[#16171C] via-[#0E0F12] to-[#07080A] shadow-2xl flex items-center justify-center p-8 sm:p-12 group">
        {/* Subtle Ambient Backlight Glow behind the Bottle */}
        <div
          className="absolute inset-8 rounded-full opacity-25 filter blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(245, 217, 0, 0.3) 0%, rgba(91, 16, 24, 0.2) 60%, transparent 80%)',
          }}
        />

        {/* Unconstrained, Pure Bottle Container */}
        <div className="relative w-full h-full z-10">
          <Image
            src={displayImages[activeIndex]}
            alt={`${name} featured bottle view`}
            fill
            className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Minimal Allocation Badge */}
        {badge && (
          <span className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-sm text-[11px] font-sans font-bold uppercase tracking-[0.18em] bg-[#5B1018] text-[#F5D900] border border-[#F5D900]/40 shadow-xl backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Interactive Thumbnail Gallery with Clean Spacing */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3.5 pt-1">
          {displayImages.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`relative aspect-square rounded-sm overflow-hidden bg-[#101114] p-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'ring-2 ring-[#F5D900] border-transparent opacity-100 shadow-xl scale-102 bg-[#16171C]'
                    : 'border border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                }`}
                aria-label={`View photo ${i + 1} of ${name}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${name} thumbnail ${i + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="120px"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

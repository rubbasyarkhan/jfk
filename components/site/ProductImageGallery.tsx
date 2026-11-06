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
    <div className="space-y-4">
      {/* Main Luxury Bottle Display — Clean, Edge-to-Edge, Big & Bold, No Black Box */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-sm overflow-hidden border border-white/[0.08] bg-[#0A0A0A] shadow-2xl">
        <Image
          src={displayImages[activeIndex]}
          alt={`${name} featured bottle view`}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Minimal Allocation Badge */}
        {badge && (
          <span className="absolute top-5 left-5 z-20 px-3.5 py-1.5 rounded-sm text-[11px] font-sans font-bold uppercase tracking-[0.18em] bg-[#5B1018] text-[#F5D900] border border-[#F5D900]/40 shadow-xl backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Interactive Thumbnail Gallery */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-1">
          {displayImages.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`relative aspect-square rounded-sm overflow-hidden bg-[#121316] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-[#F5D900] border-transparent opacity-100 shadow-xl scale-102'
                    : 'border border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
                aria-label={`View photo ${i + 1} of ${name}`}
              >
                <Image
                  src={img}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

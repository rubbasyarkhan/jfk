'use client';

import Link from 'next/link';

const CATEGORIES = [
  { label: 'All Spirits & Bourbon', slug: 'spirits' },
  { label: 'Wines & Champagne', slug: 'wines' },
  { label: 'Craft & Cold Beer', slug: 'beer' },
  { label: 'Agave, Mezcal & Mixers', slug: 'agave-and-more' },
];

interface Props {
  active: string;
}

export default function CategorySwitcher({ active }: Props) {
  return (
    <div
      className="sticky top-[74px] z-30 py-4 border-b border-[#242424] bg-[#111111]/95 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = cat.slug === active;
            return (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#111111] shadow-lg shadow-[#D4AF37]/25'
                    : 'bg-[#242424] text-[#FFFFFF] border border-[#3A3A3A] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
                style={{ letterSpacing: '0.08em' }}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

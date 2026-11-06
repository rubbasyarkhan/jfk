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
      className="sticky top-[74px] sm:top-[84px] z-30 py-4 border-b border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = cat.slug === active;
            return (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className={`px-5 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F5D900] text-[#0A0A0A] shadow-lg shadow-[#F5D900]/20'
                    : 'bg-[#161616] text-[#FFFFFF] border border-white/10 hover:border-[#F5D900] hover:text-[#F5D900]'
                }`}
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

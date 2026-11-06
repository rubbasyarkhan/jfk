'use client';

import Link from 'next/link';
import type { Category } from '@/types';

interface Props {
  active: string;
  categories?: Category[];
}

const DEFAULT_CATEGORIES = [
  { label: 'All Collection', slug: '' },
  { label: 'Spirits & Bourbon', slug: 'spirits' },
  { label: 'Wines & Champagne', slug: 'wines' },
  { label: 'Craft & Cold Beer', slug: 'beer' },
  { label: 'Agave & More', slug: 'agave-and-more' },
];

export default function CategorySwitcher({ active, categories }: Props) {
  const tabs =
    categories && categories.length > 0
      ? [
          { label: 'All Collection', slug: '' },
          ...categories.map((c) => ({ label: c.name, slug: c.slug })),
        ]
      : DEFAULT_CATEGORIES;

  return (
    <div
      className="sticky top-[74px] sm:top-[80px] z-30 py-3.5 border-b border-white/[0.08] bg-[#050505]/95 backdrop-blur-md"
    >
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {tabs.map((cat) => {
            const isActive = cat.slug === active;
            const href = cat.slug ? `/products/${cat.slug}` : '/products';
            return (
              <Link
                key={cat.slug || 'all'}
                href={href}
                className={`px-5 py-2 rounded-sm text-xs font-sans font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F5D900] text-[#050505] shadow-lg shadow-[#F5D900]/20'
                    : 'bg-[#121316] text-[#FFFFFF] border border-white/10 hover:border-[#F5D900] hover:text-[#F5D900]'
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

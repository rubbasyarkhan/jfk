'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RareBottle {
  id: string;
  name: string;
  distillery: string;
  ageStatement: string;
  edition: string;
  price: number;
  abv: string;
  caskType: string;
  image: string;
  notes: string;
}

const RARE_EDITIONS: RareBottle[] = [
  {
    id: 'macallan-25',
    name: 'The Macallan 25 Year Old Sherry Oak',
    distillery: 'The Macallan Distillery • Easter Elchies, Speyside',
    ageStatement: '25 Years',
    edition: 'Collector Archive Release',
    price: 3333.0,
    abv: '43.0% ABV',
    caskType: 'Hand-picked Oloroso Sherry Seasoned Casks from Jerez',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80',
    notes: 'Rich mahogany amber. Dried fruits, ginger, wood smoke, and dark chocolate with a sublime finish.',
  },
  {
    id: 'pappy-20',
    name: 'Pappy Van Winkle Family Reserve 20 Year',
    distillery: 'Old Rip Van Winkle • Frankfort, Kentucky',
    ageStatement: '20 Years',
    edition: 'Extremely Limited Allocation',
    price: 2850.0,
    abv: '45.2% ABV (90.4 Proof)',
    caskType: 'Charred New American White Oak',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1200&q=80',
    notes: 'Intense and velvety. Aromas of sweet vanilla, leather, cigar box, and caramelized butterscotch.',
  },
  {
    id: 'whistlepig-boss-hog',
    name: 'WhistlePig The Boss Hog X: The Commandments',
    distillery: 'WhistlePig Farm • Shoreham, Vermont',
    ageStatement: 'Straight Rye',
    edition: 'Single Barrel Cask Strength',
    price: 699.0,
    abv: '53.2% ABV',
    caskType: 'Craft Mead Cask & Aromatic Resin Finish',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    notes: 'High-rye spices, dark forest honey, toasted peppercorn, and candied orange peel.',
  },
  {
    id: 'blantons-gold',
    name: 'Blanton’s Gold Edition Single Barrel',
    distillery: 'Buffalo Trace • Frankfort, Kentucky',
    ageStatement: 'Single Barrel',
    edition: 'Allocated Export Proof',
    price: 585.0,
    abv: '51.5% ABV (103 Proof)',
    caskType: 'Warehouse H Virgin American Oak',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80',
    notes: 'Powerful spice, dried fruit, rich vanilla bean, and honeyed oak with horse stopper collector series.',
  },
  {
    id: 'clase-azul-ultra',
    name: 'Clase Azul Ultra Extra Añejo',
    distillery: 'Clase Azul • Jesús María, Jalisco',
    ageStatement: '5 Years',
    edition: 'Decanter Painted with Pure Platinum',
    price: 1899.0,
    abv: '40.0% ABV',
    caskType: 'Sherry Cask Finished in Spain',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    notes: 'Deep amber with copper highlights. Dried plums, cinnamon, toasted cedar, and velvety hazelnut cream.',
  },
];

export default function RareEditionsShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeBottle = RARE_EDITIONS[selectedIdx];

  return (
    <section className="relative py-20 lg:py-28 bg-[#080808] text-[#FFFFFF] overflow-hidden border-y border-[#262626]">
      {/* Top ambient luxury header inspired by Whispering Spirits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#262626] gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-widest text-[#D4AF37]">W</span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFFFFF]">
              JFK LIQUORS &bull; COLLECTOR VAULT
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-[#A5A5A5]">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Collector Corner</span>
            <span className="text-[#D4AF37]">Aged Perfection</span>
            <span className="hidden sm:inline text-xs text-[#666666]">&bull;</span>
            <span className="hidden sm:inline text-xs text-[#A5A5A5]">IAH Airport Vault</span>
          </div>
        </div>
      </div>

      {/* Main Altar Stage with Illuminated Pedestals */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cinematic Backlight Glow for the entire altar */}
        <div
          className="absolute inset-0 max-w-4xl mx-auto rounded-full opacity-20 filter blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #D4AF37 0%, #5B1018 50%, transparent 80%)',
          }}
        />

        {/* The Stepped Display Stage (Directly replicating the Whispering Spirits display) */}
        <div className="relative rounded-2xl bg-[#0E0D0D] border border-[#2E2E2E] p-6 lg:p-12 mb-10 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info: Bottle Specifications & Provenance */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  {activeBottle.edition}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] leading-tight mb-3">
                {activeBottle.name}
              </h2>

              <p className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase mb-5">
                {activeBottle.distillery}
              </p>

              <div className="space-y-3.5 mb-8 text-xs text-[#A5A5A5] leading-relaxed">
                <p className="border-l-2 border-[#D4AF37] pl-3 py-0.5 text-sm font-light text-[#E5E5E5] italic">
                  &ldquo;{activeBottle.notes}&rdquo;
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#262626]">
                  <div>
                    <span className="text-[10px] text-[#737373] uppercase tracking-wider block">Proof / ABV</span>
                    <span className="font-semibold text-[#FFFFFF]">{activeBottle.abv}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#737373] uppercase tracking-wider block">Maturation Cask</span>
                    <span className="font-semibold text-[#FFFFFF] line-clamp-1">{activeBottle.caskType}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-[#262626]">
                <div>
                  <span className="text-[10px] text-[#737373] uppercase tracking-wider block">Vault Valuation</span>
                  <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] font-semibold">
                    ${activeBottle.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <a
                    href="tel:+12815903300"
                    className="btn-gold py-2.5 px-5 text-xs uppercase tracking-wider font-bold"
                  >
                    Hold Bottle
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost py-2.5 px-4 text-xs uppercase tracking-wider"
                  >
                    View in Store
                  </a>
                </div>
              </div>
            </div>

            {/* Right Visual: The Illuminated Pedestal Showcase */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-lg">
                
                {/* Center glowing plinth base */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-[#2E2E2E] p-6 shadow-2xl flex flex-col items-center">
                  
                  {/* Vertical Watermark */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[5rem] sm:text-[7rem] font-serif font-black text-[#1A1A1A]/60 select-none pointer-events-none rotate-90 tracking-widest">
                    RARE
                  </div>

                  {/* Bottle Display Area */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#080808]">
                    <Image
                      src={activeBottle.image}
                      alt={activeBottle.name}
                      fill
                      className="object-cover object-center transition-all duration-700 ease-out"
                    />
                    
                    {/* Bottom plinth light reflection */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#D4AF37]/35 via-[#D4AF37]/10 to-transparent pointer-events-none" />
                    
                    {/* Vintage Seal badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded bg-[#5B1018] border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {activeBottle.ageStatement}
                    </div>
                  </div>

                  {/* Glowing Pedestal Base Bar (Matches the wooden illuminated shelves in the photo) */}
                  <div className="w-full h-4 rounded-full bg-gradient-to-r from-[#24060A] via-[#D4AF37]/80 to-[#24060A] shadow-[0_0_20px_rgba(212,175,55,0.7)]" />
                  
                  <p className="mt-3 text-[11px] font-mono text-[#A5A5A5] uppercase tracking-widest">
                    15655 JOHN F KENNEDY BLVD &bull; SUITE D &bull; HOUSTON
                  </p>

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Thumbnail Strip: "RARE EDITIONS" Row (Direct replica of bottom bar in reference photo) */}
        <div className="rounded-xl bg-[#0E0D0D] border border-[#262626] p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Rare Editions &bull; Vault Selection
            </span>
            <span className="text-[11px] text-[#737373] font-mono">
              Click thumbnail to preview cask specs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {RARE_EDITIONS.map((bottle, idx) => (
              <button
                key={bottle.id}
                onClick={() => setSelectedIdx(idx)}
                className={`group relative p-2.5 rounded-lg border text-left transition-all duration-300 ${
                  selectedIdx === idx
                    ? 'bg-[#1A1A1A] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#141414] border-[#262626] hover:border-[#666666]'
                }`}
              >
                <div className="relative aspect-square w-full rounded overflow-hidden mb-2 bg-[#080808]">
                  <Image
                    src={bottle.image}
                    alt={bottle.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {selectedIdx === idx && (
                    <div className="absolute inset-0 border-2 border-[#D4AF37] pointer-events-none rounded" />
                  )}
                </div>

                <p className="font-serif text-xs text-[#FFFFFF] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                  {bottle.name}
                </p>

                <p className="font-mono text-xs text-[#D4AF37] font-semibold mt-1">
                  ${bottle.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

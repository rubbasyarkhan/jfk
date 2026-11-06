'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DEPARTMENTS = [
  { label: 'Spirits & Bourbon', href: '/products/spirits', desc: 'Allocated bourbon, single malt scotch & cognac' },
  { label: 'Wines & Champagne', href: '/products/wines', desc: 'Cellar vintages, Napa Valley reds & sparkling' },
  { label: 'Craft & Domestic Beer', href: '/products/beer', desc: 'Chilled Texas craft, imports & cold packs' },
  { label: 'Agave & Mixers', href: '/products/agave-and-more', desc: '100% Blue agave tequila, Oaxaca mezcal & ice' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-2xl border-b border-white/[0.08]'
          : 'bg-[#0A0A0A] border-b border-white/[0.05]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[74px] sm:h-[84px]">

          {/* Left: Brand Identity & Live Status Beacon */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0 flex items-center transition-opacity hover:opacity-90">
              <Image
                src="/assets/logo.png"
                alt="JFK Liquors Houston"
                width={155}
                height={52}
                className="h-10 sm:h-11 w-auto object-contain"
                priority
              />
            </Link>

            {/* Subtle Awwwards Geographic Status Beacon (Desktop only) */}
            <div className="hidden xl:flex items-center gap-2 pl-6 border-l border-white/10 text-[10px] font-mono tracking-widest text-[#888888]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900] animate-pulse" />
              <span>HOUSTON, TX &bull; 3 MIN FROM IAH</span>
            </div>
          </div>

          {/* Center: Minimal Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
            <Link
              href="/"
              className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                pathname === '/' ? 'text-[#F5D900]' : 'text-[#FFFFFF] hover:text-[#F5D900]'
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors py-2 ${
                  dropdownOpen || pathname.startsWith('/products')
                    ? 'text-[#F5D900]'
                    : 'text-[#FFFFFF] hover:text-[#F5D900]'
                }`}
              >
                <span>Products</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#F5D900]' : 'text-[#888888]'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 rounded-sm bg-[#141414] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="space-y-0.5">
                    {DEPARTMENTS.map((dept) => (
                      <Link
                        key={dept.href}
                        href={dept.href}
                        onClick={() => setDropdownOpen(false)}
                        className="group block px-3.5 py-2.5 rounded hover:bg-[#1E1E1E] transition-colors"
                      >
                        <p className="text-xs font-semibold text-[#FFFFFF] group-hover:text-[#F5D900] transition-colors">
                          {dept.label}
                        </p>
                        <p className="text-[10.5px] text-[#888888] font-light mt-0.5 line-clamp-1">
                          {dept.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#collection"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              The Collection
            </Link>

            <Link
              href="/about"
              className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                pathname === '/about' ? 'text-[#F5D900]' : 'text-[#FFFFFF] hover:text-[#F5D900]'
              }`}
            >
              Our Store
            </Link>

            <Link
              href="/#delivery"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              Delivery
            </Link>

            <Link
              href="/contact"
              className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                pathname === '/contact' ? 'text-[#F5D900]' : 'text-[#FFFFFF] hover:text-[#F5D900]'
              }`}
            >
              Visit Us
            </Link>
          </nav>

          {/* Right: Direct Phone & Gold Directions Pill */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href="tel:+12815903300"
              className="text-xs font-mono font-medium text-[#C7C7C7] hover:text-[#F5D900] transition-colors tracking-widest"
            >
              (281) 590-3300
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold py-2.5 px-4 text-xs font-bold uppercase tracking-wider"
            >
              <span>Directions</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Mobile Burger Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-white/10 px-5 pt-4 pb-8 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Home
          </Link>
          <div className="pl-3 space-y-2 border-l border-white/10 ml-1">
            <p className="text-[10px] uppercase font-mono tracking-widest text-[#737373]">Departments</p>
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.href}
                href={dept.href}
                onClick={() => setMobileOpen(false)}
                className="block text-xs text-[#A0A0A0] hover:text-[#F5D900]"
              >
                {dept.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#collection"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF] hover:text-[#F5D900]"
          >
            The Collection
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Our Store
          </Link>
          <Link
            href="/#delivery"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Delivery
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Visit Us
          </Link>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="tel:+12815903300"
              className="text-center py-2.5 px-4 rounded bg-[#161616] text-[#F5D900] font-mono text-xs uppercase tracking-wider border border-white/10"
            >
              Call: (281) 590-3300
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-center py-2.5 px-4 text-xs font-bold uppercase tracking-wider justify-center"
            >
              Get Directions ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

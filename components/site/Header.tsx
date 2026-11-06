'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_PRODUCTS = [
  { label: 'Spirits & Bourbon', href: '/products/spirits' },
  { label: 'Wines & Champagne', href: '/products/wines' },
  { label: 'Craft & Domestic Beer', href: '/products/beer' },
  { label: 'Agave, Mezcal & Mixers', href: '/products/agave-and-more' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#111111]/98 backdrop-blur-md shadow-2xl border-b border-[#242424]'
          : 'bg-[#111111]/95 backdrop-blur-sm border-b border-[#242424]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">

          {/* JFK Liquors Brand Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="JFK Liquors Houston"
              width={140}
              height={52}
              className="h-11 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                  dropdownOpen ? 'text-[#F5D900]' : 'text-[#FFFFFF] hover:text-[#F5D900]'
                }`}
              >
                Products
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#F5D900]' : 'text-[#A0A0A0]'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-64 rounded-xl overflow-hidden bg-[#242424] border border-[#383838] shadow-2xl shadow-black/80"
                >
                  <div className="p-2 space-y-1">
                    {NAV_PRODUCTS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 rounded-lg text-xs font-medium text-[#FFFFFF] hover:bg-[#2E2E2E] hover:text-[#F5D900] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#collection"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              The Collection
            </Link>

            <Link
              href="/about"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              Our Store
            </Link>

            <Link
              href="/#delivery"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              Delivery
            </Link>

            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              Visit Us
            </Link>
          </nav>

          {/* Right Action: Call & Directions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+12815903300"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-[#383838] text-xs font-bold text-[#FFFFFF] hover:border-[#F5D900] hover:text-[#F5D900] transition-colors bg-[#242424]"
            >
              <svg className="w-3.5 h-3.5 text-[#F5D900]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 281-590-3300</span>
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold py-2 px-4 text-xs font-bold uppercase tracking-wider"
            >
              Directions ↗
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded text-[#FFFFFF] hover:text-[#F5D900] hover:bg-[#242424]"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-b border-[#242424] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded text-sm font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Home
          </Link>
          <div className="pl-3 space-y-2 border-l border-[#242424] ml-2">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#A0A0A0]">Departments</p>
            {NAV_PRODUCTS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-xs font-medium text-[#C7C7C7] hover:text-[#F5D900]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded text-sm font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Our Store
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded text-sm font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Visit Us
          </Link>

          <div className="pt-3 border-t border-[#242424] flex flex-col gap-2">
            <a
              href="tel:+12815903300"
              className="text-center py-2.5 px-4 rounded bg-[#242424] text-[#F5D900] font-bold text-xs uppercase tracking-wider border border-[#383838]"
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

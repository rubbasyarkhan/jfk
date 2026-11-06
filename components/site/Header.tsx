'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DEPARTMENTS = [
  { label: 'Spirits & Bourbon', href: '/products/spirits', desc: 'Allocated bourbon, single malts & cognac' },
  { label: 'Wines & Champagne', href: '/products/wines', desc: 'Cellar vintages, Napa reds & sparkling' },
  { label: 'Craft & Domestic Beer', href: '/products/beer', desc: 'Cold Texas craft, imports & IPAs' },
  { label: 'Agave & More', href: '/products/agave-and-more', desc: '100% Blue agave tequila & artisanal mezcal' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
          : 'bg-[#111111] border-b border-[#242424]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] sm:h-[80px]">

          {/* Brand Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center transition-opacity hover:opacity-90">
            <Image
              src="/assets/logo.png"
              alt="JFK Liquors Houston"
              width={150}
              height={50}
              className="h-10 sm:h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-9">
            <Link
              href="/"
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
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
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors py-2 ${
                  dropdownOpen || pathname.startsWith('/products')
                    ? 'text-[#F5D900]'
                    : 'text-[#FFFFFF] hover:text-[#F5D900]'
                }`}
              >
                <span>Products</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#F5D900]' : 'text-[#A0A0A0]'
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
                  className="absolute top-full left-0 mt-1 w-72 rounded-lg bg-[#1A1A1A] border border-[#333333] shadow-2xl shadow-black/90 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="space-y-0.5">
                    {DEPARTMENTS.map((dept) => (
                      <Link
                        key={dept.href}
                        href={dept.href}
                        onClick={() => setDropdownOpen(false)}
                        className="group block px-3.5 py-2.5 rounded-md hover:bg-[#242424] transition-colors"
                      >
                        <p className="text-xs font-semibold text-[#FFFFFF] group-hover:text-[#F5D900] transition-colors">
                          {dept.label}
                        </p>
                        <p className="text-[11px] text-[#A0A0A0] font-light mt-0.5 line-clamp-1">
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
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              The Collection
            </Link>

            <Link
              href="/about"
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                pathname === '/about' ? 'text-[#F5D900]' : 'text-[#FFFFFF] hover:text-[#F5D900]'
              }`}
            >
              Our Store
            </Link>

            <Link
              href="/#delivery"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              Delivery
            </Link>

            <Link
              href="/contact"
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                pathname === '/contact' ? 'text-[#F5D900]' : 'text-[#FFFFFF] hover:text-[#F5D900]'
              }`}
            >
              Visit Us
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+12815903300"
              className="text-xs font-mono font-medium text-[#C7C7C7] hover:text-[#F5D900] transition-colors tracking-wider"
            >
              +1 281-590-3300
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold py-2 px-4 text-xs font-bold uppercase tracking-wider"
            >
              <span>Get Directions</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            aria-label="Toggle Menu"
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
        <div className="lg:hidden bg-[#111111] border-b border-[#242424] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Home
          </Link>
          <div className="pl-3 space-y-2 border-l border-[#242424] ml-2">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#737373]">Departments</p>
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.href}
                href={dept.href}
                onClick={() => setMobileOpen(false)}
                className="block text-xs font-medium text-[#A0A0A0] hover:text-[#F5D900]"
              >
                {dept.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#collection"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            The Collection
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Our Store
          </Link>
          <Link
            href="/#delivery"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Delivery
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] hover:text-[#F5D900]"
          >
            Visit Us
          </Link>

          <div className="pt-3 border-t border-[#242424] flex flex-col gap-2">
            <a
              href="tel:+12815903300"
              className="text-center py-2.5 px-4 rounded bg-[#1A1A1A] text-[#F5D900] font-bold text-xs uppercase tracking-wider border border-[#333333]"
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

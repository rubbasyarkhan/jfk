'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DEPARTMENTS = [
  { label: 'Spirits & Allocated Bourbon', href: '/products/spirits', desc: 'Single barrel bourbons, peated Islays & French cognacs' },
  { label: 'Cellar Vintages & Champagne', href: '/products/wines', desc: 'Grand Cru releases, Napa Cabernet & vintage sparkling' },
  { label: 'Independent Craft & Imports', href: '/products/beer', desc: 'Cold Texas micro-brews & celebrated European imports' },
  { label: 'Artisanal Agave & Mixers', href: '/products/agave-and-more', desc: '100% Blue agave extra añejos & Oaxaca mezcals' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [departments, setDepartments] = useState(DEPARTMENTS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function loadDepts() {
      try {
        const res = await fetch('/api/admin/categories');
        const data = await res.json();
        if (res.ok && Array.isArray(data.categories) && data.categories.length > 0) {
          setDepartments(
            data.categories.map((c: any) => ({
              label: c.name,
              href: `/products/${c.slug}`,
              desc: c.description || c.bannerText || 'Curated selection',
            }))
          );
        }
      } catch (e) {
        // Fallback to default
      }
    }
    loadDepts();
  }, []);

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/98 backdrop-blur-md border-b border-white/[0.08] shadow-2xl'
          : 'bg-[#050505]/85 backdrop-blur-sm border-b border-white/[0.06]'
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-[74px] sm:h-[80px]">

          {/* Left: Brand Identity (Clean, Pure, No Clutter) */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
              <Image
                src="https://res.cloudinary.com/ovmougmy/image/upload/v1793981764/jfk-liquors/logo.png"
                alt="JFK Liquors Houston"
                width={140}
                height={44}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Refined Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 flex-shrink-0">
            {/* The Vault Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors py-2 whitespace-nowrap ${
                  dropdownOpen || pathname.startsWith('/products')
                    ? 'text-[#F5D900]'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <span>The Vault</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#F5D900]' : 'text-neutral-500'
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
                  className="absolute top-full left-0 mt-2 w-72 bg-[#0B0C0E] border border-white/10 shadow-2xl p-2 z-50"
                >
                  <div className="space-y-0.5">
                    <Link
                      href="/products"
                      prefetch={true}
                      onClick={() => setDropdownOpen(false)}
                      className="group block px-3.5 py-2.5 bg-[#141519] border-b border-white/[0.06] mb-1 hover:bg-[#1a1b20] transition-colors"
                    >
                      <p className="text-xs font-bold text-[#F5D900] uppercase tracking-wider">
                        Browse All Bottles ↗
                      </p>
                      <p className="text-[10px] text-neutral-400 font-light mt-0.5">
                        Complete cellar &amp; allocated spirits inventory
                      </p>
                    </Link>

                    {departments.map((dept) => (
                      <Link
                        key={dept.href}
                        href={dept.href}
                        prefetch={true}
                        onClick={() => setDropdownOpen(false)}
                        className="group block px-3.5 py-2.5 hover:bg-[#141519] transition-colors"
                      >
                        <p className="text-xs font-semibold text-white group-hover:text-[#F5D900] transition-colors">
                          {dept.label}
                        </p>
                        <p className="text-[10px] text-neutral-400 font-light mt-0.5 line-clamp-1">
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
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Departments
            </Link>

            <Link
              href="/#delivery"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Delivery
            </Link>

            <Link
              href="/about"
              prefetch={true}
              className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${
                pathname === '/about' ? 'text-[#F5D900]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Our Story
            </Link>

            <Link
              href="/contact"
              prefetch={true}
              className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${
                pathname === '/contact' ? 'text-[#F5D900]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right: Phone & Action Button (Never wrap, strictly aligned) */}
          <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
            <a
              href="tel:+12815903300"
              className="text-xs font-mono font-medium text-neutral-300 hover:text-[#F5D900] transition-colors tracking-widest whitespace-nowrap"
            >
              (281) 590-3300
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-4 !py-2.5 text-[11px] tracking-wider whitespace-nowrap"
            >
              <span>Visit Us</span>
              <span className="text-[9px]">↗</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white hover:text-[#F5D900] transition-colors flex-shrink-0"
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

      {/* Mobile Drawer (Responsive with safe scroll area) */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#050505] border-b border-white/10 px-6 pt-4 pb-8 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#F5D900]"
          >
            Overview
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-[#F5D900] hover:underline"
          >
            Browse All Bottles ↗
          </Link>
          <div className="pl-3 space-y-2 border-l border-white/10 ml-1">
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Vault Departments</p>
            {departments.map((dept) => (
              <Link
                key={dept.href}
                href={dept.href}
                onClick={() => setMobileOpen(false)}
                className="block text-xs text-neutral-400 hover:text-[#F5D900]"
              >
                {dept.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#collection"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#F5D900]"
          >
            Departments
          </Link>
          <Link
            href="/#delivery"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#F5D900]"
          >
            Delivery
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#F5D900]"
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#F5D900]"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="tel:+12815903300"
              className="text-center py-3 px-4 bg-[#121316] text-[#F5D900] font-mono text-xs uppercase tracking-wider border border-white/10"
            >
              Call: (281) 590-3300
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center py-3 px-4 text-xs font-bold uppercase tracking-wider justify-center"
            >
              Get Directions ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

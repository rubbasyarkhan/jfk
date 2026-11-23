'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCategories, getInstantCategories } from '@/lib/firestore';
import { useSiteContent } from '@/lib/useSiteContent';
import type { Category } from '@/types';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const { brand, offersPage } = useSiteContent();

  useEffect(() => {
    setCategories(getInstantCategories());

    function handleMemoryUpdate() {
      setCategories(getInstantCategories());
    }

    async function loadCats() {
      try {
        const cats = await getCategories();
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        }
      } catch {
        // Fallback to instant categories
      }
    }
    loadCats();
    window.addEventListener('jfk-catalog-updated', handleMemoryUpdate);
    window.addEventListener('focus', loadCats);
    return () => {
      window.removeEventListener('jfk-catalog-updated', handleMemoryUpdate);
      window.removeEventListener('focus', loadCats);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Only show categories that the admin has enabled for the navbar (default true)
  const navbarCategories = categories.filter((c) => c.showInNavbar !== false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/98 backdrop-blur-md border-b border-white/[0.08] shadow-2xl'
          : 'bg-[#050505]/85 backdrop-blur-sm border-b border-white/[0.06]'
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-[74px] sm:h-[80px] gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              prefetch={true}
              className="flex items-center transition-opacity hover:opacity-90"
            >
              <Image
                src={
                  brand.logoUrl ||
                  'https://res.cloudinary.com/ovmougmy/image/upload/v1793981764/jfk-liquors/logo.png'
                }
                alt={brand.storeName || 'JFK Liquors Houston'}
                width={140}
                height={44}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Dynamic Category Tabs + Offers + Store Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 flex-shrink-0">
            {navbarCategories.map((cat) => {
              const catHref = `/products/${cat.slug}`;
              const isActive =
                pathname === catHref || pathname.startsWith(`${catHref}/`);
              const hasSubcategories =
                Array.isArray(cat.subcategories) && cat.subcategories.length > 0;

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => setHoveredCat(cat.id)}
                  onMouseLeave={() => setHoveredCat(null)}
                >
                  <Link
                    href={catHref}
                    prefetch={true}
                    className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors py-2 whitespace-nowrap ${
                      isActive
                        ? 'text-[#F5D900] font-bold'
                        : 'text-neutral-300 hover:text-[#F5D900]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {hasSubcategories && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          hoveredCat === cat.id
                            ? 'rotate-180 text-[#F5D900]'
                            : 'text-neutral-500'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Subcategories Dropdown on Hover */}
                  {hasSubcategories && hoveredCat === cat.id && (
                    <div className="absolute top-full left-0 pt-1 w-64 z-50">
                      <div className="bg-[#0B0C0E] border border-white/10 shadow-2xl p-2 rounded-sm">
                        <Link
                          href={catHref}
                          prefetch={true}
                          onClick={() => setHoveredCat(null)}
                          className="block px-3.5 py-2 bg-[#141519] border-b border-white/[0.06] mb-1 hover:bg-[#1a1b20] transition-colors"
                        >
                          <p className="text-[11px] font-bold text-[#F5D900] uppercase tracking-wider">
                            All {cat.name} ↗
                          </p>
                        </Link>
                        {cat.subcategories!.map((sub) => (
                          <Link
                            key={sub.id || sub.slug}
                            href={`${catHref}?sub=${encodeURIComponent(sub.slug)}`}
                            prefetch={true}
                            onClick={() => setHoveredCat(null)}
                            className="group block px-3.5 py-2 hover:bg-[#141519] transition-colors"
                          >
                            <p className="text-xs font-medium text-neutral-200 group-hover:text-[#F5D900] transition-colors">
                              {sub.name}
                            </p>
                            {sub.description && (
                              <p className="text-[10px] text-neutral-400 font-light line-clamp-1">
                                {sub.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Offers Tab */}
            {offersPage.showInNavbar !== false && (
              <Link
                href="/offers"
                prefetch={true}
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-sm border transition-all whitespace-nowrap ${
                  pathname === '/offers'
                    ? 'bg-[#F5D900] text-[#050505] border-[#F5D900]'
                    : 'bg-[#5B1018]/70 text-[#F5D900] border-[#F5D900]/40 hover:bg-[#5B1018] hover:border-[#F5D900]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                <span>{offersPage.navbarLabel || 'Offers'}</span>
              </Link>
            )}
          </nav>

          {/* Right: Phone & Action Button */}
          <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
            <a
              href={`tel:${brand.phoneTel}`}
              className="text-xs font-mono font-medium text-neutral-300 hover:text-[#F5D900] transition-colors tracking-widest whitespace-nowrap"
            >
              {brand.phoneDisplay}
            </a>

            <a
              href={brand.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-4 !py-2.5 text-[11px] tracking-wider whitespace-nowrap"
            >
              <span>{brand.headerCtaText || 'Visit Us'}</span>
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
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#050505] border-b border-white/10 px-6 pt-4 pb-8 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-[#F5D900]"
          >
            Home
          </Link>

          {offersPage.showInNavbar !== false && (
            <Link
              href="/offers"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5D900] px-3 py-1.5 rounded-sm bg-[#5B1018]/80 border border-[#F5D900]/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900] animate-pulse" />
              <span>{offersPage.navbarLabel || 'Offers'}</span>
            </Link>
          )}

          <div className="space-y-3 pt-1">
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
              Categories
            </p>
            {navbarCategories.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <Link
                  href={`/products/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-xs font-bold uppercase tracking-[0.16em] text-white hover:text-[#F5D900]"
                >
                  {cat.name}
                </Link>
                {Array.isArray(cat.subcategories) &&
                  cat.subcategories.length > 0 && (
                    <div className="pl-3 border-l border-white/10 space-y-1">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id || sub.slug}
                          href={`/products/${cat.slug}?sub=${encodeURIComponent(sub.slug)}`}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[11px] text-neutral-400 hover:text-[#F5D900]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>

          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="block text-xs font-bold uppercase tracking-[0.2em] text-[#F5D900] hover:underline pt-2"
          >
            Browse All Bottles ↗
          </Link>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={`tel:${brand.phoneTel}`}
              className="text-center py-3 px-4 bg-[#121316] text-[#F5D900] font-mono text-xs uppercase tracking-wider border border-white/10"
            >
              Call: {brand.phoneDisplay}
            </a>
            <a
              href={brand.directionsUrl}
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

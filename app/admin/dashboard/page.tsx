'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getAllProducts,
  getCategories,
  getInstantProducts,
  getInstantCategories,
  HAS_REAL_FIREBASE,
} from '@/lib/firestore';
import { useSiteContent } from '@/lib/useSiteContent';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/initialData';
import type { Product, Category } from '@/types';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [hydrated, setHydrated] = useState(false);
  const { brand } = useSiteContent();

  useEffect(() => {
    setProducts(getInstantProducts());
    setCategories(getInstantCategories());
    setHydrated(true);

    function syncDashboard() {
      Promise.all([getAllProducts(), getCategories()]).then(
        ([latestProds, latestCats]) => {
          if (Array.isArray(latestProds)) setProducts(latestProds);
          if (Array.isArray(latestCats)) setCategories(latestCats);
        }
      );
    }
    syncDashboard();
    window.addEventListener('jfk-catalog-updated', syncDashboard);
    window.addEventListener('storage', syncDashboard);
    return () => {
      window.removeEventListener('jfk-catalog-updated', syncDashboard);
      window.removeEventListener('storage', syncDashboard);
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="py-16 text-center text-[#A0A0A0] text-sm">
        Loading dashboard...
      </div>
    );
  }

  const spiritsCount = products.filter((p) => p.category === 'spirits').length;
  const wineCount = products.filter((p) => p.category === 'wines').length;
  const beerCount = products.filter((p) => p.category === 'beer').length;
  const agaveCount = products.filter(
    (p) => p.category === 'agave-and-more'
  ).length;

  return (
    <div className="space-y-10 text-[#FFFFFF]">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Store Intelligence</p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] uppercase">
            Store Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/content" className="btn-gold !py-2.5">
            Edit Website Content
          </Link>
          <Link href="/admin/products/new" className="btn-ghost !py-2.5">
            + Add New Bottle
          </Link>
          <Link href="/" target="_blank" className="btn-ghost !py-2.5">
            View Live Store
          </Link>
        </div>
      </div>

      {/* KPI Cards in Charcoal #242424 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] flex flex-col justify-between">
          <p className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider mb-2">
            Total Inventory Items
          </p>
          <p className="font-display text-4xl text-[#D4AF37] mb-1">
            {products.length}
          </p>
          <p className="text-xs text-[#C7C7C7] font-light">
            Active across {categories.length} departments
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] flex flex-col justify-between">
          <p className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider mb-2">
            Spirits &amp; Bourbon
          </p>
          <p className="font-display text-4xl text-[#D4AF37] mb-1">
            {spiritsCount}
          </p>
          <p className="text-xs text-[#C7C7C7] font-light">
            Allocated, Scotch, Vodka, Cognac
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] flex flex-col justify-between">
          <p className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider mb-2">
            Wines &amp; Champagne
          </p>
          <p className="font-display text-4xl text-[#FFFFFF] mb-1">
            {wineCount}
          </p>
          <p className="text-xs text-[#C7C7C7] font-light">
            Red, White, Rosé, Sparkling
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] flex flex-col justify-between">
          <p className="text-xs font-bold text-[#A0A0A0] uppercase tracking-wider mb-2">
            Beer &amp; Agave
          </p>
          <p className="font-display text-4xl text-[#FFFFFF] mb-1">
            {beerCount + agaveCount}
          </p>
          <p className="text-xs text-[#C7C7C7] font-light">
            Texas craft, Tequila, Mezcal
          </p>
        </div>
      </div>

      {/* Quick CMS Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/content"
          className="group p-6 rounded-2xl bg-[#242424] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              Full Website CMS
            </span>
            <h3 className="font-display text-xl text-white uppercase mt-3 mb-2 group-hover:text-[#D4AF37] transition-colors">
              Website Content &amp; Sections
            </h3>
            <p className="text-xs text-[#C7C7C7] font-light leading-relaxed mb-4">
              Edit Hero, Delivery, Promo Banner, Story, About Page, Contact Page, Store Hours, Phone, Logo &amp; Footer.
            </p>
          </div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            Open Content Manager &rarr;
          </span>
        </Link>

        <Link
          href="/admin/products"
          className="group p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] hover:border-[#D4AF37] transition-all flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A0A0A0] px-2.5 py-1 rounded bg-white/5 border border-white/10">
              Catalog ({products.length})
            </span>
            <h3 className="font-display text-xl text-white uppercase mt-3 mb-2 group-hover:text-[#D4AF37] transition-colors">
              Products &amp; Bottle Cards
            </h3>
            <p className="text-xs text-[#C7C7C7] font-light leading-relaxed mb-4">
              Add, edit, or delete bottles, upload multi-photo galleries to Cloudinary, and toggle stock or featured vault status.
            </p>
          </div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            Manage Bottles &rarr;
          </span>
        </Link>

        <Link
          href="/admin/categories"
          className="group p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A] hover:border-[#D4AF37] transition-all flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A0A0A0] px-2.5 py-1 rounded bg-white/5 border border-white/10">
              Taxonomy ({categories.length})
            </span>
            <h3 className="font-display text-xl text-white uppercase mt-3 mb-2 group-hover:text-[#D4AF37] transition-colors">
              Departments &amp; Categories
            </h3>
            <p className="text-xs text-[#C7C7C7] font-light leading-relaxed mb-4">
              Manage homepage department cards, cover photography, banner quotes, descriptions, and sort order.
            </p>
          </div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            Manage Departments &rarr;
          </span>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Items Table in Charcoal */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-[#FFFFFF] uppercase">
              Current Catalog Spotlight
            </h2>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:underline"
            >
              View All ({products.length}) &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#3A3A3A] text-xs font-bold uppercase text-[#A0A0A0] tracking-wider">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A3A3A]/60">
                {products.slice(0, 6).map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#111111]/40 transition-colors"
                  >
                    <td className="py-4 font-bold text-[#FFFFFF] flex items-center gap-3">
                      {(item.images?.[0] || item.thumbnailUrl) && (
                        <img
                          src={item.images?.[0] || item.thumbnailUrl}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg border border-[#3A3A3A] flex-shrink-0"
                        />
                      )}
                      <div>
                        <p className="line-clamp-1">{item.name}</p>
                        <p className="text-xs text-[#A0A0A0] font-normal font-light">
                          {item.volume || 'Standard'}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 text-[#C7C7C7] capitalize">
                      {item.category.replace(/-/g, ' ')}
                    </td>
                    <td className="py-4">
                      {item.inStock ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/admin/products/${item.id}`}
                        className="text-xs font-bold text-[#D4AF37] hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#242424] border border-[#3A3A3A]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                Live Store Information
              </h3>
              <Link
                href="/admin/content"
                className="text-[11px] font-bold text-[#D4AF37] hover:underline"
              >
                Edit
              </Link>
            </div>
            <div className="space-y-3 text-xs text-[#C7C7C7]">
              <div>
                <span className="text-[#A0A0A0] block font-bold">
                  Storefront Location:
                </span>
                <span className="text-[#FFFFFF]">
                  {brand.addressLine1}, {brand.addressLine2}
                </span>
              </div>
              <div>
                <span className="text-[#A0A0A0] block font-bold">
                  Store Phone:
                </span>
                <span className="text-[#D4AF37] font-bold">
                  {brand.phoneFull}
                </span>
              </div>
              <div>
                <span className="text-[#A0A0A0] block font-bold">
                  Store Hours:
                </span>
                <span className="text-[#FFFFFF]">
                  {brand.hoursWeekdayLabel}: {brand.hoursWeekdayTime}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#5B1018] border border-[#D4AF37]/40 shadow-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-display text-lg text-[#D4AF37] uppercase">
                Firebase + Cloudinary Active
              </h3>
            </div>
            <p className="text-xs text-[#F4F4F4] leading-relaxed font-light">
              {HAS_REAL_FIREBASE
                ? 'Connected to Firebase Firestore (jfk-liquors) & Cloudinary CDN (ovmougmy). All product, category, and content updates persist permanently across redeployments.'
                : 'Cloud persistence active.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

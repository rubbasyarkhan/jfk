'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product, Category } from '@/types';

interface Props {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductListManager({ initialProducts, categories }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'out'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingStockId, setTogglingStockId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchTerm === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'instock' && p.inStock) ||
      (stockFilter === 'out' && !p.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  async function handleToggleStock(product: Product) {
    const newStock = !product.inStock;
    setTogglingStockId(product.id);

    // Optimistic update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, inStock: newStock } : p))
    );

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: newStock }),
      });

      if (!res.ok) {
        throw new Error('Failed to update stock status');
      }

      setFeedback({
        type: 'success',
        message: `Updated "${product.name}" to ${newStock ? 'In Stock' : 'Out of Stock'}.`,
      });
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      // Revert optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, inStock: !newStock } : p))
      );
      setFeedback({
        type: 'error',
        message: err?.message || 'Failed to update stock',
      });
    } finally {
      setTogglingStockId(null);
    }
  }

  async function confirmDelete() {
    if (!productToDelete) return;
    const id = productToDelete.id;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      setFeedback({
        type: 'success',
        message: `Product "${productToDelete.name}" was successfully deleted.`,
      });
      setTimeout(() => setFeedback(null), 3000);
      setProductToDelete(null);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Error deleting product',
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6 text-[#FFFFFF]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Catalog Management</p>
          <h1 className="font-anton text-3xl sm:text-4xl text-[#FFFFFF] uppercase tracking-wide">
            All Products &amp; Bottles ({products.length})
          </h1>
        </div>

        <Link href="/admin/products/new" className="btn-gold !py-2.5">
          + Add New Bottle
        </Link>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-sm transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
              : 'bg-red-950/80 border-red-500/60 text-red-200'
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#1E1F23] border border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search bottle name, brand, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121316] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-[#F5D900]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-neutral-400 hover:text-white text-sm"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          {/* Department Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#121316] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-sans font-bold uppercase tracking-wider text-neutral-200 focus:outline-none focus:border-[#F5D900]"
          >
            <option value="all">All Departments</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-[#121316] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-sans font-bold uppercase tracking-wider text-neutral-200 focus:outline-none focus:border-[#F5D900]"
          >
            <option value="all">All Inventory</option>
            <option value="instock">In Stock Only</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#18191C] border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs font-bold uppercase text-neutral-400 tracking-wider">
                <th className="pb-4">Bottle / Item</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Badge</th>
                <th className="pb-4">Stock Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    No products found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => {
                  const imageSrc =
                    item.thumbnailUrl ||
                    item.images?.[0] ||
                    'https://res.cloudinary.com/ovmougmy/image/upload/v1793981778/jfk-liquors/bourbon-jim-beam.jpg';

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Product Name & Image */}
                      <td className="py-4 font-bold text-[#FFFFFF] flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-[#0A0A0A]">
                          <Image
                            src={imageSrc}
                            alt={item.name}
                            fill
                            className="object-cover object-center"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-white font-sans font-bold">
                            {item.name}
                          </p>
                          <p className="text-xs text-neutral-400 font-normal">
                            {item.volume || 'Standard'} &bull; {item.tags?.slice(0, 2).join(', ') || item.slug}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 text-neutral-300 capitalize text-xs">
                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10">
                          {item.category.replace(/-/g, ' ')}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 font-anton text-lg text-[#F5D900] tracking-wide">
                        {item.price ? `$${item.price.toFixed(2)}` : 'Inquire'}
                      </td>

                      {/* Badge */}
                      <td className="py-4">
                        {item.badge ? (
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#5B1018] text-[#F5D900] border border-[#F5D900]/40">
                            {item.badge}
                          </span>
                        ) : (
                          <span className="text-neutral-500 text-xs">—</span>
                        )}
                      </td>

                      {/* Quick Stock Toggle */}
                      <td className="py-4">
                        <button
                          type="button"
                          disabled={togglingStockId === item.id}
                          onClick={() => handleToggleStock(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
                            item.inStock
                              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80'
                              : 'bg-red-950/70 border-red-500/40 text-red-300 hover:bg-red-900/80'
                          }`}
                          title="Click to toggle stock status"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.inStock ? 'bg-emerald-400' : 'bg-red-400'
                            }`}
                          />
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/products/${item.category}/${item.slug}`}
                            target="_blank"
                            className="text-xs text-neutral-400 hover:text-white transition-colors"
                          >
                            Preview ↗
                          </Link>
                          <Link
                            href={`/admin/products/${item.id}`}
                            className="text-xs font-bold text-[#F5D900] hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => setProductToDelete(item)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors ml-1"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#18191C] border border-red-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="font-anton text-2xl text-white uppercase tracking-wide mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-neutral-300 mb-6">
              Are you sure you want to delete <strong className="text-white">"{productToDelete.name}"</strong>? This action will permanently remove it from both Firestore and the store catalog.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={deletingId === productToDelete.id}
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingId === productToDelete.id}
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold uppercase tracking-wider text-white shadow-lg disabled:opacity-50"
              >
                {deletingId === productToDelete.id ? 'Deleting...' : 'Yes, Delete Bottle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

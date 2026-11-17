'use client';

import { useState, useEffect } from 'react';
import { getProductById, getCategories, getInstantProducts, getInstantCategories } from '@/lib/firestore';
import ProductForm from './ProductForm';
import type { Product, Category } from '@/types';

interface Props {
  initialProduct?: Product;
  productId: string;
  availableCategories: Category[];
}

export default function EditProductClient({
  initialProduct,
  productId: initialId,
  availableCategories,
}: Props) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [resolvedId, setResolvedId] = useState<string>(initialId);
  const [categories, setCategories] = useState<Category[]>(availableCategories);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let idFromUrl = initialId;
    if (typeof window !== 'undefined') {
      const searchId = new URLSearchParams(window.location.search).get('id');
      const pathParts = window.location.pathname.replace(/\/+$/, '').split('/');
      const lastSegment = pathParts[pathParts.length - 1];
      if (searchId) {
        idFromUrl = searchId;
      } else if (lastSegment && lastSegment !== 'products' && lastSegment !== 'new') {
        idFromUrl = lastSegment;
      }
    }
    setResolvedId(idFromUrl);

    // 1. Instant synchronous load from localStorage so stale build-time data never flashes
    const instProds = getInstantProducts();
    const instProd = instProds.find((p) => p.id === idFromUrl || p.slug === idFromUrl);
    if (instProd) setProduct(instProd);
    const instCats = getInstantCategories();
    if (instCats.length > 0) setCategories(instCats);
    setHydrated(true);

    // 2. Async cloud/server sync
    async function loadLatest() {
      const [latestProd, latestCats] = await Promise.all([
        getProductById(idFromUrl),
        getCategories(),
      ]);
      if (latestProd) setProduct(latestProd);
      if (latestCats.length > 0) setCategories(latestCats);
    }
    loadLatest();
  }, [initialId]);

  if (!hydrated) {
    return (
      <div className="py-16 text-center text-[#A0A0A0] text-sm">
        Loading bottle editor...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-lg text-white font-bold">Product not found</p>
        <a href="/admin/products" className="text-xs text-[#F5D900] underline uppercase tracking-wider">
          Return to Products List
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-1">Catalog Editing</p>
        <h1 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-wide">
          Edit: {product.name}
        </h1>
      </div>

      <ProductForm
        key={product.id + (product.updatedAt || '')}
        initialData={product}
        productId={resolvedId}
        availableCategories={categories}
      />
    </div>
  );
}

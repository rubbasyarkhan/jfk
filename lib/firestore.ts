import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product, Category, SiteContent } from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  DEFAULT_SITE_CONTENT,
} from './initialData';
import {
  getLocalProducts,
  saveLocalProducts,
  getLocalCategories,
  saveLocalCategories,
  getLocalSiteContent,
  saveLocalSiteContent,
  mergeWithDefaultSiteContent,
  notifyCatalogUpdated,
  notifySiteContentUpdated,
} from './localStore';

export const HAS_REAL_FIREBASE = Boolean(db && db.app);

export function invalidateCache() {
  notifyCatalogUpdated();
  notifySiteContentUpdated();
}

function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1';
}

function readServerJson<T>(fileName: string, fallback: T): T {
  if (typeof window !== 'undefined') return fallback;
  try {
    const req = eval('require');
    const fs = req('fs');
    const path = req('path');
    const filePath = path.join(process.cwd(), 'data', fileName);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(fallback)) {
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as T;
        }
      } else if (parsed && typeof parsed === 'object') {
        return parsed as T;
      }
    }
  } catch {
    // Ignore on browser
  }
  return fallback;
}

function sanitizeProductDoc(docSnap: any): Product {
  const data = docSnap.data();
  const id = docSnap.id;
  const initialMatch = INITIAL_PRODUCTS.find(
    (p) => p.id === id || p.slug === data.slug
  );

  let createdAt = data.createdAt;
  let updatedAt = data.updatedAt;
  if (createdAt && typeof createdAt.toDate === 'function') {
    createdAt = createdAt.toDate().toISOString();
  } else if (!createdAt) {
    createdAt = '2026-01-01T00:00:00.000Z';
  }
  if (updatedAt && typeof updatedAt.toDate === 'function') {
    updatedAt = updatedAt.toDate().toISOString();
  } else if (!updatedAt) {
    updatedAt = String(createdAt);
  }

  return {
    ...data,
    id,
    slug: data.slug || id,
    subcategory:
      data.subcategory !== undefined
        ? data.subcategory
        : initialMatch?.subcategory || '',
    isOffer:
      data.isOffer !== undefined
        ? Boolean(data.isOffer)
        : Boolean(initialMatch?.isOffer),
    offerText:
      data.offerText !== undefined
        ? data.offerText
        : initialMatch?.offerText || '',
    customFields: Array.isArray(data.customFields) ? data.customFields : [],
    images: Array.isArray(data.images)
      ? data.images
      : data.thumbnailUrl
        ? [data.thumbnailUrl]
        : [],
    thumbnailUrl:
      data.thumbnailUrl ||
      (Array.isArray(data.images) && data.images[0]) ||
      '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    inStock: data.inStock !== false,
    featured: Boolean(data.featured),
    createdAt: String(createdAt),
    updatedAt: String(updatedAt),
  } as Product;
}

function sanitizeCategoryDoc(docSnap: any): Category {
  const data = docSnap.data() as Category;
  const id = docSnap.id;
  const initialMatch = INITIAL_CATEGORIES.find(
    (c) => c.id === id || c.slug === data.slug
  );

  return {
    ...data,
    id,
    slug: data.slug || id,
    showInNavbar:
      data.showInNavbar !== undefined ? Boolean(data.showInNavbar) : true,
    subcategories: Array.isArray(data.subcategories)
      ? data.subcategories
      : initialMatch?.subcategories || [],
  };
}

// ─── Instant Synchronous Getters (0ms on Client Reload — Zero Stale Flash) ───

export function getInstantProducts(): Product[] {
  if (typeof window === 'undefined') {
    return readServerJson<Product[]>('products.json', INITIAL_PRODUCTS);
  }
  return getLocalProducts().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export function getInstantCategories(): Category[] {
  if (typeof window === 'undefined') {
    return readServerJson<Category[]>('categories.json', INITIAL_CATEGORIES);
  }
  return getLocalCategories().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export function getInstantSiteContent(): SiteContent {
  if (typeof window === 'undefined') {
    const raw = readServerJson<SiteContent>(
      'siteContent.json',
      DEFAULT_SITE_CONTENT
    );
    return mergeWithDefaultSiteContent(raw);
  }
  return getLocalSiteContent();
}

// ─── Products (Firebase Firestore is Primary Source of Truth) ──────────────

export async function getAllProducts(): Promise<Product[]> {
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        const cloudProds = snap.docs
          .map(sanitizeProductDoc)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

        if (typeof window !== 'undefined') {
          saveLocalProducts(cloudProds, true);
        }
        return cloudProds;
      }
    } catch (err) {
      console.warn('Firestore getAllProducts fallback:', err);
    }
  }

  if (typeof window === 'undefined') {
    const serverProds = readServerJson<Product[]>(
      'products.json',
      INITIAL_PRODUCTS
    );
    return [...serverProds].sort(
      (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
    );
  }

  return getLocalProducts().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const all = await getAllProducts();
  if (categorySlug) {
    return all.filter((p) => p.category === categorySlug);
  }
  return all;
}

export async function getOfferProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter(
    (p) => p.isOffer || p.badge === 'Sale' || p.badge === 'Offer'
  );
}

export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured).slice(0, count);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id || p.slug === id) || null;
}

export async function createProduct(
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const newId = (data.slug || data.name || `prod-${Date.now()}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const now = new Date().toISOString();

  const newProduct: Product = {
    ...data,
    id: newId,
    slug: data.slug || newId,
    images: Array.isArray(data.images) ? data.images : [],
    thumbnailUrl: data.thumbnailUrl || data.images?.[0] || '',
    customFields: Array.isArray(data.customFields) ? data.customFields : [],
    createdAt: now,
    updatedAt: now,
  };

  if (HAS_REAL_FIREBASE && db && db.app) {
    await setDoc(doc(db, 'products', newId), newProduct, { merge: true });
  }

  const products = getLocalProducts();
  const existingIdx = products.findIndex((p) => p.id === newId);
  if (existingIdx !== -1) {
    products[existingIdx] = newProduct;
  } else {
    products.unshift(newProduct);
  }
  saveLocalProducts(products);

  if (isLocalhost()) {
    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
    } catch {
      // Ignore on static host
    }
  }

  notifyCatalogUpdated();
  return newId;
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<void> {
  const now = new Date().toISOString();
  const products = getLocalProducts();
  const idx = products.findIndex((p) => p.id === id || p.slug === id);

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  );

  let baseProduct: Product | null = idx !== -1 ? products[idx] : null;
  if (!baseProduct && HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDoc(doc(db, 'products', id));
      if (snap.exists()) {
        baseProduct = sanitizeProductDoc(snap);
      }
    } catch {
      // Ignore
    }
  }

  const targetId = baseProduct?.id || id;
  const updatedProduct: Product = {
    ...(baseProduct || ({} as Product)),
    ...cleanData,
    id: targetId,
    slug: (cleanData.slug as string) || baseProduct?.slug || targetId,
    updatedAt: now,
  };

  if (HAS_REAL_FIREBASE && db && db.app) {
    await setDoc(doc(db, 'products', targetId), updatedProduct, {
      merge: true,
    });
  }

  if (idx !== -1) {
    products[idx] = updatedProduct;
  } else {
    products.unshift(updatedProduct);
  }
  saveLocalProducts(products);

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/products/${encodeURIComponent(targetId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
    } catch {
      // Ignore on static host
    }
  }

  notifyCatalogUpdated();
}

export async function deleteProduct(id: string): Promise<void> {
  const products = getLocalProducts();
  const target = products.find((p) => p.id === id || p.slug === id);
  const docId = target?.id || id;

  if (HAS_REAL_FIREBASE && db && db.app) {
    await deleteDoc(doc(db, 'products', docId));
    if (id !== docId) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch {
        // Ignore
      }
    }
  }

  const remaining = products.filter(
    (p) => p.id !== id && p.slug !== id && p.id !== docId
  );
  saveLocalProducts(remaining);

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/products/${encodeURIComponent(docId)}`, {
        method: 'DELETE',
      });
    } catch {
      // Ignore
    }
  }

  notifyCatalogUpdated();
}

// ─── Categories (Firebase Firestore is Primary Source of Truth) ────────────

export async function getCategories(): Promise<Category[]> {
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      if (!snap.empty) {
        const cloudCats = snap.docs
          .map(sanitizeCategoryDoc)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

        if (typeof window !== 'undefined') {
          saveLocalCategories(cloudCats, true);
        }
        return cloudCats;
      }
    } catch (err) {
      console.warn('Firestore getCategories fallback:', err);
    }
  }

  if (typeof window === 'undefined') {
    const serverCats = readServerJson<Category[]>(
      'categories.json',
      INITIAL_CATEGORIES
    );
    return [...serverCats].sort(
      (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
    );
  }

  return getLocalCategories().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function createCategory(
  data: Omit<Category, 'id'>
): Promise<string> {
  const newId = (data.slug || data.name || `cat-${Date.now()}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const now = new Date().toISOString();

  const newCat: Category = {
    ...data,
    id: newId,
    slug: data.slug || newId,
    showInNavbar: data.showInNavbar !== false,
    subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],
    updatedAt: now,
  };

  if (HAS_REAL_FIREBASE && db && db.app) {
    await setDoc(doc(db, 'categories', newId), newCat, { merge: true });
  }

  const categories = getLocalCategories();
  const existingIdx = categories.findIndex(
    (c) => c.id === newId || c.slug === newCat.slug
  );
  if (existingIdx !== -1) {
    categories[existingIdx] = newCat;
  } else {
    categories.push(newCat);
  }
  saveLocalCategories(categories);

  if (isLocalhost()) {
    try {
      await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      });
    } catch {
      // Ignore
    }
  }

  notifyCatalogUpdated();
  return newId;
}

export async function updateCategory(
  id: string,
  data: Partial<Category>
): Promise<void> {
  const now = new Date().toISOString();
  const categories = getLocalCategories();
  const idx = categories.findIndex((c) => c.id === id || c.slug === id);

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  );

  const baseCat = idx !== -1 ? categories[idx] : ({ id, slug: id } as Category);
  const targetId = baseCat.id || id;

  const updatedCat: Category = {
    ...baseCat,
    ...cleanData,
    id: targetId,
    updatedAt: now,
  };

  if (HAS_REAL_FIREBASE && db && db.app) {
    await setDoc(doc(db, 'categories', targetId), updatedCat, { merge: true });
  }

  if (idx !== -1) {
    categories[idx] = updatedCat;
  } else {
    categories.push(updatedCat);
  }
  saveLocalCategories(categories);

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/categories/${encodeURIComponent(targetId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCat),
      });
    } catch {
      // Ignore
    }
  }

  notifyCatalogUpdated();
}

export async function deleteCategory(id: string): Promise<void> {
  const categories = getLocalCategories();
  const target = categories.find((c) => c.id === id || c.slug === id);
  const docId = target?.id || id;

  if (HAS_REAL_FIREBASE && db && db.app) {
    await deleteDoc(doc(db, 'categories', docId));
    if (id !== docId) {
      try {
        await deleteDoc(doc(db, 'categories', id));
      } catch {
        // Ignore
      }
    }
  }

  const remaining = categories.filter(
    (c) => c.id !== id && c.slug !== id && c.id !== docId
  );
  saveLocalCategories(remaining);

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/categories/${encodeURIComponent(docId)}`, {
        method: 'DELETE',
      });
    } catch {
      // Ignore
    }
  }

  notifyCatalogUpdated();
}

// ─── Full Website Content (Firestore doc: settings/siteContent) ────────────

export async function getSiteContent(): Promise<SiteContent> {
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const docRef = doc(db, 'settings', 'siteContent');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const merged = mergeWithDefaultSiteContent(
          snap.data() as Partial<SiteContent>
        );
        if (typeof window !== 'undefined') {
          saveLocalSiteContent(merged, true);
        }
        return merged;
      } else {
        const initial = mergeWithDefaultSiteContent(DEFAULT_SITE_CONTENT);
        try {
          await setDoc(docRef, {
            ...initial,
            updatedAt: new Date().toISOString(),
          });
        } catch {
          // Ignore if read-only context
        }
        if (typeof window !== 'undefined') {
          saveLocalSiteContent(initial, true);
        }
        return initial;
      }
    } catch (err) {
      console.warn('Firestore getSiteContent fallback:', err);
    }
  }

  return getInstantSiteContent();
}

export async function updateSiteContent(
  data: Partial<SiteContent>
): Promise<SiteContent> {
  const current = getLocalSiteContent();
  const merged = mergeWithDefaultSiteContent({
    ...current,
    ...data,
    brand: { ...current.brand, ...(data.brand || {}) },
    ageGate: { ...current.ageGate, ...(data.ageGate || {}) },
    hero: { ...current.hero, ...(data.hero || {}) },
    delivery: { ...current.delivery, ...(data.delivery || {}) },
    departmentsSection: {
      ...current.departmentsSection,
      ...(data.departmentsSection || {}),
    },
    vaultSection: {
      ...current.vaultSection,
      ...(data.vaultSection || {}),
    },
    promoBanner: {
      ...current.promoBanner,
      ...(data.promoBanner || {}),
    },
    storySection: {
      ...current.storySection,
      ...(data.storySection || {}),
    },
    locationSection: {
      ...current.locationSection,
      ...(data.locationSection || {}),
    },
    aboutPage: {
      ...current.aboutPage,
      ...(data.aboutPage || {}),
    },
    contactPage: {
      ...current.contactPage,
      ...(data.contactPage || {}),
    },
    catalogPage: {
      ...current.catalogPage,
      ...(data.catalogPage || {}),
    },
    offersPage: {
      ...current.offersPage,
      ...(data.offersPage || {}),
    },
    cardConfig: {
      ...current.cardConfig,
      ...(data.cardConfig || {}),
    },
    footer: { ...current.footer, ...(data.footer || {}) },
    updatedAt: new Date().toISOString(),
  });

  if (HAS_REAL_FIREBASE && db && db.app) {
    await setDoc(doc(db, 'settings', 'siteContent'), merged, { merge: true });
  }

  saveLocalSiteContent(merged);

  if (isLocalhost()) {
    try {
      await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });
    } catch {
      // Ignore
    }
  }

  notifySiteContentUpdated();
  return merged;
}

export const getSiteSettings = getSiteContent;
export const updateSiteSettings = updateSiteContent;

export async function seedInitialDataToFirestore(): Promise<{
  products: number;
  categories: number;
  siteContent: boolean;
}> {
  let catCount = 0;
  let prodCount = 0;
  const now = new Date().toISOString();

  for (const cat of INITIAL_CATEGORIES) {
    await setDoc(doc(db, 'categories', cat.id), {
      ...cat,
      updatedAt: now,
    });
    catCount++;
  }

  for (const prod of INITIAL_PRODUCTS) {
    await setDoc(doc(db, 'products', prod.id), {
      ...prod,
      createdAt: now,
      updatedAt: now,
    });
    prodCount++;
  }

  const contentSnap = await getDoc(doc(db, 'settings', 'siteContent'));
  if (!contentSnap.exists()) {
    await setDoc(doc(db, 'settings', 'siteContent'), {
      ...DEFAULT_SITE_CONTENT,
      updatedAt: now,
    });
  }

  notifyCatalogUpdated();
  notifySiteContentUpdated();
  return { products: prodCount, categories: catCount, siteContent: true };
}

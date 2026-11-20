import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product, Category, SiteSettings } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './initialData';
import {
  getLocalProducts,
  saveLocalProducts,
  getLocalCategories,
  saveLocalCategories,
  getDeletedIds,
  markIdDeleted,
  notifyCatalogUpdated,
} from './localStore';

export const HAS_REAL_FIREBASE = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'mock-api-key-jfk-liquors' &&
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('Placeholder') &&
  db &&
  db.app
);

export function invalidateCache() {
  notifyCatalogUpdated();
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
      if (Array.isArray(parsed) && parsed.length > 0) {
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
    id: docSnap.id,
    createdAt: String(createdAt),
    updatedAt: String(updatedAt),
  } as Product;
}

// Merge cloud products with local products so newer local edits are NEVER overwritten by stale cloud docs
function mergeProducts(localList: Product[], cloudList: Product[]): Product[] {
  const deleted = new Set(getDeletedIds());
  const map = new Map<string, Product>();

  for (const p of localList) {
    if (!deleted.has(p.id) && !deleted.has(p.slug)) {
      map.set(p.id, p);
    }
  }

  for (const cp of cloudList) {
    if (deleted.has(cp.id) || deleted.has(cp.slug)) continue;
    const existing = map.get(cp.id);
    if (!existing) {
      map.set(cp.id, cp);
    } else {
      const localTime = existing.updatedAt ? new Date(existing.updatedAt).getTime() : 0;
      const cloudTime = cp.updatedAt ? new Date(cp.updatedAt).getTime() : 0;
      if (cloudTime > localTime) {
        map.set(cp.id, cp);
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// ─── Instant Synchronous Getters (0ms on Client Reload — Zero Stale Flash) ───

export function getInstantProducts(): Product[] {
  if (typeof window === 'undefined') {
    return readServerJson<Product[]>('products.json', INITIAL_PRODUCTS);
  }
  return getLocalProducts().sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export function getInstantCategories(): Category[] {
  if (typeof window === 'undefined') {
    return readServerJson<Category[]>('categories.json', INITIAL_CATEGORIES);
  }
  return getLocalCategories().sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// ─── Products ──────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  if (typeof window === 'undefined') {
    const serverProds = readServerJson<Product[]>('products.json', INITIAL_PRODUCTS);
    return [...serverProds].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  const localProds = getLocalProducts();

  // 1. Only call /api/admin/products when running on localhost
  if (isLocalhost()) {
    try {
      const res = await fetch('/api/admin/products', { cache: 'no-store' });
      if (res.ok && (res.headers.get('content-type') || '').includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          const merged = mergeProducts(localProds, data.products);
          saveLocalProducts(merged, true);
          return merged;
        }
      }
    } catch {
      // Fallback below
    }
  }

  // 2. Sync with Firebase Firestore and merge by newest timestamp so local edits are never lost
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        const cloudProds = snap.docs.map(sanitizeProductDoc);
        const merged = mergeProducts(localProds, cloudProds);
        saveLocalProducts(merged, true);
        return merged;
      }
    } catch {
      // Fallback to localStorage
    }
  }

  return [...localProds].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const all = await getAllProducts();
  if (categorySlug) {
    return all.filter((p) => p.category === categorySlug);
  }
  return all;
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
  const newId = (data.slug || `prod-${Date.now()}`).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const now = new Date().toISOString();

  const newProduct: Product = {
    ...data,
    id: newId,
    slug: data.slug || newId,
    createdAt: now,
    updatedAt: now,
  };

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
      // Ignore
    }
  }

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      await setDoc(doc(db, 'products', newId), newProduct, { merge: true });
    } catch (err) {
      console.warn('Firestore create sync warning:', err);
    }
  }

  notifyCatalogUpdated();
  return newId;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const now = new Date().toISOString();
  const products = getLocalProducts();
  const idx = products.findIndex((p) => p.id === id || p.slug === id);
  let updatedProduct: Product | null = null;

  if (idx !== -1) {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );
    updatedProduct = {
      ...products[idx],
      ...cleanData,
      id: products[idx].id,
      updatedAt: now,
    };
    products[idx] = updatedProduct;
    saveLocalProducts(products);
  }

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // Ignore
    }
  }

  if (HAS_REAL_FIREBASE && db && db.app && updatedProduct) {
    try {
      await setDoc(doc(db, 'products', updatedProduct.id), updatedProduct, { merge: true });
    } catch (err) {
      console.warn('Firestore update sync warning:', err);
    }
  }

  notifyCatalogUpdated();
}

export async function deleteProduct(id: string): Promise<void> {
  markIdDeleted(id);
  const products = getLocalProducts().filter((p) => p.id !== id && p.slug !== id);
  saveLocalProducts(products);

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch {
      // Ignore
    }
  }

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.warn('Firestore delete sync warning:', err);
    }
  }

  notifyCatalogUpdated();
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  if (typeof window === 'undefined') {
    const serverCats = readServerJson<Category[]>('categories.json', INITIAL_CATEGORIES);
    return [...serverCats].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  const localCats = getLocalCategories();

  if (isLocalhost()) {
    try {
      const res = await fetch('/api/admin/categories', { cache: 'no-store' });
      if (res.ok && (res.headers.get('content-type') || '').includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          saveLocalCategories(data.categories, true);
          return [...data.categories].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        }
      }
    } catch {
      // Fallback
    }
  }

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDocs(collection(db, 'categories'));
      if (!snap.empty) {
        const deleted = new Set(getDeletedIds());
        const cloudCats = snap.docs
          .map((d) => ({ ...(d.data() as Category), id: d.id }))
          .filter((c) => !deleted.has(c.id) && !deleted.has(c.slug));

        // Keep local categories as source of truth and add any new cloud categories
        const map = new Map<string, Category>();
        for (const c of cloudCats) map.set(c.id, c);
        for (const lc of localCats) map.set(lc.id, lc);
        const merged = Array.from(map.values()).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        saveLocalCategories(merged, true);
        return merged;
      }
    } catch {
      // Fallback
    }
  }

  return [...localCats].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function createCategory(data: Omit<Category, 'id'>): Promise<string> {
  const newId = (data.slug || `cat-${Date.now()}`).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newCat: Category = {
    ...data,
    id: newId,
    slug: data.slug || newId,
  };

  const categories = getLocalCategories();
  const existingIdx = categories.findIndex((c) => c.id === newId || c.slug === newCat.slug);
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

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      await setDoc(doc(db, 'categories', newId), newCat, { merge: true });
    } catch (err) {
      console.warn('Firestore category create warning:', err);
    }
  }

  notifyCatalogUpdated();
  return newId;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  const categories = getLocalCategories();
  const idx = categories.findIndex((c) => c.id === id || c.slug === id);
  let updatedCat: Category | null = null;

  if (idx !== -1) {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );
    updatedCat = {
      ...categories[idx],
      ...cleanData,
      id: categories[idx].id,
    };
    categories[idx] = updatedCat;
    saveLocalCategories(categories);
  }

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/categories/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // Ignore
    }
  }

  if (HAS_REAL_FIREBASE && db && db.app && updatedCat) {
    try {
      await setDoc(doc(db, 'categories', updatedCat.id), updatedCat, { merge: true });
    } catch (err) {
      console.warn('Firestore category update warning:', err);
    }
  }

  notifyCatalogUpdated();
}

export async function deleteCategory(id: string): Promise<void> {
  markIdDeleted(id);
  const categories = getLocalCategories().filter((c) => c.id !== id && c.slug !== id);
  saveLocalCategories(categories);

  if (isLocalhost()) {
    try {
      await fetch(`/api/admin/categories/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch {
      // Ignore
    }
  }

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (err) {
      console.warn('Firestore category delete warning:', err);
    }
  }

  notifyCatalogUpdated();
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'main'));
      if (snap.exists()) {
        return snap.data() as SiteSettings;
      }
    } catch {
      // Fallback below
    }
  }

  return {
    heroTitle: 'The Art of Fine Spirits',
    heroSubtitle: 'From allocated bourbon to rare single malts — your premier destination near IAH airport.',
    announcementText: 'HOUSTON, TEXAS • NEAR GEORGE BUSH INTERCONTINENTAL AIRPORT (IAH)',
    announcementEnabled: true,
    phone: '+1 281-590-3300',
    address: '15655 John F Kennedy Blvd, Suite D, Houston, TX 77032',
    hoursWeekday: '11:00 AM – 9:00 PM',
    hoursSunday: 'Closed',
    uberEatsUrl: 'https://www.ubereats.com',
    doorDashUrl: 'https://www.doordash.com/convenience/store/52760606?event_type=autocomplete&pickup=false',
  };
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<void> {
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      await updateDoc(doc(db, 'settings', 'main'), data);
    } catch (err) {
      console.warn('Firestore settings update failed:', err);
    }
  }
}

export async function seedInitialDataToFirestore(): Promise<{ products: number; categories: number }> {
  let catCount = 0;
  let prodCount = 0;

  for (const cat of INITIAL_CATEGORIES) {
    await setDoc(doc(db, 'categories', cat.id), cat);
    catCount++;
  }

  for (const prod of INITIAL_PRODUCTS) {
    await setDoc(doc(db, 'products', prod.id), {
      ...prod,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    prodCount++;
  }

  notifyCatalogUpdated();
  return { products: prodCount, categories: catCount };
}

import {
  collection,
  doc,
  getDocs,
  getDoc,
  getDocsFromServer,
  getDocFromServer,
  onSnapshot,
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
  clearLegacyLocalStorageCache,
} from './localStore';

export const HAS_REAL_FIREBASE = Boolean(db && db.app);

// Strip all undefined fields recursively so Firestore setDoc NEVER throws "Unsupported field value: undefined"
function cleanForFirestore<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function invalidateCache() {
  clearLegacyLocalStorageCache();
  notifyCatalogUpdated();
  notifySiteContentUpdated();
}

function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1';
}

function isValidProductDoc(docSnap: any): boolean {
  const data = docSnap?.data?.();
  if (!data || typeof data !== 'object') return false;
  // Reject orphaned partial merge stubs that lack both name and category
  if (!data.name && !data.category) return false;
  return true;
}

function sanitizeProductDoc(docSnap: any): Product {
  const data = docSnap.data() || {};
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

  const resolvedSlug = String(data.slug || initialMatch?.slug || id);
  const resolvedName = String(
    data.name ||
      initialMatch?.name ||
      resolvedSlug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
  const resolvedCategory = String(
    data.category || initialMatch?.category || 'spirits'
  );

  return {
    ...data,
    id,
    name: resolvedName,
    slug: resolvedSlug,
    category: resolvedCategory,
    subcategory:
      data.subcategory !== undefined
        ? String(data.subcategory)
        : initialMatch?.subcategory || '',
    isOffer: Boolean(data.isOffer),
    offerText: data.isOffer ? data.offerText || '' : '',
    customFields: Array.isArray(data.customFields) ? data.customFields : [],
    cardFieldsOverride: Array.isArray(data.cardFieldsOverride)
      ? data.cardFieldsOverride
      : [],
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

// ─── Real-Time Firestore Listeners (Zero Cache, Live Instant Updates) ─────

let realtimeListenersStarted = false;

export function ensureRealtimeSync() {
  if (
    typeof window === 'undefined' ||
    realtimeListenersStarted ||
    !HAS_REAL_FIREBASE ||
    !db
  ) {
    return;
  }
  realtimeListenersStarted = true;
  clearLegacyLocalStorageCache();

  try {
    // 1. Live Products listener
    onSnapshot(
      collection(db, 'products'),
      (snap) => {
        const prods = snap.docs
          .filter(isValidProductDoc)
          .map(sanitizeProductDoc)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        saveLocalProducts(prods, false);
      },
      (err) => console.warn('Realtime products listener notice:', err)
    );

    // 2. Live Categories listener
    onSnapshot(
      collection(db, 'categories'),
      (snap) => {
        if (!snap.empty) {
          const cats = snap.docs
            .map(sanitizeCategoryDoc)
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
          saveLocalCategories(cats, false);
        }
      },
      (err) => console.warn('Realtime categories listener notice:', err)
    );

    // 3. Live SiteContent listener
    onSnapshot(
      doc(db, 'settings', 'siteContent'),
      (snap) => {
        if (snap.exists()) {
          const merged = mergeWithDefaultSiteContent(
            snap.data() as Partial<SiteContent>
          );
          saveLocalSiteContent(merged, false);
        }
      },
      (err) => console.warn('Realtime siteContent listener notice:', err)
    );
  } catch (err) {
    console.warn('Could not attach realtime listeners:', err);
  }
}

// ─── Instant Synchronous Getters ───────────────────────────────────────────

export function getInstantProducts(): Product[] {
  ensureRealtimeSync();
  return getLocalProducts().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export function getInstantCategories(): Category[] {
  ensureRealtimeSync();
  return getLocalCategories().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export function getInstantSiteContent(): SiteContent {
  ensureRealtimeSync();
  return getLocalSiteContent();
}

// ─── Products (Direct Server Fetch — Zero Cache) ───────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  ensureRealtimeSync();

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      // Force direct server fetch bypassing browser cache
      let snap;
      if (typeof window !== 'undefined') {
        try {
          snap = await getDocsFromServer(collection(db, 'products'));
        } catch {
          snap = await getDocs(collection(db, 'products'));
        }
      } else {
        snap = await getDocs(collection(db, 'products'));
      }

      if (snap) {
        const cloudProds = snap.docs
          .filter(isValidProductDoc)
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

  return getLocalProducts().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const all = await getAllProducts();
  if (categorySlug) {
    const isAgaveAlias =
      categorySlug === 'agave-and-more' || categorySlug === 'tequila-and-more';
    return all.filter((p) =>
      isAgaveAlias
        ? p.category === 'agave-and-more' || p.category === 'tequila-and-more'
        : p.category === categorySlug
    );
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

  const newProduct: Product = cleanForFirestore({
    ...data,
    id: newId,
    slug: data.slug || newId,
    images: Array.isArray(data.images) ? data.images : [],
    thumbnailUrl: data.thumbnailUrl || data.images?.[0] || '',
    customFields: Array.isArray(data.customFields) ? data.customFields : [],
    cardFieldsOverride: Array.isArray(data.cardFieldsOverride)
      ? data.cardFieldsOverride
      : [],
    createdAt: now,
    updatedAt: now,
  });

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

  let baseProduct: Product | null = idx !== -1 ? products[idx] : null;
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDocFromServer(doc(db, 'products', id)).catch(() =>
        getDoc(doc(db, 'products', id))
      );
      if (snap && snap.exists() && isValidProductDoc(snap)) {
        baseProduct = sanitizeProductDoc(snap);
      }
    } catch {
      // Ignore
    }
  }

  // Prevent re-creating a deleted product with a partial stub
  if (!baseProduct && !data.name && !data.category) {
    return;
  }

  const targetId = baseProduct?.id || id;
  const updatedProduct: Product = cleanForFirestore({
    ...(baseProduct || ({} as Product)),
    ...data,
    id: targetId,
    name:
      data.name ||
      baseProduct?.name ||
      targetId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    category: data.category || baseProduct?.category || 'spirits',
    slug: (data.slug as string) || baseProduct?.slug || targetId,
    updatedAt: now,
  });

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
  const targetSlug = target?.slug || id;

  // Immediately update local in-memory state first so UI reflects deletion right away
  const remaining = products.filter(
    (p) =>
      p.id !== id &&
      p.slug !== id &&
      p.id !== docId &&
      p.slug !== targetSlug
  );
  saveLocalProducts(remaining);

  if (HAS_REAL_FIREBASE && db && db.app) {
    const idsToDelete = new Set<string>([docId, id, targetSlug].filter(Boolean));

    // Also check if any document in Firestore has matching data.id or data.slug
    try {
      const snap = await getDocsFromServer(collection(db, 'products')).catch(
        () => getDocs(collection(db, 'products'))
      );
      for (const d of snap.docs) {
        const dData = d.data();
        if (
          d.id === id ||
          d.id === docId ||
          d.id === targetSlug ||
          dData?.id === id ||
          dData?.id === docId ||
          dData?.slug === id ||
          dData?.slug === targetSlug
        ) {
          idsToDelete.add(d.id);
        }
      }
    } catch {
      // Ignore scan error and delete known IDs
    }

    for (const delId of Array.from(idsToDelete)) {
      try {
        await deleteDoc(doc(db, 'products', delId));
      } catch (err) {
        console.warn(`Failed to delete Firestore doc ${delId}:`, err);
      }
    }
  }

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

// ─── Categories (Direct Server Fetch — Zero Cache) ─────────────────────────

export async function getCategories(): Promise<Category[]> {
  ensureRealtimeSync();

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      let snap;
      if (typeof window !== 'undefined') {
        try {
          snap = await getDocsFromServer(collection(db, 'categories'));
        } catch {
          snap = await getDocs(collection(db, 'categories'));
        }
      } else {
        snap = await getDocs(collection(db, 'categories'));
      }

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

  return getLocalCategories().sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
  );
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const all = await getCategories();
  const isAgaveAlias = slug === 'agave-and-more' || slug === 'tequila-and-more';
  return (
    all.find((c) =>
      isAgaveAlias
        ? c.slug === 'agave-and-more' ||
          c.id === 'agave-and-more' ||
          c.slug === 'tequila-and-more'
        : c.slug === slug || c.id === slug
    ) || null
  );
}

export async function createCategory(
  data: Omit<Category, 'id'>
): Promise<string> {
  const newId = (data.slug || data.name || `cat-${Date.now()}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const now = new Date().toISOString();

  const newCat: Category = cleanForFirestore({
    ...data,
    id: newId,
    slug: data.slug || newId,
    showInNavbar: data.showInNavbar !== false,
    subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],
    updatedAt: now,
  });

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

  let baseCat: Category | null = idx !== -1 ? categories[idx] : null;
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDocFromServer(doc(db, 'categories', id)).catch(() =>
        getDoc(doc(db, 'categories', id))
      );
      if (snap && snap.exists()) {
        baseCat = sanitizeCategoryDoc(snap);
      }
    } catch {
      // Ignore
    }
  }

  const targetId = baseCat?.id || id;
  const updatedCat: Category = cleanForFirestore({
    ...(baseCat || ({ id: targetId, slug: targetId } as Category)),
    ...data,
    id: targetId,
    updatedAt: now,
  });

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

// ─── Full Website Content (Direct Server Fetch — Zero Cache) ───────────────

export async function getSiteContent(): Promise<SiteContent> {
  ensureRealtimeSync();

  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const docRef = doc(db, 'settings', 'siteContent');
      let snap;
      if (typeof window !== 'undefined') {
        try {
          snap = await getDocFromServer(docRef);
        } catch {
          snap = await getDoc(docRef);
        }
      } else {
        snap = await getDoc(docRef);
      }

      if (snap.exists()) {
        const merged = mergeWithDefaultSiteContent(
          snap.data() as Partial<SiteContent>
        );
        if (typeof window !== 'undefined') {
          saveLocalSiteContent(merged, true);
        }
        return merged;
      } else {
        const initial = cleanForFirestore(
          mergeWithDefaultSiteContent(DEFAULT_SITE_CONTENT)
        );
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
  // Always read latest from Firestore first before merging so no section is lost
  let current = getLocalSiteContent();
  if (HAS_REAL_FIREBASE && db && db.app) {
    try {
      const snap = await getDocFromServer(
        doc(db, 'settings', 'siteContent')
      ).catch(() => getDoc(doc(db, 'settings', 'siteContent')));
      if (snap && snap.exists()) {
        current = mergeWithDefaultSiteContent(
          snap.data() as Partial<SiteContent>
        );
      }
    } catch {
      // Use in-memory current
    }
  }

  const merged = cleanForFirestore(
    mergeWithDefaultSiteContent({
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
    })
  );

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
    await setDoc(
      doc(db, 'categories', cat.id),
      cleanForFirestore({
        ...cat,
        updatedAt: now,
      })
    );
    catCount++;
  }

  for (const prod of INITIAL_PRODUCTS) {
    await setDoc(
      doc(db, 'products', prod.id),
      cleanForFirestore({
        ...prod,
        createdAt: now,
        updatedAt: now,
      })
    );
    prodCount++;
  }

  const contentSnap = await getDoc(doc(db, 'settings', 'siteContent'));
  if (!contentSnap.exists()) {
    await setDoc(
      doc(db, 'settings', 'siteContent'),
      cleanForFirestore({
        ...DEFAULT_SITE_CONTENT,
        updatedAt: now,
      })
    );
  }

  notifyCatalogUpdated();
  notifySiteContentUpdated();
  return { products: prodCount, categories: catCount, siteContent: true };
}

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
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
} from './localStore';

// Check if real Firebase credentials are provided
export const HAS_REAL_FIREBASE = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'mock-api-key-jfk-liquors'
);

let firestoreDisabled = !HAS_REAL_FIREBASE;

function sanitizeProductDoc(docSnap: any): Product {
  const data = docSnap.data();
  let createdAt = data.createdAt;
  let updatedAt = data.updatedAt;

  if (createdAt && typeof createdAt.toDate === 'function') {
    createdAt = createdAt.toDate().toISOString();
  } else if (!createdAt) {
    createdAt = new Date().toISOString();
  }

  if (updatedAt && typeof updatedAt.toDate === 'function') {
    updatedAt = updatedAt.toDate().toISOString();
  } else if (!updatedAt) {
    updatedAt = new Date().toISOString();
  }

  return {
    ...data,
    id: docSnap.id,
    createdAt: String(createdAt),
    updatedAt: String(updatedAt),
  } as Product;
}

function sanitizeCategoryDoc(docSnap: any): Category {
  const data = docSnap.data();
  return {
    ...data,
    id: docSnap.id,
  } as Category;
}

// ─── Products ──────────────────────────────────────────────────────────────

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  if (!firestoreDisabled) {
    try {
      let q;
      if (categorySlug) {
        q = query(
          collection(db, 'products'),
          where('category', '==', categorySlug),
          orderBy('sortOrder', 'asc')
        );
      } else {
        q = query(collection(db, 'products'), orderBy('sortOrder', 'asc'));
      }
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(sanitizeProductDoc);
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  // Fallback to local store
  const all = getLocalProducts();
  if (categorySlug) {
    return all.filter(p => p.category === categorySlug);
  }
  return all;
}

export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  if (!firestoreDisabled) {
    try {
      const q = query(
        collection(db, 'products'),
        where('featured', '==', true),
        orderBy('sortOrder', 'asc'),
        limit(count)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(sanitizeProductDoc);
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  return getLocalProducts().filter(p => p.featured).slice(0, count);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!firestoreDisabled) {
    try {
      const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return sanitizeProductDoc(snap.docs[0]);
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  const found = getLocalProducts().find(p => p.slug === slug);
  return found || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!firestoreDisabled) {
    try {
      const snap = await getDoc(doc(db, 'products', id));
      if (snap.exists()) {
        return sanitizeProductDoc(snap);
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  const found = getLocalProducts().find(p => p.id === id);
  return found || null;
}

export async function getAllProducts(): Promise<Product[]> {
  if (!firestoreDisabled) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        return snap.docs.map(sanitizeProductDoc);
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }
  return getLocalProducts();
}

export async function createProduct(
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const newId = (data.slug || `prod-${Date.now()}`).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const now = new Date().toISOString();

  if (!firestoreDisabled) {
    try {
      const ref = await addDoc(collection(db, 'products'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return ref.id;
    } catch (err) {
      console.warn('Firestore write failed, falling back to localStore:', err);
    }
  }

  // Local fallback
  const products = getLocalProducts();
  const newProduct: Product = {
    ...data,
    id: newId,
    createdAt: now,
    updatedAt: now,
  };
  products.unshift(newProduct);
  saveLocalProducts(products);
  return newId;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const now = new Date().toISOString();

  if (!firestoreDisabled) {
    try {
      await updateDoc(doc(db, 'products', id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return;
    } catch (err) {
      console.warn('Firestore update failed, falling back to localStore:', err);
    }
  }

  // Local fallback
  const products = getLocalProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx !== -1) {
    products[idx] = {
      ...products[idx],
      ...data,
      updatedAt: now,
    };
    saveLocalProducts(products);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  if (!firestoreDisabled) {
    try {
      await deleteDoc(doc(db, 'products', id));
      return;
    } catch (err) {
      console.warn('Firestore delete failed, falling back to localStore:', err);
    }
  }

  // Local fallback
  const products = getLocalProducts().filter(p => p.id !== id);
  saveLocalProducts(products);
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  if (!firestoreDisabled) {
    try {
      const q = query(collection(db, 'categories'), orderBy('sortOrder', 'asc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(sanitizeCategoryDoc);
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }
  return getLocalCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!firestoreDisabled) {
    try {
      const q = query(collection(db, 'categories'), where('slug', '==', slug), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return sanitizeCategoryDoc(snap.docs[0]);
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  const found = getLocalCategories().find(c => c.slug === slug);
  return found || null;
}

export async function createCategory(data: Omit<Category, 'id'>): Promise<string> {
  const newId = (data.slug || `cat-${Date.now()}`).toLowerCase().replace(/[^a-z0-9]+/g, '-');

  if (!firestoreDisabled) {
    try {
      const ref = await addDoc(collection(db, 'categories'), data);
      return ref.id;
    } catch (err) {
      console.warn('Firestore category write failed, falling back to localStore:', err);
    }
  }

  // Local fallback
  const categories = getLocalCategories();
  const newCat: Category = {
    ...data,
    id: newId,
  };
  categories.push(newCat);
  saveLocalCategories(categories);
  return newId;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  if (!firestoreDisabled) {
    try {
      await updateDoc(doc(db, 'categories', id), data);
      return;
    } catch (err) {
      console.warn('Firestore category update failed, falling back to localStore:', err);
    }
  }

  // Local fallback
  const categories = getLocalCategories();
  const idx = categories.findIndex(c => c.id === id);
  if (idx !== -1) {
    categories[idx] = {
      ...categories[idx],
      ...data,
    };
    saveLocalCategories(categories);
  }
}

export async function deleteCategory(id: string): Promise<void> {
  if (!firestoreDisabled) {
    try {
      await deleteDoc(doc(db, 'categories', id));
      return;
    } catch (err) {
      console.warn('Firestore category delete failed, falling back to localStore:', err);
    }
  }

  // Local fallback
  const categories = getLocalCategories().filter(c => c.id !== id);
  saveLocalCategories(categories);
}

// ─── Site Settings ─────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!firestoreDisabled) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'main'));
      if (snap.exists()) {
        return snap.data() as SiteSettings;
      }
    } catch (err) {
      firestoreDisabled = true;
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
    doorDashUrl: 'https://www.doordash.com',
  };
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<void> {
  if (!firestoreDisabled) {
    try {
      await updateDoc(doc(db, 'settings', 'main'), data);
      return;
    } catch (err) {
      console.warn('Firestore settings update failed:', err);
    }
  }
}

// Helper to seed initial catalog to real Firestore
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

  return { products: prodCount, categories: catCount };
}

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
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

// Track if Firestore is active or in offline fallback mode for instant page loads
let firestoreDisabled = false;

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
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  // Instant fallback to mock data
  if (categorySlug) {
    return INITIAL_PRODUCTS.filter(p => p.category === categorySlug);
  }
  return INITIAL_PRODUCTS;
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
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  return INITIAL_PRODUCTS.filter(p => p.featured).slice(0, count);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!firestoreDisabled) {
    try {
      const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const d = snap.docs[0];
        return { id: d.id, ...d.data() } as Product;
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  const found = INITIAL_PRODUCTS.find(p => p.slug === slug);
  return found || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!firestoreDisabled) {
    try {
      const snap = await getDoc(doc(db, 'products', id));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as Product;
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }

  const found = INITIAL_PRODUCTS.find(p => p.id === id);
  return found || null;
}

export async function getAllProducts(): Promise<Product[]> {
  if (!firestoreDisabled) {
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      }
    } catch (err) {
      firestoreDisabled = true;
    }
  }
  return INITIAL_PRODUCTS;
}

export async function createProduct(
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const ref = await addDoc(collection(db, 'products'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, 'products', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, 'products', id));
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  try {
    const q = query(collection(db, 'categories'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
    }
  } catch (err) {
    console.warn('Firestore fallback getCategories');
  }
  return INITIAL_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const q = query(collection(db, 'categories'), where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...d.data() } as Category;
    }
  } catch (err) {
    console.warn('Firestore fallback getCategoryBySlug');
  }

  const found = INITIAL_CATEGORIES.find(c => c.slug === slug);
  return found || null;
}

export async function createCategory(data: Omit<Category, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'categories'), data);
  return ref.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  await updateDoc(doc(db, 'categories', id), data);
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, 'categories', id));
}

// ─── Site Settings ─────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const snap = await getDoc(doc(db, 'settings', 'main'));
    if (snap.exists()) {
      return snap.data() as SiteSettings;
    }
  } catch (err) {
    console.warn('Firestore fallback getSiteSettings');
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
  await updateDoc(doc(db, 'settings', 'main'), data);
}

import type { Product, Category } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './initialData';

const PRODUCTS_STORAGE_KEY = 'jfk_liquors_products_v2';
const CATEGORIES_STORAGE_KEY = 'jfk_liquors_categories_v2';
const DELETED_IDS_KEY = 'jfk_liquors_deleted_ids_v2';

export function notifyCatalogUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('jfk-catalog-updated'));
  }
}

export function getDeletedIds(): string[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(DELETED_IDS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore
    }
  }
  return [];
}

export function markIdDeleted(id: string): void {
  if (typeof window !== 'undefined') {
    try {
      const current = new Set(getDeletedIds());
      current.add(id);
      window.localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(Array.from(current)));
    } catch {
      // Ignore
    }
  }
}

export function getLocalProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const deleted = new Set(getDeletedIds());
          return parsed.filter((p) => !deleted.has(p.id) && !deleted.has(p.slug));
        }
      }
      window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    } catch (err) {
      console.warn('Error reading products from localStorage:', err);
    }
  }
  return [...INITIAL_PRODUCTS];
}

export function saveLocalProducts(products: Product[], silent = false): void {
  if (typeof window !== 'undefined') {
    try {
      const deleted = new Set(getDeletedIds());
      const filtered = products.filter((p) => !deleted.has(p.id) && !deleted.has(p.slug));
      window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filtered));
      if (!silent) notifyCatalogUpdated();
    } catch (err) {
      console.error('Error saving products to localStorage:', err);
    }
  }
}

export function getLocalCategories(): Category[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const deleted = new Set(getDeletedIds());
          return parsed.filter((c) => !deleted.has(c.id) && !deleted.has(c.slug));
        }
      }
      window.localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(INITIAL_CATEGORIES));
    } catch (err) {
      console.warn('Error reading categories from localStorage:', err);
    }
  }
  return [...INITIAL_CATEGORIES];
}

export function saveLocalCategories(categories: Category[], silent = false): void {
  if (typeof window !== 'undefined') {
    try {
      const deleted = new Set(getDeletedIds());
      const filtered = categories.filter((c) => !deleted.has(c.id) && !deleted.has(c.slug));
      window.localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(filtered));
      if (!silent) notifyCatalogUpdated();
    } catch (err) {
      console.error('Error saving categories to localStorage:', err);
    }
  }
}

import type { Product, Category } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './initialData';

const PRODUCTS_STORAGE_KEY = 'jfk_liquors_products_v2';
const CATEGORIES_STORAGE_KEY = 'jfk_liquors_categories_v2';

export function notifyCatalogUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('jfk-catalog-updated'));
  }
}

export function getLocalProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    } catch (err) {
      console.warn('Error reading products from localStorage:', err);
    }
  }
  return [...INITIAL_PRODUCTS];
}

export function saveLocalProducts(products: Product[]): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      notifyCatalogUpdated();
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
          return parsed;
        }
      }
      window.localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(INITIAL_CATEGORIES));
    } catch (err) {
      console.warn('Error reading categories from localStorage:', err);
    }
  }
  return [...INITIAL_CATEGORIES];
}

export function saveLocalCategories(categories: Category[]): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
      notifyCatalogUpdated();
    } catch (err) {
      console.error('Error saving categories to localStorage:', err);
    }
  }
}

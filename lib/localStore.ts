import type { Product, Category, SiteContent } from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  DEFAULT_SITE_CONTENT,
} from './initialData';

// In-memory live state synced directly with Firebase Firestore (Zero stale localStorage cache)
let memoryProducts: Product[] | null = null;
let memoryCategories: Category[] | null = null;
let memorySiteContent: SiteContent | null = null;

export function notifyCatalogUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('jfk-catalog-updated'));
  }
}

export function notifySiteContentUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('jfk-site-content-updated'));
    window.dispatchEvent(new Event('jfk-catalog-updated'));
  }
}

export function mergeWithDefaultSiteContent(
  raw?: Partial<SiteContent> | null
): SiteContent {
  if (!raw || typeof raw !== 'object') {
    return JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT));
  }
  const merged: SiteContent = {
    brand: { ...DEFAULT_SITE_CONTENT.brand, ...(raw.brand || {}) },
    ageGate: { ...DEFAULT_SITE_CONTENT.ageGate, ...(raw.ageGate || {}) },
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...(raw.hero || {}) },
    delivery: { ...DEFAULT_SITE_CONTENT.delivery, ...(raw.delivery || {}) },
    departmentsSection: {
      ...DEFAULT_SITE_CONTENT.departmentsSection,
      ...(raw.departmentsSection || {}),
    },
    vaultSection: {
      ...DEFAULT_SITE_CONTENT.vaultSection,
      ...(raw.vaultSection || {}),
    },
    promoBanner: {
      ...DEFAULT_SITE_CONTENT.promoBanner,
      ...(raw.promoBanner || {}),
    },
    storySection: {
      ...DEFAULT_SITE_CONTENT.storySection,
      ...(raw.storySection || {}),
    },
    locationSection: {
      ...DEFAULT_SITE_CONTENT.locationSection,
      ...(raw.locationSection || {}),
    },
    aboutPage: {
      ...DEFAULT_SITE_CONTENT.aboutPage,
      ...(raw.aboutPage || {}),
    },
    contactPage: {
      ...DEFAULT_SITE_CONTENT.contactPage,
      ...(raw.contactPage || {}),
    },
    catalogPage: {
      ...DEFAULT_SITE_CONTENT.catalogPage,
      ...(raw.catalogPage || {}),
    },
    offersPage: {
      ...DEFAULT_SITE_CONTENT.offersPage,
      ...(raw.offersPage || {}),
    },
    cardConfig: {
      ...DEFAULT_SITE_CONTENT.cardConfig,
      ...(raw.cardConfig || {}),
    },
    footer: { ...DEFAULT_SITE_CONTENT.footer, ...(raw.footer || {}) },
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
  return JSON.parse(JSON.stringify(merged));
}

export function clearLegacyLocalStorageCache() {
  if (typeof window !== 'undefined') {
    try {
      const keysToRemove = [
        'jfk_liquors_products_v2',
        'jfk_liquors_categories_v2',
        'jfk_liquors_deleted_ids_v2',
        'jfk_liquors_products_v3',
        'jfk_liquors_categories_v3',
        'jfk_liquors_site_content_v3',
        'jfk_liquors_products_v4',
        'jfk_liquors_categories_v4',
        'jfk_liquors_site_content_v4',
      ];
      for (const k of keysToRemove) {
        window.localStorage.removeItem(k);
      }
    } catch {
      // Ignore
    }
  }
}

export function getLocalProducts(): Product[] {
  if (memoryProducts && memoryProducts.length > 0) {
    return [...memoryProducts];
  }
  return [...INITIAL_PRODUCTS];
}

export function saveLocalProducts(products: Product[], silent = false): void {
  memoryProducts = [...products];
  clearLegacyLocalStorageCache();
  if (!silent) notifyCatalogUpdated();
}

export function getLocalCategories(): Category[] {
  if (memoryCategories && memoryCategories.length > 0) {
    return [...memoryCategories];
  }
  return [...INITIAL_CATEGORIES];
}

export function saveLocalCategories(
  categories: Category[],
  silent = false
): void {
  memoryCategories = [...categories];
  clearLegacyLocalStorageCache();
  if (!silent) notifyCatalogUpdated();
}

export function getLocalSiteContent(): SiteContent {
  if (memorySiteContent) {
    return memorySiteContent;
  }
  return mergeWithDefaultSiteContent(null);
}

export function saveLocalSiteContent(
  content: SiteContent,
  silent = false
): void {
  memorySiteContent = mergeWithDefaultSiteContent(content);
  clearLegacyLocalStorageCache();
  if (!silent) notifySiteContentUpdated();
}

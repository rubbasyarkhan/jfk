import type { Product, Category, SiteContent } from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  DEFAULT_SITE_CONTENT,
} from './initialData';

const PRODUCTS_STORAGE_KEY = 'jfk_liquors_products_v3';
const CATEGORIES_STORAGE_KEY = 'jfk_liquors_categories_v3';
const SITE_CONTENT_STORAGE_KEY = 'jfk_liquors_site_content_v3';

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
    return structuredClone
      ? structuredClone(DEFAULT_SITE_CONTENT)
      : JSON.parse(JSON.stringify(DEFAULT_SITE_CONTENT));
  }
  return {
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
    updatedAt: raw.updatedAt,
  };
}

export function getLocalProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const raw =
        window.localStorage.getItem(PRODUCTS_STORAGE_KEY) ||
        window.localStorage.getItem('jfk_liquors_products_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading products from localStorage:', err);
    }
  }
  return [...INITIAL_PRODUCTS];
}

export function saveLocalProducts(products: Product[], silent = false): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(
        PRODUCTS_STORAGE_KEY,
        JSON.stringify(products)
      );
      if (!silent) notifyCatalogUpdated();
    } catch (err) {
      console.error('Error saving products to localStorage:', err);
    }
  }
}

export function getLocalCategories(): Category[] {
  if (typeof window !== 'undefined') {
    try {
      const raw =
        window.localStorage.getItem(CATEGORIES_STORAGE_KEY) ||
        window.localStorage.getItem('jfk_liquors_categories_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading categories from localStorage:', err);
    }
  }
  return [...INITIAL_CATEGORIES];
}

export function saveLocalCategories(
  categories: Category[],
  silent = false
): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(
        CATEGORIES_STORAGE_KEY,
        JSON.stringify(categories)
      );
      if (!silent) notifyCatalogUpdated();
    } catch (err) {
      console.error('Error saving categories to localStorage:', err);
    }
  }
}

export function getLocalSiteContent(): SiteContent {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return mergeWithDefaultSiteContent(parsed);
      }
    } catch (err) {
      console.warn('Error reading site content from localStorage:', err);
    }
  }
  return mergeWithDefaultSiteContent(null);
}

export function saveLocalSiteContent(
  content: SiteContent,
  silent = false
): void {
  if (typeof window !== 'undefined') {
    try {
      const merged = mergeWithDefaultSiteContent(content);
      window.localStorage.setItem(
        SITE_CONTENT_STORAGE_KEY,
        JSON.stringify(merged)
      );
      if (!silent) notifySiteContentUpdated();
    } catch (err) {
      console.error('Error saving site content to localStorage:', err);
    }
  }
}

import fs from 'fs';
import path from 'path';
import type { Product, Category, SiteContent } from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  DEFAULT_SITE_CONTENT,
} from './initialData';
import { mergeWithDefaultSiteContent } from './localStore';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SITE_CONTENT_FILE = path.join(DATA_DIR, 'siteContent.json');

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(
      PRODUCTS_FILE,
      JSON.stringify(INITIAL_PRODUCTS, null, 2),
      'utf-8'
    );
  }
  if (!fs.existsSync(CATEGORIES_FILE)) {
    fs.writeFileSync(
      CATEGORIES_FILE,
      JSON.stringify(INITIAL_CATEGORIES, null, 2),
      'utf-8'
    );
  }
  if (!fs.existsSync(SITE_CONTENT_FILE)) {
    fs.writeFileSync(
      SITE_CONTENT_FILE,
      JSON.stringify(DEFAULT_SITE_CONTENT, null, 2),
      'utf-8'
    );
  }
}

export function readServerProducts(): Product[] {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function writeServerProducts(products: Product[]): void {
  try {
    ensureDataFiles();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch {
    // Ignore on read-only file systems
  }
}

export function readServerCategories(): Category[] {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : INITIAL_CATEGORIES;
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function writeServerCategories(categories: Category[]): void {
  try {
    ensureDataFiles();
    fs.writeFileSync(
      CATEGORIES_FILE,
      JSON.stringify(categories, null, 2),
      'utf-8'
    );
  } catch {
    // Ignore on read-only file systems
  }
}

export function readServerSiteContent(): SiteContent {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(SITE_CONTENT_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return mergeWithDefaultSiteContent(parsed);
  } catch {
    return mergeWithDefaultSiteContent(DEFAULT_SITE_CONTENT);
  }
}

export function writeServerSiteContent(content: SiteContent): void {
  try {
    ensureDataFiles();
    const merged = mergeWithDefaultSiteContent(content);
    fs.writeFileSync(
      SITE_CONTENT_FILE,
      JSON.stringify(merged, null, 2),
      'utf-8'
    );
  } catch {
    // Ignore on read-only file systems
  }
}

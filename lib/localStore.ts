import fs from 'fs';
import path from 'path';
import type { Product, Category } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2), 'utf-8');
  }
  if (!fs.existsSync(CATEGORIES_FILE)) {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(INITIAL_CATEGORIES, null, 2), 'utf-8');
  }
}

export function getLocalProducts(): Product[] {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading local products, falling back to INITIAL_PRODUCTS:', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveLocalProducts(products: Product[]): void {
  try {
    ensureDataFiles();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local products:', err);
  }
}

export function getLocalCategories(): Category[] {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading local categories, falling back to INITIAL_CATEGORIES:', err);
    return INITIAL_CATEGORIES;
  }
}

export function saveLocalCategories(categories: Category[]): void {
  try {
    ensureDataFiles();
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local categories:', err);
  }
}

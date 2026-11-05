// src/types/index.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price?: number;
  comparePrice?: number;
  category: string;
  subcategory?: string;
  brand?: string;
  origin?: string;
  volume?: string;
  abv?: number;
  images: string[];
  thumbnailUrl: string;
  badge?: 'New' | 'Limited' | 'Featured' | 'Sale' | 'Allocated';
  inStock: boolean;
  stockCount?: number;
  featured: boolean;
  tags: string[];
  sortOrder?: number;
  createdAt: any;
  updatedAt: any;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  bannerText?: string;
  imageUrl?: string;
  sortOrder: number;
  productCount?: number;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  announcementText: string;
  announcementEnabled: boolean;
  phone: string;
  address: string;
  hoursWeekday: string;
  hoursSunday: string;
  uberEatsUrl: string;
  doorDashUrl: string;
}

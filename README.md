# JFK Liquors — Luxury Next.js E-Commerce & Admin Portal

An upgraded luxury web application for **JFK Liquors** (Houston, TX near IAH Airport), built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Firebase** with automatic **WebP image conversion**.

---

## 🌟 Key Highlights & Upgrades

### 1. Elevated Dark Luxury Brand Identity
- **Color Palette:**
  - Obsidian & Charcoal backgrounds: `#12110c`, `#1b1a12`, `#0b0a07`
  - Champagne Gold Accents: `#c8a84b`, `#e8c97a`, `#8a6e3a`
  - Warm Paper & Cream Text: `#f6f1de`, `#ccc5a8`, `#b9b49a`
- **Typography:**
  - Headings: **Anton** (Editorial, bold speakeasy all-caps)
  - Body & UI: **Figtree** (Clean, contemporary readability)
- **Authentic Brand Asset:** Original JFK Liquors monogram logo downloaded and integrated across headers, modals, stamps, and footer.

### 2. Client-Facing Store Experience
- **Speakeasy Age Verification Gate:** Custom dark-frosted modal on first visit (21+ confirmation saved to session storage).
- **Cinematic Hero Section:** Split-screen layout, luxury badge stamp, quick CTAs, and ambient warm amber lighting.
- **Top Announcement Bar:** Houston, TX landmark location near George Bush Intercontinental Airport (IAH).
- **Curated Departments:**
  - `/products/spirits` — Allocated bourbon, single malts, vodkas, cognac & brandy.
  - `/products/wines` — Cellar-grade reds, crisp whites, and celebration Champagne.
  - `/products/beer` — Independent Texas craft, cold national lagers, and hard seltzers.
  - `/products/agave-and-more` — 100% Blue Agave tequilas, artisan mezcals, and mixers.
- **Product Detail Pages (`/products/[category]/[slug]`):**
  - High-res image gallery
  - ABV, bottle volume, origin, and tasting notes
  - Instant phone call hold (`tel:+12815903300`) and Google Maps directions
  - Uber Eats & DoorDash quick ordering badges
- **Our Store (`/about`):** Heritage storytelling, values, and bottle curation overview.
- **Visit Us (`/contact`):** Real-time embedded Google Maps with custom dark contrast grading, store hours, and direct phone link.

### 3. Integrated Admin Portal (`/admin`)
- **Login (`/admin/login`):** Firebase Auth email/password protection (built-in developer fallback: `admin@jfkliquors.com` / `admin123`).
- **Dashboard (`/admin/dashboard`):** Real-time inventory statistics across all spirit categories and live store link.
- **Product Management (`/admin/products`):**
  - List all products with search, status, and price indicators
  - Create new products (`/admin/products/new`)
  - Edit existing bottles (`/admin/products/[id]`)
- **Automatic WebP Conversion & Cloud Upload:**
  - Drag-and-drop file uploader in product editor.
  - Automatic server-side conversion to `.webp` via `/api/convert-webp` (powered by `sharp`).
  - Stored directly into Firebase Storage and referenced in Firestore documents.
- **Category Management (`/admin/categories`):** Department overview and banner text customization.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase Environment Variables
Create a file named `.env.local` in the project root (see `.env.local.example`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note:** The app includes a complete offline fallback data layer. Even without Firebase keys set up yet, all 30 pages and the full catalog function smoothly out-of-the-box!

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the client-facing store.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Admin Portal.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
jfk/
├── app/
│   ├── (site)/                        # Public Customer Storefront
│   │   ├── layout.tsx                 # Age gate + Header + Footer
│   │   ├── page.tsx                   # Homepage (Hero, Info, Grid, Delivery, Maps)
│   │   ├── about/page.tsx             # Brand Story
│   │   ├── contact/page.tsx           # Contact & Directions
│   │   └── products/
│   │       ├── [category]/page.tsx    # Category catalog filter view
│   │       └── [category]/[slug]/     # Individual bottle detail page
│   ├── admin/                         # Admin Management Portal
│   │   ├── layout.tsx                 # Admin sidebar & header
│   │   ├── login/page.tsx             # Admin authentication
│   │   ├── dashboard/page.tsx         # Inventory stats & quick launch
│   │   ├── categories/page.tsx        # Department views
│   │   └── products/                  # Product management CRUD
│   │       ├── page.tsx               # Product directory table
│   │       ├── new/page.tsx           # Create product
│   │       └── [id]/page.tsx          # Edit product
│   └── api/
│       └── convert-webp/route.ts      # Server-side WebP conversion pipeline
├── components/
│   ├── site/                          # Customer UI components
│   └── admin/                         # Admin form & uploader components
├── lib/
│   ├── firebase.ts                    # Firebase app, db, storage, auth
│   ├── firestore.ts                   # Database CRUD helpers with fallback
│   ├── storage.ts                     # Image upload & WebP cloud storage
│   └── initialData.ts                 # Catalog baseline dataset
└── types/                             # TypeScript interfaces
```

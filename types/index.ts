// types/index.ts

export interface ProductCustomField {
  id?: string;
  label: string;
  value: string;
  showOnCard?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  brand?: string;
  origin?: string;
  volume?: string;
  abv?: number;
  images: string[];
  thumbnailUrl: string;
  badge?: 'New' | 'Limited' | 'Featured' | 'Sale' | 'Allocated' | 'Offer' | '';
  inStock: boolean;
  stockCount?: number;
  featured: boolean;
  isOffer?: boolean;
  offerText?: string;
  customFields?: ProductCustomField[];
  cardFieldsOverride?: string[];
  tags: string[];
  sortOrder?: number;
  createdAt: any;
  updatedAt: any;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  bannerText?: string;
  imageUrl?: string;
  sortOrder: number;
  showInNavbar?: boolean;
  subcategories?: Subcategory[];
  productCount?: number;
  updatedAt?: string;
}

export interface ProductCardConfig {
  imageAspect: '4/3' | '1/1' | '4/5';
  textAlign: 'left' | 'center';
  specsDisplayStyle: 'pills' | 'grid' | 'inline';
  showBadge: boolean;
  showVolumeOverlay: boolean;
  showTags: boolean;
  maxTagsCount: number;
  showCategory: boolean;
  showSubcategory: boolean;
  showBrand: boolean;
  showOrigin: boolean;
  showAbv: boolean;
  showOfferText: boolean;
  showDescription: boolean;
  descriptionLines: 1 | 2 | 3 | 4;
  showCustomFields: boolean;
  maxCustomFieldsCount: number;
  customFieldsDisplayStyle: 'pills' | 'rows' | 'inline';
  showFooterVolume: boolean;
  showStockStatus: boolean;
  showCtaButton: boolean;
  ctaButtonText: string;
}

export interface OffersPageContent {
  showInNavbar: boolean;
  navbarLabel: string;
  eyebrow: string;
  headingWhite: string;
  headingGold: string;
  description: string;
  bannerTag: string;
  bannerTitle: string;
  bannerText: string;
}

export interface SiteContent {
  brand: {
    storeName: string;
    logoUrl: string;
    phoneDisplay: string;
    phoneFull: string;
    phoneTel: string;
    addressLine1: string;
    addressLine2: string;
    directionsUrl: string;
    mapEmbedUrl: string;
    hoursWeekdayLabel: string;
    hoursWeekdayTime: string;
    hoursSundayLabel: string;
    hoursSundayTime: string;
    headerCtaText: string;
    complianceNotice: string;
    airportNote: string;
  };
  ageGate: {
    enabled: boolean;
    eyebrow: string;
    heading: string;
    description: string;
    confirmText: string;
    denyText: string;
    denyUrl: string;
    footerText: string;
  };
  hero: {
    backgroundImageUrl: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2Gold: string;
    titleLine3: string;
    description: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
  };
  delivery: {
    eyebrow: string;
    headingLine1: string;
    headingLine2Gold: string;
    description: string;
    disclaimer: string;
    uberEatsTitle: string;
    uberEatsDesc: string;
    uberEatsCta: string;
    uberEatsUrl: string;
    doorDashTitle: string;
    doorDashDesc: string;
    doorDashCta: string;
    doorDashUrl: string;
  };
  departmentsSection: {
    eyebrow: string;
    headingWhite: string;
    headingGold: string;
    browseAllText: string;
    cardCtaText: string;
  };
  vaultSection: {
    eyebrow: string;
    headingWhite: string;
    headingGold: string;
    browseAllText: string;
    maxItems: number;
  };
  promoBanner: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  storySection: {
    imageUrl: string;
    imageBadgeText: string;
    eyebrow: string;
    headingLine1: string;
    headingLine2Gold: string;
    paragraph1: string;
    paragraph2: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    ctaText: string;
    ctaHref: string;
  };
  locationSection: {
    eyebrow: string;
    headingLine1: string;
    headingLine2Gold: string;
    proximityNote: string;
    directionsBtnText: string;
  };
  aboutPage: {
    eyebrow: string;
    headingWhite: string;
    headingGold: string;
    heroImageUrl: string;
    leadParagraph: string;
    paragraph2: string;
    paragraph3: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    card3Title: string;
    card3Text: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
  };
  contactPage: {
    eyebrow: string;
    headingWhite: string;
    headingGold: string;
    subtitle: string;
  };
  catalogPage: {
    eyebrow: string;
    headingWhite: string;
    headingGold: string;
    description: string;
    serviceBoxTitle: string;
    serviceBoxBadge: string;
    serviceBoxCallLabel: string;
  };
  offersPage: OffersPageContent;
  cardConfig: ProductCardConfig;
  footer: {
    tagline: string;
    licenseBadge: string;
    findUsHeading: string;
    storefrontTitle: string;
    hoursHeading: string;
    deliveryNote: string;
    departmentsHeading: string;
    copyrightText: string;
    legalDisclaimer: string;
  };
  updatedAt?: string;
}

export type SiteSettings = SiteContent;

import { Product, Category, SiteContent } from '@/types';

const BASELINE_DATE = '2026-01-01T00:00:00.000Z';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: {
    storeName: 'JFK Liquors',
    logoUrl: 'https://res.cloudinary.com/ovmougmy/image/upload/v1793981764/jfk-liquors/logo.png',
    phoneDisplay: '(281) 590-3300',
    phoneFull: '+1 281-590-3300',
    phoneTel: '+12815903300',
    addressLine1: '15655 John F Kennedy Blvd, Suite D',
    addressLine2: 'Houston, TX 77032',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032&t=&z=15&ie=UTF8&iwloc=&output=embed',
    hoursWeekdayLabel: 'Monday — Saturday',
    hoursWeekdayTime: '11:00 AM — 9:00 PM',
    hoursSundayLabel: 'Sunday',
    hoursSundayTime: 'Closed (Texas Law)',
    headerCtaText: 'Visit Us',
    complianceNotice:
      'Stock changes daily. Call +1 281-590-3300 to check availability. Must be 21+ with valid ID.',
    airportNote: '3 min from IAH Airport',
  },
  ageGate: {
    enabled: true,
    eyebrow: 'LEGAL AGE VERIFICATION',
    heading: 'Are you 21 or older?',
    description:
      'You must be of legal drinking age in the United States to explore and purchase from JFK Liquors.',
    confirmText: 'Yes, I am 21+',
    denyText: 'No, leave',
    denyUrl: 'https://www.google.com',
    footerText: '15655 John F Kennedy Blvd • Houston, TX',
  },
  hero: {
    backgroundImageUrl:
      'https://res.cloudinary.com/ovmougmy/image/upload/v1794246857/jfk-liquors/hero-collection-bottles.jpg',
    eyebrow: 'Neighborhood Liquor Store • Houston, Texas',
    titleLine1: 'Your Neighborhood',
    titleLine2Gold: 'Liquor Store',
    titleLine3: 'Near IAH.',
    description:
      'Proudly serving local Houston residents and travelers along the IAH airport corridor with a wide selection of bourbon, whiskey, wine, chilled craft beer, and tequila. Stop in for friendly customer service and great bottles ready to take home.',
    primaryCtaText: 'Explore Vault',
    primaryCtaHref: '#vault',
    secondaryCtaText: 'Get Directions',
  },
  delivery: {
    eyebrow: 'YOUR FAVORITES, DELIVERED',
    headingLine1: 'STAYING IN?',
    headingLine2Gold: "WE'VE GOT OPTIONS.",
    description:
      "We're also available on Uber Eats and DoorDash. Open your preferred app and search for JFK Liquors, Houston.",
    disclaimer:
      'Availability, selection, fees and delivery area are shown in the app. 21+ with valid ID.',
    uberEatsTitle: 'Uber Eats',
    uberEatsDesc: 'Find JFK Liquors in the Uber Eats app.',
    uberEatsCta: 'Open Uber Eats',
    uberEatsUrl: 'https://www.ubereats.com',
    doorDashTitle: 'DoorDash',
    doorDashDesc: 'Find JFK Liquors in the DoorDash app.',
    doorDashCta: 'Open DoorDash',
    doorDashUrl:
      'https://www.doordash.com/convenience/store/52760606?event_type=autocomplete&pickup=false',
  },
  departmentsSection: {
    eyebrow: 'THE ARCHIVE',
    headingWhite: 'Find your',
    headingGold: 'next favorite.',
    browseAllText: 'Browse All Products',
    cardCtaText: 'Explore Department',
  },
  vaultSection: {
    eyebrow: 'FEATURED STORE SELECTION',
    headingWhite: 'Featured &',
    headingGold: 'Allocated Vault.',
    browseAllText: 'Browse Entire Collection',
    maxItems: 8,
  },
  promoBanner: {
    eyebrow: 'ALLOCATED WHISKEY DROPS • IN STORE ONLY',
    heading: "Seeking Blanton's, Weller, or Eagle Rare?",
    description:
      "We receive new shipments throughout the week. Visit our JFK Boulevard location or call our store directly to check today's bottle availability.",
    primaryCtaText: 'Call (281) 590-3300',
    secondaryCtaText: 'Get Directions',
  },
  storySection: {
    imageUrl:
      'https://res.cloudinary.com/ovmougmy/image/upload/v1793981770/jfk-liquors/collection-story.jpg',
    imageBadgeText: 'A BOTTLE FOR EVERY OCCASION',
    eyebrow: 'LOCAL STORE • PERSONAL TOUCH',
    headingLine1: 'Your stop for',
    headingLine2Gold: 'something good.',
    paragraph1:
      'Stocking up for a get-together? Picking a gift? Or simply finding your favorite bottle? Stop by JFK Liquors and explore at your own pace.',
    paragraph2:
      "You'll find us on John F Kennedy Boulevard, near George Bush Intercontinental Airport in Houston. Ask our team for help choosing what to take home.",
    stat1Value: '500+',
    stat1Label: 'Labels in Stock',
    stat2Value: '6 Days',
    stat2Label: '11 AM — 9 PM',
    stat3Value: 'IAH',
    stat3Label: '3 Min Away',
    ctaText: 'Get to know our store',
    ctaHref: '/about',
  },
  locationSection: {
    eyebrow: 'VISIT THE BOTTLE SHOP',
    headingLine1: 'Right on JFK.',
    headingLine2Gold: 'Close to IAH.',
    proximityNote: 'Conveniently located near George Bush Intercontinental Airport (IAH).',
    directionsBtnText: 'Get directions',
  },
  aboutPage: {
    eyebrow: 'ABOUT JFK LIQUORS',
    headingWhite: 'Your Neighborhood',
    headingGold: 'Bottle Shop.',
    heroImageUrl:
      'https://res.cloudinary.com/ovmougmy/image/upload/v1793981770/jfk-liquors/collection-story.jpg',
    leadParagraph:
      'Conveniently located at 15655 John F Kennedy Boulevard, Suite D — just minutes from George Bush Intercontinental Airport (IAH) — JFK Liquors is a neighborhood retail liquor store serving local Houston residents, visitors, and travelers.',
    paragraph2:
      'Whether you are picking up a bottle on your way home, stocking up for a weekend gathering, or shopping for a gift, we provide a clean, welcoming store with a straightforward retail shopping experience.',
    paragraph3:
      'Our shelves are stocked with a broad selection of sealed spirits, wines, beers, and mixers — including bourbon and American whiskey, Scotch, tequila and mezcal, vodka, gin, rum, cognac, red and white wines, champagne, and cold craft and imported beer.',
    card1Title: 'Quality Selection',
    card1Text:
      'We carry a wide variety of popular national brands, Texas favorites, and special-occasion bottles across spirits, wine, and cold beer.',
    card2Title: 'Friendly Service',
    card2Text:
      'Our store team is always glad to help you find a specific bottle on our shelves or choose a great option for your occasion.',
    card3Title: 'Convenient Location',
    card3Text:
      'Quick in-and-out access on JFK Boulevard near IAH airport terminals with free storefront parking right outside Suite D.',
    primaryCtaText: 'Visit Our Store ↗',
    primaryCtaHref: '/contact',
    secondaryCtaText: 'View All Spirits',
    secondaryCtaHref: '/products/spirits',
  },
  contactPage: {
    eyebrow: 'HOUSTON STOREFRONT • NEAR IAH',
    headingWhite: 'Visit',
    headingGold: 'JFK Liquors.',
    subtitle:
      'Conveniently located on John F Kennedy Blvd, Suite D, minutes from IAH terminals. Free parking on-site.',
  },
  catalogPage: {
    eyebrow: 'JFK LIQUORS • COMPLETE STORE CATALOG',
    headingWhite: 'The Curated',
    headingGold: 'Vault.',
    description:
      'Browse our wide retail selection of bourbon, Scotch, whiskey, red and white wine, champagne, chilled craft beer, and 100% Blue Agave tequila at our JFK Boulevard store near IAH airport.',
    heroImageUrl:
      'https://res.cloudinary.com/ovmougmy/image/upload/v1794246857/jfk-liquors/hero-collection-bottles.jpg',
    serviceBoxTitle: 'Store Customer Service',
    serviceBoxBadge: 'In-Store Today',
    serviceBoxCallLabel: 'Call Store for Availability',
  },
  offersPage: {
    showInNavbar: true,
    navbarLabel: 'Offers',
    eyebrow: 'JFK LIQUORS • EXCLUSIVE IN-STORE OFFERS',
    headingWhite: 'Special Store',
    headingGold: 'Offers.',
    description:
      'Explore our featured in-store offers, seasonal bottle promotions, rare allocation highlights, and bundle specials at JFK Liquors near IAH airport.',
    heroImageUrl:
      'https://res.cloudinary.com/ovmougmy/image/upload/v1794246857/jfk-liquors/hero-collection-bottles.jpg',
    bannerTag: 'LIMITED TIME IN-STORE OFFERS',
    bannerTitle: 'Visiting JFK Boulevard Today? Ask About Our Weekly Bottle Specials.',
    bannerText:
      'Our store team updates featured bottle offers and multi-pack promotions weekly. Call ahead or stop in at Suite D to claim current in-store offers.',
  },
  cardConfig: {
    cardsPerRow: 4,
    sectionBackgroundImageUrl: '',
    imageAspect: '4/3',
    textAlign: 'left',
    specsDisplayStyle: 'pills',
    showBadge: true,
    showVolumeOverlay: true,
    showTags: true,
    maxTagsCount: 3,
    showCategory: false,
    showSubcategory: true,
    showBrand: true,
    showOrigin: true,
    showAbv: true,
    showOfferText: true,
    showDescription: true,
    descriptionLines: 2,
    showCustomFields: true,
    maxCustomFieldsCount: 3,
    customFieldsDisplayStyle: 'pills',
    showFooterVolume: true,
    showStockStatus: true,
    showCtaButton: true,
    ctaButtonText: 'View Details & Availability',
  },
  footer: {
    tagline:
      'Houston’s elevated bottle shop on JFK Boulevard adjacent to George Bush Intercontinental Airport (IAH).',
    licenseBadge: 'Licensed Houston Retailer',
    findUsHeading: 'Find Us Near IAH',
    storefrontTitle: 'JFK Liquors Storefront',
    hoursHeading: 'Store Hours',
    deliveryNote: 'Delivery via Uber Eats & DoorDash.',
    departmentsHeading: 'Shop Departments',
    copyrightText: 'JFK Liquors, Houston, Texas. All rights reserved.',
    legalDisclaimer: 'Must be 21+ with valid government ID. Drink responsibly.',
  },
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "spirits",
    "name": "Spirits",
    "slug": "spirits",
    "description": "Bourbon, Scotch, Vodka, Gin, Cognac & more from around the world.",
    "bannerText": "From allocated bourbon to peated single malts, the spirits wall is the heart of the store.",
    "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795184374/jfk-liquors/products/p25bd35vlhweroyafaim.png",
    "sortOrder": 1,
    "showInNavbar": true,
    "subcategories": [
      {
        "id": "bourbon",
        "name": "Bourbon",
        "slug": "bourbon",
        "description": "Explore rich American bourbon with distinctive oak and caramel notes.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559260/jfk-liquors/categories/mv1tadwi0kktwbcay1jn.png"
      },
      {
        "id": "scotch-whisky",
        "name": "Scotch Whisky",
        "slug": "scotch-whisky",
        "description": "Discover the distinctive whisky traditions of Scotland.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559180/jfk-liquors/categories/srsvbdspwj8hghdrzgtm.png"
      },
      {
        "id": "tennessee-whiskey",
        "name": "Tennessee Whiskey",
        "slug": "tennessee-whiskey",
        "description": "Discover smooth, charcoal-mellowed Tennessee whiskey.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559186/jfk-liquors/categories/axm5iyybow2pu1945lgf.png"
      },
      {
        "id": "irish-whiskey",
        "name": "Irish Whiskey",
        "slug": "irish-whiskey",
        "description": "Explore the smooth and balanced character of Irish whiskey.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559195/jfk-liquors/categories/z08j6bu9yy4ysbfjqjnn.png"
      },
      {
        "id": "vodka",
        "name": "Vodka",
        "slug": "vodka",
        "description": "Explore classic and flavored vodka varieties.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559201/jfk-liquors/categories/cihvwvea4tpv98lxhpot.png"
      },
      {
        "id": "rum",
        "name": "Rum",
        "slug": "rum",
        "description": "Discover white, dark, gold and spiced rum",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559207/jfk-liquors/categories/pcndz1ly8rvqkgh8smj5.png"
      },
      {
        "id": "gin",
        "name": "Gin",
        "slug": "gin",
        "description": "Explore distinctive botanical flavors and classic gin varieties.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559085/jfk-liquors/categories/qjenzhmqhp6fyzl91cwi.png"
      },
      {
        "id": "cognac",
        "name": "Cognac",
        "slug": "cognac",
        "description": "Discover the traditional craftsmanship of French cognac.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559155/jfk-liquors/categories/shmzcho2fs3edvm9mlul.png"
      },
      {
        "id": "brandy",
        "name": "Brandy",
        "slug": "brandy",
        "description": "Explore rich and distinctive brandy varieties.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559143/jfk-liquors/categories/knvo7rduotoptgzbiypu.png"
      }
    ]
  },
  {
    "id": "wines",
    "name": "Wines",
    "slug": "wines",
    "description": "Reds, whites, rosé, and sparkling — from everyday pours to celebration bottles.",
    "bannerText": "Weeknight value bottles, gift-worthy labels and celebration sparkling.",
    "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795184559/jfk-liquors/products/mrzqbjkbvhcoth6gxvad.png",
    "sortOrder": 2,
    "showInNavbar": true,
    "subcategories": [
      {
        "id": "red-wine",
        "name": "Red Wine",
        "slug": "red-wine",
        "description": "Explore rich, bold and classic red wine varieties.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559885/jfk-liquors/categories/b3ko7gmnocvtfm3ycvni.png"
      },
      {
        "id": "white-wine",
        "name": "White Wine",
        "slug": "white-wine",
        "description": "Discover crisp, aromatic and refreshing white wines.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559887/jfk-liquors/categories/ebugwznujo4s0vzopo1n.png"
      },
      {
        "id": "sparkling-wine",
        "name": "Sparkling Wine",
        "slug": "sparkling-wine",
        "description": "Discover sparkling wines from around the world.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559893/jfk-liquors/categories/ge0kgln7a9zvclqqolve.png"
      },
      {
        "id": "champagne",
        "name": "Champagne",
        "slug": "champagne",
        "description": "Explore the classic elegance of French Champagne.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795559896/jfk-liquors/categories/g5rhipj0agh40vmmtvlb.png"
      }
    ]
  },
  {
    "id": "beer",
    "name": "Beer",
    "slug": "beer",
    "description": "Texas craft, domestic favorites, imports, hard seltzers & RTDs.",
    "bannerText": "Cold and ready to go: Texas craft, national favorites and imports.",
    "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795184661/jfk-liquors/products/wjhyldlkvolxuezakuml.png",
    "sortOrder": 3,
    "showInNavbar": true,
    "subcategories": [
      {
        "id": "domestic-beer",
        "name": "Domestic Beer",
        "slug": "domestic-beer",
        "description": "Ice-cold American and Texas favorite lagers, light beers, and wheat ales ready to go."
      },
      {
        "id": "imported-beer",
        "name": "Imported Beer",
        "slug": "imported-beer",
        "description": "World-class Belgian Trappist ales, Mexican lagers, European pilsners, Irish stouts, and Japanese imports."
      },
      {
        "id": "craft-beer",
        "name": "Craft Beer",
        "slug": "craft-beer",
        "description": "Rare barrel-aged stouts, high-gravity IPAs, barleywines, and Houston craft favorites."
      }
    ]
  },
  {
    "id": "agave-and-more",
    "name": "Tequila & More",
    "slug": "agave-and-more",
    "description": "Tequila from blanco to añejo, mezcal, liqueurs, mixers, ice and glassware.",
    "bannerText": "Tequila from blanco to añejo, mezcal, liqueurs, mixers, ice and glassware.",
    "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795185008/jfk-liquors/products/b2mz4hohemjcu1cf8qpw.png",
    "sortOrder": 4,
    "showInNavbar": true,
    "subcategories": [
      {
        "id": "blanco-tequila",
        "name": "Blanco Tequila",
        "slug": "blanco-tequila",
        "description": "Discover the pure and vibrant character of blue agave.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795560123/jfk-liquors/categories/xblzyd4kirlcfhrgstkw.png"
      },
      {
        "id": "reposado-tequila",
        "name": "Reposado Tequila",
        "slug": "reposado-tequila",
        "description": "Explore the balanced character of oak-rested tequila.",
        "imageUrl": "https://res.cloudinary.com/ovmougmy/image/upload/v1795560139/jfk-liquors/categories/g9njzgrfrvczf8ltpqn6.png"
      },
      {
        "id": "anejo-tequila",
        "name": "Añejo Tequila",
        "slug": "anejo-tequila",
        "description": "Rich, complex 100% Blue Agave tequilas aged in oak barrels and crystal-clear Cristalinos."
      }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "pappy-van-winkle-s-family-reserve-23-year",
    "name": "Pappy Van Winkle's Family Reserve 23 Year",
    "slug": "pappy-van-winkle-s-family-reserve-23-year",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Pappy Van Winkle's Family Reserve 23 Year offers a distinctive profile with notes of mature oak, caramel, dried fruit.",
    "description": "Pappy Van Winkle's Family Reserve 23 Year is a bourbon expression from Van Winkle, associated with Kentucky, USA. Its tasting profile brings together mature oak, caramel, dried fruit. Crafted by Van Winkle (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 47.8,
    "origin": "Kentucky, USA",
    "sortOrder": 1,
    "brand": "Van Winkle",
    "tags": [
      "Bourbon",
      "Kentucky",
      "23 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/pappy-23-bourbon.jpg?v=1765204160"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/pappy-23-bourbon.jpg?v=1765204160",
    "customFields": [
      {
        "id": "cf-1-1",
        "label": "Age",
        "value": "23 Years",
        "showOnCard": true
      },
      {
        "id": "cf-1-2",
        "label": "Proof",
        "value": "95.6",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "pappy-van-winkle-s-family-reserve-15-year",
    "name": "Pappy Van Winkle's Family Reserve 15 Year",
    "slug": "pappy-van-winkle-s-family-reserve-15-year",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Pappy Van Winkle's Family Reserve 15 Year offers a distinctive profile with notes of vanilla, dark fruit, oak.",
    "description": "Pappy Van Winkle's Family Reserve 15 Year is a bourbon expression from Van Winkle, associated with Kentucky, USA. Its tasting profile brings together vanilla, dark fruit, oak. Crafted by Van Winkle (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 53.5,
    "origin": "Kentucky, USA",
    "sortOrder": 2,
    "brand": "Van Winkle",
    "tags": [
      "Bourbon",
      "Kentucky",
      "15 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/pappy-15__96724.jpg?v=1767738135"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/pappy-15__96724.jpg?v=1767738135",
    "customFields": [
      {
        "id": "cf-2-1",
        "label": "Age",
        "value": "15 Years",
        "showOnCard": true
      },
      {
        "id": "cf-2-2",
        "label": "Proof",
        "value": "107",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "eagle-rare-17-year",
    "name": "Eagle Rare 17 Year",
    "slug": "eagle-rare-17-year",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Eagle Rare 17 Year offers a distinctive profile with notes of toffee, leather, oak.",
    "description": "Eagle Rare 17 Year is a bourbon expression from Eagle Rare, associated with Kentucky, USA. Its tasting profile brings together toffee, leather, oak. Crafted by Eagle Rare (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 50.5,
    "origin": "Kentucky, USA",
    "sortOrder": 3,
    "brand": "Eagle Rare",
    "tags": [
      "Bourbon",
      "Kentucky",
      "17 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/eagle-rare-17-year-old-bourbon-whiskey-2023-38519649501333.jpg?v=1737068042"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/eagle-rare-17-year-old-bourbon-whiskey-2023-38519649501333.jpg?v=1737068042",
    "customFields": [
      {
        "id": "cf-3-1",
        "label": "Age",
        "value": "17 Years",
        "showOnCard": true
      },
      {
        "id": "cf-3-2",
        "label": "Proof",
        "value": "101",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "double-eagle-very-rare-20-year",
    "name": "Double Eagle Very Rare 20 Year",
    "slug": "double-eagle-very-rare-20-year",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Double Eagle Very Rare 20 Year offers a distinctive profile with notes of deep oak, caramel, spice.",
    "description": "Double Eagle Very Rare 20 Year is a bourbon expression from Eagle Rare, associated with Kentucky, USA. Its tasting profile brings together deep oak, caramel, spice. Crafted by Eagle Rare (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 45,
    "origin": "Kentucky, USA",
    "sortOrder": 4,
    "brand": "Eagle Rare",
    "tags": [
      "Bourbon",
      "Kentucky",
      "20 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/devr.jpg?v=1749505814"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/devr.jpg?v=1749505814",
    "customFields": [
      {
        "id": "cf-4-1",
        "label": "Age",
        "value": "20 Years",
        "showOnCard": true
      },
      {
        "id": "cf-4-2",
        "label": "Proof",
        "value": "90",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "weller-full-proof",
    "name": "Weller Full Proof",
    "slug": "weller-full-proof",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Weller Full Proof offers a distinctive profile with notes of wheat sweetness, vanilla, cinnamon.",
    "description": "Weller Full Proof is a bourbon expression from Weller, associated with Kentucky, USA. Its tasting profile brings together wheat sweetness, vanilla, cinnamon. Crafted by Weller (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 57,
    "origin": "Kentucky, USA",
    "sortOrder": 5,
    "brand": "Weller",
    "tags": [
      "Bourbon",
      "Kentucky"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/wl-weller-full-proof.png?v=1674336899"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/wl-weller-full-proof.png?v=1674336899",
    "customFields": [
      {
        "id": "cf-5-1",
        "label": "Proof",
        "value": "114",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "weller-12-year",
    "name": "Weller 12 Year",
    "slug": "weller-12-year",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Weller 12 Year offers a distinctive profile with notes of caramel, almond, oak.",
    "description": "Weller 12 Year is a bourbon expression from Weller, associated with Kentucky, USA. Its tasting profile brings together caramel, almond, oak. Crafted by Weller (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 45,
    "origin": "Kentucky, USA",
    "sortOrder": 6,
    "brand": "Weller",
    "tags": [
      "Bourbon",
      "Kentucky",
      "12 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/weller-12yr__81881.jpg?v=1765206730"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/weller-12yr__81881.jpg?v=1765206730",
    "customFields": [
      {
        "id": "cf-6-1",
        "label": "Age",
        "value": "12 Years",
        "showOnCard": true
      },
      {
        "id": "cf-6-2",
        "label": "Proof",
        "value": "90",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "blanton-s-gold-edition",
    "name": "Blanton's Gold Edition",
    "slug": "blanton-s-gold-edition",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Blanton's Gold Edition offers a distinctive profile with notes of honey, citrus, spice.",
    "description": "Blanton's Gold Edition is a bourbon expression from Blanton's, associated with Kentucky, USA. Its tasting profile brings together honey, citrus, spice. Crafted by Blanton's (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 51.5,
    "origin": "Kentucky, USA",
    "sortOrder": 7,
    "brand": "Blanton's",
    "tags": [
      "Bourbon",
      "Kentucky"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/blanton.jpg?v=1655442076"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/blanton.jpg?v=1655442076",
    "customFields": [
      {
        "id": "cf-7-1",
        "label": "Proof",
        "value": "103",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "blanton-s-original-single-barrel",
    "name": "Blanton's Original Single Barrel",
    "slug": "blanton-s-original-single-barrel",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Blanton's Original Single Barrel offers a distinctive profile with notes of caramel, orange, vanilla.",
    "description": "Blanton's Original Single Barrel is a bourbon expression from Blanton's, associated with Kentucky, USA. Its tasting profile brings together caramel, orange, vanilla. Crafted by Blanton's (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 46.5,
    "origin": "Kentucky, USA",
    "sortOrder": 8,
    "brand": "Blanton's",
    "tags": [
      "Bourbon",
      "Kentucky"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/bl_1.jpg?v=1655307171"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/bl_1.jpg?v=1655307171",
    "customFields": [
      {
        "id": "cf-8-1",
        "label": "Proof",
        "value": "93",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "old-forester-birthday-bourbon",
    "name": "Old Forester Birthday Bourbon",
    "slug": "old-forester-birthday-bourbon",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Old Forester Birthday Bourbon offers a distinctive profile with notes of dark fruit, cocoa, oak.",
    "description": "Old Forester Birthday Bourbon is a bourbon expression from Old Forester, associated with Kentucky, USA. Its tasting profile brings together dark fruit, cocoa, oak. Crafted by Old Forester (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 48,
    "origin": "Kentucky, USA",
    "sortOrder": 9,
    "brand": "Old Forester",
    "tags": [
      "Bourbon",
      "Kentucky"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/old-forester-2019.jpg?v=1765205572"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/old-forester-2019.jpg?v=1765205572",
    "customFields": [],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "woodford-reserve-double-oaked",
    "name": "Woodford Reserve Double Oaked",
    "slug": "woodford-reserve-double-oaked",
    "category": "spirits",
    "subcategory": "bourbon",
    "shortDescription": "Woodford Reserve Double Oaked offers a distinctive profile with notes of caramel, toasted oak, chocolate.",
    "description": "Woodford Reserve Double Oaked is a bourbon expression from Woodford Reserve, associated with Kentucky, USA. Its tasting profile brings together caramel, toasted oak, chocolate. Crafted by Woodford Reserve (Kentucky, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 45.2,
    "origin": "Kentucky, USA",
    "sortOrder": 10,
    "brand": "Woodford Reserve",
    "tags": [
      "Bourbon",
      "Kentucky"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/Woodford_Reserve_Double_Double_Oaked.jpg?v=1738640647"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/Woodford_Reserve_Double_Double_Oaked.jpg?v=1738640647",
    "customFields": [
      {
        "id": "cf-10-1",
        "label": "Proof",
        "value": "90.4",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "the-macallan-30-year-sherry-oak",
    "name": "The Macallan 30 Year Sherry Oak",
    "slug": "the-macallan-30-year-sherry-oak",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "The Macallan 30 Year Sherry Oak offers a distinctive profile with notes of dried fruit, oak, spice.",
    "description": "The Macallan 30 Year Sherry Oak is a scotch whisky expression from The Macallan, associated with Scotland. Its tasting profile brings together dried fruit, oak, spice. Crafted by The Macallan (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 1,
    "brand": "The Macallan",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "30 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/macallan-30-sherry.jpg?v=1767739151"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/macallan-30-sherry.jpg?v=1767739151",
    "customFields": [
      {
        "id": "cf-11-1",
        "label": "Age",
        "value": "30 Years",
        "showOnCard": true
      },
      {
        "id": "cf-11-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "the-macallan-25-year-sherry-oak",
    "name": "The Macallan 25 Year Sherry Oak",
    "slug": "the-macallan-25-year-sherry-oak",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "The Macallan 25 Year Sherry Oak offers a distinctive profile with notes of fig, chocolate, oak.",
    "description": "The Macallan 25 Year Sherry Oak is a scotch whisky expression from The Macallan, associated with Scotland. Its tasting profile brings together fig, chocolate, oak. Crafted by The Macallan (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 2,
    "brand": "The Macallan",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "25 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/TheMacallan25YearOldAnniversarySherryCaskScotchWhisky1.jpg?v=1758845764"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/TheMacallan25YearOldAnniversarySherryCaskScotchWhisky1.jpg?v=1758845764",
    "customFields": [
      {
        "id": "cf-12-1",
        "label": "Age",
        "value": "25 Years",
        "showOnCard": true
      },
      {
        "id": "cf-12-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "the-macallan-18-year-sherry-oak",
    "name": "The Macallan 18 Year Sherry Oak",
    "slug": "the-macallan-18-year-sherry-oak",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "The Macallan 18 Year Sherry Oak offers a distinctive profile with notes of raisin, ginger, orange.",
    "description": "The Macallan 18 Year Sherry Oak is a scotch whisky expression from The Macallan, associated with Scotland. Its tasting profile brings together raisin, ginger, orange. Crafted by The Macallan (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 3,
    "brand": "The Macallan",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "18 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/macallan-18-new.jpg?v=1780085041"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/macallan-18-new.jpg?v=1780085041",
    "customFields": [
      {
        "id": "cf-13-1",
        "label": "Age",
        "value": "18 Years",
        "showOnCard": true
      },
      {
        "id": "cf-13-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "johnnie-walker-blue-label",
    "name": "Johnnie Walker Blue Label",
    "slug": "johnnie-walker-blue-label",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "Johnnie Walker Blue Label offers a distinctive profile with notes of honey, smoke, dried fruit.",
    "description": "Johnnie Walker Blue Label is a scotch whisky expression from Johnnie Walker, associated with Scotland. Its tasting profile brings together honey, smoke, dried fruit. Crafted by Johnnie Walker (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Scotland",
    "sortOrder": 4,
    "brand": "Johnnie Walker",
    "tags": [
      "Scotch Whisky",
      "Scotland"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Johnnie-Walker-Blue-Label-12-year-Blended-Scotch-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Johnnie-Walker-Blue-Label-12-year-Blended-Scotch-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-14-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "johnnie-walker-king-george-v",
    "name": "Johnnie Walker King George V",
    "slug": "johnnie-walker-king-george-v",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "Johnnie Walker King George V offers a distinctive profile with notes of dark chocolate, fruit, smoke.",
    "description": "Johnnie Walker King George V is a scotch whisky expression from Johnnie Walker, associated with Scotland. Its tasting profile brings together dark chocolate, fruit, smoke. Crafted by Johnnie Walker (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 5,
    "brand": "Johnnie Walker",
    "tags": [
      "Scotch Whisky",
      "Scotland"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/king-george.jpg?v=1765205846"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/king-george.jpg?v=1765205846",
    "customFields": [
      {
        "id": "cf-15-1",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "royal-salute-21-year",
    "name": "Royal Salute 21 Year",
    "slug": "royal-salute-21-year",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "Royal Salute 21 Year offers a distinctive profile with notes of orchard fruit, honey, spice.",
    "description": "Royal Salute 21 Year is a scotch whisky expression from Royal Salute, associated with Scotland. Its tasting profile brings together orchard fruit, honey, spice. Crafted by Royal Salute (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Scotland",
    "sortOrder": 6,
    "brand": "Royal Salute",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "21 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Chivas-Regal-21-Year-Royal-Salute-Blended-Scotch-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Chivas-Regal-21-Year-Royal-Salute-Blended-Scotch-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-16-1",
        "label": "Age",
        "value": "21 Years",
        "showOnCard": true
      },
      {
        "id": "cf-16-2",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "glenfiddich-30-year",
    "name": "Glenfiddich 30 Year",
    "slug": "glenfiddich-30-year",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "Glenfiddich 30 Year offers a distinctive profile with notes of dried fruit, oak, caramel.",
    "description": "Glenfiddich 30 Year is a scotch whisky expression from Glenfiddich, associated with Scotland. Its tasting profile brings together dried fruit, oak, caramel. Crafted by Glenfiddich (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 7,
    "brand": "Glenfiddich",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "30 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/clg3xak8k05cy0fp8onwezcdx-30-new.0.0.1000.1000.full.png?v=1701922139"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/clg3xak8k05cy0fp8onwezcdx-30-new.0.0.1000.1000.full.png?v=1701922139",
    "customFields": [
      {
        "id": "cf-17-1",
        "label": "Age",
        "value": "30 Years",
        "showOnCard": true
      },
      {
        "id": "cf-17-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "the-glenlivet-25-year",
    "name": "The Glenlivet 25 Year",
    "slug": "the-glenlivet-25-year",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "The Glenlivet 25 Year offers a distinctive profile with notes of fig, chocolate, spice.",
    "description": "The Glenlivet 25 Year is a scotch whisky expression from The Glenlivet, associated with Scotland. Its tasting profile brings together fig, chocolate, spice. Crafted by The Glenlivet (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 8,
    "brand": "The Glenlivet",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "25 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0069/8141/9069/files/GLENLIVET_SCOTCH_SINGLE_MALT_86PF_25YR_750ML.webp?v=1794954619"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0069/8141/9069/files/GLENLIVET_SCOTCH_SINGLE_MALT_86PF_25YR_750ML.webp?v=1794954619",
    "customFields": [
      {
        "id": "cf-18-1",
        "label": "Age",
        "value": "25 Years",
        "showOnCard": true
      },
      {
        "id": "cf-18-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "the-balvenie-21-year-portwood",
    "name": "The Balvenie 21 Year PortWood",
    "slug": "the-balvenie-21-year-portwood",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "The Balvenie 21 Year PortWood offers a distinctive profile with notes of honey, dried fruit, nut.",
    "description": "The Balvenie 21 Year PortWood is a scotch whisky expression from The Balvenie, associated with Scotland. Its tasting profile brings together honey, dried fruit, nut. Crafted by The Balvenie (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 9,
    "brand": "The Balvenie",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "21 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/balvenie-portwood-21-year__10547.jpg?v=1767740747"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/balvenie-portwood-21-year__10547.jpg?v=1767740747",
    "customFields": [
      {
        "id": "cf-19-1",
        "label": "Age",
        "value": "21 Years",
        "showOnCard": true
      },
      {
        "id": "cf-19-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "lagavulin-16-year",
    "name": "Lagavulin 16 Year",
    "slug": "lagavulin-16-year",
    "category": "spirits",
    "subcategory": "scotch-whisky",
    "shortDescription": "Lagavulin 16 Year offers a distinctive profile with notes of peat smoke, sea salt, malt.",
    "description": "Lagavulin 16 Year is a scotch whisky expression from Lagavulin, associated with Scotland. Its tasting profile brings together peat smoke, sea salt, malt. Crafted by Lagavulin (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Scotland",
    "sortOrder": 10,
    "brand": "Lagavulin",
    "tags": [
      "Scotch Whisky",
      "Scotland",
      "16 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/buy-lagavulin-16-year-scotch-whisky__41545.jpg?v=1767742292"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/buy-lagavulin-16-year-scotch-whisky__41545.jpg?v=1767742292",
    "customFields": [
      {
        "id": "cf-20-1",
        "label": "Age",
        "value": "16 Years",
        "showOnCard": true
      },
      {
        "id": "cf-20-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "jack-daniel-s-14-year",
    "name": "Jack Daniel's 14 Year",
    "slug": "jack-daniel-s-14-year",
    "category": "spirits",
    "subcategory": "tennessee-whiskey",
    "shortDescription": "Jack Daniel's 14 Year offers a distinctive profile with notes of oak, dark fruit, spice.",
    "description": "Jack Daniel's 14 Year is a tennessee whiskey expression from Jack Daniel's, associated with Tennessee, USA. Its tasting profile brings together oak, dark fruit, spice. Crafted by Jack Daniel's (Tennessee, USA) and bottled in 700 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "700 mL",
    "abv": 63.15,
    "origin": "Tennessee, USA",
    "sortOrder": 1,
    "brand": "Jack Daniel's",
    "tags": [
      "Tennessee Whiskey",
      "Tennessee",
      "14 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/jack-daniels-14-year-whiskey.jpg?v=1770423745"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/jack-daniels-14-year-whiskey.jpg?v=1770423745",
    "customFields": [
      {
        "id": "cf-21-1",
        "label": "Age",
        "value": "14 Years",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "jack-daniel-s-12-year",
    "name": "Jack Daniel's 12 Year",
    "slug": "jack-daniel-s-12-year",
    "category": "spirits",
    "subcategory": "tennessee-whiskey",
    "shortDescription": "Jack Daniel's 12 Year offers a distinctive profile with notes of caramel, tobacco, oak.",
    "description": "Jack Daniel's 12 Year is a tennessee whiskey expression from Jack Daniel's, associated with Tennessee, USA. Its tasting profile brings together caramel, tobacco, oak. Crafted by Jack Daniel's (Tennessee, USA) and bottled in 700 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "700 mL",
    "abv": 53.5,
    "origin": "Tennessee, USA",
    "sortOrder": 2,
    "brand": "Jack Daniel's",
    "tags": [
      "Tennessee Whiskey",
      "Tennessee",
      "12 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/jack-daniels-12-year-old-whiskey__40910.jpg?v=1765205324"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/jack-daniels-12-year-old-whiskey__40910.jpg?v=1765205324",
    "customFields": [
      {
        "id": "cf-22-1",
        "label": "Age",
        "value": "12 Years",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "jack-daniel-s-10-year",
    "name": "Jack Daniel's 10 Year",
    "slug": "jack-daniel-s-10-year",
    "category": "spirits",
    "subcategory": "tennessee-whiskey",
    "shortDescription": "Jack Daniel's 10 Year offers a distinctive profile with notes of banana, caramel, oak.",
    "description": "Jack Daniel's 10 Year is a tennessee whiskey expression from Jack Daniel's, associated with Tennessee, USA. Its tasting profile brings together banana, caramel, oak. Crafted by Jack Daniel's (Tennessee, USA) and bottled in 700 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "700 mL",
    "abv": 48.5,
    "origin": "Tennessee, USA",
    "sortOrder": 3,
    "brand": "Jack Daniel's",
    "tags": [
      "Tennessee Whiskey",
      "Tennessee",
      "10 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/products/jack-daniels-10-year-old-whiskey.jpg?v=1699066840"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/products/jack-daniels-10-year-old-whiskey.jpg?v=1699066840",
    "customFields": [
      {
        "id": "cf-23-1",
        "label": "Age",
        "value": "10 Years",
        "showOnCard": true
      },
      {
        "id": "cf-23-2",
        "label": "Proof",
        "value": "97",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "jack-daniel-s-single-barrel-barrel-proof",
    "name": "Jack Daniel's Single Barrel Barrel Proof",
    "slug": "jack-daniel-s-single-barrel-barrel-proof",
    "category": "spirits",
    "subcategory": "tennessee-whiskey",
    "shortDescription": "Jack Daniel's Single Barrel Barrel Proof offers a distinctive profile with notes of vanilla, toasted oak, spice.",
    "description": "Jack Daniel's Single Barrel Barrel Proof is a tennessee whiskey expression from Jack Daniel's, associated with Tennessee, USA. Its tasting profile brings together vanilla, toasted oak, spice. Crafted by Jack Daniel's (Tennessee, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 64.5,
    "origin": "Tennessee, USA",
    "sortOrder": 4,
    "brand": "Jack Daniel's",
    "tags": [
      "Tennessee Whiskey",
      "Tennessee"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Jack-Daniels-Single-Barrel-Barrel-Proof-Tennessee-Whiskey_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Jack-Daniels-Single-Barrel-Barrel-Proof-Tennessee-Whiskey_1.png",
    "customFields": [],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "jack-daniel-s-sinatra-select",
    "name": "Jack Daniel's Sinatra Select",
    "slug": "jack-daniel-s-sinatra-select",
    "category": "spirits",
    "subcategory": "tennessee-whiskey",
    "shortDescription": "Jack Daniel's Sinatra Select offers a distinctive profile with notes of vanilla, caramel, smoke.",
    "description": "Jack Daniel's Sinatra Select is a tennessee whiskey expression from Jack Daniel's, associated with Tennessee, USA. Its tasting profile brings together vanilla, caramel, smoke. Crafted by Jack Daniel's (Tennessee, USA) and bottled in 1 L format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "1 L",
    "abv": 45,
    "origin": "Tennessee, USA",
    "sortOrder": 5,
    "brand": "Jack Daniel's",
    "tags": [
      "Tennessee Whiskey",
      "Tennessee"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/JACKDANIELSWHISKEYSINATRASELECT1L.png?v=1710782335"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/JACKDANIELSWHISKEYSINATRASELECT1L.png?v=1710782335",
    "customFields": [
      {
        "id": "cf-25-1",
        "label": "Proof",
        "value": "90",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "midleton-very-rare-vintage-release",
    "name": "Midleton Very Rare Vintage Release",
    "slug": "midleton-very-rare-vintage-release",
    "category": "spirits",
    "subcategory": "irish-whiskey",
    "shortDescription": "Midleton Very Rare Vintage Release offers a distinctive profile with notes of orchard fruit, vanilla, spice.",
    "description": "Midleton Very Rare Vintage Release is a irish whiskey expression from Midleton, associated with Ireland. Its tasting profile brings together orchard fruit, vanilla, spice. Crafted by Midleton (Ireland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Ireland",
    "sortOrder": 1,
    "brand": "Midleton",
    "tags": [
      "Irish Whiskey",
      "Ireland"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/Midleton.png?v=1713984137"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/Midleton.png?v=1713984137",
    "customFields": [
      {
        "id": "cf-26-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "redbreast-27-year",
    "name": "Redbreast 27 Year",
    "slug": "redbreast-27-year",
    "category": "spirits",
    "subcategory": "irish-whiskey",
    "shortDescription": "Redbreast 27 Year offers a distinctive profile with notes of tropical fruit, oak, spice.",
    "description": "Redbreast 27 Year is a irish whiskey expression from Redbreast, associated with Ireland. Its tasting profile brings together tropical fruit, oak, spice. Crafted by Redbreast (Ireland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 54.6,
    "origin": "Ireland",
    "sortOrder": 2,
    "brand": "Redbreast",
    "tags": [
      "Irish Whiskey",
      "Ireland",
      "27 Year"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/redbreast-27-year-old-ruby-port-cask-finish__62078.jpg?v=1765204603"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/redbreast-27-year-old-ruby-port-cask-finish__62078.jpg?v=1765204603",
    "customFields": [
      {
        "id": "cf-27-1",
        "label": "Age",
        "value": "27 Years",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "redbreast-21-year",
    "name": "Redbreast 21 Year",
    "slug": "redbreast-21-year",
    "category": "spirits",
    "subcategory": "irish-whiskey",
    "shortDescription": "Redbreast 21 Year offers a distinctive profile with notes of dried fruit, nuts, spice.",
    "description": "Redbreast 21 Year is a irish whiskey expression from Redbreast, associated with Ireland. Its tasting profile brings together dried fruit, nuts, spice. Crafted by Redbreast (Ireland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 46,
    "origin": "Ireland",
    "sortOrder": 3,
    "brand": "Redbreast",
    "tags": [
      "Irish Whiskey",
      "Ireland",
      "21 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/redbreast-21-year-irish-whiskey__02849.jpg?v=1767864429"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/redbreast-21-year-irish-whiskey__02849.jpg?v=1767864429",
    "customFields": [
      {
        "id": "cf-28-1",
        "label": "Age",
        "value": "21 Years",
        "showOnCard": true
      },
      {
        "id": "cf-28-2",
        "label": "Proof",
        "value": "92",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "bushmills-21-year-single-malt",
    "name": "Bushmills 21 Year Single Malt",
    "slug": "bushmills-21-year-single-malt",
    "category": "spirits",
    "subcategory": "irish-whiskey",
    "shortDescription": "Bushmills 21 Year Single Malt offers a distinctive profile with notes of fig, malt, chocolate.",
    "description": "Bushmills 21 Year Single Malt is a irish whiskey expression from Bushmills, associated with Ireland. Its tasting profile brings together fig, malt, chocolate. Crafted by Bushmills (Ireland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Ireland",
    "sortOrder": 4,
    "brand": "Bushmills",
    "tags": [
      "Irish Whiskey",
      "Ireland",
      "21 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/bushmills-21-year-old__26481.jpg?v=1767738065"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/bushmills-21-year-old__26481.jpg?v=1767738065",
    "customFields": [
      {
        "id": "cf-29-1",
        "label": "Age",
        "value": "21 Years",
        "showOnCard": true
      },
      {
        "id": "cf-29-2",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "jameson-18-year",
    "name": "Jameson 18 Year",
    "slug": "jameson-18-year",
    "category": "spirits",
    "subcategory": "irish-whiskey",
    "shortDescription": "Jameson 18 Year offers a distinctive profile with notes of toffee, vanilla, oak.",
    "description": "Jameson 18 Year is a irish whiskey expression from Jameson, associated with Ireland. Its tasting profile brings together toffee, vanilla, oak. Crafted by Jameson (Ireland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 46,
    "origin": "Ireland",
    "sortOrder": 5,
    "brand": "Jameson",
    "tags": [
      "Irish Whiskey",
      "Ireland",
      "18 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/buy-jameson-18-year__57757.jpg?v=1767738087"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/buy-jameson-18-year__57757.jpg?v=1767738087",
    "customFields": [
      {
        "id": "cf-30-1",
        "label": "Age",
        "value": "18 Years",
        "showOnCard": true
      },
      {
        "id": "cf-30-2",
        "label": "Proof",
        "value": "92",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "beluga-gold-line",
    "name": "Beluga Gold Line",
    "slug": "beluga-gold-line",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "Beluga Gold Line offers a distinctive profile with notes of grain, soft sweetness, clean finish.",
    "description": "Beluga Gold Line is a vodka expression from Beluga, associated with Montenegro. Its tasting profile brings together grain, soft sweetness, clean finish. Crafted by Beluga (Montenegro) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Montenegro",
    "sortOrder": 1,
    "brand": "Beluga",
    "tags": [
      "Vodka",
      "Montenegro"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/BELUGAGOLD.png?v=1701815407"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/BELUGAGOLD.png?v=1701815407",
    "customFields": [
      {
        "id": "cf-31-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "elit-vodka",
    "name": "elit Vodka",
    "slug": "elit-vodka",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "elit Vodka offers a distinctive profile with notes of clean grain, subtle pepper, smooth texture.",
    "description": "elit Vodka is a vodka expression from elit, associated with Latvia. Its tasting profile brings together clean grain, subtle pepper, smooth texture. Crafted by elit (Latvia) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Latvia",
    "sortOrder": 2,
    "brand": "elit",
    "tags": [
      "Vodka",
      "Latvia"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/elit_1.75l_89784746880001.jpg?v=1655316099"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/elit_1.75l_89784746880001.jpg?v=1655316099",
    "customFields": [
      {
        "id": "cf-32-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "crystal-head-aurora",
    "name": "Crystal Head Aurora",
    "slug": "crystal-head-aurora",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "Crystal Head Aurora offers a distinctive profile with notes of citrus, vanilla, pepper.",
    "description": "Crystal Head Aurora is a vodka expression from Crystal Head, associated with Canada. Its tasting profile brings together citrus, vanilla, pepper. Crafted by Crystal Head (Canada) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Canada",
    "sortOrder": 3,
    "brand": "Crystal Head",
    "tags": [
      "Vodka",
      "Canada"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/CRYSTALHEADAURORAVODKA.png?v=1699654886"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/CRYSTALHEADAURORAVODKA.png?v=1699654886",
    "customFields": [
      {
        "id": "cf-33-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "crystal-head-onyx",
    "name": "Crystal Head Onyx",
    "slug": "crystal-head-onyx",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "Crystal Head Onyx offers a distinctive profile with notes of earthy agave, citrus, pepper.",
    "description": "Crystal Head Onyx is a vodka expression from Crystal Head, associated with Canada. Its tasting profile brings together earthy agave, citrus, pepper. Crafted by Crystal Head (Canada) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Canada",
    "sortOrder": 4,
    "brand": "Crystal Head",
    "tags": [
      "Vodka",
      "Canada"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/crystal_head_onyx.png?v=1655443208"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/crystal_head_onyx.png?v=1655443208",
    "customFields": [
      {
        "id": "cf-34-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "grey-goose-altius",
    "name": "Grey Goose Altius",
    "slug": "grey-goose-altius",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "Grey Goose Altius offers a distinctive profile with notes of mineral, citrus, soft texture.",
    "description": "Grey Goose Altius is a vodka expression from Grey Goose, associated with France. Its tasting profile brings together mineral, citrus, soft texture. Crafted by Grey Goose (France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "France",
    "sortOrder": 5,
    "brand": "Grey Goose",
    "tags": [
      "Vodka",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/grey-goose-altius-vodka.png?v=1722470595"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/grey-goose-altius-vodka.png?v=1722470595",
    "customFields": [
      {
        "id": "cf-35-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "ciroc-vodka",
    "name": "Cîroc Vodka",
    "slug": "ciroc-vodka",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "Cîroc Vodka offers a distinctive profile with notes of grape, citrus, clean finish.",
    "description": "Cîroc Vodka is a vodka expression from Cîroc, associated with France. Its tasting profile brings together grape, citrus, clean finish. Crafted by Cîroc (France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "France",
    "sortOrder": 6,
    "brand": "Cîroc",
    "tags": [
      "Vodka",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/CIROC_VODKA_FRANCE_750ML.png?v=1752025447"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/CIROC_VODKA_FRANCE_750ML.png?v=1752025447",
    "customFields": [
      {
        "id": "cf-36-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "chopin-family-reserve",
    "name": "Chopin Family Reserve",
    "slug": "chopin-family-reserve",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "Chopin Family Reserve offers a distinctive profile with notes of potato, cream, earthy notes.",
    "description": "Chopin Family Reserve is a vodka expression from Chopin, associated with Poland. Its tasting profile brings together potato, cream, earthy notes. Crafted by Chopin (Poland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Poland",
    "sortOrder": 7,
    "brand": "Chopin",
    "tags": [
      "Vodka",
      "Poland"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/529057.jpg?v=1655431194"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/529057.jpg?v=1655431194",
    "customFields": [
      {
        "id": "cf-37-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "ketel-one-vodka",
    "name": "Ketel One Vodka",
    "slug": "ketel-one-vodka",
    "category": "spirits",
    "subcategory": "vodka",
    "shortDescription": "Ketel One Vodka offers a distinctive profile with notes of citrus, grain, pepper.",
    "description": "Ketel One Vodka is a vodka expression from Ketel One, associated with Netherlands. Its tasting profile brings together citrus, grain, pepper. Crafted by Ketel One (Netherlands) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Netherlands",
    "sortOrder": 8,
    "brand": "Ketel One",
    "tags": [
      "Vodka",
      "Netherlands"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Ketel-One-Vodka-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Ketel-One-Vodka-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-38-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "ron-zacapa-xo",
    "name": "Ron Zacapa XO",
    "slug": "ron-zacapa-xo",
    "category": "spirits",
    "subcategory": "rum",
    "shortDescription": "Ron Zacapa XO offers a distinctive profile with notes of caramel, dried fruit, cocoa.",
    "description": "Ron Zacapa XO is a rum expression from Ron Zacapa, associated with Guatemala. Its tasting profile brings together caramel, dried fruit, cocoa. Crafted by Ron Zacapa (Guatemala) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Guatemala",
    "sortOrder": 1,
    "brand": "Ron Zacapa",
    "tags": [
      "Rum",
      "Guatemala"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/ron_zacapa_rum_xo_centenario_750ml.jpg?v=1655332744"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/ron_zacapa_rum_xo_centenario_750ml.jpg?v=1655332744",
    "customFields": [
      {
        "id": "cf-39-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "appleton-estate-21-year",
    "name": "Appleton Estate 21 Year",
    "slug": "appleton-estate-21-year",
    "category": "spirits",
    "subcategory": "rum",
    "shortDescription": "Appleton Estate 21 Year offers a distinctive profile with notes of orange peel, molasses, oak.",
    "description": "Appleton Estate 21 Year is a rum expression from Appleton Estate, associated with Jamaica. Its tasting profile brings together orange peel, molasses, oak. Crafted by Appleton Estate (Jamaica) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Jamaica",
    "sortOrder": 2,
    "brand": "Appleton Estate",
    "tags": [
      "Rum",
      "Jamaica",
      "21 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/products/Appleton-Estate-21-Year.jpg?v=1685192088"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/products/Appleton-Estate-21-Year.jpg?v=1685192088",
    "customFields": [
      {
        "id": "cf-40-1",
        "label": "Age",
        "value": "21 Years",
        "showOnCard": true
      },
      {
        "id": "cf-40-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "diplomatico-ambassador",
    "name": "Diplomático Ambassador",
    "slug": "diplomatico-ambassador",
    "category": "spirits",
    "subcategory": "rum",
    "shortDescription": "Diplomático Ambassador offers a distinctive profile with notes of dark chocolate, dried fruit, spice.",
    "description": "Diplomático Ambassador is a rum expression from Diplomático, associated with Venezuela. Its tasting profile brings together dark chocolate, dried fruit, spice. Crafted by Diplomático (Venezuela) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 47,
    "origin": "Venezuela",
    "sortOrder": 3,
    "brand": "Diplomático",
    "tags": [
      "Rum",
      "Venezuela"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/screenshot_2021-07-23_120959.png?v=1655375690"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/screenshot_2021-07-23_120959.png?v=1655375690",
    "customFields": [
      {
        "id": "cf-41-1",
        "label": "Proof",
        "value": "94",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "el-dorado-21-year",
    "name": "El Dorado 21 Year",
    "slug": "el-dorado-21-year",
    "category": "spirits",
    "subcategory": "rum",
    "shortDescription": "El Dorado 21 Year offers a distinctive profile with notes of toffee, tropical fruit, oak.",
    "description": "El Dorado 21 Year is a rum expression from El Dorado, associated with Guyana. Its tasting profile brings together toffee, tropical fruit, oak. Crafted by El Dorado (Guyana) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Guyana",
    "sortOrder": 4,
    "brand": "El Dorado",
    "tags": [
      "Rum",
      "Guyana",
      "21 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/el-dorado-21-year-old-special-reserve-rum__99224.jpg?v=1765205247"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/el-dorado-21-year-old-special-reserve-rum__99224.jpg?v=1765205247",
    "customFields": [
      {
        "id": "cf-42-1",
        "label": "Age",
        "value": "21 Years",
        "showOnCard": true
      },
      {
        "id": "cf-42-2",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "mount-gay-1703-master-select",
    "name": "Mount Gay 1703 Master Select",
    "slug": "mount-gay-1703-master-select",
    "category": "spirits",
    "subcategory": "rum",
    "shortDescription": "Mount Gay 1703 Master Select offers a distinctive profile with notes of vanilla, banana, oak.",
    "description": "Mount Gay 1703 Master Select is a rum expression from Mount Gay, associated with Barbados. Its tasting profile brings together vanilla, banana, oak. Crafted by Mount Gay (Barbados) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43,
    "origin": "Barbados",
    "sortOrder": 5,
    "brand": "Mount Gay",
    "tags": [
      "Rum",
      "Barbados"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/mount-gay-1703-collection-masterselect__53581.jpg?v=1767864567"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/mount-gay-1703-collection-masterselect__53581.jpg?v=1767864567",
    "customFields": [
      {
        "id": "cf-43-1",
        "label": "Proof",
        "value": "86",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "flor-de-cana-25-year",
    "name": "Flor de Caña 25 Year",
    "slug": "flor-de-cana-25-year",
    "category": "spirits",
    "subcategory": "rum",
    "shortDescription": "Flor de Caña 25 Year offers a distinctive profile with notes of caramel, cocoa, nuts.",
    "description": "Flor de Caña 25 Year is a rum expression from Flor de Caña, associated with Nicaragua. Its tasting profile brings together caramel, cocoa, nuts. Crafted by Flor de Caña (Nicaragua) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Nicaragua",
    "sortOrder": 6,
    "brand": "Flor de Caña",
    "tags": [
      "Rum",
      "Nicaragua",
      "25 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/flor-de-cana-rum-25yr-750ml__80456.jpg?v=1767866375"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/flor-de-cana-rum-25yr-750ml__80456.jpg?v=1767866375",
    "customFields": [
      {
        "id": "cf-44-1",
        "label": "Age",
        "value": "25 Years",
        "showOnCard": true
      },
      {
        "id": "cf-44-2",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "monkey-47-schwarzwald-dry-gin",
    "name": "Monkey 47 Schwarzwald Dry Gin",
    "slug": "monkey-47-schwarzwald-dry-gin",
    "category": "spirits",
    "subcategory": "gin",
    "shortDescription": "Monkey 47 Schwarzwald Dry Gin offers a distinctive profile with notes of juniper, citrus, herbs.",
    "description": "Monkey 47 Schwarzwald Dry Gin is a gin expression from Monkey 47, associated with Germany. Its tasting profile brings together juniper, citrus, herbs. Crafted by Monkey 47 (Germany) and bottled in 500 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "500 mL",
    "abv": 47,
    "origin": "Germany",
    "sortOrder": 1,
    "brand": "Monkey 47",
    "tags": [
      "Gin",
      "Germany"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/18_2.jpg?v=1655359205"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/18_2.jpg?v=1655359205",
    "customFields": [
      {
        "id": "cf-45-1",
        "label": "Proof",
        "value": "94",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "nolet-s-reserve-dry-gin",
    "name": "Nolet's Reserve Dry Gin",
    "slug": "nolet-s-reserve-dry-gin",
    "category": "spirits",
    "subcategory": "gin",
    "shortDescription": "Nolet's Reserve Dry Gin offers a distinctive profile with notes of juniper, floral notes, spice.",
    "description": "Nolet's Reserve Dry Gin is a gin expression from Nolet's, associated with Netherlands. Its tasting profile brings together juniper, floral notes, spice. Crafted by Nolet's (Netherlands) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 52.3,
    "origin": "Netherlands",
    "sortOrder": 2,
    "brand": "Nolet's",
    "tags": [
      "Gin",
      "Netherlands"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/buy-nolets-reserve-dry-gin__14985.jpg?v=1767744669"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/buy-nolets-reserve-dry-gin__14985.jpg?v=1767744669",
    "customFields": [
      {
        "id": "cf-46-1",
        "label": "Proof",
        "value": "104.6",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "ki-no-bi-kyoto-dry-gin",
    "name": "Ki No Bi Kyoto Dry Gin",
    "slug": "ki-no-bi-kyoto-dry-gin",
    "category": "spirits",
    "subcategory": "gin",
    "shortDescription": "Ki No Bi Kyoto Dry Gin offers a distinctive profile with notes of yuzu, juniper, tea.",
    "description": "Ki No Bi Kyoto Dry Gin is a gin expression from Ki No Bi, associated with Japan. Its tasting profile brings together yuzu, juniper, tea. Crafted by Ki No Bi (Japan) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 45.7,
    "origin": "Japan",
    "sortOrder": 3,
    "brand": "Ki No Bi",
    "tags": [
      "Gin",
      "Japan"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0069/8141/9069/products/KinobiKyotoDryGin.jpg?v=1613751828"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0069/8141/9069/products/KinobiKyotoDryGin.jpg?v=1613751828",
    "customFields": [
      {
        "id": "cf-47-1",
        "label": "Proof",
        "value": "91.4",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "the-botanist-islay-dry-gin",
    "name": "The Botanist Islay Dry Gin",
    "slug": "the-botanist-islay-dry-gin",
    "category": "spirits",
    "subcategory": "gin",
    "shortDescription": "The Botanist Islay Dry Gin offers a distinctive profile with notes of juniper, herbs, citrus.",
    "description": "The Botanist Islay Dry Gin is a gin expression from The Botanist, associated with Scotland. Its tasting profile brings together juniper, herbs, citrus. Crafted by The Botanist (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 46,
    "origin": "Scotland",
    "sortOrder": 4,
    "brand": "The Botanist",
    "tags": [
      "Gin",
      "Scotland"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/THE_BOTANIST_GIN_DRY_ISLAY_SCOTLAND_1.75LI.png?v=1758857592"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/THE_BOTANIST_GIN_DRY_ISLAY_SCOTLAND_1.75LI.png?v=1758857592",
    "customFields": [
      {
        "id": "cf-48-1",
        "label": "Proof",
        "value": "92",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "hendrick-s-grand-cabaret",
    "name": "Hendrick's Grand Cabaret",
    "slug": "hendrick-s-grand-cabaret",
    "category": "spirits",
    "subcategory": "gin",
    "shortDescription": "Hendrick's Grand Cabaret offers a distinctive profile with notes of stone fruit, rose, juniper.",
    "description": "Hendrick's Grand Cabaret is a gin expression from Hendrick's, associated with Scotland. Its tasting profile brings together stone fruit, rose, juniper. Crafted by Hendrick's (Scotland) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 43.4,
    "origin": "Scotland",
    "sortOrder": 5,
    "brand": "Hendrick's",
    "tags": [
      "Gin",
      "Scotland"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/hendricks-grand-cabaret-gin.png?v=1705694115"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/hendricks-grand-cabaret-gin.png?v=1705694115",
    "customFields": [
      {
        "id": "cf-49-1",
        "label": "Proof",
        "value": "86.8",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "remy-martin-louis-xiii",
    "name": "Rémy Martin Louis XIII",
    "slug": "remy-martin-louis-xiii",
    "category": "spirits",
    "subcategory": "cognac",
    "shortDescription": "Rémy Martin Louis XIII offers a distinctive profile with notes of dried fruit, flowers, spice.",
    "description": "Rémy Martin Louis XIII is a cognac expression from Louis XIII, associated with Cognac, France. Its tasting profile brings together dried fruit, flowers, spice. Crafted by Louis XIII (Cognac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Cognac, France",
    "sortOrder": 1,
    "brand": "Louis XIII",
    "tags": [
      "Cognac",
      "France"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://applejack.com/site/images/Remy-Martin-Louis-XIII-Cognac-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Remy-Martin-Louis-XIII-Cognac-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-50-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "hennessy-richard",
    "name": "Hennessy Richard",
    "slug": "hennessy-richard",
    "category": "spirits",
    "subcategory": "cognac",
    "shortDescription": "Hennessy Richard offers a distinctive profile with notes of fig, oak, spice.",
    "description": "Hennessy Richard is a cognac expression from Hennessy, associated with Cognac, France. Its tasting profile brings together fig, oak, spice. Crafted by Hennessy (Cognac, France) and bottled in 700 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "700 mL",
    "abv": 40,
    "origin": "Cognac, France",
    "sortOrder": 2,
    "brand": "Hennessy",
    "tags": [
      "Cognac",
      "France"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/HENNESSY_COGNAC_RICHARD_FRANCE_700ML.png?v=1757800070"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/HENNESSY_COGNAC_RICHARD_FRANCE_700ML.png?v=1757800070",
    "customFields": [
      {
        "id": "cf-51-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "hennessy-paradis",
    "name": "Hennessy Paradis",
    "slug": "hennessy-paradis",
    "category": "spirits",
    "subcategory": "cognac",
    "shortDescription": "Hennessy Paradis offers a distinctive profile with notes of floral notes, honey, fruit.",
    "description": "Hennessy Paradis is a cognac expression from Hennessy, associated with Cognac, France. Its tasting profile brings together floral notes, honey, fruit. Crafted by Hennessy (Cognac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Cognac, France",
    "sortOrder": 3,
    "brand": "Hennessy",
    "tags": [
      "Cognac",
      "France"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/HennessyParadisBottleandGiftBox.png?v=1794469356"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/HennessyParadisBottleandGiftBox.png?v=1794469356",
    "customFields": [
      {
        "id": "cf-52-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "hennessy-xo",
    "name": "Hennessy XO",
    "slug": "hennessy-xo",
    "category": "spirits",
    "subcategory": "cognac",
    "shortDescription": "Hennessy XO offers a distinctive profile with notes of candied fruit, chocolate, oak.",
    "description": "Hennessy XO is a cognac expression from Hennessy, associated with Cognac, France. Its tasting profile brings together candied fruit, chocolate, oak. Crafted by Hennessy (Cognac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Cognac, France",
    "sortOrder": 4,
    "brand": "Hennessy",
    "tags": [
      "Cognac",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Hennessy-XO-Cognac-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Hennessy-XO-Cognac-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-53-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "remy-martin-xo",
    "name": "Rémy Martin XO",
    "slug": "remy-martin-xo",
    "category": "spirits",
    "subcategory": "cognac",
    "shortDescription": "Rémy Martin XO offers a distinctive profile with notes of fig, orange, spice.",
    "description": "Rémy Martin XO is a cognac expression from Rémy Martin, associated with Cognac, France. Its tasting profile brings together fig, orange, spice. Crafted by Rémy Martin (Cognac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Cognac, France",
    "sortOrder": 5,
    "brand": "Rémy Martin",
    "tags": [
      "Cognac",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/remy-xo-lunar-2027.png?v=1791435996"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/remy-xo-lunar-2027.png?v=1791435996",
    "customFields": [
      {
        "id": "cf-54-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "martell-cordon-bleu",
    "name": "Martell Cordon Bleu",
    "slug": "martell-cordon-bleu",
    "category": "spirits",
    "subcategory": "cognac",
    "shortDescription": "Martell Cordon Bleu offers a distinctive profile with notes of plum, nuts, oak.",
    "description": "Martell Cordon Bleu is a cognac expression from Martell, associated with Cognac, France. Its tasting profile brings together plum, nuts, oak. Crafted by Martell (Cognac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Cognac, France",
    "sortOrder": 6,
    "brand": "Martell",
    "tags": [
      "Cognac",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Martell-Cordon-Bleu-Cognac-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Martell-Cordon-Bleu-Cognac-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-55-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "courvoisier-xo",
    "name": "Courvoisier XO",
    "slug": "courvoisier-xo",
    "category": "spirits",
    "subcategory": "cognac",
    "shortDescription": "Courvoisier XO offers a distinctive profile with notes of dried fruit, vanilla, spice.",
    "description": "Courvoisier XO is a cognac expression from Courvoisier, associated with Cognac, France. Its tasting profile brings together dried fruit, vanilla, spice. Crafted by Courvoisier (Cognac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Cognac, France",
    "sortOrder": 7,
    "brand": "Courvoisier",
    "tags": [
      "Cognac",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/COURVOISIER_COGNAC_XO_ROYAL_FRANCE_700ML.png?v=1759009643"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/COURVOISIER_COGNAC_XO_ROYAL_FRANCE_700ML.png?v=1759009643",
    "customFields": [
      {
        "id": "cf-56-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "torres-jaime-i-reserva-de-la-familia",
    "name": "Torres Jaime I Reserva de la Familia",
    "slug": "torres-jaime-i-reserva-de-la-familia",
    "category": "spirits",
    "subcategory": "brandy",
    "shortDescription": "Torres Jaime I Reserva de la Familia offers a distinctive profile with notes of dried fruit, vanilla, oak.",
    "description": "Torres Jaime I Reserva de la Familia is a brandy expression from Torres, associated with Spain. Its tasting profile brings together dried fruit, vanilla, oak. Crafted by Torres (Spain) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 38,
    "origin": "Spain",
    "sortOrder": 1,
    "brand": "Torres",
    "tags": [
      "Brandy",
      "Spain"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0050/2395/7103/products/torres-30-jaime-i.-brandy-reserva-de-la-famiglia-1.jpg?v=1540631417"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0050/2395/7103/products/torres-30-jaime-i.-brandy-reserva-de-la-famiglia-1.jpg?v=1540631417",
    "customFields": [
      {
        "id": "cf-57-1",
        "label": "Proof",
        "value": "76",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "carlos-i-imperial-xo",
    "name": "Carlos I Imperial XO",
    "slug": "carlos-i-imperial-xo",
    "category": "spirits",
    "subcategory": "brandy",
    "shortDescription": "Carlos I Imperial XO offers a distinctive profile with notes of fig, caramel, spice.",
    "description": "Carlos I Imperial XO is a brandy expression from Carlos I, associated with Spain. Its tasting profile brings together fig, caramel, spice. Crafted by Carlos I (Spain) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Spain",
    "sortOrder": 2,
    "brand": "Carlos I",
    "tags": [
      "Brandy",
      "Spain"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/CARLOS_I_BRANDY_IMPERIAL_XO_SPAIN_750ML.jpg?v=1759884038"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/CARLOS_I_BRANDY_IMPERIAL_XO_SPAIN_750ML.jpg?v=1759884038",
    "customFields": [
      {
        "id": "cf-58-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "asbach-21-year-selection",
    "name": "Asbach 21 Year Selection",
    "slug": "asbach-21-year-selection",
    "category": "spirits",
    "subcategory": "brandy",
    "shortDescription": "Asbach 21 Year Selection offers a distinctive profile with notes of nuts, dried fruit, oak.",
    "description": "Asbach 21 Year Selection is a brandy expression from Asbach, associated with Germany. Its tasting profile brings together nuts, dried fruit, oak. Crafted by Asbach (Germany) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Germany",
    "sortOrder": 3,
    "brand": "Asbach",
    "tags": [
      "Brandy",
      "Germany",
      "21 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/ASBACH_BRANDY_21YR_GERMANY_750ML.png?v=1760066950"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/ASBACH_BRANDY_21YR_GERMANY_750ML.png?v=1760066950",
    "customFields": [
      {
        "id": "cf-59-1",
        "label": "Age",
        "value": "21 Years",
        "showOnCard": true
      },
      {
        "id": "cf-59-2",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "ararat-nairi-20-year",
    "name": "ARARAT Nairi 20 Year",
    "slug": "ararat-nairi-20-year",
    "category": "spirits",
    "subcategory": "brandy",
    "shortDescription": "ARARAT Nairi 20 Year offers a distinctive profile with notes of plum, honey, oak.",
    "description": "ARARAT Nairi 20 Year is a brandy expression from ARARAT, associated with Armenia. Its tasting profile brings together plum, honey, oak. Crafted by ARARAT (Armenia) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Armenia",
    "sortOrder": 4,
    "brand": "ARARAT",
    "tags": [
      "Brandy",
      "Armenia",
      "20 Year"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0069/8141/9069/products/AraratErebuni20YearOldNairiXOBrandy.jpg?v=1655417235"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0069/8141/9069/products/AraratErebuni20YearOldNairiXOBrandy.jpg?v=1655417235",
    "customFields": [
      {
        "id": "cf-60-1",
        "label": "Age",
        "value": "20 Years",
        "showOnCard": true
      },
      {
        "id": "cf-60-2",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "chateau-lafite-rothschild",
    "name": "Château Lafite Rothschild",
    "slug": "chateau-lafite-rothschild",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Château Lafite Rothschild offers a distinctive profile with notes of cassis, cedar, graphite.",
    "description": "Château Lafite Rothschild is a red wine expression from Château Lafite Rothschild, associated with Pauillac, France. Its tasting profile brings together cassis, cedar, graphite. Crafted by Château Lafite Rothschild (Pauillac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 13.5,
    "origin": "Pauillac, France",
    "sortOrder": 1,
    "brand": "Château Lafite Rothschild",
    "tags": [
      "Red Wine",
      "Pauillac"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://cdn.shopify.com/s/files/1/0363/8621/files/Chateau_Lafite_Rothschild_2000_Pauillac_750ml.jpg?v=1792851449"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0363/8621/files/Chateau_Lafite_Rothschild_2000_Pauillac_750ml.jpg?v=1792851449",
    "customFields": [
      {
        "id": "cf-61-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "chateau-margaux-grand-vin",
    "name": "Château Margaux Grand Vin",
    "slug": "chateau-margaux-grand-vin",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Château Margaux Grand Vin offers a distinctive profile with notes of blackcurrant, violet, cedar.",
    "description": "Château Margaux Grand Vin is a red wine expression from Château Margaux, associated with Margaux, France. Its tasting profile brings together blackcurrant, violet, cedar. Crafted by Château Margaux (Margaux, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 13.5,
    "origin": "Margaux, France",
    "sortOrder": 2,
    "brand": "Château Margaux",
    "tags": [
      "Red Wine",
      "Margaux"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/2021-Chateau-Margaux-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/2021-Chateau-Margaux-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-62-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "chateau-mouton-rothschild",
    "name": "Château Mouton Rothschild",
    "slug": "chateau-mouton-rothschild",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Château Mouton Rothschild offers a distinctive profile with notes of cassis, tobacco, spice.",
    "description": "Château Mouton Rothschild is a red wine expression from Château Mouton Rothschild, associated with Pauillac, France. Its tasting profile brings together cassis, tobacco, spice. Crafted by Château Mouton Rothschild (Pauillac, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 13.5,
    "origin": "Pauillac, France",
    "sortOrder": 3,
    "brand": "Château Mouton Rothschild",
    "tags": [
      "Red Wine",
      "Pauillac"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0363/8621/files/Ch_teau_Mouton_Rothschild_2021_Pauillac_750ml.jpg?v=1792851835"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0363/8621/files/Ch_teau_Mouton_Rothschild_2021_Pauillac_750ml.jpg?v=1792851835",
    "customFields": [
      {
        "id": "cf-63-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "opus-one-napa-valley",
    "name": "Opus One Napa Valley",
    "slug": "opus-one-napa-valley",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Opus One Napa Valley offers a distinctive profile with notes of black cherry, cassis, cocoa.",
    "description": "Opus One Napa Valley is a red wine expression from Opus One, associated with Napa Valley, USA. Its tasting profile brings together black cherry, cassis, cocoa. Crafted by Opus One (Napa Valley, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14,
    "origin": "Napa Valley, USA",
    "sortOrder": 4,
    "brand": "Opus One",
    "tags": [
      "Red Wine",
      "Napa Valley"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0363/8621/files/263558F0-3F98-45BB-BDE4-137F2CB26D3E_1_201_a.jpg?v=1788384174"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0363/8621/files/263558F0-3F98-45BB-BDE4-137F2CB26D3E_1_201_a.jpg?v=1788384174",
    "customFields": [
      {
        "id": "cf-64-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "caymus-special-selection-cabernet-sauvignon",
    "name": "Caymus Special Selection Cabernet Sauvignon",
    "slug": "caymus-special-selection-cabernet-sauvignon",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Caymus Special Selection Cabernet Sauvignon offers a distinctive profile with notes of blackberry, vanilla, cocoa.",
    "description": "Caymus Special Selection Cabernet Sauvignon is a red wine expression from Caymus, associated with Napa Valley, USA. Its tasting profile brings together blackberry, vanilla, cocoa. Crafted by Caymus (Napa Valley, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 15.2,
    "origin": "Napa Valley, USA",
    "sortOrder": 5,
    "brand": "Caymus",
    "tags": [
      "Red Wine",
      "Napa Valley"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0363/8621/files/Caymus_2020_Cabernet_Sauvignon_Napa_Valley_Special_Selection.jpg?v=1763155959"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0363/8621/files/Caymus_2020_Cabernet_Sauvignon_Napa_Valley_Special_Selection.jpg?v=1763155959",
    "customFields": [
      {
        "id": "cf-65-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "screaming-eagle-cabernet-sauvignon",
    "name": "Screaming Eagle Cabernet Sauvignon",
    "slug": "screaming-eagle-cabernet-sauvignon",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Screaming Eagle Cabernet Sauvignon offers a distinctive profile with notes of cassis, violet, dark fruit.",
    "description": "Screaming Eagle Cabernet Sauvignon is a red wine expression from Screaming Eagle, associated with Napa Valley, USA. Its tasting profile brings together cassis, violet, dark fruit. Crafted by Screaming Eagle (Napa Valley, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14.8,
    "origin": "Napa Valley, USA",
    "sortOrder": 6,
    "brand": "Screaming Eagle",
    "tags": [
      "Red Wine",
      "Napa Valley"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/11260/11548/screaming-eagle-napa-cabernet__34204.1752495374.1280.1280__96035.1793304768.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/11260/11548/screaming-eagle-napa-cabernet__34204.1752495374.1280.1280__96035.1793304768.jpg?c=1",
    "customFields": [
      {
        "id": "cf-66-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "petrus-pomerol",
    "name": "Pétrus Pomerol",
    "slug": "petrus-pomerol",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Pétrus Pomerol offers a distinctive profile with notes of plum, truffle, dark fruit.",
    "description": "Pétrus Pomerol is a red wine expression from Pétrus, associated with Pomerol, France. Its tasting profile brings together plum, truffle, dark fruit. Crafted by Pétrus (Pomerol, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14.5,
    "origin": "Pomerol, France",
    "sortOrder": 7,
    "brand": "Pétrus",
    "tags": [
      "Red Wine",
      "Pomerol"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/11449/11749/chateau-petrus-pomerol-1971__98792.1780317414.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/11449/11749/chateau-petrus-pomerol-1971__98792.1780317414.jpg?c=1",
    "customFields": [
      {
        "id": "cf-67-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "tenuta-san-guido-sassicaia",
    "name": "Tenuta San Guido Sassicaia",
    "slug": "tenuta-san-guido-sassicaia",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Tenuta San Guido Sassicaia offers a distinctive profile with notes of blackcurrant, herbs, cedar.",
    "description": "Tenuta San Guido Sassicaia is a red wine expression from Tenuta San Guido, associated with Bolgheri, Italy. Its tasting profile brings together blackcurrant, herbs, cedar. Crafted by Tenuta San Guido (Bolgheri, Italy) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14,
    "origin": "Bolgheri, Italy",
    "sortOrder": 8,
    "brand": "Tenuta San Guido",
    "tags": [
      "Red Wine",
      "Bolgheri"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/2021-Sassicaia-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/2021-Sassicaia-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-68-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "penfolds-grange",
    "name": "Penfolds Grange",
    "slug": "penfolds-grange",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Penfolds Grange offers a distinctive profile with notes of blackberry, licorice, oak.",
    "description": "Penfolds Grange is a red wine expression from Penfolds, associated with Australia. Its tasting profile brings together blackberry, licorice, oak. Crafted by Penfolds (Australia) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14.5,
    "origin": "Australia",
    "sortOrder": 9,
    "brand": "Penfolds",
    "tags": [
      "Red Wine",
      "Australia"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/16784/16826/penfolds-grange-bin-95-shiraz__66893.1793623904.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/16784/16826/penfolds-grange-bin-95-shiraz__66893.1793623904.jpg?c=1",
    "customFields": [
      {
        "id": "cf-69-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "dominus-estate-napa-valley",
    "name": "Dominus Estate Napa Valley",
    "slug": "dominus-estate-napa-valley",
    "category": "wines",
    "subcategory": "red-wine",
    "shortDescription": "Dominus Estate Napa Valley offers a distinctive profile with notes of cassis, earth, cedar.",
    "description": "Dominus Estate Napa Valley is a red wine expression from Dominus Estate, associated with Napa Valley, USA. Its tasting profile brings together cassis, earth, cedar. Crafted by Dominus Estate (Napa Valley, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14.5,
    "origin": "Napa Valley, USA",
    "sortOrder": 10,
    "brand": "Dominus Estate",
    "tags": [
      "Red Wine",
      "Napa Valley"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/974C84C8-C0FB-4C13-87DE-F8ACCFA78CA9.png?v=1768148388"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/974C84C8-C0FB-4C13-87DE-F8ACCFA78CA9.png?v=1768148388",
    "customFields": [
      {
        "id": "cf-70-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "domaine-de-la-romanee-conti-montrachet",
    "name": "Domaine de la Romanée-Conti Montrachet",
    "slug": "domaine-de-la-romanee-conti-montrachet",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Domaine de la Romanée-Conti Montrachet offers a distinctive profile with notes of citrus, stone fruit, mineral.",
    "description": "Domaine de la Romanée-Conti Montrachet is a white wine expression from Domaine de la Romanée-Conti, associated with Burgundy, France. Its tasting profile brings together citrus, stone fruit, mineral. Crafted by Domaine de la Romanée-Conti (Burgundy, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 13.5,
    "origin": "Burgundy, France",
    "sortOrder": 1,
    "brand": "Domaine de la Romanée-Conti",
    "tags": [
      "White Wine",
      "Burgundy"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/11053/11344/drc-domaine-de-la-romanee-conti-la-tache__53513.1794922502.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/11053/11344/drc-domaine-de-la-romanee-conti-la-tache__53513.1794922502.jpg?c=1",
    "customFields": [
      {
        "id": "cf-71-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "chateau-haut-brion-blanc",
    "name": "Château Haut-Brion Blanc",
    "slug": "chateau-haut-brion-blanc",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Château Haut-Brion Blanc offers a distinctive profile with notes of citrus, pear, wax.",
    "description": "Château Haut-Brion Blanc is a white wine expression from Château Haut-Brion, associated with Bordeaux, France. Its tasting profile brings together citrus, pear, wax. Crafted by Château Haut-Brion (Bordeaux, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14,
    "origin": "Bordeaux, France",
    "sortOrder": 2,
    "brand": "Château Haut-Brion",
    "tags": [
      "White Wine",
      "Bordeaux"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/2020-Chateau-Larrivet-Haut-Brion-Blanc-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/2020-Chateau-Larrivet-Haut-Brion-Blanc-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-72-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "domaine-leflaive-puligny-montrachet",
    "name": "Domaine Leflaive Puligny-Montrachet",
    "slug": "domaine-leflaive-puligny-montrachet",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Domaine Leflaive Puligny-Montrachet offers a distinctive profile with notes of lemon, white flowers, mineral.",
    "description": "Domaine Leflaive Puligny-Montrachet is a white wine expression from Domaine Leflaive, associated with Burgundy, France. Its tasting profile brings together lemon, white flowers, mineral. Crafted by Domaine Leflaive (Burgundy, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 13.5,
    "origin": "Burgundy, France",
    "sortOrder": 3,
    "brand": "Domaine Leflaive",
    "tags": [
      "White Wine",
      "Burgundy"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Olivier-Leflaive-Puligny-Montrachet-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Olivier-Leflaive-Puligny-Montrachet-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-73-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "kistler-les-noisetiers-chardonnay",
    "name": "Kistler Les Noisetiers Chardonnay",
    "slug": "kistler-les-noisetiers-chardonnay",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Kistler Les Noisetiers Chardonnay offers a distinctive profile with notes of apple, citrus, oak.",
    "description": "Kistler Les Noisetiers Chardonnay is a white wine expression from Kistler, associated with California, USA. Its tasting profile brings together apple, citrus, oak. Crafted by Kistler (California, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14.1,
    "origin": "California, USA",
    "sortOrder": 4,
    "brand": "Kistler",
    "tags": [
      "White Wine",
      "California"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/8931/9181/kistler-les-noisetiers-sonoma-coast-chardonnay__90358.1754742141.1280.1280__92280.1755243156.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/8931/9181/kistler-les-noisetiers-sonoma-coast-chardonnay__90358.1754742141.1280.1280__92280.1755243156.jpg?c=1",
    "customFields": [
      {
        "id": "cf-74-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "peter-michael-belle-cote-chardonnay",
    "name": "Peter Michael Belle Côte Chardonnay",
    "slug": "peter-michael-belle-cote-chardonnay",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Peter Michael Belle Côte Chardonnay offers a distinctive profile with notes of pear, peach, mineral.",
    "description": "Peter Michael Belle Côte Chardonnay is a white wine expression from Peter Michael, associated with California, USA. Its tasting profile brings together pear, peach, mineral. Crafted by Peter Michael (California, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14.8,
    "origin": "California, USA",
    "sortOrder": 5,
    "brand": "Peter Michael",
    "tags": [
      "White Wine",
      "California"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0363/8621/files/Peter_Michael_Winery_2024_Belle_C_te_Chardonnay_Knights_Valley_750ml.jpg?v=1786142637"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0363/8621/files/Peter_Michael_Winery_2024_Belle_C_te_Chardonnay_Knights_Valley_750ml.jpg?v=1786142637",
    "customFields": [
      {
        "id": "cf-75-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "far-niente-chardonnay",
    "name": "Far Niente Chardonnay",
    "slug": "far-niente-chardonnay",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Far Niente Chardonnay offers a distinctive profile with notes of apple, pear, vanilla.",
    "description": "Far Niente Chardonnay is a white wine expression from Far Niente, associated with Napa Valley, USA. Its tasting profile brings together apple, pear, vanilla. Crafted by Far Niente (Napa Valley, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 14.3,
    "origin": "Napa Valley, USA",
    "sortOrder": 6,
    "brand": "Far Niente",
    "tags": [
      "White Wine",
      "Napa Valley"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/far-niente-napa-chardonnay-2021.png?v=1673323005"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/far-niente-napa-chardonnay-2021.png?v=1673323005",
    "customFields": [
      {
        "id": "cf-76-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "cakebread-cellars-chardonnay",
    "name": "Cakebread Cellars Chardonnay",
    "slug": "cakebread-cellars-chardonnay",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Cakebread Cellars Chardonnay offers a distinctive profile with notes of apple, citrus, cream.",
    "description": "Cakebread Cellars Chardonnay is a white wine expression from Cakebread Cellars, associated with Napa Valley, USA. Its tasting profile brings together apple, citrus, cream. Crafted by Cakebread Cellars (Napa Valley, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 13.8,
    "origin": "Napa Valley, USA",
    "sortOrder": 7,
    "brand": "Cakebread Cellars",
    "tags": [
      "White Wine",
      "Napa Valley"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/cakebreadchardonnaynv.png?v=1655381104"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/cakebreadchardonnaynv.png?v=1655381104",
    "customFields": [
      {
        "id": "cf-77-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "cloudy-bay-te-koko-sauvignon-blanc",
    "name": "Cloudy Bay Te Koko Sauvignon Blanc",
    "slug": "cloudy-bay-te-koko-sauvignon-blanc",
    "category": "wines",
    "subcategory": "white-wine",
    "shortDescription": "Cloudy Bay Te Koko Sauvignon Blanc offers a distinctive profile with notes of citrus, tropical fruit, herbs.",
    "description": "Cloudy Bay Te Koko Sauvignon Blanc is a white wine expression from Cloudy Bay, associated with Marlborough, New Zealand. Its tasting profile brings together citrus, tropical fruit, herbs. Crafted by Cloudy Bay (Marlborough, New Zealand) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 13.5,
    "origin": "Marlborough, New Zealand",
    "sortOrder": 8,
    "brand": "Cloudy Bay",
    "tags": [
      "White Wine",
      "Marlborough"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/ymmxbcwzneivywxww6he.jpg?v=1761082288"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/ymmxbcwzneivywxww6he.jpg?v=1761082288",
    "customFields": [
      {
        "id": "cf-78-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "ferrari-giulio-ferrari-riserva-del-fondatore",
    "name": "Ferrari Giulio Ferrari Riserva del Fondatore",
    "slug": "ferrari-giulio-ferrari-riserva-del-fondatore",
    "category": "wines",
    "subcategory": "sparkling-wine",
    "shortDescription": "Ferrari Giulio Ferrari Riserva del Fondatore offers a distinctive profile with notes of citrus, brioche, mineral.",
    "description": "Ferrari Giulio Ferrari Riserva del Fondatore is a sparkling wine expression from Ferrari, associated with Trentino, Italy. Its tasting profile brings together citrus, brioche, mineral. Crafted by Ferrari (Trentino, Italy) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.5,
    "origin": "Trentino, Italy",
    "sortOrder": 1,
    "brand": "Ferrari",
    "tags": [
      "Sparkling Wine",
      "Trentino"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/ferrari-suzuka-f1-champagne.png?v=1714953327"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/ferrari-suzuka-f1-champagne.png?v=1714953327",
    "customFields": [
      {
        "id": "cf-79-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "nyetimber-1086-prestige-cuvee",
    "name": "Nyetimber 1086 Prestige Cuvée",
    "slug": "nyetimber-1086-prestige-cuvee",
    "category": "wines",
    "subcategory": "sparkling-wine",
    "shortDescription": "Nyetimber 1086 Prestige Cuvée offers a distinctive profile with notes of apple, toast, citrus.",
    "description": "Nyetimber 1086 Prestige Cuvée is a sparkling wine expression from Nyetimber, associated with England. Its tasting profile brings together apple, toast, citrus. Crafted by Nyetimber (England) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12,
    "origin": "England",
    "sortOrder": 2,
    "brand": "Nyetimber",
    "tags": [
      "Sparkling Wine",
      "England"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Ca-Del-Bosco-Cuvee-Prestige-Franciacorta-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Ca-Del-Bosco-Cuvee-Prestige-Franciacorta-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-80-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "schramsberg-j-schram-blancs",
    "name": "Schramsberg J. Schram Blancs",
    "slug": "schramsberg-j-schram-blancs",
    "category": "wines",
    "subcategory": "sparkling-wine",
    "shortDescription": "Schramsberg J. Schram Blancs offers a distinctive profile with notes of lemon, brioche, almond.",
    "description": "Schramsberg J. Schram Blancs is a sparkling wine expression from Schramsberg, associated with California, USA. Its tasting profile brings together lemon, brioche, almond. Crafted by Schramsberg (California, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.6,
    "origin": "California, USA",
    "sortOrder": 3,
    "brand": "Schramsberg",
    "tags": [
      "Sparkling Wine",
      "California"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/schramsberg-sparkling-blanc-de-blanc-2012.jpg?v=1655305886"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/products/schramsberg-sparkling-blanc-de-blanc-2012.jpg?v=1655305886",
    "customFields": [
      {
        "id": "cf-81-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "roederer-estate-l-ermitage-brut",
    "name": "Roederer Estate L'Ermitage Brut",
    "slug": "roederer-estate-l-ermitage-brut",
    "category": "wines",
    "subcategory": "sparkling-wine",
    "shortDescription": "Roederer Estate L'Ermitage Brut offers a distinctive profile with notes of pear, apple, toast.",
    "description": "Roederer Estate L'Ermitage Brut is a sparkling wine expression from Roederer Estate, associated with Anderson Valley, USA. Its tasting profile brings together pear, apple, toast. Crafted by Roederer Estate (Anderson Valley, USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.5,
    "origin": "Anderson Valley, USA",
    "sortOrder": 4,
    "brand": "Roederer Estate",
    "tags": [
      "Sparkling Wine",
      "Anderson Valley"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0363/8621/files/Roederer_Estate_2015_Brut_Ros_L_Ermitage_Anderson_Valley_Sparkling_Wine_750ml.png?v=1780360673"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0363/8621/files/Roederer_Estate_2015_Brut_Ros_L_Ermitage_Anderson_Valley_Sparkling_Wine_750ml.png?v=1780360673",
    "customFields": [
      {
        "id": "cf-82-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "gramona-celler-batlle",
    "name": "Gramona Celler Batlle",
    "slug": "gramona-celler-batlle",
    "category": "wines",
    "subcategory": "sparkling-wine",
    "shortDescription": "Gramona Celler Batlle offers a distinctive profile with notes of citrus, nuts, toast.",
    "description": "Gramona Celler Batlle is a sparkling wine expression from Gramona, associated with Penedès, Spain. Its tasting profile brings together citrus, nuts, toast. Crafted by Gramona (Penedès, Spain) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12,
    "origin": "Penedès, Spain",
    "sortOrder": 5,
    "brand": "Gramona",
    "tags": [
      "Sparkling Wine",
      "Penedès"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/13747/14063/gramona-imperial-cava__08132.1754742251.1280.1280__62947.1755243888.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/13747/14063/gramona-imperial-cava__08132.1754742251.1280.1280__62947.1755243888.jpg?c=1",
    "customFields": [
      {
        "id": "cf-83-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "nino-franco-grave-di-stecca-brut",
    "name": "Nino Franco Grave di Stecca Brut",
    "slug": "nino-franco-grave-di-stecca-brut",
    "category": "wines",
    "subcategory": "sparkling-wine",
    "shortDescription": "Nino Franco Grave di Stecca Brut offers a distinctive profile with notes of apple, pear, flowers.",
    "description": "Nino Franco Grave di Stecca Brut is a sparkling wine expression from Nino Franco, associated with Veneto, Italy. Its tasting profile brings together apple, pear, flowers. Crafted by Nino Franco (Veneto, Italy) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 11.5,
    "origin": "Veneto, Italy",
    "sortOrder": 6,
    "brand": "Nino Franco",
    "tags": [
      "Sparkling Wine",
      "Veneto"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Nino-Franco-Prosecco-Rustico-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Nino-Franco-Prosecco-Rustico-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-84-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "dom-perignon-vintage",
    "name": "Dom Pérignon Vintage",
    "slug": "dom-perignon-vintage",
    "category": "wines",
    "subcategory": "champagne",
    "shortDescription": "Dom Pérignon Vintage offers a distinctive profile with notes of citrus, toast, mineral.",
    "description": "Dom Pérignon Vintage is a champagne expression from Dom Pérignon, associated with Champagne, France. Its tasting profile brings together citrus, toast, mineral. Crafted by Dom Pérignon (Champagne, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.5,
    "origin": "Champagne, France",
    "sortOrder": 1,
    "brand": "Dom Pérignon",
    "tags": [
      "Champagne",
      "France"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://cdn.shopify.com/s/files/1/0363/8621/files/Dom_P_rignon_Vintage_2008_P2_Pl_nitude_Deuxi_me_Brut_Champagne_750ml.jpg?v=1793048576"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0363/8621/files/Dom_P_rignon_Vintage_2008_P2_Pl_nitude_Deuxi_me_Brut_Champagne_750ml.jpg?v=1793048576",
    "customFields": [
      {
        "id": "cf-85-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "louis-roederer-cristal",
    "name": "Louis Roederer Cristal",
    "slug": "louis-roederer-cristal",
    "category": "wines",
    "subcategory": "champagne",
    "shortDescription": "Louis Roederer Cristal offers a distinctive profile with notes of citrus, white fruit, chalk.",
    "description": "Louis Roederer Cristal is a champagne expression from Louis Roederer, associated with Champagne, France. Its tasting profile brings together citrus, white fruit, chalk. Crafted by Louis Roederer (Champagne, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12,
    "origin": "Champagne, France",
    "sortOrder": 2,
    "brand": "Louis Roederer",
    "tags": [
      "Champagne",
      "France"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/2009-Louis-Roederer-Brut-Cristal-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/2009-Louis-Roederer-Brut-Cristal-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-86-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "armand-de-brignac-ace-of-spades-gold-brut",
    "name": "Armand de Brignac Ace of Spades Gold Brut",
    "slug": "armand-de-brignac-ace-of-spades-gold-brut",
    "category": "wines",
    "subcategory": "champagne",
    "shortDescription": "Armand de Brignac Ace of Spades Gold Brut offers a distinctive profile with notes of peach, brioche, citrus.",
    "description": "Armand de Brignac Ace of Spades Gold Brut is a champagne expression from Armand de Brignac, associated with Champagne, France. Its tasting profile brings together peach, brioche, citrus. Crafted by Armand de Brignac (Champagne, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.5,
    "origin": "Champagne, France",
    "sortOrder": 3,
    "brand": "Armand de Brignac",
    "tags": [
      "Champagne",
      "France"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/download-2024-04-09T105621.058.jpg?v=1712685399"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/download-2024-04-09T105621.058.jpg?v=1712685399",
    "customFields": [
      {
        "id": "cf-87-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "krug-grande-cuvee",
    "name": "Krug Grande Cuvée",
    "slug": "krug-grande-cuvee",
    "category": "wines",
    "subcategory": "champagne",
    "shortDescription": "Krug Grande Cuvée offers a distinctive profile with notes of apple, nuts, toast.",
    "description": "Krug Grande Cuvée is a champagne expression from Krug, associated with Champagne, France. Its tasting profile brings together apple, nuts, toast. Crafted by Krug (Champagne, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.5,
    "origin": "Champagne, France",
    "sortOrder": 4,
    "brand": "Krug",
    "tags": [
      "Champagne",
      "France"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/jksyvf5wju9p0ig2vu25.jpg?v=1779411959"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/jksyvf5wju9p0ig2vu25.jpg?v=1779411959",
    "customFields": [
      {
        "id": "cf-88-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "perrier-jouet-belle-epoque",
    "name": "Perrier-Jouët Belle Epoque",
    "slug": "perrier-jouet-belle-epoque",
    "category": "wines",
    "subcategory": "champagne",
    "shortDescription": "Perrier-Jouët Belle Epoque offers a distinctive profile with notes of white flowers, pear, citrus.",
    "description": "Perrier-Jouët Belle Epoque is a champagne expression from Perrier-Jouët, associated with Champagne, France. Its tasting profile brings together white flowers, pear, citrus. Crafted by Perrier-Jouët (Champagne, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.5,
    "origin": "Champagne, France",
    "sortOrder": 5,
    "brand": "Perrier-Jouët",
    "tags": [
      "Champagne",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/utugrctl4fnvyeo0a3a7.jpg?v=1701460788"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/utugrctl4fnvyeo0a3a7.jpg?v=1701460788",
    "customFields": [
      {
        "id": "cf-89-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "veuve-clicquot-la-grande-dame",
    "name": "Veuve Clicquot La Grande Dame",
    "slug": "veuve-clicquot-la-grande-dame",
    "category": "wines",
    "subcategory": "champagne",
    "shortDescription": "Veuve Clicquot La Grande Dame offers a distinctive profile with notes of citrus, apple, brioche.",
    "description": "Veuve Clicquot La Grande Dame is a champagne expression from Veuve Clicquot, associated with Champagne, France. Its tasting profile brings together citrus, apple, brioche. Crafted by Veuve Clicquot (Champagne, France) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 12.5,
    "origin": "Champagne, France",
    "sortOrder": 6,
    "brand": "Veuve Clicquot",
    "tags": [
      "Champagne",
      "France"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Veuve-Clicquot-La-Grande-Dame-Champagne-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Veuve-Clicquot-La-Grande-Dame-Champagne-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-90-1",
        "label": "Vintage",
        "value": "Current Release",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "michelob-ultra",
    "name": "Michelob Ultra",
    "slug": "michelob-ultra",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Michelob Ultra offers a distinctive profile with notes of light grain, citrus, crisp finish.",
    "description": "Michelob Ultra is a domestic beer expression from Michelob, associated with USA. Its tasting profile brings together light grain, citrus, crisp finish. Crafted by Michelob (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.2,
    "origin": "USA",
    "sortOrder": 1,
    "brand": "Michelob",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Michelob-Ultra-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Michelob-Ultra-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-91-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "budweiser",
    "name": "Budweiser",
    "slug": "budweiser",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Budweiser offers a distinctive profile with notes of malt, grain, mild hops.",
    "description": "Budweiser is a domestic beer expression from Budweiser, associated with USA. Its tasting profile brings together malt, grain, mild hops. Crafted by Budweiser (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 5,
    "origin": "USA",
    "sortOrder": 2,
    "brand": "Budweiser",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Budweiser-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Budweiser-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-92-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "bud-light",
    "name": "Bud Light",
    "slug": "bud-light",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Bud Light offers a distinctive profile with notes of light malt, grain, crisp finish.",
    "description": "Bud Light is a domestic beer expression from Bud Light, associated with USA. Its tasting profile brings together light malt, grain, crisp finish. Crafted by Bud Light (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.2,
    "origin": "USA",
    "sortOrder": 3,
    "brand": "Bud Light",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Bud-Light-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Bud-Light-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-93-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "coors-banquet",
    "name": "Coors Banquet",
    "slug": "coors-banquet",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Coors Banquet offers a distinctive profile with notes of bread, malt, mild hops.",
    "description": "Coors Banquet is a domestic beer expression from Coors, associated with USA. Its tasting profile brings together bread, malt, mild hops. Crafted by Coors (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 5,
    "origin": "USA",
    "sortOrder": 4,
    "brand": "Coors",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Coors-Banquet-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Coors-Banquet-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-94-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "coors-light",
    "name": "Coors Light",
    "slug": "coors-light",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Coors Light offers a distinctive profile with notes of light grain, mild hops, crisp finish.",
    "description": "Coors Light is a domestic beer expression from Coors, associated with USA. Its tasting profile brings together light grain, mild hops, crisp finish. Crafted by Coors (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.2,
    "origin": "USA",
    "sortOrder": 5,
    "brand": "Coors",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Coors-Light-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Coors-Light-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-95-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "miller-lite",
    "name": "Miller Lite",
    "slug": "miller-lite",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Miller Lite offers a distinctive profile with notes of grain, hops, crisp finish.",
    "description": "Miller Lite is a domestic beer expression from Miller, associated with USA. Its tasting profile brings together grain, hops, crisp finish. Crafted by Miller (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.2,
    "origin": "USA",
    "sortOrder": 6,
    "brand": "Miller",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Miller-Lite-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Miller-Lite-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-96-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "miller-genuine-draft",
    "name": "Miller Genuine Draft",
    "slug": "miller-genuine-draft",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Miller Genuine Draft offers a distinctive profile with notes of malt, grain, mild bitterness.",
    "description": "Miller Genuine Draft is a domestic beer expression from Miller, associated with USA. Its tasting profile brings together malt, grain, mild bitterness. Crafted by Miller (USA) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 4.7,
    "origin": "USA",
    "sortOrder": 7,
    "brand": "Miller",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Miller-Genuine-Draft-6pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Miller-Genuine-Draft-6pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-97-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "blue-moon-belgian-white",
    "name": "Blue Moon Belgian White",
    "slug": "blue-moon-belgian-white",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Blue Moon Belgian White offers a distinctive profile with notes of orange peel, wheat, coriander.",
    "description": "Blue Moon Belgian White is a domestic beer expression from Blue Moon, associated with USA. Its tasting profile brings together orange peel, wheat, coriander. Crafted by Blue Moon (USA) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 5.4,
    "origin": "USA",
    "sortOrder": 8,
    "brand": "Blue Moon",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Blue-Moon-Belgian-White-6pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Blue-Moon-Belgian-White-6pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-98-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "samuel-adams-boston-lager",
    "name": "Samuel Adams Boston Lager",
    "slug": "samuel-adams-boston-lager",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Samuel Adams Boston Lager offers a distinctive profile with notes of caramel malt, hops, toast.",
    "description": "Samuel Adams Boston Lager is a domestic beer expression from Samuel Adams, associated with USA. Its tasting profile brings together caramel malt, hops, toast. Crafted by Samuel Adams (USA) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 5,
    "origin": "USA",
    "sortOrder": 9,
    "brand": "Samuel Adams",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Sam-Adams-Lager-6pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Sam-Adams-Lager-6pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-99-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "yuengling-traditional-lager",
    "name": "Yuengling Traditional Lager",
    "slug": "yuengling-traditional-lager",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Yuengling Traditional Lager offers a distinctive profile with notes of caramel, grain, hops.",
    "description": "Yuengling Traditional Lager is a domestic beer expression from Yuengling, associated with USA. Its tasting profile brings together caramel, grain, hops. Crafted by Yuengling (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.5,
    "origin": "USA",
    "sortOrder": 10,
    "brand": "Yuengling",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0227/0581/products/Yuengling-Traditional-Lager-12OZ-BTL_02380b7b-2d69-4c19-914a-3f7f204e949a.jpg?v=1667734140"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0227/0581/products/Yuengling-Traditional-Lager-12OZ-BTL_02380b7b-2d69-4c19-914a-3f7f204e949a.jpg?v=1667734140",
    "customFields": [
      {
        "id": "cf-100-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "shiner-bock",
    "name": "Shiner Bock",
    "slug": "shiner-bock",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Shiner Bock offers a distinctive profile with notes of toasted malt, caramel, mild hops.",
    "description": "Shiner Bock is a domestic beer expression from Shiner, associated with USA. Its tasting profile brings together toasted malt, caramel, mild hops. Crafted by Shiner (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.4,
    "origin": "USA",
    "sortOrder": 11,
    "brand": "Shiner",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Shiner-Bock-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Shiner-Bock-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-101-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "lone-star-beer",
    "name": "Lone Star Beer",
    "slug": "lone-star-beer",
    "category": "beer",
    "subcategory": "domestic-beer",
    "shortDescription": "Lone Star Beer offers a distinctive profile with notes of grain, malt, crisp finish.",
    "description": "Lone Star Beer is a domestic beer expression from Lone Star, associated with USA. Its tasting profile brings together grain, malt, crisp finish. Crafted by Lone Star (USA) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.65,
    "origin": "USA",
    "sortOrder": 12,
    "brand": "Lone Star",
    "tags": [
      "Domestic Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Lone-Star-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Lone-Star-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-102-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "chimay-grande-reserve-blue",
    "name": "Chimay Grande Réserve Blue",
    "slug": "chimay-grande-reserve-blue",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Chimay Grande Réserve Blue offers a distinctive profile with notes of dark fruit, caramel, spice.",
    "description": "Chimay Grande Réserve Blue is a imported beer expression from Chimay, associated with Belgium. Its tasting profile brings together dark fruit, caramel, spice. Crafted by Chimay (Belgium) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 9,
    "origin": "Belgium",
    "sortOrder": 1,
    "brand": "Chimay",
    "tags": [
      "Imported Beer",
      "Belgium"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Chimay-Blue-750-ml-Bottle_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Chimay-Blue-750-ml-Bottle_1.png",
    "customFields": [
      {
        "id": "cf-103-1",
        "label": "Packaging",
        "value": "750 mL",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "duvel-belgian-golden-ale",
    "name": "Duvel Belgian Golden Ale",
    "slug": "duvel-belgian-golden-ale",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Duvel Belgian Golden Ale offers a distinctive profile with notes of pear, spice, hops.",
    "description": "Duvel Belgian Golden Ale is a imported beer expression from Duvel, associated with Belgium. Its tasting profile brings together pear, spice, hops. Crafted by Duvel (Belgium) and bottled in 330 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "330 mL",
    "abv": 8.5,
    "origin": "Belgium",
    "sortOrder": 2,
    "brand": "Duvel",
    "tags": [
      "Imported Beer",
      "Belgium"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/3337/3559/duvel-belgian-golden-ale-750ml__88997.1754742159.1280.1280__71592.1768093319.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/3337/3559/duvel-belgian-golden-ale-750ml__88997.1754742159.1280.1280__71592.1768093319.jpg?c=1",
    "customFields": [
      {
        "id": "cf-104-1",
        "label": "Packaging",
        "value": "330 mL",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "delirium-tremens",
    "name": "Delirium Tremens",
    "slug": "delirium-tremens",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Delirium Tremens offers a distinctive profile with notes of fruit, spice, malt.",
    "description": "Delirium Tremens is a imported beer expression from Delirium, associated with Belgium. Its tasting profile brings together fruit, spice, malt. Crafted by Delirium (Belgium) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 8.5,
    "origin": "Belgium",
    "sortOrder": 3,
    "brand": "Delirium",
    "tags": [
      "Imported Beer",
      "Belgium"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/3334/3560/delirium-tremens-strong-blond-beer-belgium-25oz__54968.1754742206.1280.1280__46516.1781115392.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/3334/3560/delirium-tremens-strong-blond-beer-belgium-25oz__54968.1754742206.1280.1280__46516.1781115392.jpg?c=1",
    "customFields": [
      {
        "id": "cf-105-1",
        "label": "Packaging",
        "value": "750 mL",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "la-trappe-quadrupel",
    "name": "La Trappe Quadrupel",
    "slug": "la-trappe-quadrupel",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "La Trappe Quadrupel offers a distinctive profile with notes of dark fruit, caramel, malt.",
    "description": "La Trappe Quadrupel is a imported beer expression from La Trappe, associated with Netherlands. Its tasting profile brings together dark fruit, caramel, malt. Crafted by La Trappe (Netherlands) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 10,
    "origin": "Netherlands",
    "sortOrder": 4,
    "brand": "La Trappe",
    "tags": [
      "Imported Beer",
      "Netherlands"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/La-Trappe-Quad-750-ml-Bottle_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/La-Trappe-Quad-750-ml-Bottle_1.png",
    "customFields": [
      {
        "id": "cf-106-1",
        "label": "Packaging",
        "value": "750 mL",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "stella-artois",
    "name": "Stella Artois",
    "slug": "stella-artois",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Stella Artois offers a distinctive profile with notes of grain, hops, crisp finish.",
    "description": "Stella Artois is a imported beer expression from Stella Artois, associated with Belgium. Its tasting profile brings together grain, hops, crisp finish. Crafted by Stella Artois (Belgium) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 5,
    "origin": "Belgium",
    "sortOrder": 5,
    "brand": "Stella Artois",
    "tags": [
      "Imported Beer",
      "Belgium"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Stella-Artois-6pk-11-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Stella-Artois-6pk-11-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-107-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "heineken-original",
    "name": "Heineken Original",
    "slug": "heineken-original",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Heineken Original offers a distinctive profile with notes of malt, herbal hops, crisp finish.",
    "description": "Heineken Original is a imported beer expression from Heineken, associated with Netherlands. Its tasting profile brings together malt, herbal hops, crisp finish. Crafted by Heineken (Netherlands) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 5,
    "origin": "Netherlands",
    "sortOrder": 6,
    "brand": "Heineken",
    "tags": [
      "Imported Beer",
      "Netherlands"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Heineken-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Heineken-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-108-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "modelo-especial",
    "name": "Modelo Especial",
    "slug": "modelo-especial",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Modelo Especial offers a distinctive profile with notes of grain, malt, mild hops.",
    "description": "Modelo Especial is a imported beer expression from Modelo, associated with Mexico. Its tasting profile brings together grain, malt, mild hops. Crafted by Modelo (Mexico) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.4,
    "origin": "Mexico",
    "sortOrder": 7,
    "brand": "Modelo",
    "tags": [
      "Imported Beer",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Modelo-Especial-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Modelo-Especial-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-109-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "modelo-negra",
    "name": "Modelo Negra",
    "slug": "modelo-negra",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Modelo Negra offers a distinctive profile with notes of toasted malt, caramel, nuts.",
    "description": "Modelo Negra is a imported beer expression from Modelo, associated with Mexico. Its tasting profile brings together toasted malt, caramel, nuts. Crafted by Modelo (Mexico) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 5.4,
    "origin": "Mexico",
    "sortOrder": 8,
    "brand": "Modelo",
    "tags": [
      "Imported Beer",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Negra-Modelo-6pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Negra-Modelo-6pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-110-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "corona-extra",
    "name": "Corona Extra",
    "slug": "corona-extra",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Corona Extra offers a distinctive profile with notes of light grain, citrus, mild hops.",
    "description": "Corona Extra is a imported beer expression from Corona, associated with Mexico. Its tasting profile brings together light grain, citrus, mild hops. Crafted by Corona (Mexico) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.6,
    "origin": "Mexico",
    "sortOrder": 9,
    "brand": "Corona",
    "tags": [
      "Imported Beer",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Corona-Extra-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Corona-Extra-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-111-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "pacifico-clara",
    "name": "Pacifico Clara",
    "slug": "pacifico-clara",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Pacifico Clara offers a distinctive profile with notes of grain, malt, crisp finish.",
    "description": "Pacifico Clara is a imported beer expression from Pacifico, associated with Mexico. Its tasting profile brings together grain, malt, crisp finish. Crafted by Pacifico (Mexico) and bottled in 12-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12-Pack",
    "abv": 4.4,
    "origin": "Mexico",
    "sortOrder": 10,
    "brand": "Pacifico",
    "tags": [
      "Imported Beer",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Pacifico-12pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Pacifico-12pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-112-1",
        "label": "Packaging",
        "value": "12-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "guinness-extra-stout",
    "name": "Guinness Extra Stout",
    "slug": "guinness-extra-stout",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Guinness Extra Stout offers a distinctive profile with notes of roasted malt, coffee, bitterness.",
    "description": "Guinness Extra Stout is a imported beer expression from Guinness, associated with Ireland. Its tasting profile brings together roasted malt, coffee, bitterness. Crafted by Guinness (Ireland) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 5.6,
    "origin": "Ireland",
    "sortOrder": 11,
    "brand": "Guinness",
    "tags": [
      "Imported Beer",
      "Ireland"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Guinness-Extra-Stout-6pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Guinness-Extra-Stout-6pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-113-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "sapporo-premium-beer",
    "name": "Sapporo Premium Beer",
    "slug": "sapporo-premium-beer",
    "category": "beer",
    "subcategory": "imported-beer",
    "shortDescription": "Sapporo Premium Beer offers a distinctive profile with notes of grain, hops, crisp finish.",
    "description": "Sapporo Premium Beer is a imported beer expression from Sapporo, associated with Japan. Its tasting profile brings together grain, hops, crisp finish. Crafted by Sapporo (Japan) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 4.9,
    "origin": "Japan",
    "sortOrder": 12,
    "brand": "Sapporo",
    "tags": [
      "Imported Beer",
      "Japan"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Sapporo-Draft-6pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Sapporo-Draft-6pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-114-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "samuel-adams-utopias",
    "name": "Samuel Adams Utopias",
    "slug": "samuel-adams-utopias",
    "category": "beer",
    "subcategory": "craft-beer",
    "shortDescription": "Samuel Adams Utopias offers a distinctive profile with notes of caramel, dark fruit, oak.",
    "description": "Samuel Adams Utopias is a craft beer expression from Samuel Adams, associated with USA. Its tasting profile brings together caramel, dark fruit, oak. Crafted by Samuel Adams (USA) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 28,
    "origin": "USA",
    "sortOrder": 1,
    "brand": "Samuel Adams",
    "tags": [
      "Craft Beer",
      "USA"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/samuel-adams-sam-adams-utopias-2021-710ml__92720.jpg?v=1765204948"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/samuel-adams-sam-adams-utopias-2021-710ml__92720.jpg?v=1765204948",
    "customFields": [
      {
        "id": "cf-115-1",
        "label": "Packaging",
        "value": "750 mL",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "goose-island-bourbon-county-brand-stout",
    "name": "Goose Island Bourbon County Brand Stout",
    "slug": "goose-island-bourbon-county-brand-stout",
    "category": "beer",
    "subcategory": "craft-beer",
    "shortDescription": "Goose Island Bourbon County Brand Stout offers a distinctive profile with notes of chocolate, vanilla, bourbon oak.",
    "description": "Goose Island Bourbon County Brand Stout is a craft beer expression from Goose Island, associated with USA. Its tasting profile brings together chocolate, vanilla, bourbon oak. Crafted by Goose Island (USA) and bottled in 500 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "500 mL",
    "abv": 14.7,
    "origin": "USA",
    "sortOrder": 2,
    "brand": "Goose Island",
    "tags": [
      "Craft Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/9942/10212/goose-island-bourbon-county-brand-macaroon-stout-2024__03064.1752495976.1280.1280__45328.1755243329.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/9942/10212/goose-island-bourbon-county-brand-macaroon-stout-2024__03064.1752495976.1280.1280__45328.1755243329.jpg?c=1",
    "customFields": [
      {
        "id": "cf-116-1",
        "label": "Packaging",
        "value": "500 mL",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "dogfish-head-120-minute-ipa",
    "name": "Dogfish Head 120 Minute IPA",
    "slug": "dogfish-head-120-minute-ipa",
    "category": "beer",
    "subcategory": "craft-beer",
    "shortDescription": "Dogfish Head 120 Minute IPA offers a distinctive profile with notes of resin, citrus, malt.",
    "description": "Dogfish Head 120 Minute IPA is a craft beer expression from Dogfish Head, associated with USA. Its tasting profile brings together resin, citrus, malt. Crafted by Dogfish Head (USA) and bottled in 12 oz format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12 oz",
    "abv": 15.5,
    "origin": "USA",
    "sortOrder": 3,
    "brand": "Dogfish Head",
    "tags": [
      "Craft Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0227/0581/products/Dogfish-Head-120-Minute-IPA-12OZ-BTL.jpg?v=1651881869"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0227/0581/products/Dogfish-Head-120-Minute-IPA-12OZ-BTL.jpg?v=1651881869",
    "customFields": [
      {
        "id": "cf-117-1",
        "label": "Packaging",
        "value": "12 oz",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "founders-kbs",
    "name": "Founders KBS",
    "slug": "founders-kbs",
    "category": "beer",
    "subcategory": "craft-beer",
    "shortDescription": "Founders KBS offers a distinctive profile with notes of coffee, chocolate, oak.",
    "description": "Founders KBS is a craft beer expression from Founders, associated with USA. Its tasting profile brings together coffee, chocolate, oak. Crafted by Founders (USA) and bottled in 12 oz format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12 oz",
    "abv": 12,
    "origin": "USA",
    "sortOrder": 4,
    "brand": "Founders",
    "tags": [
      "Craft Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Founders-KBS-Cin-Van-Cocoa4pk-12-oz-Bottles_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Founders-KBS-Cin-Van-Cocoa4pk-12-oz-Bottles_1.png",
    "customFields": [
      {
        "id": "cf-118-1",
        "label": "Packaging",
        "value": "12 oz",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "sierra-nevada-bigfoot-barleywine",
    "name": "Sierra Nevada Bigfoot Barleywine",
    "slug": "sierra-nevada-bigfoot-barleywine",
    "category": "beer",
    "subcategory": "craft-beer",
    "shortDescription": "Sierra Nevada Bigfoot Barleywine offers a distinctive profile with notes of caramel, pine, citrus.",
    "description": "Sierra Nevada Bigfoot Barleywine is a craft beer expression from Sierra Nevada, associated with USA. Its tasting profile brings together caramel, pine, citrus. Crafted by Sierra Nevada (USA) and bottled in 12 oz format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "12 oz",
    "abv": 9.6,
    "origin": "USA",
    "sortOrder": 5,
    "brand": "Sierra Nevada",
    "tags": [
      "Craft Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0227/0581/products/Sierra-Nevada-Bigfoot-Barley-Wine-12OZ-BTL.jpg?v=1610032835"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0227/0581/products/Sierra-Nevada-Bigfoot-Barley-Wine-12OZ-BTL.jpg?v=1610032835",
    "customFields": [
      {
        "id": "cf-119-1",
        "label": "Packaging",
        "value": "12 oz",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "saint-arnold-art-car-ipa",
    "name": "Saint Arnold Art Car IPA",
    "slug": "saint-arnold-art-car-ipa",
    "category": "beer",
    "subcategory": "craft-beer",
    "shortDescription": "Saint Arnold Art Car IPA offers a distinctive profile with notes of citrus, tropical fruit, hops.",
    "description": "Saint Arnold Art Car IPA is a craft beer expression from Saint Arnold, associated with USA. Its tasting profile brings together citrus, tropical fruit, hops. Crafted by Saint Arnold (USA) and bottled in 6-Pack format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "6-Pack",
    "abv": 7.1,
    "origin": "USA",
    "sortOrder": 6,
    "brand": "Saint Arnold",
    "tags": [
      "Craft Beer",
      "USA"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0227/0581/products/Saint-Arnold-Bourbon-Barrel-Commitment-Imperial-Stout-12OZ-BTL.jpg?v=1636286039"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0227/0581/products/Saint-Arnold-Bourbon-Barrel-Commitment-Imperial-Stout-12OZ-BTL.jpg?v=1636286039",
    "customFields": [
      {
        "id": "cf-120-1",
        "label": "Packaging",
        "value": "6-Pack",
        "showOnCard": true
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "clase-azul-plata",
    "name": "Clase Azul Plata",
    "slug": "clase-azul-plata",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Clase Azul Plata offers a distinctive profile with notes of agave, citrus, herbs.",
    "description": "Clase Azul Plata is a blanco tequila expression from Clase Azul, associated with Mexico. Its tasting profile brings together agave, citrus, herbs. Crafted by Clase Azul (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 1,
    "brand": "Clase Azul",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7406/7641/clase-azul-plata-tequila__99354.1752496561.1280.1280__26055.1755242895.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7406/7641/clase-azul-plata-tequila__99354.1752496561.1280.1280__26055.1755242895.jpg?c=1",
    "customFields": [
      {
        "id": "cf-121-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-121-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "casa-dragones-blanco",
    "name": "Casa Dragones Blanco",
    "slug": "casa-dragones-blanco",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Casa Dragones Blanco offers a distinctive profile with notes of agave, citrus, pepper.",
    "description": "Casa Dragones Blanco is a blanco tequila expression from Casa Dragones, associated with Mexico. Its tasting profile brings together agave, citrus, pepper. Crafted by Casa Dragones (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 2,
    "brand": "Casa Dragones",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7436/7677/casa-dragones-blanco-tequila__18952.1752496566.1280.1280__35047.1793267507.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7436/7677/casa-dragones-blanco-tequila__18952.1752496566.1280.1280__35047.1793267507.jpg?c=1",
    "customFields": [
      {
        "id": "cf-122-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-122-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "gran-patron-platinum",
    "name": "Gran Patrón Platinum",
    "slug": "gran-patron-platinum",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Gran Patrón Platinum offers a distinctive profile with notes of agave, citrus, mineral.",
    "description": "Gran Patrón Platinum is a blanco tequila expression from Patrón, associated with Mexico. Its tasting profile brings together agave, citrus, mineral. Crafted by Patrón (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 3,
    "brand": "Patrón",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Patron-Gran-Platinum-Tequila-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Patron-Gran-Platinum-Tequila-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-123-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-123-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "fortaleza-blanco-still-strength",
    "name": "Fortaleza Blanco Still Strength",
    "slug": "fortaleza-blanco-still-strength",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Fortaleza Blanco Still Strength offers a distinctive profile with notes of roasted agave, olive, pepper.",
    "description": "Fortaleza Blanco Still Strength is a blanco tequila expression from Fortaleza, associated with Mexico. Its tasting profile brings together roasted agave, olive, pepper. Crafted by Fortaleza (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 46,
    "origin": "Mexico",
    "sortOrder": 4,
    "brand": "Fortaleza",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/fortaleza-tequila-fortaleza-blanco-still-strength-tequila__16590.jpg?v=1765204113"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0635/3289/2418/files/fortaleza-tequila-fortaleza-blanco-still-strength-tequila__16590.jpg?v=1765204113",
    "customFields": [
      {
        "id": "cf-124-1",
        "label": "Proof",
        "value": "92",
        "showOnCard": true
      },
      {
        "id": "cf-124-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "fortaleza-blanco",
    "name": "Fortaleza Blanco",
    "slug": "fortaleza-blanco",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Fortaleza Blanco offers a distinctive profile with notes of cooked agave, citrus, earth.",
    "description": "Fortaleza Blanco is a blanco tequila expression from Fortaleza, associated with Mexico. Its tasting profile brings together cooked agave, citrus, earth. Crafted by Fortaleza (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 5,
    "brand": "Fortaleza",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15461/15771/fortaleza-blanco-tequila__15277.1756485073.1280.1280__98093.1759817750.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15461/15771/fortaleza-blanco-tequila__15277.1756485073.1280.1280__98093.1759817750.jpg?c=1",
    "customFields": [
      {
        "id": "cf-125-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-125-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "don-julio-blanco",
    "name": "Don Julio Blanco",
    "slug": "don-julio-blanco",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Don Julio Blanco offers a distinctive profile with notes of agave, citrus, pepper.",
    "description": "Don Julio Blanco is a blanco tequila expression from Don Julio, associated with Mexico. Its tasting profile brings together agave, citrus, pepper. Crafted by Don Julio (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 6,
    "brand": "Don Julio",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7689/7936/don-julio-blanco-tequila-375__82215.1752496597.1280.1280__71025.1755242948.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7689/7936/don-julio-blanco-tequila-375__82215.1752496597.1280.1280__71025.1755242948.jpg?c=1",
    "customFields": [
      {
        "id": "cf-126-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-126-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "cincoro-blanco",
    "name": "Cincoro Blanco",
    "slug": "cincoro-blanco",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Cincoro Blanco offers a distinctive profile with notes of agave, citrus, vanilla.",
    "description": "Cincoro Blanco is a blanco tequila expression from Cincoro, associated with Mexico. Its tasting profile brings together agave, citrus, vanilla. Crafted by Cincoro (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 7,
    "brand": "Cincoro",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7589/7831/cincoro-blanco-tequila__82632.1754742333.1280.1280__79338.1755242929.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7589/7831/cincoro-blanco-tequila__82632.1754742333.1280.1280__79338.1755242929.jpg?c=1",
    "customFields": [
      {
        "id": "cf-127-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-127-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "g4-blanco-108",
    "name": "G4 Blanco 108",
    "slug": "g4-blanco-108",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "G4 Blanco 108 offers a distinctive profile with notes of agave, mineral, pepper.",
    "description": "G4 Blanco 108 is a blanco tequila expression from G4, associated with Mexico. Its tasting profile brings together agave, mineral, pepper. Crafted by G4 (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 54,
    "origin": "Mexico",
    "sortOrder": 8,
    "brand": "G4",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/G4-Blanco-Tequila-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/G4-Blanco-Tequila-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-128-1",
        "label": "Proof",
        "value": "108",
        "showOnCard": true
      },
      {
        "id": "cf-128-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "patron-el-cielo",
    "name": "Patrón El Cielo",
    "slug": "patron-el-cielo",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Patrón El Cielo offers a distinctive profile with notes of agave, citrus, honey.",
    "description": "Patrón El Cielo is a blanco tequila expression from Patrón, associated with Mexico. Its tasting profile brings together agave, citrus, honey. Crafted by Patrón (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 9,
    "brand": "Patrón",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/PATRON_TEQUILA_SILVER_EL_CIELO_700ML.webp?v=1750544661"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0647/0644/5540/files/PATRON_TEQUILA_SILVER_EL_CIELO_700ML.webp?v=1750544661",
    "customFields": [
      {
        "id": "cf-129-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-129-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "volcan-de-mi-tierra-blanco",
    "name": "Volcán de Mi Tierra Blanco",
    "slug": "volcan-de-mi-tierra-blanco",
    "category": "agave-and-more",
    "subcategory": "blanco-tequila",
    "shortDescription": "Volcán de Mi Tierra Blanco offers a distinctive profile with notes of agave, citrus, herbs.",
    "description": "Volcán de Mi Tierra Blanco is a blanco tequila expression from Volcán de Mi Tierra, associated with Mexico. Its tasting profile brings together agave, citrus, herbs. Crafted by Volcán de Mi Tierra (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 10,
    "brand": "Volcán de Mi Tierra",
    "tags": [
      "Blanco Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7664/7911/volcan-de-mi-tierra-blanco-tequila__86231.1752496594.1280.1280__11318.1755242945.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7664/7911/volcan-de-mi-tierra-blanco-tequila__86231.1752496594.1280.1280__11318.1755242945.jpg?c=1",
    "customFields": [
      {
        "id": "cf-130-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-130-2",
        "label": "Classification",
        "value": "Blanco Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "clase-azul-reposado",
    "name": "Clase Azul Reposado",
    "slug": "clase-azul-reposado",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "Clase Azul Reposado offers a distinctive profile with notes of vanilla, agave, caramel.",
    "description": "Clase Azul Reposado is a reposado tequila expression from Clase Azul, associated with Mexico. Its tasting profile brings together vanilla, agave, caramel. Crafted by Clase Azul (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 1,
    "brand": "Clase Azul",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Clase-Azul-Reposado-Tequila-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Clase-Azul-Reposado-Tequila-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-131-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-131-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "clase-azul-gold",
    "name": "Clase Azul Gold",
    "slug": "clase-azul-gold",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "A blended gold tequila from Clase Azul.",
    "description": "Clase Azul Gold is an ultra-premium Joven tequila expression from Clase Azul in Jalisco, Mexico, artfully blending Clase Azul Plata with a special reposado matured in French oak and an 8-year Extra Añejo finished in Pedro Ximénez sherry casks. Its tasting profile brings together toasted wood, fig, green olive, ginger, and rich dark chocolate.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 2,
    "brand": "Clase Azul",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15175/15486/clase-azul-gold-tequila__99172.1750767207.1280.1280__77995.1755333789.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15175/15486/clase-azul-gold-tequila__99172.1750767207.1280.1280__77995.1755333789.jpg?c=1",
    "customFields": [
      {
        "id": "cf-132-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-132-2",
        "label": "Classification",
        "value": "Joven Tequila (Plata, Reposado & 8-Yr Extra Añejo Blend)",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "casa-dragones-reposado-mizunara",
    "name": "Casa Dragones Reposado Mizunara",
    "slug": "casa-dragones-reposado-mizunara",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "Casa Dragones Reposado Mizunara offers a distinctive profile with notes of agave, sandalwood, spice.",
    "description": "Casa Dragones Reposado Mizunara is a reposado tequila expression from Casa Dragones, associated with Mexico. Its tasting profile brings together agave, sandalwood, spice. Crafted by Casa Dragones (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 3,
    "brand": "Casa Dragones",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Casa-Dragones-Reposado-Tequila-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Casa-Dragones-Reposado-Tequila-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-133-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-133-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "fortaleza-reposado",
    "name": "Fortaleza Reposado",
    "slug": "fortaleza-reposado",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "Fortaleza Reposado offers a distinctive profile with notes of agave, vanilla, oak.",
    "description": "Fortaleza Reposado is a reposado tequila expression from Fortaleza, associated with Mexico. Its tasting profile brings together agave, vanilla, oak. Crafted by Fortaleza (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 4,
    "brand": "Fortaleza",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15462/15772/fortaleza-reposado-tequila__64581.1756485073.1280.1280__63947.1759817756.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15462/15772/fortaleza-reposado-tequila__64581.1756485073.1280.1280__63947.1759817756.jpg?c=1",
    "customFields": [
      {
        "id": "cf-134-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-134-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "cincoro-reposado",
    "name": "Cincoro Reposado",
    "slug": "cincoro-reposado",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "Cincoro Reposado offers a distinctive profile with notes of caramel, agave, oak.",
    "description": "Cincoro Reposado is a reposado tequila expression from Cincoro, associated with Mexico. Its tasting profile brings together caramel, agave, oak. Crafted by Cincoro (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 5,
    "brand": "Cincoro",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7610/7851/cincoro-resposado-tequila__53657.1754742334.1280.1280__11614.1755242931.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7610/7851/cincoro-resposado-tequila__53657.1754742334.1280.1280__11614.1755242931.jpg?c=1",
    "customFields": [
      {
        "id": "cf-135-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-135-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "komos-reposado-rosa",
    "name": "Komos Reposado Rosa",
    "slug": "komos-reposado-rosa",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "Komos Reposado Rosa offers a distinctive profile with notes of red fruit, agave, oak.",
    "description": "Komos Reposado Rosa is a reposado tequila expression from Komos, associated with Mexico. Its tasting profile brings together red fruit, agave, oak. Crafted by Komos (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 6,
    "brand": "Komos",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7713/7959/komos-reposado-rosa-tequila__12114.1754742335.1280.1280__46303.1755242954.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7713/7959/komos-reposado-rosa-tequila__12114.1754742335.1280.1280__46303.1755242954.jpg?c=1",
    "customFields": [
      {
        "id": "cf-136-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-136-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "don-julio-reposado",
    "name": "Don Julio Reposado",
    "slug": "don-julio-reposado",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "Don Julio Reposado offers a distinctive profile with notes of agave, vanilla, oak.",
    "description": "Don Julio Reposado is a reposado tequila expression from Don Julio, associated with Mexico. Its tasting profile brings together agave, vanilla, oak. Crafted by Don Julio (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 7,
    "brand": "Don Julio",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7296/7534/don-julio-reposado-tequila__61649.1754742150.1280.1280__69934.1755242879.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7296/7534/don-julio-reposado-tequila__61649.1754742150.1280.1280__69934.1755242879.jpg?c=1",
    "customFields": [
      {
        "id": "cf-137-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-137-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "el-tesoro-reposado",
    "name": "El Tesoro Reposado",
    "slug": "el-tesoro-reposado",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "El Tesoro Reposado offers a distinctive profile with notes of agave, honey, spice.",
    "description": "El Tesoro Reposado is a reposado tequila expression from El Tesoro, associated with Mexico. Its tasting profile brings together agave, honey, spice. Crafted by El Tesoro (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 8,
    "brand": "El Tesoro",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7558/7815/el-tesoro-resposado-tequila__83866.1752496581.1280.1280__52670.1755242927.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7558/7815/el-tesoro-resposado-tequila__83866.1752496581.1280.1280__52670.1755242927.jpg?c=1",
    "customFields": [
      {
        "id": "cf-138-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-138-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "g4-reposado",
    "name": "G4 Reposado",
    "slug": "g4-reposado",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "G4 Reposado offers a distinctive profile with notes of agave, oak, mineral.",
    "description": "G4 Reposado is a reposado tequila expression from G4, associated with Mexico. Its tasting profile brings together agave, oak, mineral. Crafted by G4 (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 9,
    "brand": "G4",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/13951/14263/g4-reposado-tequila__63284.1752496553.1280.1280__22545.1755243914.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/13951/14263/g4-reposado-tequila__63284.1752496553.1280.1280__22545.1755243914.jpg?c=1",
    "customFields": [
      {
        "id": "cf-139-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-139-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "casamigos-reposado",
    "name": "Casamigos Reposado",
    "slug": "casamigos-reposado",
    "category": "agave-and-more",
    "subcategory": "reposado-tequila",
    "shortDescription": "Casamigos Reposado offers a distinctive profile with notes of caramel, cocoa, agave.",
    "description": "Casamigos Reposado is a reposado tequila expression from Casamigos, associated with Mexico. Its tasting profile brings together caramel, cocoa, agave. Crafted by Casamigos (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 10,
    "brand": "Casamigos",
    "tags": [
      "Reposado Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7343/7577/casamigos-reposado-tequila__07830.1754742159.1280.1280__77002.1755242886.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7343/7577/casamigos-reposado-tequila__07830.1754742159.1280.1280__77002.1755242886.jpg?c=1",
    "customFields": [
      {
        "id": "cf-140-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-140-2",
        "label": "Classification",
        "value": "Reposado Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "clase-azul-anejo",
    "name": "Clase Azul Añejo",
    "slug": "clase-azul-anejo",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Clase Azul Añejo offers a distinctive profile with notes of oak, caramel, dried fruit.",
    "description": "Clase Azul Añejo is a añejo tequila expression from Clase Azul, associated with Mexico. Its tasting profile brings together oak, caramel, dried fruit. Crafted by Clase Azul (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 1,
    "brand": "Clase Azul",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": true,
    "images": [
      "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/clase-azul-anejo-tequila-1149012579.png?v=1742361122"
    ],
    "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0276/1621/5176/files/clase-azul-anejo-tequila-1149012579.png?v=1742361122",
    "customFields": [
      {
        "id": "cf-141-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-141-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "don-julio-1942",
    "name": "Don Julio 1942",
    "slug": "don-julio-1942",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Don Julio 1942 offers a distinctive profile with notes of caramel, vanilla, roasted agave.",
    "description": "Don Julio 1942 is a añejo tequila expression from Don Julio, associated with Mexico. Its tasting profile brings together caramel, vanilla, roasted agave. Crafted by Don Julio (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 2,
    "brand": "Don Julio",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "Allocated",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/9393/9644/don-julio-1942-anejo-tequila-375ml__97693.1754742143.1280.1280__70073.1755243238.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/9393/9644/don-julio-1942-anejo-tequila-375ml__97693.1754742143.1280.1280__70073.1755243238.jpg?c=1",
    "customFields": [
      {
        "id": "cf-142-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-142-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "cincoro-anejo",
    "name": "Cincoro Añejo",
    "slug": "cincoro-anejo",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Cincoro Añejo offers a distinctive profile with notes of caramel, chocolate, oak.",
    "description": "Cincoro Añejo is a añejo tequila expression from Cincoro, associated with Mexico. Its tasting profile brings together caramel, chocolate, oak. Crafted by Cincoro (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 3,
    "brand": "Cincoro",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7594/7836/cincoro-anejo-tequila__46400.1754742193.1280.1280__83794.1755242931.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7594/7836/cincoro-anejo-tequila__46400.1754742193.1280.1280__83794.1755242931.jpg?c=1",
    "customFields": [
      {
        "id": "cf-143-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-143-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "casa-dragones-anejo-barrel-blend",
    "name": "Casa Dragones Añejo Barrel Blend",
    "slug": "casa-dragones-anejo-barrel-blend",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Casa Dragones Añejo Barrel Blend offers a distinctive profile with notes of agave, oak, spice.",
    "description": "Casa Dragones Añejo Barrel Blend is a añejo tequila expression from Casa Dragones, associated with Mexico. Its tasting profile brings together agave, oak, spice. Crafted by Casa Dragones (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 4,
    "brand": "Casa Dragones",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://applejack.com/site/images/Casa-Dragones-Barrel-Blend-Anejo-Tequila-750-ml_1.png"
    ],
    "thumbnailUrl": "https://applejack.com/site/images/Casa-Dragones-Barrel-Blend-Anejo-Tequila-750-ml_1.png",
    "customFields": [
      {
        "id": "cf-144-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-144-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "fortaleza-anejo",
    "name": "Fortaleza Añejo",
    "slug": "fortaleza-anejo",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Fortaleza Añejo offers a distinctive profile with notes of agave, caramel, oak.",
    "description": "Fortaleza Añejo is a añejo tequila expression from Fortaleza, associated with Mexico. Its tasting profile brings together agave, caramel, oak. Crafted by Fortaleza (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 5,
    "brand": "Fortaleza",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7403/7640/fortaleza-anejo-tequila__67023.1752496560.1280.1280__49322.1755242895.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7403/7640/fortaleza-anejo-tequila__67023.1752496560.1280.1280__49322.1755242895.jpg?c=1",
    "customFields": [
      {
        "id": "cf-145-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-145-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "komos-anejo-cristalino",
    "name": "Komos Añejo Cristalino",
    "slug": "komos-anejo-cristalino",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Komos Añejo Cristalino offers a distinctive profile with notes of agave, vanilla, fruit.",
    "description": "Komos Añejo Cristalino is a añejo tequila expression from Komos, associated with Mexico. Its tasting profile brings together agave, vanilla, fruit. Crafted by Komos (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 6,
    "brand": "Komos",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7649/7896/komos-anejo-cristalino-tequila__26834.1754742216.1280.1280__22226.1793237313.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7649/7896/komos-anejo-cristalino-tequila__26834.1754742216.1280.1280__22226.1793237313.jpg?c=1",
    "customFields": [
      {
        "id": "cf-146-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-146-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "el-tesoro-anejo",
    "name": "El Tesoro Añejo",
    "slug": "el-tesoro-anejo",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "El Tesoro Añejo offers a distinctive profile with notes of agave, oak, vanilla.",
    "description": "El Tesoro Añejo is a añejo tequila expression from El Tesoro, associated with Mexico. Its tasting profile brings together agave, oak, vanilla. Crafted by El Tesoro (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 7,
    "brand": "El Tesoro",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7570/7811/el-tesoro-anejo-tequila__24730.1754742333.1280.1280__87658.1755242927.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7570/7811/el-tesoro-anejo-tequila__24730.1754742333.1280.1280__87658.1755242927.jpg?c=1",
    "customFields": [
      {
        "id": "cf-147-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-147-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "patron-anejo",
    "name": "Patrón Añejo",
    "slug": "patron-anejo",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Patrón Añejo offers a distinctive profile with notes of oak, vanilla, agave.",
    "description": "Patrón Añejo is a añejo tequila expression from Patrón, associated with Mexico. Its tasting profile brings together oak, vanilla, agave. Crafted by Patrón (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 8,
    "brand": "Patrón",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7376/7621/patron-anejo-tequila-750ml__32191.1772458633.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7376/7621/patron-anejo-tequila-750ml__32191.1772458633.jpg?c=1",
    "customFields": [
      {
        "id": "cf-148-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-148-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "don-julio-70-anejo-cristalino",
    "name": "Don Julio 70 Añejo Cristalino",
    "slug": "don-julio-70-anejo-cristalino",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Don Julio 70 Añejo Cristalino offers a distinctive profile with notes of agave, vanilla, citrus.",
    "description": "Don Julio 70 Añejo Cristalino is a añejo tequila expression from Don Julio, associated with Mexico. Its tasting profile brings together agave, vanilla, citrus. Crafted by Don Julio (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 9,
    "brand": "Don Julio",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15198/15510/don-julio-70-anejo-claro-tequila__69177.1727777760.1280.1280__96415.1793327587.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/15198/15510/don-julio-70-anejo-claro-tequila__69177.1727777760.1280.1280__96415.1793327587.jpg?c=1",
    "customFields": [
      {
        "id": "cf-149-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-149-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  },
  {
    "id": "casamigos-anejo",
    "name": "Casamigos Añejo",
    "slug": "casamigos-anejo",
    "category": "agave-and-more",
    "subcategory": "anejo-tequila",
    "shortDescription": "Casamigos Añejo offers a distinctive profile with notes of caramel, vanilla, spice.",
    "description": "Casamigos Añejo is a añejo tequila expression from Casamigos, associated with Mexico. Its tasting profile brings together caramel, vanilla, spice. Crafted by Casamigos (Mexico) and bottled in 750 mL format for discerning collectors and enthusiasts at JFK Liquors.",
    "volume": "750 mL",
    "abv": 40,
    "origin": "Mexico",
    "sortOrder": 10,
    "brand": "Casamigos",
    "tags": [
      "Añejo Tequila",
      "Mexico"
    ],
    "badge": "",
    "isOffer": false,
    "offerText": "",
    "inStock": false,
    "featured": false,
    "images": [
      "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7383/7627/casamigos-anejo-tequila__52831.1754742215.1280.1280__01904.1755242891.jpg?c=1"
    ],
    "thumbnailUrl": "https://cdn11.bigcommerce.com/s-0ddlsmhg83/images/stencil/500x659/products/7383/7627/casamigos-anejo-tequila__52831.1754742215.1280.1280__01904.1755242891.jpg?c=1",
    "customFields": [
      {
        "id": "cf-150-1",
        "label": "Proof",
        "value": "80",
        "showOnCard": true
      },
      {
        "id": "cf-150-2",
        "label": "Classification",
        "value": "Añejo Tequila",
        "showOnCard": false
      }
    ],
    "cardFieldsOverride": [],
    "createdAt": "2026-11-25T00:00:00.000Z",
    "updatedAt": "2026-11-25T00:00:00.000Z"
  }
];

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSiteContent } from '@/lib/useSiteContent';
import { DEFAULT_SITE_CONTENT } from '@/lib/initialData';
import type { Product, ProductCardConfig } from '@/types';

interface Props {
  product: Product;
  configOverride?: Partial<ProductCardConfig>;
}

const BADGE_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Allocated: {
    bg: '#5B1018',
    text: '#F5D900',
    border: 'rgba(245, 217, 0, 0.4)',
  },
  Limited: {
    bg: '#5B1018',
    text: '#FFFFFF',
    border: 'rgba(91, 16, 24, 0.8)',
  },
  Featured: { bg: '#F5D900', text: '#050505', border: '#F5D900' },
  New: { bg: '#1A1A1A', text: '#F5D900', border: '#333333' },
  Sale: { bg: '#781520', text: '#FFFFFF', border: 'rgba(255, 255, 255, 0.2)' },
  Offer: {
    bg: '#F5D900',
    text: '#050505',
    border: '#F5D900',
  },
};

export default function ProductCard({ product, configOverride }: Props) {
  const { cardConfig: siteCardConfig } = useSiteContent();
  const cfg: ProductCardConfig = {
    ...DEFAULT_SITE_CONTENT.cardConfig,
    ...(siteCardConfig || {}),
    ...(configOverride || {}),
  };

  // Optional per-product field override helper
  const hasOverride =
    Array.isArray(product.cardFieldsOverride) &&
    product.cardFieldsOverride.length > 0;
  const isFieldEnabled = (key: string, defaultVal: boolean) => {
    if (hasOverride) {
      return product.cardFieldsOverride!.includes(key);
    }
    return defaultVal;
  };

  const badgeStyle = product.badge
    ? BADGE_STYLES[product.badge] || BADGE_STYLES.Featured
    : null;
  const imageSrc =
    product.images?.[0] ||
    product.thumbnailUrl ||
    'https://res.cloudinary.com/ovmougmy/image/upload/v1793981778/jfk-liquors/bourbon-jim-beam.jpg';

  const aspectClass =
    cfg.imageAspect === '1/1'
      ? 'aspect-square'
      : cfg.imageAspect === '4/5'
        ? 'aspect-[4/5]'
        : 'aspect-[4/3]';

  const alignClass =
    cfg.textAlign === 'center' ? 'text-center items-center' : 'text-left';

  const lineClampClass =
    cfg.descriptionLines === 1
      ? 'line-clamp-1'
      : cfg.descriptionLines === 3
        ? 'line-clamp-3'
        : cfg.descriptionLines === 4
          ? 'line-clamp-4'
          : 'line-clamp-2';

  // Build visible specs + custom fields list according to admin preferences
  const visibleSpecs: { label: string; value: string }[] = [];

  if (isFieldEnabled('category', cfg.showCategory) && product.category) {
    visibleSpecs.push({
      label: 'Department',
      value: product.category.replace(/-/g, ' '),
    });
  }
  if (
    isFieldEnabled('subcategory', cfg.showSubcategory) &&
    product.subcategory
  ) {
    visibleSpecs.push({
      label: 'Type',
      value: product.subcategory.replace(/-/g, ' '),
    });
  }
  if (isFieldEnabled('brand', cfg.showBrand) && product.brand) {
    visibleSpecs.push({ label: 'Brand', value: product.brand });
  }
  if (isFieldEnabled('origin', cfg.showOrigin) && product.origin) {
    visibleSpecs.push({ label: 'Origin', value: product.origin });
  }
  if (isFieldEnabled('abv', cfg.showAbv) && product.abv) {
    visibleSpecs.push({ label: 'ABV', value: `${product.abv}%` });
  }

  // Custom fields added by admin on this product
  const cardCustomFields =
    isFieldEnabled('customFields', cfg.showCustomFields) &&
    Array.isArray(product.customFields)
      ? product.customFields
          .filter((f) => f.label && f.value && f.showOnCard !== false)
          .slice(0, Number(cfg.maxCustomFieldsCount) || 3)
      : [];

  const allDisplayFields = [
    ...visibleSpecs,
    ...cardCustomFields.map((f) => ({ label: f.label, value: f.value })),
  ];

  const showPriceBlock =
    isFieldEnabled('price', cfg.showPrice) &&
    product.price !== undefined &&
    product.price !== null &&
    Number(product.price) > 0;

  return (
    <article className="group flex flex-col justify-between rounded-sm overflow-hidden bg-[#121316] border border-white/[0.08] transition-all duration-300 hover:border-[#F5D900]/70 hover:shadow-2xl">
      <div>
        {/* Bottle Image Exhibition Area */}
        <Link
          href={`/products/${product.category}/${product.slug}`}
          prefetch={true}
          className={`block relative ${aspectClass} w-full overflow-hidden bg-[#0A0A0A]`}
        >
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Top-Left Allocation / Promotional Badge */}
          {isFieldEnabled('badge', cfg.showBadge) &&
            badgeStyle &&
            product.badge && (
              <span
                className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider shadow-lg font-sans"
                style={{
                  backgroundColor: badgeStyle.bg,
                  color: badgeStyle.text,
                  border: `1px solid ${badgeStyle.border}`,
                  letterSpacing: '0.14em',
                }}
              >
                {product.badge}
              </span>
            )}

          {/* Top-Right Offer Highlight Pill */}
          {isFieldEnabled('offerText', cfg.showOfferText) &&
            (product.offerText || product.isOffer) && (
              <span className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-sm text-[10px] font-sans font-extrabold uppercase tracking-wider bg-[#F5D900] text-[#050505] shadow-lg">
                {product.offerText || 'Special Offer'}
              </span>
            )}

          {/* Volume overlay */}
          {isFieldEnabled('volumeOverlay', cfg.showVolumeOverlay) &&
            product.volume && (
              <span className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-sm text-[11px] font-sans font-medium bg-[#0A0A0A]/90 text-neutral-300 border border-white/10 tracking-wider backdrop-blur-sm">
                {product.volume}
              </span>
            )}
        </Link>

        {/* Card Body */}
        <div className={`p-6 flex flex-col ${alignClass}`}>
          {/* Tags */}
          {isFieldEnabled('tags', cfg.showTags) &&
            product.tags?.length > 0 &&
            Number(cfg.maxTagsCount) > 0 && (
              <p className="text-[11px] font-sans font-bold text-[#F5D900] mb-2.5 tracking-[0.2em] uppercase">
                {product.tags
                  .slice(0, Number(cfg.maxTagsCount) || 3)
                  .join(' • ')}
              </p>
            )}

          {/* Title in Bold Anton Font */}
          <h3 className="font-anton text-2xl sm:text-[1.65rem] text-[#FFFFFF] mb-2.5 transition-colors group-hover:text-[#F5D900] line-clamp-1 leading-snug tracking-wide uppercase">
            <Link
              href={`/products/${product.category}/${product.slug}`}
              prefetch={true}
            >
              {product.name}
            </Link>
          </h3>

          {/* Optional Price / Offer Price Display */}
          {showPriceBlock && (
            <div
              className={`flex items-baseline gap-2.5 mb-3 font-sans ${
                cfg.textAlign === 'center' ? 'justify-center' : ''
              }`}
            >
              <span className="text-lg font-extrabold text-[#F5D900]">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.comparePrice &&
                Number(product.comparePrice) > Number(product.price) && (
                  <span className="text-xs text-neutral-500 line-through">
                    ${Number(product.comparePrice).toFixed(2)}
                  </span>
                )}
            </div>
          )}

          {/* Description in Clean Montserrat */}
          {isFieldEnabled('description', cfg.showDescription) &&
            (product.shortDescription || product.description) && (
              <p
                className={`text-[13px] text-neutral-300 leading-relaxed ${lineClampClass} mb-4 font-sans font-normal`}
              >
                {product.shortDescription || product.description}
              </p>
            )}

          {/* Configurable Specs & Custom Fields Display */}
          {allDisplayFields.length > 0 && (
            <div className="w-full mt-1 mb-2">
              {cfg.customFieldsDisplayStyle === 'rows' ? (
                <div className="divide-y divide-white/[0.06] border-y border-white/[0.06] text-xs font-sans">
                  {allDisplayFields.map((f, idx) => (
                    <div
                      key={idx}
                      className="py-1.5 flex items-center justify-between gap-2"
                    >
                      <span className="text-neutral-400 uppercase tracking-wider text-[10px] font-semibold">
                        {f.label}
                      </span>
                      <span className="text-neutral-200 font-medium capitalize">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : cfg.customFieldsDisplayStyle === 'inline' ? (
                <p className="text-[11px] font-sans text-neutral-400 leading-relaxed">
                  {allDisplayFields.map((f, idx) => (
                    <span key={idx}>
                      {idx > 0 && (
                        <span className="text-[#F5D900] mx-1.5">&bull;</span>
                      )}
                      <span className="text-neutral-500 uppercase text-[10px]">
                        {f.label}:{' '}
                      </span>
                      <span className="text-neutral-200 font-medium capitalize">
                        {f.value}
                      </span>
                    </span>
                  ))}
                </p>
              ) : (
                <div
                  className={`flex flex-wrap gap-1.5 ${
                    cfg.textAlign === 'center' ? 'justify-center' : ''
                  }`}
                >
                  {allDisplayFields.map((f, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-sm text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#1A1B20] text-neutral-200 border border-white/10"
                    >
                      <span className="text-[#F5D900]">{f.label}:</span>{' '}
                      {f.value}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer: Bottle Info & Action Button */}
      <div className="p-6 pt-0 border-t border-white/[0.06] flex flex-col gap-3.5">
        {(isFieldEnabled('footerVolume', cfg.showFooterVolume) ||
          isFieldEnabled('stockStatus', cfg.showStockStatus)) && (
          <div className="flex items-center justify-between pt-3.5 text-xs font-sans text-neutral-400">
            {isFieldEnabled('footerVolume', cfg.showFooterVolume) ? (
              <span className="uppercase tracking-wider">
                {product.volume || 'Standard'}
              </span>
            ) : (
              <span />
            )}

            {isFieldEnabled('stockStatus', cfg.showStockStatus) && (
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
                  product.inStock !== false
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    product.inStock !== false
                      ? 'bg-emerald-400'
                      : 'bg-amber-400'
                  }`}
                />
                {product.inStock !== false ? 'In Stock' : 'Call Store'}
              </span>
            )}
          </div>
        )}

        {isFieldEnabled('ctaButton', cfg.showCtaButton) && (
          <Link
            href={`/products/${product.category}/${product.slug}`}
            prefetch={true}
            className="w-full py-3 px-4 rounded-sm border border-white/20 text-center text-xs font-sans font-bold uppercase tracking-widest text-white hover:border-[#F5D900] hover:text-[#F5D900] hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 group/btn mt-1"
          >
            <span>{cfg.ctaButtonText || 'View Details & Availability'}</span>
            <span className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5">
              ↗
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}

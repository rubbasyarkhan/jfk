import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

const BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Allocated: { bg: '#5B1018', text: '#D4AF37', border: 'rgba(212, 175, 55, 0.5)' },
  Limited: { bg: '#5B1018', text: '#FFFFFF', border: 'rgba(91, 16, 24, 0.8)' },
  Featured: { bg: '#D4AF37', text: '#0E0D0D', border: '#D4AF37' },
  New: { bg: '#1A1A1A', text: '#D4AF37', border: '#D4AF37' },
  Sale: { bg: '#781520', text: '#FFFFFF', border: 'rgba(255, 255, 255, 0.3)' },
};

export default function ProductCard({ product }: Props) {
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] || BADGE_STYLES.Featured : null;
  const imageSrc =
    product.thumbnailUrl ||
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="group flex flex-col justify-between rounded-xl overflow-hidden bg-[#141414] border border-[#262626] transition-all duration-300 hover:border-[#D4AF37]/70 hover:shadow-2xl">
      <div>
        {/* Product Media Area */}
        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="block relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]"
        >
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />

          {/* Allocation Badge */}
          {badgeStyle && product.badge && (
            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-lg"
              style={{
                backgroundColor: badgeStyle.bg,
                color: badgeStyle.text,
                border: `1px solid ${badgeStyle.border}`,
                letterSpacing: '0.12em',
              }}
            >
              {product.badge}
            </span>
          )}

          {/* Volume overlay */}
          {product.volume && (
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] font-mono bg-[#0E0D0D]/90 text-[#A5A5A5] border border-[#2E2E2E]">
              {product.volume}
            </span>
          )}
        </Link>

        {/* Product Card Body */}
        <div className="p-5">
          {/* Tags */}
          {product.tags?.length > 0 && (
            <p className="text-[10px] font-bold text-[#D4AF37] mb-2 tracking-[0.16em] uppercase">
              {product.tags.slice(0, 3).join(' • ')}
            </p>
          )}

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] mb-2 transition-colors group-hover:text-[#D4AF37] line-clamp-1 leading-snug">
            <Link href={`/products/${product.category}/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-[#A5A5A5] leading-relaxed line-clamp-2 mb-4 font-light">
            {product.shortDescription || product.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & White "Buy Now" button like Whisky Foundation */}
      <div className="p-5 pt-0 border-t border-[#262626] flex flex-col gap-3">
        <div className="flex items-center justify-between pt-3">
          <div>
            <span className="text-[10px] text-[#737373] uppercase tracking-wider block">Price</span>
            {product.price ? (
              <span className="font-serif text-2xl text-[#D4AF37] font-semibold">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <span className="text-xs text-[#A5A5A5] font-medium">Inquire in Store</span>
            )}
          </div>
          {product.abv && (
            <span className="text-[11px] font-mono text-[#A5A5A5] bg-[#1E1E1E] px-2 py-1 rounded border border-[#2E2E2E]">
              {product.abv}
            </span>
          )}
        </div>

        {/* Action Button: High contrast white button */}
        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="block w-full text-center py-2 px-4 rounded bg-[#FFFFFF] text-[#0E0D0D] font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0E0D0D] transition-all duration-300 shadow-md"
        >
          View Bottle
        </Link>
      </div>
    </article>
  );
}

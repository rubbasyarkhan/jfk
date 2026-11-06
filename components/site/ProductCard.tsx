import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

const BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Allocated: { bg: '#5B1018', text: '#F5D900', border: 'rgba(245, 217, 0, 0.4)' },
  Limited: { bg: '#5B1018', text: '#FFFFFF', border: 'rgba(91, 16, 24, 0.8)' },
  Featured: { bg: '#F5D900', text: '#050505', border: '#F5D900' },
  New: { bg: '#1A1A1A', text: '#F5D900', border: '#333333' },
  Sale: { bg: '#781520', text: '#FFFFFF', border: 'rgba(255, 255, 255, 0.2)' },
};

export default function ProductCard({ product }: Props) {
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] || BADGE_STYLES.Featured : null;
  const imageSrc =
    product.thumbnailUrl ||
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="group flex flex-col justify-between rounded-sm overflow-hidden bg-[#121316] border border-white/[0.08] transition-all duration-300 hover:border-[#F5D900]/70 hover:shadow-2xl">
      <div>
        {/* Bottle Image Exhibition Area */}
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

          {/* Vignette Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-80" />

          {/* Allocation Badge in Montserrat */}
          {badgeStyle && product.badge && (
            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider shadow-lg font-sans"
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

          {/* Volume overlay in Montserrat */}
          {product.volume && (
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-sm text-[11px] font-sans font-medium bg-[#0A0A0A]/90 text-neutral-300 border border-white/10 tracking-wider">
              {product.volume}
            </span>
          )}
        </Link>

        {/* Card Body */}
        <div className="p-6">
          {/* Tags in Montserrat */}
          {product.tags?.length > 0 && (
            <p className="text-[11px] font-sans font-bold text-[#F5D900] mb-2.5 tracking-[0.2em] uppercase">
              {product.tags.slice(0, 3).join(' • ')}
            </p>
          )}

          {/* Title in Elegant Playfair Display Serif */}
          <h3 className="font-serif text-2xl sm:text-[1.65rem] text-[#FFFFFF] mb-3 transition-colors group-hover:text-[#F5D900] line-clamp-1 leading-snug">
            <Link href={`/products/${product.category}/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Description in Clean Montserrat */}
          <p className="text-[13px] text-neutral-300 leading-relaxed line-clamp-2 mb-4 font-sans font-normal">
            {product.shortDescription || product.description}
          </p>
        </div>
      </div>

      {/* Footer: Price & Clean Action Button in Montserrat */}
      <div className="p-6 pt-0 border-t border-white/[0.06] flex flex-col gap-3.5">
        <div className="flex items-center justify-between pt-3.5">
          <div>
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-neutral-400 block">Valuation</span>
            {product.price ? (
              <span className="font-serif text-2xl text-[#F5D900] font-semibold">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <span className="text-xs text-neutral-400 font-sans font-medium">Inquire in Store</span>
            )}
          </div>
          {product.abv && (
            <span className="text-[11px] font-sans font-medium text-neutral-300 bg-[#1A1A1A] px-2.5 py-1 rounded-sm border border-white/10">
              {product.abv}
            </span>
          )}
        </div>

        {/* Action Button: White with dark text, hover gold, Montserrat */}
        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="block w-full text-center py-2.5 px-4 rounded-sm bg-[#FFFFFF] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.16em] hover:bg-[#F5D900] transition-colors"
        >
          View Bottle ↗
        </Link>
      </div>
    </article>
  );
}

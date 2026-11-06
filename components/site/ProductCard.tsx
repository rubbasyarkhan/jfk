import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

const BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Allocated: { bg: '#5B1018', text: '#F5D900', border: 'rgba(245, 217, 0, 0.4)' },
  Limited: { bg: '#5B1018', text: '#FFFFFF', border: 'rgba(91, 16, 24, 0.8)' },
  Featured: { bg: '#F5D900', text: '#111111', border: '#F5D900' },
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
    <article className="group flex flex-col justify-between rounded overflow-hidden bg-[#161616] border border-white/[0.08] transition-all duration-300 hover:border-[#F5D900]/70 hover:shadow-2xl">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-85" />

          {/* Allocation Badge */}
          {badgeStyle && product.badge && (
            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded-sm text-[9.5px] font-bold uppercase tracking-wider shadow-lg"
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

          {/* Volume overlay in clean monospace */}
          {product.volume && (
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-sm text-[10.5px] font-mono bg-[#0A0A0A]/90 text-[#A0A0A0] border border-white/10">
              {product.volume}
            </span>
          )}
        </Link>

        {/* Card Body */}
        <div className="p-5">
          {/* Tags */}
          {product.tags?.length > 0 && (
            <p className="text-[10px] font-mono font-bold text-[#F5D900] mb-2 tracking-[0.18em] uppercase">
              {product.tags.slice(0, 3).join(' • ')}
            </p>
          )}

          {/* Title in Clean White */}
          <h3 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] mb-2 transition-colors group-hover:text-[#F5D900] line-clamp-1 leading-snug">
            <Link href={`/products/${product.category}/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-[#888888] leading-relaxed line-clamp-2 mb-4 font-light">
            {product.shortDescription || product.description}
          </p>
        </div>
      </div>

      {/* Footer: Price & Clean Action Button */}
      <div className="p-5 pt-0 border-t border-white/[0.06] flex flex-col gap-3">
        <div className="flex items-center justify-between pt-3">
          <div>
            <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#737373] block">Valuation</span>
            {product.price ? (
              <span className="font-serif text-2xl text-[#F5D900] font-semibold">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <span className="text-xs text-[#888888] font-medium font-mono">Inquire in Store</span>
            )}
          </div>
          {product.abv && (
            <span className="text-[10.5px] font-mono text-[#A0A0A0] bg-[#111111] px-2 py-1 rounded-sm border border-white/10">
              {product.abv}
            </span>
          )}
        </div>

        {/* Action Button: White with dark text, hover gold */}
        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="block w-full text-center py-2 px-4 rounded-sm bg-[#FFFFFF] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider hover:bg-[#F5D900] transition-colors"
        >
          View Bottle ↗
        </Link>
      </div>
    </article>
  );
}

import Link from 'next/link';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export const metadata = {
  title: '404 — Cellar Vintage Not Found | JFK Liquors Houston',
  description: 'The requested bottle, category, or page could not be located in our Houston vault.',
};

const POPULAR_DEPARTMENTS = [
  { label: 'Allocated Bourbon & Spirits', href: '/products/spirits', tag: '01' },
  { label: 'Cellar Vintages & Champagne', href: '/products/wines', tag: '02' },
  { label: 'Chilled Texas Craft Beer', href: '/products/beer', tag: '03' },
  { label: 'Artisanal Agave & Mezcal', href: '/products/agave-and-more', tag: '04' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FFFFFF]">
      <Header />

      <main className="flex-1 flex flex-col justify-center relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
        {/* Subtle Atmospheric Gold & Burgundy Warmth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 50% 25%, rgba(245, 217, 0, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 85%, rgba(91, 16, 24, 0.3) 0%, transparent 65%)',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full text-center">
          
          {/* Eyebrow Index Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#121316] border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900] animate-pulse" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#F5D900]">
              00 // ARCHIVE INDEX &bull; VINTAGE UNRESOLVED
            </span>
          </div>

          {/* Giant 404 Accent Display */}
          <div
            className="font-anton text-7xl sm:text-9xl lg:text-[11rem] text-[#F5D900] tracking-tight leading-none mb-3 select-none drop-shadow-[0_10px_35px_rgba(245,217,0,0.15)]"
          >
            404
          </div>

          {/* Headline in Anton */}
          <h1
            className="font-anton text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wide mb-6 max-w-3xl mx-auto leading-[1.05]"
          >
            This Bottle Has Been <span className="text-[#F5D900]">Claimed</span> or Relocated.
          </h1>

          {/* Narrative in Montserrat */}
          <p className="font-sans font-normal text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
            The vintage, shelf, or private cellar collection you are looking for is no longer accessible at this address. Our allocated bottles rotate daily along Houston’s IAH airport corridor.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/"
              prefetch={true}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#F5D900] text-[#050505] font-sans font-bold text-xs uppercase tracking-[0.18em] hover:bg-white transition-all shadow-lg shadow-[#F5D900]/20"
            >
              Return to Storefront &rarr;
            </Link>

            <Link
              href="/products"
              prefetch={true}
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#121316] text-white border border-white/15 font-sans font-bold text-xs uppercase tracking-[0.18em] hover:border-[#F5D900] hover:text-[#F5D900] transition-all"
            >
              Browse The Vault ↗
            </Link>

            <a
              href="tel:+12815903300"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-transparent text-neutral-300 border border-white/10 font-sans font-medium text-xs uppercase tracking-[0.18em] hover:text-white hover:border-white/30 transition-all"
            >
              Call Store: (281) 590-3300
            </a>
          </div>

          {/* Quick Department Shortcuts */}
          <div className="pt-10 border-t border-white/[0.08] max-w-2xl mx-auto">
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-neutral-400 mb-5">
              Explore Our Primary Departments
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {POPULAR_DEPARTMENTS.map((dept) => (
                <Link
                  key={dept.href}
                  href={dept.href}
                  prefetch={true}
                  className="p-3 rounded-sm bg-[#121316] border border-white/[0.08] hover:border-[#F5D900]/60 text-left transition-all group"
                >
                  <span className="text-[10px] font-mono font-bold text-[#F5D900] block mb-1">
                    {dept.tag}
                  </span>
                  <span className="text-xs font-sans font-medium text-neutral-200 group-hover:text-white line-clamp-1 transition-colors">
                    {dept.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* User's Mandatory Legal Notice */}
          <div className="mt-12 text-xs font-sans text-neutral-400">
            <p>
              <span className="text-[#F5D900] font-semibold">Stock changes daily.</span> Call{' '}
              <a href="tel:+12815903300" className="text-[#F5D900] font-bold underline hover:text-white">
                +1 281-590-3300
              </a>{' '}
              to check availability. Must be 21+ with valid ID.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

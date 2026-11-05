import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Our Store & Heritage | JFK Liquors Houston',
  description: 'Learn about JFK Liquors, Houston’s premier spirits destination located near George Bush Intercontinental Airport (IAH).',
};

export default function AboutPage() {
  return (
    <div className="bg-[#111111] text-[#FFFFFF] min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">About JFK Liquors</p>
          <h1
            className="font-display tracking-wide text-[#FFFFFF] uppercase"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}
          >
            A Passion for <span className="text-[#D4AF37]">Fine Craft</span>
          </h1>
          <div className="section-divider mx-auto my-6" />
        </div>

        {/* Feature Image */}
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-[#3A3A3A] mb-16 shadow-2xl bg-[#242424]">
          <Image
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80"
            alt="JFK Liquors Houston Selection"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
        </div>

        {/* Story Prose */}
        <div className="space-y-6 text-[#C7C7C7] font-light text-base sm:text-lg leading-relaxed">
          <p className="text-xl text-[#FFFFFF] font-normal leading-relaxed">
            Conveniently situated along John F Kennedy Boulevard just moments away from George Bush Intercontinental Airport (IAH), JFK Liquors was founded to deliver a premium, curated bottle shop experience to North Houston.
          </p>
          <p>
            Whether stepping off a flight seeking a rare Texas Bourbon, stocking up for an executive gathering, or picking up celebratory champagne for an evening at home, we believe shopping for spirits should be an inspiring and hospitable experience.
          </p>
          <p>
            Our spirits wall is meticulously curated from small-batch Kentucky and Texas craft distilleries to high-elevation Islay single malts, Japanese whiskies, additive-free artisan tequilas, and century-old French Cognac houses.
          </p>
        </div>

        {/* 3 Charcoal Value Cards with Burgundy/Gold Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A]">
            <h3 className="font-display text-2xl text-[#D4AF37] mb-3">Allocated &amp; Rare</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              We continually work with leading distributors to secure allocated barrel releases, rare proofs, and limited vintages.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A]">
            <h3 className="font-display text-2xl text-[#FFFFFF] mb-3">Expert Advice</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              Our staff loves great drinks. Ask us for tasting notes, pairing guidance, or host cocktail batch recommendations.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#242424] border border-[#3A3A3A]">
            <h3 className="font-display text-2xl text-[#D4AF37] mb-3">Airport Proximity</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              Quick in-and-out access near IAH terminals with free storefront parking right at Suite D.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="text-center pt-8 border-t border-[#242424] flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-gold">
            Visit Our Store
          </Link>
          <Link href="/products/spirits" className="btn-ghost">
            View All Spirits
          </Link>
        </div>

      </div>
    </div>
  );
}

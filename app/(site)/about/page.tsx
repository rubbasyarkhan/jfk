import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Our Store & Heritage | JFK Liquors Houston',
  description: 'Learn about JFK Liquors, Houston’s premier spirits destination located near George Bush Intercontinental Airport (IAH).',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="index-tag mb-3">01 // ABOUT JFK LIQUORS</p>
          <h1
            className="font-serif tracking-tight text-[#FFFFFF]"
            style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)', lineHeight: 1.05 }}
          >
            A Passion for <span className="italic text-[#F5D900] font-serif">Fine Craft.</span>
          </h1>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-[21/9] rounded overflow-hidden border border-white/10 mb-16 shadow-2xl bg-[#141414]">
          <Image
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80"
            alt="JFK Liquors Houston Selection"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
        </div>

        {/* Story Prose */}
        <div className="space-y-6 text-[#C7C7C7] font-light text-base sm:text-lg leading-relaxed">
          <p className="text-xl text-[#FFFFFF] font-normal leading-relaxed">
            Conveniently situated along John F Kennedy Boulevard just moments away from George Bush Intercontinental Airport (IAH), JFK Liquors was founded to deliver an elevated, curated bottle shop experience to North Houston.
          </p>
          <p>
            Whether stepping off an international flight seeking a rare Texas Bourbon, stocking up for an executive dinner, or picking up celebratory champagne for an evening at home, we believe shopping for spirits should be an inspiring and hospitable experience.
          </p>
          <p>
            Our spirits wall is meticulously curated from small-batch Kentucky and Texas craft distilleries to high-elevation Islay single malts, Japanese whiskies, additive-free artisan tequilas, and century-old French Cognac houses.
          </p>
        </div>

        {/* 3 Architectural Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#F5D900] mb-3">Allocated &amp; Rare</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              We continually work with leading distributors to secure allocated barrel releases, rare proofs, and limited vintages.
            </p>
          </div>
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#FFFFFF] mb-3">Expert Guidance</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              Our staff loves great drinks. Ask us for tasting notes, pairing guidance, or host cocktail batch recommendations.
            </p>
          </div>
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#F5D900] mb-3">Airport Proximity</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              Quick in-and-out access near IAH terminals with free storefront parking right at Suite D.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="text-center pt-8 border-t border-white/10 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-gold">
            Visit Our Store ↗
          </Link>
          <Link href="/products/spirits" className="btn-ghost">
            View All Spirits
          </Link>
        </div>

      </div>
    </div>
  );
}

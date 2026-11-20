import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Our Store | JFK Liquors Houston Near IAH',
  description: 'Learn about JFK Liquors, your neighborhood retail liquor store on John F Kennedy Boulevard near George Bush Intercontinental Airport (IAH) in Houston.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="index-tag mb-3">ABOUT JFK LIQUORS</p>
          <h1
            className="font-serif tracking-tight text-[#FFFFFF]"
            style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)', lineHeight: 1.05 }}
          >
            Your Neighborhood <span className="italic text-[#F5D900] font-serif">Bottle Shop.</span>
          </h1>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-[21/9] rounded overflow-hidden border border-white/10 mb-16 shadow-2xl bg-[#141414]">
          <Image
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80"
            alt="JFK Liquors Houston Retail Selection"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
        </div>

        {/* Story Prose */}
        <div className="space-y-6 text-[#C7C7C7] font-light text-base sm:text-lg leading-relaxed">
          <p className="text-xl text-[#FFFFFF] font-normal leading-relaxed">
            Conveniently located at 15655 John F Kennedy Boulevard, Suite D — just minutes from George Bush Intercontinental Airport (IAH) — JFK Liquors is a neighborhood retail liquor store serving local Houston residents, visitors, and travelers.
          </p>
          <p>
            Whether you are picking up a bottle on your way home, stocking up for a weekend gathering, or shopping for a gift, we provide a clean, welcoming store with a straightforward retail shopping experience.
          </p>
          <p>
            Our shelves are stocked with a broad selection of sealed spirits, wines, beers, and mixers — including bourbon and American whiskey, Scotch, tequila and mezcal, vodka, gin, rum, cognac, red and white wines, champagne, and cold craft and imported beer.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#F5D900] mb-3">Quality Selection</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              We carry a wide variety of popular national brands, Texas favorites, and special-occasion bottles across spirits, wine, and cold beer.
            </p>
          </div>
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#FFFFFF] mb-3">Friendly Service</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              Our store team is always glad to help you find a specific bottle on our shelves or choose a great option for your occasion.
            </p>
          </div>
          <div className="p-8 rounded bg-[#161616] border border-white/10">
            <h3 className="font-serif text-2xl text-[#F5D900] mb-3">Convenient Location</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              Quick in-and-out access on JFK Boulevard near IAH airport terminals with free storefront parking right outside Suite D.
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

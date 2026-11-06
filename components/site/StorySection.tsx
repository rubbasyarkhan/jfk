import Image from 'next/image';
import Link from 'next/link';

export default function StorySection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#161616] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Real Bottle Art Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#333333] bg-[#111111] aspect-[4/3] sm:aspect-[16/11] shadow-2xl group">
              <Image
                src="/assets/collection-story.jpg"
                alt="Curated spirits and tasting at JFK Liquors"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Gold Label on bottom left like original storefront */}
              <div className="absolute bottom-0 left-0 bg-[#F5D900] text-[#111111] py-3 px-5 text-[11px] font-bold tracking-widest uppercase">
                A BOTTLE FOR EVERY OCCASION
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5D900] mb-3 font-sans">
              LOCAL STORE &bull; PERSONAL TOUCH
            </p>
            
            <h2
              className="font-serif tracking-tight text-[#FFFFFF] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.05 }}
            >
              Your stop for
              <br />
              <span className="italic text-[#F5D900] font-serif">
                something good.
              </span>
            </h2>

            <div className="space-y-4 text-[#C7C7C7] leading-relaxed font-light text-base sm:text-lg mb-8 max-w-xl">
              <p>
                Stocking up for a get-together? Picking a gift? Or simply finding your favorite bottle? Stop by JFK Liquors and explore at your own pace.
              </p>
              <p>
                You&apos;ll find us on John F Kennedy Boulevard, near George Bush Intercontinental Airport in Houston. Ask our team for help choosing what to take home.
              </p>
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5D900] border-b border-[#F5D900]/40 pb-1 hover:border-[#F5D900] transition-colors"
              >
                <span>Get to know our store</span>
                <span>↗</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

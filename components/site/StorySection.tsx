import Image from 'next/image';
import Link from 'next/link';

export default function StorySection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#111111] border-t border-[#242424]">
      
      {/* Subtle gold spotlight */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #F5D900 0%, #5B1018 70%, transparent 80%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Real Bottle Art Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#383838] bg-[#242424] aspect-[4/5] shadow-2xl group">
              <Image
                src="/assets/collection-story.jpg"
                alt="Curated spirits and tasting at JFK Liquors"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              
              {/* Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, #111111 0%, rgba(20,20,20,0.2) 60%, transparent 100%)',
                }}
              />
              
              {/* Overlay Tag in Deep Burgundy */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#111111]/95 border border-[#5B1018] shadow-xl backdrop-blur-sm">
                <p className="text-[10px] font-bold text-[#F5D900] tracking-[0.2em] uppercase mb-1">
                  A Bottle For Every Occasion
                </p>
                <p className="text-xs text-[#C7C7C7] font-light leading-relaxed">
                  Serving Houston locals, airline crews, business travelers, and IAH visitors daily with southern hospitality.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7">
            
            <p className="eyebrow mb-2">LOCAL STORE &bull; PERSONAL TOUCH</p>
            
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

            <div className="space-y-5 text-[#C7C7C7] leading-relaxed font-light text-base sm:text-lg mb-8 max-w-xl">
              <p>
                Stocking up for a get-together? Picking a gift? Or simply finding your favorite bottle? Stop by JFK Liquors and explore at your own pace.
              </p>
              <p>
                You&apos;ll find us on John F Kennedy Boulevard, near George Bush Intercontinental Airport in Houston. Our team is always on hand with honest recommendations, cold craft six-packs, and access to allocated barrels.
              </p>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 mb-8 border-t border-[#242424]">
              <div>
                <p className="font-serif text-3xl sm:text-4xl text-[#F5D900] mb-1">500+</p>
                <p className="text-xs text-[#FFFFFF] font-bold uppercase tracking-wider">Distinct Labels</p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] mb-1">6 Days</p>
                <p className="text-xs text-[#FFFFFF] font-bold uppercase tracking-wider">11am – 9pm</p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl text-[#F5D900] mb-1">IAH</p>
                <p className="text-xs text-[#FFFFFF] font-bold uppercase tracking-wider">3 Min Away</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-gold">
                <span>Get To Know Our Store</span>
                <span>↗</span>
              </Link>
              <Link href="/contact" className="btn-ghost">
                Plan Your Visit
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

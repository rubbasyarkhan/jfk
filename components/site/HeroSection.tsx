import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center bg-[#111111] overflow-hidden">
      
      {/* Background / Right-side Hero Image (heromain.jpg) */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/assets/heromain.jpg"
            alt="JFK Liquors curated spirits & bottle collection"
            fill
            priority
            className="object-cover object-right lg:object-center"
            sizes="100vw"
          />
          
          {/* Cinematic Dark Gradient: Pure deep black on left, fading smoothly across */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #111111 0%, #111111 25%, rgba(17,17,17,0.85) 50%, rgba(17,17,17,0.35) 75%, rgba(17,17,17,0.2) 100%)',
            }}
          />

          {/* Bottom vignette to blend into next section */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>
      </div>

      {/* Content Container (Left-aligned over the black gradient) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Main Luxury Heading */}
          <h1
            className="font-serif text-[#FFFFFF] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3rem, 6.2vw, 5.25rem)',
              lineHeight: 1.02,
            }}
          >
            Good taste.
            <br />
            Great company.
            <br />
            <span className="italic text-[#F5D900] font-serif">
              JFK Liquors.
            </span>
          </h1>

          {/* Small Strong Paragraph */}
          <p className="text-base sm:text-lg text-[#D0CEC2] mb-10 leading-relaxed font-light max-w-lg">
            From your everyday favorite to a bottle worth celebrating. Discover allocated bourbons, rare single malts, cellar wines, and cold Texas craft beers on JFK Boulevard.
          </p>

          {/* Exactly Two Clean CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#collection" className="btn-gold group">
              <span>Explore Our Selection</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Get Directions
            </a>
          </div>

          {/* Minimal Airport & Address Note */}
          <div className="mt-12 pt-6 border-t border-[#242424]/80 flex items-center gap-2 text-xs text-[#A0A0A0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900]" />
            <span>
              15655 John F Kennedy Blvd, Suite D &bull; Houston, TX &bull; 3 Min from IAH
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      
      {/* Background / Right-side Cinematic Hero Image (heromain.jpg) */}
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
          
          {/* Awwwards Multi-Layer Dark Gradient: Pure deep Obsidian black on left, fading smoothly across */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #0A0A0A 0%, #0A0A0A 28%, rgba(10,10,10,0.85) 55%, rgba(10,10,10,0.35) 80%, rgba(10,10,10,0.2) 100%)',
            }}
          />

          {/* Bottom vignette to blend into next section */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Micro-Index Label (Awwwards Style) */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900]" />
            <p className="index-tag">
              [ VOL. 2026 // HOUSTON CASK VAULT ]
            </p>
          </div>

          {/* Monumental Editorial Heading */}
          <h1
            className="font-serif text-[#FFFFFF] tracking-tight mb-7"
            style={{
              fontSize: 'clamp(3.2rem, 6.8vw, 5.75rem)',
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

          {/* Exactly Two CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link href="#collection" className="btn-gold group">
              <span>Explore The Selection</span>
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

          {/* Awwwards Geographic Index Footer */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-[11px] font-mono tracking-widest text-[#888888]">
            <span className="text-[#F5D900] font-bold">29.9844° N, 95.3414° W</span>
            <span className="text-white/20">&bull;</span>
            <span>IAH AIRPORT CORRIDOR</span>
            <span className="text-white/20">&bull;</span>
            <span>SUITE D</span>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt at Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-[#888888] uppercase">
        <span>Scroll to Explore</span>
        <svg className="w-3.5 h-3.5 text-[#F5D900] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

    </section>
  );
}

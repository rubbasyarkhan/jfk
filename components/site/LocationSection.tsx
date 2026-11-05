export default function LocationSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#0E0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Location Info */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-2">Convenient Houston Location</p>
            <h2
              className="font-serif tracking-tight text-[#FFFFFF] mb-5"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1.05 }}
            >
              Visit Store Near{' '}
              <span className="text-[#D4AF37]">IAH Airport</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mb-8" />

            <div className="space-y-4">
              
              {/* Address in Charcoal Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#141414] border border-[#2E2E2E]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#D4AF37]/30 text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Storefront Address
                  </h4>
                  <address className="not-italic text-sm text-[#FFFFFF] leading-relaxed font-medium">
                    15655 John F Kennedy Blvd, Suite D<br />
                    Houston, TX 77032
                  </address>
                  <p className="text-xs text-[#A5A5A5] mt-1 font-light">
                    Direct access off JFK Blvd with ample storefront parking. 3 minutes from IAH Airport.
                  </p>
                </div>
              </div>

              {/* Hours in Charcoal Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#141414] border border-[#2E2E2E]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#D4AF37]/30 text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Store Hours
                  </h4>
                  <div className="text-sm space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#A5A5A5]">Monday – Saturday:</span>
                      <span className="font-bold text-[#FFFFFF]">11:00 AM – 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A5A5A5]">Sunday:</span>
                      <span className="font-bold text-[#D4AF37]/80">Closed (Texas Law)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone in Charcoal Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#141414] border border-[#2E2E2E]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#D4AF37]/30 text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Direct Telephone
                  </h4>
                  <a
                    href="tel:+12815903300"
                    className="text-base font-bold text-[#FFFFFF] hover:text-[#D4AF37] transition-colors block font-mono"
                  >
                    +1 (281) 590-3300
                  </a>
                </div>
              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Get Driving Directions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="tel:+12815903300"
                className="btn-ghost"
              >
                Call Store
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed in Luxury Dark Charcoal Frame */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#2E2E2E] shadow-2xl bg-[#141414]">
              {/* Map Header */}
              <div className="px-5 py-3 border-b border-[#262626] bg-[#0E0D0D] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-[11px] font-bold text-[#FFFFFF] tracking-wider uppercase font-mono">
                    15655 JFK BLVD SUITE D
                  </span>
                </div>
                <span className="text-[11px] text-[#A5A5A5]">3 Mins from Terminals</span>
              </div>

              {/* Map Iframe */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full">
                <iframe
                  title="JFK Liquors Google Map Location"
                  src="https://maps.google.com/maps?q=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter invert-[0.92] hue-rotate-[180deg] contrast-[1.1] grayscale-[0.25]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Map Footer Bar */}
              <div className="px-5 py-3 border-t border-[#262626] bg-[#0E0D0D] flex items-center justify-between text-xs">
                <span className="text-[#A5A5A5]">Easy pull-in from JFK Blvd</span>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] font-bold uppercase tracking-wider hover:underline"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

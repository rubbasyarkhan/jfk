export default function LocationSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Location Info */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-2">COME SAY HELLO</p>
            <h2
              className="font-serif tracking-tight text-[#FFFFFF] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.05 }}
            >
              Right on JFK.
              <br />
              <span className="italic text-[#F5D900] font-serif">
                Close to IAH.
              </span>
            </h2>

            <div className="space-y-4 mb-8">
              
              {/* Address in Charcoal Card */}
              <div className="p-5 rounded-xl bg-[#242424] border border-[#383838]">
                <h4 className="text-[11px] font-bold text-[#F5D900] uppercase tracking-wider mb-1">
                  Storefront Address
                </h4>
                <address className="not-italic text-sm text-[#FFFFFF] leading-relaxed font-medium">
                  15655 John F Kennedy Blvd, Suite D<br />
                  Houston, TX 77032
                </address>
                <p className="text-xs text-[#A0A0A0] mt-1 font-light">
                  Conveniently located near George Bush Intercontinental Airport (IAH) with dedicated storefront parking.
                </p>
              </div>

              {/* Hours in Charcoal Card */}
              <div className="p-5 rounded-xl bg-[#242424] border border-[#383838]">
                <h4 className="text-[11px] font-bold text-[#F5D900] uppercase tracking-wider mb-2">
                  Store Hours
                </h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#C7C7C7]">Monday — Saturday:</span>
                    <span className="font-bold text-[#FFFFFF]">11:00 AM — 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C7C7C7]">Sunday:</span>
                    <span className="font-bold text-[#F5D900]">Closed (Texas Law)</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <span>Get Directions</span>
                <span>↗</span>
              </a>
              <a
                href="tel:+12815903300"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FFFFFF] hover:text-[#F5D900] transition-colors font-mono"
              >
                (281) 590-3300
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl overflow-hidden border border-[#383838] shadow-2xl bg-[#242424]">
              {/* Map Bar */}
              <div className="px-5 py-3 border-b border-[#383838] bg-[#111111] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#F5D900] tracking-wider uppercase font-mono">
                  15655 JFK BLVD &bull; SUITE D
                </span>
                <span className="text-[11px] text-[#A0A0A0]">3 Mins from IAH</span>
              </div>

              {/* Map Iframe */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full">
                <iframe
                  title="Find JFK Liquors in Houston"
                  src="https://maps.google.com/maps?q=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter invert-[0.92] hue-rotate-[180deg] contrast-[1.1] grayscale-[0.25]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Footer Bar */}
              <div className="px-5 py-3 border-t border-[#383838] bg-[#111111] flex items-center justify-between text-xs">
                <span className="text-[#A0A0A0]">Direct pull-in from JFK Blvd</span>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5D900] font-bold uppercase tracking-wider hover:underline"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

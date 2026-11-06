export default function LocationSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#1A1A1A] border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Location Info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5D900] mb-3 font-sans">
              COME SAY HELLO
            </p>
            
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

            <p className="text-lg text-[#FFFFFF] font-medium leading-relaxed mb-1">
              15655 John F Kennedy Blvd, Suite D
            </p>
            <p className="text-sm text-[#C7C7C7] mb-2 font-light">
              Houston, TX 77032
            </p>
            <p className="text-xs text-[#888888] font-light mb-8">
              Conveniently located near George Bush Intercontinental Airport (IAH).
            </p>

            {/* Store Hours Table */}
            <div className="border-t border-b border-white/10 py-4 mb-8 text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[#C7C7C7]">Monday — Saturday</span>
                <span className="font-semibold text-[#F5D900]">11:00 AM — 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#C7C7C7]">Sunday</span>
                <span className="font-semibold text-[#888888]">Closed</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <span>Get directions</span>
                <span className="text-xs">↗</span>
              </a>

              <a
                href="tel:+12815903300"
                className="text-sm font-semibold text-[#F5D900] hover:underline font-mono"
              >
                (281) 590-3300
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7">
            <div className="relative rounded-lg overflow-hidden border border-[#333333] shadow-2xl bg-[#111111] aspect-[16/11]">
              <iframe
                title="Find JFK Liquors in Houston"
                src="https://maps.google.com/maps?q=15655+John+F+Kennedy+Blvd+Suite+D+Houston+TX+77032&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[0.6] contrast-[1.05]"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function DeliverySection() {
  return (
    <section id="delivery" className="py-24 sm:py-32 relative bg-[#0E0D0D] border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-2">On-Demand Concierge</p>
          <h2
            className="font-serif tracking-tight text-[#FFFFFF]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1.05 }}
          >
            Direct To Your <span className="text-[#D4AF37]">Doorstep</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-5" />
          <p className="text-[#A5A5A5] text-sm sm:text-base leading-relaxed font-light">
            Staying near IAH airport or hosting tonight in North Houston? Enjoy fast courier delivery directly from JFK Liquors via your preferred platform.
          </p>
        </div>

        {/* 2 Charcoal Delivery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Uber Eats Card */}
          <a
            href="https://www.ubereats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 sm:p-10 rounded-2xl border border-[#2E2E2E] bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-black/70 block"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#262626]">
                <svg className="w-7 h-7 text-[#67cb89]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-[#67cb89] bg-[#67cb89]/10 px-3 py-1 rounded-full border border-[#67cb89]/25">
                Official Partner
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] mb-2 leading-tight">
              Uber <span className="text-[#67cb89]">Eats</span>
            </h3>
            
            <p className="text-[#A5A5A5] text-sm leading-relaxed mb-8 font-light">
              Full chilled inventory available with fast courier delivery across Houston airport hotels, Greenspoint, and surrounding neighborhoods.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] group-hover:underline">
              <span>Order On Uber Eats</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>

          {/* DoorDash Card */}
          <a
            href="https://www.doordash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 sm:p-10 rounded-2xl border border-[#2E2E2E] bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-black/70 block"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#262626]">
                <svg className="w-7 h-7 text-[#ff6451]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-[#ff6451] bg-[#ff6451]/10 px-3 py-1 rounded-full border border-[#ff6451]/25">
                Official Partner
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#ff6451] mb-2 leading-tight">
              DoorDash
            </h3>

            <p className="text-[#A5A5A5] text-sm leading-relaxed mb-8 font-light">
              Order your favorite bottles, cold craft six-packs, mixers, cups, and bag ice anytime during store hours directly to your door.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] group-hover:underline">
              <span>Order On DoorDash</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}

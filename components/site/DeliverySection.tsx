export default function DeliverySection() {
  return (
    <section id="delivery" className="py-24 sm:py-32 relative bg-[#111111] border-t border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-2">YOUR FAVORITES, DELIVERED</p>
          <h2
            className="font-serif tracking-tight text-[#FFFFFF] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.05 }}
          >
            Staying in?
            <br />
            <span className="italic text-[#F5D900] font-serif">
              We&apos;ve got options.
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed font-light">
            We&apos;re also available on Uber Eats and DoorDash. Open your preferred app and search for <strong className="text-[#FFFFFF]">JFK Liquors, Houston</strong>.
          </p>
          <p className="text-xs text-[#737373] mt-2 font-mono">
            Availability, selection, fees and delivery area are shown in each app. 21+ with valid government ID required upon delivery.
          </p>
        </div>

        {/* 2 Charcoal Delivery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Uber Eats Card */}
          <a
            href="https://www.ubereats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 sm:p-10 rounded-xl border border-[#383838] bg-[#242424] transition-all duration-300 hover:border-[#F5D900] hover:shadow-2xl block"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="text-2xl font-serif text-[#FFFFFF]">
                Uber <span className="text-[#67cb89] font-bold">Eats</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#67cb89] bg-[#67cb89]/10 px-2.5 py-1 rounded border border-[#67cb89]/30">
                Official Partner
              </span>
            </div>
            
            <p className="text-[#C7C7C7] text-sm leading-relaxed mb-8 font-light">
              Find JFK Liquors in the Uber Eats app. Full chilled inventory available with fast courier delivery across Houston airport hotels and neighborhoods.
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F5D900] group-hover:underline">
              <span>Open Uber Eats</span>
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
            </div>
          </a>

          {/* DoorDash Card */}
          <a
            href="https://www.doordash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-8 sm:p-10 rounded-xl border border-[#383838] bg-[#242424] transition-all duration-300 hover:border-[#F5D900] hover:shadow-2xl block"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="text-2xl font-serif text-[#ff6451] font-bold">
                DoorDash
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff6451] bg-[#ff6451]/10 px-2.5 py-1 rounded border border-[#ff6451]/30">
                Official Partner
              </span>
            </div>

            <p className="text-[#C7C7C7] text-sm leading-relaxed mb-8 font-light">
              Find JFK Liquors in the DoorDash app. Order your favorite bottles, cold craft six-packs, mixers, cups, and bag ice anytime during store hours.
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F5D900] group-hover:underline">
              <span>Open DoorDash</span>
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}

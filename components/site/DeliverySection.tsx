export default function DeliverySection() {
  return (
    <section id="delivery" className="py-24 sm:py-32 relative bg-[#111111] border-t border-white/[0.08]">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Copy (Exact match to user screenshot) */}
          <div className="lg:col-span-6">
            <p className="index-tag mb-4">
              YOUR FAVORITES, DELIVERED
            </p>

            <h2
              className="font-anton tracking-wide uppercase mb-6"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
                lineHeight: 0.95,
              }}
            >
              <span className="text-[#FFFFFF] block">STAYING IN?</span>
              <span className="text-[#F5D900] block mt-1">WE&apos;VE GOT OPTIONS.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#C7C7C7] leading-relaxed font-light mb-6 max-w-lg">
              We&apos;re also available on Uber Eats and DoorDash. Open your preferred app and search for <strong className="text-[#FFFFFF] font-semibold">JFK Liquors, Houston</strong>.
            </p>

            <p className="text-xs text-[#737373] font-mono leading-relaxed max-w-md">
              Availability, selection, fees and delivery area are shown in the app. 21+ with valid ID.
            </p>
          </div>

          {/* Right Column: Two Charcoal Delivery Cards (Exact match to user screenshot) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Uber Eats Card */}
            <a
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-7 sm:p-8 rounded-sm border border-[#333333] bg-[#161616] transition-all duration-300 hover:border-[#F5D900] hover:bg-[#1C1C1C]"
            >
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF] mb-2 font-sans">
                Uber <span className="text-[#67cb89]">Eats</span>
              </h3>
              
              <p className="text-sm text-[#A0A0A0] font-light mb-5">
                Find JFK Liquors in the Uber Eats app.
              </p>

              <span className="text-xs font-semibold text-[#F5D900] inline-flex items-center gap-1 group-hover:underline">
                <span>Open Uber Eats</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
            </a>

            {/* DoorDash Card */}
            <a
              href="https://www.doordash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-7 sm:p-8 rounded-sm border border-[#333333] bg-[#161616] transition-all duration-300 hover:border-[#F5D900] hover:bg-[#1C1C1C]"
            >
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ff6451] mb-2 font-sans">
                DoorDash
              </h3>

              <p className="text-sm text-[#A0A0A0] font-light mb-5">
                Find JFK Liquors in the DoorDash app.
              </p>

              <span className="text-xs font-semibold text-[#F5D900] inline-flex items-center gap-1 group-hover:underline">
                <span>Open DoorDash</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}

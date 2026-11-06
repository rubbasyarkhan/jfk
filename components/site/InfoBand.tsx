export default function InfoBand() {
  return (
    <div className="w-full relative z-20 bg-[#161616] border-y border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#333333]">

          {/* Col 1: Store Hours */}
          <div className="flex items-center justify-center py-4 px-6 text-center">
            <span className="text-xs sm:text-[13px] tracking-wider uppercase font-sans">
              <span className="text-[#e0e0e0] font-normal">MON–SAT </span>
              <strong className="text-[#FFFFFF] font-bold">11:00 AM — 9:00 PM</strong>
              <span className="text-[#F5D900] font-bold ml-1.5">&bull; SUN CLOSED</span>
            </span>
          </div>

          {/* Col 2: On-Demand Delivery Partners */}
          <div className="flex items-center justify-center py-4 px-6 text-center">
            <span className="text-xs sm:text-[13px] tracking-wider uppercase font-sans">
              <span className="text-[#e0e0e0] font-normal">FIND US ON </span>
              <a
                href="https://www.ubereats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#67cb89] font-bold hover:underline"
              >
                UBER EATS
              </a>
              <span className="text-[#e0e0e0] mx-1"> + </span>
              <a
                href="https://www.doordash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6451] font-bold hover:underline"
              >
                DOORDASH
              </a>
            </span>
          </div>

          {/* Col 3: Call The Store */}
          <div className="flex items-center justify-center py-4 px-6 text-center">
            <a
              href="tel:+12815903300"
              className="text-xs sm:text-[13px] tracking-wider uppercase font-sans text-[#FFFFFF] hover:text-[#F5D900] transition-colors inline-flex items-center gap-1.5"
            >
              <span className="text-[#CCCCCC] font-normal">CALL THE STORE</span>
              <strong className="text-[#F5D900] font-bold underline decoration-[#F5D900]/40">
                (281) 590-3300 ↗
              </strong>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

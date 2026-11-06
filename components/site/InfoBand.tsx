export default function InfoBand() {
  return (
    <div className="w-full relative z-20 bg-[#242424] border-y border-[#383838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#383838]">

          {/* Hours */}
          <div className="flex items-center justify-center gap-4 py-4 px-6 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-[#A0A0A0]">
              MON–SAT <strong className="text-[#FFFFFF] font-bold">11:00 AM — 9:00 PM</strong> &bull; <span className="text-[#F5D900]">SUN CLOSED</span>
            </span>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-center gap-4 py-4 px-6 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-[#A0A0A0]">
              FIND US ON <strong className="text-[#67cb89]">UBER EATS</strong> + <strong className="text-[#ff6451]">DOORDASH</strong>
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-4 py-4 px-6 text-center sm:text-left">
            <a
              href="tel:+12815903300"
              className="text-xs uppercase tracking-widest text-[#FFFFFF] hover:text-[#F5D900] transition-colors"
            >
              CALL THE STORE <strong className="text-[#F5D900] underline font-bold ml-1">(281) 590-3300 ↗</strong>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

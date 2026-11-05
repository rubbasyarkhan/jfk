export default function InfoBand() {
  return (
    <div className="w-full relative z-20 bg-[#141414] border-y border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#262626]">

          {/* Hours */}
          <div className="flex items-center justify-center gap-4 py-4 px-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#2E2E2E] flex-shrink-0 text-[#D4AF37]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-0.5">
                Store Hours
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#FFFFFF]">
                Mon–Sat 11:00 AM – 9:00 PM &bull; <span className="text-[#D4AF37]/80">Sun Closed (TX Law)</span>
              </p>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-center gap-4 py-4 px-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#2E2E2E] flex-shrink-0 text-[#D4AF37]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-0.5">
                On-Demand Courier Delivery
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#FFFFFF]">
                Order via{' '}
                <a
                  href="https://www.ubereats.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#67cb89]"
                >
                  Uber Eats
                </a>
                {' '}or{' '}
                <a
                  href="https://www.doordash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#ff6451]"
                >
                  DoorDash
                </a>
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-4 py-4 px-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#0E0D0D] border border-[#2E2E2E] flex-shrink-0 text-[#D4AF37]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-0.5">
                Houston Store Direct
              </p>
              <a
                href="tel:+12815903300"
                className="text-xs sm:text-sm font-bold text-[#FFFFFF] hover:text-[#D4AF37] transition-colors font-mono"
              >
                +1 (281) 590-3300
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

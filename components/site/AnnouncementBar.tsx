export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#5B1018] border-b border-[#F5D900]/25 text-center py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5D900] animate-pulse hidden sm:inline-block" />
        <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#FFFFFF] uppercase">
          Houston, Texas &bull; Near George Bush Intercontinental Airport (IAH) &bull;{' '}
          <span className="text-[#F5D900] underline decoration-[#F5D900]/50 ml-1">
            Allocated Spirits In Stock
          </span>
        </p>
      </div>
    </div>
  );
}

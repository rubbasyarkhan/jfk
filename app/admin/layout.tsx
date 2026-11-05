import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#111111] text-[#FFFFFF] flex">
      <AdminSidebar />
      <div className="pl-64 flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#242424] bg-[#161616]/95 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
              JFK Liquors Admin Console
            </span>
          </div>
          <div className="text-xs text-[#A0A0A0] font-mono">
            Houston Storefront &bull; WebP Engine
          </div>
        </header>

        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

import AgeGate from '@/components/site/AgeGate';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-[#FFFFFF]">
      <AgeGate />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';

const SHOP_LINKS = [
  { label: 'Spirits Selection', href: '/products/spirits' },
  { label: 'Wine Selection', href: '/products/wines' },
  { label: 'Beer Selection', href: '/products/beer' },
  { label: 'Agave & More Selection', href: '/products/agave-and-more' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.08] text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Col 1: Logo & Overview */}
          <div className="space-y-4">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/assets/logo.png"
                alt="JFK Liquors"
                width={160}
                height={55}
                className="object-contain h-10 w-auto"
              />
            </Link>
            <p className="text-[#888888] text-xs leading-relaxed max-w-xs font-light">
              Houston’s elevated bottle shop on JFK Boulevard adjacent to George Bush Intercontinental Airport (IAH).
            </p>
            <div className="pt-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5D900] px-2.5 py-1 rounded-sm bg-[#161616] border border-white/10">
                Licensed Houston Retailer
              </span>
            </div>
          </div>

          {/* Col 2: Find Us */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-[#F5D900] uppercase tracking-[0.2em] mb-4">
              Find Us Near IAH
            </h4>
            <address className="not-italic text-sm text-[#A0A0A0] leading-relaxed space-y-1 mb-4 font-light">
              <p className="font-semibold text-[#FFFFFF]">JFK Liquors Storefront</p>
              <p>15655 John F Kennedy Blvd</p>
              <p>Suite D &bull; Houston, TX 77032</p>
            </address>
            <a
              href="tel:+12815903300"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F5D900] hover:underline transition-colors"
            >
              +1 (281) 590-3300 ↗
            </a>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-[#F5D900] uppercase tracking-[0.2em] mb-4">
              Store Hours
            </h4>
            <div className="text-xs text-[#A0A0A0] space-y-2 font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span>Monday – Saturday:</span>
                <span className="font-semibold text-[#FFFFFF]">11 AM – 9 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span>Sunday:</span>
                <span className="font-semibold text-[#737373]">Closed (TX Law)</span>
              </div>
            </div>
            <p className="text-[11px] text-[#737373] mt-3 font-mono">
              Delivery via Uber Eats &amp; DoorDash.
            </p>
          </div>

          {/* Col 4: Shop Links */}
          <div>
            <h4 className="text-[11px] font-mono font-bold text-[#F5D900] uppercase tracking-[0.2em] mb-4">
              Shop Departments
            </h4>
            <ul className="space-y-2 text-xs">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A0A0A0] hover:text-[#F5D900] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-[#F5D900]">&bull;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/admin/login"
                  className="text-[11px] font-mono text-[#737373] hover:text-[#F5D900] uppercase tracking-wider transition-colors"
                >
                  Admin Management Portal ↗
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#737373] font-mono">
          <p>
            &copy; {year} JFK Liquors, Houston, Texas. All rights reserved.
          </p>
          <p className="text-[#F5D900] tracking-wider text-[11px] uppercase font-bold">
            Must be 21+ with valid government ID. Drink responsibly.
          </p>
        </div>

      </div>
    </footer>
  );
}

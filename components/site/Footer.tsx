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
    <footer className="bg-[#111111] border-t border-[#242424] text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Col 1: Logo & Overview */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo.png"
                alt="JFK Liquors"
                width={160}
                height={55}
                className="object-contain"
              />
            </Link>
            <p className="text-[#A0A0A0] text-xs leading-relaxed max-w-xs font-light">
              Houston’s elevated spirits, wine and cold craft beer storefront on JFK Boulevard adjacent to George Bush Intercontinental Airport (IAH).
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5D900] px-2.5 py-1 rounded bg-[#242424] border border-[#383838]">
                Licensed Houston Retailer
              </span>
            </div>
          </div>

          {/* Col 2: Find Us */}
          <div>
            <h4 className="text-xs font-bold text-[#F5D900] uppercase tracking-widest mb-4">
              Find Us Near IAH
            </h4>
            <address className="not-italic text-sm text-[#C7C7C7] leading-relaxed space-y-1 mb-4 font-light">
              <p className="font-semibold text-[#FFFFFF]">JFK Liquors Storefront</p>
              <p>15655 John F Kennedy Blvd</p>
              <p>Suite D &bull; Houston, TX 77032</p>
            </address>
            <a
              href="tel:+12815903300"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F5D900] hover:text-[#FFFFFF] transition-colors font-mono"
            >
              +1 281-590-3300
            </a>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h4 className="text-xs font-bold text-[#F5D900] uppercase tracking-widest mb-4">
              Store Hours
            </h4>
            <div className="text-xs sm:text-sm text-[#C7C7C7] space-y-2 font-light">
              <div className="flex justify-between py-1 border-b border-[#242424]">
                <span>Monday – Saturday:</span>
                <span className="font-semibold text-[#FFFFFF]">11:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#242424]">
                <span>Sunday:</span>
                <span className="font-semibold text-[#F5D900]">Closed (Texas Law)</span>
              </div>
            </div>
            <p className="text-[11px] text-[#A0A0A0] mt-3">
              Delivery via Uber Eats &amp; DoorDash during open hours.
            </p>
          </div>

          {/* Col 4: Shop Links */}
          <div>
            <h4 className="text-xs font-bold text-[#F5D900] uppercase tracking-widest mb-4">
              Shop Departments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#C7C7C7] hover:text-[#F5D900] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-[#F5D900]">&bull;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/admin/login"
                  className="text-[11px] text-[#A0A0A0]/70 hover:text-[#F5D900] uppercase tracking-wider transition-colors"
                >
                  Admin Management Portal ↗
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="mt-16 pt-8 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#A0A0A0]">
          <p>
            &copy; {year} JFK Liquors, Houston, Texas. All rights reserved.
          </p>
          <p className="text-[#F5D900] tracking-wider text-[11px] uppercase font-bold">
            Must be 21+ with valid government ID. Please drink responsibly.
          </p>
        </div>

      </div>
    </footer>
  );
}

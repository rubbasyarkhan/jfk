import Image from 'next/image';
import Link from 'next/link';

const SHOP_LINKS = [
  { label: 'Spirits & Bourbon', href: '/products/spirits' },
  { label: 'Wines & Champagne', href: '/products/wines' },
  { label: 'Craft & Domestic Beer', href: '/products/beer' },
  { label: 'Agave, Mezcal & Mixers', href: '/products/agave-and-more' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-[#262626] text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Col 1: Logo & Overview */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo.png"
                alt="JFK Liquors"
                width={170}
                height={60}
                className="object-contain"
              />
            </Link>
            <p className="text-[#A5A5A5] text-xs leading-relaxed max-w-xs font-light">
              Houston’s elevated spirits, wine and cold craft beer storefront on JFK Boulevard adjacent to George Bush Intercontinental Airport (IAH).
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] px-2.5 py-1 rounded bg-[#141414] border border-[#2E2E2E]">
                Licensed Houston Retailer
              </span>
            </div>
          </div>

          {/* Col 2: Find Us */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">
              Find Us Near IAH
            </h4>
            <address className="not-italic text-sm text-[#A5A5A5] leading-relaxed space-y-1 mb-4 font-light">
              <p className="font-semibold text-[#FFFFFF]">JFK Liquors Storefront</p>
              <p>15655 John F Kennedy Blvd</p>
              <p>Suite D &bull; Houston, TX 77032</p>
            </address>
            <a
              href="tel:+12815903300"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#FFFFFF] transition-colors font-mono"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (281) 590-3300
            </a>
          </div>

          {/* Col 3: Hours */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">
              Store Hours
            </h4>
            <div className="text-xs sm:text-sm text-[#A5A5A5] space-y-2 font-light">
              <div className="flex justify-between py-1 border-b border-[#262626]">
                <span>Monday – Saturday:</span>
                <span className="font-semibold text-[#FFFFFF]">11:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#262626]">
                <span>Sunday:</span>
                <span className="font-semibold text-[#D4AF37]/80">Closed (Texas Law)</span>
              </div>
            </div>
            <p className="text-[11px] text-[#737373] mt-3">
              Delivery via Uber Eats &amp; DoorDash during open hours.
            </p>
          </div>

          {/* Col 4: Departments */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">
              Departments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A5A5A5] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-[#D4AF37]">&bull;</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="text-[11px] text-[#737373] hover:text-[#D4AF37] uppercase tracking-wider transition-colors"
                >
                  Admin Management Portal &rarr;
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Age Disclaimer */}
        <div className="mt-16 pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#737373]">
          <p>
            &copy; {year} JFK Liquors, Houston, Texas. All rights reserved.
          </p>
          <p className="text-[#D4AF37] tracking-wider text-[11px] uppercase font-bold">
            Must be 21+ with valid government ID. Please drink responsibly.
          </p>
        </div>

      </div>
    </footer>
  );
}

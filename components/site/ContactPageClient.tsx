'use client';

import LocationSection from '@/components/site/LocationSection';
import { useSiteContent } from '@/lib/useSiteContent';

export default function ContactPageClient() {
  const { contactPage } = useSiteContent();

  return (
    <div className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen">
      <div className="pt-24 pb-14 text-center border-b border-white/[0.08] bg-[#0D0D0D]">
        <p className="index-tag mb-3">{contactPage.eyebrow}</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#FFFFFF] tracking-tight">
          {contactPage.headingWhite}{' '}
          <span className="italic text-[#F5D900] font-serif">
            {contactPage.headingGold}
          </span>
        </h1>
        <p className="text-[#A0A0A0] max-w-lg mx-auto text-sm sm:text-base px-4 font-light mt-4">
          {contactPage.subtitle}
        </p>
      </div>

      <LocationSection />
    </div>
  );
}

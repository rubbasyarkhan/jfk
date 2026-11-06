import LocationSection from '@/components/site/LocationSection';

export const metadata = {
  title: 'Visit Us & Contact | JFK Liquors Houston',
  description: 'Find JFK Liquors near George Bush Intercontinental Airport (IAH). Address, hours, telephone, directions, and maps.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen">
      <div className="pt-24 pb-14 text-center border-b border-white/[0.08] bg-[#0D0D0D]">
        <p className="index-tag mb-3">01 // HOUSTON STOREFRONT &bull; NEAR IAH</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#FFFFFF] tracking-tight">
          Visit <span className="italic text-[#F5D900] font-serif">JFK Liquors.</span>
        </h1>
        <p className="text-[#A0A0A0] max-w-lg mx-auto text-sm sm:text-base px-4 font-light mt-4">
          Conveniently located on John F Kennedy Blvd, Suite D, minutes from IAH terminals. Free parking on-site.
        </p>
      </div>

      <LocationSection />
    </div>
  );
}

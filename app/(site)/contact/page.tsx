import LocationSection from '@/components/site/LocationSection';

export const metadata = {
  title: 'Visit Us & Contact | JFK Liquors Houston',
  description: 'Find JFK Liquors near George Bush Intercontinental Airport (IAH). Address, hours, telephone, directions, and maps.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#111111] text-[#FFFFFF] min-h-screen">
      <div className="pt-20 pb-10 text-center border-b border-[#242424] bg-gradient-to-b from-[#1C1C1C] to-[#111111]">
        <p className="eyebrow mb-2">Houston, Texas</p>
        <h1 className="font-display text-4xl sm:text-5xl text-[#FFFFFF] uppercase">
          Visit JFK Liquors
        </h1>
        <div className="section-divider mx-auto my-4" />
        <p className="text-[#A0A0A0] max-w-lg mx-auto text-sm sm:text-base px-4 font-light">
          Conveniently located on John F Kennedy Blvd, Suite D, minutes from IAH terminals. Free parking on-site.
        </p>
      </div>

      <LocationSection />
    </div>
  );
}

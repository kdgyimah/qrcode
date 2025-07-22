import Image from "next/image";

export default function PricingHeroSec() {
  return (
    <section className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/priceheroimg.jpg"
        alt="Pricing Background"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Choose Your Plan
        </h1>
        <p className="text-base md:text-lg max-w-2xl text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
}

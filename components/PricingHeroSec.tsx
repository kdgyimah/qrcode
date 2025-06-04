import Image from "next/image";

export default function PricingHeroSec() {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/priceheroimg.jpg" // Replace with your image path
        alt="Pricing Background"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />

      {/* Softer Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" /> {/* 40% opacity */}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg md:text-xl max-w-3xl text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
}

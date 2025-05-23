import Image from "next/image";

export default function AboutThirdSection() {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-24 bg-white mb-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="md:w-1/2 px-4 md:px-7 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            We are different from
            <p>the rest</p>
          </h1>
          <h4 className="text-base md:text-lg text-gray-600">
            While others offer generic tools, QR GEN focuses on user experience,
            customization, and smart features like editable QR codes, folders,
            real-time analytics, and expert support. Our hybrid model ensures
            everyone can access value, whether you’re just starting out or
            scaling globally.
          </h4>
        </div>

        {/* Right: Overlapping Images with Frame */}
        <div className="md:w-1/2 relative w-full h-[350px] md:h-[400px] flex items-center justify-center px-4 md:px-0">
          {/* Rectangle Frame Behind Main Image */}
          <div className="absolute top-12 left-1 w-[280px] h-[280px] border-4 border-gray-200 z-0 rounded-md" />

          {/* Main Image */}
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] z-10 left-4 rounded-md overflow-hidden shadow-lg">
            <Image
              src="/images/mainvimg.jpg"
              alt="Main visual"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 320px, 400px"
            />
          </div>

          {/* Overlay Image */}
          <div className="hidden md:block absolute bottom-[-90px] left-5 w-[260px] h-[260px] z-20 rounded-md overflow-hidden shadow-xl">
            <Image
              src="/images/overlayimg.jpg"
              alt="Overlay visual"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 260px, 300px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

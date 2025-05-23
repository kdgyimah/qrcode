import Image from "next/image";

export default function AboutThirdSection() {
  return (
    <section className="w-full px-24 py-24 bg-white mb-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="md:w-1/2 px-7 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">
            We are different from
            <p>the rest</p>
          </h1>
          <h4 className="text-lg text-gray-600">
            While others offer generic tools, QR GEN focuses on user experience,
            customization, and smart features like editable QR codes, folders,
            real-time analytics, and expert support. Our hybrid model ensures
            everyone can access value, whether you’re just starting out or
            scaling globally.
          </h4>
        </div>

        {/* Right: Overlapping Images with Frame */}
        <div className="md:w-1/2 px-24 relative w-full h-[400px] flex items-center justify-center">
          {/* Rectangle Frame Behind Main Image */}
          <div className="absolute top-47 left-[1px] w-[340px] h-[340px] border-30 border-gray-200  z-0" />

          {/* Main Image */}
          <div className="relative w-[400px] h-[400px] z-10 left-4">
            <Image
              src="/images/mainvimg.jpg"
              alt="Main visual"
              fill
              className="object-cover shadow-lg"
            />
          </div>

          {/* Overlay Image (same size) */}
          <div className="absolute bottom-[-113px] left-5 w-[300px] h-[304px] hidden md:block z-20">
            <Image
              src="/images/overlayimg.jpg"
              alt="Overlay visual"
              fill
              className="object-cover  shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export default function FeatureHero() {
  return (
    <section className="relative w-full bg-white min-h-[420px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/featurehero.jpg"
        alt="Feature Hero Background"
        fill
        className="object-cover object-center pointer-events-none select-none"
        priority
        sizes="100vw"
        style={{ minHeight: 420, minWidth: 1440 }}
      />

      {/* Overlay with rgb(15,6,74,0.8) */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15,6,74,0.8)" }}
      />

      {/* Centered Text Container */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{
          width: 969,
          minHeight: 225,
          maxWidth: "90vw",
        }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight drop-shadow-md">
          Everything You Need To Create
          <br className="hidden sm:block" />
          Smarter QR Codes
        </h1>
        <p className="text-white text-base sm:text-lg leading-relaxed drop-shadow">
          Build, customize, organize, and track powerful QR codes—all in one seamless platform.
        </p>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";

export default function Info3() {
  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16 relative text-center"
      style={{
        backgroundImage: "url('/images/info3.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-500 bg-opacity-60 z-0" />

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Ready to Create Your First QR Code?
        </h1>

        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8">
          Learn more and take action today.
        </h4>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link href="/generate">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition">
              Generate Now
            </button>
          </Link>
          <Link href="/upgrade">
            <button className="bg-blue-700 border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-700 transition">
              Upgrade to Pro
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
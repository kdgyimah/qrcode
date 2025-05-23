"use client";

import Link from "next/link";

export default function Info3() {
  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4 relative"
      style={{
        backgroundImage: "url('/images/info3.jpg')", // 👈 Replace with your actual image
      }}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-blue-500 z-0" />

      <div className="w-full h-full flex flex-col items-center justify-center relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center whitespace-nowrap">
          Ready to Create Your First QR Code?
        </h1>
        <h4 className="text-lg md:text-2xl text-gray-200 mb-8 text-center">
          Learn more and take action today.
        </h4>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/generate">
            <button className="bg-white text-black px-6 py-3 hover:bg-blue-700 transition">
              Generate Now
            </button>
          </Link>
          <Link href="/upgrade">
            <button className="bg-blue-700 border text-white px-6 py-3 hover:bg-white transition">
              Upgrade to Pro
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

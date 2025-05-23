'use client';

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full bg-cover bg-center" style={{ backgroundImage: 'url("/images/hold1.jpg")' }}>
      {/* Background Image */}
      {/* Overlay */}
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-200 opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <h4 className="text-gray-700 text-lg md:text-xl mb-2">Welcome to Our Platform</h4>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 leading-tight mb-4">
            Create Your Own
          </h1>
          <h4 className="text-gray-600 text-lg md:text-xl mb-6">Generate unique and customizable QR codes for your business, events, or personal
            uses in seconds. It's fast, easy
          </h4>

          {/* Buttons */}
          <div className="space-x-4">
            <Link href='/pricing' className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Get Started
            </Link>
            <Link href='/about' className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-100 transition">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

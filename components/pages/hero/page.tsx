'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateImage(true);
  }, []);

  return (
    <section
      className="relative h-[95vh] w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/images/heroig.jpg")' }}
    >
      {/* Animated Right Hero Image */}
      <Image
  src="/images/rightheroimg.png"
  alt="Right Hero Image"
  width={700}
  height={700}
  className={`absolute top-24 right-[-150px] md:top-10 md:right-[70px] transition-transform duration-1000 ease-out`}
  style={{ transform: 'translateX(100px)' }}
/>

      {/* Text Content */}
      <div className="relative z-10 h-full flex items-center ml-10 px-6 md:px-16">
        <div className="max-w-2xl">
          <h4 className="text-blue-950 text-lg md:text-xl mb-2">Get Success Together!</h4>
          <h1 className="text-4xl md:text-6xl font-semibold text-blue-900 leading-tight mb-4">
            Create Your Own <br /><span className="bg-gradient-to-r from-blue-500 via-blue-400 to-green-500 bg-clip-text text-transparent">QR Codes</span> instantly
          </h1>
          <h5 className="text-gray-600  md:text-xl mb-6">
           Generate unique and customizable QR codes for your business, events, or personal use in seconds. It's fast, easy, and free!
          </h5>

          {/* Buttons */}
          <div className="space-x-4">
            <Link
              href="/pricing"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="border border-blue-600 text-black px-6 py-3 rounded-md hover:bg-white transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

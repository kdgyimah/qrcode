"use client";

import Image from "next/image";
import React from "react";

const AboutHeroSection: React.FC = () => {
  return (
    <section className="px-4 md:px-16 py-20 bg-blue-50">
      {/* Text Content */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h4 className="text-gray-500 text-lg mb-2">ABOUT US</h4>
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Built for you by Us
        </h1>
        <p className="text-lg text-gray-700">
          We believe technology should be accessible, intuitive, and powerful.
          That’s why we created a platform that helps anyone—from individuals to
          businesses—generate, manage, and analyze QR codes with ease. Our goal
          is to make digital engagement effortless for everyone, everywhere.
        </p>
      </div>

      {/* Image Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md h-64 w-full">
          <Image
            src="/images/imag1hero.jpg"
            alt="Image Card 1"
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md h-64 w-full">
          <Image
            src="/images/imag2hero.jpg"
            alt="Image Card 2"
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;

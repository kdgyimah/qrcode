"use client";

import Image from "next/image";
import React from "react";

const AboutHeroSection: React.FC = () => {
  return (
    <section className="px-6 md:px-16 py-20 bg-gray-50">
      {/* Text Content */}
      <div className="mb-12 text-center">
        <h4 className="text-gray-500 text-lg mb-2">ABOUT US</h4>
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Built for you by Us
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
          libero vel ex maximus vulputate nec eu ligula.
        </p>
      </div>

      {/* Image Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-16 gap-6">
        <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md h-64 flex items-center justify-center">
          <Image
            src={"/images/imag1hero.jpg"}
            alt="Image Card 1"
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="bg-gray-200 rounded-xl overflow-hidden shadow-md h-64 flex items-center justify-center">
          <Image
            src={"/images/imag2hero.jpg"}
            alt="Image Card 1"
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

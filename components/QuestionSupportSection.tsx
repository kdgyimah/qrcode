"use client";

import Image from "next/image";
import Link from "next/link";

export default function QuestionSupportSection() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="w-full max-w-[800px] h-[296px] bg-white rounded-xl shadow-md mx-auto text-center p-6 sm:p-8 flex flex-col items-center justify-center">
        {/* Avatar Group */}
        <div className="relative w-28 sm:w-36 h-16 sm:h-20 mb-6">
          {/* Left image */}
          <Image
            src="/images/img1.jpg"
            alt="User 1"
            width={44}
            height={40}
            className="w-8 h-8 sm:w-11 sm:h-10 rounded-full border-2 border-white absolute left-0 top-4 sm:top-5 z-0"
          />

          {/* Middle image */}
          <Image
            src="/images/img2.jpg"
            alt="User 2"
            width={56}
            height={56}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-white absolute left-1/2 top-0 transform -translate-x-1/2 z-10 shadow-md"
          />

          {/* Right image */}
          <Image
            src="/images/img3.jpg"
            alt="User 3"
            width={44}
            height={40}
            className="w-8 h-8 sm:w-11 sm:h-10 rounded-full border-2 border-white absolute right-0 top-4 sm:top-5 z-0"
          />
        </div>

        {/* Texts */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Still have questions?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-5">
          Our team is here to help you with any questions you might have.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 sm:py-2.5 sm:px-7 rounded-lg transition-colors duration-200 text-sm sm:text-base"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}

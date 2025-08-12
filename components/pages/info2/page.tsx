"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Info2() {
  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-16 px-4 sm:px-6 md:px-16 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className="relative w-full max-w-lg">
          <Image
            src="/images/info2leftimg.jpg"
            alt="Info Image"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
            loading="lazy"
            priority={false}
          />
        </div>
      </motion.div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
          Empowering
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-emerald-400 to-green-500">
            Seamless QR Code
          </span>
          Solutions.
        </h1>
        <h3 className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
          We make QR code creation effortless, fast, and customizable.
          Whether for business, events, or personal use, our platform
          ensures seamless integration, high-quality design, and powerful
          analytics.
        </h3>
        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
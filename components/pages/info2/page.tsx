"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Info2() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16 flex flex-col md:flex-row items-center space-x-0 md:space-x-8">
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 p-4 flex justify-center"
      >
        <Image
          src="/images/info2leftimg.jpg"
          alt="Info Image"
          width={800} // Adjust based on actual image size if known
          height={600}
          className="w-[80%] rounded-lg shadow-lg"
          loading="lazy"
        />
      </motion.div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Empowering
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-emerald-400 to-green-500">
            Seamless QR Code
          </span>
          Solutions.
        </h1>
        <h3 className="text-lg md:text-xl text-gray-600 mb-6">
          We make QR code creation effortless, fast, and <br /> customizable.
          Whether for business, events, or personal <br /> use, our platform
          ensures seamless integration, high-quality design, and powerful
          analytics.
        </h3>
        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

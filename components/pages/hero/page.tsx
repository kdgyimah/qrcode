"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-auto min-h-[95vh] w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/images/heroig.jpg")' }}
    >
      {/* Desktop Hero Image (absolute, right) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        // ADDED pointer-events-none here so this absolute wrapper doesn't intercept clicks
        className="absolute top-24 right-[-80px] md:top-10 md:right-[-60px] max-w-none hidden md:block pointer-events-none"
      >
        <Image
          src="/images/rightheroimg.png"
          alt="Right Hero Image"
          width={600}
          height={600}
          className="object-contain pointer-events-none"
        />
      </motion.div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-start justify-start mb-10 pt-12 md:justify-center min-h-[95vh] px-2 md:px-12">
        <div className="max-w-2xl p-12 mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className=" text-lg md:text-xl mb-2 text-blue-800"
          >
            Get Success Together!
          </motion.h4>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold text-black leading-tight mb-4"
          >
            Create Your Own <br />
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-green-500 bg-clip-text text-transparent">
              QR Codes
            </span>{" "}
            instantly
          </motion.h1>

          <motion.h5
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-600 md:text-xl mb-6"
          >
            Generate unique and customizable QR codes for your business, events,
            or personal use in seconds. It&apos;s fast, easy, and free!
          </motion.h5>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-row sm:flex-row gap-4 mt-10"
          >
            <Link
              href="/signup"
              // ADDED inline-flex, relative z-20, focus ring, active scale and transition
              className="inline-flex items-center justify-center relative z-20 bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 active:scale-95 cursor-pointer transition-transform duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Started
            </Link>

            <Link
              href="/featurepage"
              className="inline-flex items-center justify-center relative z-20 border border-blue-600 font-semibold text-black px-6 py-3 rounded-md hover:bg-blue-50 active:scale-95 cursor-pointer transition-transform duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hero Image (below text) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // also make mobile wrapper non-interactive so it can't accidentally block taps
          className="block md:hidden mt-10 px-4 w-full flex justify-center overflow-x-visible pointer-events-none"
        >
          <div className="relative h-[500px] w-full max-w-[400px] drop-shadow-2xl scale-[2.2] origin-center -translate-x-20">
            <Image
              src="/images/rightheroimg.png"
              alt="Mobile Hero QR Image"
              fill
              className="object-scale-down pointer-events-none"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

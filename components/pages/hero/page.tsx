'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-[95vh] w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/images/heroig.jpg")' }}
    >
      {/* Animated Right Hero Image */}
      <motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  className="absolute top-24 right-[-80px] md:top-10 md:right-[-60px] max-w-none"
>
  <Image
    src="/images/rightheroimg.png"
    alt="Right Hero Image"
    width={700}
    height={700}
    className="object-contain"
  />
</motion.div>




      {/* Text Content */}
      <div className="relative z-10 h-full flex items-center ml-10 px-6 md:px-16">
        <div className="max-w-2xl ">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-blue-950 text-lg md:text-xl mb-2"
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
            <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-green-500 bg-clip-text text-transparent">
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
            Generate unique and customizable QR codes for your business, events, or personal use in seconds. It&apos;s fast, easy, and free!
          </motion.h5>

          {/* Buttons */}
          <div className=" mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-x-4"
          >
            <Link
              href="/signup"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/featurepage"
              className="border border-blue-600 font-semibold text-black px-6 py-3 rounded-md hover:bg-white transition"
            >
              Learn More
            </Link>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

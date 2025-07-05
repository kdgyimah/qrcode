"use client";

import { FaFileInvoice } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { motion, easeOut, Variants } from "framer-motion"; // ✅ import easing function

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: easeOut, // ✅ use easing function (not a string)
    },
  }),
};

export default function Info1() {
  return (
    <section className="bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Top Texts */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold capitalize text-gray-800 mb-4">
          Why Choose QR GEN
        </h1>
        <h4 className="text-base sm:text-xl md:text-2xl text-gray-600">
          QR GENerator helps you create, customize, download, and share QR
          codes fast, simple, and made for everyone!
        </h4>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 sm:gap-y-10 sm:gap-x-8">
        {[
          {
            icon: <FaFileInvoice className="text-2xl sm:text-3xl" />,
            title: "Fast, Simple, and Free",
            text: "No complicated steps or sign-ups required. Generate and download your QR code in seconds, and free",
            color: "bg-blue-500",
          },
          {
            icon: <SlCalender className="text-2xl sm:text-3xl" />,
            title: "Customizable Designs",
            text: "Add colors, logos, and shapes to match your brand identity effortlessly.",
            color: "bg-emerald-600",
          },
          {
            icon: <RiTeamFill className="text-2xl sm:text-3xl" />,
            title: "Track & Edit (Pro) ",
            text: "Monitor scans and update dynamic QR codes anytime with premium features.",
            color: "bg-blue-400",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-white rounded-lg shadow-2xl shadow-gray-300 p-6 sm:p-8 flex flex-col items-start text-left min-h-[260px] transition-transform"
          >
            <div
              className={`absolute -top-6 sm:-top-8 self-center ${card.color} text-white rounded-full p-3 sm:p-4 shadow-md`}
            >
              {card.icon}
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mt-14 mb-3 sm:mb-4">
              {card.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

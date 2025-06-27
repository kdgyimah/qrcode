"use client";

import { FaFileInvoice } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
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
        <h3 className="text-base sm:text-xl md:text-2xl text-gray-600">
          We bring solutions that drive your success
        </h3>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {[
          {
            icon: <FaFileInvoice className="text-2xl sm:text-3xl" />,
            title: "Innovative Ideas",
            text: "Creative solutions tailored to your business needs.",
            color: "bg-blue-500",
          },
          {
            icon: <SlCalender className="text-2xl sm:text-3xl" />,
            title: "Clean Code",
            text: "Built with scalable, efficient, and readable code.",
            color: "bg-emerald-600",
          },
          {
            icon: <RiTeamFill className="text-2xl sm:text-3xl" />,
            title: "Fast Deployment",
            text: "Launch projects quickly with seamless tools and support.",
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
            <div className={`absolute -top-6 sm:-top-8 self-center ${card.color} text-white rounded-full p-3 sm:p-4 shadow-md`}>
              {card.icon}
            </div>
            <h2 className="text-lg sm:text-xl font-semibold mt-14 mb-3 sm:mb-4">{card.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

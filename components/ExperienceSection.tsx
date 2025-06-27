"use client";

import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Background layer remains covering bottom 70% */}
      <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gray-100 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-8">
        {/* Left Text (centered vertically) */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center md:items-center md:justify-center text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              Experiences Shared by Our Clients
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              The team at QR GEN provided unparalleled support throughout our project.
              Their expertise and dedication were evident from day one.
            </p>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Main Image */}
          <motion.img
            src="/images/enter.jpg"
            alt="Experience Showcase"
            className="rounded-xl shadow-lg w-full max-w-full transform transition duration-300 hover:scale-105"
          />

          {/* Testimonial */}
          <div className="text-gray-800 text-sm sm:text-base leading-relaxed p-2">
            QR GEN is a tool that revolutionized our marketing campaigns. The real-time
            tracking is a game-changer, and managing event check-ins has never been
            easier with dynamic QR codes that are incredibly efficient.
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/img1.jpg"
              alt="User Profile"
              className="w-14 h-14 rounded-full object-cover shadow"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Jane Doe</h4>
              <p className="text-sm text-gray-500">Product Designer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

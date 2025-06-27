"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TutorialSection2 = () => {
  return (
    <section className="bg-blue-50 w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="lg:w-1/2 space-y-6"
        >
          {/* Step Number */}
          <div className="w-16 h-16 flex items-center justify-center">
            <h1
              className="text-6xl font-bold"
              style={{
                WebkitTextStroke: "2px black",
                color: "transparent",
              }}
            >
              02
            </h1>
          </div>

          {/* Step Title */}
          <h1 className="text-2xl sm:text-5xl font-medium text-gray-900">
            Customize & <p>Preview</p>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600">
            Personalize your QR code with colors, patterns,
            <br />
            and a logo. Instantly see changes as you edit,
            <br />
            ensuring it looks exactly how you want it.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="overflow-hidden">
            <Image
              src="/images/tutorial2img.png"
              alt="Generate your QR code"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TutorialSection2;

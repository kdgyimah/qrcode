"use client";

import { FaFileInvoice } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { SiGooglecalendar } from "react-icons/si";
import { SlCalender } from "react-icons/sl";

export default function Info1() {
  return (
    <section className="bg-white py-36 max-w-7xl px-6 md:px-16 mx-auto">
      {/* Top Texts */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold capitalize text-gray-800 mb-4">
          Why Choose QR GEN
        </h1>
        <h3 className="text-xl md:text-2xl text-gray-600">
          We bring solutions that drive your success
        </h3>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Card 1 */}
        <div className="relative bg-white rounded-lg shadow-2xl shadow-gray-300 p-8 flex flex-col items-start text-left min-h-[280px]">
          <div className="absolute -top-8 self-center bg-blue-500 text-white rounded-full p-4 shadow-md">
            <FaFileInvoice className="text-3xl" />
          </div>
          <h2 className="text-xl font-semibold mt-12 mb-4">Innovative Ideas</h2>
          <p className="text-gray-600 max-w-xs">
            Creative solutions tailored to your business needs.
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white rounded-lg drop-shadow-2xl shadow-gray-300 p-8 flex flex-col  items-start text-left min-h-[280px]">
          <div className="absolute -top-8 self-center bg-emerald-600 text-white rounded-full p-4 shadow-md">
            <SlCalender className="text-3xl" />
          </div>
          <h2 className="text-xl font-semibold mt-12 mb-4">Clean Code</h2>
          <p className="text-gray-600 max-w-xs">
            Built with scalable, efficient, and readable code.
          </p>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white rounded-lg shadow-2xl shadow-gray-300 p-8 flex flex-col items-start text-left min-h-[280px]">
          <div className="absolute self-center -top-8 bg-blue-400 text-white rounded-full p-4 shadow-md">
            <RiTeamFill className="text-3xl" />
          </div>
          <h2 className="text-xl font-semibold mt-12 mb-4">Fast Deployment</h2>
          <p className="text-gray-600 max-w-xs">
            Launch projects quickly with seamless tools and support.
          </p>
        </div>
      </div>
    </section>
  );
}

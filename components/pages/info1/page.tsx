'use client';

import { FaLightbulb, FaCode, FaRocket } from 'react-icons/fa';

export default function Info1() {
  return (
    <section className="min-h-screen h-13 bg-white py-16 px-6 md:px-16">
      {/* Top Texts */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold capitalize text-gray-800 mb-4">
          Why Choose QR GEN
        </h1>
        <h3 className="text-xl md:text-2xl text-gray-600">
          We bring solutions that drive your success
        </h3>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="absolute -top-6 bg-blue-100 text-blue-600 rounded-full p-3 shadow-md">
            <FaLightbulb className="text-2xl" />
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-2">Innovative Ideas</h2>
          <p className="text-gray-600">Creative solutions tailored to your business needs.</p>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="absolute -top-6 bg-green-100 text-green-600 rounded-full p-3 shadow-md">
            <FaCode className="text-2xl" />
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-2">Clean Code</h2>
          <p className="text-gray-600">Built with scalable, efficient, and readable code.</p>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <div className="absolute -top-6 bg-purple-100 text-purple-600 rounded-full p-3 shadow-md">
            <FaRocket className="text-2xl" />
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-2">Fast Deployment</h2>
          <p className="text-gray-600">Launch projects quickly with seamless tools and support.</p>
        </div>
      </div>
    </section>
  );
}

'use client';

export default function Info2() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6 md:px-16 flex flex-col md:flex-row items-center space-x-0 md:space-x-8">
      {/* Image Side */}
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <img
          src="./images/info2.jpg"
          alt="Info Image"
            className="w-80 h-auto rounded-lg shadow-lg"
            loading="lazy"
        />
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          <span className="block text-black">Explore Endless</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-900">
            Possibilities
          </span>
          <span className="block text-black">With Our Platform</span>
        </h1>
        <h3 className="text-lg md:text-xl text-gray-600 mb-6">
          Empowering your ideas with cutting-edge solutions.
        </h3>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </section>
  );
}

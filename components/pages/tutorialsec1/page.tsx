"use client";

const TutorialSection1 = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Getting started in 3 steps
        </h1>
      </div>

      {/* Two-column Layout */}
      <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6">
          {/* Step Number */}
          <div className="w-16 h-16 flex items-center justify-center">
            <h1
              className="text-6xl font-bold"
              style={{
                WebkitTextStroke: "2px black",
                color: "transparent",
              }}
            >
              01
            </h1>
          </div>

          {/* Step Title */}
          <h2 className="text-2xl sm:text-5xl font-medium text-gray-900">
            Enter your details
          </h2>

          {/* Step Description */}
          <p className="text-lg sm:text-xl text-gray-600">
            Input your website link, text, or contact details. Customize the
            design by choosing colors, patterns, and adding a logo to match your
            brand..
          </p>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <div className=" overflow-hidden">
            <img
              src="/images/tutorial1img.png"
              alt="Enter your details"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialSection1;

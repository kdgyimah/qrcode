"use client";

const TutorialSection2 = () => {
  return (
    <section className="bg-blue-50 w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-12">
        
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
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <div className=" overflow-hidden">
            <img
              src="/images/tutorial2img.png"
              alt="Generate your QR code"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default TutorialSection2;

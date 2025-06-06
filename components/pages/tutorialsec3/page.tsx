"use client";

const TutorialSection3 = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
        {/* Left side - Text content */}
        <div className="lg:w-1/2">
          <div className="flex flex-col space-y-6">
            {/* Step number - Using inline style for text outline */}
            <div className="w-16 h-16 flex items-center justify-center">
              <h1 
                className="text-6xl font-bold"
                style={{
                  WebkitTextStroke: '2px black',
                  color: 'transparent'
                }}
              >
                03
              </h1>
            </div>
            
            {/* Step title */}
            <h1 className="ttext-2xl sm:text-5xl font-medium text-gray-900">
              Download and <p>Share</p>
            </h1>
            
            {/* Step description */}
            <h4 className="text-lg sm:text-xl text-gray-600">
              Once satisfied, download your QR code in high-quality PNG, SVG, or PDF. Print it, share it digitally, or integrate it into your designs effortlessly..
            </h4>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2">
          <div className=" overflow-hidden">
            <img 
              src="/images/tutorial3img.png" 
              alt="Enter your details"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialSection3;
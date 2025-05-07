"use client";

const TutorialSection2 = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Two-column layout - reversed order */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-8 sm:gap-12">
        {/* Right side - Text content (now on the right) */}
        <div className="lg:w-1/2">
          <div className="flex flex-col space-y-6">
            {/* Step number */}
            <div className="w-16 h-16 flex items-center justify-center">
              <h1 
                className="text-6xl font-bold"
                style={{
                  WebkitTextStroke: '2px black',
                  // Removed invalid textStroke property
                  color: 'transparent'
                }}
              >
                02
              </h1>
            </div>
            
            {/* Step title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Customize & <p>Preview</p>
            </h1>
            
            {/* Step description */}
            <h4 className="text-lg sm:text-xl text-gray-600">
              Our system will instantly create a unique QR code based on your information. You can preview it before finalizing.
            </h4>
          </div>
        </div>

        {/* Left side - Image (now on the left) */}
        <div className="lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/images/cust.jpeg" 
              alt="Generate your QR code"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialSection2;
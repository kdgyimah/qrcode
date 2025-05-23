"use client";

const TutorialSection3 = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Centered Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Getting started in 3 steps
        </h1>
      </div>

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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Download and <p>Share</p>
            </h1>
            
            {/* Step description */}
            <h4 className="text-lg sm:text-xl text-gray-600">
              Fill in your basic information to create your account. We only ask for what's necessary to get you started.
            </h4>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/images/enter.jpg" 
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
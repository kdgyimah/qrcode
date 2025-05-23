export default function ExperienceSection() {
  return (
    <section className="relative bg-white py-12">
      {/* Background div */}
      <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gray-100 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left Text Content */}
        <div className="md:w-1/2 text-center mt-80 md:text-left space-y-4">
          <h1 className="text-5xl  font-bold text-gray-800">
            Experiences Shared by Our Clients
          </h1>
          <p className="text-lg text-gray-600">
            The team at QR GEN provided unparalleled support throughout our project. Their expertise and dedication were evident from day one.
          </p>
        </div>

        {/* Right Image and Profile */}
        <div className="md:w-1/2 flex flex-col mt-20 items-left">
          {/* Main Image */}
          <img
            src="/images/enter.jpg"
            alt="Experience Showcase"
            className="rounded-xl shadow-lg max-w-full"
          />
            <div className="">
                <h4 className="text-lg font-light text-gray-800 mt-4">
                    QRL GEN is a tool revolutionized our marketing campaigns. The real-time tracking is a game-changer and Managing event check-ins has never been easier with dynamic QR codes that are incredibly efficient.
                </h4>
            </div>
          {/* Profile Info */}
          <div className="mt-6 flex items-center mr-80 space-x-4">
            {/* Profile Picture */}
            <img
              src="/images/img1.jpg"
              alt="User Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            {/* Name & Profession */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Jane Doe</h4>
              <p className="text-sm text-gray-500">Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

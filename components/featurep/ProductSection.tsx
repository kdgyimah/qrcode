"use client";

import Image from "next/image";

export function ProductSection() {
  const blogPosts = [
    {
      id: 1,
      imageUrl: "/images/proimg1.jpg",
      date: "March 20th, 2025",
      title: "The Future of QR Code Technology",
      excerpt:
        "Exploring how QR codes are evolving and what to expect in coming years",
    },
    {
      id: 2,
      imageUrl: "/images/proimg2.jpg",
      date: "February 15th, 2025",
      title: "Creative Uses of QR Codes in Marketing",
      excerpt:
        "Innovative ways businesses are leveraging QR codes for customer engagement",
    },
    {
      id: 3,
      imageUrl: "/images/proimg3.jpg",
      date: "January 5th, 2025",
      title: "QR Code Security Best Practices",
      excerpt: "How to ensure your QR codes are secure and safe for your users",
    },
    {
      id: 4,
      imageUrl: "/images/proimg4.jpg",
      date: "December 10th, 2024",
      title: "Design Trends for QR Codes",
      excerpt:
        "Make your QR codes stand out with the latest design approaches and branding tips.",
    },
    {
      id: 5,
      imageUrl: "/images/proimg5.jpg",
      date: "November 2nd, 2024",
      title: "QR Codes in Everyday Life",
      excerpt:
        "A look at how QR codes are making everyday interactions smoother and smarter.",
    },
    {
      id: 6,
      imageUrl: "/images/proimg6.jpg",
      date: "October 22nd, 2024",
      title: "How to Measure QR Campaign Success",
      excerpt:
        "Understanding the analytics that matter for your QR marketing campaigns.",
    },
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Built For Every Purpose
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 sm:mt-3 max-w-2xl mx-auto">
            QR code solutions tailored to fit any need or industry.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.01] transition-all duration-300 mx-auto w-full max-w-sm sm:max-w-none"
            >
              {/* Image */}
              <div className="h-40 sm:h-48 lg:h-56 w-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  priority={post.id <= 3} // Prioritize first 3 images for LCP
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                  {post.date}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
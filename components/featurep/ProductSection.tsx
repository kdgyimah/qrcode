"use client";

import Image from "next/image";

export function ProductSection() {
  // 6 blog posts for a 3-column grid
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
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          Built For Every Purpose
        </h2>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Blog Image */}
              <div className="h-48 sm:h-56 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={400} // adjust width as needed
                  height={250} // adjust height as needed
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <h4 className="text-sm sm:text-base text-gray-600 mb-6">
                  {post.excerpt}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

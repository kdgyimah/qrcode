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
    <section className="w-full bg-white py-16 px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Built For Every Purpose
          </h2>
          <p className="text-gray-600 text-base mt-2">
            QR code solutions tailored to fit any need or industry.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
            >
              {/* Image */}
              <div className="h-48 sm:h-56 w-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-400 mb-1">{post.date}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

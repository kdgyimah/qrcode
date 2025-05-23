"use client";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      imageUrl: "/images/blog1.jpg",
      date: "March 20th, 2025",
      title: "The Future of QR Code Technology",
      excerpt: "Exploring how QR codes are evolving and what to expect in coming years",
    },
    {
      id: 2,
      imageUrl: "/images/blog2.jpg",
      date: "February 15th, 2025",
      title: "Creative Uses of QR Codes in Marketing",
      excerpt: "Innovative ways businesses are leveraging QR codes for customer engagement",
    },
    {
      id: 3,
      imageUrl: "/images/blog3.jpg",
      date: "January 5th, 2025",
      title: "QR Code Security Best Practices",
      excerpt: "How to ensure your QR codes are secure and safe for your users",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">Our Blog</h2>
      
      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Blog Image */}
            <div className="h-48 sm:h-56 overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Blog Content */}
            <div className="p-6">
              {/* Date */}
              <h4 className="text-sm sm:text-base text-gray-500 mb-2">{post.date}</h4>
              
              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{post.title}</h1>
              
              {/* Excerpt */}
              <h4 className="text-sm sm:text-base text-gray-600 mb-6">{post.excerpt}</h4>
              
              {/* Learn More Link */}
              <a href="#" className="text-black hover:text-blue-800 text-sm sm:text-base font-medium underline underline-offset-4">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* View More Link */}
      <div className="mt-10 sm:mt-12 text-left">
        <a href="#" className="inline-flex items-center text-gray-500 hover:text-blue-800 text-base sm:text-lg font-medium underline underline-offset-4">
          View More Blogs
          <svg 
            className="w-[17px] h-5 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BlogSection;
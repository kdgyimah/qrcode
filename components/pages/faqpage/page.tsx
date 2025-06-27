"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  title: string;
  items: FAQItem[];
};

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "qrCodeBasics",
    title: "QR Code Basics",
    items: [
      {
        id: "faq1",
        question: "What is a QR code?",
        answer:
          "A QR code is a type of matrix barcode that contains information readable by devices such as smartphones. It can be used for a variety of purposes, including URL links, contact information, and more.",
      },
      {
        id: "faq2",
        question: "How do QR codes work?",
        answer:
          "QR codes work by encoding data into a two-dimensional barcode, which can be scanned and interpreted by a QR code reader or smartphone camera.",
      },
      {
        id: "faq3",
        question: "What is a QR code?",
        answer:
          "A QR code is a type of matrix barcode that contains information readable by devices such as smartphones. It can be used for a variety of purposes, including URL links, contact information, and more.",
      },
      {
        id: "faq4",
        question: "How do QR codes work?",
        answer:
          "QR codes work by encoding data into a two-dimensional barcode, which can be scanned and interpreted by a QR code reader or smartphone camera.",
      },
    ],
  },
  {
    id: "designAndCustomize",
    title: "Design & Customize",
    items: [
      {
        id: "faq8",
        question: "Can I customize the design of my QR code?",
        answer:
          "Yes, QR codes can be customized with different colors, patterns, and logos to match your brand or personal style.",
      },
      {
        id: "faq9",
        question: "Can I customize the design of my QR code?",
        answer:
          "Yes, QR codes can be customized with different colors, patterns, and logos to match your brand or personal style.",
      },
    ],
  },
  {
    id: "downloadAndScan",
    title: "Download & Scan",
    items: [
      {
        id: "faq16",
        question: "How can I download my QR code?",
        answer:
          "You can download your QR code in various formats such as PNG, SVG, or PDF, depending on the tool you are using to generate the QR code.",
      },
    ],
  },
];

const FAQAccordionItem = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 sm:p-5 text-left bg-white rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 focus:outline-none"
      >
        <h3 className="text-base sm:text-lg font-medium text-gray-900 pr-4">
          {item.question}
        </h3>
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-blue-50 rounded-full">
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-blue-600 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 p-4 sm:p-5 bg-white rounded-lg shadow-xs">
          <p className="text-gray-600 text-sm sm:text-base">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQAccordion = ({ data }: { data: FAQItem[] }) => {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <FAQAccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
};



const FAQPage = () => {
  
  const [activeTab, setActiveTab] = useState(FAQ_CATEGORIES[0].id);

  if (!FAQ_CATEGORIES || FAQ_CATEGORIES.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-gray-600">
            No FAQs available at the moment
          </p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-gray-600">
            Find answers to common questions about QR codes
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-100 p-1 rounded-lg mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex space-x-1 w-max min-w-full">
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-3 py-2 sm:px-6 sm:py-3 font-medium text-xs sm:text-sm rounded-md focus:outline-none transition-colors duration-200 ${
                  activeTab === category.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            {FAQ_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className={activeTab === category.id ? "block" : "hidden"}
              >
                <FAQAccordion data={category.items} />
              </div>
            ))}
          </div>
        </div>

        {/* New "Still have questions?" section */}
        <div className="bg-white rounded-xl shadow-md mt-6 p-6 w-full mx-auto text-center">
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <div className="relative w-28 sm:w-36 h-16 sm:h-20">
              {/* Left image */}
              <Image
                src="/images/img1.jpg"
                alt="User"
                width={44} // corresponds roughly to w-11 (11 * 4 = 44px)
                height={40} // corresponds to h-10 (10 * 4 = 40px)
                className="w-8 h-8 sm:w-11 sm:h-10 rounded-full border-2 border-white absolute left-0 top-4 sm:top-5 z-0"
              />

              {/* Middle image */}
              <Image
                src="/images/img2.jpg"
                alt="User"
                width={56} // sm:w-14 = 14 * 4 = 56px
                height={56} // sm:h-14 = 14 * 4 = 56px
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-white absolute left-1/2 top-0 transform -translate-x-1/2 z-10 shadow-md"
              />

              {/* Right image */}
              <Image
                src="/images/img3.jpg"
                alt="User"
                width={44} // sm:w-11 = 11 * 4 = 44px
                height={40} // sm:h-10 = 10 * 4 = 40px
                className="w-8 h-8 sm:w-11 sm:h-10 rounded-full border-2 border-white absolute right-0 top-4 sm:top-5 z-0"
              />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            Still have questions?
          </h2>

          <h4 className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            Our team is here to help you with any questions you might have
          </h4>

          <Link
            href={"/contact"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:py-2 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

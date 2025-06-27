"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white px-6 sm:px-10 md:px-16 py-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-20 px-6 text-center md:text-left">
        {/* Left: Logo + Description + Newsletter */}
        <div className="w-full md:w-1/3">
          <Image
            src="/logos/qrlogo.svg"
            alt="QRGen Logo"
            width={120}
            height={40}
            className="h-8 mb-4 mx-auto md:mx-0 filter brightness-0 invert"
          />

          <h3 className="mb-4 text-sm md:text-base">
            We make QR code creation effortless, <br /> fast, and customizable..
          </h3>
          <div className="w-full max-w-md mt-10 mx-auto md:mx-0">
            {/* Mobile: Stack vertically */}
            <div className="block md:hidden">
              <input
                type="email"
                placeholder="your email address"
                className="w-full h-12 px-4 py-2 rounded-md border border-gray-300 focus:outline-none text-white mb-3"
              />
              <Link
                href="/signup"
                className="w-full block bg-gradient-to-r from-blue-500 to-green-500 px-4 py-3 rounded-md hover:from-blue-600 hover:to-green-600 transition text-white text-sm text-center font-medium"
              >
                Sign up
              </Link>
            </div>

            {/* Desktop: Inline button inside textbox */}
            <div className="hidden md:block relative">
              <input
                type="email"
                placeholder="your email address"
                className="w-full h-14 pl-4 pr-32 py-2 rounded-md border border-gray-300 focus:outline-none text-white  placeholder:text-gray-400"
              />
              <Link
                href="/signup"
                className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-green-500 px-5 py-2.5 rounded-md hover:from-blue-600 hover:to-green-600 transition text-white text-sm font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Link Columns */}
        <div className="flex flex-col sm:flex-row gap-20 space-x-15 w-full md:w-2/3 justify-end">
          {[
            {
              title: "Product",
              links: ["Home", "Pricing", "FAQs", "Contact Us"],
            },
            {
              title: "Support",
              links: ["Help Center", "Report Issue", "Articles", "Blog"],
            },
            {
              title: "Legal",
              links: ["Career", "Privacy", "Terms", "Cookies"],
            },
          ].map((section, index) => (
            <div key={index} className="w-full sm:w-auto">
              <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">
                {section.title}
              </h2>
              <ul className="grid grid-cols-2 sm:block gap-2 sm:space-y-6 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="block py-1 px-2 rounded-md hover:bg-blue-800/50 hover:text-blue-300 transition text-center sm:text-left"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-500 mb-6" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p className="order-2 sm:order-1">
          &copy; {new Date().getFullYear()} QR Gen.
        </p>
        <div className="flex space-x-4 order-1 sm:order-2">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-gray-600 p-2 rounded-full hover:bg-blue-600 transition transform hover:scale-110"
              >
                <Icon />
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}

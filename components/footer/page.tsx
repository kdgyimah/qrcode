"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white px-6 md:px-16 py-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
        {/* Left Side: Logo + Newsletter */}
        <div className="w-full md:w-1/3">
          <img src="/logos/qrlogo.svg" alt="QRGen Logo" className="h-8 mb-2 filter brightness-0 invert" />
          <h3 className="text-white mb-4">
            We make QR Code generation easy and fast.
          </h3>
          <div className="py-6 relative w-full max-w-md flex items-center bg-gradient-to-l from-blue-950 to-transparent">
            <input
              type="email"
              placeholder="your email address"
              className="w-[300px] px-2 py-2 rounded-md border- border-gray-300 focus:outline-none"
            />
            <button className="bg-blue-600 text-white bg-gradient-to-r from-blue-500 to-green-500 px-4 py-1.5 w-1/3 ml-5 absolute left-48 top-1/2 -translate-y-1/2 rounded-3xl hover:bg-blue-700 transition">
              Sign up
            </button>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-6 z-10 rounded-l-md border-b-inherit from-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Links (Grouped) */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between">
          {/* Company */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg text-center font-semibold mb-4">Product</h2>
            <ul className="text-center space-y-4 list-none text-sm">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-center text-lg font-semibold mb-4">Support</h2>
            <ul className="text-center space-y-4 list-none text-sm">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Report an Issue
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg text-center font-semibold mb-4">Support</h2>
            <ul className="text-center space-y-4 list-none text-sm">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Term
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-500 mb-6" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} QR Gen .
        </p>
        <div className="flex space-x-4 text-white">
          <a
            href="#"
            className="bg-gray-600 text-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="bg-gray-600 text-white  p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="bg-gray-600 text-white  p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="bg-gray-600 text-white  p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}

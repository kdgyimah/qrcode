"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY <= 0) {
        // Always show navbar at the top
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up -> show navbar
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
    fixed top-0 w-full px-6 md:px-16 py-4 z-50 transition-all duration-300
    ${showNavbar ? "translate-y-0" : "-translate-y-full"}
    ${lastScrollY > 10 ? "bg-white shadow-md" : "bg-transparent"}
  `}
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <Image
            src="/logos/qrlogo.svg"
            alt="QRGen Logo"
            width={150} // Or the actual logo width
            height={40} // Or the actual logo height
            className="max-w-[150px] h-auto"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-normal">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-1 hover:text-blue-600 transition">
              Products <FiChevronDown className="text-sm" />
            </div>

            <div className="absolute left-0 top-full w-30 bg-white shadow-md rounded-md opacity-0 hover:text-blue-600 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50 pointer-events-auto">
              <Link
                href="/product/featurepage"
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Features
              </Link>
              <Link
                href="/qr-codes"
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                QR Codes
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Contact
              </Link>
            </div>
          </div>

          <Link href="/about" className="hover:text-blue-600 transition">
            About Us
          </Link>
          <Link href="/pricing" className="hover:text-blue-600 transition">
            Pricing
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md text-gray-950 hover:bg-blue-300 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-6 space-y-4 text-gray-700 font-normal bg-white shadow-lg pb-4">
          <Link href="/" className="block hover:text-blue-600 transition">
            Home
          </Link>
          <div className="block">
            <span className="block font-medium text-gray-700">Products</span>
            <div className="ml-4 space-y-2">
              <Link
                href="/features"
                className="block hover:text-blue-600 transition"
              >
                Features
              </Link>
              <Link
                href="/qr-codes"
                className="block hover:text-blue-600 transition"
              >
                QR Codes
              </Link>
              <Link
                href="/contact"
                className="block hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          <Link href="/about" className="block hover:text-blue-600 transition">
            About Us
          </Link>
          <Link
            href="/pricing"
            className="block hover:text-blue-600 transition"
          >
            Pricing
          </Link>
          <hr />
          <Link href="/login" className="block hover:text-blue-600 transition">
            Login
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-2 rounded-md bg-blue-600 text-white w-fit hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

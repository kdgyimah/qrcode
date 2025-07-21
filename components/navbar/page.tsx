"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

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
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
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
        fixed top-0 w-full px-6 md:px-16 py-4 z-50 shadow transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        bg-darkGray text-white font-jakarta text-sm font-semibold leading-5
      `}
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <img
            src="/logos/qrlogo.svg"
            alt="QRGen Logo"
            className="h-7 w-auto max-w-[150px]"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-300 transition">Home</Link>
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-1 hover:text-blue-300 transition">
              Products <FiChevronDown className="text-sm" />
            </div>
            <div className="absolute left-0 top-full w-40 bg-white text-gray-700 shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50 pointer-events-auto">
              <Link href="/features" className="block px-4 py-2 hover:text-blue-600 hover:bg-blue-50">Features</Link>
              <Link href="/qr-codes" className="block px-4 py-2 hover:text-blue-600 hover:bg-blue-50">QR Codes</Link>
              <Link href="/contact" className="block px-4 py-2 hover:text-blue-600 hover:bg-blue-50">Contact</Link>
            </div>
          </div>
          <Link href="/about" className="hover:text-blue-300 transition">About Us</Link>
          <Link href="/pricing" className="hover:text-blue-300 transition">Pricing</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="px-4 py-2 rounded-md hover:bg-blue-300 transition text-white">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-6 space-y-4 bg-darkGray text-white font-jakarta text-sm font-semibold leading-5 shadow-lg pb-4">
          <Link href="/" className="block hover:text-blue-300 transition">Home</Link>
          <div className="block">
            <span className="block font-semibold">Products</span>
            <div className="ml-4 space-y-2">
              <Link href="/features" className="block hover:text-blue-300 transition">Features</Link>
              <Link href="/qr-codes" className="block hover:text-blue-300 transition">QR Codes</Link>
              <Link href="/contact" className="block hover:text-blue-300 transition">Contact</Link>
            </div>
          </div>
          <Link href="/about" className="block hover:text-blue-300 transition">About Us</Link>
          <Link href="/pricing" className="block hover:text-blue-300 transition">Pricing</Link>
          <hr className="border-gray-500" />
          <Link href="/login" className="block hover:text-blue-300 transition">Login</Link>
          <Link href="/signup" className="block px-4 py-2 rounded-md bg-blue-600 text-white w-fit hover:bg-blue-700 transition">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

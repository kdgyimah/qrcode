'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 w-full bg-white px-6 md:px-16 py-4 z-50 shadow">
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
        <div className="hidden md:flex space-x-6 text-gray-700 font-normal">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <div className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
            Products <FiChevronDown className="text-sm" />
          </div>
          <div className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
            Resources <FiChevronDown className="text-sm" />
          </div>
          <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
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
          <Link href="/" className="block hover:text-blue-600 transition">Home</Link>
          <div className="block hover:text-blue-600 transition cursor-pointer">
            Products
          </div>
          <div className="block hover:text-blue-600 transition cursor-pointer">
            Resources
          </div>
          <Link href="/about" className="block hover:text-blue-600 transition">About Us</Link>
          <Link href="/pricing" className="block hover:text-blue-600 transition">Pricing</Link>
          <hr />
          <Link href="/login" className="block hover:text-blue-600 transition">Login</Link>
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

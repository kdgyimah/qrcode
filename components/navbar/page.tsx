'use client';

import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 md:px-16 py-4">
      <div className="flex items-center justify-between w-[85%] mx-auto">
        {/* Logo & Name as SVG */}
        <div>
          <img
            src="/logos/qrlogo.svg"
            alt="QRGen Logo"
            className="h-7 w-auto"
          />
        </div>

        {/* Middle Nav Items */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <div className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
            Products <FiChevronDown className="text-sm" />
          </div>
          <div className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
            Resources <FiChevronDown className="text-sm" />
          </div>
          <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
        </div>

        {/* Right Side: Auth Buttons */}
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

        {/* Mobile Placeholder (optional dropdown or menu button) */}
        <div className="md:hidden">
          {/* Add hamburger menu later if needed */}
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 md:px-16 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Logo & Name */}
        <div className="text-2xl font-bold text-blue-600">QRGen</div>

        {/* Middle Nav Items */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="#" className="hover:text-blue-600 transition">Home</Link>
          <div className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
            Services <FiChevronDown className="text-sm" />
          </div>
          <div className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">
            Solutions <FiChevronDown className="text-sm" />
          </div>
          <Link href="#" className="hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 10);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      getSession();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full px-6 md:px-16 py-4 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${lastScrollY > 10 ? "bg-white shadow-md" : "bg-white"}`}
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <Image
            src="/logos/qrlogo.svg"
            alt="QRGen Logo"
            width={150}
            height={40}
            className="max-w-[150px] h-auto"
            priority
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
            <div className="absolute left-0 top-full w-30 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50">
              <Link
                href="/featurepage"
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

        {/* Desktop Right: Auth or Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
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
            </>
          ) : (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Image
                  src={
                    user.user_metadata?.avatar_url ||
                    "/images/default-avatar.png"
                  }
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-800">
                  {user.user_metadata?.name || user.email}
                </span>
                <FiChevronDown className="text-sm text-gray-600" />
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-10 bg-white border rounded shadow-md z-50 w-40">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
          <div>
            <span className="block font-medium text-gray-700">Products</span>
            <div className="ml-4 space-y-2">
              <Link href="/featurepage" className="block hover:text-blue-600">
                Features
              </Link>
              <Link href="/qr-codes" className="block hover:text-blue-600">
                QR Codes
              </Link>
              <Link href="/contact" className="block hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
          <Link href="/about" className="block hover:text-blue-600">
            About Us
          </Link>
          <Link href="/pricing" className="block hover:text-blue-600">
            Pricing
          </Link>
          <hr />
          {!user ? (
            <>
              <Link href="/login" className="block hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 rounded-md bg-blue-600 text-white w-fit hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="block hover:text-blue-600">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

"use client";

import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Blurred Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-white to-blue-300 opacity-90 backdrop-blur-md" />
      {/* Logo above the card */}
      <div className="mb-6">
        <Image
          src="/logos/qrlogo.svg"
          alt="QRGen Logo"
          width={150}
          height={50}
          className="h-8 w-auto"
        />
      </div>

      {/* Card */}
      <div className="w-full md:w-[30%] bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Sign In Text */}
        <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>

        {/* Sign in with Google */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
          <FaGoogle />
          <span>Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Form Inputs */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

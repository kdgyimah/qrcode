'use client';

import { FaGoogle } from 'react-icons/fa';

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Blurred Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-white to-blue-300 opacity-90 backdrop-blur-md" />

      {/* Logo on Top */}
      <div className="mb-6">
        <img
          src="/logos/qrlogo.svg"
          alt="QRGen Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Sign Up Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-1.5">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 text-left">Sign Up</h2>

        {/* Sign up with Google */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
          <FaGoogle />
          <span>Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Form Inputs */}
        <form className="space-y-4 text-sm">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start text-sm">
            <input type="checkbox" id="terms" className="mt-1 mr-2 form-checkbox text-blue-600" />
            <label htmlFor="terms" className="text-gray-700">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}

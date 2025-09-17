"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { supabase } from "@/lib/superbase";
import { toast } from "react-hot-toast";
import BackArrow from "@/components/BackArrow";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  // ✅ Form input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id === "terms" ? "agree" : id]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Email/password sign-up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.agree) {
      toast.error("You must agree to the Terms & Conditions.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          trial_start: new Date().toISOString(),
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sign-up successful!");
      router.push("/dashboard");
    }

    setLoading(false);
  };

  // ✅ Google sign-up
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) toast.error(error.message);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-white to-blue-300 opacity-90 backdrop-blur-md" />

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <BackArrow />
      </div>

      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/logos/qrlogo.svg"
          alt="QRGen Logo"
          width={150}
          height={50}
          className="h-8 w-auto"
        />
      </div>

      {/* Sign-up card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 text-left">Sign Up</h2>

        {/* Google signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
        >
          <FaGoogle />
          <span>Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4 text-sm">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start text-sm">
            <input
              id="terms"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1 mr-2 form-checkbox text-blue-600"
            />
            <label htmlFor="terms" className="text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

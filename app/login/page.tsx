"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { supabase } from "@/lib/superbase";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login failed:", error);
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Login successful");
    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-white to-blue-300 opacity-90 backdrop-blur-md" />

      <div className="mb-6">
        <Image
          src="/logos/qrlogo.svg"
          alt="QRGen Logo"
          width={150}
          height={50}
          className="h-8 w-auto"
        />
      </div>

      <div className="w-full md:w-[30%] bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
        >
          <FaGoogle />
          <span>Sign in with Google</span>
        </button>

        <div className="flex items-center gap-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

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

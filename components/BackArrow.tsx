"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackArrow() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("./")}
      className="flex items-center text-black hover:text-blue-600 transition-colors p-4"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      <span> Home</span>
    </button>
  );
}

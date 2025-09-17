"use client";

import { Search } from "lucide-react";

export default function QrSearch() {
  return (
    <div className="relative w-full md:w-80">
      <input
        type="text"
        placeholder="Search QR Codes..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   text-sm sm:text-base"
      />
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

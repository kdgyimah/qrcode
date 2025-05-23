// app/dashboard/components/QrSearch.tsx

"use client";

import { Search } from "lucide-react";

export default function QrSearch() {
  return (
    <div className="relative w-full md:w-80">
      <input
        type="text"
        placeholder="Search QR Codes..."
        className="w-[200px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
    </div>
  );
}

// app/dashboard/components/FolderSearch.tsx

"use client";

import { Search } from "lucide-react";

export default function FolderSearch() {
  return (
    <div className="relative w-full md:max-w-md">
      <input
        type="text"
        placeholder="Search folders..."
        className="w-70% pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
    </div>
  );
}

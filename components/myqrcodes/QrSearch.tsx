"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface QrSearchProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  placeholder?: string;
}

export default function QrSearch({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search QR Codes..." 
}: QrSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onSearchChange("");
  };

  const hasSearchTerm = searchTerm.length > 0;

  return (
    <div className="relative w-full md:w-80">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full pl-10 pr-10 py-2 border rounded-lg 
                   focus:outline-none focus:ring-2 text-sm sm:text-base
                   transition-all duration-200 ${
                     isFocused || hasSearchTerm
                       ? "border-blue-500 ring-2 ring-blue-500/20 bg-white"
                       : "border-gray-300 hover:border-gray-400 bg-white"
                   }`}
      />
      
      {/* Search Icon */}
      <Search
        size={18}
        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
          isFocused || hasSearchTerm ? "text-blue-500" : "text-gray-400"
        }`}
      />
      
      {/* Clear Button */}
      {hasSearchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 
                     p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Clear search"
        >
          <X size={16} className="text-gray-500 hover:text-gray-700" />
        </button>
      )}
    </div>
  );
}
"use client";

import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function TopBar({
  search,
  setSearch,
  dateRange,
  onDateClick,
}: {
  search: string;
  setSearch: (v: string) => void;
  dateRange: string;
  onDateClick: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 mb-4">
      {/* Search Input */}
      <input
        type="text"
        className="border rounded-lg px-4 py-2 w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Browse all QR Codes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Date Picker Button */}
      <button
        className="flex items-center justify-center sm:justify-start border rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 transition shadow-sm"
        onClick={onDateClick}
      >
        <FaCalendarAlt className="mr-2 text-gray-500" />
        <span className="whitespace-nowrap">{dateRange}</span>
      </button>
    </div>
  );
}

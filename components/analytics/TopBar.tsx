
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
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        className="border rounded px-3 py-2 w-full max-w-xs"
        placeholder="Browse all QR Codes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="flex items-center border px-3 py-2 rounded ml-4 text-gray-700 hover:bg-gray-100 transition"
        onClick={onDateClick}
      >
        <FaCalendarAlt className="mr-2" />
        <span>{dateRange}</span>
      </button>
    </div>
  );
}
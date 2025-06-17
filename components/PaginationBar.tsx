import React from "react";

// Props: showingStart, showingEnd, total, page
export default function PaginationBar({
  showingStart,
  showingEnd,
  total,
  page,
}: {
  showingStart: number;
  showingEnd: number;
  total: number;
  page: number;
}) {
  // For demo, hard-coded 3 pages and dots
  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <span className="text-xs text-gray-400">
        Showing {showingStart}-{showingEnd} from {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:opacity-50"
          disabled={page === 1}
        >
          &lt;
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-md text-white bg-blue-600 font-bold">
          1
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100">
          2
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100">
          3
        </button>
        <span className="w-7 h-7 flex items-center justify-center text-blue-300">...</span>
        <button className="w-7 h-7 flex items-center justify-center rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100">
          &gt;
        </button>
      </div>
    </div>
  );
}
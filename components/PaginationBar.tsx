import React from "react";

interface PaginationBarProps {
  showingStart: number;
  showingEnd: number;
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationBar({
  showingStart,
  showingEnd,
  total,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <span className="text-xs text-gray-400">
        Showing {showingStart}-{showingEnd} from {total}
      </span>
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button
          className="w-7 h-7 flex items-center justify-center rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="w-7 h-7 flex items-center justify-center text-blue-300"
              >
                ...
              </span>
            );
          }

          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              className={`w-7 h-7 flex items-center justify-center rounded-md font-medium transition ${
                isActive
                  ? "text-white bg-blue-600"
                  : "text-blue-600 bg-blue-50 hover:bg-blue-100"
              }`}
              onClick={() => onPageChange(pageNum as number)}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className="w-7 h-7 flex items-center justify-center rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
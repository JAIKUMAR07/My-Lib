import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span> results
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg border ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg border ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;

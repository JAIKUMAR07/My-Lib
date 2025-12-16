import React, { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import PaginationControls from "./PaginationControls";

const ReturnBook = ({ borrowedBooks, handleReturnBook }) => {
  const [returnTerm, setReturnTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Smaller number for card view

  const getStatusColor = (status) => {
    switch (status) {
      case "borrowed":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter books
  const filteredBooks = returnTerm
    ? borrowedBooks.filter(
        (b) =>
          (b.transactionId.toLowerCase().includes(returnTerm.toLowerCase()) ||
            b.bookIsbn.includes(returnTerm)) &&
          b.status !== "returned"
      )
    : [];

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ArrowLeft className="w-6 h-6 text-blue-600" />
        Return Book
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Transaction ID or ISBN
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={returnTerm}
              onChange={(e) => {
                setReturnTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              placeholder="TRX-2024-001 or ISBN..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Find
            </button>
          </div>
        </div>

        {returnTerm && (
          <div className="space-y-4">
            {filteredBooks.length > 0 ? (
              <>
                {paginate(filteredBooks).map((book) => (
                  <div
                    key={book.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-800">
                            {book.transactionId}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                              book.status
                            )}`}
                          >
                            {book.status.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800">
                          {book.bookTitle}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Borrowed by: {book.userName} ({book.userLibId})
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p
                          className={`font-medium ${
                            new Date(book.dueDate) < new Date()
                              ? "text-red-600"
                              : "text-gray-800"
                          }`}
                        >
                          {book.dueDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        Fine Amount:{" "}
                        <span className="font-bold text-red-600">
                          ₹{book.fineAmount}
                        </span>
                      </div>
                      <button
                        onClick={() => handleReturnBook(book.transactionId)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Process Return
                      </button>
                    </div>
                  </div>
                ))}

                <PaginationControls
                  currentPage={currentPage}
                  totalItems={filteredBooks.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-20" />
                No active borrowings found matching "{returnTerm}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnBook;

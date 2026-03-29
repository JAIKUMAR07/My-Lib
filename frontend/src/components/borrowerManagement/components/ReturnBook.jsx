import React, { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import PaginationControls from "./PaginationControls";

const ReturnBook = ({ borrowedBooks, handleReturnBook }) => {
  const [userIdSearch, setUserIdSearch] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Filter books using both terms
  const filteredBooks = (userIdSearch || isbnSearch)
    ? borrowedBooks.filter(
        (b) =>
          (b.userLibId.toLowerCase().includes(userIdSearch.toLowerCase()) &&
            b.bookIsbn.includes(isbnSearch)) &&
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
        Return Book Processing
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
              User Identification
            </label>
            <div className="relative">
              <input
                type="text"
                value={userIdSearch}
                onChange={(e) => {
                  setUserIdSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Student Library ID..."
                className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all outline-none font-medium"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Bibliographic Identification (ISBN)
            </label>
            <div className="relative">
              <input
                type="text"
                value={isbnSearch}
                onChange={(e) => {
                  setIsbnSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ISBN-13 or Transaction..."
                className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all outline-none font-medium"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>
      </div>

      {(userIdSearch || isbnSearch) && (
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
              No active borrowings found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReturnBook;

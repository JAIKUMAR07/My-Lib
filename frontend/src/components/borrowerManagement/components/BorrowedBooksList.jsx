import React, { useState } from "react";
import { BookOpen, Search, ArrowLeft, Eye, Inbox } from "lucide-react";
import PaginationControls from "./PaginationControls";

const BorrowedBooksList = ({ borrowedBooks, onReturnBook }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

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
  const filteredBooks = borrowedBooks.filter((book) => {
    // Basic status filter from existing code (exclude returned for this view usually)
    // But parent was filtering out "returned".
    // I will assume parent passes all books or I should filter?
    // Parent code: borrowedBooks.filter((b) => b.status !== "returned")
    // I should do that here or expect pre-filtered props?
    // Since title is "Currently Borrowed Books", I should probably filter here or expect pre-filtered.
    // I'll filter here for robust component.
    if (book.status === "returned") return false;

    // Search
    const matchesSearch =
      book.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());

    // Dropdown Status Filter
    const matchesStatus =
      statusFilter === "All Status" ||
      book.status.toLowerCase() === statusFilter.toLowerCase(); // borrowed, overdue

    return matchesSearch && matchesStatus;
  });

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Currently Borrowed Books ({filteredBooks.length})
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search borrower or book..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>All Status</option>
            <option value="borrowed">Borrowed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
          <Inbox className="w-12 h-12 mb-3 opacity-20" />
          <p className="text-lg font-medium">No books found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Transaction ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Borrower
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Book
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Issue Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Due Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Fines
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginate(filteredBooks).map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {book.transactionId}
                      </code>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-800">
                          {book.userName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {book.userLibId}
                        </div>
                        <div className="text-xs text-gray-500">
                          {book.userEmail}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-800">
                          {book.bookTitle}
                        </div>
                        <div className="text-sm text-gray-600">
                          ISBN: {book.bookIsbn}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{book.issueDate}</td>
                    <td className="py-4 px-4">
                      <div
                        className={`font-medium ${
                          new Date(book.dueDate) < new Date()
                            ? "text-red-600"
                            : "text-gray-800"
                        }`}
                      >
                        {book.dueDate}
                      </div>
                      {new Date(book.dueDate) < new Date() && (
                        <div className="text-xs text-red-500">
                          Overdue by{" "}
                          {Math.floor(
                            (new Date() - new Date(book.dueDate)) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          book.status
                        )}`}
                      >
                        {book.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">₹{book.fineAmount}</div>
                      {book.paidAmount > 0 && (
                        <div className="text-xs text-green-600">
                          Paid: ₹{book.paidAmount}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onReturnBook(book.transactionId)}
                          className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Return
                        </button>
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalItems={filteredBooks.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default BorrowedBooksList;

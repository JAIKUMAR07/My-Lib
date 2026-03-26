import React, { useState } from "react";
import toast from "react-hot-toast";
import { BookOpen, Clock, AlertCircle, Search, RefreshCw } from "lucide-react";

const StudentBorrowedBooks = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const MAX_BOOKS_ALLOWED = 5;

  // Mock borrowed books data
  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 1,
      bookId: 101,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      coverImage: "https://via.placeholder.com/150",
      borrowDate: "2024-01-15",
      dueDate: "2024-02-15",
      daysLeft: 15,
      status: "active", // active, due-soon, overdue, returned
      renewalCount: 0,
      maxRenewals: 2,
      fineAmount: 0,
      condition: "good",
    },
    {
      id: 2,
      bookId: 102,
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Computer Science",
      coverImage: "https://via.placeholder.com/150",
      borrowDate: "2024-01-20",
      dueDate: "2024-01-30",
      daysLeft: -2,
      status: "overdue",
      renewalCount: 1,
      maxRenewals: 2,
      fineAmount: 100,
      condition: "good",
    },
    {
      id: 3,
      bookId: 103,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
      isbn: "978-0201616224",
      category: "Computer Science",
      coverImage: "https://via.placeholder.com/150",
      borrowDate: "2024-01-25",
      dueDate: "2024-02-24",
      daysLeft: 20,
      status: "active",
      renewalCount: 0,
      maxRenewals: 2,
      fineAmount: 0,
      condition: "good",
    },
    {
      id: 4,
      bookId: 104,
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Erich Gamma, Richard Helm",
      isbn: "978-0201633610",
      category: "Computer Science",
      coverImage: "https://via.placeholder.com/150",
      borrowDate: "2023-12-10",
      dueDate: "2024-01-10",
      returnDate: "2024-01-08",
      daysLeft: 0,
      status: "returned",
      renewalCount: 0,
      maxRenewals: 2,
      fineAmount: 0,
      condition: "good",
    },
  ]);

  // Calculate statistics
  const stats = {
    totalIssued: borrowedBooks.filter(
      (b) => b.status === "active" || b.status === "overdue"
    ).length,
    payableDue: borrowedBooks.reduce((sum, book) => sum + book.fineAmount, 0), // Assuming payable due is total fines for now, or could be separate logic
    overdueBooks: borrowedBooks.filter((b) => b.status === "overdue").length,
    currentDue: borrowedBooks.filter(
      (b) => b.daysLeft <= 0 && b.status !== "returned"
    ).length, // Books that have passed due date
    totalFines: borrowedBooks.reduce((sum, book) => sum + book.fineAmount, 0),
  };

  // Filter books based on status and search
  const filteredBooks = borrowedBooks.filter((book) => {
    const matchesStatus =
      selectedStatus === "all" || book.status === selectedStatus;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    return matchesStatus && matchesSearch && book.status !== "returned";
  });

  // Handle book renewal
  const handleRenew = (bookId) => {
    const book = borrowedBooks.find((b) => b.id === bookId);
    if (!book) return;

    if (book.renewalCount >= book.maxRenewals) {
      toast.error(`Maximum renewals (${book.maxRenewals}) reached.`);
      return;
    }

    if (book.fineAmount > 0) {
      toast.error("Please clear outstanding fines before renewing.");
      return;
    }

    // Extend due date by 14 days
    const newDueDate = new Date(book.dueDate);
    newDueDate.setDate(newDueDate.getDate() + 14);

    setBorrowedBooks((books) =>
      books.map((b) =>
        b.id === bookId
          ? {
              ...b,
              dueDate: newDueDate.toISOString().split("T")[0],
              daysLeft: Math.ceil(
                (newDueDate - new Date()) / (1000 * 60 * 60 * 24)
              ),
              renewalCount: b.renewalCount + 1,
              status: "active",
            }
          : b
      )
    );

    toast.success(
      `Book renewed. New due date: ${newDueDate.toISOString().split("T")[0]}`
    );
  };

  // Get status badge style
  const getStatusBadge = (status, daysLeft) => {
    if (status === "returned") {
      return "bg-gray-100 text-gray-800";
    }
    if (status === "overdue" || daysLeft < 0) {
      return "bg-red-100 text-red-800";
    }
    if (daysLeft <= 3) {
      return "bg-orange-100 text-orange-800";
    }
    if (daysLeft <= 7) {
      return "bg-yellow-100 text-yellow-800";
    }
    return "bg-green-100 text-green-800";
  };

  // Get status text
  const getStatusText = (status, daysLeft) => {
    if (status === "returned") return "Returned";
    if (status === "overdue" || daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due Today";
    if (daysLeft === 1) return "Due Tomorrow";
    if (daysLeft <= 7) return "Due Soon";
    return "Active";
  };

  // Get due date color
  const getDueDateColor = (daysLeft) => {
    if (daysLeft < 0) return "text-red-600";
    if (daysLeft === 0) return "text-orange-600";
    if (daysLeft <= 3) return "text-orange-500";
    if (daysLeft <= 7) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              My Borrowed Books
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your current loans and track your deadlines
            </p>
          </div>
        </div>

        {/* Updated Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-gray-500">
                Books Borrowed
              </p>
              <div className="p-2 bg-blue-50 rounded-lg">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalIssued}{" "}
                <span className="text-sm text-gray-400 font-normal">
                  / {MAX_BOOKS_ALLOWED}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-gray-500">Payable Due</p>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                ₹{stats.payableDue}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-gray-500">Overdue Books</p>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {stats.overdueBooks}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-gray-500">Current Due</p>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ₹
                {borrowedBooks
                  .filter((b) => b.daysLeft <= 0 && b.status !== "returned")
                  .reduce((sum, book) => sum + book.fineAmount, 0)}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-gray-500">Total Fines</p>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ₹{stats.totalFines}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Controls Header */}
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, author, or ISBN..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-white border border-gray-200 p-1 rounded-lg">
                  {["all", "active", "overdue"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                        selectedStatus === status
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Books List */}
          <div className="divide-y divide-gray-100">
            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">
                  No books found
                </h3>
                <p className="text-gray-500 mt-1">
                  Adjust your filters or search query
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6 group"
                  >
                    {/* Book Cover */}
                    <div className="w-full md:w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {book.title}
                            </h3>
                            <p className="text-gray-600 font-medium">
                              {book.author}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusBadge(
                              book.status,
                              book.daysLeft
                            )}`}
                          >
                            {getStatusText(book.status, book.daysLeft)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 mt-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">ISBN</p>
                            <p className="font-mono text-gray-700">
                              {book.isbn}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Borrowed On</p>
                            <p className="font-medium text-gray-700">
                              {book.borrowDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Due Date</p>
                            <p
                              className={`font-bold ${getDueDateColor(
                                book.daysLeft
                              )}`}
                            >
                              {book.dueDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Overdue Days</p>
                            <p
                              className={`font-bold ${
                                book.daysLeft < 0
                                  ? "text-red-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {book.daysLeft < 0
                                ? `${Math.abs(book.daysLeft)} Days`
                                : "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Fine</p>
                            <p
                              className={`font-bold ${
                                book.fineAmount > 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {book.fineAmount > 0
                                ? `₹${book.fineAmount}`
                                : "-"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => handleRenew(book.id)}
                            disabled={
                              book.renewalCount >= book.maxRenewals ||
                              book.fineAmount > 0
                            }
                            className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Renew Book
                          </button>
                          <p className="self-center text-sm text-slate-500">
                            Renewals used: {book.renewalCount}/{book.maxRenewals}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBorrowedBooks;

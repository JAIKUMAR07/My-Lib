import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  User,
  Book,
  Calendar,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

const IssueBook = ({
  users,
  setUsers,
  books,
  setBooks,
  borrowedBooks,
  setBorrowedBooks,
}) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Calculate due date (default 30 days)
  const calculateDueDate = (startDate) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  const [dueDate, setDueDate] = useState(
    calculateDueDate(new Date().toISOString().split("T")[0])
  );

  const handleIssueBook = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.libId === selectedUserId);
    const book = books.find((b) => b.isbn === selectedBook);

    if (!user || !book) {
      toast.error("Please select a valid user and book.");
      return;
    }

    if (user.currentBorrowed >= user.maxBooksAllowed) {
      toast.error(
        `User has reached maximum borrowing limit (${user.maxBooksAllowed} books)`
      );
      return;
    }

    if (book.availableCopies <= 0) {
      toast.error("No copies are available for this book.");
      return;
    }

    // Create new transaction
    const newTransaction = {
      id: borrowedBooks.length + 1,
      transactionId: `TRX-2024-${String(borrowedBooks.length + 1).padStart(
        3,
        "0"
      )}`,
      userId: user.id,
      userLibId: user.libId,
      userName: user.name,
      userEmail: user.email,
      bookId: book.id,
      bookIsbn: book.isbn,
      bookTitle: book.title,
      issueDate: issueDate,
      dueDate: dueDate || calculateDueDate(issueDate),
      returnDate: null,
      status: "borrowed",
      fineAmount: 0,
      paidAmount: 0,
      condition: "good",
      issuedBy: "Admin001",
    };

    // Update borrowed books
    setBorrowedBooks([...borrowedBooks, newTransaction]);

    // Update user's borrowed count
    setUsers(
      users.map((u) =>
        u.id === user.id ? { ...u, currentBorrowed: u.currentBorrowed + 1 } : u
      )
    );

    // Update book available copies
    setBooks(
      books.map((b) =>
        b.id === book.id ? { ...b, availableCopies: b.availableCopies - 1 } : b
      )
    );

    // Reset form
    setSelectedUserId("");
    setSelectedBook("");
    setDueDate("");

    toast.success(
      `Book issued successfully! Transaction ID: ${newTransaction.transactionId}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ArrowRight className="w-6 h-6 text-blue-600" />
        Issue New Book
      </h2>

      <form onSubmit={handleIssueBook} className="space-y-6">
        {/* User Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Select Borrower *
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Library ID</option>
              {users.map((user) => (
                <option key={user.id} value={user.libId}>
                  {user.libId} - {user.name} ({user.currentBorrowed}/
                  {user.maxBooksAllowed} books)
                </option>
              ))}
            </select>

            {selectedUserId && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">User Details</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      users.find((u) => u.libId === selectedUserId)
                        ?.outstandingFines > 0
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    Outstanding: ₹
                    {users.find((u) => u.libId === selectedUserId)
                      ?.outstandingFines || 0}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Name: {users.find((u) => u.libId === selectedUserId)?.name}
                  </p>
                  <p>
                    Department:{" "}
                    {users.find((u) => u.libId === selectedUserId)?.department}
                  </p>
                  <p>
                    Current Borrowed:{" "}
                    {
                      users.find((u) => u.libId === selectedUserId)
                        ?.currentBorrowed
                    }
                    /
                    {
                      users.find((u) => u.libId === selectedUserId)
                        ?.maxBooksAllowed
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Book className="w-4 h-4" />
              Select Book *
            </label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select ISBN</option>
              {books
                .filter((b) => b.availableCopies > 0)
                .map((book) => (
                  <option key={book.id} value={book.isbn}>
                    {book.isbn} - {book.title} ({book.availableCopies}{" "}
                    available)
                  </option>
                ))}
            </select>

            {selectedBook && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Book Details</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Available:{" "}
                    {
                      books.find((b) => b.isbn === selectedBook)
                        ?.availableCopies
                    }
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Title: {books.find((b) => b.isbn === selectedBook)?.title}
                  </p>
                  <p>
                    Author: {books.find((b) => b.isbn === selectedBook)?.author}
                  </p>
                  <p>
                    Category:{" "}
                    {books.find((b) => b.isbn === selectedBook)?.category}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Issue Date *
            </label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => {
                setIssueDate(e.target.value);
                setDueDate(calculateDueDate(e.target.value));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Issue Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Issue Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueBook;

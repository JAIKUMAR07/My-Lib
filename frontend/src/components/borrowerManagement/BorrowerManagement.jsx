import React, { useState } from "react";
import {
  BookOpen,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  User,
  Book,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Download,
  Printer,
  Eye,
  MoreVertical,
  CreditCard,
  History,
  TrendingUp,
  BarChart3,
  Shield,
  UserX,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";

const BorrowerManagement = () => {
  const [activeTab, setActiveTab] = useState("issue");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [returnData, setReturnData] = useState({
    libId: "",
    isbn: "",
    condition: "good",
    remarks: "",
  });

  // Mock data
  const [users, setUsers] = useState([
    {
      id: 1,
      libId: "LIB-2024-001",
      name: "John Doe",
      email: "john@university.edu",
      phone: "+1234567890",
      department: "Computer Science",
      outstandingFines: 500,
      maxBooksAllowed: 5,
      currentBorrowed: 3,
    },
    {
      id: 2,
      libId: "LIB-2024-002",
      name: "Jane Smith",
      email: "jane@university.edu",
      phone: "+1234567891",
      department: "Mathematics",
      outstandingFines: 0,
      maxBooksAllowed: 5,
      currentBorrowed: 1,
    },
    {
      id: 3,
      libId: "LIB-2024-003",
      name: "Bob Wilson",
      email: "bob@university.edu",
      phone: "+1234567892",
      department: "Physics",
      outstandingFines: 250,
      maxBooksAllowed: 5,
      currentBorrowed: 4,
    },
  ]);

  const [books, setBooks] = useState([
    {
      id: 1,
      isbn: "978-0262033848",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      availableCopies: 18,
      totalCopies: 25,
      category: "Computer Science",
    },
    {
      id: 2,
      isbn: "978-0132350884",
      title: "Clean Code",
      author: "Robert C. Martin",
      availableCopies: 5,
      totalCopies: 15,
      category: "Computer Science",
    },
    {
      id: 3,
      isbn: "978-0201616224",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      availableCopies: 20,
      totalCopies: 20,
      category: "Computer Science",
    },
  ]);

  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: 1,
      transactionId: "TRX-2024-001",
      userId: 1,
      userLibId: "LIB-2024-001",
      userName: "John Doe",
      userEmail: "john@university.edu",
      bookId: 1,
      bookIsbn: "978-0262033848",
      bookTitle: "Introduction to Algorithms",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      returnDate: null,
      status: "borrowed", // borrowed, returned, overdue
      fineAmount: 500,
      paidAmount: 0,
      condition: "good",
      issuedBy: "Admin001",
    },
    {
      id: 2,
      transactionId: "TRX-2024-002",
      userId: 2,
      userLibId: "LIB-2024-002",
      userName: "Jane Smith",
      userEmail: "jane@university.edu",
      bookId: 2,
      bookIsbn: "978-0132350884",
      bookTitle: "Clean Code",
      issueDate: "2024-01-20",
      dueDate: "2024-02-20",
      returnDate: null,
      status: "borrowed",
      fineAmount: 0,
      paidAmount: 0,
      condition: "good",
      issuedBy: "Admin001",
    },
    {
      id: 3,
      transactionId: "TRX-2024-003",
      userId: 3,
      userLibId: "LIB-2024-003",
      userName: "Bob Wilson",
      userEmail: "bob@university.edu",
      bookId: 3,
      bookIsbn: "978-0201616224",
      bookTitle: "The Pragmatic Programmer",
      issueDate: "2024-01-10",
      dueDate: "2024-01-25",
      returnDate: null,
      status: "overdue",
      fineAmount: 250,
      paidAmount: 0,
      condition: "good",
      issuedBy: "Admin001",
    },
  ]);

  const [returnHistory, setReturnHistory] = useState([
    {
      id: 1,
      transactionId: "TRX-2023-101",
      userName: "John Doe",
      bookTitle: "Data Structures",
      returnDate: "2024-01-05",
      finePaid: 100,
      condition: "good",
      processedBy: "Librarian001",
    },
  ]);

  // Calculate statistics
  const stats = {
    totalBorrowed: borrowedBooks.length,
    overdue: borrowedBooks.filter((b) => b.status === "overdue").length,
    dueThisWeek: borrowedBooks.filter((b) => {
      const due = new Date(b.dueDate);
      const today = new Date();
      const weekFromNow = new Date(today);
      weekFromNow.setDate(today.getDate() + 7);
      return due <= weekFromNow && due >= today && b.status === "borrowed";
    }).length,
    totalFines: borrowedBooks.reduce((sum, book) => sum + book.fineAmount, 0),
    totalPaid: borrowedBooks.reduce((sum, book) => sum + book.paidAmount, 0),
  };

  // Handle book issue
  const handleIssueBook = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.libId === selectedUserId);
    const book = books.find((b) => b.isbn === selectedBook);

    if (!user || !book) {
      alert("Please select valid user and book");
      return;
    }

    if (user.currentBorrowed >= user.maxBooksAllowed) {
      alert(
        `User has reached maximum borrowing limit (${user.maxBooksAllowed} books)`
      );
      return;
    }

    if (book.availableCopies <= 0) {
      alert("No copies available for this book");
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

    alert(
      `Book issued successfully! Transaction ID: ${newTransaction.transactionId}`
    );
  };

  // Handle book return
  const handleReturnBook = (transactionId) => {
    const transaction = borrowedBooks.find(
      (b) => b.transactionId === transactionId
    );
    if (!transaction) return;

    setShowPaymentModal(true);
    setPaymentAmount(transaction.fineAmount);
  };

  // Process payment and return
  const processReturn = () => {
    const transaction = borrowedBooks.find(
      (b) => b.transactionId === returnData.transactionId
    );
    if (!transaction) return;

    const today = new Date().toISOString().split("T")[0];

    // Update transaction
    const updatedTransaction = {
      ...transaction,
      returnDate: today,
      status: "returned",
      paidAmount: paymentAmount,
      condition: returnData.condition,
    };

    // Update borrowed books
    setBorrowedBooks(
      borrowedBooks.map((b) =>
        b.transactionId === returnData.transactionId ? updatedTransaction : b
      )
    );

    // Update user's borrowed count and fines
    setUsers(
      users.map((u) => {
        if (u.libId === transaction.userLibId) {
          return {
            ...u,
            currentBorrowed: u.currentBorrowed - 1,
            outstandingFines: Math.max(0, u.outstandingFines - paymentAmount),
          };
        }
        return u;
      })
    );

    // Update book available copies
    setBooks(
      books.map((b) => {
        if (b.isbn === transaction.bookIsbn) {
          return { ...b, availableCopies: b.availableCopies + 1 };
        }
        return b;
      })
    );

    // Add to return history
    setReturnHistory([
      {
        id: returnHistory.length + 1,
        transactionId: transaction.transactionId,
        userName: transaction.userName,
        bookTitle: transaction.bookTitle,
        returnDate: today,
        finePaid: paymentAmount,
        condition: returnData.condition,
        processedBy: "Librarian001",
      },
      ...returnHistory,
    ]);

    // Reset
    setShowPaymentModal(false);
    setPaymentAmount(0);
    setReturnData({ libId: "", isbn: "", condition: "good", remarks: "" });

    alert("Book returned successfully!");
  };

  // Calculate due date (default 30 days)
  const calculateDueDate = (startDate) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  // Get overdue students
  const overdueStudents = borrowedBooks
    .filter(
      (b) =>
        b.status === "overdue" ||
        (new Date(b.dueDate) < new Date() && b.status === "borrowed")
    )
    .map((b) => ({
      name: b.userName,
      email: b.userEmail,
      libId: b.userLibId,
      book: b.bookTitle,
      dueDate: b.dueDate,
      fineAmount: b.fineAmount,
      daysOverdue: Math.max(
        0,
        Math.floor((new Date() - new Date(b.dueDate)) / (1000 * 60 * 60 * 24))
      ),
    }));

  // Get status color
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                Borrower Management System
              </h1>
              <p className="text-gray-600 mt-2">
                Manage book borrowing lifecycle from issue to return
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Printer className="w-4 h-4" />
                Print Report
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Borrowed</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.totalBorrowed}
                  </p>
                </div>
                <BookOpen className="w-10 h-10 text-blue-500 opacity-70" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overdue</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.overdue}
                  </p>
                </div>
                <AlertCircle className="w-10 h-10 text-red-500 opacity-70" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Due This Week</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.dueThisWeek}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500 opacity-70" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Fines</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{stats.totalFines}
                  </p>
                </div>
                <DollarSign className="w-10 h-10 text-green-500 opacity-70" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Fines Paid</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{stats.totalPaid}
                  </p>
                </div>
                <CreditCard className="w-10 h-10 text-purple-500 opacity-70" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap -mb-px">
                <button
                  className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                    activeTab === "issue"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("issue")}
                >
                  <ArrowRight className="w-4 h-4" />
                  Issue Book
                </button>
                <button
                  className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                    activeTab === "borrowed"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("borrowed")}
                >
                  <BookOpen className="w-4 h-4" />
                  Borrowed Books ({borrowedBooks.length})
                </button>
                <button
                  className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                    activeTab === "return"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("return")}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return Book
                </button>
                <button
                  className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                    activeTab === "overdue"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("overdue")}
                >
                  <AlertCircle className="w-4 h-4" />
                  Overdue Students ({overdueStudents.length})
                </button>
                <button
                  className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                    activeTab === "history"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  <History className="w-4 h-4" />
                  Return History
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* 1️⃣ Issue Book Tab */}
          {activeTab === "issue" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ArrowRight className="w-6 h-6 text-blue-600" />
                Issue New Book
              </h2>

              <form onSubmit={handleIssueBook} className="space-y-6">
                {/* User Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                            Name:{" "}
                            {
                              users.find((u) => u.libId === selectedUserId)
                                ?.name
                            }
                          </p>
                          <p>
                            Department:{" "}
                            {
                              users.find((u) => u.libId === selectedUserId)
                                ?.department
                            }
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
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                            Title:{" "}
                            {books.find((b) => b.isbn === selectedBook)?.title}
                          </p>
                          <p>
                            Author:{" "}
                            {books.find((b) => b.isbn === selectedBook)?.author}
                          </p>
                          <p>
                            Category:{" "}
                            {
                              books.find((b) => b.isbn === selectedBook)
                                ?.category
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
          )}

          {/* 2️⃣ Borrowed Books Tab */}
          {activeTab === "borrowed" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Currently Borrowed Books (
                  {
                    borrowedBooks.filter(
                      (b) => b.status === "borrowed" || b.status === "overdue"
                    ).length
                  }
                  )
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search borrower or book..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Status</option>
                    <option>Borrowed</option>
                    <option>Overdue</option>
                    <option>Returned</option>
                  </select>
                </div>
              </div>

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
                    {borrowedBooks
                      .filter((b) => b.status !== "returned")
                      .map((book) => (
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
                            <div className="font-medium">
                              ₹{book.fineAmount}
                            </div>
                            {book.paidAmount > 0 && (
                              <div className="text-xs text-green-600">
                                Paid: ₹{book.paidAmount}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleReturnBook(book.transactionId)
                                }
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
            </div>
          )}

          {/* 3️⃣ Return Book Tab */}
          {activeTab === "return" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ArrowLeft className="w-6 h-6 text-green-600" />
                Return Book
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Return Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Quick Return
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Library ID
                        </label>
                        <input
                          type="text"
                          value={returnData.libId}
                          onChange={(e) =>
                            setReturnData({
                              ...returnData,
                              libId: e.target.value,
                            })
                          }
                          placeholder="Enter Library ID"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Book ISBN
                        </label>
                        <input
                          type="text"
                          value={returnData.isbn}
                          onChange={(e) =>
                            setReturnData({
                              ...returnData,
                              isbn: e.target.value,
                            })
                          }
                          placeholder="Enter ISBN"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {returnData.libId && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Pending Returns
                          </h4>
                          <div className="space-y-2">
                            {borrowedBooks
                              .filter(
                                (b) =>
                                  b.userLibId === returnData.libId &&
                                  b.status !== "returned"
                              )
                              .map((book) => (
                                <div
                                  key={book.id}
                                  className="flex items-center justify-between p-2 bg-white rounded border"
                                >
                                  <div>
                                    <div className="font-medium">
                                      {book.bookTitle}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      Due: {book.dueDate}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div
                                      className={`font-bold ${
                                        book.fineAmount > 0
                                          ? "text-red-600"
                                          : "text-green-600"
                                      }`}
                                    >
                                      ₹{book.fineAmount}
                                    </div>
                                    <button
                                      onClick={() => {
                                        setReturnData({
                                          ...returnData,
                                          isbn: book.bookIsbn,
                                          transactionId: book.transactionId,
                                        });
                                        setPaymentAmount(book.fineAmount);
                                      }}
                                      className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Book Condition
                        </label>
                        <select
                          value={returnData.condition}
                          onChange={(e) =>
                            setReturnData({
                              ...returnData,
                              condition: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="damaged">Damaged</option>
                          <option value="lost">Lost</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remarks
                        </label>
                        <textarea
                          value={returnData.remarks}
                          onChange={(e) =>
                            setReturnData({
                              ...returnData,
                              remarks: e.target.value,
                            })
                          }
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Any remarks about book condition..."
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        >
                          Process Return
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Returns */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Recent Returns
                    </h3>
                    <div className="space-y-4">
                      {returnHistory.slice(0, 5).map((record) => (
                        <div
                          key={record.id}
                          className="bg-white p-4 rounded-lg border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-gray-800">
                              {record.userName}
                            </div>
                            <span className="text-xs text-gray-500">
                              {record.returnDate}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {record.bookTitle}
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-sm ${
                                record.finePaid > 0
                                  ? "text-green-600"
                                  : "text-gray-600"
                              }`}
                            >
                              Fine: ₹{record.finePaid}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {record.condition}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4️⃣ Overdue Students Tab */}
          {activeTab === "overdue" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  Overdue Students ({overdueStudents.length})
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <Mail className="w-4 h-4" />
                  Send Reminder Email
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {overdueStudents.map((student, index) => (
                  <div
                    key={index}
                    className="bg-white border border-red-200 rounded-xl p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-600">{student.libId}</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        {student.daysOverdue} days overdue
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">
                          {student.book}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Due: {student.dueDate}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-red-600 text-lg">
                          ₹{student.fineAmount}
                        </span>
                        <div className="flex gap-2">
                          <button className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm">
                            Collect Fine
                          </button>
                          <button className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm">
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overdue Summary */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">
                  Overdue Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {overdueStudents.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Overdue</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      ₹
                      {overdueStudents.reduce(
                        (sum, s) => sum + s.fineAmount,
                        0
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Total Fines Due</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {overdueStudents.filter((s) => s.daysOverdue > 7).length}
                    </div>
                    <div className="text-sm text-gray-600">
                      Over 7 Days Late
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {overdueStudents.filter((s) => s.daysOverdue > 30).length}
                    </div>
                    <div className="text-sm text-gray-600">
                      Over 30 Days Late
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5️⃣ Return History Tab */}
          {activeTab === "history" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <History className="w-6 h-6 text-purple-600" />
                  Return History ({returnHistory.length})
                </h2>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Conditions</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Damaged</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Transaction ID
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        User
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Book
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Return Date
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Condition
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Fines Paid
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Processed By
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnHistory.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {record.transactionId}
                          </code>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-800">
                            {record.userName}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-800">
                            {record.bookTitle}
                          </div>
                        </td>
                        <td className="py-4 px-4">{record.returnDate}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              record.condition === "good"
                                ? "bg-green-100 text-green-800"
                                : record.condition === "fair"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {record.condition.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div
                            className={`font-bold ${
                              record.finePaid > 0
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            ₹{record.finePaid}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-600">
                            {record.processedBy}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-green-600" />
              Process Return & Payment
            </h3>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium">Outstanding Fine</span>
                </div>
                <div className="text-3xl font-bold text-yellow-700 text-center">
                  ₹{paymentAmount}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) =>
                    setPaymentAmount(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setPaymentAmount(Math.floor(paymentAmount * 0.5))
                  }
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Pay 50%
                </button>
                <button
                  onClick={() => setPaymentAmount(paymentAmount)}
                  className="flex-1 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  Pay Full
                </button>
                <button
                  onClick={() => setPaymentAmount(0)}
                  className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Pay Later
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={processReturn}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowerManagement;

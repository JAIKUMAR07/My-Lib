import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addIssue } from "../../../redux/issuesSlice";
import { updateUser } from "../../../redux/usersSlice";
import { updateBook } from "../../../redux/booksSlice";
import {
  ArrowRight,
  User,
  Book,
  Calendar,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

/**
 * IssueBook Component
 * Integrated with global Redux store for real-time inventory and user status updates.
 */
const IssueBook = ({ users = [], books = [] }) => {
  const dispatch = useDispatch();
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

    if ((user.currentBorrowed || 0) >= (user.maxBooksAllowed || 5)) {
      toast.error(
        `User has reached maximum borrowing limit (${user.maxBooksAllowed} books)`
      );
      return;
    }

    if ((book.available_copies || 0) <= 0) {
      toast.error("No copies are available for this book.");
      return;
    }

    // Create new transaction payload
    const newTransaction = {
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

    // 1. Dispatch new issue to transactions
    dispatch(addIssue(newTransaction));

    // 2. Update user's borrowed count in Redux
    dispatch(updateUser({
      id: user.id,
      currentBorrowed: (user.currentBorrowed || 0) + 1
    }));

    // 3. Update book availability in Redux
    dispatch(updateBook({
      id: book.id,
      available_copies: (book.available_copies || 0) - 1
    }));

    // Reset form
    setSelectedUserId("");
    setSelectedBook("");
    setDueDate(calculateDueDate(new Date().toISOString().split("T")[0]));

    toast.success(`Book issued successfully to ${user.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-xl">
           <ArrowRight className="w-6 h-6 text-blue-600" />
        </div>
        Issue New Book
      </h2>

      <form onSubmit={handleIssueBook} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Select Borrower
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium appearance-none"
              required
            >
              <option value="">Choose Library ID...</option>
              {users.map((user) => (
                <option key={user.id} value={user.libId}>
                  {user.libId} — {user.name}
                </option>
              ))}
            </select>

            {selectedUserId && (
              <div className="mt-6 p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-200 animate-scaleIn">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profile Snapshot</span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      users.find((u) => u.libId === selectedUserId)?.outstandingFines > 0
                        ? "bg-rose-500/20 text-rose-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    Fine: ₹{users.find((u) => u.libId === selectedUserId)?.outstandingFines || 0}
                  </span>
                </div>
                <div className="space-y-3">
                   <h4 className="text-xl font-bold">{users.find((u) => u.libId === selectedUserId)?.name}</h4>
                   <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium">
                        {users.find((u) => u.libId === selectedUserId)?.department}
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium">
                        {users.find((u) => u.libId === selectedUserId)?.currentBorrowed || 0} / {users.find((u) => u.libId === selectedUserId)?.maxBooksAllowed || 5} Books
                      </span>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <Book className="w-4 h-4" />
              Select Book
            </label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium appearance-none"
              required
            >
              <option value="">Identify by ISBN...</option>
              {books.map((book) => (
                  <option key={book.id} value={book.isbn} disabled={book.available_copies <= 0}>
                    {book.isbn} — {book.title} ({book.available_copies || 0} left)
                  </option>
                ))}
            </select>

            {selectedBook && (
              <div className="mt-6 p-6 bg-cyan-900 rounded-[2rem] text-white shadow-xl shadow-cyan-200 animate-scaleIn">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Catalog Entry</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    books.find(b => b.isbn === selectedBook)?.available_copies > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                  }`}>
                    {books.find(b => b.isbn === selectedBook)?.available_copies > 0 ? "In Stock" : "Reserved"}
                  </span>
                </div>
                <div className="space-y-3">
                   <h4 className="text-xl font-bold truncate">{books.find((b) => b.isbn === selectedBook)?.title}</h4>
                   <p className="text-xs text-cyan-300 font-medium">{books.find((b) => b.isbn === selectedBook)?.author}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Issuance Date
            </label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => {
                setIssueDate(e.target.value);
                setDueDate(calculateDueDate(e.target.value));
              }}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium"
              required
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Maturity Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium"
              required
            />
          </div>
        </div>

        <div className="pt-8 flex justify-center">
          <button
            type="submit"
            className="group relative w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              Confirm Transaction
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueBook;

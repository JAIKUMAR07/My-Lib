import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { BookOpen, Clock, AlertCircle, Search, Inbox } from "lucide-react";

const StudentBorrowedBooks = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const MAX_BOOKS_ALLOWED = 5;

  // Real Redux Data
  const issues = useSelector((state) => state.issues.items || []);
  const books = useSelector((state) => state.books.items || []);
  
  // For frontend demo, we'll show all active issues 
  // In a real app, we would filter by the current logged-in user's libId
  const borrowedBooks = useMemo(() => {
    return issues
      .filter(issue => issue.status !== "returned")
      .map(issue => {
        const bookData = books.find(b => b.isbn === issue.bookIsbn) || {};
        const dueDate = new Date(issue.dueDate);
        const today = new Date();
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return {
          id: issue.id,
          title: issue.bookTitle,
          author: bookData.author || "Global Source",
          isbn: issue.bookIsbn,
          borrowDate: issue.issueDate,
          dueDate: issue.dueDate,
          daysLeft: diffDays,
          status: diffDays < 0 ? "overdue" : issue.status,
          fineAmount: issue.fineAmount || 0,
          image: bookData.image || "https://images.unsplash.com/photo-1543005139-85e883804825?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        };
      });
  }, [issues, books]);

  // Calculate statistics
  const stats = useMemo(() => ({
    totalIssued: borrowedBooks.length,
    payableDue: borrowedBooks.reduce((sum, book) => sum + book.fineAmount, 0),
    overdueBooks: borrowedBooks.filter((b) => b.status === "overdue").length,
    currentDue: borrowedBooks.filter((b) => b.daysLeft <= 0).length,
    totalFines: borrowedBooks.reduce((sum, book) => sum + book.fineAmount, 0),
  }), [borrowedBooks]);

  // Filter books based on status and search
  const filteredBooks = borrowedBooks.filter((book) => {
    const matchesStatus =
      selectedStatus === "all" || book.status === selectedStatus;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Helper for status styling
  const getStatusBadge = (status, daysLeft) => {
    if (status === "overdue" || daysLeft < 0) return "bg-rose-100 text-rose-800";
    if (daysLeft <= 3) return "bg-amber-100 text-amber-800";
    if (daysLeft <= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-emerald-100 text-emerald-800";
  };

  const getStatusText = (status, daysLeft) => {
    if (status === "overdue" || daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due Today";
    if (daysLeft === 1) return "Due Tomorrow";
    if (daysLeft <= 7) return "Attention: Due Soon";
    return "Active Loan";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4 tracking-tighter">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-200">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              My Knowledge Inventory
            </h1>
            <p className="text-slate-500 font-medium mt-2 max-w-xl">
              Monitor your active knowledge assets, track return cycles, and manage academic accountability.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard label="Borrowed" value={`${stats.totalIssued} / ${MAX_BOOKS_ALLOWED}`} icon={BookOpen} color="blue" />
          <StatCard label="Payable Due" value={`₹${stats.payableDue}`} icon={Clock} color="rose" />
          <StatCard label="Overdue" value={stats.overdueBooks} icon={AlertCircle} color="rose" isActive={stats.overdueBooks > 0} />
          <StatCard label="Current Due" value={`₹${stats.currentDue * 10}`} icon={Clock} color="amber" />
          <StatCard label="Total Fines" value={`₹${stats.totalFines}`} icon={Clock} color="slate" />
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          {/* Controls Header */}
          <div className="p-8 border-b border-slate-100 bg-slate-50/30">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query by title, author, or ISBN..."
                  className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all font-medium"
                />
              </div>

              <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
                {["all", "active", "overdue"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      selectedStatus === status
                        ? "bg-white text-slate-950 shadow-md translate-y-[-1px]"
                        : "text-slate-500 hover:text-slate-950"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Books List */}
          <div className="divide-y divide-slate-50">
            {filteredBooks.length === 0 ? (
              <div className="text-center py-32 flex flex-col items-center">
                <div className="p-6 bg-slate-50 rounded-full mb-6">
                  <Inbox className="w-16 h-16 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Archive Vacant</h3>
                <p className="text-slate-400 font-medium mt-1">No active borrowing records match your current filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row gap-8 group"
                  >
                    {/* Book Cover */}
                    <div className="w-full md:w-36 h-48 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm flex items-center justify-center">
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.src="https://images.unsplash.com/photo-1543005139-85e883804825?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                        <div className="max-w-2xl">
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                            {book.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                             <div className="w-1 h-1 rounded-full bg-slate-300" />
                             <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                               {book.author}
                             </p>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${getStatusBadge(
                            book.status,
                            book.daysLeft
                          )}`}
                        >
                          {getStatusText(book.status, book.daysLeft)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <DataBox label="Asset ISBN" value={book.isbn} mono />
                        <DataBox label="Issued On" value={book.borrowDate} />
                        <DataBox label="Return Deadline" value={book.dueDate} isError={book.daysLeft < 0} />
                        <DataBox 
                          label="Fine Assessment" 
                          value={book.fineAmount > 0 ? `₹${book.fineAmount}` : "None"} 
                          isError={book.fineAmount > 0} 
                          isSuccess={book.fineAmount === 0}
                        />
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">
                               {book.daysLeft < 0 ? `Penalty Active: ${Math.abs(book.daysLeft)} Days` : `Return Window: ${book.daysLeft} Days remaining`}
                            </span>
                         </div>
                         <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Resource ID: {book.id}
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

const StatCard = ({ label, value, icon: Icon, color, isActive }) => (
  <div className={`bg-white p-6 rounded-[2rem] shadow-lg shadow-slate-200 border border-slate-50 flex flex-col justify-between h-36 transition-all hover:-translate-y-1 ${isActive ? 'ring-2 ring-rose-500 ring-offset-2' : ''}`}>
    <div className="flex items-start justify-between">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <div className={`p-2.5 rounded-xl bg-${color}-50`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
    </div>
    <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
  </div>
);

const DataBox = ({ label, value, mono, isError, isSuccess }) => (
  <div>
    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{label}</p>
    <p className={`text-sm font-bold ${mono ? 'font-mono' : ''} ${isError ? 'text-rose-600' : isSuccess ? 'text-emerald-600' : 'text-slate-800'}`}>
      {value}
    </p>
  </div>
);

export default StudentBorrowedBooks;

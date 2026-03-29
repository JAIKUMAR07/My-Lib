import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Download, Printer, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { markAsReturned } from "../../redux/issuesSlice";
import { updateUser } from "../../redux/usersSlice";
import { updateBook } from "../../redux/booksSlice";

import StatsOverview from "./components/StatsOverview";
import TabNavigation from "./components/TabNavigation";
import IssueBook from "./components/IssueBook";
import BorrowedBooksList from "./components/BorrowedBooksList";
import ReturnBook from "./components/ReturnBook";
import OverdueStudents from "./components/OverdueStudents";
import ReturnHistory from "./components/ReturnHistory";
import FinePayment from "./components/FinePayment";
import FineHistory from "./components/FineHistory";
import PaymentModal from "./components/PaymentModal";

const BorrowerManagement = () => {
  const dispatch = useDispatch();
  
  // Connect to Redux Global State
  const users = useSelector((state) => state.users.items);
  const books = useSelector((state) => state.books.items);
  const allIssues = useSelector((state) => state.issues.items);

  // Derived state categories
  const borrowedBooks = useMemo(() => 
    allIssues.filter(i => i.status === "borrowed" || i.status === "overdue"), 
  [allIssues]);
  
  const returnHistory = useMemo(() => 
    allIssues.filter(i => i.status === "returned"), 
  [allIssues]);

  const fineHistory = useSelector((state) => state.issues.fineHistory || []);

  const [activeTab, setActiveTab] = useState("issue"); 
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [returnTransaction, setReturnTransaction] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Stats Logic
  const stats = useMemo(() => ({
    totalBorrowed: borrowedBooks.filter((b) => b.status === "borrowed").length,
    overdue: borrowedBooks.filter((b) => b.status === "overdue").length,
    dueThisWeek: borrowedBooks.filter((b) => {
      if (b.status !== "borrowed") return false;
      const due = new Date(b.dueDate);
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      return due >= today && due <= nextWeek;
    }).length,
    totalFines: borrowedBooks.reduce((acc, curr) => acc + (curr.fineAmount || 0), 0),
    totalPaid: returnHistory.reduce((acc, curr) => acc + (curr.paidAmount || 0), 0),
  }), [borrowedBooks, returnHistory]);

  // Get overdue students derived data
  const overdueStudents = useMemo(() => 
    users
      .filter((u) => u.outstandingFines > 0)
      .map((u) => ({
        id: u.id,
        name: u.name,
        libId: u.libId,
        email: u.email,
        department: u.department,
        fineAmount: u.outstandingFines,
      })),
  [users]);

  const handleReturnBook = (transactionId) => {
    const transaction = allIssues.find(
      (b) => b.transactionId === transactionId
    );
    if (!transaction) return;

    setReturnTransaction(transaction);
    setPaymentAmount(0);
    setShowPaymentModal(true);
  };

  const processReturn = () => {
    if (!returnTransaction) return;

    const returnDate = new Date().toISOString().split("T")[0];

    // 1. Update issue status in Redux
    dispatch(markAsReturned({
      id: returnTransaction.id,
      returnDate,
      finePaidAmount: paymentAmount,
      condition: "good"
    }));

    // 2. Update user stats in Redux
    const user = users.find((u) => u.id === returnTransaction.userId);
    if (user) {
      dispatch(updateUser({
        id: user.id,
        currentBorrowed: Math.max(0, (user.currentBorrowed || 0) - 1),
        outstandingFines: Math.max(0, (user.outstandingFines || 0) - paymentAmount),
      }));
    }

    // 3. Update book availability in Redux
    const book = books.find((b) => b.id === returnTransaction.bookId);
    if (book) {
      dispatch(updateBook({
        id: book.id,
        available_copies: (book.available_copies || 0) + 1,
      }));
    }

    setShowPaymentModal(false);
    setReturnTransaction(null);
    setPaymentAmount(0);
    toast.success("Book returned and inventory updated.");
  };

  return (
    <div className="page-shell px-4 md:px-6">
      <div className="page-section p-4 rounded-[2rem] md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Borrower Management
            </h1>
            <p className="text-gray-600 mt-1">
              Issue books, manage returns, and track system-wide library activity
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 bg-white transition-colors">
              <Printer className="w-4 h-4" />
              Print Report
            </button>
            <button className="app-button-primary flex items-center gap-2 px-6 py-2 rounded-lg text-white">
              <Download className="w-4 h-4" />
              Export Archive
            </button>
          </div>
        </div>

        <StatsOverview stats={stats} />

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          borrowedBooksCount={borrowedBooks.length}
          overdueStudentsCount={overdueStudents.length}
        />

        <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 min-h-[500px] p-2 md:p-6">
          {activeTab === "issue" && (
            <IssueBook
              users={users}
              books={books}
              borrowedBooks={allIssues}
            />
          )}

          {activeTab === "borrowed" && (
            <BorrowedBooksList
              borrowedBooks={borrowedBooks}
              onReturnBook={handleReturnBook}
            />
          )}

          {activeTab === "return" && (
            <ReturnBook
              borrowedBooks={borrowedBooks}
              handleReturnBook={handleReturnBook}
            />
          )}

          {activeTab === "overdue" && (
            <OverdueStudents overdueStudents={overdueStudents} />
          )}

          {activeTab === "history" && (
            <ReturnHistory returnHistory={returnHistory} />
          )}

          {activeTab === "fine-payment" && (
            <FinePayment
              users={users}
              fineHistory={fineHistory}
            />
          )}

          {activeTab === "fine-history" && (
            <FineHistory fineHistory={fineHistory} />
          )}
        </div>
      </div>

      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        processReturn={processReturn}
        returnTransaction={returnTransaction}
      />
    </div>
  );
};

export default BorrowerManagement;

import React, { useState } from "react";
import { Download, Printer, ChevronDown } from "lucide-react";
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
  // Mock data
  const [users, setUsers] = useState([
    {
      id: 1,
      libId: "LIB-2024-001",
      name: "John Doe",
      email: "john@university.edu",
      phone: "+91 9876543210",
      department: "Computer Science",
      currentBorrowed: 2,
      maxBooksAllowed: 5,
      outstandingFines: 500,
      active: true,
    },
    {
      id: 2,
      libId: "LIB-2024-002",
      name: "Jane Smith",
      email: "jane@university.edu",
      phone: "+91 9876543211",
      department: "Electronics",
      currentBorrowed: 1,
      maxBooksAllowed: 5,
      outstandingFines: 0,
      active: true,
    },
    {
      id: 3,
      libId: "LIB-2024-003",
      name: "Mike Wilson",
      email: "mike@university.edu",
      phone: "+91 9876543212",
      department: "Mechanical",
      currentBorrowed: 3,
      maxBooksAllowed: 3,
      outstandingFines: 250,
      active: true,
    },
    {
      id: 4,
      libId: "DEMO-001",
      name: "Demo Student",
      email: "demo@university.edu",
      phone: "+91 9876543213",
      department: "General",
      currentBorrowed: 0,
      maxBooksAllowed: 3,
      outstandingFines: 1000,
      active: true,
    },
  ]);

  const [books, setBooks] = useState([
    {
      id: 1,
      isbn: "978-0134685991",
      title: "Effective Java",
      author: "Joshua Bloch",
      category: "Computer Science",
      availableCopies: 5,
      totalCopies: 8,
    },
    {
      id: 2,
      isbn: "978-0132350884",
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Software Engineering",
      availableCopies: 0,
      totalCopies: 5,
    },
    {
      id: 3,
      isbn: "978-0321125217",
      title: "Domain-Driven Design",
      author: "Eric Evans",
      category: "Software Architecture",
      availableCopies: 3,
      totalCopies: 4,
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
      bookIsbn: "978-0134685991",
      bookTitle: "Effective Java",
      issueDate: "2024-03-01",
      dueDate: "2024-03-31",
      returnDate: null,
      status: "borrowed", // borrowed, returned, overdue
      fineAmount: 0,
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
      bookId: 3,
      bookIsbn: "978-0321125217",
      bookTitle: "Domain-Driven Design",
      issueDate: "2024-02-15",
      dueDate: "2024-03-15",
      returnDate: null,
      status: "overdue",
      fineAmount: 150,
      paidAmount: 0,
      condition: "good",
      issuedBy: "Admin002",
    },
    // Adding more overdue for testing
    {
      id: 3,
      transactionId: "TRX-2024-003",
      userId: 3,
      userLibId: "LIB-2024-003",
      userName: "Mike Wilson",
      userEmail: "mike@university.edu",
      bookId: 1,
      bookIsbn: "978-0134685991",
      bookTitle: "Effective Java",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
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
      transactionId: "TRX-2024-000",
      userId: 1,
      userLibId: "LIB-2024-001",
      userName: "John Doe",
      bookId: 2,
      bookIsbn: "978-0132350884",
      bookTitle: "Clean Code",
      issueDate: "2024-01-01",
      dueDate: "2024-01-31",
      returnDate: "2024-01-28",
      status: "returned",
      fineAmount: 0,
      paidAmount: 0,
      finePaid: 0,
      condition: "good",
      processedBy: "Admin001",
    },
  ]);

  const [fineHistory, setFineHistory] = useState([
    {
      id: 1,
      transactionId: "FINE-2024-001",
      userName: "Jane Smith",
      userLibId: "LIB-2024-002",
      amount: 150,
      date: "2024-03-10",
      type: "Late Return Fine",
      processedBy: "Admin002",
      remarks: "Returned 3 days late",
    },
  ]);

  const [activeTab, setActiveTab] = useState("issue"); // issue, borrowed, return, overdue, history, fine-payment, fine-history
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [returnTransaction, setReturnTransaction] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Stats Logic (unchanged calculation)
  const stats = {
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
    totalFines: borrowedBooks.reduce((acc, curr) => acc + curr.fineAmount, 0),
    totalPaid:
      returnHistory.reduce((acc, curr) => acc + curr.finePaid, 0) +
      fineHistory.reduce((acc, curr) => acc + curr.amount, 0),
  };

  // Get overdue students derived data (Users with outstanding fines)
  const overdueStudents = users
    .filter((u) => u.outstandingFines > 0)
    .map((u) => ({
      id: u.id,
      name: u.name,
      libId: u.libId,
      email: u.email,
      department: u.department,
      fineAmount: u.outstandingFines,
    }));

  // Handle Return Book click (opens modal)
  const handleReturnBook = (transactionId) => {
    const transaction = borrowedBooks.find(
      (b) => b.transactionId === transactionId
    );
    if (!transaction) return;

    setReturnTransaction(transaction);
    setPaymentAmount(transaction.fineAmount - transaction.paidAmount);
    setShowPaymentModal(true);
  };

  // Process Return Confirmation
  const processReturn = () => {
    if (!returnTransaction) return;

    // Remove from borrowed books
    const updatedBorrowed = borrowedBooks.map((b) =>
      b.transactionId === returnTransaction.transactionId
        ? {
            ...b,
            status: "returned",
            returnDate: new Date().toISOString().split("T")[0],
          } // Update status locally if needed or filter out
        : b
    );
    // Actually, we usually move it to history and change status in borrowed list (or remove from borrowed list if borrowed list only shows active).
    // Existing logic was keeping it in `borrowedBooks` but with status 'returned'?
    // Let's check original code...
    // Original code:
    // setBorrowedBooks(borrowedBooks.map(b => b.transactionId === ... ? {...b, status: 'returned', ...} : b))
    // AND setReturnHistory([...])

    setBorrowedBooks(
      borrowedBooks.map((b) =>
        b.transactionId === returnTransaction.transactionId
          ? {
              ...b,
              returnDate: new Date().toISOString().split("T")[0],
              status: "returned",
              paidAmount: b.paidAmount + paymentAmount,
            }
          : b
      )
    );

    // Add to return history
    const historyRecord = {
      ...returnTransaction,
      id: returnHistory.length + 1,
      returnDate: new Date().toISOString().split("T")[0],
      status: "returned",
      finePaid: paymentAmount,
      condition: "good", // Mock condition
      processedBy: "Admin001",
    };
    setReturnHistory([historyRecord, ...returnHistory]);

    // Update user stats
    const user = users.find((u) => u.id === returnTransaction.userId);
    if (user) {
      setUsers(
        users.map((u) =>
          u.id === user.id
            ? {
                ...u,
                currentBorrowed: Math.max(0, u.currentBorrowed - 1),
                outstandingFines: Math.max(
                  0,
                  u.outstandingFines - paymentAmount
                ),
              }
            : u
        )
      );
    }

    // Update book copies
    const book = books.find((b) => b.id === returnTransaction.bookId);
    if (book) {
      setBooks(
        books.map((b) =>
          b.id === book.id
            ? { ...b, availableCopies: b.availableCopies + 1 }
            : b
        )
      );
    }

    setShowPaymentModal(false);
    setReturnTransaction(null);
    setPaymentAmount(0);
    alert("Book returned successfully!");
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Borrower Management
            </h1>
            <p className="text-gray-600 mt-1">
              Issue books, manage returns, and track fines
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 bg-white">
              <Printer className="w-4 h-4" />
              Print Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export Data
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          borrowedBooksCount={
            borrowedBooks.filter((b) => b.status !== "returned").length
          }
          overdueStudentsCount={overdueStudents.length}
        />

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] p-6">
          {activeTab === "issue" && (
            <IssueBook
              users={users}
              setUsers={setUsers}
              books={books}
              setBooks={setBooks}
              borrowedBooks={borrowedBooks}
              setBorrowedBooks={setBorrowedBooks}
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
              setUsers={setUsers}
              fineHistory={fineHistory}
              setFineHistory={setFineHistory}
            />
          )}

          {activeTab === "fine-history" && (
            <FineHistory fineHistory={fineHistory} />
          )}
        </div>
      </div>

      {/* Payment Modal */}
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

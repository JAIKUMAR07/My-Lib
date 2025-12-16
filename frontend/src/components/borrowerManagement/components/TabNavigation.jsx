import React from "react";
import {
  ArrowRight,
  BookOpen,
  ArrowLeft,
  AlertCircle,
  History,
  Wallet,
  FileClock,
} from "lucide-react";

const TabNavigation = ({
  activeTab,
  setActiveTab,
  borrowedBooksCount,
  overdueStudentsCount,
}) => {
  return (
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
            Borrowed Books ({borrowedBooksCount})
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
            Overdue Students ({overdueStudentsCount})
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
          <button
            className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
              activeTab === "fine-payment"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("fine-payment")}
          >
            <Wallet className="w-4 h-4" />
            Fine Payment
          </button>
          <button
            className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
              activeTab === "fine-history"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("fine-history")}
          >
            <FileClock className="w-4 h-4" />
            Due/Fine History
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;

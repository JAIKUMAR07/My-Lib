import React, { useState } from "react";
import AddBook from "./AddBook"; // Renamed import to avoid conflict
import BookInventory from "./BookInventory";
import EditBook from "./EditBook";
import {
  Book,
  Plus,
  Edit,
  Package,
  Search,
  Filter,
  Download,
  Upload,
  ChevronRight,
  BookOpen,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";

// Move placeholder components outside the main component to prevent re-definition on every render.
const BookInventoryPlaceholder = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Inventory</h2>
    <p className="text-gray-600">
      Content for managing book inventory goes here.
    </p>
    <AddBook />
  </div>
);
const AddBookPlaceholder = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Book</h2>
    <p className="text-gray-600">Form for adding a new book goes here.</p>
    <AddBook />
  </div>
);
const EditBookPlaceholder = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Edit Book Details
    </h2>
    <p className="text-gray-600">Form for editing book details goes here.</p>
  </div>
);

const BookManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  // Define stats outside or use useMemo if it were derived from props/state and complex,
  // but for a static object like this, re-creation on render is negligible.
  const stats = {
    totalBooks: 12450,
    availableCopies: 9876,
    borrowedCopies: 2543,
    categories: 28,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Book className="w-8 h-8 text-blue-600" />
              Book Management System
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your library collection, inventory, and book details
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Books</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalBooks}
                </p>
              </div>
              <Book className="w-10 h-10 text-blue-500 opacity-70" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Copies</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.availableCopies}
                </p>
              </div>
              <BookOpen className="w-10 h-10 text-green-500 opacity-70" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Borrowed Copies</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.borrowedCopies}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500 opacity-70" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.categories}
                </p>
              </div>
              <Filter className="w-10 h-10 text-orange-500 opacity-70" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px">
            <button
              className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                activeTab === "inventory"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("inventory")}
            >
              <Package className="w-4 h-4" />
              Inventory Management
            </button>
            <button
              className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                activeTab === "add"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("add")}
            >
              <Plus className="w-4 h-4" />
              Add New Book
            </button>
            <button
              className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                activeTab === "edit"
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              <Edit className="w-4 h-4" />
              Edit Book Details
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "inventory" && <BookInventory />}
          {activeTab === "add" && <AddBook />}
          {activeTab === "edit" && <EditBook />}
        </div>
      </div>
    </div>
  );
};

export default BookManagement;

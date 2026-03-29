import React, { useMemo, useState } from "react";
import AddBook from "../../components/booksManagement/AddBook";
import BookInventory from "../../components/booksManagement/BookInventory";
import EditBook from "../../components/booksManagement/EditBook";
import CatalogSettings from "../../components/booksManagement/CatalogSettings";
import {
  Book,
  Plus,
  Edit,
  Package,
  Filter,
  Download,
  BookOpen,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";

const BookManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const books = useSelector((state) => state.books.items || []);
  const categories = useSelector((state) => state.books.categories || []);

  const stats = useMemo(
    () => ({
      totalBooks: books.reduce((sum, book) => sum + book.total_copies, 0),
      availableCopies: books.reduce((sum, book) => sum + book.available_copies, 0),
      borrowedCopies: books.reduce((sum, book) => sum + (book.borrowed_copies || 0), 0),
      categories: categories.length,
    }),
    [books, categories.length]
  );

  return (
    <div className="page-shell px-4 md:px-6">
      <div className="page-section rounded-[2rem] p-4 md:p-6">
        <div className="mb-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Book className="w-8 h-8 text-cyan-700" />
                Book Management System
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your library collection, inventory, and book details
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="app-button-primary flex items-center gap-2 rounded-lg px-4 py-2 transition">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="soft-card rounded-xl border-l-4 border-cyan-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Books</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.totalBooks}
                  </p>
                </div>
                <Book className="w-10 h-10 text-cyan-700 opacity-70" />
              </div>
            </div>

            <div className="soft-card rounded-xl border-l-4 border-slate-500 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Available Copies</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.availableCopies}
                  </p>
                </div>
                <BookOpen className="w-10 h-10 text-slate-700 opacity-70" />
              </div>
            </div>

            <div className="soft-card rounded-xl border-l-4 border-emerald-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Borrowed Copies</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.borrowedCopies}
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-emerald-700 opacity-70" />
              </div>
            </div>

            <div className="soft-card rounded-xl border-l-4 border-amber-500 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Categories</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.categories}
                  </p>
                </div>
                <Filter className="w-10 h-10 text-amber-700 opacity-70" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px flex-wrap overflow-x-auto">
              <button
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                  activeTab === "inventory"
                    ? "border-cyan-600 text-cyan-700"
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
                    ? "border-cyan-600 text-cyan-700"
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
                    ? "border-cyan-600 text-cyan-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("edit")}
              >
                <Edit className="w-4 h-4" />
                Edit Book Details
              </button>
              <button
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition ${
                  activeTab === "catalog"
                    ? "border-cyan-600 text-cyan-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("catalog")}
              >
                <Settings className="w-4 h-4" />
                Catalog Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "inventory" && <BookInventory />}
            {activeTab === "add" && <AddBook />}
            {activeTab === "edit" && <EditBook />}
            {activeTab === "catalog" && <CatalogSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookManagement;

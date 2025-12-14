import React, { useState } from "react";
import {
  Plus,
  Minus,
  Search,
  Filter,
  Download,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  MoreVertical,
  RefreshCw,
  BarChart3,
} from "lucide-react";

const BookInventory = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      total_copies: 25,
      available_copies: 18,
      borrowed_copies: 7,
      status: "in-stock",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Computer Science",
      total_copies: 15,
      available_copies: 5,
      borrowed_copies: 10,
      status: "low-stock",
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      isbn: "978-0201616224",
      category: "Computer Science",
      total_copies: 20,
      available_copies: 0,
      borrowed_copies: 20,
      status: "out-of-stock",
    },
    {
      id: 4,
      title: "Design Patterns",
      author: "Erich Gamma",
      isbn: "978-0201633610",
      category: "Computer Science",
      total_copies: 12,
      available_copies: 12,
      borrowed_copies: 0,
      status: "in-stock",
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [stockAdjustment, setStockAdjustment] = useState(1);

  const handleStockIncrease = (bookId, amount) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === bookId) {
          const newTotal = book.total_copies + amount;
          const newAvailable = book.available_copies + amount;
          return {
            ...book,
            total_copies: newTotal,
            available_copies: newAvailable,
            status: getStockStatus(newTotal, newAvailable),
          };
        }
        return book;
      })
    );
  };

  const handleStockDecrease = (bookId, amount) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === bookId && book.available_copies >= amount) {
          const newTotal = book.total_copies - amount;
          const newAvailable = book.available_copies - amount;
          return {
            ...book,
            total_copies: newTotal,
            available_copies: newAvailable,
            status: getStockStatus(newTotal, newAvailable),
          };
        }
        return book;
      })
    );
  };

  const getStockStatus = (total, available) => {
    if (available === 0) return "out-of-stock";
    if (available < total * 0.2) return "low-stock";
    return "in-stock";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Book Inventory Management
        </h2>
        <p className="text-gray-600">
          Manage book stock levels and track availability
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books by title, author, or ISBN..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Categories</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Physics</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stock Adjustment Panel */}
        {selectedBook && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-800">
                  Adjust Stock for: {selectedBook.title}
                </h4>
                <p className="text-sm text-gray-600">
                  Current stock: {selectedBook.total_copies} copies
                </p>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="p-1 hover:bg-white rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleStockDecrease(selectedBook.id, stockAdjustment)
                  }
                  disabled={selectedBook.available_copies < stockAdjustment}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" /> Decrease
                </button>
                <input
                  type="number"
                  value={stockAdjustment}
                  onChange={(e) =>
                    setStockAdjustment(parseInt(e.target.value) || 1)
                  }
                  min="1"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
                <button
                  onClick={() =>
                    handleStockIncrease(selectedBook.id, stockAdjustment)
                  }
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  <Plus className="w-4 h-4" /> Increase
                </button>
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Quick Actions:</span>
                <button
                  onClick={() => handleStockIncrease(selectedBook.id, 1)}
                  className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  +1
                </button>
                <button
                  onClick={() => handleStockIncrease(selectedBook.id, 5)}
                  className="ml-1 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  +5
                </button>
                <button
                  onClick={() => handleStockIncrease(selectedBook.id, 10)}
                  className="ml-1 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  +10
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Book Details
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  ISBN
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Stock Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Available
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-800">
                        {book.title}
                      </div>
                      <div className="text-sm text-gray-600">{book.author}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                      {book.isbn}
                    </code>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                        book.status
                      )}`}
                    >
                      {book.status.replace("-", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          {book.available_copies}
                        </span>
                        <span className="text-sm text-gray-500">
                          of {book.total_copies}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (book.available_copies / book.total_copies) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setStockAdjustment(1);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
                      >
                        <Plus className="w-3 h-3" />
                        Adjust Stock
                      </button>
                      <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {books.reduce((sum, book) => sum + book.total_copies, 0)}
              </div>
              <div className="text-sm text-gray-600">
                Total Copies in Inventory
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {books.reduce((sum, book) => sum + book.available_copies, 0)}
              </div>
              <div className="text-sm text-gray-600">
                Available for Borrowing
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {books.filter((book) => book.status === "low-stock").length}
              </div>
              <div className="text-sm text-gray-600">Books Low on Stock</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInventory;

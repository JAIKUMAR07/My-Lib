import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Save,
  RotateCcw,
  Book,
  User,
  Hash,
  Globe,
  Type,
  Building,
  FileText,
  Image as ImageIcon,
  Package,
  CheckCircle,
  List,
  Grid,
  ChevronRight,
  ChevronLeft,
  Eye,
  X,
  Calendar,
  Tag,
  Upload,
} from "lucide-react";

const EditBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [imageFile, setImageFile] = useState(null); // For file upload
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Mock book data - replace with API call
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "Computer Science",
      isbn: "978-0262033848",
      description: "Comprehensive guide to algorithms and data structures",
      publisher: "MIT Press",
      edition: "3rd",
      language: "English",
      cover_image_url: "https://via.placeholder.com/150",
      total_copies: 25,
      available_copies: 18,
      published_year: 2009,
      added_date: "2023-01-15",
      status: "in-stock",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Computer Science",
      isbn: "978-0132350884",
      description: "A handbook of agile software craftsmanship",
      publisher: "Pearson",
      edition: "1st",
      language: "English",
      cover_image_url: "https://via.placeholder.com/150",
      total_copies: 15,
      available_copies: 5,
      published_year: 2008,
      added_date: "2023-02-20",
      status: "in-stock",
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
      category: "Computer Science",
      isbn: "978-0201616224",
      description: "From journeyman to master",
      publisher: "Addison-Wesley",
      edition: "2nd",
      language: "English",
      cover_image_url: "https://via.placeholder.com/150",
      total_copies: 20,
      available_copies: 20,
      published_year: 2019,
      added_date: "2023-03-10",
      status: "in-stock",
    },
    {
      id: 4,
      title: "Design Patterns",
      author: "Erich Gamma, Richard Helm",
      category: "Computer Science",
      isbn: "978-0201633610",
      description: "Elements of Reusable Object-Oriented Software",
      publisher: "Addison-Wesley",
      edition: "1st",
      language: "English",
      cover_image_url: "https://via.placeholder.com/150",
      total_copies: 12,
      available_copies: 12,
      published_year: 1994,
      added_date: "2023-01-25",
      status: "in-stock",
    },
    {
      id: 5,
      title: "The Art of Computer Programming",
      author: "Donald E. Knuth",
      category: "Computer Science",
      isbn: "978-0201896831",
      description: "Fundamental algorithms",
      publisher: "Addison-Wesley",
      edition: "3rd",
      language: "English",
      cover_image_url: "https://via.placeholder.com/150",
      total_copies: 8,
      available_copies: 2,
      published_year: 1997,
      added_date: "2023-04-05",
      status: "in-stock",
    },
    {
      id: 6,
      title: "Structure and Interpretation of Computer Programs",
      author: "Harold Abelson, Gerald Jay Sussman",
      category: "Computer Science",
      isbn: "978-0262510875",
      description: "Classic computer science textbook",
      publisher: "MIT Press",
      edition: "2nd",
      language: "English",
      cover_image_url: "https://via.placeholder.com/150",
      total_copies: 10,
      available_copies: 0,
      published_year: 1996,
      added_date: "2023-02-15",
      status: "out-of-stock",
    },
  ]);

  const categories = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Literature",
    "Philosophy",
    "Art & Design",
    "Business",
    "Engineering",
    "Medicine",
    "Law",
    "Education",
    "Other",
  ];

  const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Other",
  ];

  // Filter books based on search, category, and status
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || book.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    if (filterType === "category") setSelectedCategory(value);
    if (filterType === "status") setSelectedStatus(value);
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Page navigation
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setFormData(book);
    setImagePreview(book.cover_image_url); // Set initial preview
    setImageFile(null); // Clear any previous file
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare form data for API call
    const bookData = new FormData();

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "cover_image_url" || !imageFile) {
        bookData.append(key, formData[key]);
      }
    });

    // If there's a new image file, append it
    if (imageFile) {
      bookData.append("cover_image", imageFile);
    }

    // API call to update book
    try {
      // Example API call (adjust based on your backend)
      // const response = await fetch(`/api/books/${selectedBook.id}`, {
      //   method: 'PUT',
      //   body: bookData,
      // });

      console.log("Saving book with image:", formData);

      // Update local state
      setIsEditing(false);
      // Reset image states
      setImageFile(null);

      // Update local state
      setBooks((prev) =>
        prev.map((book) =>
          book.id === selectedBook.id ? { ...formData, id: book.id } : book
        )
      );
      setSelectedBook(formData);
      // Update filtered books as well
      setFilteredBooks((prev) =>
        prev.map((book) =>
          book.id === selectedBook.id ? { ...formData, id: book.id } : book
        )
      );
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleCancel = () => {
    setFormData(selectedBook);
    setImagePreview(selectedBook?.cover_image_url || null);
    setImageFile(null);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearSelection = () => {
    setSelectedBook(null);
    setIsEditing(false);
    setFormData({});
    setImagePreview(null);
    setImageFile(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // Update formData with the new image (could be base64 or URL)
        setFormData((prev) => ({
          ...prev,
          cover_image_url: reader.result, // Store as base64 or you can upload to server
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData((prev) => ({
      ...prev,
      cover_image_url: "", // Clear the image URL
    }));
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
          <Edit className="w-6 h-6 text-yellow-600" />
          Edit Book Details
        </h2>
        <p className="text-gray-600">
          Select a book from the list to edit its information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Book List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <List className="w-5 h-5" />
                  Book List ({filteredBooks.length})
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </form>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Book List */}
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {viewMode === "list" ? (
                // List View
                <div className="divide-y divide-gray-100">
                  {paginatedBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleBookSelect(book)}
                      className={`p-4 cursor-pointer transition hover:bg-gray-50 ${
                        selectedBook?.id === book.id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          {book.cover_image_url ? (
                            <img
                              src={book.cover_image_url}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Book className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">
                            {book.title}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {book.author}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              {book.category}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${getStatusColor(
                                book.status
                              )}`}
                            >
                              {book.status.replace("-", " ")}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Grid View
                <div className="grid grid-cols-2 gap-3 p-4">
                  {paginatedBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleBookSelect(book)}
                      className={`p-3 border rounded-lg cursor-pointer transition hover:shadow-md ${
                        selectedBook?.id === book.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="w-full h-24 bg-gray-200 rounded mb-2 overflow-hidden">
                        {book.cover_image_url ? (
                          <img
                            src={book.cover_image_url}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Book className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-gray-800 text-sm truncate">
                        {book.title}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {book.author}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded mt-2 inline-block ${getStatusColor(
                          book.status
                        )}`}
                      >
                        {book.status.replace("-", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {filteredBooks.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No books found</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredBooks.length > booksPerPage && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {startIndex + 1}-{Math.min(endIndex, filteredBooks.length)}{" "}
                    of {filteredBooks.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-1.5 rounded ${
                        currentPage === 1
                          ? "text-gray-300"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-600 px-2">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-1.5 rounded ${
                        currentPage === totalPages
                          ? "text-gray-300"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Book Editor */}
        <div className="lg:col-span-3">
          {selectedBook ? (
            <div className="bg-white rounded-xl shadow">
              {/* Editor Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-24">
                      {imagePreview || formData.cover_image_url ? (
                        <img
                          src={imagePreview || formData.cover_image_url}
                          alt={formData.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {formData.title}
                      </h3>
                      <p className="text-gray-600">{formData.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearSelection}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                      title="Clear selection"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                        selectedBook.status
                      )}`}
                    >
                      {selectedBook.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editor Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Book Details Editor
                  </h3>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Details
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {formData.total_copies || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Copies</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {formData.available_copies || 0}
                    </div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {formData.total_copies - formData.available_copies || 0}
                    </div>
                    <div className="text-sm text-gray-600">Borrowed</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {formData.edition || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600">Edition</div>
                  </div>
                </div>

                {/* Edit Form */}
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Type className="w-4 h-4" />
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                        required
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Author *
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                        required
                      />
                    </div>

                    {/* ISBN */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        ISBN *
                      </label>
                      <input
                        type="text"
                        name="isbn"
                        value={formData.isbn || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 font-mono"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Publisher */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        Publisher
                      </label>
                      <input
                        type="text"
                        name="publisher"
                        value={formData.publisher || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                      />
                    </div>

                    {/* Edition */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Edition
                      </label>
                      <input
                        type="text"
                        name="edition"
                        value={formData.edition || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                      />
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Language
                      </label>
                      <select
                        name="language"
                        value={formData.language || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Total Copies */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        Total Copies *
                      </label>
                      <input
                        type="number"
                        name="total_copies"
                        value={formData.total_copies || 1}
                        onChange={handleChange}
                        disabled={!isEditing}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                    />
                  </div>

                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <ImageIcon className="w-4 h-4" />
                      Cover Image
                    </label>

                    <div className="space-y-4">
                      {/* Current Image Preview */}
                      {(imagePreview || formData.cover_image_url) && (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview || formData.cover_image_url}
                            alt="Book Cover"
                            className="max-w-xs h-64 object-contain rounded-lg border border-gray-300"
                          />
                          {isEditing && (
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                              title="Remove image"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Upload Button (only in edit mode) */}
                      {isEditing && (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={!isEditing}
                          />
                          <label
                            htmlFor="image-upload"
                            className={`cursor-pointer ${
                              !isEditing ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              <Upload className="w-12 h-12 text-gray-400 mb-3" />
                              <p className="text-sm text-gray-600 mb-2">
                                {imagePreview || formData.cover_image_url
                                  ? "Click to change image"
                                  : "Click to upload cover image"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Supports: JPG, PNG, GIF (Max 5MB)
                              </p>
                              <div className="mt-3">
                                <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                  Choose File
                                </span>
                              </div>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Published Year
                      </label>
                      <input
                        type="number"
                        name="published_year"
                        value={formData.published_year || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Added Date
                      </label>
                      <input
                        type="text"
                        value={formData.added_date || "N/A"}
                        disabled
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            // No Book Selected State
            <div className="bg-white rounded-xl shadow h-full flex flex-col items-center justify-center py-12">
              <Eye className="w-20 h-20 text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Book Selected
              </h3>
              <p className="text-gray-500 text-center mb-6 max-w-md">
                Select a book from the list on the left to view and edit its
                details
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Search Books</p>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Edit className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Click to Edit</p>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Save className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-600">Save Changes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBook;

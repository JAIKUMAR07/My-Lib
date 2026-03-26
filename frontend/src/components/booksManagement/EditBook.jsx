import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Edit,
  Save,
  RotateCcw,
  Book,
  User,
  ChevronRight,
  ChevronLeft,
  X,
  Upload,
  ChevronDown,
  CheckCircle,
  Loader2,
  AlertCircle,
  List,
} from "lucide-react";

const EditBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const [categorySearch, setCategorySearch] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  const [languageSearch, setLanguageSearch] = useState("");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef(null);

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "Computer Science",
      isbn: "978-0262033848",
      description:
        "A comprehensive guide to the modern study of computer algorithms with depth and rigor.",
      publisher: "MIT Press",
      edition: "3rd",
      language: "English",
      cover_image_url:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop",
      total_copies: 25,
      available_copies: 18,
      status: "in-stock",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Computer Science",
      isbn: "978-0132350884",
      description: "A handbook of agile software craftsmanship.",
      publisher: "Pearson",
      edition: "1st",
      language: "English",
      cover_image_url:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
      total_copies: 15,
      available_copies: 5,
      status: "low-stock",
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt, David Thomas",
      category: "Computer Science",
      isbn: "978-0201616224",
      description: "From journeyman to master.",
      publisher: "Addison-Wesley",
      edition: "2nd",
      language: "English",
      cover_image_url:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=450&fit=crop",
      total_copies: 20,
      available_copies: 20,
      status: "in-stock",
    },
  ]);

  const [categories, setCategories] = useState([
    "Computer Science",
    "Mathematics",
    "Physics",
    "Story",
    "Civil",
    "Electronics",
    "Mechanical",
    "Engineering",
    "Literature",
  ]);

  const [languages, setLanguages] = useState([
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / booksPerPage),
  );
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage,
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setFormData(book);
    setCategorySearch(book.category);
    setLanguageSearch(book.language);
    setImagePreview(book.cover_image_url);
    setIsEditing(false);
    setShowSuccess(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setBooks((prev) =>
      prev.map((book) =>
        book.id === selectedBook.id ? { ...formData, id: book.id } : book,
      ),
    );
    setSelectedBook({ ...formData, id: selectedBook.id });
    setIsSaving(false);
    setIsEditing(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData(selectedBook);
    setCategorySearch(selectedBook.category);
    setLanguageSearch(selectedBook.language);
    setImagePreview(selectedBook?.cover_image_url || null);
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
    setCategorySearch("");
    setLanguageSearch("");
    setImagePreview(null);
    setShowSuccess(false);
  };

  const selectCategory = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
    setCategorySearch(cat);
    setIsCategoryOpen(false);
  };

  const createNewCategory = () => {
    if (categorySearch.trim()) {
      const newCat = categorySearch.trim();
      if (!categories.includes(newCat))
        setCategories((prev) => [...prev, newCat]);
      selectCategory(newCat);
    }
  };

  const selectLanguage = (lang) => {
    setFormData((prev) => ({ ...prev, language: lang }));
    setLanguageSearch(lang);
    setIsLanguageOpen(false);
  };

  const createNewLanguage = () => {
    if (languageSearch.trim()) {
      const newLang = languageSearch.trim();
      if (!languages.includes(newLang))
        setLanguages((prev) => [...prev, newLang]);
      selectLanguage(newLang);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, cover_image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in-stock":
        return "bg-emerald-100 text-emerald-700";
      case "low-stock":
        return "bg-amber-100 text-amber-700";
      case "out-of-stock":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  const exactMatchCategory = categories.find(
    (cat) => cat.toLowerCase() === categorySearch.toLowerCase(),
  );

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(languageSearch.toLowerCase()),
  );

  const exactMatchLanguage = languages.find(
    (lang) => lang.toLowerCase() === languageSearch.toLowerCase(),
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      {/* Page Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-amber-100 border border-amber-200">
              <Edit className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Book Record <span className="text-amber-600">Editor</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-xl">
                Modify catalog parameters and adjust availability labels within
                the master repository.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-2.5 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide">
              Master Editor Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Discovery Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[700px] overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-600 flex items-center gap-2 text-xs uppercase tracking-wider">
                <List className="w-4 h-4" /> Collection
              </h3>
              <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-500">
                {books.length} TOTAL
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all outline-none"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Genres</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Book List */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoadingList ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-xs font-medium">
                  Loading collection...
                </span>
              </div>
            ) : paginatedBooks.length > 0 ? (
              <div className="space-y-3">
                {paginatedBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                    className={`p-4 cursor-pointer transition-all rounded-xl border-2 ${
                      selectedBook?.id === book.id
                        ? "bg-amber-50 border-amber-400 shadow-md"
                        : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={book.cover_image_url}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-semibold text-sm truncate ${selectedBook?.id === book.id ? "text-amber-700" : "text-slate-800"}`}
                        >
                          {book.title}
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-1 flex items-center gap-1">
                          <User className="w-3 h-3" /> {book.author}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${book.status === "in-stock" ? "bg-emerald-500" : "bg-amber-500"}`}
                          />
                          <span className="text-[9px] font-mono text-slate-400">
                            {book.isbn.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <AlertCircle className="w-10 h-10" />
                <p className="text-xs font-medium text-center">
                  No books match your search
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50/30">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:border-amber-400 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:border-amber-400 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Editor Workspace */}
        <div className="lg:col-span-8">
          {selectedBook ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
              {/* Success Toast */}
              {showSuccess && (
                <div className="absolute top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 shadow-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      Record updated successfully
                    </span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-28 rounded-xl overflow-hidden shadow-md group">
                    <img
                      src={imagePreview}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <label className="cursor-pointer p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all">
                          <Upload className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase mb-2 ${getStatusColor(formData.status)}`}
                    >
                      {formData.status?.replace("-", " ")}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {formData.title}
                    </h3>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <User className="w-4 h-4" /> {formData.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" /> Modify Record
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-medium text-sm hover:bg-slate-200 transition-all flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" /> Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-70"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                    </>
                  )}
                  <button
                    onClick={clearSelection}
                    className="p-2.5 text-slate-400 hover:text-rose-600 transition-all rounded-lg hover:bg-rose-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 space-y-6">
                {/* Core Information */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Core Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Book Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all ${
                          isEditing
                            ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            : "bg-transparent border border-transparent text-slate-900"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Author *
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all ${
                          isEditing
                            ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            : "bg-transparent border border-transparent text-slate-900"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Classification */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Classification
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative" ref={categoryRef}>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Category *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={categorySearch}
                          onChange={(e) => {
                            setCategorySearch(e.target.value);
                            setIsCategoryOpen(true);
                          }}
                          disabled={!isEditing}
                          onFocus={() => setIsCategoryOpen(true)}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all pr-10 ${
                            isEditing
                              ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                              : "bg-transparent border border-transparent text-slate-900"
                          }`}
                        />
                        {isEditing && (
                          <ChevronDown
                            className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                          />
                        )}
                        {isCategoryOpen && isEditing && (
                          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
                            <div className="max-h-48 overflow-y-auto">
                              {filteredCategories.map((cat) => (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => selectCategory(cat)}
                                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-700 transition-colors"
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                            {!exactMatchCategory && categorySearch.trim() && (
                              <div className="p-3 border-t border-slate-200 bg-slate-50">
                                <button
                                  type="button"
                                  onClick={createNewCategory}
                                  className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-all"
                                >
                                  + Create "{categorySearch}"
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        ISBN-13 *
                      </label>
                      <input
                        type="text"
                        name="isbn"
                        value={formData.isbn || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2.5 rounded-xl font-mono text-sm outline-none transition-all ${
                          isEditing
                            ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            : "bg-transparent border border-transparent text-slate-900"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Catalog Details */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Catalog Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative" ref={languageRef}>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Language
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={languageSearch}
                          onChange={(e) => {
                            setLanguageSearch(e.target.value);
                            setIsLanguageOpen(true);
                          }}
                          disabled={!isEditing}
                          onFocus={() => setIsLanguageOpen(true)}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all pr-10 ${
                            isEditing
                              ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                              : "bg-transparent border border-transparent text-slate-900"
                          }`}
                        />
                        {isEditing && (
                          <ChevronDown
                            className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
                          />
                        )}
                        {isLanguageOpen && isEditing && (
                          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
                            <div className="max-h-48 overflow-y-auto">
                              {filteredLanguages.map((lang) => (
                                <button
                                  key={lang}
                                  type="button"
                                  onClick={() => selectLanguage(lang)}
                                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-700"
                                >
                                  {lang}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                          Copies
                        </label>
                        <input
                          type="number"
                          name="total_copies"
                          value={formData.total_copies || 0}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all ${
                            isEditing
                              ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                              : "bg-transparent border border-transparent text-slate-900"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                          Edition
                        </label>
                        <input
                          type="text"
                          name="edition"
                          value={formData.edition || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all ${
                            isEditing
                              ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                              : "bg-transparent border border-transparent text-slate-900"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                        Publisher
                      </label>
                      <input
                        type="text"
                        name="publisher"
                        value={formData.publisher || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all ${
                          isEditing
                            ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            : "bg-transparent border border-transparent text-slate-900"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="4"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-none ${
                      isEditing
                        ? "bg-slate-50 border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                        : "bg-transparent border border-transparent text-slate-900"
                    }`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[700px] flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Book className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No Book Selected
              </h3>
              <p className="text-sm text-slate-500 max-w-md">
                Select a book from the collection to view and edit its details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBook;

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Book,
  User,
  Hash,
  Globe,
  Type,
  Building,
  FileText,
  Image as ImageIcon,
  Package,
  Search,
  Plus,
  Check,
  ChevronDown,
  Tag,
  CheckCircle,
  RotateCcw,
  Loader2,
} from "lucide-react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    description: "",
    publisher: "",
    edition: "",
    language: "English",
    cover_image: null,
    total_copies: 1,
  });

  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [categorySearch, setCategorySearch] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  const [languageSearch, setLanguageSearch] = useState("English");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cover_image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
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

  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      category: "",
      isbn: "",
      description: "",
      publisher: "",
      edition: "",
      language: "English",
      cover_image: null,
      total_copies: 1,
    });
    setPreview(null);
    setCategorySearch("");
    setLanguageSearch("English");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Adding book:", formData);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      handleReset();
    }, 3000);
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
      {/* Header Section - Improved spacing */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-200">
              <Plus className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Register New <span className="text-emerald-600">Book</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-xl">
                Expand your library stack by onboarding new physical or digital
                titles with full meta-registry.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-2.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">
              Active Registry Session
            </span>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="p-8 bg-white rounded-2xl shadow-2xl border border-emerald-100 flex flex-col items-center text-center max-w-md mx-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Registration Success
            </h3>
            <p className="text-slate-500 text-sm">
              The book has been successfully indexed into the global library
              catalog.
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left: Media Card - Fixed sizing */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Visual Identification
              </h4>
              <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
            </div>

            <div className="relative">
              {preview ? (
                <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setFormData((p) => ({ ...p, cover_image: null }));
                      }}
                      className="p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-[3/4] border-2 border-dashed border-slate-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50/10 transition-all cursor-pointer bg-slate-50/30 group">
                  <div className="p-4 rounded-xl bg-white shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    Upload Cover
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    High DPI Recommended
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                    Stock Inventory
                  </label>
                  <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          total_copies: Math.max(1, p.total_copies - 1),
                        }))
                      }
                      className="w-10 h-10 bg-white rounded-l-xl border-r border-slate-200 text-slate-500 hover:text-emerald-600 font-semibold transition-all"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="total_copies"
                      value={formData.total_copies}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-center font-semibold text-slate-900 text-base border-none outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          total_copies: p.total_copies + 1,
                        }))
                      }
                      className="w-10 h-10 bg-white rounded-r-xl border-l border-slate-200 text-slate-500 hover:text-emerald-600 font-semibold transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                    Edition
                  </label>
                  <input
                    type="text"
                    name="edition"
                    value={formData.edition}
                    onChange={handleChange}
                    placeholder="e.g., 1st ed."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form Fields - Fixed sizing and consistency */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Metadata Registry
                </h4>
                <div className="h-0.5 w-8 bg-emerald-500 rounded-full mt-2" />
              </div>
              <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />{" "}
                Validation Enabled
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Official Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., The Art of Computer Programming"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                  required
                />
              </div>

              {/* Author Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Lead Author / Creator *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Full registered name..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                  required
                />
              </div>

              {/* Category Field with Dropdown */}
              <div className="space-y-2 relative" ref={categoryRef}>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Book Classification *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => {
                      setCategorySearch(e.target.value);
                      setIsCategoryOpen(true);
                    }}
                    onFocus={() => setIsCategoryOpen(true)}
                    placeholder="Select Academic Genre..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none pr-10"
                    required
                  />
                  <ChevronDown
                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                  />

                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
                      <div className="max-h-48 overflow-y-auto">
                        {filteredCategories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => selectCategory(cat)}
                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-left transition-colors text-sm text-slate-700"
                          >
                            <span>{cat}</span>
                            {formData.category === cat && (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            )}
                          </button>
                        ))}
                      </div>
                      {!exactMatchCategory && categorySearch.trim() && (
                        <div className="p-3 border-t border-slate-200 bg-slate-50">
                          <button
                            type="button"
                            onClick={createNewCategory}
                            className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-all"
                          >
                            + Create New Category
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ISBN Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Universal ISBN-13 *
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="978-X-XXXXX-XX-X"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                  required
                />
              </div>

              {/* Language Field with Dropdown */}
              <div className="space-y-2 relative" ref={languageRef}>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Catalog Language
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={languageSearch}
                    onChange={(e) => {
                      setLanguageSearch(e.target.value);
                      setIsLanguageOpen(true);
                    }}
                    onFocus={() => setIsLanguageOpen(true)}
                    placeholder="Choose Publication Language..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none pr-10"
                  />
                  <ChevronDown
                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
                  />
                  {isLanguageOpen && (
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
                      {!exactMatchLanguage && languageSearch.trim() && (
                        <div className="p-3 border-t border-slate-200 bg-slate-50">
                          <button
                            type="button"
                            onClick={createNewLanguage}
                            className="w-full py-2.5 bg-slate-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-700 transition-all"
                          >
                            + Add Language
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Publisher Field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Publishing House
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="e.g., Penguin Random House"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                />
              </div>
            </div>

            {/* Description Field - Full Width */}
            <div className="mt-8 space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Book Abstract / Synopsis
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a comprehensive summary of the book content for index records..."
                rows="4"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all outline-none resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 w-full py-3 bg-green-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing
                    Metadata...
                  </>
                ) : (
                  <>
                    Initialize Registration <Plus className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-all  "
              >
                Discard Draft
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBook;

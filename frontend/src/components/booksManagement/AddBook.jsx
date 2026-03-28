import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, addCategory, addLanguage } from "../../redux/booksSlice";
import {
  BookOpen,
  User,
  Hash,
  Globe,
  Tag,
  Calendar,
  Layers,
  CheckCircle,
  AlertCircle,
  Plus,
  Loader2,
  Trash2,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/**
 * AddBook Component
 * Redesigned for a premium, spacious, and professional management experience.
 * Features: Multi-column grid, searchable + creatable selects, and sophisticated success overlays.
 */
const AddBook = () => {
  const dispatch = useDispatch();
  const availableCategories = useSelector((state) => state.books.categories);
  const availableLanguages = useSelector((state) => state.books.languages);

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    language: "",
    total_copies: 1,
    available_copies: 1,
    publishDate: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dropdowns, setDropdowns] = useState({ category: false, language: false });
  const [searchTerms, setSearchTerms] = useState({ category: "", language: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectOption = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDropdowns((prev) => ({ ...prev, [field]: false }));
  };

  const handleAddNewOption = (field) => {
    const value = searchTerms[field].trim();
    if (value) {
      if (field === 'category') dispatch(addCategory(value));
      if (field === 'language') dispatch(addLanguage(value));
      handleSelectOption(field, value);
      setSearchTerms((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sophisticated processing
    setTimeout(() => {
      dispatch(addBook({
        ...form,
        image: form.imageUrl || "https://images.unsplash.com/photo-1543005139-85e883804825?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      }));
      setLoading(false);
      setShowSuccess(true);
      // Reset after animation
      setTimeout(() => {
        setShowSuccess(false);
        setForm({
          title: "",
          author: "",
          isbn: "",
          category: "",
          language: "",
          total_copies: 1,
          available_copies: 1,
          publishDate: "",
          description: "",
          imageUrl: "",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="relative min-h-[600px] animate-fadeIn">
      {/* Header Context */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-600" />
            Registry Module
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.15em] mt-1">
            New Volume Entry System
          </p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center"
            >
              <CheckCircle className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Media & Core Meta */}
          <div className="lg:col-span-4 space-y-6">
            <div className="soft-card p-6 rounded-3xl border border-slate-100 shadow-sm aspect-square flex flex-col items-center justify-center text-center group cursor-pointer hover:border-cyan-400 transition-all">
              {form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl mb-4"
                />
              ) : (
                <>
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-sm font-bold text-slate-500">
                    Upload Volume Cover
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">
                    PNG / JPG (Max 5MB)
                  </p>
                </>
              )}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-2">
                Cover Image Direct Link
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://images.unsplash.com/..."
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:border-cyan-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Right Column: Detailed Metadata */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={BookOpen}
                label="Primary Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Essential Algorithms..."
                required
              />
              <InputField
                icon={User}
                label="Lead Author"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Dr. Robert Martin"
                required
              />
              <InputField
                icon={Hash}
                label="Universal ISBN-13"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="978-3-16-148410-0"
                required
              />
              <InputField
                icon={Calendar}
                label="Release Year"
                name="publishDate"
                type="date"
                value={form.publishDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Searchable+Creatable Select */}
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                  Book Classification
                </label>
                <div className="relative">
                  <div
                    onClick={() =>
                      setDropdowns((p) => ({ ...p, category: !p.category }))
                    }
                    className="flex items-center gap-3 w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm cursor-pointer hover:border-slate-300 transition-all"
                  >
                    <Layers className="w-4 h-4 text-cyan-600" />
                    <span className={form.category ? "text-slate-800" : "text-slate-400"}>
                      {form.category || "Select classification..."}
                    </span>
                  </div>

                  {dropdowns.category && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 animate-fadeIn">
                      <input
                        type="text"
                        placeholder="Search or add fresh genre..."
                        className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm outline-none mb-2"
                        value={searchTerms.category}
                        onChange={(e) =>
                          setSearchTerms((p) => ({ ...p, category: e.target.value }))
                        }
                        autoFocus
                      />
                      <div className="max-h-48 overflow-y-auto no-scrollbar">
                        {availableCategories
                          .filter((c) =>
                            c.toLowerCase().includes(searchTerms.category.toLowerCase())
                          )
                          .map((cat) => (
                            <div
                              key={cat}
                              onClick={() => handleSelectOption("category", cat)}
                              className="px-4 py-2.5 hover:bg-slate-50 rounded-xl cursor-pointer text-sm font-medium text-slate-600 transition-colors"
                            >
                              {cat}
                            </div>
                          ))}
                        {searchTerms.category &&
                          !availableCategories.some(
                            (c) => c.toLowerCase() === searchTerms.category.toLowerCase()
                          ) && (
                            <div
                              onClick={() => handleAddNewOption("category")}
                              className="px-4 py-2.5 bg-cyan-50 text-cyan-700 rounded-xl cursor-pointer text-sm font-bold flex items-center justify-between"
                            >
                              Add "{searchTerms.category}"
                              <Plus className="w-4 h-4" />
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Language Searchable+Creatable Select */}
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                  Publishing Language
                </label>
                <div className="relative">
                  <div
                    onClick={() =>
                      setDropdowns((p) => ({ ...p, language: !p.language }))
                    }
                    className="flex items-center gap-3 w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm cursor-pointer hover:border-slate-300 transition-all"
                  >
                    <Globe className="w-4 h-4 text-cyan-600" />
                    <span className={form.language ? "text-slate-800" : "text-slate-400"}>
                      {form.language || "Select language..."}
                    </span>
                  </div>

                  {dropdowns.language && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 animate-fadeIn">
                      <input
                        type="text"
                        placeholder="Search or add language..."
                        className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm outline-none mb-2"
                        value={searchTerms.language}
                        onChange={(e) =>
                          setSearchTerms((p) => ({ ...p, language: e.target.value }))
                        }
                        autoFocus
                      />
                      <div className="max-h-48 overflow-y-auto no-scrollbar">
                        {availableLanguages
                          .filter((l) =>
                            l.toLowerCase().includes(searchTerms.language.toLowerCase())
                          )
                          .map((lang) => (
                            <div
                              key={lang}
                              onClick={() => handleSelectOption("language", lang)}
                              className="px-4 py-2.5 hover:bg-slate-50 rounded-xl cursor-pointer text-sm font-medium text-slate-600 transition-colors"
                            >
                              {lang}
                            </div>
                          ))}
                        {searchTerms.language &&
                          !availableLanguages.some(
                            (l) => l.toLowerCase() === searchTerms.language.toLowerCase()
                          ) && (
                            <div
                              onClick={() => handleAddNewOption("language")}
                              className="px-4 py-2.5 bg-cyan-50 text-cyan-700 rounded-xl cursor-pointer text-sm font-bold flex items-center justify-between"
                            >
                              Add "{searchTerms.language}"
                              <Plus className="w-4 h-4" />
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={Layers}
                label="Acquisition Size (Stock)"
                name="total_copies"
                type="number"
                value={form.total_copies}
                onChange={handleChange}
                required
              />
              <InputField
                icon={Layers}
                label="Current Usable Units"
                name="available_copies"
                type="number"
                value={form.available_copies}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                Bibliographic Summary / Abstract
              </label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Provide a detailed overview of the book's content..."
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-[2rem] text-sm focus:border-cyan-500 transition-all outline-none resize-none shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full md:w-auto px-10 py-5 bg-slate-900 border border-slate-950 rounded-[2rem] text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                    Analyzing Metadata...
                  </>
                ) : (
                  <>
                    Finalize Volume Registry
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </form>

      {/* Success Overlays */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 rounded-4xl p-12 text-center shadow-2xl space-y-6 scale-up max-w-sm">
            <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-black text-white">Registry Success</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Volume has been encoded and synced with the library matrix. Inventory levels updated.
            </p>
            <div className="h-1 bg-cyan-500 rounded-full w-0 animate-progress" />
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 block">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none shadow-sm"
      />
    </div>
  </div>
);

export default AddBook;

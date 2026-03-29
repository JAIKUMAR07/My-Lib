import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBook, deleteBook, addCategory, addLanguage } from "../../redux/booksSlice";
import {
  Search,
  BookOpen,
  User,
  Hash,
  Globe,
  Layers,
  Calendar,
  Save,
  Trash2,
  ChevronRight,
  Filter,
  CheckCircle,
  Plus,
  Loader2,
  Sparkles,
} from "lucide-react";

/**
 * EditBook Component
 * Features: Book Discovery Sidebar + Unified Editor Workspace.
 * Redesigned for a premium, stable, and professional library management experience.
 */
const EditBook = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books.items);
  const availableCategories = useSelector((state) => state.books.categories);
  const availableLanguages = useSelector((state) => state.books.languages);

  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showStatus, setShowStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [dropdowns, setDropdowns] = useState({ category: false, language: false });
  const [searchTerms, setSearchTerms] = useState({ category: "", language: "" });

  const selectedBook = useMemo(
    () => allBooks.find((book) => book.id === selectedBookId) || null,
    [allBooks, selectedBookId]
  );

  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
  );

  const handleBookSelect = (book) => {
    setSelectedBookId(book.id);
    setForm(book);
    setShowStatus(null);
  };

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
    setIsSaving(true);

    setTimeout(() => {
      dispatch(updateBook(form));
      setIsSaving(false);
      setShowStatus({ type: "success", message: "Volume metadata updated successfully." });
      
      setTimeout(() => setShowStatus(null), 3000);
    }, 1200);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove this volume from the registry?")) {
      dispatch(deleteBook(selectedBook.id));
      setSelectedBookId(null);
      setForm(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[800px] animate-fadeIn">
      {/* Sidebar: Book Discovery */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[800px]">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Discovery Sidebar
            </h3>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 transition-colors w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search index..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/5 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-3">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookSelect(book)}
                  className={`group p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    selectedBook?.id === book.id
                      ? "bg-cyan-50 border-cyan-200 shadow-md ring-1 ring-cyan-200"
                      : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="shrink-0 w-12 h-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                      <img
                        src={book.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-black text-sm truncate ${selectedBook?.id === book.id ? 'text-cyan-900' : 'text-slate-800'}`}>
                        {book.title}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate mt-0.5">
                        {book.author}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                            {book.isbn.split('-').pop()}
                         </span>
                         <span className={`w-1.5 h-1.5 rounded-full ${book.available_copies > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedBook?.id === book.id ? 'translate-x-1 text-cyan-500' : 'text-slate-200 group-hover:text-slate-400'}`} />
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-40">
                <BookOpen className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Null Result Index
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Editor Workspace */}
      <div className="flex-1">
        {selectedBook ? (
          <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 overflow-hidden relative">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center border border-cyan-100">
                    <Sparkles className="w-8 h-8 text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 leading-tight">
                      Volume Metadata Editor
                    </h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                      Resource UID: {selectedBook.id} / ISBN-13
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all shadow-sm active:scale-95"
                    title="Purge Volume"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-950 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving ? "Syncing..." : "Commit Changes"}
                  </button>
                </div>
              </div>

              {showStatus && (
                <div className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 animate-fadeIn ${
                  showStatus.type === "success" 
                    ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                    : "bg-rose-50 border-rose-100 text-rose-700"
                }`}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-bold">{showStatus.message}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EditorField
                  icon={BookOpen}
                  label="Primary Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <EditorField
                  icon={User}
                  label="Verified Author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
                <EditorField
                  icon={Hash}
                  label="Universal ISBN-13"
                  name="isbn"
                  value={form.isbn}
                  onChange={handleChange}
                  required
                />
                <EditorField
                  icon={Calendar}
                  label="Publication Matrix Date"
                  name="publishDate"
                  type="date"
                  value={form.publishDate}
                  onChange={handleChange}
                  required
                />
                
                {/* Category Searchable+Creatable Select */}
                <div className="space-y-3 relative">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                    Classification Genre
                  </label>
                    <div className="relative">
                      <div
                        onClick={() =>
                          setDropdowns((p) => ({ ...p, category: !p.category }))
                        }
                        className="flex items-center gap-3 w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm cursor-pointer hover:border-slate-300 transition-all font-bold text-slate-800"
                      >
                        <Layers className="w-4 h-4 text-cyan-600" />
                        {form.category}
                      </div>

                      {dropdowns.category && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 p-2 animate-fadeIn">
                          <input
                            type="text"
                            placeholder="Override current genre..."
                            className="w-full p-3 bg-slate-50 border-none rounded-2xl text-sm outline-none mb-2"
                            value={searchTerms.category}
                            onChange={(e) =>
                              setSearchTerms((p) => ({ ...p, category: e.target.value }))
                            }
                            autoFocus
                          />
                          <div className="max-h-48 overflow-y-auto no-scrollbar">
                            {availableCategories
                              .filter((c) =>
                                c.name.toLowerCase().includes(searchTerms.category.toLowerCase())
                              )
                              .map((cat) => (
                                <div
                                  key={cat.name}
                                  onClick={() => handleSelectOption("category", cat.name)}
                                  className="px-4 py-2.5 hover:bg-slate-50 rounded-xl cursor-pointer text-sm font-medium text-slate-800 transition-colors flex items-center gap-2"
                                >
                                  <img src={cat.icon} alt="" className="w-5 h-5 object-contain opacity-70" />
                                  {cat.name}
                                </div>
                              ))}
                            {searchTerms.category &&
                              !availableCategories.some(
                                (c) => c.name.toLowerCase() === searchTerms.category.toLowerCase()
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
                <div className="space-y-3 relative">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                    Publishing Dialect
                  </label>
                  <div className="relative">
                    <div
                      onClick={() =>
                        setDropdowns((p) => ({ ...p, language: !p.language }))
                      }
                      className="flex items-center gap-3 w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm cursor-pointer hover:border-slate-300 transition-all"
                    >
                      <Globe className="w-4 h-4 text-cyan-600" />
                      <span className="text-slate-800 font-medium">
                        {form.language}
                      </span>
                    </div>

                    {dropdowns.language && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 p-2 animate-fadeIn">
                        <input
                          type="text"
                          placeholder="Override current language..."
                          className="w-full p-3 bg-slate-50 border-none rounded-2xl text-sm outline-none mb-2"
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

                <EditorField
                  icon={Layers}
                  label="Global Registry Stock"
                  name="total_copies"
                  type="number"
                  value={form.total_copies}
                  onChange={handleChange}
                  required
                />
                <EditorField
                  icon={Layers}
                  label="Local Usable Pool"
                  name="available_copies"
                  type="number"
                  value={form.available_copies}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-8 space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 block">
                  Bibliographic Summary
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={form.description || ""}
                  onChange={handleChange}
                  placeholder="The current description is null. Provide professional abstract here..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm focus:border-cyan-500 transition-all outline-none resize-none font-medium h-40"
                />
              </div>

              <div className="mt-8 flex items-center gap-6 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <div className="w-20 h-28 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden shrink-0">
                    <img src={form.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 block">Media Source URI</label>
                     <input
                        type="url"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-white border border-slate-100 rounded-xl text-xs font-mono outline-none focus:border-cyan-500"
                        placeholder="https://images.unsplash.com/..."
                     />
                  </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-20 bg-white/40 border-2 border-dashed border-slate-200 rounded-4xl group hover:bg-white/60 transition-all">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
               <Loader2 className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Editor Inactive</h3>
            <p className="text-slate-400 max-w-sm font-bold text-sm uppercase tracking-widest leading-loose">
              Select a volume from the discovery sidebar to initiate the synchronization workspace.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const EditorField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
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
        required={required}
        className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none"
      />
    </div>
  </div>
);

export default EditBook;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adjustStock } from "../../redux/booksSlice";
import {
  Plus,
  Minus,
  Search,
  Download,
  Package,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertCircle,
  TrendingUp,
  BookOpen,
  ArrowUpDown,
  History,
  Archive,
} from "lucide-react";

const BookInventory = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);
  const categories = useSelector((state) => state.books.categories);

  const [selectedBookId, setSelectedBookId] = useState(null);
  const [stockAdjustment, setStockAdjustment] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const selectedBook = books.find(b => b.id === selectedBookId);

  const handleStockIncrease = (bookId, amount) => {
    dispatch(adjustStock({ id: bookId, delta: amount }));
  };

  const handleStockDecrease = (bookId, amount) => {
    dispatch(adjustStock({ id: bookId, delta: -amount }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in-stock": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "out-of-stock": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || book.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  return (
    <div className="animate-fadeIn">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search catalog index..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:border-cyan-400 appearance-none cursor-pointer min-w-[140px] shadow-sm"
          >
            <option value="all">Genres: All</option>
            {categories.map((cat) => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:border-cyan-400 appearance-none cursor-pointer min-w-[140px] shadow-sm"
          >
            <option value="all">Status: All</option>
            <option value="in-stock">Available</option>
            <option value="out-of-stock">No Stock</option>
          </select>

          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Area */}
        <div className={selectedBook ? "lg:col-span-8" : "lg:col-span-12 transition-all duration-500"}>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Book Title & Author</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ISBN / Genre</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Availability</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedBooks.map((book) => (
                    <tr 
                      key={book.id} 
                      onClick={() => setSelectedBookId(book.id)}
                      className={`group hover:bg-slate-50 transition-colors cursor-pointer ${selectedBookId === book.id ? 'bg-cyan-50/50' : ''}`}
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                            <Package className={`w-5 h-5 ${book.status === 'out-of-stock' ? 'text-rose-400' : 'text-slate-400'}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-sm truncate">{book.title}</p>
                            <p className="text-xs text-slate-500 truncate">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-slate-400 uppercase">{book.isbn.split('-').pop()}</p>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase">{book.category}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${getStatusColor(book.status)}`}>
                                {book.status.replace('-', ' ').toUpperCase()}
                              </span>
                              <span className="text-[10px] font-bold text-slate-900">{book.available_copies}<span className="text-slate-400">/{book.total_copies}</span></span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-700 ${book.available_copies === 0 ? 'bg-rose-400' : 'bg-emerald-500'}`}
                                style={{ width: `${(book.available_copies / book.total_copies) * 100}%` }}
                              />
                           </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <button className="p-2 text-slate-300 hover:text-cyan-600 transition-colors">
                          <ArrowUpDown className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Line */}
            {totalPages > 1 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">Showing page {currentPage} of {totalPages}</span>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-30 hover:border-cyan-400 transition-all"><ChevronLeft className="w-4 h-4 text-slate-500" /></button>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-30 hover:border-cyan-400 transition-all"><ChevronRight className="w-4 h-4 text-slate-500" /></button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stock Adjuster Panel */}
        {selectedBook && (
          <div className="lg:col-span-4 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 sticky top-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-100 rounded-xl">
                    <History className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Adjust Stock</h3>
                </div>
                <button onClick={() => setSelectedBookId(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold text-slate-900 mb-1">{selectedBook.title}</h4>
                <p className="text-xs text-slate-500 font-medium">ISBN: {selectedBook.isbn}</p>
              </div>

              <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Current Availability</label>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="text-2xl font-black text-slate-900">{selectedBook.available_copies}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase">Available</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="text-2xl font-black text-slate-900">{selectedBook.total_copies}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase">Total Stock</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Adjustment Delta</label>
                  <div className="flex items-center gap-3 px-2 py-2 bg-slate-900 rounded-4xl shadow-inner">
                    <button 
                      onClick={() => handleStockDecrease(selectedBook.id, stockAdjustment)}
                      disabled={selectedBook.available_copies < stockAdjustment}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-rose-500 text-white transition-all disabled:opacity-20 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <input 
                      type="number" 
                      value={stockAdjustment} 
                      onChange={(e) => setStockAdjustment(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-2xl font-black text-white text-center tabular-nums"
                    />
                    <button 
                      onClick={() => handleStockIncrease(selectedBook.id, stockAdjustment)}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-500 text-white transition-all flex items-center justify-center font-bold"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 5, 10].map(val => (
                      <button 
                        key={val} 
                        onClick={() => handleStockIncrease(selectedBook.id, val)}
                        className="py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold hover:bg-slate-200 transition-all border border-slate-200"
                      >
                        +{val} Quick
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-100 flex-1 text-center">
                    <p className="text-[10px] font-bold text-cyan-700 uppercase mb-1">Health index</p>
                    <div className="flex gap-1 justify-center">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`h-1.5 w-4 rounded-full ${i <= (selectedBook.available_copies/selectedBook.total_copies)*5 ? 'bg-cyan-500' : 'bg-cyan-200'}`} />
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setSelectedBookId(null)} className="p-4 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">Dismiss</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Aggregate Bottom Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-slate-100">
        {[
          {
            label: "Aggregate Volume",
            value: books.reduce((sum, b) => sum + b.total_copies, 0),
            icon: Archive,
            iconWrapClass: "bg-slate-50 border-slate-100",
            iconClass: "text-slate-600",
          },
          {
            label: "Active Pool",
            value: books.reduce((sum, b) => sum + b.available_copies, 0),
            icon: BookOpen,
            iconWrapClass: "bg-emerald-50 border-emerald-100",
            iconClass: "text-emerald-600",
          },
          {
            label: "Out of Cycles",
            value: books.filter((b) => b.status === "out-of-stock").length,
            icon: AlertCircle,
            iconWrapClass: "bg-rose-50 border-rose-100",
            iconClass: "text-rose-600",
          },
          {
            label: "Active Genres",
            value: categories.length,
            icon: TrendingUp,
            iconWrapClass: "bg-amber-50 border-amber-100",
            iconClass: "text-amber-600",
          },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-cyan-200 transition-all">
            <div className={`p-4 rounded-2xl border transition-colors group-hover:bg-cyan-500 group-hover:border-cyan-400 ${stat.iconWrapClass}`}>
              <stat.icon className={`w-6 h-6 transition-colors group-hover:text-white ${stat.iconClass}`} />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 tabular-nums">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookInventory;

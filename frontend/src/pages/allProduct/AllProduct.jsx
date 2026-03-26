import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Bookmark, BookmarkCheck, Star, Search, Filter, XCircle } from "lucide-react";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct = [] } = context;
  const cartItems = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  // Search and Filter State
  const [searchKey, setSearchKey] = useState("");
  const [categoryKey, setCategoryKey] = useState("");

  const categories = [
    { name: "All Categories", value: "" },
    { name: "CSE", value: "cse" },
    { name: "Mechanical", value: "mechanical" },
    { name: "Story", value: "story" },
    { name: "Civil", value: "civil" },
    { name: "Math", value: "math" },
    { name: "Electronics", value: "electronics" },
  ];

  const sanitizeItem = (item) => {
    const { time, ...serializableItem } = item;
    return serializableItem;
  };

  const addCart = (item) => {
    const sanitizedItem = sanitizeItem(item);
    dispatch(addToCart(sanitizedItem));
    toast.success("Saved to your collection");
  };

  const deleteCart = (item) => {
    const sanitizedItem = sanitizeItem(item);
    dispatch(deleteFromCart(sanitizedItem));
    toast.success("Removed from collection");
  };

  // Filter Logic
  const filteredProducts = getAllProduct.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchKey.toLowerCase());
    const matchesCategory = categoryKey === "" || (item.category && item.category.toLowerCase() === categoryKey.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="page-shell px-4 py-8 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Book <span className="brand-gradient-text">Catalog</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xl">
              Exploring our vast archive of digital and physical resources. Filter by category or search for specific titles.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                type="text" 
                placeholder="Search collection..." 
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm shadow-sm"
               />
               {searchKey && (
                 <button 
                  onClick={() => setSearchKey("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                 >
                   <XCircle className="w-4 h-4" />
                 </button>
               )}
            </div>

            {/* Category Filter */}
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select 
                value={categoryKey}
                onChange={(e) => setCategoryKey(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm shadow-sm appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="flex justify-center my-12">{loading && <Loader />}</div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> results
              {searchKey || categoryKey ? " for your filter" : " in the catalog"}
            </p>
            {(searchKey || categoryKey) && (
              <button 
                onClick={() => { setSearchKey(""); setCategoryKey(""); }}
                className="text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item, index) => {
            const { id, title, productImageUrl, description, category } = item;
            const isSaved = cartItems.some((p) => p.id === item.id);
            
            return (
              <div key={index} className="group animate-fadeIn" style={{ animationDelay: `${index * 30}ms` }}>
                <div className="soft-card h-full overflow-hidden rounded-[2.2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-none bg-white/70 backdrop-blur-sm flex flex-col">
                  
                  {/* Image Container */}
                  <div 
                    onClick={() => navigate(`/productinfo/${id}`)}
                    className="relative h-64 overflow-hidden bg-slate-50 cursor-pointer"
                  >
                    <img
                      className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                      src={productImageUrl}
                      alt={title}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-cyan-700 shadow-sm border border-cyan-100">
                        {category || "UNCATEGORIZED"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-2 text-amber-400">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    
                    <h3 className="line-clamp-2 text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                      {title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                      {description}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="flex-1 rounded-2xl bg-slate-900 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-md shadow-slate-900/10"
                      >
                        Borrow
                      </button>
                      
                      <button
                        onClick={() => isSaved ? deleteCart(item) : addCart(item)}
                        className={`p-3 rounded-2xl transition-all active:scale-90 shadow-sm ${
                          isSaved 
                            ? "bg-cyan-100 text-cyan-600 border border-cyan-200" 
                            : "bg-slate-100 text-slate-400 hover:bg-cyan-50 hover:text-cyan-500 border border-transparent"
                        }`}
                      >
                        {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Fallback */}
        {!loading && filteredProducts.length === 0 && (
          <div className="py-20 text-center text-slate-500 flex flex-col items-center">
            <XCircle className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Matching Books Found</h3>
            <p className="mb-8">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => { setSearchKey(""); setCategoryKey(""); }}
              className="app-button-primary px-8 py-3 rounded-full font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllProduct;

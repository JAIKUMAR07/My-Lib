import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { 
  Bookmark, 
  BookmarkCheck, 
  Star, 
  Search, 
  Filter, 
  X, 
  ArrowRight, 
  Zap, 
  ShoppingBag,
  Grid,
  List
} from "lucide-react";

/**
 * AllProduct Component (Catalog)
 * Redesigned for a high-end storefront experience with premium cards and intuitive filtering.
 */
const AllProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Fetch books and categories from global Redux state
  // Fetch books and categories from global Redux state
  const books = useSelector((state) => state.books.items);
  const categories = useSelector((state) => ["All", ...state.books.categories.map(c => c.name)]);
  const cartItems = useSelector((state) => state.cart || []);
  const loading = useSelector((state) => state.books.loading);

  const [searchKey, setSearchKey] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to your collection", {
      style: {
        borderRadius: '1rem',
        background: '#0f172a',
        color: '#fff',
      },
      iconTheme: {
        primary: '#22d3ee',
        secondary: '#0f172a',
      },
    });
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Removed from collection");
  };

  const filteredProducts = books.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchKey.toLowerCase()) || 
                         item.author.toLowerCase().includes(searchKey.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="page-shell px-4 py-12 md:px-8 bg-slate-50/30">
        
        {/* Modernized Header with Visual Treatments */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 relative">
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-[10px] font-black text-cyan-700 uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3 fill-current" />
              Resource Library v2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-[0.9]">
              Digital <br /> <span className="brand-gradient-text">Repository.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xl text-lg leading-relaxed">
              Access premium academic volumes and research artifacts. Modernizing the way you discover and borrow knowledge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
            {/* Elegant Search Bar */}
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search index..." 
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full pl-11 pr-12 py-4 rounded-3xl bg-white border border-slate-200 focus:outline-none focus:ring-4 focus:ring-cyan-500/5 focus:border-cyan-400 transition-all text-sm shadow-sm font-medium"
              />
              {searchKey && (
                <button onClick={() => setSearchKey("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>

        {/* Category Pill Navigation */}
        <div className="mb-12 overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center gap-3">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                     activeCategory === cat
                       ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 -translate-y-1"
                       : "bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24"><Loader /></div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10" 
                : "flex flex-col gap-6"
              }>
                {filteredProducts.map((item, index) => (
                  <ProductCard 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    isSaved={cartItems.some(c => c.id === item.id)}
                    addCart={() => addCart(item)}
                    deleteCart={() => deleteCart(item)}
                    navigate={navigate}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <NoResults reset={() => { setSearchKey(""); setActiveCategory("All"); }} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

const ProductCard = ({ item, index, isSaved, addCart, deleteCart, navigate, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col md:flex-row items-center gap-8 group hover:border-cyan-200 transition-all hover:shadow-xl hover:shadow-cyan-900/5 animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
        <div 
          onClick={() => navigate(`/productinfo/${item.id}`)}
          className="w-full md:w-32 h-44 bg-slate-50 rounded-2xl overflow-hidden cursor-pointer"
        >
          <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
             <span className="px-3 py-1 bg-cyan-50 text-[10px] font-black text-cyan-600 rounded-full border border-cyan-100 uppercase tracking-widest">{item.category}</span>
             <div className="flex text-amber-400"><Star className="w-3 h-3 fill-current" /> <span className="text-[10px] font-bold text-slate-400 ml-1">4.8 (82 reviews)</span></div>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-1">{item.title}</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">By {item.author}</p>
          <p className="text-slate-500 text-sm line-clamp-2 max-w-2xl">{item.description}</p>
        </div>
        <div className="w-full md:w-auto flex md:flex-col gap-3">
            <button
               onClick={() => navigate(`/productinfo/${item.id}`)}
               className="flex-1 md:w-48 py-4 px-6 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
               Details <ArrowRight className="w-4 h-4" />
            </button>
            <button
               onClick={isSaved ? deleteCart : addCart}
               className={`p-4 rounded-2xl transition-all ${isSaved ? 'bg-cyan-100 text-cyan-600' : 'bg-slate-100 text-slate-400 hover:bg-cyan-50 hover:text-cyan-500'}`}
            >
               {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="bg-white rounded-[3rem] p-4 border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-900/10 flex flex-col h-full relative overflow-hidden group/card">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 group-hover/card:scale-150 transition-transform duration-700 pointer-events-none" />
        
        {/* Poster Component */}
        <div 
          onClick={() => navigate(`/productinfo/${item.id}`)}
          className="relative h-72 rounded-[2.2rem] bg-slate-50 overflow-hidden cursor-pointer mb-6"
        >
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-4 left-4 z-10">
             <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest border border-white/50 shadow-sm">
                {item.category}
             </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
             <div className="flex items-center gap-2 px-4 py-2 bg-cyan-400 rounded-xl text-slate-950 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-400/20">
                <ShoppingBag className="w-3 h-3" /> Quick Reserve
             </div>
          </div>
        </div>

        {/* Info Component */}
        <div className="px-3 flex-1 flex flex-col pt-2">
           <div className="flex items-center gap-1 mb-3 text-amber-400">
             {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
             <span className="text-[10px] font-bold text-slate-300 ml-2">4.9 index</span>
           </div>
           
           <h3 
             onClick={() => navigate(`/productinfo/${item.id}`)}
             className="text-lg font-black text-slate-900 mb-2 line-clamp-2 leading-tight cursor-pointer hover:text-cyan-600 transition-colors"
           >
             {item.title}
           </h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Volume By {item.author}</p>
           
           <div className="mt-auto flex items-center gap-3">
              <button
                onClick={() => navigate(`/productinfo/${item.id}`)}
                className="flex-1 py-4 bg-slate-900 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95"
              >
                Inspect
              </button>
              <button
                onClick={isSaved ? deleteCart : addCart}
                className={`p-4 rounded-2xl transition-all active:scale-90 ${
                   isSaved 
                   ? 'bg-cyan-100 text-cyan-600 border border-cyan-200' 
                   : 'bg-slate-50 text-slate-300 hover:bg-cyan-50 hover:text-cyan-500 border border-slate-100 hover:border-cyan-200'
                }`}
              >
                 {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const NoResults = ({ reset }) => (
  <div className="py-24 flex flex-col items-center justify-center text-center animate-fadeIn">
    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8">
       <Zap className="w-10 h-10 text-slate-300" />
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Catalog Index Exhausted</h3>
    <p className="text-slate-500 max-w-sm mb-10 font-medium text-lg">Your query does not match any existing cryptographic resource in the archive.</p>
    <button
      onClick={reset}
      className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/10"
    >
      Clear All Parametrics
    </button>
  </div>
);

export default AllProduct;

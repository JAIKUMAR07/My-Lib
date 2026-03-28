import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { Bookmark, BookmarkCheck, Star, ArrowRight, Zap, Play } from "lucide-react";

/**
 * HomePageProductCard Component
 * Displays the spotlight items in a premium, modern grid.
 * Integrated with global Redux state for real-time inventory synchronization.
 */
const HomePageProductCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Fetch spotlight books from global Redux state
  const books = useSelector((state) => state.books.items);
  const cartItems = useSelector((state) => state.cart || []);

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Saved to your collection", {
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

  return (
    <div className="page-shell mt-24 px-4 md:px-8 relative">
      <div className="absolute -right-24 top-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-700 uppercase tracking-widest mb-4">
             <Zap className="w-3 h-3 fill-current" />
             Curated Highlights
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
            Weekly <br /> <span className="brand-gradient-text">Spotlight.</span>
          </h2>
          <p className="mt-6 text-slate-500 font-medium max-w-md text-lg leading-relaxed">
            A hand-picked selection of the most impactful research volumes and literature from our global archive.
          </p>
        </div>
        <button 
          onClick={() => navigate('/allproduct')}
          className="group flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm active:scale-95"
        >
          Explore Full Archive <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {books.slice(0, 8).map((item, index) => {
          const isSaved = cartItems.some((p) => p.id === item.id);
          
          return (
            <div key={item.id} className="group animate-fadeIn" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="soft-card h-full overflow-hidden rounded-[3rem] transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-900/10 border-none bg-white p-4 flex flex-col group/card">
                
                {/* Visual Media Container */}
                <div 
                  onClick={() => navigate(`/productinfo/${item.id}`)}
                  className="relative h-72 overflow-hidden rounded-[2.5rem] bg-slate-50 cursor-pointer mb-6 shadow-inner"
                >
                  <img
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={item.image}
                    alt={item.title}
                  />
                  
                  {/* Category Chip */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white/50">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Subtle Interactive Overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                          <Play className="w-4 h-4 text-slate-900 fill-current ml-1" />
                      </div>
                  </div>
                </div>

                {/* Information Layer */}
                <div className="px-4 pb-4 flex-1 flex flex-col pt-2">
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] text-slate-400 font-bold ml-2">5.0</span>
                  </div>
                  
                  <h3 
                    onClick={() => navigate(`/productinfo/${item.id}`)}
                    className="text-xl font-black text-slate-900 mb-1 cursor-pointer hover:text-cyan-600 transition-colors line-clamp-1"
                  >
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
                    {item.author}
                  </p>

                  <div className="mt-auto flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/productinfo/${item.id}`)}
                      className="flex-1 rounded-2xl bg-slate-900 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-900/10"
                    >
                      Borrow
                    </button>
                    
                    <button
                      onClick={() => isSaved ? deleteCart(item) : addCart(item)}
                      className={`p-4 rounded-2xl transition-all active:scale-90 shadow-sm ${
                        isSaved 
                          ? "bg-cyan-100 text-cyan-600 border border-cyan-200" 
                          : "bg-slate-50 text-slate-300 hover:bg-cyan-50 hover:text-cyan-500 border border-slate-100 hover:border-cyan-200"
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
    </div>
  );
};

export default HomePageProductCard;

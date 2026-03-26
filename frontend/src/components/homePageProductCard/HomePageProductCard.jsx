import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { Bookmark, BookmarkCheck, Star, ArrowRight } from "lucide-react";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Saved to your collection");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from collection");
  };

  return (
    <div className="page-shell mt-16 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 gap-2">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Library <span className="brand-gradient-text">Highlights</span>
          </h2>
          <p className="mt-2 text-slate-500 font-medium">
            Discover the most borrowed and highly rated books this week.
          </p>
        </div>
        <button 
          onClick={() => navigate('/allproduct')}
          className="group flex items-center gap-2 text-sm font-bold text-cyan-600 transition-all hover:text-cyan-700"
        >
          Browse Full Catalog <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {getAllProduct.slice(0, 8).map((item, index) => {
          const { id, title, productImageUrl, description, category } = item;
          const isSaved = cartItems.some((p) => p.id === item.id);
          
          return (
            <div key={index} className="group animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="soft-card h-full overflow-hidden rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-none bg-white/70 backdrop-blur-sm flex flex-col">
                
                {/* Image Container */}
                <div 
                  onClick={() => navigate(`/productinfo/${id}`)}
                  className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                    src={productImageUrl}
                    alt={title}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-cyan-700 shadow-sm border border-cyan-100">
                      {category || "General"}
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                     <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-slate-900 shadow-xl border border-white">
                        View Details
                     </div>
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
                    <span className="text-[10px] text-slate-400 font-bold ml-1">5.0</span>
                  </div>
                  
                  <h3 className="line-clamp-1 text-lg font-bold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
                    {title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {description}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="flex-1 rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white transition-all hover:bg-slate-800 active:scale-95"
                    >
                      Borrow Now
                    </button>
                    
                    <button
                      onClick={() => isSaved ? deleteCart(item) : addCart(item)}
                      className={`p-3 rounded-2xl transition-all active:scale-90 ${
                        isSaved 
                          ? "bg-cyan-100 text-cyan-600 border border-cyan-200" 
                          : "bg-slate-100 text-slate-400 hover:bg-cyan-50 hover:text-cyan-500 border border-transparent"
                      }`}
                      title={isSaved ? "Remove from saved" : "Save for later"}
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

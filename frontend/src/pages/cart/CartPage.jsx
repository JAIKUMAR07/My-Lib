import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash2, Bookmark, BookmarkCheck, ShoppingBag, ArrowRight, Zap, ListFilter } from "lucide-react";
import { deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * CartPage (Saved Repository)
 * Redesigned as a high-end personal library space for users to revisit saved volumes.
 * Features: Glossy cards, quick borrow actions, and premium layouts.
 */
const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Removed from your archive", {
       icon: '🗑️',
       style: { borderRadius: '1rem', background: '#fff', color: '#64748b', fontStyle: 'bold' }
    });
  };

  return (
    <Layout>
      <div className="page-shell px-4 py-16 md:px-8 bg-slate-50/20 min-h-[90vh]">
        
        {/* Modernized Title Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 relative">
             <div className="absolute -left-20 -top-20 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />
             
             <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-[10px] font-black text-cyan-700 uppercase tracking-widest mb-6 translate-y-1">
                   <BookmarkCheck className="w-3 h-3" />
                   Personal Archive
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                   My Saved <br /> <span className="brand-gradient-text">Volumes.</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-md text-lg leading-relaxed">
                   Manage your personal queue of academic resources and literature. Ready for deep exploration.
                </p>
             </div>

             <div className="flex items-center gap-4 relative z-10">
                <div className="h-14 px-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                   <p className="text-sm font-black text-slate-900">{cartItems.length} <span className="text-slate-400 font-bold ml-1 uppercase text-[10px] tracking-widest">Total units</span></p>
                </div>
                <button 
                  onClick={() => navigate('/allproduct')}
                  className="h-14 px-8 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/10 active:scale-95"
                >
                  Acquire More
                </button>
             </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {cartItems.map((item, index) => (
              <div key={item.id} className="group animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="bg-white rounded-[3rem] p-4 border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-900/10 flex flex-col h-full group/card relative overflow-hidden">
                   
                   {/* Poster Component */}
                   <div 
                     onClick={() => navigate(`/productinfo/${item.id}`)}
                     className="relative h-64 rounded-[2.2rem] bg-slate-50 overflow-hidden cursor-pointer mb-6"
                   >
                     <img 
                       src={item.image || item.productImageUrl} 
                       alt={item.title} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                     />
                     <div className="absolute top-4 left-4 z-10">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black text-slate-900 uppercase tracking-widest border border-white/50 shadow-sm">
                           {item.category}
                        </span>
                     </div>
                   </div>

                   {/* Information Layer */}
                   <div className="px-3 flex-1 flex flex-col pt-2">
                       <h3 
                         onClick={() => navigate(`/productinfo/${item.id}`)}
                         className="text-lg font-black text-slate-900 mb-1 line-clamp-2 leading-tight cursor-pointer hover:text-cyan-600 transition-colors"
                       >
                         {item.title}
                       </h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Volume UID: {item.isbn.split('-').pop()}</p>
                       
                       <p className="line-clamp-2 text-sm text-slate-500 leading-relaxed mb-10 flex-1">
                          {item.description}
                       </p>
                       
                       <div className="mt-auto flex items-center gap-3">
                          <button
                            onClick={() => navigate(`/productinfo/${item.id}`)}
                            className="flex-1 py-4 bg-slate-900 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95"
                          >
                            Explore Full Data
                          </button>
                          <button
                            onClick={() => deleteCart(item)}
                            className="p-4 rounded-2xl bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all active:scale-90 border border-rose-100 hover:border-rose-400"
                          >
                             <Trash2 className="w-5 h-5" />
                          </button>
                       </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-center animate-fadeIn">
             <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                <Bookmark className="w-10 h-10 text-slate-300" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Archive Index Zero</h3>
             <p className="text-slate-500 max-w-sm mb-12 font-medium text-lg leading-relaxed">
                Your personal repository is currently empty. Explore the global catalog to save impactful resources.
             </p>
             <button
               onClick={() => navigate('/allproduct')}
               className="group px-12 py-5 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-950/10 flex items-center gap-3"
             >
               Begin Exploration
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;

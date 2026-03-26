import { useContext, useMemo } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Bookmark, BookmarkCheck, ArrowLeft, Share2, Info, BookOpen, Clock } from "lucide-react";

const ProductInfo = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  const { id } = useParams();
  const product = useMemo(
    () => getAllProduct.find((p) => p.id === id),
    [getAllProduct, id]
  );

  const cartItems = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const isSaved = cartItems.some((p) => p.id === product?.id);

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Saved to your collection");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from collection");
  };

  if (loading) return <Layout><div className="flex min-h-[60vh] items-center justify-center"><Loader /></div></Layout>;
  if (!product) return <Layout><div className="flex min-h-[60vh] flex-col items-center justify-center text-slate-500">
    <Info className="w-12 h-12 mb-4 opacity-20" />
    <p>Product not found.</p>
    <button onClick={() => navigate('/allproduct')} className="mt-4 text-cyan-600 font-bold">Back to Catalog</button>
  </div></Layout>;

  return (
    <Layout>
      <section className="page-shell px-4 py-8 md:px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 animate-fadeIn">
            <div className="relative aspect-4/5 md:aspect-square rounded-[3rem] bg-slate-50 border border-slate-100 flex items-center justify-center p-12 overflow-hidden shadow-inner group">
                <img
                  className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  src={product?.productImageUrl}
                  alt={product?.title}
                />
                <div className="absolute top-8 right-8 flex flex-col gap-3">
                    <button className="p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white text-slate-600 hover:text-cyan-600 transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => isSaved ? deleteCart(product) : addCart(product)}
                      className={`p-3 rounded-full backdrop-blur-md shadow-lg border border-white transition-all ${isSaved ? 'bg-cyan-500 text-white' : 'bg-white/80 text-slate-600 hover:text-cyan-600'}`}
                    >
                        {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </button>
                </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 lg:pt-4 animate-slideIn">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-[10px] font-black uppercase tracking-widest mb-6">
              {product?.category || "Library Catalog"}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              {product?.title}
            </h1>
            
            <div className="flex items-center gap-6 mb-8 text-slate-400">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-medium">Hardcover Edition</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-medium">14 Days Borrowing</span>
                </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Book Summary</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {product?.description || "No detailed summary available for this title yet. Please contact the librarian for more information."}
              </p>
            </div>

            <div className="h-px bg-slate-100 w-full mb-10"></div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
               <button className="w-full flex-1 app-button-primary py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                  Borrow This Book
               </button>
               <button 
                onClick={() => isSaved ? deleteCart(product) : addCart(product)}
                className={`w-full sm:w-auto px-8 py-5 rounded-3xl font-bold transition-all flex items-center justify-center gap-2 border-2 ${isSaved ? 'border-rose-200 text-rose-600 bg-rose-50' : 'border-slate-100 text-slate-600 hover:bg-slate-50'}`}
               >
                  {isSaved ? "Remove from Saved" : "Save for Later"}
               </button>
            </div>
            
            <p className="text-center sm:text-left mt-6 text-xs text-slate-400 font-medium">
              * Availability subject to library policy. Please ensure you are registered.
            </p>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteBook } from "../../redux/booksSlice";
import toast from "react-hot-toast";
import { Edit3, Trash2, PlusCircle, Book as BookIcon } from "lucide-react";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    toast.success("Catalog entry purged successfully.");
  };

  return (
    <div className="animate-fadeIn">
      <div className="py-8 flex flex-col md:flex-row justify-between items-center bg-white px-8 rounded-t-[2.5rem] border-b border-slate-50 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Global Knowledge Repository</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Catalog & Inventory Management</p>
        </div>
        
        <Link to={"/bookmanagement"}>
          <button className="group px-8 py-3.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-slate-300">
            <PlusCircle className="w-4 h-4" />
            Add New Resource
          </button>
        </Link>
      </div>

      <div className="w-full overflow-x-auto bg-white rounded-b-[2.5rem] shadow-2xl shadow-slate-200/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Index</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Visual Meta</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bibliographic Info</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Classification</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Availability</th>
              <th className="py-7 px-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 fontPara">
            {books.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6 font-mono text-xs font-bold text-slate-400">
                  {String(index + 1).padStart(2, '0')}
                </td>
                <td className="px-8 py-6">
                   <div className="w-16 h-20 bg-slate-100 rounded-lg overflow-hidden shadow-sm border border-slate-200">
                      {item.productImageUrl ? (
                        <img src={item.productImageUrl} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                           <BookIcon className="w-6 h-6" />
                        </div>
                      )}
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">{item.title}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.author || "Global Source"}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-[9px] font-black uppercase tracking-widest">
                     {item.category}
                   </span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.available_copies > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span className="text-xs font-bold text-slate-600">{item.available_copies} Units</span>
                   </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      <button 
                        onClick={() => navigate(`/bookmanagement`)}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-xl shadow-sm border border-slate-100"
                      >
                         <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors bg-white rounded-xl shadow-sm border border-slate-100"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {books.length === 0 && (
           <div className="py-40 text-center">
              <div className="inline-flex p-8 bg-slate-50 rounded-[2rem] mb-6">
                 <BookIcon className="w-12 h-12 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Registry Vacant</h3>
              <p className="text-slate-400 font-medium max-w-xs mx-auto">The knowledge repository is currently empty. Synchronize new resources for system access.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

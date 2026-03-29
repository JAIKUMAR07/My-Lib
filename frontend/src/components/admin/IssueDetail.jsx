import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteIssue } from "../../redux/issuesSlice";
import toast from "react-hot-toast";
import { Trash2, PlusCircle, ExternalLink } from "lucide-react";

const IssueDetail = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.items);

  const handleDeleteIssue = (id) => {
    dispatch(deleteIssue(id));
    toast.success("Archive Entry Removed");
  };

  return (
    <div className="animate-fadeIn">
      <div className="py-8 flex flex-col md:flex-row justify-between items-center bg-white px-8 rounded-t-[2.5rem] border-b border-slate-50 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Inventory Circulation</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Real-time Borrowing Audit</p>
        </div>
        
        <Link to={"/borrowermanagement"}>
          <button className="group px-8 py-3.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-slate-300">
            <PlusCircle className="w-4 h-4" />
            New Transaction
          </button>
        </Link>
      </div>

      <div className="w-full overflow-x-auto bg-white rounded-b-[2.5rem] shadow-2xl shadow-slate-200/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Borrower Identity</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resource Title</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Maturity Status</th>
              <th className="py-7 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Timestamp</th>
              <th className="py-7 px-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {issues.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                   <span className="font-mono text-xs font-bold text-slate-400">
                     {String(index + 1).padStart(2, '0')}
                   </span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900">{item.userName}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.userLibId}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className="text-sm font-bold text-slate-600 truncate max-w-[200px] block">
                     {item.bookTitle}
                   </span>
                </td>
                <td className="px-8 py-6">
                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                     item.status === 'overdue' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                   }`}>
                     {item.status}
                   </span>
                </td>
                <td className="px-8 py-6 text-sm font-medium text-slate-400">{item.issueDate}</td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                         <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteIssue(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {issues.length === 0 && (
           <div className="py-32 text-center">
              <div className="inline-flex p-6 bg-slate-50 rounded-full mb-4">
                 <Trash2 className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Archive Vacant</h3>
              <p className="text-slate-400 font-medium">No inventory circulation detected in active registry.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default IssueDetail;

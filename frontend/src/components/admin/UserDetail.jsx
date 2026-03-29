import { useSelector } from "react-redux";

const UserDetail = () => {
  const users = useSelector((state) => state.users.items);

  return (
    <div className="animate-fadeIn">
      <div className="py-8 flex justify-between items-center bg-white px-6 rounded-t-3xl border-b border-slate-50">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Registry Pool</h1>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
           {users.length} Total Identities
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-white rounded-b-3xl shadow-xl shadow-slate-200/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">S.No.</th>
              <th className="h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Name</th>
              <th className="h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Email Reference</th>
              <th className="h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Library ID</th>
              <th className="h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Clearance Role</th>
              <th className="h-14 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Onboard Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 text-sm font-bold text-slate-400 font-mono">{String(index + 1).padStart(2, '0')}</td>
                <td className="px-6 py-5 text-sm font-black text-slate-900">{item.name || item.fullName}</td>
                <td className="px-6 py-5 text-sm font-medium text-slate-500">{item.email}</td>
                <td className="px-6 py-5">
                   <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-blue-100">
                     {item.libId || "N/A"}
                   </span>
                </td>
                <td className="px-6 py-5">
                   <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                     item.role === 'admin' ? 'bg-amber-100 text-amber-700' : 
                     item.role === 'librarian' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                   }`}>
                     {item.role}
                   </span>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-slate-400">{item.registrationDate || "Archive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;

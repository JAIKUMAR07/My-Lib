import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  UserCheck, Zap, TrendingUp, Mail, Phone, Award, MapPin, 
  Calendar, Clock, ClipboardCheck, BookOpen, CheckCircle, 
  Package, Scan, Bell, LogOut, ChevronRight, Activity, Shield, Edit
} from "lucide-react";
import EditProfileModal from "../../components/profile/EditProfileModal";

const LibrarianProfile = () => {
  const { profileData, updateProfile, signOut } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const books = useSelector((state) => state.books.items);
  const issues = useSelector((state) => state.issues.items || []);

  const librarianData = {
    fullName: profileData?.fullName || "Chief Librarian",
    designation: "Operational Lead",
    email: profileData?.email || "librarian@nexlib.io",
    phone: profileData?.phone || "+1 (800) NEX-STAFF",
    staffId: profileData?.libId || "LIB-402-Q",
    address: profileData?.department || "West Wing Hub",
    joinDate: "Senior Status",
    shiftTiming: "08:00 - 18:00",
    activeBorrowings: issues.length,
    pendingReturns: issues.filter(i => i.status === 'overdue').length
  };

  const stats = [
    { label: "Active Issues", value: issues.length, icon: Activity, style: "bg-cyan-600 shadow-cyan-900/20" },
    { label: "Managed Catalog", value: books.length, icon: BookOpen, style: "bg-indigo-600 shadow-indigo-900/20" },
    { label: "Operational Score", value: "94%", icon: TrendingUp, style: "bg-emerald-600 shadow-emerald-900/20" },
    { label: "Access Tier", value: "Level 2", icon: Shield, style: "bg-rose-600 shadow-rose-900/20" },
  ];

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl animate-fadeIn">
      <div className="relative h-60 md:h-64">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        </div>
        <div className="absolute -bottom-20 left-6 flex items-end gap-6 md:left-12 md:gap-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-3xl bg-white p-2 shadow-2xl md:h-44 md:w-44">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-cyan-600">
                <UserCheck className="h-14 w-14 text-white md:h-20 md:w-20" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h1 className="mb-1 text-2xl font-black text-white md:text-4xl tracking-tighter">{librarianData.fullName}</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 md:text-xs">{librarianData.designation} • Personnel</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 px-5 pb-8 pt-24 md:px-12 lg:grid-cols-12 lg:gap-12 lg:pb-12 lg:pt-28">
        <div className="space-y-10 lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="group rounded-4xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-emerald-200 hover:bg-white hover:shadow-2xl">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-110 ${stat.style}`}><stat.icon className="h-5 w-5 text-white" /></div>
                <div className="text-2xl font-black tabular-nums text-slate-900 tracking-tight">{stat.value}</div>
                <div className="mt-1 text-[9px] font-black uppercase tracking-widest leading-tight text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400"><ClipboardCheck className="h-4 w-4 text-emerald-600" /> Personnel Data</h3>
              <div className="space-y-4">
                <Field icon={Mail} label="Operational Email" value={librarianData.email} />
                <Field icon={Phone} label="Direct Link" value={librarianData.phone} />
                <Field icon={Award} label="Staff Identification" value={librarianData.staffId} />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400"><Clock className="h-4 w-4 text-emerald-600" /> Duty Matrix</h3>
              <div className="space-y-4">
                <Field icon={MapPin} label="Work Station" value={librarianData.address} />
                <Field icon={Calendar} label="Service Start" value={librarianData.joinDate} />
                <Field icon={Clock} label="Operational Shift" value={librarianData.shiftTiming} />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8 lg:col-span-4">
          <div className="sticky top-8 rounded-[2.5rem] border border-slate-200 bg-white p-6 md:p-10 shadow-xl">
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Operational Hub</h3>
            <div className="mb-10 grid grid-cols-2 gap-4">
              <ToolButton icon={BookOpen} to="/borrowermanagement" label="Checkout" color="cyan" />
              <ToolButton icon={CheckCircle} to="/borrowermanagement" label="Returns" color="emerald" />
              <ToolButton icon={Package} to="/bookmanagement" label="Inventory" color="slate" />
              <ToolButton icon={Scan} to="/bookmanagement" label="Scan Mode" color="blue" />
            </div>
            <div className="my-10 h-px bg-slate-100" />
            <div className="space-y-3">
              <ActionButton 
                icon={Edit} 
                label="Modify Personnel Profile" 
                onClick={() => setIsEditModalOpen(true)}
              />
              <ActionButton 
                icon={Bell} 
                label="Dispatch Due Alert" 
                primary 
              />
              <ActionButton 
                icon={LogOut} 
                label="Session Purge" 
                danger 
                onClick={signOut}
              />
            </div>
          </div>
        </div>
      </div>
      
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        currentData={profileData} 
        onUpdate={updateProfile}
      />
    </div>
  );
};

const Field = ({ icon: Icon, label, value }) => (
  <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:bg-slate-50"><div className="rounded-xl bg-slate-50 p-3 text-slate-400 shadow-sm transition-colors group-hover:text-emerald-600"><Icon className="h-4 w-4" /></div><div className="min-w-0"><p className="mb-0.5 text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p><p className="truncate text-xs font-bold text-slate-800">{value}</p></div></div>
);

const ToolButton = ({ icon: Icon, label, color, to }) => (
  <Link to={to || "#"} className="group flex flex-col items-center justify-center rounded-3xl border border-slate-50 bg-slate-50 p-5 transition-all hover:border-emerald-300 hover:bg-white hover:shadow-xl"><div className={`mb-3 rounded-xl p-3 shadow-lg transition-transform group-hover:scale-110 ${color === 'cyan' ? 'bg-cyan-600' : color === 'emerald' ? 'bg-emerald-600' : color === 'slate' ? 'bg-slate-900' : 'bg-blue-600'}`}><Icon className="h-5 w-5 text-white" /></div><span className="text-[9px] font-black uppercase tracking-wider text-slate-800">{label}</span></Link>
);

const ActionButton = ({ icon: Icon, label, primary, danger, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${primary ? "bg-slate-900 text-white hover:bg-slate-800 shadow-xl" : danger ? "border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white" : "border border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900"}`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3"><Icon className="h-4 w-4" />{label}</div>
      <ChevronRight className="h-3 w-3 opacity-30" />
    </div>
  </button>
);

export default LibrarianProfile;

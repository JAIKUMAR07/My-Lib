import React from "react";
import {
  UserCheck,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Users,
  Clock,
  Bell,
  CheckCircle,
  Award,
  Shield,
  BookMarked,
  ClipboardCheck,
  TrendingUp,
  BarChart3,
  Package,
  Scan,
  DollarSign,
  Zap,
  ChevronRight,
  LogOut,
} from "lucide-react";

/**
 * LibrarianProfile Component
 * Redesigned as an operational dashboard for the library's frontline guardians.
 * Features: High-density performance metrics, quick operational tools, and a premium identity card layout.
 */
const LibrarianProfile = ({ user }) => {
  // Mock data - replace with actual user data
  const librarianData = {
    fullName: user?.full_name || user?.name || "Emma Richardson",
    email: user?.email || "emma.r@nexlib.cloud",
    phone: user?.phone || "+91 99000 99000",
    staffId: user?.staff_id || "NX-LIB-409",
    designation: user?.designation || "Senior Operational Librarian",
    shiftTiming: user?.shift_timing || "09:00 - 17:00",
    address: "Operational Hub, Wing B, Floor 4",
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : "MAR 2024",

    // Stats
    totalIssuedBooks: 5432,
    totalDueBooks: 287,
    totalFines: "1,250",
    totalMembersAssisted: 1234,
    efficiency: "94.2%",
    activeBorrowings: 156,
    pendingReturns: 42,
  };

  return (
    <div className="bg-white rounded-4xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
      {/* Visual Identity Header */}
      <div className="relative h-60">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
           <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Identity Section */}
        <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
            <div className="relative group">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-white p-2 shadow-2xl">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                        <UserCheck className="w-14 h-14 text-white" />
                    </div>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-cyan-400 border-4 border-white rounded-full flex items-center justify-center">
                   <Zap className="w-3 h-3 text-white fill-current" />
                </div>
            </div>
            
            <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-black text-white mb-1">{librarianData.fullName}</h1>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                   {librarianData.designation} • Personnel
                </p>
            </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Primary Data Pane */}
        <div className="lg:col-span-8 space-y-12">
            
            {/* Rapid Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Checkouts", value: librarianData.totalIssuedBooks, icon: BookOpen, color: "cyan" },
                { label: "Due Alerts", value: librarianData.totalDueBooks, icon: Bell, color: "rose" },
                { label: "Recovered Fines", value: librarianData.totalFines, icon: DollarSign, color: "emerald" },
                { label: "Efficiency", value: librarianData.efficiency, icon: TrendingUp, color: "blue" },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-3xl group hover:border-cyan-200 transition-all">
                    <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500 flex items-center justify-center mb-3 shadow-lg shadow-${stat.color}-500/20 group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xl font-black text-slate-900 tabular-nums">{stat.value}</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Detailed Registry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                     <ClipboardCheck className="w-4 h-4 text-cyan-600" /> Personnel Data
                  </h3>
                  <div className="space-y-3">
                     <Field icon={Mail} label="Operational Email" value={librarianData.email} />
                     <Field icon={Phone} label="Direct Link" value={librarianData.phone} />
                     <Field icon={Award} label="Staff Identification" value={librarianData.staffId} />
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                     <Clock className="w-4 h-4 text-cyan-600" /> Duty Matrix
                  </h3>
                  <div className="space-y-3">
                     <Field icon={MapPin} label="Work Station" value={librarianData.address} />
                     <Field icon={Calendar} label="Service Start" value={librarianData.joinDate} />
                     <Field icon={Clock} label="Operational Shift" value={librarianData.shiftTiming} />
                  </div>
               </div>
            </div>

            {/* Performance Analytics Zone */}
            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 group">
               <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-black text-slate-900">Health index Summary</h3>
                  <p className="text-xs text-slate-500 font-medium">Your current operational efficiency is above institutional benchmarks by 4.8%.</p>
               </div>
               <div className="flex items-center gap-6">
                  <MetricRing value={librarianData.activeBorrowings} label="Active" color="cyan" />
                  <MetricRing value={librarianData.pendingReturns} label="Pending" color="rose" />
               </div>
            </div>
        </div>

        {/* Tactical Controls Pane */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-slate-200 rounded-4xl p-8 sticky top-8 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Operational Utility</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                   <ToolButton icon={BookOpen} label="Checkout" color="cyan" />
                   <ToolButton icon={CheckCircle} label="Return" color="emerald" />
                   <ToolButton icon={Package} label="Inventory" color="slate" />
                   <ToolButton icon={Scan} label="Scan" color="blue" />
                </div>

                <div className="h-px bg-slate-100 my-8" />

                <div className="space-y-3">
                   <ActionButton icon={Bell} label="Dispatch Due Alert" primary />
                   <ActionButton icon={ClipboardCheck} label="Operational Log" />
                   <ActionButton icon={LogOut} label="Session Purge" danger />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:bg-white transition-all shadow-sm">
        <div className="p-3 bg-white rounded-xl text-slate-400 group-hover:text-cyan-600 transition-colors shadow-sm">
            <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-xs font-bold text-slate-700 truncate">{value}</p>
        </div>
    </div>
);

const MetricRing = ({ value, label, color }) => (
    <div className="text-center">
       <div className={`text-2xl font-black tabular-nums text-${color}-600`}>{value}</div>
       <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
);

const ToolButton = ({ icon: Icon, label, color }) => (
    <button className="flex flex-col items-center justify-center p-5 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all group">
       <div className={`p-3 rounded-xl bg-${color}-500 mb-3 shadow-lg shadow-${color}-500/20 group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" />
       </div>
       <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">{label}</span>
    </button>
);

const ActionButton = ({ icon: Icon, label, primary, danger }) => (
    <button className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
        primary ? 'bg-slate-900 text-white hover:bg-slate-800' :
        danger ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-500 hover:text-white' :
        'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
    }`}>
       <div className="flex items-center gap-3">
          <Icon className="w-4 h-4" />
          {label}
       </div>
       <ChevronRight className="w-4 h-4 opacity-30" />
    </button>
);

export default LibrarianProfile;

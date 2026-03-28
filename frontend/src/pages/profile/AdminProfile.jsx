import React from "react";
import {
  Shield,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  BarChart3,
  UserCheck,
  Bell,
  Database,
  Award,
  Crown,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

/**
 * AdminProfile Component
 * Redesigned as a flagship Command Center for Super Admins.
 * Features: High-contrast data visualization, premium utility controls, and identity-focused layout.
 */
const AdminProfile = ({ user }) => {
  // Mock data - replace with actual user data
  const adminData = {
    fullName: user?.full_name || user?.name || "Dr. Jaikumar",
    email: user?.email || "admin.head@nexlib.cloud",
    phone: user?.phone || "+91 91090 91090",
    adminId: user?.admin_id || "NX-ADM-0017",
    roleType: user?.role_type || "Super Admin",
    address: user?.address || "Global HQ, Tech District, Nex-Lib Towers",
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : "JAN 2024",

    // Stats
    totalUsers: 1450,
    totalBooks: 12500,
    activeBorrowings: 320,
    librarians: 15,
    departments: 8,
  };

  return (
    <div className="bg-white rounded-4xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
      {/* Dynamic Header with Visual Depth */}
      <div className="relative h-64">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-10 -mb-10 blur-3xl" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        {/* Identity Badge */}
        <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
            <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-2 shadow-2xl shadow-slate-900/40">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center relative overflow-hidden">
                        <Shield className="w-16 h-16 md:w-20 md:h-20 text-white/90 relative z-10" />
                        <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full" />
                    </div>
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg" title="Active Core">
                   <Zap className="w-4 h-4 text-white fill-current" />
                </div>
            </div>
            
            <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-sm">
                        {adminData.fullName}
                    </h1>
                    <Crown className="w-6 h-6 text-amber-400 fill-current" />
                </div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">
                   {adminData.roleType} • System Architect
                </p>
            </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Data & Stats */}
        <div className="lg:col-span-8 space-y-12">
            
            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Archived Volumes", value: adminData.totalBooks, icon: BookOpen, color: "cyan" },
                { label: "Active Pool", value: adminData.totalUsers, icon: Users, color: "slate" },
                { label: "Core Personnel", value: adminData.librarians, icon: UserCheck, color: "emerald" },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 group hover:border-cyan-200 transition-all hover:bg-white hover:shadow-xl hover:shadow-cyan-900/5">
                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500 flex items-center justify-center mb-4 shadow-lg shadow-${stat.color}-500/20 group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-black text-slate-800 tabular-nums">
                        {stat.value.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        {stat.label}
                    </div>
                </div>
              ))}
            </div>

            {/* Information Matrices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-600" /> Identity Matrix
                    </h3>
                    <div className="space-y-3">
                         <DetailRow icon={Mail} label="Secure Email" value={adminData.email} />
                         <DetailRow icon={Phone} label="Direct Line" value={adminData.phone} />
                         <DetailRow icon={Award} label="Admin Protocol ID" value={adminData.adminId} />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-600" /> Geo-Location
                    </h3>
                    <div className="space-y-3">
                         <DetailRow icon={MapPin} label="HQ Address" value={adminData.address} />
                         <DetailRow icon={Calendar} label="Commissioned Date" value={adminData.joinDate} />
                    </div>
                </div>
            </div>

            {/* System Overview Dashboard */}
            <div className="bg-slate-900 rounded-4xl p-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full -mr-32 -mt-32" />
                 <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5" /> Live Repository Sync
                 </h3>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <Metric icon={Database} value={adminData.departments} label="Sub-Units" />
                    <Metric icon={TrendingUp} value={adminData.activeBorrowings} label="Active Cycles" />
                    <Metric icon={Users} value="8" label="Branch Nodes" />
                    <Metric icon={Zap} value="99.9%" label="Uptime" />
                 </div>
            </div>
        </div>

        {/* Right Column: Controls & Actions */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 border border-slate-100 rounded-4xl p-8 sticky top-8">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8">System Authority Pool</h3>
                
                <div className="space-y-3">
                    <ControlButton icon={Users} label="Inventory Override" count="1.4K Users" color="slate" />
                    <ControlButton icon={BookOpen} label="Catalogue Forge" count="12.5K Books" color="cyan" />
                    <ControlButton icon={BarChart3} label="Oracle Analytics" count="Live" color="emerald" />
                </div>

                <div className="h-px bg-slate-200 my-8" />

                <div className="space-y-3">
                    <ActionButton icon={Bell} label="Broadcast Global Sync" plain />
                    <ActionButton icon={UserCheck} label="Deploy New Personnel" primary />
                    <ActionButton icon={Settings} label="System Calibration" plain />
                    <ActionButton icon={LogOut} label="Terminate Session" danger />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ icon: Icon, value, label }) => (
    <div className="text-center group border-r border-white/5 last:border-none px-4">
        <Icon className="w-6 h-6 text-cyan-500/30 mx-auto mb-4 group-hover:text-cyan-400 transition-colors" />
        <div className="text-3xl font-black text-white mb-1 tabular-nums">{value}</div>
        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
);

const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:bg-white transition-all shadow-sm">
        <div className="p-3 bg-white rounded-xl text-slate-400 group-hover:text-cyan-600 transition-colors">
            <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-xs font-bold text-slate-700 truncate">{value}</p>
        </div>
    </div>
);

const ControlButton = ({ icon: Icon, label, count, color }) => (
    <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-cyan-400 hover:shadow-lg transition-all group">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600 group-hover:bg-cyan-500 group-hover:text-white transition-all`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-left font-black text-xs text-slate-800 uppercase tracking-wider">{label}</div>
        </div>
        <div className="text-[10px] font-black text-slate-400 tabular-nums">{count}</div>
    </button>
);

const ActionButton = ({ icon: Icon, label, primary, danger, plain }) => (
    <button className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
        primary ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-950/20' : 
        danger ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-500 hover:text-white' :
        'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
    }`}>
        <Icon className="w-4 h-4" />
        {label}
        {!plain && !primary && <ChevronRight className="w-4 h-4 ml-auto opacity-30" />}
    </button>
);

const TrendingUp = ({ className }) => <BarChart3 className={className} />;

export default AdminProfile;

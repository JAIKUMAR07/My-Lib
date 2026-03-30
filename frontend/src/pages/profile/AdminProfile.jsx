import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../../components/profile/EditProfileModal";
import { 
  Shield, Zap, Crown, Mail, Phone, Award, MapPin, Calendar, 
  ShieldCheck, LayoutDashboard, Database, BarChart3, Users, 
  Bell, UserCheck, Settings, LogOut, ChevronRight, BookOpen,
  Activity, Globe, Terminal, Edit
} from "lucide-react";

const AdminProfile = () => {
  const { profileData, updateProfile, signOut } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const books = useSelector((state) => state.books.items);
  const users = useSelector((state) => state.users.items);
  const issues = useSelector((state) => state.issues.items || []);

  const stats = [
    { label: "Registry Volumes", value: books.length, icon: BookOpen, style: "bg-cyan-600 shadow-cyan-900/20", trend: "+12% Growth" },
    { label: "Identity Pool", value: users.length, icon: Users, style: "bg-indigo-600 shadow-indigo-900/20", trend: "Verified" },
    { label: "Active Cycles", value: issues.length, icon: Activity, style: "bg-emerald-600 shadow-emerald-900/20", trend: "Live Sync" },
  ];

  const adminData = {
    fullName: profileData?.fullName || "System Administrator",
    roleType: "Root Authority",
    email: profileData?.email || "admin@nexlib.io",
    phone: profileData?.phone || "+1 (800) NEX-ADMIN",
    adminId: profileData?.libId || "ARCH-001-X",
    address: profileData?.department || "Central Command Center",
    joinDate: "Level 1 Clearance",
    activeStaff: users.filter(u => u.role === 'librarian' || u.role === 'admin').length
  };

  return (
    <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl animate-fadeIn">
      <div className="relative h-64 md:h-72">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />
        </div>
        <div className="absolute -bottom-20 left-6 flex items-end gap-6 md:left-12 md:gap-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-3xl bg-white p-2 shadow-2xl shadow-slate-900/40 md:h-44 md:w-44">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 to-slate-950">
                <Shield className="relative z-10 h-16 w-16 text-cyan-400 drop-shadow-lg md:h-20 md:w-20" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-1 flex items-center gap-3">
              <h1 className="text-2xl font-black text-white md:text-4xl tracking-tighter">{adminData.fullName}</h1>
              <Crown className="h-6 w-6 fill-current text-amber-400" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80 md:text-xs">{adminData.roleType} • System Architect</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 px-5 pb-8 pt-24 md:px-12 lg:grid-cols-12 lg:gap-12 lg:pb-12 lg:pt-28">
        <div className="space-y-10 lg:col-span-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="group rounded-4xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-cyan-200 hover:bg-white hover:shadow-2xl hover:shadow-cyan-900/5">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110 ${stat.style}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-black tabular-nums text-slate-900 tracking-tight">{stat.value.toLocaleString()}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400"><ShieldCheck className="h-4 w-4 text-cyan-600" /> Identity Matrix</h3>
              <div className="space-y-4">
                <DetailRow icon={Mail} label="Secure Email" value={adminData.email} />
                <DetailRow icon={Phone} label="Direct Line" value={adminData.phone} />
                <DetailRow icon={Award} label="Authority Protocol" value={adminData.adminId} />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400"><Globe className="h-4 w-4 text-cyan-600" /> Geo-Station</h3>
              <div className="space-y-4">
                <DetailRow icon={MapPin} label="Command Center" value={adminData.address} />
                <DetailRow icon={Calendar} label="Access Tier" value={adminData.joinDate} />
                <DetailRow icon={Terminal} label="Active Personnel" value={`${adminData.activeStaff} Active Units`} />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-4xl bg-slate-900 p-8 md:p-12">
            <h3 className="mb-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500"><LayoutDashboard className="h-5 w-5" /> Pulse Sync</h3>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <Metric icon={Database} value={books.length} label="Resource Units" />
              <Metric icon={BarChart3} value={issues.length} label="Live Cycles" />
              <Metric icon={Users} value={users.length} label="Member Nodes" />
              <Metric icon={Zap} value="Synced" label="Nexus Status" />
            </div>
          </div>
        </div>
        <div className="space-y-8 lg:col-span-4">
          <div className="sticky top-8 rounded-4xl border border-slate-100 bg-slate-50 p-6 md:p-10 shadow-xl">
            <h3 className="mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Authority Controls</h3>
            <div className="space-y-4">
              <ControlButton icon={Users} to="/registration" label="Personnel Registry" count={`${users.length} IDs`} color="cyan" />
              <ControlButton icon={BookOpen} to="/bookmanagement" label="Volumes Catalog" count={`${books.length} Units`} color="indigo" />
              <ControlButton icon={BarChart3} to="/borrowermanagement" label="Circulation Audit" count="Live" color="emerald" />
              <ControlButton icon={Settings} to="/catalogsettings" label="Catalog Architecture" count="Structural" color="slate" />
            </div>
            <div className="my-10 h-px bg-slate-200" />
            <div className="space-y-3">
              <ActionButton icon={Edit} label="Modify Identity Matrix" onClick={() => setIsEditModalOpen(true)} />
              <Link to="/registration" className="block w-full text-left"><ActionButton icon={UserCheck} label="Deploy New Personnel" primary /></Link>
              <ActionButton icon={Bell} label="Broadcast Global Sync" plain />
              <ActionButton icon={LogOut} label="Terminate Session" danger onClick={signOut} />
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

const Metric = ({ icon: Icon, value, label }) => (
  <div className="group border-r border-white/5 px-4 text-center last:border-none">
    <Icon className="mx-auto mb-4 h-6 w-6 text-slate-700 transition-colors group-hover:text-cyan-500" />
    <div className="mb-1 text-3xl font-black tabular-nums text-white tracking-tighter">{value}</div>
    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</div>
  </div>
);

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-cyan-200">
    <div className="rounded-xl bg-slate-50 p-3 text-slate-400 transition-colors group-hover:text-cyan-600"><Icon className="h-4 w-4" /></div>
    <div className="min-w-0">
      <p className="mb-0.5 text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="truncate text-xs font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const controlStyleMap = { cyan: "bg-cyan-50 text-cyan-600", indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", slate: "bg-slate-50 text-slate-600" };

const ControlButton = ({ icon: Icon, label, count, color, to }) => (
  <Link to={to || "#"} className="group flex w-full items-center justify-between rounded-2xl border border-white bg-white p-4 shadow-sm transition-all hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-900/5">
    <div className="flex items-center gap-4">
      <div className={`rounded-xl p-3 transition-all group-hover:bg-slate-900 group-hover:text-white ${controlStyleMap[color] || controlStyleMap.slate}`}><Icon className="h-5 w-5" /></div>
      <div className="text-left text-xs font-black uppercase tracking-wider text-slate-800">{label}</div>
    </div>
    <div className="text-[10px] font-black tabular-nums text-slate-400">{count}</div>
  </Link>
);

const ActionButton = ({ icon: Icon, label, primary, danger, plain, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${primary ? "bg-slate-900 text-white shadow-xl shadow-slate-950/20 hover:scale-[1.02] active:scale-95 px-8" : danger ? "border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white" : "border border-slate-200 bg-white text-slate-400 hover:border-slate-400 hover:text-slate-800"}`}
  >
    <Icon className="h-4 w-4" />
    <span className="flex-1 text-left">{label}</span>
    {!plain && !primary && <ChevronRight className="ml-auto h-3 w-3 opacity-30" />}
  </button>
);

export default AdminProfile;

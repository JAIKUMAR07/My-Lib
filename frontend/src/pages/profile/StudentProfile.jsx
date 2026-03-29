import { useSelector } from "react-redux";
import { 
  User, Mail, Phone, MapPin, GraduationCap, School, Clock, 
  Book, Bookmark, CreditCard, Edit3, LogOut, ArrowRight, 
  Award, Zap, CheckCircle
} from "lucide-react";

/**
 * StudentProfile Component
 * Synchronized with Redux for live academic data and personal resource tracking.
 */
const StudentProfile = () => {
  const issues = useSelector((state) => state.issues.items || []);
  const users = useSelector((state) => state.users.items || []);
  
  // For demo, we assume the first student in the registry is 'logged in' 
  // if no specific identifier exists.
  const activeStudent = users.find(u => u.role === "student") || {
    fullName: "Identity Not Initialized",
    department: "Registry Pending",
    email: "system@nexlib.io",
    libId: "GUEST-000",
  };

  const activeIssues = issues.filter(i => i.userLibId === activeStudent.libId && i.status !== "returned");
  const overdueIssues = activeIssues.filter(i => new Date(i.dueDate) < new Date());
  const totalFines = activeIssues.reduce((sum, i) => sum + (i.fineAmount || 0), 0);

  const studentData = {
    fullName: activeStudent.fullName || activeStudent.name,
    course: activeStudent.department || "General Studies",
    email: activeStudent.email,
    phone: activeStudent.phone || "+1 (800) NEX-STUDENT",
    libraryId: activeStudent.libId,
    address: "Academic Precinct, Block B",
    department: activeStudent.department || "Library Core",
    session: "2023-2027",
    membershipStatus: activeStudent.status === "active" ? "Verified" : "Provisional",
    activeIssuesCount: activeIssues.length
  };

  const stats = [
    { label: "Active Volumes", value: studentData.activeIssuesCount, icon: Book, style: "bg-indigo-600" },
    { label: "Current Fine", value: `₹${totalFines}`, icon: CreditCard, style: "bg-rose-500" },
    { label: "Overdue Status", value: overdueIssues.length, icon: AlertCircle, style: "bg-orange-500" },
    { label: "Nexus Tier", value: "Silver", icon: Award, style: "bg-amber-600" },
  ];

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl animate-fadeIn">
      <div className="relative h-60 md:h-64">
        <div className="absolute inset-0 bg-slate-900 shadow-inner">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        </div>
        <div className="absolute -bottom-20 left-6 flex items-end gap-6 md:left-12 md:gap-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-3xl bg-white p-2 shadow-2xl md:h-44 md:w-44">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl">
                <User className="h-14 w-14 text-white drop-shadow-lg md:h-20 md:w-20" />
              </div>
            </div>
            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500 shadow-lg animate-pulse"><Zap className="h-3 w-3 text-white" /></div>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white md:text-4xl tracking-tighter drop-shadow-sm">{studentData.fullName}</h1>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-2xl border border-white/20 ${studentData.membershipStatus === 'Verified' ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white'}`}>
                {studentData.membershipStatus}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 md:text-sm">{studentData.course}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-5 pb-8 pt-24 md:px-12 lg:grid-cols-12 lg:gap-12 lg:pb-12 lg:pt-28">
        <div className="space-y-12 lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="group relative rounded-[2.5rem] border border-slate-100 bg-slate-50 p-6 transition-all hover:border-indigo-200 hover:bg-white hover:shadow-2xl hover:scale-105">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:rotate-12 ${stat.style}`}><stat.icon className="h-6 w-6 text-white" /></div>
                <div className="text-3xl font-black tabular-nums text-slate-900 tracking-tight">{stat.value}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <h3 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Identity Profile</h3>
              <div className="space-y-5">
                <Row icon={Mail} label="Academic Credentials" value={studentData.email} />
                <Row icon={Phone} label="Direct Contact" value={studentData.phone} />
                <Row icon={Clock} label="Member Since" value="January 2024" />
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Institutional Context</h3>
              <div className="space-y-5">
                <Row icon={GraduationCap} label="Enrollment Protocol" value={studentData.course} />
                <Row icon={MapPin} label="Allocated Repository" value={studentData.department} />
                <Row icon={School} label="Current Session" value={studentData.session} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-4">
          <div className="sticky top-28 rounded-[3rem] border border-slate-100 bg-slate-50 p-6 md:p-10 shadow-xl shadow-slate-100">
            <h3 className="mb-10 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">System Controls</h3>
            <div className="space-y-5">
              <UtilityLink icon={Book} label="Browse Catalog" desc="12.5K Volumes" accent="indigo" />
              <UtilityLink icon={Bookmark} label="Resource Vault" desc="Saved Items" accent="purple" />
              <UtilityLink icon={CreditCard} label="Payment Node" desc="Clear Penalties" accent="rose" />
            </div>
            <div className="my-12 h-px bg-slate-200/60" />
            <div className="space-y-4">
              <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-slate-400 hover:bg-slate-800 transition-all active:scale-95">
                <Edit3 className="h-4 w-4" />Modify Identity<ArrowRight className="h-4 w-4 opacity-40 group-hover:translate-x-1" />
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-50 transition-all">
                <LogOut className="h-4 w-4" />Terminate Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ icon: Icon, label, value }) => (
  <div className="group flex items-center gap-5 rounded-3xl border border-slate-50 bg-white p-5 shadow-sm transition-all hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50">
    <div className="rounded-2xl bg-slate-50 p-4 text-slate-400 transition-colors group-hover:text-indigo-600 group-hover:bg-indigo-50">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="truncate text-sm font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const UtilityLink = ({ icon: Icon, label, desc, accent }) => (
  <button className="group relative flex w-full items-center gap-5 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-5 text-left transition-all hover:border-slate-300 hover:shadow-lg">
    <div className={`rounded-2xl p-4 transition-all group-hover:text-white ${accent === 'indigo' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600' : accent === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600' : 'bg-rose-50 text-rose-600 group-hover:bg-rose-600'}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="mb-1 text-sm font-black uppercase tracking-wider text-slate-900">{label}</p>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity">{desc}</p>
    </div>
    <ArrowRight className="h-4 w-4 text-slate-200 group-hover:translate-x-1 transition-all" />
  </button>
);

const AlertCircle = ({ className }) => <Clock className={className} />; // Fallback icon

export default StudentProfile;

import React from "react";
import {
  User,
  Mail,
  Phone,
  Book,
  Calendar,
  CreditCard,
  School,
  BookOpen,
  Clock,
  Award,
  Shield,
  MapPin,
  GraduationCap,
  Zap,
  Star,
  ArrowRight,
  LogOut,
  Edit3,
  Bookmark,
} from "lucide-react";

/**
 * StudentProfile Component
 * Redesigned as a personal academic growth center for students.
 * Features: High-end identity card, progress-focused stats, and a modern utility grid.
 */
const StudentProfile = ({ user }) => {
  // Mock data - replace with actual user data
  const studentData = {
    fullName: user?.full_name || user?.name || "Jaikumar",
    email: user?.email || "jai@university.edu",
    rollNumber: user?.roll_number || "CS-2024-081",
    phone: user?.phone || "+91 91090 91090",
    address: "University Residency, Block 7, Room 302",
    course: user?.course || "Masters in Computer Science",
    department: user?.department || "School of Engineering",
    session: user?.session || "2024 - 2026",
    membershipStatus: user?.membership_status || "Premium",
    libraryId: user?.library_id || "NX-STU-882",
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : "SEP 2024",
    outstandingFines: user?.outstanding_fines || 0,
    totalBooksBorrowed: 12,
    booksDueSoon: 1,
    favoriteGenre: "Systems Design",
  };

  return (
    <div className="bg-white rounded-4xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
      {/* Identity Header */}
      <div className="relative h-56">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" />
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Identity Section */}
        <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
            <div className="relative group">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-[2.5rem] bg-white p-2 shadow-2xl">
                    <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <User className="w-14 h-14 text-white" />
                    </div>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                   <Star className="w-3 h-3 text-white fill-current" />
                </div>
            </div>
            
            <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl md:text-3xl font-black text-white">{studentData.fullName}</h1>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                       {studentData.membershipStatus}
                    </span>
                </div>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                   {studentData.course}
                </p>
            </div>
        </div>

        {/* Floating ID Card */}
        <div className="absolute top-8 right-8 hidden md:block">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl flex items-center gap-4 shadow-2xl">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                   <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Identity UID</p>
                   <p className="text-xs font-black text-white">{studentData.libraryId}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Academic Profile Pane */}
        <div className="lg:col-span-8 space-y-12">
            
            {/* Achievement Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Knowledge Assets", value: studentData.totalBooksBorrowed, icon: BookOpen, color: "indigo" },
                { label: "Active Deadlines", value: studentData.booksDueSoon, icon: Clock, color: "rose" },
                { label: "Financial Debit", value: `₹${studentData.outstandingFines}`, icon: CreditCard, color: "emerald" },
                { label: "Member Since", value: studentData.joinDate.split('/')[2], icon: Calendar, color: "amber" },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] group hover:border-indigo-200 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500 flex items-center justify-center mb-4 shadow-lg shadow-${stat.color}-500/20 group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 tabular-nums">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Information Matrices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-600" /> Bio-Metric Data
                    </h3>
                    <div className="space-y-4">
                         <Row icon={Mail} label="Academic Email" value={studentData.email} />
                         <Row icon={Phone} label="Contact Link" value={studentData.phone} />
                         <Row icon={MapPin} label="Primary Residency" value={studentData.address} />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <School className="w-4 h-4 text-indigo-600" /> Institution Matrix
                    </h3>
                    <div className="space-y-4">
                         <Row icon={GraduationCap} label="Enrollment Degree" value={studentData.course} />
                         <Row icon={MapPin} label="Faculty / Dept" value={studentData.department} />
                         <Row icon={Clock} label="Academic Session" value={studentData.session} />
                    </div>
                </div>
            </div>

            {/* Personal Librarian Insight */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-[2.5rem] p-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32" />
                 <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                       <Zap className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <h3 className="text-lg font-black text-white mb-2">Reading Velocity Check</h3>
                       <p className="text-xs text-indigo-200/60 font-medium leading-relaxed">You've explored <span className="text-white font-bold">3 new volumes</span> this month. Your preferred classification is <span className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">{studentData.favoriteGenre}</span>.</p>
                    </div>
                    <button className="px-8 py-4 bg-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:bg-slate-50 transition-all shadow-xl active:scale-95">
                       View History
                    </button>
                 </div>
            </div>
        </div>

        {/* Quick Utility Pane */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 border border-slate-100 rounded-4xl p-8 sticky top-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center md:text-left">Personal Controls</h3>
                
                <div className="space-y-4">
                    <UtilityLink icon={Book} label="Browse Repository" desc="Access 12.5K volumes" accent="indigo" />
                    <UtilityLink icon={Bookmark} label="Saved Archive" desc="View your collection" accent="purple" />
                    <UtilityLink icon={CreditCard} label="Payment Portal" desc="Clear debit balance" accent="rose" />
                </div>

                <div className="h-px bg-slate-200 my-10" />

                <div className="space-y-3">
                   <button className="w-full py-4 bg-slate-900 border border-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-950/20">
                      <Edit3 className="w-4 h-4" />
                      Adjust Profile
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform opacity-40" />
                   </button>
                   <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 active:scale-95">
                      <LogOut className="w-4 h-4" />
                      Secure Terminate
                   </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl group hover:border-indigo-200 transition-all shadow-sm">
        <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-indigo-600 transition-colors">
            <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-xs font-bold text-slate-700 truncate">{value}</p>
        </div>
    </div>
);

const UtilityLink = ({ icon: Icon, label, desc, accent }) => (
    <button className="w-full flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-[2rem] hover:border-slate-300 transition-all text-left relative overflow-hidden group">
        <div className={`p-4 rounded-2xl bg-${accent}-50 text-${accent}-600 group-hover:bg-${accent}-500 group-hover:text-white transition-all`}>
            <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-slate-800 uppercase tracking-wider leading-none mb-1">{label}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{desc}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-200 mr-2 group-hover:text-slate-400 transition-colors" />
    </button>
);

export default StudentProfile;

import { BookOpen, Search, ArrowRight, ShieldCheck, Zap, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-24">
      <div className="page-shell px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" />
              <span>Smart Library Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Fuel Your Knowledge with <span className="brand-gradient-text">Nex-Lib</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Access thousands of books, manage borrowings, and track your reading journey with our next-generation library ecosystem. Designed for students, librarians, and explorers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/allproduct" className="app-button-primary flex items-center gap-2 px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
                Explore Catalog <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/registration" className="app-button-secondary px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-100 w-full sm:w-auto justify-center flex">
                Join Community
              </Link>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-500" />
                <span className="text-sm font-medium">Secure Access</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-500" />
                <span className="text-sm font-medium">5000+ Titles</span>
              </div>
            </div>
          </div>

          {/* Graphical Element / Floating Cards */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none animate-fadeIn delay-200">
             <div className="relative z-10 aspect-square rounded-[3rem] brand-gradient p-1 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="w-full h-full rounded-[2.8rem] bg-white/5 backdrop-blur-3xl flex items-center justify-center border border-white/20">
                    <div className="text-center p-8">
                        <div className="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30 backdrop-blur-xl animate-pulse-soft">
                            <BookOpen className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Digital Library</h3>
                        <p className="text-cyan-50/70 text-sm">Organize, Discover, and Read from anywhere in the world.</p>
                    </div>
                </div>
                
                {/* Decorative floating bits */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
             </div>
             
             {/* Stats overlap card */}
             <div className="absolute -bottom-6 -left-6 md:-left-12 p-6 rounded-3xl bg-white shadow-2xl border border-slate-100 z-20 animate-slideIn">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">1.2k+</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Readers</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;

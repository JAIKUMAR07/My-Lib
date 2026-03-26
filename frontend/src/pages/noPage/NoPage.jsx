import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Search, Home, ArrowLeft } from "lucide-react";

const NoPage = () => {
  return (
    <Layout>
      <div className="page-shell px-4 py-20 md:px-6">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <div className="w-24 h-24 rounded-[2.5rem] brand-gradient flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/20 rotate-12">
            <Search className="text-white w-12 h-12" />
          </div>
          
          <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-600 mb-4 px-4 py-1 bg-cyan-50 inline-block rounded-full">
            Error 404
          </p>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Lost in the <span className="brand-gradient-text">Stacks?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
            We couldn't find the page you're looking for. It might have been moved to a different shelf or doesn't exist yet.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="app-button-primary flex items-center gap-2 px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
            >
              <Home className="w-5 h-5" /> Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="app-button-secondary flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:bg-slate-100 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-400">
             <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1 text-sm">Wrong URL?</h4>
                <p className="text-xs">Check for typos in the address bar.</p>
             </div>
             <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1 text-sm">Moved Page?</h4>
                <p className="text-xs">The resource might have been reorganized.</p>
             </div>
             <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1 text-sm">Support?</h4>
                <p className="text-xs">Contact the librarian for assistance.</p>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoPage;

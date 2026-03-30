import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Lock, User, ArrowRight, Zap, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const from = location.state?.from || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            
            toast.success("Identity Verified. Welcome back.");
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to establish session.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen app-gradient flex items-center justify-center p-6 bg-slate-100">
            <div className="absolute top-10 left-10 flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tighter">Nex<span className="text-blue-600">Lib</span></h2>
            </div>

            <div className="w-full max-w-md animate-scaleIn">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-10 md:p-12 relative overflow-hidden border border-slate-100">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Zap className="w-32 h-32 text-slate-900" />
                    </div>

                    <div className="relative z-10">
                        <header className="mb-10">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Secure Access</h1>
                            <p className="text-slate-500 font-medium">Coordinate your academic assets and manage library clearing.</p>
                        </header>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Identification Token (Email)</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                                    <input 
                                        type="email" 
                                        required 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                                        placeholder="user@nexlib.io"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Auth Sequence (Password)</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                                    <input 
                                        type="password" 
                                        required 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button 
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-slate-900 text-white rounded-2xl h-16 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-slate-400 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {loading ? "Establishing Protocol..." : (
                                        <>Establish Connection <ArrowRight className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-slate-500 text-sm font-medium">
                                Unregistered profile? <Link to="/signup" className="text-blue-600 font-black tracking-tight hover:underline">Request Identity</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

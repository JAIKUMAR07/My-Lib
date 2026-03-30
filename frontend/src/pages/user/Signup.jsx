import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../lib/supabaseClient';
import { Mail, Lock, User, ArrowRight, Zap, BookOpen, Building } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userData = {
                fullName,
                phone,
                department,
                role: 'student' // Individual signUp defaults to student
            };

            const { data, error } = await authService.signUp(email, password, userData);

            if (error) throw error;
            
            toast.success("Profile registration initiated. Welcome to Nex-Lib.");
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to initialize profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen app-gradient flex items-center justify-center p-6 bg-slate-100 py-16">
            <div className="absolute top-10 left-10 flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tighter">Nex<span className="text-blue-600">Lib</span></h2>
            </div>

            <div className="w-full max-w-xl animate-scaleIn">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 p-10 md:p-14 relative overflow-hidden border border-slate-100">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                       <Zap className="w-48 h-48 text-slate-900" />
                    </div>

                    <div className="relative z-10">
                        <header className="mb-12">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Request Identity</h1>
                            <p className="text-slate-500 font-medium text-lg">Initialize your academic credentials in the global registry.</p>
                        </header>

                        <form onSubmit={handleSignup} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormInput label="Full Designation Name" icon={User} placeholder="Full Legal Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                                <FormInput label="Primary Identification (Email)" icon={Mail} type="email" placeholder="user@nexlib.io" value={email} onChange={e => setEmail(e.target.value)} />
                                <FormInput label="Institutional Context (Dept)" icon={Building} placeholder="Computer Science" value={department} onChange={e => setDepartment(e.target.value)} />
                                <FormInput label="Secure Auth Sequence (Pass)" icon={Lock} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <div className="pt-8">
                                <button 
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-slate-900 text-white rounded-2xl h-16 flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-slate-400 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {loading ? "Synchronizing Credentials..." : (
                                        <>Request Profile Initialization <ArrowRight className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-slate-500 text-sm font-medium">
                                Already identified? <Link to="/login" className="text-blue-600 font-black tracking-tight hover:underline">Establish Connection</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormInput = ({ label, icon: Icon, type = "text", placeholder, value, onChange }) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">{label}</label>
        <div className="relative">
            <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
            <input 
                type={type} 
                required 
                value={value}
                onChange={onChange}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                placeholder={placeholder}
            />
        </div>
    </div>
);

export default Signup;

import React, { useState } from 'react';
import { X, User, Phone, Building, Save, Loader2 } from 'lucide-react';
import { apiService } from '../../services/api';
import toast from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose, currentData, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: currentData?.fullName || '',
    phone: currentData?.phone || '',
    department: currentData?.department || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiService.patch('/api/auth/profile', formData);
      
      if (!response.success) throw new Error(response.error);

      // Successfully updated on backend, now updating local state
      onUpdate({
        fullName: response.user.full_name,
        phone: response.user.phone,
        department: response.user.department
      });

      toast.success('Identity record successfully synchronized.');
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error(error.message || 'Failed to update identity matrix.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-slate-950/20 animate-fadeIn">
      <div className="w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-scaleIn border border-slate-100">
        <header className="flex items-center justify-between border-b border-slate-50 bg-slate-50/50 p-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Modify Identity Matrix</h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Core Registry Update</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                <User className="h-4 w-4" /> Legal Designatory Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                <Phone className="h-4 w-4" /> Secure Communication Hub (Phone)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">
                <Building className="h-4 w-4" /> Institutional Context (Dept)
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                placeholder="Department Name"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-slate-900 text-white rounded-2xl h-16 flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-slate-400 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              {isSubmitting ? "Synchronizing..." : "Execute Registry Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

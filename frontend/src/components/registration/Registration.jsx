import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, sendInvite } from "../../redux/usersSlice";
import { UserPlus, Mail, User, Shield, CheckCircle, Users, Search, ChevronLeft, ChevronRight, Building } from "lucide-react";
import { apiService } from "../../services/api";

// ... [Registration Component Imports remain the same]

// Import sub-components
import {
  RoleSelector,
  PasswordGenerator,
  InfoPanel,
  UserTableRow,
  Toast,
  ConfirmModal,
  StatsCard,
} from "./components";

/**
 * Registration Portal Component
 * Primary interface for administrative user creation and management.
 * Synchronized with global Redux store for system-wide identity consistency.
 */
const Registration = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const dispatch = useDispatch();

  // Lifecycle & Form State
  const [newUser, setNewUser] = useState({
    email: "",
    role: "student",
    fullName: "",
  });

  const registeredUsers = useSelector((state) => state.users.items);

  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("nexlib@123");
  const [activeTab, setActiveTab] = useState("register");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // UI Feedback State
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    userId: null,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const normalizedEmail = newUser.email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      showToast("Invalid email format detected.", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Call real Backend Admin API
      const response = await apiService.post('/api/auth/admin-register', {
        email: normalizedEmail,
        password: temporaryPassword,
        fullName: newUser.fullName.trim(),
        role: newUser.role,
        department: "General" // Default for admin-created users
      });

      if (!response.success) throw new Error(response.error);

      // 2. Synchronize Redux State
      dispatch(addUser(response.user));
      showToast(`Identity ${normalizedEmail} successfully enrolled in registry.`);

      // 3. Reset Form
      setNewUser({ email: "", role: "student", fullName: "" });
    } catch (error) {
      console.error('Registration error:', error);
      showToast(error.message || "Failed to finalize enrollment.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendInvitation = (userId) => {
    dispatch(sendInvite(userId));
    showToast("Activation invitation dispatched.");
  };

  const handleDeleteClick = (userId) => {
    setConfirmModal({ isOpen: true, userId });
  };

  const confirmDelete = () => {
    dispatch(deleteUser(confirmModal.userId));
    setConfirmModal({ isOpen: false, userId: null });
    showToast("Audit record successfully removed.");
  };

  const handleEdit = (user) => {
    showToast(`Modification portal for ${user.email} is currently read-only.`, "info");
  };

  // Filtered dataset for registry view
  const filteredUsers = useMemo(() => 
    registeredUsers.filter((user) => {
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
      const matchesSearch =
        (user.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.libId || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesStatus && matchesSearch;
    }),
  [registeredUsers, selectedRole, selectedStatus, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "role") setSelectedRole(value);
    if (filterType === "status") setSelectedStatus(value);
    if (filterType === "search") setSearchQuery(value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter flex flex-col md:flex-row items-center gap-4">
              <span className="brand-gradient-text px-1">Universal Identity Hub</span>
              <span className="px-4 py-1.5 bg-slate-900 text-white rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] shadow-2xl shadow-slate-900/40">Nexus Control</span>
            </h1>
            <p className="mt-4 text-slate-500 font-medium max-w-xl text-lg">
              Manage cross-platform user enrollment and system-wide credential provisioning from a single administrative node.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="soft-card h-24 px-8 rounded-3xl flex flex-col justify-center bg-white border-slate-100 shadow-xl shadow-slate-200/50">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Global Users</span>
                <span className="text-3xl font-black text-slate-900 tracking-tight">{registeredUsers.length}</span>
             </div>
          </div>
        </header>

        <nav className="flex items-center gap-2 p-1.5 bg-slate-200/40 backdrop-blur-md rounded-2xl w-fit mb-12 shadow-inner">
            <button 
              onClick={() => setActiveTab("register")}
              className={`px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "register" ? "bg-white text-slate-900 shadow-md scale-100" : "text-slate-500 hover:text-slate-900 scale-95"
              }`}
            >
              Onboarding
            </button>
            <button 
              onClick={() => setActiveTab("manage")}
              className={`px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "manage" ? "bg-white text-slate-900 shadow-md scale-100" : "text-slate-500 hover:text-slate-900 scale-95"
              }`}
            >
              User Registry
            </button>
        </nav>

        {activeTab === "register" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="page-section rounded-[3rem] p-12 bg-white shadow-2xl shadow-slate-200/60 border-none">
                <form onSubmit={handleRegister} className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Primary Identification Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={newUser.email}
                          onChange={handleInputChange}
                          className="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all outline-none font-bold text-slate-900"
                          placeholder="individual@university.edu"
                          required
                        />
                      </div>

                      <RoleSelector
                        selectedRole={newUser.role}
                        onRoleChange={(role) => setNewUser(p => ({ ...p, role }))}
                      />

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                          <User className="w-4 h-4" /> Legal Designatory Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={newUser.fullName}
                          onChange={handleInputChange}
                          className="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all outline-none font-bold text-slate-900"
                          placeholder="Full Name"
                        />
                      </div>
                   </div>

                   <PasswordGenerator password={temporaryPassword} onPasswordChange={setTemporaryPassword} />

                   <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group h-16 px-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-400 flex items-center gap-4 disabled:opacity-50"
                      >
                         <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                         {isSubmitting ? "Generating Credentials..." : "Authorize Enrollment"}
                      </button>
                   </div>
                </form>
              </div>
            </div>

            <aside className="lg:col-span-1">
               <InfoPanel registeredUsers={registeredUsers} />
            </aside>
          </div>
        )}

        {activeTab === "manage" && (
           <div className="page-section rounded-[3rem] bg-white shadow-2xl shadow-slate-200/60 border-none overflow-hidden animate-fadeIn">
              <div className="p-10 border-b border-slate-100 bg-slate-50/20">
                 <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="relative flex-1">
                       <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                       <input
                         type="text"
                         value={searchQuery}
                         onChange={(e) => handleFilterChange("search", e.target.value)}
                         placeholder="Query registry metadata..."
                         className="w-full h-14 pl-16 pr-6 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium"
                       />
                    </div>
                    <div className="flex gap-3">
                       <select 
                         onChange={e => handleFilterChange("role", e.target.value)}
                         className="h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
                       >
                          <option value="all">Every Role</option>
                          <option value="student">Students</option>
                          <option value="librarian">Librarians</option>
                          <option value="admin">Administrators</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="border-b border-slate-50">
                          <th className="py-8 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity Profile</th>
                          <th className="py-8 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Clearance</th>
                          <th className="py-8 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Lifecycle</th>
                          <th className="py-8 px-8 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Enrolled On</th>
                          <th className="py-8 px-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Control</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {paginatedUsers.map((user) => (
                          <UserTableRow
                             key={user.id}
                             user={user}
                             onSendInvite={sendInvitation}
                             onEdit={handleEdit}
                             onDelete={handleDeleteClick}
                          />
                       ))}
                    </tbody>
                 </table>

                 {paginatedUsers.length === 0 && (
                   <div className="py-40 text-center">
                      <div className="inline-flex p-6 bg-slate-50 rounded-full mb-6">
                         <Shield className="w-10 h-10 text-slate-200" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No Records Detected</h3>
                      <p className="text-slate-400 font-medium">Clear search filters or adjust query metadata.</p>
                   </div>
                 )}
              </div>

              {totalPages > 1 && (
                <footer className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                     Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} records
                   </p>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => goToPage(currentPage - 1)}
                        className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-900"
                        disabled={currentPage === 1}
                      >
                         <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => goToPage(currentPage + 1)}
                        className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-900"
                        disabled={currentPage === totalPages}
                      >
                         <ChevronRight className="w-4 h-4" />
                      </button>
                   </div>
                </footer>
              )}
              
              <div className="p-10 bg-slate-900 flex flex-wrap gap-12">
                 <StatsCard value={registeredUsers.length} label="Registry Total" bgColor="bg-slate-800" />
                 <StatsCard value={registeredUsers.filter(u => u.status === "active").length} label="Verified Assets" bgColor="bg-slate-800" />
                 <StatsCard value={registeredUsers.filter(u => u.status === "pending").length} label="Awaiting Sync" bgColor="bg-slate-800" />
              </div>
           </div>
        )}
      </div>

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, userId: null })}
        onConfirm={confirmDelete}
        title="Revoke Identity Clearance?"
      />
    </div>
  );
};

export default Registration;

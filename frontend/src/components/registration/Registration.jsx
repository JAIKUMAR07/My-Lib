import React, { useState } from "react";
import {
  UserPlus,
  Mail,
  User,
  Shield,
  CheckCircle,
  Users,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

const Registration = () => {
  // State for new user registration
  const [newUser, setNewUser] = useState({
    email: "",
    role: "student",
    fullName: "",
  });

  // State for registered users list
  const [registeredUsers, setRegisteredUsers] = useState([
    {
      id: 1,
      email: "john.doe@university.edu",
      role: "student",
      fullName: "John Doe",
      registrationDate: "2024-01-15",
      status: "pending",
      inviteSent: true,
    },
    {
      id: 2,
      email: "jane.smith@university.edu",
      role: "librarian",
      fullName: "Jane Smith",
      registrationDate: "2024-01-16",
      status: "active",
      inviteSent: true,
    },
    {
      id: 3,
      email: "admin@library.com",
      role: "admin",
      fullName: "System Admin",
      registrationDate: "2024-01-10",
      status: "active",
      inviteSent: true,
    },
    {
      id: 4,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "pending",
      inviteSent: false,
    },
    {
      id: 5,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "expired",
      inviteSent: false,
    },
    {
      id: 6,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "expired",
      inviteSent: false,
    },
    {
      id: 7,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "expired",
      inviteSent: false,
    },
    {
      id: 8,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "expired",
      inviteSent: false,
    },
    {
      id: 9,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "expired",
      inviteSent: false,
    },
    {
      id: 10,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "expired",
      inviteSent: false,
    },
    {
      id: 11,
      email: "bob.wilson@university.edu",
      role: "student",
      fullName: "",
      registrationDate: "2024-01-18",
      status: "expired",
      inviteSent: false,
    },
  ]);

  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("nexlib@123");
  const [activeTab, setActiveTab] = useState("register");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    userId: null,
  });

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Register new user
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email
    if (!newUser.email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      setIsSubmitting(false);
      return;
    }

    // Check if email already exists
    if (registeredUsers.some((user) => user.email === newUser.email)) {
      showToast("This email is already registered!", "error");
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Add new user to list
    const newUserObj = {
      id: Date.now(),
      email: newUser.email,
      role: newUser.role,
      fullName: newUser.fullName || "",
      registrationDate: new Date().toISOString().split("T")[0],
      status: "pending",
      inviteSent: false,
    };

    setRegisteredUsers([newUserObj, ...registeredUsers]);

    // Show success message
    showToast(`User ${newUser.email} has been registered successfully!`);

    // Reset form
    setNewUser({
      email: "",
      role: "student",
      fullName: "",
    });
    setTemporaryPassword("nextlib@123"); // Reset to default
    setIsSubmitting(false);
  };

  // Send invitation email
  const sendInvitation = (userId) => {
    setRegisteredUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? { ...user, inviteSent: true, status: "pending" }
          : user
      )
    );
    showToast("Invitation email sent successfully!");
  };

  // Delete user
  const handleDeleteClick = (userId) => {
    setConfirmModal({ isOpen: true, userId });
  };

  const confirmDelete = () => {
    setRegisteredUsers((users) =>
      users.filter((user) => user.id !== confirmModal.userId)
    );
    showToast("User registration deleted successfully");
  };

  // Handle edit (placeholder)
  const handleEdit = (user) => {
    // TODO: Implement edit functionality
    showToast(`Edit functionality for ${user.email} coming soon!`, "info");
  };

  // Filter users based on role, status, and search
  const filteredUsers = registeredUsers.filter((user) => {
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    const matchesSearch =
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  // Check if any filters are active
  const hasActiveFilters =
    selectedRole !== "all" || selectedStatus !== "all" || searchQuery !== "";

  // Clear all filters
  const clearFilters = () => {
    setSelectedRole("all");
    setSelectedStatus("all");
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType, value) => {
    if (filterType === "role") setSelectedRole(value);
    if (filterType === "status") setSelectedStatus(value);
    if (filterType === "search") setSearchQuery(value);
    setCurrentPage(1);
  };

  // Pagination navigation
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                User Registration Portal
              </h1>
              <p className="text-gray-600 mt-3 ml-1">
                Admin-only user registration system. Pre-register users before
                they can sign up.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-5 py-3 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="text-sm text-gray-500">Total Registered</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {registeredUsers.length}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap -mb-px">
                <button
                  className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition-all duration-200 ${
                    activeTab === "register"
                      ? "border-blue-500 text-blue-600 bg-blue-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("register")}
                >
                  <UserPlus className="w-4 h-4" />
                  Register New User
                </button>
                <button
                  className={`flex items-center gap-2 py-4 px-6 font-medium text-sm border-b-2 transition-all duration-200 ${
                    activeTab === "manage"
                      ? "border-blue-500 text-blue-600 bg-blue-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("manage")}
                >
                  <Users className="w-4 h-4" />
                  Manage Registered Users
                  <span className="ml-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {registeredUsers.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Registration Form Tab */}
        {activeTab === "register" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  Register New User
                </h2>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        Email Address
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="user@university.edu"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        User will sign up using this email address
                      </p>
                    </div>

                    {/* Role Selection */}
                    <div className="md:col-span-1">
                      <RoleSelector
                        selectedRole={newUser.role}
                        onRoleChange={(role) =>
                          setNewUser((prev) => ({ ...prev, role }))
                        }
                      />
                    </div>

                    {/* Optional Full Name */}
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        Full Name
                        <span className="text-xs font-normal text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full">
                          Optional
                        </span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={newUser.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="John Doe"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Can be added later by the user
                      </p>
                    </div>
                  </div>

                  {/* Password Generator */}
                  <PasswordGenerator
                    password={temporaryPassword}
                    onPasswordChange={setTemporaryPassword}
                  />

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Registering...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5" />
                          Register User
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Information Panel */}
            <div className="lg:col-span-1">
              <InfoPanel registeredUsers={registeredUsers} />
            </div>
          </div>
        )}

        {/* Manage Users Tab */}
        {activeTab === "manage" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 animate-fadeIn">
            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                      placeholder="Search by email or name..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleFilterChange("role", e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="librarian">Librarians</option>
                    <option value="admin">Admins</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-all duration-200"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                  </select>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <Filter className="w-4 h-4" />
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      User
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Registration Date
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
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

              {filteredUsers.length === 0 && (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No users found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredUsers.length > 0 && totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Info text */}
                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-800">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-800">
                      {Math.min(endIndex, filteredUsers.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-800">
                      {filteredUsers.length}
                    </span>{" "}
                    users
                  </div>

                  {/* Pagination buttons */}
                  <div className="flex items-center gap-2">
                    {/* Previous button */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          // Show first page, last page, current page, and pages around current
                          const showPage =
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1;

                          if (!showPage) {
                            // Show ellipsis
                            if (page === 2 || page === totalPages - 1) {
                              return (
                                <span key={page} className="px-2 text-gray-400">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }

                          return (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                                currentPage === page
                                  ? "bg-blue-600 text-white shadow-md"
                                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* Next button */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-transparent">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard
                  value={registeredUsers.length}
                  label="Total Registered"
                  bgColor="bg-blue-50"
                />
                <StatsCard
                  value={
                    registeredUsers.filter((u) => u.status === "active").length
                  }
                  label="Active Users"
                  bgColor="bg-green-50"
                />
                <StatsCard
                  value={
                    registeredUsers.filter((u) => u.status === "pending").length
                  }
                  label="Pending"
                  bgColor="bg-yellow-50"
                />
                <StatsCard
                  value={registeredUsers.filter((u) => u.inviteSent).length}
                  label="Invites Sent"
                  bgColor="bg-purple-50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Information Banner */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Security Notice</h3>
              <p className="text-gray-600 mb-4">
                This is an admin-only portal. Users can only sign up if their
                email is pre-registered here. After registration, users will
                receive an invitation to complete their account setup.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {[
                  "Email verification required for signup",
                  "Role-based access control enforced",
                  "Admins can revoke access anytime",
                  "All actions are logged for audit",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, userId: null })}
        onConfirm={confirmDelete}
        title="Delete Registration?"
        message="Are you sure you want to delete this user registration? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Registration;

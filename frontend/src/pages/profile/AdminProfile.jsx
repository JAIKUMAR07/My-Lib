import React from "react";
import {
  Shield,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  BarChart3,
  UserCheck,
  Bell,
  Database,
  Award,
  Crown,
  ShieldCheck,
} from "lucide-react";

const AdminProfile = ({ user }) => {
  // Mock data - replace with actual user data
  const adminData = {
    fullName: user?.full_name || user?.name || "Admin User",
    email: user?.email || "admin@library.com",
    phone: user?.phone || "+91 9876543210",
    adminId: user?.admin_id || "ADMIN-001",
    roleType: user?.role_type || "Super Admin",
    address: user?.address || "123 Library Street, City, State 12345",
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : "2023-01-15",

    // Stats
    totalUsers: 1450,
    totalBooks: 12500,
    activeBorrowings: 320,
    librarians: 15,
    departments: 8,
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "super_admin":
        return "app-danger-tint";
      case "admin":
        return "app-tint";
      default:
        return "app-muted-tint";
    }
  };

  return (
    <div className="soft-card overflow-hidden rounded-[2rem]">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-cyan-700 to-blue-700"></div>

        {/* Avatar Section */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <div
              className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(
                adminData.roleType
              )}`}
            >
              {adminData.roleType.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 pb-8 px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {adminData.fullName}
            </h1>
            <Crown className="w-6 h-6 text-cyan-700" />
          </div>
          <p className="text-gray-600">
            System Administrator • Library Management System
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="app-tint inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm">
              <ShieldCheck className="w-4 h-4" />
              Admin ID: {adminData.adminId}
            </span>
            <span className="app-success-tint inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm">
              <Award className="w-4 h-4" />
              Full System Access
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="app-muted-tint rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6 text-slate-700" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {adminData.totalUsers}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>

          <div className="app-accent-surface rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-cyan-700" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {adminData.totalBooks}
            </div>
            <div className="text-sm text-gray-600">Total Books</div>
          </div>

          <div className="app-success-tint rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <UserCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {adminData.librarians}
            </div>
            <div className="text-sm text-gray-600">Librarians</div>
          </div>
        </div>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Admin Information
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{adminData.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{adminData.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Award className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Admin ID</div>
                  <div className="font-medium">{adminData.adminId}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Contact Info
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium">{adminData.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="font-medium">{adminData.joinDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            System Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-700">
                {adminData.departments}
              </div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-700">
                {adminData.activeBorrowings}
              </div>
              <div className="text-sm text-gray-600">Active Borrowings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-700">8</div>
              <div className="text-sm text-gray-600">Branches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Admin Controls
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button className="app-muted-tint flex flex-col items-center justify-center rounded-xl p-4 transition">
              <Users className="mb-2 h-8 w-8 text-slate-700" />
              <span className="font-medium text-gray-800">Manage Users</span>
              <span className="text-xs text-gray-500">1450 users</span>
            </button>

            <button className="app-accent-surface flex flex-col items-center justify-center rounded-xl p-4 transition">
              <BookOpen className="mb-2 h-8 w-8 text-cyan-700" />
              <span className="font-medium text-gray-800">Manage Books</span>
              <span className="text-xs text-gray-500">12.5K books</span>
            </button>

            <button className="app-success-tint flex flex-col items-center justify-center rounded-xl p-4 transition">
              <BarChart3 className="mb-2 h-8 w-8 text-emerald-700" />
              <span className="font-medium text-gray-800">Analytics</span>
              <span className="text-xs text-gray-500">Reports & Stats</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="app-button-secondary flex items-center gap-2 rounded-lg px-4 py-2 transition">
              <Bell className="w-4 h-4" />
              Send Announcement
            </button>
            <button className="app-button-primary flex items-center gap-2 rounded-lg px-4 py-2 transition">
              <UserCheck className="w-4 h-4" />
              Add New Librarian
            </button>
            <button className="app-button-secondary flex items-center gap-2 rounded-lg px-4 py-2 transition">
              <Database className="w-4 h-4" />
              Backup System
            </button>
            <button className="app-button-danger flex items-center gap-2 rounded-lg px-4 py-2 transition">
              <Shield className="w-4 h-4" />
              Security Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

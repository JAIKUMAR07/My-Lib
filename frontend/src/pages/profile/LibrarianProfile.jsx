import React from "react";
import {
  UserCheck,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Users,
  Clock,
  Bell,
  CheckCircle,
  Award,
  Shield,
  BookMarked,
  ClipboardCheck,
  TrendingUp,
  BarChart3,
  Package,
  Scan,
  DollarSign, // Added for fines
} from "lucide-react";

const LibrarianProfile = ({ user }) => {
  // Mock data - replace with actual user data
  const librarianData = {
    fullName: user?.full_name || user?.name || "Librarian Name",
    email: user?.email || "librarian@library.com",
    phone: user?.phone || "+91 9876543210",
    staffId: user?.staff_id || "LIB-001",
    designation: user?.designation || "Senior Librarian",
    shiftTiming: user?.shift_timing || "9:00 AM - 5:00 PM",
    address: user?.address || "Library Building, Room 101",
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : "2023-03-10",

    // New Stats for Overview
    totalIssuedBooks: 5432,
    totalDueBooks: 287,
    totalFines: "$1250",
    totalMembersAssisted: 1234,

    // Performance Metrics (kept as they were not specified for removal)
    activeBorrowings: 156,
    pendingReturns: 42,
    efficiency: "94%",
    shiftHours: "40 hrs/week", // Kept for Work Details
    booksIssuedToday: 24, // Kept for Today's Activity Summary
    booksReturnedToday: 18, // Kept for Today's Activity Summary
  };

  const getDesignationColor = (designation) => {
    switch (designation.toLowerCase()) {
      case "senior librarian":
        return "bg-purple-100 text-purple-800";
      case "head librarian":
        return "bg-red-100 text-red-800";
      case "assistant librarian":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-purple-600 to-pink-600"></div>

        {/* Avatar Section */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <UserCheck className="w-16 h-16 text-white" />
              </div>
            </div>
            <div
              className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${getDesignationColor(
                librarianData.designation
              )}`}
            >
              {librarianData.designation.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 pb-8 px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {librarianData.fullName}
          </h1>
          <p className="text-gray-600">
            Library Staff • {librarianData.designation}
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
              <Award className="w-4 h-4" />
              Staff ID: {librarianData.staffId}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              <Clock className="w-4 h-4" />
              Shift: {librarianData.shiftTiming}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {librarianData.totalIssuedBooks}
            </div>
            <div className="text-sm text-gray-600">Total Issued Books</div>
          </div>

          <div className="bg-red-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {librarianData.totalDueBooks}
            </div>
            <div className="text-sm text-gray-600">Total Due Books</div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {librarianData.totalFines}
            </div>
            <div className="text-sm text-gray-600">Total Fines</div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {librarianData.totalMembersAssisted}
            </div>
            <div className="text-sm text-gray-600">Members Assisted</div>
          </div>
        </div>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Librarian Information
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{librarianData.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{librarianData.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Award className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Staff ID</div>
                  <div className="font-medium">{librarianData.staffId}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Work Details
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Address / Station</div>
                  <div className="font-medium">{librarianData.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="font-medium">{librarianData.joinDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Working Hours</div>
                  <div className="font-medium">{librarianData.shiftHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {librarianData.efficiency}
              </div>
              <div className="text-sm text-gray-600">Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {librarianData.activeBorrowings}
              </div>
              <div className="text-sm text-gray-600">Active Borrowings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {librarianData.pendingReturns}
              </div>
              <div className="text-sm text-gray-600">Pending Returns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">0</div>
              <div className="text-sm text-gray-600">Complaints</div>
            </div>
          </div>
        </div>

        {/* Librarian Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Library Management Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition">
              <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
              <span className="font-medium text-gray-800">Issue Books</span>
              <span className="text-xs text-gray-500">Student checkout</span>
            </button>

            <button className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <span className="font-medium text-gray-800">Accept Returns</span>
              <span className="text-xs text-gray-500">Process returns</span>
            </button>

            <button className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition">
              <ClipboardCheck className="w-8 h-8 text-blue-600 mb-2" />
              <span className="font-medium text-gray-800">
                Manage Inventory
              </span>
              <span className="text-xs text-gray-500">Book stock</span>
            </button>

            <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition">
              <Scan className="w-8 h-8 text-yellow-600 mb-2" />
              <span className="font-medium text-gray-800">Scan Item</span>
              <span className="text-xs text-gray-500">Quick scan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianProfile;

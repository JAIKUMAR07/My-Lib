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
  MapPin, // MapPin is already imported for Department - can reuse
  GraduationCap,
} from "lucide-react";

const StudentProfile = ({ user }) => {
  // Mock data - replace with actual user data
  const studentData = {
    fullName: user?.full_name || user?.name || "John Doe",
    email: user?.email || "john@example.com",
    rollNumber: user?.roll_number || "CS2023001",
    phone: user?.phone || "+91 9876543210",
    address: user?.address || "123 Library Lane, Bookville", // Added address
    course: user?.course || "Computer Science",
    department: user?.department || "Computer Science",
    session: user?.session || "2022 - 2026", // Changed from yearSemester to session
    membershipStatus: user?.membership_status || "active",
    libraryId: user?.library_id || "LIB-STU-001",
    joinDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : "2023-09-15",
    outstandingFines: user?.outstanding_fines || 0,
    totalBooksBorrowed: 5,
    booksDueSoon: 2,
    favoriteGenre: "Computer Science",
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>

        {/* Avatar Section */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            <div
              className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                studentData.membershipStatus
              )}`}
            >
              {studentData.membershipStatus.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 pb-8 px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {studentData.fullName}
          </h1>
          <p className="text-gray-600">Student • {studentData.course}</p>
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              <Award className="w-4 h-4" />
              Library ID: {studentData.libraryId}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {studentData.totalBooksBorrowed}
            </div>
            <div className="text-sm text-gray-600">Books Borrowed</div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {studentData.booksDueSoon}
            </div>
            <div className="text-sm text-gray-600">Due Soon</div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">
              ₹{studentData.outstandingFines}
            </div>
            <div className="text-sm text-gray-600">Outstanding Fines</div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-lg font-bold text-gray-800">Member Since</div>
            <div className="text-sm text-gray-600">{studentData.joinDate}</div>
          </div>
        </div>

        {/* Personal Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{studentData.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{studentData.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Roll Number</div>
                  <div className="font-medium">{studentData.rollNumber}</div>
                </div>
              </div>

              {/* Address Field */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium">{studentData.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <School className="w-5 h-5" />
              Academic Information
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Course</div>
                  <div className="font-medium">{studentData.course}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Department</div>
                  <div className="font-medium">{studentData.department}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Session</div>{" "}
                  {/* Changed label */}
                  <div className="font-medium">{studentData.session}</div>{" "}
                  {/* Changed data source */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
              <Book className="w-4 h-4" />
              Browse Books
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
              <CreditCard className="w-4 h-4" />
              Pay Fines
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
              <User className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

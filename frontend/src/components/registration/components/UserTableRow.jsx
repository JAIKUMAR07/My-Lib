import React from "react";
import {
  Shield,
  BookOpen,
  GraduationCap,
  User,
  Send,
  Edit,
  Trash2,
} from "lucide-react";

// Role configuration
const roleConfig = {
  admin: {
    icon: Shield,
    color: "bg-red-100 text-red-800",
    bgColor: "bg-red-100",
    label: "Admin",
    description: "Full system access",
  },
  librarian: {
    icon: BookOpen,
    color: "bg-purple-100 text-purple-800",
    bgColor: "bg-purple-100",
    label: "Librarian",
    description: "Library management",
  },
  student: {
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-800",
    bgColor: "bg-blue-100",
    label: "Student",
    description: "Book borrowing",
  },

  default: {
    icon: User,
    color: "bg-gray-100 text-gray-800",
    bgColor: "bg-gray-100",
    label: "User",
    description: "Basic access",
  },
};

// Status badge configuration
const statusConfig = {
  active: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  expired: "bg-red-100 text-red-800 border-red-200",
  default: "bg-gray-100 text-gray-800 border-gray-200",
};

const UserTableRow = ({ user, onSendInvite, onEdit, onDelete }) => {
  const roleDetails = roleConfig[user.role] || roleConfig.default;
  const RoleIcon = roleDetails.icon;
  const statusClass = statusConfig[user.status] || statusConfig.default;

  return (
    <tr className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-colors duration-200">
      {/* User Info */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            {user.fullName
              ? user.fullName.charAt(0).toUpperCase()
              : user.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-800">{user.email}</div>
            <div className="text-sm text-gray-500">
              {user.fullName || (
                <span className="italic text-gray-400">Name not set</span>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${roleDetails.bgColor}`}>
            <RoleIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-gray-800">{roleDetails.label}</div>
            <div className="text-xs text-gray-500">
              {roleDetails.description}
            </div>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${statusClass}`}
        >
          <span
            className={`w-2 h-2 rounded-full mr-2 ${
              user.status === "active"
                ? "bg-green-500"
                : user.status === "pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </td>

      {/* Registration Date */}
      <td className="py-4 px-6">
        <div className="text-gray-800">{user.registrationDate}</div>
        <div
          className={`text-xs mt-1 ${
            user.inviteSent ? "text-green-600" : "text-orange-500"
          }`}
        >
          {user.inviteSent ? "✓ Invite sent" : "○ Invite pending"}
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {/* Show Send/Resend for pending and expired users */}
          {(user.status === "pending" || user.status === "expired") && (
            <>
              {!user.inviteSent ? (
                <button
                  onClick={() => onSendInvite(user.id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 text-sm font-medium shadow-sm hover:shadow transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  Send Invite
                </button>
              ) : (
                <button
                  onClick={() => onSendInvite(user.id)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors duration-200 border border-blue-200"
                >
                  <Send className="w-4 h-4" />
                  Resend
                </button>
              )}
            </>
          )}
          {/* Show registered badge for active users */}
          {user.status === "active" && (
            <span className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
              ✓ Registered
            </span>
          )}
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Edit user"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete user"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;

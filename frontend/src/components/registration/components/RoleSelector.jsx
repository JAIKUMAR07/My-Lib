import React from "react";
import { GraduationCap, BookOpen, Shield } from "lucide-react";

const roles = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    color: "blue",
    borderColor: "border-blue-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "librarian",
    label: "Librarian",
    icon: BookOpen,
    color: "purple",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "admin",
    label: "Admin",
    icon: Shield,
    color: "red",
    borderColor: "border-red-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
];

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        User Role *
      </label>
      <div className="grid grid-cols-3 gap-3">
        {roles.map((role) => {
          const RoleIcon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onRoleChange(role.id)}
              className={`p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? `${role.borderColor} ${role.bgColor} shadow-md`
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <RoleIcon
                className={`w-6 h-6 mx-auto mb-2 transition-transform duration-200 ${
                  isSelected ? `${role.iconColor} scale-110` : "text-gray-400"
                }`}
              />
              <div
                className={`text-sm font-medium ${
                  isSelected ? role.iconColor : "text-gray-600"
                }`}
              >
                {role.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;

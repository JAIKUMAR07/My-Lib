import React from "react";
import { AlertCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Admin Registers User",
    description: "Add user email and assign role",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    number: 2,
    title: "User Receives Invitation",
    description: "Email with signup instructions",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
  {
    number: 3,
    title: "User Signs Up",
    description: "Uses registered email to create account",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    number: 4,
    title: "Complete Profile",
    description: "User fills remaining details after login",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
  },
];

const InfoPanel = ({ registeredUsers }) => {
  const stats = [
    {
      label: "Pending Signups",
      value: registeredUsers.filter((u) => u.status === "pending").length,
    },
    {
      label: "Active Users",
      value: registeredUsers.filter((u) => u.status === "active").length,
    },
    {
      label: "Students",
      value: registeredUsers.filter((u) => u.role === "student").length,
    },
    {
      label: "Librarians",
      value: registeredUsers.filter((u) => u.role === "librarian").length,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
        <div className="p-2 bg-blue-100 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600" />
        </div>
        How It Works
      </h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-start gap-3 group">
            <div
              className={`w-8 h-8 ${step.bgColor} rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`}
            >
              <span className={`${step.textColor} font-bold text-sm`}>
                {step.number}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">{step.title}</h4>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Quick Stats</h4>
        <div className="space-y-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-600">{stat.label}</span>
              <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;

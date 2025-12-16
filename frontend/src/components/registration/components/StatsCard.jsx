import React from "react";

const StatsCard = ({ value, label, bgColor = "bg-blue-50", icon: Icon }) => {
  return (
    <div
      className={`text-center p-4 ${bgColor} rounded-xl transition-transform duration-200 hover:scale-105`}
    >
      {Icon && (
        <div className="flex justify-center mb-2">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
      )}
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default StatsCard;

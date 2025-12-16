import React from "react";
import {
  BookOpen,
  AlertCircle,
  Clock,
  DollarSign,
  CreditCard,
} from "lucide-react";

const StatsOverview = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Borrowed</p>
            <p className="text-2xl font-bold text-gray-800">
              {stats.totalBorrowed}
            </p>
          </div>
          <BookOpen className="w-10 h-10 text-blue-500 opacity-70" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Overdue</p>
            <p className="text-2xl font-bold text-gray-800">{stats.overdue}</p>
          </div>
          <AlertCircle className="w-10 h-10 text-red-500 opacity-70" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow border-l-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Due This Week</p>
            <p className="text-2xl font-bold text-gray-800">
              {stats.dueThisWeek}
            </p>
          </div>
          <Clock className="w-10 h-10 text-yellow-500 opacity-70" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Fines</p>
            <p className="text-2xl font-bold text-gray-800">
              ₹{stats.totalFines}
            </p>
          </div>
          <DollarSign className="w-10 h-10 text-green-500 opacity-70" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Fines Paid</p>
            <p className="text-2xl font-bold text-gray-800">
              ₹{stats.totalPaid}
            </p>
          </div>
          <CreditCard className="w-10 h-10 text-purple-500 opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;

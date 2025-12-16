import React, { useState } from "react";
import { Mail, AlertCircle, CheckCircle, User, Building } from "lucide-react";
import PaginationControls from "./PaginationControls";

const OverdueStudents = ({ overdueStudents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          Students with Dues ({overdueStudents.length})
        </h2>
      </div>

      {overdueStudents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-green-50 rounded-xl border border-green-200 border-dashed mb-8">
          <CheckCircle className="w-12 h-12 mb-3 text-green-500 opacity-50" />
          <p className="text-lg font-medium text-green-700">
            No students with outstanding fines
          </p>
          <p className="text-sm text-green-600">
            Everyone has cleared their dues!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginate(overdueStudents).map((student, index) => (
              <div
                key={index}
                className="bg-white border border-red-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-50 p-2 rounded-full">
                      <User className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 leading-tight">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-500">{student.libId}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">{student.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Total Due
                      </p>
                      <span className="font-bold text-red-600 text-xl">
                        ₹{student.fineAmount}
                      </span>
                    </div>

                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium shadow-sm shadow-red-200">
                      Collect Fine
                    </button>
                    {/* Note: Clicking this could ideally take user to 'Fine Payment' tab with ID pre-filled. 
                        For now, it's a visual action or can be linked later. */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalItems={overdueStudents.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Summary */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Dues Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-red-600 mb-1">Students with Dues</p>
            <p className="text-2xl font-bold text-red-800">
              {overdueStudents.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-600 mb-1">
              Total Outstanding Amount
            </p>
            <p className="text-2xl font-bold text-red-800">
              ₹{overdueStudents.reduce((acc, curr) => acc + curr.fineAmount, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-red-600 mb-1">Highest Individual Fine</p>
            <p className="text-2xl font-bold text-red-800">
              ₹{Math.max(...overdueStudents.map((s) => s.fineAmount), 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueStudents;

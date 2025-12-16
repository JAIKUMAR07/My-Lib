import React, { useState } from "react";
import { FileClock, Inbox } from "lucide-react";
import PaginationControls from "./PaginationControls";

const FineHistory = ({ fineHistory }) => {
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
          <FileClock className="w-6 h-6 text-purple-600" />
          Due/Fine History
        </h2>
      </div>

      {fineHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
          <Inbox className="w-12 h-12 mb-3 opacity-20" />
          <p className="text-lg font-medium">No fine transactions found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Transaction ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Processed By
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginate(fineHistory).map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {record.transactionId}
                      </code>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {record.userName}
                    </td>
                    <td className="py-4 px-4 font-bold text-green-600">
                      ₹{record.amount}
                    </td>
                    <td className="py-4 px-4">{record.date}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {record.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {record.processedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalItems={fineHistory.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default FineHistory;

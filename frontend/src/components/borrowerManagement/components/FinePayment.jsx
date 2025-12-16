import React, { useState, useEffect, useRef } from "react";
import { Wallet, Search, Receipt, Info, User, Check } from "lucide-react";

const FinePayment = ({ users, setUsers, fineHistory, setFineHistory }) => {
  const [finePaymentData, setFinePaymentData] = useState({
    libId: "",
    amount: 0,
    remarks: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter users based on search
  const filteredUsers = finePaymentData.libId
    ? users.filter(
        (u) =>
          u.libId.toLowerCase().includes(finePaymentData.libId.toLowerCase()) ||
          u.name.toLowerCase().includes(finePaymentData.libId.toLowerCase())
      )
    : [];

  // Derived state for finding exact user (case-insensitive)
  const foundUser = users.find(
    (u) => u.libId.toLowerCase() === finePaymentData.libId.toLowerCase()
  );

  const handleSelectUser = (user) => {
    setFinePaymentData({
      ...finePaymentData,
      libId: user.libId,
      amount: 0, // Reset amount on new user selection
    });
    setShowDropdown(false);
  };

  const handlePayFine = () => {
    if (!foundUser) {
      alert("User not found!");
      return;
    }

    if (finePaymentData.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (finePaymentData.amount > foundUser.outstandingFines) {
      alert(
        `Amount exceeds outstanding fines (₹${foundUser.outstandingFines})`
      );
      return;
    }

    // Process payment
    // 1. Update user fines
    setUsers(
      users.map((u) =>
        u.id === foundUser.id
          ? {
              ...u,
              outstandingFines: u.outstandingFines - finePaymentData.amount,
            }
          : u
      )
    );

    // 2. Add to history
    const newFineRecord = {
      id: fineHistory.length + 1,
      transactionId: `FINE-2024-${String(fineHistory.length + 1).padStart(
        3,
        "0"
      )}`,
      userName: foundUser.name,
      userLibId: foundUser.libId,
      amount: finePaymentData.amount,
      date: new Date().toISOString().split("T")[0],
      type: "Fine Payment",
      processedBy: "Admin001",
      remarks: finePaymentData.remarks,
    };

    setFineHistory([newFineRecord, ...fineHistory]);

    // Reset form
    setFinePaymentData({ libId: "", amount: 0, remarks: "" });
    alert("Fine payment processed successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Wallet className="w-6 h-6 text-blue-600" />
        Fine Payment
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="space-y-6">
          <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Library ID or Student Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={finePaymentData.libId}
                onChange={(e) => {
                  setFinePaymentData({
                    ...finePaymentData,
                    libId: e.target.value,
                  });
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search by ID or Name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoComplete="off"
              />
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>

            {/* Search Dropdown Results */}
            {showDropdown &&
              finePaymentData.libId &&
              !foundUser &&
              filteredUsers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.libId}</p>
                        </div>
                      </div>
                      {user.outstandingFines > 0 && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                          Due: ₹{user.outstandingFines}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

            {/* Helper Text / User Not Found Feedback */}
            {finePaymentData.libId &&
              !foundUser &&
              filteredUsers.length === 0 && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  No matching users found
                </p>
              )}

            {/* Quick Hints for testing (only show when empty) */}
            {!finePaymentData.libId && (
              <div className="mt-3 text-sm text-gray-500">
                <p className="font-medium mb-1 flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  Suggestions (Students with dues):
                </p>
                <div className="flex flex-wrap gap-2">
                  {users
                    .filter((u) => u.outstandingFines > 0)
                    .slice(0, 3)
                    .map((u) => (
                      <button
                        key={u.id}
                        onClick={() => handleSelectUser(u)}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                      >
                        {u.libId} (₹{u.outstandingFines})
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* User Details Card */}
          {foundUser && (
            <div className="relative overflow-hidden p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <User className="w-32 h-32 text-blue-600" />
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {foundUser.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {foundUser.libId}
                  </p>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div>
                      <span className="text-gray-500 block">Department</span>
                      <span className="font-medium text-gray-700">
                        {foundUser.department}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Email</span>
                      <span className="font-medium text-gray-700">
                        {foundUser.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm text-gray-600 mb-1 block">
                    Outstanding Due
                  </span>
                  <span className="block text-3xl font-bold text-red-600">
                    ₹{foundUser.outstandingFines}
                  </span>
                  {foundUser.outstandingFines === 0 && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mt-2">
                      <Check className="w-3 h-3" /> No Dues
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500">₹</span>
              <input
                type="number"
                value={finePaymentData.amount}
                onChange={(e) =>
                  setFinePaymentData({
                    ...finePaymentData,
                    amount: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                disabled={!foundUser}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>
            <textarea
              value={finePaymentData.remarks}
              onChange={(e) =>
                setFinePaymentData({
                  ...finePaymentData,
                  remarks: e.target.value,
                })
              }
              disabled={!foundUser}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
              placeholder="Optional remarks..."
            />
          </div>

          <button
            onClick={handlePayFine}
            disabled={
              !foundUser ||
              finePaymentData.amount <= 0 ||
              finePaymentData.amount > (foundUser?.outstandingFines || 0)
            }
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:shadow-none"
          >
            <Receipt className="w-5 h-5" />
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinePayment;

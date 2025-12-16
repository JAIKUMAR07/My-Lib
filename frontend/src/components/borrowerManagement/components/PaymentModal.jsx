import React, { useState, useEffect } from "react";
import {
  CreditCard,
  AlertCircle,
  CheckCircle,
  BookOpen,
  User,
  Calendar,
  FileText,
  Clock,
} from "lucide-react";

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  paymentAmount,
  setPaymentAmount,
  processReturn,
  returnTransaction,
}) => {
  const [isPayNow, setIsPayNow] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (showPaymentModal) {
      setIsPayNow(false); // Default to "Pay Later"
      setPaymentAmount(0); // Default payment amount to 0 when "Pay Later" is active effectively
    }
  }, [showPaymentModal, setPaymentAmount]);

  // Handle Pay Now toggling
  const handlePaymentModeChange = (mode) => {
    if (mode === "now") {
      setIsPayNow(true);
      // Default to full fine amount when switching to Pay Now
      if (returnTransaction) {
        setPaymentAmount(
          returnTransaction.fineAmount - returnTransaction.paidAmount
        );
      }
    } else {
      setIsPayNow(false);
      setPaymentAmount(0); // Reset payment if paying later
    }
  };

  if (!showPaymentModal || !returnTransaction) return null;

  const totalFine = returnTransaction.fineAmount;
  const alreadyPaid = returnTransaction.paidAmount;
  const outstandingFine = totalFine - alreadyPaid;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all scale-100">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            confirm Return
          </h3>
          <div className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">
            {returnTransaction.transactionId}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* 1. Transaction Details Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-start gap-4 mb-4 border-b border-gray-100 pb-4">
              <div className="bg-blue-100 p-3 rounded-lg shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                  {returnTransaction.bookTitle}
                </h4>
                <p className="text-sm text-gray-500 font-mono">
                  ISBN: {returnTransaction.bookIsbn}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg shrink-0">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                  {returnTransaction.userName}
                </h4>
                <p className="text-sm text-gray-500 font-mono">
                  {returnTransaction.userLibId}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center bg-gray-50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Due:{" "}
                <span className="font-medium text-gray-800">
                  {returnTransaction.dueDate}
                </span>
              </div>
              <div className="text-right">
                {outstandingFine > 0 ? (
                  <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-sm border border-red-100">
                    Fine Due: ₹{outstandingFine}
                  </span>
                ) : (
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-sm border border-green-100">
                    No Dues
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. Payment Options (Only if there is a fine) */}
          {outstandingFine > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Preference
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => handlePaymentModeChange("later")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-all ${
                    !isPayNow
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100 ring-offset-1"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  Pay Later
                </button>
                <button
                  onClick={() => handlePaymentModeChange("now")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-all ${
                    isPayNow
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100 ring-offset-1"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Pay Now
                </button>
              </div>

              {/* Conditional Payment Section */}
              {isPayNow && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Amount to Pay
                    </label>
                    <span className="text-xs text-gray-500">
                      Max: ₹{outstandingFine}
                    </span>
                  </div>

                  <div className="relative mb-3">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) =>
                        setPaymentAmount(
                          Math.min(
                            outstandingFine,
                            Math.max(0, parseInt(e.target.value) || 0)
                          )
                        )
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-bold text-gray-800"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setPaymentAmount(Math.ceil(outstandingFine * 0.5))
                      }
                      className="flex-1 py-1.5 bg-white border border-gray-300 text-gray-600 rounded text-xs font-medium hover:bg-gray-100"
                    >
                      50% (₹{Math.ceil(outstandingFine * 0.5)})
                    </button>
                    <button
                      onClick={() => setPaymentAmount(outstandingFine)}
                      className="flex-1 py-1.5 bg-blue-100 border border-blue-200 text-blue-700 rounded text-xs font-medium hover:bg-blue-200"
                    >
                      Full (₹{outstandingFine})
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 py-3.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={processReturn}
              className="flex-1 py-3.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold shadow-md shadow-green-200 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <CheckCircle className="w-5 h-5" />
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

const toastTypes = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    iconColor: "text-green-600",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconColor: "text-red-600",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    iconColor: "text-blue-600",
  },
};

const Toast = ({ message, type = "success", onClose, duration = 5000 }) => {
  const config = toastTypes[type] || toastTypes.success;
  const Icon = config.icon;

  useEffect(() => {
    if (duration && message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md animate-slideIn ${config.bgColor} border ${config.borderColor} rounded-xl p-4 shadow-lg flex items-start gap-3`}
    >
      <Icon className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`} />
      <p className={`${config.textColor} flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className={`p-1 hover:bg-white/50 rounded-lg transition-colors ${config.textColor}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;

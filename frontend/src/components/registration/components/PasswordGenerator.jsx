import React, { useState, useEffect } from "react";
import {
  Key,
  Lock,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Check,
  Edit2,
} from "lucide-react";

const DEFAULT_PASSWORD = "nextlib@123";

const PasswordGenerator = ({ password, onPasswordChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editablePassword, setEditablePassword] = useState(
    password || DEFAULT_PASSWORD
  );

  // Initialize with default password on mount
  useEffect(() => {
    if (!password) {
      onPasswordChange(DEFAULT_PASSWORD);
    }
  }, []);

  // Sync editable password with prop
  useEffect(() => {
    setEditablePassword(password || DEFAULT_PASSWORD);
  }, [password]);

  const copyPassword = async () => {
    const pwdToCopy = password || DEFAULT_PASSWORD;
    if (pwdToCopy) {
      await navigator.clipboard.writeText(pwdToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setEditablePassword(newPassword);
    onPasswordChange(newPassword);
    setIsEditing(false);
  };

  const resetToDefault = () => {
    setEditablePassword(DEFAULT_PASSWORD);
    onPasswordChange(DEFAULT_PASSWORD);
    setIsEditing(false);
  };

  const handlePasswordEdit = (e) => {
    setEditablePassword(e.target.value);
  };

  const saveEditedPassword = () => {
    onPasswordChange(editablePassword);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditablePassword(password || DEFAULT_PASSWORD);
    setIsEditing(false);
  };

  const currentPassword = password || DEFAULT_PASSWORD;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-600" />
            Temporary Password
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Default:{" "}
            <code className="bg-gray-200 px-2 py-0.5 rounded text-xs font-mono">
              {DEFAULT_PASSWORD}
            </code>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetToDefault}
            className="px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            title="Reset to default"
          >
            Reset Default
          </button>
          <button
            type="button"
            onClick={generateRandomPassword}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Random
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Current Password:
          </span>
          {currentPassword === DEFAULT_PASSWORD && (
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
              Default
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            // Editable input
            <input
              type={showPassword ? "text" : "password"}
              value={editablePassword}
              onChange={handlePasswordEdit}
              className="flex-1 px-4 py-3 bg-white border border-blue-300 rounded-lg font-mono text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter custom password"
              autoFocus
            />
          ) : (
            // Display password
            <div className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg font-mono text-gray-800 shadow-inner">
              {showPassword
                ? currentPassword
                : "•".repeat(currentPassword.length)}
            </div>
          )}

          {/* Show/Hide toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-600" />
            ) : (
              <Eye className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Copy button */}
          <button
            type="button"
            onClick={copyPassword}
            className={`p-3 border rounded-lg transition-all duration-200 ${
              copied
                ? "border-green-500 bg-green-50 text-green-600"
                : "border-gray-200 hover:bg-gray-50 bg-white"
            }`}
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Edit/Save buttons */}
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={saveEditedPassword}
                className="p-3 border border-green-500 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                title="Save password"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="p-3 border border-gray-200 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                title="Cancel"
              >
                ✕
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors bg-white"
              title="Edit password"
            >
              <Edit2 className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
          <Check className="w-3 h-3 text-green-500" />
          Admin can edit or generate a new password for the user
        </p>
      </div>
    </div>
  );
};

export default PasswordGenerator;

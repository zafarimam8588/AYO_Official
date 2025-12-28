import React, { useEffect, useState } from "react";
import { X, AlertTriangle, Archive } from "lucide-react";
import type { UserData } from "@/types";

interface ArchiveUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (archiveReason?: string) => void;
  user: UserData | null;
  isArchiving: boolean;
}

export const ArchiveUserModal: React.FC<ArchiveUserModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  isArchiving,
}) => {
  const [archiveReason, setArchiveReason] = useState("");

  // Reset reason when modal closes
  useEffect(() => {
    if (!isOpen) {
      setArchiveReason("");
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!user) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(archiveReason.trim() || undefined);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-amber-50">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full">
                    <Archive className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Archive User
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  disabled={isArchiving}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50 p-1"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 sm:mb-6">
                  {/* Left side - Main content */}
                  <div>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                      Are you sure you want to archive this user? The user will
                      be removed from all active lists but their data will be
                      preserved.
                    </p>

                    {/* User Details */}
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-amber-400">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        {user.fullName}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {user.email}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.isProfileComplete
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          Profile{" "}
                          {user.isProfileComplete ? "Completed" : "Incomplete"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Info */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 h-fit">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-900 mb-1 text-sm sm:text-base">
                          What happens when you archive
                        </h4>
                        <ul className="text-amber-700 text-xs sm:text-sm space-y-1">
                          <li>- User will be removed from active lists</li>
                          <li>- User cannot log in anymore</li>
                          <li>- All data is preserved in archive</li>
                          <li>- You can view archived users separately</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Archive Reason */}
                <div className="mb-4">
                  <label
                    htmlFor="archiveReason"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Archive Reason (Optional)
                  </label>
                  <textarea
                    id="archiveReason"
                    value={archiveReason}
                    onChange={(e) => setArchiveReason(e.target.value)}
                    placeholder="Enter a reason for archiving this user..."
                    maxLength={500}
                    rows={3}
                    disabled={isArchiving}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {archiveReason.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 p-4 sm:p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={onClose}
                  disabled={isArchiving}
                  className="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isArchiving}
                  className="px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isArchiving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Archiving...</span>
                    </>
                  ) : (
                    <>
                      <Archive className="w-4 h-4" />
                      <span>Archive User</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

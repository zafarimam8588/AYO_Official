import React, { useEffect } from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import type { UserData } from "@/types";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: UserData | null;
  isDeleting: boolean;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  isDeleting,
}) => {
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

  if (!user) return null;

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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto my-8 overflow-hidden max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Delete User
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  disabled={isDeleting}
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
                      Are you sure you want to delete this user? This action
                      cannot be undone.
                    </p>

                    {/* User Details */}
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-red-400">
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

                  {/* Right side - Warning */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 h-fit">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-900 mb-1 text-sm sm:text-base">
                          Warning: This action is irreversible
                        </h4>
                        <p className="text-red-700 text-xs sm:text-sm">
                          All user data, including profile information and
                          membership status, will be permanently deleted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 p-4 sm:p-6 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2 text-sm sm:text-base order-1 sm:order-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Delete User</span>
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

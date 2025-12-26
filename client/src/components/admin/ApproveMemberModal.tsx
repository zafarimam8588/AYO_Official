import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ApproveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message?: string) => void;
  submitting: boolean;
  memberName?: string;
}

export const ApproveMemberModal = ({
  isOpen,
  onClose,
  onConfirm,
  submitting,
  memberName,
}: ApproveMemberModalProps) => {
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(message.trim() || undefined);
    setMessage("");
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={handleClose}
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
            onClick={handleClose}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Approve Member
                    </h3>
                    <p className="text-sm text-gray-500">
                      {memberName
                        ? `Approving ${memberName}`
                        : "Confirm member approval"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                  disabled={submitting}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Confirmation:</strong> You are about to approve
                      this member's application. They will gain access to member
                      benefits and resources.
                    </p>
                  </div>

                  <label
                    htmlFor="approvalMessage"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Welcome Message (Optional)
                  </label>
                  <textarea
                    id="approvalMessage"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a personal welcome message for the new member..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                    rows={3}
                    disabled={submitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This message will be included in the approval notification.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Approving...
                      </div>
                    ) : (
                      "Approve Member"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

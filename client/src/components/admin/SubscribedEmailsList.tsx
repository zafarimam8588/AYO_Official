import React, { useState, useEffect } from "react";
import { Mail, Calendar, Download, Send, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { SubscribedEmail } from "@/types/subscribedEmail";

interface SubscribedEmailsListProps {
  emails: SubscribedEmail[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onSendEmailToAll: (subject: string, message: string) => Promise<void>;
}

export const SubscribedEmailsList: React.FC<SubscribedEmailsListProps> = ({
  emails,
  loading,
  onDelete,
  onSendEmailToAll,
}) => {
  const [showSendModal, setShowSendModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showSendModal || deleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSendModal, deleteModalOpen]);

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      toast.error("Please enter both subject and message");
      return;
    }

    try {
      setIsSending(true);
      await onSendEmailToAll(emailSubject, emailMessage);
      toast.success(`Email sent to ${emails.length} subscribers!`);
      setShowSendModal(false);
      setEmailSubject("");
      setEmailMessage("");
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setEmailToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!emailToDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(emailToDelete);
      toast.success("Email deleted successfully");
      setDeleteModalOpen(false);
      setEmailToDelete(null);
    } catch (error) {
      toast.error("Failed to delete email");
    } finally {
      setIsDeleting(false);
    }
  };

  const downloadEmails = () => {
    try {
      const emailList = emails.map((email) => email.email).join("\n");
      const blob = new Blob([emailList], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "subscribed-emails.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        `Downloaded ${emails.length} email addresses successfully!`,
        {
          icon: "📥",
          duration: 3000,
        }
      );
    } catch (error) {
      toast.error("Failed to download emails. Please try again.");
    }
  };

  const copyAllEmails = async () => {
    try {
      const emailList = emails.map((email) => email.email).join(", ");
      await navigator.clipboard.writeText(emailList);

      toast.success(`Copied ${emails.length} email addresses to clipboard!`, {
        icon: "📋",
        duration: 3000,
      });
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      try {
        const emailList = emails.map((email) => email.email).join(", ");
        const textArea = document.createElement("textarea");
        textArea.value = emailList;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        toast.success(`Copied ${emails.length} email addresses to clipboard!`, {
          icon: "📋",
          duration: 3000,
        });
      } catch (fallbackError) {
        toast.error("Failed to copy emails. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No subscribed emails found</p>
        <p className="text-gray-400 text-sm mt-2">
          Users who subscribe to your newsletter will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Subscribed Emails
          </h2>
          <p className="text-gray-600">
            Total subscribers:{" "}
            <span className="font-semibold text-blue-600">{emails.length}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowSendModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-colors duration-200 font-medium text-sm flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
            Send to All
          </button>
          <button
            onClick={copyAllEmails}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm flex items-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            Copy All
          </button>
          <button
            onClick={downloadEmails}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-sm flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Email list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emails.map((emailData) => (
          <div
            key={emailData._id}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {emailData.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteClick(emailData._id)}
                className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete email"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                Subscribed: {new Date(emailData.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(emailData.email);
                    toast.success("Email copied to clipboard!", {
                      icon: "📋",
                      duration: 2000,
                    });
                  } catch (error) {
                    toast.error("Failed to copy email");
                  }
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                Copy email
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Send Email Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 pt-20 pb-4 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mb-4 transform transition-all max-h-[calc(100vh-7rem)] flex flex-col">
            {/* Fixed Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-green-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Send Email to All Subscribers
                  </h3>
                  <p className="text-sm text-gray-600">
                    This email will be sent to {emails.length} subscribers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSendModal(false)}
                disabled={isSending}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-all cursor-pointer flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject..."
                    disabled={isSending}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    disabled={isSending}
                    className="w-full min-h-[300px] resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tip: Use line breaks for better formatting
                  </p>
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setShowSendModal(false)}
                disabled={isSending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                disabled={
                  isSending || !emailSubject.trim() || !emailMessage.trim()
                }
                className="flex-1 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 pt-20 pb-4 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mb-4 transform transition-all">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Delete Subscribed Email
              </h3>

              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to remove this email from your subscriber
                list? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

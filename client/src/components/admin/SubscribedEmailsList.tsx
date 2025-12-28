import React, { useState, useEffect } from "react";
import {
  Mail,
  Calendar,
  Download,
  Send,
  Trash2,
  X,
  Copy,
  Users,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { SubscribedEmail } from "@/types/subscribedEmail";
import { EmailCardSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/utils";

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
    } catch {
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
    if (!emailToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(emailToDelete);
      toast.success("Email deleted successfully");
      setDeleteModalOpen(false);
      setEmailToDelete(null);
    } catch {
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

      toast.success(`Downloaded ${emails.length} email addresses!`);
    } catch {
      toast.error("Failed to download emails");
    }
  };

  const copyAllEmails = async () => {
    try {
      const emailList = emails.map((email) => email.email).join(", ");
      await navigator.clipboard.writeText(emailList);
      toast.success(`Copied ${emails.length} emails to clipboard!`);
    } catch {
      try {
        const emailList = emails.map((email) => email.email).join(", ");
        const textArea = document.createElement("textarea");
        textArea.value = emailList;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success(`Copied ${emails.length} emails to clipboard!`);
      } catch {
        toast.error("Failed to copy emails");
      }
    }
  };

  if (loading) {
    return <EmailCardSkeleton count={6} />;
  }

  if (emails.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 text-lg">No subscribed emails found</p>
        <p className="text-slate-400 text-sm mt-2">
          Users who subscribe to your newsletter will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats & Actions Header */}
      <div className="space-y-4">
        {/* Total Count */}
        <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-200">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700">
              <span className="font-semibold">{emails.length}</span> Total
              Subscribers
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setShowSendModal(true)}
            className="bg-india-green-500 hover:bg-india-green-600 text-white gap-2"
          >
            <Send className="w-4 h-4" />
            Send to All
          </Button>
          <Button
            variant="outline"
            onClick={copyAllEmails}
            className="gap-2 border-slate-200 hover:bg-slate-50"
          >
            <Copy className="w-4 h-4" />
            Copy All
          </Button>
          <Button
            variant="outline"
            onClick={downloadEmails}
            className="gap-2 border-slate-200 hover:bg-slate-50"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Email List */}
      <div className="space-y-3">
        {emails.map((emailData) => (
          <div
            key={emailData._id}
            className="bg-slate-50 hover:bg-purple-50/50 rounded-xl p-4 transition-colors duration-200 border border-slate-200 hover:border-purple-300"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="p-2 bg-purple-100 rounded-full flex-shrink-0">
                  <Mail className="w-4 h-4 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {emailData.email}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(emailData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(emailData.email);
                      toast.success("Email copied!");
                    } catch {
                      toast.error("Failed to copy");
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Copy email"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(emailData._id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete email"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Send Email Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 pt-20 pb-4 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mb-4 transform transition-all max-h-[calc(100vh-7rem)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-india-green-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-india-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Send Email to All Subscribers
                  </h3>
                  <p className="text-sm text-slate-600">
                    This email will be sent to {emails.length} subscribers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSendModal(false)}
                disabled={isSending}
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full p-1 transition-all cursor-pointer flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject..."
                    disabled={isSending}
                    className="w-full border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    disabled={isSending}
                    className="w-full min-h-[250px] resize-none border-slate-200"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Use line breaks for better formatting
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-slate-200 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setShowSendModal(false)}
                disabled={isSending}
                className="flex-1 border-slate-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                disabled={
                  isSending || !emailSubject.trim() || !emailMessage.trim()
                }
                className={cn(
                  "flex-1 bg-india-green-500 hover:bg-india-green-600 text-white",
                  (isSending || !emailSubject.trim() || !emailMessage.trim()) &&
                    "opacity-50"
                )}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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

              <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                Delete Subscriber
              </h3>

              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to remove this email from your subscriber
                list? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 border-slate-200"
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
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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

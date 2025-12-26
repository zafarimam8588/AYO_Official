import { useState } from "react";
import {
  X,
  Mail,
  Calendar,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { replyToContactMessage } from "@/services/contactMessageService";
import type { ContactMessage } from "@/types";
import toast from "react-hot-toast";

interface MessageDetailModalProps {
  message: ContactMessage;
  open: boolean;
  onClose: () => void;
}

export default function MessageDetailModal({
  message,
  open,
  onClose,
}: MessageDetailModalProps) {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  if (!open) return null;

  const handleReply = async () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      setIsReplying(true);
      const response = await replyToContactMessage(message._id, {
        reply: replyText,
      });

      if (response.success) {
        toast.success(
          "Reply sent successfully! Email notification has been sent."
        );
        setReplyText("");
        setShowReplyForm(false);
        onClose();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-green-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{message.subject}</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {message.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(
                    new Date(message.createdAt),
                    "MMM dd, yyyy 'at' hh:mm a"
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Message */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Message from {message.name}
              </h3>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>

          {/* Existing Replies */}
          {message.replies && message.replies.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Replies ({message.replies.length})
                </h3>
              </div>
              <div className="space-y-3">
                {message.replies.map((reply, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-200 rounded-xl p-4"
                  >
                    <p className="text-sm text-gray-500 mb-2">
                      Replied on{" "}
                      {format(
                        new Date(reply.repliedAt),
                        "MMM dd, yyyy 'at' hh:mm a"
                      )}
                    </p>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {reply.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reply Form */}
          {!showReplyForm && (
            <Button
              onClick={() => setShowReplyForm(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600"
            >
              <Send className="w-4 h-4 mr-2" />
              Reply to Message
            </Button>
          )}

          {showReplyForm && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Reply
                </label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  className="min-h-[150px] border-2 border-slate-200 focus:border-orange-400 rounded-xl"
                  disabled={isReplying}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleReply}
                  disabled={isReplying || !replyText.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600"
                >
                  {isReplying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText("");
                  }}
                  disabled={isReplying}
                >
                  Cancel
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Note: An email notification will be sent to{" "}
                <strong>{message.email}</strong> when you send this reply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Phone,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  getContactMessageById,
  replyToContactMessage,
} from "@/services/contactMessageService";
import type { ContactMessage } from "@/types";
import toast from "react-hot-toast";

export default function MessageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const fetchMessage = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await getContactMessageById(id);
      if (response.success) {
        setMessage(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching message:", error);
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to load message");
        navigate("/admin/messages");
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  const handleReply = async () => {
    if (!replyText.trim() || !id) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      setIsReplying(true);
      const response = await replyToContactMessage(id, { reply: replyText });

      if (response.success) {
        toast.success("Reply sent successfully! Email notification sent.");
        setReplyText("");

        // Refresh message to get updated replies from backend
        fetchMessage();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setIsReplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading message...</p>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Message not found</p>
          <Button onClick={() => navigate("/admin/messages")}>
            Back to Messages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-green-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/messages")}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Messages
          </Button>
        </div>

        {/* Message Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Message Header */}
          <div className="bg-gradient-to-r from-orange-100 to-green-100 text-gray-800 p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {message.subject}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-600" />
                <span>{message.email}</span>
              </div>
              {message.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>{message.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span>
                  {format(
                    new Date(message.createdAt),
                    "MMM dd, yyyy 'at' hh:mm a"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Original Message */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                <span className="text-orange-700 font-semibold text-lg">
                  {message.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{message.name}</p>
                <p className="text-sm text-gray-500">Sender</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>

          {/* Replies Section */}
          {message.replies && message.replies.length > 0 && (
            <div className="p-6 border-b border-gray-200 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Replies ({message.replies.length})
              </h3>
              {message.replies.map((reply, index) => (
                <div key={index} className="border-l-4 border-green-400 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-gray-500">
                      Admin replied on{" "}
                      {format(
                        new Date(reply.repliedAt),
                        "MMM dd, yyyy 'at' hh:mm a"
                      )}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg p-4 border border-green-200">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {reply.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply Form */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-orange-50/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {message.replies && message.replies.length > 0
                ? "Send Another Reply"
                : "Reply to Message"}
            </h3>
            <div className="space-y-4">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="min-h-[150px] border-2 border-gray-200 focus:border-orange-400 rounded-lg bg-white"
                disabled={isReplying}
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleReply}
                  disabled={isReplying || !replyText.trim()}
                  className="flex-1 sm:flex-initial bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white"
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
                  onClick={() => navigate("/admin/messages")}
                  disabled={isReplying}
                >
                  Close
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                💡 An email notification will be sent to{" "}
                <strong>{message.email}</strong> when you send this reply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

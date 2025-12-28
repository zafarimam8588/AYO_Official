import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Phone,
  Send,
  CheckCircle,
  User,
  Loader2,
  MessageSquare,
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
import { cn } from "@/lib/utils";

export default function MessageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const fetchMessage = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      const response = await getContactMessageById(id);
      if (response.success) {
        setMessage(response.data);
      }
    } catch (error: unknown) {
      console.error("Error fetching message:", error);
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 401) {
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
        toast.success("Reply sent successfully!");
        setReplyText("");
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-india-green-500 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading message...</p>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 mb-4">Message not found</p>
          <Button
            variant="outline"
            onClick={() => navigate("/admin/messages")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Messages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-[60px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/messages")}
            className="text-slate-600 hover:text-slate-900 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Messages
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto sm:px-4 py-4 sm:py-6">
          {/* Subject Header */}
          <div className="bg-white rounded-none sm:rounded-xl border-y sm:border border-slate-200 sm:shadow-sm overflow-hidden mb-4">
            <div className="p-4 sm:p-6 border-b border-slate-100">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                {message.subject}
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{message.email}</span>
                </div>
                {message.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{message.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    {format(
                      new Date(message.createdAt),
                      "MMM dd, yyyy 'at' h:mm a"
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Original Message */}
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-saffron-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{message.name}</p>
                  <p className="text-xs text-slate-500">Sender</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {message.message}
                </p>
              </div>
            </div>
          </div>

          {/* Replies Section */}
          {message.replies && message.replies.length > 0 && (
            <div className="bg-white rounded-none sm:rounded-xl border-y sm:border border-slate-200 sm:shadow-sm overflow-hidden mb-4">
              <div className="p-4 sm:p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-india-green-500" />
                  Replies ({message.replies.length})
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                {message.replies.map((reply, index) => (
                  <div
                    key={index}
                    className={cn(
                      "border-l-3 border-india-green-400 pl-4",
                      index !== message.replies!.length - 1 &&
                        "pb-4 border-b border-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-india-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-india-green-600" />
                      </div>
                      <p className="text-xs text-slate-500">
                        Admin replied on{" "}
                        {format(
                          new Date(reply.repliedAt),
                          "MMM dd, yyyy 'at' h:mm a"
                        )}
                      </p>
                    </div>
                    <div className="bg-india-green-50 rounded-lg p-4 border border-india-green-100">
                      <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {reply.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reply Form */}
          <div className="bg-white rounded-none sm:rounded-xl border-y sm:border border-slate-200 sm:shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">
                {message.replies && message.replies.length > 0
                  ? "Send Another Reply"
                  : "Reply to Message"}
              </h3>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="min-h-[120px] border-slate-200 focus:border-india-green-400 focus:ring-india-green-400 bg-white resize-none"
                disabled={isReplying}
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleReply}
                  disabled={isReplying || !replyText.trim()}
                  className="flex-1 sm:flex-initial bg-india-green-500 hover:bg-india-green-600 text-white"
                >
                  {isReplying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
                  className="border-slate-200"
                >
                  Cancel
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                An email notification will be sent to{" "}
                <span className="font-medium text-slate-700">
                  {message.email}
                </span>{" "}
                when you send this reply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

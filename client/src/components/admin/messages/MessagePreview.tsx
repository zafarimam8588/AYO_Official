import { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Send,
  Trash2,
  Loader2,
  User,
} from "lucide-react";
import { format } from "date-fns";
import type { ContactMessage } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface MessagePreviewProps {
  message: ContactMessage | null;
  onReply: (messageId: string, replyText: string) => Promise<void>;
  onDelete: (messageId: string) => void;
  isReplying: boolean;
}

export function MessagePreview({
  message,
  onReply,
  onDelete,
  isReplying,
}: MessagePreviewProps) {
  const [replyText, setReplyText] = useState("");

  if (!message) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 border-l border-slate-200">
        <div className="text-center px-4">
          <div className="p-4 bg-slate-100 rounded-full inline-block mb-4">
            <Mail className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-600 mb-1">
            Select a message
          </h3>
          <p className="text-sm text-slate-400">
            Choose a message from the list to view its contents
          </p>
        </div>
      </div>
    );
  }

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      return;
    }
    await onReply(message._id, replyText);
    setReplyText("");
  };

  return (
    <div className="flex-1 flex flex-col bg-white border-l border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
              {message.subject}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <div className="flex items-center gap-1.5 text-slate-600">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{message.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{message.email}</span>
              </div>
              {message.phone && (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{message.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(message.createdAt), "PPp")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {message.status === "replied" && (
              <Badge variant="success" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                Replied
              </Badge>
            )}
            {message.status === "unread" && (
              <Badge variant="default" className="bg-blue-500">
                New
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(message._id)}
              className="text-slate-500 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Message Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Original Message */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-saffron-600">
                {message.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                {message.name}
              </p>
              <p className="text-xs text-slate-400">Original message</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {message.message}
            </p>
          </div>
        </div>

        {/* Replies */}
        {message.replies && message.replies.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-india-green-500" />
              Replies ({message.replies.length})
            </h3>
            {message.replies.map((reply, index) => (
              <div
                key={index}
                className="border-l-2 border-india-green-400 pl-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-india-green-100 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-india-green-600" />
                  </div>
                  <span className="text-xs text-slate-400">
                    {format(new Date(reply.repliedAt), "PPp")}
                  </span>
                </div>
                <div className="bg-india-green-50 rounded-xl p-4 border border-india-green-100">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {reply.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Form */}
      <div className="flex-shrink-0 p-4 border-t border-slate-200 bg-white">
        <div className="space-y-3">
          <Textarea
            placeholder="Type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Reply will be sent to {message.email}
            </p>
            <Button
              variant="green"
              onClick={handleSubmitReply}
              disabled={!replyText.trim() || isReplying}
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
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  CheckCircle,
  MessageCircle,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  getAllContactMessages,
  deleteContactMessage,
} from "@/services/contactMessageService";
import type { ContactMessage } from "@/types";
import toast from "react-hot-toast";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">(
    "all"
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const statusFilter = filter === "all" ? undefined : filter;
      const response = await getAllContactMessages(
        currentPage,
        10,
        statusFilter as any
      );

      if (response.success) {
        setMessages(response.data);
        setTotalPages(response.pagination.totalPages);
      }
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
        // Clear token and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (error.response?.status === 403) {
        toast.error("Admin access required");
        navigate("/dashboard");
      } else {
        toast.error(error.response?.data?.message || "Failed to load messages");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, filter, navigate]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleViewMessage = (message: ContactMessage) => {
    navigate(`/admin/messages/${message._id}`);
  };

  const handleDeleteClick = (id: string) => {
    setMessageToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;

    try {
      setIsDeleting(true);
      const response = await deleteContactMessage(messageToDelete);
      if (response.success) {
        toast.success("Message deleted successfully");
        setDeleteModalOpen(false);
        setMessageToDelete(null);
        fetchMessages();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setMessageToDelete(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return (
          <Badge variant="default" className="bg-blue-500 text-xs px-2 py-0">
            New
          </Badge>
        );
      case "read":
        return (
          <Badge
            variant="secondary"
            className="text-xs px-2 py-0 hidden sm:inline-flex"
          >
            Read
          </Badge>
        );
      case "replied":
        return (
          <Badge variant="default" className="bg-green-500 text-xs px-2 py-0">
            ✓
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs px-2 py-0">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Messages
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {messages.length} {filter !== "all" && filter} message
            {messages.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter Tabs - Gmail Style */}
        <div className="bg-white rounded-lg shadow-sm mb-3 sm:mb-4 p-2 flex flex-wrap gap-1 sm:gap-2 border border-gray-200">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setFilter("all");
              setCurrentPage(1);
            }}
            className={
              filter === "all"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }
          >
            <Mail className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">All</span>
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setFilter("unread");
              setCurrentPage(1);
            }}
            className={
              filter === "unread"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }
          >
            <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Unread</span>
          </Button>
          <Button
            variant={filter === "read" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setFilter("read");
              setCurrentPage(1);
            }}
            className={
              filter === "read"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }
          >
            <Eye className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Read</span>
          </Button>
          <Button
            variant={filter === "replied" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setFilter("replied");
              setCurrentPage(1);
            }}
            className={
              filter === "replied"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }
          >
            <CheckCircle className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Replied</span>
          </Button>
        </div>

        {/* Messages List - Gmail Style Compact */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-12 sm:py-16 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">
              Loading messages...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-12 sm:py-16 text-center">
            <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-base sm:text-lg font-medium">
              No messages found
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Messages will appear here when you receive them
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {messages.map((message) => (
                <div
                  key={message._id}
                  onClick={() => handleViewMessage(message)}
                  className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 cursor-pointer transition-colors group relative ${
                    message.status === "unread" ? "bg-blue-50/30" : ""
                  }`}
                >
                  {/* Status Dot */}
                  <div className="flex-shrink-0 w-2">
                    {message.status === "unread" && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {/* Top Row: Name, Badge, Time, Delete */}
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <p
                          className={`text-sm sm:text-base truncate ${
                            message.status === "unread"
                              ? "font-semibold text-gray-900"
                              : "font-medium text-gray-700"
                          }`}
                        >
                          {message.name}
                        </p>
                        <div className="flex-shrink-0">
                          {getStatusBadge(message.status)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <p className="text-xs text-gray-500 whitespace-nowrap hidden sm:block">
                          {format(new Date(message.createdAt), "MMM dd")}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(message._id);
                          }}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 h-7 w-7 sm:h-8 sm:w-8 p-0 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Subject */}
                    <p
                      className={`text-xs sm:text-sm truncate mb-0.5 sm:mb-1 ${
                        message.status === "unread"
                          ? "font-medium text-gray-900"
                          : "text-gray-600"
                      }`}
                    >
                      {message.subject}
                    </p>

                    {/* Message Preview */}
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {message.message}
                    </p>

                    {/* Mobile Date */}
                    <p className="text-xs text-gray-400 mt-1 sm:hidden">
                      {format(new Date(message.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination - Mobile Optimized */}
        {totalPages > 1 && (
          <div className="mt-4 sm:mt-6 flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-1" />
              <span className="hidden xs:inline">Prev</span>
              <span className="hidden sm:inline">ious</span>
            </Button>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Message
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 border-gray-300 hover:bg-gray-50"
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
      )}
    </div>
  );
}

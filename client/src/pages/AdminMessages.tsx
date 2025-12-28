import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getAllContactMessages,
  deleteContactMessage,
  replyToContactMessage,
  getContactMessageStats,
} from "@/services/contactMessageService";
import type { ContactMessage } from "@/types";
import {
  MessageHeader,
  MessageFilters,
  MessagesList,
  MessagePreview,
  DeleteModal,
} from "@/components/admin/messages";
import { useMediaQuery } from "@/hooks/use-mobile";

type FilterType = "all" | "unread" | "read" | "replied";

export default function AdminMessagesPage() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Data state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  // UI state
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );

  // Action state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const statusFilter = filter === "all" ? undefined : filter;
      const response = await getAllContactMessages(
        currentPage,
        10,
        statusFilter as "unread" | "read" | "replied" | undefined
      );

      if (response.success) {
        setMessages(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalMessages(response.pagination.totalMessages);

        // Auto-select first message on desktop if none selected
        if (isDesktop && !selectedMessage && response.data.length > 0) {
          setSelectedMessage(response.data[0]);
        }
      }
    } catch (error: unknown) {
      console.error("Error fetching messages:", error);
      const err = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (err.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (err.response?.status === 403) {
        toast.error("Admin access required");
        navigate("/dashboard");
      } else {
        toast.error(err.response?.data?.message || "Failed to load messages");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, filter, navigate, isDesktop, selectedMessage]);

  // Fetch unread count
  const fetchStats = useCallback(async () => {
    try {
      const response = await getContactMessageStats();
      if (response.success) {
        setUnreadCount(response.data.unread);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [fetchMessages, fetchStats]);

  // Client-side search filtering
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) {
      return messages;
    }

    const query = searchQuery.toLowerCase();
    return messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.subject.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query)
    );
  }, [messages, searchQuery]);

  // Handlers
  const handleSelectMessage = (message: ContactMessage) => {
    if (isDesktop) {
      setSelectedMessage(message);
    } else {
      // Navigate to detail page on mobile/tablet
      navigate(`/admin/messages/${message._id}`);
    }
  };

  const handleDeleteClick = (id: string) => {
    setMessageToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await deleteContactMessage(messageToDelete);
      if (response.success) {
        toast.success("Message deleted successfully");
        setDeleteModalOpen(false);
        setMessageToDelete(null);

        // Clear selection if deleted message was selected
        if (selectedMessage?._id === messageToDelete) {
          setSelectedMessage(null);
        }

        fetchMessages();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReply = async (messageId: string, replyText: string) => {
    try {
      setIsReplying(true);
      const response = await replyToContactMessage(messageId, {
        reply: replyText,
      });

      if (response.success) {
        toast.success("Reply sent successfully");
        // Update the selected message with new reply
        setSelectedMessage(response.data);
        // Refresh the list to update status
        fetchMessages();
        fetchStats();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    } finally {
      setIsReplying(false);
    }
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setSelectedMessage(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <MessageHeader unreadCount={unreadCount} totalCount={totalMessages} />

      {/* Filters */}
      <MessageFilters
        filter={filter}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content - Two-column on desktop */}
      <div className="flex-1 flex overflow-hidden">
        {/* Messages List */}
        <div
          className={`${isDesktop ? "w-[400px] flex-shrink-0" : "flex-1"} bg-white border-r border-slate-200 flex flex-col`}
        >
          <MessagesList
            messages={filteredMessages}
            selectedId={selectedMessage?._id || null}
            onSelect={handleSelectMessage}
            onDelete={handleDeleteClick}
            loading={loading}
            filter={filter}
            hasSearch={searchQuery.length > 0}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Message Preview - Desktop only */}
        {isDesktop && (
          <MessagePreview
            message={selectedMessage}
            onReply={handleReply}
            onDelete={handleDeleteClick}
            isReplying={isReplying}
          />
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setMessageToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}

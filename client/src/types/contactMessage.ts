export interface ContactMessageReply {
  text: string;
  repliedAt: Date;
  repliedBy: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  replies: ContactMessageReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessageFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactMessageReplyData {
  reply: string;
}

export interface ContactMessageStats {
  total: number;
  unread: number;
  read: number;
  replied: number;
}

export interface ContactMessagesResponse {
  success: boolean;
  data: ContactMessage[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalMessages: number;
    messagesPerPage: number;
  };
}

export interface ContactMessageResponse {
  success: boolean;
  data: ContactMessage;
  message?: string;
}

export interface ContactMessageStatsResponse {
  success: boolean;
  data: ContactMessageStats;
}

import axios from "axios";
import type {
  ContactMessageFormData,
  ContactMessageReplyData,
  ContactMessagesResponse,
  ContactMessageResponse,
  ContactMessageStatsResponse,
} from "../types";

const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/contact-messages`;

// Helper function to get auth token
const getAuthToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  return token;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Submit a contact form message (Public endpoint)
 */
export const submitContactMessage = async (
  data: ContactMessageFormData
): Promise<ContactMessageResponse> => {
  const response = await axios.post<ContactMessageResponse>(
    `${API_URL}/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Get all contact messages with pagination and filtering (Admin only)
 */
export const getAllContactMessages = async (
  page: number = 1,
  limit: number = 10,
  status?: "unread" | "read" | "replied"
): Promise<ContactMessagesResponse> => {
  const params: any = { page, limit };
  if (status) {
    params.status = status;
  }

  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  const response = await axios.get<ContactMessagesResponse>(`${API_URL}/`, {
    params,
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

/**
 * Get a single contact message by ID (Admin only)
 */
export const getContactMessageById = async (
  id: string
): Promise<ContactMessageResponse> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  const response = await axios.get<ContactMessageResponse>(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
  return response.data;
};

/**
 * Reply to a contact message (Admin only)
 */
export const replyToContactMessage = async (
  id: string,
  data: ContactMessageReplyData
): Promise<ContactMessageResponse> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  const response = await axios.post<ContactMessageResponse>(
    `${API_URL}/${id}/reply`,
    data,
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Delete a contact message (Admin only)
 */
export const deleteContactMessage = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please login first.");
  }

  const response = await axios.delete<{ success: boolean; message: string }>(
    `${API_URL}/${id}`,
    {
      headers: getAuthHeaders(),
      withCredentials: true,
    }
  );
  return response.data;
};

/**
 * Get contact message statistics (Admin only)
 */
export const getContactMessageStats =
  async (): Promise<ContactMessageStatsResponse> => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found. Please login first.");
    }

    const response = await axios.get<ContactMessageStatsResponse>(
      `${API_URL}/stats`,
      {
        headers: getAuthHeaders(),
        withCredentials: true,
      }
    );
    return response.data;
  };

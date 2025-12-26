import axios from "axios";
import type { SubscribedEmailsResponse } from "@/types/subscribedEmail";

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const subscribedEmailService = {
  // Get all subscribed emails
  async getAllSubscribedEmails(
    token: string
  ): Promise<SubscribedEmailsResponse> {
    try {
      const response = await axios.get<SubscribedEmailsResponse>(
        `${API_BASE_URL}/api/email/allEmails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch subscribed emails:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch subscribed emails"
      );
    }
  },

  // Delete a subscribed email
  async deleteSubscribedEmail(id: string, token: string): Promise<any> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/email/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Failed to delete subscribed email:", error);
      throw new Error(
        error.response?.data?.message || "Failed to delete email"
      );
    }
  },

  // Send email to all subscribers
  async sendEmailToAll(
    subject: string,
    message: string,
    token: string
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/email/send-to-all`,
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to send email to subscribers:", error);
      throw new Error(error.response?.data?.message || "Failed to send email");
    }
  },
};

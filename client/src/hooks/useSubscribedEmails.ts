import { useState, useCallback } from "react";
import { subscribedEmailService } from "@/services/subscribedEmailService";
import type { SubscribedEmail } from "@/types/subscribedEmail";
import toast from "react-hot-toast";

export const useSubscribedEmails = (token: string | null) => {
  const [subscribedEmails, setSubscribedEmails] = useState<SubscribedEmail[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscribedEmails = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response =
        await subscribedEmailService.getAllSubscribedEmails(token);
      setSubscribedEmails(response.data.allEmails);
    } catch (err: any) {
      setError(err.message || "Failed to fetch subscribed emails");
      console.error("Failed to fetch subscribed emails:", err);
      toast.error("Failed to load subscribed emails");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const deleteSubscribedEmail = useCallback(
    async (id: string) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      try {
        await subscribedEmailService.deleteSubscribedEmail(id, token);
        // Refresh the list after deletion
        await fetchSubscribedEmails();
      } catch (err: any) {
        console.error("Failed to delete subscribed email:", err);
        throw err;
      }
    },
    [token, fetchSubscribedEmails]
  );

  const sendEmailToAll = useCallback(
    async (subject: string, message: string) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      try {
        const response = await subscribedEmailService.sendEmailToAll(
          subject,
          message,
          token
        );
        return response;
      } catch (err: any) {
        console.error("Failed to send email to all subscribers:", err);
        throw err;
      }
    },
    [token]
  );

  return {
    subscribedEmails,
    loading,
    error,
    fetchSubscribedEmails,
    deleteSubscribedEmail,
    sendEmailToAll,
  };
};

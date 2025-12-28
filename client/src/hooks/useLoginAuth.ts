import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import type { LoginFormValues } from "@/types/auth";
import toast from "react-hot-toast";

export const useLoginAuth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  const checkExistingAuth = useCallback(() => {
    const rawUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (token && rawUser) {
      try {
        const user = JSON.parse(rawUser);
        if (user) {
          navigate("/dashboard");
          toast("You already logged in", {
            icon: "✅",
            style: {
              background: "#e0f2fe",
              color: "#0369a1",
            },
          });
          return true;
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
    return false;
  }, [navigate]);

  const login = useCallback(
    async (formData: LoginFormValues) => {
      setIsSubmitting(true);
      try {
        const { token, user } = await authService.login(formData);

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Dispatch custom event to notify App.tsx of auth change
        window.dispatchEvent(new CustomEvent("authChange"));

        navigate("/dashboard");
      } catch (error: any) {
        const message = error.message || "Login failed";
        toast.error(message);
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate]
  );

  const loginWithGoogle = useCallback(async () => {
    try {
      const authURL = await authService.getGoogleAuthUrl();
      window.location.href = authURL;
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate Google authentication");
    }
  }, []);

  return {
    isSubmitting,
    login,
    loginWithGoogle,
    checkExistingAuth,
  };
};

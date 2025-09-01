import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import type { RegisterFormValues } from "@/types/auth";

export const useRegisterAuth = () => {
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

  const register = useCallback(
    async (formData: RegisterFormValues) => {
      setIsSubmitting(true);
      try {
        const result = await authService.register(formData);

        // Decide where to send the user next
        if (result.needsVerification) {
          navigate("/verify-email", {
            state: { email: result.email, userId: result.userId },
          });
        } else {
          navigate("/dashboard");
        }
      } catch (error: any) {
        const message = error.message || "Registration failed";
        alert(message);
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigate]
  );

  const registerWithGoogle = useCallback(async () => {
    try {
      const authURL = await authService.getGoogleAuthUrl();
      window.location.href = authURL;
    } catch (error: any) {
      console.error("Google authentication error:", error);
      alert(error.message || "Failed to initiate Google authentication");
    }
  }, []);

  return {
    isSubmitting,
    register,
    registerWithGoogle,
    checkExistingAuth,
  };
};

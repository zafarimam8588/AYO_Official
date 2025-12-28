import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/authService";

export const useAuth = () => {
  const navigate = useNavigate();

  const [token] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    if (
      storedToken &&
      storedToken !== "null" &&
      storedToken !== "undefined" &&
      storedToken.trim() !== ""
    ) {
      return storedToken;
    }
    return null;
  });

  const [currentUser] = useState(() => {
    const userString = localStorage.getItem("user");
    if (userString && userString !== "null") {
      try {
        const parsed = JSON.parse(userString);
        return parsed && typeof parsed === "object" ? parsed : null;
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  });

  const handleLogout = async () => {
    try {
      await logoutUser(token || "");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    if (!token || !currentUser) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
      return;
    }
  }, [token, currentUser, navigate]);

  return {
    token,
    currentUser,
    handleLogout,
    isAuthenticated: !!(token && currentUser),
  };
};

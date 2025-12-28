// components/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type StoredUser } from "../../types/index";

// Helper to get cookie value by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleAuthCallback = () => {
    const success = searchParams.get("success");
    const user = searchParams.get("user");
    const error = searchParams.get("error");

    // Token is now in httpOnly cookie (set by server)
    // We get it from cookie for localStorage sync
    const authToken = getCookie("authToken");

    if (success === "true" && user) {
      try {
        // Parse user data
        const userData: StoredUser = JSON.parse(decodeURIComponent(user));

        // Store token (from cookie) and user data in localStorage
        if (authToken) {
          localStorage.setItem("authToken", authToken);
        }
        localStorage.setItem("user", JSON.stringify(userData));

        // Dispatch custom event to notify App.tsx of auth change
        window.dispatchEvent(new CustomEvent("authChange"));

        // Redirect to originally intended page or dashboard
        const redirectPath =
          localStorage.getItem("redirectAfterAuth") || "/dashboard";
        localStorage.removeItem("redirectAfterAuth");
        navigate(redirectPath, { replace: true });
      } catch {
        navigate("/login?error=parse_error", { replace: true });
      }
    } else if (error) {
      navigate(`/login?error=${error}`, { replace: true });
    }
  };

  useEffect(() => {
    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;

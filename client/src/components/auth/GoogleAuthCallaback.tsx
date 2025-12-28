// components/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type StoredUser } from "../../types/index";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleAuthCallback = () => {
    const success = searchParams.get("success");
    const user = searchParams.get("user");
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (success === "true" && user && token) {
      try {
        // Parse user data
        const userData: StoredUser = JSON.parse(decodeURIComponent(user));
        const authToken = decodeURIComponent(token);

        // Store token and user data in localStorage
        localStorage.setItem("authToken", authToken);
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
    } else {
      // No success or error - something went wrong
      navigate("/login?error=auth_failed", { replace: true });
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

// components/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { type User } from "../../types/index";

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
        const userData: User = JSON.parse(decodeURIComponent(user));
        const authToken = decodeURIComponent(token);

        // Store token and user data
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to originally intended page or dashboard
        const redirectPath =
          localStorage.getItem("redirectAfterAuth") || "/dashboard";
        localStorage.removeItem("redirectAfterAuth");
        console.log(redirectPath);
        navigate(redirectPath, { replace: true });
      } catch (parseError) {
        console.error("Failed to parse auth data:", parseError);
        navigate("/login?error=parse_error", { replace: true });
      }
    } else if (error) {
      console.error("Authentication error:", error);
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

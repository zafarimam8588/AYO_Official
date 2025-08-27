import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, Heart } from "lucide-react";
import axios from "axios";
import { type GoogleAuthUrlResponse, type ApiError } from "../../types/index";
import { useNavigate } from "react-router-dom";

interface CustomAxiosError {
  response?: {
    data?: ApiError;
    status?: number;
    statusText?: string;
  };
  request?: any;
  message: string;
}

interface LoginResponse {
  success: true;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      isVerified: boolean;
      isProfileComplete: boolean;
    };
    token: string;
  };
}

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const token = localStorage.getItem("authToken");

  if (token && user) {
    // HERE YOU WILL ADD TOAST THAT YOU ALEADY LOGGED IN
    navigate("/dashboard");
    alert("You already logged in");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (form) => {
    try {
      console.log(import.meta.env.VITE_BACKEND_BASE_URL);
      const res = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/login`,
        form
      );
      const { token, user } = res.data.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      const message =
        (err as any)?.response?.data?.message ??
        (err as Error).message ??
        "Login failed";
      alert(message);
      console.error(err);
    }
  };
  const handleGoogleClick = async () => {
    try {
      console.log("Initiating Google authentication...");

      // Get the Google auth URL from your backend
      console.log(import.meta.env.VITE_BACKEND_BASE_URL);
      const response = await axios.get<GoogleAuthUrlResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/google/url`
      );

      if (response.data.success && response.data.data.authURL) {
        window.location.href = response.data.data.authURL;
      } else {
        throw new Error("Failed to get Google auth URL");
      }
    } catch (error: unknown) {
      console.error("Google authentication error:", error);

      const axiosError = error as CustomAxiosError;

      if (axiosError.response) {
        const errorData = axiosError.response.data;
        alert(errorData?.message || "Failed to initiate Google authentication");
      } else if (axiosError.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        alert(axiosError.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4 flex items-center justify-center">
      {/* Main Container */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Mobile Background Pattern Section - Only visible on small screens */}
        <div className="lg:hidden bg-gradient-to-br from-orange-500 via-orange-600 to-green-600 relative overflow-hidden h-48">
          {/* Decorative patterns for mobile */}
          <div className="absolute top-4 right-4 w-20 h-20 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                fill="white"
                d="M40.7,-65.2C50.9,-58.1,56.3,-42.5,63.4,-27.2C70.5,-11.9,79.3,3.1,79.9,19.2C80.5,35.3,72.9,52.5,60.1,63.1C47.3,73.7,29.3,77.7,11.8,78.5C-5.7,79.3,-22.7,76.9,-37.4,69.3C-52.1,61.7,-64.5,48.9,-71.7,33.4C-78.9,17.9,-80.9,-0.3,-77.8,-17.2C-74.7,-34.1,-66.5,-49.7,-54.4,-56C-42.3,-62.3,-26.3,-59.3,-10.1,-59.8C6.1,-60.3,30.5,-72.3,40.7,-65.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="absolute bottom-2 left-4 w-16 h-16 opacity-15">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                fill="white"
                d="M51.4,-72.8C66.3,-65.1,77.4,-49.7,82.9,-32.1C88.4,-14.5,88.3,5.3,83.8,23.4C79.3,41.5,70.4,58,57.2,68.9C44,79.8,26.5,85.1,8.2,84.4C-10.1,83.7,-29.2,76.9,-44.3,66.4C-59.4,55.9,-70.5,41.7,-76.8,25.2C-83.1,8.7,-84.6,-10.1,-80.3,-27.1C-76,-44.1,-65.9,-59.3,-51.8,-67.2C-37.7,-75.1,-18.8,-75.7,-0.3,-75.2C18.2,-74.7,36.5,-80.5,51.4,-72.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          {/* Mobile Content */}
          <div className="flex flex-col justify-center items-center h-full p-6 relative z-10 text-white text-center">
            <div className="flex items-center mb-3">
              <span className="text-2xl font-bold">
                Azad Youth Organisation
              </span>
            </div>

            <p className="text-orange-100 text-sm leading-relaxed px-4">
              Ready to continue making a difference? Your community is waiting!
            </p>
          </div>
        </div>

        {/* Left Side - Desktop Gradient Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-green-600 relative overflow-hidden">
          {/* Decorative waves/shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                fill="white"
                d="M40.7,-65.2C50.9,-58.1,56.3,-42.5,63.4,-27.2C70.5,-11.9,79.3,3.1,79.9,19.2C80.5,35.3,72.9,52.5,60.1,63.1C47.3,73.7,29.3,77.7,11.8,78.5C-5.7,79.3,-22.7,76.9,-37.4,69.3C-52.1,61.7,-64.5,48.9,-71.7,33.4C-78.9,17.9,-80.9,-0.3,-77.8,-17.2C-74.7,-34.1,-66.5,-49.7,-54.4,-56C-42.3,-62.3,-26.3,-59.3,-10.1,-59.8C6.1,-60.3,30.5,-72.3,40.7,-65.2Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                fill="white"
                d="M51.4,-72.8C66.3,-65.1,77.4,-49.7,82.9,-32.1C88.4,-14.5,88.3,5.3,83.8,23.4C79.3,41.5,70.4,58,57.2,68.9C44,79.8,26.5,85.1,8.2,84.4C-10.1,83.7,-29.2,76.9,-44.3,66.4C-59.4,55.9,-70.5,41.7,-76.8,25.2C-83.1,8.7,-84.6,-10.1,-80.3,-27.1C-76,-44.1,-65.9,-59.3,-51.8,-67.2C-37.7,-75.1,-18.8,-75.7,-0.3,-75.2C18.2,-74.7,36.5,-80.5,51.4,-72.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          {/* Desktop Content */}
          <div className="flex flex-col justify-center items-start p-12 relative z-10 text-white">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-7 h-7 text-orange-600" />
                </div>
                <span className="text-3xl font-bold">AYO</span>
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Welcome Back,
                <br />
                Changemaker! 🌟
              </h1>
              <p className="text-orange-100 text-lg leading-relaxed">
                Ready to continue making a difference? Your community of
                passionate youth leaders is waiting for you to return!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-orange-200 text-sm">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-orange-200 text-sm">Live Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-orange-200 text-sm">Cities Reached</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back! 👋
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to continue your journey of creating positive impact
              </p>
            </div>

            {/* Google Login - Moved to top */}
            <div className="mb-6">
              <button
                onClick={handleGoogleClick}
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer group"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="group-hover:text-gray-700 transition-colors ">
                  Quick Sign In with Google
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? "border-red-300 focus:ring-red-500" : ""
                      }`}
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 pr-20 ${
                        errors.password
                          ? "border-red-300 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="Enter your password"
                    />
                    <div className="absolute right-3 top-3 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      className="h-4 w-4 rounded accent-orange-600 focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Keep me signed in
                    </span>
                  </label>
                  <button
                    onClick={() => navigate("/forgot-password")}
                    type="button"
                    className="text-sm text-orange-600 hover:cursor-pointer hover:text-orange-700 font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-orange-500 to-green-500 text-white hover:from-orange-600 hover:to-green-600 hover:shadow-lg transform hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing you in...
                    </div>
                  ) : (
                    "Sign In  🚀"
                  )}
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="text-center mt-8 text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-orange-600 hover:text-orange-700 font-semibold transition-colors hover:underline hover:cursor-pointer"
              >
                Join our mission
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

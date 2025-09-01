import { useForm, type SubmitHandler } from "react-hook-form";
import { Mail, ArrowLeft, Key, Heart, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TypeScript interfaces
interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
}

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (form) => {
    try {
      const { data } = await axios.post<ForgotPasswordResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/forgot-password`,
        {
          email: form.email.toLowerCase(),
        }
      );

      if (data.success) {
        alert(data.message || "Password reset OTP sent to your email!");
        // Redirect to reset password page with email
        navigate("/reset-password", { state: { email: form.email } });
      } else {
        alert(data.message || "Failed to send reset OTP");
      }
    } catch (err) {
      const message =
        (err as any)?.response?.data?.message ||
        (err as any)?.response?.data?.error ||
        "Failed to send reset OTP. Please try again.";
      alert(message);
      console.error("Forgot password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 p-4 flex items-center justify-center">
      {/* Main Container */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Mobile Background Pattern Section - Reduced Height */}
        <div className="lg:hidden bg-gradient-to-br from-green-400 via-emerald-500 to-orange-400 relative overflow-hidden h-40">
          {/* Decorative patterns for mobile */}
          <div className="absolute top-2 right-4 w-16 h-16 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="80" fill="white" opacity="0.3" />
              <circle cx="100" cy="100" r="40" fill="white" opacity="0.5" />
              <circle cx="100" cy="100" r="20" fill="white" opacity="0.7" />
            </svg>
          </div>
          <div className="absolute bottom-2 left-4 w-12 h-12 opacity-15">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect
                x="50"
                y="50"
                width="100"
                height="100"
                fill="white"
                rx="20"
              />
            </svg>
          </div>

          {/* Mobile Content */}
          <div className="flex flex-col justify-center items-center h-full p-4 relative z-10 text-white text-center">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xl font-bold">Azad Youth Organisation</span>
            </div>
            <h1 className="text-lg font-bold mb-2 leading-tight">
              Reset Password 🔐
            </h1>
            <p className="text-green-100 text-xs leading-relaxed px-2">
              Enter your email to receive reset instructions
            </p>
          </div>
        </div>

        {/* Left Side - Forgot Password Theme with Green-Orange */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-green-400 via-emerald-500 to-orange-400 relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute top-10 left-10 w-32 h-32 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="80" fill="white" opacity="0.3" />
              <circle cx="100" cy="100" r="40" fill="white" opacity="0.5" />
              <circle cx="100" cy="100" r="20" fill="white" opacity="0.7" />
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 w-24 h-24 opacity-15">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect
                x="50"
                y="50"
                width="100"
                height="100"
                fill="white"
                rx="20"
              />
            </svg>
          </div>

          {/* Large Key Icon Background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <Key className="w-64 h-64 text-white" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center h-full p-8 lg:p-12 relative z-10 text-white">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-7 h-7 text-green-600" />
                </div>
                <span className="text-3xl font-bold">
                  Azad Youth Organisation
                </span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                Forgot Your Password?
                <br />
                No Worries! 🔐
              </h1>
              <p className="text-green-100 text-lg leading-relaxed">
                It happens to the best of us! Enter your email address and we'll
                send you a secure OTP to reset your password and get back to
                making a difference.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <p className="text-green-100">Enter your email address</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <p className="text-green-100">Check your email for OTP</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <p className="text-green-100">Create a new secure password</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-orange-50 opacity-50">
            <div className="absolute top-20 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-20 left-10 w-12 h-12 bg-orange-200 rounded-lg opacity-15 rotate-45"></div>
          </div>

          <div className="relative z-10 max-w-sm mx-auto w-full">
            {/* Back Button - Fixed typo */}
            <button
              onClick={() => navigate("/login")}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors hover:cursor-pointer lg:-mt-10 lg:mb-44 lg:-ml-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </button>

            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Key className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Reset Password 🔑
              </h2>
              <p className="text-gray-600">
                Enter your email and we'll send you an OTP
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 ${
                      errors.email ? "border-red-300 focus:ring-red-500" : ""
                    }`}
                    placeholder="your.email@example.com"
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-green-500 to-orange-400 text-white hover:from-green-600 hover:to-orange-500 hover:shadow-xl transform hover:scale-[1.02]"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Reset OTP 📧
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

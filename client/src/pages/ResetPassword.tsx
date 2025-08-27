import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Key, ArrowLeft, Heart, Eye, EyeOff, Lock, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// TypeScript interfaces
interface ResetPasswordFormValues {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
}

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state
  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (form) => {
    try {
      const { data } = await axios.post<ResetPasswordResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/reset-password`,
        {
          email: email.toLowerCase(),
          otp: form.otp,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        }
      );

      if (data.success) {
        alert(data.message || "Password reset successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (err) {
      const message =
        (err as any)?.response?.data?.message ||
        (err as any)?.response?.data?.error ||
        "Failed to reset password. Please try again.";
      alert(message);
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-orange-50 p-4 flex items-center justify-center">
      {/* Main Container */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Mobile Background Pattern Section */}
        <div className="lg:hidden bg-gradient-to-br from-emerald-400 via-green-500 to-orange-400 relative overflow-hidden h-40">
          {/* Tri-color decorative patterns for mobile */}
          <div className="absolute top-2 right-4 w-16 h-16 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="100,20 180,180 20,180"
                fill="white"
                opacity="0.4"
              />
              <polygon
                points="100,60 140,140 60,140"
                fill="white"
                opacity="0.6"
              />
              <polygon
                points="100,80 120,120 80,120"
                fill="white"
                opacity="0.8"
              />
            </svg>
          </div>
          <div className="absolute bottom-2 left-4 w-12 h-12 opacity-15">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="50,50 150,70 130,150 70,130"
                fill="white"
                rx="10"
              />
            </svg>
          </div>

          {/* Mobile Content */}
          <div className="flex flex-col justify-center items-center h-full p-4 relative z-10 text-white text-center">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <Heart className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xl font-bold">Azad Youth Organisation</span>
            </div>
            <h1 className="text-lg font-bold mb-2 leading-tight">
              Create New Password 🔐
            </h1>
            <p className="text-emerald-100 text-xs leading-relaxed px-2">
              Enter OTP and set your new secure password
            </p>
          </div>
        </div>

        {/* Left Side - Reset Password Theme with Tri-color */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-emerald-400 via-green-500 to-orange-400 relative overflow-hidden">
          {/* Tri-color decorative patterns */}
          <div className="absolute top-10 left-10 w-32 h-32 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="100,20 180,180 20,180"
                fill="white"
                opacity="0.4"
              />
              <polygon
                points="100,60 140,140 60,140"
                fill="white"
                opacity="0.6"
              />
              <polygon
                points="100,80 120,120 80,120"
                fill="white"
                opacity="0.8"
              />
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 w-24 h-24 opacity-15">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon points="50,50 150,70 130,150 70,130" fill="white" />
            </svg>
          </div>
          <div className="absolute top-1/3 right-20 w-16 h-16 opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon points="100,30 170,100 100,170 30,100" fill="white" />
            </svg>
          </div>

          {/* Large Shield Icon Background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <Shield className="w-64 h-64 text-white" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center h-full p-8 lg:p-12 relative z-10 text-white">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-7 h-7 text-emerald-600" />
                </div>
                <span className="text-3xl font-bold">
                  Azad Youth Organisation
                </span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                Create Your New
                <br />
                Password! 🔒
              </h1>
              <p className="text-emerald-100 text-lg leading-relaxed">
                You're almost there! Enter the OTP we sent to your email and
                create a strong new password to secure your account.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <p className="text-emerald-100">Enter the 6-digit OTP code</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <p className="text-emerald-100">Create a strong new password</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <p className="text-emerald-100">
                  Login with your new credentials
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative">
          {/* Tri-color background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-orange-50 opacity-60">
            <div className="absolute top-20 right-10 w-16 h-16 bg-emerald-200 rounded-full opacity-25"></div>
            <div className="absolute top-32 left-8 w-12 h-12 bg-green-200 rounded-lg opacity-20 rotate-45"></div>
            <div className="absolute bottom-20 left-10 w-12 h-12 bg-orange-200 rounded-lg opacity-15 rotate-45"></div>
          </div>

          <div className="relative z-10 max-w-sm mx-auto w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/forgot-password")}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors hover:cursor-pointer lg:-mt-10 lg:mb-32 lg:-ml-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Forgot Password
            </button>

            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Key className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Set New Password 🔐
              </h2>
              <p className="text-gray-600 mb-2">Resetting password for:</p>
              <p className="text-emerald-600 font-semibold bg-emerald-50 rounded-lg px-3 py-1 inline-block">
                {email}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* OTP Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Verification Code (OTP)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    {...register("otp", {
                      required: "OTP is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "OTP must be 6 digits",
                      },
                    })}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 text-center tracking-widest font-mono ${
                      errors.otp ? "border-red-300 focus:ring-red-500" : ""
                    }`}
                    placeholder="000000"
                  />
                  <Shield className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp.message}</p>
                )}
              </div>

              {/* New Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message:
                          "Password must contain uppercase, lowercase and number",
                      },
                    })}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 pr-20 ${
                      errors.newPassword
                        ? "border-red-300 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="Enter new password"
                  />
                  <div className="absolute right-3 top-3 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === newPassword || "Passwords do not match",
                    })}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 pr-20 ${
                      errors.confirmPassword
                        ? "border-red-300 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="Confirm new password"
                  />
                  <div className="absolute right-3 top-3 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-emerald-500 to-orange-400 text-white hover:from-emerald-600 hover:to-orange-500 hover:shadow-xl transform hover:scale-[1.02]"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating Password...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Key className="w-5 h-5 mr-2" />
                    Reset Password 🔒
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

export default ResetPassword;

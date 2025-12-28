import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Key, ArrowLeft, Heart, Eye, EyeOff, Shield, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
        toast.success(data.message || "Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string; error?: string } } })
          ?.response?.data?.message ||
        (err as { response?: { data?: { message?: string; error?: string } } })
          ?.response?.data?.error ||
        "Failed to reset password. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-warm-50/30 to-india-green-50/20 flex items-center justify-center relative font-sans p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Modern Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ff993308_1px,transparent_1px),linear-gradient(to_bottom,#13880808_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full sm:max-w-md md:max-w-xl lg:max-w-5xl xl:max-w-6xl mx-auto h-full min-h-screen sm:min-h-0 sm:h-auto flex flex-col">
        <div className="bg-white/90 backdrop-blur-2xl shadow-none sm:shadow-2xl border-0 sm:border border-white/20 overflow-x-hidden overflow-y-auto rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] ring-0 sm:ring-1 ring-black/5 flex-1 flex flex-col min-h-screen sm:min-h-0 sm:h-auto">
          <div className="flex flex-col lg:flex-row flex-1 lg:min-h-[600px] xl:min-h-[650px]">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-saffron-500 via-saffron-600 to-india-green-600 relative overflow-hidden">
              {/* Large Shield Icon Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                <Shield className="w-48 h-48 text-white" />
              </div>

              <div className="flex flex-col justify-center items-start p-8 xl:p-10 relative z-10 text-white h-full w-full">
                <div className="mb-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mr-4 shadow-lg border border-white/20">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                      AYO
                    </span>
                  </div>
                  <h1 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight tracking-tight">
                    Create Your
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-saffron-100">
                      New Password!
                    </span>
                  </h1>
                  <p className="text-saffron-50 text-base leading-relaxed max-w-md">
                    You're almost there! Enter the OTP we sent to your email and
                    create a strong new password to secure your account.
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-3 mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-india-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                    <p className="text-saffron-100 text-sm">
                      Enter the 6-digit OTP code
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <p className="text-saffron-100 text-sm">
                      Create a strong new password
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <p className="text-saffron-100 text-sm">
                      Login with your new credentials
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto flex-1">
              <div className="w-full max-w-md mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10 xl:px-10 xl:py-12 flex flex-col justify-center min-h-full lg:min-h-0">
                {/* Mobile Header */}
                <div className="lg:hidden relative -mx-4 sm:-mx-6 md:-mx-8 -mt-6 sm:-mt-8 md:-mt-10 mb-5 sm:mb-6 h-36 sm:h-40 md:h-44 overflow-hidden bg-gradient-to-br from-saffron-500 via-saffron-600 to-india-green-600 rounded-t-none sm:rounded-t-2xl flex-shrink-0">
                  {/* Static Background Pattern - Hexagonal Mesh */}
                  <div className="absolute inset-0 opacity-25">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="hex-pattern-reset"
                          x="0"
                          y="0"
                          width="60"
                          height="52"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M30,0 L50,13 L50,39 L30,52 L10,39 L10,13 Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                            opacity="0.4"
                          />
                          <circle
                            cx="30"
                            cy="26"
                            r="3"
                            fill="white"
                            opacity="0.3"
                          />
                        </pattern>
                        <pattern
                          id="dots-pattern-reset"
                          x="0"
                          y="0"
                          width="30"
                          height="30"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle
                            cx="15"
                            cy="15"
                            r="1.5"
                            fill="white"
                            opacity="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#hex-pattern-reset)"
                      />
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#dots-pattern-reset)"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
                  </div>
                  {/* Decorative Bottom Border Pattern - Geometric Scalloped */}
                  <div className="absolute bottom-0 left-0 w-full z-20">
                    <svg
                      className="w-full h-10 sm:h-12"
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="scallop-reset"
                          x="0"
                          y="0"
                          width="60"
                          height="120"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M0,80 Q30,40 60,80 L60,120 L0,120 Z"
                            fill="white"
                            opacity="0.98"
                          />
                          <circle
                            cx="30"
                            cy="60"
                            r="8"
                            fill="white"
                            opacity="0.6"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="1200"
                        height="120"
                        fill="url(#scallop-reset)"
                      />
                      <path
                        d="M0,80 L0,120 M60,80 L60,120 M120,80 L120,120 M180,80 L180,120 M240,80 L240,120 M300,80 L300,120 M360,80 L360,120 M420,80 L420,120 M480,80 L480,120 M540,80 L540,120 M600,80 L600,120 M660,80 L660,120 M720,80 L720,120 M780,80 L780,120 M840,80 L840,120 M900,80 L900,120 M960,80 L960,120 M1020,80 L1020,120 M1080,80 L1080,120 M1140,80 L1140,120 M1200,80 L1200,120"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    </svg>
                  </div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                        <Key className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-white">
                        Azad Youth Organisation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Button */}
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-4 transition-colors cursor-pointer self-start"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Back</span>
                </button>

                {/* Header */}
                <div className="mb-4 text-center lg:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 tracking-tight">
                    Set New Password
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Resetting for:{" "}
                    <span className="text-saffron-600 font-semibold">
                      {email}
                    </span>
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* OTP Field */}
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
                      className={`peer w-full px-4 pt-5 pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-saffron-500/10 focus:border-saffron-500 focus:bg-white transition-all duration-300 placeholder-transparent text-center tracking-widest font-mono text-sm sm:text-base ${
                        errors.otp
                          ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                          : "hover:border-gray-300"
                      }`}
                      placeholder="000000"
                    />
                    <label className="absolute left-4 top-1.5 text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-saffron-600">
                      Verification Code (OTP)
                    </label>
                    <Shield className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 peer-focus:text-saffron-500 transition-colors" />
                  </div>
                  {errors.otp && (
                    <p className="text-red-500 text-xs ml-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.otp.message}
                    </p>
                  )}

                  {/* Password Fields - Two Column */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* New Password Field */}
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        {...register("newPassword", {
                          required: "Required",
                          minLength: {
                            value: 8,
                            message: "Min 8 chars",
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: "A-Z, a-z, 0-9",
                          },
                        })}
                        className={`peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-saffron-500/10 focus:border-saffron-500 focus:bg-white transition-all duration-300 placeholder-transparent pr-10 text-sm ${
                          errors.newPassword
                            ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                            : "hover:border-gray-300"
                        }`}
                        placeholder="Password"
                      />
                      <label className="absolute left-3 sm:left-4 top-1 text-[10px] sm:text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[10px] sm:peer-focus:text-xs peer-focus:text-saffron-600">
                        New Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 sm:right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                      {errors.newPassword && (
                        <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Required",
                          validate: (value) =>
                            value === newPassword || "Don't match",
                        })}
                        className={`peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-saffron-500/10 focus:border-saffron-500 focus:bg-white transition-all duration-300 placeholder-transparent pr-10 text-sm ${
                          errors.confirmPassword
                            ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                            : "hover:border-gray-300"
                        }`}
                        placeholder="Confirm"
                      />
                      <label className="absolute left-3 sm:left-4 top-1 text-[10px] sm:text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[10px] sm:peer-focus:text-xs peer-focus:text-saffron-600">
                        Confirm
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-2 sm:right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-saffron-500 via-saffron-600 to-india-green-500 hover:from-saffron-600 hover:via-saffron-700 hover:to-india-green-600 shadow-lg shadow-saffron-500/25 hover:shadow-saffron-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-semibold text-white text-sm sm:text-base flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4 mr-2" />
                        Reset Password
                      </>
                    )}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-4 sm:mt-5 text-center">
                  <p className="text-gray-500 text-xs sm:text-sm font-medium">
                    Remember your password?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-saffron-600 hover:text-saffron-700 font-bold hover:underline ml-1 transition-colors cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                </div>

                {/* Back to Home */}
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 mr-1.5" />
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

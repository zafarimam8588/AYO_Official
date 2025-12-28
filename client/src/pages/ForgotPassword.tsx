import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Mail,
  Key,
  Send,
  Heart,
  Shield,
  Clock,
  ArrowLeft,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
        toast.success(data.message || "Password reset OTP sent to your email!");
        navigate("/reset-password", { state: { email: form.email } });
      } else {
        toast.error(data.message || "Failed to send reset OTP");
      }
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string; error?: string } } })
          ?.response?.data?.message ||
        (err as { response?: { data?: { message?: string; error?: string } } })
          ?.response?.data?.error ||
        "Failed to send reset OTP. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-india-green-50/30 via-warm-50/30 to-saffron-50/20 flex items-center justify-center relative font-sans p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Modern Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#13880808_1px,transparent_1px),linear-gradient(to_bottom,#ff993308_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Main Container */}
      <div className="relative z-10 w-full sm:max-w-md md:max-w-xl lg:max-w-5xl mx-auto h-full min-h-screen sm:min-h-0 sm:h-auto flex flex-col">
        <div className="bg-white/90 backdrop-blur-2xl shadow-none sm:shadow-2xl border-0 sm:border border-white/20 overflow-x-hidden overflow-y-auto rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-[2rem] ring-0 sm:ring-1 ring-black/5 flex-1 flex flex-col min-h-screen sm:min-h-0 sm:h-auto">
          <div className="flex flex-col lg:flex-row flex-1 lg:min-h-[600px] xl:min-h-[650px]">
            {/* Left Side - Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-india-green-500 via-india-green-600 to-saffron-600 relative overflow-hidden">
              {/* Large Key Icon Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                <Key className="w-48 h-48 text-white" />
              </div>

              {/* Content */}
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
                  <h1 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight">
                    Forgot your password?
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-india-green-100">
                      We've got you
                    </span>
                  </h1>
                  <p className="text-india-green-50 text-base leading-relaxed max-w-md">
                    Enter your email and we'll send you a one‑time code to reset
                    it.
                  </p>
                </div>

                {/* Security Badge */}
                <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 max-w-sm">
                  <Shield className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">
                      Secure Process
                    </p>
                    <p className="text-india-green-100 text-xs leading-relaxed">
                      OTP expires in 10 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col relative flex-1">
              <div className="w-full max-w-md mx-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-8 lg:py-8 xl:px-10 xl:py-10 flex flex-col justify-center h-full">
                {/* Mobile Background Pattern Section */}
                <div className="lg:hidden relative -mx-4 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 mb-4 sm:mb-6 h-36 sm:h-40 md:h-44 overflow-hidden bg-gradient-to-br from-india-green-500 via-india-green-600 to-saffron-600 rounded-t-none sm:rounded-t-2xl flex-shrink-0">
                  {/* Static Background Pattern - Hexagonal Mesh */}
                  <div className="absolute inset-0 opacity-25">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="hex-pattern-forgot"
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
                          id="dots-pattern-forgot"
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
                        fill="url(#hex-pattern-forgot)"
                      />
                      <rect
                        width="100%"
                        height="100%"
                        fill="url(#dots-pattern-forgot)"
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
                          id="scallop-forgot"
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
                        fill="url(#scallop-forgot)"
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

                {/* Back Button - Properly aligned */}
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-4 transition-colors cursor-pointer self-start"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Back to Login</span>
                </button>

                {/* Header for Desktop */}
                <div className="hidden lg:block mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                    Reset Password
                  </h2>
                  <p className="text-gray-500 text-sm">
                    We'll email a one‑time code to your registered email.
                  </p>
                </div>

                {/* Mobile Header */}
                <div className="lg:hidden mb-4 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
                    Reset Password
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Enter your email to receive a reset code
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      className={`peer w-full px-4 pt-5 pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-india-green-500/10 focus:border-india-green-500 focus:bg-white transition-all duration-300 placeholder-transparent text-sm sm:text-base ${
                        errors.email
                          ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                          : "hover:border-gray-300"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    <label className="absolute left-4 top-1.5 text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-india-green-600">
                      Email Address
                    </label>
                    <Mail className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 peer-focus:text-india-green-500 transition-colors" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs ml-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500"></span>
                      {errors.email.message}
                    </p>
                  )}

                  {/* Info Box */}
                  <div className="bg-india-green-50/80 border border-india-green-100 rounded-xl p-3 flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-india-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-india-green-800 font-medium">
                      OTP valid for 10 minutes. Check spam if needed.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-india-green-500 via-india-green-600 to-saffron-600 hover:from-india-green-600 hover:via-india-green-700 hover:to-saffron-700 shadow-lg shadow-india-green-500/25 hover:shadow-india-green-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-semibold text-white text-sm sm:text-base flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send OTP
                      </>
                    )}
                  </button>
                </form>

                {/* Help Text */}
                <div className="mt-4 text-center">
                  <p className="text-gray-500 text-xs sm:text-sm font-medium">
                    Remember your password?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-india-green-600 hover:text-india-green-700 font-bold hover:underline ml-1 transition-colors cursor-pointer"
                    >
                      Sign in instead
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

export default ForgotPasswordPage;

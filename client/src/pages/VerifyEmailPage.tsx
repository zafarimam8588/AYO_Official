import { useForm, type SubmitHandler } from "react-hook-form";
import { Mail, Shield, ArrowLeft, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface VerifyEmailFormValues {
  verificationCode: string;
}

interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      isVerified: boolean;
      isProfileComplete: boolean;
    };
  };
}

interface ResendCodeResponse {
  success: boolean;
  message: string;
  error?: string;
}

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state
  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailFormValues>({
    defaultValues: { verificationCode: "" },
  });

  const onSubmit: SubmitHandler<VerifyEmailFormValues> = async (form) => {
    try {
      const { data } = await axios.post<VerifyEmailResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/verify-email`,
        {
          email,
          otp: form.verificationCode,
        }
      );

      if (data.success && data.data) {
        // Store auth data and redirect to dashboard
        localStorage.setItem("authToken", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      const message =
        (err as any)?.response?.data?.message ??
        "Verification failed. Please try again.";
      toast.error(message);
    }
  };

  const handleResendCode = async () => {
    try {
      const { data } = await axios.post<ResendCodeResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/resend-otp`,
        {
          email: email.toLowerCase(),
          type: "email-verification",
        }
      );

      if (data.success) {
        toast.success(
          data.message || "OTP sent successfully! Please check your email."
        );
      } else {
        toast.error(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      const message =
        (err as any)?.response?.data?.message ||
        (err as any)?.response?.data?.error ||
        "Failed to send OTP. Please check your connection and try again.";
      toast.error(message);
      console.error("Resend OTP error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4 flex items-center justify-center">
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Mobile Background Pattern Section */}
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
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold">AYO</span>
            </div>
            <h1 className="text-2xl font-bold mb-3 leading-tight">
              Almost There! 📧
            </h1>
            <p className="text-orange-100 text-sm leading-relaxed px-4">
              We've sent a verification code to your email. Check your inbox!
            </p>
          </div>
        </div>

        {/* Left Side - Original Design with Mail Icon */}
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

          {/* Large Email Icon Background */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
            <Mail className="w-64 h-64 text-white" />
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
                Almost There,
                <br />
                Changemaker! 📧
              </h1>
              <p className="text-orange-100 text-lg leading-relaxed">
                We've sent a 6-digit verification code to your email. Enter it
                below to complete your registration and join our mission!
              </p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">✓</div>
                <div className="text-orange-200 text-sm">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10min</div>
                <div className="text-orange-200 text-sm">Expires</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">📱</div>
                <div className="text-orange-200 text-sm">Easy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - First Enhanced Background Solution */}
        <div className="w-full lg:w-1/2 relative overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 bg-white">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,149,0,0.3) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            {/* Wavy Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                <path
                  d="M0,100 Q100,50 200,100 T400,100 L400,150 Q300,200 200,150 T0,150 Z"
                  fill="url(#wave1)"
                />
                <path
                  d="M0,250 Q100,200 200,250 T400,250 L400,300 Q300,350 200,300 T0,300 Z"
                  fill="url(#wave2)"
                />
                <defs>
                  <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#28a745" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#28a745" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Email Icon Pattern */}
            <div className="absolute top-1/4 left-8 opacity-5">
              <Mail className="w-32 h-32 text-orange-400" />
            </div>
            <div className="absolute bottom-1/4 right-12 opacity-5">
              <Shield className="w-24 h-24 text-green-400" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center min-h-full">
            <div className="max-w-sm mx-auto w-full">
              {/* Back Button */}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors hover:cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>

              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Verify Your Email 📧
                </h2>
                <p className="text-gray-600 mb-2">
                  Enter the 6-digit code sent to:
                </p>
                <p className="text-orange-600 font-semibold  bg-white/50 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                  {email}
                </p>
              </div>

              {/* Verification Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block text-center">
                    Verification Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      {...register("verificationCode", {
                        required: "Verification code is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "Code must be 6 digits",
                        },
                      })}
                      className={`w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest font-mono bg-white/70 backdrop-blur-sm shadow-sm ${
                        errors.verificationCode
                          ? "border-red-300 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="000000"
                    />
                    <Mail className="absolute right-3 top-4 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.verificationCode && (
                    <p className="text-red-500 text-sm text-center">
                      {errors.verificationCode.message}
                    </p>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-orange-500 to-green-500 text-white hover:from-orange-600 hover:to-green-600 hover:shadow-xl transform hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Verify & Continue 🚀"
                  )}
                </button>
              </form>

              {/* Resend Code */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-3">Didn't receive the code?</p>
                <button
                  onClick={handleResendCode}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline hover:cursor-pointer"
                >
                  Resend the code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

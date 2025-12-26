import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

interface FormInputs {
  email: string;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

interface CustomAxiosError {
  response?: {
    data?: ApiResponse;
  };
  request?: any;
  message?: string;
}

const StayInLoop: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setSubmitStatus(null);

      const response = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/email/subscribe-to-email`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (response.status === 201 && response.data.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for subscribing! We'll keep you updated.",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: response.data.message || "Subscription failed",
        });
      }
    } catch (error: unknown) {
      console.error("Subscription error:", error);

      const axiosError = error as CustomAxiosError;

      if (axiosError.response) {
        const errorData = axiosError.response.data;
        setSubmitStatus({
          type: "error",
          message:
            errorData?.message || "Subscription failed. Please try again.",
        });
      } else if (axiosError.request) {
        setSubmitStatus({
          type: "error",
          message: "Network error. Please check your internet connection.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: axiosError.message || "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-3xl p-8 mb-12 border border-orange-200/50 shadow-xl overflow-hidden mt-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-2xl" />

        {/* Subtle dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #FF9933 2px, transparent 2px), radial-gradient(circle at 80% 50%, #138808 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Title with decorative underlines */}
        <div className="relative inline-block mb-4">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-slate-800 to-green-600 bg-clip-text text-transparent leading-tight">
            Stay in the Loop
          </h3>

          {/* Triple underline decoration */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            <div className="w-8 h-1 bg-orange-500 rounded-full animate-pulse" />
            <div
              className="w-12 h-1 bg-slate-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="w-8 h-1 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Get the latest updates on our{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent font-semibold">
              community initiatives
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </span>{" "}
          and exclusive content delivered directly to your inbox.
        </p>

        {/* React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-3 shadow-lg">
            {/* Email Input */}
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-700 placeholder-slate-400 transition-all duration-200 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-slate-200"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>

            {/* Subscribe Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap mt-2"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Error Messages */}
          {errors.email && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm ml-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.email.message}</span>
            </div>
          )}

          {/* Success/Error Status */}
          {submitStatus && (
            <div
              className={`flex items-center gap-2 mt-2 text-sm ml-4 ${
                submitStatus.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          )}
        </form>

        {/* Trust indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span>Join 10,000+ Bihar changemakers</span>
          <div
            className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default StayInLoop;

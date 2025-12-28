import React, { useState, useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Mail,
  Loader2,
} from "lucide-react";
import { RotatingBorderButton } from "../member/RotatingBorderButton";

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
  request?: unknown;
  message?: string;
}

const StayInLoop: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
        toast.success(
          "Thank you for subscribing! We'll keep you updated on our initiatives.",
          {
            duration: 5000,
            position: "top-center",
            style: {
              background: "#10b981",
              color: "#fff",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "14px",
            },
            icon: "✅",
          }
        );

        setSubmitStatus({
          type: "success",
          message: "Thank you for subscribing! We'll keep you updated.",
        });
        reset();
      } else {
        const errorMessage =
          response.data.message || "Subscription failed. Please try again.";

        toast.error(errorMessage, {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "#fff",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "14px",
          },
          icon: "❌",
        });

        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error: unknown) {
      console.error("Subscription error:", error);

      const axiosError = error as CustomAxiosError;
      let errorMessage = "An unexpected error occurred";

      if (axiosError.response) {
        errorMessage =
          axiosError.response.data?.message ||
          "Subscription failed. Please try again.";
      } else if (axiosError.request) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }

      toast.error(errorMessage, {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "14px",
        },
        icon: "❌",
      });

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 0% 0%, rgba(255, 153, 51, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 100% 100%, rgba(19, 136, 8, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-saffron-100/20 to-india-green-100/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Glass morphism card */}
          <div className="bg-white/90 backdrop-blur border border-saffron-200/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
            {/* Tricolor header bar */}
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-saffron-500 via-white to-india-green-500" />

            <div className="p-6 sm:p-8 md:p-10">
              {/* Header Section */}
              <div className="text-center mb-6 sm:mb-8">
                {/* Icon badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-saffron-500 to-india-green-500 rounded-2xl mb-4 shadow-lg">
                  <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>

                {/* Title with gradient text */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                  <span className="bg-gradient-to-r from-saffron-600 via-slate-800 to-india-green-600 bg-clip-text text-transparent">
                    Stay in the Loop
                  </span>
                </h3>

                {/* Subtitle */}
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-4">
                  Get the latest updates on our{" "}
                  <span className="bg-gradient-to-r from-saffron-600 to-india-green-600 bg-clip-text text-transparent font-semibold">
                    community initiatives
                  </span>{" "}
                  delivered directly to your inbox.
                </p>

                {/* Tricolor accent bar */}
                <div className="flex justify-center gap-1.5">
                  <div className="h-1 sm:h-1.5 w-10 sm:w-12 rounded-full bg-saffron-500" />
                  <div className="h-1 sm:h-1.5 w-5 sm:w-6 rounded-full bg-slate-300" />
                  <div className="h-1 sm:h-1.5 w-10 sm:w-12 rounded-full bg-india-green-500" />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Input Field */}
                <div className="space-y-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Email Input */}
                    <div className="flex-1">
                      <input
                        id="newsletter-email"
                        type="email"
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-3 h-12 border-2 bg-white shadow-sm rounded-xl
                          transition-all duration-300
                          placeholder:text-slate-400 text-slate-700
                          ${
                            errors.email
                              ? "border-red-500 focus:border-red-400 focus:ring-red-500/20"
                              : "border-saffron-200 hover:border-saffron-300 focus:border-saffron-400 focus:ring-saffron-500/20"
                          }
                          focus:outline-none focus:ring-[3px]
                          hover:shadow-md
                        `}
                        disabled={isSubmitting}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
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
                    <RotatingBorderButton
                      type="submit"
                      disabled={isSubmitting}
                      variant="saffron"
                      size="sm"
                      className="w-full sm:w-auto h-12"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span className="ml-2">Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </>
                      )}
                    </RotatingBorderButton>
                  </div>
                </div>

                {/* Validation Error Message */}
                {errors.email && (
                  <div
                    id="email-error"
                    role="alert"
                    className="flex items-center gap-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.email.message}</span>
                  </div>
                )}

                {/* Success/Error Status Box */}
                {submitStatus && (
                  <div
                    className={`p-4 rounded-xl border-2 ${
                      submitStatus.type === "success"
                        ? "bg-india-green-50 border-india-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-start gap-3">
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-5 w-5 text-india-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p
                        className={`text-sm ${
                          submitStatus.type === "success"
                            ? "text-india-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {submitStatus.message}
                      </p>
                    </div>
                  </div>
                )}
              </form>

              {/* Trust indicator */}
              <div className="mt-6 sm:mt-8 text-center">
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 border border-saffron-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm backdrop-blur">
                  <div className="w-2 h-2 rounded-full bg-india-green-500 animate-pulse" />
                  <span className="text-slate-600 text-sm sm:text-base font-medium">
                    Join{" "}
                    <span className="font-bold text-saffron-600">1,000+</span>{" "}
                    Bihar changemakers
                  </span>
                  <div
                    className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayInLoop;

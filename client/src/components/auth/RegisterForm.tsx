import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, User, Home } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { RegisterFormValues } from "@/types/auth";

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormValues>;
  onSubmit: () => void;
  onGoogleRegister: () => void;
  isSubmitting: boolean;
}

export const RegisterForm = ({
  form,
  onSubmit,
  onGoogleRegister,
  isSubmitting,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const password = form.watch("password");

  return (
    <div>
      {/* Google Register Button */}
      <div className="mb-3">
        <button
          onClick={onGoogleRegister}
          type="button"
          className="w-full flex items-center justify-center px-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:cursor-pointer group shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
            viewBox="0 0 24 24"
          >
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
          <span className="text-slate-700 font-medium text-sm group-hover:text-slate-900 transition-colors">
            Sign Up with Google
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-white/80 backdrop-blur-md text-slate-500 font-medium rounded-full py-0.5 border border-slate-100">
            Or register with email
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative">
            <input
              type="text"
              {...form.register("firstName", {
                required: "Required",
                minLength: {
                  value: 2,
                  message: "Min 2 chars",
                },
              })}
              className={`peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-india-green-500/10 focus:border-india-green-500 focus:bg-white transition-all duration-300 placeholder-transparent text-sm ${
                form.formState.errors.firstName
                  ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                  : "hover:border-gray-300"
              }`}
              placeholder="John"
            />
            <label className="absolute left-3 sm:left-4 top-1 text-xs sm:text-sm font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-india-green-600">
              First Name
            </label>
            <User className="absolute right-2 sm:right-3 top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 peer-focus:text-india-green-500 transition-colors" />
            {form.formState.errors.firstName && (
              <p className="text-red-500 text-xs mt-0.5 ml-1">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              {...form.register("lastName", {
                required: "Required",
                minLength: {
                  value: 2,
                  message: "Min 2 chars",
                },
              })}
              className={`peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-india-green-500/10 focus:border-india-green-500 focus:bg-white transition-all duration-300 placeholder-transparent text-sm ${
                form.formState.errors.lastName
                  ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                  : "hover:border-gray-300"
              }`}
              placeholder="Doe"
            />
            <label className="absolute left-3 sm:left-4 top-1 text-xs sm:text-sm font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-india-green-600">
              Last Name
            </label>
            <User className="absolute right-2 sm:right-3 top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 peer-focus:text-india-green-500 transition-colors" />
            {form.formState.errors.lastName && (
              <p className="text-red-500 text-xs mt-0.5 ml-1">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            {...form.register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            })}
            className={`peer w-full px-4 pt-5 pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-india-green-500/10 focus:border-india-green-500 focus:bg-white transition-all duration-300 placeholder-transparent text-sm ${
              form.formState.errors.email
                ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                : "hover:border-gray-300"
            }`}
            placeholder="your.email@company.com"
          />
          <label className="absolute left-4 top-1.5 text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-india-green-600">
            Email Address
          </label>
          <Mail className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 peer-focus:text-india-green-500 transition-colors" />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs mt-0.5 ml-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...form.register("password", {
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
              className={`peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-india-green-500/10 focus:border-india-green-500 focus:bg-white transition-all duration-300 placeholder-transparent pr-10 text-sm ${
                form.formState.errors.password
                  ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                  : "hover:border-gray-300"
              }`}
              placeholder="Password"
            />
            <label className="absolute left-3 sm:left-4 top-1 text-[10px] sm:text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[10px] sm:peer-focus:text-xs peer-focus:text-india-green-600">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 sm:right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
            {form.formState.errors.password && (
              <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...form.register("confirmPassword", {
                required: "Required",
                validate: (value) => value === password || "Don't match",
              })}
              className={`peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-1.5 sm:pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-india-green-500/10 focus:border-india-green-500 focus:bg-white transition-all duration-300 placeholder-transparent pr-10 text-sm ${
                form.formState.errors.confirmPassword
                  ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                  : "hover:border-gray-300"
              }`}
              placeholder="Confirm"
            />
            <label className="absolute left-3 sm:left-4 top-1 text-[10px] sm:text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[10px] sm:peer-focus:text-xs peer-focus:text-india-green-600">
              Confirm
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 sm:right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-[10px] mt-0.5 ml-1">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center pt-1">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              {...form.register("agreeToTerms", {
                required: "Required",
              })}
              className="peer h-3.5 w-3.5 rounded border-gray-300 text-india-green-600 focus:ring-india-green-500 transition-all cursor-pointer"
            />
            <span className="ml-2 text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
              I agree to{" "}
              <button
                type="button"
                className="text-india-green-600 hover:text-india-green-700 font-bold hover:underline cursor-pointer"
              >
                Terms & Privacy
              </button>
            </span>
          </label>
        </div>
        {form.formState.errors.agreeToTerms && (
          <p className="text-red-500 text-xs ml-1">
            {form.formState.errors.agreeToTerms.message}
          </p>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full h-11 sm:h-12 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base flex items-center justify-center ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-india-green-500 via-india-green-600 to-saffron-500 hover:from-india-green-600 hover:via-india-green-700 hover:to-saffron-600 text-white shadow-lg shadow-india-green-500/25 hover:shadow-india-green-500/40 transform hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-center mt-4 sm:mt-5 text-gray-600 text-xs sm:text-sm">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-india-green-600 hover:text-india-green-700 font-bold transition-colors hover:underline hover:cursor-pointer ml-1"
        >
          Sign in here
        </button>
      </p>

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
  );
};

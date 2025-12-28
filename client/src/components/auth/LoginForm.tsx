import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Home } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { LoginFormValues } from "@/types/auth";

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: () => void;
  onGoogleLogin: () => void;
  isSubmitting: boolean;
}

export const LoginForm = ({
  form,
  onSubmit,
  onGoogleLogin,
  isSubmitting,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* Google Login Button */}
      <div className="mb-4">
        <button
          onClick={onGoogleLogin}
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
            Continue with Google
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-white/80 backdrop-blur-md text-slate-500 font-medium rounded-full py-0.5 border border-slate-100">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
        <div className="space-y-3 sm:space-y-4">
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              {...form.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`peer w-full px-4 pt-5 pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-saffron-500/10 focus:border-saffron-500 focus:bg-white transition-all duration-300 placeholder-transparent text-sm sm:text-base ${
                form.formState.errors.email
                  ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                  : "hover:border-gray-300"
              }`}
              placeholder="your.email@example.com"
            />
            <label className="absolute left-4 top-1.5 text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-saffron-600">
              Email Address
            </label>
            <Mail className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 peer-focus:text-saffron-500 transition-colors" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...form.register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`peer w-full px-4 pt-5 pb-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-saffron-500/10 focus:border-saffron-500 focus:bg-white transition-all duration-300 placeholder-transparent pr-16 text-sm sm:text-base ${
                form.formState.errors.password
                  ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                  : "hover:border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <label className="absolute left-4 top-1.5 text-xs font-light text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-saffron-600">
              Password
            </label>
            <div className="absolute right-3 top-3.5 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-1 -mr-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  {...form.register("rememberMe")}
                  className="peer h-3.5 w-3.5 rounded border-gray-300 text-saffron-600 focus:ring-saffron-500 transition-all cursor-pointer"
                />
              </div>
              <span className="ml-2 text-xs text-gray-600 group-hover:text-gray-800 transition-colors">
                Keep me signed in
              </span>
            </label>
            <button
              onClick={() => navigate("/forgot-password")}
              type="button"
              className="text-xs text-saffron-600 hover:text-saffron-700 font-semibold hover:underline transition-all cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-11 sm:h-12 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base flex items-center justify-center ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-saffron-500 via-saffron-600 to-india-green-500 hover:from-saffron-600 hover:via-saffron-700 hover:to-india-green-600 text-white shadow-lg shadow-saffron-500/25 hover:shadow-saffron-500/40 transform hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      {/* Sign Up Link */}
      <p className="text-center mt-4 sm:mt-5 text-gray-600 text-xs sm:text-sm">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-saffron-600 hover:text-saffron-700 font-bold transition-colors hover:underline hover:cursor-pointer ml-1"
        >
          Join our mission
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

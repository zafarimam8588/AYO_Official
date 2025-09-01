import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
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
      <div className="mb-6">
        <button
          onClick={onGoogleRegister}
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
          <span className="group-hover:text-gray-700 transition-colors">
            Quick Sign Up with Google
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
            Or register with email
          </span>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                {...form.register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  form.formState.errors.firstName
                    ? "border-red-300 focus:ring-red-500"
                    : ""
                }`}
                placeholder="John"
              />
              <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
            {form.formState.errors.firstName && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                {...form.register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                  form.formState.errors.lastName
                    ? "border-red-300 focus:ring-red-500"
                    : ""
                }`}
                placeholder="Doe"
              />
              <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
            {form.formState.errors.lastName && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Email Address
          </label>
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
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                form.formState.errors.email
                  ? "border-red-300 focus:ring-red-500"
                  : ""
              }`}
              placeholder="your.email@example.com"
            />
            <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...form.register("password", {
                  required: "Password is required",
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
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 pr-20 ${
                  form.formState.errors.password
                    ? "border-red-300 focus:ring-red-500"
                    : ""
                }`}
                placeholder="Password"
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
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...form.register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 pr-20 ${
                  form.formState.errors.confirmPassword
                    ? "border-red-300 focus:ring-red-500"
                    : ""
                }`}
                placeholder="Confirm password"
              />
              <div className="absolute right-3 top-3 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...form.register("agreeToTerms", {
                required: "You must agree to the terms and conditions",
              })}
              className="w-4 h-4 accent-green-600 focus:ring-2 focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to{" "}
              <button
                type="button"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Terms & Privacy
              </button>
            </span>
          </label>
        </div>
        {form.formState.errors.agreeToTerms && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.agreeToTerms.message}
          </p>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-green-500 to-orange-500 text-white hover:from-green-600 hover:to-orange-600 hover:shadow-lg transform hover:scale-[1.02]"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account & Start Impact 🚀"
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-center mt-8 text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline hover:cursor-pointer"
        >
          Sign in here
        </button>
      </p>
    </div>
  );
};

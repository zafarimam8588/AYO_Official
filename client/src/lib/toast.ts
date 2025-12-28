import toast from "react-hot-toast";

/**
 * Toast styles for different notification types
 */
const infoStyles = {
  background: "#eff6ff",
  color: "#1e40af",
  border: "1px solid #bfdbfe",
};

const warningStyles = {
  background: "#fffbeb",
  color: "#b45309",
  border: "1px solid #fde68a",
};

/**
 * Centralized toast notification utility
 * Provides consistent styling and behavior across the application
 */
export const showToast = {
  /**
   * Success notification - green themed
   * Use for: successful operations, confirmations
   */
  success: (message: string, options?: Parameters<typeof toast.success>[1]) => {
    return toast.success(message, options);
  },

  /**
   * Error notification - red themed
   * Use for: failed operations, validation errors, network failures
   */
  error: (message: string, options?: Parameters<typeof toast.error>[1]) => {
    return toast.error(message, options);
  },

  /**
   * Info notification - blue themed
   * Use for: informational messages, tips, neutral updates
   */
  info: (message: string, options?: Parameters<typeof toast>[1]) => {
    return toast(message, {
      icon: "ℹ️",
      style: infoStyles,
      duration: 4000,
      ...options,
    });
  },

  /**
   * Warning notification - amber themed
   * Use for: caution messages, potentially risky actions
   */
  warning: (message: string, options?: Parameters<typeof toast>[1]) => {
    return toast(message, {
      icon: "⚠️",
      style: warningStyles,
      duration: 5000,
      ...options,
    });
  },

  /**
   * Loading notification - shows spinner
   * Returns toast ID for later dismissal/update
   */
  loading: (message: string, options?: Parameters<typeof toast.loading>[1]) => {
    return toast.loading(message, options);
  },

  /**
   * Promise-based toast - shows loading, then success/error
   * Ideal for async operations
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
    },
    options?: Parameters<typeof toast.promise>[2]
  ) => {
    return toast.promise(promise, messages, options);
  },

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss: (toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },

  /**
   * Custom toast with full control
   */
  custom: (
    message: string,
    options?: Parameters<typeof toast>[1] & { icon?: string }
  ) => {
    return toast(message, options);
  },
};

/**
 * Standardized toast messages for common scenarios
 */
export const toastMessages = {
  // Success messages
  profileUpdated: "Profile updated successfully!",
  memberApproved: "Member approved successfully!",
  memberRejected: "Member rejected successfully!",
  emailSent: "Email sent successfully!",
  dataSaved: "Changes saved successfully!",
  deleted: "Deleted successfully!",
  copied: "Copied to clipboard!",

  // Error messages
  loadFailed: "Failed to load data. Please try again.",
  saveFailed: "Failed to save changes. Please try again.",
  networkError: "Network error. Please check your connection.",
  authFailed: "Authentication failed. Please login again.",
  accessDenied: "Access denied. Insufficient permissions.",
  invalidInput: "Please check your input and try again.",

  // Info messages
  loading: "Loading...",
  processing: "Processing your request...",
  noData: "No data available.",

  // Warning messages
  unsavedChanges: "You have unsaved changes.",
  confirmDelete: "This action cannot be undone.",
  sessionExpiring: "Your session will expire soon.",
};

export default showToast;

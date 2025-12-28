/**
 * Email Input Validation and Sanitization Utilities
 * Prevents XSS, HTML injection, and other attacks in email templates
 */

// HTML entities to escape
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

// Regex patterns for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-()]+$/;
const URL_REGEX = /^https?:\/\/[^\s<>"{}|\\^`[\]]+$/;
const DANGEROUS_PATTERNS = [
  /<script[^>]*>[\s\S]*?<\/script>/gi,
  /<iframe[^>]*>[\s\S]*?<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // onclick, onload, etc.
  /data:/gi,
  /vbscript:/gi,
];

export interface SanitizationOptions {
  maxLength?: number;
  allowHtml?: boolean;
  stripNewlines?: boolean;
  preserveNewlines?: boolean;
  trim?: boolean;
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(str: string): string {
  if (!str) {
    return "";
  }
  return str.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Remove potentially dangerous HTML/script content
 */
export function stripDangerousContent(str: string): string {
  if (!str) {
    return "";
  }
  let result = str;

  // Remove dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    result = result.replace(pattern, "");
  }

  return result;
}

/**
 * Sanitize input for safe use in email templates
 */
export function sanitizeForEmail(
  input: string,
  options: SanitizationOptions = {}
): string {
  if (!input) {
    return "";
  }

  const {
    maxLength,
    allowHtml = false,
    stripNewlines = false,
    preserveNewlines = false,
    trim = true,
  } = options;

  let result = input;

  // Trim whitespace
  if (trim) {
    result = result.trim();
  }

  // Apply length limit
  if (maxLength && result.length > maxLength) {
    result = result.substring(0, maxLength);
  }

  // Strip dangerous content first
  result = stripDangerousContent(result);

  // Handle newlines
  if (stripNewlines) {
    result = result.replace(/[\r\n]+/g, " ");
  } else if (preserveNewlines) {
    // Convert newlines to <br> tags (after HTML escaping)
    result = escapeHtml(result);
    result = result.replace(/\n/g, "<br>");
    return result; // Return early as we've already escaped
  }

  // HTML escape (unless explicitly allowed for admin templates)
  if (!allowHtml) {
    result = escapeHtml(result);
  }

  return result;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }
  if (email.length > 254) {
    return false;
  } // RFC 5321 limit
  return EMAIL_REGEX.test(email.trim().toLowerCase());
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") {
    return false;
  }
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (cleaned.length < 10 || cleaned.length > 15) {
    return false;
  }
  return PHONE_REGEX.test(phone);
}

/**
 * Validate URL format (only http/https)
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }
  if (url.length > 2048) {
    return false;
  } // Reasonable URL length limit
  return URL_REGEX.test(url);
}

/**
 * Sanitize a user's name for display in emails
 */
export function sanitizeName(name: string): string {
  return sanitizeForEmail(name, {
    maxLength: 100,
    stripNewlines: true,
    trim: true,
  });
}

/**
 * Sanitize a subject line for emails
 */
export function sanitizeSubject(subject: string): string {
  return sanitizeForEmail(subject, {
    maxLength: 200,
    stripNewlines: true,
    trim: true,
  });
}

/**
 * Sanitize message body content
 */
export function sanitizeMessageBody(
  message: string,
  options: { maxLength?: number; allowLineBreaks?: boolean } = {}
): string {
  const { maxLength = 10000, allowLineBreaks = true } = options;

  return sanitizeForEmail(message, {
    maxLength,
    preserveNewlines: allowLineBreaks,
    trim: true,
  });
}

/**
 * Sanitize an OTP for display (should only contain digits)
 */
export function sanitizeOTP(otp: string): string {
  if (!otp) {
    return "";
  }
  // OTP should only contain digits
  return otp.replace(/[^0-9]/g, "").substring(0, 10);
}

/**
 * Sanitize a membership ID for display
 */
export function sanitizeMembershipId(id: string): string {
  if (!id) {
    return "";
  }
  // Membership ID should only contain alphanumeric and hyphens
  return id.replace(/[^a-zA-Z0-9-]/g, "").substring(0, 50);
}

/**
 * Sanitize a currency amount for display
 */
export function sanitizeAmount(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "0";
  }
  // Format as Indian currency
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/**
 * Validate and sanitize email template data object
 */
export function sanitizeTemplateData<T extends Record<string, unknown>>(
  data: T,
  schema: {
    [K in keyof T]?: {
      type: "string" | "number" | "boolean" | "date" | "email" | "url";
      maxLength?: number;
      required?: boolean;
      sanitize?: boolean;
    };
  }
): T {
  const result: Record<string, unknown> = {};

  for (const [key, config] of Object.entries(schema)) {
    if (!config) {
      continue;
    }

    const value = data[key as keyof T];

    if (config.required && (value === undefined || value === null)) {
      throw new Error(`Missing required field: ${key}`);
    }

    if (value === undefined || value === null) {
      result[key] = value;
      continue;
    }

    switch (config.type) {
      case "string":
        result[key] = config.sanitize
          ? sanitizeForEmail(String(value), { maxLength: config.maxLength })
          : String(value);
        break;
      case "number":
        result[key] = Number(value);
        break;
      case "boolean":
        result[key] = Boolean(value);
        break;
      case "date":
        result[key] = value instanceof Date ? value : new Date(String(value));
        break;
      case "email": {
        const email = String(value).toLowerCase().trim();
        if (!isValidEmail(email)) {
          throw new Error(`Invalid email format: ${key}`);
        }
        result[key] = email;
        break;
      }
      case "url": {
        const url = String(value);
        if (!isValidUrl(url)) {
          throw new Error(`Invalid URL format: ${key}`);
        }
        result[key] = url;
        break;
      }
    }
  }

  return result as T;
}

/**
 * Create a safe preheader text (for email preview)
 */
export function createPreheader(text: string, maxLength: number = 150): string {
  const sanitized = sanitizeForEmail(text, {
    maxLength,
    stripNewlines: true,
  });

  // Pad with invisible characters to prevent email clients from showing body content
  const padding = "\u200C\u00A0".repeat(75);
  return sanitized + padding;
}

// Email Template Styles - AYO Tricolor Theme
// Saffron: #FF9933, White: #FFFFFF, India Green: #138808

export const BRAND_COLORS = {
  // Primary Tricolor
  saffron: "#FF9933",
  white: "#FFFFFF",
  green: "#138808",

  // Derived/Light variants
  saffronLight: "#FFF5EB",
  greenLight: "#E8F5E8",
  saffronDark: "#E67300",
  greenDark: "#0D5C06",

  // Text colors
  textPrimary: "#2C3E50",
  textSecondary: "#666666",
  textMuted: "#999999",
  textLight: "#CBD5E1",

  // Background colors
  bgLight: "#F9F9F9",
  bgLighter: "#F5F5F5",
  bgWhite: "#FFFFFF",
  bgFooter: "#F8FAFC",

  // Status colors
  warning: "#FFF3CD",
  warningBorder: "#FFEAA7",
  warningText: "#856404",
  info: "#E3F2FD",
  infoBorder: "#1976D2",
  infoText: "#1976D2",
  success: "#E8F5E8",
  successBorder: "#138808",
  successText: "#138808",

  // Divider/Border
  divider: "#E2E8F0",
  border: "#DDD",
} as const;

export const GRADIENTS = {
  // Header gradient (tricolor effect)
  tricolorHeader:
    "linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",

  // CTA button gradient
  ctaButton: "linear-gradient(135deg, #FF9933, #138808)",

  // Header accent (horizontal bar)
  headerAccent: "linear-gradient(90deg, #FF9933, #138808)",

  // Membership card background
  membershipCard: "linear-gradient(135deg, #FF9933, #138808)",

  // Newsletter header
  newsletterHeader: "linear-gradient(135deg, #FF9933 0%, #138808 100%)",

  // Social section background
  socialSection: "linear-gradient(135deg, #FFF5EB 0%, #E8F5E8 100%)",
} as const;

export const FONTS = {
  primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  fallback: "Arial, sans-serif",
} as const;

export const INLINE_STYLES = `
  /* Reset styles for email clients */
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }

  /* Responsive styles */
  @media only screen and (max-width: 600px) {
    .email-container { width: 100% !important; min-width: 100% !important; }
    .content-area { padding: 20px 15px !important; }
    .header-padding { padding: 25px 15px !important; }
    .header-title { font-size: 22px !important; }
    .header-subtitle { font-size: 13px !important; }
    .content-title { font-size: 20px !important; }
    .message-text { font-size: 15px !important; }
    .cta-button { display: block !important; width: 100% !important; padding: 16px 20px !important; text-align: center !important; }
    .otp-display { font-size: 32px !important; letter-spacing: 6px !important; }
    .two-column { display: block !important; width: 100% !important; }
    .mobile-center { text-align: center !important; }
    .mobile-full-width { width: 100% !important; max-width: 100% !important; }
    .footer-padding { padding: 20px 15px !important; }
    .social-icon { width: 32px !important; height: 32px !important; }
  }

  /* Dark mode support (for clients that support it) */
  @media (prefers-color-scheme: dark) {
    .email-body { background-color: #1a1a1a !important; }
    .content-area { background-color: #2d2d2d !important; }
    .text-primary { color: #e0e0e0 !important; }
    .text-secondary { color: #b0b0b0 !important; }
  }
`;

// Social media links
export const SOCIAL_LINKS = {
  twitter: "https://x.com/AYOindia1",
  facebook: "https://www.facebook.com/share/19sKrxDR6F/",
  instagram: "https://www.instagram.com/azadyouthorg",
} as const;

// Contact information
export const CONTACT_INFO = {
  email: "ayoindia1@gmail.com",
  phone: "+91 9942495941",
  address: "Main Road, Motihari, East Champaran - 845401, Bihar",
  orgName: "Azad Youth Organisation",
  tagline: "Empowering Bihar's Youth | Building Better Communities",
} as const;

// Email configuration
export const EMAIL_CONFIG = {
  maxWidth: 600,
  contentPadding: 35,
  headerPadding: 30,
  footerPadding: 30,
  borderRadius: {
    small: 8,
    medium: 15,
    large: 25,
    button: 30,
  },
} as const;

// Helper function to generate preheader padding
export function generatePreheaderPadding(length: number = 150): string {
  return "&nbsp;&zwnj;".repeat(length);
}

// Helper function to get current year
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

// Helper function to format date for India locale
export function formatDateIN(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Helper function to format currency
export function formatCurrencyINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

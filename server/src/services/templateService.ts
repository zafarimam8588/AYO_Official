import fs from "fs";
import path from "path";

import Handlebars from "handlebars";
import { convert } from "html-to-text";

import {
  BRAND_COLORS,
  GRADIENTS,
  INLINE_STYLES,
  SOCIAL_LINKS,
  CONTACT_INFO,
  EMAIL_CONFIG,
  getCurrentYear,
  formatDateIN,
  formatCurrencyINR,
  generatePreheaderPadding,
} from "../templates/email/base/styles";

interface TemplateData {
  [key: string]: unknown;
}

interface CompiledEmail {
  html: string;
  text: string;
}

class TemplateService {
  private templatesDir: string;
  private compiledTemplates: Map<string, HandlebarsTemplateDelegate>;
  private partialsRegistered: boolean = false;

  constructor() {
    this.templatesDir = path.join(__dirname, "../templates/email");
    this.compiledTemplates = new Map();
    this.registerHelpers();
  }

  private registerHelpers(): void {
    // Date formatting helper
    Handlebars.registerHelper("formatDate", (date: Date | string) => {
      const d = typeof date === "string" ? new Date(date) : date;
      return formatDateIN(d);
    });

    // Currency formatting helper
    Handlebars.registerHelper("formatCurrency", (amount: number) => {
      return formatCurrencyINR(amount);
    });

    // Current year helper
    Handlebars.registerHelper("currentYear", () => {
      return getCurrentYear();
    });

    // Conditional equality helper
    Handlebars.registerHelper("eq", (a: unknown, b: unknown) => a === b);

    // Conditional not equal helper
    Handlebars.registerHelper("neq", (a: unknown, b: unknown) => a !== b);

    // If greater than helper
    Handlebars.registerHelper("gt", (a: number, b: number) => a > b);

    // If less than helper
    Handlebars.registerHelper("lt", (a: number, b: number) => a < b);

    // Uppercase helper
    Handlebars.registerHelper("uppercase", (str: string) => {
      return str ? str.toUpperCase() : "";
    });

    // Lowercase helper
    Handlebars.registerHelper("lowercase", (str: string) => {
      return str ? str.toLowerCase() : "";
    });

    // Capitalize first letter helper
    Handlebars.registerHelper("capitalize", (str: string) => {
      if (!str) {
        return "";
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    // Join array with separator
    Handlebars.registerHelper("join", (arr: string[], separator: string) => {
      return Array.isArray(arr) ? arr.join(separator) : "";
    });

    // Truncate text helper
    Handlebars.registerHelper("truncate", (str: string, length: number) => {
      if (!str || str.length <= length) {
        return str;
      }
      return str.substring(0, length) + "...";
    });

    // Safe HTML output (already escaped by Handlebars by default)
    Handlebars.registerHelper("raw", (content: string) => {
      return new Handlebars.SafeString(content);
    });

    // Paragraph splitter for newsletter content
    Handlebars.registerHelper("splitParagraphs", (text: string) => {
      if (!text) {
        return "";
      }
      const paragraphs = text
        .split("\n")
        .filter((p) => p.trim())
        .map(
          (p) =>
            `<p style="margin: 0 0 18px 0; color: #4a5568; line-height: 1.8; font-size: 16px;">${Handlebars.Utils.escapeExpression(p)}</p>`
        )
        .join("");
      return new Handlebars.SafeString(paragraphs);
    });
  }

  private registerPartials(): void {
    if (this.partialsRegistered) {
      return;
    }

    const partialsToRegister = [
      { name: "header", file: "base/header.hbs" },
      { name: "footer", file: "base/footer.hbs" },
      { name: "button", file: "components/button.hbs" },
      { name: "alertBox", file: "components/alert-box.hbs" },
    ];

    for (const partial of partialsToRegister) {
      const partialPath = path.join(this.templatesDir, partial.file);
      if (fs.existsSync(partialPath)) {
        const partialContent = fs.readFileSync(partialPath, "utf-8");
        Handlebars.registerPartial(partial.name, partialContent);
      }
    }

    this.partialsRegistered = true;
  }

  private loadTemplate(templateName: string): HandlebarsTemplateDelegate {
    // Check cache first
    if (this.compiledTemplates.has(templateName)) {
      return this.compiledTemplates.get(templateName)!;
    }

    // Register partials if not done yet
    this.registerPartials();

    // Load and compile template
    const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templateName}`);
    }

    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const compiled = Handlebars.compile(templateContent);

    // Cache compiled template
    this.compiledTemplates.set(templateName, compiled);

    return compiled;
  }

  private loadLayout(): HandlebarsTemplateDelegate {
    return this.loadTemplate("base/layout");
  }

  private getBaseData(): TemplateData {
    return {
      // Brand colors
      colors: BRAND_COLORS,
      gradients: GRADIENTS,

      // Inline styles
      inlineStyles: INLINE_STYLES,

      // Social links
      socialLinks: SOCIAL_LINKS,

      // Contact info
      contact: CONTACT_INFO,

      // Email config
      config: EMAIL_CONFIG,

      // Frontend URL
      frontendUrl: process.env.FRONTEND_URL || "https://ayoindia.org",

      // Current year
      currentYear: getCurrentYear(),

      // Preheader padding
      preheaderPadding: generatePreheaderPadding(),
    };
  }

  async compile(templateName: string, data: TemplateData): Promise<string> {
    try {
      // Load content template
      const contentTemplate = this.loadTemplate(templateName);

      // Render content first
      const mergedData = { ...this.getBaseData(), ...data };
      const renderedContent = contentTemplate(mergedData);

      // Load layout and wrap content
      const layout = this.loadLayout();
      const finalHtml = layout({
        ...mergedData,
        body: renderedContent,
      });

      return finalHtml;
    } catch (error) {
      console.error(`Error compiling template ${templateName}:`, error);
      throw error;
    }
  }

  async compileWithPlainText(
    templateName: string,
    data: TemplateData
  ): Promise<CompiledEmail> {
    const html = await this.compile(templateName, data);
    const text = this.generatePlainText(html);

    return { html, text };
  }

  private generatePlainText(html: string): string {
    return convert(html, {
      wordwrap: 80,
      selectors: [
        { selector: "a", options: { hideLinkHrefIfSameAsText: true } },
        { selector: "img", format: "skip" },
        { selector: "style", format: "skip" },
        { selector: ".social-links", format: "skip" },
        { selector: ".preheader", format: "skip" },
      ],
    });
  }

  // Convenience methods for each email type
  async compileOTPEmail(
    otp: string,
    type: "email-verification" | "password-reset",
    expiryMinutes: number = 10
  ): Promise<CompiledEmail> {
    const isVerification = type === "email-verification";
    return this.compileWithPlainText("auth/otp", {
      otp,
      type,
      isVerification,
      expiryMinutes,
      subject: isVerification
        ? "Verify Your Email - AYO"
        : "Reset Your Password - AYO",
      title: isVerification ? "Verify Your Email" : "Reset Your Password",
      preheader: isVerification
        ? `Your verification code is ${otp}. Valid for ${expiryMinutes} minutes.`
        : `Your password reset code is ${otp}. Valid for ${expiryMinutes} minutes.`,
      message: isVerification
        ? "Please use the following OTP to verify your email address and complete your registration:"
        : "Please use the following OTP to reset your password:",
    });
  }

  async compileWelcomeEmail(user: {
    fullName: string;
    email: string;
  }): Promise<CompiledEmail> {
    return this.compileWithPlainText("auth/welcome", {
      fullName: user.fullName,
      email: user.email,
      subject: "Welcome to Azad Youth Organisation - Application Received",
      preheader: `Welcome ${user.fullName}! Your application has been received.`,
    });
  }

  async compileMembershipApprovalEmail(memberData: {
    fullName: string;
    membershipId: string;
    approvedAt: Date;
    approvedBy: string;
  }): Promise<CompiledEmail> {
    return this.compileWithPlainText("membership/approved", {
      ...memberData,
      subject: "Membership Approved - Welcome to AYO Family!",
      preheader: `Congratulations ${memberData.fullName}! Your membership has been approved.`,
    });
  }

  async compileMembershipRejectionEmail(
    name: string,
    reason?: string
  ): Promise<CompiledEmail> {
    return this.compileWithPlainText("membership/rejected", {
      name,
      reason,
      hasReason: !!reason,
      subject: "Membership Application Update - AYO",
      preheader: `Dear ${name}, we have an update on your membership application.`,
    });
  }

  async compileNewsletterEmail(
    subject: string,
    message: string
  ): Promise<CompiledEmail> {
    return this.compileWithPlainText("newsletter/newsletter", {
      subject,
      message,
      preheader: message.substring(0, 100) + "...",
      showUnsubscribe: true,
    });
  }

  async compileDonationThankYouEmail(
    donorName: string,
    amount: number,
    isAnonymous: boolean
  ): Promise<CompiledEmail> {
    return this.compileWithPlainText("donation/thank-you", {
      donorName: isAnonymous ? "Generous Donor" : donorName,
      amount,
      isAnonymous,
      subject: "Thank You for Your Generous Donation - AYO",
      preheader: `Thank you for your generous donation of ${formatCurrencyINR(amount)}!`,
    });
  }

  async compileContactReplyEmail(
    originalSubject: string,
    originalMessage: string,
    replyContent: string
  ): Promise<CompiledEmail> {
    return this.compileWithPlainText("contact/reply", {
      originalSubject,
      originalMessage,
      replyContent,
      subject: `Re: ${originalSubject}`,
      preheader: `We have replied to your message: "${originalSubject}"`,
    });
  }

  // Clear template cache (useful for development)
  clearCache(): void {
    this.compiledTemplates.clear();
    this.partialsRegistered = false;
  }
}

export default new TemplateService();

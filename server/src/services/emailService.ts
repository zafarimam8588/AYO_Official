import nodemailer, { Transporter } from "nodemailer";

import { OTP_CONFIG } from "../models/OTPModel";
import {
  sanitizeName,
  sanitizeSubject,
  sanitizeMessageBody,
  sanitizeOTP,
  sanitizeMembershipId,
  sanitizeAmount,
} from "../utils/emailValidator";

import emailQueueService, {
  EmailJob,
  EmailPriority,
} from "./emailQueueService";
import templateService from "./templateService";

// Email configuration
const EMAIL_CONFIG = {
  useQueue: process.env.EMAIL_QUEUE_ENABLED !== "false",
  secure: process.env.MAIL_SECURE === "true",
};

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: EMAIL_CONFIG.secure,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Configure queue to use our send function
    emailQueueService.setSendEmailFunction(this.processQueuedEmail.bind(this));
  }

  /**
   * Start the email queue worker
   */
  startQueueWorker(): void {
    if (EMAIL_CONFIG.useQueue) {
      emailQueueService.startWorker();
    }
  }

  /**
   * Stop the email queue worker
   */
  stopQueueWorker(): void {
    emailQueueService.stopWorker();
  }

  /**
   * Process a queued email job
   */
  private async processQueuedEmail(job: EmailJob): Promise<void> {
    const { html, text } = await templateService.compileWithPlainText(
      job.templateName,
      job.templateData
    );

    await this.sendRaw({
      to: job.to,
      subject: job.subject,
      html,
      text,
    });
  }

  /**
   * Send email directly (bypassing queue)
   */
  private async sendRaw(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }): Promise<void> {
    const mailOptions = {
      from: `"Azad Youth Organisation" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Queue an email for sending
   */
  private async queueEmail(options: {
    to: string;
    subject: string;
    templateName: string;
    templateData: Record<string, unknown>;
    priority?: EmailPriority;
    tags?: string[];
  }): Promise<string> {
    return emailQueueService.enqueue({
      to: options.to,
      subject: options.subject,
      templateName: options.templateName,
      templateData: options.templateData,
      priority: options.priority || "normal",
      maxAttempts: 3,
      tags: options.tags,
    });
  }

  /**
   * Send an email (using queue or directly based on config)
   */
  private async sendEmailInternal(options: {
    to: string;
    subject: string;
    templateName: string;
    templateData: Record<string, unknown>;
    priority?: EmailPriority;
    sendImmediately?: boolean;
    tags?: string[];
  }): Promise<void> {
    // High priority emails (like OTP) should be sent immediately
    const shouldSendImmediately =
      options.sendImmediately ||
      options.priority === "high" ||
      !EMAIL_CONFIG.useQueue;

    if (shouldSendImmediately) {
      const { html, text } = await templateService.compileWithPlainText(
        options.templateName,
        options.templateData
      );

      await this.sendRaw({
        to: options.to,
        subject: options.subject,
        html,
        text,
      });
    } else {
      await this.queueEmail({
        to: options.to,
        subject: options.subject,
        templateName: options.templateName,
        templateData: options.templateData,
        priority: options.priority,
        tags: options.tags,
      });
    }
  }

  /**
   * Send OTP email for verification or password reset
   */
  async sendOTPEmail(
    email: string,
    otp: string,
    type: "email-verification" | "password-reset"
  ): Promise<void> {
    const isVerification = type === "email-verification";
    const sanitizedOTP = sanitizeOTP(otp);

    const subject = isVerification
      ? "Verify Your Email - AYO"
      : "Reset Your Password - AYO";

    await this.sendEmailInternal({
      to: email,
      subject,
      templateName: "auth/otp",
      templateData: {
        otp: sanitizedOTP,
        type,
        isVerification,
        expiryMinutes: OTP_CONFIG.expiryMinutes,
        title: isVerification ? "Verify Your Email" : "Reset Your Password",
        preheader: isVerification
          ? `Your verification code is ${sanitizedOTP}. Valid for ${OTP_CONFIG.expiryMinutes} minutes.`
          : `Your password reset code is ${sanitizedOTP}. Valid for ${OTP_CONFIG.expiryMinutes} minutes.`,
        message: isVerification
          ? "Please use the following OTP to verify your email address and complete your registration:"
          : "Please use the following OTP to reset your password:",
      },
      priority: "high", // OTPs should be sent immediately
      sendImmediately: true,
      tags: ["otp", type],
    });
  }

  /**
   * Send membership approval email
   */
  async sendMembershipApprovalEmail(
    userEmail: string,
    memberData: {
      fullName: string;
      membershipId: string;
      approvedAt: Date;
      approvedBy: string;
    }
  ): Promise<void> {
    const sanitizedName = sanitizeName(memberData.fullName);
    const sanitizedMembershipId = sanitizeMembershipId(memberData.membershipId);
    const sanitizedApprovedBy = sanitizeName(memberData.approvedBy);

    await this.sendEmailInternal({
      to: userEmail,
      subject: "Membership Approved - Welcome to AYO Family!",
      templateName: "membership/approved",
      templateData: {
        fullName: sanitizedName,
        membershipId: sanitizedMembershipId,
        approvedAt: memberData.approvedAt,
        approvedBy: sanitizedApprovedBy,
        preheader: `Congratulations ${sanitizedName}! Your membership has been approved.`,
      },
      priority: "normal",
      tags: ["membership", "approved"],
    });
  }

  /**
   * Send membership rejection email
   */
  async sendMembershipRejectionEmail(
    email: string,
    name: string,
    reason?: string
  ): Promise<void> {
    const sanitizedName = sanitizeName(name);
    const sanitizedReason = reason
      ? sanitizeMessageBody(reason, { maxLength: 1000 })
      : undefined;

    await this.sendEmailInternal({
      to: email,
      subject: "Membership Application Update - AYO",
      templateName: "membership/rejected",
      templateData: {
        name: sanitizedName,
        reason: sanitizedReason,
        hasReason: !!sanitizedReason,
        preheader: `Dear ${sanitizedName}, we have an update on your membership application.`,
      },
      priority: "normal",
      tags: ["membership", "rejected"],
    });
  }

  /**
   * Send newsletter to subscriber
   */
  async sendNewsletterToSubscriber(
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    const sanitizedSubject = sanitizeSubject(subject);
    const sanitizedMessage = sanitizeMessageBody(message, {
      maxLength: 10000,
      allowLineBreaks: true,
    });

    await this.sendEmailInternal({
      to: email,
      subject: sanitizedSubject,
      templateName: "newsletter/newsletter",
      templateData: {
        subject: sanitizedSubject,
        message: sanitizedMessage,
        preheader: sanitizedMessage.substring(0, 100) + "...",
        showUnsubscribe: true,
      },
      priority: "low",
      tags: ["newsletter"],
    });
  }

  /**
   * Send donation thank you email
   */
  async sendDonationThankYou(
    donorEmail: string,
    donorName: string,
    amount: number,
    isAnonymous: boolean
  ): Promise<void> {
    const displayName = isAnonymous
      ? "Generous Donor"
      : sanitizeName(donorName);

    await this.sendEmailInternal({
      to: donorEmail,
      subject: "Thank You for Your Generous Donation - AYO",
      templateName: "donation/thank-you",
      templateData: {
        donorName: displayName,
        amount,
        isAnonymous,
        preheader: `Thank you for your generous donation of ₹${sanitizeAmount(amount)}!`,
      },
      priority: "normal",
      tags: ["donation", "thank-you"],
    });
  }

  /**
   * Send contact message reply
   */
  async sendContactReply(
    to: string,
    originalSubject: string,
    originalMessage: string,
    replyContent: string
  ): Promise<void> {
    const sanitizedOriginalSubject = sanitizeSubject(originalSubject);
    const sanitizedOriginalMessage = sanitizeMessageBody(originalMessage, {
      maxLength: 2000,
    });
    const sanitizedReply = sanitizeMessageBody(replyContent, {
      maxLength: 5000,
      allowLineBreaks: true,
    });

    await this.sendEmailInternal({
      to,
      subject: `Re: ${sanitizedOriginalSubject}`,
      templateName: "contact/reply",
      templateData: {
        originalSubject: sanitizedOriginalSubject,
        originalMessage: sanitizedOriginalMessage,
        replyContent: sanitizedReply,
        preheader: `We have replied to your message: "${sanitizedOriginalSubject}"`,
      },
      priority: "normal",
      tags: ["contact", "reply"],
    });
  }

  /**
   * Generic send email method (for backwards compatibility)
   * This method accepts raw HTML content
   */
  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string
  ): Promise<void> {
    const mailOptions = {
      from: `"Azad Youth Organization" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Get email queue statistics
   */
  async getQueueStats() {
    return emailQueueService.getStats();
  }

  /**
   * Get failed emails from queue
   */
  async getFailedEmails(options?: { limit?: number; since?: Date }) {
    return emailQueueService.getFailedJobs(options);
  }

  /**
   * Retry a failed email
   */
  async retryFailedEmail(jobId: string): Promise<boolean> {
    return emailQueueService.retryFailedJob(jobId);
  }

  /**
   * Check if queue is enabled
   */
  isQueueEnabled(): boolean {
    return emailQueueService.isEnabled();
  }
}

// Singleton instance
const emailService = new EmailService();

export default emailService;

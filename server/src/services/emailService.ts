import nodemailer, { Transporter } from "nodemailer";
import { IUser } from "../types";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendOTPEmail(
    email: string,
    otp: string,
    type: "email-verification" | "password-reset"
  ): Promise<void> {
    const subject =
      type === "email-verification"
        ? "Verify Your Email - AYO"
        : "Reset Your Password - AYO";
    const title =
      type === "email-verification"
        ? "Verify Your Email"
        : "Reset Your Password";
    const message =
      type === "email-verification"
        ? "Please use the following OTP to verify your email address and complete your registration:"
        : "Please use the following OTP to reset your password:";

    const mailOptions = {
      from: `"Azad Youth Organisation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF9933, #FFFFFF, #138808); padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">${title}</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9; text-align: center;">
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              ${message}
            </p>
            <div style="background: white; border: 3px solid #138808; 
                        padding: 25px; margin: 25px 0; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
              <h2 style="color: #138808; font-size: 42px; margin: 0; letter-spacing: 10px; font-weight: bold;">
                ${otp}
              </h2>
            </div>
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; 
                        border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                ⏰ This OTP will expire in <strong>10 minutes</strong>
              </p>
            </div>
            <p style="color: #666; line-height: 1.6; margin-top: 30px;">
              If you didn't request this verification, please ignore this email or contact our support team.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              This is an automated message from Azad Youth Organisation. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendWelcomeEmail(user: IUser): Promise<void> {
    const mailOptions = {
      from: `"Azad Youth Organisation" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Welcome to Azad Youth Organisation - Application Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF9933, #FFFFFF, #138808); padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">Welcome to AYO!</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Hello ${user.fullName},</h2>
            <p style="color: #666; line-height: 1.6;">
              Thank you for applying to become a member of Azad Youth Organisation! 
              We're excited about your interest in joining our mission to empower Bihar's youth.
            </p>
            <div style="background: white; border-left: 4px solid #138808; padding: 20px; margin: 20px 0;">
              <h3 style="color: #138808; margin: 0 0 10px 0;">What's Next?</h3>
              <ul style="color: #666; margin: 0; padding-left: 20px;">
                <li>Our team will review your application within 2-3 business days</li>
                <li>You'll receive an email notification about the status</li>
                <li>If approved, you'll get your unique membership ID</li>
              </ul>
            </div>
            <p style="color: #666; line-height: 1.6;">
              Your application status: <strong style="color: #FF9933;">Under Review</strong>
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" 
                 style="background: linear-gradient(135deg, #FF9933, #138808); 
                        color: white; padding: 12px 30px; text-decoration: none; 
                        border-radius: 25px; display: inline-block;">
                Check Application Status
              </a>
            </div>
            <p style="color: #666; line-height: 1.6;">
              Together, we can create lasting positive change in Bihar's communities.
            </p>
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>Team Azad Youth Organisation</strong>
            </p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendMembershipApprovalEmail(
    userEmail: string,
    memberData: {
      fullName: string;
      membershipId: string;
      approvedAt: Date;
      approvedBy: string;
    }
  ): Promise<void> {
    const mailOptions = {
      from: `"Azad Youth Organisation" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🎉 Membership Approved - Welcome to AYO Family!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF9933, #FFFFFF, #138808); padding: 25px; text-align: center;">
            <h1 style="color: #333; margin: 0; font-size: 28px;">🎉 Membership Approved!</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Congratulations ${
              memberData.fullName
            }!</h2>
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              We're thrilled to inform you that your membership application has been <strong style="color: #138808;">approved</strong>! 
              Welcome to the Azad Youth Organisation family.
            </p>
            
            <div style="background: white; border: 2px solid #138808; 
                        border-radius: 15px; padding: 25px; margin: 25px 0; text-align: center;">
              <h3 style="color: #138808; margin: 0 0 15px 0; font-size: 20px;">🆔 Your Membership Details</h3>
              <div style="background: linear-gradient(135deg, #FF9933, #138808); 
                          color: white; padding: 15px; border-radius: 10px; margin: 10px 0;">
                <p style="margin: 5px 0; font-size: 18px;"><strong>Membership ID:</strong> ${
                  memberData.membershipId
                }</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> ✅ Active Member</p>
                <p style="margin: 5px 0;"><strong>Approved Date:</strong> ${memberData.approvedAt.toLocaleDateString(
                  "en-IN"
                )}</p>
                <p style="margin: 5px 0;"><strong>Approved By:</strong> ${
                  memberData.approvedBy
                }</p>
              </div>
            </div>
  
            <p style="color: #666; line-height: 1.6;">
              Your journey as an AYO member starts now! You can access your member dashboard 
              to explore available opportunities and start making a difference in Bihar's communities.
            </p>
  
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/member/dashboard" 
                 style="background: linear-gradient(135deg, #FF9933, #138808); 
                        color: white; padding: 15px 35px; text-decoration: none; 
                        border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                🚀 Access Member Dashboard
              </a>
            </div>
  
            <div style="background: #fff3cd; border-radius: 10px; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px; text-align: center;">
                💡 <strong>Next Steps:</strong> Check your member dashboard for upcoming volunteer opportunities and events!
              </p>
            </div>
  
            <p style="color: #666; line-height: 1.6; text-align: center; margin-top: 30px;">
              Thank you for choosing to make a difference with us!<br>
              <strong>Together, we transform Bihar! 🏆</strong>
            </p>
  
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Azad Youth Organisation | Empowering Bihar's Youth | Building Better Communities<br>
              📧 contact@azadyouth.org | 📱 +91 98765 43210
            </p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendMembershipRejectionEmail(
    email: string,
    name: string,
    reason?: string
  ): Promise<void> {
    const mailOptions = {
      from: `"Azad Youth Organisation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Membership Application Update - AYO",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF9933, #FFFFFF, #138808); padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">Membership Application Update</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Dear ${name},</h2>
            <p style="color: #666; line-height: 1.6;">
              Thank you for your interest in becoming a member of Azad Youth Organisation. 
              We sincerely appreciate the time and effort you put into your application.
            </p>
            <p style="color: #666; line-height: 1.6;">
              After careful review by our membership committee, we are unable to approve 
              your membership application at this time.
            </p>
            
            ${
              reason
                ? `
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; 
                          border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h4 style="color: #856404; margin: 0 0 10px 0;">📋 Feedback from Review Committee:</h4>
                <p style="color: #856404; margin: 0; line-height: 1.6;">${reason}</p>
              </div>
            `
                : ""
            }

            <div style="background: #e3f2fd; border-radius: 10px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #1976d2; margin: 0 0 15px 0;">🤝 You Can Still Make a Difference!</h3>
              <p style="color: #666; margin: 0 0 10px 0;">Don't let this discourage you! There are many ways to support our mission:</p>
              <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li><strong>Volunteer:</strong> Join our events and community programs</li>
                <li><strong>Donate:</strong> Support our initiatives financially</li>
                <li><strong>Spread Awareness:</strong> Share our work in your network</li>
                <li><strong>Reapply:</strong> Address the feedback and apply again after 3 months</li>
              </ul>
            </div>

            <p style="color: #666; line-height: 1.6; text-align: center;">
              We value your commitment to social change and hope you'll continue 
              supporting our mission in other meaningful ways.
            </p>
            
            <p style="color: #666; line-height: 1.6; text-align: center; margin-top: 30px;">
              With appreciation,<br>
              <strong>Team Azad Youth Organisation</strong>
            </p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  // Generic sendEmail method
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

  // Newsletter email to subscribers
  async sendNewsletterToSubscriber(
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    const mailOptions = {
      from: `"Azad Youth Organisation" <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>${subject}</title>
          <style>
            /* Reset styles */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
            
            /* Responsive styles */
            @media only screen and (max-width: 600px) {
              .email-container { width: 100% !important; }
              .header-title { font-size: 24px !important; padding: 30px 20px !important; }
              .header-subtitle { font-size: 13px !important; }
              .content-padding { padding: 25px 20px !important; }
              .subject-title { font-size: 22px !important; }
              .message-text { font-size: 15px !important; }
              .cta-button { padding: 12px 30px !important; font-size: 14px !important; display: block !important; }
              .footer-padding { padding: 20px 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0; padding: 0;">
            <tr>
              <td style="padding: 20px 0;">
                
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto;" class="email-container">
                  
                  <!-- Header with gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #ff9933 0%, #138808 100%); padding: 40px 30px; text-align: center;" class="header-title">
                      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 600; letter-spacing: 0.5px;">
                        Azad Youth Organisation
                      </h1>
                      <p style="color: rgba(255, 255, 255, 0.95); margin: 10px 0 0 0; font-size: 15px; font-weight: 300;" class="header-subtitle">
                        Empowering Bihar's Youth | Building Better Communities
                      </p>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="background-color: #ffffff; padding: 40px 35px;" class="content-padding">
                      
                      <!-- Subject/Title -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="padding-bottom: 30px;">
                            <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 26px; font-weight: 600; line-height: 1.3;" class="subject-title">
                              ${subject}
                            </h2>
                            <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff9933, #138808); border-radius: 2px;"></div>
                          </td>
                        </tr>
                      </table>

                      <!-- Message Body -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="color: #4a5568; line-height: 1.8; font-size: 16px; padding-bottom: 35px;" class="message-text">
                            ${message
                              .split("\n")
                              .map(
                                (paragraph) =>
                                  `<p style="margin: 0 0 18px 0;">${paragraph}</p>`
                              )
                              .join("")}
                          </td>
                        </tr>
                      </table>

                      <!-- Call to Action -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: center; padding: 10px 0 40px 0;">
                            <a href="${
                              process.env.FRONTEND_URL
                            }" class="cta-button"
                               style="background: linear-gradient(135deg, #ff9933, #138808); 
                                      color: #ffffff; padding: 14px 40px; text-decoration: none; 
                                      border-radius: 30px; display: inline-block; font-weight: 600; 
                                      font-size: 15px; box-shadow: 0 4px 15px rgba(255, 153, 51, 0.25);">
                              Visit Our Website
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Social Connect Section -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="background: linear-gradient(135deg, #fff5eb 0%, #e8f5e8 100%); 
                                     border-radius: 12px; padding: 25px; text-align: center;">
                            <p style="color: #2c3e50; margin: 0 0 15px 0; font-size: 15px; font-weight: 600;">
                              🤝 Stay Connected With Us
                            </p>
                            <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.6;">
                              Follow our journey and be part of the change we're creating together
                            </p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8fafc; padding: 30px 35px; border-top: 1px solid #e2e8f0;" class="footer-padding">
                      
                      <!-- Unsubscribe Info -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: center; padding-bottom: 20px;">
                            <p style="color: #64748b; margin: 0 0 8px 0; font-size: 13px; line-height: 1.6;">
                              You're receiving this email because you subscribed to updates from Azad Youth Organisation.
                            </p>
                            <a href="${
                              process.env.FRONTEND_URL
                            }/unsubscribe" style="color: #94a3b8; font-size: 12px; text-decoration: underline;">
                              Unsubscribe from future emails
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="border-top: 1px solid #e2e8f0; padding: 20px 0;"></td>
                        </tr>
                      </table>

                      <!-- Contact & Copyright -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: center;">
                            <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 12px;">
                              📧 contact@azadyouth.org | 📱 +91 98765 43210
                            </p>
                            <p style="color: #cbd5e1; margin: 0; font-size: 11px;">
                              © ${new Date().getFullYear()} Azad Youth Organisation. All rights reserved.
                            </p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                </table>
                
              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendDonationThankYou(
    donorEmail: string,
    donorName: string,
    amount: number,
    isAnonymous: boolean
  ): Promise<void> {
    const mailOptions = {
      from: `"Azad Youth Organisation" <${process.env.EMAIL_USER}>`,
      to: donorEmail,
      subject: "🙏 Thank You for Your Generous Donation - AYO",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF9933, #FFFFFF, #138808); padding: 25px; text-align: center;">
            <h1 style="color: #333; margin: 0; font-size: 28px;">🙏 Thank You!</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Dear ${
              isAnonymous ? "Generous Donor" : donorName
            },</h2>
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Your generous donation of <strong style="color: #138808; font-size: 18px;">₹${amount.toLocaleString()}</strong> 
              has been received with immense gratitude. Your contribution will directly impact the lives of 
              youth and communities across Bihar.
            </p>

            <div style="background: white; border: 2px solid #138808; 
                        border-radius: 15px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #138808; margin: 0 0 15px 0; text-align: center;">🌟 Your Impact</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="text-align: center; padding: 15px; background: #f0f8ff; border-radius: 10px;">
                  <div style="font-size: 24px; margin-bottom: 5px;">📚</div>
                  <div style="font-size: 12px; color: #666;">Education Support</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f0fff0; border-radius: 10px;">
                  <div style="font-size: 24px; margin-bottom: 5px;">🏥</div>
                  <div style="font-size: 12px; color: #666;">Healthcare Access</div>
                </div>
              </div>
              <p style="color: #666; text-align: center; margin: 15px 0 0 0; font-size: 14px;">
                Your donation helps us provide quality education, healthcare services, 
                skill development, and women empowerment programs.
              </p>
            </div>

            <div style="background: #e8f5e8; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #138808; margin: 0 0 10px 0;">📊 Donation Receipt Details:</h4>
              <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Amount: ₹${amount.toLocaleString()}</li>
                <li>Date: ${new Date().toLocaleDateString("en-IN")}</li>
                <li>Transaction ID: Will be sent separately</li>
                <li>Tax Benefits: As per 80G guidelines</li>
              </ul>
            </div>

            <p style="color: #666; line-height: 1.6;">
              We'll keep you updated on how your contribution is creating positive change. 
              Together, we're building a stronger, more empowered Bihar.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/impact" 
                 style="background: linear-gradient(135deg, #FF9933, #138808); 
                        color: white; padding: 15px 35px; text-decoration: none; 
                        border-radius: 25px; display: inline-block; font-weight: bold;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                📈 See Our Impact Stories
              </a>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #138808; font-weight: bold; font-size: 18px; margin: 0;">
                🏆 Together, We Transform Bihar!
              </p>
            </div>

            <p style="color: #666; line-height: 1.6; text-align: center;">
              With heartfelt gratitude,<br>
              <strong>Team Azad Youth Organisation</strong>
            </p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              📧 contact@azadyouth.org | 📱 +91 98765 43210<br>
              123 Gandhi Marg, Patna, Bihar 800001
            </p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();

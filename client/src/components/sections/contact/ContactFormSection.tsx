import { useState, useEffect, useRef, forwardRef } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MessageSquare,
  User,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { submitContactMessage } from "@/services/contactMessageService";
import type { ContactReason } from "@/pages/Contact";

interface ContactFormInputs {
  fullName: string;
  email: string;
  phone?: string;
  reason: ContactReason;
  message: string;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

const reasonOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "volunteering", label: "Volunteering Opportunities" },
  { value: "partnership", label: "Partnership & Collaboration" },
  { value: "support", label: "Donation & Support" },
];

const reasonToSubject: Record<ContactReason, string> = {
  general: "General Inquiry",
  volunteering: "Volunteering Opportunities",
  partnership: "Partnership & Collaboration",
  support: "Donation & Support",
};

interface ContactFormSectionProps {
  selectedReason?: ContactReason | null;
  onReasonChange?: (reason: ContactReason) => void;
}

const ContactFormSection = forwardRef<HTMLElement, ContactFormSectionProps>(
  ({ selectedReason, onReasonChange }, ref) => {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      control,
      setValue,
      watch,
    } = useForm<ContactFormInputs>({
      defaultValues: {
        reason: selectedReason || undefined,
      },
    });

    const watchedReason = watch("reason");

    // Update form when selectedReason prop changes
    useEffect(() => {
      if (selectedReason) {
        setValue("reason", selectedReason);
      }
    }, [selectedReason, setValue]);

    // Notify parent when reason changes
    useEffect(() => {
      if (watchedReason && onReasonChange) {
        onReasonChange(watchedReason);
      }
    }, [watchedReason, onReasonChange]);

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

    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
      try {
        setSubmitStatus(null);

        // Prepare data for API (map reason to subject)
        const contactData = {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          subject: reasonToSubject[data.reason],
          message: data.message,
        };

        const response = await submitContactMessage(contactData);

        if (response.success) {
          toast.success(
            "Thank you for reaching out! We've received your message and will get back to you within 24 hours.",
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
            message:
              "Thank you for reaching out! We've received your message and will get back to you within 24 hours.",
          });
          reset();
        }
      } catch (error) {
        console.error("Contact form error:", error);

        toast.error(
          "Oops! Something went wrong. Please try again or contact us directly at ayoindia1@gmail.com",
          {
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
          }
        );

        setSubmitStatus({
          type: "error",
          message:
            "Oops! Something went wrong. Please try again or contact us directly at ayoindia1@gmail.com",
        });
      }
    };

    return (
      <section
        ref={(node) => {
          sectionRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={`container mx-auto px-0 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 ${
          isVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <Card className="max-w-2xl mx-auto shadow-none sm:shadow-2xl border-0 sm:border border-saffron-200/50 overflow-hidden bg-white/95 backdrop-blur-sm rounded-none sm:rounded-3xl">
          <CardContent className="p-4 sm:p-8 lg:p-10">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-saffron-500 to-india-green-500 rounded-2xl mb-4 shadow-lg relative overflow-hidden group">
                <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                We'll get back to you within 24 hours
              </p>
              {/* Tricolor accent */}
              <div className="flex justify-center gap-1 mt-4">
                <div className="h-1 w-8 rounded-full bg-saffron-500" />
                <div className="h-1 w-4 rounded-full bg-slate-300" />
                <div className="h-1 w-8 rounded-full bg-india-green-500" />
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-saffron-500" />
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className={`border-2 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl h-12 ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-400"
                      : "border-saffron-200 focus:border-saffron-400 hover:border-saffron-300"
                  }`}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  })}
                />
                {errors.fullName && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-india-green-500" />
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className={`border-2 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl h-12 ${
                    errors.email
                      ? "border-red-500 focus:border-red-400"
                      : "border-india-green-200 focus:border-india-green-400 hover:border-india-green-300"
                  }`}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone (Optional) */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-saffron-500" />
                  Phone Number{" "}
                  <span className="text-slate-400 text-sm font-normal">
                    (Optional)
                  </span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9942495941"
                  className={`border-2 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-xl h-12 ${
                    errors.phone
                      ? "border-red-500 focus:border-red-400"
                      : "border-slate-200 focus:border-saffron-400 hover:border-slate-300"
                  }`}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  {...register("phone", {
                    pattern: {
                      value:
                        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Reason for Contact (Dropdown) */}
              <div className="space-y-2">
                <Label
                  htmlFor="reason"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4 text-india-green-500" />
                  Reason for Contact <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="reason"
                  control={control}
                  rules={{ required: "Please select a reason for contact" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="reason"
                        hasError={!!errors.reason}
                        aria-invalid={!!errors.reason}
                        aria-describedby={
                          errors.reason ? "reason-error" : undefined
                        }
                      >
                        <SelectValue placeholder="Select a reason..." />
                      </SelectTrigger>
                      <SelectContent>
                        {reasonOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.reason && (
                  <p
                    id="reason-error"
                    role="alert"
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.reason.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4 text-saffron-500" />
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about how you'd like to get involved with our mission..."
                  className={`border-2 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-h-[120px] resize-none rounded-xl ${
                    errors.message
                      ? "border-red-500 focus:border-red-400"
                      : "border-slate-200 focus:border-india-green-400 hover:border-slate-300"
                  }`}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Message must not exceed 1000 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Success/Error Status */}
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="tricolor"
                size="lg"
                className="w-full h-14 rounded-xl shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>

            {/* Quick Contact Note */}
            <div className="mt-8 p-4 bg-gradient-to-r from-saffron-50 to-india-green-50 border border-saffron-200/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-saffron-500 to-india-green-500 p-2 rounded-xl shadow-sm flex-shrink-0">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-1">
                    Need Immediate Assistance?
                  </p>
                  <p className="text-sm text-slate-600">
                    For urgent matters, please call us directly at{" "}
                    <a
                      href="tel:+919942495941"
                      className="font-medium text-saffron-600 hover:text-saffron-700 transition-colors"
                    >
                      +91 9942495941
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }
);

ContactFormSection.displayName = "ContactFormSection";

export default ContactFormSection;

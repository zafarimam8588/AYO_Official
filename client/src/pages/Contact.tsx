import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import HeroSection from "@/components/sections/contact/HeroSection";
import QuickActionCards from "@/components/sections/contact/QuickActionCards";
import ContactInfoSection from "@/components/sections/contact/ContactInfoSection";
import MapSection from "@/components/sections/contact/MapSection";
import { UnifiedCTASection } from "@/components/common";
import { Users, Heart } from "lucide-react";

export type ContactReason =
  | "general"
  | "volunteering"
  | "partnership"
  | "support";

export default function ContactPage() {
  const [selectedReason, setSelectedReason] = useState<ContactReason | null>(
    null
  );
  const formRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Handle URL query parameter for pre-selecting reason
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reason = params.get("reason") as ContactReason | null;
    if (
      reason &&
      ["general", "volunteering", "partnership", "support"].includes(reason)
    ) {
      setSelectedReason(reason);
      // Scroll to form after a short delay
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location.search]);

  const handleQuickAction = (reason: ContactReason) => {
    setSelectedReason(reason);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50/30 via-white to-india-green-50/30 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 153, 51, 0.02) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(19, 136, 8, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-saffron-400 rounded-full animate-pulse-subtle hidden sm:block" />
      <div className="absolute top-40 right-32 w-2 h-2 bg-india-green-400 rounded-full animate-pulse-subtle animation-delay-200 hidden sm:block" />
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-saffron-500 rounded-full animate-pulse-subtle animation-delay-400 hidden sm:block" />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-saffron-200/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-india-green-200/20 rounded-full filter blur-3xl" />

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Action Cards */}
      <QuickActionCards onActionClick={handleQuickAction} />

      {/* Contact Form Section */}
      <ContactFormSection
        ref={formRef}
        selectedReason={selectedReason}
        onReasonChange={setSelectedReason}
      />

      {/* Contact Information Section */}
      <ContactInfoSection />

      {/* Map Section */}
      <MapSection />

      {/* Call to Action Section */}
      <UnifiedCTASection
        title="Ready to Make a Difference?"
        subtitle="Join thousands of volunteers and supporters who are creating positive change across Bihar's communities."
        primaryAction={{
          label: "Become a Volunteer",
          href: "/register",
          icon: Users,
        }}
        secondaryAction={{
          label: "Support Our Cause",
          href: "/donate",
          icon: Heart,
        }}
      />
    </div>
  );
}

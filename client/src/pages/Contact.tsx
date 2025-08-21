import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Heart,
  User,
  MessageSquare,
  Clock,
} from "lucide-react";
import ReadyToMakeDifference from "@/components/sections/ReadyToMakeDifference";
import ContactUsFormSection from "@/components/sections/contact/ContactUsFormSection";
import HeroSection from "@/components/sections/contact/HeroSection";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(255, 153, 51, 0.02) 0%, transparent 25%, rgba(19, 136, 8, 0.02) 100%),
          linear-gradient(45deg, rgba(255, 153, 51, 0.008) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(19, 136, 8, 0.008) 1px, transparent 1px),
          linear-gradient(0deg, rgba(255, 153, 51, 0.005) 1px, transparent 1px),
          linear-gradient(90deg, rgba(19, 136, 8, 0.005) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 60px 60px, 60px 60px, 40px 40px, 40px 40px",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-20"></div>
      <div
        className="absolute top-32 right-20 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-30"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 left-32 w-4 h-4 bg-orange-500 rounded-full animate-pulse opacity-25"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Header Section */}
      <HeroSection />

      {/* Main Contact Section */}
      <ContactUsFormSection />

      {/* Call to Action Section */}
      <ReadyToMakeDifference />
    </div>
  );
}

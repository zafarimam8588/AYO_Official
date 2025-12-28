import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Heart, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";

interface CTAAction {
  label: string;
  href: string;
  external?: boolean;
  icon?: LucideIcon;
}

interface UnifiedCTASectionProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction;
  phone?: string;
  email?: string;
  className?: string;
}

export function UnifiedCTASection({
  title = "Ready to Make a Difference?",
  subtitle = "Join thousands of volunteers and supporters who are creating positive change across Bihar's communities.",
  primaryAction = {
    label: "Support Our Mission",
    href: "/donate",
    icon: Heart,
  },
  secondaryAction = {
    label: "Become a Volunteer",
    href: "/register",
    icon: Users,
  },
  phone = "+91 9942495941",
  email = "ayoindia1@gmail.com",
  className,
}: UnifiedCTASectionProps) {
  const renderActionButton = (action: CTAAction, isPrimary: boolean) => {
    const IconComponent = action.icon;

    const buttonContent = (
      <>
        {IconComponent && <IconComponent className="w-5 h-5" />}
        {action.label}
      </>
    );

    if (isPrimary) {
      if (action.external) {
        return (
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            <RainbowButton
              size="lg"
              className="px-8 py-3 text-base font-semibold gap-2"
            >
              {buttonContent}
            </RainbowButton>
          </a>
        );
      }
      return (
        <Link to={action.href}>
          <RainbowButton
            size="lg"
            className="px-8 py-3 text-base font-semibold gap-2"
          >
            {buttonContent}
          </RainbowButton>
        </Link>
      );
    }

    if (action.external) {
      return (
        <a href={action.href} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "px-8 py-3 text-base font-semibold gap-2",
              "border-2 border-white/30 text-white bg-transparent",
              "hover:bg-white/10 hover:border-white/50",
              "transition-all duration-300"
            )}
          >
            {buttonContent}
          </Button>
        </a>
      );
    }

    return (
      <Link to={action.href}>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "px-8 py-3 text-base font-semibold gap-2",
            "border-2 border-white/30 text-white bg-transparent",
            "hover:bg-white/10 hover:border-white/50",
            "transition-all duration-300"
          )}
        >
          {buttonContent}
        </Button>
      </Link>
    );
  };

  return (
    <section
      className={cn(
        "relative py-20 md:py-28 lg:py-32 overflow-hidden",
        "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        className
      )}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 153, 51, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(19, 136, 8, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div
        className={cn(
          "absolute -top-32 -left-32 w-96 h-96 rounded-full",
          "bg-saffron-500/20 blur-[100px]",
          "animate-pulse-glow-slow"
        )}
      />
      <div
        className={cn(
          "absolute -bottom-32 -right-32 w-96 h-96 rounded-full",
          "bg-india-green-500/20 blur-[100px]",
          "animate-pulse-glow-slow animation-delay-500"
        )}
      />

      {/* Center accent glow */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[500px] h-[500px] rounded-full blur-[150px]",
          "bg-gradient-radial from-white/5 via-transparent to-transparent",
          "animate-float-slow"
        )}
      />

      {/* Decorative floating dots */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-saffron-400/60 rounded-full animate-float" />
      <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-india-green-400/60 rounded-full animate-float animation-delay-200" />
      <div className="absolute bottom-1/4 left-16 w-1 h-1 bg-saffron-500/50 rounded-full animate-float animation-delay-400" />
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-india-green-500/60 rounded-full animate-float animation-delay-600" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Tricolor accent bar */}
        <div className="flex justify-center gap-2 mb-10">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-saffron-400 to-saffron-500" />
          <div className="h-1 w-4 rounded-full bg-white/30" />
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-india-green-400 to-india-green-500" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryAction && renderActionButton(primaryAction, true)}
          {secondaryAction && renderActionButton(secondaryAction, false)}
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10 pt-8 border-t border-white/10">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            <Phone className="w-5 h-5 text-saffron-400" />
            <span>{phone}</span>
          </a>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            <Mail className="w-5 h-5 text-india-green-400" />
            <span>{email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

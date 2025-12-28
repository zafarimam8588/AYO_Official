import { User, Linkedin, Twitter, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLink {
  type: "linkedin" | "twitter" | "email";
  url: string;
}

interface TeamMemberCardProps {
  name: string;
  position: string;
  description?: string;
  image?: string;
  color: "saffron" | "green";
  socialLinks?: SocialLink[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TeamMemberCard({
  name,
  position,
  description,
  image,
  color,
  socialLinks,
  size = "md",
  className,
}: TeamMemberCardProps) {
  const colorClasses = {
    saffron: {
      border: "hover:border-saffron-200",
      gradient: "from-saffron-50 to-saffron-100",
      gradientHover: "group-hover:from-saffron-100 group-hover:to-saffron-200",
      icon: "text-saffron-500 group-hover:text-saffron-600",
      badge: "bg-saffron-50 text-saffron-600 border-saffron-200",
      ring: "ring-saffron-200",
      social: "hover:bg-saffron-100 hover:text-saffron-600",
      avatarGlow: "avatar-glow",
    },
    green: {
      border: "hover:border-india-green-200",
      gradient: "from-india-green-50 to-india-green-100",
      gradientHover:
        "group-hover:from-india-green-100 group-hover:to-india-green-200",
      icon: "text-india-green-500 group-hover:text-india-green-600",
      badge: "bg-india-green-50 text-india-green-600 border-india-green-200",
      ring: "ring-india-green-200",
      social: "hover:bg-india-green-100 hover:text-india-green-600",
      avatarGlow: "avatar-glow-green",
    },
  };

  const sizeClasses = {
    sm: {
      avatar: "w-16 h-16",
      icon: "w-8 h-8",
      name: "text-base",
      padding: "p-4",
      badge: "text-xs px-3 py-1",
    },
    md: {
      avatar: "w-20 h-20",
      icon: "w-10 h-10",
      name: "text-lg",
      padding: "p-6",
      badge: "text-sm px-4 py-1.5",
    },
    lg: {
      avatar: "w-24 h-24",
      icon: "w-12 h-12",
      name: "text-xl",
      padding: "p-8",
      badge: "text-sm px-5 py-2",
    },
  };

  const colors = colorClasses[color];
  const sizes = sizeClasses[size];

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  };

  return (
    <div
      className={cn(
        "group bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-300",
        "hover:bg-white hover:shadow-xl border border-slate-100",
        "hover:-translate-y-1",
        colors.border,
        sizes.padding,
        className
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <div
            className={cn(
              "rounded-full flex items-center justify-center overflow-hidden",
              "transition-all duration-300 bg-gradient-to-br shadow-md",
              colors.gradient,
              colors.gradientHover,
              colors.avatarGlow,
              sizes.avatar
            )}
          >
            {image ? (
              <img
                src={image}
                alt={`${name}, ${position}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <User
                className={cn(
                  "transition-colors duration-300",
                  colors.icon,
                  sizes.icon
                )}
              />
            )}
          </div>
          {/* Subtle ring on hover */}
          <div
            className={cn(
              "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300 ring-2 ring-offset-2",
              colors.ring
            )}
          />
        </div>

        {/* Name */}
        <h3
          className={cn(
            "font-semibold text-slate-800 group-hover:text-slate-900 transition-colors",
            sizes.name
          )}
        >
          {name}
        </h3>

        {/* Position Badge */}
        <span
          className={cn(
            "font-medium rounded-full border transition-all duration-300",
            colors.badge,
            sizes.badge
          )}
        >
          {position}
        </span>

        {/* Optional Description */}
        {description && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex gap-2 pt-2">
            {socialLinks.map((link, index) => {
              const Icon = socialIcons[link.type];
              return (
                <a
                  key={index}
                  href={link.type === "email" ? `mailto:${link.url}` : link.url}
                  target={link.type === "email" ? undefined : "_blank"}
                  rel={
                    link.type === "email" ? undefined : "noopener noreferrer"
                  }
                  className={cn(
                    "p-2 rounded-full transition-all duration-200 text-slate-400",
                    colors.social
                  )}
                  aria-label={`${name}'s ${link.type}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

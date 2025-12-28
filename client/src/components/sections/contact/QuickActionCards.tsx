import { Link } from "react-router-dom";
import {
  MessageCircle,
  Users,
  Handshake,
  Heart,
  type LucideIcon,
} from "lucide-react";
import type { ContactReason } from "@/pages/Contact";

interface QuickAction {
  icon: LucideIcon;
  title: string;
  description: string;
  action: "scrollToForm" | "navigate";
  reason?: ContactReason;
  href?: string;
  color: "saffron" | "green";
}

const quickActions: QuickAction[] = [
  {
    icon: MessageCircle,
    title: "Send a Message",
    description: "Have a question? We're here to help.",
    action: "scrollToForm",
    reason: "general",
    color: "saffron",
  },
  {
    icon: Users,
    title: "Become a Volunteer",
    description: "Join our mission to empower Bihar's youth.",
    action: "scrollToForm",
    reason: "volunteering",
    color: "green",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description: "Collaborate on impactful initiatives.",
    action: "scrollToForm",
    reason: "partnership",
    color: "saffron",
  },
  {
    icon: Heart,
    title: "Support Our Cause",
    description: "Your donation makes a real difference.",
    action: "navigate",
    href: "/donate",
    color: "green",
  },
];

interface QuickActionCardsProps {
  onActionClick: (reason: ContactReason) => void;
}

const QuickActionCards = ({ onActionClick }: QuickActionCardsProps) => {
  const getColorClasses = (color: "saffron" | "green") => {
    if (color === "saffron") {
      return {
        iconBg: "bg-gradient-to-br from-saffron-400 to-saffron-600",
        border: "border-saffron-200/50 hover:border-saffron-300",
        accent: "bg-saffron-500",
      };
    }
    return {
      iconBg: "bg-gradient-to-br from-india-green-400 to-india-green-600",
      border: "border-india-green-200/50 hover:border-india-green-300",
      accent: "bg-india-green-500",
    };
  };

  const renderCard = (action: QuickAction, index: number) => {
    const IconComponent = action.icon;
    const colors = getColorClasses(action.color);

    const cardContent = (
      <div
        className={`
          group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6
          border ${colors.border}
          shadow-sm hover:shadow-lg
          transition-all duration-300 hover:-translate-y-1
          cursor-pointer overflow-hidden h-full
        `}
      >
        {/* Icon */}
        <div
          className={`
            ${colors.iconBg} p-3 rounded-xl shadow-md
            inline-flex items-center justify-center mb-4
            group-hover:scale-110 transition-transform duration-300
          `}
        >
          <IconComponent className="h-6 w-6 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {action.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {action.description}
        </p>

        {/* Bottom accent bar - appears on hover */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 h-1 ${colors.accent}
            transform scale-x-0 group-hover:scale-x-100
            transition-transform duration-300 origin-left
          `}
        />
      </div>
    );

    // Navigate action - wrap in Link
    if (action.action === "navigate" && action.href) {
      return (
        <Link
          key={index}
          to={action.href}
          className={`animate-fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {cardContent}
        </Link>
      );
    }

    // Scroll to form action - use button/div
    return (
      <button
        key={index}
        onClick={() => action.reason && onActionClick(action.reason)}
        className={`text-left animate-fade-in w-full`}
        style={{ animationDelay: `${index * 100}ms` }}
        aria-label={`${action.title} - ${action.description}`}
      >
        {cardContent}
      </button>
    );
  };

  return (
    <section className="py-6 sm:py-8 lg:py-10 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {quickActions.map((action, index) => renderCard(action, index))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionCards;

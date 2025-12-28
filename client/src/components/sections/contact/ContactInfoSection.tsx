import { useState, useEffect, useRef } from "react";
import { MapPin, Mail, Phone, Clock, type LucideIcon } from "lucide-react";

interface ContactInfoCard {
  icon: LucideIcon;
  title: string;
  lines: string[];
  action?: { type: "tel" | "mailto"; value: string };
  color: "saffron" | "green";
}

const contactInfo: ContactInfoCard[] = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Main Road, Motihari", "East Champaran - 845401, Bihar"],
    color: "saffron",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["ayoindia1@gmail.com", "We respond within 24 hours"],
    action: { type: "mailto", value: "ayoindia1@gmail.com" },
    color: "green",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 9942495941", "WhatsApp available"],
    action: { type: "tel", value: "+919942495941" },
    color: "saffron",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon - Sat: 9 AM - 6 PM", "Sun: 10 AM - 2 PM"],
    color: "green",
  },
];

const ContactInfoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const getColorClasses = (color: "saffron" | "green") => {
    if (color === "saffron") {
      return {
        iconBg: "bg-gradient-to-br from-saffron-400 to-saffron-600",
        border: "border-saffron-200/50 hover:border-saffron-300",
        hoverBg: "hover:bg-saffron-50/50",
      };
    }
    return {
      iconBg: "bg-gradient-to-br from-india-green-400 to-india-green-600",
      border: "border-india-green-200/50 hover:border-india-green-300",
      hoverBg: "hover:bg-india-green-50/50",
    };
  };

  const renderCard = (info: ContactInfoCard, index: number) => {
    const IconComponent = info.icon;
    const colors = getColorClasses(info.color);

    const cardContent = (
      <div
        className={`
          group bg-white/80 backdrop-blur-sm rounded-2xl p-6
          border ${colors.border} ${colors.hoverBg}
          shadow-sm hover:shadow-lg
          transition-all duration-300 hover:-translate-y-1
          ${info.action ? "cursor-pointer" : ""}
          h-full
        `}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`
              ${colors.iconBg} p-3 rounded-xl shadow-md
              flex-shrink-0
              group-hover:scale-110 transition-transform duration-300
            `}
          >
            <IconComponent className="h-5 w-5 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-slate-800 mb-1">
              {info.title}
            </h3>
            {info.lines.map((line, lineIndex) => (
              <p
                key={lineIndex}
                className={`text-sm ${
                  lineIndex === 0 ? "text-slate-700" : "text-slate-500"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    );

    // Wrap in anchor if action exists
    if (info.action) {
      const href =
        info.action.type === "tel"
          ? `tel:${info.action.value}`
          : `mailto:${info.action.value}`;

      return (
        <a
          key={index}
          href={href}
          className={`block ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: `${index * 100}ms` }}
          aria-label={`${info.title}: ${info.lines[0]}`}
        >
          {cardContent}
        </a>
      );
    }

    return (
      <div
        key={index}
        className={isVisible ? "animate-fade-in" : "opacity-0"}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {cardContent}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 lg:py-16 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-10 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Ways to Reach Us
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Choose the most convenient way to connect with our team
          </p>
          {/* Tricolor accent */}
          <div className="flex justify-center gap-1 mt-4">
            <div className="h-1 w-8 rounded-full bg-saffron-500" />
            <div className="h-1 w-4 rounded-full bg-slate-300" />
            <div className="h-1 w-8 rounded-full bg-india-green-500" />
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {contactInfo.map((info, index) => renderCard(info, index))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;

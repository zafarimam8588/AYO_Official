import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import { Link } from "react-router-dom";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: "saffron" | "green" | "alternating";
  index?: number;
  link?: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  color = "saffron",
  index = 0,
  link,
  className,
}: FeatureCardProps) {
  // Determine color based on index for alternating pattern
  const effectiveColor =
    color === "alternating" ? (index % 2 === 0 ? "saffron" : "green") : color;

  const colorClasses = {
    saffron: {
      iconBg: "bg-gradient-to-br from-saffron-100 to-saffron-200",
      iconColor: "text-saffron-600",
      hoverBorder: "hover:border-saffron-300",
      accentBar: "bg-saffron-500",
    },
    green: {
      iconBg: "bg-gradient-to-br from-india-green-100 to-india-green-200",
      iconColor: "text-india-green-600",
      hoverBorder: "hover:border-india-green-300",
      accentBar: "bg-india-green-500",
    },
  };

  const colors = colorClasses[effectiveColor];

  const CardContent = (
    <>
      {/* Icon container */}
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
          colors.iconBg
        )}
      >
        <Icon className={cn("w-7 h-7", colors.iconColor)} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 leading-relaxed">{description}</p>

      {/* Bottom accent bar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          colors.accentBar
        )}
      />
    </>
  );

  const cardClasses = cn(
    "group relative bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    colors.hoverBorder,
    link && "cursor-pointer",
    className
  );

  if (link) {
    return (
      <Link to={link} className={cardClasses}>
        {CardContent}
      </Link>
    );
  }

  return <div className={cardClasses}>{CardContent}</div>;
}

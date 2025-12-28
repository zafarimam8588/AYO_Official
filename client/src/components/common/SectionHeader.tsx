import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  titleColor?: "default" | "gradient" | "saffron" | "green" | "white";
  className?: string;
  badgeVariant?: "saffron" | "green" | "default";
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  titleColor = "default",
  className,
  badgeVariant = "saffron",
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
  };

  const titleColorClasses = {
    default: "text-slate-900",
    gradient:
      "bg-gradient-to-r from-saffron-600 via-slate-800 to-india-green-600 bg-clip-text text-transparent",
    saffron: "text-saffron-600",
    green: "text-india-green-600",
    white: "text-white",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12",
        alignmentClasses[align],
        className
      )}
    >
      {badge && (
        <Badge
          variant={badgeVariant}
          className="w-fit px-4 py-1.5 text-sm font-medium"
        >
          {badge}
        </Badge>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
          titleColorClasses[titleColor]
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative accent bar */}
      <div
        className={cn(
          "flex gap-1 mt-2",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        <div className="h-1 w-8 rounded-full bg-saffron-500" />
        <div className="h-1 w-4 rounded-full bg-slate-300" />
        <div className="h-1 w-8 rounded-full bg-india-green-500" />
      </div>
    </div>
  );
}

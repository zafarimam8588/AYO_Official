import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: React.ReactNode;
  variant?: "saffron" | "green" | "tricolor" | "warm" | "glass";
  hover?: boolean;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export function GradientCard({
  children,
  variant = "warm",
  hover = true,
  className,
  padding = "md",
}: GradientCardProps) {
  const variantClasses = {
    saffron:
      "bg-gradient-to-br from-saffron-50 to-saffron-100 border-saffron-200",
    green:
      "bg-gradient-to-br from-india-green-50 to-india-green-100 border-india-green-200",
    tricolor:
      "bg-gradient-to-r from-saffron-50 via-white to-india-green-50 border-slate-200",
    warm: "bg-gradient-to-br from-warm-50 to-warm-100 border-warm-200",
    glass: "bg-white/70 backdrop-blur-md border-white/50 shadow-lg",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border shadow-sm transition-all duration-300",
        variantClasses[variant],
        paddingClasses[padding],
        hover && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

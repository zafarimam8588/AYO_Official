import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  backgroundVariant?: "gradient" | "pattern" | "simple";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  badge,
  title,
  subtitle,
  backgroundVariant = "gradient",
  size = "md",
  className,
  children,
}: PageHeaderProps) {
  const sizeClasses = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
  };

  const backgroundClasses = {
    gradient:
      "bg-gradient-to-br from-saffron-50 via-white to-india-green-50 relative overflow-hidden",
    pattern: "bg-warm-50 relative overflow-hidden",
    simple: "bg-white",
  };

  return (
    <header
      className={cn(
        sizeClasses[size],
        backgroundClasses[backgroundVariant],
        className
      )}
    >
      {/* Background decorations */}
      {backgroundVariant === "gradient" && (
        <>
          {/* Saffron gradient orb */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-saffron-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          {/* Green gradient orb */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-india-green-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </>
      )}

      {backgroundVariant === "pattern" && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <Badge variant="saffron" className="mb-4 px-4 py-1.5">
            {badge}
          </Badge>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Decorative tricolor bar */}
        <div className="flex justify-center gap-1 mt-8">
          <div className="h-1.5 w-12 rounded-full bg-saffron-500" />
          <div className="h-1.5 w-6 rounded-full bg-slate-300" />
          <div className="h-1.5 w-12 rounded-full bg-india-green-500" />
        </div>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

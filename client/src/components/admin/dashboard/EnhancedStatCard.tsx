import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideProps } from "lucide-react";
import {
  useEffect,
  useState,
  useRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface EnhancedStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "saffron" | "green" | "blue" | "purple" | "amber" | "red";
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  loading?: boolean;
  onClick?: () => void;
  description?: string;
  className?: string;
  animationDelay?: number;
}

// Hook for counting animation
function useCountUp(
  end: number,
  duration: number = 2000,
  shouldAnimate: boolean = true
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startValue + (end - startValue) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, shouldAnimate]);

  return count;
}

const colorClasses = {
  saffron: {
    gradient: "from-white to-saffron-50/50",
    iconBg: "bg-gradient-to-br from-saffron-100 to-saffron-200",
    iconText: "text-saffron-600",
    border: "border-saffron-200/60",
    value: "text-saffron-700",
    hoverBorder: "hover:border-saffron-300",
  },
  green: {
    gradient: "from-white to-india-green-50/50",
    iconBg: "bg-gradient-to-br from-india-green-100 to-india-green-200",
    iconText: "text-india-green-600",
    border: "border-india-green-200/60",
    value: "text-india-green-700",
    hoverBorder: "hover:border-india-green-300",
  },
  blue: {
    gradient: "from-white to-blue-50/50",
    iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
    iconText: "text-blue-600",
    border: "border-blue-200/60",
    value: "text-blue-700",
    hoverBorder: "hover:border-blue-300",
  },
  purple: {
    gradient: "from-white to-purple-50/50",
    iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
    iconText: "text-purple-600",
    border: "border-purple-200/60",
    value: "text-purple-700",
    hoverBorder: "hover:border-purple-300",
  },
  amber: {
    gradient: "from-white to-amber-50/50",
    iconBg: "bg-gradient-to-br from-amber-100 to-amber-200",
    iconText: "text-amber-600",
    border: "border-amber-200/60",
    value: "text-amber-700",
    hoverBorder: "hover:border-amber-300",
  },
  red: {
    gradient: "from-white to-red-50/50",
    iconBg: "bg-gradient-to-br from-red-100 to-red-200",
    iconText: "text-red-600",
    border: "border-red-200/60",
    value: "text-red-700",
    hoverBorder: "hover:border-red-300",
  },
};

export function EnhancedStatCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  loading = false,
  onClick,
  description,
  className,
  animationDelay = 0,
}: EnhancedStatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const animatedCount = useCountUp(value, 2000, isVisible && !loading);
  const colors = colorClasses[color];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const TrendIcon =
    trend?.direction === "up"
      ? TrendingUp
      : trend?.direction === "down"
        ? TrendingDown
        : Minus;

  const trendColor =
    trend?.direction === "up"
      ? "text-india-green-600"
      : trend?.direction === "down"
        ? "text-red-500"
        : "text-slate-400";

  if (loading) {
    return (
      <div
        className={cn(
          "relative p-5 rounded-2xl border bg-white shadow-sm",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{ animationDelay: `${animationDelay}ms` }}
      className={cn(
        "relative p-5 rounded-2xl border transition-all duration-300",
        "bg-gradient-to-br shadow-sm hover:shadow-md",
        "animate-fade-in-up",
        colors.gradient,
        colors.border,
        colors.hoverBorder,
        onClick && "cursor-pointer hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl font-bold", colors.value)}>
              {animatedCount.toLocaleString()}
            </span>
            {trend && (
              <div
                className={cn("flex items-center gap-0.5 text-xs", trendColor)}
              >
                <TrendIcon className="w-3 h-3" />
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </div>

        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
            colors.iconBg
          )}
        >
          <Icon className={cn("w-6 h-6", colors.iconText)} />
        </div>
      </div>
    </div>
  );
}

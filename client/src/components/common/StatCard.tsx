import { cn } from "@/lib/utils";
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

interface StatCardProps {
  number?: string | number;
  value?: string | number;
  label: string;
  description?: string;
  icon?: LucideIcon;
  color?: "saffron" | "green" | "blue" | "purple";
  animate?: boolean;
  suffix?: string;
  prefix?: string;
  className?: string;
}

// Hook for counting animation
function useCountUp(
  end: number,
  duration: number = 2000,
  shouldAnimate: boolean = true
) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);

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
      countRef.current = currentCount;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, shouldAnimate]);

  return count;
}

export function StatCard({
  number,
  value,
  label,
  description,
  icon: Icon,
  color = "saffron",
  animate = true,
  suffix = "",
  prefix = "",
  className,
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Support both 'number' and 'value' props
  const displayValue = number ?? value ?? 0;

  // Parse number for animation
  const numericValue =
    typeof displayValue === "string"
      ? parseInt(displayValue.replace(/\D/g, ""))
      : displayValue;
  const animatedCount = useCountUp(numericValue, 2000, isVisible && animate);

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

  const colorClasses = {
    saffron: {
      bg: "bg-saffron-50",
      icon: "bg-saffron-100 text-saffron-600",
      number: "text-saffron-600",
      border: "border-saffron-200",
    },
    green: {
      bg: "bg-india-green-50",
      icon: "bg-india-green-100 text-india-green-600",
      number: "text-india-green-600",
      border: "border-india-green-200",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      number: "text-blue-600",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "bg-purple-100 text-purple-600",
      number: "text-purple-600",
      border: "border-purple-200",
    },
  };

  const colors = colorClasses[color];

  // Format displayed number
  const displayNumber = animate
    ? `${prefix}${animatedCount.toLocaleString()}${suffix}`
    : `${prefix}${typeof displayValue === "number" ? displayValue.toLocaleString() : displayValue}${suffix}`;

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative p-6 rounded-2xl border transition-all duration-300 hover-lift",
        colors.bg,
        colors.border,
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
            colors.icon
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      )}

      <div
        className={cn(
          "text-4xl font-bold mb-2 animate-count-up",
          colors.number
        )}
      >
        {displayNumber}
      </div>

      <p className="text-slate-600 font-medium">{label}</p>
      {description && (
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      )}
    </div>
  );
}

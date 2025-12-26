"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92] transition-all duration-150 ease-out origin-left"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
});

ScrollProgress.displayName = "ScrollProgress";

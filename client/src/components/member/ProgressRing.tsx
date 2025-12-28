import React from "react";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 80,
  strokeWidth = 6,
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // Color based on completion
  const progressColor =
    percentage === 100
      ? "stroke-india-green-500"
      : percentage >= 60
        ? "stroke-saffron-500"
        : "stroke-saffron-400";

  const textColor =
    percentage === 100
      ? "text-india-green-600"
      : percentage >= 60
        ? "text-saffron-600"
        : "text-saffron-500";

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${progressColor} transition-all duration-1000 ease-out`}
          style={{
            animation: "progressRingFill 1s ease-out forwards",
          }}
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-semibold ${textColor}`}>
          {percentage}%
        </span>
      </div>
      <style>{`
        @keyframes progressRingFill {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: ${offset};
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressRing;

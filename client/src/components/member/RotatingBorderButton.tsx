import React from "react";

interface RotatingBorderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "saffron";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RotatingBorderButton: React.FC<RotatingBorderButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2",
    md: "px-5 py-3",
    lg: "px-6 py-4",
  };

  const bgClasses = {
    primary:
      "bg-gradient-to-r from-saffron-500 to-india-green-500 text-white group-hover:from-saffron-600 group-hover:to-india-green-600",
    secondary: "bg-white text-gray-700 group-hover:bg-gray-50",
    saffron:
      "bg-gradient-to-r from-saffron-500 to-saffron-600 text-white group-hover:from-saffron-600 group-hover:to-saffron-700",
  };

  const isSecondary = variant === "secondary";

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rotating-border-btn group relative overflow-hidden rounded-xl cursor-pointer
                    transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                    ${className}`}
      >
        {/* Rotating border container */}
        <div
          className={`absolute inset-0 rounded-xl ${
            isSecondary
              ? "bg-[conic-gradient(from_var(--rotate),#9ca3af,#d1d5db,#9ca3af,#d1d5db,#9ca3af)]"
              : "bg-[conic-gradient(from_var(--rotate),#FF9933,#138808,#FF9933,#138808,#FF9933)]"
          }`}
          style={{
            animation: "rotate-border 2s linear infinite",
          }}
        />

        {/* Inner content */}
        <div
          className={`relative m-[2px] rounded-[10px] ${sizeClasses[size]} font-semibold
                      flex items-center justify-center gap-2
                      transition-all duration-300
                      ${bgClasses[variant]}`}
        >
          {children}
        </div>
      </button>

      <style>{`
        @property --rotate {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-border {
          0% {
            --rotate: 0deg;
          }
          100% {
            --rotate: 360deg;
          }
        }

        .rotating-border-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          padding: 2px;
          background: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
    </>
  );
};

export default RotatingBorderButton;

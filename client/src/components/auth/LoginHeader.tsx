import { Heart } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="mb-4 sm:mb-5 md:mb-6 text-center lg:text-left">
      {/* Mobile Background Pattern Section */}
      <div className="lg:hidden relative -mt-6 sm:-mt-8 md:-mt-10 mb-5 sm:mb-6 h-36 sm:h-40 md:h-44 overflow-hidden bg-gradient-to-br from-saffron-500 via-saffron-600 to-india-green-600 rounded-t-none sm:rounded-t-2xl">
        {/* Static Background Pattern - Hexagonal Mesh */}
        <div className="absolute inset-0 opacity-25">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hex-pattern-login"
                x="0"
                y="0"
                width="60"
                height="52"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M30,0 L50,13 L50,39 L30,52 L10,39 L10,13 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.4"
                />
                <circle cx="30" cy="26" r="3" fill="white" opacity="0.3" />
              </pattern>
              <pattern
                id="dots-pattern-login"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="15" cy="15" r="1.5" fill="white" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-pattern-login)" />
            <rect width="100%" height="100%" fill="url(#dots-pattern-login)" />
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>
        {/* Decorative Bottom Border Pattern - Geometric Scalloped */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <svg
            className="w-full h-10 sm:h-12"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="scallop-login"
                x="0"
                y="0"
                width="60"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,80 Q30,40 60,80 L60,120 L0,120 Z"
                  fill="white"
                  opacity="0.98"
                />
                <circle cx="30" cy="60" r="8" fill="white" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="1200" height="120" fill="url(#scallop-login)" />
            <path
              d="M0,80 L0,120 M60,80 L60,120 M120,80 L120,120 M180,80 L180,120 M240,80 L240,120 M300,80 L300,120 M360,80 L360,120 M420,80 L420,120 M480,80 L480,120 M540,80 L540,120 M600,80 L600,120 M660,80 L660,120 M720,80 L720,120 M780,80 L780,120 M840,80 L840,120 M900,80 L900,120 M960,80 L960,120 M1020,80 L1020,120 M1080,80 L1080,120 M1140,80 L1140,120 M1200,80 L1200,120"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Azad Youth Organisation
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 tracking-tight">
        Welcome Back!
      </h2>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
        Sign in to continue your journey of creating positive impact
      </p>
    </div>
  );
};

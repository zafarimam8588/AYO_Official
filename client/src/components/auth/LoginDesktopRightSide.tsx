import { Heart } from "lucide-react";

export const DesktopSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-saffron-500 via-saffron-600 to-india-green-600 relative overflow-hidden">
      <DecorativeShapes />

      <div className="flex flex-col justify-center items-start p-6 sm:p-8 xl:p-10 relative z-10 text-white h-full w-full">
        <div className="mb-6 sm:mb-8 max-w-md">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg border border-white/20">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              AYO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight">
            Welcome Back,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-saffron-100">
              Changemaker!
            </span>
          </h1>
          <p className="text-saffron-50 text-sm sm:text-base leading-relaxed font-medium opacity-90">
            Ready to continue making a difference? Your community of passionate
            youth leaders is waiting for you to return!
          </p>
        </div>

        <StatsGrid />
      </div>
    </div>
  );
};

const DecorativeShapes = () => (
  <>
    {/* Talent Network Pattern */}
    <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <circle cx="100" cy="100" r="30" fill="white" opacity="0.3" />
        <circle cx="60" cy="60" r="8" fill="white" opacity="0.5" />
        <circle cx="140" cy="60" r="8" fill="white" opacity="0.5" />
        <circle cx="60" cy="140" r="8" fill="white" opacity="0.5" />
        <circle cx="140" cy="140" r="8" fill="white" opacity="0.5" />
      </svg>
    </div>

    {/* Bottom corner accent */}
    <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M0,100 Q50,50 100,100"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M0,80 Q40,40 80,80"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  </>
);

const StatsGrid = () => (
  <div className="grid grid-cols-3 gap-6 mt-4">
    <div className="text-center">
      <div className="text-xl font-bold">5K+</div>
      <div className="text-saffron-200 text-xs">Active Members</div>
    </div>
    <div className="text-center">
      <div className="text-xl font-bold">100+</div>
      <div className="text-saffron-200 text-xs">Live Projects</div>
    </div>
    <div className="text-center">
      <div className="text-xl font-bold">50+</div>
      <div className="text-saffron-200 text-xs">Cities Reached</div>
    </div>
  </div>
);

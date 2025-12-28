import { Heart } from "lucide-react";

export const RegisterDesktopSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-india-green-500 via-india-green-600 to-saffron-600 relative overflow-hidden">
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
            Join Our Mission,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-india-green-100">
              Changemaker!
            </span>
          </h1>
          <p className="text-india-green-50 text-sm sm:text-base leading-relaxed font-medium opacity-90">
            Ready to make a difference? Join thousands of passionate youth
            leaders creating positive change in communities.
          </p>
        </div>

        <StatsGrid />
      </div>
    </div>
  );
};

const DecorativeShapes = () => (
  <>
    {/* Geometric pattern */}
    <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <polygon
          points="100,20 170,60 170,140 100,180 30,140 30,60"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        <polygon
          points="100,50 140,75 140,125 100,150 60,125 60,75"
          fill="white"
          opacity="0.2"
        />
      </svg>
    </div>

    {/* Bottom corner accent */}
    <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="20" cy="80" r="4" fill="white" />
        <circle cx="50" cy="70" r="6" fill="white" />
        <circle cx="80" cy="80" r="4" fill="white" />
        <path
          d="M20,80 Q50,60 80,80"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  </>
);

const StatsGrid = () => (
  <div className="grid grid-cols-3 gap-6 mt-4">
    <div className="text-center">
      <div className="text-xl font-bold">Free</div>
      <div className="text-india-green-200 text-xs">Membership</div>
    </div>
    <div className="text-center">
      <div className="text-xl font-bold">24/7</div>
      <div className="text-india-green-200 text-xs">Support</div>
    </div>
    <div className="text-center">
      <div className="text-xl font-bold">Global</div>
      <div className="text-india-green-200 text-xs">Network</div>
    </div>
  </div>
);

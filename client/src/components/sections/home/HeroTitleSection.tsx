import { ChevronDown } from "lucide-react";

const HeroTitleSection = () => {
  return (
    <main
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 30%, rgba(255, 153, 51, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 70%, rgba(19, 136, 8, 0.10) 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%),
          linear-gradient(180deg, #fefefe 0%, #f8faf9 100%)
        `,
      }}
    >
      {/* Single subtle floating gradient for gentle movement */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-[0.08] animate-breathe pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 153, 51, 0.4) 0%, rgba(19, 136, 8, 0.3) 100%)",
        }}
      />

      <div className="text-center relative z-10 max-w-5xl mx-auto">
        {/* Animated badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-saffron-200/60 shadow-sm mb-6 sm:mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-india-green-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-700">
            Transforming Lives Across Bihar
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in animation-delay-100">
          <span className="bg-gradient-to-r from-saffron-600 via-slate-800 to-india-green-600 bg-clip-text text-transparent inline-block">
            Building Bihar's
          </span>
          <br />
          <span className="bg-gradient-to-r from-india-green-600 via-slate-700 to-saffron-500 bg-clip-text text-transparent inline-block animate-gradient">
            Future
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-200 px-2">
          Empowering communities through education, healthcare, and sustainable
          development for a brighter tomorrow
        </p>

        {/* Tricolor accent bar */}
        <div className="flex justify-center gap-1.5 mb-8 sm:mb-10 animate-fade-in animation-delay-300">
          <div className="h-1 sm:h-1.5 w-12 sm:w-16 rounded-full bg-saffron-500" />
          <div className="h-1 sm:h-1.5 w-6 sm:w-8 rounded-full bg-slate-300" />
          <div className="h-1 sm:h-1.5 w-12 sm:w-16 rounded-full bg-india-green-500" />
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-fade-in animation-delay-400">
          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            Scroll to explore
          </span>
          <div className="text-saffron-500 animate-bounce">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </main>
  );
};

export default HeroTitleSection;

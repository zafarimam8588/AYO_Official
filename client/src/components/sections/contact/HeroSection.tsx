import { Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-saffron-200 shadow-sm mb-6 sm:mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-india-green-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-700">
            We'd Love to Hear From You
          </span>
        </div>

        {/* Main heading */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fade-in animation-delay-100">
          <div className="bg-gradient-to-br from-saffron-400 to-india-green-500 p-3 sm:p-4 rounded-2xl shadow-xl">
            <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            <span className="bg-gradient-to-r from-saffron-600 via-slate-800 to-india-green-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
        </div>

        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 animate-fade-in animation-delay-200">
          Connect with Azad Youth Organization. Whether you want to join us,
          volunteer, partner, or simply have questions — we're here to help.
          Let's work together to empower Bihar's youth.
        </p>

        {/* Tricolor accent bar */}
        <div className="flex justify-center gap-1.5 animate-fade-in animation-delay-300">
          <div className="h-1 sm:h-1.5 w-12 sm:w-16 rounded-full bg-saffron-500" />
          <div className="h-1 sm:h-1.5 w-6 sm:w-8 rounded-full bg-slate-300" />
          <div className="h-1 sm:h-1.5 w-12 sm:w-16 rounded-full bg-india-green-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
